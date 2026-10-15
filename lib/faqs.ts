// Homepage FAQ content. Kept in a plain module (not the "use client" FAQ
// component) so server components can import it for FAQPage JSON-LD.
// Also feeds /llms.txt and /llms-full.txt. Ordered the way buyers raise
// objections. Every fact matches components/PricingTabs.tsx and /terms#baa.
export const homeFaqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. Every plan is month-to-month, and you can cancel any month. The only upfront cost on any plan is the one-time $399 activation fee on Build the Machine, which covers onboarding and setup.",
  },
  {
    q: "Is a website included?",
    a: "Yes, on Plant the Flag ($397/mo) and the SEO Package ($597/mo). Both include a custom website we build, host and keep updated, with no separate build fee. Build the Machine and Own the Market are marketing plans. If you need a new site on one of those, we quote it separately.",
  },
  {
    q: "Are there costs beyond the monthly price?",
    a: "Two, and we'll name them up front. Build the Machine has a one-time $399 activation fee. If your plan includes ads, you pay Google or Meta directly for the ad spend, billed to you by the platform. Our management fee is your monthly plan price, and we help you set the right budget.",
  },
  {
    q: "How quickly will I see results?",
    a: "Ads can start bringing in leads within the first week once they're live. SEO usually takes 60 to 90 days to show real traction, then builds over time. We'll give you an honest timeline for each channel before you start, and we won't promise a #1 ranking.",
  },
  {
    q: "Do you work with medspas?",
    a: "Yes, medspas and aesthetic practices are our specialty. Kelsey spent five years at Aesthetic Record working with hundreds of clinic owners, and Derrick helped build its lead management and marketing division. We build consult-focused sites, local SEO for the treatments you offer, ads written for Google's and Meta's health and beauty policies, and follow-up that keeps patients rebooking.",
  },
  {
    q: "Do you sign a HIPAA Business Associate Agreement?",
    a: "Yes. Our Terms include a HIPAA Business Associate Addendum. If you're a covered entity or business associate and we handle protected health information for you, it takes effect when you subscribe. You can read it at rgvperformancemarketing.com/terms#baa.",
  },
  {
    q: "Can you run ads for injectables and other aesthetic treatments?",
    a: "Yes, within each platform's rules. Google and Meta restrict health and beauty ads: no before-and-after reveals, no promised results, no targeting minors, and the landing page has to match the ad. We write campaigns to those rules. The platforms make the final approval call.",
  },
  {
    q: 'What does "two-way SMS & email" mean?',
    a: "You can have real back-and-forth conversations with leads and customers by text and email, all from one inbox. When someone texts your business number or replies to an email, you see it and can answer. On Build the Machine and up, you can also send broadcast campaigns, like promos and announcements, to your whole list.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Medspas and aesthetic practices, clinics and wellness businesses, contractors and home services, salons, restaurants, retail and professional services. We're based in Harlingen, Texas and work with businesses nationwide. If your customers find you online, we can help.",
  },
];
