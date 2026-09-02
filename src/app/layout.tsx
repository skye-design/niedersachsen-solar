import type { Metadata } from "next";
import { Sora, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SolarLotseLoader from "@/components/SolarLotseLoader";
import { site, brand } from "@/lib/content";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
});

// Draft per handoff/04_SEO_AI_SPEC.md §Metadata API — subpage titles stay as
// finalized in Paket B; only the homepage baseline needed updating here.
const title = "Photovoltaik & Energiekonzepte in Niedersachsen | Niedersachsen Solar";
const description =
  "Photovoltaik, Speicher, Wallbox und Wärmepumpe für Hannover, Hildesheim und Braunschweig – persönlich geplant, regional umgesetzt und verständlich begleitet.";

export const metadata: Metadata = {
  metadataBase: new URL("https://niedersachsen-solar.de"),
  title,
  description,
  alternates: { canonical: "https://niedersachsen-solar.de/" },
  icons: {
    apple: "/images/favicon-180.png",
  },
  // Configurable, not hardcoded — set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // once Search Console is connected. This is a public verification meta
  // tag by design, not a secret.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title,
    description,
    url: "https://niedersachsen-solar.de",
    siteName: site.name,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/hero-v2.jpg",
        width: 2400,
        height: 1800,
        alt: "Photovoltaik-Anlage installiert von Niedersachsen Solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-v2.jpg"],
  },
};

// One node, two @types (valid schema.org pattern) rather than a @graph of
// two loosely-linked nodes — Organization-level fields (logo) and
// LocalBusiness-level fields (areaServed) both describe the same
// real-world entity. HomeAndConstructionBusiness is the closest fitting
// LocalBusiness subtype for a coordinated PV/roofing/heat-pump business.
//
// 2026-09-02 correction pass: `founder`, `address`, and
// `openingHoursSpecification` were removed from this schema (they were
// present before). All three are gated per
// contentGates.founderAndAddressInMarketing / .openingHours in content.ts —
// structured/machine-readable data gets the same bar as visible copy, and
// none of the three has explicit owner confirmation yet. JSON-LD is
// intentionally incomplete (no address) until that changes — see
// OWNER_CONFIRMATION_CHECKLIST.md. `areaServed` stays: it only uses the
// three named cities, which predate this redesign and aren't gated.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HomeAndConstructionBusiness"],
  "@id": "https://niedersachsen-solar.de/#organization",
  name: site.name,
  url: "https://niedersachsen-solar.de",
  logo: `https://niedersachsen-solar.de${brand.logoOnLight}`,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  image: "https://niedersachsen-solar.de/images/hero-v2.jpg",
  description,
  areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dachsanierung" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "PV-Anlagen" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Speicher" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wallbox" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wärmepumpe" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${sora.variable} ${sourceSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        {/* 2026-09-02: blocking, synchronous, runs before first paint —
            standard "no-js by default" technique (see globals.css's
            `.js .reveal` rule). Adds the `.js` class only once actual JS
            execution is confirmed; a no-JS visitor never gets it, so
            Reveal-wrapped content never enters a hidden state at all. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollProgress />
        {children}
        {/* 2026-09-02: reserves space below every page's content so the
            fixed StickyMobileCTA never covers it — a single shared spacer
            here instead of each page/template separately guessing its own
            bottom padding (only the homepage had one before, at a
            disconnected hardcoded value; every other page had none and
            could have its Footer covered on mobile). */}
        <div className="h-[var(--bottom-bar-height)] sm:hidden" aria-hidden />
        <StickyMobileCTA />
        <SolarLotseLoader />
      </body>
    </html>
  );
}
