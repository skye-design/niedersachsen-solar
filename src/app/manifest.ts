import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// 2026-09-03: icon-192.png / icon-512.png generated (sips resize, no
// re-encode of the artwork itself) from the square icon-only mark Skye
// provided, closing the open asset request below the old note used to
// describe. favicon-180.png (apple-touch-icon) is untouched — separate
// asset, separate use.
//
// Deliberately not using `brand.logo` (content.ts) here — that's a wide
// horizontal wordmark, wrong aspect ratio for a square app icon. This file
// predates the discarded Manus logo package and was never affected by it.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "NISO Solar",
    description: `Photovoltaik, Speicher, Wallbox und Wärmepumpe für ${site.cities.join(", ")}.`,
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
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
