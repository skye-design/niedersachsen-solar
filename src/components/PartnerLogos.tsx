import Image from "next/image";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";
import { partners } from "@/lib/content";

// 2026-09-05: grayscale-until-hover is the standard "trusted brands" strip
// treatment, quiet by default so it doesn't compete with the section above,
// full color + a slight lift on hover confirms the card is a link out.
// Hover-gated to fine pointers (`hover: hover`) so tapping on mobile can't
// get stuck in the hover state; prefers-reduced-motion is already handled
// globally in globals.css (forces all transition-durations to ~0), so no
// separate reduced-motion override is needed here.
export default function PartnerLogos() {
  return (
    <section aria-labelledby="partners-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SignalTag index={2}>Partner</SignalTag>
          <h2 id="partners-heading" className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            Markenpartner, mit denen wir arbeiten
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 60}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} Website öffnen (neuer Tab)`}
                className="partner-logo flex h-28 items-center justify-center rounded-2xl border border-border bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-32 sm:p-5"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  unoptimized={partner.logo.endsWith(".svg")}
                  className="h-full w-full object-contain"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
