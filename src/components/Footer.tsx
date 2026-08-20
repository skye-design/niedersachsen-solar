import Image from "next/image";
import Link from "next/link";
import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-header.png"
                alt=""
                width={32}
                height={33}
                className="h-7 w-auto"
              />
              <p className="font-heading text-lg font-bold text-foreground">
                Niedersachsen<span className="text-primary">Solar</span>
              </p>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ganzheitliche Energiekonzepte für {site.cities.join(", ")} und
              Umgebung.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
            >
              <Phone size={16} weight="fill" aria-hidden />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
            >
              <EnvelopeSimple size={16} weight="fill" aria-hidden />
              {site.email}
            </a>
          </div>

          <nav className="flex flex-col gap-2 text-sm" aria-label="Rechtliches">
            <Link href="/impressum" className="text-foreground/80 transition-colors hover:text-primary">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-foreground/80 transition-colors hover:text-primary">
              Datenschutz
            </Link>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
