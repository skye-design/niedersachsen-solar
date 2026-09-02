import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const title = "Niedersachsen Solar | Ganzheitliche Energiekonzepte für Ihr Zuhause";
const description =
  "PV-Anlagen, Speicher, Wallbox und Wärmepumpe aus einer Hand für Hannover, Hildesheim und Braunschweig. Ganzheitliche Energiekonzepte von Menschen, die selbst auf dem Dach gestanden haben.";

export const metadata: Metadata = {
  metadataBase: new URL("https://niedersachsen-solar.de"),
  title,
  description,
  icons: {
    apple: "/images/favicon-180.png",
  },
  openGraph: {
    title,
    description,
    url: "https://niedersachsen-solar.de",
    siteName: "Niedersachsen Solar",
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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://niedersachsen-solar.de/#business",
  name: "Niedersachsen Solar",
  url: "https://niedersachsen-solar.de",
  telephone: "+4951195733515",
  email: "kontakt@niedersachsen-solar.de",
  image: "https://niedersachsen-solar.de/images/hero-v2.jpg",
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Herrenhäuser Str. 64",
    postalCode: "30419",
    addressLocality: "Hannover",
    addressCountry: "DE",
  },
  areaServed: ["Hannover", "Hildesheim", "Braunschweig"],
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
    <html lang="de" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
