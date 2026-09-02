import type { Metadata } from "next";
import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import SolarCheck from "@/components/SolarCheck";
import { site } from "@/lib/content";

// 2026-09-02: description no longer states opening hours — gated
// (contentGates.openingHours in content.ts) pending owner confirmation.
export const metadata: Metadata = {
  title: `Kontakt | ${site.name}`,
  description: `Erreichen Sie ${site.name} telefonisch, per E-Mail oder über den Solar-Check.`,
  alternates: { canonical: "https://niedersachsen-solar.de/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Kontakt" }]} />
              <h1 className="mt-3 font-heading text-4xl font-medium text-foreground sm:text-5xl">
                Sprechen Sie mit uns
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Ein kostenloses, unverbindliches Erstgespräch genügt, um zu
                klären, welches Energiekonzept zu Ihrem Haus passt.
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal className="space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 font-medium text-foreground transition-colors hover:border-primary/40"
              >
                <Phone size={20} weight="fill" className="text-primary" aria-hidden />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 font-medium text-foreground transition-colors hover:border-primary/40"
              >
                <EnvelopeSimple size={20} weight="fill" className="text-primary" aria-hidden />
                {site.email}
              </a>
              {/* 2026-09-02: opening hours and the full business address were
                  removed here — both gated (contentGates.openingHours /
                  .founderAndAddressInMarketing in content.ts) pending owner
                  confirmation. The address itself is already public on
                  /impressum (legally required, not a marketing claim); this
                  page just doesn't repeat it until confirmed for this
                  context too. */}
              <p className="text-sm text-muted-foreground">
                Tätig in und um {site.cities.join(", ")}.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <SolarCheck />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
