import { Suspense } from "react";
import type { Metadata } from "next";

import MetaPixel from "@/components/offer/MetaPixel";
import PurchaseTracker from "@/components/offer/PurchaseTracker";
import { OfferTopBar } from "@/components/offer/OfferChrome";
import { GridTexture } from "@/components/home/Primitives";
import { OFFER, OFFER_LINKS } from "@/lib/offer";
import { SITE } from "@/lib/site";

/**
 * Post-checkout landing page.
 *
 * Two jobs: fire the Meta `Purchase` event, and tell a customer who just
 * entered a card what happens in the next hour and the next two weeks.
 *
 * noindex — this is a private destination reached only from a Stripe
 * redirect. It should never appear in search or absorb link equity.
 */
export const metadata: Metadata = {
  title: "You're in — welcome to RGVPM",
  description: "Your RGV Performance Marketing plan is confirmed. Here's what happens next.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    num: "01",
    title: "Check your email",
    text: "Your receipt and your onboarding form are on their way to the address you used at checkout.",
  },
  {
    num: "02",
    title: "Send us your materials",
    text: "Logo, photos, services, hours and anything you want on the site. The sooner this lands, the sooner the clock starts.",
  },
  {
    num: "03",
    title: "We build",
    text: `Most standard websites are targeted for launch within ${OFFER.turnaround} after all required materials, credentials, content, feedback and approvals are received.`,
  },
];

export default function ThankYouPage() {
  return (
    <div className="lp-root">
      <MetaPixel />
      {/* useSearchParams() needs a Suspense boundary to keep the rest of the
          page statically rendered. */}
      <Suspense fallback={null}>
        <PurchaseTracker />
      </Suspense>

      <OfferTopBar />

      <main>
        <section
          aria-labelledby="ty-heading"
          style={{
            background: "var(--navy)",
            position: "relative",
            overflow: "hidden",
            paddingBlock: "clamp(64px, 10vh, 128px)",
            minHeight: "62vh",
          }}
        >
          <GridTexture opacity={0.05} />
          <div
            aria-hidden="true"
            className="rg-hero-glow"
            style={{
              position: "absolute",
              left: "50%",
              top: "-30%",
              width: "58%",
              aspectRatio: "1",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(circle, rgba(232,98,26,0.22) 0%, rgba(232,98,26,0.05) 44%, transparent 68%)",
              pointerEvents: "none",
            }}
          />

          <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
            <div className="lp-ty">
              <span className="lp-ty-tick" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path
                    d="m5 12.4 4.6 4.6L19 7.6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <h1 id="ty-heading" className="rg-display lp-ty-h1">
                You&rsquo;re in. Let&rsquo;s build it.
              </h1>
              <p className="lp-ty-lede">
                Your plan is confirmed and your website is officially in the queue. Here&rsquo;s
                exactly what happens next.
              </p>

              <ol className="lp-ty-steps">
                {NEXT_STEPS.map((step) => (
                  <li key={step.num}>
                    <span className="lp-ty-num rg-display" aria-hidden="true">
                      {step.num}
                    </span>
                    <h2>{step.title}</h2>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>

              <p className="lp-ty-contact">
                Questions right now? Text{" "}
                <a href={OFFER_LINKS.sms}>{OFFER_LINKS.phoneHuman}</a> or email{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
