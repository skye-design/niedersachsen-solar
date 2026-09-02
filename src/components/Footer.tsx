import Image from "next/image";
import Link from "next/link";
import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { site, services } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col flex-wrap gap-8 sm:flex-row sm:justify-between">
          <div>
            <Image
              src="/brand/niso-logo-horizontal-light.svg"
              alt={site.name}
              width={200}
              height={48}
              className="h-9 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ganzheitliche Energiekonzepte für {site.serviceArea}, mit
              Schwerpunkt in {site.cities.join(", ")}.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {site.founderRole}: {site.founder}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm" aria-label="Leistungen">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                {service.title}
              </Link>
            ))}
            <Link href="/projekte" className="text-foreground/80 transition-colors hover:text-primary">
              Projekte
            </Link>
            <Link href="/ueber-uns" className="text-foreground/80 transition-colors hover:text-primary">
              Über uns
            </Link>
            <Link href="/ablauf" className="text-foreground/80 transition-colors hover:text-primary">
              Ablauf
            </Link>
            <Link href="/ratgeber" className="text-foreground/80 transition-colors hover:text-primary">
              Ratgeber
            </Link>
            <Link href="/kontakt" className="text-foreground/80 transition-colors hover:text-primary">
              Kontakt
            </Link>
          </nav>

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
            <p className="mt-1 text-xs text-muted-foreground">{site.hours}</p>
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
