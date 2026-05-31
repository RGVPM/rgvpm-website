import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, localBusinessSchema, SITE } from "@/lib/site";

const url = canonical("/contact");

export const metadata: Metadata = {
  title: "Contact — Get a Free Marketing Consultation",
  description:
    "Get in touch with RGV Performance Marketing. Tell us about your business and we'll show you how to get found online and turn more searches into customers.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Contact ${SITE.name}`,
    description: "Tell us about your business and we'll map out your path to more leads.",
    siteName: SITE.name,
  },
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 6,
  border: "1px solid var(--border)",
  background: "#fff",
  fontSize: 14,
  fontFamily: "var(--font-dm-sans), sans-serif",
  color: "var(--navy)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--navy)",
  marginBottom: 6,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Let's Talk About Your Growth"
          subtitle="Tell us a little about your business and what you're trying to grow. We'll get back to you with honest, specific next steps — no pressure, no jargon."
          crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
        />

        <section style={{ padding: "88px 0", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "start" }} className="why-grid-responsive">
              {/* Form */}
              <div style={{ background: "#fff", border: "1px solid var(--border)", borderTop: "4px solid var(--orange)", borderRadius: 12, padding: "36px 32px" }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, marginBottom: 8 }}>
                  Send Us a Message
                </h2>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 24 }}>
                  Fill this out and we&apos;ll be in touch quickly — usually the same business day.
                </p>
                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact?sent=1">
                  <input type="hidden" name="form-name" value="contact" />
                  <p style={{ display: "none" }}>
                    <label>
                      Don&apos;t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="svc-grid-responsive">
                    <div>
                      <label style={labelStyle} htmlFor="name">Name</label>
                      <input style={inputStyle} type="text" id="name" name="name" required />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="business">Business</label>
                      <input style={inputStyle} type="text" id="business" name="business" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="svc-grid-responsive">
                    <div>
                      <label style={labelStyle} htmlFor="email">Email</label>
                      <input style={inputStyle} type="email" id="email" name="email" required />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="phone">Phone</label>
                      <input style={inputStyle} type="tel" id="phone" name="phone" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle} htmlFor="message">What would you like to grow?</label>
                    <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} id="message" name="message" required />
                  </div>
                  <button
                    type="submit"
                    style={{ width: "100%", background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 6, border: "none", cursor: "pointer" }}
                  >
                    Send Message →
                  </button>
                </form>
              </div>

              {/* Contact info */}
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, marginBottom: 24 }}>
                  Other Ways to Reach Us
                </h2>
                {[
                  { icon: "mail" as const, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                  { icon: "map-pin" as const, label: "Based In", value: `${SITE.city}, ${SITE.region}` },
                  { icon: "globe" as const, label: "Serving", value: `${SITE.areaServed} & beyond` },
                  { icon: "bolt" as const, label: "Response Time", value: "Same business day" },
                ].map((item, i) => {
                  const accent = i % 2 === 0 ? "var(--orange)" : "var(--teal)";
                  return (
                    <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "center", padding: "18px 0", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name={item.icon} size={21} color={accent} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontFamily: "var(--font-dm-mono), monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", textDecoration: "none" }}>{item.value}</a>
                        ) : (
                          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>{item.value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div style={{ marginTop: 28, background: "var(--navy)", borderRadius: 12, padding: "26px 24px" }}>
                  <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 }}>
                    {"// Prefer to skip ahead?"}
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 16 }}>
                    Already know you&apos;re ready? Browse the plans and get started in minutes.
                  </p>
                  <a href="/pricing" style={{ display: "inline-flex", background: "#fff", color: "var(--navy)", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 4, textDecoration: "none" }}>
                    View Plans →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
