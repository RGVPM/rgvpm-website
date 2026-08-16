import { GridTexture, Label } from "@/components/home/Primitives";
import { OFFER } from "@/lib/offer";

/**
 * The price anchor.
 *
 * Both numbers are phrased as market-general, not as a claim about any
 * named competitor and not as a promise about what this reader would
 * otherwise have paid: "typical" and "may charge". The struck-through
 * figure carries an aria-label so a screen reader announces it as the
 * comparison it is, rather than reading a bare dollar amount.
 */

export default function ValueAnchor() {
  return (
    <section
      aria-labelledby="value-heading"
      style={{
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
        paddingBlock: "var(--section-y)",
      }}
    >
      <GridTexture opacity={0.05} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10%",
          top: "-30%",
          width: "48%",
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(232,98,26,0.18) 0%, transparent 66%)",
          pointerEvents: "none",
        }}
      />

      <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="lp-value">
          <div>
            <Label tone="dark">Stop Paying Thousands Upfront For A Website</Label>
            <h2
              id="value-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "#fff", margin: "var(--s4) 0 0" }}
            >
              <span style={{ display: "block" }}>Get the website now.</span>
              <span style={{ display: "block", color: "var(--orange)" }}>Grow with us monthly.</span>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.74)",
                lineHeight: 1.72,
                margin: "var(--s6) 0 0",
                maxWidth: "52ch",
              }}
            >
              Traditional agencies may charge thousands of dollars before a single page goes live.
              With RGVPM, qualifying clients can have the website build fee waived when entering
              into a {OFFER.agreementMonths}-month Website + CRM or Growth + SEO agreement.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.56)",
                lineHeight: 1.7,
                margin: "var(--s5) 0 0",
                maxWidth: "52ch",
              }}
            >
              You&rsquo;re not buying a file. You&rsquo;re starting a system that gets built,
              hosted, maintained and improved for as long as you&rsquo;re with us.
            </p>
          </div>

          {/* ── Anchor card ─────────────────────────────────────── */}
          <div className="lp-anchor">
            <div className="lp-anchor-row">
              <span className="lp-anchor-label">{OFFER.anchorLabel}</span>
              <span
                className="lp-anchor-old"
                aria-label={`Typical website build cost, ${OFFER.anchorPrice}`}
              >
                <s>{OFFER.anchorPrice}</s>
              </span>
            </div>

            <span aria-hidden="true" className="lp-anchor-rule" />

            <div className="lp-anchor-row lp-anchor-row--hero">
              <span className="lp-anchor-label">Your upfront website build fee</span>
              <span className="lp-anchor-new rg-display">{OFFER.buildFee}</span>
            </div>

            <p className="lp-anchor-foot">
              *With enrollment in a qualifying {OFFER.agreementMonths}-month RGVPM plan. Monthly
              service fees still apply.
            </p>

            <a href="#plans" className="lp-anchor-cta rg-btn">
              See the two plans <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
