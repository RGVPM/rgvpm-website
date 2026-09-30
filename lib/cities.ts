import type { Metadata } from "next";
import { canonical, SITE, LOCAL_BUSINESS_ID, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/site";
import type { CityDetailsContent } from "@/components/CityDetails";
import type { CityLink } from "@/components/CityLinks";
import type { FaqItem } from "@/lib/webDesign";
import { WEB_DESIGN, WEB_DESIGN_FAQS } from "@/lib/webDesign";
import { AI_IMPL, AI_FAQS } from "@/lib/aiImplementation";

export interface CityVariant {
  h1: string;
  heroSub: string;
  description: string;
  intro: { heading: string; body: string[] };
  /** Optional <title> override (absolute, ≤60 chars). Defaults to the shared template. */
  metaTitle?: string;
  /** Optional city-specific section: what's different about this market. */
  details?: CityDetailsContent;
  /** Optional city-specific FAQs, shown before the shared ones (and in FAQPage schema). */
  faqs?: FaqItem[];
  /** Optional hand-picked internal links to related city pages. */
  nearby?: CityLink[];
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
      metaTitle: "Harlingen Web Design & Builder | RGV Performance Marketing",
      h1: "Website Design in Harlingen, TX",
      heroSub:
        "Fast, mobile-first websites for Harlingen businesses — built to rank on Google and turn local searches into booked customers.",
      description:
        "Need a website builder in Harlingen? A local team designs, writes and launches your fast, SEO-ready site in 2–4 weeks, in English or Spanish. Free quote.",
      faqs: [
        {
          q: "Is this a website builder like Wix or Squarespace?",
          a: "No. With a DIY website builder you design, write and maintain the site yourself. We're a Harlingen team that builds the site for you: design, copy, on-page SEO, lead forms and launch. You review it and ask for changes; we do the work. You still own the finished site.",
        },
        {
          q: "Can I meet with you in Harlingen?",
          a: "Yes. We're based in Harlingen, so we can sit down in person or talk by phone or video. Most of the build happens over shared drafts, and you can reach us at any point along the way.",
        },
      ],
      nearby: [
        { href: "/local-seo-harlingen-tx", label: "Harlingen SEO services" },
        { href: "/google-business-profile-harlingen-tx", label: "Google Business Profile optimization in Harlingen" },
        { href: "/google-ads-management-harlingen-tx", label: "Google Ads management in Harlingen" },
        { href: "/blog/how-much-does-a-website-cost-rio-grande-valley", label: "How much a website costs in the RGV" },
        { href: "/website-design-brownsville-tx", label: "Website design in Brownsville" },
        { href: "/website-design-mcallen-tx", label: "Web design in McAllen" },
      ],
      intro: {
        heading: "Websites Built for Harlingen Businesses",
        body: [
          "As the commercial hub of the Rio Grande Valley, Harlingen is home to a busy, competitive mix of healthcare, retail, and service businesses — and most customers here check you out online before they ever call.",
          "We're based right here in Harlingen, so we understand the local market and build websites that help you stand out in it. Every site is fast, mobile-first, and engineered to rank for the searches your Harlingen customers are actually typing.",
        ],
      },
    },
    ai: {
      metaTitle: "AI Automation & AI Consultant in Harlingen, TX",
      h1: "AI Automation & AI Consulting in Harlingen, TX",
      heroSub:
        "Put AI to work in your Harlingen business: answer every call, follow up with every lead instantly, and automate the busywork. Built by a team based right here.",
      description:
        "Harlingen AI consultant and automation team building AI receptionists, instant lead follow-up and custom AI agents for local businesses. Book a call.",
      intro: {
        heading: "AI Automation for Harlingen Businesses",
        body: [
          "Harlingen's business owners wear a lot of hats, and the busier you get, the more leads slip through the cracks: missed calls, slow follow-up, and hours lost to repetitive admin.",
          "As a Harlingen-based team, we build AI and automation that handle that work for you, so every call gets answered and every lead gets followed up the moment it comes in. Because we're local, you can sit down with us to map it out in person.",
        ],
      },
      faqs: [
        {
          q: "Is there an AI consultant based in Harlingen?",
          a: "Yes. RGV Performance Marketing is based in Harlingen. We can meet in person to map where AI fits in your business, then build the automation or teach you to build it one-on-one.",
        },
        {
          q: "What should a Harlingen business automate first?",
          a: "Usually lead response: answering calls, forms and texts when you can't, and following up right away. Once that works, we look at the office chores your team repeats every week.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-san-benito-tx", label: "AI automation in San Benito" },
        { href: "/ai-implementation-brownsville-tx", label: "AI automation in Brownsville" },
        { href: "/ai-implementation-weslaco-tx", label: "AI automation in Weslaco" },
        { href: "/local-seo-harlingen-tx", label: "Local SEO in Harlingen" },
        { href: "/website-design-harlingen-tx", label: "Website design in Harlingen" },
      ],
    },
  },
  {
    slug: "mcallen",
    name: "McAllen",
    webDesign: {
      metaTitle: "McAllen Web Design That Ranks | RGV Performance Marketing",
      h1: "McAllen Web Design for Small Businesses",
      heroSub:
        "Websites for McAllen businesses that load fast, rank on Google, and turn the Valley's busiest market into booked customers.",
      description:
        "McAllen web design for small businesses: fast, mobile-first sites in English and Spanish, with SEO and lead forms built in. Live in 2–4 weeks. Free quote.",
      details: {
        heading: "Building a Website for the McAllen Market",
        intro:
          "McAllen is the Valley's main shopping hub, and it draws customers from both sides of the border. A site that works here has to handle that. These are the things we build in for McAllen clients.",
        points: [
          {
            title: "Built for shoppers from both sides of the border",
            text: "McAllen pulls shoppers from Reynosa and Monterrey as well as the rest of Hidalgo County, and a lot of them browse in Spanish. We can build your key pages in both languages so the customer driving over the bridge finds you in the language they searched in.",
          },
          {
            title: "Fast on a phone, not just on a desktop",
            text: "Most people look you up on a phone, often on a cellular connection in a parking lot on 10th Street. We keep pages light, put tap-to-call and directions up front, and test on real phones before launch.",
          },
          {
            title: "A page for each thing you sell",
            text: "In a market this crowded, one generic page can't rank for everything. We give each main service its own page, so Google can match you to \"teeth whitening McAllen\" or \"AC repair McAllen\" instead of guessing.",
          },
          {
            title: "Forms that reach you right away",
            text: "Every form on your site goes straight into your lead management inbox, with an instant reply to the customer. In McAllen the business that answers first usually gets the job.",
          },
        ],
      },
      faqs: [
        {
          q: "How much does a website cost in McAllen?",
          a: "It depends on the number of pages, the features, and whether you need English and Spanish versions. We quote every project after a short call so you only pay for what you need. Our guide on what a website costs in the Rio Grande Valley breaks down the typical price ranges and what drives them.",
        },
        {
          q: "Do you work with McAllen businesses if you're based in Harlingen?",
          a: "Yes. We work with businesses across the Valley, McAllen included. Most of the process runs on calls and shared drafts, and we can meet in person when that's easier.",
        },
        {
          q: "Will my new McAllen website rank on Google?",
          a: "It launches with on-page SEO built in: titles, headings, fast load times and schema markup. Ranking for competitive McAllen searches usually also takes ongoing local SEO and a strong Google Business Profile, which we offer as a separate service.",
        },
        {
          q: "Can you redesign my current site without losing my Google rankings?",
          a: "Yes. Before launch we map every old URL to its new page and set up permanent redirects, keep the titles and content that already rank, and resubmit your sitemap to Google so the switch doesn't cost you the traffic you've earned.",
        },
      ],
      nearby: [
        { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
        { href: "/google-business-profile-mcallen-tx", label: "Google Business Profile optimization in McAllen" },
        { href: "/google-ads-management-mcallen-tx", label: "Google Ads management in McAllen" },
        { href: "/blog/how-much-does-a-website-cost-rio-grande-valley", label: "How much a website costs in the RGV" },
        { href: "/website-design-edinburg-tx", label: "Website design in Edinburg" },
        { href: "/website-design-mission-tx", label: "Website design in Mission" },
        { href: "/website-design-pharr-tx", label: "Website design in Pharr" },
      ],
      intro: {
        heading: "Websites Built for McAllen Businesses",
        body: [
          "McAllen is the largest and most competitive market in the Rio Grande Valley — a retail and cross-border commerce hub where customers have no shortage of options.",
          "Standing out takes more than just being listed online. We build McAllen businesses fast, modern websites with SEO and lead capture built in, so you win the click and the customer instead of losing them to a competitor down the road.",
        ],
      },
    },
    ai: {
      metaTitle: "AI Automation for Businesses in McAllen, TX | AI Agents",
      h1: "AI Automation for Businesses in McAllen, TX",
      heroSub:
        "Custom AI agents, workflow automation and an AI receptionist for McAllen businesses: capture every lead, respond instantly, and out-operate the competition.",
      description:
        "AI automation company for McAllen businesses: custom AI agents, workflow automation, an AI receptionist and instant lead follow-up built around your tools.",
      intro: {
        heading: "AI Automation Built for the McAllen Market",
        body: [
          "In a market as competitive as McAllen, the business that answers first usually wins the customer, and the one that misses the call loses it to someone else.",
          "We build McAllen businesses AI systems that answer calls around the clock, follow up with leads instantly, and automate repetitive tasks, so you stay a step ahead in the Valley's busiest market.",
          "Beyond lead response, we build custom AI agents and workflow automation around the software you already use: agents that research, write and report, and small internal tools that take a weekly chore off your team's plate.",
        ],
      },
      faqs: [
        {
          q: "Do you build custom AI automation for McAllen businesses?",
          a: "Yes. We map how your McAllen business actually runs, then build automations around the tools you already use, from an AI receptionist and lead follow-up to custom AI agents and internal tools.",
        },
        {
          q: "What are AI agents for business?",
          a: "An AI agent is software that does a multi-step job for you, like researching, writing a report, or sorting an inbox, instead of just answering a single question. We build agents around your data and your tools, and a person still checks the work that matters.",
        },
        {
          q: "What is AI workflow automation?",
          a: "It connects the steps your team repeats, like a new lead coming in, a reply going out, and an appointment getting booked, so they run on their own. AI handles the parts that used to need a person to read and respond.",
        },
        {
          q: "Do you work with McAllen businesses if you're based in Harlingen?",
          a: "Yes. We work with businesses across the Valley, McAllen included. Most of the work runs on calls and shared screens, and we can meet in person when that's easier.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-pharr-tx", label: "AI automation in Pharr" },
        { href: "/ai-implementation-mission-tx", label: "AI automation in Mission" },
        { href: "/ai-implementation-edinburg-tx", label: "AI automation in Edinburg" },
        { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
        { href: "/website-design-mcallen-tx", label: "Website design in McAllen" },
      ],
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
      metaTitle: "Brownsville AI Automation & AI Receptionist Services",
      h1: "AI Automation for Brownsville, TX Businesses",
      heroSub:
        "Put AI to work in your Brownsville business: an AI receptionist that answers every call, instant follow-up, and automation that scales without the busywork.",
      description:
        "AI automation for Brownsville, TX businesses: an AI receptionist that answers every call, instant lead follow-up and automation that grows with you.",
      intro: {
        heading: "AI Automation for a Growing Brownsville",
        body: [
          "Brownsville is growing fast, and growth brings more inquiries than a busy team can handle by hand. The result is missed calls and slow follow-up that quietly cost you business.",
          "We build Brownsville businesses AI and automation that scale with you: answering calls around the clock, responding to leads instantly, and taking repetitive work off your plate.",
        ],
      },
      faqs: [
        {
          q: "Can an AI receptionist answer calls for my Brownsville business?",
          a: "Yes. An AI receptionist answers calls, chats and new leads around the clock, handles the basic questions, and passes real conversations to your team. It should never invent prices or promises you don't offer, so we set it up around your actual services.",
        },
        {
          q: "Do you meet with Brownsville businesses in person?",
          a: "We're based in Harlingen, a short drive away. Most of the work runs on calls and shared screens, and we can meet in person when that's easier.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-san-benito-tx", label: "AI automation in San Benito" },
        { href: "/ai-implementation-harlingen-tx", label: "AI automation in Harlingen" },
        { href: "/local-seo-brownsville-tx", label: "Local SEO in Brownsville" },
        { href: "/website-design-brownsville-tx", label: "Website design in Brownsville" },
      ],
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
      metaTitle: "AI Automation Agency in Edinburg, TX | Lead Follow-Up",
      h1: "AI Automation Agency for Edinburg, TX Businesses",
      heroSub:
        "Put AI to work in your Edinburg business: answer every call, follow up with every lead instantly, and automate the repetitive work.",
      description:
        "Edinburg AI automation agency: instant lead follow-up, an AI receptionist and custom automation so your business replies before customers move on.",
      intro: {
        heading: "AI Automation for Edinburg Businesses",
        body: [
          "Edinburg's young, always-connected population expects fast responses, and when your business is slow to reply, they move on to the next option in seconds.",
          "We build Edinburg businesses AI systems that answer instantly, follow up automatically, and keep your calendar full, so you meet that expectation without adding to your workload.",
        ],
      },
      faqs: [
        {
          q: "How fast does AI lead follow-up respond?",
          a: "Automated follow-up replies the moment a call is missed or a form comes in, day or night, then hands the conversation to your team. That speed matters in a market like Edinburg, where customers compare options in seconds.",
        },
        {
          q: "Can my Edinburg team learn to build its own AI tools?",
          a: "Yes. We run one-on-one build sessions and team workshops where you build a real tool for your own business. No coding background needed.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-mcallen-tx", label: "AI automation in McAllen" },
        { href: "/ai-implementation-pharr-tx", label: "AI automation in Pharr" },
        { href: "/ai-implementation-mission-tx", label: "AI automation in Mission" },
        { href: "/local-seo-edinburg-tx", label: "Local SEO in Edinburg" },
        { href: "/website-design-edinburg-tx", label: "Website design in Edinburg" },
      ],
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
      metaTitle: "AI Automation for Mission, TX Businesses | AI Receptionist",
      h1: "AI Automation for Mission, TX Businesses",
      heroSub:
        "Put AI to work in your Mission business: never miss a call, follow up instantly, and let the busywork run itself.",
      description:
        "AI automation for Mission, TX: an AI receptionist so you never miss a call, automatic follow-up, and workflows that take repetitive work off a small team.",
      intro: {
        heading: "AI Automation for Mission Businesses",
        body: [
          "As Mission keeps growing, local businesses are fielding more calls and inquiries than ever, and the small team handling them can only do so much by hand.",
          "We build Mission businesses AI and automation that answer every call, respond to every lead instantly, and handle the repetitive follow-up, so growth doesn't mean lost opportunities.",
        ],
      },
      faqs: [
        {
          q: "Is AI automation worth it for a small Mission business?",
          a: "It is when it takes over a job your team is already doing late or not at all, like answering calls after hours or following up with every inquiry. We'll tell you honestly if a process isn't worth automating yet.",
        },
        {
          q: "Will AI automation work with the software I already use?",
          a: "In most cases, yes. We connect to your existing lead management, calendar, forms and lead sources rather than replacing them.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-mcallen-tx", label: "AI automation in McAllen" },
        { href: "/ai-implementation-edinburg-tx", label: "AI automation in Edinburg" },
        { href: "/local-seo-mission-tx", label: "Local SEO in Mission" },
        { href: "/website-design-mission-tx", label: "Website design in Mission" },
      ],
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
      metaTitle: "Weslaco AI Automation & AI Consulting for Small Business",
      h1: "AI Automation & Consulting in Weslaco, TX",
      heroSub:
        "Put AI to work in your Weslaco business: answer every call, follow up instantly, and automate the day-to-day busywork.",
      description:
        "AI consulting and automation for Weslaco small businesses: we find where AI pays off, then build the AI receptionist, follow-up and tools to run it.",
      intro: {
        heading: "AI Automation for Weslaco Businesses",
        body: [
          "Weslaco's mid-Valley location puts your business in front of a steady stream of local and passing customers, but only if you can respond before they move on.",
          "We build Weslaco businesses AI systems that answer calls around the clock and follow up with leads the instant they arrive, while automation quietly handles the repetitive work in the background.",
        ],
      },
      faqs: [
        {
          q: "What does AI consulting look like for a Weslaco business?",
          a: "We sit down with you, map how leads come in and where your team's time goes, and pick the few places where AI will actually pay off. Then we build it, or teach you to.",
        },
        {
          q: "Do you serve Weslaco from Harlingen?",
          a: "Yes. Weslaco is right between our Harlingen base and the upper Valley, so we can meet in person or work over calls and shared screens.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-harlingen-tx", label: "AI automation in Harlingen" },
        { href: "/ai-implementation-pharr-tx", label: "AI automation in Pharr" },
        { href: "/ai-implementation-mcallen-tx", label: "AI automation in McAllen" },
        { href: "/local-seo-weslaco-tx", label: "Local SEO in Weslaco" },
        { href: "/website-design-weslaco-tx", label: "Website design in Weslaco" },
      ],
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
      metaTitle: "AI Automation in San Benito, TX | AI Receptionist",
      h1: "AI Automation for San Benito, TX Businesses",
      heroSub:
        "Put AI to work in your San Benito business: answer every call, follow up instantly, and free up your time.",
      description:
        "AI automation for San Benito businesses: every call answered, every lead followed up right away, and more time back for the work only you can do.",
      intro: {
        heading: "AI Automation for San Benito Businesses",
        body: [
          "In a tight-knit community like San Benito, responsiveness is reputation. A missed call or a slow reply gets noticed, and so does fast, reliable service.",
          "We build San Benito businesses AI and automation that make sure every call is answered and every lead hears back right away, so you protect the reputation your business runs on.",
        ],
      },
      faqs: [
        {
          q: "Will an AI receptionist feel impersonal to my San Benito customers?",
          a: "It takes the first reply, not the relationship. The AI answers right away and handles basic questions, then hands the real conversation to you or your team.",
        },
        {
          q: "Is your team local to San Benito?",
          a: "We're based next door in Harlingen, so we can meet in person and support you after launch.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-harlingen-tx", label: "AI automation in Harlingen" },
        { href: "/ai-implementation-brownsville-tx", label: "AI automation in Brownsville" },
        { href: "/local-seo-san-benito-tx", label: "Local SEO in San Benito" },
        { href: "/website-design-san-benito-tx", label: "Website design in San Benito" },
      ],
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
      metaTitle: "AI Automation Company in Pharr, TX | Workflow Automation",
      h1: "AI Automation Company Serving Pharr, TX",
      heroSub:
        "Put AI to work in your Pharr business: capture every lead, respond instantly, and automate the repetitive work between your tools.",
      description:
        "AI and workflow automation for Pharr businesses: connect your tools, answer every call with an AI receptionist, and follow up on every lead automatically.",
      intro: {
        heading: "AI & Workflow Automation for Pharr Businesses",
        body: [
          "As one of the Valley's busiest commerce and logistics hubs, Pharr moves fast, and businesses here can't afford the missed calls and slow follow-up that come with doing everything manually.",
          "We build Pharr businesses AI and automation that keep pace: answering calls around the clock, following up with leads instantly, and connecting your tools so the repetitive work runs itself.",
        ],
      },
      faqs: [
        {
          q: "Can you automate the busywork between our business tools?",
          a: "Yes. We connect your forms, calendar, inbox and lead management so the steps your team repeats run on their own, with AI handling the parts that used to need someone to read and respond.",
        },
        {
          q: "Can you build a custom internal tool for my Pharr business?",
          a: "Yes. We build internal tools, dashboards and custom AI agents around a specific weekly task, or teach you to build them yourself in one-on-one sessions.",
        },
      ],
      nearby: [
        { href: "/ai-implementation-mcallen-tx", label: "AI automation in McAllen" },
        { href: "/ai-implementation-edinburg-tx", label: "AI automation in Edinburg" },
        { href: "/ai-implementation-weslaco-tx", label: "AI automation in Weslaco" },
        { href: "/local-seo-pharr-tx", label: "Local SEO in Pharr" },
        { href: "/website-design-pharr-tx", label: "Website design in Pharr" },
      ],
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
  const title = city.webDesign.metaTitle ?? `Website Design in ${city.name}, TX | ${SITE.name}`;
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
    localBusinessSchema(),
    breadcrumbSchema(webDesignCityCrumbs(city)),
    faqSchema(webDesignCityFaqs(city)),
  ];
}

/** City FAQs first, then the shared ones. Drives both the accordion and the FAQPage schema. */
export function webDesignCityFaqs(city: City): FaqItem[] {
  return [...(city.webDesign.faqs ?? []), ...WEB_DESIGN_FAQS];
}

/** Hand-picked links if the city has them, otherwise the same city's other services. */
export function webDesignCityLinks(city: City): CityLink[] {
  if (city.webDesign.nearby) return city.webDesign.nearby;
  return [
    { href: `/local-seo-${city.slug}-tx`, label: `Local SEO in ${city.name}, TX` },
    { href: `/google-business-profile-${city.slug}-tx`, label: `Google Business Profile in ${city.name}` },
    { href: `/google-ads-management-${city.slug}-tx`, label: `Google Ads management in ${city.name}` },
  ];
}

/* ---- AI Automation city builders (URLs keep the original /ai-implementation-* slugs) ---- */
export function aiCityMetadata(city: City): Metadata {
  const url = canonical(aiCityPath(city.slug));
  const title = city.ai.metaTitle ?? `AI Automation in ${city.name}, TX | ${SITE.name}`;
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
    { name: "AI Automation", path: "/services/ai-implementation" },
    { name: `${city.name}, TX`, path: aiCityPath(city.slug) },
  ];
}

/** City FAQs first, then the shared ones. Drives both the accordion and the FAQPage schema. */
export function aiCityFaqs(city: City): FaqItem[] {
  return [...(city.ai.faqs ?? []), ...AI_FAQS];
}

/** Neighbouring AI city pages plus the same city's local SEO and web design pages. */
export function aiCityLinks(city: City): CityLink[] {
  if (city.ai.nearby) return city.ai.nearby;
  return [
    { href: `/local-seo-${city.slug}-tx`, label: `Local SEO in ${city.name}` },
    { href: webDesignCityPath(city.slug), label: `Website design in ${city.name}` },
  ];
}

export function aiCityJsonLd(city: City) {
  return [
    serviceSchemaNode({
      name: city.ai.h1,
      serviceType: "AI automation",
      description: city.ai.description,
      url: canonical(aiCityPath(city.slug)),
      areaName: `${city.name}, TX`,
    }),
    localBusinessSchema(),
    breadcrumbSchema(aiCityCrumbs(city)),
    faqSchema(aiCityFaqs(city)),
  ];
}
