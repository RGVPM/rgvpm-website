import type { IconName } from "@/components/Icon";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  icon: IconName;
  /** Short label for nav, footer, related links. */
  shortName: string;
  /** Card title used on homepage + services hub. */
  cardTitle: string;
  cardText: string;
  cardFeatures: string[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywordCluster: string[];
  /** Page content */
  eyebrow: string;
  h1: string;
  heroSub: string;
  whatItIs: { heading: string; body: string[] };
  howWeDoIt: { heading: string; intro: string; steps: { title: string; text: string }[] };
  whoItsFor: { heading: string; intro: string; bullets: string[] };
  faqs: ServiceFAQ[];
  /** slugs of related services */
  related: string[];
}

export const services: Service[] = [
  {
    slug: "local-seo",
    icon: "search",
    shortName: "Local SEO",
    cardTitle: "Local SEO",
    cardText:
      "Rank higher in Google searches for your city and service area. We handle on-page optimization, content, and link building so you get found — and stay found.",
    cardFeatures: [
      "On-page SEO & keyword targeting",
      "Local content creation",
      "Citation building & link outreach",
    ],
    metaTitle: "Local SEO Services in the Rio Grande Valley",
    metaDescription:
      "Local SEO services that rank your business in your city and service area. On-page optimization, local content, and citation building from RGV Performance Marketing.",
    primaryKeyword: "local SEO services",
    keywordCluster: [
      "local SEO services",
      "local SEO company",
      "local search optimization",
      "local SEO Harlingen",
      "Rio Grande Valley SEO",
    ],
    eyebrow: "Local SEO",
    h1: "Local SEO That Gets You Found First",
    heroSub:
      "When someone nearby searches for what you offer, you want to be the first name they see. Our local SEO services put your business at the top of local search and keep it there.",
    whatItIs: {
      heading: "What is local SEO?",
      body: [
        "Local SEO is the practice of optimizing your website and online presence so your business ranks in local search results — the map pack, the \"near me\" searches, and the city-and-service queries your customers actually type. It's how a service business shows up before the competition when it matters most.",
        "As a local SEO company, we focus on the signals Google uses to rank local businesses: relevant on-page content, consistent business information across the web, genuine reviews, and authoritative links. Done right, local search optimization compounds — the traffic keeps growing long after the work is done.",
      ],
    },
    howWeDoIt: {
      heading: "How we do local SEO",
      intro:
        "No black-box promises. Every local SEO engagement follows the same disciplined process, and you see exactly what's moving each month.",
      steps: [
        {
          title: "Keyword & competitor research",
          text: "We map the searches your customers use and study who currently ranks for them — so we target terms you can realistically win and that actually drive booked work.",
        },
        {
          title: "On-page optimization",
          text: "Titles, headings, service pages, internal links, and schema markup get tuned around your priority keywords so Google understands exactly what you do and where you do it.",
        },
        {
          title: "Local content creation",
          text: "We publish location and service content that answers real customer questions, builds topical authority, and gives Google fresh reasons to rank you.",
        },
        {
          title: "Citations & link outreach",
          text: "We lock down NAP consistency across directories and earn links from relevant local sources to build the authority that moves rankings.",
        },
      ],
    },
    whoItsFor: {
      heading: "Who local SEO is for",
      intro:
        "Local SEO is the highest-leverage channel for any business that serves customers in a defined area. It's a fit if you:",
      bullets: [
        "Rely on customers finding you on Google before they ever call",
        "Serve a specific city, region, or set of neighborhoods",
        "Lose business to competitors who simply rank higher than you",
        "Want a marketing channel that compounds instead of stopping the day you stop paying for ads",
      ],
    },
    faqs: [
      {
        q: "How long does local SEO take to work?",
        a: "Local SEO typically takes 60 to 90 days to show meaningful traction and continues compounding from there. Google Business Profile and citation work can move within 30 days, while ranking for competitive keywords builds over several months. We give you honest timelines per keyword from day one and report progress every month.",
      },
      {
        q: "What's the difference between local SEO and regular SEO?",
        a: "Local SEO focuses on ranking for searches tied to a place — \"plumber in Harlingen\" or \"med spa near me\" — and on the Google map pack. Regular SEO targets broader, non-geographic terms. For a business that serves customers in a defined area, local search optimization is where nearly all the high-intent traffic lives.",
      },
      {
        q: "Do you guarantee first-page rankings?",
        a: "No reputable local SEO company can guarantee a specific ranking, because Google's algorithm isn't ours to control. What we guarantee is a disciplined process, honest reporting, and steady, measurable progress on the keywords that drive booked work for your business.",
      },
      {
        q: "Is website design included in local SEO?",
        a: "Website design is a separate service on all of our plans. We optimize the site you have, and if you need a new or rebuilt site, we'll quote that separately so your plan pricing stays clean and predictable.",
      },
      {
        q: "Can you do local SEO in both English and Spanish?",
        a: "Yes. Bilingual content is available on every plan, which is a real advantage in the Rio Grande Valley and other bilingual markets. Ranking for Spanish-language searches often means far less competition and a customer base your competitors are ignoring.",
      },
    ],
    related: ["google-business-profile", "paid-advertising", "social-media-newsletter"],
  },
  {
    slug: "google-business-profile",
    icon: "map-pin",
    shortName: "Google Business Profile",
    cardTitle: "Google Business Profile & Local Visibility",
    cardText:
      "Get found when customers nearby search for what you offer. We optimize your Google presence and lock down NAP consistency across all directories.",
    cardFeatures: [
      "GBP setup & full optimization",
      "NAP audit & citation consistency",
      "Review generation automation",
    ],
    metaTitle: "Google Business Profile Optimization & Local Visibility",
    metaDescription:
      "Google Business Profile setup, optimization, and review generation. Lock down NAP consistency and win the map pack with RGV Performance Marketing.",
    primaryKeyword: "Google Business Profile optimization",
    keywordCluster: [
      "Google Business Profile optimization",
      "Google Business Profile management",
      "local map pack ranking",
      "GBP optimization service",
      "NAP consistency",
    ],
    eyebrow: "Google Business Profile",
    h1: "Own the Map Pack in Your City",
    heroSub:
      "Your Google Business Profile is the first thing customers see when they search nearby. We optimize it end to end so you show up in the map pack, earn more reviews, and turn searches into calls.",
    whatItIs: {
      heading: "What is Google Business Profile optimization?",
      body: [
        "Your Google Business Profile is the listing that appears in Google Maps and the local \"map pack\" — the three businesses Google features above the regular results. For local service businesses, this single listing often drives more calls and direction requests than the website itself.",
        "Google Business Profile optimization means filling out every field correctly, choosing the right categories, posting regularly, generating a steady flow of reviews, and keeping your name, address, and phone number perfectly consistent everywhere they appear online. These are the signals that decide who wins the map pack.",
      ],
    },
    howWeDoIt: {
      heading: "How we optimize your profile",
      intro:
        "We treat your profile as a living asset, not a set-it-and-forget-it listing. Here's the process:",
      steps: [
        {
          title: "Full profile setup & optimization",
          text: "We complete and optimize every section — categories, services, attributes, hours, photos, and description — so Google has every reason to rank you and customers have every reason to choose you.",
        },
        {
          title: "NAP audit & citation cleanup",
          text: "We audit your name, address, and phone number across the web and fix inconsistencies that quietly suppress your ranking and confuse customers.",
        },
        {
          title: "Review generation automation",
          text: "We set up automated review requests so happy customers leave reviews consistently — the single strongest lever for both ranking and trust.",
        },
        {
          title: "Ongoing posts & monitoring",
          text: "We keep the profile active with posts and updates and watch for ranking changes, suspensions, and competitor moves so nothing slips.",
        },
      ],
    },
    whoItsFor: {
      heading: "Who this is for",
      intro: "Google Business Profile optimization is essential if you:",
      bullets: [
        "Serve customers in a specific local area",
        "Get most of your business from phone calls or walk-ins",
        "Are being outranked in the map pack by competitors with more reviews",
        "Have inconsistent business info scattered across old directory listings",
      ],
    },
    faqs: [
      {
        q: "What is the Google map pack?",
        a: "The map pack is the block of three local businesses Google shows above the regular search results, alongside a map. Ranking here puts you in front of customers at the exact moment they're searching nearby, and it often drives more calls and visits than any other channel for a local business.",
      },
      {
        q: "How do I get more Google reviews?",
        a: "The reliable way is to ask every happy customer right after the job, through an automated text or email that links straight to your review form. We set this up so requests go out consistently without you having to remember. Steady, genuine reviews are the strongest signal for both map-pack ranking and customer trust.",
      },
      {
        q: "Why does NAP consistency matter?",
        a: "NAP stands for Name, Address, and Phone number. When these differ across directories — an old suite number, a former phone line — Google loses confidence in which information is correct, and your ranking suffers. We audit and standardize your NAP everywhere it appears so the signals all point the same direction.",
      },
      {
        q: "Can you fix a suspended or duplicate listing?",
        a: "In most cases, yes. We handle reinstatement requests for suspended profiles and merge or remove duplicate listings that split your reviews and dilute your ranking. We'll assess your situation honestly and tell you what's realistic before we start.",
      },
      {
        q: "Is Google Business Profile optimization a one-time job?",
        a: "Initial optimization is a one-time setup, but profiles perform best with ongoing attention — fresh posts, new photos, a steady review flow, and monitoring for changes. That's why it's built into our monthly plans rather than sold as a single project.",
      },
    ],
    related: ["local-seo", "lead-management", "paid-advertising"],
  },
  {
    slug: "paid-advertising",
    icon: "megaphone",
    shortName: "Paid Advertising",
    cardTitle: "Paid Advertising",
    cardText:
      "Google and Meta campaigns built for ROI — not just impressions. We track every lead and optimize constantly.",
    cardFeatures: [
      "Google Search & Display Ads",
      "Facebook & Instagram Ads",
      "Retargeting campaigns",
    ],
    metaTitle: "Paid Advertising: Google & Meta Ads Management",
    metaDescription:
      "ROI-focused Google and Facebook ads management for local businesses. We build, track, and optimize campaigns around leads — not vanity metrics.",
    primaryKeyword: "paid advertising management",
    keywordCluster: [
      "paid advertising management",
      "Google Ads management",
      "Facebook ads management",
      "PPC management",
      "local business advertising",
    ],
    eyebrow: "Paid Advertising",
    h1: "Ads Built for Leads, Not Impressions",
    heroSub:
      "We build Google and Meta campaigns engineered around one thing: leads you can book. Every dollar is tracked, every campaign is optimized, and you always know what your spend is producing.",
    whatItIs: {
      heading: "What is paid advertising management?",
      body: [
        "Paid advertising management is the build, tracking, and ongoing optimization of your ad campaigns on platforms like Google Search, Google Display, Facebook, and Instagram. It's how you put your business in front of high-intent customers immediately — without waiting for SEO to compound.",
        "The difference between ads that drain a budget and ads that print leads is management. We set up conversion tracking from day one, write and test creative, tune targeting, and cut what isn't working — so your spend concentrates on the campaigns that actually book appointments.",
      ],
    },
    howWeDoIt: {
      heading: "How we run your ads",
      intro:
        "We manage ad spend like it's our own money. Here's how every campaign comes together:",
      steps: [
        {
          title: "Tracking & strategy first",
          text: "Before a single dollar is spent, we set up conversion tracking so every lead is attributed. Then we build a strategy around the offers and audiences most likely to convert.",
        },
        {
          title: "Campaign build & creative",
          text: "We build Google Search, Display, Facebook, and Instagram campaigns with copy and creative written to convert — not just to look good.",
        },
        {
          title: "Retargeting",
          text: "We re-engage people who visited but didn't convert, keeping your business in front of warm prospects until they're ready to book.",
        },
        {
          title: "Constant optimization",
          text: "We watch the numbers continuously, shift budget to winners, pause losers, and report on leads, calls, and cost per result — never just impressions.",
        },
      ],
    },
    whoItsFor: {
      heading: "Who paid advertising is for",
      intro: "Paid advertising is the right move if you:",
      bullets: [
        "Need leads now and can't wait months for SEO to compound",
        "Have a clear offer and the capacity to take on more work",
        "Want to stop guessing whether your ad spend is producing results",
        "Are ready to fund an ad budget and let us manage every dollar of it",
      ],
    },
    faqs: [
      {
        q: "Does my ad spend come out of the monthly fee?",
        a: "No. Ad management is included in your plan, but the actual spend — what you pay Google or Meta to run the ads — is a separate budget billed directly to you by the platform. We help you set the right budget and manage every dollar of it; you fund the account.",
      },
      {
        q: "How quickly will paid ads generate leads?",
        a: "Paid ads can start generating leads within the first week, which makes them the fastest channel we offer. The first few weeks are partly a learning period as we gather conversion data and optimize, after which performance and cost per lead typically improve steadily.",
      },
      {
        q: "Should I run Google Ads or Facebook Ads?",
        a: "It depends on your business. Google Ads capture people actively searching for what you offer, which usually means higher intent. Facebook and Instagram ads are powerful for awareness, retargeting, and visual offers. We recommend the right mix based on your goals, and our higher plans run both together.",
      },
      {
        q: "How do you measure whether the ads are working?",
        a: "We track conversions — leads, calls, and form fills — not vanity metrics like impressions or clicks alone. You get reporting that shows how many leads each campaign produced and what they cost, so you always know the return on your spend.",
      },
      {
        q: "What's a realistic ad budget to start with?",
        a: "It varies by industry and how competitive your local market is. We'll recommend a starting budget based on your goals and the cost of leads in your area, then scale up the campaigns that prove they convert. The aim is always profitable growth, not spending for the sake of it.",
      },
    ],
    related: ["local-seo", "lead-management", "sms-email-marketing"],
  },
  {
    slug: "sms-email-marketing",
    icon: "chat",
    shortName: "SMS & Email Marketing",
    cardTitle: "Two-Way SMS & Email Marketing",
    cardText:
      "Reach your customers where they actually read — text and email. Respond to inquiries from one inbox and blast promos, announcements, and follow-ups to your list.",
    cardFeatures: [
      "Two-way SMS & email inbox",
      "Broadcast campaigns to your list",
      "Automated follow-up sequences",
    ],
    metaTitle: "Two-Way SMS & Email Marketing for Local Business",
    metaDescription:
      "Reach customers where they read — text and email. Two-way inbox, broadcast campaigns, and automated follow-up sequences from RGV Performance Marketing.",
    primaryKeyword: "SMS and email marketing",
    keywordCluster: [
      "SMS and email marketing",
      "business text message marketing",
      "two-way SMS marketing",
      "email marketing for local business",
      "automated follow-up campaigns",
    ],
    eyebrow: "SMS & Email Marketing",
    h1: "Reach Customers Where They Actually Read",
    heroSub:
      "Texts get opened. Emails get read. We give you a single inbox to have real conversations with leads, plus broadcast campaigns and automated follow-ups that keep customers coming back.",
    whatItIs: {
      heading: "What is two-way SMS & email marketing?",
      body: [
        "Two-way SMS and email marketing lets your business have real back-and-forth conversations with leads and customers over text and email — all from one inbox. When someone texts your business number or replies to an email, you see it and respond, instead of messages getting lost across personal phones and inboxes.",
        "On top of conversations, it includes broadcast campaigns — promos, announcements, and seasonal offers sent to your whole list at once — and automated follow-up sequences that nurture every new lead without you lifting a finger. It's the most direct, highest-open-rate way to stay in front of the customers you already have.",
      ],
    },
    howWeDoIt: {
      heading: "How we set it up",
      intro: "We build a communication system your team can run from one place:",
      steps: [
        {
          title: "Unified two-way inbox",
          text: "We set up a single inbox where text and email conversations live together, so no inquiry slips through the cracks and anyone on your team can respond.",
        },
        {
          title: "List building & segmentation",
          text: "We help you collect and organize your customer list so the right message reaches the right people — new leads, past customers, and VIPs.",
        },
        {
          title: "Broadcast campaigns",
          text: "We write and send promos, announcements, and offers to your list on a schedule that keeps you top of mind without becoming noise.",
        },
        {
          title: "Automated follow-up sequences",
          text: "We build sequences that text and email new leads automatically the moment they come in — responding instantly while interest is highest.",
        },
      ],
    },
    whoItsFor: {
      heading: "Who this is for",
      intro: "SMS and email marketing is a fit if you:",
      bullets: [
        "Have a list of past customers you're not staying in touch with",
        "Lose leads because nobody replies fast enough",
        "Run promotions or seasonal offers worth announcing",
        "Want repeat business without paying for an ad every time",
      ],
    },
    faqs: [
      {
        q: "What does \"two-way SMS\" actually mean?",
        a: "It means you can have real back-and-forth text conversations with leads and customers from your business number, all in one inbox. When someone texts you, you see it and reply — just like a normal conversation, but organized so nothing gets lost and anyone on your team can pick it up.",
      },
      {
        q: "Can I send promotions to my whole customer list?",
        a: "Yes. Broadcast campaigns let you send promos, announcements, and follow-ups to your entire list at once over text and email. This feature is included on Build the Machine and up. We help you write the messages and schedule them so you stay top of mind without overwhelming your customers.",
      },
      {
        q: "Is text message marketing allowed under the rules?",
        a: "Yes, when done correctly. We set up your messaging to follow consent and opt-out requirements, so you're texting customers who've agreed to hear from you and can easily opt out. Doing it the right way also keeps your messages from being flagged as spam, which protects your deliverability.",
      },
      {
        q: "What's the difference between this and the newsletter?",
        a: "The newsletter is a planned monthly piece of content sent to your email list. Two-way SMS and email marketing is the broader communication system — real-time conversations, broadcast blasts, and automated follow-up. Many clients use both: the newsletter for steady value, broadcasts and automations for timely offers and fast lead response.",
      },
      {
        q: "Will automated follow-up feel impersonal to customers?",
        a: "Not when it's written well. We craft sequences that sound like your business and respond fast while interest is high — which customers actually appreciate. The automation handles timing and consistency; the messages still read like they came from a real person who cares about the customer.",
      },
    ],
    related: ["lead-management", "social-media-newsletter", "paid-advertising"],
  },
  {
    slug: "lead-management",
    icon: "settings",
    shortName: "Lead Management",
    cardTitle: "Lead Management & Automation",
    cardText:
      "Never lose a lead again. We build pipelines that capture every inquiry, respond instantly, and nurture prospects until they book.",
    cardFeatures: [
      "Lead pipeline dashboard",
      "Automated SMS + email follow-up",
      "Appointment scheduling automation",
    ],
    metaTitle: "Lead Management & Marketing Automation",
    metaDescription:
      "Never lose a lead again. We build lead pipelines that capture every inquiry, respond instantly, and nurture prospects until they book. RGV Performance Marketing.",
    primaryKeyword: "lead management",
    keywordCluster: [
      "lead management",
      "marketing automation",
      "lead nurturing automation",
      "lead pipeline software",
      "appointment scheduling automation",
    ],
    eyebrow: "Lead Management",
    h1: "Never Lose Another Lead",
    heroSub:
      "Most local businesses lose leads simply because nobody followed up fast enough. We build the pipeline that captures every inquiry, responds in seconds, and nurtures prospects until they book.",
    whatItIs: {
      heading: "What is lead management?",
      body: [
        "Lead management is the system that captures every inquiry your marketing generates and moves it toward a booked appointment — automatically. Instead of leads landing in scattered inboxes, voicemails, and sticky notes, every prospect enters one organized pipeline where nothing falls through the cracks.",
        "Paired with marketing automation, it means new leads get an instant response, follow-ups happen on schedule without anyone remembering to send them, and appointments get booked while interest is still hot. Speed-to-lead is one of the biggest predictors of whether an inquiry turns into a customer, and automation is how you win it every time.",
      ],
    },
    howWeDoIt: {
      heading: "How we build your pipeline",
      intro:
        "We connect your lead sources into one system and automate the busywork that usually kills conversion:",
      steps: [
        {
          title: "Capture every lead in one pipeline",
          text: "We funnel inquiries from your forms, calls, ads, and profile into a single dashboard so you can see every prospect and exactly where they stand.",
        },
        {
          title: "Instant automated response",
          text: "The moment a lead comes in, automated text and email reach out — answering fast while your business is still top of mind and beating slower competitors.",
        },
        {
          title: "Nurture sequences",
          text: "Prospects who don't book right away get a thoughtful follow-up sequence that keeps your business in front of them until the timing is right.",
        },
        {
          title: "Appointment scheduling automation",
          text: "We automate booking so qualified leads can schedule themselves, with reminders that cut no-shows and keep your calendar full.",
        },
      ],
    },
    whoItsFor: {
      heading: "Who lead management is for",
      intro: "Lead management is essential if you:",
      bullets: [
        "Generate inquiries but lose some because follow-up is slow or inconsistent",
        "Juggle leads across texts, emails, voicemails, and forms",
        "Spend money on ads or SEO and want to convert more of what comes in",
        "Deal with no-shows or a calendar that's harder to fill than it should be",
      ],
    },
    faqs: [
      {
        q: "Why does speed-to-lead matter so much?",
        a: "Because the business that responds first usually wins the customer. Inquiries go cold fast, and prospects often contact several businesses at once. Automated instant response means you reach every lead within seconds — while their interest is highest and before a competitor gets there — without anyone on your team having to drop what they're doing.",
      },
      {
        q: "What does the lead pipeline dashboard show me?",
        a: "It gives you one view of every lead and exactly where each one stands — new, contacted, booked, or won. Instead of inquiries scattered across inboxes and voicemails, you see the full picture at a glance, so nothing gets forgotten and you know precisely what your marketing is producing.",
      },
      {
        q: "Can it book appointments automatically?",
        a: "Yes. We set up appointment scheduling automation so qualified leads can book themselves into your calendar, with automatic reminders that reduce no-shows. It keeps your schedule full without the back-and-forth of manually coordinating every booking.",
      },
      {
        q: "Will this replace my team?",
        a: "No — it makes your team far more effective. Automation handles the repetitive, time-sensitive work: instant replies, scheduled follow-ups, reminders. Your people focus on the conversations that actually need a human, instead of losing leads to tasks that should have happened automatically.",
      },
      {
        q: "How is this different from SMS & email marketing?",
        a: "SMS and email marketing is about communicating with your list — conversations and broadcasts. Lead management is the system underneath it: capturing every inquiry, organizing it in a pipeline, and automating the follow-up and booking that turn a lead into a customer. They work hand in hand, and both are included from Build the Machine up.",
      },
    ],
    related: ["sms-email-marketing", "paid-advertising", "google-business-profile"],
  },
  {
    slug: "social-media-newsletter",
    icon: "calendar",
    shortName: "Social Media & Newsletter",
    cardTitle: "Social Media & Newsletter",
    cardText:
      "Stay top of mind with consistent social content and a monthly newsletter your customers actually want to read. You pick the topics — we handle the rest.",
    cardFeatures: [
      "Social media planner & scheduler",
      "Monthly newsletter (you pick the topic)",
      "Bilingual content available",
    ],
    metaTitle: "Social Media Management & Newsletter Marketing",
    metaDescription:
      "Consistent social content and a monthly newsletter your customers actually read. Social planner, scheduling, and bilingual content from RGV Performance Marketing.",
    primaryKeyword: "social media management",
    keywordCluster: [
      "social media management",
      "newsletter marketing service",
      "social media scheduling",
      "monthly newsletter service",
      "bilingual social media content",
    ],
    eyebrow: "Social Media & Newsletter",
    h1: "Stay Top of Mind, Every Single Month",
    heroSub:
      "Consistency is what keeps customers thinking of you first. We give you a social planner to schedule posts and a done-for-you monthly newsletter — you pick the topics, we handle the rest.",
    whatItIs: {
      heading: "What is social media & newsletter marketing?",
      body: [
        "Social media and newsletter marketing is how you stay visible to the customers you already have between purchases. Most businesses don't lose customers because they did bad work — they lose them because they faded from memory. Consistent content keeps your business in front of your audience so you're the first name they think of when they need you again.",
        "Our service combines a social media planner — a tool to plan and schedule posts across your platforms from one place — with a done-for-you monthly newsletter. You choose the topic each month; we write, design, and send it. On the Own the Market plan, we manage and post your social content for you, too.",
      ],
    },
    howWeDoIt: {
      heading: "How it works",
      intro: "We make staying consistent effortless, with as much or as little hands-on help as your plan includes:",
      steps: [
        {
          title: "Social media planner",
          text: "Every plan includes a scheduling tool to plan and queue posts across your platforms from one place — so your feed stays active without daily effort.",
        },
        {
          title: "Done-for-you monthly newsletter",
          text: "You pick the topic — a promotion, seasonal update, or service spotlight — and we write, design, and send it to your customer list. You stay top of mind without lifting a finger.",
        },
        {
          title: "Managed social content",
          text: "On the Own the Market plan, we create and post your social content for you, including reels and shorts, so your brand stays consistently visible.",
        },
        {
          title: "Bilingual content",
          text: "We can produce content in English and Spanish, helping you connect with a bilingual customer base your competitors often overlook.",
        },
      ],
    },
    whoItsFor: {
      heading: "Who this is for",
      intro: "Social media and newsletter marketing is a fit if you:",
      bullets: [
        "Have customers who'd come back more often if you stayed in touch",
        "Struggle to post consistently because you're busy running the business",
        "Want to promote offers and updates to people who already know you",
        "Serve a bilingual community and want content that speaks to all of them",
      ],
    },
    faqs: [
      {
        q: "How does the monthly newsletter work?",
        a: "Each month you tell us the topic — a promotion, a seasonal update, a service spotlight, whatever fits your business. We write it, design it, and send it to your customer list. You stay top of mind with your customers without lifting a finger, and you keep full control over what gets featured.",
      },
      {
        q: "What's the social media planner tool?",
        a: "It's a scheduling tool included with every plan that lets you or your team plan and schedule posts across your social platforms from one place. On the Own the Market plan, we manage and post the content for you. On the other plans, you have the tool to do it yourself whenever you want.",
      },
      {
        q: "Do you create the social media content for me?",
        a: "On the Own the Market plan, yes — we create and post your content for you, including reels and shorts. On Plant the Flag and Build the Machine, you get the planner tool to schedule your own posts. We'll recommend the right level based on how hands-on you want to be.",
      },
      {
        q: "Can you produce content in Spanish?",
        a: "Yes. Bilingual content is available on every plan. In a market like the Rio Grande Valley, content in both English and Spanish helps you reach a wider customer base and connect with people your competitors often overlook.",
      },
      {
        q: "How is the newsletter different from email blasts?",
        a: "The newsletter is a planned, designed monthly piece focused on giving your customers something worth reading. Email and SMS broadcasts are timely, promotional sends — a flash sale or an announcement. They complement each other: the newsletter builds steady goodwill, broadcasts drive immediate action.",
      },
    ],
    related: ["sms-email-marketing", "local-seo", "google-business-profile"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
