import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { ProviderTable, QuestionsToAsk, TrademarkNote } from "@/components/ProviderComparison";
import { VS_PAGES, VS_AS_LISTED, VS_CHECKED, VS_CHECKED_ISO, GUIDE_PATH, US, vsPage, type FitItem, type VsPage as VsPageData } from "@/lib/vsPages";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, founderRef, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";

/**
 * Shared layout for the /rgvpm-vs-* pages. Data and legal rules live in
 * lib/vsPages.ts; each app/rgvpm-vs-<slug>/page.tsx is a two-line wrapper.
 */

export function vsMetadata(slug: string): Metadata {
  const p = vsPage(slug);
  const url = canonical(p.path);
  return {
    title: p.metaTitle,
    description: p.description,
    alternates: { canonical: url },
    ...socialMeta({ url, title: `${p.metaTitle} | ${SITE.name}`, description: p.description, type: "article" }),
  };
}

function crumbsFor(p: VsPageData) {
  return [
    { name: "Home", path: "/" },
    { name: "Medspa Marketing", path: "/medspa-marketing" },
    { name: "How to Choose an Agency", path: GUIDE_PATH },
    { name: `RGVPM vs ${p.short}`, path: p.path },
  ];
}

function FitList({ items }: { items: FitItem[] }) {
  return (
    <ul className="rg-values" style={{ maxWidth: 820 }}>
      {items.map((n) => (
        <li key={n.title}>
          <span className="rg-handled-check" aria-hidden="true">✓</span>
          <div>
            <h3>{n.title}</h3>
            <p>{n.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function VsPage({ slug }: { slug: string }) {
  const p = vsPage(slug);
  const url = canonical(p.path);
  const crumbs = crumbsFor(p);
  const title = `RGV Performance Marketing vs ${p.competitor}`;
  const others = VS_PAGES.filter((v) => v.slug !== p.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description: p.description,
    url,
    datePublished: VS_CHECKED_ISO,
    dateModified: VS_CHECKED_ISO,
    image: `${SITE.url}/opengraph-image`,
    inLanguage: "en-US",
    articleSection: "Comparisons",
    author: founderRef(),
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: [
      { "@type": "Organization", name: p.competitor },
      { "@id": ORGANIZATION_ID },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema(crumbs), faqSchema(p.faqs)]} />
      <main>
        <PageHero tone="blue" eyebrow="Med spa marketing compared" title={title} subtitle={p.heroSub} crumbs={crumbs} />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Short answer</span>
              <h2 className="rg-display rg-svc-h2">How They Differ</h2>
              <p className="rg-svc-body">{p.shortAnswer}</p>
              <p className="rg-svc-body" style={{ fontSize: 14 }}>
                RGV Performance Marketing wrote this page and is one of the two options. Every fact about {p.competitor} comes
                from its own site, with the link, {VS_AS_LISTED}.
              </p>
            </div>
            <ProviderTable caption={`${title} compared`} providers={[p.provider, US]} asListed={VS_AS_LISTED} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Sourced facts</span>
              <h2 className="rg-display rg-svc-h2">What {p.short} Publishes</h2>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 14, maxWidth: "80ch" }}>
              {p.facts.map((f) => (
                <li key={f.text} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "18px 22px" }}>
                  <p style={{ fontSize: 16, color: "var(--navy)", lineHeight: 1.6, margin: 0 }}>{f.text}</p>
                  <p style={{ fontSize: 13, color: "var(--muted)", margin: "8px 0 0" }}>
                    Source:{" "}
                    <a href={f.source.url} target="_blank" rel="noopener noreferrer nofollow" className="rg-text-link">{f.source.label}</a>, as listed on {VS_CHECKED}.
                  </p>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginTop: 16, maxWidth: "80ch" }}>
              Prices and terms change. Confirm with {p.competitor} before you decide.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">About us</span>
              <h2 className="rg-display rg-svc-h2">How RGVPM Works</h2>
              <p className="rg-svc-body">{US.summary}</p>
              <p className="rg-svc-body">{US.tradeoffs}</p>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Honest fit</span>
              <h2 className="rg-display rg-svc-h2">When {p.short} Is the Better Fit</h2>
              <p className="rg-svc-body">We would rather you pick the right partner than the wrong one. {p.competitor} is likely the better choice if:</p>
            </div>
            <FitList items={p.theyFit} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 720, marginBottom: 32 }}>
              <span className="rg-pill">Our fit</span>
              <h2 className="rg-display rg-svc-h2">When RGVPM May Fit Better</h2>
            </div>
            <FitList items={p.weFit} />
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
              Comparing more than two? Start with{" "}
              <Link href={GUIDE_PATH} className="rg-text-link">how to choose a med spa marketing agency</Link>. Other comparisons:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 && ", "}
                  <Link href={o.path} className="rg-text-link">RGVPM vs {o.short}</Link>
                </span>
              ))}
              , and <Link href="/growth99-alternatives" className="rg-text-link">Growth99 alternatives</Link>. For cost, see{" "}
              <Link href="/med-spa-marketing-agency-pricing" className="rg-text-link">med spa marketing agency pricing compared</Link> or{" "}
              <Link href="/pricing" className="rg-text-link">our full price list</Link>.
            </p>
            <TrademarkNote names={[p.competitor]} checked={VS_CHECKED} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">RGVPM vs {p.short}: Questions</h2>
            </div>
            <FaqAccordion items={p.faqs} />
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
