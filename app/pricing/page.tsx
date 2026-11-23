import type { Metadata } from "next";
import Link from "next/link";
import PricingPlans from "@/components/PricingPlans";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, faqSchema, pricingSchema, SITE, socialMeta, PLANS, BUILD_FEE, PRICING_TERMS, planPrice, usd } from "@/lib/site";
import { esAlternates } from "@/lib/es";

const url = canonical("/pricing");

export const metadata: Metadata = {
  title: "Med Spa Marketing Pricing & Plans",
  description:
    `Published pricing for med spas and aesthetic practices, from an AI & marketing agency based in Harlingen, Texas, serving practices nationwide. Month-to-month plans from ${usd(PLANS[0].price)}/mo, including a custom website and lead follow-up. No long-term contracts, no setup fees.`,
  alternates: { canonical: url, languages: esAlternates("/pricing") },
  ...socialMeta({
    url,
    title: `Pricing & Plans | ${SITE.name}`,
    description:
      `Month-to-month plans from ${usd(PLANS[0].price)}/mo. Published pricing, no contracts, no setup fees.`,
  }),
};

const base = PLANS[0];
const seo = planPrice("Local SEO & Google Profile add-on");
const crew = planPrice("Content Crew add-on");
const social = planPrice("Full Service Social add-on");
const ads = planPrice("Ads Management add-on");
const addons = PLANS.slice(1);

// Every number below comes from PLANS / BUILD_FEE in lib/site.ts.
const pricingFaqs = [
  {
    q: "How much does RGV Performance Marketing cost?",
    a: `Every plan starts with the ${base.name}, ${usd(base.price)}/mo, which includes your custom website, hosting, one lead inbox and automatic text and email follow-up. Add-ons go on top: Local SEO & Google Profile (+${usd(seo)}/mo), Content Crew (+${usd(crew)}/mo), Full Service Social (+${usd(social)}/mo) and Ads Management (+${usd(ads)}/mo). Everything is month-to-month.`,
  },
  {
    q: "How does your pricing work?",
    a: `You start with a website: Plant the Flag, ${usd(base.price)}/mo. It includes your lead inbox and automatic follow-up by text and email. From there you add only the jobs you want handed off: Local SEO & Google Profile (${usd(seo)}/mo), Content Crew (${usd(crew)}/mo) or Full Service Social (${usd(social)}/mo), and Ads Management (${usd(ads)}/mo).`,
  },
  {
    q: "Is text and email follow-up included?",
    a: "Yes, with every website. Leads from calls, forms and chats land in one inbox, and follow-up runs on its own: missed-call text back, email and text campaigns, and appointment reminders. No add-on needed.",
  },
  {
    q: "Are there contracts?",
    a: `No. All plans and add-ons are month-to-month. We believe in earning your business every month, not locking you in. The only upfront cost is a one-time ${usd(BUILD_FEE)} build fee if you get the website on its own, and it's waived as soon as you add anything else.`,
  },
  {
    q: "Is there a build fee?",
    a: `Only if you get the website on its own: a one-time ${usd(BUILD_FEE)} build fee that covers designing and building your site. Add any add-on and the build fee is waived. There are no setup or activation fees on anything.`,
  },
  {
    q: "Is ad spend included?",
    a: "No. The Ads Management add-on covers building and running your campaigns, but you fund the ad spend: Google and Meta bill you directly, and we manage every dollar of it.",
  },
  {
    q: "I'm on Build the Machine or Own the Market. Does anything change?",
    a: "No. We no longer offer those bundles to new clients, but your plan and your price stay the same.",
  },
  {
    q: "Can I add or drop add-ons later?",
    a: "Yes. Because everything is month-to-month, you can add or drop an add-on as your needs change. Many clients start with the website to get a lead system in place, then add SEO or content when they're ready to grow.",
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
          subtitle="Start with a website and add only the jobs you want handed off. Month-to-month, no long-term contracts and no hidden fees."
          crumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
        >
          <ul className="rg-about-proof">
            <li>From {usd(PLANS[0].price)}/mo</li>
            <li>No contracts</li>
            <li>$0 build fee with any add-on</li>
            <li>Ad spend billed by Google &amp; Meta</li>
          </ul>
        </PageHero>
        <PricingPlans />

        {/* Plain price list: server-rendered from PLANS so crawlers and AI answer engines can read it. */}
        <section aria-labelledby="price-list-heading" className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
              <span className="rg-pill">Price list</span>
              <h2 id="price-list-heading" className="rg-display rg-svc-h2">Every Price, In One Place</h2>
              <p className="rg-svc-body">
                {SITE.name} pricing as of today, in U.S. dollars. One website base, plus any add-ons you want.
              </p>
            </div>
            <div className="rg-compare">
              <table>
                <caption className="sr-only">{SITE.name} monthly pricing</caption>
                <thead>
                  <tr>
                    <th scope="col">Plan or add-on</th>
                    <th scope="col">Price</th>
                    <th scope="col">What it includes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{PLANS[0].name}</th>
                    <td>{usd(PLANS[0].price)}/mo</td>
                    <td style={{ textAlign: "left" }}>{PLANS[0].description}</td>
                  </tr>
                  {addons.map((p) => (
                    <tr key={p.name}>
                      <th scope="row">{p.name}</th>
                      <td>+{usd(p.price)}/mo</td>
                      <td style={{ textAlign: "left" }}>{p.description}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Build fee (website alone)</th>
                    <td>{usd(BUILD_FEE)} one time</td>
                    <td style={{ textAlign: "left" }}>Waived when you add any add-on.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="rg-svc-body" style={{ textAlign: "center", marginTop: "var(--s6)" }}>
              Comparing agencies?{" "}
              <Link href="/med-spa-marketing-agency-pricing" className="rg-text-link">See med spa marketing agency pricing compared</Link>.
            </p>
            <ul className="rg-values" style={{ maxWidth: 820, margin: "var(--s7) auto 0" }}>
              {PRICING_TERMS.map((t) => (
                <li key={t}>
                  <span className="rg-handled-check" aria-hidden="true">✓</span>
                  <div>
                    <p>{t}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ padding: "88px 0", background: "#fff" }}>
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
