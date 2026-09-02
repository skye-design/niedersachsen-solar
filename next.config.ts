import type { NextConfig } from "next";
import { services } from "./src/lib/content";

const nextConfig: NextConfig = {
  async redirects() {
    // The old /leistungen/[slug] IA is retired in favor of dedicated
    // top-level routes (see 01_WEBSITE_MASTER_BRIEF.md section 4). Permanent
    // redirects preserve any existing inbound links/SEO equity.
    return services.map((service) => ({
      source: `/leistungen/${service.slug}`,
      destination: service.route,
      permanent: true,
    }));
  },
};

export default nextConfig;
