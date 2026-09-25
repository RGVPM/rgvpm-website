import type { IconName } from "@/components/Icon";
import type { FaqItem, RelatedLink } from "@/lib/webDesign";

export const AI_BOOKING_URL =
  "https://api.rgvperformancemarketing.com/widget/bookings/ai-implementation-rgvpm";

/** Shared, non-city content for the AI Implementation service + city pages. */

export const AI_IMPL = {
  eyebrow: "AI Consulting & Implementation",
  h1: "AI Consulting That Turns Into Real Systems",
  heroSub:
    "We run our own agency on AI, and we'll show you exactly where it fits in yours. Then we build it: AI that answers your calls, follows up with every lead, and takes the repetitive work off your team.",
  metaTitle: "AI Consulting & Implementation for Small Business",
  metaDescription:
    "AI consulting and implementation for small and local businesses: AI strategy, AI receptionists, automated lead follow-up, chatbots, workflow automation, and team training. Book an AI strategy call with RGV Performance Marketing.",
  primaryKeyword: "AI implementation for small business",
  keywordCluster: [
    "AI implementation for small business",
    "AI consulting services",
    "AI consultant for small business",
    "business automation",
    "AI tools for local business",
    "marketing automation",
  ],
};

export const AI_WHAT_WE_DO: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "AI Strategy & Consulting",
    text: "We map how your leads come in and where your team's time goes, then show you where AI actually pays off. Plain answers, no hype.",
  },
  {
    icon: "phone",
    title: "AI Voice Receptionist",
    text: "Answers your calls, qualifies leads, and books appointments around the clock, so you never miss an opportunity, even after hours.",
  },
  {
    icon: "chat",
    title: "Automated Lead Follow-Up",
    text: "Text and email sequences triggered the moment a lead comes in, so prospects hear from you while interest is highest.",
  },
  {
    icon: "cpu",
    title: "Chatbots for Web & Social",
    text: "Answer questions and capture leads automatically on your website and in your social media DMs.",
  },
  {
    icon: "wrench",
    title: "Workflow Automation & Custom Builds",
    text: "Connect the tools you already use and automate the repetitive work. Have a process that's uniquely yours? We design and build around it.",
  },
  {
    icon: "users",
    title: "AI Training for Your Team",
    text: "Hands-on sessions that get your people using AI tools with confidence, so the gains don't stop at what we build.",
  },
];

export const AI_STEPS: { title: string; text: string }[] = [
  {
    title: "Consult & Audit",
    text: "We sit down with you, map how leads come in and where time gets lost, and pick the few places where AI will actually move the needle.",
  },
  {
    title: "Build the Automation Stack",
    text: "We implement the AI tools and automations that fit your business and connect them to the software you already use.",
  },
  {
    title: "Monitor & Optimize",
    text: "We watch performance, refine the workflows, and expand your automation as your business grows and new opportunities appear.",
  },
];

export const AI_WHO = {
  heading: "Who it's for",
  intro:
    "AI implementation is built for local businesses losing time and leads to manual work. It's a fit if you:",
  bullets: [
    "Spend too much time on manual follow-up and day-to-day admin",
    "Miss calls — and lose the leads that come with them",
    "Lose business because nobody responds to inquiries fast enough",
    "Repeat the same tasks every day that a system could handle for you",
  ],
};

export const AI_FAQS: FaqItem[] = [
  {
    q: "Do I need to be tech-savvy?",
    a: "Not at all. We handle the setup, the integrations, and the ongoing management — you just tell us how your business runs. Everything is built to be simple for you and your team to use day to day.",
  },
  {
    q: "What tools do you use?",
    a: "We work with leading AI and automation platforms and connect them to the software you already rely on. Rather than forcing one rigid system on you, we recommend the right stack for your business and your budget.",
  },
  {
    q: "How long does implementation take?",
    a: "Most automations are live within one to three weeks, depending on scope and complexity. We start with the highest-impact wins — like instant lead follow-up and missed-call capture — so you see results quickly, then expand from there.",
  },
  {
    q: "Will this work with my existing software?",
    a: "In most cases, yes. We integrate with your existing lead management software, calendars, scheduling tools, forms, and lead sources so your automation fits into how you already work instead of replacing everything you have.",
  },
  {
    q: "What's the ROI on AI automation?",
    a: "Most clients see a return through leads that would have been missed, faster response times that win more business, and hours of repetitive work saved every week. We focus on automations tied directly to revenue and time saved — and we'll be honest about what's worth automating and what isn't.",
  },
];

export const AI_RELATED: RelatedLink[] = [
  {
    href: "/services/lead-management",
    title: "Lead Management",
    text: "The pipeline and automation that captures and converts every inquiry.",
    icon: "settings",
  },
  {
    href: "/services/sms-email-marketing",
    title: "SMS & Email Marketing",
    text: "Two-way conversations, broadcasts, and automated follow-up that fuel your automations.",
    icon: "chat",
  },
  {
    href: "/services/website-design",
    title: "Website Design",
    text: "A fast, lead-capturing site to feed your automation stack.",
    icon: "target",
  },
];
