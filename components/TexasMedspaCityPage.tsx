import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import { TEXAS_CITIES, TEXAS_RULES, TEXAS_RULE_SOURCES, type TexasCity } from "@/lib/texasMedspa";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta, planPrice, usd, BUILD_FEE } from "@/lib/site";

/** Prices pulled from PLANS by exact name (planPrice throws at build time if a name drifts). */
const PRICE_ROWS = [
  { label: "Local SEO & Google Profile", price: planPrice("Local SEO & Google Profile add-on") },
  { label: "Content Crew (you shoot, we edit)", price: planPrice("Content Crew add-on") },
  { label: "Ads Management", price: planPrice("Ads Management add-on") },
  { label: "Full Service Social", price: planPrice("Full Service Social add-on") },
];
const BASE_PRICE = planPrice("Plant the Flag (website)");

export function texasCityMetadata(c: TexasCity): Metadata {
  const url = canonical(c.path);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywordCluster,
    alternates: { canonical: url },
    ...socialMeta({ url, title: `${c.metaTitle} | ${SITE.name}`, description: c.metaDescription }),
  };
}

const h2Intro = { maxWidth: 640, marginBottom: 32 } as const;
const bodyP = { fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 18 } as const;

export default function TexasMedspaCityPage({ city: c }: { city: TexasCity }) {
  const url = canonical(c.path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Medspa Marketing", path: "/medspa-marketing" },
    { name: `${c.city}, TX`, path: c.path },
  ];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.metaTitle,
    serviceType: "Med spa marketing",
    description: c.metaDescription,
    url,
    areaServed: {
      "@type": "City",
      name: c.city,
      containedInPlace: { "@type": "State", name: "Texas" },
    },
    provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
  };
  const others = TEXAS_CITIES.filter((x) => x.slug !== c.slug);
  const sources = [...c.sources, ...TEXAS_RULE_SOURCES];

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(c.faqs)]} />
      <main>
        <PageHero tone="blue" eyebrow={`Med Spas in ${c.city}, Texas`} title={c.h1} subtitle={c.heroSub} crumbs={crumbs}>
          <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap", marginTop: 32 }}>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
              Book a 15-Minute Call <span aria-hidden="true">→</span>
            </a>
            <Link href="/medspa-marketing" className="rg-btn rg-cta-ghost">
              See Everything We Do for Medspas
            </Link>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 820 }}>
              <span className="rg-pill">The {c.city} Market</span>
              <h2 className="rg-display rg-svc-h2">{c.marketHeading}</h2>
              {c.market.map((p) => (
                <p key={p} style={bodyP}>{p}</p>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 40 }} className="svc-grid-responsive">
              {c.stats.map((s) => (
                <div key={s.label} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 24 }}>
                  <p className="rg-display" style={{ fontSize: 40, lineHeight: 1, color: "var(--navy)" }}>{s.value}</p>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55, marginTop: 10 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginTop: 14 }}>
              Figures for the {c.metroName} metro area from the U.S. Census Bureau. Sources are listed at the bottom of this page.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <span className="rg-pill">Competition</span>
            <h2 className="rg-display rg-svc-h2">{c.landscapeHeading}</h2>
            {c.landscape.map((p) => (
              <p key={p} style={bodyP}>{p}</p>
            ))}
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={h2Intro}>
              <span className="rg-pill">The Plan</span>
              <h2 className="rg-display rg-svc-h2">{c.playbookHeading}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {c.playbook.map((item) => (
                <div key={item.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 28 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "var(--r-xl)", background: "var(--blue-wash)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={23} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.6, marginTop: 24 }}>
              On Aesthetic Record or LeadAR? Our founders each spent five years there. See{" "}
              <Link href="/aesthetic-record-leadar-consultant" className="rg-text-link">Aesthetic Record &amp; LeadAR help</Link>.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--navy)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 760, marginBottom: 32 }}>
              <span className="rg-pill">Texas Rules</span>
              <h2 className="rg-display rg-svc-h2" style={{ color: "var(--cream)" }}>{TEXAS_RULES.heading}</h2>
              <p style={{ fontSize: 16, color: "rgba(253,248,236,0.86)", lineHeight: 1.7, marginTop: 14 }}>{TEXAS_RULES.intro}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
              {TEXAS_RULES.items.map((r) => (
                <div key={r.title} style={{ padding: "20px 0", borderTop: "1px solid rgba(253,248,236,0.18)" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ fontSize: 15, color: "rgba(253,248,236,0.86)", lineHeight: 1.65 }}>{r.text}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 16, color: "var(--cream)", lineHeight: 1.7, marginTop: 28, maxWidth: "70ch" }}>{TEXAS_RULES.howWeUseIt} {c.rulesNote}</p>
            <p style={{ fontSize: 13, color: "rgba(253,248,236,0.7)", lineHeight: 1.6, marginTop: 12, maxWidth: "70ch" }}>{TEXAS_RULES.disclaimer}</p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 680, marginBottom: 40 }}>
              <span className="rg-pill">Working Remotely</span>
              <h2 className="rg-display rg-svc-h2">How We Work With {c.city} Practices</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 14 }}>{c.remoteIntro}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="steps-grid-responsive">
              {c.remoteSteps.map((step, i) => (
                <div key={step.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <div className="rg-step-dot rg-display">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.65, marginTop: 24, maxWidth: "70ch" }}>{c.shootNote}</p>
          </div>
        </section>

        <section id="pricing" className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={h2Intro}>
              <span className="rg-pill">Pricing</span>
              <h2 className="rg-display rg-svc-h2">The Same Published Prices in {c.city}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="why-grid-responsive">
              <div style={{ background: "var(--navy)", borderRadius: "var(--r-xl)", padding: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--cream)" }}>Website</h3>
                <p className="rg-display" style={{ fontSize: 56, lineHeight: 1, color: "var(--cream)", margin: "12px 0" }}>
                  {usd(BASE_PRICE)}<span style={{ fontSize: 22 }}>/mo</span>
                </p>
                <p style={{ fontSize: 15, color: "rgba(253,248,236,0.86)", lineHeight: 1.65 }}>
                  Custom site built, hosted and maintained, with one lead inbox and automatic text and email follow-up.
                </p>
                <p style={{ fontSize: 14, color: "rgba(253,248,236,0.86)", lineHeight: 1.6, marginTop: 12 }}>
                  Plus a one-time {usd(BUILD_FEE)} build fee, waived when you add any add-on.
                </p>
              </div>
              <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "20px 28px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", padding: "8px 0" }}>Add only what you need</h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {PRICE_ROWS.map((a) => (
                    <li key={a.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderTop: "1px solid var(--border)", fontSize: 15, color: "var(--navy)" }}>
                      <span>{a.label}</span>
                      <strong style={{ whiteSpace: "nowrap" }}>+{usd(a.price)}/mo</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginTop: 20, maxWidth: "70ch" }}>
              Every plan is month-to-month. Google and Meta bill ad spend to you directly. EMR support is on our{" "}
              <Link href="/medspa-marketing#pricing" className="rg-text-link">medspa page</Link>.
            </p>
            <Link href="/pricing" style={{ display: "inline-block", marginTop: 12, fontSize: 15, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none" }}>
              Build your plan <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">{c.city} Med Spa Marketing Questions</h2>
            </div>
            <FaqAccordion items={c.faqs} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>Other Texas metros</h2>
            <p style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.7, marginTop: 8 }}>
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 && " · "}
                  <Link href={o.path} className="rg-text-link">Med spa marketing in {o.city}</Link>
                </span>
              ))}
            </p>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginTop: 32 }}>Sources</h2>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="rg-text-link">{s.label}</a>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginTop: 10 }}>Read November 22, 2026.</p>
          </div>
        </section>

        <InnerCTA
          heading={`Grow Your ${c.city} Practice`}
          text="Fifteen minutes with Kelsey. Tell us who you pay now and which parts of town you want to reach, and we'll tell you where we'd start."
        />
      </main>
    </>
  );
}
