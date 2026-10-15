import { PhoneScreen } from "@/components/home/afterglow/DeviceFrame";

/**
 * Hero visual: two live client sites on phones. D'Vash Aesthetics in front
 * (a medspa owner sees their world first), Us To You Mobile Health behind.
 * Each phone is a link to the live site. Posters paint first; the motion
 * layer swaps in the full-length capture on idle and scrolls it with
 * reading holds. A sunset halo turns slowly behind them (CSS).
 * Mobile shows the front phone only.
 */
const SIZES = "(max-width: 767px) 64vw, (max-width: 1023px) 300px, 290px";

export default function HeroRig() {
  return (
    <div className="ev-rig-wrap">
      <div className="ev-rig" role="group" aria-label="Websites we built for clients">
        <span className="ev-halo" aria-hidden="true" />
        <a
          className="ev-phone ev-phone--back"
          href="https://www.ustoyoumobilehealth.com"
          target="_blank"
          rel="noopener"
          aria-label="Us To You Mobile Health website, built by us (opens in a new tab)"
        >
          <span className="ev-phone-core">
            <PhoneScreen
              slug="us-to-you-mobile-health"
              alt="The Us To You Mobile Health website on a phone"
              sizes="220px"
              poster
            />
          </span>
        </a>
        <a
          className="ev-phone ev-phone--front"
          href="https://www.dvashaesthetics.com"
          target="_blank"
          rel="noopener"
          aria-label="D’Vash Aesthetics website, built by us (opens in a new tab)"
        >
          <span className="ev-phone-core">
            <PhoneScreen
              slug="dvash-aesthetics"
              alt="The D’Vash Aesthetics website on a phone"
              sizes={SIZES}
              poster
              priority
            />
          </span>
        </a>
      </div>
      <p className="ev-rig-cap">
        <a href="https://www.dvashaesthetics.com" target="_blank" rel="noopener">
          dvashaesthetics.com<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <span>built by us</span>
      </p>
    </div>
  );
}
