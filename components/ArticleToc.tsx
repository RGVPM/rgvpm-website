"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

/**
 * "In this article" list. Marks the section you're reading. A sticky rail on
 * wide screens; on narrow ones it starts collapsed so the article comes first.
 * The links stay in the HTML either way.
 */
export default function ArticleToc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let at = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) at = id;
      }
      setCurrent(at);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="In this article" className="rg-toc">
      <p className="rg-toc-label">In this article</p>
      <button type="button" className="rg-toc-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        In this article <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <ol data-open={open}>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} onClick={() => setOpen(false)} aria-current={current === it.id ? "location" : undefined}>
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
