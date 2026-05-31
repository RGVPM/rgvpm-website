import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  accent = "var(--orange)",
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  accent?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section style={{ background: "var(--navy)", position: "relative", overflow: "hidden", paddingTop: 104, paddingBottom: 72 }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035,
        backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div style={{
        position: "absolute", right: -120, top: -120, width: 560, height: 560, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent === "var(--teal)" ? "rgba(42,157,143,0.16)" : "rgba(232,98,26,0.14)"} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        {crumbs && <Breadcrumbs items={crumbs} dark inHero />}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, background: accent === "var(--teal)" ? "var(--teal-dim)" : "rgba(232,98,26,0.15)", padding: "6px 14px", borderRadius: 2, borderLeft: `2px solid ${accent}` }}>
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
