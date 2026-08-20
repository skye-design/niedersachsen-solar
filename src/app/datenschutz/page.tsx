import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 sm:px-6">
          <h1 className="font-heading text-3xl font-bold text-foreground">
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
            2. Erhebung und Verarbeitung von Daten
          </h2>
          <p className="mt-3 text-foreground/80">
            Wir verarbeiten personenbezogene Daten, die Sie uns über unser
            Angebotsformular freiwillig mitteilen (Name, Telefonnummer
            und/oder E-Mail-Adresse, Ort/PLZ, Angaben zu Ihrem Interesse an
            unseren Leistungen), ausschließlich zur Bearbeitung Ihrer Anfrage
            gemäß Art. 6 Abs. 1 lit. b DSGVO.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            3. Formularversand über Formspree
          </h2>
          <p className="mt-3 text-foreground/80">
            Zur technischen Zustellung des Angebotsformulars nutzen wir den
            Dienst Formspree (Formspree, Inc., USA). Die von Ihnen im
            Formular eingegebenen Daten werden dabei an Server von Formspree
            übertragen und von dort an unsere E-Mail-Adresse weitergeleitet.
            Weitere Informationen:{" "}
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
            4. Kontaktaufnahme
          </h2>
          <p className="mt-3 text-foreground/80">
            Bei Kontaktaufnahme per Formular, Telefon oder E-Mail werden Ihre
            Angaben zwecks Bearbeitung der Anfrage und für den Fall von
            Anschlussfragen gespeichert.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            5. Ihre Rechte
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/80">
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>

          <h2 className="mt-8 font-heading text-xl font-semibold text-foreground">
            6. Speicherdauer
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
