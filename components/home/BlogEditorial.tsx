import Link from "next/link";
import { Section } from "@/components/home/Primitives";
import { POSTS } from "@/lib/posts";

/**
 * Quiet blog list. Titles stay crawlable internal links to /blog/*.
 */
export default function BlogEditorial() {
  const posts = POSTS.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section background="var(--cream)" labelledBy="blog-heading" tight>
      <div className="rg-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "var(--s5)",
            flexWrap: "wrap",
            marginBottom: "var(--s6)",
          }}
        >
          <h2
            id="blog-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}
          >
            Helpful reading
          </h2>
          <Link
            href="/blog"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--orange-ink)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Visit the blog <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            borderTop: "1px solid var(--border)",
          }}
        >
          {posts.map((post) => (
            <li key={post.slug} style={{ borderBottom: "1px solid var(--border)" }}>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  padding: "var(--s5) 0",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 15,
                    color: "var(--muted)",
                    lineHeight: 1.55,
                    marginTop: 6,
                    maxWidth: "68ch",
                  }}
                >
                  {post.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
