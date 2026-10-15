import { HButton, HSection, bookingHref } from "@/components/home/HomePrimitives";

/**
 * Section 7, `#how-it-works`. Makes starting feel close and easy. A sunset
 * line draws itself under the three steps as you scroll, and each step
 * lights up when the line reaches it (motion/sections.ts); with reduced
 * motion the line is drawn and every step is lit.
 * TODO(owner): confirm "as little as 8 to 10 days" and "You review it
 * before launch" are still current (spec decision #4). The marketing-plan
 * setup note deliberately gives no day count until the owner confirms one.
 */
const STEPS = [
  {
    when: "Days 1 to 2",
    title: "Kickoff",
    body: "We learn your services, your area and the customers you want more of. You send your logo and photos.",
  },
  {
    when: "Days 3 to 7",
    title: "Design and build",
    body: "We write, design and build the site, then connect your forms and inbox. You review it before launch.",
  },
  {
    when: "Days 8 to 10",
    title: "Launch",
    body: "We connect your domain and Google profile, go live, and start the monthly work your plan covers.",
  },
];

export default function Process() {
  return (
    <HSection id="how-it-works" labelledBy="process-heading" className="ev-process">
      <div className="ev-wrap">
        <div className="ev-process-head">
          <h2 id="process-heading" className="ev-h2" data-ev-reveal="">
            Your new site, live in as little as 8 to 10 <strong>days</strong>.
          </h2>
          <p className="ev-numeral ev-rise" aria-hidden="true">
            <span className="ev-numeral-num">8-10</span>
            <small>Days to launch</small>
          </p>
        </div>

        <div className="ev-steps-wrap">
          <span className="ev-track" aria-hidden="true">
            <span className="ev-track-fill" />
          </span>
          <ol className="ev-steps">
            {STEPS.map((s) => (
              <li key={s.title} className="ev-step">
                <span className="ev-step-dot" aria-hidden="true" />
                <span className="ev-step-when">{s.when}</span>
                <h3 className="ev-h3">{s.title}</h3>
                <p className="ev-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="ev-effort ev-rise">
          <div>
            <span className="ev-effort-k">Your part</span>
            <p>One call, your logo and photos. On ad plans, access to your Google and ad accounts.</p>
          </div>
          <div>
            <span className="ev-effort-k">Our part</span>
            <p>Design, copy, build, hosting and launch.</p>
          </div>
        </div>

        <p className="ev-process-note ev-rise">
          On Build the Machine and Own the Market, the first stretch is setup: we connect your
          Google profile, inbox and ad accounts, then launch your first campaign once the platform
          approves it.
        </p>

        <div className="ev-process-cta">
          <HButton href={bookingHref("process")} event="process_cta_click">
            Book a free strategy call
          </HButton>
        </div>
      </div>
    </HSection>
  );
}
