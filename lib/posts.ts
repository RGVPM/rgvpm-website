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
    slug: "digital-marketing-harlingen-tx-guide",
    title: "Digital Marketing in Harlingen, TX: A Local Business Owner's Guide (2026)",
    metaTitle: "Digital Marketing in Harlingen, TX: 2026 Local Guide",
    description:
      "What digital marketing in Harlingen, TX actually involves, what it costs, and how local businesses use SEO, websites, and ads to get found across the Rio Grande Valley.",
    excerpt:
      "A plain-English guide to digital marketing for Harlingen and Rio Grande Valley businesses — what it includes, what it costs, and how to choose an agency that drives real leads.",
    category: "Digital Marketing",
    icon: "chart",
    datePublished: "2026-06-24",
    dateModified: "2026-06-24",
    readMinutes: 9,
    tldr:
      "Digital marketing in Harlingen, TX is the mix of channels a local business uses to get found online and turn searches into customers — primarily a fast website, local SEO, an optimized Google Business Profile, and paid ads. For most Harlingen and Rio Grande Valley businesses, a managed program runs roughly $399–$1,999/mo plus ad spend, and the right approach is local-first and bilingual (English and Spanish).",
    sections: [
      { type: "p", text: "If you run a business in Harlingen, your next customer is almost certainly looking for you on Google first. They search \"near me,\" they check your reviews, they glance at your website on their phone — and in a few seconds they decide whether to call you or the competitor down the road. Digital marketing is simply the work of winning that moment. This guide breaks down what it actually involves in the Harlingen and Rio Grande Valley market, what it costs, and how to pick a partner who delivers leads instead of vanity metrics." },
      { type: "h2", text: "What does digital marketing in Harlingen actually include?" },
      { type: "p", text: "\"Digital marketing\" is an umbrella term. For a local Harlingen business, the pieces that actually move the needle are:" },
      { type: "ul", items: [
        "A fast, mobile-first website built to rank on Google and convert visitors into leads — the foundation everything else points to.",
        "Local SEO so you show up when people in Harlingen and across the RGV search for what you do.",
        "Google Business Profile optimization to win the map pack and the calls that come with it.",
        "Paid advertising (Google and Facebook/Instagram ads) to generate leads immediately while SEO builds.",
        "Lead management — capturing every inquiry and following up fast, so the leads you earn don't slip away.",
        "Reviews, reputation, and consistent content to build the trust that turns searchers into customers.",
      ]},
      { type: "p", text: "You don't need all of it on day one. The smartest Harlingen marketing strategy starts with the foundation — website and Google Business Profile — then layers on local SEO and ads as you grow." },
      { type: "h2", text: "Why local matters more than ever in the Rio Grande Valley" },
      { type: "p", text: "The Rio Grande Valley is its own market, and marketing that ignores that fails here. Customers in Harlingen, McAllen, Brownsville, and the surrounding cities search with local intent — \"marketing near me,\" \"web design near me,\" \"seo near me\" — and Google answers them with local results, not national brands. That's good news for a local business: you're not competing with the whole internet, just the handful of businesses in your city." },
      { type: "p", text: "It's also a bilingual market. A huge share of RGV customers search and buy in Spanish, yet most competitors only optimize for English. Marketing in both English and Spanish is one of the easiest ways for a Harlingen business to reach customers others are leaving on the table." },
      { type: "h2", text: "How much does digital marketing cost in Harlingen?" },
      { type: "p", text: "Pricing varies, and a lot of agencies hide it. For a local Harlingen or RGV business, a managed digital marketing program typically runs between $399 and $1,999 per month, depending on how many channels you're running and how hands-on the management is. Website design is usually quoted separately based on scope. Paid ad spend (what you pay Google or Meta) is its own budget on top of management — most local businesses start in the $1,000–$3,000/mo range there." },
      { type: "p", text: "At RGV Performance Marketing, plans are transparent and month-to-month — $399/mo to plant your flag online, up to $1,999/mo to fully own your local market — with no long-term contracts. You can see the full breakdown on our pricing page." },
      { type: "h2", text: "Local SEO: getting found in Harlingen and across the RGV" },
      { type: "p", text: "Local SEO is the work of ranking in local search results and Google's map pack — the three businesses shown on the map at the top of local searches. It's driven by your Google Business Profile, online reviews, consistent business information across the web, and location-specific content on your site." },
      { type: "p", text: "It compounds: most businesses see early movement in 30–60 days and stronger rankings over 90–180 days. And it's not just Harlingen — the same playbook wins searches like \"brownsville seo,\" \"local seo brownsville,\" and \"harlingen seo,\" which is why a Valley-wide local SEO strategy beats a single-city effort. The businesses that rank in the map pack capture the calls; everyone else gets scrolled past." },
      { type: "h2", text: "Websites that win the click (and rank)" },
      { type: "p", text: "Searches like \"website builder harlingen,\" \"website designer rgv,\" and \"rgv web design\" all point to the same need: a site that loads fast, works flawlessly on mobile, and is built to rank — not just to look pretty. A slow or outdated website quietly costs you leads every day, because visitors bounce and Google ranks you lower." },
      { type: "p", text: "A good local business website has on-page SEO baked in from day one, clear calls to action, lead-capture forms that actually connect to a follow-up system, and a bilingual option for the RGV market. Done right, your website becomes the hub that your SEO, ads, and Google profile all funnel customers into." },
      { type: "h2", text: "Paid ads: leads now while SEO compounds" },
      { type: "p", text: "SEO is a long game; paid ads are the fast lane. Google Ads put you at the top of the page the moment someone searches — for queries like \"adwords management weslaco\" or \"google ads management rgv\" — while Facebook and Instagram ads build demand before customers even search. Many Harlingen businesses run both: ads to generate leads this week, SEO to lower their cost per lead over time." },
      { type: "p", text: "The key is management. Ad budgets get wasted fast without tight targeting, good ad copy, conversion tracking, and someone watching the numbers. The goal isn't clicks — it's calls, form fills, and booked appointments at a cost that makes sense for your business." },
      { type: "h2", text: "How to choose a marketing agency in Harlingen" },
      { type: "p", text: "If you're searching \"marketing agency harlingen\" or \"rgv ad agency,\" here's what actually matters when you're comparing options:" },
      { type: "ul", items: [
        "They report on leads, calls, and booked appointments — not impressions and likes.",
        "Their pricing is transparent and the terms are month-to-month, so they earn your business every month.",
        "They know the local market and can market in both English and Spanish.",
        "They show you a clear plan and honest timelines instead of guaranteeing an overnight #1 ranking.",
        "They build your website and assets as something you own, not something you rent forever.",
      ]},
      { type: "p", text: "Local knowledge is the differentiator. A Harlingen-based team understands the RGV market, the competition, and the customers in a way an out-of-town agency simply can't." },
      { type: "h2", text: "Getting started" },
      { type: "p", text: "You don't have to do everything at once. Start with the foundation — make sure your Google Business Profile is claimed and optimized and your website is fast and mobile-friendly — then add local SEO and ads as you grow. If you'd rather have it handled for you, that's exactly what we do for local businesses across the Valley. Book a free call and we'll show you where you're losing leads and the fastest path to more customers." },
    ],
    faqs: [
      { q: "How much does digital marketing cost in Harlingen, TX?", a: "For a local Harlingen business, a managed digital marketing program typically runs between $399 and $1,999 per month depending on the channels and level of management, with website design quoted separately and paid ad spend (usually $1,000–$3,000/mo) billed by the ad platforms on top. Be cautious of agencies that won't share pricing — transparent, month-to-month plans are a good sign." },
      { q: "What is the best digital marketing agency in the Rio Grande Valley?", a: "The best agency for an RGV business is one that's locally based, reports on real leads instead of vanity metrics, prices transparently with no long-term contracts, and can market in both English and Spanish. RGV Performance Marketing is a Harlingen-based, AI-powered agency built specifically for local businesses across the Rio Grande Valley, with transparent month-to-month plans." },
      { q: "How long does SEO take to work in Harlingen?", a: "Most Harlingen businesses see early local SEO movement — Google Business Profile gains and long-tail rankings — within 30 to 60 days, with stronger map-pack and city-level rankings building over 90 to 180 days. SEO compounds over time, while paid ads can generate leads within the first week if you need results faster." },
      { q: "Do I need a new website or just marketing?", a: "It depends on your current site. If it's slow, outdated, hard to use on a phone, or not built for SEO, a new website is usually the highest-leverage first step because everything else — SEO, ads, your Google profile — funnels traffic into it. If your site is already fast and modern, you may just need marketing to drive traffic to it. A quick audit will tell you which camp you're in." },
      { q: "Do you offer marketing in Spanish?", a: "Yes. We create websites, content, and ads in English and Spanish, which is a major advantage in the Rio Grande Valley. Many customers search and buy in Spanish, and most competitors only optimize for English — so bilingual marketing reaches a market others overlook." },
      { q: "Do you serve Brownsville, McAllen, and the rest of the Valley?", a: "Yes. While we're based in Harlingen, we serve businesses across the Rio Grande Valley — including McAllen, Brownsville, Edinburg, Mission, Weslaco, San Benito, and Pharr — with local SEO, web design, Google Business Profile, and paid advertising tailored to each city." },
    ],
    related: [
      { href: "/services", label: "Our Digital Marketing Services" },
      { href: "/pricing", label: "See Plans & Pricing" },
      { href: "/local-seo-harlingen-tx", label: "Local SEO in Harlingen" },
      { href: "/website-design-harlingen-tx", label: "Website Design in Harlingen" },
    ],
  },
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
