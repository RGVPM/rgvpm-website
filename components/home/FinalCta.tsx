import Link from "next/link";
import { Button, GridTexture } from "@/components/home/Primitives";
import { SITE } from "@/lib/site";

/**
 * Closing section. Deliberately mirrors the hero — same navy field, same
 * grid texture, same warm bloom — so the page closes where it opened
 * instead of ending on an unrelated gradient banner.
 *
 * One dominant CTA (Book a Free Call), with pricing and email as the
 * secondary paths. Reassurance line restates existing month-to-month and
 * two-week onboarding positioning. No countdowns, no manufactured scarcity.
 */
const REASSURANCE = [
  "Month-to-month — cancel anytime",
  "Most clients live in two weeks",
  "No long-term contracts",
];

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      style={{
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
        paddingBlock: "var(--section-y)",
      }}
    >
      <GridTexture opacity={0.05} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "-40%",
          transform: "translateX(-50%)",
          width: "min(900px, 90%)",
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(232,98,26,0.22) 0%, transparent 62%)",
          pointerEvents: "none",
        }}
      />
      {/* Hairline echoing the one that closes the hero */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 22%, rgba(232,98,26,0.5) 50%, rgba(255,255,255,0.16) 78%, transparent)",
        }}
      />

      <div
        className="rg-container"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <h2
          id="final-cta-heading"
          className="rg-display"
          style={{
            fontSize: "clamp(42px, 6vw, 88px)",
            color: "#fff",
            margin: "0 auto var(--s5)",
            maxWidth: "16ch",
          }}
        >
          Ready to Grow Your Business?
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.7,
            margin: "0 auto var(--s7)",
            maxWidth: "52ch",
          }}
        >
          Pick your plan and we&apos;ll have you up and running in two weeks. No long-term
          commitment required.
        </p>

        <div
          className="rg-cta-actions"
          style={{
            display: "flex",
            gap: "var(--s3)",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "var(--s7)",
          }}
        >
          <Button href={SITE.bookingUrl} variant="onDark" style={{ padding: "18px 34px", fontSize: 16 }}>
            Book a Free Call <span aria-hidden="true">→</span>
          </Button>
          <Button href="/pricing" variant="ghostDark" style={{ padding: "18px 34px", fontSize: 16 }}>
            View Plans &amp; Pricing
          </Button>
        </div>

        <ul
          style={{
            listStyle: "none",
            margin: "0 0 var(--s7)",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "var(--s3) var(--s6)",
          }}
        >
          {REASSURANCE.map((r) => (
            <li
              key={r}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  flexShrink: 0,
                }}
              />
              {r}
            </li>
          ))}
        </ul>

        <div
          style={{
            paddingTop: "var(--s6)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            justifyContent: "center",
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
            Contact us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
