import Link from "next/link";
import Icon from "@/components/Icon";
import { Label, Lede, Section } from "@/components/home/Primitives";

/**
 * Service capabilities as large numbered editorial rows rather than a
 * five-card grid. A sticky heading column holds the framing while the
 * rows scroll past it. Every row is a real link into the services tree,
 * so the internal linking is unchanged and fully crawlable.
 *
 * Service names and descriptions are the existing homepage language.
 */
const CAPABILITIES = [
  {
    num: "01",
    icon: "globe" as const,
    name: "Websites & SEO",
    sub: "Built to rank. Built to convert.",
    href: "/services/website-design",
  },
  {
    num: "02",
    icon: "megaphone" as const,
    name: "Paid Advertising",
    sub: "Google, Meta, retargeting",
    href: "/services/paid-advertising",
  },
  {
    num: "03",
    icon: "chat" as const,
    name: "Two-Way SMS & Email",
    sub: "Inbox, blasts & automation",
    href: "/services/sms-email-marketing",
  },
  {
    num: "04",
    icon: "calendar" as const,
    name: "Social Media Planner",
    sub: "Schedule posts across platforms",
    href: "/services/social-media-newsletter",
  },
  {
    num: "05",
    icon: "settings" as const,
    name: "Lead Management",
    sub: "Pipelines, follow-up, appointments",
    href: "/services/lead-management",
  },
];

export default function Capabilities() {
  return (
    <Section background="#fff" labelledBy="capabilities-heading">
      <div className="rg-container">
        <div
          className="rg-split"
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* Sticky framing column */}
          <div className="rg-sticky" style={{ position: "sticky", top: 120 }}>
            <Label>What We Handle</Label>
            <h2
              id="capabilities-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
            >
              One Growth Engine.
              <br />
              Not Five Vendors.
            </h2>
            <Lede>
              Each piece feeds the next — the site earns the traffic, the ads amplify it, and lead
              management makes sure nothing falls through. We run all of it together.
            </Lede>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: "var(--s6)",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--orange-ink)",
                textDecoration: "none",
              }}
            >
              Explore all services <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Numbered capability rows */}
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {CAPABILITIES.map((c, i) => (
              <li key={c.num} className="rg-reveal">
                <Link
                  href={c.href}
                  className="rg-cap-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: "var(--s5)",
                    padding: "var(--s6) 0",
                    borderTop: i === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    color: "inherit",
                    position: "relative",
                  }}
                >
                  <span
                    className="rg-cap-num rg-display"
                    style={{
                      fontSize: 56,
                      lineHeight: 0.8,
                      color: "var(--cream-dark)",
                      transition: "color var(--t-med) var(--ease)",
                      minWidth: "1.9ch",
                    }}
                  >
                    {c.num}
                  </span>
                  <span>
                    <span
                      className="rg-cap-name"
                      style={{
                        display: "block",
                        fontSize: "var(--fs-h3)",
                        fontWeight: 700,
                        color: "var(--navy)",
                        lineHeight: 1.2,
                        transition: "color var(--t-med) var(--ease)",
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 14.5,
                        color: "var(--muted)",
                        marginTop: 5,
                        lineHeight: 1.55,
                      }}
                    >
                      {c.sub}
                    </span>
                  </span>
                  <span
                    className="rg-cap-icon"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "var(--r-md)",
                      background: "var(--cream)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition:
                        "background var(--t-med) var(--ease), border-color var(--t-med) var(--ease)",
                    }}
                  >
                    <Icon name={c.icon} size={21} color="var(--orange)" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
