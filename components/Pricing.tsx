const plans = [
  {
    tier: "// Starter",
    name: "Plant the Flag",
    tagline: "Get your digital foundation locked in. Show up where customers are searching and stay in front of the ones you already have.",
    price: "$399",
    activation: "+ $399 one-time activation fee",
    features: [
      "Get found on Google (Business Profile setup & cleanup)",
      "Keep your name/address/phone consistent online",
      "Ask happy customers for reviews (we set it up)",
      "Catch leads from your site (form → your inbox)",
      "Texts & emails in one place",
      "Blast your list yourself when you want",
      "We write & send a monthly newsletter",
      "Simple monthly snapshot of what's working",
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
      "Local SEO (pages, Google profile depth, backlinks)",
      "Ads managed for you — Google or Meta (you fund the spend)",
      "We write & send email/SMS campaigns",
      "Social: you shoot, we edit & brand (1 reel + 1 creative + stories / week)",
      "Follow-ups on autopilot (missed-call text, sequences, reminders)",
      "See every lead in one pipeline",
      "Website chatbot that answers after hours",
      "Monthly strategy call",
    ],
    href: "https://buy.stripe.com/5kQaEXfHed0O3dwdZL7Zu0i",
    featured: true,
    accent: "var(--orange)",
  },
  {
    tier: "// Full Service",
    name: "Own the Market",
    tagline: "Dominate your category. Full-service execution across every channel with a dedicated strategist in your corner.",
    price: "$2,499",
    activation: "No activation fee",
    features: [
      "Everything in Build the Machine",
      "Ads on Google and Meta — $750/mo ad spend included",
      "We run social for you — posts + DMs (2 edited reels + 1 post + stories / week)",
      "Monthly on-site content with our content recruiter if local",
      "More automation — multi-channel nurture, lead scoring, monthly tune-up",
      "Dedicated account strategist",
      "Bi-weekly strategy calls",
      "Priority support",
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

        <p style={{ textAlign: "center", marginTop: 40, fontSize: 15, color: "rgba(255,255,255,0.8)" }}>
          Not sure which plan is right for you?{" "}
          <a
            href="https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--orange)", fontWeight: 700, textDecoration: "none" }}
          >
            Book a free discovery call →
          </a>
        </p>

        <p style={{ textAlign: "center", marginTop: 36, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          All plans are month-to-month. Activation is a one-time setup fee on Plant the Flag and Build the Machine only; Own the Market has no activation fee. On Build the Machine, ad spend is billed by Google and Meta (you fund the spend). On Own the Market, $750/mo ad spend is included; additional spend is billed separately. Website design is quoted separately on all plans.{" "}
          <a href="mailto:info@rgvperformancemarketing.com" style={{ color: "rgba(255,255,255,0.55)" }}>
            Questions? Email us.
          </a>
        </p>
        <p style={{ textAlign: "center", marginTop: 10, fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
          By subscribing you agree to our{" "}
          <a href="/terms" style={{ color: "rgba(255,255,255,0.55)" }}>
            Terms &amp; Conditions
          </a>
          .
        </p>
      </div>
    </section>
  );
}
