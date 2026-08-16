import { GridTexture } from "@/components/home/Primitives";
import { TrackedCta } from "@/components/offer/Track";
import { OFFER, OFFER_LINKS, PLANS } from "@/lib/offer";

/**
 * Closing conversion block.
 *
 * Orange field — the only full-bleed use of the brand colour on the page,
 * saved for the last ask so it reads as an event rather than decoration.
 * Both prices are repeated here: by this scroll depth the reader has passed
 * the pricing section, and the close shouldn't make them go back up to
 * remember what it costs.
 */

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      style={{
        background: "var(--orange)",
        position: "relative",
        overflow: "hidden",
        paddingBlock: "var(--section-y)",
      }}
    >
      <GridTexture opacity={0.09} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8%",
          bottom: "-40%",
          width: "46%",
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(26,43,74,0.24) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div className="rg-container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <h2
          id="final-cta-heading"
          className="rg-display"
          style={{
            fontSize: "var(--fs-h2)",
            color: "#fff",
            margin: 0,
            maxWidth: "18ch",
            marginInline: "auto",
          }}
        >
          Ready for a website that actually works for your business?
        </h2>

        <p
          style={{
            fontSize: 17.5,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.65,
            maxWidth: "56ch",
            margin: "var(--s6) auto 0",
          }}
        >
          Get your new website with a {OFFER.buildFee} upfront build fee when you
          join a qualifying RGVPM {OFFER.agreementMonths}-month plan.
        </p>

        <div className="rg-cta-actions lp-final-actions">
          <a href="#plans" className="rg-btn lp-final-primary">
            Get My Website <span aria-hidden="true">→</span>
          </a>
          <TrackedCta
            href={OFFER_LINKS.booking}
            event="Lead"
            params={{ content_name: "consultation", content_category: "website-offer-final" }}
            className="rg-btn lp-final-secondary"
          >
            Talk to RGVPM
          </TrackedCta>
        </div>

        <ul className="lp-final-prices">
          {PLANS.map((plan) => (
            <li key={plan.id}>
              <span className="lp-final-plan">{plan.name}</span>
              <span className="lp-final-price">from ${plan.price}/month</span>
            </li>
          ))}
        </ul>

        <p className="lp-final-terms">
          {OFFER.agreementMonths}-month service agreement required. Monthly service fees apply.
        </p>
      </div>
    </section>
  );
}
