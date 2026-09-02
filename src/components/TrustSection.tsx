import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { proofClaims } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

export default function TrustSection() {
  return (
    <section id="warum-wir">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border lg:aspect-auto">
          <Image
            src="/images/feature-v2.jpg"
            alt="Monteur bei der Installation von Solarmodulen auf einem Ziegeldach"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={80}>
          <SignalTag index={1}>Vertrauen</SignalTag>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Vom Dach in die Planung
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Keine Vertriebsnummer, sondern echte Handwerkserfahrung, ein
            geschlossenes Ökosystem und ein direkter Weg zur Finanzierung.
          </p>

          <ul className="mt-8 space-y-5">
            {proofClaims
              .filter((claim) => claim.state === "confirmed")
              .map((claim) => (
              <li key={claim.id} className="flex gap-3">
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden
                />
                <p className="leading-relaxed text-foreground/90">{claim.statement}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
