import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { ProviderTable, ProviderProfiles, NotAFit, QuestionsToAsk, TrademarkNote } from "@/components/ProviderComparison";
import { AS_LISTED } from "@/lib/comparisons";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, PLANS, BUILD_FEE, usd, planPrice, ORGANIZATION_ID } from "@/lib/site";

const path = "/med-spa-marketing-agency-pricing";
const url = canonical(path);
const title = "Med Spa Marketing Agency Pricing Compared";
const description =
  "What med spa marketing agencies charge, from the ones that publish prices: Growth99, DoctorLogic, Studio III Marketing, PatientGain and RGV Performance Marketing, with contract and ad spend terms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Med Spa Agency Pricing Compared", path },
];

const base = PLANS[0];
const ads = planPrice("Ads Management add-on");

const MODELS = [
  {
    title: "Flat monthly fee",
    text: "You pay a set amount each month for a defined scope. Easy to budget. Check what's included and whether the fee changes as you grow.",
  },
  {
    title: "Software subscription plus services",
    text: "You pay for a platform (messaging, automation, reporting) and the marketing work on top of it. Useful if you want the software too. Ask what happens to your data and site if you leave.",
  },
  {
    title: "Percentage of ad spend",
    text: "Some providers charge a share of what you spend on Google or Meta. The fee rises as your budget rises, so ask for the exact percentage and what it's calculated on.",
  },
  {
    title: "Custom quote",
    text: "Many agencies don't publish prices and quote after a call. That can make sense for complex practices, but it makes side-by-side comparison harder.",
  },
];

const faqs = [
  {
    q: "How much does a med spa marketing agency cost?",
    a: `It varies a lot, and many agencies don't publish prices. Of the providers on this page, PatientGain lists plans from $800 to $4,000 a month, with $1,600 to $4,000 a month on its med spa page. DoctorLogic's company facts page says it starts at $11,000 a year for a single-provider practice. Growth99 and Studio III Marketing do not publish prices (${AS_LISTED}). RGV Performance Marketing starts at ${usd(base.price)}/mo for the website, with add-ons on top.`,
  },
  {
    q: "Do med spa marketing agencies require contracts?",
    a: `Terms differ. PatientGain's pricing page shows a 12-month contract under its Competitive plan. DoctorLogic says its agreements last one year and renew automatically. Growth99 and Studio III Marketing don't state contract terms on the pages we checked (${AS_LISTED}). RGV Performance Marketing is month-to-month on every plan.`,
  },
  {
    q: "Is ad spend included in agency pricing?",
    a: `Usually not. Ad spend is normally paid to Google or Meta on top of the management fee. PatientGain's Growth plan lists an 18% fee for Google and Meta ads (${AS_LISTED}). At RGV Performance Marketing, Ads Management is a flat +${usd(ads)}/mo and Google and Meta bill your ad spend to you directly.`,
  },
  {
    q: "How much does RGV Performance Marketing cost?",
    a: `Every plan starts with the ${base.name} at ${usd(base.price)}/mo, which includes your website, hosting, one lead inbox and automatic text and email follow-up. Add-ons: ${PLANS.slice(1).map((p) => `${p.name.replace(" add-on", "")} +${usd(p.price)}/mo`).join(", ")}. The one-time ${usd(BUILD_FEE)} build fee is waived with any add-on, and there are no setup fees.`,
  },
  {
    q: "What should I ask before signing with a med spa marketing agency?",
    a: "Ask for the monthly price in writing, the contract length and cancellation cost, whether the ad fee is flat or a percentage, who owns the website and ad accounts if you leave, and who you'll talk to each month.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  url,
  name: title,
  description,
  publisher: { "@id": ORGANIZATION_ID },
  about: { "@type": "Thing", name: "Med spa marketing agency pricing" },
};

export default function MedSpaAgencyPricingPage() {
  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Med spa marketing pricing"
          title={title}
          subtitle="Most med spa marketing agencies quote after a sales call. Here's what five providers publish about price, contracts and ad spend, and how to compare them."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Side by side</span>
              <h2 className="rg-display rg-svc-h2">Published Prices and Terms</h2>
              <p className="rg-svc-body">
                Three of the five providers below publish prices. Where a company doesn&apos;t, the table says
                so instead of guessing.
              </p>
            </div>
            <ProviderTable caption="Med spa marketing agency pricing compared" />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Pricing models</span>
              <h2 className="rg-display rg-svc-h2">Four Ways Agencies Charge</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
              {MODELS.map((m) => (
                <div key={m.title} style={{ padding: "20px 0", borderTop: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{m.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Each provider</span>
              <h2 className="rg-display rg-svc-h2">What You Get for the Money</h2>
            </div>
            <ProviderProfiles />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Honest fit</span>
              <h2 className="rg-display rg-svc-h2">When RGVPM Is Not the Right Fit</h2>
              <p className="rg-svc-body">A low published price only helps if the service fits. Another option is likely better if:</p>
            </div>
            <NotAFit />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">Before you sign</span>
              <h2 className="rg-display rg-svc-h2">Questions to Ask Any Agency</h2>
            </div>
            <QuestionsToAsk />
            <p className="rg-svc-body" style={{ marginTop: 24 }}>
              New to this? Start with{" "}
              <Link href="/how-to-choose-a-med-spa-marketing-agency" className="rg-text-link">how to choose a med spa marketing agency</Link>. Looking at Growth99 specifically? See{" "}
              <Link href="/growth99-alternatives" className="rg-text-link">Growth99 alternatives for med spas</Link>. Our own prices are on{" "}
              <Link href="/pricing" className="rg-text-link">the pricing page</Link>, and our med spa services are on{" "}
              <Link href="/medspa-marketing" className="rg-text-link">medspa marketing</Link>.
            </p>
            <TrademarkNote />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Agency Pricing Questions</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <InnerCTA
          heading="See What You'd Actually Pay"
          text="Book fifteen minutes. We'll look at what you pay now and tell you plainly whether we'd save you money."
        />
      </main>
    </>
  );
}
