import { processSteps } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

export default function Process() {
  return (
    <section id="ablauf" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="max-w-2xl">
          <SignalTag index={5}>Ablauf</SignalTag>
          <h2 id="process-heading" className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Fünf Schritte, keine Überraschungen
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 70}>
              <li className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <span className="font-data text-sm text-primary">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground/70">Ergebnis</dt>
                    <dd className="mt-0.5 leading-snug text-muted-foreground">{step.result}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground/70">Unterlagen</dt>
                    <dd className="mt-0.5 leading-snug text-muted-foreground">{step.documents}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground/70">Verantwortlich</dt>
                    <dd className="mt-0.5 leading-snug text-muted-foreground">{step.responsible}</dd>
                  </div>
                </dl>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
