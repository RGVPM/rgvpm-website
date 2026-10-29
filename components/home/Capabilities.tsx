import Link from "next/link";
import { Section } from "@/components/home/Primitives";

/**
 * What we run for a client, told as "the hats" from the social carousel:
 * every job an owner is expected to do, and the one we take off them.
 * Six matching cards (blue HAT pill, display title, blue subline, orange
 * rule), so the section reads as one idea instead of five card styles.
 *
 * Every card is a real link into the services tree, so the homepage keeps
 * its internal links. The SEO card carries our own #1 Google ranking for
 * "seo harlingen" (Semrush, Sept 2026).
 *
 * Desktop: 3 columns. 2 under 1024px, 1 under 640px.
 */
const HATS: {
  hat: string;
  sub: string;
  text: string;
  href: string;
  cta: string;
}[] = [
  {
    hat: "Web Designer",
    sub: "+ website & portfolio",
    text: "Custom websites and portfolios, live in 8 to 10 days. We host it, update it and keep the Book button where customers see it.",
    href: "/services/website-design",
    cta: "Website design",
  },
  {
    hat: "SEO Specialist",
    sub: "+ Google & AI search",
    text: "Local SEO and your Google Business Profile, so you show up first. Our own site ranks #1 for “seo harlingen.”",
    href: "/services/local-seo",
    cta: "Local SEO",
  },
  {
    hat: "Retention Specialist",
    sub: "+ lead management",
    text: "Every lead in one inbox, with follow-up, reminders and rebooking texts that bring clients back.",
    href: "/services/lead-management",
    cta: "Lead management",
  },
  {
    hat: "Page Designer",
    sub: "+ events, specials & services",
    text: "A landing page for every event, special and new service, branded to you, so it doesn’t get buried in your feed.",
    href: "/services/website-design",
    cta: "Landing pages",
  },
  {
    hat: "Social Media Manager",
    sub: "+ content creator",
    text: "Content shoots, edited reels, branded posts and a monthly newsletter, so past clients remember who to call.",
    href: "/services/social-media-newsletter",
    cta: "Social & newsletters",
  },
  {
    hat: "Ads Manager",
    sub: "+ Google & Meta ads",
    text: "We build, run and tune the campaigns. You see what every dollar brought in.",
    href: "/services/paid-advertising",
    cta: "Paid advertising",
  },
];

export default function Capabilities() {
  return (
    <Section background="#fff" labelledBy="capabilities-heading">
      <div className="rg-container">
        <div className="rg-reveal" style={{ maxWidth: 760 }}>
          <p className="rg-hats-kicker">As a business owner, you&rsquo;re expected to be a&hellip;</p>
          <h2
            id="capabilities-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s3) 0 0" }}
          >
            Six Jobs You Didn&rsquo;t Sign Up For.
            <span style={{ color: "var(--blue)" }}> We&rsquo;ll Wear the Hats.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", margin: "var(--s5) 0 0", maxWidth: "58ch" }}>
            One team runs your website, Google, follow-up, content and ads, so you can get back to
            your clients.
          </p>
        </div>

        <ul className="rg-hats">
          {HATS.map((h, i) => (
            <li key={h.hat} className="rg-reveal">
              <Link href={h.href} className="rg-hat">
                <span className="rg-hat-pill">Hat {String(i + 1).padStart(2, "0")}</span>
                <h3 className="rg-display rg-hat-title">{h.hat}</h3>
                <p className="rg-hat-sub">{h.sub}</p>
                <span className="rg-hat-rule" aria-hidden="true" />
                <p className="rg-hat-text">{h.text}</p>
                <span className="rg-hat-more">
                  {h.cta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/services"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: "var(--s6)", fontSize: 15, fontWeight: 700, color: "var(--blue-ink)", textDecoration: "none" }}
        >
          See every service we offer <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
