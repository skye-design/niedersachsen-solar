import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Impressum | ${site.name}`,
  description: "Impressum und Anbieterkennzeichnung von Niedersachsen Solar.",
  alternates: { canonical: "https://niedersachsen-solar.de/impressum" },
};

export default function Impressum() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 sm:px-6">
          <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Impressum" }]} />
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground">
            Impressum
          </h1>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="mt-3 text-foreground/80">
            Skye van Dyck Einzelunternehmen
            <br />
            Herrenhäuser Straße 64
            <br />
            30419 Hannover
            <br />
            Deutschland
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Kontakt
          </h2>
          <p className="mt-3 text-foreground/80">
            Telefon: {site.phone}
            <br />
            E-Mail: {site.email}
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p className="mt-3 text-foreground/80">
            Gemäß §27a Umsatzsteuergesetz: DE423180668
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-3 text-foreground/80">
            Skye van Dyck, Anschrift wie oben
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
