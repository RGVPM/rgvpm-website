import type { Metadata } from "next";
import type { IconName } from "@/components/Icon";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema, socialMeta } from "@/lib/site";
import type { CityDetailsContent } from "@/components/CityDetails";
import type { CityLink } from "@/components/CityLinks";
import type { FaqItem } from "@/lib/localSeo";

/**
 * Full-service "digital marketing in {city}" pages. One page per city that
 * pulls every service together (website, local SEO, Google Business Profile,
 * ads, lead follow-up, AI) and shows the plans from lib/site.ts. The single-
 * service city pages (local SEO, website design) stay the deeper pages.
 */
export const DIGITAL_MARKETING = {
  eyebrow: "AI & Marketing Agency",
  primaryKeyword: "digital marketing agency",
  keywordCluster: [
    "digital marketing",
    "digital marketing agency",
    "marketing agency",
    "online marketing",
    "small business marketing",
  ],
  entityLine:
    "RGV Performance Marketing is an AI & Marketing Agency based in Harlingen, Texas, serving businesses nationwide.",
};

export const DIGITAL_MARKETING_STEPS: { title: string; text: string }[] = [
  { title: "Free strategy call", text: "We look at your website, your Google listing and the searches your customers use, then tell you what we would fix first and which plan fits. If a smaller plan is enough, we say so." },
  { title: "Build the foundation", text: "Website, Google Business Profile, tracking and one inbox for every lead get set up first, so every call, form and message lands in one place and nothing slips." },
  { title: "Grow and report", text: "We add the channels your plan includes, like local SEO, ads and automated follow-up, and send a plain-English report each month on calls, leads and rankings." },
];

export const DIGITAL_MARKETING_FAQS: FaqItem[] = [
  {
    q: "What does a digital marketing agency do for a small business?",
    a: "It gets you found and turns that attention into calls and booked jobs. For most local businesses that means a fast website, a complete Google Business Profile, local SEO, ads when you need leads quickly, and a system that answers and follows up with every lead. We handle all of it, so you deal with one team instead of four vendors.",
  },
  {
    q: "Are your plans month-to-month?",
    a: "Yes. Every plan is month-to-month with no long-term contract, and every plan and price is published on our pricing page. Ad spend on the plans that include ads is paid to Google or Meta directly, on top of the plan.",
  },
  {
    q: "Do you guarantee rankings or a number of leads?",
    a: "No. Nobody controls Google, and an agency that guarantees a ranking or a lead count is guessing. We promise the work: what we will do each month, how we will measure it, and a report that shows what moved.",
  },
  {
    q: "Do you use AI in your marketing?",
    a: "Yes, where it saves time or catches leads you would miss, like answering after-hours messages, following up with new leads in minutes and drafting content we then edit. A person on our team still owns the strategy and checks the work.",
  },
];

/* ---- Per-city content ---- */
export interface DigitalMarketingCity {
  slug: string;
  name: string;
  /** <title>, absolute, 60 characters or fewer. */
  metaTitle: string;
  h1: string;
  heroSub: string;
  description: string;
  /** Direct answer at the top of the page (40 to 60 words), then supporting paragraphs. */
  intro: { heading: string; answer: string; body: string[] };
  details: CityDetailsContent;
  /** Services that make up the program, each linking to the deepest relevant page. */
  services: { icon: IconName; title: string; text: string; href: string }[];
  faqs: FaqItem[];
  nearby: CityLink[];
}

export const DIGITAL_MARKETING_CITIES: Record<string, DigitalMarketingCity> = {
  brownsville: {
    slug: "brownsville",
    name: "Brownsville",
    metaTitle: "Digital Marketing Brownsville TX | RGV Performance Marketing",
    h1: "Digital Marketing in Brownsville, TX",
    heroSub: "Website, Google Maps, local SEO, ads and AI lead follow-up for Brownsville businesses, run by one Valley team on a month-to-month plan.",
    description: "Digital marketing for Brownsville businesses: website, Google Maps, local SEO, ads and AI lead follow-up from one Valley team. Month to month, no contract.",
    intro: {
      heading: "What Digital Marketing Looks Like for a Brownsville Business",
      answer: "Digital marketing for a Brownsville business means showing up when people in Brownsville search for what you sell, in English and Spanish, and answering every call and message fast enough to win the job. That takes a website, a strong Google Business Profile, local SEO, ads when you need calls now, and follow-up that never sleeps.",
      body: [
        "Most Brownsville owners we talk to have some of those pieces, set up by different people at different times, and nobody watching how they work together. We run all of them as one program and report on the only numbers that matter: calls, leads and booked jobs.",
      ],
    },
    details: {
      heading: "What's Different About Marketing in Brownsville",
      intro: "Brownsville is the Cameron County seat, it sits right on the border, and it's growing. A plan built for McAllen or Harlingen misses a few things that matter here.",
      points: [
        { title: "Many searches are in Spanish", text: "Shoppers and patients from Matamoros come over the Gateway, B&M and Veterans bridges, and many Brownsville residents search in Spanish first. A bilingual website and Google profile reach searches most local competitors never target." },
        { title: "A spread-out city on the map", text: "Google weighs distance in map results. A business near Boca Chica Boulevard and a customer on the north side off I-69E can be far apart in Google's eyes, so service areas and location pages need to cover the parts of town you actually serve." },
        { title: "New residents with no one to ask", text: "Growth around the Port of Brownsville and the space industry at Boca Chica brings people with no local referrals. They search Google and ask AI assistants for everything, so being findable there matters more than a flyer." },
        { title: "Reviews stand in for referrals", text: "In Brownsville, people ask family and neighbors who to call. Online, your Google reviews do that job, so we set up automatic review requests after each job to keep fresh, real reviews coming in." },
      ],
    },
    services: [
      { icon: "target", title: "Website design", text: "A fast, mobile-first site in English and Spanish, with a page for each service and city you serve.", href: "/website-design-brownsville-tx" },
      { icon: "search", title: "Local SEO", text: "Rank in Brownsville searches and the Google map pack with on-page work, local content and citations.", href: "/local-seo-brownsville-tx" },
      { icon: "map-pin", title: "Google Business Profile", text: "Categories, services, photos, posts and a steady flow of real reviews, so you compete for the top three map spots.", href: "/services/google-business-profile" },
      { icon: "megaphone", title: "Google & Meta ads", text: "Calls this month while SEO builds, tracked to the calls and forms they bring in.", href: "/services/paid-advertising" },
      { icon: "chat", title: "Lead follow-up", text: "Every call, text, form and message in one inbox, with a missed-call text back so leads don't go cold.", href: "/services/lead-management" },
      { icon: "cpu", title: "AI automation", text: "An AI receptionist and automatic follow-up that answer after hours and book while you work.", href: "/services/ai-implementation" },
    ],
    faqs: [
      { q: "Do you work with Brownsville businesses if you're based in Harlingen?", a: "Yes. Harlingen is about half an hour up I-69E, and we work with businesses across Cameron County. Most of the work happens remotely, and we can meet in person in Brownsville when that's easier." },
      { q: "Can you market my Brownsville business in Spanish?", a: "Yes. We build websites, Google Business Profile content and ads in English and Spanish. In Brownsville that matters more than almost anywhere else in the Valley, because so many customers search in Spanish." },
      { q: "How much does digital marketing cost in Brownsville?", a: "Our plans are month-to-month and listed below with their prices, from a managed website with one inbox for every lead up to full-service ads, content and reputation. On the first call we'll tell you which plan fits, including when the smallest one is enough." },
    ],
    nearby: [
      { href: "/local-seo-brownsville-tx", label: "Brownsville SEO services" },
      { href: "/website-design-brownsville-tx", label: "Website design in Brownsville" },
      { href: "/blog/local-seo-brownsville-tx-checklist", label: "Brownsville local SEO checklist for owners" },
      { href: "/blog/google-business-profile-checklist-rio-grande-valley", label: "Google Business Profile checklist for RGV businesses" },
      { href: "/digital-marketing-mcallen-tx", label: "Digital marketing in McAllen" },
      { href: "/local-seo-harlingen-tx", label: "Harlingen SEO services" },
    ],
  },
  mcallen: {
    slug: "mcallen",
    name: "McAllen",
    metaTitle: "Digital Marketing McAllen TX | RGV Performance Marketing",
    h1: "Digital Marketing in McAllen, TX",
    heroSub: "Website, Google Maps, local SEO, ads and AI lead follow-up for McAllen businesses, run by one Valley team on a month-to-month plan.",
    description: "Digital marketing for McAllen businesses: website, Google Maps, local SEO, ads and AI lead follow-up from one Valley team. Month to month, no contract.",
    intro: {
      heading: "What Digital Marketing Looks Like for a McAllen Business",
      answer: "Digital marketing for a McAllen business means getting into the Google map pack in the Valley's most crowded market, showing up in English and Spanish searches, and answering every lead before a competitor does. That takes a website, a strong Google Business Profile, local SEO, ads when you need calls now, and fast follow-up.",
      body: [
        "In McAllen the difference between the business that gets the call and the one that doesn't is often small: a few more reviews, a page for the exact service, a text back within minutes. We run every piece as one program and report on calls, leads and booked jobs.",
      ],
    },
    details: {
      heading: "What's Different About Marketing in McAllen",
      intro: "McAllen is the Valley's biggest market and its busiest search results. Customers come from all over Hidalgo County and from across the border. This is what a McAllen plan has to handle.",
      points: [
        { title: "The most crowded map pack in the Valley", text: "For searches like \"dentist McAllen\" or \"AC repair McAllen\", dozens of businesses sit within a few miles of each other. When distance is close to a tie, reviews, categories, photos and a complete profile decide who makes the top three." },
        { title: "Shoppers from Reynosa and Monterrey", text: "McAllen draws shoppers over the McAllen-Hidalgo and Anzalduas bridges, and many of them search in Spanish. Spanish pages, a bilingual profile and Spanish ads reach a market most McAllen competitors leave alone." },
        { title: "Edinburg, Mission and Pharr run together", text: "Customers cross city lines without noticing. Your service areas, pages and ad targeting should cover the neighboring cities you serve, not stop at your own zip code." },
        { title: "Speed wins the lead", text: "With this many options, a customer who doesn't hear back calls the next business. Missed-call text back, instant form replies and an AI receptionist after hours keep those leads from going to a competitor." },
      ],
    },
    services: [
      { icon: "target", title: "Website design", text: "A fast, mobile-first site in English and Spanish, with a page for each service and city you serve.", href: "/website-design-mcallen-tx" },
      { icon: "search", title: "Local SEO", text: "Compete in McAllen searches and the Google map pack with on-page work, local content and citations.", href: "/local-seo-mcallen-tx" },
      { icon: "map-pin", title: "Google Business Profile", text: "Categories, services, photos, posts and a steady flow of real reviews, so you compete for the top three map spots.", href: "/services/google-business-profile" },
      { icon: "megaphone", title: "Google & Meta ads", text: "Calls this month while SEO builds, tracked to the calls and forms they bring in.", href: "/services/paid-advertising" },
      { icon: "chat", title: "Lead follow-up", text: "Every call, text, form and message in one inbox, with a missed-call text back so leads don't go cold.", href: "/services/lead-management" },
      { icon: "cpu", title: "AI automation", text: "An AI receptionist and automatic follow-up for McAllen businesses that answer after hours and book while you work.", href: "/ai-implementation-mcallen-tx" },
    ],
    faqs: [
      { q: "Do you work with McAllen businesses if you're based in Harlingen?", a: "Yes. We work with businesses across Hidalgo County, McAllen included. Most of the work happens remotely, and we can meet in person in McAllen when that's easier." },
      { q: "How long until I see more calls in McAllen?", a: "Ads can bring calls within days of launch. Google Business Profile improvements often show in the first couple of months, while competitive city-wide rankings take several months of steady work. We report what moved every month, so you're never guessing." },
      { q: "How much does digital marketing cost in McAllen?", a: "Our plans are month-to-month and listed below with their prices, from a managed website with one inbox for every lead up to full-service ads, content and reputation. On the first call we'll tell you which plan fits, including when the smallest one is enough." },
    ],
    nearby: [
      { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
      { href: "/website-design-mcallen-tx", label: "Web design in McAllen" },
      { href: "/ai-implementation-mcallen-tx", label: "AI automation for McAllen businesses" },
      { href: "/blog/how-much-do-google-ads-cost-rio-grande-valley", label: "How much Google Ads cost in McAllen and Harlingen" },
      { href: "/blog/how-much-does-seo-cost-rio-grande-valley", label: "How much SEO costs in the RGV" },
      { href: "/digital-marketing-brownsville-tx", label: "Digital marketing in Brownsville" },
    ],
  },
};

export const digitalMarketingCitySlugs = Object.keys(DIGITAL_MARKETING_CITIES);

/* ---- Path helper + builders ---- */
export const digitalMarketingCityPath = (slug: string) => `/digital-marketing-${slug}-tx`;

export function getDigitalMarketingCity(slug: string): DigitalMarketingCity | undefined {
  return DIGITAL_MARKETING_CITIES[slug];
}

export function digitalMarketingCityMetadata(city: DigitalMarketingCity): Metadata {
  const url = canonical(digitalMarketingCityPath(city.slug));
  return {
    title: { absolute: city.metaTitle },
    description: city.description,
    keywords: DIGITAL_MARKETING.keywordCluster,
    alternates: { canonical: url },
    ...socialMeta({ url, title: city.metaTitle, description: city.description }),
  };
}

export function digitalMarketingCityCrumbs(city: DigitalMarketingCity) {
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: `Digital Marketing in ${city.name}, TX`, path: digitalMarketingCityPath(city.slug) },
  ];
}

/** City FAQs first, then the shared ones. Drives both the accordion and the FAQPage schema. */
export function digitalMarketingCityFaqs(city: DigitalMarketingCity): FaqItem[] {
  return [...city.faqs, ...DIGITAL_MARKETING_FAQS];
}

export function digitalMarketingCityJsonLd(city: DigitalMarketingCity) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Digital Marketing in ${city.name}, TX`,
      serviceType: DIGITAL_MARKETING.primaryKeyword,
      description: city.description,
      url: canonical(digitalMarketingCityPath(city.slug)),
      areaServed: { "@type": "City", name: `${city.name}, TX` },
      provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
    },
    breadcrumbSchema(digitalMarketingCityCrumbs(city)),
    faqSchema(digitalMarketingCityFaqs(city)),
  ];
}
