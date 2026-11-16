import type { IconName } from "@/components/Icon";
import type { CityLink } from "@/components/CityLinks";
import { PLANS } from "@/lib/site";

/** Price for one PLANS row, by exact name, so this page can never disagree with /pricing. */
function planPrice(name: (typeof PLANS)[number]["name"]): string {
  const plan = PLANS.find((p) => p.name === name);
  if (!plan) throw new Error(`PLANS has no row named "${name}"`);
  return `$${plan.price.toLocaleString("en-US")}`;
}

const WEBSITE = planPrice("Plant the Flag (website)");
const LOCAL_SEO = planPrice("Local SEO & Google Profile add-on");
const ADS = planPrice("Ads Management add-on");

export const HVAC = {
  metaTitle: "HVAC Marketing McAllen & RGV | RGV Performance Marketing",
  metaDescription:
    "HVAC marketing in McAllen, Harlingen and Brownsville: a website that books, Google Maps, local SEO, ads and missed-call text back. Month to month.",
  primaryKeyword: "HVAC marketing McAllen",
  keywordCluster: [
    "HVAC marketing McAllen",
    "HVAC marketing Rio Grande Valley",
    "AC repair marketing RGV",
    "HVAC SEO McAllen",
    "HVAC website design Harlingen",
    "marketing for HVAC companies",
  ],
  eyebrow: "Industries · HVAC",
  h1: "Marketing for HVAC Companies in the Rio Grande Valley",
  heroSub:
    "When the AC goes out in a Valley summer, people call whoever shows up first on Google and picks up the phone. We help HVAC companies in McAllen, Harlingen, Brownsville and the rest of the RGV be that company.",
};

export const HVAC_INTRO = {
  heading: "What Marketing Does an HVAC Company in the RGV Need?",
  answer:
    "An HVAC company in the Rio Grande Valley needs to show up in the Google map results for \"AC repair\" in every city it serves, have a website that gets a call or booking from a phone in seconds, and answer every lead fast, including the calls missed while techs are on a roof. Ads fill the gaps when the phone is slow.",
  body: [
    "Most HVAC owners we talk to don't need more marketing ideas. They need the basics to work together: the Google listing, the website, the ads and the follow-up, run by one team and reported in plain numbers: calls, booked jobs and where they came from.",
  ],
};

export const HVAC_DIFFERENCES = [
  {
    title: "Demand follows the heat",
    text: "Valley summers are long, and a no-cool call can't wait. When it gets hot, people search \"AC repair near me\" from their phones and call the first company that looks trustworthy. Your listing and website have to be ready before the heat, not after.",
  },
  {
    title: "The map results decide most calls",
    text: "For \"AC repair\" and \"HVAC company\" searches, Google shows three map listings before any website. Categories, service areas, photos, posts and steady reviews decide who gets in, so we start with your Google Business Profile.",
  },
  {
    title: "You serve many cities, not one",
    text: "A shop in McAllen often runs calls in Edinburg, Mission and Pharr, and a Harlingen shop covers San Benito and Brownsville. Ranking in one city doesn't carry over, so we build a page for each city you actually serve.",
  },
  {
    title: "Missed calls are lost jobs",
    text: "Techs are in attics and on roofs all day. If a call goes unanswered, that homeowner usually calls the next company. Missed-call text back replies within seconds, so you keep the conversation going until someone can call back.",
  },
  {
    title: "Many customers search in Spanish",
    text: "Plenty of Valley homeowners search and talk in Spanish. We can build your website, Google content and ads in both languages so you show up for both.",
  },
  {
    title: "Trust is visible before the call",
    text: "Homeowners check reviews, photos of real trucks and crews, and whether you list your license before they let you in the house. We make those easy to find on your site and your Google listing.",
  },
];

export const HVAC_SERVICES: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "globe", title: "HVAC Website", text: "Click-to-call on every screen, service and city pages, financing and emergency info up front. We host and maintain it.", href: "/services/website-design" },
  { icon: "target", title: "Google Business Profile", text: "The right categories, service areas, photos of your trucks and crew, weekly posts and a steady review routine.", href: "/services/google-business-profile" },
  { icon: "search", title: "Local SEO", text: "Pages for AC repair, installs, maintenance and each city you cover, so you show up beyond your home town.", href: "/services/local-seo" },
  { icon: "megaphone", title: "Google & Meta Ads", text: "Calls now during the busy season, or to fill a slow week. Your ad spend is billed directly by Google or Meta.", href: "/services/paid-advertising" },
  { icon: "chat", title: "Missed-Call Text Back", text: "Every call, form and message in one inbox, with automatic texts, follow-ups and maintenance reminders.", href: "/services/lead-management" },
  { icon: "cpu", title: "AI After-Hours Answering", text: "AI that answers questions and books requests after hours, so the 9 PM no-cool call doesn't go to a competitor.", href: "/services/ai-implementation" },
];

export const HVAC_CHECKLIST = [
  { item: "Google Business Profile", good: "Primary category set to HVAC contractor or air conditioning contractor, every city you serve listed, new photos and a post each week" },
  { item: "Reviews", good: "A simple ask after every job, by text, with your review link" },
  { item: "Website on a phone", good: "Call button visible without scrolling, loads fast, lists services, cities and your license" },
  { item: "City pages", good: "One page for each city you run calls in, with real local details" },
  { item: "Missed calls", good: "An automatic text goes out within seconds of any missed call" },
  { item: "Spanish", good: "Key pages and your Google posts available in Spanish" },
  { item: "Tracking", good: "You know which calls came from Google Maps, the website and ads" },
];

export const HVAC_PRICING = {
  base: {
    name: "Website",
    price: WEBSITE,
    text: "Custom HVAC website built, hosted and maintained, with one lead inbox and automatic text and email follow-up, including missed-call text back.",
  },
  baseNote: "Plus a one-time $399 build fee, waived when you add any add-on.",
  addons: [
    { name: "Local SEO & Google Profile", price: `+${LOCAL_SEO}` },
    { name: "Ads Management", price: `+${ADS}` },
  ],
  note: "All prices are per month, and every plan is month-to-month. Ad spend is billed directly by Google or Meta. Social media add-ons are on the pricing page.",
};

export const HVAC_STEPS = [
  { title: "Free strategy call", text: "We look at your Google listing, your website on a phone and what homeowners in your cities search, then tell you what we'd fix first." },
  { title: "Fix the foundation", text: "Website, Google profile, call tracking and the lead inbox with missed-call text back, so every lead lands in one place." },
  { title: "Grow before the heat", text: "Add local SEO or ads as you need them, and get a plain-English report each month on calls and booked jobs." },
];

export const HVAC_FAQS = [
  {
    q: "How much does HVAC marketing cost in the RGV?",
    a: `Every plan starts with a custom website at ${WEBSITE} a month, which includes the lead inbox and missed-call text back. Local SEO & Google Profile is ${LOCAL_SEO} a month and Ads Management is ${ADS} a month, and ad spend is billed directly by Google or Meta. Plans are month-to-month, and every price is on our pricing page.`,
  },
  {
    q: "Should an HVAC company start with SEO or Google Ads?",
    a: "If the phone is slow right now, ads bring calls fastest. If you can wait a few months, local SEO and your Google Business Profile keep bringing calls without paying for each click. Many shops do both and lean on ads in the busy season.",
  },
  {
    q: "How do I get my HVAC company into the Google map results?",
    a: "Set the right primary category, list every city you serve, add real photos, post weekly and ask every customer for a review. A website page for each city you serve helps too. Nobody can guarantee a spot, but those are the parts you control.",
  },
  {
    q: "What is missed-call text back?",
    a: "When a call goes unanswered, the caller gets a text within seconds saying you got their call and asking what they need. It keeps the homeowner talking to you instead of calling the next company.",
  },
  {
    q: "Do you guarantee rankings or a number of calls?",
    a: "No. Nobody controls Google, and an agency that guarantees a ranking or call count is guessing. We commit to the work, and a monthly report shows what it brought in.",
  },
  {
    q: "Do you only work with HVAC companies in McAllen?",
    a: "No. We're based in Harlingen and work with businesses across the Rio Grande Valley, including McAllen, Edinburg, Mission, Pharr, Weslaco, San Benito and Brownsville.",
  },
];

export const HVAC_LINKS: CityLink[] = [
  { href: "/local-seo-mcallen-tx", label: "McAllen SEO & Local SEO" },
  { href: "/website-design-mcallen-tx", label: "McAllen website design" },
  { href: "/digital-marketing-harlingen-tx", label: "Digital marketing in Harlingen" },
  { href: "/website-design-brownsville-tx", label: "Brownsville website design" },
  { href: "/blog/how-much-do-google-ads-cost-rio-grande-valley", label: "How much do Google Ads cost in the RGV?" },
  { href: "/pricing", label: "Plans and pricing" },
];
