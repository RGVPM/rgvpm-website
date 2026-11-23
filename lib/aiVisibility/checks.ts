/**
 * ScanRank's report card: one entry per check, with its weight
 * out of 100 and the plain-English copy shown to the visitor. Shared by the
 * scanner (server) and the /scanrank page (the "What we check"
 * list), so the two can't drift. No Node imports here.
 *
 * Scoring: a pass earns the full weight, a warn earns half, a fail earns 0.
 */

export type CheckStatus = "pass" | "warn" | "fail";

export type CheckId =
  | "ai-crawlers"
  | "business-schema"
  | "title-meta"
  | "h1"
  | "no-js-text"
  | "booking"
  | "https"
  | "viewport"
  | "speed"
  | "click-to-call"
  | "faq-schema"
  | "text-chat"
  | "llms-txt"
  | "sitemap"
  | "services-pricing";

export interface CheckDef {
  id: CheckId;
  label: string;
  weight: number;
  why: string;
  todo: string;
}

export const CHECKS: CheckDef[] = [
  {
    id: "ai-crawlers",
    label: "AI assistants are allowed to read your site",
    weight: 15,
    why: "If your robots.txt blocks GPTBot, PerplexityBot, ClaudeBot or Bingbot, those assistants can't read your pages and are less likely to recommend you.",
    todo: "Remove the Disallow rules for these bots in robots.txt, or ask your web person to allow them.",
  },
  {
    id: "business-schema",
    label: "Business details in schema (name, address, phone)",
    weight: 15,
    why: "LocalBusiness or MedicalBusiness schema tells Google and AI tools exactly who you are, where you are and how to reach you.",
    todo: "Add LocalBusiness (or MedicalBusiness) JSON-LD with your exact name, street address, city and phone number.",
  },
  {
    id: "title-meta",
    label: "Title and description say what you do and where",
    weight: 10,
    why: "Search engines and AI assistants read your page title and meta description first to decide what you offer and which city you serve.",
    todo: "Put your main service and your city in the page title and meta description, for example \"Med Spa in McAllen, TX | Botox, Filler & Laser\".",
  },
  {
    id: "h1",
    label: "Main heading names your service or city",
    weight: 6,
    why: "The H1 is the headline crawlers treat as the topic of the page. A vague one like \"Welcome\" tells them nothing.",
    todo: "Use one H1 that names what you do and where, such as \"Botox and Laser Treatments in Edinburg\".",
  },
  {
    id: "no-js-text",
    label: "Your words show up without JavaScript",
    weight: 6,
    why: "Most AI crawlers read the raw page and don't run JavaScript. If your text only appears after scripts load, they see a blank page.",
    todo: "Ask your web person to server-render the homepage text, or move to a site builder that outputs real HTML.",
  },
  {
    id: "booking",
    label: "Online booking link",
    weight: 8,
    why: "People who find you through Google or ChatGPT want to book right away. A visible booking link turns that visit into an appointment.",
    todo: "Link your booking page (Aesthetic Record, Vagaro, Boulevard, Mindbody, Zenoti, Jane or similar) from the homepage and menu.",
  },
  {
    id: "https",
    label: "Secure connection (HTTPS)",
    weight: 6,
    why: "Browsers flag sites without HTTPS as \"Not secure\", and Google prefers secure pages.",
    todo: "Turn on a free SSL certificate with your host and redirect every http:// address to https://.",
  },
  {
    id: "viewport",
    label: "Built for phones",
    weight: 6,
    why: "Most med spa clients search on their phone. Without a mobile viewport tag the page shows up tiny and hard to use.",
    todo: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to the page head, or switch to a mobile-friendly theme.",
  },
  {
    id: "speed",
    label: "Homepage loads quickly",
    weight: 6,
    why: "Slow, heavy pages lose visitors and can time out for crawlers before they read anything.",
    todo: "Compress images, remove unused apps and scripts, and use a fast host.",
  },
  {
    id: "click-to-call",
    label: "Tap-to-call phone number",
    weight: 6,
    why: "A tap-to-call link lets a phone visitor call you in one tap. It also confirms your phone number to crawlers.",
    todo: "Wrap your phone number in a tel: link, like <a href=\"tel:+19565551234\">.",
  },
  {
    id: "faq-schema",
    label: "FAQ answers marked up for search",
    weight: 6,
    why: "AI assistants answer questions. Clear FAQs with FAQPage schema give them answers in your words to quote.",
    todo: "Add an FAQ section with real client questions (price, downtime, results) and mark it up with FAQPage schema.",
  },
  {
    id: "text-chat",
    label: "Text or chat option",
    weight: 4,
    why: "Many clients would rather text than call. A text link or chat widget catches people who won't pick up the phone.",
    todo: "Add a text-us link (sms:) or a chat widget that sends messages to your front desk.",
  },
  {
    id: "llms-txt",
    label: "llms.txt file",
    weight: 2,
    why: "llms.txt is a short plain-text summary of your business for AI tools. Few assistants use it yet, so it carries little weight here.",
    todo: "Publish /llms.txt with your name, services, city, prices if you share them, and links to your key pages.",
  },
  {
    id: "sitemap",
    label: "Sitemap",
    weight: 2,
    why: "A sitemap lists every page so Google and Bing find your service pages faster.",
    todo: "Publish /sitemap.xml (most site builders have a setting) and list it in robots.txt.",
  },
  {
    id: "services-pricing",
    label: "Services and pricing pages are linked",
    weight: 2,
    why: "Assistants recommend practices they can describe. Linked service and pricing pages give them the details.",
    todo: "Link a treatments or services page and a pricing page from your homepage or main menu.",
  },
];

export const TOTAL_WEIGHT = CHECKS.reduce((n, c) => n + c.weight, 0);

export interface CheckResult extends CheckDef {
  status: CheckStatus;
  points: number;
  /** One short sentence about what the scan saw. Plain text, already trimmed. */
  found: string;
}

export interface ScanReport {
  url: string;
  finalUrl: string;
  score: number;
  grade: string;
  scannedAt: string;
  checks: CheckResult[];
}

export function pointsFor(status: CheckStatus, weight: number): number {
  return status === "pass" ? weight : status === "warn" ? weight / 2 : 0;
}

export function gradeFor(score: number): string {
  if (score >= 85) return "Easy to find";
  if (score >= 65) return "Getting there";
  if (score >= 40) return "Hard to find";
  return "Mostly invisible";
}
