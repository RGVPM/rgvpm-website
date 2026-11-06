import type { IconName } from "@/components/Icon";

export const MEDSPA = {
  metaTitle: "Medspa Marketing Agency",
  metaDescription:
    "Medspa marketing from a team that spent five years inside clinic software. Published prices, month-to-month terms and an EMR consultant, nationwide.",
  primaryKeyword: "medspa marketing agency",
  keywordCluster: [
    "medspa marketing agency",
    "med spa marketing",
    "medical spa marketing",
    "medspa seo",
    "medspa advertising",
    "aesthetics practice marketing",
  ],
  eyebrow: "For Medspas Nationwide",
  h1: "Medspa Marketing With an EMR Consultant on Your Team",
  heroSub:
    "Our co-founder Kelsey Tamez spent five years at Aesthetic Record working with hundreds of clinics. Now she leads your website, Google, social, ads and EMR support, at prices you can see before we talk.",
};

export const MEDSPA_INTRO = {
  heading: "What a Medspa Marketing Agency Should Do",
  body: [
    "A medspa marketing agency brings in new clients and keeps your book full. That means a website that books consults, a strong presence on Google, social content that shows your work, ads that follow health advertising rules, and follow-up that answers every inquiry.",
    "Most medspas end up paying a different company for each piece, and nobody owns the whole picture. We run it all as one team, so when something needs to change, you make one call.",
  ],
};

export const MEDSPA_SERVICES: { icon: IconName; title: string; text: string; href?: string }[] = [
  { icon: "globe", title: "Website", text: "A custom site built around your treatments and your Book button, live in 8 to 10 days. We host it and keep it updated.", href: "/services/website-design" },
  { icon: "search", title: "Google & SEO", text: "Your Google Business Profile, treatment and city pages, and a monthly report, so you show up when clients search near you.", href: "/services/local-seo" },
  { icon: "megaphone", title: "Social Media", text: "Weekly reels and posts. You can shoot and let us edit, or have us post and answer DMs too.", href: "/services/social-media-newsletter" },
  { icon: "target", title: "Google & Meta Ads", text: "Campaigns built, run and tuned for consults. Your ad spend is billed directly by Google or Meta.", href: "/services/paid-advertising" },
  { icon: "chat", title: "Follow-Up & One Inbox", text: "Every call, form and message lands in one inbox, with automatic replies, reminders and win-back campaigns.", href: "/services/lead-management" },
  { icon: "calendar", title: "EMR Consultant", text: "Bookings, memberships and packages all live in your EMR. Your consultant helps you get more from it, with a monthly call and direct support." },
];

export const MEDSPA_DIFFERENCES = [
  { title: "Ad rules are stricter", text: "Google and Meta both limit how health and cosmetic services can be advertised, including how before-and-after images are used. We plan campaigns around those rules from the start." },
  { title: "Client information is sensitive", text: "Our Terms include a HIPAA Business Associate Addendum that applies when we handle protected health information on your behalf." },
  { title: "The EMR is where the money is tracked", text: "Bookings, memberships and packages live in your EMR, so your marketing and your EMR need to work together instead of being run by separate companies." },
  { title: "Trust decides the booking", text: "Clients research a provider before they book. Your reviews, photos and treatment pages have to answer their questions before they ever call." },
];

export const MEDSPA_COMPARE = [
  { label: "Pricing", them: "A custom quote after a sales call", us: "Published on this page, before you ever talk to us" },
  { label: "Contract", them: "Terms you learn about once you're in the sales process", us: "Month-to-month. Cancel anytime with no penalty." },
  { label: "Who you talk to", them: "An account team you meet after you sign", us: "Kelsey, our co-founder, from day one" },
  { label: "Your EMR", them: "Usually left to you and your staff", us: "An EMR consultant on your team, with a monthly call and direct support" },
];

export const MEDSPA_PRICING = {
  base: { name: "Website", price: "$397", text: "Custom site built, hosted and maintained, with one lead inbox and automatic follow-up." },
  baseNote: "Plus a one-time $399 build fee, waived when you add SEO, social or ads.",
  addons: [
    { name: "Local SEO & Google Profile", price: "+$297" },
    { name: "Content Crew (you shoot, we edit)", price: "+$297" },
    { name: "Ads Management", price: "+$497" },
    { name: "Full Service Social", price: "+$1,497" },
    { name: "EMR Consultant", price: "+$249" },
  ],
  note: "All prices are per month, and every plan is month-to-month. Ad spend is billed directly by Google or Meta. Your EMR consultant is added to any plan on your call with Kelsey.",
};

export const MEDSPA_STEPS = [
  { title: "Book a 15-minute call", text: "Tell us who you pay now and what's working. If we can't run it for less than you pay today, we'll tell you." },
  { title: "We take over", text: "Your new site goes live in 8 to 10 days, and we move everything over without anything going dark." },
  { title: "One bill, one check-in", text: "We run it every month and report on what matters. Kelsey is your point of contact." },
];

export const MEDSPA_CLIENTS = [
  { name: "D'Vash Aesthetics", logo: "/clients/dvash-aesthetics.png" },
  { name: "Glammed Up Aesthetics", logo: "/clients/glammed-up-aesthetics.png" },
  { name: "6 Day Medical Weight Loss", logo: "/clients/6-day-medical-weight-loss.png" },
  { name: "The Spa Business Coach", logo: "/clients/the-spa-business-coach.png" },
];

export const MEDSPA_FAQS = [
  { q: "What does a medspa marketing agency do?", a: "It brings in new clients and helps keep your schedule full. We build and host your website, manage your Google presence and SEO, produce social content, run Google and Meta ads, and handle follow-up so inquiries get answered." },
  { q: "Do you work with medspas outside Texas?", a: "Yes. We're based in Harlingen, Texas and work with practices across the U.S. Everything runs remotely. The monthly on-site shoot in full service social is for South Texas; everywhere else, your team films and we handle the rest." },
  { q: "How much does medspa marketing cost?", a: "Plans start at $397 a month, and you add only what you need, like SEO for $297, ads management for $497 or an EMR consultant for $249. Ad spend is billed directly by Google or Meta. Every price is listed on this page." },
  { q: "Is there a contract?", a: "No. Every plan is month-to-month. We earn the next month by doing the work this month." },
  { q: "What does an EMR consultant do for my practice?", a: "You get a monthly call to go over your account, plus direct support from our team when you need a change or something isn't working. It's $249 a month, added to any plan." },
  { q: "How long does medspa SEO take?", a: "Local SEO typically takes 60 to 90 days to show meaningful traction and keeps building from there. No honest agency can guarantee a specific ranking." },
  { q: "How do you handle client information?", a: "Our Terms include a HIPAA Business Associate Addendum that applies when we create, receive, maintain or transmit protected health information on your behalf." },
  { q: "Can I keep an agency I like?", a: "Of course. Pick only the pieces you need. If your social person is great, keep them and let us handle the website, Google and EMR." },
];
