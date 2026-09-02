import Link from "next/link";
import { MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";
import Reveal from "@/components/Reveal";
import HeroMedia from "@/components/HeroMedia";
import EnergyPath, { type EnergyPathNode } from "@/components/EnergyPath";

const heroNodes: EnergyPathNode[] = [
  { id: "dach", label: "Dach", icon: "dach" },
  { id: "sonne", label: "Sonne", icon: "sonne" },
  { id: "speicher", label: "Speicher", icon: "speicher" },
  { id: "waerme", label: "Wärme", icon: "waerme" },
  { id: "mobilitaet", label: "Mobilität", icon: "mobilitaet" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            <MapPin size={14} weight="fill" aria-hidden />
            Hannover · Hildesheim · Braunschweig
          </p>

          <h1 className="max-w-2xl text-4xl leading-[1.1] font-semibold text-on-ink sm:text-5xl lg:text-6xl">
            Ihr Zuhause kann mehr Energie selbst übernehmen.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-ink-muted">
            Wir planen Photovoltaik, Speicher, Wallbox und Wärmepumpe als ein
            System — mit Erfahrung vom Dach und einem festen Ansprechpartner.
          </p>

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

          <p className="mt-6 text-sm font-medium text-on-ink-muted">
            Persönlich beraten · Regional geplant · Ohne Verkaufsdruck
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 max-w-2xl rounded-2xl border border-ink-border bg-ink-alt/40 p-5 backdrop-blur-sm sm:mt-12">
          <EnergyPath nodes={heroNodes} compact dark />
        </Reveal>
      </div>
    </section>
  );
}
