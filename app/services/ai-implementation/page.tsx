import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AiImplementationPage from "@/components/AiImplementationPage";
import { AI_IMPL, AI_FAQS } from "@/lib/aiImplementation";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID } from "@/lib/site";

const path = "/services/ai-implementation";
const url = canonical(path);

export const metadata: Metadata = {
  title: AI_IMPL.metaTitle,
  description: AI_IMPL.metaDescription,
  keywords: AI_IMPL.keywordCluster,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `${AI_IMPL.metaTitle} | ${SITE.name}`,
    description: AI_IMPL.metaDescription,
    siteName: SITE.name,
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "AI Implementation", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: AI_IMPL.metaTitle,
  serviceType: AI_IMPL.primaryKeyword,
  description: AI_IMPL.metaDescription,
  url,
  areaServed: { "@type": "AdministrativeArea", name: SITE.areaServed },
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function AiImplementationServicePage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(AI_FAQS)]} />
      <AiImplementationPage eyebrow={AI_IMPL.eyebrow} h1={AI_IMPL.h1} heroSub={AI_IMPL.heroSub} crumbs={crumbs} />
    </>
  );
}
