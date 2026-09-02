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

export const site = {
  name: "Niedersachsen Solar",
  phone: "0511 95733515",
  phoneHref: "tel:+4951195733515",
  email: "kontakt@niedersachsen-solar.de",
  cities: ["Hannover", "Hildesheim", "Braunschweig"],
  serviceArea: "Niedersachsen",
  founder: "Skye van Dyck",
  founderRole: "Gründer und Geschäftsführer",
  financingPartner: "Cloover",
  hours: "Montag bis Freitag, 8–17 Uhr",
};

export const services = [
  {
    slug: "dachsanierung",
    title: "Dachsanierung",
    userQuestion: "Muss ich erst mein Dach lösen, bevor eine PV-Anlage möglich ist?",
    responsibility: "partner-coordinated" as const,
    description:
      "Bevor wir Module aufs Dach bringen, sorgen wir bei Bedarf dafür, dass der Untergrund stimmt. Die Dachsanierung selbst führen zertifizierte Dachdecker-Partnerbetriebe aus unserem Netzwerk durch — koordiniert von uns, damit Ihre PV-Anlage am Ende auf einer soliden Basis steht.",
    icon: "house",
    metaTitle: "Dachsanierung vor der PV-Anlage | Niedersachsen Solar",
    metaDescription:
      "Dachsanierung koordiniert mit Ihrer Photovoltaik-Planung — durchgeführt von zertifizierten Dachdecker-Partnerbetrieben, abgestimmt auf Ihre PV-Anlage. Hannover, Hildesheim, Braunschweig.",
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
    ],
  },
  {
    slug: "pv-anlagen",
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
        question: "Was kostet eine PV-Anlage?",
        answer:
          "Je nach Dachgröße und gewünschter Leistung liegen Photovoltaik-Anlagen meist zwischen 6.000 € und 35.000 € vor Förderung. Den genauen Preis für Ihr Dach ermitteln wir im kostenlosen Erstgespräch.",
      },
    ],
  },
  {
    slug: "speicher",
    title: "Speicher",
    userQuestion: "Wie viel von meinem eigenen Solarstrom kann ich wirklich selbst nutzen?",
    responsibility: "in-house" as const,
    description:
      "Batteriespeicher-Systeme ausschließlich von EcoFlow — ein durchdachtes Ökosystem statt loser Einzelkomponenten, für maximale Unabhängigkeit vom Netz.",
    icon: "battery",
    metaTitle: "Batteriespeicher (EcoFlow) für Ihre PV-Anlage | Niedersachsen Solar",
    metaDescription:
      "Batteriespeicher-Systeme ausschließlich von EcoFlow, abgestimmt auf Ihre PV-Anlage — für maximale Unabhängigkeit vom Netz. Hannover, Hildesheim, Braunschweig.",
    intro:
      "Ein Speicher entscheidet, wie viel von Ihrem selbst erzeugten Solarstrom Sie tatsächlich nutzen, statt ihn für wenig Geld ins Netz einzuspeisen. Wir setzen bewusst auf ein einziges Ökosystem — EcoFlow — statt beliebige Komponenten zu kombinieren.",
    benefits: [
      {
        title: "Ein Ökosystem statt Einzelteile",
        description:
          "Speicher, Wallbox und Steuerung stammen aus einem System und sind für nahtloses Zusammenspiel konzipiert — keine Kompatibilitätsprobleme zwischen Herstellern.",
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
        question: "Warum nur EcoFlow und keine anderen Speicherhersteller?",
        answer:
          "Wir haben uns bewusst auf ein einziges, durchdachtes Ökosystem festgelegt, statt Komponenten verschiedener Hersteller zu kombinieren. Das reduziert Schnittstellenprobleme und sorgt für zuverlässiges Zusammenspiel von Speicher, Wallbox und Steuerung.",
      },
      {
        question: "Lohnt sich ein Speicher für jedes Haus?",
        answer:
          "Das hängt von Ihrem Verbrauchsprofil und Ihrer PV-Anlage ab. Wir bewerten das im persönlichen Gespräch anhand Ihrer tatsächlichen Verbrauchsdaten, statt pauschal einen Speicher zu empfehlen.",
      },
      {
        question: "Was kostet ein Batteriespeicher?",
        answer:
          "Batteriespeicher von EcoFlow kosten je nach Kapazität ab ca. 2.000 € bis 12.000 €. Im Erstgespräch klären wir, welche Speichergröße zu Ihrem Verbrauch und Ihrer PV-Anlage passt.",
      },
    ],
  },
  {
    slug: "wallbox",
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
          "Über die Steuerung des EcoFlow-Ökosystems, das Erzeugung, Speicher und Ladevorgang aufeinander abstimmt, statt die Wallbox isoliert am Netz zu betreiben.",
      },
      {
        question: "Was kostet eine Wallbox inklusive Installation?",
        answer:
          "Eine Wallbox inklusive fachgerechter Installation kostet in der Regel zwischen 1.200 € und 2.500 €, abhängig vom Modell und dem Aufwand für die Elektroinstallation in Ihrem Haus.",
      },
    ],
  },
  {
    slug: "waermepumpe",
    title: "Wärmepumpe",
    userQuestion: "Passt eine Wärmepumpe zu meinem Dach und meiner PV-Anlage?",
    responsibility: "partner-coordinated" as const,
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
        question: "Was kostet eine Wärmepumpe?",
        answer:
          "Die Gesamtkosten für eine Wärmepumpe — Anschaffung, Installation und Umfeldarbeiten — liegen laut Finanztip.de je nach System zwischen 11.000 € und 47.000 € vor Förderung. Der Staat bezuschusst Wärmepumpen mit bis zu 80 % der Kosten. Wir koordinieren die Installation über zertifizierte Heizungsbau-Fachpartner und beraten Sie zu den passenden Fördermöglichkeiten.",
      },
    ],
  },
];

export const trustPoints = [
  {
    title: "Vom Dach in die Planung",
    description:
      "Bevor wir Energiekonzepte entworfen haben, haben wir selbst PV-Anlagen installiert. Diese praktische Erfahrung fließt in jede Planung ein — wir kennen die Details, die auf dem Papier oft übersehen werden.",
    icon: "toolbox",
  },
  {
    title: "Ausschließlich EcoFlow",
    description:
      "Wir setzen bewusst auf ein einziges, durchdachtes Ökosystem statt beliebiger Einzelteile — für nahtloses Zusammenspiel von Speicher, Wallbox und Steuerung.",
    icon: "shield-check",
  },
  {
    title: "Direkter Zugang zur Finanzierung",
    description:
      "Über unsere Finanzierungspartner klären wir Ihre Optionen direkt und unkompliziert — ohne Umwege über mehrere Ansprechpartner.",
    icon: "handshake",
  },
];

// NOTE: Dachsanierung pricing intentionally has no range anywhere on the
// site — costs are too project-specific (roof condition/size) to give an
// honest range. Keep it "im Gespräch klären wir das" only.
export const generalFaqs = [
  {
    question: "In welchen Regionen ist Niedersachsen Solar tätig?",
    answer:
      "Wir planen und installieren Energiekonzepte im gesamten Bundesland Niedersachsen, mit Schwerpunkt in und um Hannover, Hildesheim und Braunschweig.",
  },
  {
    question: "Was kosten Photovoltaik, Speicher, Wallbox und Wärmepumpe?",
    answer:
      "Die Kosten hängen stark von Hausgröße und gewähltem System ab. Als grobe Orientierung, jeweils vor Förderung: PV-Anlagen liegen meist zwischen 6.000 € und 35.000 €, Batteriespeicher zwischen 2.000 € und 12.000 €, eine Wallbox inklusive Installation zwischen 1.200 € und 2.500 €, und eine Wärmepumpe laut Finanztip.de zwischen 11.000 € und 47.000 €. Den genauen Preis für Ihr Energiekonzept ermitteln wir im kostenlosen Erstgespräch.",
  },
  {
    question: "Was unterscheidet Niedersachsen Solar von anderen Solarteuren?",
    answer:
      "Wir haben selbst jahrelang auf dem Dach gestanden, bevor wir Energiekonzepte geplant haben. Zusätzlich setzen wir bewusst auf ein einziges Ökosystem — EcoFlow — für Speicher, Wallbox und Steuerung, statt beliebige Einzelteile zu kombinieren.",
  },
  {
    question: "Bietet Niedersachsen Solar auch Dachsanierung und Wärmepumpen an?",
    answer:
      "Ja. PV-Anlagen und Speicher installieren wir selbst. Dachsanierung und Wärmepumpen-Installation koordinieren wir über zertifizierte Fachpartnerbetriebe aus unserem Netzwerk, damit alle Gewerke als ein Energiekonzept zusammenspielen.",
  },
  {
    question: "Wie läuft der erste Schritt ab?",
    answer:
      "Sie kontaktieren uns für ein kostenloses, unverbindliches Erstgespräch. Wir melden uns innerhalb eines Werktags und klären gemeinsam, welches Energiekonzept zu Ihrem Haus und Ihrem Verbrauch passt.",
  },
  {
    question: "Gibt es eine Finanzierungsmöglichkeit?",
    answer:
      "Ja, über unseren Finanzierungspartner Cloover klären wir Ihre Optionen direkt und unkompliziert, ohne Umwege über mehrere Ansprechpartner.",
  },
  {
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
    href: "/leistungen/pv-anlagen",
    accent: "primary" as const,
  },
  {
    id: "speicher",
    question: "Wie viel eigenen Solarstrom kann ich wirklich nutzen?",
    label: "Stromspeicher",
    href: "/leistungen/speicher",
    accent: "green" as const,
  },
  {
    id: "wallbox",
    question: "Wie lade ich mein E-Auto mit eigenem Strom?",
    label: "Wallbox",
    href: "/leistungen/wallbox",
    accent: "amber" as const,
  },
  {
    id: "waermepumpe",
    question: "Passt eine Wärmepumpe zu meinem Haus?",
    label: "Wärmepumpe",
    href: "/leistungen/waermepumpe",
    accent: "blue" as const,
  },
  {
    id: "dach-pv",
    question: "Muss ich erst mein Dach lösen, bevor PV möglich ist?",
    label: "Dach + PV",
    href: "/leistungen/dachsanierung",
    accent: "primary" as const,
  },
];

// Vertrauensabschnitt (Brief 6.3): each proof field carries its own
// verification state instead of being asserted as flat fact in JSX.
export const proofClaims: Claim[] = [
  {
    id: "praxiserfahrung",
    statement:
      "Gründer und Geschäftsführer Skye van Dyck hat selbst PV-Anlagen installiert, bevor er Energiekonzepte geplant hat — diese praktische Erfahrung fließt in jede Planung ein.",
    state: "confirmed",
  },
  {
    id: "ecoflow",
    statement:
      "Speicherlösungen werden ausschließlich mit dem EcoFlow-Ökosystem geplant, statt beliebige Einzelkomponenten zu kombinieren.",
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

// Wissensblock (Brief 6.7): specific, practice-based teasers. Article
// routes (/ratgeber/[slug]) land in Paket B — these render as static
// cards without a live link until that route exists.
export const knowledgeArticles = [
  {
    title: "Wann sollte das Dach vor der PV-Anlage saniert werden?",
    excerpt:
      "Nicht jedes Dach braucht vorab eine Sanierung. Woran Sie erkennen, ob Ihre Eindeckung und Unterkonstruktion für eine PV-Anlage bereit sind — und wann sich eine Sanierung zuerst lohnt.",
  },
  {
    title: "Wie wird ein Speicher passend zum Verbrauch dimensioniert?",
    excerpt:
      "Ein zu kleiner Speicher verschenkt Eigenverbrauch, ein zu großer amortisiert sich schlechter. Wie Verbrauchsprofil und PV-Größe die richtige Kapazität bestimmen.",
  },
  {
    title: "Was bedeutet PV-Überschussladen im Alltag?",
    excerpt:
      "Die Wallbox lädt bevorzugt dann, wenn Ihre PV-Anlage Strom erzeugt. Was das für Ladezeiten, Reichweite und Ihre Stromrechnung konkret bedeutet.",
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
