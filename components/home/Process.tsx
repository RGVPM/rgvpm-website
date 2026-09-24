import { Section } from "@/components/home/Primitives";

/**
 * "New website in 8 to 10 days" as a horizontal three-step rail.
 *
 * The rail is a plain rule with three markers, no scroll listener, no JS.
 * Under 900px the steps stack and the rail turns vertical (globals.css,
 * `.rg-steps`).
 */
const STEPS = [
  {
    num: "01",
    days: "Days 1 to 2",
    title: "Kickoff",
    text: "A short call to learn your business. Then we gather your photos, services, and anything else the site needs.",
  },
  {
    num: "02",
    days: "Days 3 to 7",
    title: "Design & Build",
    text: "We design the pages, write the copy, and build the whole site mobile-first. You see it before it goes anywhere.",
  },
  {
    num: "03",
    days: "Days 8 to 10",
    title: "Launch",
    text: "One round of revisions, final polish, and your site goes live. After that we keep it updated and growing.",
  },
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function Process() {
  return (
    <Section id="how-it-works" background="var(--cream)" labelledBy="process-heading">
      <div className="rg-container">
        <div className="rg-process-head">
          <h2
            id="process-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}
          >
            A New Website In As Little As
            <span style={{ color: "var(--orange)" }}> 8 to 10 Days.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", margin: 0, maxWidth: "40ch" }}>
            No six-month onboarding. We design it, build it, and launch it fast, then keep it working
            for you.
          </p>
        </div>

        <ol className="rg-steps">
          {STEPS.map((s) => (
            <li key={s.num} className="rg-step rg-reveal">
              <span className="rg-step-marker rg-display" aria-hidden="true">
                {s.num}
              </span>
              <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-ink)", margin: 0 }}>
                {s.days}
              </p>
              <h3 className="rg-display" style={{ fontSize: "clamp(28px, 2.6vw, 36px)", color: "var(--navy)", margin: "var(--s2) 0 var(--s3)" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--muted)", margin: 0, maxWidth: "36ch" }}>
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
