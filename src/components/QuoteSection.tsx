import Image from "next/image";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function QuoteSection() {
  return (
    <section id="angebot">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-32 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            Lassen Sie uns Ihr Energiekonzept besprechen
          </h2>
          {/* RESTORED 2026-09-03 (contentGates.oneBusinessDayCallback, "Ja"). */}
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            Unverbindlich, persönlich, ohne Verkaufsdruck. Wir melden uns
            innerhalb eines Werktags bei Ihnen.
          </p>

          <div className="relative mt-8 hidden aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border sm:block">
            <Image
              src="/images/feature-v2.jpg"
              alt="Solarmodule auf einem Ziegeldach, installiert von Niedersachsen Solar"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8 space-y-4">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:border-primary"
            >
              <Phone size={20} weight="fill" className="text-primary" aria-hidden />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:border-primary"
            >
              <EnvelopeSimple size={20} weight="fill" className="text-primary" aria-hidden />
              {site.email}
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 font-medium text-foreground">
              <MapPin size={20} weight="fill" className="text-primary" aria-hidden />
              {site.cities.join(" · ")}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
