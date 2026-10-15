"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * GoHighLevel chat widget, loaded on idle as before, except on pages that
 * mark a section with `data-chat-hold`. There the widget (and its
 * auto-opening greeting card) waits until that section has scrolled above
 * the viewport, or 30 seconds have passed, so the greeting never covers the
 * page's first trust points. On the homepage that is the medspa band with
 * the HIPAA BAA.
 *
 * The greeting's auto-open and its blue colour are set in the GHL widget
 * settings, not here: turn the auto-open off (or delay it) and set the
 * widget colour to navy #1A2B4A there.
 */
const HOLD_MAX_MS = 30_000;
let injected = false;

function injectWidget() {
  if (injected) return;
  injected = true;
  const s = document.createElement("script");
  s.src = "https://widgets.leadconnectorhq.com/loader.js";
  s.async = true;
  s.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
  s.dataset.widgetId = "6a2d06d49cb8f1e129b49b63";
  s.dataset.source = "WEB_USER";
  document.body.appendChild(s);
}

/** Same timing as next/script "lazyOnload": after load, when idle. */
function injectWhenIdle() {
  const run = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(injectWidget);
    else setTimeout(injectWidget, 1);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
}

export default function ChatWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (injected) return;
    const hold = document.querySelector<HTMLElement>("[data-chat-hold]");
    if (!hold || !("IntersectionObserver" in window)) {
      injectWhenIdle();
      return;
    }
    const timer = window.setTimeout(injectWidget, HOLD_MAX_MS);
    const obs = new IntersectionObserver(([entry]) => {
      // Released once the held section has left through the top edge.
      if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) injectWidget();
    });
    obs.observe(hold);
    return () => {
      window.clearTimeout(timer);
      obs.disconnect();
    };
  }, [pathname]);

  return null;
}
