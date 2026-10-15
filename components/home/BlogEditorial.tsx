import Link from "next/link";
import { HLink } from "@/components/home/HomePrimitives";
import { POSTS } from "@/lib/posts";

/**
 * Section 11. Crawlable links to /blog and the latest three posts.
 * Desktop: one wide card with the excerpt, two narrow title cards.
 * Mobile: a hairline-divided list of titles with dates.
 */
const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function BlogEditorial() {
  const posts = POSTS.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="blog-heading" className="ev-section ev-blog">
      <div className="ev-wrap">
        <div className="ev-blog-head">
          <h2 id="blog-heading" className="ev-h2" data-ev-reveal="">
            From the blog
          </h2>
          <HLink href="/blog">All articles</HLink>
        </div>
        <ul className="ev-posts">
          {posts.map((p) => (
            <li key={p.slug} className="ev-rise">
              <Link href={`/blog/${p.slug}`} className="ev-post">
                <span className="ev-post-meta">
                  {p.category} &middot;{" "}
                  <time dateTime={p.datePublished}>{fmt.format(new Date(p.datePublished))}</time>
                </span>
                <span className="ev-post-title">
                  <span>{p.title}</span>
                </span>
                <span className="ev-post-excerpt">{p.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
