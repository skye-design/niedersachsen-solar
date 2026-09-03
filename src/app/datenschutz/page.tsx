import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Datenschutzerklärung | ${site.name}`,
  description: "Datenschutzerklärung von Niedersachsen Solar.",
  alternates: { canonical: "https://niedersachsen-solar.de/datenschutz" },
};

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 sm:px-6">
          <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Datenschutz" }]} />
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground">
            Datenschutzerklärung
          </h1>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            1. Verantwortlicher
          </h2>
          <p className="mt-3 text-foreground/80">
            Skye van Dyck
            <br />
            {site.name} (Einzelunternehmen)
            <br />
            Herrenhäuser Straße 64, 30419 Hannover
            <br />
            E-Mail: {site.email}
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            2. Hosting und Server-Logfiles
          </h2>
          <p className="mt-3 text-foreground/80">
            Beim Aufruf dieser Website erhebt unser Hosting-Provider
            automatisch technische Daten, die Ihr Browser übermittelt
            (IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite,
            Referrer-URL, Browsertyp und Betriebssystem). Diese Daten werden
            in Server-Logfiles gespeichert und dienen der technischen
            Bereitstellung und Absicherung der Website sowie der Behebung
            von Störungen. Rechtsgrundlage ist unser berechtigtes Interesse
            an einem sicheren und funktionsfähigen Betrieb der Website
            (Art. 6 Abs. 1 lit. f DSGVO).
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            3. Erhebung und Verarbeitung von Daten aus unseren Formularen
          </h2>
          <p className="mt-3 text-foreground/80">
            Wir verarbeiten personenbezogene Daten, die Sie uns freiwillig
            über das Angebotsformular, den Solar-Check oder eine Anfrage über
            den geführten Solar-Lotsen mitteilen (jeweils Name,
            Telefonnummer und/oder E-Mail-Adresse, Ort/PLZ sowie Angaben zu
            Ihrem Interesse an unseren Leistungen), ausschließlich zur
            Bearbeitung Ihrer Anfrage gemäß Art. 6 Abs. 1 lit. b DSGVO
            (vorvertragliche Maßnahmen). Der Solar-Lotse selbst ist
            regelbasiert und verarbeitet keine personenbezogenen Daten,
            solange Sie keine Anfrage darüber absenden.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            4. Formularversand über Formspree
          </h2>
          <p className="mt-3 text-foreground/80">
            Zur technischen Zustellung unserer Formulare nutzen wir den
            Dienst Formspree (Formspree, Inc., USA). Die von Ihnen
            eingegebenen Daten werden dabei an Server von Formspree
            übertragen und von dort an unsere E-Mail-Adresse weitergeleitet.
            Da Formspree in den USA ansässig ist, findet eine Übermittlung
            personenbezogener Daten in ein Land außerhalb der EU/des EWR
            statt (sogenanntes Drittland). Diese Übermittlung erfolgt auf
            Grundlage geeigneter Garantien im Sinne von Art. 44 ff. DSGVO
            (z. B. EU-Standardvertragsklauseln oder eine Zertifizierung
            von Formspree nach dem EU-U.S. Data Privacy Framework). Weitere
            Informationen:{" "}
            <a
              href="https://formspree.io/legal/privacy-policy/"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2"
            >
              Datenschutzerklärung von Formspree
            </a>
            .
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            5. Kontaktaufnahme
          </h2>
          <p className="mt-3 text-foreground/80">
            Bei Kontaktaufnahme per Formular, Telefon oder E-Mail werden Ihre
            Angaben zwecks Bearbeitung der Anfrage und für den Fall von
            Anschlussfragen gespeichert.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            6. Ihre Rechte
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/80">
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>
              Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77
              DSGVO), z. B. bei der Landesbeauftragten für den Datenschutz
              Niedersachsen
            </li>
          </ul>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            7. Speicherdauer
          </h2>
          <p className="mt-3 text-foreground/80">
            Wir speichern personenbezogene Daten nur so lange, wie es für die
            Bearbeitung Ihrer Anfrage oder zur Erfüllung gesetzlicher
            Aufbewahrungspflichten erforderlich ist.
          </p>

          <p className="mt-8 text-xs text-muted-foreground">
            Hinweis: Sobald Analyse- oder Werbedienste (z. B. Google
            Analytics, Google Ads) auf dieser Seite eingebunden werden, wird
            diese Erklärung entsprechend ergänzt.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
