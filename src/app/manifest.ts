import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// NOTE: only a 180x180 PNG exists today (public/images/favicon-180.png,
// already used as the apple-touch-icon). Proper 192x192/512x512 exports
// from the vector logo source are an open asset request — see Paket D
// report — rather than stretching/upscaling this one file to fake sizes.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "NISO Solar",
    description:
      "Photovoltaik, Speicher, Wallbox und Wärmepumpe für Hannover, Hildesheim und Braunschweig.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#cc010f",
    lang: "de",
    icons: [
      {
        src: "/images/favicon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
