import Image from "next/image";
import WorkStack from "@/components/home/WorkStack";
import { HButton, HLink, bookingHref } from "@/components/home/HomePrimitives";
import { PLANS, PLANS_FROM } from "@/lib/site";

/** Entry price of the first plan with ads and automated follow-up. */
const MARKETING_FROM = PLANS.find((p) => p.name === "Build the Machine")?.price ?? 899;

/**
 * Section 1, the night hero. Answers "what is this, is it for me, what does
 * it cost" in one screen, with real work on the right.
 *
 * Server component. The single H1 carries the positioning line (keyword,
 * place, nationwide) as a mono label plus the display line. The display line
 * animates transform only, so it paints immediately as the LCP text.
 */
export const HERO_CTA_ID = "hero-cta";

export default function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="rg-h-hero rg-h-bg-night rg-h-dark">
      <div className="rg-h-wrap rg-h-hero-grid">
        <div>
          <h1 id="hero-heading">
            <span className="rg-h-hero-eyebrow">
              <span>AI &amp; marketing agency</span>
              <span className="sr-only">, </span>
              <span className="rg-h-sep" aria-hidden="true" />{" "}
              <span>Harlingen, TX</span>
              <span className="sr-only">, </span>
              <span className="rg-h-sep" aria-hidden="true" />{" "}
              <span>Serving businesses nationwide</span>
              <span className="sr-only">. </span>
            </span>{" "}
            <span className="rg-h-hero-display">
              Get found first.{" "}
              <span>
                Get <em>booked</em>.
              </span>
            </span>
          </h1>

          <p className="rg-h-hero-lede">
            We build your website, get you found on Google, run your ads, and set up AI that
            follows up with new inquiries. One team, month-to-month, with a specialty in medspas.
          </p>

          <div className="rg-h-ctas rg-h-hero-ctas">
            <HButton id={HERO_CTA_ID} href={bookingHref("hero")} event="hero_cta_click">
              Book a free strategy call
            </HButton>
            <HButton
              href="#plans"
              variant="ghostDark"
              className="rg-h-only-desktop"
              event="pricing_link_click"
              eventLabel="hero"
            >
              See plans and pricing
            </HButton>
            <HLink href="#plans" className="rg-h-only-mobile" event="pricing_link_click" eventLabel="hero">
              See plans and pricing
            </HLink>
          </div>

          <p className="rg-h-hero-micro">
            <span className="rg-h-faces" aria-hidden="true">
              <Image src="/founders/derrick.jpg" alt="" width={72} height={72} sizes="36px" />
              <Image src="/founders/kelsey.jpg" alt="" width={72} height={72} sizes="36px" />
            </span>
            <span>
              You&rsquo;ll talk to Derrick or Kelsey. Websites from ${PLANS_FROM}/mo, full
              marketing from ${MARKETING_FROM}/mo, all month-to-month.
            </span>
          </p>
        </div>

        <WorkStack />
      </div>
    </section>
  );
}
