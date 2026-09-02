import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { projectTeasers, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Projekte | ${site.name}`,
  description: `Photovoltaik-Installationen aus ${site.serviceArea}, mit Schwerpunkt in ${site.cities.join(", ")}.`,
  alternates: { canonical: "https://niedersachsen-solar.de/projekte" },
};

export default function ProjektePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Projekte" }]} />
              <h1 className="mt-3 font-heading text-4xl font-medium text-foreground sm:text-5xl">
                Installationen aus {site.serviceArea}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Ein Ausschnitt realer Anlagen, mit Schwerpunkt in und um{" "}
                {site.cities.join(", ")}. Ausführliche Fallstudien zu einzelnen
                Projekten — Ausgangslage, Systemumfang, Lösung — folgen hier,
                sobald sie mit den jeweiligen Eigentümern abgestimmt sind.
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectTeasers.map((project, i) => (
                <Reveal
                  key={project.src}
                  delay={i * 60}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
