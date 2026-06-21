import type { Metadata } from "next";
import type { IconName } from "@/components/Icon";
import type { ServiceCityPageProps } from "@/components/ServiceCityPage";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema } from "@/lib/site";

export const GOOGLE_ADS = {
  eyebrow: "Paid Advertising",
  primaryKeyword: "Google Ads management",
  keywordCluster: [
    "google ads management",
    "google ads agency",
    "ppc management",
    "paid advertising",
    "facebook ads management",
  ],
};

export const googleAdsCityPath = (slug: string) => `/google-ads-management-${slug}-tx`;

const INCLUDED: { icon: IconName; title: string; text: string }[] = [
  { icon: "target", title: "Campaign Strategy & Setup", text: "We build your Google and Meta campaigns from scratch — structured around your services, your goals, and the customers most likely to buy." },
  { icon: "search", title: "Keyword & Audience Targeting", text: "We target the exact searches and audiences that turn into leads, and add negative keywords so you're not paying for clicks that never convert." },
  { icon: "mail", title: "Ad Copy & Creative (EN/ES)", text: "Compelling, bilingual ad copy and creative that earns the click — written to speak to your market in English and Spanish." },
  { icon: "bolt", title: "Landing Page Alignment", text: "We make sure your ads point to pages built to convert, so the clicks you pay for actually become calls and form fills." },
  { icon: "chart", title: "Budget & Bid Management", text: "We manage every dollar — bids, budgets, and pacing — to get you the most leads for your spend, not wasted impressions." },
  { icon: "settings", title: "Conversion Tracking & Reporting", text: "We track calls, forms, and bookings so you see real cost-per-lead and ROI every month — not vanity clicks." },
];

const STEPS: { title: string; text: string }[] = [
  { title: "Plan & Launch", text: "We research your market and competitors, set up tracking, build your campaigns and creative, and launch with the right budget and targeting." },
  { title: "Manage & Optimize", text: "We watch performance daily — adjusting bids, pausing what doesn't work, testing new ads, and cutting wasted spend to lower your cost per lead." },
  { title: "Report & Scale", text: "You get clear monthly reporting on leads and ROI. As we find what works, we scale the winners so every added dollar brings in more customers." },
];

const WHO = {
  heading: "Who it's for",
  intro: "Our paid advertising is built for local businesses that want leads now — not in six months. It's a fit if you:",
  bullets: [
    "Want to generate leads quickly while your SEO builds over time",
    "Have a monthly ad budget you want managed well, not wasted",
    "Are tired of boosting posts with nothing to show for it",
    "Want to know your real cost per lead and return on ad spend",
  ],
};

const FAQS = [
  { q: "How much should I budget for Google or Facebook ads?", a: "It depends on your market and goals, but most local businesses start with an ad budget of $1,000–$3,000 per month plus management. More competitive cities and services cost more per click, so we help you set a realistic budget that can actually generate results, and we manage every dollar of it. We'd rather you start at a level that works than spread too little too thin." },
  { q: "Does the ad spend come out of my plan fee?", a: "No. Ad management is included in your plan, but the actual ad spend — what you pay Google or Meta to show your ads — is a separate budget billed directly to you by the platform. We help you set the right amount and manage it carefully; you fund the ad account directly so you stay in full control of your spend." },
  { q: "Should I run Google Ads or Facebook/Instagram Ads?", a: "It depends on how your customers search. Google Ads capture people actively searching for what you offer right now — high intent, ready to buy. Facebook and Instagram ads put you in front of the right local audience before they search, building awareness and demand. Many businesses benefit from both, and we'll recommend the right mix for your goals and budget." },
  { q: "How quickly will I see leads from ads?", a: "Paid ads are the fastest channel — many businesses start getting leads within the first week of launching. The first few weeks are a learning period as we gather data and optimize, so results typically improve and stabilize over the first 30–60 days as we cut wasted spend and scale what works." },
  { q: "How do I know the ads are actually working?", a: "We set up conversion tracking from day one, so you see exactly how many calls, form fills, and bookings your ads produce and what each one costs. Every month you get a clear report on leads and return on ad spend — real business results, not just clicks and impressions." },
];

const RELATED: { href: string; title: string; text: string; icon: IconName }[] = [
  { href: "/services/local-seo", title: "Local SEO", text: "Build free, compounding rankings while your ads bring in leads now.", icon: "search" },
  { href: "/services/website-design", title: "Website Design", text: "Send your ad clicks to pages built to convert into leads.", icon: "target" },
  { href: "/services/lead-management", title: "Lead Management", text: "Capture and follow up with every lead your ads generate.", icon: "settings" },
];

interface CityCopy {
  h1: string;
  heroSub: string;
  description: string;
  intro: { heading: string; body: string[] };
}

export const GOOGLE_ADS_CITIES: Record<string, CityCopy> = {
  harlingen: {
    h1: "Google Ads Management in Harlingen, TX",
    heroSub: "Get in front of Harlingen customers the moment they search. Managed Google and Meta ads that turn ad spend into booked leads.",
    description: "Google Ads & paid advertising management in Harlingen, TX. Managed Google and Facebook ad campaigns built to generate leads, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Work in Harlingen", body: [
      "As the commercial hub of the Valley, Harlingen is a competitive market — and paid ads are how you get instant visibility while your local SEO builds over time. Done right, they put you at the top of the page the moment a customer searches.",
      "We manage Google and Meta campaigns for Harlingen businesses with one focus: leads, not clicks. We target the right searches, write ads that convert, and manage your budget so every dollar works as hard as possible.",
    ] },
  },
  mcallen: {
    h1: "Google Ads Management in McAllen, TX",
    heroSub: "Win the Valley's most competitive market with tightly managed Google and Meta ads that turn budget into booked customers.",
    description: "Google Ads & paid advertising management in McAllen, TX. Tightly managed Google and Facebook campaigns built for the Valley's most competitive market, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Win in McAllen", body: [
      "McAllen is the Valley's largest and most competitive market, which means clicks cost more and wasted spend adds up fast. Winning here takes tight targeting, sharp ad copy, and disciplined budget management — not a set-it-and-forget-it approach.",
      "We manage Google and Meta campaigns for McAllen businesses to maximize leads per dollar: cutting wasted spend, testing relentlessly, and scaling what works so you compete profitably in the Valley's toughest market.",
    ] },
  },
  brownsville: {
    h1: "Google Ads Management in Brownsville, TX",
    heroSub: "Capture Brownsville's growing demand the instant it searches. Managed Google and Meta ads built to generate leads now.",
    description: "Google Ads & paid advertising management in Brownsville, TX. Managed Google and Facebook campaigns built to capture a fast-growing market, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Capture Brownsville", body: [
      "Brownsville is growing fast, and paid ads let you capture that rising demand immediately — appearing right when new residents and businesses search for what you offer, instead of waiting months to rank.",
      "We manage Google and Meta campaigns for Brownsville businesses with a focus on real leads: the right targeting, bilingual ad copy that converts, and careful budget management so you grow alongside the city instead of overpaying for it.",
    ] },
  },
  edinburg: {
    h1: "Google Ads Management in Edinburg, TX",
    heroSub: "Reach Edinburg's always-online audience the moment they're ready to buy. Managed Google and Meta ads that produce leads.",
    description: "Google Ads & paid advertising management in Edinburg, TX. Managed Google and Facebook campaigns targeting a young, mobile market, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Reach Edinburg", body: [
      "Home to UTRGV and a young, always-online population, Edinburg is a market where the right ad in front of the right person at the right moment drives immediate action — especially on mobile and social.",
      "We manage Google and Meta campaigns for Edinburg businesses to capture that intent: targeting the searches and audiences that convert, writing ads that earn the click, and tracking every lead so you know exactly what your spend produces.",
    ] },
  },
  mission: {
    h1: "Google Ads Management in Mission, TX",
    heroSub: "Put your Mission business in front of ready-to-buy customers with managed Google and Meta ads built to generate leads.",
    description: "Google Ads & paid advertising management in Mission, TX. Managed Google and Facebook campaigns built to generate local leads, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Grow Mission Businesses", body: [
      "As Mission keeps growing, more families are searching for local services every day — and paid ads put your business in front of them at the exact moment they're ready to act.",
      "We manage Google and Meta campaigns for Mission businesses with one goal: turning ad spend into booked leads. Smart targeting, bilingual creative, and careful budget management mean every dollar is working to bring in customers.",
    ] },
  },
  weslaco: {
    h1: "Google Ads Management in Weslaco, TX",
    heroSub: "Capture local and passing demand along the Expressway 83 corridor with managed Google and Meta ads built to drive leads.",
    description: "Google Ads & paid advertising management in Weslaco, TX. Managed Google and Facebook campaigns built to capture the mid-Valley market, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Work in Weslaco", body: [
      "Sitting on the busy Expressway 83 corridor in the heart of the mid-Valley, Weslaco businesses have a steady flow of potential customers — and paid ads put you in front of them right when they're searching.",
      "We manage Google and Meta campaigns for Weslaco businesses to turn that visibility into leads: targeting the right searches and audiences, writing ads that convert, and managing your budget so nothing is wasted.",
    ] },
  },
  "san-benito": {
    h1: "Google Ads Management in San Benito, TX",
    heroSub: "Get more leads for less in San Benito with managed Google and Meta ads in a less crowded, lower-cost market.",
    description: "Google Ads & paid advertising management in San Benito, TX. Managed Google and Facebook campaigns built to generate affordable local leads, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Pay Off in San Benito", body: [
      "In a smaller, less crowded market like San Benito, paid ads can deliver an excellent return — clicks often cost less than in McAllen or Brownsville, so a modest, well-managed budget can produce real leads.",
      "We manage Google and Meta campaigns for San Benito businesses to make the most of that advantage: sharp targeting, bilingual ad copy, and tight budget management so every dollar brings in customers, not wasted clicks.",
    ] },
  },
  pharr: {
    h1: "Google Ads Management in Pharr, TX",
    heroSub: "Reach Pharr's consumers and businesses the moment they search with managed Google and Meta ads built to generate leads.",
    description: "Google Ads & paid advertising management in Pharr, TX. Managed Google and Facebook campaigns built for a busy commerce and logistics hub, from RGV Performance Marketing.",
    intro: { heading: "Paid Ads That Work in Pharr", body: [
      "As one of the Valley's busiest commerce and logistics hubs, Pharr has a competitive market on both the consumer and B2B side — and paid ads let you reach the right audience the instant they're searching.",
      "We manage Google and Meta campaigns for Pharr businesses with a focus on leads: targeting the searches and audiences that matter, writing ads that convert, and managing every dollar so your spend produces real customers.",
    ] },
  },
};

export function getGoogleAdsCity(slug: string): CityCopy | undefined {
  return GOOGLE_ADS_CITIES[slug];
}

export function googleAdsCityMetadata(slug: string, name: string): Metadata {
  const city = GOOGLE_ADS_CITIES[slug];
  const url = canonical(googleAdsCityPath(slug));
  const title = `Google Ads Management in ${name}, TX | ${SITE.name}`;
  return {
    title: { absolute: title },
    description: city.description,
    keywords: GOOGLE_ADS.keywordCluster,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description: city.description, siteName: SITE.name },
  };
}

export function googleAdsCityCrumbs(slug: string, name: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Paid Advertising", path: "/services/paid-advertising" },
    { name: `${name}, TX`, path: googleAdsCityPath(slug) },
  ];
}

export function googleAdsCityJsonLd(slug: string, name: string) {
  const city = GOOGLE_ADS_CITIES[slug];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Google Ads Management in ${name}, TX`,
      serviceType: GOOGLE_ADS.primaryKeyword,
      description: city.description,
      url: canonical(googleAdsCityPath(slug)),
      areaServed: { "@type": "City", name: `${name}, TX` },
      provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
    },
    breadcrumbSchema(googleAdsCityCrumbs(slug, name)),
    faqSchema(FAQS),
  ];
}

export function buildGoogleAdsCityProps(slug: string, name: string): ServiceCityPageProps {
  const city = GOOGLE_ADS_CITIES[slug];
  return {
    eyebrow: GOOGLE_ADS.eyebrow,
    h1: city.h1,
    heroSub: city.heroSub,
    crumbs: googleAdsCityCrumbs(slug, name),
    primaryCta: { label: "Get a Free Ad Strategy Call →", href: "/contact" },
    cityIntro: city.intro,
    backToMainHref: "/services/paid-advertising",
    backToMainLabel: "← Explore our full paid advertising services",
    includedHeading: "Everything Your Ads Need to Perform",
    includedSub: "A complete, managed paid advertising program — built to turn your ad budget into booked leads.",
    included: INCLUDED,
    stepsHeading: "Our Paid Ads Process",
    steps: STEPS,
    who: WHO,
    faqHeading: "Paid Advertising Questions, Answered",
    faqs: FAQS,
    related: RELATED,
  };
}
