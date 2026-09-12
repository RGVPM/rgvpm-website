import Link from "next/link";
import { Section } from "@/components/home/Primitives";

/**
 * What we do — a short list of real services with crawlable internal links.
 * Names stay plain. Every href is an existing /services/* page.
 */
const OFFERS = [
  {
    name: "Websites",
    text: "A clear site that tells people who you are and how to call you.",
    href: "/services/website-design",
  },
  {
    name: "Show up on Google",
    text: "When someone nearby searches, they can find your business.",
    href: "/services/local-seo",
  },
  {
    name: "Ads",
    text: "We put your name in front of people who are already looking.",
    href: "/services/paid-advertising",
  },
  {
    name: "Texts and emails",
    text: "We help you write people back so they do not forget you.",
    href: "/services/sms-email-marketing",
  },
  {
    name: "Keep track of leads",
    text: "When someone reaches out, we help you follow up.",
    href: "/services/lead-management",
  },
];

export default function Capabilities() {
  return (
    <Section background="#fff" labelledBy="capabilities-heading">
      <div className="rg-container">
        <div style={{ maxWidth: 640, marginBottom: "var(--s8)" }}>
          <h2
            id="capabilities-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}
          >
            What we do
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--muted)",
              lineHeight: 1.6,
              margin: "var(--s4) 0 0",
              maxWidth: "42ch",
            }}
          >
            We help people find your business online. Then we help them call you.
          </p>
        </div>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxWidth: 720,
            borderTop: "1px solid var(--border)",
          }}
        >
          {OFFERS.map((offer) => (
            <li key={offer.href} style={{ borderBottom: "1px solid var(--border)" }}>
              <Link
                href={offer.href}
                style={{
                  display: "block",
                  padding: "var(--s6) 0",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1.25,
                    marginBottom: 8,
                  }}
                >
                  {offer.name}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "var(--muted)",
                    lineHeight: 1.55,
                    maxWidth: "46ch",
                  }}
                >
                  {offer.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p style={{ margin: "var(--s6) 0 0" }}>
          <Link
            href="/services"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--orange-ink)",
              textDecoration: "none",
            }}
          >
            See everything we offer <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </Section>
  );
}
