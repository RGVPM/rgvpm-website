import { Label } from "@/components/home/Primitives";
import { TrackedCta, ViewContentOnce } from "@/components/offer/Track";
import {
  AGREEMENT_LINE,
  OFFER,
  OFFER_LINKS,
  PLANS,
  checkoutHref,
  planById,
  type Plan,
} from "@/lib/offer";

/**
 * Pricing — the section the whole page exists to deliver people to.
 *
 * Two cards, one obviously recommended. Both carry the same two facts in
 * the same place: the build fee is $0, and that is contingent on a 12-month
 * agreement. The agreement line sits under each button at full body size,
 * not as microtype, because a reader who feels ambushed by it at checkout
 * is a chargeback, not a customer.
 *
 * Wrapped in ViewContentOnce so reaching the plans registers as a
 * ViewContent in Meta — the mid-funnel signal that separates a real read
 * from a bounce off the hero.
 */

export default function OfferPlans() {
  return (
    <section
      id="plans"
      aria-labelledby="plans-heading"
      style={{ background: "#fff", paddingBlock: "var(--section-y)", position: "relative" }}
    >
      <ViewContentOnce contentName="website-offer-plans">
        <div className="rg-container">
          <div style={{ maxWidth: "58ch", marginBottom: "var(--s8)" }}>
            <Label>Plans</Label>
            <h2
              id="plans-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
            >
              Pick your plan. We&rsquo;ll build the website.
            </h2>
            <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, margin: "var(--s5) 0 0" }}>
              Both plans include your new website at {OFFER.buildFee} upfront build
              fee when you enroll in a qualifying {OFFER.agreementMonths}-month agreement.
            </p>
          </div>

          <div className="lp-plans">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* ── Which one, in one line each ─────────────────────── */}
          <div className="lp-compare" aria-label="Plan comparison">
            {PLANS.map((plan) => (
              <div key={plan.id} className="lp-compare-row">
                <span className="lp-compare-price">${plan.price}</span>
                <span aria-hidden="true" className="lp-compare-arrow">
                  →
                </span>
                <span className="lp-compare-text">{plan.outcome}</span>
              </div>
            ))}
          </div>

          {/* ── The condition, stated once, at readable size ────── */}
          <div className="lp-agreement">
            <span className="lp-agreement-mark" aria-hidden="true">
              !
            </span>
            <p>{AGREEMENT_LINE}</p>
          </div>

          {/* ── For anyone not ready to enter a card ────────────── */}
          <p className="lp-plans-alt">
            Not ready to start today?{" "}
            <TrackedCta
              href={OFFER_LINKS.booking}
              event="Lead"
              params={{ content_name: "consultation", content_category: "website-offer" }}
              className="lp-inline-link"
            >
              Book a free consultation
            </TrackedCta>{" "}
            or text{" "}
            <a href={OFFER_LINKS.sms} className="lp-inline-link">
              {OFFER_LINKS.phoneHuman}
            </a>
            .
          </p>
        </div>
      </ViewContentOnce>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const featured = !!plan.featured;

  return (
    <article className={`lp-plan${featured ? " lp-plan--featured" : ""}`} aria-labelledby={`plan-${plan.id}`}>
      {featured && <span className="lp-plan-ribbon">Most Popular</span>}

      <header>
        <h3 id={`plan-${plan.id}`} className="lp-plan-name rg-display">
          {plan.name}
        </h3>
        <p className="lp-plan-tagline">{plan.tagline}</p>

        <p className="lp-plan-price">
          <span className="lp-plan-amount rg-display">${plan.price}</span>
          <span className="lp-plan-cadence">{plan.cadence}</span>
        </p>

        <p className="lp-plan-badge">
          <span className="lp-plan-badge-zero">$0</span>
          Website Build Fee
        </p>
      </header>

      <div className="lp-plan-features">
        {plan.inherits && (
          <>
            <p className="lp-plan-inherits">{plan.inherits}</p>
            {/* Names what "everything in" actually covers, with counts, so the
                upper tier's shorter list never reads as the smaller offer. */}
            <ul className="lp-plan-carried" aria-label="Included from the Website + CRM plan">
              {planById("website-crm").groups.map((g) => (
                <li key={g.title}>
                  {g.title} <span>{g.items.length}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {plan.groups.map((group) => (
          <div key={group.title} className="lp-plan-group">
            <p className="lp-plan-group-title">{group.title}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <Tick featured={featured} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <footer className="lp-plan-foot">
        <TrackedCta
          href={checkoutHref(plan.id)}
          event="InitiateCheckout"
          params={{
            content_name: plan.name,
            content_ids: plan.id,
            value: plan.price,
            currency: "USD",
          }}
          className="lp-plan-cta rg-btn"
          ariaLabel={`${plan.ctaLabel} — ${plan.name}`}
        >
          {plan.ctaLabel}
        </TrackedCta>
        <p className="lp-plan-terms">{OFFER.agreementMonths}-month service agreement required.</p>
      </footer>
    </article>
  );
}

function Tick({ featured }: { featured: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle
        cx="8"
        cy="8"
        r="7.25"
        stroke={featured ? "rgba(232,98,26,0.55)" : "rgba(232,98,26,0.35)"}
        strokeWidth="1.4"
      />
      <path
        d="M4.9 8.2 6.9 10.2 11.1 6"
        stroke={featured ? "var(--orange-on-dark)" : "var(--orange)"}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
