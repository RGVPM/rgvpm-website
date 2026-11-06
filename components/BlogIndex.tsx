"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard, { fmtDate, type PostCard } from "@/components/BlogCard";
import PostCover from "@/components/PostCover";
import { POST_IMAGES } from "@/lib/postImages";

/**
 * Blog index: a prompt-style search, the newest post as the cover story beside
 * the next three, an AI Friday band, then every other post in a magazine grid
 * with a topic filter. The server page passes only the card fields (not post
 * bodies), so the client bundle stays small. The default view links every
 * post, so crawlers see them all.
 */

const AI_TOPICS = ["AI Friday", "AI Automation"];
const SEARCHES = ["AI receptionist", "Google Maps", "Google Ads", "Website cost", "Automate"];

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

/** Types the example searches into the placeholder, one at a time. */
function useTypedPrompt(paused: boolean) {
  const [text, setText] = useState(`Try "${SEARCHES[0]}"`);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let word = 0;
    let chars = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = `Try "${SEARCHES[word]}"`;
      chars += 1;
      setText(full.slice(0, chars));
      if (chars < full.length) {
        timer = setTimeout(tick, 55);
      } else {
        word = (word + 1) % SEARCHES.length;
        chars = 0;
        timer = setTimeout(tick, 2200);
      }
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [paused]);

  return text;
}

const matches = (p: PostCard, terms: string[]) => {
  const text = `${p.title} ${p.excerpt} ${p.category} ${POST_IMAGES[p.slug]?.line ?? ""}`.toLowerCase();
  return terms.every((t) => text.includes(t));
};

export default function BlogIndex({ posts }: { posts: PostCard[] }) {
  const [lead, ...others] = posts;
  const fresh = others.slice(0, 3);
  const later = others.slice(3);
  const aiBand = later.filter((p) => AI_TOPICS.includes(p.category)).slice(0, 4);
  const rest = later.filter((p) => !aiBand.includes(p));

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const prompt = useTypedPrompt(focused || query !== "");

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const shown = searching
    ? posts.filter((p) => matches(p, terms))
    : active === "All"
      ? rest
      : posts.filter((p) => p.category === active);
  const widths = spans(shown.length);

  return (
    <>
      <div className="rg-bask" role="search">
        <label className="rg-bask-box">
          <span className="rg-sr">Search the playbooks</span>
          <svg className="rg-bask-spark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2c.7 5.6 3.4 8.3 10 10-6.6 1.7-9.3 4.4-10 10-.7-5.6-3.4-8.3-10-10 6.6-1.7 9.3-4.4 10-10Z" />
          </svg>
          <input
            type="search"
            value={query}
            placeholder={prompt}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </label>
        <div className="rg-bask-chips" role="group" aria-label="Popular searches">
          {SEARCHES.map((s) => (
            <button key={s} type="button" aria-pressed={query === s} onClick={() => setQuery(query === s ? "" : s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {!searching && (
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

          {aiBand.length > 0 && (
            <section className="rg-bai" aria-labelledby="blog-ai">
              <div className="rg-bai-head">
                <h2 id="blog-ai" className="rg-bai-title">
                  AI <em>Friday</em>
                </h2>
                <p>One AI move a week, for owners who&rsquo;d rather be with clients.</p>
              </div>
              <ol className="rg-bai-grid">
                {aiBand.map((p, i) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="rg-bai-card">
                      <span className="rg-bai-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{p.title.replace(/^AI Friday:\s*/, "")}</h3>
                      {POST_IMAGES[p.slug] && <span className="rg-bai-line">{POST_IMAGES[p.slug].line}</span>}
                      <span className="rg-bmeta">{p.readMinutes} min read</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </>
      )}

      <section className="rg-bbrowse" aria-labelledby="blog-browse">
        <div className="rg-bbrowse-head">
          <h2 id="blog-browse" className="rg-bbrowse-title" aria-live="polite">
            {searching
              ? `${shown.length} ${shown.length === 1 ? "playbook" : "playbooks"} for “${query.trim()}”`
              : active === "All"
                ? "More to read"
                : active}
          </h2>
          {!searching && (
            <div className="rg-bfilters" role="group" aria-label="Filter articles by topic">
              {categories.map((c) => (
                <button key={c} type="button" aria-pressed={active === c} className="rg-bfilter" onClick={() => setActive(c)}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {shown.length > 0 ? (
          <ul className="rg-bgrid">
            {shown.map((p, i) => (
              <li key={p.slug} className={`rg-bspan-${widths[i]}`}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rg-bnone">
            Nothing on that yet. <Link href="/contact">Ask us directly</Link> and we&rsquo;ll give you a straight answer.
          </p>
        )}
      </section>
    </>
  );
}
