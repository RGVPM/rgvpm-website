import type { IconName } from "@/components/Icon";

// Texas metro med spa marketing pages, added 2026-11-22 (Derrick-approved):
// /med-spa-marketing-houston-tx, -san-antonio-tx, -dallas-tx, -austin-tx.
//
// Rules for anyone editing these:
// - RGVPM has no office in these cities. We work remotely from Harlingen. Never imply a local office or address.
// - Every number below comes from a public source listed in that city's `sources`, read 2026-11-22.
//   Census figures: Vintage 2024 metro/county estimates (cbsa-est2024-alldata.csv) and ACS 2024 1-year
//   tables C16001 (language at home, age 5+) and B19013 (median household income). Re-check before changing.
// - Texas rules come from the Texas Medical Board FAQ, 22 TAC §169.25 and TDLR's medical spa page. Plain-English
//   summary only; no legal advice, no health or results claims.
// - Never name or compare local practices. Prices come from PLANS in lib/site.ts (rendered by the page), never typed here.

export type Source = { label: string; url: string };

export type TexasCity = {
  slug: "houston" | "san-antonio" | "dallas" | "austin";
  path: string;
  city: string;
  metroName: string;
  metaTitle: string;
  metaDescription: string;
  keywordCluster: string[];
  h1: string;
  heroSub: string;
  marketHeading: string;
  market: string[];
  stats: { value: string; label: string }[];
  landscapeHeading: string;
  landscape: string[];
  playbookHeading: string;
  playbook: { icon: IconName; title: string; text: string }[];
  remoteIntro: string;
  remoteSteps: { title: string; text: string }[];
  rulesNote: string;
  shootNote: string;
  faqs: { q: string; a: string }[];
  sources: Source[];
};

const SRC_CENSUS_METRO: Source = {
  label: "U.S. Census Bureau, Vintage 2024 population estimates for metro areas and counties",
  url: "https://www.census.gov/data/tables/time-series/demo/popest/2020s-total-metro-and-micro-statistical-areas.html",
};
const SRC_ACS_LANGUAGE: Source = {
  label: "U.S. Census Bureau, American Community Survey 2024 1-year, table C16001 (language spoken at home)",
  url: "https://data.census.gov/table/ACSDT1Y2024.C16001",
};
const SRC_ACS_INCOME: Source = {
  label: "U.S. Census Bureau, American Community Survey 2024 1-year, table B19013 (median household income)",
  url: "https://data.census.gov/table/ACSDT1Y2024.B19013",
};

export const TEXAS_RULE_SOURCES: Source[] = [
  { label: "Texas Medical Board, FAQs (med spa services, med spa registration, IV hydration)", url: "https://www.tmb.texas.gov/email-us" },
  { label: "22 Tex. Admin. Code §169.25, Other Delegation", url: "https://www.law.cornell.edu/regulations/texas/22-Tex-Admin-Code-SS-169-25" },
  { label: "Texas Department of Licensing and Regulation, Medical Spas", url: "https://www.tdlr.texas.gov/barbering-and-cosmetology/medical-spas.htm" },
];

/** Shared across the four pages: what Texas regulators say, in plain English. */
export const TEXAS_RULES = {
  heading: "Texas Rules That Shape Your Marketing",
  intro:
    "Your website and ads have to describe your treatments the way Texas regulates them. We read the state's own guidance before we write a word. The short version:",
  items: [
    {
      title: "Injectables and devices count as medicine",
      text: "The Texas Medical Board treats nonsurgical cosmetic procedures, including cosmetic injections and prescription devices used for cosmetic purposes, as the practice of medicine. A physician can delegate them to people with the right training (22 TAC §169.25).",
    },
    {
      title: "A provider has to be reachable",
      text: "A physician, PA or APRN must be on site during the procedure or immediately available for an emergency consultation, and the physician must be able to see the patient for an emergency appointment if needed. The board points to its rule 169, Subchapter E.",
    },
    {
      title: "Texas has no med spa license",
      text: "The board says Texas has no registration for med spa clinics. It registers pain management clinics, office-based anesthesia and clinics jointly owned by physicians and PAs.",
    },
    {
      title: "IV hydration has its own rule",
      text: "A physician, or a PA or APRN under adequate physician supervision, has to order elective IV hydration. A licensed professional nurse or higher-level licensee has to give it.",
    },
    {
      title: "Facials and lasers sit with TDLR",
      text: "TDLR licenses estheticians, laser hair removal and massage therapy. Estheticians may only work in a TDLR-licensed establishment, so a medical office that offers esthetic services should hold that license.",
    },
  ],
  howWeUseIt:
    "What we do with it: your treatment pages say who performs each treatment by credential, we never promise results, and you approve treatment copy before it goes live.",
  disclaimer:
    "A plain-English summary of public guidance, read November 22, 2026. It is not legal advice. Ask a Texas healthcare attorney about your own setup.",
};

export const TEXAS_CITIES: TexasCity[] = [
  {
    slug: "houston",
    path: "/med-spa-marketing-houston-tx",
    city: "Houston",
    metroName: "Houston-Pasadena-The Woodlands",
    metaTitle: "Med Spa Marketing in Houston, TX",
    metaDescription:
      "Med spa marketing for Houston practices: website, Google, social and ads, run remotely from Harlingen, Texas. Published prices, month-to-month, Texas rules built in.",
    keywordCluster: [
      "med spa marketing houston",
      "medspa marketing houston tx",
      "med spa seo houston",
      "aesthetic practice marketing houston",
      "med spa advertising houston",
    ],
    h1: "Med Spa Marketing for Houston Practices",
    heroSub:
      "Houston is the fifth-largest metro in the country and still adding people fast. We run websites, Google, social and ads for Houston med spas from Harlingen, Texas, at prices you can read before we talk.",
    marketHeading: "Houston Is Ten Counties, Not One Market",
    market: [
      "The Census Bureau put the Houston-Pasadena-The Woodlands metro at 7,796,182 people in July 2024. Only the New York metro added more people that year. Harris County holds about five million of them, and the rest live across nine more counties.",
      "The suburbs drive the growth. Fort Bend County grew 16.5% and Montgomery County grew 20.8% between April 2020 and July 2024. Together they added about as many residents as Harris County did. If your practice sits in Katy, Sugar Land or The Woodlands, your next clients probably moved in during the last few years and are still picking a provider.",
      "Spread like that changes how Google treats you. A client in Pearland and a client in Cypress see different map results for the same search, so one generic Houston page won't carry you. You win the area around your door first, then widen it.",
    ],
    stats: [
      { value: "7.8M", label: "people in the Houston metro, July 2024" },
      { value: "198,171", label: "people added from 2023 to 2024, second only to New York" },
      { value: "30.2%", label: "of residents 5 and older speak Spanish at home" },
      { value: "$81,417", label: "median household income in the metro, 2024" },
    ],
    landscapeHeading: "Sizing Up the Competition Near You",
    landscape: [
      "Nobody publishes an official count of Houston med spas. Texas has no med spa registration, so the real list lives in Google Maps and changes every month.",
      "So we start with your map. For your top treatments, we pull the results a client sees from your address and from the suburbs you want to reach, then show you which profiles rank above yours and what they have that you don't yet: more reviews, more photos, better categories, a treatment page Google can read. We never name or knock another practice on your site.",
    ],
    playbookHeading: "What We'd Do First for a Houston Practice",
    playbook: [
      { icon: "map-pin", title: "Pages for the areas you serve", text: "A page for each suburb or neighborhood your clients come from, with the treatments you offer, how to find you and where to park. No copy-paste city pages." },
      { icon: "chat", title: "Spanish where it books", text: "About three in ten people in the metro speak Spanish at home. If your front desk books in Spanish, we write your key treatment pages and ads in Spanish too." },
      { icon: "target", title: "Ads sized to your drive time", text: "Google and Meta ads aimed at the ZIP codes within a reasonable drive of your door, so you stop paying for clicks from the other side of the Beltway." },
    ],
    remoteIntro:
      "We work from Harlingen, Texas, and we don't have a Houston office. You get the same team either way: video calls, one inbox and a monthly check-in.",
    remoteSteps: [
      { title: "A 15-minute video call", text: "Tell us your treatments, who you pay now and which suburbs you want: Katy, Pearland, Cypress or the whole west side." },
      { title: "Kickoff over video", text: "Kelsey runs onboarding on a call. Send your logins and photos, and plan on about an hour with us." },
      { title: "Your site in 8 to 10 days", text: "We build, host and maintain it, with Spanish pages if your front desk books in Spanish." },
      { title: "A monthly check-in", text: "One call and one report on calls, forms and booked consults, broken out by the areas you target." },
    ],
    rulesNote:
      "For Houston, that also applies to your Spanish pages and ads. We translate the credential and supervision details too, not just the headline.",
    shootNote:
      "The monthly on-site shoot in Full Service Social is for practices near us in South Texas. In Houston, your team films short clips on a phone and we edit, caption and post them.",
    faqs: [
      { q: "Do you have an office in Houston?", a: "No. We're based in Harlingen, Texas, and we run Houston accounts remotely over video calls, email and text. Your site, Google profile and ads don't need us in the room." },
      { q: "Can you help us rank in a specific Houston suburb?", a: "Yes. We build out your Google Business Profile at your real address and add pages for the suburbs your clients come from, like Katy, Sugar Land or The Woodlands. We can't promise a ranking, and nobody honest can." },
      { q: "Do you market in Spanish for Houston practices?", a: "Yes. About 30% of Houston-area residents speak Spanish at home, according to the Census Bureau. If your team can book in Spanish, we write Spanish pages and ads to match." },
      { q: "What does med spa marketing cost in Houston?", a: "The same as anywhere else we work. Prices are published on this page and on our pricing page, and every plan is month-to-month. Ad spend goes straight to Google or Meta." },
      { q: "Do Texas rules limit what we can say in ads?", a: "They shape it. The Texas Medical Board treats cosmetic injections and prescription devices as medicine, and Google and Meta have their own health ad policies. We write copy that names who performs each treatment and never promises results." },
    ],
    sources: [SRC_CENSUS_METRO, SRC_ACS_LANGUAGE, SRC_ACS_INCOME],
  },
  {
    slug: "dallas",
    path: "/med-spa-marketing-dallas-tx",
    city: "Dallas",
    metroName: "Dallas-Fort Worth-Arlington",
    metaTitle: "Med Spa Marketing in Dallas, TX",
    metaDescription:
      "Med spa marketing for Dallas-Fort Worth practices: website, Google, social and ads, run remotely from Harlingen, Texas. Published prices and month-to-month plans.",
    keywordCluster: [
      "med spa marketing dallas",
      "medspa marketing dallas tx",
      "med spa seo dallas",
      "med spa marketing dfw",
      "aesthetic practice marketing dallas",
    ],
    h1: "Med Spa Marketing for Dallas-Fort Worth Practices",
    heroSub:
      "DFW has added more people since 2020 than any other metro in the country. We help Dallas-area med spas get found by those newcomers, with websites, Google, social and ads run from Harlingen, Texas.",
    marketHeading: "Most of DFW's New Clients Live North of Dallas",
    market: [
      "The Dallas-Fort Worth-Arlington metro reached 8,344,032 people in July 2024, the fourth-largest metro in the U.S. From April 2020 to July 2024 it added 705,774 residents. No other metro added more.",
      "Dallas County itself grew 1.7% in that time. Collin and Denton counties grew 17.7% and 15.3%, and together they account for nearly half of the metro's growth. Frisco, McKinney, Plano and the Denton County suburbs filled up with people who left their old injector behind when they moved.",
      "A newcomer picks a provider the way you'd expect: a search, a look at the map, a scroll through reviews and photos. If your profile and treatment pages answer their questions, you get the consult. If they don't, the next pin on the map does.",
    ],
    stats: [
      { value: "8.3M", label: "people in the Dallas-Fort Worth metro, July 2024" },
      { value: "705,774", label: "people added from 2020 to 2024, the most of any U.S. metro" },
      { value: "4", label: "counties in the metro with more than one million people" },
      { value: "$92,733", label: "median household income in the metro, 2024" },
    ],
    landscapeHeading: "Dallas and Fort Worth Search Differently",
    landscape: [
      "Four counties in the metro top a million people each: Dallas, Tarrant, Collin and Denton. Clients rarely cross the whole Metroplex for Botox, so a Fort Worth practice and a Frisco practice compete with two different sets of neighbors.",
      "There's no official count of DFW med spas, because Texas has no med spa registration. We look at the map results from your address for your top treatments and show you the gaps: reviews, photos, categories and pages. We won't name or put down another practice on your site.",
    ],
    playbookHeading: "What We'd Do First for a DFW Practice",
    playbook: [
      { icon: "map-pin", title: "Pick your side of the Metroplex", text: "We focus your Google profile and pages on the cities around your address, whether that's Southlake, Plano or Uptown, instead of spreading thin across all of DFW." },
      { icon: "shield", title: "Win the newcomer search", text: "Reviews, real photos and a clear first-visit page, so someone who just moved to Collin County picks you over the next pin." },
      { icon: "chat", title: "Follow-up before they shop around", text: "Every form and missed call gets an automatic text back, so a new resident hears from you before they call the next practice on the list." },
    ],
    remoteIntro:
      "We work from Harlingen, Texas. There's no DFW office, and you won't need one: we run your account over video calls, one shared inbox and a monthly check-in.",
    remoteSteps: [
      { title: "Start with a video call", text: "Fifteen minutes on your treatments, your current agency and which side of the Metroplex your clients come from." },
      { title: "Onboarding with Kelsey", text: "One video kickoff. You share logins and photos; we take it from there." },
      { title: "Live in 8 to 10 days", text: "A new site built around your Book button, hosted and maintained by us, with a first-visit page for newcomers." },
      { title: "Check in once a month", text: "A short call and a report on new inquiries, calls and booked consults, so you see what newcomers do." },
    ],
    rulesNote:
      "In DFW, where newcomers compare a lot of practices, a clear provider page with real credentials does double duty: it follows the rules and it earns trust.",
    shootNote:
      "Full Service Social's monthly on-site shoot covers practices near us in South Texas. For DFW, your team films on a phone and we turn the clips into edited, captioned posts.",
    faqs: [
      { q: "Do you have an office in Dallas?", a: "No. We're a Harlingen, Texas agency that works with practices across the country. DFW clients work with us over video calls, email and text." },
      { q: "Should a Fort Worth practice market to all of DFW?", a: "Usually not. Clients choose an injector close to home or work, so we build your Google presence around the cities near your address first and widen it once those pages rank." },
      { q: "How do new residents find a med spa in Dallas?", a: "Most start with a Google search and the map. Reviews, photos, accurate categories and a treatment page that answers their questions decide who gets the call." },
      { q: "What does it cost to work with you from Dallas?", a: "The same published prices we list for every practice, shown on this page and our pricing page. Every plan is month-to-month, and ad spend is billed by Google or Meta directly." },
      { q: "Do you know Texas med spa rules?", a: "We follow the Texas Medical Board's public guidance when we write your pages and ads. That means naming who performs each treatment and never promising results. Your attorney and medical director make the legal calls." },
    ],
    sources: [SRC_CENSUS_METRO, SRC_ACS_INCOME],
  },
  {
    slug: "san-antonio",
    path: "/med-spa-marketing-san-antonio-tx",
    city: "San Antonio",
    metroName: "San Antonio-New Braunfels",
    metaTitle: "Med Spa Marketing in San Antonio, TX",
    metaDescription:
      "Med spa marketing for San Antonio practices: bilingual websites, Google, social and ads, run from Harlingen, Texas. Published prices and month-to-month plans.",
    keywordCluster: [
      "med spa marketing san antonio",
      "medspa marketing san antonio tx",
      "med spa seo san antonio",
      "aesthetic practice marketing san antonio",
      "med spa advertising san antonio",
    ],
    h1: "Med Spa Marketing for San Antonio Practices",
    heroSub:
      "Nearly three in ten San Antonio-area residents speak Spanish at home, and the I-35 corridor toward New Braunfels keeps growing. We build bilingual marketing for San Antonio med spas from Harlingen, Texas.",
    marketHeading: "A Bilingual Market With a Growing North Edge",
    market: [
      "The San Antonio-New Braunfels metro had 2,763,006 people in July 2024, up 204,619 since April 2020. Bexar County holds about 2.1 million of them.",
      "The fastest growth sits up I-35. Comal County, home to New Braunfels, grew 24.9% in four years, and Guadalupe County grew 13%. A practice near Stone Oak or Schertz now draws from neighborhoods that barely existed when it opened.",
      "Language matters here more than in most Texas metros. The Census Bureau's 2024 survey found 29.6% of residents 5 and older speak Spanish at home. A Spanish treatment page and a Spanish ad set give those clients a reason to call you first.",
    ],
    stats: [
      { value: "2.76M", label: "people in the San Antonio metro, July 2024" },
      { value: "29.6%", label: "of residents 5 and older speak Spanish at home" },
      { value: "24.9%", label: "growth in Comal County (New Braunfels), 2020 to 2024" },
      { value: "$78,112", label: "median household income in the metro, 2024" },
    ],
    landscapeHeading: "Price Clarity Wins in San Antonio",
    landscape: [
      "The metro's median household income of $78,112 sits below the U.S. median of $81,604 (Census, 2024). Clients here compare prices before they book. Memberships, packages and posted starting prices give them a reason to stay with you.",
      "Texas has no med spa registration, so nobody keeps an official count of San Antonio med spas. We check the map results for your top treatments from your address, show you what the profiles above yours have, and build from there. We don't name or criticize other practices on your site.",
    ],
    playbookHeading: "What We'd Do First for a San Antonio Practice",
    playbook: [
      { icon: "chat", title: "English and Spanish from day one", text: "We write your key treatment pages, Google posts and ads in both languages, and your follow-up texts go out in the language the client used." },
      { icon: "calendar", title: "Memberships up front", text: "If you sell memberships or packages, we put them on your treatment pages and in your follow-up, so price-conscious clients see a plan instead of a single high ticket." },
      { icon: "map-pin", title: "Reach up the I-35 corridor", text: "Pages and ad targeting for New Braunfels, Schertz and the north side, if those clients can reach you in a reasonable drive." },
    ],
    remoteIntro:
      "We're based in Harlingen, Texas, a few hours down the road, with no San Antonio office. We run your account remotely over video calls, one inbox and a monthly check-in.",
    remoteSteps: [
      { title: "Book a short video call", text: "Fifteen minutes in English or Spanish on your treatments, memberships and who you pay now." },
      { title: "Kickoff over video", text: "Kelsey walks you through onboarding. We collect logins, photos and your membership details." },
      { title: "A bilingual site in 8 to 10 days", text: "English and Spanish treatment pages, built, hosted and maintained by us." },
      { title: "Monthly results call", text: "One call a month and a report on calls, forms and booked consults in both languages." },
    ],
    rulesNote:
      "Our Spanish copy follows the same rules as the English: who performs the treatment, by credential, with no promised results in either language.",
    shootNote:
      "Full Service Social includes a monthly on-site shoot for practices near us in South Texas. Ask on your call whether a shoot day works for your location. If not, your team films and we edit, caption and post.",
    faqs: [
      { q: "Do you have an office in San Antonio?", a: "No. We work from Harlingen, Texas, and run San Antonio accounts remotely by video call, email and text." },
      { q: "Do you write Spanish marketing for San Antonio med spas?", a: "Yes. Both founders work in a bilingual market every day. We write Spanish treatment pages, Google posts and ads, and set up follow-up texts in Spanish for clients who write in Spanish." },
      { q: "Can you help us reach New Braunfels clients?", a: "Yes, if they can reach you. Comal County grew almost 25% from 2020 to 2024. We add pages and ad targeting for the north side and the I-35 corridor when it makes sense for your location." },
      { q: "What does med spa marketing cost in San Antonio?", a: "Our prices are published on this page and on our pricing page, the same for every practice. Every plan is month-to-month, and Google or Meta bill your ad spend directly." },
      { q: "What Texas rules affect med spa marketing?", a: "The Texas Medical Board treats cosmetic injections and prescription devices as medicine that a physician delegates and supervises, and it has separate rules for IV hydration. We write copy that matches, names who performs each treatment and never promises results." },
    ],
    sources: [SRC_CENSUS_METRO, SRC_ACS_LANGUAGE, SRC_ACS_INCOME],
  },
  {
    slug: "austin",
    path: "/med-spa-marketing-austin-tx",
    city: "Austin",
    metroName: "Austin-Round Rock-San Marcos",
    metaTitle: "Med Spa Marketing in Austin, TX",
    metaDescription:
      "Med spa marketing for Austin practices: website, Google, AI search, social and ads, run remotely from Harlingen, Texas. Published prices, month-to-month.",
    keywordCluster: [
      "med spa marketing austin",
      "medspa marketing austin tx",
      "med spa seo austin",
      "aesthetic practice marketing austin",
      "med spa advertising austin",
    ],
    h1: "Med Spa Marketing for Austin Practices",
    heroSub:
      "Austin has grown faster since 2020 than any other U.S. metro over a million people, with the highest household income of Texas's four largest metros. We help Austin med spas get chosen, from Harlingen, Texas.",
    marketHeading: "Austin's Growth Moved to Williamson and Hays",
    market: [
      "The Austin-Round Rock-San Marcos metro grew 11.7% from April 2020 to July 2024, reaching 2,550,637 people. Among U.S. metros with more than a million residents, none grew faster.",
      "Most of that growth landed outside Travis County. Williamson County added 118,423 people, more than Travis did, and Hays County grew 21.1%. Round Rock, Georgetown, Kyle and San Marcos now hold a big share of the clients an Austin practice can reach.",
      "Median household income in the metro hit $99,897 in 2024, the highest of the four big Texas metros. Clients with that budget research before they book, and some ask ChatGPT or Google's AI answers for a recommendation before they open the map.",
    ],
    stats: [
      { value: "2.55M", label: "people in the Austin metro, July 2024" },
      { value: "11.7%", label: "growth from 2020 to 2024, fastest of any U.S. metro over 1M" },
      { value: "118,423", label: "people added in Williamson County, more than Travis County" },
      { value: "$99,897", label: "median household income in the metro, 2024" },
    ],
    landscapeHeading: "Researchers Book Here",
    landscape: [
      "An Austin client might read your treatment page, your reviews, your injector's bio and a Reddit thread before they call. Thin pages lose that client. Pages that explain the treatment, the provider's credential and what a first visit looks like keep them.",
      "Texas has no med spa registration, so no agency can give you an honest official count of Austin med spas. We pull the map and AI answer results for your top treatments from your address, and show you where you're missing. We never name or knock another practice on your site.",
    ],
    playbookHeading: "What We'd Do First for an Austin Practice",
    playbook: [
      { icon: "search", title: "Show up in AI answers", text: "Clear treatment pages, provider bios and FAQ markup that AI assistants can read and cite when someone asks for a med spa near them." },
      { icon: "map-pin", title: "Follow the suburbs", text: "Pages and Google profile work for Round Rock, Georgetown, Cedar Park or Kyle, whichever your clients drive in from." },
      { icon: "shield", title: "Proof before the call", text: "Injector bios with credentials, real photos of your space and a steady flow of reviews, so a careful researcher picks you." },
    ],
    remoteIntro:
      "We're an agency in Harlingen, Texas, with no Austin office. Austin practices work with us over video calls, one shared inbox and a monthly check-in.",
    remoteSteps: [
      { title: "Fifteen minutes on video", text: "Walk us through your treatments, your providers and the suburbs you want to reach, from Cedar Park to Kyle." },
      { title: "Remote kickoff", text: "Kelsey runs onboarding over video. We gather logins, provider bios and photos of your space." },
      { title: "Live in 8 to 10 days", text: "A site with full treatment pages and provider bios that both people and AI assistants can read." },
      { title: "Monthly review", text: "One call and a report on calls, forms, booked consults and Google search visibility." },
    ],
    rulesNote:
      "Austin clients read the fine print. Pages that name the provider's credential and explain who supervises answer the questions a careful researcher asks first.",
    shootNote:
      "The monthly on-site shoot in Full Service Social is for practices near us in South Texas. In Austin, your team films on a phone and we edit, caption and post.",
    faqs: [
      { q: "Do you have an office in Austin?", a: "No. We're based in Harlingen, Texas, and work with Austin practices remotely by video call, email and text." },
      { q: "Can you get our med spa recommended by ChatGPT or Google AI?", a: "Nobody can guarantee it. We can make it easier for AI assistants to understand and cite you: clear treatment pages, provider bios, FAQ schema and a consistent business profile across the web." },
      { q: "Should we target Round Rock and Georgetown too?", a: "If those clients can reach you, yes. Williamson County added more people than Travis County from 2020 to 2024. We add pages and ad targeting for the suburbs your clients actually come from." },
      { q: "What does med spa marketing cost in Austin?", a: "Our prices are published on this page and on our pricing page, and they're the same for every practice. Every plan is month-to-month. Google or Meta bill ad spend to you directly." },
      { q: "How do Texas rules affect our website copy?", a: "The Texas Medical Board treats cosmetic injections and prescription devices as medicine that a physician delegates. Your pages should say who performs each treatment and avoid promising results. We write them that way, and you approve them before they go live." },
    ],
    sources: [SRC_CENSUS_METRO, SRC_ACS_INCOME],
  },
];

export function texasCity(slug: TexasCity["slug"]): TexasCity {
  const c = TEXAS_CITIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown Texas city: ${slug}`);
  return c;
}
