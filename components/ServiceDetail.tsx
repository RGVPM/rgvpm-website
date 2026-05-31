import Link from "next/link";
import type { Service } from "@/lib/services";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedServices from "@/components/RelatedServices";
import InnerCTA from "@/components/InnerCTA";

const stepAccents = ["var(--orange)", "var(--teal)", "#6E86B8", "var(--navy)"];

export default function ServiceDetail({ service }: { service: Service }) {
  return (
    <main>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        subtitle={service.heroSub}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortName, path: `/services/${service.slug}` },
        ]}
      >
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
          <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
            View Plans →
          </Link>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
            Talk to Us
          </Link>
        </div>
      </PageHero>

      {/* What it is */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--orange-wash)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", marginBottom: 24 }}>
            <Icon name={service.icon} size={28} color="var(--orange)" />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, marginBottom: 24 }}>
            {service.whatItIs.heading}
          </h2>
          {service.whatItIs.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* How we do it */}
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
              Our Process
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 16px" }}>
              {service.howWeDoIt.heading}
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65 }}>{service.howWeDoIt.intro}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${service.howWeDoIt.steps.length > 3 ? 2 : service.howWeDoIt.steps.length},1fr)`, gap: 20 }} className="svc-grid-responsive">
            {service.howWeDoIt.steps.map((step, i) => {
              const accent = stepAccents[i % stepAccents.length];
              return (
                <div key={step.title} style={{ background: "#fff", border: "1px solid var(--border)", borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: "28px 26px", position: "relative" }}>
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
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="why-grid-responsive">
            <div>
              <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
                The Right Fit
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 18px" }}>
                {service.whoItsFor.heading}
              </h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>{service.whoItsFor.intro}</p>
            </div>
            <div>
              {service.whoItsFor.bullets.map((b) => (
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
      <section style={{ padding: "88px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
              {service.shortName} Questions, Answered
            </h2>
          </div>
          <FaqAccordion items={service.faqs} />
        </div>
      </section>

      <RelatedServices slugs={service.related} />
      <InnerCTA />
    </main>
  );
}
