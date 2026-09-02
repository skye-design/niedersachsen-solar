import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { knowledgeArticles, services, site } from "@/lib/content";

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = knowledgeArticles.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `https://niedersachsen-solar.de/ratgeber/${article.slug}`;
  return {
    title: `${article.title} | ${site.name}`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: site.name,
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function RatgeberArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = knowledgeArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedService = services.find((s) => s.slug === article.relatedService);

  const url = `https://niedersachsen-solar.de/ratgeber/${article.slug}`;
  // NOTE: datePublished/dateModified use this content's authoring date
  // (content-model commit), not a real go-live date since this branch isn't
  // deployed yet. Confirm/update once the article actually goes live —
  // flagged as an open item in the Paket D report.
  const articleDate = "2026-09-02";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: articleDate,
    dateModified: articleDate,
    author: { "@type": "Person", name: site.founder },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: "https://niedersachsen-solar.de/brand/niso-logo-horizontal-light.svg",
      },
    },
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
                  { label: "Ratgeber", href: "/ratgeber" },
                  { label: article.title },
                ]}
              />
              <h1 className="mt-3 font-heading text-3xl font-medium text-foreground sm:text-4xl">
                {article.title}
              </h1>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              {article.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 40}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {relatedService && (
              <Reveal delay={200} className="mt-12">
                <Link
                  href={relatedService.route}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
                >
                  Mehr zu {relatedService.title}
                  <ArrowRight size={16} weight="bold" className="text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Reveal>
            )}
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
