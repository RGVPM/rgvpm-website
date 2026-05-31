import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, faqSchema, SITE } from "@/lib/site";

const url = canonical("/pricing");

export const metadata: Metadata = {
  title: "Pricing & Plans — Digital Marketing for Local Business",
  description:
    "Simple, transparent digital marketing pricing. Three month-to-month plans from $399/mo. No long-term contracts, no hidden fees. Website design available separately.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Pricing & Plans | ${SITE.name}`,
    description:
      "Three simple, month-to-month plans from $399/mo. Transparent pricing, no contracts, no hidden fees.",
    siteName: SITE.name,
  },
};

const pricingFaqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. All plans are month-to-month. We believe in earning your business every month — not locking you in. The only upfront cost is the one-time activation fee on Plant the Flag and Build the Machine, which covers onboarding, setup, and getting everything configured.",
  },
  {
    q: "Is website design included in the price?",
    a: "Website design is a separate service on all plans — not bundled into the monthly fee. This keeps plan pricing clean and means you're not paying for a website rebuild every month. We quote your site separately based on what you need, and it integrates with whichever plan you're on.",
  },
  {
    q: "What is the activation fee?",
    a: "Plant the Flag and Build the Machine include a one-time $399 activation fee that covers onboarding, account setup, and configuring your systems. Own the Market has no activation fee. After activation, you simply pay the flat monthly rate.",
  },
  {
    q: "Does ad spend come out of the monthly fee?",
    a: "No. Ad management is included in your plan, but the actual spend — what you pay Google or Meta to run your ads — is a separate budget billed directly to you by the platform. We help you set the right budget and manage every dollar of it; you fund the account.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. Because every plan is month-to-month, you can move up or down as your needs change. Many clients start with Plant the Flag to lock in their foundation, then upgrade to Build the Machine or Own the Market as they're ready to scale.",
  },
  {
    q: "Which plan is right for my business?",
    a: "Plant the Flag is ideal if you need to get found and stay in front of existing customers. Build the Machine adds SEO, ads, and lead automation for businesses ready to actively grow. Own the Market is full-service execution with a dedicated strategist. If you're unsure, contact us and we'll recommend the right fit.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          faqSchema(pricingFaqs),
        ]}
      />
      <main>
        <div style={{ background: "var(--navy)", paddingTop: 100 }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} dark inHero />
          </div>
        </div>
        <Pricing asPage />

        <section style={{ padding: "88px 0", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
              <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
                Pricing FAQ
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
                Questions About Pricing
              </h2>
            </div>
            <FaqAccordion items={pricingFaqs} />
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
