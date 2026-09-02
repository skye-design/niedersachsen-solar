import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";

// Formspree stays the delivery backend for now — no alternative email/CRM
// service has been confirmed or configured with credentials, and swapping
// backends is not what Paket B was asked to decide. What changes is *how*
// it's reached: the client used to POST straight to Formspree from the
// browser bundle; now it posts here, so we can validate server-side with
// Zod, reject/absorb spam before anything is forwarded, and keep the actual
// delivery endpoint out of client code. If Formspree is ever replaced, only
// this file changes — the client contract (POST /api/lead) does not.
const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mrpzzbgd";

// Best-effort in-memory rate limit. This process runs long-lived on a
// single Hetzner box (per the handoff's deployment target), so in-memory
// state is meaningful here — it would NOT survive a serverless/edge
// deployment with multiple cold-started instances, worth knowing if the
// hosting target ever changes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    // Deliberately vague — no detail that helps an attacker calibrate.
    return NextResponse.json({ ok: false, error: "Bitte versuchen Sie es später erneut." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
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
