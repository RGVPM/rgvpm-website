"use client";

import { useState } from "react";
import Link from "next/link";
import BlogCard, { fmtDate, type PostCard } from "@/components/BlogCard";
import PostCover from "@/components/PostCover";

/**
 * Blog index: the newest post as the cover story beside the next three, then
 * every other post in a magazine grid with a topic filter. The server page
 * passes only the card fields (not post bodies), so the client bundle stays
 * small. The default view links every post, so crawlers see them all.
 */

/** Grid rhythm on a 6-column grid: two wide cards, then three narrow, repeating. */
function spans(count: number) {
  const out: number[] = [];
  let left = count;
  while (left >= 5) {
    out.push(3, 3, 2, 2, 2);
    left -= 5;
  }
  if (left === 1) out.push(6);
  else if (left === 3) out.push(2, 2, 2);
  else for (let i = 0; i < left; i++) out.push(3);
  return out;
}

export default function BlogIndex({ posts }: { posts: PostCard[] }) {
  const [lead, ...others] = posts;
  const fresh = others.slice(0, 3);
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");

  const shown = active === "All" ? others.slice(3) : posts.filter((p) => p.category === active);
  const widths = spans(shown.length);

  return (
    <>
      <section className="rg-bfront" aria-label="Latest articles">
        <Link href={`/blog/${lead.slug}`} className="rg-bcard rg-blead">
          <span className="rg-bcard-art">
            <PostCover slug={lead.slug} category={lead.category} sizes="(max-width: 1023px) 100vw, 760px" priority />
          </span>
          <span className="rg-bcard-copy">
            <span className="rg-kicker">Latest · {lead.category}</span>
            <h2 className="rg-blead-title">{lead.title}</h2>
            <span className="rg-blead-text">{lead.excerpt}</span>
            <span className="rg-bmeta">
              {fmtDate(lead.date)} · {lead.readMinutes} min read
            </span>
          </span>
        </Link>

        <ol className="rg-bfresh">
          {fresh.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`}>
                <span className="rg-kicker">{p.category}</span>
                <h2 className="rg-bfresh-title">{p.title}</h2>
                <span className="rg-bmeta">
                  {fmtDate(p.date)} · {p.readMinutes} min read
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="rg-bbrowse" aria-labelledby="blog-browse">
        <div className="rg-bbrowse-head">
          <h2 id="blog-browse" className="rg-bbrowse-title">
            {active === "All" ? "More to read" : active}
          </h2>
          <div className="rg-bfilters" role="group" aria-label="Filter articles by topic">
            {categories.map((c) => (
              <button key={c} type="button" aria-pressed={active === c} className="rg-bfilter" onClick={() => setActive(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="rg-bgrid">
          {shown.map((p, i) => (
            <li key={p.slug} className={`rg-bspan-${widths[i]}`}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
