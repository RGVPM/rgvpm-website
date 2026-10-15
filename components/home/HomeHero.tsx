import Image from "next/image";
import HeroRig from "@/components/home/afterglow/HeroRig";
import Ticker from "@/components/home/afterglow/Ticker";
import { HButton, HLink, bookingHref } from "@/components/home/HomePrimitives";
import { PLANS, PLANS_FROM } from "@/lib/site";

/** Entry price of the first plan with ads and automated follow-up. */
const MARKETING_FROM = PLANS.find((p) => p.name === "Build the Machine")?.price ?? 899;

/**
 * Section 1, golden hour. Answers "what is this, is it for me, what does it
 * cost" in one screen, with two live client sites on the right.
 *
 * Server component. The single H1 carries the positioning line (keyword,
 * place, nationwide) as a mono label plus the display line. The display
 * lines are painted at full opacity on the first frame (LCP text); their
 * settle-in is a CSS transform only, and the scroll drift is GSAP.
 */
export const HERO_CTA_ID = "hero-cta";

export default function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="ev-hero">
      <div className="ev-wrap ev-hero-grid">
        <div className="ev-hero-copy">
          <h1 id="hero-heading" className="ev-h1">
            <span className="ev-hero-eyebrow">
              <span>AI &amp; marketing agency</span>
              <span className="sr-only">, </span>
              <span className="ev-sep" aria-hidden="true" />{" "}
              <span>Harlingen, TX</span>
              <span className="sr-only">, </span>
              <span className="ev-sep ev-sep-2" aria-hidden="true" />{" "}
              <span className="ev-eb-last">Serving businesses nationwide</span>
              <span className="sr-only">. </span>
            </span>{" "}
            <span className="ev-h1-display">
              {/* Outer span: GSAP scroll drift. Inner span: the CSS settle-in.
                  Kept apart so GSAP never reads a mid-intro transform. */}
              <span className="ev-h1-line">
                <span className="ev-h1-in">Get found first.</span>
              </span>{" "}
              <span className="ev-h1-line">
                <span className="ev-h1-in">
                  Get <span className="ev-glow">booked</span>.
                </span>
              </span>
            </span>
          </h1>

          <p className="ev-hero-lede ev-hero-after">
            We build your website, get you found on Google, run your ads, and set up AI that
            follows up with new inquiries. One team, month-to-month, with a specialty in medspas.
          </p>

          <div className="ev-ctas ev-hero-ctas ev-hero-after">
            <HButton id={HERO_CTA_ID} href={bookingHref("hero")} event="hero_cta_click">
              Book a free strategy call
            </HButton>
            <HButton
              href="#plans"
              variant="ghostDark"
              className="ev-only-desktop"
              event="pricing_link_click"
              eventLabel="hero"
            >
              See plans and pricing
            </HButton>
          </div>

          <p className="ev-hero-micro ev-hero-after">
            <span className="ev-faces" aria-hidden="true">
              <Image src="/founders/derrick.jpg" alt="" width={76} height={76} sizes="38px" />
              <Image src="/founders/kelsey.jpg" alt="" width={76} height={76} sizes="38px" />
            </span>
            <span>
              You&rsquo;ll talk to Derrick or Kelsey. Websites from ${PLANS_FROM}/mo, full
              marketing from ${MARKETING_FROM}/mo, all month-to-month.{" "}
              <HLink href="#plans" className="ev-only-mobile" event="pricing_link_click" eventLabel="hero">
                See plans and pricing
              </HLink>
            </span>
          </p>
        </div>

        <HeroRig />
      </div>
      <Ticker />
    </section>
  );
}
