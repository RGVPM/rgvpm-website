import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/home/Primitives";
import { SITE } from "@/lib/site";

/**
 * Closing section. Plain navy like the hero, with the founders' faces so the
 * last thing a visitor sees is who they'd actually be talking to.
 *
 * One dominant CTA, same label as the nav and hero ("Book with us!"), with
 * pricing, phone, and email as secondary paths. No countdowns, no
 * manufactured scarcity.
 */
const REASSURANCE = ["Month-to-month, cancel anytime", "New site live in 8 to 10 days", "No long-term contracts"];

const FOUNDERS = [
  { src: "/founders/derrick.jpg", alt: "Derrick Tamez" },
  { src: "/founders/kelsey.jpg", alt: "Kelsey Tamez" },
];

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      style={{
        background: "linear-gradient(180deg, var(--navy) 0%, #15233D 100%)",
        paddingBlock: "var(--section-y)",
      }}
    >
      <div className="rg-container" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--s5)" }}>
          {FOUNDERS.map((f, i) => (
            <span
              key={f.src}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid var(--navy)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.18)",
                marginLeft: i === 0 ? 0 : -14,
                position: "relative",
                display: "block",
              }}
            >
              <Image src={f.src} alt={f.alt} fill sizes="64px" style={{ objectFit: "cover", objectPosition: "50% 18%" }} />
            </span>
          ))}
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 var(--s5)" }}>
          You&rsquo;ll talk to Derrick and Kelsey directly.
        </p>

        <h2
          id="final-cta-heading"
          className="rg-display"
          style={{ fontSize: "clamp(42px, 6vw, 88px)", color: "#fff", margin: "0 auto var(--s5)", maxWidth: "16ch" }}
        >
          Ready to Grow Your Business?
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 auto var(--s7)", maxWidth: "50ch" }}>
          Tell us what you&rsquo;re trying to grow. We&rsquo;ll map out the plan on a quick call and can
          have your new site live in as little as 8 to 10 days.
        </p>

        <div
          className="rg-cta-actions"
          style={{ display: "flex", gap: "var(--s3)", justifyContent: "center", flexWrap: "wrap", marginBottom: "var(--s7)" }}
        >
          <Button href={SITE.bookingUrl} variant="onDark" style={{ padding: "18px 34px", fontSize: 16 }}>
            Book with us! <span aria-hidden="true">→</span>
          </Button>
          <Button href="/pricing" variant="ghostDark" style={{ padding: "18px 34px", fontSize: 16 }}>
            View Plans &amp; Pricing
          </Button>
        </div>

        <ul className="rg-reassure">
          {REASSURANCE.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <div
          style={{
            marginTop: "var(--s7)",
            paddingTop: "var(--s6)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "var(--s3) var(--s6)",
            fontSize: 14,
          }}
        >
          <a href={`tel:${SITE.phone}`} style={{ color: "rgba(255,255,255,0.78)", textDecoration: "none", fontWeight: 600 }}>
            {SITE.phoneHuman}
          </a>
          <a href={`mailto:${SITE.email}`} style={{ color: "rgba(255,255,255,0.78)", textDecoration: "none", fontWeight: 600 }}>
            {SITE.email}
          </a>
          <Link href="/contact" style={{ color: "var(--orange-on-dark)", textDecoration: "none", fontWeight: 700 }}>
            Contact us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
