import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { proofClaims, site } from "@/lib/content";

// RESTORED 2026-09-03: founder name and statewide service area
// (contentGates.founderAndAddressInMarketing / .statewideServiceArea, both
// "Ja"). Note: does not use the phrase "keine Vertriebsnummer" — that
// specific line was explicitly rejected in the proof-claims table, even
// though the founder-experience claim itself was confirmed.
export const metadata: Metadata = {
  title: `Über uns | ${site.name}`,
  description: `${site.founderRole} ${site.founder} plant ganzheitliche Energiekonzepte für ${site.serviceArea}, mit praktischer Installationserfahrung.`,
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
                in {site.serviceArea}, praktisch gedacht, verständlich
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
              {/* RESTORED 2026-09-03 (contentGates.founderAndAddressInMarketing,
                  "Ja"). "Keine Vertriebsnummer" specifically was rejected in
                  the proof-claims table — not used here even though the
                  founder-experience claim itself is confirmed. */}
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                {site.founderRole}: {site.founder}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Er hat selbst Photovoltaikanlagen installiert, bevor er
                begann, ganzheitliche Energiekonzepte zu planen. Die
                praktische Erfahrung vom Dach fließt in jede Planung ein.
              </p>

              {/* 2026-09-03 (Skye): "praxiserfahrung" excluded here
                  specifically — its statement duplicates the heading + bio
                  paragraph directly above almost word for word, which also
                  repeated "Skye van Dyck" a third time on one page. Still
                  used as-is on the homepage (TrustSection), where it's the
                  only place that claim appears. */}
              <ul className="mt-8 space-y-4">
                {proofClaims
                  .filter((claim) => claim.state === "confirmed" && claim.id !== "praxiserfahrung")
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
                Wir sind im gesamten Bundesland {site.serviceArea} tätig, mit
                Schwerpunkt in und um {site.cities.join(", ")}. Sie erreichen
                uns persönlich {site.hours}.
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
