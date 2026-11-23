import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import AiRecommendChecker from "@/components/AiRecommendChecker";
import { enabledEngines, ENGINE_LABEL, TOOL_PATH } from "@/lib/aiRecommend/config";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, ORGANIZATION_ID } from "@/lib/site";

const path = TOOL_PATH;
const url = canonical(path);
const title = "Does ChatGPT Recommend Your Med Spa? Free Check";
const description =
  "Free tool for med spa owners. We ask ChatGPT and Perplexity the questions local patients ask, then show if your med spa gets named, who does, and why. From the makers of ScanRank.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "Does ChatGPT Recommend Your Med Spa?", path },
];

const faqs = [
  {
    q: "Does ChatGPT recommend med spas?",
    a: "Yes. When someone asks ChatGPT for the best med spa or the best place for Botox in their city, it searches the web and names a few local spas. This tool shows you if yours is one of them.",
  },
  {
    q: "How does this check work?",
    a: "You enter your spa name, city and state. We ask ChatGPT and Perplexity 3 questions a local patient would ask. Then we look for your spa in each answer and show you who got named instead.",
  },
  {
    q: "Why do my results change when I run it again?",
    a: "AI answers change from day to day. They can also change based on who is asking and where. So treat your result as a snapshot. Checking once a month is a good way to see a trend.",
  },
  {
    q: "Why does AI recommend other med spas and not mine?",
    a: "AI tools name spas they can find and trust. That usually means lots of good reviews, a clear website that names your treatments and city, matching listings on Google and other sites, and schema code on your site.",
  },
  {
    q: "Can I pay to show up in ChatGPT answers?",
    a: "No. There is no way to buy a spot in these answers. You earn it with reviews, a clear website, good listings and mentions on other sites. That is the work we do for med spas.",
  },
  {
    q: "Do you save what I type?",
    a: "The check doesn't save your spa name, city or website. We only keep a daily count of checks so the tool stays free. Your spa name and website never go to the AI tools, only the question does. If you fill out the optional form after your results, we get what you put in it.",
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
  about: { "@type": "Thing", name: "AI search visibility for med spas" },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${url}#tool`,
  name: "Does ChatGPT Recommend Your Med Spa?",
  url,
  description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (runs in the browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  provider: { "@id": ORGANIZATION_ID },
  isRelatedTo: { "@type": "WebApplication", name: "ScanRank", url: canonical("/scanrank") },
};

const STEPS = [
  { title: "Tell us where you are", text: "Enter your spa name, city and state. Pick up to 2 treatments you want to be known for." },
  { title: "We ask the AI tools", text: "We ask ChatGPT and Perplexity 3 questions a local patient would ask, like \"What is the best med spa in my city?\"" },
  { title: "See who gets named", text: "You see if each answer names you, which spas it named instead, and the sources it used." },
];

export default function AiRecommendPage() {
  // Read at build time. Adding an API key in Netlify needs a redeploy to show the tool.
  const engines = enabledEngines();
  const live = engines.length > 0;

  return (
    <>
      <JsonLd data={[pageSchema, appSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Free tool · From the makers of ScanRank"
          title="Does ChatGPT Recommend Your Med Spa?"
          subtitle="Patients now ask AI where to get Botox or filler. Find out if ChatGPT and Perplexity name your med spa, and who they name instead."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "var(--cream)" }} id="check">
          <div className="rg-container" style={{ maxWidth: 900 }}>
            <div className="avc-card">
              {live ? (
                <AiRecommendChecker engines={engines} />
              ) : (
                <div className="arc-soon">
                  <span className="rg-pill">Coming soon</span>
                  <h2 className="rg-display">This Check Is Almost Ready</h2>
                  <p>
                    We&apos;re finishing the last few pieces. In the meantime, see if AI can read your website with
                    ScanRank. It&apos;s free and takes about 10 seconds.
                  </p>
                  <Link href="/scanrank" className="rg-btn avc-submit" style={{ display: "inline-flex" }}>
                    Try ScanRank <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">How it works</span>
              <h2 className="rg-display rg-svc-h2">Three Questions, Two AI Tools</h2>
              <p className="rg-svc-body">
                More patients ask AI for a med spa before they ask a friend. The AI names a few spas. If you&apos;re not
                one of them, that patient may never find you. This check shows you where you stand.
              </p>
            </div>
            <ol className="arc-steps">
              {STEPS.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="rg-svc-body" style={{ marginTop: 24, maxWidth: "70ch" }}>
              {live ? `We ask ${engines.map((e) => ENGINE_LABEL[e]).join(" and ")} through their official APIs with web search on. ` : ""}
              The ChatGPT app can answer a bit differently than the API, and answers change over time. So think of your
              result as a snapshot, not a final grade.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720 }}>
              <span className="rg-pill">The ScanRank family</span>
              <h2 className="rg-display rg-svc-h2">Two Free Checks That Work Together</h2>
              <p className="rg-svc-body">
                This tool shows if AI <strong>names</strong> your spa. <Link href="/scanrank" className="rg-text-link">ScanRank</Link>{" "}
                shows if AI can <strong>read</strong> your website, with a score out of 100 and a list of fixes. If AI
                isn&apos;t naming you, run ScanRank next. When you want help, see our{" "}
                <Link href="/med-spa-seo" className="rg-text-link">med spa SEO</Link> service and{" "}
                <Link href="/pricing" className="rg-text-link">our prices</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Questions About This Check</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <InnerCTA
          heading="Want AI to Name Your Spa?"
          text="Book fifteen minutes with Kelsey. We'll look at what ChatGPT says about your city and tell you what will move the needle first."
        />
      </main>
    </>
  );
}
