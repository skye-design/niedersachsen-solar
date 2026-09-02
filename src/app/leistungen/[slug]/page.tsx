import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import FAQSection from "@/components/FAQSection";
import Reveal from "@/components/Reveal";
import { services, site } from "@/lib/content";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const url = `https://niedersachsen-solar.de/leistungen/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: site.name,
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} | ${site.name}`,
    description: service.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://niedersachsen-solar.de/#business",
      name: site.name,
    },
    areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://niedersachsen-solar.de" },
      { "@type": "ListItem", position: 2, name: "Leistungen", item: "https://niedersachsen-solar.de/#leistungen" },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://niedersachsen-solar.de/leistungen/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">
                  Startseite
                </Link>{" "}
                / <span className="text-foreground">{service.title}</span>
              </nav>
              <p className="mt-4 text-sm font-semibold tracking-wide text-primary uppercase">
                {site.cities.join(" · ")}
              </p>
              <h1 className="mt-3 font-serif text-4xl font-medium text-foreground sm:text-5xl">
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

        <QuoteSection />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
