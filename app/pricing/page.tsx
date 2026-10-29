import type { Metadata } from "next";
import PricingPlans from "@/components/PricingPlans";
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
    q: "How does your pricing work?",
    a: "Every plan starts with a website: Plant the Flag, $397/mo with no build fee. It includes your lead inbox and automatic follow-up by text and email. From there you add only the jobs you want handed off: Local SEO & Google Profile ($397/mo), Content Crew ($647/mo) or Full Service Social ($1,497/mo), and Ads Management ($497/mo). Or pick a bundle: Build the Machine ($997/mo) or Own the Market ($2,497/mo), which cost less than the same pieces bought separately.",
  },
  {
    q: "Is text and email follow-up included?",
    a: "Yes, with every website. Leads from calls, forms and chats land in one inbox, and follow-up runs on its own: missed-call text back, email and text campaigns, and appointment reminders. No add-on needed.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. All plans and add-ons are month-to-month. We believe in earning your business every month, not locking you in. There's no build fee, no setup fee and no activation fee. You just pay the monthly price.",
  },
  {
    q: "Are there any setup or activation fees?",
    a: "No. There's no build fee, setup fee or activation fee on any plan, including the website. You pay the flat monthly rate and that's it.",
  },
  {
    q: "What do the bundles save me?",
    a: "Build the Machine is your website, Local SEO & Google Profile and Content Crew. Bought separately that's $1,441/mo; bundled it's $997/mo, a $444 monthly saving. Own the Market adds Full Service Social, ads on Google and Meta and a dedicated strategist for $2,497/mo, about $291 less than the pieces on their own.",
  },
  {
    q: "Does ad spend come out of the monthly fee?",
    a: "No. The Ads Management add-on and Own the Market cover running your campaigns, but you fund the ad spend: Google and Meta bill you directly, and we manage every dollar of it.",
  },
  {
    q: "Can I add or drop add-ons later?",
    a: "Yes. Because everything is month-to-month, you can add or drop an add-on, or move to a bundle, as your needs change. Many clients start with the website to get a lead system in place, then add SEO or content when they're ready to grow.",
  },
  {
    q: "Can I get social media without a website from you?",
    a: "Yes. Content Crew and Full Service Social also work on their own, so you can keep your current website and just hand off your social media.",
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
          subtitle="Start with a website, add the jobs you want handed off, or bundle and save. Month-to-month, no long-term contracts and no hidden fees."
          crumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
        >
          <ul className="rg-about-proof">
            <li>From $397/mo</li>
            <li>No contracts</li>
            <li>No setup fees</li>
            <li>Ad spend billed by Google &amp; Meta</li>
          </ul>
        </PageHero>
        <PricingPlans />

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
