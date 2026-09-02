// Central content-model types (see handoff/02_CONTENT_MODEL.md).
// Business claims are never hardcoded directly into JSX — they flow through
// here with an explicit verification state so an unconfirmed number/promise
// can never quietly ship.
export type VerificationState = "confirmed" | "needs-owner-confirmation" | "internal-only";

export type Claim = {
  id: string;
  statement: string;
  source?: string;
  state: VerificationState;
};

// 2026-09-02 correction pass: nine claim categories were flagged as
// published without explicit owner confirmation (pricing, Förderung,
// statewide service area, 1-Werktag callback promise, opening hours,
// EcoFlow exclusivity, the Cloover partnership, founder/address in
// marketing/schema contexts, and "certified partner" + in-house/partner
// responsibility framing). Every one of those categories is gated here —
// nothing below renders, and nothing downstream (JSON-LD, Solar-Lotse
// answers) may reintroduce them — until OWNER_CONFIRMATION_CHECKLIST.md is
// answered. No replacement values were invented for any of them; where a
// claim was removed, the surrounding copy either drops the clause or falls
// back to a narrower fact that was already established before this
// redesign (e.g. the three named cities, which predate any of this work).
export const contentGates = {
  pricing: "needs-owner-confirmation",
  förderung: "needs-owner-confirmation",
  statewideServiceArea: "needs-owner-confirmation",
  oneBusinessDayCallback: "needs-owner-confirmation",
  openingHours: "needs-owner-confirmation",
  ecoflowExclusivity: "needs-owner-confirmation",
  clooverPartnership: "needs-owner-confirmation",
  founderAndAddressInMarketing: "needs-owner-confirmation",
  certifiedPartnersAndResponsibilityBoundaries: "needs-owner-confirmation",
} as const satisfies Record<string, VerificationState>;

// 2026-09-02 correction: the public/brand/niso-logo-*.svg set (light/dark/
// nav/stacked/vehicle/mono variants) came from the now-discarded Manus
// logo package and must not be used. No new logo is designed in this pass
// either. Until the Product Owner marks a real asset "approved", this is
// the one temporary fallback: the original file from the pre-redesign
// `main` branch, used identically everywhere (Header, Footer, JSON-LD,
// manifest) rather than each consumer picking its own path. It has no
// light/dark variants — the original site's header was uniformly dark, so
// only one version of the logo ever existed. This redesign's header can be
// opaque-on-light when scrolled, where this asset likely has weaker
// contrast than the discarded variant set did — a known, undecided
// tradeoff, not silently engineered around (e.g. with a CSS invert filter)
// — see the report / open question to the Product Owner.
export const brand = {
  logo: "/images/niso-logo-horizontal.svg",
};

export const site = {
  name: "Niedersachsen Solar",
  phone: "0511 95733515",
  phoneHref: "tel:+4951195733515",
  email: "kontakt@niedersachsen-solar.de",
  // Established before this redesign — safe to keep. The broader claim
  // below (serviceArea) is not.
  cities: ["Hannover", "Hildesheim", "Braunschweig"],
  // GATED (contentGates.statewideServiceArea): kept as a field for when it's
  // confirmed, but nothing reads this for rendering right now — every
  // consumer falls back to `cities`. Do not wire this back in without an
  // explicit "Ja" on the checklist.
  serviceArea: "Niedersachsen",
  // GATED (contentGates.founderAndAddressInMarketing): the name/address
  // themselves are legally required on /impressum and /datenschutz
  // (German TMG) and stay there untouched — that's a legal disclosure
  // obligation, not a marketing claim, and hiding it would be a compliance
  // problem, not a safer default. What's gated is using this in *marketing*
  // contexts (JSON-LD founder field, trust-section copy, JSON-LD address).
  founder: "Skye van Dyck",
  founderRole: "Gründer und Geschäftsführer",
  address: {
    street: "Herrenhäuser Straße 64",
    postalCode: "30419",
    city: "Hannover",
  },
  // GATED (contentGates.clooverPartnership): kept for when confirmed;
  // nothing currently renders this name. Generic "Finanzierungspartner"
  // (unnamed) is used in copy instead, matching what was already live
  // before this redesign.
  financingPartner: "Cloover",
  // GATED (contentGates.openingHours): kept for when confirmed; nothing
  // currently renders this.
  hours: "Montag bis Freitag, 8–17 Uhr",
};

export const services = [
  {
    slug: "dachsanierung",
    route: "/dachsanierung-photovoltaik",
    title: "Dachsanierung",
    userQuestion: "Muss ich erst mein Dach lösen, bevor eine PV-Anlage möglich ist?",
    // GATED (contentGates.certifiedPartnersAndResponsibilityBoundaries):
    // whether this is in-house or partner-executed, and any certification
    // claim about who executes it, is unconfirmed. Not read anywhere in
    // JSX today (verified), kept only as a data field for when confirmed.
    responsibility: "partner-coordinated" as const,
    description:
      "Bevor wir Module aufs Dach bringen, sorgen wir bei Bedarf dafür, dass der Untergrund stimmt — damit Ihre PV-Anlage am Ende auf einer soliden Basis steht.",
    icon: "house",
    metaTitle: "Dachsanierung vor der PV-Anlage | Niedersachsen Solar",
    metaDescription:
      "Dachsanierung abgestimmt auf Ihre Photovoltaik-Planung. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Eine Photovoltaikanlage ist nur so gut wie das Dach, auf dem sie steht. Wenn Ziegel, Dämmung oder Unterkonstruktion nicht mehr mitziehen, planen wir die Dachsanierung als festen Bestandteil Ihres Energiekonzepts — nicht als nachträgliches Problem.",
    benefits: [
      {
        title: "Ein Ansprechpartner für Ihr Projekt",
        description:
          "Wir denken Dacharbeiten und PV-Installation als ein Projekt — keine getrennten Baustellen, keine widersprüchlichen Zeitpläne.",
      },
      {
        title: "Auf die PV-Anlage abgestimmt",
        description:
          "Statik, Ausrichtung und Unterkonstruktion werden von Anfang an mit der geplanten Photovoltaikanlage zusammen gedacht, nicht getrennt bewertet.",
      },
    ],
    faqs: [
      {
        question: "Muss ich mein Dach vor einer PV-Anlage sanieren?",
        answer:
          "Nicht immer. Wir prüfen bei der Dachaufnahme den Zustand von Eindeckung, Dämmung und Unterkonstruktion und sagen Ihnen ehrlich, ob eine Sanierung nötig ist — oder ob Ihr Dach für die geplante Anlage bereits geeignet ist.",
      },
    ],
  },
  {
    slug: "pv-anlagen",
    route: "/photovoltaik",
    title: "PV-Anlagen",
    userQuestion: "Lohnt sich eine PV-Anlage für mein Dach?",
    responsibility: "in-house" as const,
    description:
      "Photovoltaik-Planung und -Installation aus einer Hand — von der Dachaufnahme bis zur Inbetriebnahme. Wir haben selbst jahrelang auf dem Dach gestanden, bevor wir Energiekonzepte geplant haben.",
    icon: "sun",
    metaTitle: "Photovoltaik-Anlagen für Hannover, Hildesheim & Braunschweig | Niedersachsen Solar",
    metaDescription:
      "PV-Anlagen von der Dachaufnahme bis zur Inbetriebnahme — geplant von Menschen, die selbst auf dem Dach gestanden haben. Photovoltaik für Hannover, Hildesheim und Braunschweig.",
    intro:
      "Eine Photovoltaikanlage ist eine Investition für Jahrzehnte. Wir planen sie so, wie wir sie selbst installieren würden: mit realistischer Ertragsplanung, sauberer Verkabelung und einer Auslegung, die zu Ihrem tatsächlichen Verbrauch passt — nicht zur größtmöglichen Rechnung.",
    benefits: [
      {
        title: "Praxiserfahrung statt Blaupause",
        description:
          "Bevor wir Anlagen geplant haben, haben wir sie installiert. Wir kennen die Details auf dem Dach, die auf dem Papier oft übersehen werden.",
      },
      {
        title: "Ertragsplanung nach Ihrem Verbrauch",
        description:
          "Die Anlagengröße richtet sich nach Ihrem realen Strombedarf und Ihrer Dachfläche, nicht nach einer Standardgröße.",
      },
      {
        title: "Ein Konzept mit Speicher, Wallbox, Wärmepumpe",
        description:
          "Ihre PV-Anlage wird von Anfang an so geplant, dass sie mit Speicher, Wallbox und Wärmepumpe zusammenspielt, statt später nachgerüstet zu werden.",
      },
    ],
    faqs: [
      {
        question: "Wie läuft die Planung einer PV-Anlage ab?",
        answer:
          "Wir beginnen mit einer Dachaufnahme vor Ort, klären Ausrichtung, Verschattung und Dachzustand, und legen die Anlage anhand Ihres tatsächlichen Stromverbrauchs aus. Danach erhalten Sie ein konkretes Angebot.",
      },
      {
        question: "Kann ich eine PV-Anlage mit Speicher, Wallbox und Wärmepumpe kombinieren?",
        answer:
          "Ja — das ist unser Kernprinzip. Wir planen PV-Anlage, Speicher, Wallbox und Wärmepumpe als ein zusammenhängendes System, damit die Komponenten optimal zusammenspielen statt isoliert zu funktionieren.",
      },
      // GATED (contentGates.pricing): "Was kostet eine PV-Anlage?" removed —
      // do not re-add a price range without an explicit "Ja" in
      // OWNER_CONFIRMATION_CHECKLIST.md.
    ],
  },
  {
    slug: "speicher",
    route: "/stromspeicher",
    title: "Speicher",
    userQuestion: "Wie viel von meinem eigenen Solarstrom kann ich wirklich selbst nutzen?",
    responsibility: "in-house" as const,
    // GATED (contentGates.ecoflowExclusivity): description/intro/benefits
    // below no longer assert exclusivity ("ausschließlich"/"einziges
    // Ökosystem") or name a specific vendor — only the functional claim
    // (a storage system that works with the rest of the setup) remains,
    // which doesn't depend on which manufacturer is confirmed.
    description:
      "Ein durchdachtes Speichersystem statt loser Einzelkomponenten, für maximale Unabhängigkeit vom Netz.",
    icon: "battery",
    metaTitle: "Batteriespeicher für Ihre PV-Anlage | Niedersachsen Solar",
    metaDescription:
      "Batteriespeicher abgestimmt auf Ihre PV-Anlage — für maximale Unabhängigkeit vom Netz. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Ein Speicher entscheidet, wie viel von Ihrem selbst erzeugten Solarstrom Sie tatsächlich nutzen, statt ihn für wenig Geld ins Netz einzuspeisen.",
    benefits: [
      {
        title: "Ein System statt Einzelteile",
        description:
          "Speicher, Wallbox und Steuerung sind für nahtloses Zusammenspiel konzipiert — keine Kompatibilitätsprobleme zwischen Komponenten.",
      },
      {
        title: "Maximale Unabhängigkeit vom Netz",
        description:
          "Der Speicher ist so ausgelegt, dass Sie den tagsüber erzeugten Solarstrom auch abends und nachts nutzen können.",
      },
      {
        title: "Erweiterbar mit Ihrem Energiekonzept",
        description:
          "Der Speicher wird von Anfang an im Zusammenspiel mit PV-Anlage, Wallbox und Wärmepumpe geplant.",
      },
    ],
    faqs: [
      {
        question: "Lohnt sich ein Speicher für jedes Haus?",
        answer:
          "Das hängt von Ihrem Verbrauchsprofil und Ihrer PV-Anlage ab. Wir bewerten das im persönlichen Gespräch anhand Ihrer tatsächlichen Verbrauchsdaten, statt pauschal einen Speicher zu empfehlen.",
      },
      // GATED (contentGates.pricing): "Was kostet ein Batteriespeicher?"
      // removed. GATED (contentGates.ecoflowExclusivity): "Warum nur
      // EcoFlow?" removed — both need owner confirmation.
    ],
  },
  {
    slug: "wallbox",
    route: "/wallbox",
    title: "Wallbox",
    userQuestion: "Wie lade ich mein E-Auto möglichst viel mit eigenem Solarstrom?",
    responsibility: "in-house" as const,
    description:
      "Ladeinfrastruktur für Ihr Elektrofahrzeug, intelligent mit Ihrer PV-Anlage verbunden — laden Sie mit selbst erzeugtem Strom.",
    icon: "plug",
    metaTitle: "Wallbox-Installation mit PV-Anbindung | Niedersachsen Solar",
    metaDescription:
      "Wallbox-Installation, intelligent mit Ihrer PV-Anlage verbunden — laden Sie Ihr Elektrofahrzeug mit selbst erzeugtem Solarstrom. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Eine Wallbox ohne Anbindung an Ihre PV-Anlage lädt einfach nur mit Netzstrom. Wir installieren sie so, dass sie mit Ihrer Solaranlage kommuniziert und bevorzugt dann lädt, wenn Sie selbst Strom erzeugen.",
    benefits: [
      {
        title: "Laden mit eigenem Solarstrom",
        description:
          "Die Wallbox ist intelligent mit Ihrer PV-Anlage verbunden und nutzt bevorzugt selbst erzeugten Strom statt teuren Netzstrom.",
      },
      {
        title: "Teil eines Gesamtsystems",
        description:
          "Wallbox, Speicher und PV-Anlage werden gemeinsam geplant, statt isoliert voneinander betrieben zu werden.",
      },
      {
        title: "Fachgerechte Elektroinstallation",
        description:
          "Anschluss und Absicherung erfolgen nach aktuellen Normen, mit Blick auf Ihre vorhandene Hausinstallation.",
      },
    ],
    faqs: [
      {
        question: "Kann ich eine Wallbox auch ohne PV-Anlage bekommen?",
        answer:
          "Ja, eine Wallbox lässt sich auch unabhängig installieren. Den größten Nutzen — Laden mit selbst erzeugtem Strom statt Netzstrom — entfaltet sie aber im Zusammenspiel mit einer PV-Anlage und einem Speicher.",
      },
      {
        question: "Wie wird die Wallbox mit der PV-Anlage verbunden?",
        answer:
          "Über eine gemeinsame Steuerung, die Erzeugung, Speicher und Ladevorgang aufeinander abstimmt, statt die Wallbox isoliert am Netz zu betreiben.",
      },
      // GATED (contentGates.pricing): "Was kostet eine Wallbox?" removed.
    ],
  },
  {
    slug: "waermepumpe",
    route: "/waermepumpe",
    title: "Wärmepumpe",
    userQuestion: "Passt eine Wärmepumpe zu meinem Dach und meiner PV-Anlage?",
    // GATED (contentGates.certifiedPartnersAndResponsibilityBoundaries):
    // see Dachsanierung's note above — same category, same gate.
    responsibility: "partner-coordinated" as const,
    description:
      "Als Teil Ihres Energiekonzepts stimmen wir die Wärmepumpen-Installation auf Ihre PV-Anlage und Ihren Speicher ab.",
    icon: "thermometer",
    metaTitle: "Wärmepumpe im Energiekonzept | Niedersachsen Solar",
    metaDescription:
      "Wärmepumpen-Installation abgestimmt auf Ihre PV-Anlage und Ihren Speicher. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Eine Wärmepumpe, die unabhängig von Ihrer PV-Anlage geplant wird, verschenkt Potenzial. Wir stimmen die Auslegung auf Ihre Solaranlage und Ihren Speicher ab.",
    benefits: [
      {
        title: "Abgestimmt auf PV-Anlage und Speicher",
        description:
          "Die Wärmepumpe wird so ausgelegt, dass sie bevorzugt dann läuft, wenn Ihre PV-Anlage Strom erzeugt.",
      },
      {
        title: "Ein Energiekonzept, ein Ansprechpartner",
        description:
          "Sie müssen nicht selbst zwischen Solarteur und Heizungsbauer vermitteln — wir übernehmen die Abstimmung.",
      },
    ],
    faqs: [
      {
        question: "Passt eine Wärmepumpe zu jedem Haus mit PV-Anlage?",
        answer:
          "Das hängt von Gebäudezustand, Dämmung und Heizlast ab. Wir klären das im persönlichen Gespräch, statt es pauschal zu versprechen.",
      },
      // GATED (contentGates.certifiedPartnersAndResponsibilityBoundaries):
      // "Installiert Niedersachsen Solar die Wärmepumpe selbst?" removed.
      // GATED (contentGates.pricing + contentGates.förderung): "Was kostet
      // eine Wärmepumpe?" removed — it asserted both a price range and a
      // specific Förderhöhe ("bis zu 80%").
    ],
  },
];

export type Service = (typeof services)[number];

export const trustPoints = [
  {
    title: "Vom Dach in die Planung",
    description:
      "Bevor wir Energiekonzepte entworfen haben, haben wir selbst PV-Anlagen installiert. Diese praktische Erfahrung fließt in jede Planung ein — wir kennen die Details, die auf dem Papier oft übersehen werden.",
    icon: "toolbox",
  },
  {
    title: "Ein durchdachtes System",
    description:
      "Wir setzen bewusst auf ein durchdachtes Zusammenspiel von Speicher, Wallbox und Steuerung statt beliebiger Einzelteile.",
    icon: "shield-check",
  },
  {
    title: "Direkter Zugang zur Finanzierung",
    description:
      "Über unseren Finanzierungspartner klären wir Ihre Optionen direkt und unkompliziert — ohne Umwege über mehrere Ansprechpartner.",
    icon: "handshake",
  },
];

// NOTE: Dachsanierung pricing intentionally has no range anywhere on the
// site — costs are too project-specific (roof condition/size) to give an
// honest range. Keep it "im Gespräch klären wir das" only.
//
// 2026-09-02: three entries removed from this array entirely rather than
// edited (region/cost/reachability) because every sentence in them asserted
// a gated claim (statewide area, pricing, Cloover, opening hours, the
// 1-business-day promise) with no safe remainder worth keeping as a
// standalone FAQ. See OWNER_CONFIRMATION_CHECKLIST.md.
export const generalFaqs = [
  {
    question: "In welchen Regionen ist Niedersachsen Solar tätig?",
    answer: `Wir planen und installieren Energiekonzepte in und um ${site.cities.join(", ")}.`,
  },
  {
    question: "Was unterscheidet Niedersachsen Solar von anderen Solarteuren?",
    answer:
      "Wir haben selbst jahrelang auf dem Dach gestanden, bevor wir Energiekonzepte geplant haben — diese praktische Erfahrung fließt in jede Planung ein.",
  },
  {
    question: "Bietet Niedersachsen Solar auch Dachsanierung und Wärmepumpen an?",
    answer:
      "Ja. PV-Anlagen und Speicher installieren wir selbst. Dachsanierung und Wärmepumpen-Installation stimmen wir so ab, dass alle Gewerke als ein Energiekonzept zusammenspielen.",
  },
  {
    question: "Wie läuft der erste Schritt ab?",
    answer:
      "Sie kontaktieren uns für ein kostenloses, unverbindliches Erstgespräch. Wir melden uns bei Ihnen und klären gemeinsam, welches Energiekonzept zu Ihrem Haus und Ihrem Verbrauch passt.",
  },
  {
    question: "Gibt es eine Finanzierungsmöglichkeit?",
    answer:
      "Ja, über unseren Finanzierungspartner klären wir Ihre Optionen direkt und unkompliziert, ohne Umwege über mehrere Ansprechpartner.",
  },
];

// Entscheidungseinstieg (Brief 6.2): five paths — PV, Speicher, Wallbox,
// Wärmepumpe, and Dach+PV combined into one card, each phrased as the
// visitor's real question rather than a bare product name.
export const decisionPaths = [
  {
    id: "pv",
    question: "Lohnt sich eine PV-Anlage für mein Dach?",
    label: "Photovoltaik",
    href: "/photovoltaik",
    accent: "primary" as const,
  },
  {
    id: "speicher",
    question: "Wie viel eigenen Solarstrom kann ich wirklich nutzen?",
    label: "Stromspeicher",
    href: "/stromspeicher",
    accent: "green" as const,
  },
  {
    id: "wallbox",
    question: "Wie lade ich mein E-Auto mit eigenem Strom?",
    label: "Wallbox",
    href: "/wallbox",
    accent: "amber" as const,
  },
  {
    id: "waermepumpe",
    question: "Passt eine Wärmepumpe zu meinem Haus?",
    label: "Wärmepumpe",
    href: "/waermepumpe",
    accent: "blue" as const,
  },
  {
    id: "dach-pv",
    question: "Muss ich erst mein Dach lösen, bevor PV möglich ist?",
    label: "Dach + PV",
    href: "/dachsanierung-photovoltaik",
    accent: "primary" as const,
  },
];

// Vertrauensabschnitt (Brief 6.3): each proof field carries its own
// verification state instead of being asserted as flat fact in JSX.
//
// 2026-09-02: the "ecoflow" and "finanzierung" claims previously here are
// removed, not just re-flagged — they asserted EcoFlow exclusivity and the
// named Cloover partnership respectively, both explicitly gated categories.
// "praxiserfahrung" stays confirmed: it's the founder's own hands-on
// background, already established before this redesign, not a new claim.
export const proofClaims: Claim[] = [
  {
    id: "praxiserfahrung",
    statement:
      "Der Gründer hat selbst PV-Anlagen installiert, bevor Energiekonzepte geplant wurden — diese praktische Erfahrung fließt in jede Planung ein.",
    state: "confirmed",
  },
];

// Prozess (Brief 6.5): five steps, each naming its result, the documents it
// needs, and who is responsible — reduces uncertainty instead of just
// showing a bare timeline.
// 2026-09-02: step 4's "responsible" no longer says "zertifizierte
// Fachpartner" (contentGates.certifiedPartnersAndResponsibilityBoundaries).
export const processSteps = [
  {
    step: 1,
    title: "Kennenlernen",
    result: "Sie wissen, ob ein Gesamtsystem für Ihr Haus sinnvoll ist.",
    documents: "Keine — ein kurzes Gespräch genügt.",
    responsible: "Niedersachsen Solar",
  },
  {
    step: 2,
    title: "Haus verstehen",
    result: "Dachzustand, Ausrichtung und Verbrauch sind erfasst.",
    documents: "Letzte Stromrechnung, Dachfotos falls vorhanden.",
    responsible: "Niedersachsen Solar",
  },
  {
    step: 3,
    title: "System planen",
    result: "Ein konkretes Angebot für PV, Speicher, Wallbox und/oder Wärmepumpe.",
    documents: "Keine weiteren Unterlagen nötig.",
    responsible: "Niedersachsen Solar",
  },
  {
    step: 4,
    title: "Sauber umsetzen",
    result: "PV-Anlage und Speicher sind installiert; Dach/Wärmepumpe koordiniert.",
    documents: "Zählerschrank-Zugang, ggf. Netzbetreiber-Anmeldung.",
    responsible: "Niedersachsen Solar",
  },
  {
    step: 5,
    title: "Gemeinsam in Betrieb nehmen",
    result: "Ihr System läuft, Sie wissen, wie Sie es bedienen.",
    documents: "Keine — Einweisung erfolgt vor Ort.",
    responsible: "Niedersachsen Solar",
  },
];

// Wissensblock (Brief 6.7): specific, practice-based teasers, now with a
// real /ratgeber/[slug] route behind each. Bodies expand on facts already
// confirmed elsewhere in this file (service descriptions/FAQs) rather than
// introducing new unconfirmed claims.
// 2026-09-02: "speicher-richtig-dimensionieren"'s closing paragraph
// (EcoFlow exclusivity) and "dach-vor-pv-sanieren"'s "zertifizierte
// Dachdecker-Partnerbetriebe" clause were both gated claims — removed, not
// reworded, since neither had a safe remainder worth padding out.
export const knowledgeArticles = [
  {
    slug: "dach-vor-pv-sanieren",
    title: "Wann sollte das Dach vor der PV-Anlage saniert werden?",
    excerpt:
      "Nicht jedes Dach braucht vorab eine Sanierung. Woran Sie erkennen, ob Ihre Eindeckung und Unterkonstruktion für eine PV-Anlage bereit sind — und wann sich eine Sanierung zuerst lohnt.",
    relatedService: "dachsanierung",
    body: [
      "Eine Photovoltaikanlage hält mehrere Jahrzehnte — deutlich länger als viele Dacheindeckungen. Wer eine Anlage auf ein Dach setzt, das in wenigen Jahren ohnehin saniert werden muss, verursacht doppelte Arbeit: Die Module müssen für die Dacharbeiten wieder abgebaut und neu montiert werden.",
      "Bei der Dachaufnahme prüfen wir deshalb drei Dinge, bevor wir eine PV-Anlage auslegen: den Zustand der Eindeckung (Alter, sichtbare Schäden, Undichtigkeiten), die Dämmung und die Tragfähigkeit der Unterkonstruktion. Erst wenn diese drei Punkte für die geplante Nutzungsdauer der Anlage tragen, macht eine Installation ohne vorherige Sanierung Sinn.",
      "Ist eine Sanierung nötig, planen wir sie als ein gemeinsames Projekt mit der PV-Installation, nicht als getrennte Baustelle mit eigenem Zeitplan. So entscheiden Statik, Ausrichtung und Unterkonstruktion der Dachsanierung von Anfang an mit, wie die Photovoltaikanlage später ausgelegt wird.",
      "Die ehrliche Antwort auf die Frage \"Muss ich sanieren?\" bekommen Sie erst nach einer Dachaufnahme vor Ort — pauschale Aussagen ohne Blick aufs Dach sind hier wenig wert.",
    ],
  },
  {
    slug: "speicher-richtig-dimensionieren",
    title: "Wie wird ein Speicher passend zum Verbrauch dimensioniert?",
    excerpt:
      "Ein zu kleiner Speicher verschenkt Eigenverbrauch, ein zu großer amortisiert sich schlechter. Wie Verbrauchsprofil und PV-Größe die richtige Kapazität bestimmen.",
    relatedService: "speicher",
    body: [
      "Ein Batteriespeicher hat eine einzige Aufgabe: den tagsüber erzeugten Solarstrom für den Verbrauch am Abend und in der Nacht verfügbar zu machen. Wie groß er dafür sein muss, hängt nicht von der PV-Anlage allein ab, sondern vom Zusammenspiel aus Erzeugung und tatsächlichem Verbrauch.",
      "Ein zu klein dimensionierter Speicher ist schnell voll und schickt überschüssigen Strom trotzdem für wenig Geld ins Netz — der eigentliche Vorteil des Speichers verpufft. Ein zu groß dimensionierter Speicher wird dagegen selten vollständig genutzt und verlängert die Amortisationszeit unnötig, ohne einen entsprechenden Zusatznutzen zu bringen.",
      "Wir bewerten die passende Kapazität deshalb anhand Ihrer tatsächlichen Verbrauchsdaten, nicht anhand einer Pauschalgröße pro Haushalt oder pro kWp Anlagenleistung. Das Ergebnis ist ein Speicher, der zu Ihrem Alltag passt — inklusive der Frage, ob und wann eine Wallbox oder Wärmepumpe später dazukommen soll, weil das die sinnvolle Kapazität ebenfalls verschiebt.",
    ],
  },
  {
    slug: "pv-ueberschussladen-alltag",
    title: "Was bedeutet PV-Überschussladen im Alltag?",
    excerpt:
      "Die Wallbox lädt bevorzugt dann, wenn Ihre PV-Anlage Strom erzeugt. Was das für Ladezeiten, Reichweite und Ihre Stromrechnung konkret bedeutet.",
    relatedService: "wallbox",
    body: [
      "Eine Wallbox ohne Anbindung an die PV-Anlage lädt einfach mit Netzstrom, unabhängig davon, ob gerade die Sonne scheint. Beim PV-Überschussladen ist das anders: Die Wallbox ist intelligent mit der PV-Anlage — und, sofern vorhanden, dem Speicher — verbunden und lädt bevorzugt dann, wenn Sie selbst Strom erzeugen.",
      "Im Alltag heißt das konkret: An einem sonnigen Tag lädt Ihr Elektrofahrzeug einen relevanten Teil seiner Reichweite mit selbst erzeugtem Strom, während Sie zu Hause sind oder arbeiten — ohne dass Sie den Ladevorgang manuell steuern müssen. An bewölkten Tagen oder wenn schnell geladen werden muss, greift die Steuerung auf Netzstrom zurück, damit Sie nicht auf Sonnenschein warten müssen, wenn es eilt.",
      "Für Ihre Stromrechnung bedeutet das: Jede Kilowattstunde, die Sie selbst erzeugt statt eingespeist oder aus dem Netz bezogen haben, spart doppelt — Sie zahlen keinen Netzstrompreis für diese Energie und verzichten nicht auf die (meist niedrigere) Einspeisevergütung dafür, weil der Strom ohnehin direkt genutzt wurde.",
      "Voraussetzung ist eine Wallbox, die mit Ihrer PV-Anlage kommuniziert, statt isoliert am Netz zu hängen — deshalb planen wir Wallbox, PV-Anlage und Speicher immer als ein System.",
    ],
  },
];

// Projekte aus der Region (Brief 6.6): the brief wants full case studies
// (region, starting point, system scope, challenge, solution). That data
// doesn't exist yet — only real photos do — so this renders as a lighter
// photo teaser rather than inventing case-study narrative. See report for
// the open question to the product owner.
export const projectTeasers = [
  {
    src: "/images/gallery/gallery-01-v2.jpg",
    alt: "Luftaufnahme einer großflächigen Photovoltaikanlage auf einem Gewerbedach",
  },
  {
    src: "/images/gallery/gallery-02-v2.jpg",
    alt: "PV-Module im Abendlicht auf einem Wohnhausdach",
  },
  {
    src: "/images/gallery/gallery-03-v2.jpg",
    alt: "Solarmodule auf einem Dachgaubendach in Niedersachsen",
  },
  {
    src: "/images/gallery/gallery-04-v2.jpg",
    alt: "PV-Anlage auf einem Reihenhaus mit Klinkerfassade",
  },
];
