import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import {
  AR_LEADAR,
  AR_LEADAR_INTRO,
  AR_LEADAR_TEAM,
  AR_LEADAR_HELP,
  AR_LEADAR_SERVICES,
  AR_LEADAR_STEPS,
  AR_LEADAR_FAQS,
  AR_LEADAR_DISCLAIMER,
} from "@/lib/arLeadar";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";

const path = AR_LEADAR.path;
const url = canonical(path);

export const metadata: Metadata = {
  title: AR_LEADAR.metaTitle,
  description: AR_LEADAR.metaDescription,
  keywords: AR_LEADAR.keywordCluster,
  alternates: { canonical: url },
  // Hidden 2026-11-25 by owner: reachable by direct link only, not indexed or linked anywhere on the site.
  robots: { index: false, follow: false },
  ...socialMeta({
    url,
    title: `${AR_LEADAR.metaTitle} | ${SITE.name}`,
    description: AR_LEADAR.metaDescription,
  }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Medspa Marketing", path: "/medspa-marketing" },
  { name: "Aesthetic Record & LeadAR Consultant", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: AR_LEADAR.metaTitle,
  serviceType: "Aesthetic Record and LeadAR consulting",
  description: AR_LEADAR.metaDescription,
  url,
  areaServed: { "@type": "Country", name: "United States" },
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

function CardGrid({ items }: { items: { icon: Parameters<typeof Icon>[0]["name"]; title: string; text: string; href?: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
      {items.map((item) => (
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
  );
}

export default function AestheticRecordLeadarPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(AR_LEADAR_FAQS)]} />
      <main>
        <PageHero tone="blue" eyebrow={AR_LEADAR.eyebrow} title={AR_LEADAR.h1} subtitle={AR_LEADAR.heroSub} crumbs={crumbs}>
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
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <h2 className="rg-display rg-svc-h2">{AR_LEADAR_INTRO.heading}</h2>
            {AR_LEADAR_INTRO.body.map((p) => (
              <p key={p} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 18 }}>{p}</p>
            ))}
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--navy)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Who You Work With</span>
              <h2 className="rg-display rg-svc-h2" style={{ color: "var(--cream)" }}>Ten Years Inside Aesthetic Record, Between Us</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="why-grid-responsive">
              {AR_LEADAR_TEAM.map((p) => (
                <div key={p.name} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 24, alignItems: "start" }}>
                  <Image src={p.photo} alt={`${p.name}, ${p.role} of RGV Performance Marketing`} width={140} height={160} style={{ width: "100%", height: "auto", aspectRatio: "7 / 8", objectFit: "cover", objectPosition: "top", borderRadius: "var(--r-xl)" }} />
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--cream)" }}>{p.name}</h3>
                    <p style={{ fontSize: 14, color: "rgba(253,248,236,0.7)", marginTop: 2 }}>{p.role}</p>
                    <p style={{ fontSize: 15.5, color: "rgba(253,248,236,0.86)", lineHeight: 1.7, marginTop: 12 }}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="rg-hero-secondary" style={{ display: "inline-block", marginTop: 32 }}>Meet the team</Link>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Software Help</span>
              <h2 className="rg-display rg-svc-h2">Where We Help With Aesthetic Record & LeadAR</h2>
            </div>
            <CardGrid items={AR_LEADAR_HELP} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Beyond the Software</span>
              <h2 className="rg-display rg-svc-h2">Websites, Google and AI for Your Medspa</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 14 }}>
                Your software works best when new clients keep coming in. That&apos;s the rest of what we do, all run as one team.
              </p>
            </div>
            <CardGrid items={AR_LEADAR_SERVICES} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">How It Starts</span>
              <h2 className="rg-display rg-svc-h2">Three Easy Steps</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {AR_LEADAR_STEPS.map((step, i) => (
                <div key={step.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <div className="rg-step-dot rg-display">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">FAQ</span>
              <h2 className="rg-display rg-svc-h2">Aesthetic Record & LeadAR Questions</h2>
            </div>
            <FaqAccordion items={AR_LEADAR_FAQS} />
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, maxWidth: "80ch", margin: "var(--s7) auto 0", textAlign: "center" }}>
              {AR_LEADAR_DISCLAIMER}
            </p>
          </div>
        </section>

        <InnerCTA
          heading="Get Even More Out of Aesthetic Record & LeadAR"
          text="Fifteen minutes with someone who worked there. Tell us what you want your software to do for you, and we'll show you where to start."
        />
      </main>
    </>
  );
}
