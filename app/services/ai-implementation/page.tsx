import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AiImplementationPage from "@/components/AiImplementationPage";
import { AI_IMPL, AI_FAQS } from "@/lib/aiImplementation";
import { canonical, breadcrumbSchema, faqSchema, localBusinessSchema, SITE, LOCAL_BUSINESS_ID } from "@/lib/site";
import { cities, aiCityPath } from "@/lib/cities";

const path = "/services/ai-implementation";
const url = canonical(path);

export const metadata: Metadata = {
  title: { absolute: AI_IMPL.metaTitle },
  description: AI_IMPL.metaDescription,
  keywords: AI_IMPL.keywordCluster,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: AI_IMPL.metaTitle,
    description: AI_IMPL.metaDescription,
    siteName: SITE.name,
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "AI Automation", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Automation & AI Consulting",
  serviceType: "AI automation",
  description: AI_IMPL.metaDescription,
  url,
  areaServed: { "@type": "AdministrativeArea", name: SITE.areaServed },
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

const cityLinks = cities.map((c) => ({ href: aiCityPath(c.slug), label: `AI automation in ${c.name}, TX` }));

export default function AiImplementationServicePage() {
  return (
    <>
      <JsonLd data={[serviceSchema, localBusinessSchema(), breadcrumbSchema(crumbs), faqSchema(AI_FAQS)]} />
      <AiImplementationPage
        eyebrow={AI_IMPL.eyebrow}
        h1={AI_IMPL.h1}
        heroSub={AI_IMPL.heroSub}
        crumbs={crumbs}
        cityLinks={{
          eyebrow: "Across the Valley",
          heading: "AI Automation Across the Rio Grande Valley",
          intro: "We're based in Harlingen and build AI automation for businesses throughout the Valley. Find your city:",
          links: cityLinks,
        }}
      />
    </>
  );
}
