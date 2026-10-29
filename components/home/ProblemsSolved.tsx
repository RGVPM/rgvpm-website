import Link from "next/link";
import { Button, Label, Lede, Section, SectionHeading } from "@/components/home/Primitives";
import { SITE } from "@/lib/site";

/**
 * "The busywork, handled": AI sold as the fix for a problem the owner
 * already has, not as a product. Each card names the problem first, then
 * a "We handle it" pill with the orange check, the same card the social
 * graphics use. AI only comes up once, at the end, as the how.
 *
 * Every fix here maps to something in the plans (lead inbox and follow-up,
 * reminders, review requests, the after-hours website assistant). No
 * outcome numbers: there are no verified stats for these yet.
 */
const PROBLEMS = [
  {
    problem: "Leads go cold before anyone replies.",
    fix: "Every form, text and DM gets a reply in seconds, day or night, and lands in one inbox.",
  },
  {
    problem: "Clients forget to come back.",
    fix: "Friendly reminders and rebooking texts go out on their own, with a link straight to your calendar.",
  },
  {
    problem: "Reviews only show up when someone is upset.",
    fix: "Happy clients get a review request after every visit, so they speak up too.",
  },
  {
    problem: "Questions pile up after you close.",
    fix: "Your website answers the common ones after hours and books the appointment for you.",
  },
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function ProblemsSolved() {
  return (
    <Section id="busywork" background="var(--cream)" labelledBy="busywork-heading">
      <div className="rg-container">
        <Label>Less busywork</Label>
        <SectionHeading id="busywork-heading">
          The Busywork, Handled.
          <br />
          <span style={{ color: "var(--blue)" }}>You Stay With Your Clients.</span>
        </SectionHeading>
        <Lede>
          Most of what slips through the cracks is the same few jobs. We set them up to run on
          their own, then keep an eye on them for you.
        </Lede>

        <ul className="rg-problems">
          {PROBLEMS.map((p, i) => (
            <li key={p.problem} className="rg-problem rg-reveal">
              <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-ink)", margin: 0 }}>
                Problem {String(i + 1).padStart(2, "0")}
              </p>
              <h3 style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.3, color: "var(--navy)", margin: "10px 0 0" }}>
                {p.problem}
              </h3>
              <div className="rg-handled">
                <span className="rg-handled-check" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-ink)", margin: 0 }}>
                    We handle it
                  </p>
                  <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--navy)", margin: "4px 0 0" }}>{p.fix}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="rg-problems-foot">
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: 0, maxWidth: "52ch" }}>
            Behind the scenes it&rsquo;s AI and automation we build and run for you. You
            don&rsquo;t have to learn any of it.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s5)", flexWrap: "wrap" }}>
            <Button href={SITE.bookingUrl}>
              Book with us! <span aria-hidden="true">→</span>
            </Button>
            <Link href="/services/ai-implementation" className="rg-text-link">
              How we use AI
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
