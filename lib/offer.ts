/**
 * ─────────────────────────────────────────────────────────────────────────
 *  $0-UPFRONT WEBSITE OFFER — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Everything the /website-offer landing page says about price, plans,
 *  turnaround, tracking and legal terms lives in this one file. The page
 *  components read from here and hold no copy of their own beyond layout
 *  and section headings, so the offer can be re-priced, re-termed or
 *  attorney-reviewed without touching JSX.
 *
 *  ┌── OWNER CHECKLIST — the four things to fill in before running traffic ──┐
 *  │ 1. OFFER.stripe.websiteCrm / growthSeo → paste the two Stripe payment  │
 *  │    links. Until then both buttons fall back to the booking calendar.   │
 *  │ 2. TRACKING.metaPixelId → paste the Meta Pixel ID. Empty = no pixel    │
 *  │    code renders at all (no broken tag, no console noise).              │
 *  │ 3. In Stripe, set each payment link's success URL to                   │
 *  │      https://rgvperformancemarketing.com/website-offer/thank-you       │
 *  │        ?plan=website-crm      (or ?plan=growth-seo)                    │
 *  │    That page fires the Meta `Purchase` event.                          │
 *  │ 4. OFFER_FAQS now carries every disclaimer on the page (the standalone │
 *  │    terms section was removed). Attorney-reviewed wording goes there    │
 *  │    and in AGREEMENT_LINE, which sits under the pricing cards.          │
 *  └────────────────────────────────────────────────────────────────────────┘
 */

import { SITE } from "@/lib/site";

/* ── Tracking ─────────────────────────────────────────────────────────────
   Meta Pixel is opt-in by ID. No ID, no <script> — see components/offer/
   MetaPixel.tsx. GA4 (G-4G6Y27NLZ4) is already installed site-wide in
   app/layout.tsx and is left untouched; the helper in lib/track.ts mirrors
   each conversion event into gtag as well.                                */
export const TRACKING = {
  /** TODO(owner): paste the Meta Pixel ID, e.g. "1234567890123456". */
  metaPixelId: "",
  /** Standard events this page fires. Names match Meta's spec exactly. */
  events: {
    pageView: "PageView",
    viewContent: "ViewContent",
    initiateCheckout: "InitiateCheckout",
    purchase: "Purchase",
    lead: "Lead",
  },
} as const;

/* ── Destinations ─────────────────────────────────────────────────────── */
export const OFFER_LINKS = {
  /**
   * TODO(owner): paste the two Stripe payment links.
   * Empty string = the CTA routes to the booking calendar instead, so the
   * page never ships a dead or invented checkout URL.
   */
  stripe: {
    websiteCrm: "",
    growthSeo: "",
  },
  /** Real, live GHL booking widget — already used across the site. */
  booking: SITE.bookingUrl,
  phone: SITE.phone,
  phoneHuman: SITE.phoneHuman,
  /** Same number, opened in the messaging app. Used wherever the page says
   *  "text" rather than "call" — a link labelled Text that fires the dialer
   *  is a dead end on mobile. */
  sms: `sms:${SITE.phone}`,
} as const;

/** Resolves a plan's checkout destination, falling back to the calendar. */
export function checkoutHref(planId: PlanId): string {
  const link =
    planId === "website-crm" ? OFFER_LINKS.stripe.websiteCrm : OFFER_LINKS.stripe.growthSeo;
  return link || OFFER_LINKS.booking;
}

/* ── Plans ────────────────────────────────────────────────────────────── */
export type PlanId = "website-crm" | "growth-seo";

export interface FeatureGroup {
  title: string;
  items: string[];
}

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  /** Rendered as the "MOST POPULAR" ribbon and the visually dominant card. */
  featured?: boolean;
  /** One-line summary of what this tier buys you, used in the comparison row. */
  outcome: string;
  inherits?: string;
  groups: FeatureGroup[];
  ctaLabel: string;
}

export const PLANS: Plan[] = [
  {
    id: "website-crm",
    name: "Website + CRM",
    price: 299,
    cadence: "/month",
    tagline: "Your complete website and lead-capture system.",
    outcome: "Capture & manage your opportunities",
    groups: [
      {
        title: "The Website",
        items: [
          "Professionally designed website",
          "Responsive mobile design",
          "Website hosting",
          "SSL / security",
          "Website maintenance",
          "Unlimited standard website updates*",
          "Website backups",
        ],
      },
      {
        title: "Lead Capture",
        items: [
          "Website lead-capture forms",
          "Website chatbot",
          "Website leads automatically added to CRM",
          "Instant new-lead notifications",
          "Lead source tracking",
        ],
      },
      {
        title: "CRM & Follow-Up",
        items: [
          "CRM / lead management system",
          "Contact database",
          "Sales pipeline",
          "Central conversation inbox",
          "Email follow-up capabilities*",
          "SMS follow-up capabilities*",
          "Appointment / calendar integration",
          "Mobile CRM access",
          "Ongoing RGVPM support",
        ],
      },
    ],
    ctaLabel: "Start My Website — $299/mo",
  },
  {
    id: "growth-seo",
    name: "Growth + SEO",
    price: 549,
    cadence: "/month",
    tagline: "Turn your website into a lead catcher — then help more customers find it.",
    featured: true,
    outcome: "Capture opportunities + improve organic visibility",
    inherits: "Everything in Website + CRM, plus:",
    groups: [
      {
        title: "Search Foundations",
        items: [
          "Local SEO",
          "On-page SEO",
          "Technical SEO",
          "Google Business Profile optimization",
          "Website SEO improvements",
          "Local search optimization",
        ],
      },
      {
        title: "Strategy & Reporting",
        items: [
          "Keyword research & strategy",
          "Competitor research",
          "SEO-focused content",
          "Search performance monitoring",
          "Monthly SEO reporting",
          "Ongoing search optimization",
        ],
      },
    ],
    ctaLabel: "Grow My Business — $549/mo",
  },
];

export const planById = (id: PlanId): Plan => PLANS.find((p) => p.id === id)!;

/* ── Offer framing ────────────────────────────────────────────────────── */
export const OFFER = {
  /** Anchor price. Deliberately phrased as a general market range, not a
   *  claim about any named competitor. */
  anchorLabel: "Typical website build",
  anchorPrice: "$3,500+",
  buildFee: "$0",
  turnaround: "8–10 business days",
  agreementMonths: 12,
} as const;

/* ── The lead journey (positioning section) ───────────────────────────── */
export const LEAD_FLOW = [
  { step: "Website Visitor", note: "Someone finds you and lands on your site." },
  { step: "Form or Chat", note: "They ask a question or request a quote." },
  { step: "Added to CRM", note: "The inquiry is created as a contact automatically." },
  { step: "Instant Notification", note: "You know about it right away — not tomorrow." },
  { step: "Follow-Up", note: "Reply by email or text from one inbox." },
  { step: "Appointment / Customer", note: "The opportunity moves down your pipeline." },
] as const;

/* ── Why RGVPM ────────────────────────────────────────────────────────── */
export const PILLARS = [
  { title: "Website", text: "Designed to turn visitors into inquiries." },
  { title: "CRM", text: "Keep every lead and conversation organized." },
  { title: "Lead Capture", text: "Forms and chat feed directly into your system." },
  { title: "Automation", text: "Follow up faster without manually chasing every inquiry." },
  { title: "Support", text: "Real ongoing website management and updates." },
  { title: "SEO", text: "Optional ongoing strategy to improve organic visibility." },
] as const;

/** The tool sprawl the bundle replaces. Stated as a general pattern, not a
 *  claim about what any particular reader is paying today. */
export const SCATTERED = [
  "Website",
  "Hosting",
  "Forms",
  "Chat",
  "CRM",
  "Lead tracking",
  "Maintenance",
  "SEO",
  "Support",
] as const;

/* ── How it works ─────────────────────────────────────────────────────── */
export const STEPS = [
  {
    num: "01",
    title: "Choose Your Plan",
    text: "Select Website + CRM or Growth + SEO.",
  },
  {
    num: "02",
    title: "Tell Us About Your Business",
    text: "Complete the onboarding process and provide your branding, content, photos and business information.",
  },
  {
    num: "03",
    title: "We Build",
    text: "RGVPM designs and develops your new website.",
  },
  {
    num: "04",
    title: "Go Live",
    text: "After client materials, approvals, and required access are received, most standard projects are targeted for launch within 8–10 business days*.",
  },
  {
    num: "05",
    title: "We Keep Working",
    text: "We continue maintaining your website, CRM and applicable SEO services throughout your plan.",
  },
] as const;

/* ── FAQ ──────────────────────────────────────────────────────────────────
   Also feeds the FAQPage JSON-LD on the route, so the two can never drift. */
export const OFFER_FAQS: { q: string; a: string }[] = [
  {
    q: "Is the website really free?",
    a: "The standard website build fee is waived when you enroll in a qualifying 12-month RGVPM Website + CRM or Growth + SEO plan. Your selected monthly service fee remains due throughout the agreement.",
  },
  {
    q: "How long does my website take?",
    a: "Most standard websites are targeted for completion within 8–10 business days after we receive all required materials, credentials, content, feedback and approvals. More complex projects may require additional time.",
  },
  {
    q: "Do I have to sign a contract?",
    a: "Yes. The $0 upfront website offer requires a 12-month service agreement.",
  },
  {
    // TODO(owner): this answer is intentionally neutral and light on
    // specifics. Replace it with your final renewal wording once the
    // service agreement is settled — nothing else on the page depends on it.
    q: "What happens after 12 months?",
    a: "Near the end of the initial 12-month term we'll reach out to review your plan with you and discuss how you'd like to continue. Renewal, continuation and cancellation terms are set out in your RGVPM service agreement.",
  },
  {
    q: "What does “unlimited updates” mean?",
    a: "Unlimited standard updates apply to reasonable modifications to the existing website, including text, images, hours, staff, services and similar content updates. New pages, redesigns, custom applications, advanced functionality, integrations, e-commerce development or significant scope changes may require additional fees.",
  },
  {
    q: "Does the $299 plan include a CRM?",
    a: "Yes. The Website + CRM plan includes lead management tools designed to help organize website inquiries, contacts, conversations and opportunities.",
  },
  {
    q: "Does the CRM include texting and email?",
    a: "Email and SMS follow-up capabilities are included in both plans. Certain communication services, phone numbers, SMS and email usage, AI features and third-party integrations may carry usage-based costs or limits. Included usage and applicable rates are disclosed during onboarding or in the applicable service agreement.",
  },
  {
    q: "Does SEO guarantee I'll rank #1?",
    a: "No. No legitimate SEO provider can guarantee a specific ranking. SEO is an ongoing process focused on improving website quality, relevance, local visibility and organic search performance.",
  },
  {
    q: "Can I sell products online?",
    a: "E-commerce and advanced development fall outside the standard website scope and require a custom quote. Tell us what you're planning and we'll price it before any work starts.",
  },
];

/** Short version of the agreement disclaimer, shown directly under pricing. */
export const AGREEMENT_LINE =
  "Website build fee is waived with enrollment in a qualifying 12-month RGVPM service agreement. Monthly service fees remain applicable throughout the agreement term.";
