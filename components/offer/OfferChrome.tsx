import Image from "next/image";
import Link from "next/link";
import { OFFER_LINKS } from "@/lib/offer";

/**
 * Landing-page chrome.
 *
 * This route deliberately does NOT use the site's primary nav. Traffic
 * arrives from paid social with one job to do, and a six-link nav with a
 * Solutions dropdown is six ways to leave before reading the offer. The
 * global <nav> and <footer> are hidden by the `.lp-root` rules in
 * globals.css (scoped with :has(), so no other page is affected) and
 * replaced by the two pieces below:
 *
 *   OfferTopBar     — logo, phone, one CTA. Static, not sticky, so it never
 *                     competes with the mobile bar for thumb space.
 *   StickyMobileCta — fixed to the bottom edge under 900px, which is where
 *                     nearly all Meta traffic lands.
 */

export function OfferTopBar() {
  // Positioning lives in globals.css (.lp-root > header): it flips from
  // relative to sticky at the desktop breakpoint, and an inline `position`
  // would silently outrank that media query.
  return (
    <header
      style={{
        background: "rgba(247,244,239,0.94)",
        backdropFilter: "blur(14px) saturate(1.2)",
        WebkitBackdropFilter: "blur(14px) saturate(1.2)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* The same orange hairline the site header uses to meet the hero. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(232,98,26,0.55) 30%, var(--orange) 50%, rgba(232,98,26,0.55) 70%, transparent)",
        }}
      />
      <div
        className="rg-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          paddingBlock: 12,
        }}
      >
        <Link href="/" aria-label="RGV Performance Marketing — home" style={{ display: "flex", flexShrink: 0 }}>
          <Image
            src="/logo.png"
            alt="RGV Performance Marketing"
            height={40}
            width={200}
            sizes="200px"
            priority
            className="lp-logo"
            style={{ height: 40, width: "auto" }}
          />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Both of these are styled entirely from globals.css rather than
              inline. They need to change at the mobile breakpoint, and an
              inline style outranks a media query — which is what made the
              CTA wrap to two lines and the phone number survive at 375px. */}
          <a href={`tel:${OFFER_LINKS.phone}`} className="lp-topbar-phone">
            <PhoneGlyph />
            {OFFER_LINKS.phoneHuman}
          </a>
          <a href="#plans" className="rg-btn lp-topbar-cta">
            Get My Website <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Bottom-anchored CTA for phones. Sits above the iOS home indicator via
 * env(safe-area-inset-bottom); the page reserves matching bottom padding in
 * globals.css so it can never cover the final line of the disclaimers.
 */
export function StickyMobileCta() {
  return (
    <div className="lp-sticky-cta" aria-hidden="false">
      <div className="lp-sticky-cta-inner">
        <div>
          <p className="lp-sticky-cta-price">From $299/mo</p>
          <p className="lp-sticky-cta-note">$0 upfront build fee</p>
        </div>
        <a href="#plans" className="lp-sticky-cta-btn">
          Get My Website <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5.2 2.4 6.6 5.1 5.3 6.4a8.6 8.6 0 0 0 4.3 4.3l1.3-1.3 2.7 1.4v2.3c0 .6-.5 1-1.1.9C6.9 13.4 2.6 9.1 2 3.5c-.1-.6.3-1.1.9-1.1h2.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
