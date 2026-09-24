import type { Metadata } from "next";
import PricingTabs from "@/components/PricingTabs";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, faqSchema, SITE } from "@/lib/site";

const url = canonical("/pricing");

export const metadata: Metadata = {
  title: "Pricing & Plans — Digital Marketing for Local Business",
  description:
    "Simple, transparent digital marketing pricing. Month-to-month plans from $397/mo, including a custom website and lead management. No long-term contracts, no hidden fees.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Pricing & Plans | ${SITE.name}`,
    description:
      "Month-to-month plans from $397/mo. Transparent pricing, no contracts, no hidden fees.",
    siteName: SITE.name,
  },
};

const pricingFaqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. All plans are month-to-month. We believe in earning your business every month, not locking you in. The only upfront cost anywhere is the one-time activation fee on Build the Machine, which covers onboarding, setup, and getting everything configured.",
  },
  {
    q: "Is website design included in the price?",
    a: "Yes, on Plant the Flag and the SEO Package. Both include a custom website we build, host, and keep updated, with no separate build fee. Build the Machine and Own the Market are marketing plans; if you need a new site on one of those, we quote it separately based on what you need.",
  },
  {
    q: "What is the activation fee?",
    a: "Build the Machine includes a one-time $399 activation fee that covers onboarding, account setup, and configuring your systems. Plant the Flag, the SEO Package, and Own the Market have no activation fee. After activation, you simply pay the flat monthly rate.",
  },
  {
    q: "Does ad spend come out of the monthly fee?",
    a: "On Build the Machine, ad management is included, but you fund the ad spend — Google and Meta bill you directly, and we manage the campaigns. Plant the Flag and the SEO Package do not include ads. On Own the Market, $750/mo ad spend is included; any spend above that is billed separately by the platforms (you fund the overage).",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. Because every plan is month-to-month, you can move up or down as your needs change. Many clients start with Plant the Flag to get a website and lead system in place, then add the SEO Package or a marketing plan as they're ready to scale.",
  },
  {
    q: "Which plan is right for my business?",
    a: "Plant the Flag is ideal if you need a website that catches leads and one inbox to manage them. The SEO Package adds Google Business Profile and local SEO work so more of the right people find you. Build the Machine adds ads, automation, and social content for businesses ready to actively grow. Own the Market is full-service execution with a dedicated strategist. If you're unsure, contact us and we'll recommend the right fit.",
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
        {/* flow-root keeps the breadcrumb's bottom margin inside this navy band; without it the margin collapsed through and showed a cream stripe. */}
        <div style={{ background: "#0f1c33", paddingTop: 100, display: "flow-root" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} dark inHero />
          </div>
        </div>
        <PricingTabs />

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
