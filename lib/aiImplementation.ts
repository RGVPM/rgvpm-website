import type { IconName } from "@/components/Icon";
import type { FaqItem, RelatedLink } from "@/lib/webDesign";

export const AI_BOOKING_URL =
  "https://api.rgvperformancemarketing.com/widget/bookings/ai-implementation-rgvpm";

/** The AI tools we build with and teach in 1-on-1 sessions. One list, used
 *  on the homepage, the AI page, and /learn-claude-code so they never drift. */
export const AI_TOOLS = ["Claude Code", "Codex", "Hermes", "Grok", "Orca", "Grokbot"] as const;

/** Shared, non-city content for the AI Implementation service + city pages. */

export const AI_IMPL = {
  eyebrow: "AI Consulting & Implementation",
  h1: "AI Consulting That Turns Into Real Systems",
  heroSub:
    "We run our own agency on AI. We'll show you where it fits in yours, build it for you, or sit down one-on-one and teach you to build it yourself: custom agents, custom tools, and AI that answers calls and follows up with every lead.",
  metaTitle: "AI Consulting & Implementation for Small Business",
  metaDescription:
    "AI consulting and builds for small and local businesses: 1-on-1 build sessions with Claude Code and Codex, custom AI agents and tools, AI strategy, AI receptionists and follow-up, and team AI workshops. Book an AI session with RGV Performance Marketing.",
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
    icon: "users",
    title: "Build With Me, 1-on-1",
    text: "Learn Claude Code, Codex, Hermes, Grok, Orca, and Grokbot by building a real tool for your own business, one-on-one.",
  },
  {
    icon: "cpu",
    title: "Custom AI Agents",
    text: "Agents that research, write, report, and run whole parts of your operation, built around your data and your tools.",
  },
  {
    icon: "wrench",
    title: "Custom Tools & Apps",
    text: "Internal tools, dashboards, and apps shipped in days, not months, with the same AI coding agents we teach.",
  },
  {
    icon: "target",
    title: "AI Strategy & Consulting",
    text: "We map how your leads come in and where your team's time goes, then show you where AI actually pays off. Plain answers, no hype.",
  },
  {
    icon: "phone",
    title: "AI Receptionist & Follow-Up",
    text: "Calls, chats, and new leads answered around the clock, with follow-up that keeps running on its own.",
  },
  {
    icon: "chart",
    title: "Team AI Workshops",
    text: "Hands-on workshops that get your whole team building with AI, around the workflows you actually run.",
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
    "Our AI work is for businesses that want AI doing real work, not just a chatbot on the website. It's a fit if you:",
  bullets: [
    "Want to learn to build your own AI tools, not just buy them",
    "Have a process your team repeats every week that AI could run",
    "Need a custom tool or agent that off-the-shelf software doesn't cover",
    "Miss calls and lose leads because nobody responds fast enough",
  ],
};

export const AI_FAQS: FaqItem[] = [
  {
    q: "Can you teach me to build with AI myself?",
    a: "Yes. In our one-on-one build sessions you learn Claude Code, Codex, and the other tools we use by building a real tool for your own business, from an empty folder to a live link. No coding background needed, and you keep everything you build. Teams can book workshops too.",
  },
  {
    q: "Do I need to be tech-savvy?",
    a: "Not at all. We handle the setup, the integrations, and the ongoing management — you just tell us how your business runs. Everything is built to be simple for you and your team to use day to day.",
  },
  {
    q: "What tools do you use?",
    a: "For building, we work with AI coding agents and models including Claude Code, Codex, Hermes, Grok, Orca, and Grokbot, and connect what we build to the software you already rely on. We pick the right tool for the job and your budget rather than forcing one system on you."
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
    href: "/learn-claude-code",
    title: "Learn Claude Code 1-on-1",
    text: "Build a real tool for your business with AI coding agents, with us beside you.",
    icon: "cpu",
  },
  {
    href: "/services/lead-management",
    title: "Lead Management",
    text: "The pipeline and automation that captures and converts every inquiry.",
    icon: "settings",
  },
  {
    href: "/services/website-design",
    title: "Website Design",
    text: "A fast, lead-capturing site to feed your automation stack.",
    icon: "target",
  },
];
