import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import WebDesignPage from "@/components/WebDesignPage";
import { WEB_DESIGN, WEB_DESIGN_FAQS } from "@/lib/webDesign";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID } from "@/lib/site";

const path = "/services/website-design";
const url = canonical(path);

export const metadata: Metadata = {
  title: WEB_DESIGN.metaTitle,
  description: WEB_DESIGN.metaDescription,
  keywords: WEB_DESIGN.keywordCluster,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `${WEB_DESIGN.metaTitle} | ${SITE.name}`,
    description: WEB_DESIGN.metaDescription,
    siteName: SITE.name,
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Website Design", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: WEB_DESIGN.metaTitle,
  serviceType: WEB_DESIGN.primaryKeyword,
  description: WEB_DESIGN.metaDescription,
  url,
  areaServed: { "@type": "AdministrativeArea", name: SITE.areaServed },
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function WebsiteDesignServicePage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(WEB_DESIGN_FAQS)]} />
      <WebDesignPage eyebrow={WEB_DESIGN.eyebrow} h1={WEB_DESIGN.h1} heroSub={WEB_DESIGN.heroSub} crumbs={crumbs} />
    </>
  );
}
