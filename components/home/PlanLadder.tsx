import Link from "next/link";
import { BezelFrame, HButton, HEyebrow, HLink, HSection, bookingHref } from "@/components/home/HomePrimitives";
import { PLANS, SOCIAL_PLANS } from "@/lib/site";

/**
 * Section 7, `#plans`. Real prices before any call, low to high, one
 * editorial recommendation, and a direct "Start" for ready buyers.
 * Names, prices, fees and checkout links come from lib/site.ts (copied from
 * PricingTabs.tsx, the live /pricing source). "Recommended" is an editorial
 * label, never "Most popular".
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
    desc: "SEO, managed ads, two-way texting and email, automated follow-up and a monthly strategy call. Our usual pick for medspas and clinics.",
  },
  "Own the Market": {
    fee: "No activation fee",
    desc: "Ads on Google and Meta, social run for you, a dedicated strategist and strategy calls every two weeks.",
  },
};

const RECOMMENDED = "Build the Machine";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function PlanLadder() {
  const [crew, full] = SOCIAL_PLANS;

  return (
    <HSection id="plans" surface="cream" labelledBy="plans-heading" className="rg-h-plans">
      <div className="rg-h-wrap">
        <div className="rg-h-head rg-h-reveal">
          <HEyebrow>Plans and pricing</HEyebrow>
          <h2 id="plans-heading" className="rg-h-h2">
            Real prices, before you ever get on a call.
          </h2>
          <p className="rg-h-lede">
            Four plans, from a website and inbox to a full marketing team. Every plan is
            month-to-month.
          </p>
        </div>

        <BezelFrame className="rg-h-ladder rg-h-reveal">
          <ul className="rg-h-ladder-list">
            {PLANS.map((plan) => {
              const featured = plan.name === RECOMMENDED;
              const copy = COPY[plan.name];
              return (
                <li key={plan.name} className={`rg-h-plan${featured ? " rg-h-plan--featured" : ""}`}>
                  <div className="rg-h-plan-head">
                    <h3 className="rg-h-h3">{plan.name}</h3>
                    {featured && <span className="rg-h-chip">Recommended</span>}
                  </div>
                  <p className="rg-h-price">
                    <span className="rg-h-price-num">{money(plan.price)}</span>
                    <span className="rg-h-price-per">/mo</span>
                  </p>
                  <p className="rg-h-plan-fee">{copy?.fee}</p>
                  <p className="rg-h-plan-desc">{copy?.desc ?? plan.description}</p>
                  {plan.checkoutUrl && (
                    <HButton
                      href={plan.checkoutUrl}
                      variant={featured ? "compact" : "ghost"}
                      event="plan_start_click"
                      eventLabel={plan.name}
                    >
                      Start {plan.name}
                    </HButton>
                  )}
                </li>
              );
            })}
          </ul>
        </BezelFrame>

        <div className="rg-h-plans-below">
          <p className="rg-h-plans-social">
            Just need social media? {crew.name} {money(crew.price)}/mo &middot; {full.name}{" "}
            {money(full.price)}/mo.{" "}
            <Link href="/pricing" className="rg-h-link" data-ev="pricing_link_click" data-ev-label="social">
              See social plans
            </Link>
          </p>
          <div className="rg-h-plans-help">
            <p>
              Not sure which fits? Book a free call and we&rsquo;ll tell you honestly, even if
              it&rsquo;s the cheapest plan.
            </p>
            <div className="rg-h-ctas">
              <HButton href={bookingHref("plans")} variant="compact" event="plans_cta_click">
                Book a free strategy call
              </HButton>
              <HLink href="/pricing" event="pricing_link_click" eventLabel="compare">
                Compare every feature
              </HLink>
            </div>
          </div>
          <p className="rg-h-footnote">
            Month-to-month &middot; Ad spend billed by Google or Meta directly &middot; Build the
            Machine and Own the Market are marketing plans; a new website on those is quoted
            separately
          </p>
        </div>
      </div>
    </HSection>
  );
}
