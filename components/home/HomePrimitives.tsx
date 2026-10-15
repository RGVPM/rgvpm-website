import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

/**
 * Homepage-only building blocks (styles in components/home/home.css).
 * Kept apart from components/home/Primitives.tsx, which the /website-offer
 * components import and which must not change.
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

type ButtonVariant = "primary" | "compact" | "ghost" | "ghostDark";

/**
 * Pill button with a trailing circle. External links open in a new tab and
 * say so to screen readers. `event` is picked up by HomeAnalytics and sent
 * to GA4 on click.
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
  const classes = ["rg-h-btn", `rg-h-btn--${variant}`, full && "rg-h-btn--full", className]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <span>{children}</span>
      <span className="rg-h-btn-icon" aria-hidden="true">
        &rarr;
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

/** Inline text link with a sliding arrow. */
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
  const classes = ["rg-h-link", className].filter(Boolean).join(" ");
  const data = { "data-ev": event, "data-ev-label": eventLabel };
  const inner = (
    <>
      {children} <span aria-hidden="true">&rarr;</span>
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

type Surface = "cream" | "bone" | "blush" | "night";

/** A full-width band with the shared rhythm and a labelled region. */
export function HSection({
  id,
  surface = "cream",
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
  const classes = [
    "rg-h-section",
    tight && "rg-h-section--tight",
    `rg-h-bg-${surface}`,
    surface === "night" && "rg-h-dark",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} aria-labelledby={labelledBy} className={classes}>
      {children}
    </section>
  );
}

/** Small mono label above a headline. Used three times on the page, no more. */
export function HEyebrow({ children }: { children: ReactNode }) {
  return <p className="rg-h-eyebrow">{children}</p>;
}

/** Double-bezel enclosure: a tinted tray with a porcelain (or navy) core. */
export function BezelFrame({
  tone = "light",
  className,
  coreClassName,
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  coreClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={["rg-h-bezel", tone === "dark" && "rg-h-bezel--dark", className].filter(Boolean).join(" ")}>
      <div className={["rg-h-bezel-core", coreClassName].filter(Boolean).join(" ")}>{children}</div>
    </div>
  );
}
