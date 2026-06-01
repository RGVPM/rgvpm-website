import type { IconName } from "@/components/Icon";

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedLink {
  href: string;
  title: string;
  text: string;
  icon: IconName;
}

/** Shared, non-city content for the Website Design service + city pages. */

export const WEB_DESIGN = {
  eyebrow: "Website Design",
  h1: "We Build Websites That Work",
  heroSub:
    "Fast, mobile-first websites built to rank on Google and turn visitors into leads — not just look good. Every site we build is designed around one goal: growing your business.",
  metaTitle: "Website Design Services for Small Businesses",
  metaDescription:
    "Professional website design for small businesses — fast, mobile-first sites with on-page SEO and lead capture built in. Custom-quoted by RGV Performance Marketing in the Rio Grande Valley.",
  primaryKeyword: "website design services",
  keywordCluster: [
    "website design",
    "website design services",
    "small business website design",
    "professional website design",
  ],
};

export const WEB_DESIGN_INCLUDED: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Custom Design",
    text: "A site designed around your brand and your customers — not a recycled template everyone else is using.",
  },
  {
    icon: "phone",
    title: "Mobile-Optimized",
    text: "Most local searches happen on a phone. Your site looks and works flawlessly on every screen size.",
  },
  {
    icon: "search",
    title: "On-Page SEO Built In",
    text: "Proper titles, headings, structure, and schema baked in from day one so Google understands and ranks your site.",
  },
  {
    icon: "bolt",
    title: "Fast Load Times",
    text: "Speed is a ranking factor and a conversion factor. We build lean, fast-loading pages that don't make visitors wait.",
  },
  {
    icon: "mail",
    title: "Lead Capture Forms",
    text: "Forms placed and built to convert, so visitors become leads instead of just browsing and bouncing.",
  },
  {
    icon: "settings",
    title: "Integrated With Lead Management",
    text: "Every form connects straight into your lead management system, so new inquiries get captured and followed up automatically.",
  },
  {
    icon: "globe",
    title: "Bilingual (EN/ES) Available",
    text: "Reach the full Rio Grande Valley market with a site in English, Spanish, or both.",
  },
];

export const WEB_DESIGN_STEPS: { title: string; text: string }[] = [
  {
    title: "Discovery",
    text: "We learn your business, your goals, your customers, and your competitors — then map out the pages and content your site needs to rank and convert.",
  },
  {
    title: "Build",
    text: "We design and develop a fast, mobile-first site with your branding, SEO structure, and lead capture built in — reviewing it with you along the way.",
  },
  {
    title: "Launch",
    text: "We launch your site, connect your forms to your lead management system, set up tracking, and make sure every piece works. Then we're here for ongoing changes.",
  },
];

export const WEB_DESIGN_WHO = {
  heading: "Who it's for",
  intro:
    "Our website design is built for service-based local businesses that need a professional online presence that actually drives leads. It's a fit if you:",
  bullets: [
    "Need a professional online presence that builds instant trust",
    "Have an outdated, slow, or non-mobile site that's costing you leads",
    "Want a website built to rank on Google — not just look pretty",
    "Rely on customers finding and contacting you online",
  ],
};

export const WEB_DESIGN_PRICING_NOTE =
  "Website design is custom-quoted based on the scope of your project — the number of pages, features, and content you need. Fill out the form below and we'll put together a quote built around your business.";

export const WEB_DESIGN_FAQS: FaqItem[] = [
  {
    q: "How long does a website take to build?",
    a: "Most small business websites launch in two to four weeks. The exact timeline depends on the number of pages, the features you need, and how quickly we can gather your content and feedback. We give you a clear schedule before we start and keep you updated at every step.",
  },
  {
    q: "Do I own the website when it's done?",
    a: "Yes. The website files — design, code, images, and copy — belong to you once final payment is made, and we'll provide them on request. We build your site as an asset for your business, not something you rent from us.",
  },
  {
    q: "Is SEO included?",
    a: "Yes. On-page SEO is built into every site we design — proper titles, headings, structure, fast load times, and schema markup so Google can understand and rank your pages. Ongoing local SEO to climb the rankings over time is available as a separate service.",
  },
  {
    q: "Can you build in Spanish too?",
    a: "Absolutely. We build bilingual sites in English and Spanish, which is a real advantage in the Rio Grande Valley. A site that speaks to your full market helps you reach customers your competitors are overlooking.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Active clients on a paid plan get unlimited website update requests at no extra charge — just submit them at least 24 hours in advance. New pages, full redesigns, or significant structural changes may be quoted separately, and we'll always tell you up front.",
  },
];

export const WEB_DESIGN_RELATED: RelatedLink[] = [
  {
    href: "/services/local-seo",
    title: "Local SEO",
    text: "Rank higher in your city and service area so customers find you first.",
    icon: "search",
  },
  {
    href: "/services/google-business-profile",
    title: "Google Business Profile",
    text: "Win the map pack and turn nearby searches into calls.",
    icon: "map-pin",
  },
  {
    href: "/services/lead-management",
    title: "Lead Management",
    text: "Capture every inquiry your new site generates and convert more of them.",
    icon: "settings",
  },
];
