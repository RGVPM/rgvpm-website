const plans = [
  {
    tier: "// Starter",
    name: "Plant the Flag",
    tagline: "Get your digital foundation locked in. Show up where customers are searching and stay in front of the ones you already have.",
    price: "$399",
    activation: "+ $399 one-time activation fee",
    features: [
      "Google Business Profile setup & optimization",
      "NAP audit & citation consistency",
      "Review request automation",
      "Basic lead capture form (on your existing site)",
      "Two-way SMS & email inbox",
      "Monthly newsletter (you pick the topic, we write & send)",
      "Social media planner tool (self-schedule posts)",
      "Monthly snapshot report",
    ],
    href: "https://buy.stripe.com/28E00jcv2gd03dw1cZ7Zu0h",
    featured: false,
    accent: "var(--teal)",
  },
  {
    tier: "// Most Popular",
    name: "Build the Machine",
    tagline: "A full digital growth engine running 24/7 — SEO, ads, automation, and lead management all working together.",
    price: "$899",
    activation: "+ $399 one-time activation fee",
    features: [
      "Everything in Plant the Flag",
      "Local SEO (on-page, content, citations)",
      "Paid ad management (Google or Meta)",
      "Email & SMS broadcast campaigns",
      "Automated lead follow-up sequences",
      "Lead pipeline dashboard",
      "Appointment scheduling automation",
      "Monthly strategy calls",
    ],
    href: "https://buy.stripe.com/5kQaEXfHed0O3dwdZL7Zu0i",
    featured: true,
    accent: "var(--orange)",
  },
  {
    tier: "// Full Service",
    name: "Own the Market",
    tagline: "Dominate your category. Full-service execution across every channel with a dedicated strategist in your corner.",
    price: "$1,999",
    activation: "No activation fee",
    features: [
      "Everything in Build the Machine",
      "Multi-platform ads (Google + Meta)",
      "Full social media management",
      "Video content (Reels & Shorts)",
      "Advanced automation sequences",
      "Dedicated account strategist",
      "Bi-weekly strategy calls",
      "Monthly 1-hour session with our content creator",
      "Priority support — same-day response",
    ],
    href: "https://buy.stripe.com/aFa3cv1Qo7Gu29sf3P7Zu0j",
    featured: false,
    accent: "#6E86B8",
  },
];

export default function Pricing({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section id="pricing" style={{ padding: asPage ? "56px 0 96px" : "96px 0", background: "var(--navy)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "rgba(232,98,26,0.2)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
            Plans & Pricing
          </span>
          <Heading style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,4vw,54px)", letterSpacing: "0.03em", color: "#fff", lineHeight: 1.0, margin: "12px 0 16px" }}>
            {asPage ? "Digital Marketing Pricing & Plans" : "Pick Your Plan. Start Growing."}
          </Heading>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
            Transparent pricing. No long-term contracts. No hidden fees. Website design is available as a separate service on all plans.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="plans-grid-responsive">
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                borderRadius: 12, padding: "32px 28px 36px",
                border: plan.featured ? "1px solid var(--orange)" : "1px solid rgba(255,255,255,0.1)",
                borderTop: `4px solid ${plan.accent}`,
                background: plan.featured ? "var(--orange)" : "rgba(255,255,255,0.05)",
                display: "flex", flexDirection: "column",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
            >
              <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: plan.featured ? "rgba(255,255,255,0.75)" : plan.accent, marginBottom: 20 }}>
                {plan.tier}
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: "0.04em", color: "#fff", marginBottom: 6 }}>
                {plan.name}
              </div>
              <div style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)", lineHeight: 1.55, marginBottom: 24 }}>
                {plan.tagline}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 54, color: "#fff", letterSpacing: "0.02em", lineHeight: 1 }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.55)" }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: plan.featured ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)", marginBottom: 28 }}>
                {plan.activation}
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.12)", marginBottom: 24 }} />
              <div style={{ flex: 1, marginBottom: 28 }}>
                {plan.features.map((feat) => (
                  <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)", marginBottom: 11, lineHeight: 1.5 }}>
                    <span style={{ color: plan.featured ? "rgba(255,255,255,0.9)" : plan.accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {feat}
                  </div>
                ))}
              </div>
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 13, borderRadius: 4,
                  fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: 14,
                  textDecoration: "none", transition: "all 0.2s",
                  background: plan.featured ? "#fff" : "transparent",
                  color: plan.featured ? "var(--orange)" : "#fff",
                  border: plan.featured ? "1.5px solid #fff" : "1.5px solid rgba(255,255,255,0.3)",
                }}
              >
                Get Started →
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 36, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          All plans are month-to-month. Website design is a separate service. Ad spend (Google/Meta) is billed directly by the platform.{" "}
          <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "rgba(255,255,255,0.55)" }}>
            Questions? Email us.
          </a>
        </p>
      </div>
    </section>
  );
}
