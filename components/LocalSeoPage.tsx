import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import {
  LOCAL_SEO_INCLUDED,
  LOCAL_SEO_STEPS,
  LOCAL_SEO_WHO,
  LOCAL_SEO_FAQS,
  LOCAL_SEO_RELATED,
} from "@/lib/localSeo";

const stepAccents = ["var(--orange)", "var(--teal)", "#6E86B8"];

export interface LocalSeoPageProps {
  eyebrow: string;
  h1: string;
  heroSub: string;
  crumbs: { name: string; path: string }[];
  cityIntro?: { heading: string; body: string[] };
  backToMain?: boolean;
}

export default function LocalSeoPage({ eyebrow, h1, heroSub, crumbs, cityIntro, backToMain }: LocalSeoPageProps) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={h1} subtitle={heroSub} crumbs={crumbs}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
            Get a Free Ranking Review →
          </Link>
          <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
            View Plans
          </Link>
        </div>
      </PageHero>

      {/* City-specific intro */}
      {cityIntro && (
        <section style={{ padding: "72px 0 8px", background: "#fff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, marginBottom: 20 }}>
              {cityIntro.heading}
            </h2>
            {cityIntro.body.map((p, i) => (
              <p key={i} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>{p}</p>
            ))}
            {backToMain && (
              <Link href="/services/local-seo" style={{ display: "inline-flex", fontSize: 14, fontWeight: 700, color: "var(--orange)", textDecoration: "none" }}>
                ← Explore our full local SEO services
              </Link>
            )}
          </div>
        </section>
      )}

      {/* What's included */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
              What&apos;s Included
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 16px" }}>
              Everything It Takes to Rank Locally
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65 }}>
              A complete local SEO program — built to move you up the map pack and into the searches that bring in customers.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
            {LOCAL_SEO_INCLUDED.map((item) => (
              <div key={item.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 28 }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--orange-wash)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", marginBottom: 14 }}>
                  <Icon name={item.icon} size={23} color="var(--orange)" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
              How It Works
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
              Our Local SEO Process
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
            {LOCAL_SEO_STEPS.map((step, i) => {
              const accent = stepAccents[i % stepAccents.length];
              return (
                <div key={step.title} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: "28px 26px" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: accent, letterSpacing: "0.04em", marginBottom: 10 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="why-grid-responsive">
            <div>
              <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
                The Right Fit
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 18px" }}>
                {LOCAL_SEO_WHO.heading}
              </h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>{LOCAL_SEO_WHO.intro}</p>
            </div>
            <div>
              {LOCAL_SEO_WHO.bullets.map((b) => (
                <div key={b} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: "var(--teal-dim)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
              Local SEO Questions, Answered
            </h2>
          </div>
          <FaqAccordion items={LOCAL_SEO_FAQS} />
        </div>
      </section>

      {/* Related services */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
              Keep Exploring
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,44px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
              Related Services
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
            {LOCAL_SEO_RELATED.map((rel, i) => {
              const accent = stepAccents[i % stepAccents.length];
              return (
                <Link key={rel.href} href={rel.href} className="svc-card" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 28, textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", color: accent, marginBottom: 14 }}>
                    <Icon name={rel.icon} size={23} color={accent} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{rel.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{rel.text}</p>
                  <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: accent }}>Learn more →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <InnerCTA />
    </main>
  );
}
