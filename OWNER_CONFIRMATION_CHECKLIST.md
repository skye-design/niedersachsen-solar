# Owner Confirmation Checklist

Neun Aussagekategorien wurden am 2026-09-02 als unbestätigt eingestuft und
aus öffentlichem Rendering, JSON-LD und den Antworten des geführten
Solar-Lotsen entfernt (siehe `src/lib/content.ts`, `contentGates`-Objekt,
und die einzelnen `GATED (...)`-Kommentare im Code). Für jeden Punkt: **Ja**
= wieder veröffentlichen wie vorher, **Nein** = draußen lassen, **Korrektur**
= mit dem korrigierten Wert wieder veröffentlichen. Bitte direkt in dieser
Datei beantworten oder die Antworten zurückmelden.

---

## 1. Preisbereiche (PV, Speicher, Wallbox, Wärmepumpe)

**Was entfernt wurde:** Preis-FAQs auf allen vier Leistungsseiten sowie der
zusammenfassenden FAQ auf der Startseite (6.000–35.000 € PV, 2.000–12.000 €
Speicher, 1.200–2.500 € Wallbox, 11.000–47.000 € Wärmepumpe).

**Kontext:** Diese Zahlen wurden im Verlauf dieses Projekts direkt von Skye
im Chat genannt (PV/Speicher/Wallbox eigene Angaben; Wärmepumpe aus
Finanztip.de, von Skye als Quelle akzeptiert). Es handelt sich nicht um
erfundene Platzhalter — die Frage ist nur, ob sie über diesen formalen
Freigabeprozess erneut bestätigt werden sollen, bevor sie live gehen.

**Antwort:** [ ] Ja  [ ] Nein  [ ] Korrektur: ___________

---

## 2. Förderhöhe und Förderberatung

**Was entfernt wurde:** Die Aussage "Der Staat bezuschusst Wärmepumpen mit
bis zu 80 % der Kosten" sowie die Formulierung, dass zu Fördermöglichkeiten
beraten wird — beides Teil der jetzt entfernten Wärmepumpen-Preis-FAQ.

**Antwort:** [ ] Ja  [ ] Nein  [ ] Korrektur: ___________

---

## 3. „Gesamtes Bundesland Niedersachsen"

**Was entfernt wurde:** `site.serviceArea` ("Niedersachsen") wird nirgends
mehr gerendert — weder sichtbar noch in JSON-LD (`areaServed` nutzt jetzt
ausschließlich die drei Städte). Betroffen: Footer, Startseiten-FAQ,
Über-uns, Kontakt, Projekte, Service-Seiten, Organization-Schema.

**Kontext:** Die drei Städte (Hannover, Hildesheim, Braunschweig) bestehen
bereits vor diesem Redesign und sind nicht Teil dieser Gate.

**Antwort:** [ ] Ja, gesamtes Niedersachsen bestätigt  [ ] Nein, nur die drei Städte  [ ] Korrektur (z. B. anderer Radius): ___________

---

## 4. „Rückruf innerhalb eines Werktags"

**Was entfernt wurde:** Die konkrete Zeitzusage in ConversionFinale,
QuoteSection, SolarCheck-Erfolgsmeldung, Solar-Lotse-Übergabe und der
Startseiten-FAQ. Übrig bleibt jeweils die neutrale Aussage „Wir melden uns
bei Ihnen" ohne Frist.

**Antwort:** [ ] Ja, 1 Werktag bestätigt  [ ] Nein  [ ] Korrektur (andere Frist): ___________

---

## 5. Öffnungszeiten

**Was entfernt wurde:** „Montag bis Freitag, 8–17 Uhr" — aus
`OpeningHoursSpecification` im JSON-LD, Footer, Kontaktseite. Die
gesamte FAQ „Wann sind Sie persönlich erreichbar?" wurde entfernt (sie
bestand nur aus dieser Aussage plus der Werktag-Zusage).

**Antwort:** [ ] Ja, wie oben bestätigt  [ ] Nein  [ ] Korrektur: ___________

---

## 6. EcoFlow-Exklusivität

**Was entfernt wurde:** Jede Aussage, die EcoFlow als Marke nennt oder
Exklusivität behauptet ("ausschließlich EcoFlow", "einziges Ökosystem",
FAQ „Warum nur EcoFlow?"). Übrig bleibt die funktionale Beschreibung eines
abgestimmten Speichersystems ohne Herstellernennung.

**Kontext:** Diese Aussage bestand bereits vor diesem Redesign — die
Exklusivitätsbehauptung speziell war aber nie über diesen Prozess bestätigt.

**Antwort:** [ ] Ja, EcoFlow-Exklusivität bestätigt  [ ] Nein  [ ] Korrektur: ___________

---

## 7. Cloover-Partnerschaft

**Was entfernt wurde:** Der Name „Cloover" — überall ersetzt durch
unbenannte „Finanzierungspartner"-Formulierung.

**Kontext:** Anders als die anderen Punkte ist dies eine im Zuge dieses
Redesigns neu eingeführte, namentliche Behauptung — vorher stand nur generisch
„Finanzierungspartner" ohne Namen.

**Antwort:** [ ] Ja, Cloover bestätigt  [ ] Nein  [ ] Korrektur (anderer Partner): ___________

---

## 8. Gründerrolle/Name und vollständige Geschäftsadresse (Marketing-Kontext)

**Was entfernt wurde:** Name und Rolle des Gründers sowie die volle Adresse
aus JSON-LD (`Organization`-Schema), der Über-uns-Seite (Überschrift +
Fließtext) und der Kontaktseite (Adress-Kachel). **Nicht angefasst:**
Impressum und Datenschutzerklärung — dort ist Name/Adresse gesetzlich
vorgeschrieben (§5 TMG), das Entfernen wäre ein Compliance-Problem, keine
Vorsichtsmaßnahme.

**Kontext:** Das ist vermutlich der schnellste Punkt auf dieser Liste — es
ist Skyes eigener Name und die bereits im Impressum öffentliche Adresse,
keine unabhängig zu prüfende Drittangabe.

**Antwort:** [ ] Ja, Name/Adresse auch in Marketing/JSON-LD bestätigt  [ ] Nein  [ ] Korrektur: ___________

---

## 9. „Zertifizierte" Partnerbetriebe und Eigen-/Partnerleistungsgrenzen

**Was entfernt wurde:** Bei Dachsanierung und Wärmepumpe: alle Aussagen zu
„zertifizierten" Partnerbetrieben, Netzwerk-Formulierungen, und wer die
Leistung konkret ausführt. Beide Leistungsseiten sind dadurch spürbar
kürzer geworden (siehe Vorher/Nachher im Abschlussbericht) — die
`responsibility`-Felder in `content.ts` (`"partner-coordinated"` bzw.
`"in-house"`) sind nicht gerendert, bleiben aber im Datenmodell für später.

**Antwort:** [ ] Ja, wie vorher bestätigt  [ ] Nein  [ ] Korrektur (z. B. andere Formulierung ohne „zertifiziert"): ___________

---

## Nach der Beantwortung

Sobald diese Datei beantwortet zurückkommt, werden die bestätigten Punkte in
`src/lib/content.ts` wieder eingetragen (mit `state: "confirmed"` bzw. durch
Entfernen der `GATED`-Kommentare) und die betroffenen Seiten/JSON-LD/den
Solar-Lotsen entsprechend aktualisiert — in einem eigenen, überschaubaren
Durchlauf, nicht rückwirkend automatisch.
