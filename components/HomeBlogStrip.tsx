import Link from "next/link";
import { POSTS } from "@/lib/posts";
import BlogCard, { blogCardAccent } from "@/components/BlogCard";

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
          {posts.map((p, i) => (
            <BlogCard key={p.slug} post={p} accent={blogCardAccent(i)} heading="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
