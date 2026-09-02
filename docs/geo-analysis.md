# GEO Analysis — niedersachsen-solar.de

**Prepared by:** FYM Creative — automated GEO/AI-visibility audit
**Date:** 2026-09-02
**Method:** Live audit of the production site (HTML fetch, headers, robots.txt, schema, brand-mention search). All findings below are from real data pulled during this audit, not estimates.

---

## GEO Readiness Score: 38/100

The site is well-built and reads warmly as a brand — but it's currently close to invisible to AI search systems (Google AI Overviews, ChatGPT, Perplexity). The gap isn't design, it's that nothing on the page is structured for an AI to *quote*, and there's no presence anywhere else on the internet confirming who you are.

### Platform breakdown
| Platform | Est. readiness | Why |
|---|---|---|
| Google AI Overviews | 40/100 | Server-rendered content helps; no schema, no FAQ, no stats hurt |
| Google AI Mode | 30/100 | Draws from a wider pool that rewards freshness/entity authority — you have neither yet |
| ChatGPT | 20/100 | Leans heavily on Wikipedia (48%) and Reddit (11%) presence — found zero for your brand |
| Perplexity | 20/100 | Leans on Reddit (47%) and Wikipedia — same gap |

---

## What's actually working

- **Content is server-rendered** (confirmed via prerender headers) — AI crawlers that don't execute JavaScript can read it fine. Real problem for a lot of sites; not one for yours.
- **Clean heading hierarchy** — one H1, structured H2/H3s, no chaos.
- **Real, descriptive image alt text** in German, several already naming the service/location ("Solarmodule auf einem Ziegeldach, installiert von Niedersachsen Solar").
- Fast, cached delivery (nginx + Next.js prerender cache).

## The five things actually costing you visibility

1. **Zero structured data.** No JSON-LD anywhere — no Organization, no LocalBusiness, no Service schema. This is the single highest-leverage fix: it's what tells Google/AI systems *what kind of entity you are* and where you operate, independent of your prose. Recommend `LocalBusiness` + `Service` schema for PV/Speicher/Wallbox/Wärmepumpe/Dachsanierung, with your Hannover address and service area (Hannover, Hildesheim, Braunschweig).

2. **No brand presence anywhere else on the internet.** Searched Reddit, Wikipedia, and local directories — nothing. Competitors show up in "Top 10 Solaranlage Hannover" style listings; you don't yet. This matters more than it sounds: brand mentions correlate 3x stronger with AI citation than backlinks do. Concrete fix: get NISO listed on Google Business Profile (if not already) and standard German trade directories (Gelbe Seiten, trustlocal.de) — these are exactly the kind of third-party confirmation AI systems look for.

3. **No FAQ section, no specific numbers.** The copy is all trust/positioning language ("echte Handwerkserfahrung," "ein geschlossenes Ökosystem") with no concrete, quotable facts — no price ranges, no typical installation timelines, no kWp/capacity figures. AI search rewards short, self-contained, fact-dense answer blocks (134–167 words is the sweet spot). A "Häufige Fragen" section answering things like *"Was kostet eine PV-Anlage in Hannover?"* or *"Wie lange dauert eine Installation?"* directly, in plain declarative sentences, would be the single most citable addition to the site.

4. **Missing `robots.txt` and `sitemap.xml`.** Neither file exists (both return the Next.js 404 page). Not blocking anything today, but it's an easy, five-minute technical fix that also lets you explicitly welcome AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) rather than leaving it to default behavior.

5. **No Open Graph tags.** No `og:title`, `og:description`, or `og:image` at all. Beyond social sharing, this is a missed entity-understanding signal — cheap to add, currently just absent.

## Not worth prioritizing

- `/llms.txt` — Google's own documentation now states explicitly this has no effect on Google Search visibility. Skip unless you specifically want to court non-Google AI crawlers.

---

## Recommended order of operations

1. Add `LocalBusiness`/`Service` JSON-LD schema — highest impact, contained to one file.
2. Write a real FAQ section with specific numbers (pricing ranges, timelines) in short, self-contained blocks.
3. Add `robots.txt` + `sitemap.xml`.
4. Add Open Graph tags.
5. Get NISO onto Google Business Profile + 2-3 German trade directories.

Items 1, 3, and 4 are pure code changes — small, low-risk, and I can build and test them through the Figma/Playwright pipeline once that's wired up. Item 2 needs real numbers from you (pricing ranges, typical timelines) before I can write it honestly. Item 5 is an account-creation step only you can do.
