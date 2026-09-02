# Deployment — Hetzner (documentation only)

Written as part of Paket C. This describes the existing deploy path and what
changes when `redesign/niso-v2` eventually goes live. **Nothing here was
executed** — no deploy, DNS, or secret changes were made while writing it,
per CLAUDE.md's "kein Deployment ... ohne ausdrückliche Freigabe."

## How production deploys today

`.github/workflows/deploy.yml` triggers on every push to `main` (and via
manual `workflow_dispatch`). It SSHes into the Hetzner host as `root`,
`git reset --hard origin/main`, `npm ci`, `npm run build`, then
`pm2 restart niedersachsen-solar`. The app runs long-lived under pm2 on a
single box — not serverless, not multi-instance (relevant below).

Required GitHub Actions secrets (names only, already configured — not
touched here):

- `DEPLOY_HOST`
- `DEPLOY_SSH_KEY`

## What merging redesign/niso-v2 → main actually changes operationally

- **`FORMSPREE_ENDPOINT` is now a hard requirement, not an override.**
  Following the 2026-09-02 correction pass, `src/app/api/lead/route.ts` has
  no hardcoded fallback URL anymore — if the variable isn't set on the
  Hetzner box, every lead submission (QuoteForm, Solar-Check, Solar-Lotse
  handoff) returns a controlled 503 to the visitor instead of silently
  delivering to a placeholder inbox. **This must be set before the first
  post-merge deploy**, not discovered after go-live.
- **nginx must overwrite, not append to, `X-Forwarded-For`** before
  proxying to the Node app. `/api/lead`'s rate limiter trusts the first
  entry of that header as the client IP (see the route's own `getClientIp`
  comment) — if nginx forwards a client-supplied value untouched, any
  visitor can spoof it and defeat the rate limit entirely. Required
  directive: `proxy_set_header X-Forwarded-For $remote_addr;` (assumes
  nginx is the sole entry point with no further upstream proxy already
  setting this — if one exists, use the standard `$proxy_add_x_forwarded_for`
  chaining pattern instead). Not applied here — server config is out of
  scope for this branch.
- **No new external services, ports, or infra.** Paket C added zero new
  dependencies (CLAUDE.md's "vermeide neue Abhängigkeiten" was followed) and
  the guided Solar-Lotse calls no external API — it's static content plus
  the pre-existing `/api/lead` route. Nothing new to provision.
- **`/api/lead`'s rate limiter is in-memory**, now with a periodic sweep
  (`setInterval`, unref'd) so stale IP entries don't accumulate forever on
  the long-lived pm2 process. Still process-local: it would not work
  correctly if the deployment target ever moves to serverless or
  multi-instance. Not a blocker, just a fact to know before changing hosting.

## Environment variables (names only — see CLAUDE.md: no values here)

| Variable | Introduced in | Purpose | Required for launch? |
|---|---|---|---|
| `FORMSPREE_ENDPOINT` | Paket B, hardened 2026-09-02 | Formspree form URL in `src/app/api/lead/route.ts` — **no fallback**, missing = 503 for all lead submissions | **Yes** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Paket C | Google Search Console verification meta tag (`src/app/layout.tsx`) | Only once Search Console is being connected |

No AI-model-provider key exists or is needed — the Solar-Lotse is
guided-only per the 2026-09-02 owner decision. If it's ever upgraded to the
AI or hybrid variant (05_CHATBOT_SPEC.md), that upgrade would introduce a
model-provider API key at that time, server-side only, never in client code.

## Pre-merge checklist (for the Product Owner / Manus review in Paket D)

- [ ] Confirm `datePublished`/`dateModified` placeholder dates in
      `src/app/ratgeber/[slug]/page.tsx` and `src/lib/solarLotse.ts`
      (currently `2026-09-02`, the authoring date) against the real go-live
      date.
- [ ] Confirm `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` value once Search
      Console is connected (site currently ships without it — harmless, just
      inert until set).
- [ ] Decide whether to generate proper 192×192 / 512×512 PWA icons from the
      vector logo source — `manifest.ts` currently only references the
      existing 180×180 PNG (see its own comment).
- [ ] Legal review of `/datenschutz` before go-live, per CLAUDE.md/brief —
      unchanged content-wise in Paket C beyond metadata/breadcrumbs, still
      needs the sign-off the brief already calls for.
- [ ] Verify `robots.ts`'s GPTBot block still reflects the owner's intent
      at launch time (decided 2026-09-02: block GPTBot, allow OAI-SearchBot).

## Hero media sizes (2026-09-02 correction pass)

| Asset | Size | Served to |
|---|---|---|
| `public/videos/hero.mp4` | 9.6 MB | Desktop only (≥900px viewport), and only when JS is available, `prefers-reduced-motion` isn't set, and `navigator.connection.saveData` isn't on — already gated in `HeroMedia.tsx` before this pass, verified still correct |
| `public/images/gallery/gallery-01-v2.jpg` | 656 KB | Desktop-only, as the `<video poster>` shown before the video loads |
| `public/images/hero-v2.jpg` | 2.3 MB | Mobile hero image (swapped in this pass from gallery-01-v2.jpg — see HeroMedia.tsx's comment — plus already used as the OG/Twitter image in layout.tsx) |

**Open question, not resolved here:** is 9.6 MB justified for the desktop
hero video's perceived value? It's already about as safely gated as a video
can be (skips mobile, save-data, and reduced-motion entirely), so this
isn't a bug — it's a product judgment call on whether to keep, compress, or
cut the video, which is out of scope for a bug-fix pass to decide
unilaterally.

## Security headers (2026-09-02 correction pass)

`next.config.ts` now sets `poweredByHeader: false` and four response headers
(HSTS without preload/includeSubDomains, X-Content-Type-Options, Referrer-
Policy, Permissions-Policy) via `headers()` — real application config, not
just documentation, since it only affects this Next.js app once deployed
and touches no server. **Not included: CSP.** It constrains what the page
can load, so turning one on blind risks silently breaking images, fonts,
the QuoteForm/Solar-Check POST to `/api/lead`, and any future Solar-Lotse
model-provider origin if it's ever upgraded off guided-only. It needs a
real audit of every load source first. Draft starting point once that
audit happens:

```
Content-Security-Policy:
  default-src 'self';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  frame-ancestors 'none';
```

(`style-src 'unsafe-inline'` is a placeholder for Tailwind's inline styles
where used — worth checking whether a stricter nonce-based approach is
feasible before shipping this.)

**nginx-side, not applied here:**
- Confirm nginx doesn't already set any of the four active headers (a
  duplicate/conflicting value from nginx would override or double up on
  Next's), and doesn't strip them.
- No nginx change is needed for `X-Powered-By` specifically —
  `poweredByHeader: false` stops Next from ever sending it, so there's
  nothing for nginx to strip.

## Rollback

Standard git revert on `main` + re-run the existing `deploy.yml` (manually
via `workflow_dispatch` if needed) — no new rollback mechanism was
introduced, none was needed.
