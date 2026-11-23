import type { Provider } from "@/lib/comparisons";
import { PROVIDERS } from "@/lib/comparisons";
import { PLANS, BUILD_FEE, usd, planPrice } from "@/lib/site";

/**
 * RGVPM vs <competitor> pages (/rgvpm-vs-*) and the buyer's guide
 * (/how-to-choose-a-med-spa-marketing-agency). Added 2026-11-22.
 *
 * LEGAL RULES (Derrick, 2026-11-22). Anyone editing this file:
 * - Facts only. Every competitor fact has a source URL from that company's own
 *   public site, re-read on VS_CHECKED. If you can't re-verify a fact, drop it.
 * - No disparagement, no opinions stated as fact ("worse", "overpriced",
 *   "hidden fees"). Neutral wording only ("does not publish prices").
 * - Every page says where the competitor is the better fit.
 * - No competitor logos. Names in text only, plus TrademarkNote.
 * - No "best", "#1" or guarantee claims for RGVPM. No invented results or
 *   review counts. No third-party ratings unless verified and dated.
 * - RGVPM prices come from PLANS / BUILD_FEE only.
 */
export const VS_CHECKED_ISO = "2026-11-22";
export const VS_CHECKED = "November 22, 2026";
export const VS_AS_LISTED = `as listed on their site on ${VS_CHECKED}`;

export const GUIDE_PATH = "/how-to-choose-a-med-spa-marketing-agency";

export type Source = { label: string; url: string };
export type Fact = { text: string; source: Source };
export type FitItem = { title: string; text: string };

export type VsPage = {
  slug: string;
  path: string;
  competitor: string;
  /** Short name for headings, e.g. "Med Spa Magic". */
  short: string;
  metaTitle: string;
  description: string;
  heroSub: string;
  /** 2 to 3 plain sentences shown at the top. */
  shortAnswer: string;
  /** Row for the side-by-side table. */
  provider: Provider;
  facts: Fact[];
  /** Where the competitor is the better choice. */
  theyFit: FitItem[];
  /** Where RGVPM may suit better. Facts about us only, no superlatives. */
  weFit: FitItem[];
  faqs: { q: string; a: string }[];
};

const base = PLANS[0];
const ads = planPrice("Ads Management add-on");
const lowestAddOn = Math.min(...PLANS.slice(1).map((p) => p.price));
export const US: Provider = PROVIDERS.find((p) => p.isUs)!;

const addOnList = PLANS.slice(1)
  .map((p) => `${p.name.replace(" add-on", "")} +${usd(p.price)}/mo`)
  .join(", ");

const usPriceAnswer = `Every plan starts with the ${base.name} at ${usd(base.price)}/mo: the website, hosting, one lead inbox and automatic text and email follow-up. Add-ons: ${addOnList}. The one-time ${usd(BUILD_FEE)} build fee is waived with any add-on. Everything is month-to-month.`;

const usAdsLine = `Ads Management is a flat +${usd(ads)}/mo, and Google and Meta bill ad spend to you directly.`;

// ---------- Sources (all read 2026-11-22) ----------
const SRC = {
  dlFacts: { label: "doctorlogic.com/company-facts", url: "https://doctorlogic.com/company-facts" },
  dlPricing: { label: "doctorlogic.com/pricing", url: "https://doctorlogic.com/pricing" },
  pgPricing: { label: "patientgain.com/all-pricing", url: "https://www.patientgain.com/all-pricing" },
  pgMedSpa: { label: "patientgain.com/medical-spa-marketing-plan-ideas", url: "https://www.patientgain.com/medical-spa-marketing-plan-ideas" },
  mmHome: { label: "medspamagicmarketing.com", url: "https://medspamagicmarketing.com/" },
  mmPricing: { label: "medspamagicmarketing.com/programs-and-pricing", url: "https://medspamagicmarketing.com/programs-and-pricing/" },
  s3MedSpa: { label: "studio3marketing.com/med-spa", url: "https://www.studio3marketing.com/med-spa/" },
  s3Llms: { label: "studio3marketing.com/llms.txt", url: "https://www.studio3marketing.com/llms.txt" },
  axPricing: { label: "aesthetixmedia.com/pricing", url: "https://aesthetixmedia.com/pricing" },
  axHome: { label: "aesthetixmedia.com", url: "https://aesthetixmedia.com/" },
} satisfies Record<string, Source>;

export const VS_PAGES: VsPage[] = [
  {
    slug: "rgvpm-vs-doctorlogic",
    path: "/rgvpm-vs-doctorlogic",
    competitor: "DoctorLogic",
    short: "DoctorLogic",
    metaTitle: "RGVPM vs DoctorLogic for Med Spas",
    description:
      "RGV Performance Marketing vs DoctorLogic for med spas: published starting prices, contract terms, ad spend rules and who each one fits, with sources.",
    heroSub:
      "DoctorLogic is a healthcare website and patient acquisition platform. We are a small med spa marketing agency. Here is what each one publishes, and who each one suits.",
    shortAnswer:
      "DoctorLogic sells a website and marketing platform built for healthcare, on one-year agreements that renew automatically. RGVPM is a small agency that runs a med spa's website, Google, social, ads and lead follow-up on month-to-month plans. Pick DoctorLogic for a healthcare website platform with analytics across many providers. Pick us for a small team and month-to-month terms.",
    provider: {
      name: "DoctorLogic",
      model: "Healthcare website and patient acquisition platform",
      pricing: "Starts at $11,000 a year for a single-provider, single-location practice",
      contract: "One-year agreements that renew automatically",
      adSpend: "Google Ads add-on needs a three-month commitment and $2,000/mo minimum ad spend",
      summary: "",
      fits: "",
      tradeoffs: "",
      sources: [SRC.dlFacts],
    },
    facts: [
      { text: "DoctorLogic starts at $11,000 a year for a single-provider, single-location practice.", source: SRC.dlFacts },
      { text: "DoctorLogic agreements last one year and renew automatically.", source: SRC.dlFacts },
      { text: "The content package costs $699 per month and includes 13 pieces of content per quarter.", source: SRC.dlFacts },
      { text: "Google Ads management requires a three-month commitment and a minimum ad spend of $2,000 per month.", source: SRC.dlFacts },
      { text: "The core system includes website build, hosting, Performance Center analytics and website management through the Admin Center. Pricing is given through a demo request.", source: SRC.dlPricing },
      { text: "Founded in 2014, based in Plano, Texas. It says it has worked with more than 5,000 U.S. healthcare providers, including dental, orthodontics, ENT, plastic surgery, med spa and aesthetics.", source: SRC.dlFacts },
      { text: "The practice always owns its domain. If a practice leaves, DoctorLogic provides an export of the site's content; the design and technology stay with DoctorLogic.", source: SRC.dlFacts },
    ],
    theyFit: [
      { title: "You want a website platform built for healthcare", text: "DoctorLogic's system bundles the website, hosting, its Performance Center analytics and an Admin Center for managing the site." },
      { title: "You run several providers or specialties", text: "DoctorLogic works across dental, plastic surgery, med spa and other specialties, so one vendor can cover a mixed group." },
      { title: "You prefer an established company with an annual agreement", text: "It was founded in 2014 and works on one-year agreements, which some practices like for planning." },
      { title: "You want content written for you every quarter", text: "Its content package lists 13 pieces of content per quarter." },
    ],
    weFit: [
      { title: "You want month-to-month terms", text: "Every RGVPM plan and add-on is month-to-month." },
      { title: "You want social media content done for you", text: "Our Content Crew and Full Service Social add-ons turn your footage, or our monthly shoot, into reels and posts." },
      { title: "You want a lower starting price", text: `Our ${base.name} is ${usd(base.price)}/mo (${usd(base.price * 12)} a year) before add-ons. DoctorLogic lists $11,000 a year to start.` },
    ],
    faqs: [
      { q: "How much does DoctorLogic cost?", a: `DoctorLogic's company facts page says it starts at $11,000 a year for a single-provider, single-location practice. Its content package is $699 a month (${VS_AS_LISTED}).` },
      { q: "Does DoctorLogic have a contract?", a: `Yes. Its company facts page says agreements last one year and renew automatically (${VS_AS_LISTED}). RGV Performance Marketing is month-to-month.` },
      { q: "What happens to my website if I leave DoctorLogic?", a: `DoctorLogic says the practice always owns its domain, and it provides an export of the site's content. The design and technology stay with DoctorLogic (${VS_AS_LISTED}). Ask any provider this before you sign.` },
      { q: "Is DoctorLogic only for med spas?", a: "No. It serves many healthcare specialties, including dental, orthodontics, ENT, plastic surgery, med spa and aesthetics." },
      { q: "How much does RGV Performance Marketing cost?", a: usPriceAnswer },
    ],
  },
  {
    slug: "rgvpm-vs-patientgain",
    path: "/rgvpm-vs-patientgain",
    competitor: "PatientGain",
    short: "PatientGain",
    metaTitle: "RGVPM vs PatientGain for Med Spas",
    description:
      "RGV Performance Marketing vs PatientGain for med spas: published plan prices, contract notes, ad fees and who each one fits, with sources.",
    heroSub:
      "PatientGain sells marketing apps and done-for-you service to healthcare practices. We are a small med spa marketing agency. Both publish prices. Here is how they compare.",
    shortAnswer:
      "PatientGain publishes plans from $800 to $4,000 a month that bundle a website with marketing apps, for healthcare practices broadly. RGVPM is a small agency for med spas, with a website base and add-ons on month-to-month plans. Pick PatientGain for a bundle of apps across healthcare. Pick us for a med spa focus and flat add-on prices.",
    provider: {
      name: "PatientGain",
      model: "Healthcare marketing apps plus done-for-you service",
      pricing: "$800/mo (Foundation), $1,600/mo (Growth), $4,000/mo (Competitive)",
      contract: "\"12-Month Contract\" note shown under the Competitive plan; the page doesn't say which plans it covers",
      adSpend: "Growth plan lists an 18% fee for Google and Meta ads",
      summary: "",
      fits: "",
      tradeoffs: "",
      sources: [SRC.pgPricing],
    },
    facts: [
      { text: "Plans are listed at $800/mo (Foundation), $1,600/mo (Growth) and $4,000/mo (Competitive).", source: SRC.pgPricing },
      { text: "Foundation includes a new healthcare website, 10 healthcare apps, 10 Google Business Profile posts a month and monthly email marketing.", source: SRC.pgPricing },
      { text: "The Growth plan lists Google and Meta ads with an 18% fee.", source: SRC.pgPricing },
      { text: "The pricing page shows \"12-Month Contract\" below the Competitive plan. It doesn't say which plans it applies to.", source: SRC.pgPricing },
      { text: "Its med spa page lists $1,600 to $4,000 a month.", source: SRC.pgMedSpa },
      { text: "It serves med spas, aesthetics, anti-aging and wellness practices, and its pages also cover other medical and dental practices.", source: SRC.pgMedSpa },
    ],
    theyFit: [
      { title: "You want a bundle of marketing apps", text: "PatientGain's plans pair a website with 10 to 20 apps and services." },
      { title: "You run more than a med spa", text: "It serves healthcare broadly, so one vendor can cover a dental, medical and aesthetics mix." },
      { title: "You want digital PR in the package", text: "Its Competitive plan lists digital PR as included." },
    ],
    weFit: [
      { title: "You want month-to-month terms", text: "Every RGVPM plan and add-on is month-to-month." },
      { title: "You want a flat ad management fee", text: `${usAdsLine} The fee doesn't change with your budget.` },
      { title: "You want a lower starting price", text: `Our ${base.name} starts at ${usd(base.price)}/mo, with add-ons from ${usd(lowestAddOn)}/mo.` },
      { title: "You use an aesthetics EMR", text: "Both RGVPM founders spent five years at Aesthetic Record, software built for aesthetic practices. We are independent and not affiliated with Aesthetic Record." },
    ],
    faqs: [
      { q: "How much does PatientGain cost?", a: `PatientGain lists plans at $800, $1,600 and $4,000 a month, and its med spa page lists $1,600 to $4,000 a month (${VS_AS_LISTED}).` },
      { q: "Does PatientGain require a contract?", a: `Its pricing page shows "12-Month Contract" below the Competitive plan but doesn't say which plans it covers (${VS_AS_LISTED}). Ask them before you sign. RGV Performance Marketing is month-to-month.` },
      { q: "How does PatientGain charge for ads?", a: `Its Growth plan lists Google and Meta ads with an 18% fee (${VS_AS_LISTED}). At RGV Performance Marketing, ${usAdsLine.charAt(0).toLowerCase()}${usAdsLine.slice(1)}` },
      { q: "How much does RGV Performance Marketing cost?", a: usPriceAnswer },
    ],
  },
  {
    slug: "rgvpm-vs-med-spa-magic",
    path: "/rgvpm-vs-med-spa-magic",
    competitor: "Med Spa Magic Marketing",
    short: "Med Spa Magic",
    metaTitle: "RGVPM vs Med Spa Magic Marketing",
    description:
      "RGV Performance Marketing vs Med Spa Magic Marketing: published program prices, onboarding fees, minimum terms, ad spend and who each one fits, with sources.",
    heroSub:
      "Med Spa Magic Marketing runs growth programs for established med spas. We are a small med spa marketing agency. Both publish prices. Here is how they compare.",
    shortAnswer:
      "Med Spa Magic Marketing publishes growth programs from $3,495 to $6,995 a month for established med spas, with onboarding fees, a three-month minimum and a 90-day targets promise. RGVPM is a small agency with a website base from a lower price and month-to-month add-ons. Pick Med Spa Magic for a performance program built for $1M+ practices. Pick us for a smaller budget or month-to-month terms.",
    provider: {
      name: "Med Spa Magic Marketing",
      model: "Growth programs for established med spas",
      pricing: "$3,495, $4,495 and $6,995/mo; on-ramp programs by application from $1,000/mo plus $100 per booked and paid patient",
      contract: "Three-month minimum, then 30 days' notice to cancel",
      adSpend: "Paid directly to Meta and Google from ad accounts you own, no markup; programs list $3,000+ to $10,000+/mo spend",
      summary: "",
      fits: "",
      tradeoffs: "",
      sources: [SRC.mmPricing],
    },
    facts: [
      { text: "Programs are listed at $3,495/mo (The Magnet), $4,495/mo (The Accelerator) and $6,995/mo (The Partner).", source: SRC.mmPricing },
      { text: "Onboarding and buildout is $6,000, $8,000 or $10,000 by program. It is waived with a six-month commitment and becomes due if the agreement ends early.", source: SRC.mmPricing },
      { text: "On-ramp programs are by application: Kickstart $1,495/mo, Validator $2,495/mo, and Flex Performance $1,000/mo plus $100 per booked and paid patient.", source: SRC.mmPricing },
      { text: "Programs have a three-month minimum. After that you can cancel with 30 days' notice.", source: SRC.mmPricing },
      { text: "\"If we do not hit the agreed targets within the first 90 days, we keep working at no additional cost until we do.\" This requires its Leads Management add-on.", source: SRC.mmPricing },
      { text: "Ad spend is paid directly to Meta and Google from ad accounts you own, with no markup.", source: SRC.mmPricing },
      { text: "It says it is designed for established med spas ($2M+ and multi-location) and those that want to get there. Based in Mt. Juliet, Tennessee. It hosts the Med Spa Success Strategies podcast and publishes the book Med Spa Magic by Ricky Shockley.", source: SRC.mmHome },
    ],
    theyFit: [
      { title: "You are an established, higher-revenue practice", text: "Its main programs are built around revenue per location from about $1M to $3M+." },
      { title: "You want agreed targets with a 90-day promise", text: "It says it keeps working at no additional cost until agreed 90-day targets are hit (with its Leads Management add-on)." },
      { title: "You want CFO-level reporting or a fractional CMO", text: "Both are on its service list, along with offline advertising." },
      { title: "You like learning from a founder's podcast and book", text: "Its founder publishes a podcast and a book for med spa owners." },
    ],
    weFit: [
      { title: "You want month-to-month from day one", text: "Every RGVPM plan and add-on is month-to-month, with no minimum term." },
      { title: "You have a smaller budget", text: `Our ${base.name} starts at ${usd(base.price)}/mo. The one-time ${usd(BUILD_FEE)} build fee is waived when you add anything, and there are no other setup fees.` },
      { title: "You want a website and Google work first", text: "We start with the website, lead inbox and follow-up, then add Google, social or ads when you're ready." },
    ],
    faqs: [
      { q: "How much does Med Spa Magic Marketing cost?", a: `Its programs page lists $3,495, $4,495 and $6,995 a month, plus onboarding of $6,000 to $10,000 that is waived with a six-month commitment. On-ramp programs by application start at $1,000 a month plus $100 per booked and paid patient (${VS_AS_LISTED}).` },
      { q: "Does Med Spa Magic Marketing have a minimum contract?", a: `Yes. Programs have a three-month minimum, then 30 days' notice to cancel (${VS_AS_LISTED}). RGV Performance Marketing is month-to-month.` },
      { q: "What is Med Spa Magic Marketing's 90-day promise?", a: `Its pricing page says: "If we do not hit the agreed targets within the first 90 days, we keep working at no additional cost until we do." It requires the Leads Management add-on (${VS_AS_LISTED}). RGV Performance Marketing does not offer a results guarantee.` },
      { q: "How much does RGV Performance Marketing cost?", a: usPriceAnswer },
    ],
  },
  {
    slug: "rgvpm-vs-studio-iii-marketing",
    path: "/rgvpm-vs-studio-iii-marketing",
    competitor: "Studio III Marketing",
    short: "Studio III",
    metaTitle: "RGVPM vs Studio III Marketing for Med Spas",
    description:
      "RGV Performance Marketing vs Studio III Marketing for med spas: team size, services, published pricing and who each one fits, with sources.",
    heroSub:
      "Studio III Marketing is a large full-service aesthetics agency. We are a small med spa marketing agency. Here is what each one publishes, and who each one suits.",
    shortAnswer:
      "Studio III Marketing is a large aesthetics agency, in the field since 2011, with in-house video and photo and offices in three cities. It does not publish prices. RGVPM is a small agency with published, month-to-month prices. Pick Studio III for brand work and a big in-house creative team. Pick us for published prices and a small team.",
    provider: {
      name: "Studio III Marketing",
      model: "Full-service aesthetics marketing agency",
      pricing: "Not published. You schedule a marketing consultation",
      contract: "Not stated",
      adSpend: "Not stated",
      summary: "",
      fits: "",
      tradeoffs: "",
      sources: [SRC.s3MedSpa],
    },
    facts: [
      { text: "It says it has focused on aesthetics marketing since 2011.", source: SRC.s3MedSpa },
      { text: "Its med spa page lists \"200+ In-House Marketing Professionals\" and offices in Los Angeles, Austin and Tampa.", source: SRC.s3MedSpa },
      { text: "Services listed include branding, website design, in-house video and photography, SEO, AI search optimization, digital advertising, email, social media and patient acquisition coaching.", source: SRC.s3MedSpa },
      { text: "It offers LeadLoop, its own software to manage leads and connect marketing to revenue.", source: SRC.s3MedSpa },
      { text: "No prices or contract terms are published. The page invites you to schedule a marketing consultation.", source: SRC.s3MedSpa },
      { text: "Its llms.txt states a 96% client retention rate and lists specialties beyond med spas, including plastic surgery and other medical practices.", source: SRC.s3Llms },
    ],
    theyFit: [
      { title: "You want brand work and custom video", text: "Studio III lists branding plus in-house video and photography." },
      { title: "You want a large in-house team", text: "It lists 200+ in-house marketing professionals across three offices." },
      { title: "You run several locations", text: "It lists multi-location technology and its own lead software, LeadLoop." },
    ],
    weFit: [
      { title: "You want to see prices before a call", text: `Our prices are published: the ${base.name} is ${usd(base.price)}/mo, with add-ons from ${usd(lowestAddOn)}/mo.` },
      { title: "You want month-to-month terms", text: "Every RGVPM plan and add-on is month-to-month." },
      { title: "You want a small team you talk to directly", text: "We are a small team based in Harlingen, Texas, led by our two founders." },
    ],
    faqs: [
      { q: "How much does Studio III Marketing cost?", a: `Studio III does not publish prices. Its med spa page invites you to schedule a marketing consultation (${VS_AS_LISTED}).` },
      { q: "How big is Studio III Marketing?", a: `Its med spa page lists 200+ in-house marketing professionals and offices in Los Angeles, Austin and Tampa (${VS_AS_LISTED}).` },
      { q: "Does Studio III Marketing only work with med spas?", a: "No. Its llms.txt lists plastic surgery, med spas and other medical practices, among other fields." },
      { q: "How much does RGV Performance Marketing cost?", a: usPriceAnswer },
    ],
  },
  {
    slug: "rgvpm-vs-aesthetix-media",
    path: "/rgvpm-vs-aesthetix-media",
    competitor: "Aesthetix Media",
    short: "Aesthetix Media",
    metaTitle: "RGVPM vs Aesthetix Media for Med Spas",
    description:
      "RGV Performance Marketing vs Aesthetix Media for med spas: published plan prices, setup fees, contract terms, ad spend and who each one fits, with sources.",
    heroSub:
      "Aesthetix Media is a med spa marketing agency that also sells its own software. We are a small med spa marketing agency. Both publish prices and month-to-month terms.",
    shortAnswer:
      "Aesthetix Media publishes ad-led plans from $1,500 to $12,000+ a month and sells its own software, Aesthetix Hub. RGVPM starts with a website base and adds Google, social and ads on top. Both are month-to-month. Pick Aesthetix Media for ad-led growth plans with its own software. Pick us to start with a website and lead follow-up at a lower price.",
    provider: {
      name: "Aesthetix Media",
      model: "Med spa marketing agency with its own software",
      pricing: "$1,500/mo (plus $500 one-time setup) up to from $12,000/mo",
      contract: "Month-to-month; the FAQ mentions 30 days' notice to cancel",
      adSpend: "Billed to your own Google and Meta accounts, no markup; plans suggest $1,000+ to $8,000+/mo spend",
      summary: "",
      fits: "",
      tradeoffs: "",
      sources: [SRC.axPricing],
    },
    facts: [
      { text: "Plans are listed at $1,500/mo (Launch, plus a $500 one-time setup), $3,000/mo (Starter), $6,500/mo (Growth), $9,500/mo (Scale) and from $12,000/mo (Enterprise).", source: SRC.axPricing },
      { text: "The Launch plan covers one paid channel (Google or Meta), a landing page, lead capture with follow-up automation and missed-call text-back.", source: SRC.axPricing },
      { text: "The pricing page says \"Month-to-month. No contracts. No setup fees on monthly plans. Cancel anytime.\" Its FAQ says to cancel with 30 days' notice.", source: SRC.axPricing },
      { text: "Ad spend is billed to your own Google and Meta accounts, and it says it does not mark it up.", source: SRC.axPricing },
      { text: "It sells its own software, Aesthetix Hub, at $297, $497 and $797 a month, with a 14-day free trial.", source: SRC.axPricing },
      { text: "Its homepage says it works exclusively with med spas. Its menu also lists plastic surgery, cosmetic surgery, dermatology and medical practices. It offers a free growth audit and an ROI calculator.", source: SRC.axHome },
    ],
    theyFit: [
      { title: "You want ad-led growth from the start", text: "Each listed Aesthetix Media plan includes paid ads management, with suggested ad spend from $1,000+ a month." },
      { title: "You want the agency's own software", text: "Aesthetix Hub is sold alongside its services, with a free trial." },
      { title: "You run a multi-location group", text: "Its Enterprise plan lists per-location reporting, a dedicated growth team and custom EMR and booking integrations." },
    ],
    weFit: [
      { title: "You want a website and lead follow-up first", text: `Our ${base.name} at ${usd(base.price)}/mo includes the website, hosting, one lead inbox and automatic text and email follow-up. Ads are optional.` },
      { title: "You want social media done for you without ads", text: "Content Crew and Full Service Social are sold as add-ons or on their own." },
      { title: "You want a flat ad management fee", text: usAdsLine },
    ],
    faqs: [
      { q: "How much does Aesthetix Media cost?", a: `Aesthetix Media lists plans from $1,500 a month (plus a $500 one-time setup) to $12,000+ a month for Enterprise. Its Aesthetix Hub software is $297 to $797 a month (${VS_AS_LISTED}).` },
      { q: "Does Aesthetix Media have a contract?", a: `Its pricing page says month-to-month with no contracts, and its FAQ says to cancel with 30 days' notice (${VS_AS_LISTED}). RGV Performance Marketing is also month-to-month.` },
      { q: "Is ad spend included with Aesthetix Media?", a: `No. It says ad spend is billed to your own Google and Meta accounts with no markup (${VS_AS_LISTED}). The same is true at RGV Performance Marketing.` },
      { q: "How much does RGV Performance Marketing cost?", a: usPriceAnswer },
    ],
  },
];

/** Every competitor named on the vs pages and the guide, for TrademarkNote. */
export const VS_COMPETITOR_NAMES = VS_PAGES.map((p) => p.competitor);

export function vsPage(slug: string): VsPage {
  const p = VS_PAGES.find((v) => v.slug === slug);
  if (!p) throw new Error(`Unknown vs page: ${slug}`);
  return p;
}

/** All competitor sources, deduped, for the guide's source list and the PR table. */
export const VS_SOURCES: Source[] = Object.values(SRC);
