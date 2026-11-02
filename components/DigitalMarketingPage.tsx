import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import CityDetails from "@/components/CityDetails";
import CityLinks from "@/components/CityLinks";
import { PLANS, FOUNDER, SITE } from "@/lib/site";
import { CLIENTS } from "@/lib/clients";
import {
  DIGITAL_MARKETING,
  DIGITAL_MARKETING_STEPS,
  digitalMarketingCityCrumbs,
  digitalMarketingCityFaqs,
  type DigitalMarketingCity,
} from "@/lib/digitalMarketing";

const accents = ["var(--orange)", "var(--teal)", "#6E86B8"];

const labelStyle = (color: string, bg: string) => ({
  display: "inline-flex",
  fontFamily: "var(--font-dm-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color,
  background: bg,
  padding: "6px 14px",
  borderRadius: 2,
  borderLeft: `2px solid ${color}`,
});

const h2Style = { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0 };

/**
 * Full-service "digital marketing in {city}" page: direct answer, what's
 * different about the market, every service in one program, the plans from
 * lib/site.ts, proof, process and FAQ.
 */
export default function DigitalMarketingPage({ city }: { city: DigitalMarketingCity }) {
  const faqs = digitalMarketingCityFaqs(city);
  return (
    <main>
      <PageHero eyebrow={DIGITAL_MARKETING.eyebrow} title={city.h1} subtitle={city.heroSub} crumbs={digitalMarketingCityCrumbs(city)}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
            Book a Free Strategy Call →
          </Link>
          <a href="#plans" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
            See Plans
          </a>
        </div>
      </PageHero>

      {/* Direct answer + intro */}
      <section style={{ padding: "72px 0 8px", background: "#fff" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, marginBottom: 20 }}>
            {city.intro.heading}
          </h2>
          <p style={{ fontSize: 17.5, color: "var(--navy)", lineHeight: 1.7, marginBottom: 18, fontWeight: 500 }}>{city.intro.answer}</p>
          {city.intro.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>{p}</p>
          ))}
          <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>{DIGITAL_MARKETING.entityLine}</p>
        </div>
      </section>

      <CityDetails {...city.details} />

      {/* Services in one program */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={labelStyle("var(--orange)", "var(--orange-dim)")}>One Team, One Program</span>
            <h2 style={{ ...h2Style, margin: "12px 0 16px" }}>Everything Your {city.name} Business Needs Online</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65 }}>
              Each piece works better when the same team runs the others. Your plan decides which ones we run for you.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
            {city.services.map((s, i) => {
              const accent = accents[i % accents.length];
              return (
                <Link key={s.title} href={s.href} className="svc-card" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 28, textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon name={s.icon} size={23} color={accent} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65 }}>{s.text}</p>
                  <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: accent }}>Learn more →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans: prices come only from PLANS in lib/site.ts */}
      <section id="plans" style={{ padding: "88px 0", background: "#fff", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
            <span style={labelStyle("var(--teal)", "var(--teal-dim)")}>Plans</span>
            <h2 style={{ ...h2Style, margin: "12px 0 16px" }}>Month-to-Month Plans for {city.name} Businesses</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65 }}>
              Same published prices for every city. No long-term contract. Ad spend, where a plan includes ads, is paid to Google or Meta directly.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="plans-grid-responsive">
            {PLANS.map((p, i) => (
              <div key={p.name} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderTop: `4px solid ${accents[i % accents.length]}`, borderRadius: 10, padding: "26px 22px", display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{p.name}</h3>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "var(--navy)", letterSpacing: "0.02em", lineHeight: 1 }}>
                  ${p.price.toLocaleString()}
                  <span style={{ fontFamily: "inherit", fontSize: 18, color: "var(--muted)" }}>/mo</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginTop: 12 }}>{p.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/pricing" style={{ fontSize: 15, fontWeight: 700, color: "var(--orange)", textDecoration: "none" }}>
              Compare everything each plan includes →
            </Link>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="why-grid-responsive">
            <div>
              <span style={labelStyle("var(--orange)", "var(--orange-dim)")}>Who You&apos;d Work With</span>
              <h2 style={{ ...h2Style, margin: "12px 0 18px" }}>A Valley Team You Can Call</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
                We&apos;re based in {SITE.city}, {SITE.region}, a short drive from {city.name}. {FOUNDER ? `${FOUNDER.name} and our team` : "Our team"} answer the phone at {SITE.phoneHuman}, and our prices are published for anyone to see.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["Month-to-month plans, no long-term contract", "Websites, profiles and ads in English and Spanish", "A plain-English report every month on calls, leads and rankings"].map((b) => (
                  <li key={b} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: "var(--teal-dim)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 15, color: "var(--navy)", lineHeight: 1.55 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 14 }}>Some of the businesses that work with us</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {CLIENTS.map((c) => (
                  <span key={c.name} style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", background: "#fff", border: "1px solid var(--border)", borderRadius: 6, padding: "9px 14px" }}>
                    {c.name.split(" \u2014 ")[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={labelStyle("var(--teal)", "var(--teal-dim)")}>How It Works</span>
            <h2 style={{ ...h2Style, margin: "12px 0 0" }}>How We Start With a {city.name} Business</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
            {DIGITAL_MARKETING_STEPS.map((step, i) => {
              const accent = accents[i % accents.length];
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

      {/* FAQ */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <span style={labelStyle("var(--orange)", "var(--orange-dim)")}>FAQ</span>
            <h2 style={{ ...h2Style, margin: "12px 0 0" }}>{city.name} Digital Marketing Questions</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CityLinks eyebrow="Keep Exploring" heading={`More for ${city.name} Businesses`} links={city.nearby} />

      <InnerCTA
        heading={`Get More Calls in ${city.name}`}
        text="Book a free strategy call. We'll look at your website and Google listing and tell you what we'd fix first. Month to month, no long-term contract."
      />
    </main>
  );
}
