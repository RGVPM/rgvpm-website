import Link from "next/link";
import Icon from "@/components/Icon";
import { getService } from "@/lib/services";

const accents = ["var(--orange)", "var(--teal)", "#6E86B8"];

export default function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getService).filter(Boolean);
  if (related.length === 0) return null;

  return (
    <section style={{ padding: "88px 0", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
            Keep Exploring
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,44px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
            Related Services
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${related.length},1fr)`, gap: 20 }} className="svc-grid-responsive">
          {related.map((svc, i) => {
            const accent = accents[i % accents.length];
            return (
              <Link
                key={svc!.slug}
                href={`/services/${svc!.slug}`}
                className="svc-card"
                style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 28, textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", color: accent, marginBottom: 14 }}>
                  <Icon name={svc!.icon} size={23} color={accent} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{svc!.cardTitle}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{svc!.cardText}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: accent }}>Learn more →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
