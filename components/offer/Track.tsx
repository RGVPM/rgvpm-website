"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { track } from "@/lib/track";

/**
 * The two client components on the landing page. Everything else is a server
 * component, so the only JS this route ships is the handful of bytes below
 * plus the pixel loader.
 */

/**
 * A link that reports a conversion event before it navigates.
 *
 * The event is sent synchronously on click — Meta's queue drains via
 * sendBeacon, so it survives the page unload that follows on a Stripe or
 * calendar hand-off. If tracking is blocked or absent, `track()` no-ops and
 * the navigation happens exactly as it would from a plain anchor.
 */
export function TrackedCta({
  href,
  event,
  params,
  children,
  className,
  style,
  ariaLabel,
}: {
  href: string;
  event: string;
  params?: Record<string, string | number | undefined>;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={() => track(event, params)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

/**
 * Fires a single ViewContent when its section first scrolls into view — the
 * signal that someone actually reached the plans, rather than bouncing off
 * the hero. Disconnects immediately after, so it can never double-count.
 */
export function ViewContentOnce({
  contentName,
  children,
}: {
  contentName: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        track("ViewContent", { content_name: contentName, content_type: "product_group" });
        io.disconnect();
      },
      // Fires once the section's top rises above 60% of the viewport — i.e.
      // the plans are genuinely on screen, not just clipping the bottom edge.
      //
      // Deliberately NOT a ratio threshold: the pricing section is taller
      // than a phone viewport (two stacked cards run past 3000px), so any
      // threshold above 0.27 or so is unreachable on mobile and the event
      // would simply never fire. Shrinking the root instead makes this
      // independent of how tall the section grows.
      { threshold: 0, rootMargin: "0px 0px -40% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [contentName]);

  return <div ref={ref}>{children}</div>;
}
