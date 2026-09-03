import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SolarCheck from "@/components/SolarCheck";

export default function ConversionFinale() {
  return (
    <section id="solar-check" className="bg-ink text-on-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="text-3xl font-semibold text-on-ink sm:text-4xl">
            Erzählen Sie uns zuerst nur von Ihrem Haus.
          </h2>
          {/* RESTORED 2026-09-03 (contentGates.oneBusinessDayCallback, "Ja"). */}
          <p className="mt-4 max-w-md text-lg leading-relaxed text-on-ink-muted">
            Der Solar-Check dauert wenige Minuten. Danach melden wir uns
            innerhalb eines Werktags persönlich bei Ihnen, ohne
            automatisierte Preiszusage.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 rounded-xl border border-ink-border bg-ink-alt px-4 py-3 font-medium text-on-ink transition-colors hover:border-primary"
            >
              <Phone size={20} weight="fill" className="text-primary" aria-hidden />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-xl border border-ink-border bg-ink-alt px-4 py-3 font-medium text-on-ink transition-colors hover:border-primary"
            >
              <EnvelopeSimple size={20} weight="fill" className="text-primary" aria-hidden />
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SolarCheck />
        </Reveal>
      </div>
    </section>
  );
}
