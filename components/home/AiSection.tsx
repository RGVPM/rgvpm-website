import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { AI_BOOKING_URL } from "@/lib/aiImplementation";

/**
 * "We run on AI. Now we build it for you."
 *
 * The agency's AI positioning on the homepage: consulting first, then the
 * systems we build. Anchored by Derrick's real photo and background rather
 * than a mock dashboard. No pricing: the CTA is the AI strategy calendar.
 *
 * Server component, no client JS. Photo left / list right, stacking at 900px.
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
        <div className="rg-ai-grid">
          {/* ── The person behind it ─────────────────────────── */}
          <figure className="rg-ai-photo rg-reveal" style={{ margin: 0 }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                border: "1px solid rgba(247,244,239,0.18)",
                boxShadow: "0 34px 70px -30px rgba(4,9,20,0.85)",
              }}
            >
              <Image
                src="/founders/derrick.jpg"
                alt="Derrick Tamez, founder and CEO of RGV Performance Marketing"
                fill
                sizes="(max-width: 900px) 90vw, 440px"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "56px 24px 22px",
                  background: "linear-gradient(to top, rgba(8,14,26,0.94), transparent)",
                }}
              >
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.04em", color: "#fff", margin: 0, lineHeight: 1 }}>
                  Derrick Tamez, MBA
                </p>
                <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-on-dark)", margin: "8px 0 0" }}>
                  Founder &amp; CEO
                </p>
              </div>
            </div>
            <figcaption style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(255,255,255,0.66)", margin: "var(--s4) 0 0" }}>
              Derrick built AI tools that took over whole parts of his own job, then used the time to
              build the next one. That habit is how we run, and how we build for you.
            </figcaption>
          </figure>

          {/* ── What we build ──────────────────────────────────── */}
          <div className="rg-reveal">
            <h2 id="ai-heading" className="rg-display" style={{ fontSize: "var(--fs-h2)", color: "#fff", margin: 0 }}>
              We Run on AI.
              <span style={{ display: "block", color: "var(--orange)" }}>Now We Build It for You.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.74)", margin: "var(--s5) 0 0", maxWidth: "54ch" }}>
              AI is built into everything we do, from research and copy to follow-up that runs on its
              own. We&rsquo;ll show you where it fits in your business, then build it.
            </p>

            <ul style={{ listStyle: "none", margin: "var(--s7) 0 0", padding: 0 }}>
              {BUILDS.map((b, i) => (
                <li
                  key={b.title}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    gap: "var(--s4)",
                    alignItems: "start",
                    padding: "var(--s4) 0",
                    borderTop: i === 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--r-sm)",
                      background: "rgba(232,98,26,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={b.icon} size={19} color="var(--orange-on-dark)" />
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{b.title}</span>
                    <span style={{ display: "block", fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.66)", marginTop: 4 }}>{b.text}</span>
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
