import { GridTexture, Label } from "@/components/home/Primitives";

/**
 * The approach statement gets a full-width dark moment.
 *
 * Marked up as a <blockquote> attributed to the company itself — it is a
 * statement of position, not a customer testimonial, and nothing here
 * implies a third party said it.
 *
 * The proof strip below carries the existing homepage stats. All five are
 * rendered as literal text (no count-up), so "AI", "EN+ES" and "956" are
 * correct on first paint and in the server HTML.
 */
const PROOF = [
  { value: "2 Wks", label: "Average time to go live" },
  { value: "3", label: "Simple plans, no surprises" },
  { value: "EN+ES", label: "Bilingual content available" },
  { value: "AI", label: "Powered tools & systems" },
  { value: "956", label: "Locally rooted" },
];

export default function Approach() {
  return (
    <section
      aria-labelledby="approach-heading"
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
          bottom: "-30%",
          width: "55%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(232,98,26,0.16) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "var(--s7)" }}>
          <Label tone="dark">Our Approach</Label>
        </div>

        {/* Width is set in px, not ch: `ch` on the blockquote resolves against
            its own body font, not the Bebas heading nested inside it. */}
        <blockquote
          className="rg-reveal"
          style={{ margin: 0, maxWidth: "min(1000px, 100%)", position: "relative" }}
        >
          {/* Oversized quote mark, decorative only */}
          <span
            aria-hidden="true"
            className="rg-display"
            style={{
              position: "absolute",
              left: "-0.12em",
              top: "-0.34em",
              fontSize: "clamp(120px, 16vw, 230px)",
              color: "var(--orange)",
              opacity: 0.14,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            &ldquo;
          </span>
          <h2
            id="approach-heading"
            className="rg-display"
            style={{
              fontSize: "clamp(27px, 3.6vw, 50px)",
              color: "#fff",
              margin: 0,
              position: "relative",
              lineHeight: 1.02,
            }}
          >
            Most small businesses are{" "}
            <em style={{ color: "var(--orange)", fontStyle: "normal" }}>invisible online</em> — not
            because their product isn&apos;t good, but because nobody built them a system to get
            found. That&apos;s the gap we exist to close.
          </h2>
          <footer
            style={{
              marginTop: "var(--s7)",
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            RGV Performance Marketing · Harlingen, TX
          </footer>
        </blockquote>

        {/* Proof strip */}
        <dl
          className="rg-proof rg-reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "var(--s5)",
            marginTop: "var(--s10)",
            paddingTop: "var(--s7)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          {PROOF.map((p) => (
            <div key={p.label}>
              <dt
                className="rg-display"
                style={{ fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--orange)", lineHeight: 1 }}
              >
                {p.value}
              </dt>
              <dd
                style={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 8,
                  marginInline: 0,
                  lineHeight: 1.5,
                  maxWidth: "20ch",
                }}
              >
                {p.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
