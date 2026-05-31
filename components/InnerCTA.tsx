import Link from "next/link";

export default function InnerCTA({
  heading = "Ready to Grow Your Business?",
  text = "Pick your plan and we'll have you up and running in two weeks. No long-term commitment required.",
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section style={{ padding: "88px 0", background: "var(--orange)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,5vw,60px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1.0, marginBottom: 18 }}>
            {heading}
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: 36 }}>
            {text}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "var(--navy)", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none" }}>
              View Plans →
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 4, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
