import Link from "next/link";
import { MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";
import Reveal from "@/components/Reveal";
import HeroMedia from "@/components/HeroMedia";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            <MapPin size={14} weight="fill" aria-hidden />
            Hannover · Hildesheim · Braunschweig
          </p>

          <h1 className="font-serif text-5xl leading-[1.05] font-medium text-foreground sm:text-6xl lg:text-7xl">
            Ganzheitliche
            <br />
            Energiekonzepte
            <br />
            für Ihr Zuhause.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            PV-Anlage, Speicher, Wallbox und Wärmepumpe — geplant von Menschen,
            die selbst auf dem Dach gestanden haben. Ein Konzept, ein
            Ansprechpartner, ein System, das zusammenspielt.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#angebot"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-on-primary shadow-lg shadow-black/30 transition-transform active:scale-95 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Kostenloses Erstgespräch
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-foreground/25 bg-background/20 px-7 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
