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

- **New/changed environment variables** (see full list below) need to exist
  in whatever `.env` file `npm run build` reads on the Hetzner box before
  the first post-merge deploy, or the build will silently fall back to the
  defaults baked into the code (e.g. the hardcoded Formspree endpoint) —
  worth confirming explicitly rather than discovering it after go-live.
- **No new external services, ports, or infra.** Paket C added zero new
  dependencies (CLAUDE.md's "vermeide neue Abhängigkeiten" was followed) and
  the guided Solar-Lotse calls no external API — it's static content plus
  the pre-existing `/api/lead` route. Nothing new to provision.
- **`/api/lead`'s rate limiter is in-memory** (see the route's own comment).
  That's fine on today's single long-lived pm2 process; it would silently
  stop working correctly if the deployment target ever moves to serverless
  or multi-instance. Not a blocker, just a fact to know before changing
  hosting.

## Environment variables (names only — see CLAUDE.md: no values here)

| Variable | Introduced in | Purpose | Required for launch? |
|---|---|---|---|
| `FORMSPREE_ENDPOINT` | Paket B | Overrides the hardcoded Formspree form URL in `src/app/api/lead/route.ts` | No — has a working default |
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

## Rollback

Standard git revert on `main` + re-run the existing `deploy.yml` (manually
via `workflow_dispatch` if needed) — no new rollback mechanism was
introduced, none was needed.
