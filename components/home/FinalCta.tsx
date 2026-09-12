import Link from "next/link";
import { Button } from "@/components/home/Primitives";
import { SITE } from "@/lib/site";

/**
 * Closing ask. Same booking URL as the hero. No grid texture, no glow.
 */
export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      style={{
        background: "var(--navy)",
        paddingBlock: "var(--section-y)",
      }}
    >
      <div className="rg-container" style={{ maxWidth: 720 }}>
        <h2
          id="final-cta-heading"
          className="rg-display"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            color: "#fff",
            margin: "0 0 var(--s5)",
            maxWidth: "16ch",
          }}
        >
          Want more people to find you?
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.65,
            margin: "0 0 var(--s7)",
            maxWidth: "38ch",
          }}
        >
          Tell us what you sell. We will show you how people can find you online.
        </p>

        <div
          className="rg-cta-actions"
          style={{
            display: "flex",
            gap: "var(--s3)",
            flexWrap: "wrap",
            marginBottom: "var(--s7)",
          }}
        >
          <Button href={SITE.bookingUrl} variant="onDark" style={{ padding: "18px 28px", fontSize: 16 }}>
            Get a free growth assessment <span aria-hidden="true">→</span>
          </Button>
          <Button href="/pricing" variant="ghostDark" style={{ padding: "18px 28px", fontSize: 16 }}>
            See plans
          </Button>
        </div>

        <div
          style={{
            paddingTop: "var(--s6)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--s3) var(--s6)",
            fontSize: 14,
          }}
        >
          <a
            href={`tel:${SITE.phone}`}
            style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontWeight: 600 }}
          >
            {SITE.phoneHuman}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontWeight: 600 }}
          >
            {SITE.email}
          </a>
          <Link
            href="/contact"
            style={{ color: "var(--orange-on-dark)", textDecoration: "none", fontWeight: 700 }}
          >
            Contact us
          </Link>
          <Link
            href="/blog"
            style={{ color: "var(--orange-on-dark)", textDecoration: "none", fontWeight: 700 }}
          >
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
