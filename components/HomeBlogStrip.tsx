import Link from "next/link";
import Icon from "@/components/Icon";
import { POSTS } from "@/lib/posts";

const accents = ["var(--orange)", "var(--teal)", "#6E86B8"];

/** "From Our Blog" homepage strip — surfaces the latest posts and passes
 *  homepage link authority to them. Shows the 3 most recent. */
export default function HomeBlogStrip() {
  const posts = POSTS.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section style={{ padding: "88px 0", background: "var(--cream)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ display: "inline-flex", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", background: "var(--teal-dim)", padding: "6px 14px", borderRadius: 2, borderLeft: "2px solid var(--teal)" }}>
              From Our Blog
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,3.5vw,46px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.0, margin: "12px 0 0" }}>
              Local Marketing, Made Practical
            </h2>
          </div>
          <Link href="/blog" style={{ fontSize: 14, fontWeight: 700, color: "var(--orange)", textDecoration: "none", whiteSpace: "nowrap" }}>
            View all articles →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="svc-grid-responsive">
          {posts.map((p, i) => {
            const accent = accents[i % accents.length];
            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="svc-card"
                style={{ background: "#fff", border: "1px solid var(--border)", borderTop: `4px solid ${accent}`, borderRadius: 10, padding: 28, textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 10, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={p.icon} size={23} color={accent} />
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>
                  {p.category} · {p.readMinutes} min
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{p.excerpt}</p>
                <div style={{ marginTop: "auto", fontSize: 13, fontWeight: 700, color: accent }}>Read the guide →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
