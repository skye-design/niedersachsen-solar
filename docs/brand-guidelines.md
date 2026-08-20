# Niedersachsen Solar (NISO) — Brand Guidelines v1.0

> Last updated: 2026-08-20
> Status: Draft — first version, built from the live site + founder positioning

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #CC010F |
| Background (dark, primary surface) | #111318 |
| Foreground / Text | #F8F9FA |
| Primary Font | Poppins |
| Voice | Honest, hands-on, of-the-people — formal "Sie", never salesy |

---

## 0. Who NISO Is

Niedersachsen Solar is a full-service energy company for homeowners in **Hannover, Hildesheim, Braunschweig** — PV-Anlagen, Speicher, Wallbox, Wärmepumpe, and Dachsanierung, "aus einer Hand" (one concept, one point of contact).

It is the **only** solar company in this brand family — not to be confused with any partnership/subcontracting work under other names. Positioning, in the founder's own words: *"wir sind eine Firma der Leute"* — a company of the people. Young, but honest.

The credibility angle is hands-on, not corporate: the people planning the system have stood on the roof themselves. This is already load-bearing in the live site copy ("Keine Vertriebsnummer, sondern echte Handwerkserfahrung") and should stay the spine of every future brand decision — it's the direct counter-positioning to the pushy door-to-door solar sales reputation the industry has in Germany right now.

---

## 1. Color Palette

Pulled directly from the live site tokens (`src/app/globals.css`) — already correct, already matches the logo. Nothing here is new; this section just documents what's real so it stops being reinvented per-project.

### Primary

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| NISO Red | #CC010F | rgb(204,1,15) | Logo, primary CTA, links, focus ring — the one brand color that must never shift |
| NISO Red Dark | #A3020E | rgb(163,2,14) | Hover/active states |

### Surface (dark-first)

| Name | Hex | Usage |
|------|-----|-------|
| Background | #111318 | Primary page background |
| Background Alt | #0F1116 | Alternating sections |
| Card | #2E3138 | Cards, panels |
| Border | rgba(248,249,250,0.1) | Dividers, card borders |

### Text

| Name | Hex | Usage |
|------|-----|-------|
| Foreground | #F8F9FA | Headings, primary body text |
| Muted Foreground | #9BA0AA | Secondary text, descriptions |

### Semantic

| State | Hex | Usage |
|-------|-----|-------|
| Destructive | #FF6B6B | Errors, destructive actions |

### Print / Light-Surface Variant

The logo itself is built for a white field (see Section 3). When NISO shows up on paper — business cards, contracts, van signage, print ads — use white background, near-black text (#1A1A1A, not pure #000), NISO Red as the only accent. Don't force the dark web theme onto print; it doesn't hold up in CMYK and isn't how the mark was drawn.

### Accessibility

- Foreground (#F8F9FA) on Background (#111318): >15:1 — well past AAA.
- NISO Red (#CC010F) on Background: passes AA for large text/UI, borderline for small body text — never set small body copy in red, red is for accents/CTAs only.

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Poppins', system-ui, -apple-system, sans-serif;
--font-body: 'Poppins', system-ui, -apple-system, sans-serif;
```

This replaces the current `GeistSans` in the codebase, which was never a deliberate brand choice — it's the Next.js starter default. Poppins was chosen specifically for the "company of the people" positioning: warm, rounded, human — the opposite of a cold SaaS/startup geometric face, while staying clean enough to sit next to PV/roof photography. It also pairs correctly with the heraldic Sachsenross-and-sun mark instead of fighting it.

### Weights in Use

| Weight | Where |
|--------|-------|
| SemiBold (600) | Wordmark, H1/H2 headings |
| Medium (500) | H3/H4, button labels |
| Regular (400) | Body copy |
| Light (300) | Wordmark subline ("SOLAR"), small tracked labels/eyebrows |

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 52px | 32px | 600 | 1.2 |
| H2 | 36px | 28px | 600 | 1.25 |
| H3 | 24px | 20px | 500 | 1.3 |
| Body | 16px | 16px | 400 | 1.6 |
| Body Large | 18px | 18px | 400 | 1.6 |
| Small / Caption | 14px | 14px | 400 | 1.5 |
| Eyebrow / Tag | 13px | 13px | 300, +0.08em tracking, uppercase | 1.4 |

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## 3. Logo Usage

### The Mark

Heraldic Sachsenross (the rearing white horse of Lower Saxony) fused with a rising sun — regional identity plus solar, in one silhouette. Red #CC010F, white, with a single black ground-line stroke. This is a deliberate trust signal: it reads as regional and established, not as a generic tech/energy startup icon, which matters given the audience's skepticism toward solar sales operators.

### Wordmark Lockup

Two-tier, centered under the icon:
- **"Niedersachsen"** — Poppins SemiBold, dark (#1A1A1A on white / #F8F9FA on dark)
- **"SOLAR"** — Poppins Light, uppercase, tracked (~0.08em), muted gray, directly beneath

This is the primary lockup for anything with room to breathe — letterhead, van signage, homepage header, business cards.

### Variants Needed (not yet built — next production step)

| Variant | Use Case |
|---------|----------|
| Full lockup (icon + wordmark, stacked) | Headers, print, signage |
| Horizontal lockup (icon left, text right) | Email signature, narrow headers |
| Icon only | Favicon, app icon, social avatar, small spaces |
| Reversed/white (icon + wordmark in white/red only) | Dark or photo backgrounds |
| Single-color black | Fax/B&W print, engraving, embossing |

### Clear Space

Minimum clear space around the full lockup = the height of the horse-and-sun icon alone. Nothing else (text, edges, other elements) inside that margin.

### Minimum Size

| Context | Minimum Width |
|---------|---------------|
| Digital — full lockup | 140px |
| Digital — icon only | 32px |
| Print — full lockup | 30mm |
| Print — icon only | 12mm |

### Don'ts

- Don't recolor the horse/sun outside red-white-black.
- Don't stretch or skew — the icon's proportions (roughly 1:1) are fixed.
- Don't drop the ground-line stroke; it's what grounds the horse rather than leaving it floating.
- Don't set the wordmark in anything but Poppins, and don't collapse the two-tier weight contrast into one weight.
- Don't place the full-color mark on a busy photo without a solid-color safe area behind it.

---

## 4. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Honest** | Says what's actually true about a system, cost, or timeline — no oversell |
| **Hands-on** | Speaks from having actually done the physical work, not just sold it |
| **Of the people** | Approachable, regional, not corporate-distant |
| **Young but grounded** | Confident and current, but never flashy or hype-driven |

### Voice Chart

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Honest | Direct about tradeoffs and real numbers | Overselling, "Bestpreis-Garantie"-style claims |
| Hands-on | Specific about the actual craft (roof, wiring, install) | Abstract, marketing-brochure vague |
| Of the people | Warm, plain-spoken, regional | Corporate, jargon-heavy, distant |
| Confident | Assured because the work is real | Arrogant, pushy, salesy |

### Formality

**Formal "Sie", always** — this is already established across the live site and should not change. Formal address + warm, plain language is the intended combination: respectful, not stiff.

### Tone by Context

| Context | Tone | Example (from live site) |
|---------|------|---------------------------|
| Homepage hero | Confident, benefit-first | "Ganzheitliche Energiekonzepte für Ihr Zuhause" |
| Trust/credibility section | Direct, anti-sales-pitch | "Keine Vertriebsnummer, sondern echte Handwerkserfahrung" |
| Service descriptions | Concrete, specific to the craft | "Wir haben selbst jahrelang auf dem Dach gestanden, bevor wir Energiekonzepte geplant haben." |
| CTA | Low-friction, no pressure | "Kostenloses Erstgespräch" |

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Revolutionär | Overused in the solar industry, undermines "honest" |
| Bestpreis-Garantie / unschlagbar | Sales-gimmick language — exactly what NISO positions against |
| Marktführer (unless factually true) | Unverifiable superlative |
| Nahtlos / seamless | Generic marketing filler |
| Ganzheitlich — use sparingly | Already used once in the hero; don't let it become a crutch word repeated everywhere |

---

## 5. Imagery Guidelines

### Photography Style

- **Subjects:** Real jobsites, real roofs, real installs — not stock-photo solar panels against generic blue sky. If a person is in frame, it should read as someone who actually does the work.
- **Lighting:** Natural daylight, on-location — matches the "we've stood on the roof" credibility claim; studio-polish photography works against the brand.
- **Setting:** Recognizably Lower Saxony residential — house roofs typical of Hannover/Hildesheim/Braunschweig, not anonymous international stock houses.
- **Color treatment:** Let the red #CC010F carry accents (branding on vans, work clothes, UI overlays) rather than color-grading the photography itself.

### Icons (in-product, e.g. service cards)

- Style: Outlined/duotone, matches the Phosphor icon set already in use on the site (`@phosphor-icons/react`)
- Weight: Bold stroke, 24px base grid — consistent with current implementation
- Fill: Primary red on a soft accent-red background circle (already the pattern in `Services.tsx` / `TrustSection.tsx` — keep it)

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Generic solar-industry stock photography | Undermines the hands-on-craftsman positioning |
| Overly corporate/SaaS illustration style (flat gradients, abstract blobs) | Fights the heraldic, regional character of the mark |
| Cool/blue-toned "tech" color grading | NISO's whole visual identity is warm red, not cold blue — don't drift toward generic "green energy" cliché palettes |

---

## 6. Design Components

Matches what's already implemented in `src/app/globals.css` and components — documenting, not inventing:

### Buttons

| Type | Background | Text | Border Radius |
|------|------------|------|----------------|
| Primary | #CC010F | #FFFFFF | Full pill (9999px) |
| Secondary | Transparent, border | Foreground | Full pill (9999px) |

### Cards

| Element | Value |
|---------|-------|
| Background | #2E3138 (Card) |
| Border | rgba(248,249,250,0.1) |
| Border Radius | 16px (rounded-2xl) |
| Hover | Lift (-translate-y-1) + border tint toward primary/40 |

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | Full pill |
| Cards | 16px |
| Badges/Tags | Full pill |

---

## 7. AI Image Generation — Base Prompt Template

Prepend to any AI-generated visual for NISO (logo variants, social graphics, banners):

```
Warm, honest, hands-on residential solar/roofing brand in Lower Saxony, Germany.
Primary color #CC010F (red) on white or near-black (#111318), white and black secondary.
Natural daylight, real jobsite/roof photography feel — not glossy corporate stock.
Regional, heraldic undertone (references the Lower Saxony horse symbol) fused with solar/sun motifs.
Warm geometric sans typography (Poppins), never techy/cold/blue-toned "clean energy" cliché palettes.
```

### Visual Mood Descriptors

- Grounded, not flashy
- Regional pride, not generic-corporate
- Craftsman-honest, not sales-glossy
- Warm red + natural daylight, not cool blue "greentech"

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Blue/green "clean energy" cliché gradients | Fights the established red identity |
| Faceless corporate stock people | Undermines "company of the people" |
| Overly futuristic/sci-fi solar tech imagery | Wrong register — NISO sells trust and craft, not novelty |

---

## Open Items / Next Steps

- [ ] Produce the actual variant SVG set (Section 3) — icon-only, horizontal, reversed/white, single-color — from the current icon + Poppins wordmark
- [ ] Swap `GeistSans` → Poppins in `src/app/layout.tsx` / `globals.css` so the live site matches this document
- [ ] Decide whether "Dachsanierung" gets equal visual billing to the four energy services, or stays framed as prep-work (currently the latter, per `src/lib/content.ts`)
- [ ] Business card / letterhead using the finalized lockup

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-20 | Initial guidelines — colors/voice documented from live site, typography and logo usage decided this session |
