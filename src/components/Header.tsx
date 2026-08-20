"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, List, X } from "@phosphor-icons/react";
import { site } from "@/lib/content";

const navLinks = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#warum-wir", label: "Warum wir" },
  { href: "#projekte", label: "Projekte" },
  { href: "#angebot", label: "Kontakt" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-black/35 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#top" className="flex items-center" onClick={() => setIsOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/niso-logo-horizontal.svg"
            alt={site.name}
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary md:flex"
          >
            <Phone size={16} weight="fill" aria-hidden />
            {site.phone}
          </a>
          <Link
            href="#angebot"
            className="hidden cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
          >
            Angebot anfragen
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center text-foreground md:hidden"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile Navigation"
        className={`fixed right-0 left-0 overflow-y-auto bg-background transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "72px", height: "calc(100vh - 72px)" }}
      >
        <ul className="flex flex-col gap-0 px-6 py-6">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-border">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 text-lg font-medium text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={site.phoneHref}
          className="mx-6 mt-4 flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-base font-semibold text-foreground"
        >
          <Phone size={18} weight="fill" aria-hidden />
          {site.phone}
        </a>
      </nav>
    </header>
  );
}
