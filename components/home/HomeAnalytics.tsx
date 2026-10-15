"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * One delegated click listener for the homepage. Any element inside
 * `.rg-home` with `data-ev="<event_name>"` sends that GA4 event on click,
 * with `data-ev-label` as the label. Keeps every CTA a server component.
 */
export default function HomeAnalytics() {
  useEffect(() => {
    const root = document.querySelector(".rg-home");
    if (!root) return;
    const onClick = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-ev]");
      if (!el || !root.contains(el)) return;
      const name = el.dataset.ev;
      if (!name) return;
      window.gtag?.("event", name, {
        event_label: el.dataset.evLabel ?? el.textContent?.trim().slice(0, 80),
        link_url: (el as HTMLAnchorElement).href || undefined,
      });
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return null;
}
