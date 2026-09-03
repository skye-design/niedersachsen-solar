import type { NextConfig } from "next";
import { services } from "./src/lib/content";

// 2026-09-02: security-header prep. `poweredByHeader: false` and the
// headers below are safe to enable now — none of them constrain what the
// page can load, so nothing here can break existing images/fonts/forms/the
// Solar-Lotse. This file only affects this Next.js app when deployed — it
// does not touch the Hetzner nginx config, which needs its own change
// (documented, not applied, in docs/deployment.md) to stop double-setting
// or overriding these once they reach production.
//
// CSP background (2026-09-03): a strict hash-only script-src was tried
// first and broke client hydration site-wide — Next.js's App Router
// streams page data via its own inline `self.__next_f.push([...])` scripts
// (React's Flight/RSC client), whose content differs per request, so no
// fixed hash can cover them. The correct fix is a per-request nonce via
// middleware, which was implemented and does work — but Next.js can only
// stamp that nonce onto scripts it renders live; it has no way to reach
// into a page that was already prerendered to static HTML at build time
// (most routes here are `○ Static`, by design, for speed). Nonce-based CSP
// would need every page forced to dynamic (per-request) rendering to work
// correctly — a real performance/hosting-cost tradeoff, not a header
// tweak, so it wasn't done blind under launch pressure. Decided instead
// (Skye, 2026-09-03) to ship `'unsafe-inline'` on script-src now and keep
// static rendering: still blocks external scripts, iframes/objects,
// clickjacking, and cross-origin fetch/image/font/form-action — the gap is
// specifically inline-script injection, not everything CSP defends
// against. Revisit nonce-based CSP + dynamic rendering as its own
// follow-up if that gap ever needs closing.
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
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
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
