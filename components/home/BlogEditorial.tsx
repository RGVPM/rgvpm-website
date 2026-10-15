import Link from "next/link";
import { HLink } from "@/components/home/HomePrimitives";
import { POSTS } from "@/lib/posts";

/**
 * Section 10. Crawlable links to /blog and the latest three posts.
 * Desktop: one wide card with the excerpt, two narrow title cards.
 * Mobile: a hairline-divided list of titles with dates.
 */
const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function BlogEditorial() {
  const posts = POSTS.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="blog-heading" className="rg-h-section rg-h-bg-cream rg-h-blog">
      <div className="rg-h-wrap">
        <div className="rg-h-blog-inner">
          <div className="rg-h-blog-head">
            <h2 id="blog-heading" className="rg-h-h2">
              From the blog
            </h2>
            <HLink href="/blog">All articles</HLink>
          </div>
          <ul className="rg-h-posts">
            {posts.map((p) => (
              <li key={p.slug} className="rg-h-reveal">
                <Link href={`/blog/${p.slug}`} className="rg-h-post">
                  <span className="rg-h-mono">
                    {p.category} &middot;{" "}
                    <time dateTime={p.datePublished}>{fmt.format(new Date(p.datePublished))}</time>
                  </span>
                  <span className="rg-h-post-title">{p.title}</span>
                  <span className="rg-h-post-excerpt">{p.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
