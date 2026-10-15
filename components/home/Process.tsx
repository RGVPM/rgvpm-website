import { HButton, HSection, bookingHref } from "@/components/home/HomePrimitives";

/**
 * Section 6, `#how-it-works`. Makes starting feel close and easy.
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
    <HSection id="how-it-works" surface="bone" labelledBy="process-heading">
      <div className="rg-h-wrap">
        <div className="rg-h-process-head rg-h-reveal">
          <h2 id="process-heading" className="rg-h-h2">
            Your new site, live in as little as 8 to 10 <em>days</em>.
          </h2>
          <p className="rg-h-numeral" aria-hidden="true">
            8-10 <small>Days to launch</small>
          </p>
        </div>

        <ol className="rg-h-steps">
          {STEPS.map((s) => (
            <li key={s.title} className="rg-h-step rg-h-reveal">
              <span className="rg-h-mono">{s.when}</span>
              <h3 className="rg-h-h3">{s.title}</h3>
              <p className="rg-h-body">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="rg-h-effort rg-h-reveal">
          <div>
            <span className="rg-h-mono">Your part</span>
            <p>One call, your logo and photos. On ad plans, access to your Google and ad accounts.</p>
          </div>
          <div>
            <span className="rg-h-mono">Our part</span>
            <p>Design, copy, build, hosting and launch.</p>
          </div>
        </div>

        <p className="rg-h-process-note rg-h-reveal">
          On Build the Machine and Own the Market, the first stretch is setup: we connect your
          Google profile, inbox and ad accounts, then launch your first campaign once the platform
          approves it.
        </p>

        <div className="rg-h-process-cta">
          <HButton href={bookingHref("process")} event="process_cta_click">
            Book a free strategy call
          </HButton>
        </div>
      </div>
    </HSection>
  );
}
