export const SITE = {
  name: "RGV Performance Marketing",
  url: "https://rgvperformancemarketing.com",
  email: "info@rgvperformancemarketing.com",
  city: "Harlingen",
  region: "TX",
  areaServed: "Rio Grande Valley",
  phoneDisplay: "956",
  description:
    "AI-powered digital marketing for local businesses. Websites, SEO, paid ads, lead management, newsletters, and more. Locally rooted. Built to scale.",
  team: "The RGV Performance Marketing Team",
} as const;

export const STRIPE_LINKS = {
  plantTheFlag: "https://buy.stripe.com/28E00jcv2gd03dw1cZ7Zu0h",
  buildTheMachine: "https://buy.stripe.com/5kQaEXfHed0O3dwdZL7Zu0i",
  ownTheMarket: "https://buy.stripe.com/aFa3cv1Qo7Gu29sf3P7Zu0j",
} as const;

/** Absolute canonical URL for a given path ("/" or "/services/local-seo"). */
export function canonical(path: string): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

/** LocalBusiness node reused across pages via a stable @id. */
export const LOCAL_BUSINESS_ID = `${SITE.url}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    areaServed: [
      { "@type": "City", name: "Harlingen" },
      { "@type": "AdministrativeArea", name: "Rio Grande Valley" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harlingen",
      addressRegion: "TX",
      addressCountry: "US",
    },
    priceRange: "$$",
    knowsLanguage: ["en", "es"],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
