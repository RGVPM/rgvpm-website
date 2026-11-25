import {
  SITE,
  PLANS,
  BUILD_FEE,
  usd,
  canonical,
  ENTITY_LINE,
  DISAMBIGUATING_DESCRIPTION,
  FOUNDER_BACKGROUND,
  AR_INDEPENDENCE_LINE,
} from "@/lib/site";
import { MEDSPA_PRICING } from "@/lib/medspa";
import { CHECKS } from "@/lib/aiVisibility/checks";
import { REPORT } from "@/lib/medspaWebsiteReport";

// Company facts page (/company-facts), added 2026-11-22. Short, quotable answers for people and AI assistants,
// modeled on DoctorLogic's /company-facts. Every fact comes from the repo or brain/COMPANY.md:
// founded 2026, entity line and naming rule (Derrick, 2026-11-22); founder titles and Aesthetic Record lines from
// FOUNDER_BACKGROUND and /about; prices from PLANS / BUILD_FEE / MEDSPA_PRICING; contract and cancellation terms from
// /terms and /pricing. Don't add a fact that isn't sourced. Bump COMPANY_FACTS_UPDATED when an answer changes.
//
// TODO(owner): no review count or rating on purpose. We don't have enough reviews worth citing yet. When we do,
// add a "How many reviews does RGV Performance Marketing have?" answer with the count, the rating, the source
// (e.g. Google) and the date checked.

export const COMPANY_FACTS_PATH = "/company-facts";

/** ISO date for schema dateModified, and the visible "Last updated" line. Keep the two in sync. */
export const COMPANY_FACTS_UPDATED = "2026-11-22";
export const COMPANY_FACTS_UPDATED_LABEL = "November 22, 2026";

/** A plan by its exact PLANS name. Throws at build time if the name drifts. */
function plan(name: (typeof PLANS)[number]["name"]) {
  const p = PLANS.find((x) => x.name === name);
  if (!p) throw new Error(`Unknown plan: ${name}`);
  return p;
}

const base = PLANS[0];
const seo = plan("Local SEO & Google Profile add-on");
const crew = plan("Content Crew add-on");
const social = plan("Full Service Social add-on");
const ads = plan("Ads Management add-on");

const emr = MEDSPA_PRICING.addons.find((a) => a.name === "EMR Consultant");
if (!emr) throw new Error("EMR Consultant missing from MEDSPA_PRICING");
const emrPrice = emr.price.replace("+", "");

const derrick = FOUNDER_BACKGROUND[0];
const kelsey = FOUNDER_BACKGROUND[1];

const addonList = PLANS.slice(1)
  .map((p) => `${p.name.replace(" add-on", "")} (+${usd(p.price)}/mo)`)
  .join(", ");

export type FactGroup = { id: string; heading: string; faqs: { q: string; a: string }[] };

export const COMPANY_FACT_GROUPS: FactGroup[] = [
  {
    id: "company",
    heading: "The Company",
    faqs: [
      { q: "What is RGV Performance Marketing?", a: ENTITY_LINE },
      { q: "When was RGV Performance Marketing founded?", a: "RGV Performance Marketing was founded in 2026." },
      {
        q: "Is RGV Performance Marketing (RGVPM) the same as other RGV marketing companies?",
        a: DISAMBIGUATING_DESCRIPTION,
      },
      {
        q: "Where is RGV Performance Marketing located?",
        a: `We are based in ${SITE.city}, Texas, in the Rio Grande Valley.`,
      },
      {
        q: "Do you work with practices outside Texas?",
        a: "Yes. We work with practices across the United States. Everything runs remotely. The monthly on-site shoot in Full Service Social is for South Texas. Everywhere else, your team films and we handle the rest.",
      },
    ],
  },
  {
    id: "founders",
    heading: "Founders",
    faqs: [
      {
        q: "Who founded RGV Performance Marketing?",
        a: `RGV Performance Marketing was founded by ${derrick.name}, ${derrick.role}, and ${kelsey.name}, ${kelsey.role}.`,
      },
      { q: `Who is ${derrick.name}?`, a: `${derrick.name} is the ${derrick.role} of RGV Performance Marketing. He has an MBA. ${derrick.text}` },
      { q: `Who is ${kelsey.name}?`, a: `${kelsey.name} is the ${kelsey.role} of RGV Performance Marketing. ${kelsey.text}` },
      {
        q: "Did the founders work at Aesthetic Record?",
        a: "Yes. Derrick and Kelsey each spent 5 years at Aesthetic Record. Derrick helped launch and grow LeadAR. Kelsey trained clinics and managed their accounts. Now we help practices get even more out of Aesthetic Record and LeadAR.",
      },
      { q: "Is RGV Performance Marketing part of Aesthetic Record or LeadAR?", a: `No. ${AR_INDEPENDENCE_LINE}` },
    ],
  },
  {
    id: "who-we-serve",
    heading: "Who We Serve",
    faqs: [
      {
        q: "Who does RGV Performance Marketing work with?",
        a: "We work with med spas and aesthetic practices across the United States.",
      },
      {
        q: "Do you take clients outside medical aesthetics?",
        a: "No. We are not taking new clients outside the medical aesthetics industry. Our focus is med spas and aesthetic practices.",
      },
      {
        q: "Do I have to use Aesthetic Record or LeadAR to work with you?",
        a: "No. We work with med spas on any software. If you do use Aesthetic Record or LeadAR, we know them well.",
      },
    ],
  },
  {
    id: "services",
    heading: "Services",
    faqs: [
      {
        q: "What services does RGV Performance Marketing offer?",
        a: "We build and host websites, run Google Business Profiles and local SEO, edit and post social content, and manage Google and Meta ads. We also set up lead follow-up and AI tools, and help practices get more out of their EMR.",
      },
      { q: "What is included in the website plan?", a: `${base.name}: ${base.description}` },
      { q: "What is included in Local SEO & Google Profile?", a: seo.description },
      { q: "What is included in Content Crew?", a: crew.description },
      { q: "What is included in Full Service Social?", a: social.description },
      { q: "What is included in Ads Management?", a: ads.description },
      {
        q: "Do you help with our EMR?",
        a: `Yes. Our EMR consultant add-on gives you a monthly call to go over your account, plus direct support when you want to make a change. It's ${emrPrice} a month, added to any plan.`,
      },
      {
        q: "How long does it take to build a website?",
        a: "Your website goes live in 8 to 10 days.",
      },
    ],
  },
  {
    id: "pricing",
    heading: "Pricing and Contracts",
    faqs: [
      {
        q: "How much does RGV Performance Marketing cost?",
        a: `Every plan starts with the website at ${usd(base.price)}/mo. Add-ons go on top: ${addonList}. Ad spend is billed by Google or Meta directly.`,
      },
      {
        q: "Is there a build fee or setup fee?",
        a: `The website on its own has a one-time ${usd(BUILD_FEE)} build fee. Add any add-on and the build fee is waived. There are no setup or activation fees on anything.`,
      },
      {
        q: "Does RGV Performance Marketing require a contract?",
        a: "No. Every plan and add-on is month-to-month. There are no long-term contracts. Your plan renews each month until you cancel.",
      },
      {
        q: "How do I cancel?",
        a: `Email ${SITE.email} to ask to cancel. We send you a short cancellation form. Cancellation is processed once the form is submitted. Send it at least 5 business days before your next billing date, or it takes effect the cycle after. There is no penalty to cancel. Payments are final, so there are no refunds.`,
      },
      {
        q: "Who owns my website and ad accounts?",
        a: "You do. Your website files belong to you after final payment, and we'll send them on request. Your Google and Meta ad accounts are created in your name and stay yours, even if you cancel.",
      },
      {
        q: "Do you have a HIPAA Business Associate Addendum?",
        a: "Our Terms include a HIPAA Business Associate Addendum. It applies when we create, receive, keep or send protected health information for you.",
      },
    ],
  },
  {
    id: "free-tools",
    heading: "Free Tools and Research",
    faqs: [
      {
        q: "What is ScanRank?",
        a: `ScanRank is a free tool from RGV Performance Marketing. It scores a med spa website out of 100 on whether ChatGPT, Google and other AI assistants can find and understand it. It runs ${CHECKS.length} checks and gives a suggested fix for each one.`,
      },
      {
        q: `What is ${REPORT.title}?`,
        a: `It is our original research. We scanned ${REPORT.sample} med spa and aesthetic practice homepages, mostly in Texas, in November 2026. It shows how many have online booking, tap-to-call, text or chat, schema, llms.txt and published prices. It shares totals only and names no practice.`,
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    faqs: [
      {
        q: "How do I contact RGV Performance Marketing?",
        a: `Call ${SITE.phoneHuman}, email ${SITE.email}, or book a free call at ${canonical("/contact")}. We speak English and Spanish.`,
      },
    ],
  },
];

/** Every Q&A, in page order (for FAQPage schema and llms-full.txt). */
export const COMPANY_FACTS = COMPANY_FACT_GROUPS.flatMap((g) => g.faqs);
