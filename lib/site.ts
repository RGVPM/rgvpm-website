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
    "RGV Performance Marketing is an AI & marketing agency for med spas and aesthetic practices, based in Harlingen, Texas, serving practices nationwide. We build websites, Google and local SEO, social and ads, plus the AI systems that answer calls and follow up with every lead.",
  team: "The RGV Performance Marketing Team",
  /** Booking / discovery-call URL (used as a contact action). */
  bookingUrl: "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall",
} as const;

/**
 * The one-sentence company description (owner's wording, 2026-11-22). Use it
 * verbatim wherever the site describes the company: metadata, schema, llms.txt,
 * About, footer. City and service pages keep their own copy.
 */
export const ENTITY_LINE =
  "RGV Performance Marketing is an AI & marketing agency for med spas and aesthetic practices, based in Harlingen, Texas, serving practices nationwide.";

/** Short form for tight spaces (footer, meta descriptions). */
export const ENTITY_SHORT =
  "An AI & marketing agency for med spas and aesthetic practices, based in Harlingen, Texas, serving practices nationwide.";

/**
 * Tells AI engines and Google which "RGV" marketing company this is. Do not
 * name other businesses here.
 */
export const DISAMBIGUATING_DESCRIPTION =
  "RGV Performance Marketing (RGVPM) is a medical aesthetics marketing agency in Harlingen, Texas. It works with med spas and aesthetic practices across the United States and is a separate company from other Rio Grande Valley SEO and marketing firms with similar names.";

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
  "https://www.tiktok.com/@rgvpm", // verified 2026-11-22
  "https://www.youtube.com/@RGVPM", // verified 2026-11-22 (channel renamed from @DerrickTamez)
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
} as const;

/** One-time build fee on the Plant the Flag website alone; waived with any add-on. Matches PLANS[0].description. */
export const BUILD_FEE = 399;

/** The monthly plans and add-ons — single source of truth for pricing schema and llms.txt. */
export const PLANS = [
  { name: "Plant the Flag (website)", price: 397, description: "A custom website built, hosted, and maintained for you, plus one inbox for every lead and automatic text and email follow-up. One-time $399 build fee, waived with any add-on. Every add-on builds on this." },
  { name: "Local SEO & Google Profile add-on", price: 297, description: "Google Business Profile built out, city and service pages, on-page cleanup, monthly content and a monthly report." },
  { name: "Content Crew add-on", price: 297, description: "You shoot, we edit: 1 reel and 1 branded creative a week, plus stories. Also sold on its own." },
  { name: "Full Service Social add-on", price: 1497, description: "2 reels and 1 post a week, unlimited stories, a monthly on-site shoot; we post and answer DMs. Also sold on its own." },
  { name: "Ads Management add-on", price: 497, description: "Google or Meta ads built and managed for you. Ad spend is billed by Google and Meta directly." },
] as const;

/** "$1,497" from 1497. */
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** A plan's price by its exact PLANS name. Throws at build time if the name drifts. */
export function planPrice(name: (typeof PLANS)[number]["name"]): number {
  const plan = PLANS.find((p) => p.name === name);
  if (!plan) throw new Error(`Unknown plan: ${name}`);
  return plan.price;
}

/**
 * Plain-language pricing terms. Every number comes from PLANS / BUILD_FEE.
 * Shared by /pricing, llms.txt and llms-full.txt so they can't disagree.
 */
export const PRICING_TERMS = [
  `${PLANS[0].name} is the base: ${usd(PLANS[0].price)}/mo. On its own it has a one-time ${usd(BUILD_FEE)} build fee, waived when you add any add-on.`,
  "No setup or activation fees on anything.",
  "Every plan and add-on is month-to-month. No long-term contracts.",
  "Ad spend is not included. Google and Meta bill it to you directly; the Ads Management add-on covers running the campaigns.",
  "Content Crew and Full Service Social are also sold on their own, without the website.",
  "We no longer sell bundles to new clients. Existing Build the Machine and Own the Market clients keep their plans and prices.",
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

/**
 * The founders' Aesthetic Record background, in Derrick's wording (2026-11-21).
 * Used on /about (copy + Person schema) and llms.txt. Speak well of Aesthetic
 * Record and LeadAR, and never imply a partnership: we are independent.
 */
export const FOUNDER_BACKGROUND = [
  {
    id: PERSON_DERRICK_ID,
    name: "Derrick Tamez",
    role: "Founder & CEO",
    text: "Derrick spent 5 years at Aesthetic Record. He started as a sales specialist, became Sales Operations Manager, and helped launch and grow LeadAR.",
  },
  {
    id: PERSON_KELSEY_ID,
    name: "Kelsey Tamez",
    role: "Co-Founder & Operations Director",
    text: "Kelsey spent 5 years at Aesthetic Record as a training engineer, then a client success coach, then Senior Strategic Account Manager.",
  },
] as const;

export const AR_INDEPENDENCE =
  "RGV Performance Marketing is an independent agency and is not affiliated with Aesthetic Record. Aesthetic Record and LeadAR are trademarks of their owners.";

/** Default share card: the output of app/opengraph-image.tsx. */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "RGV Performance Marketing — AI & marketing for med spas and aesthetic practices",
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

/** Co-founder reference; the full Person node lives on /about. */
export function cofounderRef() {
  return {
    "@type": "Person",
    "@id": PERSON_KELSEY_ID,
    name: "Kelsey Tamez",
    jobTitle: "Co-Founder & Operations Director",
    url: canonical("/about"),
  };
}

/** People who can be credited as a blog post's author. */
export type PostAuthorName = "Derrick Tamez" | "Kelsey Tamez";

/**
 * Byline data for a blog post author: the schema.org Person reference (same
 * @id as that person's node on /about) plus the portrait for the byline.
 * Defaults to Derrick when a post names no author.
 */
export function postAuthor(name: PostAuthorName = "Derrick Tamez") {
  if (name === "Kelsey Tamez") return { ref: cofounderRef(), photo: "/founders/kelsey.jpg" };
  return { ref: founderRef(), photo: "/founders/derrick.jpg" };
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
    disambiguatingDescription: DISAMBIGUATING_DESCRIPTION,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    image: `${SITE.url}/logo.png`,
    logo: `${SITE.url}/brand/rgvpm-badge.png`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    knowsLanguage: ["en", "es"],
    areaServed: [
      { "@type": "Country", name: "United States" },
      ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: "Rio Grande Valley" },
    ],
    knowsAbout: [
      "Med spa marketing",
      "Aesthetic practice marketing",
      "Med spa websites",
      "Local SEO",
      "Google Business Profile",
      "Google Ads and Meta ads",
      "AI lead follow-up and automation",
      "Aesthetic Record and LeadAR",
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
  if (FOUNDER) node.founder = [founderRef(), cofounderRef()];
  node.employee = [{ "@id": PERSON_DERRICK_ID }, { "@id": PERSON_KELSEY_ID }];
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
    alternateName: "RGVPM",
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
    name: "AI & marketing plans for med spas and aesthetic practices",
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
