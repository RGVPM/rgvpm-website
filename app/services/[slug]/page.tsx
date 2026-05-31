import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID } from "@/lib/site";
import ServiceDetail from "@/components/ServiceDetail";
import JsonLd from "@/components/JsonLd";

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
    openGraph: {
      type: "website",
      url,
      title: `${service.metaTitle} | ${SITE.name}`,
      description: service.metaDescription,
      siteName: SITE.name,
    },
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
    areaServed: { "@type": "AdministrativeArea", name: SITE.areaServed },
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
      <ServiceDetail service={service} />
    </>
  );
}
