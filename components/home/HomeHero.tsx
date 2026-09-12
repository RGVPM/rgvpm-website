import { SITE } from "@/lib/site";

/**
 * Homepage hero — one headline, one lede, two buttons.
 *
 * Server component. No dashboard, grid texture, or glow. The booking URL
 * is SITE.bookingUrl so the growth-assessment destination cannot drift.
 */
export default function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        background: "var(--navy)",
        position: "relative",
        paddingTop: "clamp(120px, 16vh, 168px)",
        paddingBottom: "clamp(72px, 10vh, 120px)",
      }}
    >
      <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="rg-hero-msg" style={{ maxWidth: 760 }}>
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
            We help local businesses get found online.
          </h1>

          <p
            className="rg-hero-lede"
            style={{
              fontSize: 19,
              fontWeight: 400,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.6,
              maxWidth: "38ch",
              margin: "0 0 var(--s7)",
            }}
          >
            People search Google for what you sell. We help them find you — and call you.
          </p>

          <div
            className="rg-hero-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--s3)",
              flexWrap: "wrap",
            }}
          >
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
              Get a free growth assessment{" "}
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
              See client results
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
