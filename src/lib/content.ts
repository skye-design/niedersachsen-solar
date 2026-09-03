// Central content-model types (see handoff/02_CONTENT_MODEL.md).
// Business claims are never hardcoded directly into JSX — they flow through
// here with an explicit verification state so an unconfirmed number/promise
// can never quietly ship.
export type VerificationState = "confirmed" | "needs-owner-confirmation" | "rejected" | "internal-only";

export type Claim = {
  id: string;
  statement: string;
  source?: string;
  state: VerificationState;
};

// 2026-09-02: nine claim categories were flagged as published without
// explicit owner confirmation and gated out of visible render/JSON-LD/the
// Solar-Lotse. 2026-09-03: the Product Owner answered
// OWNER_CONFIRMATION_CHECKLIST.md. Eight are now confirmed and restored
// throughout the codebase (see each file's own "RESTORED 2026-09-03"
// comment). One — EcoFlow exclusivity — was explicitly rejected: the site
// must never claim EcoFlow (or any vendor) as the exclusive/only system.
// The separately-approved "ein geschlossenes Ökosystem" framing (proof-
// claims table) describes system *integration*, not vendor exclusivity,
// and is used instead where relevant.
export const contentGates = {
  pricing: "confirmed",
  förderung: "confirmed",
  statewideServiceArea: "confirmed",
  oneBusinessDayCallback: "confirmed",
  openingHours: "confirmed",
  ecoflowExclusivity: "rejected",
  clooverPartnership: "confirmed",
  founderAndAddressInMarketing: "confirmed",
  certifiedPartnersAndResponsibilityBoundaries: "confirmed",
} as const satisfies Record<string, VerificationState>;

// 2026-09-02: the public/brand/niso-logo-*.svg set (from the discarded
// Manus logo package) has been deleted from the repo entirely, not just
// de-referenced. Two variants exist instead of one:
//   - logo-on-dark.svg: the original pre-redesign asset, unchanged, for
//     dark surfaces (transparent hero header).
//   - logo-on-light.svg: the *same* file with only the "Niedersachsen"
//     wordmark's fill recolored from #F8F9FA to #171A1D (the site's
//     --foreground token) for legibility on light surfaces (scrolled
//     header, mobile drawer, footer). This is a mechanical fill-color
//     swap on identical vector paths — verified via diff, zero geometry
//     changes — not a logo redesign.
// Both remain placeholders pending explicit Product Owner "approved"
// sign-off on the asset itself (separate from the content confirmations
// above — still open, not part of OWNER_CONFIRMATION_CHECKLIST.md).
export const brand = {
  logoOnDark: "/images/logo-on-dark.svg",
  logoOnLight: "/images/logo-on-light.svg",
};

export const site = {
  name: "Niedersachsen Solar",
  phone: "0511 95733515",
  phoneHref: "tel:+4951195733515",
  email: "kontakt@niedersachsen-solar.de",
  cities: ["Hannover", "Hildesheim", "Braunschweig"],
  // RESTORED 2026-09-03 (contentGates.statewideServiceArea, "Ja"): safe to
  // render again — city mentions stay too, as the named service hubs.
  serviceArea: "Niedersachsen",
  // RESTORED 2026-09-03 (contentGates.founderAndAddressInMarketing, "Ja"):
  // safe to use in marketing copy and JSON-LD again, not just the legally-
  // required /impressum and /datenschutz pages.
  founder: "Skye van Dyck",
  founderRole: "Gründer und Geschäftsführer",
  address: {
    street: "Herrenhäuser Straße 64",
    postalCode: "30419",
    city: "Hannover",
  },
  // RESTORED 2026-09-03 (contentGates.clooverPartnership, "Ja").
  financingPartner: "Cloover",
  // RESTORED 2026-09-03 (contentGates.openingHours, "Ja").
  hours: "Montag bis Freitag, 8–17 Uhr",
};

export const services = [
  {
    slug: "dachsanierung",
    route: "/dachsanierung-photovoltaik",
    title: "Dachsanierung",
    userQuestion: "Muss ich erst mein Dach lösen, bevor eine PV-Anlage möglich ist?",
    responsibility: "partner-coordinated" as const,
    // RESTORED 2026-09-03 (contentGates.certifiedPartnersAndResponsibilityBoundaries, "Ja").
    description:
      "Bevor wir Module aufs Dach bringen, sorgen wir bei Bedarf dafür, dass der Untergrund stimmt. Die Dachsanierung selbst führen zertifizierte Dachdecker-Partnerbetriebe aus unserem Netzwerk durch — koordiniert von uns, damit Ihre PV-Anlage am Ende auf einer soliden Basis steht.",
    icon: "house",
    metaTitle: "Dachsanierung vor der PV-Anlage | Niedersachsen Solar",
    metaDescription:
      "Dachsanierung koordiniert mit Ihrer Photovoltaik-Planung — durchgeführt von zertifizierten Dachdecker-Partnerbetrieben, abgestimmt auf Ihre PV-Anlage. Niedersachsen, mit Schwerpunkt Hannover, Hildesheim, Braunschweig.",
    intro:
      "Eine Photovoltaikanlage ist nur so gut wie das Dach, auf dem sie steht. Wenn Ziegel, Dämmung oder Unterkonstruktion nicht mehr mitziehen, planen wir die Dachsanierung als festen Bestandteil Ihres Energiekonzepts — nicht als nachträgliches Problem.",
    benefits: [
      {
        title: "Ein Ansprechpartner, zwei Gewerke",
        description:
          "Sie sprechen mit uns, wir koordinieren Dachdecker und PV-Installation als ein Projekt — keine getrennten Baustellen, keine widersprüchlichen Zeitpläne.",
      },
      {
        title: "Zertifizierte Partnerbetriebe",
        description:
          "Die Dachsanierung selbst führen geprüfte Dachdecker-Fachbetriebe aus unserem Netzwerk aus, nach Handwerksstandard und mit Gewährleistung.",
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
      {
        question: "Wer führt die Dachsanierung aus?",
        answer:
          "Die Sanierung selbst übernehmen zertifizierte Dachdecker-Partnerbetriebe aus unserem Netzwerk. Wir koordinieren den Ablauf, damit Dacharbeiten und PV-Installation nahtlos ineinandergreifen.",
      },
      // Pricing intentionally still absent here — too project-specific for
      // an honest range (roof condition/size vary too much). Unrelated to
      // the pricing confirmation, which covers PV/Speicher/Wallbox/Wärmepumpe.
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
      {
        // RESTORED 2026-09-03 (contentGates.pricing, "Ja").
        question: "Was kostet eine PV-Anlage?",
        answer:
          "Je nach Dachgröße und gewünschter Leistung liegen Photovoltaik-Anlagen meist zwischen 6.000 € und 35.000 € vor Förderung. Den genauen Preis für Ihr Dach ermitteln wir im kostenlosen Erstgespräch.",
      },
    ],
  },
  {
    slug: "speicher",
    route: "/stromspeicher",
    title: "Speicher",
    userQuestion: "Wie viel von meinem eigenen Solarstrom kann ich wirklich selbst nutzen?",
    responsibility: "in-house" as const,
    // NOT restored: EcoFlow exclusivity was explicitly rejected
    // (contentGates.ecoflowExclusivity, "Nein") — no vendor name, no
    // "ausschließlich/einziges" framing. "Ein geschlossenes Ökosystem" was
    // separately approved and used below instead — it describes
    // integration, not a single-vendor claim.
    description:
      "Ein geschlossenes Speicher-Ökosystem statt loser Einzelkomponenten, für maximale Unabhängigkeit vom Netz.",
    icon: "battery",
    metaTitle: "Batteriespeicher für Ihre PV-Anlage | Niedersachsen Solar",
    metaDescription:
      "Batteriespeicher abgestimmt auf Ihre PV-Anlage — für maximale Unabhängigkeit vom Netz. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Ein Speicher entscheidet, wie viel von Ihrem selbst erzeugten Solarstrom Sie tatsächlich nutzen, statt ihn für wenig Geld ins Netz einzuspeisen. Wir setzen auf ein geschlossenes Ökosystem statt beliebige Komponenten zu kombinieren.",
    benefits: [
      {
        title: "Ein geschlossenes System statt Einzelteile",
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
      {
        // RESTORED 2026-09-03 (contentGates.pricing, "Ja").
        question: "Was kostet ein Batteriespeicher?",
        answer:
          "Batteriespeicher kosten je nach Kapazität ab ca. 2.000 € bis 12.000 €. Im Erstgespräch klären wir, welche Speichergröße zu Ihrem Verbrauch und Ihrer PV-Anlage passt.",
      },
      // No "Warum nur EcoFlow?" FAQ — that question's premise (exclusivity)
      // was explicitly rejected, not just left unconfirmed.
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
          "Wallbox, Speicher und PV-Anlage stammen aus einem abgestimmten Ökosystem und werden gemeinsam geplant.",
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
      {
        // RESTORED 2026-09-03 (contentGates.pricing, "Ja").
        question: "Was kostet eine Wallbox inklusive Installation?",
        answer:
          "Eine Wallbox inklusive fachgerechter Installation kostet in der Regel zwischen 1.200 € und 2.500 €, abhängig vom Modell und dem Aufwand für die Elektroinstallation in Ihrem Haus.",
      },
    ],
  },
  {
    slug: "waermepumpe",
    route: "/waermepumpe",
    title: "Wärmepumpe",
    userQuestion: "Passt eine Wärmepumpe zu meinem Dach und meiner PV-Anlage?",
    responsibility: "partner-coordinated" as const,
    // RESTORED 2026-09-03 (contentGates.certifiedPartnersAndResponsibilityBoundaries, "Ja").
    description:
      "Als Teil Ihres Energiekonzepts koordinieren wir die Wärmepumpen-Installation über unser Netzwerk zertifizierter Heizungsbau-Fachpartner — abgestimmt auf Ihre PV-Anlage und Ihren Speicher.",
    icon: "thermometer",
    metaTitle: "Wärmepumpe im Energiekonzept | Niedersachsen Solar",
    metaDescription:
      "Wärmepumpen-Installation über zertifizierte Heizungsbau-Fachpartner, abgestimmt auf Ihre PV-Anlage und Ihren Speicher. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Eine Wärmepumpe, die unabhängig von Ihrer PV-Anlage geplant wird, verschenkt Potenzial. Wir koordinieren die Installation über zertifizierte Heizungsbau-Fachpartner und stimmen die Auslegung auf Ihre Solaranlage und Ihren Speicher ab.",
    benefits: [
      {
        title: "Abgestimmt auf PV-Anlage und Speicher",
        description:
          "Die Wärmepumpe wird so ausgelegt, dass sie bevorzugt dann läuft, wenn Ihre PV-Anlage Strom erzeugt.",
      },
      {
        title: "Zertifizierte Fachpartner",
        description:
          "Die Installation übernehmen geprüfte Heizungsbau-Betriebe aus unserem Partnernetzwerk, wir koordinieren die Schnittstelle zum Energiekonzept.",
      },
      {
        title: "Ein Energiekonzept, ein Ansprechpartner",
        description:
          "Sie müssen nicht selbst zwischen Solarteur und Heizungsbauer vermitteln — wir übernehmen die Abstimmung.",
      },
    ],
    faqs: [
      {
        question: "Installiert Niedersachsen Solar die Wärmepumpe selbst?",
        answer:
          "Die Installation führen zertifizierte Heizungsbau-Fachpartner aus unserem Netzwerk aus. Wir koordinieren die Planung, damit die Wärmepumpe zu Ihrer PV-Anlage und Ihrem Speicher passt.",
      },
      {
        question: "Passt eine Wärmepumpe zu jedem Haus mit PV-Anlage?",
        answer:
          "Das hängt von Gebäudezustand, Dämmung und Heizlast ab. Wir klären das gemeinsam mit unseren Heizungsbau-Partnern im persönlichen Gespräch, statt es pauschal zu versprechen.",
      },
      {
        // RESTORED 2026-09-03 (contentGates.pricing + contentGates.förderung, both "Ja").
        question: "Was kostet eine Wärmepumpe?",
        answer:
          "Die Gesamtkosten für eine Wärmepumpe — Anschaffung, Installation und Umfeldarbeiten — liegen laut Finanztip.de je nach System zwischen 11.000 € und 47.000 € vor Förderung. Der Staat bezuschusst Wärmepumpen mit bis zu 80 % der Kosten. Wir koordinieren die Installation über zertifizierte Heizungsbau-Fachpartner und beraten Sie zu den passenden Fördermöglichkeiten.",
      },
    ],
  },
];

export type Service = (typeof services)[number];

// RESTORED 2026-09-03: "Ein geschlossenes Ökosystem" (2nd point) and
// "Direkter Zugang zur Finanzierung" naming Cloover (3rd point) are both
// confirmed statements per the proof-claims table — see proofClaims below
// for the same two claims in Claim form.
export const trustPoints = [
  {
    title: "Vom Dach in die Planung",
    description:
      "Bevor wir Energiekonzepte entworfen haben, haben wir selbst PV-Anlagen installiert. Diese praktische Erfahrung fließt in jede Planung ein — wir kennen die Details, die auf dem Papier oft übersehen werden.",
    icon: "toolbox",
  },
  {
    title: "Ein geschlossenes Ökosystem",
    description:
      "Wir setzen bewusst auf ein geschlossenes, durchdachtes Ökosystem statt beliebiger Einzelteile — für nahtloses Zusammenspiel von Speicher, Wallbox und Steuerung.",
    icon: "shield-check",
  },
  {
    title: "Direkter Zugang zur Finanzierung",
    description:
      "Über unseren Finanzierungspartner Cloover klären wir Ihre Optionen direkt und unkompliziert — ohne Umwege über mehrere Ansprechpartner.",
    icon: "handshake",
  },
];

export const generalFaqs = [
  {
    // RESTORED 2026-09-03 (contentGates.statewideServiceArea, "Ja").
    question: "In welchen Regionen ist Niedersachsen Solar tätig?",
    answer: `Wir planen und installieren Energiekonzepte im gesamten Bundesland ${site.serviceArea}, mit Schwerpunkt in und um ${site.cities.join(", ")}.`,
  },
  {
    // RESTORED 2026-09-03 (contentGates.pricing + .förderung, both "Ja").
    question: "Was kosten Photovoltaik, Speicher, Wallbox und Wärmepumpe?",
    answer:
      "Die Kosten hängen stark von Hausgröße und gewähltem System ab. Als grobe Orientierung, jeweils vor Förderung: PV-Anlagen liegen meist zwischen 6.000 € und 35.000 €, Batteriespeicher zwischen 2.000 € und 12.000 €, eine Wallbox inklusive Installation zwischen 1.200 € und 2.500 €, und eine Wärmepumpe laut Finanztip.de zwischen 11.000 € und 47.000 € (staatliche Förderung bis zu 80 % möglich). Den genauen Preis für Ihr Energiekonzept ermitteln wir im kostenlosen Erstgespräch.",
  },
  {
    question: "Was unterscheidet Niedersachsen Solar von anderen Solarteuren?",
    answer:
      "Wir haben selbst jahrelang auf dem Dach gestanden, bevor wir Energiekonzepte geplant haben. Zusätzlich setzen wir bewusst auf ein geschlossenes Ökosystem für Speicher, Wallbox und Steuerung, statt beliebige Einzelteile zu kombinieren.",
  },
  {
    // RESTORED 2026-09-03 (contentGates.certifiedPartnersAndResponsibilityBoundaries, "Ja").
    question: "Bietet Niedersachsen Solar auch Dachsanierung und Wärmepumpen an?",
    answer:
      "Ja. PV-Anlagen und Speicher installieren wir selbst. Dachsanierung und Wärmepumpen-Installation koordinieren wir über zertifizierte Fachpartnerbetriebe aus unserem Netzwerk, damit alle Gewerke als ein Energiekonzept zusammenspielen.",
  },
  {
    // RESTORED 2026-09-03 (contentGates.oneBusinessDayCallback, "Ja").
    question: "Wie läuft der erste Schritt ab?",
    answer:
      "Sie kontaktieren uns für ein kostenloses, unverbindliches Erstgespräch. Wir melden uns innerhalb eines Werktags und klären gemeinsam, welches Energiekonzept zu Ihrem Haus und Ihrem Verbrauch passt.",
  },
  {
    // RESTORED 2026-09-03 (contentGates.clooverPartnership, "Ja").
    question: "Gibt es eine Finanzierungsmöglichkeit?",
    answer:
      "Ja, über unseren Finanzierungspartner Cloover klären wir Ihre Optionen direkt und unkompliziert, ohne Umwege über mehrere Ansprechpartner.",
  },
  {
    // RESTORED 2026-09-03 (contentGates.openingHours + .oneBusinessDayCallback, both "Ja").
    question: "Wann sind Sie persönlich erreichbar?",
    answer:
      "Montags bis freitags von 8 bis 17 Uhr. Außerhalb dieser Zeiten erreichen Sie uns über das Kontaktformular oder den Solar-Check — wir melden uns innerhalb eines Werktags zurück.",
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
// 2026-09-03: per the proof-claims confirmation table —
//   "Der Gründer hat selbst PV-Anlagen installiert." -> Ja (name restored)
//   "Keine Vertriebsnummer" -> Nein (never used, not even as a rejected
//     entry here — it's not a claim about the business, it's a marketing
//     line, and the owner said no to it specifically)
//   "Ein geschlossenes Ökosystem" -> Ja (added)
//   "Direkter Weg zur Finanzierung" -> Ja (added, names Cloover)
export const proofClaims: Claim[] = [
  {
    id: "praxiserfahrung",
    statement:
      "Gründer und Geschäftsführer Skye van Dyck hat selbst PV-Anlagen installiert, bevor er Energiekonzepte geplant hat — diese praktische Erfahrung fließt in jede Planung ein.",
    state: "confirmed",
  },
  {
    id: "geschlossenes-oekosystem",
    statement:
      "Speicher, Wallbox und Steuerung sind als ein geschlossenes Ökosystem geplant, statt beliebige Einzelkomponenten zu kombinieren.",
    state: "confirmed",
  },
  {
    id: "finanzierung",
    statement:
      "Über unseren Finanzierungspartner Cloover klären wir Ihre Optionen direkt, ohne Umwege über mehrere Ansprechpartner.",
    state: "confirmed",
  },
];

// Prozess (Brief 6.5): five steps, each naming its result, the documents it
// needs, and who is responsible — reduces uncertainty instead of just
// showing a bare timeline.
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
    // RESTORED 2026-09-03 (contentGates.certifiedPartnersAndResponsibilityBoundaries, "Ja").
    responsible: "Niedersachsen Solar und zertifizierte Fachpartner",
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
      // RESTORED 2026-09-03 (contentGates.certifiedPartnersAndResponsibilityBoundaries, "Ja").
      "Ist eine Sanierung nötig, koordinieren wir sie über zertifizierte Dachdecker-Partnerbetriebe aus unserem Netzwerk — als ein gemeinsam geplantes Projekt mit der PV-Installation, nicht als getrennte Baustelle mit eigenem Zeitplan. So entscheiden Statik, Ausrichtung und Unterkonstruktion der Dachsanierung von Anfang an mit, wie die Photovoltaikanlage später ausgelegt wird.",
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
      // Deliberately still not restored: this used to close on EcoFlow
      // exclusivity specifically, which stays rejected. "Geschlossenes
      // Ökosystem" is used elsewhere on the Speicher page instead.
      "Wir setzen dabei auf ein geschlossenes Ökosystem: Speicher, Wallbox und Steuerung stammen aus einem System, das für nahtloses Zusammenspiel konzipiert ist, statt Komponenten verschiedener Hersteller aufeinander abzustimmen.",
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
// photo teaser rather than inventing case-study narrative. Still an open
// question to the product owner (unrelated to the 2026-09-03 checklist).
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
