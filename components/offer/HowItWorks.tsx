import { Label, Section } from "@/components/home/Primitives";
import { OFFER, STEPS } from "@/lib/offer";

/**
 * Five steps, then the turnaround caveat in full.
 *
 * Step 04 states the 8–10 business day target and what it's measured from;
 * the callout underneath restates it as the qualified version, so the
 * timeline is never seen without its conditions attached. "Targeted for
 * launch", not "launched in" — this is a goal we work to, not a guarantee
 * we can make about a project whose content hasn't arrived yet.
 */

export default function HowItWorks() {
  return (
    <Section id="how-it-works" background="#fff" labelledBy="steps-heading">
      <div className="rg-container">
        <div style={{ maxWidth: "56ch", marginBottom: "var(--s8)" }}>
          <Label>How It Works</Label>
          <h2
            id="steps-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
          >
            From signup to live site.
          </h2>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, margin: "var(--s5) 0 0" }}>
            No six-month discovery phase. You pick a plan, send us your materials, and we build.
          </p>
        </div>

        <ol className="lp-steps">
          {STEPS.map((step) => (
            <li key={step.num} className="lp-step rg-reveal">
              <span className="lp-step-num rg-display" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="lp-step-title">
                <span className="sr-only">Step {step.num}: </span>
                {step.title}
              </h3>
              <p className="lp-step-text">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="lp-callout">
          <span className="lp-callout-tag rg-display">{OFFER.turnaround}*</span>
          <p>
            <strong>Typical turnaround: {OFFER.turnaround}</strong> after all required onboarding
            materials, credentials, content, feedback and approvals have been received. This is a
            target, not a guarantee — more complex projects may require additional time. More on
            this in the{" "}
            <a href="#faq" className="lp-inline-link">
              FAQ
            </a>{" "}
            below.
          </p>
        </div>
      </div>
    </Section>
  );
}
