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
    "An AI & marketing agency based in Harlingen, Texas, serving businesses nationwide. We build websites, SEO, and ads, plus the AI systems that answer calls, follow up with leads, and cut the busywork. Locally rooted. Built to scale.",
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
  "https://www.instagram.com/rgvperformancemarketing/",
  "https://www.facebook.com/people/RGVPM/61572104973174/",
  "https://www.linkedin.com/company/rgv-performance-marketing/",
  // TODO(owner): add YouTube if/when it exists.
];

/**
 * The three profiles we actively point people at, in display order, with the
 * handle to show. Kept separate from SOCIAL_PROFILES because that list also
 * carries the Google Business Profile — right for schema `sameAs`, wrong for
 * a "follow us" row. URLs are the same strings, so the two can't drift.
 */
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@rgvperformancemarketing",
    url: "https://www.instagram.com/rgvperformancemarketing/",
  },
  {
    name: "Facebook",
    handle: "RGV Performance Marketing",
    url: "https://www.facebook.com/people/RGVPM/61572104973174/",
  },
  {
    name: "LinkedIn",
    // No "/company/" prefix: with it the handle overflows the card on a
    // 390px phone and gets ellipsed.
    handle: "rgv-performance-marketing",
    url: "https://www.linkedin.com/company/rgv-performance-marketing/",
  },
] as const;

/**
 * Business owner / founder. Once filled, this strengthens E-E-A-T and lets the
 * schema name a real person behind the company.
 */
export const FOUNDER: { name: string; jobTitle?: string } | null = { name: "Derrick Tamez", jobTitle: "Founder & CEO" };

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

/** The monthly plans — single source of truth for pricing schema and llms.txt. */
export const PLANS = [
  { name: "Plant the Flag", price: 397, description: "A custom website built, hosted, and maintained for you, plus one inbox for every lead." },
  { name: "SEO Package", price: 597, description: "Everything in Plant the Flag, plus Google Business Profile and local SEO work so more of the right people find you." },
  { name: "Build the Machine", price: 899, description: "A full growth engine: SEO, paid ads management, two-way SMS & email, automation, and reporting." },
  { name: "Own the Market", price: 1499, description: "Dominate locally: managed ads, content, social, reputation, and hands-on monthly optimization." },
] as const;

/** Absolute canonical URL for a given path ("/" or "/services/local-seo"). */
export function canonical(path: string): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

/**
 * One business entity for the whole site. Organization and ProfessionalService
 * used to be two nodes with two @ids; they are now one multi-typed node under
 * ORGANIZATION_ID, emitted site-wide from app/layout.tsx so every
 * `{ "@id": ORGANIZATION_ID }` reference on any page resolves.
 * LOCAL_BUSINESS_ID is kept as an alias so existing `provider` refs still point here.
 */
export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const LOCAL_BUSINESS_ID = ORGANIZATION_ID;
export const WEBSITE_ID = `${SITE.url}/#website`;

/** Stable @ids for the people on /about (Person nodes are fully described there). */
export const PERSON_DERRICK_ID = `${SITE.url}/about#derrick-tamez`;
export const PERSON_KELSEY_ID = `${SITE.url}/about#kelsey-tamez`;

/** Default share card: the output of app/opengraph-image.tsx. */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "RGV Performance Marketing — AI-Powered Digital Marketing for Local Businesses",
};

/**
 * Open Graph + Twitter card metadata for one page, so every page shares with
 * its own title/description and the default image. Spread into a page's
 * `metadata` (a page-level `openGraph` replaces the layout's, so the image
 * has to be set here, not inherited).
 */
export function socialMeta({
  url,
  title,
  description,
  type = "website",
}: {
  url: string;
  title: string;
  description: string;
  type?: "website" | "article";
}) {
  return {
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/** Short Person reference with enough data to stand on its own on any page. */
export function founderRef() {
  return {
    "@type": "Person",
    "@id": PERSON_DERRICK_ID,
    name: FOUNDER?.name ?? "Derrick Tamez",
    jobTitle: FOUNDER?.jobTitle,
    url: canonical("/about"),
  };
}

/** The single business node (Organization + ProfessionalService). Rendered once, site-wide. */
export function businessSchema() {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    alternateName: "RGVPM",
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
      { "@type": "Country", name: "United States" },
    ],
    slogan: "AI & Marketing Agency",
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: SITE.phone,
      email: SITE.email,
      availableLanguage: ["English", "Spanish"],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: SITE.bookingUrl,
      name: "Book a Free Call",
    },
  };

  if (SOCIAL_PROFILES.length > 0) node.sameAs = SOCIAL_PROFILES;
  if (FOUNDER) node.founder = founderRef();
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

/**
 * Offer catalog for /pricing, built only from PLANS (the single source of
 * truth for prices). Nothing here may introduce a price that PLANS lacks.
 */
export function pricingSchema() {
  const url = canonical("/pricing");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "AI & marketing plans for small businesses",
    serviceType: "Website, local SEO, advertising and marketing automation",
    url,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Rio Grande Valley" },
      { "@type": "Country", name: "United States" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Monthly plans (month-to-month)",
      itemListElement: PLANS.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.description,
        url,
        price: p.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@id": ORGANIZATION_ID },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: "USD",
          unitCode: "MON",
          unitText: "month",
          billingDuration: 1,
        },
      })),
    },
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
