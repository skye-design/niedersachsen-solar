import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";

// Mobile-only fixed action bar. Height is set (not min-height'd) to
// --bottom-bar-height (globals.css) — the shared value every other fixed
// mobile element positions itself against. layout.tsx reserves matching
// space below page content so this never covers it.
export default function StickyMobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--bottom-bar-height)] border-t border-border bg-card/95 backdrop-blur-sm sm:hidden"
    >
      <Link
        href="/#solar-check"
        className="flex flex-1 items-center justify-center gap-2 px-4 text-sm font-semibold text-on-primary bg-primary"
      >
        Solar-Check starten
      </Link>
      <a
        href={site.phoneHref}
        aria-label={`Anrufen: ${site.phone}`}
        className="flex w-16 items-center justify-center border-l border-black/10 text-foreground"
      >
        <Phone size={20} weight="fill" aria-hidden />
      </a>
    </div>
  );
}
