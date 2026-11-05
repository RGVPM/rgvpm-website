import Link from "next/link";
import PostCover from "@/components/PostCover";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
};

export const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** One article teaser: cover, topic, headline, excerpt. The whole card is the link. */
export default function BlogCard({ post, heading: Heading = "h3" }: { post: PostCard; heading?: "h2" | "h3" }) {
  return (
    <Link href={`/blog/${post.slug}`} className="rg-bcard">
      <span className="rg-bcard-art">
        <PostCover slug={post.slug} category={post.category} />
      </span>
      <span className="rg-bcard-copy">
        <span className="rg-kicker">{post.category}</span>
        <Heading className="rg-bcard-title">{post.title}</Heading>
        <span className="rg-bcard-text">{post.excerpt}</span>
        <span className="rg-bmeta">
          {fmtDate(post.date)} · {post.readMinutes} min read
        </span>
      </span>
    </Link>
  );
}
