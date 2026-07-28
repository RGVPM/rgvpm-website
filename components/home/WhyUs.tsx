import { Label, Section } from "@/components/home/Primitives";

/**
 * Differentiators as an authoritative editorial block — one large
 * statement, then structured rows divided by hairlines and large
 * numerals. Deliberately not four cards.
 *
 * All four differentiator titles and descriptions are the existing
 * homepage copy, unchanged.
 */
const POINTS = [
  {
    num: "01",
    title: "AI-Powered. Human-Led.",
    text: "We use cutting-edge AI tools to work faster and smarter — so you get results that used to require a team three times our size.",
  },
  {
    num: "02",
    title: "No Vanity Metrics.",
    text: "We report on leads, calls, form fills, and booked appointments. Not impressions. You always know exactly what your investment is producing.",
  },
  {
    num: "03",
    title: "Month-to-Month. No Traps.",
    text: "No long-term contracts. No fine print. We keep clients by delivering results — not by locking them in.",
  },
  {
    num: "04",
    title: "Fast Onboarding.",
    text: "Most clients are live within two weeks. We move fast, communicate clearly, and don't waste your time with unnecessary back-and-forth.",
  },
];

export default function WhyUs() {
  return (
    <Section id="why-us" background="#fff" labelledBy="why-us-heading">
      <div className="rg-container">
        <div style={{ maxWidth: 520, marginBottom: "var(--s9)" }} className="rg-reveal">
          <Label>Why Us</Label>
          <h2
            id="why-us-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
          >
            Built Different.
            <br />
            Built to Deliver.
          </h2>
        </div>

        <div
          className="rg-why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "clamp(40px, 6vw, 96px)",
          }}
        >
          {POINTS.map((p, i) => (
            <div
              key={p.num}
              className="rg-reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "var(--s5)",
                alignItems: "start",
                paddingBlock: "var(--s7)",
                borderTop: "1px solid var(--border)",
                // Last row on desktop gets a closing rule
                borderBottom: i >= POINTS.length - 2 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                className="rg-display"
                style={{
                  fontSize: 40,
                  lineHeight: 0.85,
                  color: "var(--orange)",
                  opacity: 0.28,
                  minWidth: "1.9ch",
                }}
              >
                {p.num}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: "var(--navy)",
                    margin: "0 0 var(--s3)",
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--muted)",
                    lineHeight: 1.72,
                    margin: 0,
                    maxWidth: "48ch",
                  }}
                >
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
