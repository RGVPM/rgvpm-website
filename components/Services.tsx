const services = [
  {
    icon: "📍",
    title: "Google Business Profile & Local Visibility",
    text: "Get found when customers nearby search for what you offer. We optimize your Google presence and lock down NAP consistency across all directories.",
    features: ["GBP setup & full optimization", "NAP audit & citation consistency", "Review generation automation"],
  },
  {
    icon: "🔍",
    title: "Local SEO",
    text: "Rank higher in Google searches for your city and service area. We handle on-page optimization, content, and link building so you get found — and stay found.",
    features: ["On-page SEO & keyword targeting", "Local content creation", "Citation building & link outreach"],
  },
  {
    icon: "📢",
    title: "Paid Advertising",
    text: "Google and Meta campaigns built for ROI — not just impressions. We track every lead and optimize constantly.",
    features: ["Google Search & Display Ads", "Facebook & Instagram Ads", "Retargeting campaigns"],
  },
  {
    icon: "💬",
    title: "Two-Way SMS & Email Marketing",
    text: "Reach your customers where they actually read — text and email. Respond to inquiries from one inbox and blast promos, announcements, and follow-ups to your list.",
    features: ["Two-way SMS & email inbox", "Broadcast campaigns to your list", "Automated follow-up sequences"],
  },
  {
    icon: "📅",
    title: "Social Media & Newsletter",
    text: "Stay top of mind with consistent social content and a monthly newsletter your customers actually want to read. You pick the topics — we handle the rest.",
    features: ["Social media planner & scheduler", "Monthly newsletter (you pick the topic)", "Bilingual content available"],
  },
  {
    icon: "⚙️",
    title: "Lead Management & Automation",
    text: "Never lose a lead again. We build pipelines that capture every inquiry, respond instantly, and nurture prospects until they book.",
    features: ["Lead pipeline dashboard", "Automated SMS + email follow-up", "Appointment scheduling automation"],
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: "96px 0", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", background: "var(--orange-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--orange)" }}>
            What We Do
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,4vw,54px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 16px" }}>
            Everything You Need to Win Online
          </h2>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65 }}>
            From showing up on Google to turning leads into booked appointments — we handle the full picture.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
          {services.map((svc) => (
            <div
              key={svc.title}
              style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 30, transition: "all 0.2s", position: "relative", overflow: "hidden" }}
              className="svc-card"
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{svc.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{svc.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{svc.text}</p>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                {svc.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--muted)", marginBottom: 5 }}>
                    <span style={{ color: "var(--orange)", fontWeight: 700, flexShrink: 0 }}>→</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
