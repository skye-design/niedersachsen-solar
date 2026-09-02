import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { services, site } from "@/lib/content";

const SLUG = "waermepumpe";

export function generateMetadata(): Metadata {
  const service = services.find((s) => s.slug === SLUG);
  if (!service) return {};
  const url = `https://niedersachsen-solar.de${service.route}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: site.name,
      locale: "de_DE",
      type: "website",
    },
  };
}

export default function Page() {
  const service = services.find((s) => s.slug === SLUG);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
