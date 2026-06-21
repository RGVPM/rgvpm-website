import type { Metadata } from "next";
import type { IconName } from "@/components/Icon";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema } from "@/lib/site";

export interface FaqItem {
  q: string;
  a: string;
}

/** Shared, non-city content for the Local SEO service + city pages. */
export const LOCAL_SEO = {
  eyebrow: "Local SEO",
  primaryKeyword: "local SEO services",
  keywordCluster: [
    "local seo",
    "local seo services",
    "local seo company",
    "local search optimization",
    "google maps seo",
  ],
};

export const LOCAL_SEO_INCLUDED: { icon: IconName; title: string; text: string }[] = [
  { icon: "search", title: "Keyword & Competitor Research", text: "We find the exact searches your customers use and study who's ranking now — then build a plan to outrank them in your city." },
  { icon: "map-pin", title: "Google Business Profile Optimization", text: "We optimize your GBP to compete for the map pack — categories, services, photos, posts, and the signals Google rewards." },
  { icon: "target", title: "On-Page Optimization", text: "Titles, headings, location-targeted content, and schema markup so Google clearly understands what you do and where you do it." },
  { icon: "globe", title: "Bilingual Local Content", text: "Local, helpful content in English and Spanish that ranks for the searches your competitors are ignoring across the Valley." },
  { icon: "settings", title: "Citations & NAP Consistency", text: "Consistent name, address, and phone across the directories Google checks — a foundational local ranking signal done right." },
  { icon: "chart", title: "Tracking & Monthly Reporting", text: "We track your rankings, calls, and map-pack position and report what's improving every month — no vanity metrics." },
];

export const LOCAL_SEO_STEPS: { title: string; text: string }[] = [
  { title: "Audit & Research", text: "We benchmark where you rank today, analyze your top local competitors, and map the keywords and gaps that will move the needle in your city." },
  { title: "Optimize", text: "We optimize your Google Business Profile, pages, content, and citations — fixing what's holding you back and building the signals Google rewards." },
  { title: "Rank & Report", text: "We publish local content, earn the right signals over time, and report your rankings, calls, and map-pack position every month." },
];

export const LOCAL_SEO_WHO = {
  heading: "Who it's for",
  intro:
    "Our local SEO is built for service-based businesses that win or lose customers based on whether they show up in local search. It's a fit if you:",
  bullets: [
    "Serve customers in a specific city or service area",
    "Want to show up in Google's map pack and 'near me' searches",
    "Are getting beaten by competitors who simply rank higher",
    "Rely on calls, bookings, or walk-ins from people searching nearby",
  ],
};

export const LOCAL_SEO_FAQS: FaqItem[] = [
  {
    q: "How long does local SEO take to work?",
    a: "Local SEO is a compounding investment, not an overnight switch. Most businesses see early movement — Google Business Profile gains, map-pack impressions, and long-tail rankings — within 30 to 60 days. Meaningful ranking improvements for competitive city-level keywords typically build over 90 to 180 days and keep compounding as long as the work continues. We give you honest timelines and report progress every month so you always know where you stand.",
  },
  {
    q: "What is the Google map pack and why does it matter?",
    a: "The map pack is the block of three local businesses Google shows on a map at the top of local search results — above the regular blue links. For 'near me' and city-based searches, it captures the majority of clicks and calls because it's the first thing people see on mobile. Ranking in the map pack depends on your Google Business Profile, reviews, proximity, and local relevance signals, all of which our local SEO work is designed to strengthen.",
  },
  {
    q: "Can you guarantee a #1 ranking on Google?",
    a: "No honest agency can guarantee a specific ranking — Google's algorithm weighs hundreds of signals and no one controls it. What we can promise is a proven, transparent process: optimizing the factors Google actually rewards, tracking real results, and reporting them honestly every month. Be cautious of anyone who 'guarantees #1' — it usually means cutting corners that can get your listing penalized.",
  },
  {
    q: "What's the difference between local SEO and regular SEO?",
    a: "Regular SEO focuses on ranking for broad keywords nationally or globally. Local SEO focuses on ranking for searches tied to a place — your city, neighborhood, and 'near me' queries — and on the map pack, which regular SEO doesn't touch. It puts heavier weight on your Google Business Profile, local citations, reviews, and location-specific content. For a business that serves a local area, local SEO is what actually drives calls and customers.",
  },
  {
    q: "Do online reviews affect my local rankings?",
    a: "Yes — significantly. Review quantity, quality, recency, and how you respond are all signals Google uses to rank local businesses, and they're a major factor in whether someone chooses you over a competitor. We help you build a steady, ethical flow of genuine reviews and put a system in place to request them automatically, so your reputation grows alongside your rankings.",
  },
  {
    q: "Do you offer local SEO in Spanish?",
    a: "Absolutely. We create local content in English and Spanish, which is a real advantage across the Rio Grande Valley. Many of your customers search in Spanish, and most competitors only optimize for English — so bilingual local SEO lets you reach a market others are leaving on the table.",
  },
];

export const LOCAL_SEO_RELATED = [
  { href: "/services/google-business-profile", title: "Google Business Profile", text: "Win the map pack and turn nearby searches into calls.", icon: "map-pin" as IconName },
  { href: "/services/website-design", title: "Website Design", text: "A fast, SEO-ready site is the foundation local SEO builds on.", icon: "target" as IconName },
  { href: "/services/paid-advertising", title: "Paid Advertising", text: "Drive leads now while your local rankings compound over time.", icon: "megaphone" as IconName },
];

/* ---- Per-city unique content ---- */
export interface LocalSeoCity {
  h1: string;
  heroSub: string;
  description: string;
  intro: { heading: string; body: string[] };
}

export const LOCAL_SEO_CITIES: Record<string, LocalSeoCity> = {
  harlingen: {
    h1: "Local SEO Services in Harlingen, TX",
    heroSub: "Rank higher in Harlingen's local search results and map pack — so customers here find your business first instead of a competitor.",
    description: "Local SEO services in Harlingen, TX. Rank in the map pack and local search with on-page optimization, Google Business Profile work, and bilingual local content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for Harlingen Businesses",
      body: [
        "As the commercial hub of the Rio Grande Valley, Harlingen has a dense, competitive mix of healthcare, retail, and service businesses — which means more companies fighting for the same local searches you need to win.",
        "We're based right here in Harlingen, so we know the market. We optimize your Google Business Profile, pages, and content for the exact searches your Harlingen customers are typing, so you climb the map pack and turn local searches into calls.",
      ],
    },
  },
  mcallen: {
    h1: "Local SEO Services in McAllen, TX",
    heroSub: "Out-rank the competition in the Valley's busiest market. Local SEO that puts your McAllen business in the map pack and ahead of the pack.",
    description: "Local SEO services in McAllen, TX. Compete in the Valley's most crowded market with map-pack optimization, on-page SEO, and bilingual local content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for McAllen Businesses",
      body: [
        "McAllen is the largest and most competitive market in the Rio Grande Valley — and that's exactly why local SEO matters so much here. With so many businesses competing, the ones that rank in the map pack capture the calls, and everyone else gets overlooked.",
        "We help McAllen businesses earn that visibility. Through Google Business Profile optimization, location-targeted content, reviews, and citations, we build the local signals that move you up the rankings in the Valley's toughest market.",
      ],
    },
  },
  brownsville: {
    h1: "Local SEO Services in Brownsville, TX",
    heroSub: "Capture Brownsville's fast-growing market. Local SEO that ranks your business in local search and the map pack as the city booms.",
    description: "Local SEO services in Brownsville, TX. Rank in local search and the map pack in a fast-growing border city with optimization, content, and GBP work from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for Brownsville Businesses",
      body: [
        "Brownsville is growing fast — a historic port city now expanding alongside the space and tech investment out at Boca Chica. New customers are arriving, but so is new competition searching for businesses just like yours.",
        "Local SEO is how you stake your claim early. We optimize your Google Business Profile and pages for Brownsville searches, build local content and citations, and grow your reviews — so you capture this growth instead of watching competitors take it.",
      ],
    },
  },
  edinburg: {
    h1: "Local SEO Services in Edinburg, TX",
    heroSub: "Reach Edinburg's always-online community. Local SEO that ranks your business for 'near me' searches and the local map pack.",
    description: "Local SEO services in Edinburg, TX. Rank for local and 'near me' searches in a growing university city with on-page SEO, GBP optimization, and bilingual content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for Edinburg Businesses",
      body: [
        "As the seat of Hidalgo County and home to UTRGV, Edinburg blends an established professional base with a young, always-online population that searches for everything on their phones — usually with 'near me' attached.",
        "We help Edinburg businesses show up at that moment. Our local SEO optimizes your Google Business Profile and content for the mobile, local searches that drive walk-ins and calls, so you're the first option people see — not the third page they never reach.",
      ],
    },
  },
  mission: {
    h1: "Local SEO Services in Mission, TX",
    heroSub: "Get found by Mission customers searching for what you offer. Local SEO that ranks your business in local search and the map pack.",
    description: "Local SEO services in Mission, TX. Rank in local search and the map pack in a growing Valley community with on-page SEO, GBP optimization, and bilingual content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for Mission Businesses",
      body: [
        "Known as the Home of the Grapefruit, Mission has grown from its citrus roots into one of the Valley's thriving residential and small-business communities — and those new families search online for local services every day.",
        "We make sure they find you. Our local SEO optimizes your Google Business Profile, pages, and content for Mission-area searches, builds your reviews and citations, and helps you climb the map pack so local demand turns into booked customers.",
      ],
    },
  },
  weslaco: {
    h1: "Local SEO Services in Weslaco, TX",
    heroSub: "Win the mid-Valley market. Local SEO that ranks your Weslaco business in local search and captures customers along the Expressway 83 corridor.",
    description: "Local SEO services in Weslaco, TX. Rank in local search and the map pack across the mid-Valley with on-page SEO, GBP optimization, and bilingual local content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for Weslaco Businesses",
      body: [
        "Sitting in the heart of the mid-Valley along the busy Expressway 83 corridor, Weslaco puts your business in front of a steady stream of local residents and passing traffic — but only if you show up when they search.",
        "We help you get there. Our local SEO targets the searches Weslaco customers actually use, optimizes your Google Business Profile for the map pack, and builds local content and citations so you capture both the neighbors and the travelers looking for what you offer.",
      ],
    },
  },
  "san-benito": {
    h1: "Local SEO Services in San Benito, TX",
    heroSub: "Turn San Benito's word of mouth into Google searches that find you. Local SEO that ranks your business in local search and the map pack.",
    description: "Local SEO services in San Benito, TX. Rank in local search and the map pack in a close-knit community with on-page SEO, GBP optimization, reviews, and bilingual content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for San Benito Businesses",
      body: [
        "In a close-knit community like San Benito, word of mouth is powerful — and today that word of mouth ends in a Google search. When a neighbor recommends you, the next thing they do is look you up, and what they find decides whether they call.",
        "We make sure they find a strong, well-ranked profile. Our local SEO optimizes your Google Business Profile, grows your reviews, and builds the local signals that put you at the top of San Benito searches, so your reputation translates directly into customers.",
      ],
    },
  },
  pharr: {
    h1: "Local SEO Services in Pharr, TX",
    heroSub: "Stand out in a major commerce hub. Local SEO that ranks your Pharr business in local search and the map pack for the customers who matter.",
    description: "Local SEO services in Pharr, TX. Rank in local search and the map pack in a busy commerce and logistics hub with on-page SEO, GBP optimization, and bilingual content from RGV Performance Marketing.",
    intro: {
      heading: "Local SEO Built for Pharr Businesses",
      body: [
        "Anchored by the Pharr-Reynosa International Bridge, Pharr is one of the Valley's busiest commerce and logistics hubs, with a steady flow of business and a competitive local market on both the consumer and B2B side.",
        "We help your business cut through it. Our local SEO optimizes your Google Business Profile and pages for Pharr searches, builds local content and citations, and grows your reviews — so whether you serve residents or other businesses, you're the result they find first.",
      ],
    },
  },
};

/* ---- Path helper + builders ---- */
export const localSeoCityPath = (slug: string) => `/local-seo-${slug}-tx`;

export function getLocalSeoCity(slug: string): LocalSeoCity | undefined {
  return LOCAL_SEO_CITIES[slug];
}

export function localSeoCityMetadata(slug: string, name: string): Metadata {
  const city = LOCAL_SEO_CITIES[slug];
  const url = canonical(localSeoCityPath(slug));
  const title = `Local SEO Services in ${name}, TX | ${SITE.name}`;
  return {
    title: { absolute: title },
    description: city.description,
    keywords: LOCAL_SEO.keywordCluster,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description: city.description, siteName: SITE.name },
  };
}

export function localSeoCityCrumbs(slug: string, name: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Local SEO", path: "/services/local-seo" },
    { name: `${name}, TX`, path: localSeoCityPath(slug) },
  ];
}

export function localSeoCityJsonLd(slug: string, name: string) {
  const city = LOCAL_SEO_CITIES[slug];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Local SEO Services in ${name}, TX`,
      serviceType: LOCAL_SEO.primaryKeyword,
      description: city.description,
      url: canonical(localSeoCityPath(slug)),
      areaServed: { "@type": "City", name: `${name}, TX` },
      provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
    },
    breadcrumbSchema(localSeoCityCrumbs(slug, name)),
    faqSchema(LOCAL_SEO_FAQS.map((f) => ({ q: f.q, a: f.a }))),
  ];
}
