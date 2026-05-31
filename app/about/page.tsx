import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, localBusinessSchema, SITE } from "@/lib/site";

const url = canonical("/about");

export const metadata: Metadata = {
  title: "About Us — Locally Rooted Digital Marketing",
  description:
    "RGV Performance Marketing is a locally rooted, AI-powered digital marketing team helping small businesses get found online and turn searches into customers. Learn our story.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `About ${SITE.name}`,
    description:
      "A locally rooted, AI-powered digital marketing team built to help small businesses grow.",
    siteName: SITE.name,
  },
};

const values = [
  { icon: "cpu" as const, title: "AI-Powered, Human-Led", text: "We use modern AI tools to move faster and smarter, but every strategy and decision is led by people who care about your results." },
  { icon: "chart" as const, title: "Results Over Vanity", text: "We report on leads, calls, and booked appointments — the numbers that actually grow a business — not impressions and likes." },
  { icon: "shield" as const, title: "No Long-Term Traps", text: "Month-to-month, always. We keep clients by earning their business every month, not by locking them into contracts." },
  { icon: "users" as const, title: "Bilingual & Local", text: "Rooted in the Rio Grande Valley, we create content in English and Spanish to help you reach every customer in your market." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <main>
        <PageHero
          eyebrow="About Us"
          title="Locally Rooted. Built to Scale."
          subtitle="We're a small, focused team on a simple mission: give local businesses the digital systems that big competitors take for granted — and make them affordable."
          crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
        />

        {/* Story */}
        <section style={{ padding: "88px 0", background: "#fff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
              Our Story
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 24px" }}>
              Why We Exist
            </h2>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>
              Most small businesses are invisible online — not because their product isn&apos;t good, but because nobody built them a system to get found. The owner is busy running the business, the marketing falls to the bottom of the list, and the competitor down the street who simply shows up first wins the customer.
            </p>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18 }}>
              That&apos;s the gap we exist to close. RGV Performance Marketing builds the digital growth engine — Google Business Profile, local SEO, paid ads, lead management, and ongoing content — and runs it for you, so getting found online stops being a project you never get to.
            </p>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75 }}>
              We pair modern AI tools with hands-on strategy to deliver results that used to require a team three times our size, at prices a local business can actually afford. Straightforward plans, real reporting, and no long-term contracts — just steady, measurable growth.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "88px 0", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
              <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
                What We Stand For
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
                Our Values
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="svc-grid-responsive">
              {values.map((v, i) => {
                const accent = i % 2 === 0 ? "var(--orange)" : "var(--teal)";
                return (
                  <div key={v.title} style={{ background: "#fff", border: "1px solid var(--border)", borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: "28px 26px", display: "flex", gap: 18 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={v.icon} size={24} color={accent} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{v.title}</h3>
                      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{v.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "72px 0", background: "var(--navy)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="svc-grid-responsive">
              {[
                { num: "2 Wks", label: "Average time to go live" },
                { num: "3", label: "Simple plans, no surprises" },
                { num: "EN+ES", label: "Bilingual content available" },
                { num: "956", label: "Locally rooted, broadly serving" },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: "var(--orange)", letterSpacing: "0.04em" }}>{m.num}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore services */}
        <section style={{ padding: "72px 0", background: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3vw,40px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, marginBottom: 16 }}>
              See How We Can Help
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65, marginBottom: 28 }}>
              Explore the services that make up your growth engine, or jump straight to plans and pricing.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--navy)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
                Explore Services →
              </Link>
              <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", background: "var(--cream-dark)", color: "var(--navy)", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
