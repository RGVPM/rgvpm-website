import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Section } from "@/components/home/Primitives";

/**
 * What we run for a client, as a five-cell bento grid.
 *
 * Every cell is a real link into the services tree, so the homepage keeps
 * its internal links. The two feature cells carry real proof rather than
 * decoration: a screenshot of a site we built and launched, and our own
 * #1 Google ranking for "seo harlingen" (Semrush, Sept 2026).
 *
 * Desktop: 3 columns, websites spans two. Stacks to one column under 900px.
 */
type Tone = "navy" | "orange" | "white" | "cream";

const CELLS: {
  tone: Tone;
  span?: 2;
  icon: Parameters<typeof Icon>[0]["name"];
  kicker: string;
  title: string;
  text: string;
  href: string;
  cta: string;
}[] = [
  {
    tone: "navy",
    span: 2,
    icon: "globe",
    kicker: "Websites",
    title: "A site that actually catches jobs.",
    text: "Custom-built, mobile-first, and live in 8 to 10 days. We host it, patch it, and keep it updated so you never babysit it.",
    href: "/services/website-design",
    cta: "Website design",
  },
  {
    tone: "orange",
    icon: "target",
    kicker: "Local SEO",
    title: "Show up first on Google.",
    text: "Our own site ranks #1 for “seo harlingen.” We run the same playbook for your business, your city, and your services.",
    href: "/services/local-seo",
    cta: "Local SEO",
  },
  {
    tone: "white",
    icon: "megaphone",
    kicker: "Paid ads",
    title: "Google and Meta ads that pay for themselves.",
    text: "We build, run, and tune the campaigns. You see what every dollar brought in.",
    href: "/services/paid-advertising",
    cta: "Paid advertising",
  },
  {
    tone: "cream",
    icon: "chat",
    kicker: "Lead management",
    title: "Every lead in one inbox.",
    text: "Calls, forms, texts, and emails in one place, with missed-call text-back and follow-ups that run on their own.",
    href: "/services/lead-management",
    cta: "Lead management",
  },
  {
    tone: "white",
    icon: "users",
    kicker: "Social & email",
    title: "Content that keeps you top of mind.",
    text: "Edited reels, branded posts, and a monthly newsletter, so past customers remember who to call.",
    href: "/services/social-media-newsletter",
    cta: "Social & newsletters",
  },
];

const TONE: Record<Tone, { bg: string; border: string; title: string; text: string; kicker: string; iconBg: string; iconColor: string }> = {
  navy: { bg: "var(--navy)", border: "var(--navy)", title: "#fff", text: "rgba(255,255,255,0.72)", kicker: "var(--orange-on-dark)", iconBg: "rgba(255,255,255,0.08)", iconColor: "#fff" },
  orange: { bg: "var(--orange)", border: "var(--orange)", title: "#fff", text: "rgba(255,255,255,0.9)", kicker: "rgba(255,255,255,0.85)", iconBg: "rgba(255,255,255,0.16)", iconColor: "#fff" },
  white: { bg: "#fff", border: "var(--border)", title: "var(--navy)", text: "var(--muted)", kicker: "var(--orange-ink)", iconBg: "var(--cream)", iconColor: "var(--orange)" },
  cream: { bg: "var(--cream)", border: "var(--border)", title: "var(--navy)", text: "var(--muted)", kicker: "var(--orange-ink)", iconBg: "#fff", iconColor: "var(--orange)" },
};

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function Capabilities() {
  return (
    <Section background="#fff" labelledBy="capabilities-heading">
      <div className="rg-container">
        <div style={{ maxWidth: 720 }}>
          <h2
            id="capabilities-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: 0 }}
          >
            One Growth Engine.
            <span style={{ color: "var(--orange)" }}> Not Five Vendors.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", margin: "var(--s5) 0 0", maxWidth: "58ch" }}>
            The site earns the traffic, the ads amplify it, and lead management makes sure nothing
            falls through. One team runs all of it.
          </p>
        </div>

        <ul className="rg-bento">
          {CELLS.map((c) => {
            const t = TONE[c.tone];
            return (
              <li key={c.href} className={`rg-reveal${c.span ? " rg-bento-wide" : ""}`}>
                <Link
                  href={c.href}
                  className={`rg-bento-cell rg-bento-${c.tone}`}
                  style={{ background: t.bg, borderColor: t.border }}
                >
                  <div className="rg-bento-copy">
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 44,
                        height: 44,
                        borderRadius: "var(--r-sm)",
                        background: t.iconBg,
                      }}
                    >
                      <Icon name={c.icon} size={21} color={t.iconColor} />
                    </span>
                    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: t.kicker, margin: "var(--s5) 0 0" }}>
                      {c.kicker}
                    </p>
                    <h3 style={{ fontSize: c.span ? "clamp(24px, 2.4vw, 32px)" : 21, fontWeight: 700, lineHeight: 1.2, color: t.title, margin: "var(--s2) 0 0", letterSpacing: "-0.01em" }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: t.text, margin: "var(--s3) 0 0", maxWidth: "46ch" }}>
                      {c.text}
                    </p>
                    <span className="rg-bento-more" style={{ color: c.tone === "white" || c.tone === "cream" ? "var(--orange-ink)" : "#fff" }}>
                      {c.cta} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                  {c.span && (
                    <div className="rg-bento-shot" aria-hidden="true">
                      <Image
                        src="/work/dvash-aesthetics.webp"
                        alt=""
                        width={1200}
                        height={750}
                        sizes="(max-width: 900px) 90vw, 420px"
                        style={{ display: "block", width: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/services"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: "var(--s6)", fontSize: 15, fontWeight: 700, color: "var(--orange-ink)", textDecoration: "none" }}
        >
          See every service we offer <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
