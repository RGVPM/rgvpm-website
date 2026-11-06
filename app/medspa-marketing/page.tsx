import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import {
  MEDSPA,
  MEDSPA_INTRO,
  MEDSPA_SERVICES,
  MEDSPA_DIFFERENCES,
  MEDSPA_STEPS,
  MEDSPA_CLIENTS,
  MEDSPA_FAQS,
} from "@/lib/medspa";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";

const path = "/medspa-marketing";
const url = canonical(path);

export const metadata: Metadata = {
  title: MEDSPA.metaTitle,
  description: MEDSPA.metaDescription,
  keywords: MEDSPA.keywordCluster,
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `${MEDSPA.metaTitle} | ${SITE.name}`,
    description: MEDSPA.metaDescription,
  }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Medspa Marketing", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: MEDSPA.metaTitle,
  serviceType: MEDSPA.primaryKeyword,
  description: MEDSPA.metaDescription,
  url,
  areaServed: { "@type": "Country", name: "United States" },
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function MedspaMarketingPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(MEDSPA_FAQS)]} />
      <main>
        <PageHero tone="blue" eyebrow={MEDSPA.eyebrow} title={MEDSPA.h1} subtitle={MEDSPA.heroSub} crumbs={crumbs}>
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
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <h2 className="rg-display rg-svc-h2">{MEDSPA_INTRO.heading}</h2>
            {MEDSPA_INTRO.body.map((p) => (
              <p key={p} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 18 }}>{p}</p>
            ))}
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">What We Run</span>
              <h2 className="rg-display rg-svc-h2">Everything Your Medspa Needs, One Team</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {MEDSPA_SERVICES.map((item) => (
                <div key={item.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 28 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "var(--r-xl)", background: "var(--blue-wash)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={23} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
                  {item.href && (
                    <Link href={item.href} style={{ display: "inline-block", marginTop: 12, fontSize: 14, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none" }}>
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--navy)" }}>
          <div className="rg-container why-grid-responsive" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 56, alignItems: "center" }}>
            <Image src="/founders/kelsey.jpg" alt="Kelsey Tamez, co-founder of RGV Performance Marketing" width={280} height={320} style={{ width: "100%", maxWidth: 280, height: "auto", aspectRatio: "7 / 8", objectFit: "cover", objectPosition: "top", borderRadius: "var(--r-xl)" }} />
            <div>
              <h2 className="rg-display rg-svc-h2" style={{ color: "var(--cream)" }}>Run by Someone Who Knows Clinics</h2>
              <p style={{ fontSize: 16.5, color: "rgba(253,248,236,0.86)", lineHeight: 1.75, marginTop: 16, maxWidth: "60ch" }}>
                Our co-founder Kelsey Tamez spent five years at Aesthetic Record as a Senior Account Manager, working with hundreds of clinic owners and staff as they set up their software, trained their teams and grew their practices.
              </p>
              <p style={{ fontSize: 16.5, color: "rgba(253,248,236,0.86)", lineHeight: 1.75, marginTop: 14, maxWidth: "60ch" }}>
                She runs onboarding and delivery here, so you work with her directly instead of being handed off.
              </p>
              <Link href="/about" className="rg-hero-secondary" style={{ display: "inline-block", marginTop: 20 }}>Meet the team</Link>
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 32 }}>
              <span className="rg-pill">Why It&apos;s Different</span>
              <h2 className="rg-display rg-svc-h2">Marketing a Medspa Isn&apos;t Like Marketing a Shop</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 48px" }} className="why-grid-responsive">
              {MEDSPA_DIFFERENCES.map((d) => (
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
              <span className="rg-pill">How It Works</span>
              <h2 className="rg-display rg-svc-h2">Hand It Off in Three Steps</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {MEDSPA_STEPS.map((step, i) => (
                <div key={step.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <div className="rg-step-dot rg-display">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 48, fontSize: 15, fontWeight: 600, color: "var(--navy)", textAlign: "center" }}>Aesthetics and wellness businesses we&apos;ve worked with</p>
            <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: "24px 48px", justifyContent: "center", alignItems: "center" }}>
              {MEDSPA_CLIENTS.map((c) => (
                <li key={c.name}>
                  <Image src={c.logo} alt={c.name} width={170} height={72} style={{ width: "auto", height: 64, maxWidth: 170, objectFit: "contain" }} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Medspa Marketing Questions</h2>
            </div>
            <FaqAccordion items={MEDSPA_FAQS} />
          </div>
        </section>

        <InnerCTA
          heading="Hand It Off. Get Back to Your Clients."
          text="Fifteen minutes with Kelsey. Tell us who you pay now, and we'll tell you honestly whether we can do better."
        />
      </main>
    </>
  );
}
