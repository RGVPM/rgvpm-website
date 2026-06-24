import Icon from "@/components/Icon";
import ClientMarquee from "@/components/ClientMarquee";

export function IndustryStrip() {
  return (
    <section style={{ padding: "60px 0", background: "var(--cream-dark)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <ClientMarquee />
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "01", icon: "target" as const, accent: "var(--orange)", title: "Diagnose", text: "We audit your current digital presence — website, Google profile, competitors — and pinpoint exactly where you're losing leads and visibility." },
    { num: "02", icon: "wrench" as const, accent: "var(--teal)", title: "Build", text: "We set up your growth engine: GBP optimization, NAP consistency, lead capture, automated follow-up, newsletters, and ad campaigns — all in one coordinated push." },
    { num: "03", icon: "chart" as const, accent: "var(--navy)", title: "Grow", text: "We execute, optimize, and report every month. You see exactly what's working, what we're improving, and how every dollar is performing." },
  ];
  return (
    <section id="how-it-works" style={{ padding: "96px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>The Process</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,4vw,54px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 16px" }}>Simple &amp; Fast</h2>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65 }}>We don&apos;t do 6-month onboarding. Most clients are up and running within two weeks.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="steps-grid-responsive">
          {steps.map((s) => (
            <div key={s.num} style={{ padding: "36px 28px", border: "1px solid var(--border)", borderLeft: `4px solid ${s.accent}`, borderRadius: 10, background: "var(--cream)", position: "relative", overflow: "hidden" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, color: "var(--cream-dark)", position: "absolute", top: -12, right: 12, lineHeight: 1, pointerEvents: "none" }}>{s.num}</div>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon name={s.icon} size={26} color={s.accent} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const points = [
    { icon: "cpu" as const, title: "AI-Powered. Human-Led.", text: "We use cutting-edge AI tools to work faster and smarter — so you get results that used to require a team three times our size." },
    { icon: "chart" as const, title: "No Vanity Metrics.", text: "We report on leads, calls, form fills, and booked appointments. Not impressions. You always know exactly what your investment is producing." },
    { icon: "calendar" as const, title: "Month-to-Month. No Traps.", text: "No long-term contracts. No fine print. We keep clients by delivering results — not by locking them in." },
    { icon: "bolt" as const, title: "Fast Onboarding.", text: "Most clients are live within two weeks. We move fast, communicate clearly, and don't waste your time with unnecessary back-and-forth." },
  ];
  return (
    <section id="why-us" style={{ padding: "96px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="why-grid-responsive">
          <div>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>Why Us</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,4vw,54px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 36px", textAlign: "left" }}>Built Different.<br />Built to Deliver.</h2>
            {points.map((p) => (
              <div key={p.title} style={{ display: "flex", gap: 18, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--orange-dim)", border: "1px solid rgba(232,98,26,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={p.icon} size={20} color="var(--orange)" /></div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 5 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{p.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--navy)", borderRadius: 12, padding: 36, position: "relative" }}>
            <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 18 }}>{"// Our approach"}</div>
            <div style={{ fontSize: 18, fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: 28 }}>
              &ldquo;Most small businesses are <strong style={{ color: "#fff", fontStyle: "normal", fontWeight: 700 }}>invisible online</strong> — not because their product isn&apos;t good, but because nobody built them a system to get found. That&apos;s the gap we exist to close.&rdquo;
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { num: "2 Wks", label: "Average time to go live" },
                { num: "3", label: "Simple plans, no surprises" },
                { num: "EN+ES", label: "Bilingual content available" },
                { num: "AI", label: "Powered tools & systems" },
              ].map((m) => (
                <div key={m.num}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, color: "var(--orange)" }}>{m.num}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, background: "var(--orange)", borderRadius: 8, padding: "16px 20px", boxShadow: "0 12px 36px rgba(232,98,26,0.3)" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff" }}>956</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Locally rooted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section style={{ padding: "96px 0", background: "var(--orange)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,5vw,66px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1.0, marginBottom: 18 }}>
            Ready to Grow Your Business?
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: 36 }}>
            Pick your plan and we&apos;ll have you up and running in two weeks. No long-term commitment required.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "var(--navy)", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
              Book a Free Call →
            </a>
            <a href="mailto:info@rgvperformancemarketing.com" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
