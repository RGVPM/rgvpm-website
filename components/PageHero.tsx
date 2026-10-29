import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

/**
 * Inner-page header.
 *
 * `tone="blue"` is the homepage hero's look (bright blue band, cream type,
 * drifting glow, a HAT pill for the eyebrow) and is what every service page
 * uses. `tone="navy"` is the older dark header, still used by pages that
 * haven't moved to the new look yet.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  accent = "var(--blue)",
  tone = "navy",
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  accent?: string;
  tone?: "navy" | "blue";
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  if (tone === "blue") {
    return (
      <section
        className="rg-glow-band"
        style={{
          background: "linear-gradient(180deg, var(--blue) 0%, #0A82DD 100%)",
          paddingTop: "clamp(112px, 13vh, 140px)",
          paddingBottom: "clamp(64px, 8vh, 88px)",
        }}
      >
        <div className="rg-container" style={{ position: "relative" }}>
          {crumbs && <Breadcrumbs items={crumbs} dark inHero />}
          <span className="rg-pill rg-pill--cream hero-animate">{eyebrow}</span>
          <h1
            className="rg-display hero-animate"
            style={{ fontSize: "clamp(42px,5.4vw,72px)", lineHeight: 0.95, color: "var(--cream)", margin: "18px 0 20px", maxWidth: 880, animationDelay: "0.06s" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="hero-animate"
              style={{ fontSize: 18, color: "rgba(253,248,236,0.94)", lineHeight: 1.65, maxWidth: 640, margin: 0, animationDelay: "0.14s" }}
            >
              {subtitle}
            </p>
          )}
          {children && (
            <div className="hero-animate" style={{ animationDelay: "0.22s" }}>
              {children}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--navy)", position: "relative", overflow: "hidden", paddingTop: 104, paddingBottom: 72 }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035,
        backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div style={{
        position: "absolute", right: -120, top: -120, width: 560, height: 560, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent === "var(--orange)" ? "rgba(242,107,29,0.16)" : "rgba(11,140,235,0.14)"} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        {crumbs && <Breadcrumbs items={crumbs} dark inHero />}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, background: accent === "var(--orange)" ? "var(--orange-dim)" : "rgba(11,140,235,0.15)", padding: "6px 14px", borderRadius: 2, borderLeft: `2px solid ${accent}` }}>
          {eyebrow}
        </span>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,5vw,68px)", lineHeight: 0.98, color: "#fff", letterSpacing: "0.02em", margin: "18px 0 18px", maxWidth: 820 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 620 }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
