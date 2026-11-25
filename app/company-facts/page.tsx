import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, faqSchema, SITE, socialMeta, ORGANIZATION_ID, ENTITY_LINE } from "@/lib/site";
import {
  COMPANY_FACTS_PATH,
  COMPANY_FACTS_UPDATED,
  COMPANY_FACTS_UPDATED_LABEL,
  COMPANY_FACT_GROUPS,
  COMPANY_FACTS,
} from "@/lib/companyFacts";

const path = COMPANY_FACTS_PATH;
const url = canonical(path);
const title = "RGV Performance Marketing Company Facts";
const description =
  "Quick facts about RGV Performance Marketing (RGVPM): founded 2026 in Harlingen, Texas, founders, who we serve, services, prices, contracts and how to reach us.";

export const metadata: Metadata = {
  title: "Company Facts",
  description,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${title} | ${SITE.name}`, description }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Company Facts", path },
];

// TODO(owner): no review count or rating here yet (see lib/companyFacts.ts). Add one with its source and date
// once we have reviews worth citing.
const pageSchema = {
  ...faqSchema(COMPANY_FACTS),
  "@id": `${url}#faq`,
  url,
  name: title,
  description,
  datePublished: COMPANY_FACTS_UPDATED,
  dateModified: COMPANY_FACTS_UPDATED,
  inLanguage: "en-US",
  publisher: { "@id": ORGANIZATION_ID },
  about: { "@id": ORGANIZATION_ID },
};

const RELATED = [
  { label: "Pricing", href: "/pricing" },
  { label: "About the team", href: "/about" },
  { label: "Med spa marketing", href: "/medspa-marketing" },
  { label: "ScanRank", href: "/scanrank" },
  { label: "The Texas Med Spa Website Report", href: "/research/texas-med-spa-website-report-2026" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function CompanyFactsPage() {
  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema(crumbs)]} />
      <main>
        <PageHero
          tone="blue"
          eyebrow="Company facts"
          title={title}
          subtitle="Short, plain answers about who we are, who we serve, what we charge and how to reach us."
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <p className="rg-svc-body" style={{ fontSize: 19, color: "var(--navy)", fontWeight: 600 }}>{ENTITY_LINE}</p>
            <p style={{ fontSize: 14, color: "var(--muted)", fontFamily: "var(--font-dm-mono), ui-monospace, monospace" }}>
              Last updated: <time dateTime={COMPANY_FACTS_UPDATED}>{COMPANY_FACTS_UPDATED_LABEL}</time>
            </p>
            <nav aria-label="On this page" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: 24 }}>
              {COMPANY_FACT_GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="rg-text-link" style={{ fontSize: 15 }}>
                  {g.heading}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {COMPANY_FACT_GROUPS.map((group, i) => (
          <section
            key={group.id}
            id={group.id}
            className="rg-svc-band"
            style={{ background: i % 2 === 0 ? "var(--cream)" : "#fff", scrollMarginTop: 80 }}
          >
            <div className="rg-container" style={{ maxWidth: 820 }}>
              <h2 className="rg-display rg-svc-h2" style={{ marginBottom: 16 }}>{group.heading}</h2>
              {group.faqs.map((f) => (
                <div key={f.q} style={{ padding: "20px 0", borderTop: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.7 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="rg-svc-band" style={{ background: COMPANY_FACT_GROUPS.length % 2 === 0 ? "var(--cream)" : "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <span className="rg-pill">More detail</span>
            <h2 className="rg-display rg-svc-h2" style={{ marginBottom: 16 }}>Related Pages</h2>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", listStyle: "none", padding: 0, margin: 0 }}>
              {RELATED.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="rg-text-link" style={{ fontSize: 15.5 }}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <InnerCTA
          heading="Have a Question We Didn't Answer?"
          text="Book fifteen minutes with our team. We'll answer it plainly."
        />
      </main>
    </>
  );
}
