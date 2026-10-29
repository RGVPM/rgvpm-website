import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Script from "next/script";
import { canonical, breadcrumbSchema, SITE, socialMeta } from "@/lib/site";

const url = canonical("/contact");

export const metadata: Metadata = {
  title: "Contact — Get a Free Marketing Consultation",
  description:
    "Get in touch with RGV Performance Marketing. Tell us about your business and we'll show you how to get found online and turn more searches into customers.",
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `Contact ${SITE.name}`,
    description:
      "Tell us about your business and we'll map out your path to more leads.",
  }),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <main>
        <Script
          src="https://api.rgvperformancemarketing.com/js/form_embed.js"
          strategy="afterInteractive"
        />
        <PageHero
          tone="blue"
          eyebrow="Contact"
          title={
            <>
              Let&rsquo;s Talk About Your Growth.
              <br />
              <span style={{ color: "var(--navy)" }}>No Pressure. No Jargon.</span>
            </>
          }
          subtitle="Tell us a little about your business and what you're trying to grow. We'll get back to you with honest, specific next steps, usually the same business day."
          crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
        >
          <div className="rg-hero-actions" style={{ display: "flex", alignItems: "center", gap: "var(--s5)", flexWrap: "wrap", marginTop: 32 }}>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
              Book a free call <span aria-hidden="true">→</span>
            </a>
            <a href={`tel:${SITE.phone}`} className="rg-hero-secondary">
              Or call {SITE.phoneHuman}
            </a>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container rg-contact-grid">
            {/* Form */}
            <div className="rg-contact-form rg-reveal">
              <span className="rg-pill">Send a message</span>
              <h2 className="rg-display rg-svc-h2" style={{ margin: "var(--s4) 0 var(--s2)" }}>Tell Us About Your Business</h2>
              <p className="rg-svc-body">Fill this out and we&apos;ll be in touch, usually the same business day.</p>
              <iframe
                src="https://api.rgvperformancemarketing.com/widget/form/1EFO5mH7pJ9tQZmLuLMK"
                style={{ width: "100%", height: 858, border: "none", borderRadius: 8 }}
                id="inline-1EFO5mH7pJ9tQZmLuLMK"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Site Form"
                data-height="858"
                data-layout-iframe-id="inline-1EFO5mH7pJ9tQZmLuLMK"
                data-form-id="1EFO5mH7pJ9tQZmLuLMK"
                title="Site Form"
              />
            </div>

            {/* Contact info */}
            <aside className="rg-reveal">
              <div className="rg-svc-card">
                <p className="rg-svc-card-kicker">Other ways to reach us</p>
                <ul className="rg-contact-list">
                  {[
                    { icon: "phone" as const, label: "Call", value: SITE.phoneHuman, href: `tel:${SITE.phone}` },
                    { icon: "mail" as const, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                    { icon: "map-pin" as const, label: "Based in", value: `${SITE.city}, ${SITE.region}` },
                    { icon: "globe" as const, label: "Serving", value: "Businesses across the U.S." },
                    { icon: "bolt" as const, label: "Response time", value: "Same business day" },
                  ].map((item) => (
                    <li key={item.label}>
                      <span className="rg-contact-icon" aria-hidden="true">
                        <Icon name={item.icon} size={20} color="var(--blue)" />
                      </span>
                      <div>
                        <p className="rg-contact-label">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="rg-contact-value">{item.value}</a>
                        ) : (
                          <p className="rg-contact-value">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rg-hat rg-hat--navy" style={{ marginTop: "var(--s5)" }}>
                <span className="rg-hat-pill">Ready already?</span>
                <h2 className="rg-display rg-hat-title">Skip Ahead</h2>
                <span className="rg-hat-rule" aria-hidden="true" />
                <p className="rg-hat-text">Know what you need? Browse the plans and get started in minutes.</p>
                <a href="/pricing" className="rg-btn rg-cta-cream" style={{ marginTop: "var(--s5)" }}>
                  View plans <span aria-hidden="true">→</span>
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
