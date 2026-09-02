import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { processSteps, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Ablauf | ${site.name}`,
  description: "Fünf Schritte vom Erstgespräch bis zur Inbetriebnahme — mit Ergebnis, benötigten Unterlagen und verantwortlicher Rolle je Schritt.",
  alternates: { canonical: "https://niedersachsen-solar.de/ablauf" },
};

export default function AblaufPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Ablauf" }]} />
              <h1 className="mt-3 font-heading text-4xl font-medium text-foreground sm:text-5xl">
                So läuft ein Projekt ab
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Fünf Schritte, die Unsicherheit aus dem Prozess nehmen sollen
                — nicht nur eine Zeitleiste. Zu jedem Schritt: was am Ende
                dabei herauskommt, welche Unterlagen nötig sind und wer
                verantwortlich ist.
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <ol className="space-y-6">
              {processSteps.map((item, i) => (
                <Reveal key={item.step} delay={i * 70}>
                  <li className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {String(item.step).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                    </div>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="font-semibold text-foreground/70">Ergebnis</dt>
                        <dd className="mt-1 text-muted-foreground">{item.result}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground/70">Unterlagen</dt>
                        <dd className="mt-1 text-muted-foreground">{item.documents}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground/70">Verantwortlich</dt>
                        <dd className="mt-1 text-muted-foreground">{item.responsible}</dd>
                      </div>
                    </dl>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
