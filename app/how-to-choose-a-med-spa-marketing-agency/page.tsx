import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { ProviderTable, QuestionsToAsk, TrademarkNote } from "@/components/ProviderComparison";
import { VS_PAGES, VS_AS_LISTED, VS_CHECKED, VS_CHECKED_ISO, VS_SOURCES, VS_COMPETITOR_NAMES, GUIDE_PATH, US } from "@/lib/vsPages";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, founderRef, ORGANIZATION_ID, WEBSITE_ID, PLANS, BUILD_FEE, usd } from "@/lib/site";

/**
 * Buyer's guide. Legal rules for anything said about competitors are in
 * lib/vsPages.ts. The disclosure must stay near the top of the page.
 */

const path = GUIDE_PATH;
const url = canonical(path);
const title = "How to Choose a Med Spa Marketing Agency (2027)";
const description =
  "How to choose a med spa marketing agency: eight scoring criteria, the questions to ask, and sourced facts on six agencies, including RGVPM, the author.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description, type: "article" }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "How to Choose an Agency", path },
];

const base = PLANS[0];

/** Published scoring criteria. Points add up to 100. */
const CRITERIA = [
  { name: "A price you can see", points: 15, full: "The monthly price is in writing before a sales call, with what it includes.", ask: "What is the monthly price, and what is not included?" },
  { name: "Contract and exit terms", points: 15, full: "You know the term length, whether it auto-renews, the notice period and any early-exit cost.", ask: "How long is the contract, and what does it cost to leave early?" },
  { name: "Who owns what", points: 15, full: "You keep your domain, website content, ad accounts, reviews and lead data if you leave.", ask: "What do I keep, and in what format, if I cancel?" },
  { name: "Ad spend and fees", points: 10, full: "Ad spend is billed to accounts you own. The management fee is stated as flat or as a percentage, with any minimum spend.", ask: "Is the ad fee flat or a percentage? Is there a minimum spend?" },
  { name: "Proof you can check", points: 15, full: "Case studies name the practice and give numbers. Reviews are on sites you can read yourself. References will take your call.", ask: "Can I speak with two current med spa clients?" },
  { name: "Aesthetics experience", points: 10, full: "They work with med spas now and know aesthetics booking software and advertising rules for treatments.", ask: "How many med spas do you work with today?" },
  { name: "Who does the work", points: 10, full: "You know who runs your account, how often you meet and how fast they reply.", ask: "Who will I talk to each month, and how often?" },
  { name: "Fit for your size and tools", points: 10, full: "The plan matches your budget and stage, and works with your EMR and booking software.", ask: "Do you work with my EMR and booking software, or around it?" },
];
const TOTAL = CRITERIA.reduce((n, c) => n + c.points, 0);

const STEPS = [
  "Write down your monthly budget, including ad spend.",
  "List three to five agencies. Use the criteria below, not a ranking someone else wrote. That includes this one.",
  "Score each agency from its own website first. Give zero points where it publishes nothing.",
  "Book calls. Ask the questions in the last column. Update the scores from their answers.",
  "Get the price, the term and the exit terms in writing before you sign.",
];

const faqs = [
  {
    q: "How do I choose a med spa marketing agency?",
    a: `Score each agency on eight things: a price you can see, contract and exit terms, who owns what, ad spend and fees, proof you can check, aesthetics experience, who does the work, and fit for your size and tools. This page gives points for each, ${TOTAL} in all. Score from their own website first, then from a call.`,
  },
  {
    q: "How much does a med spa marketing agency cost?",
    a: `Of the agencies on this page that publish prices, monthly plans run from ${usd(base.price)}/mo (RGV Performance Marketing's website base) to $12,000+/mo (Aesthetix Media Enterprise). DoctorLogic lists $11,000 a year to start, PatientGain $800 to $4,000 a month, and Med Spa Magic Marketing $3,495 to $6,995 a month. Studio III Marketing does not publish prices (${VS_AS_LISTED}). Ad spend is usually extra.`,
  },
  {
    q: "Should I sign a long contract with a marketing agency?",
    a: "It depends on what you get for it. Some agencies waive setup fees or offer targets in return for a longer term. Before you sign, ask how long the term is, whether it renews automatically, how much notice you must give, and what it costs to leave early.",
  },
  {
    q: "Why doesn't this guide rank the agencies?",
    a: "RGV Performance Marketing wrote it and is one of the options. A ranking from us would not be neutral. So we publish the criteria and each company's own published facts with links, and you do the scoring.",
  },
  {
    q: "Who wrote this guide?",
    a: `Derrick Tamez, founder of RGV Performance Marketing, a med spa marketing agency in Harlingen, Texas. We publish our prices: the ${base.name} is ${usd(base.price)}/mo, the ${usd(BUILD_FEE)} build fee is waived with any add-on, and every plan is month-to-month.`,
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${url}#article`,
  headline: title,
  description,
  url,
  datePublished: VS_CHECKED_ISO,
  dateModified: VS_CHECKED_ISO,
  image: `${SITE.url}/opengraph-image`,
  inLanguage: "en-US",
  articleSection: "Guides",
  author: founderRef(),
  publisher: { "@id": ORGANIZATION_ID },
  isPartOf: { "@id": WEBSITE_ID },
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  about: { "@type": "Thing", name: "Choosing a med spa marketing agency" },
};

export default function BuyersGuidePage() {
  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Buyer's guide"
          title={title}
          subtitle="Eight things to score, the questions to ask, and what six agencies publish about price and terms."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <aside
              aria-label="Disclosure"
              style={{ maxWidth: 820, border: "1.5px solid var(--navy)", borderRadius: "var(--r-xl)", padding: "20px 24px", background: "var(--cream)" }}
            >
              <p style={{ fontSize: 16, color: "var(--navy)", lineHeight: 1.6, margin: 0 }}>
                <strong>Disclosure:</strong> RGV Performance Marketing wrote this guide, and we are one of the agencies in it.
                We don&apos;t rank or score anyone, including ourselves. We publish the criteria and each company&apos;s own facts,
                with links, {VS_AS_LISTED}. You do the scoring.
              </p>
            </aside>

            <div style={{ maxWidth: 720, margin: "40px 0 0" }}>
              <span className="rg-pill">Short answer</span>
              <h2 className="rg-display rg-svc-h2">Score What You Can Check</h2>
              <p className="rg-svc-body">
                Pick an agency on facts you can check: the price, the contract, what you keep if you leave, how ads are
                billed, and proof from real clients. Then match the plan to your size and budget. A big agency suits some
                practices. A small one suits others.
              </p>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Scoring criteria</span>
              <h2 className="rg-display rg-svc-h2">Eight Criteria, {TOTAL} Points</h2>
              <p className="rg-svc-body">
                Give full points only when the agency meets the line in the middle column. Give partial points when it
                answers on a call but not in writing. Give zero when it publishes nothing.
              </p>
            </div>
            <div className="rg-compare" style={{ maxWidth: "none" }}>
              <table style={{ minWidth: 760 }}>
                <caption className="sr-only">Med spa marketing agency scoring criteria</caption>
                <thead>
                  <tr>
                    <th scope="col">Criterion</th>
                    <th scope="col">Points</th>
                    <th scope="col">Full points when</th>
                    <th scope="col">Ask</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map((c) => (
                    <tr key={c.name}>
                      <th scope="row">{c.name}</th>
                      <td>{c.points}</td>
                      <td style={{ textAlign: "left" }}>{c.full}</td>
                      <td style={{ textAlign: "left" }}>{c.ask}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">How to use it</span>
              <h2 className="rg-display rg-svc-h2">Five Steps</h2>
            </div>
            <ol style={{ margin: 0, paddingLeft: 22, display: "grid", gap: 10, fontSize: 16, lineHeight: 1.6, color: "var(--navy)", maxWidth: "70ch" }}>
              {STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Side by side</span>
              <h2 className="rg-display rg-svc-h2">What Six Agencies Publish</h2>
              <p className="rg-svc-body">
                These rows cover the first criteria you can score from a website: price, contract and ad spend. Where a
                company doesn&apos;t publish something, the table says so.
              </p>
            </div>
            <ProviderTable caption="What six med spa marketing agencies publish" providers={[...VS_PAGES.map((v) => v.provider), US]} asListed={VS_AS_LISTED} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Each option</span>
              <h2 className="rg-display rg-svc-h2">Who Each One Suits</h2>
              <p className="rg-svc-body">Each comparison page lists that company&apos;s sourced facts and where it is the better fit.</p>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {VS_PAGES.map((v) => (
                <article key={v.slug} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "22px 24px" }}>
                  <h3 className="rg-display" style={{ fontSize: 26, color: "var(--navy)", margin: 0 }}>{v.competitor}</h3>
                  <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.65, margin: "10px 0 0" }}>
                    {v.provider.model}. A good fit if: {v.theyFit.map((t) => t.title.replace(/^You /, "you ")).join("; ")}.
                  </p>
                  <p style={{ margin: "12px 0 0", fontSize: 15 }}>
                    <Link href={v.path} className="rg-text-link">RGVPM vs {v.short}</Link>
                  </p>
                </article>
              ))}
              <article style={{ background: "#fff", border: "1.5px solid var(--blue)", borderRadius: "var(--r-xl)", padding: "22px 24px" }}>
                <h3 className="rg-display" style={{ fontSize: 26, color: "var(--navy)", margin: 0 }}>{US.name}</h3>
                <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.65, margin: "10px 0 0" }}>
                  {US.summary} {US.tradeoffs}
                </p>
                <p style={{ margin: "12px 0 0", fontSize: 15 }}>
                  <Link href="/pricing" className="rg-text-link">See our full price list</Link>
                </p>
              </article>
            </div>
            <p className="rg-svc-body" style={{ marginTop: 24 }}>
              Also weighing Growth99? See{" "}
              <Link href="/growth99-alternatives" className="rg-text-link">Growth99 alternatives for med spas</Link>. For cost across
              providers, see <Link href="/med-spa-marketing-agency-pricing" className="rg-text-link">med spa marketing agency pricing compared</Link>.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">Before you sign</span>
              <h2 className="rg-display rg-svc-h2">Questions to Ask Any Agency</h2>
            </div>
            <QuestionsToAsk />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <span className="rg-pill">Sources</span>
              <h2 className="rg-display rg-svc-h2">Where the Facts Come From</h2>
              <p className="rg-svc-body">Every competitor fact on this page and the comparison pages comes from these public pages, read on {VS_CHECKED}.</p>
            </div>
            <ul style={{ margin: 0, paddingLeft: 22, display: "grid", gap: 8, fontSize: 15, lineHeight: 1.6, color: "var(--navy)", maxWidth: "80ch" }}>
              {VS_SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="rg-text-link">{s.label}</a>, read {VS_CHECKED}
                </li>
              ))}
            </ul>
            <TrademarkNote names={[...VS_COMPETITOR_NAMES, "Growth99"]} checked={VS_CHECKED} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Choosing an Agency: Questions</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <InnerCTA
          heading="Want a Second Opinion?"
          text="Book fifteen minutes. Bring the scores you have so far, and we'll tell you honestly whether we fit."
        />
      </main>
    </>
  );
}
