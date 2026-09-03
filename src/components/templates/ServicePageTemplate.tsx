import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import FAQSection from "@/components/FAQSection";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { services, site, type Service } from "@/lib/content";

export default function ServicePageTemplate({ service }: { service: Service }) {
  const related = services.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} | ${site.name}`,
    description: service.metaDescription,
    provider: {
      "@id": "https://niedersachsen-solar.de/#organization",
    },
    // RESTORED 2026-09-03 (contentGates.statewideServiceArea, "Ja").
    areaServed: { "@type": "State", name: site.serviceArea },
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Breadcrumbs
                items={[
                  { label: "Startseite", href: "/" },
                  { label: service.title },
                ]}
              />
              <p className="mt-4 text-sm font-semibold tracking-wide text-primary uppercase">
                {site.serviceArea} · Schwerpunkt {site.cities.join(" · ")}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-medium text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {service.intro}
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <div className="space-y-6">
              {service.benefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={i * 80}>
                  <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                    <CheckCircle
                      size={24}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        {benefit.title}
                      </h2>
                      <p className="mt-1 leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FAQSection faqs={service.faqs} title={`Häufige Fragen zu ${service.title}`} />

        <section aria-labelledby="related-services-heading" className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h2 id="related-services-heading" className="text-2xl font-semibold text-foreground">
              Weitere Leistungen
            </h2>
            <p className="mt-2 text-muted-foreground">
              Wir planen {service.title} nie isoliert, sondern als Teil eines
              Gesamtkonzepts.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={r.route}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
                >
                  <span>
                    <span className="block font-semibold text-foreground">{r.title}</span>
                    <span className="text-sm text-muted-foreground">{r.userQuestion}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
