import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";

// No hardcoded fallback — a misconfigured deployment must fail loudly
// (503, see below), never silently deliver leads to a placeholder inbox
// nobody is reading. Set via the server environment only; never exposed to
// the client (it's read here, in a route handler, not in `next.config`'s
// `env` block or a `NEXT_PUBLIC_*` var).
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

// Generous for this form's actual field shape (see leadSchema's per-field
// max()s) — this exists to reject oversized payloads before they're even
// JSON-parsed, not to be a tight bound on legitimate submissions.
const MAX_BODY_BYTES = 20_000;

// Best-effort in-memory rate limit. This process runs long-lived on a
// single Hetzner box (per the handoff's deployment target), so in-memory
// state is meaningful here — it would NOT survive a serverless/edge
// deployment with multiple cold-started instances, worth knowing if the
// hosting target ever changes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

// Without this, `hits` grows forever — every distinct IP that ever submits
// once, including one-off legitimate visitors, stays in the Map for the
// life of the process. Sweep expired entries periodically instead of only
// pruning lazily on that same IP's next hit (which may never come).
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(ip);
    else hits.set(ip, recent);
  }
}, CLEANUP_INTERVAL_MS).unref();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// SECURITY: this trusts the first entry of X-Forwarded-For as the client
// IP, which only means anything if nginx (the sole entry point per the
// deployment target) is configured to overwrite — not append to — that
// header before proxying to this app. If nginx instead forwards a
// client-supplied X-Forwarded-For untouched, any visitor can set an
// arbitrary value and defeat this rate limit entirely. Required nginx
// directive (documented, not applied — see docs/deployment.md):
//   proxy_set_header X-Forwarded-For $remote_addr;
function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    // Deliberately vague — no detail that helps an attacker calibrate.
    return NextResponse.json({ ok: false, error: "Bitte versuchen Sie es später erneut." }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Anfrage zu groß." }, { status: 413 });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
  // Defensive re-check: content-length can be absent or spoofed, the actual
  // byte count read off the wire is the one that matters.
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Anfrage zu groß." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Bitte überprüfen Sie Ihre Angaben." },
      { status: 400 },
    );
  }

  const { company, ...data } = parsed.data;

  // Honeypot tripped: report success without forwarding anything or
  // logging the submitted content. No PII enters the server log either way.
  if (company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!FORMSPREE_ENDPOINT) {
    // Config error, not a user error — logged without any submitted data.
    console.error("[api/lead] FORMSPREE_ENDPOINT is not set");
    return NextResponse.json(
      { ok: false, error: "Der Dienst ist vorübergehend nicht verfügbar. Bitte rufen Sie uns direkt an." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject:
          data.source === "solar-check"
            ? `Neuer Solar-Check von ${data.name}`
            : data.source === "solar-lotse"
              ? `Neue Anfrage über den Solar-Lotsen von ${data.name}`
              : `Neue Angebotsanfrage von ${data.name}`,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error("upstream-error");
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Log only that delivery failed, never the lead's personal data.
    console.error("[api/lead] Formspree delivery failed");
    return NextResponse.json(
      { ok: false, error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an." },
      { status: 502 },
    );
  }
}
