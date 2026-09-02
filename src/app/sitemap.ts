import type { MetadataRoute } from "next";
import { knowledgeArticles, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = "https://niedersachsen-solar.de";

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: `${base}${service.route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...(
      ["/projekte", "/ueber-uns", "/ablauf", "/ratgeber", "/kontakt"] as const
    ).map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...knowledgeArticles.map((article) => ({
      url: `${base}/ratgeber/${article.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
