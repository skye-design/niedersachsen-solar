import Reveal from "@/components/Reveal";

type Faq = { question: string; answer: string };

export default function FAQSection({
  faqs,
  title = "Häufige Fragen",
  id = "faq",
}: {
  faqs: Faq[];
  title?: string;
  id?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id={id}>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-32">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
