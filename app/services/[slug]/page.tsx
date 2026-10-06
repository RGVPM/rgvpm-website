import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";
import ServiceDetail from "@/components/ServiceDetail";
import JsonLd from "@/components/JsonLd";
import { cities } from "@/lib/cities";
import { localSeoCityPath } from "@/lib/localSeo";
import { gbpCityPath } from "@/lib/gbp";
import { googleAdsCityPath } from "@/lib/googleAds";

/** Services that have city landing pages, and how to label each link. */
const CITY_LINKS: Record<string, { heading: string; intro: string; path: (slug: string) => string; label: (city: string) => string }> = {
  "local-seo": {
    heading: "Local SEO by City",
    intro: "Each Rio Grande Valley city has its own map pack and competitors. Pick yours to see how we approach it.",
    path: localSeoCityPath,
    label: (c) => (c === "Harlingen" ? "Harlingen SEO services" : `Local SEO in ${c}, TX`),
  },
  "google-business-profile": {
    heading: "Google Business Profile by City",
    intro: "Map-pack results are local to each city. See what we do for businesses near you.",
    path: gbpCityPath,
    label: (c) => `Google Business Profile in ${c}, TX`,
  },
  "paid-advertising": {
    heading: "Google Ads Management by City",
    intro: "Campaigns targeted to the cities you actually serve.",
    path: googleAdsCityPath,
    label: (c) => `Google Ads management in ${c}, TX`,
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const url = canonical(`/services/${slug}`);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywordCluster,
    alternates: { canonical: url },
    ...socialMeta({
      url,
      title: `${service.metaTitle} | ${SITE.name}`,
      description: service.metaDescription,
    }),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = canonical(`/services/${slug}`);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.metaTitle,
    serviceType: service.primaryKeyword,
    description: service.metaDescription,
    url,
    areaServed: [{ "@type": "AdministrativeArea", name: SITE.areaServed }, { "@type": "Country", name: "United States" }],
    provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <JsonLd
        data={[
          serviceSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortName, path: `/services/${slug}` },
          ]),
          faqSchema(service.faqs),
        ]}
      />
      <ServiceDetail
        service={service}
        cityLinks={
          CITY_LINKS[slug]
            ? {
                heading: CITY_LINKS[slug].heading,
                intro: CITY_LINKS[slug].intro,
                links: cities.map((c) => ({ href: CITY_LINKS[slug].path(c.slug), label: CITY_LINKS[slug].label(c.name) })),
              }
            : undefined
        }
      />
    </>
  );
}
