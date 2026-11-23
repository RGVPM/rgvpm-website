import { PLANS, BUILD_FEE, usd, planPrice } from "@/lib/site";

/**
 * Med spa marketing provider comparison, used by /growth99-alternatives and
 * /med-spa-marketing-agency-pricing.
 *
 * RULES (Derrick, 2026-11-22):
 * - Every competitor fact must come from that company's own public page, read
 *   on the date in CHECKED. Keep the source URL next to the fact.
 * - If a company doesn't publish a price or term, say "Not published".
 * - Fair and factual. Describe each model and who it fits. No put-downs.
 * - RGVPM prices come from PLANS / BUILD_FEE only.
 */
export const CHECKED = "Nov 2026";
export const AS_LISTED = `as listed on their site, ${CHECKED}`;

export type Provider = {
  name: string;
  /** Short label for the comparison table. */
  model: string;
  pricing: string;
  contract: string;
  adSpend: string;
  /** Plain description of how they work. */
  summary: string;
  /** Who this option tends to suit. */
  fits: string;
  /** Things worth weighing. */
  tradeoffs: string;
  sources: { label: string; url: string }[];
  isUs?: boolean;
};

const base = PLANS[0];
const adsMgmt = planPrice("Ads Management add-on");

export const PROVIDERS: Provider[] = [
  {
    name: "Growth99",
    model: "Software platform plus marketing services",
    pricing: "Not published. Plans are Essentials, Accelerator and Elite; pricing is \"available upon request\"",
    contract: "Not stated on the pricing page",
    adSpend: "Paid ads tiers list managed ad spend of up to $1,500, $3,500 or $8,000 a month",
    summary:
      "Growth99 describes itself as an \"all-in-one platform with customer relationship management and marketing automation\" for aesthetic and elective wellness practices. Its plans bundle software (email and SMS automation, an AI chatbot, a patient self-assessment tool, forms, reporting) with marketing services such as websites, SEO, paid ads and social graphics.",
    fits: "Practices that want one software platform for patient communication and automation, with marketing services from the same company.",
    tradeoffs: "You adopt their platform for messaging and automation. Plan prices are given after you talk to their team, so you can't compare costs up front.",
    sources: [{ label: "growth99.com/pricing", url: "https://www.growth99.com/pricing" }],
  },
  {
    name: "DoctorLogic",
    model: "Patient acquisition platform with managed services",
    pricing: "Not published. The pricing link goes to a demo booking page",
    contract: "Not stated",
    adSpend: "Google Ads management is an optional add-on; ad spend terms not stated",
    summary:
      "DoctorLogic calls itself a \"Patient Acquisition Platform for Medical Practices.\" It builds and hosts practice websites, writes content with in-house healthcare writers, collects reviews, handles SEO and Google Business Profile, and can manage Google Ads. It serves aesthetics (plastic and cosmetic surgery, dermatology, med spas, hair restoration), dental, vision and other specialties.",
    fits: "Practices, including multi-location groups, that want a website and SEO system built for healthcare, with reporting on where new patients come from.",
    tradeoffs: "It covers many specialties, not only aesthetics. Pricing comes through a demo. Their site says that if you leave, your content leaves with you.",
    sources: [
      { label: "doctorlogic.com", url: "https://doctorlogic.com/" },
      { label: "doctorlogic.com/pricing", url: "https://doctorlogic.com/pricing" },
    ],
  },
  {
    name: "Studio III Marketing",
    model: "Full-service aesthetics marketing agency",
    pricing: "Not published. You schedule a marketing consultation",
    contract: "Not stated",
    adSpend: "Not stated",
    summary:
      "Studio III (Studio 3) is a full-service agency that has focused on aesthetics marketing since 2011. Its site lists branding, website design, in-house video and photography, SEO, AI search optimization, digital advertising, email, social media and lead management. It lists \"200+ in-house marketing professionals\" and offices in Los Angeles, Austin and Tampa.",
    fits: "Established practices that want brand work, custom photo and video, and a large in-house team.",
    tradeoffs: "A large agency with a broad service list. Pricing isn't published, so budget is set in a consultation.",
    sources: [{ label: "studio3marketing.com/med-spa", url: "https://www.studio3marketing.com/med-spa/" }],
  },
  {
    name: "PatientGain",
    model: "Healthcare marketing platform plus done-for-you service",
    pricing:
      "Published. Plans listed at $800/mo (Foundation), $1,600/mo (Growth) and $4,000/mo (Competitive); their med spa page lists $1,600 to $4,000/mo",
    contract: "The pricing page shows \"12-Month Contract\" under the Competitive plan; ask which plans it applies to",
    adSpend: "The Growth plan lists an 18% fee for Google and Meta ads",
    summary:
      "PatientGain sells marketing apps and done-for-you service to healthcare practices, mainly dental and medical, and has a med spa page. Plans include a new website, SEO, apps such as chat and texting, and a project manager. Single apps are also sold on their own.",
    fits: "Healthcare practices that want published package prices and a bundle of marketing apps with a website.",
    tradeoffs: "Built for healthcare broadly, with dental as a large focus. Check the contract length and how the ad fee is calculated before you sign.",
    sources: [
      { label: "patientgain.com/all-pricing", url: "https://www.patientgain.com/all-pricing" },
      { label: "patientgain.com/medical-spa-marketing-plan-ideas", url: "https://www.patientgain.com/medical-spa-marketing-plan-ideas" },
    ],
  },
  {
    name: "RGV Performance Marketing",
    model: "Small AI & marketing agency for med spas",
    pricing: `Published. ${base.name} ${usd(base.price)}/mo, add-ons from ${usd(Math.min(...PLANS.slice(1).map((p) => p.price)))}/mo`,
    contract: "Month-to-month on every plan and add-on",
    adSpend: `Ads Management is a flat +${usd(adsMgmt)}/mo; Google and Meta bill ad spend to you directly`,
    summary: `We build and run your website, Google profile and local SEO, social media, ads and lead follow-up. Every plan starts with the ${base.name} at ${usd(base.price)}/mo, which includes the website, hosting, one lead inbox and automatic text and email follow-up. The one-time ${usd(BUILD_FEE)} build fee is waived when you add anything.`,
    fits: "Med spas and aesthetic practices that want one small team to run their marketing, published prices and no long-term contract.",
    tradeoffs: "We are a small team based in Harlingen, Texas. We don't sell practice-management software, and we don't have a large in-house film crew.",
    sources: [{ label: "rgvperformancemarketing.com/pricing", url: "https://rgvperformancemarketing.com/pricing" }],
    isUs: true,
  },
];

/** Honest list of when another option is a better choice. */
export const NOT_A_FIT = [
  {
    title: "You want one software platform to run patient messaging",
    text: "If you want CRM, chatbot, self-assessment and automation tools from the company that also does your marketing, a platform such as Growth99 is built for that.",
  },
  {
    title: "You need a large in-house creative team",
    text: "If brand campaigns, custom video shoots and a big team matter most, a large aesthetics agency like Studio III Marketing is set up for it.",
  },
  {
    title: "You run many locations and want one healthcare system",
    text: "DoctorLogic says it works with single offices up to multi-location groups, with reporting on where new patients come from.",
  },
  {
    title: "You only want a few marketing apps",
    text: "PatientGain sells single apps, like chat or texting, on their own if you already like your website.",
  },
];

/** Questions worth asking any provider before signing. */
export const QUESTIONS_TO_ASK = [
  "What is the monthly price, in writing, and what does it include?",
  "How long is the contract, and what does it cost to cancel early?",
  "Is ad spend included? Is the ad fee flat or a percentage of spend?",
  "Who owns the website, the content and the ad accounts if I leave?",
  "Who will I talk to each month, and how often?",
  "Do you work with my EMR and booking software, or around it?",
];
