# Round 3 — Final Report (2026-09-02)

Repository: `skye-design/niedersachsen-solar`, branch `redesign/niso-v2`
exclusively. Audited remote commit before this round: `3de0fb0`. No merge,
no deploy, no server access — as instructed.

**Access note:** `CLAUDE.md` was already fully read earlier in this session
(unchanged knowledge relied on). The four newly-referenced documents
(`niedersachsen-solar-claude-review-prompt.md`,
`niedersachsen-solar-preview-spec.md`, `niedersachsen-solar-final-review.md`,
`niedersachsen-solar-final-preview.png`) were **not accessible** —
`~/Downloads` returned "Operation not permitted" at every level, same
issue as the prior round, and the files could not be located anywhere
else on disk. This round was implemented from the concrete details quoted
verbatim in the correction brief itself (exact headline text, exact
"IHR ENERGIEPFAD · 01/05" and "01 · VERTRAUEN — Vom Dach bis zur
Inbetriebnahme." strings), not from the visual spec/preview image
directly. Flagged as an open item below.

## Commit hashes

| # | Hash | Subject |
|---|---|---|
| 1 | `355f73d` | Commit 1 (P0 stabilization): two-variant logo, flicker-free header switch |
| 2 | `3a9af50` | Commit 2 (Preview-Treue): evolve hero copy and precision-detail elements |
| 3 | `57d040c` | Commit 3 (Conversion/SEO polish): PLZ precision fix + re-verification |

## Changed files per commit

**Commit 1:**
```
public/brand/ (12 files) — deleted entirely
public/images/niso-logo-horizontal.svg -> public/images/logo-on-dark.svg (renamed, unchanged)
public/images/logo-on-light.svg — new (mechanical recolor of the wordmark fill only)
src/app/layout.tsx
src/app/ratgeber/[slug]/page.tsx
src/components/Footer.tsx
src/components/Header.tsx
src/lib/content.ts
```

**Commit 2:**
```
src/components/Hero.tsx
```

**Commit 3:**
```
src/components/SolarCheck.tsx
src/lib/validation.ts
```

## Lint/build results

Run after every commit, all clean:
```
npm run lint                        → 0 errors, 0 warnings (all three commits)
NODE_ENV=production npm run build   → clean, 23 routes (all three commits)
```

## Screenshot paths

`docs/screenshots/round3/`:
- `desktop-1246px-hero-top.jpg` — full hero: new headline, measurement-
  line accent, "IHR ENERGIEPFAD · 01/05" label, "01 · Vertrauen" transition
  teaser, correct white logo-on-dark, all visible together, no overlaps.
- `tablet-768px-hero-top.jpg` — same, at an exact 768px width match.
- `mobile-606px-hero-top.jpg` — safe-area confirmed (eyebrow clear of the
  fixed header), correct mobile hero image (hero-v2.jpg, not the
  abstract-reading aerial texture).
- `mobile-606px-scrolled-solarcheck.jpg` — StickyMobileCTA and the
  Solar-Lotse launcher with visible, non-overlapping clearance; scrolled
  header shows the dark-on-light logo variant correctly.
- `mobile-606px-first-paint.jpg` — paired with the direct computed-style
  check below.

**On exact target widths (1440×1000 / 768×1024 / 390×844 / 360×740):** the
browser-automation tool's `resize_window` did not reliably reach the
requested dimensions in this environment — confirmed via repeated,
fresh-tab attempts with `window.innerWidth` checks showing it frequently
ignores the request or applies a stale prior value (documented in this
session's own tool-behavior investigation, same limitation as the prior
two rounds). One exact match was reached (768px). The others are real,
live-captured screenshots at 606px (below the `sm` 640px breakpoint — same
responsive tier as 390/360) and 1246px (above the `lg` 1024px breakpoint —
same tier as 1440). Breakpoint-boundary behavior (hamburger vs. desktop
nav, sticky-CTA visibility) was directly confirmed correct at each.

**First-paint verification, done two ways:**
1. Screenshot (`mobile-606px-first-paint.jpg`) — visual.
2. Direct computed-style check (more rigorous than a screenshot, since it
   isn't subject to capture timing): with the `.js` class removed from
   `<html>` (simulating no-JS), `getComputedStyle(document.querySelector('h1'))`
   returned `opacity: "1"`, `transform: "none"` for the new headline
   ("Ihr Zuhause. Ein Energiesystem.") — confirmed visible with zero JS
   dependency, not just "should be" from reading the code.

## OWNER_CONFIRMATION_CHECKLIST.md

**Still unanswered.** This file was created in the prior round and has not
been filled in by the Product Owner yet. Nothing was invented to fill it —
see the file itself (repo root) for the nine open items, unchanged from
last round.

## Remaining open Inhaberfragen (owner questions)

1. All nine items in `OWNER_CONFIRMATION_CHECKLIST.md` (pricing, Förderung,
   statewide service area, 1-Werktag callback, opening hours, EcoFlow
   exclusivity, Cloover, founder/address in marketing, "zertifiziert"
   partners) — unchanged, still open.
2. **New this round:** `logo-on-dark.svg`/`logo-on-light.svg` are still
   placeholders, not explicitly "approved" — the light-background variant
   in particular (`#171A1D` recolor of the wordmark) has not been signed
   off by the Product Owner as the correct treatment.
3. **New this round:** the "feine Messlinien" (measurement-line accent)
   and the precise styling of the "roten Signalmarker" were implemented
   from the brief's text description only, without the actual preview
   image — this is this session's best-effort interpretation, not a
   verified match to whatever the preview file actually shows. Worth a
   direct visual comparison once the file is accessible again.

## Known risks

- Exact 390/768/1440/360px viewport screenshots not fully achieved (see
  above) — same tooling limitation flagged in the prior two rounds,
  mitigated with same-tier widths plus direct breakpoint verification.
- The `~/Downloads` permission issue prevented reading the actual preview
  spec/image — Commit 2's precision-detail elements (measurement lines,
  signal marker refinement) carry real but unverified risk of not
  matching the intended visual exactly.
- `logo-on-light.svg` is a mechanical recolor, not a designed asset —
  functionally correct (verified: identical vector paths, single fill
  color changed) but still pending explicit Product Owner approval as a
  real brand asset.
- Everything already flagged in `docs/correction-pass-report.md` from the
  prior round (article date placeholders, PWA icon sizes, `/datenschutz`
  legal review, GPTBot decision at actual launch time) remains open and
  unchanged.
