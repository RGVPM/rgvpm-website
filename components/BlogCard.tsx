import Link from "next/link";
import Icon from "@/components/Icon";
import BlogThumb from "@/components/BlogThumb";
import type { Post } from "@/lib/posts";

const cardAccents = ["var(--orange)", "var(--teal)", "#6E86B8"];

export function blogCardAccent(index: number): string {
  return cardAccents[index % cardAccents.length];
}

/** Listing card used on /blog and the unused homepage strip. Thumbnail is primary. */
export default function BlogCard({
  post,
  accent,
  heading = "h2",
}: {
  post: Post;
  accent: string;
  heading?: "h2" | "h3";
}) {
  const Title = heading;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="svc-card"
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: 0,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BlogThumb post={post} sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 360px" />
      <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: 10,
          }}
        >
          <Icon name={post.icon} size={16} color={accent} />
          <span>
            {post.category} · {post.readMinutes} min
          </span>
        </div>
        <Title style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", lineHeight: 1.3, marginBottom: 10 }}>
          {post.title}
        </Title>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>
        <div style={{ marginTop: "auto", fontSize: 13, fontWeight: 700, color: accent }}>Read the guide →</div>
      </div>
    </Link>
  );
}
