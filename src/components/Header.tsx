"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, List, X, CaretDown } from "@phosphor-icons/react";
import { services, site, brand } from "@/lib/content";

const solutionLinks = services.map((service) => ({
  href: service.route,
  label: service.title === "PV-Anlagen" ? "Photovoltaik" : service.title,
}));

const navLinks = [
  { href: "/projekte", label: "Projekte" },
  { href: "/ablauf", label: "Ablauf" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/ueber-uns", label: "Über uns" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 2026-09-02: found during verification — the mobile drawer had no
  // Escape handler at all (desktop's Lösungen dropdown didn't either, so
  // both get it here).
  useEffect(() => {
    if (!isOpen && !isSolutionsOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsSolutionsOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isSolutionsOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          {/* 2026-09-03: header is always solid/white now (Skye: no
              transparent-over-hero state), so only the light-background
              logo variant is ever shown — see git history for the
              previous scroll-triggered cross-fade with logoOnDark. */}
          <span className="relative block h-9 aspect-[541.2/106] sm:h-10">
            <Image
              src={brand.logoOnLight}
              alt={site.name}
              fill
              priority
              className="object-contain"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          <div
            className="group relative"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={isSolutionsOpen}
              aria-haspopup="true"
              onClick={() => setIsSolutionsOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Lösungen
              <CaretDown size={14} weight="bold" aria-hidden />
            </button>
            {isSolutionsOpen && (
              <div className="absolute top-full left-0 pt-3">
                <div className="w-56 rounded-2xl border border-border bg-card p-2 shadow-lg">
                  {solutionLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSolutionsOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-background-alt hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary lg:flex"
          >
            <Phone size={16} weight="fill" aria-hidden />
            {site.phone}
          </a>
          <Link
            href="/#solar-check"
            className="hidden cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
          >
            Solar-Check starten
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile Navigation"
        inert={!isOpen}
        className={`fixed right-0 left-0 overflow-y-auto bg-background transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "72px", height: "calc(100vh - 72px)" }}
      >
        <div className="flex flex-col gap-3 px-6 py-6">
          <Link
            href="/#solar-check"
            onClick={() => setIsOpen(false)}
            className="flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-on-primary"
          >
            Solar-Check starten
          </Link>
          <a
            href={site.phoneHref}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-base font-semibold text-foreground"
          >
            <Phone size={18} weight="fill" aria-hidden />
            Direkt anrufen
          </a>
        </div>

        <ul className="flex flex-col gap-0 px-6">
          {[...solutionLinks, ...navLinks].map((link) => (
            <li key={link.href} className="border-b border-border">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block min-h-[44px] py-3.5 text-lg font-medium text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
