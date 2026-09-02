import { knowledgeArticles } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

export default function KnowledgeBlock() {
  return (
    <section aria-labelledby="knowledge-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="max-w-2xl">
          <SignalTag index={5}>Wissen</SignalTag>
          <h2 id="knowledge-heading" className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Fragen, die sich wirklich stellen
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {knowledgeArticles.map((article, i) => (
            <Reveal key={article.title} delay={i * 70}>
              <article className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg leading-snug font-semibold text-foreground">
                  {article.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
