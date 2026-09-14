import { Label } from "@/components/home/Primitives";
import { SOCIAL_LINKS } from "@/lib/site";

/**
 * "Follow along": the dark break between the cream timeline section and
 * the cream blog strip. LinkedIn leads, since that's where the longer
 * client breakdowns are posted; Instagram and Facebook follow.
 *
 * Plain navy, no texture or glow: same treatment as the hero. Server
 * component, no client JS. Handles and URLs come from lib/site.ts, which
 * also feeds the footer and the schema `sameAs` list, so they can't drift.
 *
 * No follower counts: nothing here asserts a number we can't stand behind.
 */

const BRAND_MARKS: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: (
    <path
      d="M15.1 21v-8.2h2.76l.41-3.2h-3.17V7.56c0-.92.26-1.55 1.59-1.55h1.69V3.15c-.3-.04-1.3-.13-2.48-.13-2.45 0-4.13 1.5-4.13 4.24v2.34H9v3.2h2.77V21h3.33Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  LinkedIn: (
    <path
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3.2 20.5h3.56V9.75H3.2V20.5Zm6.02 0h3.56v-5.36c0-1.41.27-2.78 2.02-2.78 1.72 0 1.74 1.61 1.74 2.87V20.5h3.56v-6.13c0-3.09-.67-5.03-4.28-5.03-1.73 0-2.9.95-3.37 1.85h-.05V9.75H9.22V20.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

const linkedin = SOCIAL_LINKS.find((s) => s.name === "LinkedIn")!;
const others = SOCIAL_LINKS.filter((s) => s.name !== "LinkedIn");

function Mark({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      {BRAND_MARKS[name]}
    </svg>
  );
}

export default function SocialFollow() {
  return (
    <section
      aria-labelledby="social-heading"
      style={{
        background: "linear-gradient(180deg, #15233D 0%, var(--navy) 100%)",
        paddingBlock: "var(--section-y)",
      }}
    >
      <div className="rg-container">
        <div
          className="rg-social-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "center",
          }}
        >
          {/* ── Copy + LinkedIn CTA ─────────────────────────────── */}
          <div className="rg-reveal">
            <Label tone="dark">Follow Along</Label>
            <h2
              id="social-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "#fff", margin: "var(--s4) 0 0" }}
            >
              Let&rsquo;s Connect On LinkedIn.
            </h2>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.7)",
                maxWidth: "50ch",
                margin: "var(--s5) 0 0",
              }}
            >
              Client launches, before-and-afters, and straight talk about what&rsquo;s working for
              Valley businesses. LinkedIn is where the longer breakdowns live.
            </p>

            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rg-btn rg-hero-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: "var(--s6)",
                background: "var(--orange)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1,
                padding: "17px 24px",
                borderRadius: "var(--r-hero-sm)",
                textDecoration: "none",
                boxShadow: "var(--shadow-orange)",
                transition:
                  "transform var(--t-fast) var(--ease), box-shadow var(--t-med) var(--ease)",
              }}
            >
              <Mark name="LinkedIn" size={18} />
              Follow on LinkedIn
            </a>

            <p
              style={{
                fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                fontSize: 11.5,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.5)",
                margin: "var(--s4) 0 0",
              }}
            >
              linkedin.com/company/{linkedin.handle}
            </p>
          </div>

          {/* ── Platform cards, LinkedIn featured ───────────────── */}
          <ul
            className="rg-reveal"
            style={{
              display: "grid",
              gap: "var(--s3)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rg-social-card rg-social-card--featured"
                aria-label="RGV Performance Marketing on LinkedIn (opens in a new tab)"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--s4)",
                  padding: "var(--s5) var(--s5)",
                  borderRadius: "var(--r-md)",
                  border: "1px solid rgba(232,98,26,0.45)",
                  background: "rgba(232,98,26,0.09)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="rg-social-mark"
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    width: 58,
                    height: 58,
                    borderRadius: "var(--r-sm)",
                    background: "var(--orange)",
                    border: "1px solid var(--orange)",
                    color: "#fff",
                  }}
                >
                  <Mark name="LinkedIn" size={28} />
                </span>
                <span style={{ display: "grid", gap: 5, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 26,
                      letterSpacing: "0.05em",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    LinkedIn
                  </span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.4 }}>
                    Client breakdowns and what&rsquo;s working, posted as it happens.
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="rg-social-arrow"
                  style={{ marginLeft: "auto", color: "var(--orange-on-dark)", fontSize: 17 }}
                >
                  →
                </span>
              </a>
            </li>

            {others.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rg-social-card"
                  aria-label={`RGV Performance Marketing on ${s.name} (opens in a new tab)`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--s4)",
                    padding: "var(--s4) var(--s5)",
                    borderRadius: "var(--r-md)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.045)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="rg-social-mark"
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      width: 44,
                      height: 44,
                      borderRadius: "var(--r-sm)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(255,255,255,0.06)",
                      color: "#fff",
                    }}
                  >
                    <Mark name={s.name} />
                  </span>
                  <span style={{ display: "grid", gap: 4, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 21,
                        letterSpacing: "0.05em",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {s.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                        fontSize: 11.5,
                        color: "rgba(255,255,255,0.55)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.handle}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="rg-social-arrow"
                    style={{ marginLeft: "auto", color: "var(--orange-on-dark)", fontSize: 15 }}
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
