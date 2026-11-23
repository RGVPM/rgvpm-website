import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import AiVisibilityChecker from "@/components/AiVisibilityChecker";
import { CHECKS } from "@/lib/aiVisibility/checks";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, ORGANIZATION_ID } from "@/lib/site";

const path = "/scanrank";
const url = canonical(path);
const title = "ScanRank: AI Readiness Score for Med Spas";
const description =
  "ScanRank is a free AI readiness score for med spas. Enter your website to see whether ChatGPT, Google and other AI assistants can find and understand it, with a plain-English list of fixes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "ScanRank", path },
];

const weights = CHECKS.map((c) => `${c.label} (${c.weight})`).join(", ");

const faqs = [
  {
    q: "What is ScanRank?",
    a: "ScanRank is a free AI readiness score for med spas from RGV Performance Marketing. It reads your public website and scores it out of 100 on whether ChatGPT, Google and other AI assistants can find and understand it, then tells you what to fix.",
  },
  {
    q: "What is AEO for a med spa?",
    a: "AEO stands for answer engine optimization. It means setting up your website so AI assistants like ChatGPT, Perplexity, Google AI Overviews and Bing Copilot can read it, understand what treatments you offer and where you are, and name you when someone asks for a med spa nearby.",
  },
  {
    q: "Do people use ChatGPT to find a med spa?",
    a: "A growing number do. Someone types \"best place for Botox in McAllen\" or \"med spa near me with lip filler\" and the assistant answers with a few names. It can only suggest practices whose websites it can read and understand, which is what ScanRank looks at.",
  },
  {
    q: "How is the ScanRank score calculated?",
    a: `We run ${CHECKS.length} checks worth 100 points in total. A pass earns the full points, \"needs work\" earns half and \"missing\" earns zero. The weights: ${weights}.`,
  },
  {
    q: "Does a high ScanRank score mean AI assistants will recommend me?",
    a: "Not on its own. ScanRank checks whether AI can find and understand your site. Whether AI recommends you also depends on your reviews, your Google Business Profile and mentions of you on other sites. That's the part we help with.",
  },
  {
    q: "Why does it say AI crawlers are blocked when I never blocked them?",
    a: "Some site builders, security plugins and Cloudflare settings add robots.txt rules that block AI bots without telling you. The report names the bots it found blocked, so you or your web person can check that setting.",
  },
  {
    q: "What is llms.txt, and do I need one?",
    a: "llms.txt is a short plain-text file at yoursite.com/llms.txt that sums up your business for AI tools. Few assistants read it today, so we give it only 2 of the 100 points. It takes ten minutes to write, so it's worth adding.",
  },
  {
    q: "Do you save my website or ask for my email?",
    a: "No. ScanRank reads your public homepage, robots.txt, llms.txt and sitemap, shows the results in your browser and keeps nothing. We don't ask for an email address.",
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
  about: { "@type": "Thing", name: "Answer engine optimization (AEO) for med spas" },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${url}#tool`,
  name: "ScanRank",
  alternateName: "ScanRank: AI readiness score for med spas",
  url,
  description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (runs in the browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  provider: { "@id": ORGANIZATION_ID },
};

const AEO_POINTS = [
  {
    title: "Let the assistants in",
    text: "ChatGPT, Perplexity, Claude and Bing each send their own crawler. If your robots.txt turns them away, they answer from whatever other sites say about you, or they leave you out.",
  },
  {
    title: "Say who, what and where in plain words",
    text: "Your page title, main heading and description should name your treatments and your city. \"Welcome to our spa\" gives an assistant nothing to match against \"Botox in Harlingen\".",
  },
  {
    title: "Hand them your details in a format they trust",
    text: "LocalBusiness schema spells out your name, address and phone in code. FAQ schema gives them your answers to the questions clients ask. Assistants lean on both.",
  },
  {
    title: "Make the next step one tap",
    text: "Someone who finds you through an assistant is ready to act. A booking link, a tap-to-call number and a text option catch them before they move on to the next name.",
  },
];

export default function ScanRankPage() {
  return (
    <>
      <JsonLd data={[pageSchema, appSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Free tool for med spas"
          title={
            <>
              ScanRank
              <span style={{ display: "block", fontSize: "0.5em", lineHeight: 1.1, marginTop: 10 }}>AI readiness score for med spas</span>
            </>
          }
          subtitle="Find out whether ChatGPT, Google and other AI assistants can find and understand your website. You get a score out of 100 and a short list of fixes."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "var(--cream)" }} id="check">
          <div className="rg-container" style={{ maxWidth: 900 }}>
            <div className="avc-card">
              <AiVisibilityChecker />
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">The report card</span>
              <h2 className="rg-display rg-svc-h2">What We Check</h2>
              <p className="rg-svc-body">
                Every check is something we can measure from your public website. Points are out of 100. Each result comes
                with the reason it matters and what to change.
              </p>
            </div>
            <ul className="avc-checks">
              {CHECKS.map((c) => (
                <li key={c.id}>
                  <h3>
                    {c.label} <span>{c.weight} pts</span>
                  </h3>
                  <p>{c.why}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">AEO for med spas</span>
              <h2 className="rg-display rg-svc-h2">How AI Assistants Pick a Med Spa</h2>
              <p className="rg-svc-body">
                When a client asks ChatGPT or Google&apos;s AI Overview where to get filler nearby, the assistant names a
                handful of practices. It favors the ones whose websites it can read and understand. Answer engine
                optimization (AEO) means fixing your site so you&apos;re one of them. Four things carry most of the weight.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
              {AEO_POINTS.map((p) => (
                <div key={p.title} style={{ padding: "20px 0", borderTop: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>{p.text}</p>
                </div>
              ))}
            </div>
            <p className="rg-svc-body" style={{ marginTop: 28, maxWidth: "70ch" }}>
              We build med spa websites with all of this in place from day one, and we fix it on sites you already
              have. See <Link href="/medspa-marketing" className="rg-text-link">med spa marketing</Link>,{" "}
              <Link href="/services/local-seo" className="rg-text-link">local SEO</Link> and{" "}
              <Link href="/pricing" className="rg-text-link">our prices</Link>.
            </p>
            <p className="rg-svc-body" style={{ marginTop: 12, maxWidth: "70ch" }}>
              ScanRank shows if AI can read your site. To see if ChatGPT actually names your spa, try our other free
              check: <Link href="/does-chatgpt-recommend-my-med-spa" className="rg-text-link">Does ChatGPT recommend your med spa?</Link>
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">ScanRank Questions</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        <InnerCTA
          heading="Want Us to Fix It for You?"
          text="Book fifteen minutes with Kelsey. We'll walk through your report and tell you which fixes will make the biggest difference for your practice."
        />
      </main>
    </>
  );
}
