export const SITE = {
  name: "RGV Performance Marketing",
  url: "https://rgvperformancemarketing.com",
  email: "info@rgvperformancemarketing.com",
  /** E.164 for tel: links + schema. */
  phone: "+19567939152",
  /** Human-readable phone for display. */
  phoneHuman: "(956) 793-9152",
  city: "Harlingen",
  region: "TX",
  areaServed: "Rio Grande Valley",
  phoneDisplay: "956",
  /** Approx. coordinates for Harlingen, TX (service-area business — no public street address). */
  geo: { latitude: 26.1906, longitude: -97.6961 },
  description:
    "AI-powered digital marketing for local businesses. Websites, SEO, paid ads, lead management, newsletters, and more. Locally rooted. Built to scale.",
  team: "The RGV Performance Marketing Team",
  /** Booking / discovery-call URL (used as a contact action). */
  bookingUrl: "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall",
} as const;

/**
 * Cities the agency actively serves across the Rio Grande Valley.
 * Used for schema `areaServed` and the footer "Areas We Serve" links.
 */
export const SERVICE_AREA_CITIES = [
  "Harlingen",
  "McAllen",
  "Brownsville",
  "Edinburg",
  "Mission",
  "Weslaco",
  "San Benito",
  "Pharr",
] as const;

/**
 * Verified external profiles for this business (entity disambiguation / E-E-A-T).
 * These feed schema `sameAs` and the footer social links. AI engines (ChatGPT,
 * Perplexity, Google AI Overviews) rely heavily on these to trust and cite the
 * business as a real entity.
 *
 * TODO(owner): paste the real, live URLs. Leave a value out if the profile
 * doesn't exist yet — only verified URLs should ship here.
 */
export const SOCIAL_PROFILES: string[] = [
  "https://share.google/P2QVUDKeJlWeX0QGX", // Google Business Profile (entity /g/11nc2gcm67)
  "https://www.instagram.com/rgvperformacemarketing/",
  "https://www.facebook.com/people/RGVPM/61572104973174/",
  // TODO(owner): add LinkedIn / YouTube if/when they exist.
];

/**
 * Business owner / founder. Once filled, this strengthens E-E-A-T and lets the
 * schema name a real person behind the company.
 * TODO(owner): set name (and optionally jobTitle) to the real founder.
 */
export const FOUNDER: { name: string; jobTitle?: string } | null = null;

/** Standard business hours. TODO(owner): confirm/adjust to your real hours. */
export const OPENING_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:00",
  closes: "17:00",
} as const;

export const STRIPE_LINKS = {
  plantTheFlag: "https://buy.stripe.com/28E00jcv2gd03dw1cZ7Zu0h",
  buildTheMachine: "https://buy.stripe.com/5kQaEXfHed0O3dwdZL7Zu0i",
  ownTheMarket: "https://buy.stripe.com/aFa3cv1Qo7Gu29sf3P7Zu0j",
} as const;

/** The three monthly plans — single source of truth for pricing schema. */
export const PLANS = [
  { name: "Plant the Flag", price: 399, description: "Get found online: Google Business Profile, local SEO foundations, lead capture, and reviews." },
  { name: "Build the Machine", price: 899, description: "A full growth engine: SEO, paid ads management, two-way SMS & email, automation, and reporting." },
  { name: "Own the Market", price: 1999, description: "Dominate locally: managed ads, content, social, reputation, and hands-on monthly optimization." },
] as const;

/** Absolute canonical URL for a given path ("/" or "/services/local-seo"). */
export function canonical(path: string): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

/** LocalBusiness node reused across pages via a stable @id. */
export const LOCAL_BUSINESS_ID = `${SITE.url}/#business`;
export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function localBusinessSchema() {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": LOCAL_BUSINESS_ID,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    image: `${SITE.url}/logo.png`,
    logo: `${SITE.url}/logo.png`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    knowsLanguage: ["en", "es"],
    areaServed: [
      ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: "Rio Grande Valley" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harlingen",
      addressRegion: "TX",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: OPENING_HOURS.days,
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: SITE.bookingUrl,
      name: "Book a Free Call",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Plans",
      itemListElement: PLANS.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.description,
        price: p.price,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: "USD",
          unitText: "MONTH",
          billingDuration: 1,
        },
      })),
    },
  };

  if (SOCIAL_PROFILES.length > 0) node.sameAs = SOCIAL_PROFILES;
  if (FOUNDER) {
    node.founder = { "@type": "Person", name: FOUNDER.name, ...(FOUNDER.jobTitle ? { jobTitle: FOUNDER.jobTitle } : {}) };
  }
  return node;
}

/** Organization entity — anchors the brand across the knowledge graph. */
export function organizationSchema() {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    areaServed: { "@type": "AdministrativeArea", name: "Rio Grande Valley, TX" },
  };
  if (SOCIAL_PROFILES.length > 0) node.sameAs = SOCIAL_PROFILES;
  if (FOUNDER) node.founder = { "@type": "Person", name: FOUNDER.name };
  return node;
}

/** WebSite entity — establishes the site for AI/search and sitelinks. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
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

/** ItemList of services for the /services hub — signals the catalog to crawlers. */
export function serviceListSchema(services: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} — Digital Marketing Services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: canonical(s.path),
    })),
  };
}
