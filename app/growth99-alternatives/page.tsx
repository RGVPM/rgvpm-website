import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { ProviderTable, ProviderProfiles, NotAFit, QuestionsToAsk, TrademarkNote } from "@/components/ProviderComparison";
import { AS_LISTED } from "@/lib/comparisons";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, PLANS, BUILD_FEE, usd, ORGANIZATION_ID } from "@/lib/site";

const path = "/growth99-alternatives";
const url = canonical(path);
const title = "Growth99 Alternatives for Med Spas";
const description =
  "Growth99 alternatives for med spas compared: DoctorLogic, Studio III Marketing, PatientGain and RGV Performance Marketing. Models, published pricing and contract terms side by side.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "Growth99 Alternatives", path },
];

const base = PLANS[0];

const faqs = [
  {
    q: "What is Growth99?",
    a: "Growth99 describes itself as an all-in-one platform with customer relationship management and marketing automation for aesthetic and elective wellness practices. It pairs that software with marketing services like websites, SEO, paid ads and social graphics.",
  },
  {
    q: "How much does Growth99 cost?",
    a: `Growth99 does not publish plan prices. Its pricing page lists Essentials, Accelerator and Elite plans with pricing "available upon request" (${AS_LISTED}). You get a number after you talk to their team.`,
  },
  {
    q: "What are the main alternatives to Growth99 for med spas?",
    a: "It depends on what you want from Growth99. For a healthcare website and SEO system, DoctorLogic. For a large full-service aesthetics agency with in-house video, Studio III Marketing. For published package prices and marketing apps, PatientGain. For a small agency with published month-to-month pricing, RGV Performance Marketing.",
  },
  {
    q: "Is RGV Performance Marketing a software platform like Growth99?",
    a: "No. We are an AI & marketing agency. We build and run your website, Google profile, social, ads and lead follow-up, and every website comes with one lead inbox and automatic text and email follow-up. We don't sell practice-management software.",
  },
  {
    q: "How much does RGV Performance Marketing cost?",
    a: `Every plan starts with the ${base.name} at ${usd(base.price)}/mo. Add-ons go on top: ${PLANS.slice(1).map((p) => `${p.name.replace(" add-on", "")} +${usd(p.price)}/mo`).join(", ")}. The one-time ${usd(BUILD_FEE)} build fee is waived with any add-on. Everything is month-to-month.`,
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
  about: { "@type": "Thing", name: "Med spa marketing providers" },
};

export default function Growth99AlternativesPage() {
  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Med spa marketing compared"
          title={title}
          subtitle="Growth99 is a good fit for some practices. If you're weighing other options, here's how four of them work, what they publish about price, and who each one suits."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Short answer</span>
              <h2 className="rg-display rg-svc-h2">Pick by What You Want Most</h2>
              <p className="rg-svc-body">
                Growth99 combines practice software (messaging, automation, chatbot, intake tools) with marketing
                services. Most alternatives lean one way or the other. Some are platforms with services on top.
                Others are agencies that use their own tools behind the scenes. Decide which half matters more to
                you, then compare price and contract terms.
              </p>
            </div>
            <ProviderTable caption="Growth99 and alternatives compared" />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Each option</span>
              <h2 className="rg-display rg-svc-h2">How Each One Works</h2>
            </div>
            <ProviderProfiles />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Honest fit</span>
              <h2 className="rg-display rg-svc-h2">When RGVPM Is Not the Right Fit</h2>
              <p className="rg-svc-body">We would rather you pick the right partner than the wrong one. Another option is likely better if:</p>
            </div>
            <NotAFit />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">Before you sign</span>
              <h2 className="rg-display rg-svc-h2">Questions to Ask Any Provider</h2>
            </div>
            <QuestionsToAsk />
            <p className="rg-svc-body" style={{ marginTop: 24 }}>
              Want the cost side in more detail? Read{" "}
              <Link href="/med-spa-marketing-agency-pricing" className="rg-text-link">med spa marketing agency pricing compared</Link>, or see{" "}
              <Link href="/pricing" className="rg-text-link">our full price list</Link>.
            </p>
            <TrademarkNote />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Growth99 Alternatives: Questions</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <InnerCTA
          heading="Want a Second Opinion?"
          text="Book fifteen minutes. Tell us what you use now and what you pay, and we'll tell you honestly whether we'd be a better fit."
        />
      </main>
    </>
  );
}
