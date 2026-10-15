import Link from "next/link";
import LogoTape from "@/components/home/afterglow/LogoTape";

/**
 * Section 2. Four true facts and the real client logos, right under the
 * hero and before any pitch. Aesthetics and health logos lead (tape A).
 */
export default function ProofStrip() {
  return (
    <section aria-labelledby="proof-heading" className="ev-section ev-proof">
      <h2 id="proof-heading" className="sr-only">
        Clients and facts
      </h2>
      <div className="ev-wrap">
        <ul className="ev-facts ev-rise">
          <li>Harlingen, TX &middot; Nationwide</li>
          <li>English and Spanish</li>
          <li>Month-to-month on every plan</li>
          <li>
            <Link href="/terms#baa">HIPAA BAA for healthcare</Link>
          </li>
        </ul>
        <p className="ev-logo-caption ev-rise">Some of the businesses we&rsquo;ve built for.</p>
      </div>
      <LogoTape />
    </section>
  );
}
