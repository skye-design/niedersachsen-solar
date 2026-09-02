import type { MetadataRoute } from "next";
import { knowledgeArticles, services } from "@/lib/content";

// 2026-09-02: `lastModified: new Date()` on every entry was flagged — it
// stamped every URL with the *build* time, not a real publish/update date,
// which is actively misleading to crawlers (it implies constant freshness
// that isn't real). No per-page date is currently tracked reliably enough
// to put a real one here, so `lastModified` is omitted entirely rather than
// filled with another placeholder. It's an optional sitemap field; omitting
// it is valid and honest. Revisit if/when real per-page publish dates start
// being tracked (see the same caveat on the Article JSON-LD dates in
// ratgeber/[slug]/page.tsx and solarLotse.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://niedersachsen-solar.de";

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: `${base}${service.route}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...(
      ["/projekte", "/ueber-uns", "/ablauf", "/ratgeber", "/kontakt"] as const
    ).map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...knowledgeArticles.map((article) => ({
      url: `${base}/ratgeber/${article.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
