import { GridTexture } from "@/components/home/Primitives";
import GrowthDashboard from "@/components/home/GrowthDashboard";
import { SITE } from "@/lib/site";

/**
 * Homepage hero.
 *
 * Server component by design — nothing here needs state, so no client JS
 * ships for the hero and the headline is the LCP element as plain text in
 * the initial HTML. Every animation is CSS (see the `hero-*` and `rg-dash-*`
 * keyframes in globals.css) and touches only transform / opacity /
 * stroke-dashoffset, so none of it can shift layout.
 *
 * Two columns: message left, dashboard right, collapsing to a single stack
 * at 1024px. Client logos deliberately live outside the hero — the marquee
 * section directly beneath it carries them.
 */

/** Compact reasons-to-trust. Deliberately not claims we can't stand behind. */
const TRUST = ["Local RGV Team", "AI-Powered Systems", "Month-to-Month Options"];

function CheckMark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
    >
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

function ResultsIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
    >
      <path d="M2 14h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.4 14V9.4M8 14V4.6M11.6 14v-6.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(104px, 13vh, 156px)",
        paddingBottom: "clamp(64px, 8vh, 108px)",
      }}
    >
      <GridTexture opacity={0.05} />

      {/* One controlled warm bloom behind the dashboard — atmosphere, not an
          orb. It breathes on a 22s cycle; held still for reduced motion. */}
      <div
        aria-hidden="true"
        className="rg-hero-glow"
        style={{
          position: "absolute",
          right: "-16%",
          top: "-22%",
          width: "66%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(232,98,26,0.22) 0%, rgba(232,98,26,0.055) 42%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      {/* Second, much cooler bloom low-left so the navy isn't flat */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-12%",
          bottom: "-30%",
          width: "48%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(90,132,200,0.16) 0%, transparent 66%)",
          pointerEvents: "none",
        }}
      />
      {/* Hairline that ties the hero into the section below it */}
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
        <div className="rg-hero-grid">
          {/* ── Message ─────────────────────────────────────────── */}
          <div className="rg-hero-msg">
            <p
              className="hero-animate rg-label"
              style={{
                color: "var(--orange-on-dark)",
                margin: "0 0 var(--s5)",
                animationDelay: "0.05s",
              }}
            >
              AI-Powered Marketing Systems
            </p>

            <h1
              id="hero-heading"
              className="rg-display"
              style={{
                fontSize: "var(--fs-hero)",
                color: "#fff",
                margin: "0 0 var(--s5)",
                letterSpacing: "0.012em",
                lineHeight: 0.98,
              }}
            >
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.13s" }}>
                Your Competitor Isn&rsquo;t Better.
              </span>
              <span
                className="hero-animate"
                style={{ display: "block", color: "var(--orange)", animationDelay: "0.21s" }}
              >
                They Just Show Up First.
              </span>
            </h1>

            <p
              className="hero-animate rg-hero-lede"
              style={{
                fontSize: 17.5,
                fontWeight: 400,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.62,
                maxWidth: "46ch",
                margin: "0 0 var(--s4)",
                animationDelay: "0.29s",
              }}
            >
              Most businesses don&rsquo;t lose customers because they&rsquo;re bad. They lose them
              because customers never find them.
            </p>
            <p
              className="hero-animate rg-hero-sub"
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.68,
                maxWidth: "48ch",
                margin: "0 0 var(--s7)",
                animationDelay: "0.35s",
              }}
            >
              We build marketing systems that help businesses rank higher, capture more leads, and
              turn attention into measurable growth.
            </p>

            <div
              className="hero-animate rg-hero-actions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--s3)",
                flexWrap: "wrap",
                marginBottom: "var(--s6)",
                animationDelay: "0.43s",
              }}
            >
              {/*
                Primary CTA → the existing discovery-call booking flow, which
                is the strongest conversion destination currently live.
                TODO(owner): when a dedicated "Growth Assessment" form exists
                (GHL form or an /assessment route), swap this single href for
                it — nothing else in the hero needs to change.
              */}
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rg-btn rg-hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--orange)",
                  color: "#fff",
                  fontWeight: 700,
                  // 19px clears WCAG's 18.66px large-text threshold, so white
                  // on the brand orange passes at 3:1 without altering it.
                  fontSize: 19,
                  lineHeight: 1,
                  padding: "19px 26px",
                  borderRadius: "var(--r-hero-sm)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-orange)",
                  transition:
                    "transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease)",
                }}
              >
                Get My Free Growth Assessment{" "}
                <span aria-hidden="true" className="rg-hero-cta-arrow">
                  →
                </span>
              </a>

              <a
                href="/results"
                className="rg-hero-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "17px 19px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: "var(--r-hero-sm)",
                  background: "transparent",
                  transition:
                    "color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease)",
                }}
              >
                <ResultsIcon />
                See Client Results
              </a>
            </div>

            <ul
              className="hero-animate rg-hero-trust"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px clamp(16px, 2.4vw, 28px)",
                listStyle: "none",
                margin: 0,
                padding: 0,
                animationDelay: "0.51s",
              }}
            >
              {TRUST.map((t) => (
                <li
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.72)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <CheckMark />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ── The system we run, made visible ─────────────────── */}
          <div className="rg-hero-visual hero-card-animate">
            <GrowthDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
