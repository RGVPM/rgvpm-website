"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Blog index: the newest post as a big navy feature card, then the rest as
 * cream cards with a category filter. The server page passes only the card
 * fields (not post bodies), so the client bundle stays small. Filtering just
 * hides cards; every post link is in the HTML for crawlers either way.
 */
export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
};

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function BlogIndex({ posts }: { posts: PostCard[] }) {
  const [lead, ...rest] = posts;
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");

  return (
    <>
      <Link href={`/blog/${lead.slug}`} className="rg-blog-lead rg-reveal">
        <span className="rg-pill rg-pill--orange">Latest</span>
        <p className="rg-blog-meta" style={{ color: "var(--blue-on-dark)" }}>
          {lead.category} · {lead.readMinutes} min read · {fmt(lead.date)}
        </p>
        <h2 className="rg-display rg-blog-lead-title">{lead.title}</h2>
        <p className="rg-blog-lead-text">{lead.excerpt}</p>
        <span className="rg-hat-more" style={{ color: "var(--blue-on-dark)" }}>
          Read the guide <span aria-hidden="true">→</span>
        </span>
      </Link>

      <div className="rg-blog-filters" role="group" aria-label="Filter articles by topic">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            className="rg-blog-filter"
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="rg-blog-grid">
        {rest.map((p) => (
          <li key={p.slug} hidden={active !== "All" && p.category !== active}>
            <Link href={`/blog/${p.slug}`} className="rg-hat">
              <span className="rg-hat-pill">{p.category}</span>
              <h2 className="rg-blog-card-title">{p.title}</h2>
              <p className="rg-blog-meta">
                {p.readMinutes} min read · {fmt(p.date)}
              </p>
              <span className="rg-hat-rule" aria-hidden="true" />
              <p className="rg-hat-text">{p.excerpt}</p>
              <span className="rg-hat-more">
                Read the guide <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
