import type { Metadata } from "next";
import Link from "next/link";
import CityDetails from "@/components/CityDetails";
import CityLinks from "@/components/CityLinks";
import ClientMarquee from "@/components/ClientMarquee";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import {
  HARLINGEN,
  HARLINGEN_INTRO,
  HARLINGEN_DETAILS,
  HARLINGEN_SERVICES,
  HARLINGEN_STEPS,
  HARLINGEN_FAQS,
  HARLINGEN_LINKS,
} from "@/lib/digitalMarketingHarlingen";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";

const path = "/digital-marketing-harlingen-tx";
const url = canonical(path);

export const metadata: Metadata = {
  title: { absolute: HARLINGEN.metaTitle },
  description: HARLINGEN.metaDescription,
  keywords: HARLINGEN.keywordCluster,
  alternates: { canonical: url },
  ...socialMeta({ url, title: HARLINGEN.metaTitle, description: HARLINGEN.metaDescription }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Digital Marketing in Harlingen", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: HARLINGEN.h1,
  serviceType: HARLINGEN.primaryKeyword,
  description: HARLINGEN.metaDescription,
  url,
  areaServed: { "@type": "City", name: "Harlingen", containedInPlace: { "@type": "State", name: "Texas" } },
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function DigitalMarketingHarlingenPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(HARLINGEN_FAQS)]} />
      <main>
        <PageHero tone="blue" eyebrow={HARLINGEN.eyebrow} title={HARLINGEN.h1} subtitle={HARLINGEN.heroSub} crumbs={crumbs}>
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
            <h2 className="rg-display rg-svc-h2">{HARLINGEN_INTRO.heading}</h2>
            <p style={{ fontSize: 17.5, fontWeight: 500, color: "var(--navy)", lineHeight: 1.7, marginTop: 18 }}>{HARLINGEN_INTRO.answer}</p>
            {HARLINGEN_INTRO.body.map((p) => (
              <p key={p} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 16 }}>{p}</p>
            ))}
          </div>
        </section>

        <CityDetails {...HARLINGEN_DETAILS} />

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">One Team</span>
              <h2 className="rg-display rg-svc-h2">Everything Your Harlingen Business Needs Online</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {HARLINGEN_SERVICES.map((item) => (
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
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">How It Works</span>
              <h2 className="rg-display rg-svc-h2">How We Start With a Harlingen Business</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {HARLINGEN_STEPS.map((step, i) => (
                <div key={step.title} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <div className="rg-step-dot rg-display">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }}>
              <ClientMarquee />
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Harlingen Digital Marketing Questions</h2>
            </div>
            <FaqAccordion items={HARLINGEN_FAQS} />
          </div>
        </section>

        <CityLinks eyebrow="Keep Exploring" heading="More for Harlingen Businesses" links={HARLINGEN_LINKS} />

        <InnerCTA
          heading="Get More Calls in Harlingen"
          text="Book a free strategy call. We'll look at your website and Google listing and tell you what we'd fix first."
        />
      </main>
    </>
  );
}
