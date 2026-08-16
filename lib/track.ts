/**
 * Conversion tracking helper.
 *
 * One function, two destinations. Every call is a no-op when the underlying
 * tag isn't on the page, so the landing page works identically before and
 * after the Meta Pixel ID is filled in — nothing to comment out at launch.
 *
 *   fbq  — Meta Pixel, loaded by components/offer/MetaPixel.tsx only when
 *          TRACKING.metaPixelId is set.
 *   gtag — GA4 (G-4G6Y27NLZ4), already installed site-wide in app/layout.tsx.
 *          Mirroring here means one event name shows up in both platforms.
 */

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a Meta standard event and mirrors it into GA4. */
export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;

  // Strip undefined so neither platform receives empty keys.
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  ) as Record<string, string | number>;

  try {
    window.fbq?.("track", event, clean);
  } catch {
    /* A blocked or half-loaded pixel must never break a CTA click. */
  }

  try {
    window.gtag?.("event", event, clean);
  } catch {
    /* same */
  }
}
