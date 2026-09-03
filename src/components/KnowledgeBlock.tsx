import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { knowledgeArticles } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

export default function KnowledgeBlock() {
  return (
    <section aria-labelledby="knowledge-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SignalTag index={6}>Wissen</SignalTag>
            <h2 id="knowledge-heading" className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
              Fragen, die sich wirklich stellen
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {knowledgeArticles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 70}>
              <Link
                href={`/ratgeber/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <h3 className="text-lg leading-snug font-semibold text-foreground">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Weiterlesen
                  <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-8">
          <Link href="/ratgeber" className="text-sm font-semibold text-primary hover:underline">
            Alle Ratgeber-Beiträge ansehen →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
