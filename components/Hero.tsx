export default function Hero() {
  const services = [
    { icon: "🌐", name: "Websites & SEO", sub: "Built to rank. Built to convert." },
    { icon: "📢", name: "Paid Advertising", sub: "Google, Meta, retargeting" },
    { icon: "💬", name: "Two-Way SMS & Email", sub: "Inbox, blasts & automation" },
    { icon: "📅", name: "Social Media Planner", sub: "Schedule posts across platforms" },
    { icon: "⚙️", name: "Lead Management", sub: "Pipelines, follow-up, appointments" },
  ];

  return (
    <section
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", background: "var(--navy)",
        position: "relative", overflow: "hidden", paddingTop: 72,
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035,
        backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", right: -100, top: -100, width: 700, height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,98,26,0.15) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
          className="hero-grid-responsive">
          {/* Left */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-dm-mono), monospace", fontSize: 11,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--orange)", background: "rgba(232,98,26,0.15)",
                padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)",
              }}>
                AI-Powered Digital Marketing
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(50px, 6vw, 84px)", lineHeight: 0.95,
              color: "#fff", letterSpacing: "0.02em", marginBottom: 24,
            }}>
              More Leads.<br />
              <span style={{ color: "var(--orange)" }}>More Customers.</span><br />
              Less Guesswork.
            </h1>
            <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
              We build the digital systems that grow your business — websites, SEO, ads, lead management, and more. Straightforward plans, real results.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
                View Plans →
              </a>
              <a href="mailto:info@rgvperformancemarketing.com" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
                Talk to Us
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { num: "3", label: "Simple plans to choose from" },
                { num: "AI", label: "Powered systems & tools" },
                { num: "EN+ES", label: "Bilingual content available" },
                { num: "956", label: "Locally rooted. Broadly serving." },
              ].map((s) => (
                <div key={s.num}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "var(--orange)", letterSpacing: "0.04em" }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="hidden lg:block">
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 28, backdropFilter: "blur(8px)" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 18 }}>
                // What we handle
              </div>
              {services.map((svc) => (
                <div key={svc.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 7, background: "var(--orange-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                    {svc.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{svc.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{svc.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
