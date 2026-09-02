import Link from "next/link";
import { House, Sun, BatteryFull, Plug, Thermometer, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/content";
import Reveal from "@/components/Reveal";

const icons = {
  house: House,
  sun: Sun,
  battery: BatteryFull,
  plug: Plug,
  thermometer: Thermometer,
};

export default function Services() {
  return (
    <section id="leistungen">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            Ihr Energiekonzept aus einer Hand
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Fünf Bausteine, ein durchdachtes System.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            const isPartnered = service.icon === "thermometer" || service.icon === "house";
            return (
              <Reveal key={service.title} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={24} weight="bold" aria-hidden />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    {isPartnered && (
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                        Mit zertifiziertem Fachpartner
                      </span>
                    )}
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Mehr erfahren
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform group-hover/link:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
