import type { IconName } from "@/components/Icon";

export interface PostSection {
  type: "h2" | "h3" | "p" | "ul" | "table";
  /** For "table", `text` is the table caption. */
  text?: string;
  items?: string[];
  /** Column headers and rows for a "table" section. */
  headers?: string[];
  rows?: string[][];
  /** Optional inline links for a "p" section: each `text` must appear verbatim in `text`. */
  links?: { text: string; href: string }[];
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
  /**
   * Optional callout above the Quick Answer that tells a searcher who does this
   * work locally and where to go next (home, services, pricing). Each `links`
   * text must appear verbatim, in order, in `text`.
   */
  localAnswer?: { label: string; text: string; links?: { text: string; href: string }[] };
  /** One- or two-sentence direct answer up top — optimized for AI citation. */
  tldr: string;
  sections: PostSection[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
}

export const POSTS: Post[] = [
  {
    slug: "ai-friday-ai-receptionist-answer-sheet",
    title: "AI Friday: What Your AI Receptionist Should Say, and What It Should Hand Off",
    metaTitle: "AI Friday: Setting Up an AI Receptionist the Right Way",
    description:
      "An AI Friday tip for Rio Grande Valley owners: what an AI receptionist should answer, what it must hand to a person, and the one sheet to write first.",
    excerpt:
      "An AI receptionist is only as good as the answers you give it. Write the answer sheet and the hand-off rules before it picks up a single call.",
    category: "AI Friday",
    icon: "cpu",
    datePublished: "2026-10-10",
    dateModified: "2026-10-10",
    readMinutes: 5,
    tldr:
      "An AI receptionist for a small business should answer the questions you already answer the same way every day, collect the lead's details, and book or hand the conversation to a person. It should never make up prices, promises, or appointment times. Write a one-page answer sheet and a hand-off list before you turn it on.",
    sections: [
      { type: "p", text: "Two AI Fridays ago we said the first job to automate is answering the lead. Last week we said to write a task down before you automate it. This week puts the two together: the page you write before an AI receptionist answers its first call in Harlingen, McAllen, or Brownsville." },
      { type: "h2", text: "What an AI receptionist actually does" },
      { type: "p", text: "An AI receptionist answers calls, chats, and new leads around the clock, then keeps the follow-up running on its own. That is the job. It is not a salesperson, and it is not your estimator. It is the person at the front desk who never goes home, and it only knows what you tell it." },
      { type: "p", text: "That last part is where most setups go wrong. If nobody writes down the answers, the system fills the gaps with guesses. A guess about your hours is annoying. A guess about your price or your schedule loses the customer." },
      { type: "h2", text: "Write the answer sheet first" },
      { type: "p", text: "Sit down with whoever answers your phone today and list the questions they hear every week, with the answer they give. Keep it to things that are true every time:" },
      { type: "ul", items: [
        "Your hours, and what happens after hours.",
        "The services you offer, in the words customers use, and the ones you do not.",
        "The cities you cover in the Valley, and where you stop.",
        "What a customer needs to have ready: an address, a photo, an insurance card, a time that works.",
        "How booking works, and who confirms the appointment.",
      ]},
      { type: "p", text: "If the honest answer to a question is \"it depends,\" it does not go on the sheet. It goes on the hand-off list." },
      { type: "h2", text: "Write the hand-off list second" },
      { type: "p", text: "The hand-off list is every situation where the AI stops answering and gets a person. For most local businesses it looks like this:" },
      { type: "ul", items: [
        "Any question about price, a quote, or a discount.",
        "Anything urgent, unsafe, or medical.",
        "An upset customer, or a complaint about past work.",
        "A request the answer sheet does not cover.",
        "A caller who asks for a human. Every time, no argument.",
      ]},
      { type: "p", text: "For each one, write who gets it and how: a text to the owner, a task in your lead management software, or a booked call-back. A hand-off that lands in an inbox nobody reads is the same as a missed call." },
      { type: "h2", text: "Connect it to what you already use" },
      { type: "p", text: "The receptionist should write into the tools your team already opens every day: your calendar, your scheduling tool, your forms, and your lead management. If the conversation ends up somewhere new that nobody checks, you have moved the leak, not fixed it. Our AI consulting work starts by mapping how your leads come in today, then connects the receptionist and follow-up to the software you already rely on.", links: [{ text: "AI consulting", href: "/services/ai-implementation" }] },
      { type: "h2", text: "Read the transcripts for two weeks" },
      { type: "p", text: "Once it is live, someone reads every conversation for the first couple of weeks. Each time the AI gets something wrong, the fix is usually one new line on the answer sheet or one new item on the hand-off list. When a week goes by with nothing to fix, check it less often. Do not stop checking." },
      { type: "h2", text: "Your Friday homework" },
      { type: "p", text: "Write down the ten questions your phone gets most, with the answer you give, and five situations where you always want a person on the line. If you want help turning that page into a receptionist that answers and follows up for you, book a call and bring the page.", links: [{ text: "book a call", href: "/contact" }] },
    ],
    faqs: [
      { q: "What is an AI receptionist?", a: "An AI receptionist answers your calls, chats, and new leads around the clock, handles the common questions you have written answers for, collects the lead's details, and books or hands the conversation to a person." },
      { q: "Should an AI receptionist quote prices?", a: "No. Price questions belong on the hand-off list. The AI should collect the details and get a person on it, not make up a number or a promise you do not offer." },
      { q: "Will an AI receptionist work with my calendar and lead management?", a: "In most cases, yes. It should connect to the calendar, scheduling tools, forms, and lead management software you already use, so every conversation lands where your team already looks." },
      { q: "How do I know the AI receptionist is saying the right thing?", a: "Read the conversations for the first couple of weeks. Each mistake usually means one missing line on the answer sheet or one missing item on the hand-off list. Fix the sheet, then keep checking on a lighter schedule." },
    ],
    related: [
      { href: "/blog/ai-friday-local-business-rgv", label: "AI Friday: What to Automate First" },
      { href: "/blog/ai-friday-automate-weekly-task", label: "AI Friday: Write the Weekly Task Down First" },
      { href: "/services/ai-implementation", label: "AI Consulting & Implementation" },
      { href: "/contact", label: "Book a Call" },
    ],
  },
  {
    slug: "how-much-does-seo-cost-rio-grande-valley",
    title: "How Much Does SEO Cost in the Rio Grande Valley?",
    metaTitle: "How Much Does SEO Cost? (2026)",
    description:
      "What SEO costs in McAllen, Harlingen, Brownsville and the RGV: monthly vs one-time vs hourly vs DIY, what each level includes, red flags, and timelines.",
    excerpt:
      "SEO quotes in the Valley are hard to compare because they are priced four different ways. Here is how each model works, what a fair offer includes, and what we charge.",
    category: "Local SEO",
    icon: "search",
    datePublished: "2026-10-06",
    dateModified: "2026-10-06",
    readMinutes: 9,
    tldr:
      "SEO in the Rio Grande Valley is usually sold as a monthly retainer, and the price depends on how many cities and services you want to rank for, how competitive your trade is, and how much work your website and Google profile need. At RGV Performance Marketing, local SEO is $597 a month, month to month, website included.",
    sections: [
      { type: "p", text: "Ask three agencies in McAllen, Harlingen, or Brownsville what SEO costs and you will likely get three answers that are hard to compare: a monthly fee, a one-time project, an hourly rate. This guide lays the options side by side so you can see what you are paying for, what a fair offer includes, and when SEO is worth it for a Valley business." },
      { type: "p", text: "We are an AI and marketing agency in Harlingen, so we also say what we charge, near the end, using only prices from our pricing page." },
      { type: "h2", text: "How much does SEO cost in the Rio Grande Valley?" },
      { type: "p", text: "There is no single market rate, and anyone who quotes one before asking about your business is guessing. Most Valley businesses pay for local SEO as a monthly fee, because the work never fully ends: reviews keep coming in, Google changes how your category displays, and you add services. What moves the price up or down is the amount of work, and that comes from a handful of things:" },
      { type: "ul", items: [
        "How many cities you want to show up in. Ranking in Harlingen alone is a smaller job than ranking in Harlingen, San Benito, Brownsville, and McAllen, because Google treats each city as its own set of results.",
        "How many services you sell. A plumber who also does water heaters, drain cleaning, and remodels needs a page for each one people search for.",
        "How crowded your trade is. Personal injury law, roofing, and air conditioning are contested in every Valley city. A niche trade with three competitors needs less.",
        "Where you are starting. A fast website and a complete Google Business Profile need upkeep. A slow site with no profile needs repair first.",
        "Whether you need Spanish. Many Valley customers search in Spanish, and good Spanish pages are written by a person who speaks it, which takes time.",
        "Who does the work. A freelancer, a local agency, a national agency, and your own evenings all come with different costs and different follow-through.",
      ]},
      { type: "h2", text: "How is SEO priced? The four common models" },
      { type: "p", text: "Almost every SEO offer you get will fit one of these four structures. The labels change from seller to seller, but the shape stays the same." },
      { type: "table", text: "Common SEO pricing models for local businesses", headers: ["Pricing model", "How you pay", "What it usually covers", "Best fit", "Watch for"], rows: [
        ["Monthly retainer", "A set fee each month", "Ongoing local SEO: Google profile, pages, reviews, fixes, reporting", "Businesses that want steady calls from search", "Long lock-in contracts and vague monthly reports"],
        ["One-time project", "A single fee up front", "An audit, a cleanup, or a set of new pages", "A site that needs repair before ongoing work", "Rankings slip when nobody keeps the work up"],
        ["Hourly", "Per hour of a consultant's time", "Advice, training, or one specific task", "Owners who will do the work and want guidance", "Open-ended bills with no clear deliverable"],
        ["DIY tools", "A software subscription, plus your time", "Keyword data, rank tracking, site checks", "Owners with the time and patience to learn", "A tool shows the problems. Someone still has to fix them."],
      ]},
      { type: "p", text: "For most local service businesses the monthly retainer fits best, because local rankings respond to steady upkeep: new reviews, fresh photos, a page for the service you just added. A one-time project makes sense when the site or profile needs repair, and an hourly consultant when you plan to do the work yourself." },
      { type: "h2", text: "What should SEO include at each level?" },
      { type: "p", text: "A price only means something next to a list of deliverables. Here is what a fair offer usually covers at each level." },
      { type: "h3", text: "A starting scope: one city, the basics done right" },
      { type: "ul", items: [
        "A complete Google Business Profile with the right primary category, services, photos, and hours.",
        "On-page cleanup: page titles, headings, and copy that name your service and your city in plain words.",
        "Technical fixes so Google can read the site: speed, mobile layout, broken links, indexing problems.",
        "Your name, address, and phone number made consistent across the main directories.",
        "A short monthly report that says what was done and what moved.",
      ]},
      { type: "h3", text: "A growing scope: more cities, more services" },
      { type: "ul", items: [
        "Everything above, plus one real page for each city and service you want to rank for.",
        "A steady way to ask every customer for a review, and replies to every review.",
        "Monthly content aimed at searches you already show up for but rarely get clicked on.",
        "Spanish pages where your customers search in Spanish.",
      ]},
      { type: "h3", text: "A full local program: SEO plus the rest of the system" },
      { type: "ul", items: [
        "Everything above, plus paid ads on Google or Meta for leads while rankings build.",
        "Follow-up by text and email so leads from search get answered fast.",
        "Reporting tied to calls, form fills, and booked jobs, with rankings as supporting detail.",
      ]},
      { type: "p", text: "If a quote does not say which of these you are getting, ask. A good agency can answer in writing in a few minutes. For the Google profile side on its own, our Google Business Profile service lists what that work covers.", links: [{ text: "Google Business Profile service", href: "/services/google-business-profile" }] },
      { type: "h2", text: "What red flags should you look for in an SEO quote?" },
      { type: "p", text: "Cheap SEO and expensive SEO can both be bad SEO. These warning signs show up in offers everywhere, the Valley included:" },
      { type: "ul", items: [
        "A guaranteed #1 ranking. Nobody controls Google's results. Google's own help page on hiring an SEO says no one can guarantee a #1 ranking on Google.",
        "A long contract with no way out. Local SEO deserves a few months, but a twelve-month lock-in mostly protects the seller. Ask what happens if you leave after month three.",
                "They own your accounts. Your Google Business Profile, your domain, and your website should be in your name, with the agency added as a manager.",
        "Bulk links, fake reviews, or keywords stuffed into your business name. These can get a Google profile suspended, and the cleanup costs more than the shortcut saved.",
        "Copy-paste city pages with only the city name swapped. They look busy on a report, and Google tends to ignore them.",
        "Reports full of rankings for words nobody searches. Ask for calls, form fills, and the searches that brought them in.",
      ]},
      { type: "h2", text: "How long does SEO take to work?" },
      { type: "p", text: "If your Google profile was incomplete or your site had obvious problems, early movement in the map results often shows within 30 to 60 days of fixing them. Steadier rankings across your city and service pages usually build over 90 to 180 days. Crowded trades and more cities take longer. Anyone promising page one by a set date is guessing, or taking risks with your profile." },
      { type: "p", text: "Google Ads runs on a different clock: ads can put you at the top of the page within days, and you pay for every click. Some businesses run ads while SEO builds. Our guide to RGV SEO and digital marketing covers the order to run those pieces in.", links: [{ text: "RGV SEO and digital marketing", href: "/blog/rgv-seo-digital-marketing" }] },
      { type: "h2", text: "How do people in the Valley search for local businesses?" },
      { type: "p", text: "This shapes what you should pay for. For Valley service businesses, a lot of buying starts on a phone, in Google Maps or the map box at the top of a search. Someone in Pharr looking for AC repair, or in Weslaco looking for a dentist, often picks from the businesses in that map and calls without opening a website. A complete Google profile and steady reviews are a big part of what you are buying." },
      { type: "p", text: "Each city is also its own search. Google builds map results around where the person searching is standing, so ranking in McAllen does not get you seen by someone in Brownsville, Harlingen, or Edinburg. That is why the number of cities moves the price so much." },
      { type: "p", text: "Then there is language. Plenty of Valley customers search in Spanish, and many local competitors publish only in English. A Spanish service page written by someone who speaks the language reaches people those competitors miss." },
      { type: "p", text: "This is why local SEO and national SEO are priced and run so differently. For the longer explanation, read local SEO vs. regular SEO, and for the map side, our guide on how to rank higher on Google Maps in the Valley.", links: [{ text: "local SEO vs. regular SEO", href: "/blog/local-seo-vs-regular-seo" }, { text: "how to rank higher on Google Maps", href: "/blog/how-to-rank-higher-google-maps-rio-grande-valley" }] },
      { type: "h2", text: "Is SEO worth it for a small business?" },
      { type: "p", text: "For most local service businesses, yes, as long as three things are true: people search for what you sell in the cities you serve, you can handle more calls, and you can give it a few months. A roofer or dental office in McAllen fits easily. A business that runs almost entirely on referrals, or is already booked out, may get more from fixing its website and Google profile first." },
      { type: "p", text: "The quickest test: search your main service and your city on your phone. If competitors show up in the map and you do not, those calls already exist and are going to someone else." },
      { type: "h2", text: "Should you do SEO yourself or hire an agency?" },
      { type: "p", text: "A lot of local SEO is work an owner can do: finishing the Google profile, fixing old listings, asking every customer for a review, writing a real page for your city. Our local SEO checklist for Brownsville owners walks through it step by step, and the same steps work in any Valley city. Doing it yourself costs very little money and a fair number of evenings.", links: [{ text: "local SEO checklist for Brownsville owners", href: "/blog/local-seo-brownsville-tx-checklist" }] },
      { type: "p", text: "Hiring help makes sense when you lack the time to keep it up, when you have done the basics and still sit on page two, or when you want several cities and services covered at once. Whichever you choose, keep every account in your own name." },
      { type: "h2", text: "What does RGV Performance Marketing charge for SEO?" },
      { type: "p", text: "Our SEO Package is $597 a month, month to month. It includes everything in Plant the Flag, our $397 plan with a custom website built, hosted, and maintained for you plus one inbox for every lead. On top of that it adds Google Business Profile and local SEO work: city and service pages, on-page and technical cleanup, a keyword plan, monthly content, and a monthly report on what moved. We do not guarantee #1 rankings." },
      { type: "p", text: "If you also want paid ads managed, two-way text and email, automation, and reporting, Build the Machine is $899 a month plus a one-time activation fee. Own the Market is $1,499 a month for managed ads, content, social, reputation, and hands-on monthly optimization. Ad spend on those plans is billed by Google or Meta directly. Current details are on our pricing page.", links: [{ text: "pricing page", href: "/pricing" }] },
      { type: "p", text: "To see what the work looks like, our local SEO services page covers the process, and there are city pages for local SEO in Harlingen and local SEO in Brownsville. If you are pricing a new site at the same time, read how much a website costs in the RGV.", links: [{ text: "local SEO services", href: "/services/local-seo" }, { text: "local SEO in Harlingen", href: "/local-seo-harlingen-tx" }, { text: "local SEO in Brownsville", href: "/local-seo-brownsville-tx" }, { text: "how much a website costs in the RGV", href: "/blog/how-much-does-a-website-cost-rio-grande-valley" }] },
      { type: "p", text: "Or book a call. We will look at where you show up today, which cities and services are worth chasing, and whether the SEO Package fits or a smaller plan would do for now.", links: [{ text: "book a call", href: "/contact" }] },
    ],
    faqs: [
      { q: "How much does SEO cost per month in McAllen, Harlingen, or Brownsville?", a: "It depends on how many cities and services you want to rank for, how competitive your trade is, and the shape your website and Google profile are in. Most local businesses pay a monthly fee. At RGV Performance Marketing, the SEO Package is $597 a month, month to month, and includes a custom website plus Google Business Profile and local SEO work." },
      { q: "Is SEO worth it for a small business?", a: "Usually, if people search for what you sell in the cities you serve, you can handle more calls, and you can give it a few months. Check by searching your main service and city on your phone. If competitors appear in the map and you do not, SEO is how you close that gap." },
      { q: "Should I sign a long-term SEO contract?", a: "Be careful with one. Local SEO takes a few months to show results, so give any provider a fair run, but you should be able to leave if the work is not getting done. All RGV Performance Marketing plans are month to month." },
      { q: "Can I pay for SEO once and be done?", a: "A one-time project can repair a site or set up a Google profile properly, and that alone can help. Rankings tend to slip without upkeep, though, because reviews, new pages, and fixes keep coming. Most businesses that rely on search either pay for ongoing work or do it themselves." },
      { q: "Is local SEO cheaper than regular SEO?", a: "Often, because you compete with businesses near you instead of every site in the country. The work centers on your Google Business Profile, city and service pages, and reviews. The price still rises with each city and service you want to rank for." },
      { q: "Can any SEO company guarantee first place on Google?", a: "No. Google's own help page on hiring an SEO says no one can guarantee a #1 ranking on Google. A good provider tells you what work they will do each month and how they will measure calls and leads." },
    ],
    related: [
      { href: "/pricing", label: "See Plans & Pricing" },
      { href: "/services/local-seo", label: "Local SEO Services" },
      { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
      { href: "/blog/local-seo-brownsville-tx-checklist", label: "Brownsville Local SEO Checklist" },
      { href: "/blog/how-much-does-a-website-cost-rio-grande-valley", label: "How Much Does a Website Cost?" },
      { href: "/contact", label: "Book a Call" },
    ],
  },
  {
    slug: "local-seo-brownsville-tx-checklist",
    title: "Local SEO in Brownsville, TX: A Checklist You Can Run Yourself",
    metaTitle: "Local SEO Brownsville TX: A Do-It-Yourself Checklist",
    description:
      "A plain-English local SEO checklist for Brownsville, TX owners: your Google profile, listings, a real Brownsville page, Spanish, reviews, and what to skip.",
    excerpt:
      "Most of what moves a Brownsville business up in local search is work an owner can do in a few evenings. Here is the checklist, in order, plus the shortcuts that get profiles suspended.",
    category: "Local SEO",
    icon: "map-pin",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    readMinutes: 7,
    tldr:
      "Local SEO in Brownsville, TX comes down to six jobs: a complete Google Business Profile, the same name, address and phone everywhere, one real Brownsville page on your website, Spanish where your customers use it, a steady flow of honest reviews, and checking results from a phone in Brownsville. Most owners can do the first pass themselves in a few evenings.",
    sections: [
      { type: "p", text: "If you own a shop, a clinic, or a service business in Brownsville, you have probably searched your own trade on your phone and wondered why three other businesses sit in the map and you do not. Local SEO is the work of fixing that. Most of it is not technical. It is a list of jobs done carefully and kept up. This post is that list, in the order we would run it, written so an owner can work through it without hiring anyone." },
      { type: "p", text: "One thing first: Brownsville has its own Google results. Ranking in Harlingen or McAllen does not carry over, because Google builds the map results around where the person searching is standing. Everything below is about showing up for people searching in and around Brownsville." },
      { type: "h2", text: "1. Finish your Google Business Profile" },
      { type: "p", text: "Your Google Business Profile is the listing that shows in the map and on the right side of a desktop search. For most local searches it gets looked at before your website does. Open it and go line by line:" },
      { type: "ul", items: [
        "Primary category: pick the one that matches what people search for, not the broadest one. \"Plumber\" beats \"Contractor\" if plumbing is the job you want.",
        "Services: list each one you actually offer, in the words a customer would type.",
        "Service areas: if you drive to customers, add the parts of Brownsville you serve and the nearby towns you really go to. Do not list places you would turn down.",
        "Hours, holiday hours, phone, and website link: all correct, all current.",
        "Photos: real photos of your work, your team, your storefront or trucks. Add new ones as you finish jobs.",
        "Description: say what you do, where, and that you speak Spanish if you do. Plain sentences, not a list of keywords.",
      ]},
      { type: "p", text: "If you want the longer version of how the map ranking works, our guide on how to rank higher on Google Maps walks through it. If you would rather hand the profile off, that is what our Google Business Profile work in Brownsville covers.", links: [{ text: "how to rank higher on Google Maps", href: "/blog/how-to-rank-higher-google-maps-rio-grande-valley" }, { text: "Google Business Profile work in Brownsville", href: "/google-business-profile-brownsville-tx" }] },
      { type: "h2", text: "2. Make your name, address and phone match everywhere" },
      { type: "p", text: "Google cross-checks your business against other sites: Facebook, Yelp, Apple Maps, Bing, industry directories, the chamber of commerce, old listings someone made years ago. When those disagree, Google is less sure which one is right, and that uncertainty costs you." },
      { type: "ul", items: [
        "Write down your business name, address and phone exactly as they appear on your Google profile.",
        "Search your business name and your phone number and open every listing that comes up.",
        "Fix the ones you control. Claim the ones you do not, then fix them.",
        "If you moved or changed numbers, the old address or phone is usually still out there. Hunt it down.",
      ]},
      { type: "p", text: "Use the same spelling every time. \"Ste.\" on one site and \"Suite\" on another is fine. A different business name, an old phone number, or a second address is not." },
      { type: "h2", text: "3. Put one real Brownsville page on your website" },
      { type: "p", text: "Google needs a page on your own site that clearly says you serve Brownsville. Your homepage can do it if Brownsville is your only city. If you also serve Harlingen, San Benito, or the Upper Valley, give Brownsville its own page." },
      { type: "p", text: "Make it a real page. Say which services you offer in Brownsville, which parts of town or nearby communities you cover, how fast you can get there, and how to reach you. Add a few questions Brownsville customers actually ask you, with honest answers. A copy of your Harlingen page with the city name swapped does not count, and Google is good at spotting it." },
      { type: "p", text: "The page also has to work on a phone: quick to load, a tap-to-call button near the top, and a short form. If your current site cannot do that, website design in Brownsville is where we would start before anything else.", links: [{ text: "website design in Brownsville", href: "/website-design-brownsville-tx" }] },
      { type: "h2", text: "4. Use Spanish where your customers use it" },
      { type: "p", text: "A lot of Brownsville customers search in Spanish, including people who cross from Matamoros to shop or see a provider. If your customers speak Spanish with you, they are probably searching in Spanish too. You do not need to translate your whole website on day one. Start with:" },
      { type: "ul", items: [
        "A Spanish version of your main service page, written by someone who speaks it, not a machine translation pasted in unchecked.",
        "A line in your Google profile description saying you speak Spanish.",
        "Replies to Spanish reviews in Spanish.",
      ]},
      { type: "h2", text: "5. Ask every customer for a review, and answer every review" },
      { type: "p", text: "In Brownsville, people ask family and neighbors who to call. Online, reviews do the same job, and Google uses them when it picks which businesses to show. The habit that works is simple: ask every customer, right after the job, with a direct link to your review form." },
      { type: "ul", items: [
        "Ask everyone, not only the customers you think are happy. Filtering who gets asked breaks Google's rules.",
        "Never pay for reviews, swap them, or write them yourself.",
        "Answer every review within a few days, good or bad, in the language it was written in.",
        "When a review is unfair, answer calmly and stick to the facts. The next customer is reading your reply, not just the complaint.",
      ]},
      { type: "h2", text: "6. Check your results the right way" },
      { type: "p", text: "Searching your own business from your office tells you very little, because Google personalizes results and you are standing next to your own address. Instead:" },
      { type: "ul", items: [
        "Search from a phone in different parts of town, in a private browser tab, for the services you want to be found for.",
        "Open the Performance section of your Google profile once a month and look at calls, website clicks, and direction requests.",
        "Set up Google Search Console for your website, free, to see which searches you show up for and which pages get clicked.",
        "Watch the phone and the form. Rankings matter only if calls follow.",
      ]},
      { type: "p", text: "Expect early movement in roughly 30 to 60 days if your profile was incomplete, with steadier map and city rankings building over 90 to 180 days. Nobody can honestly promise the top spot by a date." },
      { type: "h2", text: "What to skip" },
      { type: "p", text: "These shortcuts show up in Brownsville every year, and they cost more than they save:" },
      { type: "ul", items: [
        "Stuffing keywords into your business name on Google (\"Joe's Plumbing Brownsville Best Plumber\"). It can get your profile suspended.",
        "A virtual office or mailbox address so you appear \"in\" Brownsville. Google treats that as a fake location.",
        "Dozens of near-identical town pages with the names swapped.",
        "Buying links or reviews in bulk.",
      ]},
      { type: "h2", text: "When it makes sense to get help" },
      { type: "p", text: "If you work through this list and keep it up, you will be ahead of a lot of Brownsville businesses. If you would rather spend your evenings on the business itself, or you have already done the basics and still sit on page 2, that is the point to bring someone in. Our local SEO in Brownsville plans cover the profile, the pages, Spanish content, review requests, and a monthly report, from a team based up the road in Harlingen.", links: [{ text: "local SEO in Brownsville", href: "/local-seo-brownsville-tx" }] },
      { type: "p", text: "Need calls this month while the rankings build? Google Ads in Brownsville can put you at the top of the page within days. Not sure whether you need local SEO or the broader kind? Read local SEO vs. regular SEO first. Or book a call and we will look at your profile and your Brownsville results with you.", links: [{ text: "Google Ads in Brownsville", href: "/google-ads-management-brownsville-tx" }, { text: "local SEO vs. regular SEO", href: "/blog/local-seo-vs-regular-seo" }, { text: "book a call", href: "/contact" }] },
    ],
    faqs: [
      { q: "What is local SEO for a Brownsville business?", a: "It is the work of showing up when people in and around Brownsville search for what you do, both in the Google map results and in the regular results below them. It covers your Google Business Profile, consistent listings across the web, a Brownsville page on your website, reviews, and Spanish content where your customers use it." },
      { q: "Can I do local SEO myself?", a: "Yes, most of the first pass. Completing your Google profile, fixing old listings, writing a real Brownsville page, and asking every customer for a review are all jobs an owner can do. Help is worth it when you do not have the time to keep it up, or when the basics are done and you are still stuck on page 2." },
      { q: "How long does local SEO take in Brownsville?", a: "If your Google profile was incomplete, early movement often shows in 30 to 60 days. Steadier map and city rankings usually build over 90 to 180 days, and they hold only if the profile, reviews, and pages are kept up." },
      { q: "Do I need a Spanish website to rank in Brownsville?", a: "Not a full one to start. A Spanish version of your main service page, a note in your Google profile that you speak Spanish, and Spanish replies to Spanish reviews cover most of what matters. Add more Spanish pages as you see which ones bring in calls." },
      { q: "Can I list a Brownsville address if my business is somewhere else?", a: "Only if it is a real location where you serve customers or have staff during business hours. Virtual offices and mailbox addresses go against Google's rules and can get a profile suspended. If you drive to customers, set Brownsville as a service area instead." },
    ],
    related: [
      { href: "/local-seo-brownsville-tx", label: "Local SEO in Brownsville" },
      { href: "/google-business-profile-brownsville-tx", label: "Google Business Profile in Brownsville" },
      { href: "/website-design-brownsville-tx", label: "Website Design in Brownsville" },
      { href: "/blog/how-to-rank-higher-google-maps-rio-grande-valley", label: "How to Rank Higher on Google Maps" },
      { href: "/contact", label: "Book a Call" },
    ],
  },
  {
    slug: "ai-friday-automate-weekly-task",
    title: "AI Friday: Write the Weekly Task Down Before You Automate It",
    metaTitle: "AI Friday: How to Automate a Weekly Business Task",
    description:
      "An AI Friday tip for Rio Grande Valley owners: how to pick one weekly task, write it down, and hand it to an AI agent without automating the mess.",
    excerpt:
      "Before an AI agent can run a task for your business, somebody has to write down how the task is done today. That one page is the real first step.",
    category: "AI Friday",
    icon: "cpu",
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
    readMinutes: 5,
    tldr:
      "To automate a weekly task in a small business, pick one job your team repeats every week, write down exactly how it is done today, and only then hand it to an AI agent or a custom tool. A person still checks the output until it is right every week. Skipping the write-up just makes the old mess run faster.",
    sections: [
      { type: "p", text: "Last AI Friday we said the first job to automate is answering the lead. This week is about the third step on that list: the office chore your team repeats every week. A report, an inbox sort, a follow-up list. It is the easiest place to waste money on AI, and the easiest place to win if you do one thing first." },
      { type: "h2", text: "Why most business automation fails" },
      { type: "p", text: "Business automation fails when the task was never clear to begin with. If two people on your team do the Monday report two different ways, an AI agent will pick one of them, or invent a third. The tool is not the problem. The missing instructions are." },
      { type: "p", text: "So the first deliverable is not software. It is one page that says how the job is done right now." },
      { type: "h2", text: "Pick the right weekly task" },
      { type: "p", text: "A good first task for an AI agent in a Harlingen, McAllen, or Brownsville business usually looks like this:" },
      { type: "ul", items: [
        "Someone on the team does it every week, and it takes the same steps each time.",
        "The inputs already live somewhere: an inbox, a spreadsheet, your lead management software, a calendar.",
        "The output is something a person can check in a minute: a list, a draft, a short report.",
        "Nobody will be hurt if the first draft is wrong, because a person reads it before it goes out.",
      ]},
      { type: "p", text: "Leave alone anything that sends money, quotes prices, or makes promises to a customer on its own. Those can come later, if ever." },
      { type: "h2", text: "Write it down in plain language" },
      { type: "p", text: "Sit with the person who does the task and write the steps as they do them. Not how it should work. How it works today. Cover four things:" },
      { type: "ul", items: [
        "Where the information comes from, and who has access to it.",
        "The steps, in order, including the small judgment calls (\"skip it if the lead is from out of the Valley\").",
        "What the finished result looks like, with one real example.",
        "Who checks it, and where it goes after that.",
      ]},
      { type: "p", text: "If you cannot fill in those four lines, the task is not ready for AI yet. Fix the process with your team first. That costs nothing and it is usually half the value." },
      { type: "h2", text: "Then hand it to an agent or a custom tool" },
      { type: "p", text: "With the page written, the build is the short part. Custom AI agents can research, write, report, and run parts of your operation around your own data and tools. A small internal tool or dashboard can often ship in days. Our AI consulting work starts with exactly this map: how the work comes in, where your team's time goes, and which few tasks are worth handing off.", links: [{ text: "AI consulting", href: "/services/ai-implementation" }] },
      { type: "p", text: "If you would rather build it yourself, that same page is what you bring to a 1-on-1 AI build session. You learn Claude Code or Codex by building the tool for your own business, and you keep what you build. No coding background needed.", links: [{ text: "1-on-1 AI build session", href: "/learn-claude-code" }] },
      { type: "h2", text: "Keep a person on it until it is boring" },
      { type: "p", text: "For the first few weeks, the person who used to do the task checks every result. When they stop finding things to fix, the automation is ready to run with a lighter check. If they keep finding the same problem, the page needs another line, not a new tool." },
      { type: "h2", text: "Your Friday homework" },
      { type: "p", text: "Pick one task your team did this week that they will do again next week. Write the four lines. If you want help turning that page into a working agent, book a call and bring the page with you.", links: [{ text: "book a call", href: "/contact" }] },
    ],
    faqs: [
      { q: "What tasks can a small business automate with AI?", a: "Repeated weekly work with clear inputs and an output a person can check quickly: reports, inbox sorting, follow-up lists, and first drafts. Lead response is usually the first win; the weekly office chore comes after that." },
      { q: "Do I need to document a process before automating it?", a: "Yes. If the steps are not written down, an AI agent will guess, and it will copy whatever inconsistency your team already has. A one-page write-up of how the task is done today is the real first step." },
      { q: "What is a custom AI agent?", a: "A custom AI agent is a system built around your own data and tools that can research, write, report, or run a defined part of your operation. It works best on a task with written steps and a person checking the result." },
      { q: "Can I build my own AI tool without knowing how to code?", a: "Yes. In a one-on-one build session you learn tools like Claude Code and Codex by building a real tool for your own business, and you keep everything you build." },
    ],
    related: [
      { href: "/blog/ai-friday-local-business-rgv", label: "AI Friday: What to Automate First" },
      { href: "/services/ai-implementation", label: "AI Consulting & Implementation" },
      { href: "/learn-claude-code", label: "1-on-1 AI Build Sessions" },
      { href: "/contact", label: "Book a Call" },
    ],
  },
  {
    slug: "ai-friday-local-business-rgv",
    title: "AI Friday: What a Local Business in the RGV Should Automate First",
    metaTitle: "AI Friday: AI for Local Businesses in the RGV",
    description:
      "An AI Friday tip for Rio Grande Valley businesses: the first job worth automating, and what to leave alone until that one works.",
    excerpt:
      "AI for a local business is not a pile of new apps. Start with the one job that is already costing you calls, then add the next piece on Friday.",
    category: "AI Friday",
    icon: "cpu",
    datePublished: "2026-09-30",
    dateModified: "2026-09-30",
    readMinutes: 6,
    tldr:
      "For a Rio Grande Valley business, the first AI job worth automating is lead response: answering the call, the form, and the text while you are on a job. Getting found on Google and building a custom internal tool come after that, not before. One working workflow beats five unused subscriptions.",
    sections: [
      { type: "p", text: "AI Friday is a short tip we publish for owners in Harlingen, McAllen, Brownsville, and the rest of the Valley. This first one answers the question we get most: if I want AI in the business, what do I actually turn on first?" },
      { type: "h2", text: "What AI means for a local business" },
      { type: "p", text: "Skip the demo reel. In a local company, AI earns its place when it does a job a person is already doing late, slowly, or not at all. Three jobs cover almost every win we see:" },
      { type: "ul", items: [
        "Answer the lead. The phone, the website form, and the text message get a reply even when you are on a roof, in a treatment room, or closed for the day.",
        "Get found. Your website, your Google profile, and the pages for each city you serve stay clear enough that the right search lands on you.",
        "Remove one office chore. A report, an inbox sort, a follow-up list, or a simple internal tool that your team repeats every week.",
      ]},
      { type: "p", text: "That is the whole menu. A chatbot on the homepage that cannot book anything is not one of these jobs." },
      { type: "h2", text: "Start with the lead, not the tool" },
      { type: "p", text: "If a new inquiry sits until the next morning, that is the first automation. An AI receptionist and follow-up can take the call or the form, answer the basic questions, and book or hand the lead to a person. You already know this costs you jobs. You do not need a strategy retreat to prove it." },
      { type: "p", text: "Do this only if a person still checks what the system said. AI should take the first reply. It should not invent prices, promises, or appointment times you do not offer." },
      { type: "h2", text: "Then use AI to get found" },
      { type: "p", text: "Search is changing. People ask Google, and they ask ChatGPT and other answer engines, \"who does this in Harlingen?\" Those answers are pulled from businesses that say, in plain language, what they do, where they do it, and how to hire them. An AI marketing agency in the Valley should be publishing that, city by city, not stuffing the phrase \"AI\" into a page that is really about something else." },
      { type: "p", text: "Use AI to draft and check. You still decide the facts. A page about your real service, with your real cities and your real offer, is what both Google and the answer engines can cite. Our AI consulting work starts there: where AI fits, and where a human still has to sign off.", links: [{ text: "AI consulting", href: "/services/ai-implementation" }] },
      { type: "h2", text: "Build one tool after the first two are real" },
      { type: "p", text: "Custom agents and small internal tools are the third step. They pay off when you can point at a weekly task and say \"this exact thing.\" Learning to build that yourself is what the 1-on-1 AI build sessions are for. They are a bad first purchase if calls are still going to voicemail.", links: [{ text: "1-on-1 AI build sessions", href: "/learn-claude-code" }] },
      { type: "h2", text: "What to leave alone this month" },
      { type: "ul", items: [
        "A stack of AI apps nobody on the team has opened twice.",
        "Automating a follow-up process you have not written down. The automation will copy the mess.",
        "Publishing AI content that names services you do not sell. That ranks you for the wrong search and then disappoints the person who calls.",
        "Waiting to \"do AI\" until you have replaced your website, your ads, and your staff. The first workflow can go live beside what you already use.",
      ]},
      { type: "h2", text: "The Friday rule" },
      { type: "p", text: "Each AI Friday we will cover one move a Valley owner can make that week: a lead workflow, a page worth publishing, or a small tool. If you want us to pick the first job in your business and build it, book a call and we will start with where the leads leak.", links: [{ text: "book a call", href: "/contact" }] },
    ],
    faqs: [
      { q: "What is the first AI tool a small business should use?", a: "Start with lead response: something that answers new calls, forms, and texts when you cannot, and hands the real conversation to a person. Buying a pile of writing and image tools before that rarely shows up in revenue." },
      { q: "Can AI help my business rank on Google?", a: "AI can help you draft and check pages, but rankings still come from clear pages about real services in real cities, a complete Google Business Profile, and reviews. Publishing generic AI articles that do not match your business does not help, and it can hurt." },
      { q: "What does an AI marketing agency do?", a: "It uses AI inside the marketing work: faster lead follow-up, cleaner local pages, and custom tools for the tasks your team repeats. The agency is still responsible for the facts, the offer, and the results. The tools do not replace that." },
      { q: "Do I need to know how to code to use AI in my business?", a: "No. Answering leads and publishing clear service pages does not require code. Building your own internal tool is a separate step, and that is something you can learn one-on-one or have built for you." },
    ],
    related: [
      { href: "/services/ai-implementation", label: "AI Consulting & Implementation" },
      { href: "/learn-claude-code", label: "1-on-1 AI Build Sessions" },
      { href: "/blog/rgv-seo-digital-marketing", label: "RGV SEO and Digital Marketing" },
      { href: "/contact", label: "Book a Call" },
    ],
  },
  {
    slug: "rgv-seo-digital-marketing",
    title: "RGV SEO and Digital Marketing: What Valley Businesses Should Run First",
    metaTitle: "RGV SEO & Digital Marketing: What to Run First",
    description:
      "How RGV SEO and digital marketing fit together for Harlingen, Brownsville, and McAllen businesses, and which piece to run first.",
    excerpt:
      "SEO, a website, your Google profile, and ads are one system. Here's the order that gets Rio Grande Valley businesses found, and what to skip until the foundation is in place.",
    category: "Digital Marketing",
    icon: "search",
    datePublished: "2026-09-30",
    dateModified: "2026-10-06",
    readMinutes: 8,
    tldr:
      "RGV SEO and digital marketing means getting a Valley business found in Google for the cities it actually serves — Harlingen, Brownsville, McAllen, and the towns around them — then turning that visibility into calls. Run it in this order: a fast website, a complete Google Business Profile, local SEO for each city you serve, then paid ads once the site can convert the click.",
    sections: [
      { type: "p", text: "People searching \"rgv seo digital marketing\" are usually past the question of whether they need marketing. They want a plan that fits the Rio Grande Valley, not a national playbook with a city name pasted on it. This is that plan: what the work includes, the order to run it, and how Harlingen, Brownsville, and McAllen searches differ from a single generic \"SEO\" campaign." },
      { type: "h2", text: "What RGV SEO and digital marketing actually includes" },
      { type: "p", text: "Treat it as one system, not four vendors. For a local Valley business the pieces that produce calls are:" },
      { type: "ul", items: [
        "A mobile-first website that loads fast and has a clear way to call or send a form. Everything else sends people here.",
        "Local SEO so you show up for city searches — \"seo harlingen,\" \"seo brownsville tx,\" \"mcallen web design\" — and in the map pack.",
        "A complete Google Business Profile: right category, services, photos, hours, and a steady review flow.",
        "Paid ads (Google, and Meta when it fits) for leads this month while the organic work compounds.",
        "Follow-up. A lead that sits overnight is a lead your competitor answers.",
      ]},
      { type: "p", text: "You do not need all of it on day one. Businesses that try to launch ads, a new site, social, and a blog in the same week usually stall. Local SEO plus a working website is the foundation. The rest waits until those two are in place.", links: [{ text: "Local SEO", href: "/services/local-seo" }] },
      { type: "h2", text: "Why a Valley-wide plan beats a single-city page" },
      { type: "p", text: "Harlingen, Brownsville, and McAllen are not the same search. Someone in Brownsville looking for \"brownsville seo\" or \"local seo brownsville tx\" wants a business that talks about Brownsville, not a Harlingen page with the city swapped. The same is true for McAllen web design and Harlingen marketing searches. A real RGV program has a page for each city you serve, written for that city, linked from the homepage and from each other." },
      { type: "p", text: "It is also a bilingual market. A large share of customers search and buy in Spanish, and a lot of competitors only publish English. English plus Spanish is one of the few advantages a local team can still take before the bigger agencies notice." },
      { type: "h2", text: "The order that moves rankings" },
      { type: "p", text: "This is the sequence we use with Valley clients. Skipping ahead is how budgets disappear." },
      { type: "ul", items: [
        "Fix the website if it is slow, hard to use on a phone, or missing a real call to action. Ads and SEO both leak if the page cannot convert.",
        "Finish the Google Business Profile and ask recent customers for reviews. Map-pack calls often show up before the blue links do.",
        "Publish one strong page per city and service you want to rank for, then a blog post only when it targets a search those pages do not already cover.",
        "Turn on ads after the landing page exists. Ads buy the click. The page has to earn the call.",
        "Review positions every month. Keep the pages that moved. Rewrite the ones that got impressions and no clicks. Do not add another page that says the same thing.",
      ]},
      { type: "p", text: "Early local movement often shows in 30 to 60 days. Stronger city rankings usually take 90 to 180 days. Anyone promising page 1 by Friday is selling a risk, not a plan. If you want the Harlingen-specific version of this, the digital marketing guide walks through channels and cost in more detail, and the blog has the rest of our local marketing guides.", links: [{ text: "digital marketing guide", href: "/blog/digital-marketing-harlingen-tx-guide" }, { text: "the blog", href: "/blog" }] },
      { type: "h2", text: "Which searches to chase first" },
      { type: "p", text: "Start with queries you are already close on, then build the ones with no page at all. In this market that usually looks like:" },
      { type: "ul", items: [
        "Harlingen terms you already rank for but that get almost no clicks. Those need a clearer title and description, not a second article.",
        "City terms sitting on page 2, such as seo brownsville tx and marketing agency searches in Harlingen. Strengthen the city page, then support it with one article that answers a question the page does not.",
        "Terms with no matching page, such as a McAllen web design page or a Brownsville SEO page. Those are new pages, not blog filler.",
      ]},
      { type: "p", text: "Local SEO in Harlingen, local SEO in Brownsville, and website design are the service pages those searches should land on. This article exists so the broader \"RGV SEO and digital marketing\" search has somewhere specific to go.", links: [{ text: "Local SEO in Harlingen", href: "/local-seo-harlingen-tx" }, { text: "local SEO in Brownsville", href: "/local-seo-brownsville-tx" }, { text: "website design", href: "/services/website-design" }] },
      { type: "h2", text: "What it costs, without the fog" },
      { type: "p", text: "A managed program for a Valley business typically runs from a few hundred dollars a month for a website and lead system up to a full local plan. At RGV Performance Marketing the published range is $397/mo to $1,499/mo, month to month, and ad spend is separate. Plant the Flag ($397/mo) and the SEO Package ($597/mo) include a custom website; on Build the Machine and Own the Market, a new site is quoted separately. The pricing page has the current tiers. If an agency will not show the number, that is the useful piece of information.", links: [{ text: "pricing page", href: "/pricing" }] },
      { type: "h2", text: "How to tell if the work is real" },
      { type: "p", text: "Ask for calls, form fills, and booked jobs, broken out by city. Lead management that puts every call and form in one place makes that count easy. Impressions going up while the phone stays quiet means the snippet or the page is wrong. Rankings stuck on page 3 usually mean the city page is thin or your Google profile is incomplete. A Harlingen marketing agency that cannot show those two numbers is reporting activity, not customers.", links: [{ text: "Lead management", href: "/services/lead-management" }] },
      { type: "p", text: "If you want this run for your business, book a call and we will look at which cities you already show up for and which page is missing.", links: [{ text: "book a call", href: "/contact" }] },
    ],
    faqs: [
      { q: "What is RGV SEO and digital marketing?", a: "It is the work of getting a Rio Grande Valley business found on Google in the cities it serves, then turning those visits into calls. The core pieces are a fast website, local SEO, a complete Google Business Profile, and paid ads once the site can convert. Social and email can wait until those are in place." },
      { q: "How is this different from regular SEO?", a: "Regular SEO competes for broad searches with no city attached. RGV SEO targets searches tied to Harlingen, Brownsville, McAllen, and nearby towns, plus the Google map pack. A Valley business usually gets more calls from the local work than from a national keyword." },
      { q: "How long does SEO take in the Rio Grande Valley?", a: "Most local businesses see early movement in 30 to 60 days, with stronger city and map-pack rankings building over 90 to 180 days. Paid ads can produce leads in the first week if the landing page is ready. Rankings keep compounding only if the pages and the Google profile stay maintained." },
      { q: "Do I need a separate page for each Valley city?", a: "Yes, if you want to rank in that city. A Harlingen page does not win \"seo brownsville tx,\" and a generic homepage rarely wins \"mcallen web design.\" Each city page should describe that city and link to your other locations, not repeat the same paragraph with the name swapped." },
      { q: "How much does digital marketing cost in the RGV?", a: "Published plans at RGV Performance Marketing run from $397 per month for a website and lead system up to $1,499 per month for a full local program, month to month. Ad spend paid to Google or Meta is separate. The $397 and $597 plans include a custom website; on the two larger plans a new site is quoted separately." },
    ],
    related: [
      { href: "/blog/digital-marketing-harlingen-tx-guide", label: "Digital Marketing in Harlingen" },
      { href: "/services/local-seo", label: "Local SEO Services" },
      { href: "/local-seo-mcallen-tx", label: "Local SEO in McAllen" },
      { href: "/pricing", label: "See Plans & Pricing" },
    ],
  },
  {
    slug: "digital-marketing-harlingen-tx-guide",
    title: "Digital Marketing in Harlingen, TX: A Local Business Owner's Guide (2026)",
    metaTitle: "Digital Marketing Harlingen, TX",
    description:
      "What digital marketing in Harlingen costs in 2026, which channels bring in calls, and how to choose an agency. A plain-English guide from a Harlingen team.",
    excerpt:
      "A plain-English guide to digital marketing for Harlingen and Rio Grande Valley businesses — what it includes, what it costs, and how to choose an agency that drives real leads.",
    category: "Digital Marketing",
    icon: "chart",
    datePublished: "2026-06-24",
    dateModified: "2026-10-06",
    readMinutes: 9,
    localAnswer: {
      label: "Who does digital marketing in Harlingen?",
      text: "RGV Performance Marketing is a Harlingen-based AI & marketing agency. We build and run websites, local SEO, Google Ads and lead follow-up for businesses across the Rio Grande Valley, on month-to-month plans from $397/mo with a custom website included. See what we do on our services page, or compare plans on the pricing page.",
      links: [
        { text: "RGV Performance Marketing", href: "/" },
        { text: "services page", href: "/services" },
        { text: "pricing page", href: "/pricing" },
      ],
    },
    tldr:
      "Digital marketing in Harlingen, TX is the mix of channels a local business uses to get found online and turn searches into customers — primarily a fast website, local SEO, an optimized Google Business Profile, and paid ads. At RGV Performance Marketing, published plans run from $397/mo to $1,499/mo, month-to-month, with ad spend billed separately by Google or Meta, and the right approach is local-first and bilingual (English and Spanish).",
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
      { type: "p", text: "Pricing varies, and a lot of agencies hide it. What you pay depends on how many channels you're running and how hands-on the management is. Some agencies quote the website separately; on our two entry plans the website is included. Paid ad spend (what you pay Google or Meta) is its own budget on top of management, billed to you directly by the ad platform." },
      { type: "p", text: "At RGV Performance Marketing, plans are transparent and month-to-month — $397/mo for a website and lead system, $597/mo to add local SEO and your Google Business Profile, up to $1,499/mo to fully own your local market — with no long-term contracts. You can see the full breakdown on our pricing page.", links: [{ text: "pricing page", href: "/pricing" }] },
      { type: "h2", text: "Local SEO: getting found in Harlingen and across the RGV" },
      { type: "p", text: "Local SEO is the work of ranking in local search results and Google's map pack — the three businesses shown on the map at the top of local searches. It's driven by your Google Business Profile, online reviews, consistent business information across the web, and location-specific content on your site.", links: [{ text: "Local SEO", href: "/services/local-seo" }, { text: "Google Business Profile", href: "/google-business-profile-harlingen-tx" }] },
      { type: "p", text: "It compounds: most businesses see early movement in 30–60 days and stronger rankings over 90–180 days. And it's not just Harlingen — the same playbook wins searches like \"brownsville seo,\" \"local seo brownsville,\" and \"harlingen seo,\" which is why a Valley-wide local SEO strategy beats a single-city effort. The businesses that rank in the map pack capture the calls; everyone else gets scrolled past.", links: [{ text: "brownsville seo", href: "/local-seo-brownsville-tx" }, { text: "harlingen seo", href: "/local-seo-harlingen-tx" }] },
      { type: "h2", text: "Websites that win the click (and rank)" },
      { type: "p", text: "Searches like \"website builder harlingen,\" \"website designer rgv,\" and \"rgv web design\" all point to the same need: a site that loads fast, works flawlessly on mobile, and is built to rank — not just to look pretty. A slow or outdated website quietly costs you leads every day, because visitors bounce and Google ranks you lower.", links: [{ text: "website builder harlingen", href: "/website-design-harlingen-tx" }, { text: "rgv web design", href: "/services/website-design" }] },
      { type: "p", text: "A good local business website has on-page SEO baked in from day one, clear calls to action, lead-capture forms that actually connect to a follow-up system, and a bilingual option for the RGV market. Done right, your website becomes the hub that your SEO, ads, and Google profile all funnel customers into.", links: [{ text: "follow-up system", href: "/services/lead-management" }] },
      { type: "h2", text: "Paid ads: leads now while SEO compounds" },
      { type: "p", text: "SEO is a long game; paid ads are the fast lane. Google Ads put you at the top of the page the moment someone searches — for queries like \"adwords management weslaco\" or \"google ads management rgv\" — while Facebook and Instagram ads build demand before customers even search. Many Harlingen businesses run both: ads to generate leads this week, SEO to lower their cost per lead over time.", links: [{ text: "paid ads", href: "/services/paid-advertising" }, { text: "Google Ads", href: "/google-ads-management-harlingen-tx" }] },
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
      { type: "p", text: "You don't have to do everything at once. Start with the foundation — make sure your Google Business Profile is claimed and optimized and your website is fast and mobile-friendly — then add local SEO and ads as you grow. If you'd rather have it handled for you, that's exactly what we do for local businesses across the Valley. Book a free call and we'll show you where you're losing leads and the fastest path to more customers.", links: [{ text: "that's exactly what we do", href: "/services" }, { text: "Book a free call", href: "/contact" }] },
    ],
    faqs: [
      { q: "How much does digital marketing cost in Harlingen, TX?", a: "It depends on the channels and how hands-on the management is. At RGV Performance Marketing, plans run from $397 per month (a custom website plus one inbox for every lead) and $597 per month (adds local SEO and Google Business Profile work) up to $899 and $1,499 per month for full programs with ads management, month-to-month. Ad spend is billed by Google or Meta on top. Be cautious of agencies that won't share pricing — transparent, month-to-month plans are a good sign." },
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
      { href: "/google-business-profile-harlingen-tx", label: "Google Business Profile in Harlingen" },
      { href: "/local-seo-brownsville-tx", label: "Local SEO in Brownsville" },
    ],
  },
  {
    slug: "how-much-does-a-website-cost-rio-grande-valley",
    title: "How Much Does a Website Cost in the Rio Grande Valley? (2026 Guide)",
    metaTitle: "How Much Does a Website Cost in the RGV? (2026)",
    description:
      "What a small-business website costs in McAllen, Harlingen, Brownsville, and across the RGV in 2026, and what actually drives the price.",
    excerpt:
      "Most RGV small-business websites land between $1,500 and $6,000 to build, plus a small monthly cost to host and maintain. Here's exactly what you're paying for — and what to avoid.",
    category: "Website Design",
    icon: "target",
    datePublished: "2026-06-21",
    dateModified: "2026-10-06",
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
      { type: "p", text: "Both models exist. A one-time build means you pay for the site and own it. A monthly model bundles the build with hosting, maintenance, and ongoing changes. Neither is automatically better — what matters is clarity: know exactly what's included, whether you own the site, and what happens if you leave. At RGV Performance Marketing, the website comes with the plan: Plant the Flag ($397/mo) and the SEO Package ($597/mo) include a custom site we build, host, and keep updated, plus lead management that puts every lead in one inbox, month-to-month. On Build the Machine and Own the Market, a new site is quoted separately.", links: [{ text: "lead management", href: "/services/lead-management" }] },
      { type: "h2", text: "What should an RGV business budget?" },
      { type: "p", text: "For most service-based local businesses in the Valley, a budget of $2,000–$5,000 for a professional, SEO-ready, mobile-first website is realistic and worth it — especially when paired with local SEO so the site actually gets found. The best move is to compare what each option actually includes (build, hosting, updates, and lead capture), not just the sticker price. If you're in Harlingen, our website design page shows how we build sites for local businesses.", links: [{ text: "website design page", href: "/website-design-harlingen-tx" }] },
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
      "How to rank in the Google map pack in McAllen, Harlingen, Brownsville, and across the RGV: what the ranking factors are and how to improve them.",
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
      { type: "p", text: "Local SEO compounds. You'll often see early movement within 30–60 days, with bigger gains building over 90–180 days. Track your map-pack position for your key searches so you can see what's working. Anyone promising an instant #1 is selling something risky.", links: [{ text: "Local SEO", href: "/services/local-seo" }] },
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
      "Local SEO vs. regular SEO in plain English: what each one does, how they differ, and which one a Rio Grande Valley business actually needs.",
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
      { type: "p", text: "If you serve customers in a specific area — a clinic in Harlingen, a contractor in Brownsville, a restaurant in McAllen — local SEO is what brings in calls and walk-ins. If you sell to people anywhere, regardless of location, regular SEO matters more. Many businesses benefit from both: local SEO to win their city now, and broader content SEO to build authority over time. The two reinforce each other.", links: [{ text: "local SEO", href: "/services/local-seo" }] },
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
