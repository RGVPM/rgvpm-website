import { Section } from "@/components/home/Primitives";

/**
 * How it works — three short steps. Copy stays factual and existing:
 * we look first, we set things up, we keep working each month.
 */
const STEPS = [
  {
    num: "1",
    title: "Look",
    text: "We look at your website, your Google page, and who else shows up in your town.",
  },
  {
    num: "2",
    title: "Set up",
    text: "We fix what is missing and turn on the pieces that help people find you and call you.",
  },
  {
    num: "3",
    title: "Keep going",
    text: "We keep working each month. You see what we did. Most businesses are ready in about two weeks.",
  },
];

export default function Process() {
  return (
    <Section id="how-it-works" background="var(--cream)" labelledBy="process-heading">
      <div className="rg-container">
        <div style={{ maxWidth: 640, marginBottom: "var(--s8)" }}>
          <h2
            id="process-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}
          >
            How it works
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--muted)",
              lineHeight: 1.6,
              margin: "var(--s4) 0 0",
              maxWidth: "40ch",
            }}
          >
            Three simple steps. No long wait to get started.
          </p>
        </div>

        <ol
          className="rg-steps-grid"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(28px, 4vw, 48px)",
          }}
        >
          {STEPS.map((step) => (
            <li key={step.num}>
              <span
                aria-hidden="true"
                className="rg-display"
                style={{
                  display: "block",
                  fontSize: 48,
                  color: "var(--orange)",
                  lineHeight: 1,
                  marginBottom: "var(--s4)",
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--navy)",
                  margin: "0 0 var(--s3)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "32ch",
                }}
              >
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
