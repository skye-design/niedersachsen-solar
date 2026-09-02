import type { MetadataRoute } from "next";

// Per handoff/04_SEO_AI_SPEC.md: explicit rules for named crawlers, internal
// paths blocked, owner's explicit call on GPTBot (2026-09-02: block —
// visible in ChatGPT search via OAI-SearchBot, opted out of model training).
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: "https://niedersachsen-solar.de/sitemap.xml",
  };
}
