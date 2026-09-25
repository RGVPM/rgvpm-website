import Link from "next/link";
import Icon from "@/components/Icon";
import { AI_BOOKING_URL } from "@/lib/aiImplementation";

/**
 * "We run on AI. Now we build it for you."
 *
 * The agency's AI positioning on the homepage: consulting first, then the
 * systems we build. No pricing: the CTA is the AI strategy calendar.
 *
 * Server component, no client JS. Full-width: heading and intro on top, the
 * five builds in a 3 + 2 grid, CTAs below. Stacks to one column at 900px.
 */
const BUILDS: { icon: Parameters<typeof Icon>[0]["name"]; title: string; text: string }[] = [
  {
    icon: "target",
    title: "AI consulting & strategy",
    text: "We map where your time and leads go, and where AI actually helps. Plain answers, no hype.",
  },
  {
    icon: "phone",
    title: "AI receptionist & chat",
    text: "Answers calls and website chats around the clock, qualifies the lead, and books the appointment.",
  },
  {
    icon: "bolt",
    title: "Automated follow-up",
    text: "Every new lead gets a text and an email within seconds, then a follow-up sequence that runs on its own.",
  },
  {
    icon: "settings",
    title: "Workflow automation & custom builds",
    text: "Reports, intake, scheduling, handoffs. If your team does it by hand every week, we can likely automate it.",
  },
  {
    icon: "users",
    title: "AI training for your team",
    text: "Hands-on sessions that get your people using AI tools with confidence in their day-to-day work.",
  },
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function AiSection() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      style={{ background: "linear-gradient(180deg, #15233D 0%, var(--navy) 100%)", paddingBlock: "var(--section-y)" }}
    >
      <div className="rg-container">
        <div>
          {/* ── What we build ──────────────────────────────────── */}
          <div className="rg-reveal">
            <div className="rg-ai-head">
            <h2 id="ai-heading" className="rg-display" style={{ fontSize: "var(--fs-h2)", color: "#fff", margin: 0 }}>
              We Run on AI.
              <span style={{ display: "block", color: "var(--orange)" }}>Now We Build It for You.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", margin: 0, maxWidth: "54ch" }}>
              AI is built into everything we do, from research and copy to follow-up that runs on its
              own. We&rsquo;ll show you where it fits in your business, then build it.
            </p>
            </div>

            <ul className="rg-ai-builds">
              {BUILDS.map((b) => (
                <li key={b.title} className="rg-ai-build">
                  <span
                    aria-hidden="true"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--r-sm)",
                      background: "rgba(232,98,26,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={b.icon} size={20} color="var(--orange-on-dark)" />
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: "var(--s4) 0 0" }}>{b.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.68)", margin: "var(--s2) 0 0", maxWidth: "40ch" }}>{b.text}</p>
                </li>
              ))}
            </ul>

            <div className="rg-ai-actions" style={{ display: "flex", alignItems: "center", gap: "var(--s5)", flexWrap: "wrap", marginTop: "var(--s7)" }}>
              <a
                href={AI_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rg-hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--orange)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 17,
                  lineHeight: 1,
                  padding: "17px 24px",
                  borderRadius: "var(--r-hero-sm)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-orange)",
                  transition: "transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease)",
                }}
              >
                Book an AI strategy call <span aria-hidden="true">→</span>
              </a>
              <Link href="/services/ai-implementation" className="rg-hero-secondary">
                See our AI consulting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
