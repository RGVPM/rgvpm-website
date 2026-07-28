import Link from "next/link";
import Icon from "@/components/Icon";
import { Label, Section } from "@/components/home/Primitives";
import { POSTS } from "@/lib/posts";

/**
 * Blog strip, reworked as one lead article plus supporting articles.
 * Every title, excerpt, category and read time is a server-rendered link
 * — nothing is hover-only, so the copy stays crawlable and readable.
 */
export default function BlogEditorial() {
  const posts = POSTS.slice(0, 3);
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <Section background="var(--cream)" labelledBy="blog-heading">
      <div className="rg-container">
        <div
          className="rg-reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "var(--s5)",
            flexWrap: "wrap",
            marginBottom: "var(--s8)",
          }}
        >
          <div>
            <Label>From Our Blog</Label>
            <h2
              id="blog-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
            >
              Local Marketing, Made Practical
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--orange-ink)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View all articles <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div
          className="rg-blog-feature"
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            gap: "clamp(24px, 3vw, 44px)",
            alignItems: "stretch",
          }}
        >
          {/* Lead article */}
          <Link
            href={`/blog/${lead.slug}`}
            className="rg-lead-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "var(--s7)",
              background: "var(--navy)",
              borderRadius: "var(--r-lg)",
              padding: "clamp(28px, 3.4vw, 48px)",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
              overflow: "hidden",
              minHeight: 320,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-18%",
                top: "-30%",
                width: "70%",
                aspectRatio: "1",
                background: "radial-gradient(circle, rgba(232,98,26,0.22) 0%, transparent 66%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--orange-on-dark)",
                  marginBottom: "var(--s5)",
                }}
              >
                <span
                  style={{
                    background: "rgba(232,98,26,0.16)",
                    border: "1px solid rgba(232,98,26,0.35)",
                    borderRadius: "var(--r-pill)",
                    padding: "6px 12px",
                  }}
                >
                  Latest
                </span>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>
                  {lead.category} · {lead.readMinutes} min read
                </span>
              </div>
              <h3
                className="rg-display"
                style={{
                  fontSize: "clamp(26px, 2.8vw, 40px)",
                  color: "#fff",
                  margin: "0 0 var(--s4)",
                  maxWidth: "20ch",
                }}
              >
                {lead.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: "52ch",
                }}
              >
                {lead.excerpt}
              </p>
            </div>
            <span
              style={{
                position: "relative",
                fontSize: 13.5,
                fontWeight: 700,
                color: "var(--orange-on-dark)",
              }}
            >
              Read the guide <span aria-hidden="true">→</span>
            </span>
          </Link>

          {/* Supporting articles */}
          <div style={{ display: "grid", gap: "clamp(16px, 2vw, 24px)", alignContent: "stretch" }}>
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rg-post-card"
                style={{
                  display: "flex",
                  gap: "var(--s4)",
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  padding: "clamp(20px, 2.2vw, 28px)",
                  textDecoration: "none",
                  color: "inherit",
                  alignItems: "flex-start",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "var(--r-sm)",
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={p.icon} size={20} color="var(--orange)" />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: 8,
                    }}
                  >
                    {p.category} · {p.readMinutes} min
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--navy)",
                      lineHeight: 1.35,
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {p.excerpt}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
