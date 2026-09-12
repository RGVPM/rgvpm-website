import { Section } from "@/components/home/Primitives";
import { homeFaqs } from "@/lib/faqs";

/**
 * FAQ accordion. Native <details>/<summary> so answers stay in the DOM
 * and keep matching the FAQPage JSON-LD from the same `homeFaqs` source.
 */
export default function HomeFaq() {
  return (
    <Section id="faq" background="#fff" labelledBy="faq-heading">
      <div className="rg-container" style={{ maxWidth: 820 }}>
        <h2
          id="faq-heading"
          className="rg-display"
          style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "0 0 var(--s7)" }}
        >
          Questions people ask
        </h2>

        <div>
          {homeFaqs.map((faq, i) => (
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
                  fontSize: 17,
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
                    style={{
                      position: "absolute",
                      width: 11,
                      height: 1.5,
                      background: "currentColor",
                      borderRadius: 1,
                    }}
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
                    fontSize: 16,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                    paddingBottom: "var(--s5)",
                    paddingRight: "var(--s7)",
                    maxWidth: "62ch",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
