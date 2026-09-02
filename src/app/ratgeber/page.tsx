import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { knowledgeArticles, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Ratgeber | ${site.name}`,
  description: "Fachlich belegte Antworten auf konkrete Fragen zu Photovoltaik, Speicher, Wallbox und Wärmepumpe.",
  alternates: { canonical: "https://niedersachsen-solar.de/ratgeber" },
};

export default function RatgeberIndexPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Ratgeber" }]} />
              <h1 className="mt-3 font-heading text-4xl font-medium text-foreground sm:text-5xl">
                Ratgeber
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Fragen, die sich wirklich stellen — beantwortet aus
                praktischer Erfahrung, nicht als generischer Blogbeitrag.
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
            <div className="space-y-4">
              {knowledgeArticles.map((article, i) => (
                <Reveal key={article.slug} delay={i * 70}>
                  <Link
                    href={`/ratgeber/${article.slug}`}
                    className="group block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                  >
                    <h2 className="text-lg font-semibold text-foreground">{article.title}</h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{article.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Weiterlesen
                      <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
