import Link from "next/link";
import Icon from "@/components/Icon";
import { AI_BOOKING_URL, AI_TOOLS } from "@/lib/aiImplementation";

/**
 * "We run on AI. Now we build it for you."
 *
 * The agency's AI positioning on the homepage: consulting first, then the
 * systems we build. No pricing: the CTA is the AI strategy calendar.
 *
 * Server component, no client JS. Full-width: heading and intro on top, six
 * offers in two rows of three, CTAs below. Stacks to one column at 900px.
 */
const BUILDS: { icon: Parameters<typeof Icon>[0]["name"]; title: string; text: string; tools?: readonly string[] }[] = [
  { icon: "users", title: "Build with me, 1-on-1", text: "Learn by building with:", tools: AI_TOOLS },
  { icon: "cpu", title: "Custom AI agents", text: "Agents that research, write, and report." },
  { icon: "wrench", title: "Custom tools & apps", text: "Internal tools shipped in days, not months." },
  { icon: "target", title: "AI consulting", text: "Find where AI actually pays off." },
  { icon: "phone", title: "AI receptionist & follow-up", text: "Calls and leads answered 24/7." },
  { icon: "chart", title: "Team AI workshops", text: "Get your whole team building with AI." },
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
              <span style={{ display: "block", color: "var(--orange)" }}>Now Build It With Us.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", margin: 0, maxWidth: "54ch", textWrap: "pretty" }}>
              We build real software with Claude Code and Codex every day. We&rsquo;ll build it for
              you, or sit down one-on-one and teach you to build your own.
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
                    {b.tools && (
                      <ul className="rg-tool-chips rg-tool-chips--sm" aria-label="Tools">
                        {b.tools.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
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
                Book an AI session <span aria-hidden="true">→</span>
              </a>
              <Link href="/learn-claude-code" className="rg-hero-secondary">
                Learn Claude Code 1-on-1
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
