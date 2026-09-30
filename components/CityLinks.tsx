import Link from "next/link";

export interface CityLink {
  href: string;
  label: string;
}

/**
 * A row of descriptive internal links ("Local SEO in Brownsville, TX →").
 * Used on service hubs to reach every city page, and on city pages to reach
 * the related services and neighbouring cities. Same pill style as the blog's
 * "Keep Reading" links.
 */
export default function CityLinks({
  eyebrow = "Across the Valley",
  heading,
  intro,
  links,
  background = "#fff",
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  links: CityLink[];
  background?: string;
}) {
  if (!links.length) return null;
  return (
    <section style={{ padding: "72px 0", background }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
          <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
            {eyebrow}
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3.2vw,40px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, margin: "12px 0 0" }}>
            {heading}
          </h2>
          {intro && <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.65, marginTop: 14 }}>{intro}</p>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", background: background === "#fff" ? "var(--cream)" : "#fff", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 16px", textDecoration: "none" }}>
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
