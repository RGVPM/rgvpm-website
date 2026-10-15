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

/* Logo heights balanced by visible area (height = sqrt(area / aspect ratio)
   on the trimmed files), so wide wordmarks and square badges carry the same
   weight. D'Vash, the lead medspa client, gets a slightly larger share. */
const LOGO_HEIGHTS: Record<string, number> = {
  "D'Vash Aesthetics": 46,
  "Glammed Up Aesthetics": 44,
  "6 Day Medical Weight Loss": 30,
  "The Spa Business Coach": 36,
  "Us To You Mobile Health": 30,
  "NeuroMotion Rehabilitation": 58,
  "RGV Scalp Ink": 54,
  "CCL Contracting": 41,
  "Premium Foam: Spray Foam Insulation": 46,
  "V&S Painting & More": 34,
  "STX Swing Doctor": 56,
  "Tsukie Coffee": 58,
  "EZ Clean Express": 50,
  "La Feria Co-op Gin & Supply": 51,
};

export default function ProofStrip() {
  return (
    <section aria-labelledby="proof-heading" className="rg-h-section rg-h-section--tight rg-h-bg-bone">
      <h2 id="proof-heading" className="sr-only">
        Clients and facts
      </h2>
      <div className="rg-h-wrap">
        <ul className="rg-h-facts">
          <li>Harlingen, TX &middot; Nationwide</li>
          <li>English and Spanish</li>
          <li>Month-to-month on every plan</li>
          <li>
            <Link href="/terms#baa">HIPAA BAA for healthcare</Link>
          </li>
        </ul>
      </div>
      <div className="rg-h-wrap rg-h-logos">
        <ClientMarquee
          tone="mono"
          order={LOGO_ORDER}
          heights={LOGO_HEIGHTS}
          heading={
            <p className="rg-h-logo-caption">
              Some of the businesses we&rsquo;ve built for.
            </p>
          }
        />
      </div>
    </section>
  );
}
