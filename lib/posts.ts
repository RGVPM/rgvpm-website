import type { IconName } from "@/components/Icon";

export interface PostSection {
  type: "h2" | "h3" | "p" | "ul";
  text?: string;
  items?: string[];
}

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  category: string;
  icon: IconName;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  readMinutes: number;
  /** One- or two-sentence direct answer up top — optimized for AI citation. */
  tldr: string;
  sections: PostSection[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
}

export const POSTS: Post[] = [
  {
    slug: "how-much-does-a-website-cost-rio-grande-valley",
    title: "How Much Does a Website Cost in the Rio Grande Valley? (2026 Guide)",
    metaTitle: "How Much Does a Website Cost in the Rio Grande Valley? (2026)",
    description:
      "A clear, honest breakdown of what a small-business website costs in McAllen, Harlingen, Brownsville, and across the RGV in 2026 — and what actually drives the price.",
    excerpt:
      "Most RGV small-business websites land between $1,500 and $6,000 to build, plus a small monthly cost to host and maintain. Here's exactly what you're paying for — and what to avoid.",
    category: "Website Design",
    icon: "target",
    datePublished: "2026-06-21",
    dateModified: "2026-06-21",
    readMinutes: 7,
    tldr:
      "In the Rio Grande Valley, a professional small-business website typically costs between $1,500 and $6,000 as a one-time build, depending on the number of pages and features. Simple brochure sites sit at the low end; sites with custom design, many pages, bilingual content, or booking and e-commerce features sit higher. Expect a small ongoing cost (roughly $20–$300/mo) for hosting, maintenance, and updates.",
    sections: [
      { type: "p", text: "If you run a business in McAllen, Harlingen, Brownsville, or anywhere across the Valley and you've started pricing out a website, you've probably gotten quotes that range from \"a few hundred dollars\" to \"over ten thousand.\" That spread is confusing — and it's not an accident. \"Website\" can mean a one-page template or a custom, SEO-built lead machine. This guide breaks down what each price tier actually gets you so you can spend wisely." },
      { type: "h2", text: "What does a small-business website cost in the RGV?" },
      { type: "p", text: "Here are the realistic 2026 price tiers for the Rio Grande Valley market. These are one-time build costs unless noted:" },
      { type: "ul", items: [
        "DIY website builders (Wix, Squarespace, GoDaddy): $0–$500 up front plus $15–$50/mo. You build it yourself — cheapest in dollars, most expensive in time, and rarely built to rank.",
        "Freelancer or template site: $500–$2,000. A working site, often on a template. Quality and follow-through vary widely.",
        "Professional small-business site: $1,500–$6,000. Custom or semi-custom design, multiple pages, on-page SEO, mobile-first build, and lead capture. This is where most serious local businesses land.",
        "Advanced / feature-rich site: $6,000–$15,000+. E-commerce, booking systems, custom functionality, large page counts, or fully bilingual builds.",
      ]},
      { type: "h2", text: "What actually drives the price?" },
      { type: "p", text: "Two websites can both be \"5 pages\" and cost wildly different amounts. The real cost drivers are:" },
      { type: "ul", items: [
        "Custom design vs. template — a brand-specific design costs more than a recycled theme, but builds more trust.",
        "Number of pages and amount of content — more pages and professionally written copy add time.",
        "SEO foundation — sites built to rank (proper structure, schema, speed) take more skill than sites built to just exist.",
        "Bilingual (English + Spanish) — a real advantage in the Valley, and roughly 1.5–2x the content work.",
        "Features — booking, payments, e-commerce, integrations, and lead automation each add scope.",
        "Who builds it — a solo freelancer, an agency, or a DIY tool each carry different price and reliability.",
      ]},
      { type: "h2", text: "Why is the cheapest option usually the most expensive?" },
      { type: "p", text: "A $300 template site that doesn't rank, loads slowly, or doesn't convert visitors into calls isn't cheap — it's a cost with no return. The goal of a business website isn't to exist; it's to bring in customers. A well-built site that ranks locally and converts pays for itself many times over, while a bargain site quietly costs you the leads you never knew you missed." },
      { type: "h2", text: "Should you pay monthly or one-time?" },
      { type: "p", text: "Both models exist. A one-time build means you pay for the site and own it. A monthly model bundles the build with hosting, maintenance, and ongoing changes. Neither is automatically better — what matters is clarity: know exactly what's included, whether you own the site, and what happens if you leave. At RGV Performance Marketing, website design is custom-quoted based on your actual scope, and active plan clients get ongoing update requests included." },
      { type: "h2", text: "What should an RGV business budget?" },
      { type: "p", text: "For most service-based local businesses in the Valley, a budget of $2,000–$5,000 for a professional, SEO-ready, mobile-first website is realistic and worth it — especially when paired with local SEO so the site actually gets found. The best move is to get a custom quote based on what your business genuinely needs, not a one-size-fits-all package price." },
    ],
    faqs: [
      { q: "How much does a website cost in McAllen or Harlingen, TX?", a: "Most professional small-business websites in the McAllen and Harlingen area cost between $1,500 and $6,000 to build, depending on the number of pages, custom design, bilingual content, and features like booking or e-commerce. Simple template sites can be cheaper, but they're rarely built to rank on Google or convert visitors into customers." },
      { q: "Is it cheaper to build my own website?", a: "Building it yourself with a tool like Wix or Squarespace is cheaper in dollars — often $15–$50/mo — but expensive in time, and DIY sites are rarely structured to rank locally or turn visitors into leads. For a business that relies on being found online, a professionally built site usually pays for itself in the leads it captures." },
      { q: "Does a more expensive website rank better on Google?", a: "Not automatically — price and rankings aren't the same thing. What matters is whether the site is built with a proper SEO foundation: fast load times, clean structure, schema markup, and location-targeted content. A mid-priced site built correctly will out-rank an expensive site built poorly." },
      { q: "Do I have to pay monthly for a website?", a: "It depends on the provider. Some charge a one-time build fee and you own the site; others bundle the build with hosting, maintenance, and updates for a monthly fee. Both are valid — just make sure you know what's included, whether you own the site, and what happens if you cancel." },
    ],
    related: [
      { href: "/services/website-design", label: "Website Design Services" },
      { href: "/pricing", label: "See Our Plans & Pricing" },
      { href: "/services/local-seo", label: "Local SEO Services" },
    ],
  },
  {
    slug: "how-to-rank-higher-google-maps-rio-grande-valley",
    title: "How to Rank Higher on Google Maps in the Rio Grande Valley",
    metaTitle: "How to Rank Higher on Google Maps in the RGV (2026)",
    description:
      "A practical guide to ranking in the Google map pack in McAllen, Harlingen, Brownsville, and across the RGV — what the ranking factors are and how to improve them.",
    excerpt:
      "Ranking in the Google map pack comes down to three things: relevance, distance, and prominence. Here's how RGV businesses can improve all three and win more local calls.",
    category: "Local SEO",
    icon: "map-pin",
    datePublished: "2026-06-21",
    dateModified: "2026-06-21",
    readMinutes: 8,
    tldr:
      "To rank higher on Google Maps in the Rio Grande Valley, optimize your Google Business Profile completely, earn a steady stream of genuine reviews, keep your name, address, and phone consistent everywhere online, and publish location-relevant content. Google ranks local results on relevance, distance, and prominence — and most of those you can actively improve.",
    sections: [
      { type: "p", text: "The \"map pack\" — the three businesses Google shows on a map at the top of local searches — captures most of the calls and clicks for \"near me\" and city-based searches. For an RGV service business, showing up there can matter more than ranking #1 in the regular blue links. Here's how Google decides who appears, and what you can do about it." },
      { type: "h2", text: "How does Google decide local map rankings?" },
      { type: "p", text: "Google has said local rankings come down to three factors:" },
      { type: "ul", items: [
        "Relevance — how well your business matches what the person searched for.",
        "Distance — how close you are to the searcher (or to the area they searched).",
        "Prominence — how well-known and trusted your business is, based on reviews, citations, and your overall web presence.",
      ]},
      { type: "p", text: "You can't move your business closer to every searcher, but you have a lot of control over relevance and prominence — and that's where the wins are." },
      { type: "h2", text: "Optimize your Google Business Profile completely" },
      { type: "p", text: "Your Google Business Profile (GBP) is the single biggest lever for map rankings. Claim it, verify it, and fill out every field: the correct primary category, additional categories, services, service areas, hours, photos, and a complete description. An incomplete profile is the most common reason a Valley business doesn't show up." },
      { type: "h2", text: "Earn reviews — consistently" },
      { type: "p", text: "Review count, quality, recency, and your responses are all prominence signals. A business with 80 recent, well-answered reviews will usually out-rank a competitor with 12 old ones. Put a simple system in place to ask every happy customer for a review, and respond to all of them — including the negative ones, professionally." },
      { type: "h2", text: "Keep your NAP consistent everywhere" },
      { type: "p", text: "Your Name, Address, and Phone number (NAP) should be identical across your website, GBP, Yelp, Facebook, and every directory. Inconsistencies — a different phone number here, an old address there — confuse Google and erode trust. Cleaning up citations is unglamorous but it directly supports your rankings." },
      { type: "h2", text: "Publish location-relevant content" },
      { type: "p", text: "Pages and posts that mention your city, neighborhoods, and the specific services you offer help Google connect you to local searches. A page about your service in McAllen, written for McAllen customers, is far stronger than a generic page that could be about anywhere." },
      { type: "h2", text: "Be patient — and track it" },
      { type: "p", text: "Local SEO compounds. You'll often see early movement within 30–60 days, with bigger gains building over 90–180 days. Track your map-pack position for your key searches so you can see what's working. Anyone promising an instant #1 is selling something risky." },
    ],
    faqs: [
      { q: "How long does it take to rank on Google Maps?", a: "Most businesses see early improvement in 30–60 days after optimizing their Google Business Profile, with more significant map-pack gains building over 90–180 days. Competitive cities like McAllen take longer than smaller markets. Local SEO compounds over time, so the gains continue as long as the work continues." },
      { q: "Why is my business not showing up on Google Maps?", a: "The most common reasons are an unclaimed or incomplete Google Business Profile, the wrong business category, inconsistent name/address/phone across the web, too few recent reviews, or being far from where people are searching. Completing your profile and fixing NAP consistency usually produces the fastest improvement." },
      { q: "Do reviews really affect Google Maps rankings?", a: "Yes. Review quantity, quality, how recent they are, and how you respond are all prominence signals Google uses to rank local businesses. Reviews also heavily influence whether a searcher chooses you over a competitor, so they affect both your ranking and your conversion rate." },
      { q: "Can I pay Google to rank higher in the map pack?", a: "No — the organic map pack can't be bought. You can run Local Services Ads or Google Ads that appear near the map, but those are clearly labeled ads and separate from the organic three-pack. Organic map rankings are earned through profile optimization, reviews, citations, and local relevance." },
    ],
    related: [
      { href: "/services/google-business-profile", label: "Google Business Profile Optimization" },
      { href: "/services/local-seo", label: "Local SEO Services" },
      { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
    ],
  },
  {
    slug: "local-seo-vs-regular-seo",
    title: "Local SEO vs. Regular SEO: What's the Difference?",
    metaTitle: "Local SEO vs. Regular SEO: What's the Difference? (2026)",
    description:
      "A plain-English explanation of local SEO versus regular SEO — what each one does, how they differ, and which one a Rio Grande Valley business actually needs.",
    excerpt:
      "Regular SEO helps you rank for broad searches anywhere. Local SEO helps you rank for searches tied to your city and the map pack. For a business that serves a local area, local SEO is what drives calls.",
    category: "Local SEO",
    icon: "search",
    datePublished: "2026-06-21",
    dateModified: "2026-06-21",
    readMinutes: 5,
    tldr:
      "Local SEO and regular (organic) SEO share the same goal — ranking on Google — but target different searches. Regular SEO focuses on broad, often national keywords. Local SEO focuses on location-based searches (\"plumber near me,\" \"dentist in McAllen\") and the Google map pack, leaning heavily on your Google Business Profile, reviews, and local citations. A business that serves customers in a specific area needs local SEO.",
    sections: [
      { type: "p", text: "If you've researched getting your business found on Google, you've seen both terms — \"SEO\" and \"local SEO\" — often used as if they're the same thing. They overlap, but they're not identical, and knowing the difference helps you spend your marketing budget where it actually moves the needle." },
      { type: "h2", text: "What is regular (organic) SEO?" },
      { type: "p", text: "Regular SEO is the practice of ranking a website for keyword searches, regardless of location. It focuses on content quality, site structure, page speed, backlinks, and topical authority. A national e-commerce brand or a blog uses regular SEO to compete for broad terms against the entire internet." },
      { type: "h2", text: "What is local SEO?" },
      { type: "p", text: "Local SEO focuses on ranking for searches tied to a place — your city, your neighborhood, and \"near me\" queries — plus the map pack, which regular SEO doesn't touch. It puts heavy weight on your Google Business Profile, online reviews, local citations (consistent NAP across directories), and location-specific content." },
      { type: "h2", text: "What are the key differences?" },
      { type: "ul", items: [
        "Intent: regular SEO targets broad keywords; local SEO targets location-based and 'near me' searches.",
        "The map pack: only local SEO competes for Google's local three-pack on the map.",
        "Google Business Profile: central to local SEO, irrelevant to most regular SEO.",
        "Reviews & citations: major local ranking factors; minor or nonexistent for regular SEO.",
        "Competition: local SEO competes with nearby businesses, not the entire web — usually an easier, higher-ROI fight for a local company.",
      ]},
      { type: "h2", text: "Which one does your business need?" },
      { type: "p", text: "If you serve customers in a specific area — a clinic in Harlingen, a contractor in Brownsville, a restaurant in McAllen — local SEO is what brings in calls and walk-ins. If you sell to people anywhere, regardless of location, regular SEO matters more. Many businesses benefit from both: local SEO to win their city now, and broader content SEO to build authority over time. The two reinforce each other." },
    ],
    faqs: [
      { q: "Is local SEO better than regular SEO?", a: "Neither is universally better — they serve different goals. For a business that serves customers in a specific city or area, local SEO drives more calls and customers because it targets 'near me' searches and the map pack. For a business selling nationally, regular SEO matters more. A local service business usually gets the highest ROI from local SEO first." },
      { q: "Do I need both local SEO and regular SEO?", a: "Often, yes. Local SEO wins you visibility in your city and the map pack now, while broader content SEO builds long-term authority that strengthens everything, including your local rankings. They reinforce each other, so many local businesses run both — starting with local SEO for the fastest, most direct return." },
      { q: "Does local SEO include my website?", a: "Yes. While local SEO leans heavily on your Google Business Profile, reviews, and citations, your website is still a core part of it — location-targeted pages, fast load times, mobile-friendliness, and proper schema all support your local rankings. A strong site and a strong profile work together." },
    ],
    related: [
      { href: "/services/local-seo", label: "Local SEO Services" },
      { href: "/services/website-design", label: "Website Design Services" },
      { href: "/local-seo-harlingen-tx", label: "Local SEO in Harlingen" },
    ],
  },
];

export const postSlugs = POSTS.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
