import { Label, Section } from "@/components/home/Primitives";
import { OFFER_FAQS } from "@/lib/offer";

/**
 * FAQ on native <details>/<summary>, matching the homepage accordion.
 *
 * No JS: correct keyboard and screen-reader behaviour for free, and every
 * answer stays in the DOM whether open or closed, so it remains crawlable
 * and continues to match the FAQPage JSON-LD the route emits from this same
 * OFFER_FAQS array.
 *
 * The awkward questions are answered here rather than buried — "do I have
 * to sign a contract" gets a one-word yes.
 */

export default function OfferFaq() {
  return (
    <Section id="faq" background="#fff" labelledBy="offer-faq-heading">
      <div className="rg-container">
        <div
          className="rg-split"
          style={{
            display: "grid",
            gridTemplateColumns: "0.72fr 1.28fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          <div className="rg-sticky" style={{ position: "sticky", top: 48 }}>
            <Label>FAQ</Label>
            <h2
              id="offer-faq-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
            >
              Straight Answers
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--muted)",
                lineHeight: 1.7,
                margin: "var(--s5) 0 0",
                maxWidth: "32ch",
              }}
            >
              Including the ones most agencies would rather you asked after you signed.
            </p>
          </div>

          <div>
            {OFFER_FAQS.map((faq, i) => (
              <details
                key={faq.q}
                className="rg-faq"
                style={{
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <summary
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--s5)",
                    padding: "var(--s5) 0",
                    cursor: "pointer",
                    fontSize: 16.5,
                    fontWeight: 600,
                    color: "var(--navy)",
                    lineHeight: 1.45,
                    listStyle: "none",
                    transition: "color var(--t-fast) var(--ease)",
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="rg-faq-mark"
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      borderRadius: "50%",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      transition:
                        "background var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), transform var(--t-med) var(--ease)",
                    }}
                  >
                    <span
                      style={{ position: "absolute", width: 11, height: 1.5, background: "currentColor", borderRadius: 1 }}
                    />
                    <span
                      className="rg-faq-bar"
                      style={{
                        position: "absolute",
                        width: 11,
                        height: 1.5,
                        background: "currentColor",
                        borderRadius: 1,
                        transform: "rotate(90deg)",
                        transition: "transform var(--t-med) var(--ease), opacity var(--t-med) var(--ease)",
                      }}
                    />
                  </span>
                </summary>
                <div className="rg-faq-body">
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--muted)",
                      lineHeight: 1.75,
                      margin: 0,
                      paddingBottom: "var(--s5)",
                      paddingRight: "var(--s7)",
                      maxWidth: "68ch",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
