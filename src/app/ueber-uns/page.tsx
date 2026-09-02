import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { proofClaims, site } from "@/lib/content";

// 2026-09-02: description no longer names the founder or the statewide
// service area — both gated (contentGates.founderAndAddressInMarketing /
// .statewideServiceArea in content.ts) pending explicit owner confirmation.
export const metadata: Metadata = {
  title: `Über uns | ${site.name}`,
  description: `${site.name} plant ganzheitliche Energiekonzepte für ${site.cities.join(", ")} — mit praktischer Installationserfahrung statt Vertriebsnummer.`,
  alternates: { canonical: "https://niedersachsen-solar.de/ueber-uns" },
};

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Über uns" }]} />
              <h1 className="mt-3 font-heading text-4xl font-medium text-foreground sm:text-5xl">
                Vom Dach in die Planung
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {site.name} plant ganzheitliche Energiekonzepte für Eigenheime
                in {site.cities.join(", ")} — praktisch gedacht, verständlich
                geplant und persönlich begleitet.
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border lg:aspect-auto">
              <Image
                src="/images/feature-v2.jpg"
                alt="Monteur bei der Installation von Solarmodulen auf einem Ziegeldach"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal delay={80}>
              {/* 2026-09-02: this section no longer names the founder — gated
                  (contentGates.founderAndAddressInMarketing) pending owner
                  confirmation. It's an odd trade-off for an "Über uns" page
                  specifically (the name is already public on /impressum,
                  and Skye is very likely the fastest checklist item to
                  confirm) — flagged prominently in the report rather than
                  worked around here. */}
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Praktische Erfahrung statt Vertriebsnummer
              </h2>

              <ul className="mt-4 space-y-4">
                {proofClaims
                  .filter((claim) => claim.state === "confirmed")
                  .map((claim) => (
                    <li key={claim.id} className="flex gap-3">
                      <CheckCircle
                        size={22}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <p className="leading-relaxed text-foreground/90">{claim.statement}</p>
                    </li>
                  ))}
              </ul>

              <p className="mt-8 leading-relaxed text-muted-foreground">
                Wir sind vor allem in und um {site.cities.join(", ")} tätig.
              </p>
            </Reveal>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
