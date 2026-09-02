## Summary

Draft PR per `handoff/03_CLAUDE_IMPLEMENTATION_PACKAGES.md`'s Paket D — the
full `redesign/niso-v2` NISO v2 redesign (Pakete A–C) against `main`, for
Product Owner + Manus review before merge/deploy. **Nothing in this PR has
been merged or deployed.**

64 files changed, 4,871 insertions(+), 467 deletions(-) across three
packages:

- **Paket A** — brand foundation (Sora/Source Sans 3/IBM Plex Mono, Poppins
  fully removed), new logo assets, full homepage rebuild, static Solar-Check
  prototype, typed content model (`src/lib/content.ts`).
- **Paket B** — dedicated page architecture (`/photovoltaik`,
  `/stromspeicher`, `/wallbox`, `/waermepumpe`,
  `/dachsanierung-photovoltaik`, `/projekte`, `/ueber-uns`, `/ablauf`,
  `/ratgeber` + `[slug]`, `/kontakt`), 308 redirects from old URLs, visible +
  JSON-LD breadcrumbs, real server-side Solar-Check/QuoteForm submission via
  `POST /api/lead` (Zod validation, honeypot, IP rate-limiting).
- **Paket C** — guided Solar-Lotse chatbot, full technical SEO, Web App
  Manifest, deployment docs. Detail below.

## Architecture decisions

**Chatbot: guided-only, no AI model provider.** `05_CHATBOT_SPEC.md`
explicitly requires the owner to choose an operating model before any bot
logic gets built. Confirmed with Skye on 2026-09-02: guided/rule-based —
near-zero ongoing cost, low setup, fully controllable. `src/lib/solarLotse.ts`
is pure static lookups over already-vetted `content.ts` data (services,
process steps, FAQs), but shaped to match the spec's `SolarLotseResponse`
contract — an eventual AI/hybrid upgrade only swaps the answer-producing
functions, the UI (`src/components/SolarLotse.tsx`) doesn't change.

**Lead handoff reuses the existing `/api/lead` endpoint** rather than a new
one. The spec calls for "a separate, deterministic endpoint" for lead
handoff, which Paket B had already built for the QuoteForm/Solar-Check flow.
Guided mode has no free text sent to any backend for interpretation (every
answer is a local static lookup), so there's nothing that needs the
model-facing validation/rate-limiting/moderation layer the spec describes
for the AI variant — that layer would only be needed if this ever upgrades
to AI/hybrid.

**Native `<dialog>` for the chatbot**, not a hand-rolled modal — gets focus
trapping, Escape-to-close, and focus-return on close for free from the
browser rather than reimplementing (and risking bugs in) that logic.

**GPTBot blocked, OAI-SearchBot allowed** in `robots.ts` — also an explicit
owner call per the spec (`04_SEO_AI_SPEC.md`), confirmed same session:
visible in ChatGPT search, opted out of model training.

**Organization + HomeAndConstructionBusiness as one JSON-LD node** (two
`@type`s) rather than a `@graph` of two separately-linked nodes — simpler,
still valid schema.org, and both sets of fields (founder/logo vs.
address/hours) describe the same real-world entity.

## Screenshots

Browser-automation viewport resizing was unreliable in this environment
(`resize_window` frequently didn't reach the requested width — documented
in the commit history). Actual achieved widths, all live-captured, not
mocked:

| Target | Achieved | Screenshot |
|---|---|---|
| 390px (mobile) | 606px — still below the `sm` (640px) breakpoint, same responsive tier | ![mobile 606px](https://raw.githubusercontent.com/skye-design/niedersachsen-solar/redesign/niso-v2/docs/screenshots/paket-d/mobile-606px-homepage.jpg) |
| 768px (tablet) | 768px — exact | ![tablet 768px](https://raw.githubusercontent.com/skye-design/niedersachsen-solar/redesign/niso-v2/docs/screenshots/paket-d/tablet-768px-homepage.jpg) |
| 1440px (desktop) | 1412px — same tier, full nav confirmed | ![desktop 1412px](https://raw.githubusercontent.com/skye-design/niedersachsen-solar/redesign/niso-v2/docs/screenshots/paket-d/desktop-1412px-homepage.jpg) |
| Solar-Lotse, desktop | 1412px | ![solar-lotse 1412px](https://raw.githubusercontent.com/skye-design/niedersachsen-solar/redesign/niso-v2/docs/screenshots/paket-d/desktop-1412px-solar-lotse.jpg) |

Confirmed live at these widths: mobile hamburger nav + sticky CTA bar (below
`sm`), hamburger nav without sticky CTA (`sm`–`lg`), full desktop nav
(≥`lg`) — the breakpoint logic itself was validated even where the exact
target pixel width wasn't reachable.

## Test results

- `npm run lint` — clean (pre-existing `vendor/vanta-master/` noise excluded,
  unrelated third-party vendored code, not touched by this branch).
- `npm run build` — clean, all 23 routes generate successfully
  (static + SSG + the one dynamic `/api/lead` route).
- Keyboard/focus — verified live: Escape closes the Solar-Lotse dialog and
  returns focus to the launcher button; Enter on the focused launcher
  reopens it; native `<dialog>` focus trap confirmed.
- Reduced motion — `prefers-reduced-motion: reduce` is handled globally in
  `globals.css` (universal selector override on all transitions/animations),
  covers every component including the new Solar-Lotse without any
  component-specific opt-in needed.
- Handoff-form submission was **not** live-tested end-to-end deliberately —
  doing so would have sent a real test lead into Skye's actual Formspree
  inbox. It reuses the exact `/api/lead` + Zod validation path already
  proven by the QuoteForm in Paket B.

## Open content questions (for Product Owner)

Carried over from Paket A/B, still open:
- Team size beyond the founder, a founder photo, years of experience as a
  stated number — none of these are rendered anywhere; the site doesn't
  claim them.
- Real per-project case-study data (region, starting point, challenge,
  solution) — only real photos exist today, so `/projekte` renders as a
  photo teaser, not full case studies (`src/lib/content.ts` line ~490).
- `/standorte/hannover|hildesheim|braunschweig` deliberately not built — no
  real per-city project/contact/grid-operator data exists, and interchangeable
  city-swapped copy would violate the brief's own ban on that pattern.

New from Paket C:
- `datePublished`/`dateModified` on `/ratgeber/[slug]` articles and in
  `solarLotse.ts` use this content's authoring date (2026-09-02), not a real
  go-live date — confirm/update before launch (checklist item in
  `docs/deployment.md`).
- `manifest.ts` only has a 180×180 icon (the existing apple-touch-icon).
  Proper 192×192/512×512 PWA icons from the vector logo source are an open
  asset request, not generated here.
- Dachsanierung has no price range anywhere on the site (deliberately — too
  project-specific for an honest range, unlike the other four services).

## Environment variables (names only, no values)

| Variable | Since | Required for launch? |
|---|---|---|
| `FORMSPREE_ENDPOINT` | Paket B | No — has a working default |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Paket C | Only once Search Console is connected |
| `DEPLOY_HOST` | pre-existing (GitHub Actions secret) | Yes — already configured |
| `DEPLOY_SSH_KEY` | pre-existing (GitHub Actions secret) | Yes — already configured |

No AI-model-provider key exists anywhere in this branch — the chatbot is
guided-only.

## Not in scope / explicitly not done

- No merge to `main`, no deploy, no DNS/secret/server changes — per
  CLAUDE.md, unchanged throughout all three packages.
- No new dependencies added.
- Image filenames (`hero-v2.jpg`, `gallery-01-v2.jpg`, etc.) stay generic
  rather than descriptive — flagged, not fixed, given the risk of touching
  every reference across the codebase for a comparatively low SEO signal
  (alt text already covers the semantic gap).

Full deployment path, checklist, and env var detail: `docs/deployment.md`.
