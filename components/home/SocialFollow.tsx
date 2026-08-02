import { GridTexture, Label } from "@/components/home/Primitives";
import { SOCIAL_LINKS } from "@/lib/site";

/**
 * "Follow along" — the dark break between the cream process section and
 * the cream blog strip. It keeps the treatment of the approach statement
 * that used to sit here (navy, faint grid, one low-left warm bloom) so the
 * page's light/dark rhythm is unchanged.
 *
 * Server component, no client JS. Handles and URLs come from lib/site.ts,
 * which also feeds the footer and the schema `sameAs` list, so the three
 * can never drift apart.
 *
 * No follower counts, no "join 10,000 others" — nothing here asserts a
 * number we can't stand behind.
 */

const BRAND_MARKS: Record<string, React.ReactNode> = {
  // Outline mark, matching Instagram's own line-art logo.
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

export default function SocialFollow() {
  return (
    <section
      aria-labelledby="social-heading"
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
          left: "-10%",
          bottom: "-30%",
          width: "55%",
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(232,98,26,0.16) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="rg-reveal" style={{ maxWidth: 640 }}>
          <Label tone="dark">Follow Along</Label>
          <h2
            id="social-heading"
            className="rg-display"
            style={{
              fontSize: "var(--fs-h2)",
              color: "#fff",
              margin: "var(--s4) 0 0",
            }}
          >
            See What We&rsquo;re Working On.
          </h2>
          <p
            style={{
              fontSize: 17,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.68)",
              maxWidth: "52ch",
              margin: "var(--s5) 0 0",
            }}
          >
            Client launches, before-and-afters, and what&rsquo;s actually working in local
            marketing right now — posted as it happens.
          </p>
        </div>

        <ul
          className="rg-reveal rg-social-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "var(--s4)",
            listStyle: "none",
            margin: "var(--s8) 0 0",
            padding: 0,
          }}
        >
          {SOCIAL_LINKS.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rg-social-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--s4)",
                  padding: "var(--s5)",
                  borderRadius: "var(--r-md)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.045)",
                  textDecoration: "none",
                  height: "100%",
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
                    width: 46,
                    height: 46,
                    borderRadius: "var(--r-sm)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    focusable="false"
                  >
                    {BRAND_MARKS[s.name]}
                  </svg>
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
    </section>
  );
}
