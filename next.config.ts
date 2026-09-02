import type { NextConfig } from "next";
import { services } from "./src/lib/content";

// 2026-09-02: security-header prep. `poweredByHeader: false` and the four
// headers below are safe to enable now — none of them constrain what the
// page can load, so nothing here can break existing images/fonts/forms/the
// Solar-Lotse. CSP is deliberately NOT included: it does constrain load
// sources, and enabling one before auditing every image/font/form/future-
// chatbot-API origin risks silently breaking the site. A draft policy is
// documented in docs/deployment.md for that future audit; it is not active
// here. This file only affects this Next.js app when deployed — it does not
// touch the Hetzner nginx config, which needs its own change (documented,
// not applied, in docs/deployment.md) to stop double-setting or overriding
// these once they reach production.
const securityHeaders = [
  // Conservative on purpose: no `preload` (hard to reverse — it enters
  // browser HSTS preload lists) and no `includeSubDomains` (only safe once
  // every subdomain is confirmed HTTPS-only). Revisit once confirmed.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Blocks browser features this site doesn't use; extend the allowlist
  // (don't just delete an entry) if a future feature needs one of these.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
