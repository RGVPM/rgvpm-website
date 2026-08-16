import { GridTexture } from "@/components/home/Primitives";
import OfferVisual from "@/components/offer/OfferVisual";
import { OFFER } from "@/lib/offer";

/**
 * Above the fold.
 *
 * The whole offer has to be legible in about five seconds: what you get
 * ($0 upfront website), what it costs (a qualifying 12-month plan), and
 * what to do next (pick a plan). The qualifier sits in the hero itself, not
 * in a footnote — an offer that reads as "free" and turns out to be $299/mo
 * two scrolls later buys a bounce, not a sale.
 */

const TRUST = ["Professional Website", "CRM", "Lead Capture", "Ongoing Support"];

export default function OfferHero() {
  return (
    <section
      aria-labelledby="offer-hero-heading"
      style={{
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(48px, 6vh, 84px)",
        paddingBottom: "clamp(56px, 7vh, 100px)",
      }}
    >
      <GridTexture opacity={0.05} />

      <div
        aria-hidden="true"
        className="rg-hero-glow"
        style={{
          position: "absolute",
          right: "-14%",
          top: "-24%",
          width: "62%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(232,98,26,0.24) 0%, rgba(232,98,26,0.06) 42%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-12%",
          bottom: "-32%",
          width: "46%",
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(90,132,200,0.16) 0%, transparent 66%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 22%, rgba(232,98,26,0.5) 50%, rgba(255,255,255,0.16) 78%, transparent)",
        }}
      />

      <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="rg-hero-grid lp-hero-grid">
          {/* ── Message ─────────────────────────────────────────── */}
          <div className="rg-hero-msg">
            <p
              className="hero-animate rg-label"
              style={{ color: "var(--orange-on-dark)", margin: "0 0 var(--s5)", animationDelay: "0.05s" }}
            >
              Built for Texas Businesses
            </p>

            <h1
              id="offer-hero-heading"
              className="rg-display lp-hero-h1"
              style={{ color: "#fff", margin: "0 0 var(--s5)", letterSpacing: "0.012em", lineHeight: 0.95 }}
            >
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.13s" }}>
                Your New Website.
              </span>
              <span
                className="hero-animate"
                style={{ display: "block", color: "var(--orange)", animationDelay: "0.21s" }}
              >
                $0 Upfront.
              </span>
            </h1>

            <p
              className="hero-animate rg-hero-lede"
              style={{
                fontSize: 17.5,
                color: "rgba(255,255,255,0.84)",
                lineHeight: 1.62,
                maxWidth: "46ch",
                margin: "0 0 var(--s4)",
                animationDelay: "0.29s",
              }}
            >
              We&rsquo;ll design, build, launch and manage your new website — plus give you the
              tools to turn visitors into customers.
            </p>

            {/* The qualifier, stated plainly and given its own frame rather
                than being tucked into an asterisk. */}
            <p
              className="hero-animate lp-hero-qualifier"
              style={{ animationDelay: "0.35s" }}
            >
              Choose one of our qualifying {OFFER.agreementMonths}-month plans and we&rsquo;ll waive
              the standard website build fee.
            </p>

            <div
              className="hero-animate rg-hero-actions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--s3)",
                flexWrap: "wrap",
                margin: "var(--s7) 0 var(--s4)",
                animationDelay: "0.43s",
              }}
            >
              <a
                href="#plans"
                className="rg-btn rg-hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--orange)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 19,
                  lineHeight: 1,
                  padding: "19px 28px",
                  borderRadius: "var(--r-hero-sm)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-orange)",
                  transition: "transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease)",
                }}
              >
                Get My Website{" "}
                <span aria-hidden="true" className="rg-hero-cta-arrow">
                  →
                </span>
              </a>

              <a
                href="#whats-included"
                className="rg-hero-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "17px 22px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.84)",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: "var(--r-hero-sm)",
                  background: "transparent",
                  transition:
                    "color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease)",
                }}
              >
                See What&rsquo;s Included
              </a>
            </div>

            <p
              className="hero-animate"
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.58)",
                margin: "0 0 var(--s6)",
                animationDelay: "0.47s",
              }}
            >
              Typical website turnaround: {OFFER.turnaround}*
            </p>

            <ul
              className="hero-animate lp-trustline"
              style={{ animationDelay: "0.51s" }}
            >
              {TRUST.map((t) => (
                <li key={t}>
                  <CheckMark />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Visual ──────────────────────────────────────────── */}
          <div className="rg-hero-visual hero-card-animate">
            <OfferVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.25" stroke="rgba(232,98,26,0.5)" strokeWidth="1.5" />
      <path
        d="M4.9 8.2 6.9 10.2 11.1 6"
        stroke="var(--orange-on-dark)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
