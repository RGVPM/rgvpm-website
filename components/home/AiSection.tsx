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
  { icon: "target", title: "AI consulting", text: "Find where AI actually pays off." },
  { icon: "phone", title: "AI receptionist & chat", text: "Answers 24/7 and books appointments." },
  { icon: "bolt", title: "Automated follow-up", text: "Every lead answered in seconds." },
  { icon: "settings", title: "Workflow automation", text: "Automate your team's repetitive work." },
  { icon: "users", title: "AI training for teams", text: "Get your team fluent in AI tools." },
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
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", margin: 0, maxWidth: "54ch", textWrap: "pretty" }}>
              AI runs through everything we do. We&rsquo;ll show you where it fits in your business,
              then build it.
            </p>
            </div>

            <ul className="rg-ai-builds">
              {BUILDS.map((b) => (
                <li key={b.title} className="rg-ai-build">
                  <span className="rg-ai-icon" aria-hidden="true">
                    <Icon name={b.icon} size={18} color="var(--orange-on-dark)" />
                  </span>
                  <span>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: 0 }}>{b.title}</h3>
                    <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.66)", margin: "4px 0 0" }}>{b.text}</p>
                  </span>
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
