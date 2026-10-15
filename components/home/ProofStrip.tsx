import Link from "next/link";
import ClientMarquee from "@/components/ClientMarquee";

/**
 * Section 2. Four true facts and the real client logos, right under the
 * hero and before any pitch. Aesthetics and health logos lead.
 */
const LOGO_ORDER = [
  "D'Vash Aesthetics",
  "Glammed Up Aesthetics",
  "6 Day Medical Weight Loss",
  "The Spa Business Coach",
  "Us To You Mobile Health",
  "NeuroMotion Rehabilitation",
  "RGV Scalp Ink",
];

export default function ProofStrip() {
  return (
    <section aria-labelledby="proof-heading" className="rg-h-section rg-h-section--tight rg-h-bg-bone">
      <h2 id="proof-heading" className="sr-only">
        Clients and facts
      </h2>
      <div className="rg-h-wrap">
        <ul className="rg-h-facts">
          <li>Based in Harlingen, TX. Working nationwide.</li>
          <li>English and Spanish</li>
          <li>Month-to-month on every plan</li>
          <li>
            <Link href="/terms#baa">HIPAA BAA for healthcare clients</Link>
          </li>
        </ul>
      </div>
      <div className="rg-h-wrap rg-h-logos">
        <ClientMarquee
          tone="mono"
          order={LOGO_ORDER}
          heading={
            <p className="rg-h-logo-caption">
              Some of the businesses we&rsquo;ve built for. Tap a logo to visit the live site.
            </p>
          }
        />
      </div>
    </section>
  );
}
