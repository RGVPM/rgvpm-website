import type { Metadata } from "next";
import Link from "next/link";
import CityLinks from "@/components/CityLinks";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import {
  HVAC,
  HVAC_INTRO,
  HVAC_DIFFERENCES,
  HVAC_SERVICES,
  HVAC_CHECKLIST,
  HVAC_PRICING,
  HVAC_STEPS,
  HVAC_FAQS,
  HVAC_LINKS,
} from "@/lib/hvac";
import { canonical, breadcrumbSchema, faqSchema, SITE, SERVICE_AREA_CITIES, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";

const path = "/hvac-marketing-rgv";
const url = canonical(path);

export const metadata: Metadata = {
  title: { absolute: HVAC.metaTitle },
  description: HVAC.metaDescription,
  keywords: HVAC.keywordCluster,
  alternates: { canonical: url },
  ...socialMeta({ url, title: HVAC.metaTitle, description: HVAC.metaDescription }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "HVAC Marketing", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: HVAC.h1,
  serviceType: HVAC.primaryKeyword,
  description: HVAC.metaDescription,
  url,
  audience: { "@type": "BusinessAudience", name: "HVAC and air conditioning companies" },
  areaServed: SERVICE_AREA_CITIES.map((name) => ({
    "@type": "City",
    name,
    containedInPlace: { "@type": "State", name: "Texas" },
  })),
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function HvacMarketingPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(HVAC_FAQS)]} />
      <main>
        <PageHero tone="blue" eyebrow={HVAC.eyebrow} title={HVAC.h1} subtitle={HVAC.heroSub} crumbs={crumbs}>
          <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap", marginTop: 32 }}>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
              Book a Free Strategy Call <span aria-hidden="true">→</span>
            </a>
            <Link href="/pricing" className="rg-btn rg-cta-ghost">
              View Plans &amp; Pricing
            </Link>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff", paddingBottom: 0 }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <h2 className="rg-display rg-svc-h2">{HVAC_INTRO.heading}</h2>
            <p style={{ fontSize: 17.5, fontWeight: 500, color: "var(--navy)", lineHeight: 1.7, marginTop: 18 }}>{HVAC_INTRO.answer}</p>
            {HVAC_INTRO.body.map((p) => (
              <p key={p} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 16 }}>{p}</p>
            ))}
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 32 }}>
              <span className="rg-pill">Why It&apos;s Different</span>
              <h2 className="rg-display rg-svc-h2">What&apos;s Different About HVAC Marketing in the Valley</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
              {HVAC_DIFFERENCES.map((d) => (
                <div key={d.title} style={{ padding: "20px 0", borderTop: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{d.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">What We Run</span>
              <h2 className="rg-display rg-svc-h2">Everything Your HVAC Company Needs Online</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {HVAC_SERVICES.map((item) => (
                <Link key={item.title} href={item.href} style={{ display: "block", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 28, textDecoration: "none" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "var(--r-xl)", background: "var(--blue-wash)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={23} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
                  <span style={{ display: "inline-block", marginTop: 12, fontSize: 14, fontWeight: 700, color: "var(--blue-ink)" }}>
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 640, marginBottom: 32 }}>
              <span className="rg-pill">Checklist</span>
              <h2 className="rg-display rg-svc-h2">Is Your HVAC Company Ready for the Next Heat Wave?</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 14 }}>
                Check each line. Anything that doesn&apos;t match is where calls are slipping to a competitor.
              </p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-xl)", overflow: "hidden" }}>
              {HVAC_CHECKLIST.map((row, i) => (
                <div key={row.item} style={{ display: "grid", gridTemplateColumns: "minmax(140px, 220px) 1fr", gap: 16, padding: "16px 22px", background: i % 2 ? "var(--cream)" : "#fff", borderTop: i ? "1px solid var(--border)" : "none" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{row.item}</h3>
                  <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>{row.good}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 960 }}>
            <div style={{ maxWidth: 640, marginBottom: 32 }}>
              <span className="rg-pill">Pricing</span>
              <h2 className="rg-display rg-svc-h2">What It Costs, Before You Call</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="why-grid-responsive">
              <div style={{ background: "var(--navy)", borderRadius: "var(--r-xl)", padding: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--cream)" }}>{HVAC_PRICING.base.name}</h3>
                <p className="rg-display" style={{ fontSize: 56, lineHeight: 1, color: "var(--cream)", margin: "12px 0" }}>
                  {HVAC_PRICING.base.price}<span style={{ fontSize: 22 }}>/mo</span>
                </p>
                <p style={{ fontSize: 15, color: "rgba(253,248,236,0.86)", lineHeight: 1.65 }}>{HVAC_PRICING.base.text}</p>
                <p style={{ fontSize: 14, color: "rgba(253,248,236,0.86)", lineHeight: 1.6, marginTop: 12 }}>{HVAC_PRICING.baseNote}</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "20px 28px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", padding: "8px 0" }}>Most HVAC shops add</h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {HVAC_PRICING.addons.map((a) => (
                    <li key={a.name} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderTop: "1px solid var(--border)", fontSize: 15, color: "var(--navy)" }}>
                      <span>{a.name}</span>
                      <strong style={{ whiteSpace: "nowrap" }}>{a.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginTop: 20, maxWidth: "70ch" }}>{HVAC_PRICING.note}</p>
            <Link href="/pricing" style={{ display: "inline-block", marginTop: 12, fontSize: 15, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none" }}>
              Build your plan <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">How It Works</span>
              <h2 className="rg-display rg-svc-h2">How We Start With an HVAC Company</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {HVAC_STEPS.map((step, i) => (
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
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">HVAC Marketing Questions</h2>
            </div>
            <FaqAccordion items={HVAC_FAQS} />
          </div>
        </section>

        <CityLinks eyebrow="Keep Exploring" heading="More for Valley Service Businesses" links={HVAC_LINKS} />

        <InnerCTA
          heading="Be the HVAC Company They Call First"
          text="Book a free strategy call. We'll look at your Google listing and website and tell you what we'd fix before the next heat wave."
        />
      </main>
    </>
  );
}
