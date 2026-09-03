import { ShieldCheck, Leaf, ChartLineUp, Percent } from "@phosphor-icons/react/dist/ssr";
import { solarBenefits } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

const ICONS = {
  "shield-check": ShieldCheck,
  leaf: Leaf,
  "trend-up": ChartLineUp,
  percent: Percent,
} as const;

export default function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="max-w-2xl">
          <SignalTag index={3}>Vorteile</SignalTag>
          <h2 id="benefits-heading" className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Die Vorteile einer Solaranlage
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Was für eine eigene PV-Anlage spricht, unabhängig davon, bei wem
            Sie sie installieren lassen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {solarBenefits.map((benefit, i) => {
            const Icon = ICONS[benefit.icon as keyof typeof ICONS];
            return (
              <Reveal
                key={benefit.title}
                delay={i * 60}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <Icon size={28} weight="fill" className="text-primary" aria-hidden />
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{benefit.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
