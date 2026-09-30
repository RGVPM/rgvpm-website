import type { Metadata } from "next";
import type { IconName } from "@/components/Icon";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/site";
import type { CityDetailsContent } from "@/components/CityDetails";
import type { CityLink } from "@/components/CityLinks";

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
  /** Optional <title> override (absolute, ≤60 chars). Defaults to the shared template. */
  metaTitle?: string;
  /** Optional city-specific section: what's different about ranking in this market. */
  details?: CityDetailsContent;
  /** Optional city-specific FAQs, shown before the shared ones (and in FAQPage schema). */
  faqs?: FaqItem[];
  /** Optional hand-picked internal links to related city pages. */
  nearby?: CityLink[];
}

export const LOCAL_SEO_CITIES: Record<string, LocalSeoCity> = {
  harlingen: {
    metaTitle: "Harlingen SEO: Local, Affordable | RGV Performance Marketing",
    h1: "Harlingen SEO & Local SEO Services",
    heroSub: "Rank higher in Harlingen's local search results and map pack — so customers here find your business first instead of a competitor.",
    description: "Harlingen SEO from a Harlingen-based team. Climb Google Maps and local search on a month-to-month plan: no contract, and a ranking report every month.",
    intro: {
      heading: "SEO in Harlingen, From a Harlingen Team",
      body: [
        "As the commercial hub of the Rio Grande Valley, Harlingen has a dense, competitive mix of healthcare, retail, and service businesses — which means more companies fighting for the same local searches you need to win.",
        "We're based right here in Harlingen, so we know the market. We optimize your Google Business Profile, pages, and content for the exact searches your Harlingen customers are typing, so you climb the map pack and turn local searches into calls.",
      ],
    },
    details: {
      heading: "What Harlingen SEO Work Looks Like",
      intro: "Harlingen is small enough that a handful of businesses own each map pack, and big enough that those spots are worth fighting for. Here is where we focus for Harlingen clients.",
      points: [
        { title: "Every way people phrase the search", text: "Customers type \"seo harlingen\", \"harlingen tx roofer\", \"dentist near me\" and the same thing in Spanish. We map those variations to the right page on your site so Google has one clear answer for each." },
        { title: "The map pack comes first", text: "For most Harlingen service searches, the three map results take the clicks before anyone scrolls. Your Google Business Profile categories, services, photos and reviews get worked on before anything else." },
        { title: "Serving the whole Valley from Harlingen", text: "Harlingen sits between McAllen and Brownsville, and many businesses here serve both. Ranking in Harlingen does not carry over to other cities, so we add service-area pages for the cities you actually drive to." },
        { title: "Affordable, month to month", text: "SEO is included in our plans with no long-term contract. You get a report each month showing rankings, map views and calls, and you stay because it's working, not because a contract says so." },
      ],
    },
    faqs: [
      { q: "How much does SEO cost in Harlingen?", a: "Our local SEO work is included in month-to-month plans with no long-term contract, and every plan and price is listed on our pricing page. Website design is quoted separately if you need a new site. We'll tell you on the first call which plan fits, including when a smaller plan is enough." },
      { q: "Can I meet with you in Harlingen?", a: "Yes. We're a Harlingen-based team, so we can meet in person or talk by phone or video, whichever is easier for you. Most of the ongoing work is handled remotely, and you get a monthly report either way." },
      { q: "My business serves the whole Valley. Can I still rank in Harlingen?", a: "Yes. Your Google Business Profile ranks strongest near your address, and dedicated pages help you show up in the other cities you serve. We usually start with Harlingen, then add pages for McAllen, Brownsville or wherever your customers are." },
    ],
    nearby: [
      { href: "/website-design-harlingen-tx", label: "Website design in Harlingen" },
      { href: "/google-business-profile-harlingen-tx", label: "Google Business Profile optimization in Harlingen" },
      { href: "/google-ads-management-harlingen-tx", label: "Google Ads management in Harlingen" },
      { href: "/blog/digital-marketing-harlingen-tx-guide", label: "Digital marketing in Harlingen: 2026 guide" },
      { href: "/local-seo-brownsville-tx", label: "Local SEO in Brownsville" },
      { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
      { href: "/local-seo-san-benito-tx", label: "Local SEO in San Benito" },
    ],
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
    metaTitle: "Brownsville SEO & Local SEO, TX | RGV Performance Marketing",
    h1: "Brownsville SEO & Local SEO Services",
    heroSub: "Capture Brownsville's fast-growing market. Local SEO that ranks your business in local search and the map pack as the city booms.",
    description: "Brownsville SEO from a Valley team: Google Maps rankings, English and Spanish content, monthly reports, no long-term contract. Get a free ranking review.",
    intro: {
      heading: "Local SEO Built for Brownsville Businesses",
      body: [
        "Brownsville is growing fast — a historic port city now expanding alongside the space and tech investment out at Boca Chica. New customers are arriving, but so is new competition searching for businesses just like yours.",
        "Local SEO is how you stake your claim early. We optimize your Google Business Profile and pages for Brownsville searches, build local content and citations, and grow your reviews — so you capture this growth instead of watching competitors take it.",
      ],
    },
    details: {
      heading: "What It Takes to Rank in Brownsville",
      intro: "Brownsville searches don't behave like Harlingen or McAllen searches. The city is spread out, it's the Cameron County seat, and a lot of its customers cross the border or just moved here. This is what we plan around.",
      points: [
        { title: "Distance across a spread-out city", text: "Google weighs how close a business is to the person searching. A shop near the Boca Chica Boulevard corridor and a customer on the north side off I-69E can be far apart in Google's eyes. We set up your service areas and location pages so you show up across the parts of town you actually serve." },
        { title: "Customers from across the border", text: "Shoppers and patients from Matamoros come over the Gateway, B&M and Veterans bridges, and many of them search in Spanish. Spanish service pages and a bilingual Google Business Profile let you rank for searches that most competitors never target." },
        { title: "New residents who don't know anyone yet", text: "Growth around the Port of Brownsville and the space industry at Boca Chica is bringing in people with no local referrals to lean on. They search Google for everything. Ranking now means they find you before they find a competitor." },
        { title: "Reviews stand in for referrals", text: "In Brownsville, people ask family and neighbors who to call. Online, your Google reviews do that job. We set up automatic review requests after each job so your profile keeps getting fresh, real reviews." },
      ],
    },
    faqs: [
      { q: "Do I need an office in Brownsville to rank in Brownsville?", a: "Not always. Google ranks map results mostly on how close you are to the searcher, so an address in Brownsville helps the most. Service-area businesses that travel to customers can still rank by setting Brownsville as a service area and having a strong Brownsville page on their site. We're based in Harlingen, about half an hour up I-69E, and work with businesses across Brownsville." },
      { q: "How is Brownsville SEO different from Harlingen or McAllen SEO?", a: "Each city has its own map pack and its own set of competitors, so ranking in Harlingen does nothing for Brownsville searches. Brownsville also has a larger share of Spanish-language and cross-border searches, so bilingual content matters more here than almost anywhere else in the Valley." },
      { q: "What's included in a Brownsville local SEO plan?", a: "Google Business Profile optimization, on-page SEO for your Brownsville pages, local content in English and Spanish, citation cleanup, review requests, and a monthly report on rankings, map views and calls. Plans are month-to-month, and every plan and price is on our pricing page." },
      { q: "Should I run ads in Brownsville while SEO builds?", a: "If you need calls this month, yes. Google Ads can put you at the top of Brownsville searches within days, while local SEO takes a few months to build. Many businesses run both, then lean more on SEO as rankings grow and the cost per lead drops." },
    ],
    nearby: [
      { href: "/google-business-profile-brownsville-tx", label: "Google Business Profile optimization in Brownsville" },
      { href: "/website-design-brownsville-tx", label: "Website design in Brownsville" },
      { href: "/google-ads-management-brownsville-tx", label: "Google Ads management in Brownsville" },
      { href: "/local-seo-harlingen-tx", label: "Harlingen SEO services" },
      { href: "/local-seo-san-benito-tx", label: "Local SEO in San Benito" },
      { href: "/blog/how-to-rank-higher-google-maps-rio-grande-valley", label: "How to rank higher on Google Maps in the RGV" },
    ],
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
  const title = city.metaTitle ?? `Local SEO Services in ${name}, TX | ${SITE.name}`;
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
    localBusinessSchema(),
    breadcrumbSchema(localSeoCityCrumbs(slug, name)),
    faqSchema(localSeoCityFaqs(slug)),
  ];
}

/** City FAQs first, then the shared ones. Drives both the accordion and the FAQPage schema. */
export function localSeoCityFaqs(slug: string): FaqItem[] {
  return [...(LOCAL_SEO_CITIES[slug]?.faqs ?? []), ...LOCAL_SEO_FAQS];
}

/** Default "nearby" links for a city page that has no hand-picked list. */
export function localSeoCityLinks(slug: string, name: string): CityLink[] {
  const city = LOCAL_SEO_CITIES[slug];
  if (city?.nearby) return city.nearby;
  return [
    { href: `/website-design-${slug}-tx`, label: `Website design in ${name}, TX` },
    { href: `/google-business-profile-${slug}-tx`, label: `Google Business Profile in ${name}` },
    { href: `/google-ads-management-${slug}-tx`, label: `Google Ads management in ${name}` },
    { href: "/blog/local-seo-vs-regular-seo", label: "Local SEO vs. regular SEO, explained" },
  ];
}
