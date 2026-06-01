import type { Metadata } from "next";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema } from "@/lib/site";
import { WEB_DESIGN, WEB_DESIGN_FAQS } from "@/lib/webDesign";
import { AI_IMPL, AI_FAQS } from "@/lib/aiImplementation";

export interface CityVariant {
  h1: string;
  heroSub: string;
  description: string;
  intro: { heading: string; body: string[] };
}

export interface City {
  slug: string;
  name: string;
  webDesign: CityVariant;
  ai: CityVariant;
}

export const cities: City[] = [
  {
    slug: "harlingen",
    name: "Harlingen",
    webDesign: {
      h1: "Website Design in Harlingen, TX",
      heroSub:
        "Fast, mobile-first websites for Harlingen businesses — built to rank on Google and turn local searches into booked customers.",
      description:
        "Professional website design in Harlingen, TX. Fast, mobile-first, SEO-ready websites built to turn local searches into leads. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for Harlingen Businesses",
        body: [
          "As the commercial hub of the Rio Grande Valley, Harlingen is home to a busy, competitive mix of healthcare, retail, and service businesses — and most customers here check you out online before they ever call.",
          "We're based right here in Harlingen, so we understand the local market and build websites that help you stand out in it. Every site is fast, mobile-first, and engineered to rank for the searches your Harlingen customers are actually typing.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for Harlingen, TX Businesses",
      heroSub:
        "Put AI to work in your Harlingen business — answer every call, follow up with every lead instantly, and automate the busywork.",
      description:
        "AI implementation and business automation for Harlingen, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for Harlingen Businesses",
        body: [
          "Harlingen's business owners wear a lot of hats, and the busier you get, the more leads slip through the cracks — missed calls, slow follow-up, and hours lost to repetitive admin.",
          "As a Harlingen-based team, we build AI and automation that handle that work for you, so every call gets answered and every lead gets followed up the moment it comes in.",
        ],
      },
    },
  },
  {
    slug: "mcallen",
    name: "McAllen",
    webDesign: {
      h1: "Website Design in McAllen, TX",
      heroSub:
        "Websites for McAllen businesses that load fast, rank on Google, and turn the Valley's busiest market into booked customers.",
      description:
        "Professional website design in McAllen, TX. Fast, mobile-first, SEO-ready websites built to win the Valley's most competitive market. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for McAllen Businesses",
        body: [
          "McAllen is the largest and most competitive market in the Rio Grande Valley — a retail and cross-border commerce hub where customers have no shortage of options.",
          "Standing out takes more than just being listed online. We build McAllen businesses fast, modern websites with SEO and lead capture built in, so you win the click and the customer instead of losing them to a competitor down the road.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for McAllen, TX Businesses",
      heroSub:
        "Put AI to work in your McAllen business — capture every lead, respond instantly, and out-operate the competition.",
      description:
        "AI implementation and business automation for McAllen, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for McAllen Businesses",
        body: [
          "In a market as competitive as McAllen, the business that answers first usually wins the customer — and the one that misses the call loses it to someone else.",
          "We build McAllen businesses AI systems that answer calls 24/7, follow up with leads instantly, and automate repetitive tasks, so you stay a step ahead in the Valley's busiest market.",
        ],
      },
    },
  },
  {
    slug: "brownsville",
    name: "Brownsville",
    webDesign: {
      h1: "Website Design in Brownsville, TX",
      heroSub:
        "Fast, mobile-first websites for Brownsville businesses — built to rank locally and convert a fast-growing market into customers.",
      description:
        "Professional website design in Brownsville, TX. Fast, mobile-first, SEO-ready websites built for a fast-growing border city. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for Brownsville Businesses",
        body: [
          "Brownsville is one of the fastest-changing cities in Texas — a historic port community now growing alongside the space and tech investment out at Boca Chica.",
          "That growth means new customers and new competition. We build Brownsville businesses websites that load fast, work flawlessly on mobile, and rank for local searches, so you capture the opportunity instead of watching it pass by.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for Brownsville, TX Businesses",
      heroSub:
        "Put AI to work in your Brownsville business — answer every call, follow up instantly, and scale without the busywork.",
      description:
        "AI implementation and business automation for Brownsville, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for Brownsville Businesses",
        body: [
          "Brownsville is growing fast, and growth brings more inquiries than a busy team can handle by hand. The result is missed calls and slow follow-up that quietly cost you business.",
          "We build Brownsville businesses AI and automation that scale with you — answering calls around the clock, responding to leads instantly, and taking repetitive work off your plate.",
        ],
      },
    },
  },
  {
    slug: "edinburg",
    name: "Edinburg",
    webDesign: {
      h1: "Website Design in Edinburg, TX",
      heroSub:
        "Websites for Edinburg businesses built to rank on Google, load fast, and turn a fast-growing college town into customers.",
      description:
        "Professional website design in Edinburg, TX. Fast, mobile-first, SEO-ready websites for a growing university city. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for Edinburg Businesses",
        body: [
          "As the seat of Hidalgo County and home to UTRGV, Edinburg blends a steady professional base with a young, growing, always-online population.",
          "Reaching both means a website that's fast, mobile-first, and easy to find on Google. We build Edinburg businesses sites designed to rank locally and turn that search traffic into real leads.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for Edinburg, TX Businesses",
      heroSub:
        "Put AI to work in your Edinburg business — answer every call, follow up with every lead instantly, and automate the repetitive work.",
      description:
        "AI implementation and business automation for Edinburg, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for Edinburg Businesses",
        body: [
          "Edinburg's young, always-connected population expects fast responses — and when your business is slow to reply, they move on to the next option in seconds.",
          "We build Edinburg businesses AI systems that answer instantly, follow up automatically, and keep your calendar full, so you meet that expectation without adding to your workload.",
        ],
      },
    },
  },
  {
    slug: "mission",
    name: "Mission",
    webDesign: {
      h1: "Website Design in Mission, TX",
      heroSub:
        "Fast, mobile-first websites for Mission businesses — built to rank on Google and turn local searches into booked customers.",
      description:
        "Professional website design in Mission, TX. Fast, mobile-first, SEO-ready websites built for a growing Valley community. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for Mission Businesses",
        body: [
          "Known as the Home of the Grapefruit, Mission has grown from its citrus roots into one of the Valley's thriving residential and small-business communities.",
          "As more families and businesses put down roots here, customers are searching online for local services every day. We build Mission businesses websites that show up in those searches and turn visitors into leads.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for Mission, TX Businesses",
      heroSub:
        "Put AI to work in your Mission business — never miss a call, follow up instantly, and let the busywork run itself.",
      description:
        "AI implementation and business automation for Mission, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for Mission Businesses",
        body: [
          "As Mission keeps growing, local businesses are fielding more calls and inquiries than ever — and the small team handling them can only do so much by hand.",
          "We build Mission businesses AI and automation that answer every call, respond to every lead instantly, and handle the repetitive follow-up, so growth doesn't mean lost opportunities.",
        ],
      },
    },
  },
  {
    slug: "weslaco",
    name: "Weslaco",
    webDesign: {
      h1: "Website Design in Weslaco, TX",
      heroSub:
        "Websites for Weslaco businesses built to load fast, rank locally, and turn the mid-Valley market into customers.",
      description:
        "Professional website design in Weslaco, TX. Fast, mobile-first, SEO-ready websites for the mid-Valley market. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for Weslaco Businesses",
        body: [
          "Sitting right in the heart of the mid-Valley, Weslaco pairs deep agricultural roots with a busy retail corridor along Expressway 83.",
          "Local customers and travelers alike are searching for businesses here online. We build Weslaco businesses fast, mobile-first websites with SEO built in, so you get found first and turn that traffic into booked work.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for Weslaco, TX Businesses",
      heroSub:
        "Put AI to work in your Weslaco business — answer every call, follow up instantly, and automate the day-to-day busywork.",
      description:
        "AI implementation and business automation for Weslaco, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for Weslaco Businesses",
        body: [
          "Weslaco's mid-Valley location puts your business in front of a steady stream of local and passing customers — but only if you can respond before they move on.",
          "We build Weslaco businesses AI systems that answer calls 24/7 and follow up with leads the instant they arrive, while automation quietly handles the repetitive work in the background.",
        ],
      },
    },
  },
  {
    slug: "san-benito",
    name: "San Benito",
    webDesign: {
      h1: "Website Design in San Benito, TX",
      heroSub:
        "Fast, mobile-first websites for San Benito businesses — built to rank on Google and turn your community into loyal customers.",
      description:
        "Professional website design in San Benito, TX. Fast, mobile-first, SEO-ready websites for a close-knit Valley community. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for San Benito Businesses",
        body: [
          "San Benito's close-knit, community-first character is exactly what makes word of mouth so powerful here — and today that word of mouth starts online.",
          "When neighbors recommend you, the next thing they do is look you up. We build San Benito businesses clean, fast, mobile-first websites that make a strong first impression and turn local interest into customers.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for San Benito, TX Businesses",
      heroSub:
        "Put AI to work in your San Benito business — answer every call, follow up instantly, and free up your time.",
      description:
        "AI implementation and business automation for San Benito, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for San Benito Businesses",
        body: [
          "In a tight-knit community like San Benito, responsiveness is reputation — a missed call or a slow reply gets noticed, and so does fast, reliable service.",
          "We build San Benito businesses AI and automation that make sure every call is answered and every lead hears back right away, so you protect the reputation your business runs on.",
        ],
      },
    },
  },
  {
    slug: "pharr",
    name: "Pharr",
    webDesign: {
      h1: "Website Design in Pharr, TX",
      heroSub:
        "Websites for Pharr businesses built to load fast, rank locally, and turn a major Valley commerce hub into customers.",
      description:
        "Professional website design in Pharr, TX. Fast, mobile-first, SEO-ready websites built for a busy commerce and logistics hub. Custom-quoted by RGV Performance Marketing.",
      intro: {
        heading: "Websites Built for Pharr Businesses",
        body: [
          "Anchored by the Pharr-Reynosa International Bridge, Pharr is one of the Valley's busiest commerce and logistics hubs, with a steady flow of business and a competitive local market.",
          "Whether you serve residents or other businesses, customers here research online before they buy. We build Pharr businesses fast, mobile-first websites that rank locally and turn that research into leads.",
        ],
      },
    },
    ai: {
      h1: "AI Implementation for Pharr, TX Businesses",
      heroSub:
        "Put AI to work in your Pharr business — capture every lead, respond instantly, and automate the repetitive work.",
      description:
        "AI implementation and business automation for Pharr, TX businesses. AI voice receptionist, instant lead follow-up, and workflow automation from RGV Performance Marketing.",
      intro: {
        heading: "AI & Automation for Pharr Businesses",
        body: [
          "As one of the Valley's busiest commerce and logistics hubs, Pharr moves fast — and businesses here can't afford the missed calls and slow follow-up that come with doing everything manually.",
          "We build Pharr businesses AI and automation that keep pace: answering calls around the clock, following up with leads instantly, and connecting your tools so the repetitive work runs itself.",
        ],
      },
    },
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const citySlugs = cities.map((c) => c.slug);

/* ---- Path helpers ---- */
export const webDesignCityPath = (slug: string) => `/website-design-${slug}-tx`;
export const aiCityPath = (slug: string) => `/ai-implementation-${slug}-tx`;

/* ---- Service schema node ---- */
function serviceSchemaNode(args: { name: string; serviceType: string; description: string; url: string; areaName: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    serviceType: args.serviceType,
    description: args.description,
    url: args.url,
    areaServed: { "@type": "City", name: args.areaName },
    provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
  };
}

/* ---- Website Design city builders ---- */
export function webDesignCityMetadata(city: City): Metadata {
  const url = canonical(webDesignCityPath(city.slug));
  const title = `Website Design in ${city.name}, TX | ${SITE.name}`;
  return {
    title: { absolute: title },
    description: city.webDesign.description,
    keywords: WEB_DESIGN.keywordCluster,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description: city.webDesign.description, siteName: SITE.name },
  };
}

export function webDesignCityCrumbs(city: City) {
  return [
    { name: "Home", path: "/" },
    { name: "Website Design", path: "/services/website-design" },
    { name: `${city.name}, TX`, path: webDesignCityPath(city.slug) },
  ];
}

export function webDesignCityJsonLd(city: City) {
  return [
    serviceSchemaNode({
      name: `Website Design in ${city.name}, TX`,
      serviceType: WEB_DESIGN.primaryKeyword,
      description: city.webDesign.description,
      url: canonical(webDesignCityPath(city.slug)),
      areaName: `${city.name}, TX`,
    }),
    breadcrumbSchema(webDesignCityCrumbs(city)),
    faqSchema(WEB_DESIGN_FAQS),
  ];
}

/* ---- AI Implementation city builders ---- */
export function aiCityMetadata(city: City): Metadata {
  const url = canonical(aiCityPath(city.slug));
  const title = `AI Implementation for ${city.name}, TX Businesses | ${SITE.name}`;
  return {
    title: { absolute: title },
    description: city.ai.description,
    keywords: AI_IMPL.keywordCluster,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description: city.ai.description, siteName: SITE.name },
  };
}

export function aiCityCrumbs(city: City) {
  return [
    { name: "Home", path: "/" },
    { name: "AI Implementation", path: "/services/ai-implementation" },
    { name: `${city.name}, TX`, path: aiCityPath(city.slug) },
  ];
}

export function aiCityJsonLd(city: City) {
  return [
    serviceSchemaNode({
      name: `AI Implementation for ${city.name}, TX Businesses`,
      serviceType: AI_IMPL.primaryKeyword,
      description: city.ai.description,
      url: canonical(aiCityPath(city.slug)),
      areaName: `${city.name}, TX`,
    }),
    breadcrumbSchema(aiCityCrumbs(city)),
    faqSchema(AI_FAQS),
  ];
}
