import type { IconName } from "@/components/Icon";
import { PLANS, BUILD_FEE, usd, planPrice } from "@/lib/site";
import { REPORT, HAVE_IT } from "@/lib/medspaWebsiteReport";

// Med spa service pages, added 2026-11-22: /med-spa-seo, /med-spa-advertising,
// /med-spa-social-media-marketing. /med-spa-website-design added 2026-11-25.
// Keyword targets come from ~/rgv-marketing/agency/aeo/2026-11-22/keyword-gap.md.
//
// Rules for anyone editing these:
// - Medical aesthetics only. Short, plain sentences (about a 6th-grade reading level).
// - Prices come from PLANS / BUILD_FEE in lib/site.ts. Never type a dollar amount here.
// - The only stats allowed are aggregates from our own Texas report (lib/medspaWebsiteReport.ts).
// - No invented results, client names, testimonials, guarantees or "#1 / best" claims.
// - No HIPAA certification claims. Don't mention CRM or GoHighLevel (say "lead inbox").

export type MedspaServiceSlug = "website" | "seo" | "advertising" | "social";

export type MedspaServicePage = {
  slug: MedspaServiceSlug;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywordCluster: string[];
  serviceType: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  /** The direct 2-3 sentence answer shown at the top (AEO). */
  answer: string;
  included: { heading: string; intro: string; items: { icon: IconName; title: string; text: string }[] };
  pricing: { heading: string; rows: { name: string; price: string; text: string }[]; notes: string[] };
  steps: { title: string; text: string }[];
  whoFor: { bullets: string[]; notFor: string[] };
  /** Optional rules block (ad policies, consent). */
  compliance?: { heading: string; points: string[] };
  /** One finding from our Texas report, tied to this service. */
  research: { stat: string; text: string };
  faqs: { q: string; a: string }[];
  /** Plan names (exact PLANS names) offered on this page, for the Service schema. */
  offers: (typeof PLANS)[number]["name"][];
};

const WEBSITE = PLANS[0];
const SEO = planPrice("Local SEO & Google Profile add-on");
const ADS = planPrice("Ads Management add-on");
const CREW = planPrice("Content Crew add-on");
const FULL = planPrice("Full Service Social add-on");

/** Share of report homepages that have an item, by its exact HAVE_IT label. */
function have(label: (typeof HAVE_IT)[number]["label"]): number {
  const row = HAVE_IT.find((r) => r.label === label);
  if (!row) throw new Error(`Unknown report item: ${label}`);
  return row.pct;
}
const missing = (label: (typeof HAVE_IT)[number]["label"]) => `${Math.round(100 - have(label))}%`;
const sample = REPORT.sample;

const websiteRow = {
  name: "Website (Plant the Flag)",
  price: `${usd(WEBSITE.price)}/mo`,
  text: "Custom site built, hosted and kept up to date, with one lead inbox and automatic text and email follow-up.",
};
const buildFeeNote = `The one-time ${usd(BUILD_FEE)} build fee is waived when you add any add-on. No setup fees.`;
const monthToMonth = "Every plan is month-to-month. Cancel any time.";

export const MEDSPA_SERVICE_PAGES: Record<MedspaServiceSlug, MedspaServicePage> = {
  website: {
    slug: "website",
    path: "/med-spa-website-design",
    metaTitle: "Med Spa Website Design (2027)",
    metaDescription: `Med spa website design built to book consults: treatment pages, a Book button on every screen, tap-to-call and one lead inbox. ${usd(WEBSITE.price)}/mo, hosted and kept up to date.`,
    keywordCluster: ["med spa website design", "med spa web design", "medspa website design", "med spa website", "best med spa websites", "medical spa website design"],
    serviceType: "Med spa website design",
    crumb: "Med Spa Website Design",
    eyebrow: "Med Spa Websites",
    h1: "Med Spa Website Design That Books Consults",
    answer: `A good med spa website makes booking easy: a clear page for each treatment, a Book button on every screen, tap-to-call and a fast load on phones. We build yours custom, host it and keep it up to date, and every form and call goes to one lead inbox with automatic follow-up. It's ${usd(WEBSITE.price)}/mo, month-to-month.`,
    included: {
      heading: "What's in Our Med Spa Websites",
      intro: "Everything in Plant the Flag, our website plan:",
      items: [
        { icon: "globe", title: "Custom design", text: "Built around your treatments, your providers and your brand. Not a template with your logo dropped in." },
        { icon: "calendar", title: "Booking on every screen", text: "A Book button that links to the booking system you already use, plus tap-to-call on phones." },
        { icon: "target", title: "A page per treatment", text: "Each treatment gets its own page: what it is, who it's for, what to expect and how to book." },
        { icon: "bolt", title: "Fast on phones", text: "Most clients find you on a phone. We build for phones first and keep pages fast." },
        { icon: "chat", title: "One lead inbox", text: "Forms, calls and texts land in one inbox, with missed-call text back and automatic email and text follow-up." },
        { icon: "cpu", title: "Ready for Google and AI", text: "LocalBusiness and FAQ schema and clean titles, so Google and AI tools can read your site." },
      ],
    },
    pricing: {
      heading: "What a Med Spa Website Costs",
      rows: [
        websiteRow,
        { name: "Add Local SEO", price: `+${usd(SEO)}/mo`, text: "Google profile, treatment and city pages, monthly content and a report. Adding it waives the build fee." },
      ],
      notes: [
        `The website alone has a one-time ${usd(BUILD_FEE)} build fee. It's waived when you add any add-on. No setup fees.`,
        "Hosting, updates and fixes are part of the monthly price.",
        monthToMonth,
      ],
    },
    steps: [
      { title: "Book a 15-minute call", text: "Tell us your treatments, your booking system and what you like and don't like about your site today." },
      { title: "We design and build", text: "We write the pages, design the site and connect your Book button. Most sites go live in 8 to 10 days." },
      { title: "We keep it up to date", text: "New treatments, price changes and fixes are part of the monthly plan. Tell us what changed and we update it." },
    ],
    whoFor: {
      bullets: [
        "Med spas and aesthetic practices whose site is slow, dated or hard to book from",
        "Practices adding treatments and tired of waiting on someone to update the site",
        "Owners who want the site, hosting and follow-up handled by one team",
      ],
      notFor: [
        "You want to own and edit the site code yourself. Our sites are hosted and maintained by us.",
        "You need an online store with hundreds of products. We build for booking consults.",
      ],
    },
    compliance: {
      heading: "Website Rules We Follow",
      points: [
        "Before-and-after photos need the patient's written consent. We only add photos you confirm you have consent for.",
        "Treatment pages describe what a treatment is and who it's for. They don't promise results.",
      ],
    },
    research: {
      stat: missing("Link to an online booking platform"),
      text: `of the ${sample} med spa homepages in our Texas report had no link to an online booking platform, ${missing("Tap-to-call phone link")} had no tap-to-call link and only ${Math.round(have("Treatment prices published"))}% published treatment prices. The best med spa websites make booking the easiest thing on the page.`,
    },
    faqs: [
      { q: "What makes a good med spa website?", a: "A good med spa website makes it easy to book. It has a page for each treatment, a Book button on every screen, tap-to-call on phones, real photos of your team and space, reviews, and fast load times. It also has the code that tells Google and AI tools who you are and where you are." },
      { q: "How much does a med spa website cost?", a: `Our med spa website is ${usd(WEBSITE.price)}/mo. That covers the custom build, hosting, updates, one lead inbox and automatic follow-up. There's a one-time ${usd(BUILD_FEE)} build fee on the website alone, waived when you add any add-on.` },
      { q: "How long does it take to build a med spa website?", a: "Most of our med spa sites go live in 8 to 10 days once we have your treatments, photos and booking link." },
      { q: "Can my website connect to my booking system?", a: "Yes. Your Book button links to the booking system you already use, like Boulevard, Aesthetic Record, Zenoti or Vagaro. You don't have to switch systems." },
      { q: "Should my med spa website show prices?", a: `It's your call, but it helps. Only ${Math.round(have("Treatment prices published"))}% of the med spa homepages in our Texas report published treatment prices. Even a "starting at" price can help people decide to book a consult.` },
      { q: "Do you write the website copy?", a: "Yes. We write the treatment pages and the rest of the site in plain words, and you review it before it goes live." },
      { q: "Is there a contract?", a: "No. The website plan is month-to-month. You can cancel any time." },
    ],
    offers: ["Plant the Flag (website)"],
  },
  seo: {
    slug: "seo",
    path: "/med-spa-seo",
    metaTitle: "Med Spa SEO Services for Medical Spas",
    metaDescription: `Med spa SEO for medical spas and aesthetic practices: Google Business Profile, treatment and city pages, monthly content and a report. ${usd(SEO)}/mo add-on, month-to-month.`,
    keywordCluster: ["med spa seo", "medical spa seo", "medspa seo", "seo for med spas", "aesthetic practice seo"],
    serviceType: "Med spa SEO",
    crumb: "Med Spa SEO",
    eyebrow: "Med Spa SEO",
    h1: "Med Spa SEO That Helps Clients Find You on Google",
    answer: `Med spa SEO is the work that helps your practice show up when people near you search for a treatment, like "Botox near me." We build out your Google Business Profile, write a page for each treatment and city, clean up your site and add new content every month. It's a ${usd(SEO)}/mo add-on to our ${usd(WEBSITE.price)}/mo website, month-to-month.`,
    included: {
      heading: "What's in Our Medical Spa SEO",
      intro: "Everything in the Local SEO & Google Profile add-on:",
      items: [
        { icon: "map-pin", title: "Google Business Profile", text: "We build out your profile: categories, services, photos and posts, so you can show up in the map results near you." },
        { icon: "globe", title: "Treatment and city pages", text: "A clear page for each treatment you offer and each area you serve. Each one answers the questions clients ask before they book." },
        { icon: "wrench", title: "On-page cleanup", text: "Titles, headings, links and schema markup fixed so Google and AI tools understand what you do and where." },
        { icon: "megaphone", title: "Monthly content", text: "New content each month that answers real client questions about your treatments." },
        { icon: "chart", title: "Monthly report", text: "A clear report each month on what we did and how your search results are moving." },
        { icon: "cpu", title: "Ready for AI search", text: "The same work helps ChatGPT and Google's AI answers understand your practice. Check yours free with ScanRank." },
      ],
    },
    pricing: {
      heading: "What Med Spa SEO Costs",
      rows: [
        websiteRow,
        { name: "Local SEO & Google Profile", price: `+${usd(SEO)}/mo`, text: "Google profile, treatment and city pages, on-page cleanup, monthly content and report." },
      ],
      notes: [
        `Together that's ${usd(WEBSITE.price + SEO)}/mo. ${buildFeeNote}`,
        monthToMonth,
      ],
    },
    steps: [
      { title: "Book a 15-minute call", text: "Tell us your treatments, your area and who you want more of. We'll look at how you show up on Google today." },
      { title: "We build the base", text: "Your website goes live, then we build out your Google profile and your treatment and city pages." },
      { title: "We add to it every month", text: "New content, fixes and a monthly report. SEO builds over time, so we keep at it." },
    ],
    whoFor: {
      bullets: [
        "Med spas and aesthetic practices that want more clients from Google, not just from ads",
        "Practices with a few key treatments they want to be known for in their area",
        "Owners who want to see what was done each month, in plain words",
      ],
      notFor: [
        "You need a flood of bookings this week. Ads are faster. SEO takes months.",
        "You want a promise of a certain spot on Google. No honest agency can promise that.",
      ],
    },
    compliance: {
      heading: "SEO Rules We Follow",
      points: [
        "We don't buy reviews, write fake reviews or offer clients rewards for reviews. Google doesn't allow it.",
        "Before-and-after photos on your site need the patient's written consent. We only post photos you confirm you have consent for.",
        "Treatment pages describe what a treatment is and who it's for. They don't promise results.",
      ],
    },
    research: {
      stat: missing("LocalBusiness-type schema"),
      text: `of the ${sample} med spa homepages in our Texas report had no LocalBusiness-type schema, the code that tells Google and AI tools who you are and where you are. Only ${Math.round(have("FAQ schema"))}% had FAQ schema.`,
    },
    faqs: [
      { q: "What is med spa SEO?", a: "Med spa SEO helps your practice show up in Google when people near you search for treatments like Botox, filler or laser hair removal. It covers your Google Business Profile, your treatment and city pages, how your site is built, and new content over time." },
      { q: "How much does medical spa SEO cost?", a: `Our Local SEO & Google Profile add-on is ${usd(SEO)}/mo on top of the ${usd(WEBSITE.price)}/mo website, so ${usd(WEBSITE.price + SEO)}/mo in all. The ${usd(BUILD_FEE)} build fee is waived when you add SEO. There's no contract.` },
      { q: "How long does med spa SEO take to work?", a: "Local SEO usually takes 60 to 90 days to start showing real movement, and it keeps building after that. Google profile changes can move sooner. Busy markets take longer." },
      { q: "Can you guarantee my med spa ranks first on Google?", a: "No. Nobody controls Google's rankings, so no honest agency can promise a spot. We can promise the work: a built-out profile, strong treatment pages, monthly content and a clear report." },
      { q: "What's the difference between SEO and a Google Business Profile?", a: "Your Google Business Profile is the listing that shows up in the map results. SEO is the bigger job: the profile plus your website pages, content and code. Our add-on covers both." },
      { q: "Does med spa SEO help with ChatGPT and AI search?", a: "It helps. AI tools read the same pages and schema that Google does. Clear treatment pages, FAQ answers and business details make it easier for them to understand your practice. Our free ScanRank tool scores how ready your site is." },
      { q: "Is there a contract?", a: "No. The SEO add-on and the website are both month-to-month. You can cancel any time." },
    ],
    offers: ["Plant the Flag (website)", "Local SEO & Google Profile add-on"],
  },

  advertising: {
    slug: "advertising",
    path: "/med-spa-advertising",
    metaTitle: "Med Spa Advertising: Google & Meta Ads",
    metaDescription: `Med spa advertising on Google and Meta, built around health ad rules and booked consults. ${usd(ADS)}/mo flat; ad spend billed by Google or Meta directly.`,
    keywordCluster: ["med spa advertising", "medspa ads", "medical spa ads", "med spa google ads", "med spa facebook ads", "med spa meta ads"],
    serviceType: "Med spa advertising (Google Ads and Meta ads management)",
    crumb: "Med Spa Advertising",
    eyebrow: "Medspa Ads",
    h1: "Med Spa Advertising on Google and Meta",
    answer: `Med spa advertising puts your treatments in front of people who are ready to book, through Google search ads and Meta ads on Facebook and Instagram. We build the campaigns, write the ads, follow each platform's health ad rules and send every lead to one inbox. Ads Management is a flat ${usd(ADS)}/mo, and Google or Meta bills your ad spend to you directly.`,
    included: {
      heading: "What's in Our Medspa Ads Management",
      intro: "Everything in the Ads Management add-on:",
      items: [
        { icon: "search", title: "Google search ads", text: "Ads that show when people search for a treatment near you. These are people already looking." },
        { icon: "users", title: "Meta ads", text: "Facebook and Instagram ads that show your treatments and offers to people in your area." },
        { icon: "megaphone", title: "Ad copy and creative", text: "We write the ads and make the images and videos, and refresh them when they stop working." },
        { icon: "shield", title: "Health ad rules", text: "Campaigns planned around Google's and Meta's healthcare ad policies from the start." },
        { icon: "chat", title: "Leads in one inbox", text: "Every form and call lands in your lead inbox, with automatic text and email follow-up." },
        { icon: "chart", title: "Tracking and reports", text: "We track leads and booked consults, cut what isn't working and report in plain words." },
      ],
    },
    pricing: {
      heading: "What Medical Spa Ads Cost",
      rows: [
        websiteRow,
        { name: "Ads Management", price: `+${usd(ADS)}/mo`, text: "Google or Meta ads built and managed for you. Flat fee, not a percentage of your spend." },
      ],
      notes: [
        `Together that's ${usd(WEBSITE.price + ADS)}/mo, plus your ad spend. ${buildFeeNote}`,
        "Ad spend is not included. Google and Meta bill it to you directly, so you always see exactly what you spent.",
        monthToMonth,
      ],
    },
    steps: [
      { title: "Book a 15-minute call", text: "Tell us which treatments you want to fill and your budget. We'll say plainly if ads make sense for you right now." },
      { title: "We build and check", text: "We set up tracking, build the campaigns and landing pages, and check the ads against each platform's rules before launch." },
      { title: "We run it every month", text: "We watch the numbers, swap tired ads for new ones, move money to what books consults and report on it." },
    ],
    whoFor: {
      bullets: [
        "Med spas that want new consults now and can fund a monthly ad budget",
        "Practices with a clear offer, like a new treatment or a seasonal special",
        "Owners who want leads answered fast, not left sitting in a form",
      ],
      notFor: [
        "You can't fund ad spend on top of the fee. Start with SEO instead.",
        "Your calendar is already full. Ads bring more people than you can see.",
      ],
    },
    compliance: {
      heading: "Med Spa Ads Have Stricter Rules",
      points: [
        "Google and Meta both have healthcare ad policies. Prescription treatments, like neurotoxins, have extra limits on how they can be named in ads.",
        "Meta can reject ads that make people feel bad about how they look. We write ads about the result clients want, not their flaws.",
        "Meta limits before-and-after images in ads for cosmetic treatments, and Google reviews health ads closely. Any patient photo also needs the patient's written consent.",
        "We don't promise results in ads, and we don't promise you a set number of leads.",
      ],
    },
    research: {
      stat: missing("Link to an online booking platform"),
      text: `of the ${sample} med spa homepages in our Texas report had no link to an online booking platform, and ${missing("Tap-to-call phone link")} had no tap-to-call link. Paying for clicks that land on a page like that wastes money, so we point every ad at a page on your site built to book.`,
    },
    faqs: [
      { q: "How much does med spa advertising cost?", a: `Our Ads Management add-on is a flat ${usd(ADS)}/mo on top of the ${usd(WEBSITE.price)}/mo website. Your ad spend is separate and billed to you by Google or Meta. There's no contract and no percentage of spend.` },
      { q: "Is ad spend included in the fee?", a: "No. The fee covers building and running your campaigns. What you pay Google or Meta to show the ads is billed to you directly by the platform." },
      { q: "Should my med spa run Google ads or Meta ads?", a: "Google search ads reach people who are already searching for a treatment. Meta ads on Facebook and Instagram are better for showing your work and offers to people nearby who aren't searching yet. We'll suggest a starting point on the call." },
      { q: "Can I advertise Botox on Facebook and Google?", a: "Yes, with limits. Botox is a prescription drug, and both platforms limit how prescription drugs can be named in ads. Ads often focus on the treatment and a consult instead. We check every ad against the current rules before it runs." },
      { q: "Can I use before-and-after photos in med spa ads?", a: "Often not in ads. Meta limits before-and-after images in ads for cosmetic treatments, and Google reviews health ads closely. Any patient photo, in an ad or a post, also needs that patient's written consent." },
      { q: "How fast do medspa ads bring in leads?", a: "Ads can start bringing leads in the first week or two. The first few weeks are also a learning period while the platforms find who responds, so results usually settle after that." },
      { q: "Do you guarantee a number of leads?", a: "No. Results depend on your market, your offer and your budget. We promise the work: rule-safe campaigns, fresh ads, fast follow-up and honest reports." },
      { q: "Is there a contract?", a: "No. Ads Management is month-to-month like every plan. You can cancel any time." },
    ],
    offers: ["Plant the Flag (website)", "Ads Management add-on"],
  },

  social: {
    slug: "social",
    path: "/med-spa-social-media-marketing",
    metaTitle: "Med Spa Social Media Marketing",
    metaDescription: `Aesthetic social media marketing for med spas: weekly reels, branded posts and stories. You shoot and we edit (${usd(CREW)}/mo), or we shoot, post and answer DMs (${usd(FULL)}/mo).`,
    keywordCluster: [
      "aesthetic social media",
      "med spa social media marketing",
      "medical spa social media marketing",
      "social media marketing aesthetics",
      "spa social media marketing",
      "med spa social media",
    ],
    serviceType: "Med spa social media marketing",
    crumb: "Med Spa Social Media",
    eyebrow: "Aesthetic Social Media",
    h1: "Aesthetic Social Media Marketing for Med Spas",
    answer: `Med spa social media marketing means posting reels, photos and stories every week that show your work and your team, so people trust you before they book. You can shoot the video and let us edit it for ${usd(CREW)}/mo, or have us post and answer your DMs too for ${usd(FULL)}/mo, with a monthly on-site shoot for practices in South Texas. Both are month-to-month and sold with or without our website.`,
    included: {
      heading: "Two Ways to Hand Off Your Social",
      intro: "Pick the one that fits how much your team wants to do.",
      items: [
        { icon: "users", title: "Content Crew: you shoot", text: "Your team films on a phone. We edit it into 1 reel and 1 branded creative a week, plus stories." },
        { icon: "mail", title: "Content Crew: you post", text: "We send the finished pieces back ready to go. Your team posts them." },
        { icon: "megaphone", title: "Full Service: more content", text: "2 reels and 1 post a week, plus unlimited stories." },
        { icon: "calendar", title: "Full Service: monthly shoot", text: "A monthly on-site shoot at your practice for local clients in South Texas. Everywhere else, your team films and we do the rest." },
        { icon: "chat", title: "Full Service: we post and reply", text: "We post for you and answer your DMs, so questions don't sit." },
        { icon: "target", title: "Made for aesthetics", text: "Content about your treatments, your providers and what a visit feels like. Not generic spa posts." },
      ],
    },
    pricing: {
      heading: "What Med Spa Social Media Costs",
      rows: [
        { name: "Content Crew", price: `${usd(CREW)}/mo`, text: "You shoot, we edit: 1 reel and 1 branded creative a week, plus stories. You post." },
        { name: "Full Service Social", price: `${usd(FULL)}/mo`, text: "2 reels and 1 post a week, unlimited stories, a monthly on-site shoot (local). We post and answer DMs." },
      ],
      notes: [
        `Both are sold on their own, or as add-ons to the ${usd(WEBSITE.price)}/mo website. ${buildFeeNote}`,
        monthToMonth,
      ],
    },
    steps: [
      { title: "Book a 15-minute call", text: "Tell us your treatments, your style and how much filming your team can do. We'll help you pick a plan." },
      { title: "Film", text: "Your team films on a phone, or, with Full Service in South Texas, we come shoot at your practice each month." },
      { title: "We edit (and post)", text: "We turn the footage into reels, creatives and stories. With Full Service, we post them and answer your DMs too." },
    ],
    whoFor: {
      bullets: [
        "Med spas and aesthetic practices that know they should post more but never get to it",
        "Teams happy to film a little but who don't have time to edit",
        "Owners who want DMs answered so questions turn into consults",
      ],
      notFor: [
        "You want faceless stock posts only. Aesthetics clients want to see real providers and real work.",
        "You need paid reach right away. Social builds trust over time. Pair it with ads for speed.",
      ],
    },
    compliance: {
      heading: "Social Rules We Follow",
      points: [
        "Before-and-after posts need the patient's written consent. We only post photos and video you confirm you have consent for.",
        "No faces of clients without their OK, and no AI-made people or fake results.",
        "Business accounts can't use every popular song. We pick sounds that are cleared for business use.",
      ],
    },
    research: {
      stat: missing("Text or chat option"),
      text: `of the ${sample} med spa homepages in our Texas report gave visitors no way to text or chat. For many practices, Instagram and Facebook DMs are where those questions go, so answering them fast matters.`,
    },
    faqs: [
      { q: "What does med spa social media marketing include?", a: `With Content Crew (${usd(CREW)}/mo) you shoot and we edit 1 reel and 1 branded creative a week, plus stories, and you post. With Full Service Social (${usd(FULL)}/mo) you get 2 reels and 1 post a week, unlimited stories and a monthly on-site shoot for local clients, and we post and answer DMs.` },
      { q: "How much does med spa social media marketing cost?", a: `Content Crew is ${usd(CREW)}/mo and Full Service Social is ${usd(FULL)}/mo. Both are month-to-month and sold with or without our website.` },
      { q: "Do I need your website to get social media?", a: `No. Content Crew and Full Service Social are both sold on their own. If you add one to our ${usd(WEBSITE.price)}/mo website, the ${usd(BUILD_FEE)} build fee is waived.` },
      { q: "Will you come film at my med spa?", a: "With Full Service Social, a monthly on-site shoot is included for local clients in South Texas. Outside that area, your team films on a phone and we handle the editing and posting." },
      { q: "Can you post before-and-after photos?", a: "Yes, when the patient has given written consent. We only post photos and video you confirm you have consent for. Paid ads have stricter limits on before-and-after images than regular posts." },
      { q: "Do you answer DMs and comments?", a: "With Full Service Social, yes. We post for you and answer your DMs. With Content Crew, your team posts and handles messages." },
      { q: "Is there a contract?", a: "No. Both social plans are month-to-month. You can cancel any time." },
    ],
    offers: ["Content Crew add-on", "Full Service Social add-on"],
  },
};

export const MEDSPA_SERVICE_LIST = Object.values(MEDSPA_SERVICE_PAGES);
