import Link from "next/link";
import { MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";
import HeroMedia from "@/components/HeroMedia";
import EnergyPath, { type EnergyPathNode } from "@/components/EnergyPath";
import SignalTag from "@/components/SignalTag";

const heroNodes: EnergyPathNode[] = [
  { id: "dach", label: "Dach", icon: "dach" },
  { id: "sonne", label: "Sonne", icon: "sonne" },
  { id: "speicher", label: "Speicher", icon: "speicher" },
  { id: "waerme", label: "Wärme", icon: "waerme" },
  { id: "mobilitaet", label: "Mobilität", icon: "mobilitaet" },
];

export default function Hero() {
  return (
    // 2026-09-02: was `min-h-[92vh] items-end` — a single flex item pinned
    // to the bottom of a 92vh box. On short/narrow viewports (390x844) the
    // stacked content (eyebrow + wrapped H1 + wrapped subline + stacked
    // buttons + trust line + EnergyPath panel) can exceed that height, and
    // an end-anchored flex item that overflows its container grows
    // upward — pushing the eyebrow/H1 up behind the fixed transparent
    // header instead of scrolling the section itself. Fixed by an explicit
    // header-height spacer that's a flex sibling *before* the content, not
    // padding the content can be pushed through: the safe area is always
    // reserved regardless of how tall the content below it grows.
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent" />
      </div>

      {/* Header is 72px tall (Header.tsx); 88px leaves a visible margin
          rather than a flush edge. */}
      <div className="h-[88px] shrink-0" aria-hidden />

      <div className="relative flex flex-1 flex-col justify-end">
        {/* 2026-09-02: bottom padding on mobile now explicitly clears
            StickyMobileCTA (pb-16/64px left only ~4px margin against the
            bar's 60px height — the EnergyPath panel below sat right up
            against it on first load, before any scrolling). Derived from
            the same --bottom-bar-height variable + 16px breathing room,
            consistent with the Solar-Lotse launcher's offset. */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-[calc(var(--bottom-bar-height)+16px)] sm:px-6 sm:pb-20">
          {/* 2026-09-02: this content used to be wrapped in <Reveal>, which
              starts at opacity:0 until IntersectionObserver fires post-
              hydration — meaning no-JS visitors, slow hydration, and a
              screenshot/bot taken right after first paint all saw a blank
              hero. Above-the-fold content is visible on load by definition;
              there's no "scroll into view" moment to justify a reveal
              animation here in the first place. Below-the-fold sections
              keep Reveal (see Reveal.tsx for the separate no-JS fix
              applied there). */}
          {/* 2026-09-02 (Commit 2, Preview-Treue): thin measurement-line
              accent — a precision/technical flourish above the eyebrow,
              matching the "feine Messlinien" the preview calls for. Purely
              decorative, aria-hidden. */}
          <div className="mb-4 flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-px bg-primary/50" />
            <span className="h-px w-10 bg-primary/40" />
            <span className="h-2 w-px bg-primary/50" />
          </div>

          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            <MapPin size={14} weight="fill" aria-hidden />
            Hannover · Hildesheim · Braunschweig
          </p>

          <h1 className="max-w-2xl text-4xl leading-[1.1] font-semibold text-on-ink sm:text-5xl lg:text-6xl">
            Ihr Zuhause. Ein Energiesystem.
          </h1>

          {/* 2026-09-02: added a targeted gradient panel behind just this
              paragraph + the trust line below — not a global darkening of
              the image (that would fight the "keep the photo" brief) —
              because both use the muted/lighter text color and were hard
              to read over brighter video frames. */}
          <div className="relative mt-6 max-w-lg">
            <div className="absolute -inset-x-4 -inset-y-3 -z-10 rounded-2xl bg-gradient-to-b from-ink/55 via-ink/45 to-ink/55 blur-lg" />
            <p className="text-lg leading-relaxed text-on-ink-muted">
              Wir planen Photovoltaik, Speicher, Wallbox und Wärmepumpe als
              ein System — mit Erfahrung vom Dach und einem festen
              Ansprechpartner.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#solar-check"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-on-primary shadow-lg shadow-black/30 transition-transform active:scale-95 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Solar-Check starten
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-on-ink backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {site.phone}
            </a>
          </div>

          <div className="relative mt-6 inline-block">
            <div className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-xl bg-ink/50 blur-md" />
            <p className="text-sm font-medium text-on-ink-muted">
              Persönlich beraten · Regional geplant · Ohne Verkaufsdruck
            </p>
          </div>

          <div className="mt-10 max-w-2xl rounded-2xl border border-ink-border bg-ink-alt/40 p-5 backdrop-blur-sm sm:mt-12">
            {/* 2026-09-02 (Commit 2): compact energy-path label, matching
                the SolarCheck's own "SCHRITT X VON Y" mono-data styling
                for consistency (font-data, tracked-out, uppercase) rather
                than inventing a new label convention. */}
            <p className="font-data mb-4 text-xs tracking-[0.15em] text-on-ink-muted uppercase">
              Ihr Energiepfad <span className="text-primary">· 01/05</span>
            </p>
            <EnergyPath nodes={heroNodes} compact dark />
          </div>

          {/* 2026-09-02 (Commit 2): transition preview into the next
              section (TrustSection, id="warum-wir") — reuses the existing
              SignalTag component (already the site's "red signal marker"
              pattern, see TrustSection.tsx's own index={1} usage) rather
              than inventing a second marker style for the same concept. */}
          <a
            href="#warum-wir"
            className="mt-8 flex flex-wrap items-center gap-2 text-sm text-on-ink-muted transition-colors hover:text-on-ink"
          >
            <SignalTag index="01">Vertrauen</SignalTag>
            <span>— Vom Dach bis zur Inbetriebnahme.</span>
          </a>
        </div>
      </div>
    </section>
  );
}
