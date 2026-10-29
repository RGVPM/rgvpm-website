import Link from "next/link";
import { SITE } from "@/lib/site";

/** Booking band at the foot of inner pages, matching the homepage's final CTA. */
export default function InnerCTA({
  heading = "Ready to Grow Your Business?",
  text = "Tell us what you're trying to grow. We'll map out the plan on a quick call and can have your new site live in as little as 8 to 10 days.",
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section
      className="rg-glow-band"
      style={{ background: "linear-gradient(180deg, var(--blue) 0%, #0A82DD 100%)", paddingBlock: "var(--section-y)" }}
    >
      <div className="rg-container" style={{ textAlign: "center", maxWidth: 760 }}>
        <h2 className="rg-display rg-reveal" style={{ fontSize: "clamp(40px,5.4vw,76px)", color: "var(--cream)", margin: "0 0 var(--s5)" }}>
          {heading}
        </h2>
        <p style={{ fontSize: 17, color: "rgba(253,248,236,0.94)", lineHeight: 1.7, margin: "0 auto var(--s7)", maxWidth: "52ch" }}>{text}</p>
        <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
            Book with us! <span aria-hidden="true">→</span>
          </a>
          <Link href="/pricing" className="rg-btn rg-cta-ghost">
            View Plans &amp; Pricing
          </Link>
        </div>
        <ul className="rg-reassure" style={{ marginTop: "var(--s6)" }}>
          <li>Month-to-month, cancel anytime</li>
          <li>New site live in 8 to 10 days</li>
          <li>No long-term contracts</li>
        </ul>
      </div>
    </section>
  );
}
