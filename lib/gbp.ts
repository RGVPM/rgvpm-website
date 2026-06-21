import type { Metadata } from "next";
import type { IconName } from "@/components/Icon";
import type { ServiceCityPageProps } from "@/components/ServiceCityPage";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema } from "@/lib/site";

export const GBP = {
  eyebrow: "Google Business Profile",
  primaryKeyword: "Google Business Profile optimization",
  keywordCluster: [
    "google business profile optimization",
    "google business profile management",
    "google maps optimization",
    "gmb optimization",
    "map pack ranking",
  ],
};

export const gbpCityPath = (slug: string) => `/google-business-profile-${slug}-tx`;

const INCLUDED: { icon: IconName; title: string; text: string }[] = [
  { icon: "map-pin", title: "Profile Setup & Verification", text: "We claim, verify, and fully build out your Google Business Profile — the foundation for showing up in the local map pack." },
  { icon: "target", title: "Category & Service Optimization", text: "We choose the right primary and secondary categories and list your services so Google matches you to the searches that matter." },
  { icon: "search", title: "Photos, Posts & Descriptions", text: "Optimized photos, regular posts, and a keyword-rich description that signal an active, trustworthy business to Google and customers." },
  { icon: "chat", title: "Review Generation & Responses", text: "A simple system to earn a steady stream of genuine reviews, plus professional responses — a major local ranking and trust signal." },
  { icon: "mail", title: "Q&A & Messaging Setup", text: "We seed your Q&A with the questions customers actually ask and set up messaging so leads can reach you straight from your profile." },
  { icon: "chart", title: "Map-Pack Tracking & Reporting", text: "We track your map-pack position for your key searches and report what's improving every month — calls, directions, and clicks." },
];

const STEPS: { title: string; text: string }[] = [
  { title: "Audit & Optimize", text: "We audit your current profile, fix what's holding it back, and fully optimize categories, services, photos, and your description for local search." },
  { title: "Build Reviews & Content", text: "We set up a review-generation system and keep your profile active with posts and updates — the signals Google rewards with map-pack visibility." },
  { title: "Track & Maintain", text: "We monitor your rankings, respond to reviews, keep your info accurate, and report your calls, directions, and map-pack position every month." },
];

const WHO = {
  heading: "Who it's for",
  intro: "Google Business Profile optimization is for any local business that wants to show up when nearby customers search. It's a fit if you:",
  bullets: [
    "Want to appear in the Google map pack and 'near me' searches",
    "Rely on calls, direction requests, or walk-ins from local customers",
    "Have an unclaimed, incomplete, or neglected Google profile",
    "Are losing nearby customers to competitors who rank above you",
  ],
};

const FAQS = [
  { q: "What is a Google Business Profile and why does it matter?", a: "Your Google Business Profile (formerly Google My Business) is the listing that shows up in Google Maps and the local 'map pack' at the top of local search results. For local businesses, it's often the single most important local ranking asset — it's what drives calls, direction requests, and walk-ins from people searching nearby. An optimized profile can outperform even your website for local visibility." },
  { q: "How long does it take to rank in the Google map pack?", a: "Most businesses see early improvement within 30–60 days of optimizing their profile and starting to build reviews, with stronger map-pack gains over 90–180 days. Competitive cities like McAllen take longer than smaller markets. Map rankings depend on profile completeness, reviews, proximity, and consistency, and they compound as the work continues." },
  { q: "Do you manage and respond to my reviews?", a: "Yes. We set up a system to help you earn a steady flow of genuine reviews from happy customers, and we respond to them professionally — including the occasional negative one. Review quantity, quality, recency, and responses are all major signals Google uses to rank local businesses, and they heavily influence whether someone chooses you." },
  { q: "Can you help if I don't have a storefront?", a: "Absolutely. Service-area businesses — contractors, home services, and pros who go to the customer — can rank in local search without showing a physical address. We set up your profile as a service-area business, define the cities you serve, and optimize it to compete in local results across the Valley." },
  { q: "Can you fix a suspended or duplicate Google profile?", a: "In most cases, yes. Suspended profiles, duplicate listings, and incorrect information are common problems that quietly kill local visibility. We audit your profile, identify the issue, and work through Google's reinstatement or merge process to get your listing back to full health." },
];

const RELATED: { href: string; title: string; text: string; icon: IconName }[] = [
  { href: "/services/local-seo", title: "Local SEO", text: "Pair your profile with on-page SEO to dominate local search.", icon: "search" },
  { href: "/services/website-design", title: "Website Design", text: "A fast, optimized website reinforces your local rankings.", icon: "target" },
  { href: "/services/social-media-newsletter", title: "Social & Reputation", text: "Stay active and protect the reputation that drives local trust.", icon: "calendar" },
];

interface CityCopy {
  h1: string;
  heroSub: string;
  description: string;
  intro: { heading: string; body: string[] };
}

export const GBP_CITIES: Record<string, CityCopy> = {
  harlingen: {
    h1: "Google Business Profile Optimization in Harlingen, TX",
    heroSub: "Win the Harlingen map pack. We optimize your Google Business Profile so nearby customers find and call you first.",
    description: "Google Business Profile optimization in Harlingen, TX. Map-pack visibility, review generation, and profile management from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in Harlingen", body: [
      "When a Harlingen customer searches for what you offer, the businesses in Google's map pack get the calls — and everyone else gets overlooked. As the Valley's commercial hub, Harlingen is competitive, which makes a fully optimized profile essential.",
      "We claim, optimize, and actively manage your Google Business Profile for Harlingen searches — building reviews, posting updates, and tracking your map-pack position so you become the obvious first choice for local customers.",
    ] },
  },
  mcallen: {
    h1: "Google Business Profile Optimization in McAllen, TX",
    heroSub: "Climb the McAllen map pack in the Valley's most competitive market. Full Google Business Profile optimization and review building.",
    description: "Google Business Profile optimization in McAllen, TX. Map-pack visibility, review generation, and profile management for the Valley's most competitive market, from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in McAllen", body: [
      "McAllen is the Valley's most competitive market, and the map pack is fiercely contested — a fully optimized, active Google Business Profile with strong reviews is what separates the businesses that get found from the ones that don't.",
      "We optimize and manage your profile to compete in McAllen: the right categories and services, a steady stream of genuine reviews, regular posts, and ongoing tracking so you climb the map pack and capture the calls.",
    ] },
  },
  brownsville: {
    h1: "Google Business Profile Optimization in Brownsville, TX",
    heroSub: "Get found by Brownsville's growing market. Full Google Business Profile optimization that puts you in the local map pack.",
    description: "Google Business Profile optimization in Brownsville, TX. Map-pack visibility, review generation, and profile management for a fast-growing market, from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in Brownsville", body: [
      "As Brownsville grows, more new residents are searching Google for local businesses every day — and the map pack is the first thing they see. An optimized profile is how you capture that rising demand early.",
      "We claim, optimize, and manage your Google Business Profile for Brownsville searches, building reviews and keeping it active so you rank in the map pack and turn the city's growth into calls and customers.",
    ] },
  },
  edinburg: {
    h1: "Google Business Profile Optimization in Edinburg, TX",
    heroSub: "Capture Edinburg's mobile, 'near me' searchers. Full Google Business Profile optimization that ranks you in the map pack.",
    description: "Google Business Profile optimization in Edinburg, TX. Map-pack visibility, review generation, and profile management for a young, mobile market, from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in Edinburg", body: [
      "With UTRGV and a young, always-mobile population, Edinburg runs on 'near me' searches — and those searches almost always end in the map pack. If you're not there, you're invisible to a huge share of local customers.",
      "We optimize and manage your Google Business Profile for Edinburg, building reviews and keeping your listing active and accurate so you show up first when nearby customers search on their phones.",
    ] },
  },
  mission: {
    h1: "Google Business Profile Optimization in Mission, TX",
    heroSub: "Be the first business Mission customers find. Full Google Business Profile optimization for local map-pack visibility.",
    description: "Google Business Profile optimization in Mission, TX. Map-pack visibility, review generation, and profile management from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in Mission", body: [
      "As Mission grows, more families are searching for local services nearby — and the businesses in Google's map pack are the ones that get the call. A complete, active profile is how you make sure that's you.",
      "We claim, optimize, and manage your Google Business Profile for Mission searches, earning reviews and keeping your listing active so you climb the map pack and turn local demand into customers.",
    ] },
  },
  weslaco: {
    h1: "Google Business Profile Optimization in Weslaco, TX",
    heroSub: "Capture the mid-Valley with a fully optimized Google Business Profile that ranks you in Weslaco's local map pack.",
    description: "Google Business Profile optimization in Weslaco, TX. Map-pack visibility, review generation, and profile management for the mid-Valley, from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in Weslaco", body: [
      "On the busy Expressway 83 corridor, Weslaco sees a steady stream of local and passing customers searching Google for nearby businesses — and the map pack is where those searches land.",
      "We optimize and manage your Google Business Profile for Weslaco, building reviews and keeping it active and accurate so you appear first in the map pack and turn that local traffic into calls and visits.",
    ] },
  },
  "san-benito": {
    h1: "Google Business Profile Optimization in San Benito, TX",
    heroSub: "Turn San Benito's word of mouth into map-pack visibility. Full Google Business Profile optimization and review building.",
    description: "Google Business Profile optimization in San Benito, TX. Map-pack visibility, review generation, and profile management from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in San Benito", body: [
      "In a close-knit community like San Benito, a recommendation almost always leads to a Google search — and what shows up decides whether you get the call. A strong, well-reviewed profile turns that word of mouth into business.",
      "We optimize and manage your Google Business Profile for San Benito, building genuine reviews and keeping your listing active so you rank in the map pack and make a strong first impression every time someone looks you up.",
    ] },
  },
  pharr: {
    h1: "Google Business Profile Optimization in Pharr, TX",
    heroSub: "Stand out in Pharr's busy market. Full Google Business Profile optimization that ranks you in the local map pack.",
    description: "Google Business Profile optimization in Pharr, TX. Map-pack visibility, review generation, and profile management for a busy commerce hub, from RGV Performance Marketing.",
    intro: { heading: "Own the Map Pack in Pharr", body: [
      "As one of the Valley's busiest commerce and logistics hubs, Pharr is a competitive market where local customers and businesses alike turn to Google's map pack to find who they need.",
      "We claim, optimize, and manage your Google Business Profile for Pharr searches, building reviews and keeping your listing active so you climb the map pack and become the result customers find and call first.",
    ] },
  },
};

export function getGbpCity(slug: string): CityCopy | undefined {
  return GBP_CITIES[slug];
}

export function gbpCityMetadata(slug: string, name: string): Metadata {
  const city = GBP_CITIES[slug];
  const url = canonical(gbpCityPath(slug));
  const title = `Google Business Profile Optimization in ${name}, TX | ${SITE.name}`;
  return {
    title: { absolute: title },
    description: city.description,
    keywords: GBP.keywordCluster,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description: city.description, siteName: SITE.name },
  };
}

export function gbpCityCrumbs(slug: string, name: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Google Business Profile", path: "/services/google-business-profile" },
    { name: `${name}, TX`, path: gbpCityPath(slug) },
  ];
}

export function gbpCityJsonLd(slug: string, name: string) {
  const city = GBP_CITIES[slug];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Google Business Profile Optimization in ${name}, TX`,
      serviceType: GBP.primaryKeyword,
      description: city.description,
      url: canonical(gbpCityPath(slug)),
      areaServed: { "@type": "City", name: `${name}, TX` },
      provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
    },
    breadcrumbSchema(gbpCityCrumbs(slug, name)),
    faqSchema(FAQS),
  ];
}

export function buildGbpCityProps(slug: string, name: string): ServiceCityPageProps {
  const city = GBP_CITIES[slug];
  return {
    eyebrow: GBP.eyebrow,
    h1: city.h1,
    heroSub: city.heroSub,
    crumbs: gbpCityCrumbs(slug, name),
    primaryCta: { label: "Get a Free Profile Audit →", href: "/contact" },
    cityIntro: city.intro,
    backToMainHref: "/services/google-business-profile",
    backToMainLabel: "← Explore our full Google Business Profile services",
    includedHeading: "Everything Your Profile Needs to Rank",
    includedSub: "A complete, managed Google Business Profile program — built to put you in the local map pack and keep you there.",
    included: INCLUDED,
    stepsHeading: "Our GBP Optimization Process",
    steps: STEPS,
    who: WHO,
    faqHeading: "Google Business Profile Questions, Answered",
    faqs: FAQS,
    related: RELATED,
  };
}
