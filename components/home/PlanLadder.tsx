import Link from "next/link";
import { HButton, HEyebrow, HLink, HSection, bookingHref } from "@/components/home/HomePrimitives";
import { PLANS, SOCIAL_PLANS } from "@/lib/site";

/**
 * Section 8, `#plans`. Real prices before any call, low to high, one
 * editorial recommendation, and a direct "Start" for ready buyers.
 * Names, prices, fees and checkout links come from lib/site.ts (copied from
 * PricingTabs.tsx, the live /pricing source). "Recommended" is an editorial
 * label, never "Most popular".
 *
 * Desktop: a staircase climbing toward the violet glow. Prices rise out of
 * a mask (motion/sections.ts); there is no count-up, so the only number
 * ever on screen is the real price.
 */
const COPY: Record<string, { fee: string; desc: string }> = {
  "Plant the Flag": {
    fee: "Month-to-month",
    desc: "Your custom website, built, hosted and maintained, plus one inbox for every lead.",
  },
  "SEO Package": {
    fee: "Month-to-month",
    desc: "Plant the Flag, plus your Google Business Profile and local SEO so more of the right people find you.",
  },
  "Build the Machine": {
    fee: "+ $399 one-time activation",
    desc: "SEO, managed ads on Google or Meta, two-way texting and email, automated follow-up and a monthly strategy call. Our usual pick for medspas and clinics. Website not included: we quote one up front if you need it.",
  },
  "Own the Market": {
    fee: "No activation fee",
    desc: "Everything in Build the Machine, with ads on both Google and Meta, social run for you, a dedicated strategist and strategy calls every two weeks.",
  },
};

const RECOMMENDED = "Build the Machine";

const money = (n: number) => n.toLocaleString("en-US");

export default function PlanLadder() {
  const [crew, full] = SOCIAL_PLANS;

  return (
    <HSection id="plans" labelledBy="plans-heading" className="ev-plans">
      <div className="ev-wrap">
        <div className="ev-head">
          <HEyebrow>Plans and pricing</HEyebrow>
          <h2 id="plans-heading" className="ev-h2" data-ev-reveal="">
            Prices up front. No call required.
          </h2>
          <p className="ev-lede ev-rise">
            Four plans, from a website and inbox to a full marketing team. Every plan is
            month-to-month.
          </p>
        </div>

        <ul className="ev-ladder">
          {PLANS.map((plan) => {
            const featured = plan.name === RECOMMENDED;
            const copy = COPY[plan.name];
            return (
              <li key={plan.name} className={`ev-plan${featured ? " ev-plan--featured" : ""}`}>
                <div className="ev-plan-shell">
                  <div className="ev-plan-core">
                    <div className="ev-plan-head">
                      <h3 className="ev-plan-name">{plan.name}</h3>
                      {featured && <span className="ev-chip">Recommended</span>}
                    </div>
                    <p className="ev-price">
                      <span className="ev-price-mask">
                        <span className="ev-price-num">
                          <span className="ev-price-cur">$</span>
                          {money(plan.price)}
                        </span>
                      </span>
                      <span className="ev-price-per">/mo</span>
                    </p>
                    <p className="ev-plan-fee">{copy?.fee}</p>
                    <p className="ev-plan-desc">{copy?.desc ?? plan.description}</p>
                    {plan.checkoutUrl && (
                      <HButton
                        href={plan.checkoutUrl}
                        variant={featured ? "compact" : "ghost"}
                        className={featured ? undefined : "ev-btn--sm"}
                        event="plan_start_click"
                        eventLabel={plan.name}
                      >
                        Start {plan.name}
                      </HButton>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="ev-plans-below">
          <div className="ev-help ev-rise">
            <p className="ev-plans-social">
              Just need social media? <strong>{crew.name}</strong> ${money(crew.price)}/mo &middot;{" "}
              <strong>{full.name}</strong> ${money(full.price)}/mo.
            </p>
            <Link href="/pricing" className="ev-link" data-ev="pricing_link_click" data-ev-label="social">
              <span>See social plans</span> <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="ev-help ev-rise">
            <p>
              Not sure where to start? Book a free call and we&rsquo;ll tell you which plan fits,
              even if it&rsquo;s the cheapest one.
            </p>
            <div className="ev-ctas">
              <HButton href={bookingHref("plans")} variant="compact" event="plans_cta_click">
                Book a free strategy call
              </HButton>
              <HLink href="/pricing" event="pricing_link_click" eventLabel="compare">
                Compare every feature
              </HLink>
            </div>
          </div>
        </div>
        <p className="ev-footnote">
          Every plan is month-to-month. Ad spend is billed by Google or Meta directly. Build the
          Machine and Own the Market are marketing plans: if you need a new website on one of
          them, we quote it up front, before you sign.
        </p>
      </div>
    </HSection>
  );
}
