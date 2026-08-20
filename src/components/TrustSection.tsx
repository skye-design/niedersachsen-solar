import { Wrench, ShieldCheck, Handshake } from "@phosphor-icons/react/dist/ssr";
import { trustPoints } from "@/lib/content";
import Reveal from "@/components/Reveal";

const icons = {
  toolbox: Wrench,
  "shield-check": ShieldCheck,
  handshake: Handshake,
};

export default function TrustSection() {
  return (
    <section id="warum-wir">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            Warum Niedersachsen Solar
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Keine Vertriebsnummer, sondern echte Handwerkserfahrung, ein
            geschlossenes Ökosystem und ein direkter Weg zur Finanzierung.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point, i) => {
            const Icon = icons[point.icon as keyof typeof icons];
            return (
              <Reveal key={point.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon size={24} weight="bold" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
