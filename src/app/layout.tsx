import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Niedersachsen Solar | Ganzheitliche Energiekonzepte für Ihr Zuhause",
  description:
    "PV-Anlagen, Speicher, Wallbox und Wärmepumpe aus einer Hand für Hannover, Hildesheim und Braunschweig. Ganzheitliche Energiekonzepte von Menschen, die selbst auf dem Dach gestanden haben.",
  icons: {
    apple: "/images/favicon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body bg-background text-foreground">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
