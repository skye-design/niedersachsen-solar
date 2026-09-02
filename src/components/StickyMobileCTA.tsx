import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";

// Mobile-only fixed action bar. `main` gets bottom padding on mobile
// (see page.tsx) so this never covers the conversion-finale CTA.
export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-card/95 backdrop-blur-sm sm:hidden">
      <Link
        href="/#solar-check"
        className="flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-on-primary bg-primary min-h-[44px]"
      >
        Solar-Check starten
      </Link>
      <a
        href={site.phoneHref}
        aria-label={`Anrufen: ${site.phone}`}
        className="flex min-h-[44px] w-16 items-center justify-center border-l border-black/10 text-foreground"
      >
        <Phone size={20} weight="fill" aria-hidden />
      </a>
    </div>
  );
}
