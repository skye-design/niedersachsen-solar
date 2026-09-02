"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";

type Faq = { question: string; answer: string };

// This is the site's FAQAccordion: a visible, keyboard-operable accordion
// whose FAQPage JSON-LD mirrors the rendered text exactly (never richer).
export default function FAQSection({
  faqs,
  title = "Häufige Fragen",
  id = "faq",
}: {
  faqs: Faq[];
  title?: string;
  id?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((faq, i) => {
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                  >
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <CaretDown
                      size={18}
                      weight="bold"
                      aria-hidden
                      className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-5"
                >
                  <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
