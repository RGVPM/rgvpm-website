import WorkStack from "@/components/home/WorkStack";
import { SITE } from "@/lib/site";

/**
 * Homepage hero.
 *
 * Server component by design: nothing here needs state, so no client JS
 * ships for the hero and the headline is the LCP text in the initial HTML.
 * Every animation is CSS (`hero-animate`, `rg-stack-*` in globals.css) and
 * touches only transform / opacity, so none of it can shift layout.
 *
 * Two columns: message left, real client sites right, collapsing to a
 * single stack at 1024px. The background is deliberately plain navy. No
 * grid texture, no glow blooms: the work on the right is the visual.
 */

export default function HomeHero() {
  const proof = [
    "Local team in Harlingen",
    "50+ live client sites",
    "AI consulting & builds",
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)",
        position: "relative",
        overflow: "hidden",
        // The sticky nav is ~80px and overlays the hero, so the top padding
        // has to clear it plus breathing room; the bottom needs less.
        paddingTop: "clamp(120px, 14vh, 152px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      <div className="rg-container" style={{ position: "relative" }}>
        <div className="rg-hero-grid">
          {/* ── Message ─────────────────────────────────────────── */}
          <div className="rg-hero-msg">
            <p
              className="hero-animate rg-label"
              style={{ color: "var(--orange-on-dark)", margin: "0 0 var(--s5)", animationDelay: "0s" }}
            >
              AI &amp; Marketing Agency
            </p>
            <h1
              id="hero-heading"
              className="rg-display"
              style={{
                fontSize: "var(--fs-hero)",
                color: "#fff",
                margin: "0 0 var(--s5)",
                letterSpacing: "0.012em",
                lineHeight: 0.94,
              }}
            >
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.05s" }}>
                Your Competitor
              </span>
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.12s" }}>
                Isn&rsquo;t Better.
              </span>
              <span
                className="hero-animate"
                style={{ display: "block", color: "var(--orange)", animationDelay: "0.19s" }}
              >
                They Just Show Up First.
              </span>
            </h1>

            <p
              className="hero-animate rg-hero-lede"
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.6,
                maxWidth: "44ch",
                margin: "0 0 var(--s6)",
                animationDelay: "0.27s",
              }}
            >
              We&rsquo;re an AI and marketing agency. We get you found on Google, then build the
              AI that answers your calls, follows up with every lead, and takes the busywork off
              your plate.
            </p>

            <div
              className="hero-animate rg-hero-actions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--s5)",
                flexWrap: "wrap",
                marginBottom: "var(--s7)",
                animationDelay: "0.36s",
              }}
            >
              {/*
                Primary CTA goes to the discovery-call booking flow, the
                strongest conversion destination currently live.
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
                  // 19px clears WCAG's large-text threshold, so white on the
                  // brand orange passes at 3:1 without altering it.
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
                Book with us!{" "}
                <span aria-hidden="true" className="rg-hero-cta-arrow">
                  →
                </span>
              </a>

              <a href="/pricing" className="rg-hero-secondary">
                See plans and pricing
              </a>
            </div>

            <ul
              className="hero-animate rg-hero-proof"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px 0",
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                fontSize: 11.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.56)",
                animationDelay: "0.44s",
              }}
            >
              {proof.map((item) => (
                <li key={item} className="rg-hero-proof-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Real work ───────────────────────────────────────── */}
          <div className="rg-hero-visual">
            <WorkStack />
          </div>
        </div>
      </div>
    </section>
  );
}
