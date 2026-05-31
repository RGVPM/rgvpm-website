import Link from "next/link";
import Icon from "@/components/Icon";
import { services } from "@/lib/services";

// Each card alternates a subtle background tint + accent color for visual variety.
const tints = [
  { bg: "#fff", accent: "var(--orange)" },
  { bg: "var(--cream)", accent: "var(--teal)" },
  { bg: "var(--orange-wash)", accent: "var(--orange)" },
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
          {services.map((svc, i) => {
            const tint = tints[i % tints.length];
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                style={{ background: tint.bg, border: "1px solid var(--border)", borderRadius: 10, padding: 30, position: "relative", overflow: "hidden", textDecoration: "none", color: "inherit", display: "block" }}
                className="svc-card"
              >
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: tint.accent, marginBottom: 16 }}>
                  <Icon name={svc.icon} size={24} color={tint.accent} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{svc.cardTitle}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{svc.cardText}</p>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                  {svc.cardFeatures.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--muted)", marginBottom: 5 }}>
                      <span style={{ color: tint.accent, fontWeight: 700, flexShrink: 0 }}>→</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: tint.accent, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Learn more →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
