import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

/**
 * Homepage-only building blocks (styles in components/home/afterglow/afterglow.css,
 * all scoped under .rg-home--afterglow). Kept apart from
 * components/home/Primitives.tsx, which the /website-offer components import
 * and which must not change.
 */

/**
 * Section-tagged booking link. The GHL booking widget serves the same page
 * with or without query params (checked 2026-10-14); flip this off to fall
 * back to the bare URL and rely on the GA4 click events alone.
 */
const BOOKING_UTMS = true;

export function bookingHref(section: string): string {
  if (!BOOKING_UTMS) return SITE.bookingUrl;
  const params = new URLSearchParams({
    utm_source: "homepage",
    utm_medium: "cta",
    utm_content: section,
  });
  return `${SITE.bookingUrl}?${params.toString()}`;
}

/* Phosphor icon paths (regular weight, 256 viewBox), inlined so the
   homepage ships no icon package for two arrows. */
const ARROW_UP_RIGHT =
  "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z";
const ARROW_DOWN =
  "M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z";

export function ArrowIcon({ down }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={down ? ARROW_DOWN : ARROW_UP_RIGHT} />
    </svg>
  );
}

type ButtonVariant = "primary" | "compact" | "ghost" | "ghostDark";

/**
 * Island pill with a nested icon circle. Primary = tangerine fill with a
 * midnight label (the page's one action color); ghost = sand outline.
 * External links open in a new tab and say so to screen readers. `event`
 * is picked up by HomeAnalytics and sent to GA4 on click.
 */
export function HButton({
  href,
  children,
  variant = "primary",
  event,
  eventLabel,
  full,
  className,
  id,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  event?: string;
  eventLabel?: string;
  full?: boolean;
  className?: string;
  id?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const primary = variant === "primary" || variant === "compact";
  const classes = [
    "ev-btn",
    primary ? "ev-btn--primary" : "ev-btn--ghost",
    variant === "compact" && "ev-btn--sm",
    full && "ev-btn--full",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <span className="ev-btn-label">{children}</span>
      <span className="ev-btn-icon">
        <ArrowIcon down={href === "#plans"} />
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const data = { "data-ev": event, "data-ev-label": eventLabel };

  if (external) {
    return (
      <a id={id} href={href} target="_blank" rel="noopener" className={classes} {...data}>
        {inner}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a id={id} href={href} className={classes} {...data}>
        {inner}
      </a>
    );
  }
  return (
    <Link id={id} href={href} className={classes} {...data}>
      {inner}
    </Link>
  );
}

/** Inline text link: sand label, gold underline that grows on hover. */
export function HLink({
  href,
  children,
  event,
  eventLabel,
  className,
}: {
  href: string;
  children: ReactNode;
  event?: string;
  eventLabel?: string;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const classes = ["ev-link", className].filter(Boolean).join(" ");
  const data = { "data-ev": event, "data-ev-label": eventLabel };
  const inner = (
    <>
      <span>{children}</span> <span aria-hidden="true">&rarr;</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes} {...data}>
        {inner}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...data}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...data}>
      {inner}
    </Link>
  );
}

type Surface = "sky" | "night" | "plum";

/** A full-width band with the shared rhythm and a labelled region. */
export function HSection({
  id,
  surface = "sky",
  tight,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  surface?: Surface;
  tight?: boolean;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  const classes = ["ev-section", tight && "ev-section--tight", `ev-band--${surface}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} aria-labelledby={labelledBy} className={classes}>
      {children}
    </section>
  );
}

/** Small mono label above a headline. Rationed: five on the page, no more. */
export function HEyebrow({ children }: { children: ReactNode }) {
  return <p className="ev-eyebrow">{children}</p>;
}

/** Double-bezel enclosure: a hairline tray with a plum core. */
export function BezelFrame({
  className,
  coreClassName,
  children,
}: {
  className?: string;
  coreClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={["ev-bezel", className].filter(Boolean).join(" ")}>
      <div className={["ev-bezel-core", coreClassName].filter(Boolean).join(" ")}>{children}</div>
    </div>
  );
}
