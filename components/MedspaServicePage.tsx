import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import { MEDSPA_SERVICE_PAGES, MEDSPA_SERVICE_LIST, type MedspaServiceSlug } from "@/lib/medspaServicePages";
import { REPORT } from "@/lib/medspaWebsiteReport";
import { canonical, breadcrumbSchema, faqSchema, SITE, ORGANIZATION_ID, socialMeta, PLANS } from "@/lib/site";

/**
 * Shared layout for the med spa service pages (/med-spa-website-design, /med-spa-seo,
 * /med-spa-advertising, /med-spa-social-media-marketing). Copy lives in
 * lib/medspaServicePages.ts; the look matches /medspa-marketing and
 * /aesthetic-record-leadar-consultant.
 */

export function medspaServiceMetadata(slug: MedspaServiceSlug): Metadata {
  const page = MEDSPA_SERVICE_PAGES[slug];
  const url = canonical(page.path);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywordCluster,
    alternates: { canonical: url },
    ...socialMeta({ url, title: `${page.metaTitle} | ${SITE.name}`, description: page.metaDescription }),
  };
}

export default function MedspaServicePage({ slug }: { slug: MedspaServiceSlug }) {
  const page = MEDSPA_SERVICE_PAGES[slug];
  const url = canonical(page.path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Medspa Marketing", path: "/medspa-marketing" },
    { name: page.crumb, path: page.path },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.metaTitle,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url,
    audience: { "@type": "BusinessAudience", audienceType: "Med spas and aesthetic practices" },
    areaServed: { "@type": "Country", name: "United States" },
    provider: { "@id": ORGANIZATION_ID },
    offers: page.offers.map((name) => {
      const plan = PLANS.find((p) => p.name === name)!;
      return {
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        url: canonical("/pricing"),
        price: plan.price,
        priceCurrency: "USD",
        seller: { "@id": ORGANIZATION_ID },
        priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "USD", unitCode: "MON", unitText: "month", billingDuration: 1 },
      };
    }),
  };

  const related = MEDSPA_SERVICE_LIST.filter((p) => p.slug !== slug);

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(page.faqs)]} />
      <main>
        <PageHero tone="blue" eyebrow={page.eyebrow} title={page.h1} subtitle={page.answer} crumbs={crumbs}>
          <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap", marginTop: 32 }}>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
              Book a 15-Minute Call <span aria-hidden="true">→</span>
            </a>
            <Link href="/pricing" className="rg-btn rg-cta-ghost">
              View Plans &amp; Pricing
            </Link>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">What&apos;s Included</span>
              <h2 className="rg-display rg-svc-h2">{page.included.heading}</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 14 }}>{page.included.intro}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {page.included.items.map((item) => (
                <div key={item.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 28 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "var(--r-xl)", background: "var(--blue-wash)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={23} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 640, marginBottom: 32 }}>
              <span className="rg-pill">Pricing</span>
              <h2 className="rg-display rg-svc-h2">{page.pricing.heading}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="why-grid-responsive">
              {page.pricing.rows.map((row, i) => (
                <div
                  key={row.name}
                  style={
                    i === 0
                      ? { background: "var(--navy)", borderRadius: "var(--r-xl)", padding: 32 }
                      : { background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 32 }
                  }
                >
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: i === 0 ? "var(--cream)" : "var(--navy)" }}>{row.name}</h3>
                  <p className="rg-display" style={{ fontSize: 56, lineHeight: 1, color: i === 0 ? "var(--cream)" : "var(--navy)", margin: "12px 0" }}>
                    {row.price.replace("/mo", "")}
                    <span style={{ fontSize: 22 }}>/mo</span>
                  </p>
                  <p style={{ fontSize: 15, color: i === 0 ? "rgba(253,248,236,0.86)" : "var(--muted)", lineHeight: 1.65 }}>{row.text}</p>
                </div>
              ))}
            </div>
            {page.pricing.notes.map((n) => (
              <p key={n} style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginTop: 16, maxWidth: "70ch" }}>{n}</p>
            ))}
            <Link href="/pricing" style={{ display: "inline-block", marginTop: 12, fontSize: 15, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none" }}>
              See every plan on the pricing page <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">How It Works</span>
              <h2 className="rg-display rg-svc-h2">Three Simple Steps</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {page.steps.map((step, i) => (
                <div key={step.title} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <div className="rg-step-dot rg-display">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 32 }}>
              <span className="rg-pill">Who It&apos;s For</span>
              <h2 className="rg-display rg-svc-h2">Is This Right for Your Practice?</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>A good fit if you are</h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {page.whoFor.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, padding: "6px 0" }}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>Not the right fit if</h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {page.whoFor.notFor.map((b) => (
                    <li key={b} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, padding: "6px 0" }}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--navy)" }}>
          <div className="rg-container why-grid-responsive" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "center" }}>
            <p className="rg-display" style={{ fontSize: "clamp(72px,9vw,120px)", lineHeight: 1, color: "var(--cream)", margin: 0 }}>{page.research.stat}</p>
            <div>
              <p style={{ fontSize: 17, color: "rgba(253,248,236,0.9)", lineHeight: 1.7, margin: 0, maxWidth: "60ch" }}>{page.research.text}</p>
              <Link href={REPORT.path} className="rg-hero-secondary" style={{ display: "inline-block", marginTop: 20 }}>
                Read {REPORT.title}
              </Link>
            </div>
          </div>
        </section>

        {page.compliance && (
          <section className="rg-svc-band" style={{ background: "#fff" }}>
            <div className="rg-container">
              <div style={{ maxWidth: 640, marginBottom: 32 }}>
                <span className="rg-pill">Compliance</span>
                <h2 className="rg-display rg-svc-h2">{page.compliance.heading}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
                {page.compliance.points.map((pt) => (
                  <p key={pt} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, padding: "20px 0", borderTop: "1px solid var(--border)", margin: 0 }}>{pt}</p>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginTop: 20, maxWidth: "70ch" }}>
                Platform rules change often. This is a simple summary, not legal advice.
              </p>
            </div>
          </section>
        )}

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">{page.crumb} Questions</h2>
            </div>
            <FaqAccordion items={page.faqs} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 640, marginBottom: 24 }}>
              <span className="rg-pill">More for Med Spas</span>
              <h2 className="rg-display rg-svc-h2">Works Best With</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="svc-grid-responsive">
              {related.map((r) => (
                <Link key={r.path} href={r.path} style={{ display: "block", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 24, textDecoration: "none" }}>
                  <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>{r.crumb}</span>
                  <span style={{ display: "inline-block", marginTop: 8, fontSize: 14, fontWeight: 700, color: "var(--blue-ink)" }}>
                    {r.metaTitle} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
              <Link href="/medspa-marketing" style={{ display: "block", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 24, textDecoration: "none" }}>
                <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>Everything, One Team</span>
                <span style={{ display: "inline-block", marginTop: 8, fontSize: 14, fontWeight: 700, color: "var(--blue-ink)" }}>
                  Medspa marketing <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
            <p className="rg-svc-body" style={{ marginTop: 24 }}>
              Want to know if Google and AI tools can find your practice today? Run{" "}
              <Link href="/scanrank" className="rg-text-link">ScanRank, our free AI readiness score for med spas</Link>. Prices for every plan are on{" "}
              <Link href="/pricing" className="rg-text-link">the pricing page</Link>.
            </p>
          </div>
        </section>

        <InnerCTA
          heading="Talk to Us for 15 Minutes"
          text="Tell us what you do now and what you want more of. We'll tell you plainly whether this is the right next step for your practice."
        />
      </main>
    </>
  );
}
