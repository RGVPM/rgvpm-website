import type { Metadata } from "next";
import PricingTabs from "@/components/PricingTabs";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, faqSchema, pricingSchema, SITE, socialMeta } from "@/lib/site";

const url = canonical("/pricing");

export const metadata: Metadata = {
  title: "Pricing & Plans — Digital Marketing for Local Business",
  description:
    "Simple, transparent digital marketing pricing. Month-to-month plans from $397/mo, including a custom website and lead management. No long-term contracts, no hidden fees.",
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `Pricing & Plans | ${SITE.name}`,
    description:
      "Month-to-month plans from $397/mo. Transparent pricing, no contracts, no hidden fees.",
  }),
};

const pricingFaqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. All plans are month-to-month. We believe in earning your business every month, not locking you in. The only upfront costs are the one-time $499 build fee on Plant the Flag and the SEO Package, and the one-time activation fee on Build the Machine, which covers onboarding, setup, and getting everything configured.",
  },
  {
    q: "Is website design included in the price?",
    a: "Yes, on Plant the Flag and the SEO Package. Both include a custom website we build, host, and keep updated, for a one-time $499 build fee. Build the Machine and Own the Market are marketing plans; if you need a new site on one of those, we quote it separately based on what you need.",
  },
  {
    q: "What is the activation fee?",
    a: "Build the Machine includes a one-time $399 activation fee that covers onboarding, account setup, and configuring your systems. Own the Market has no activation fee. Plant the Flag and the SEO Package have a one-time $499 build fee instead. After activation, you simply pay the flat monthly rate.",
  },
  {
    q: "Does ad spend come out of the monthly fee?",
    a: "No. On Build the Machine and Own the Market, ad management is included, but you fund the ad spend: Google and Meta bill you directly, and we manage the campaigns. Plant the Flag and the SEO Package do not include ads.",
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
          pricingSchema(),
        ]}
      />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Digital marketing pricing & plans"
          title={
            <>
              A Whole Marketing Team.
              <br />
              <span style={{ color: "var(--navy)" }}>For Less Than One Hire.</span>
            </>
          }
          subtitle="Websites, Google, ads, follow-up and content, done for you, month-to-month. Transparent pricing, no long-term contracts and no hidden fees."
          crumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
        >
          <ul className="rg-about-proof">
            <li>From $397/mo</li>
            <li>No contracts</li>
            <li>Ad spend billed by Google &amp; Meta</li>
          </ul>
        </PageHero>
        <PricingTabs />

        <section style={{ padding: "88px 0", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
              <span className="rg-pill">Pricing FAQ</span>
              <h2 className="rg-display rg-svc-h2">Questions About Pricing</h2>
            </div>
            <FaqAccordion items={pricingFaqs} />
          </div>
        </section>

        <InnerCTA heading="Not Sure Which Plan?" text="Book a quick call. We'll look at where leads are slipping and tell you which plan fits, with no pressure to buy." hidePricingLink />
      </main>
    </>
  );
}
