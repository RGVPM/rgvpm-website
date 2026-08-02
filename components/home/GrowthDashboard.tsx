/**
 * Hero visual — an illustrative "growth system" panel.
 *
 * Deliberately built from HTML/CSS/SVG rather than a screenshot or stock
 * image: it renders crisp at every DPR, costs no image bytes against the
 * hero's LCP, and reads as the operating system we run for clients rather
 * than a picture of one.
 *
 * Server component. Every bit of motion is CSS (see the `rg-dash-*`
 * keyframes in globals.css), so no client JS ships for this and there is
 * no hydration cost. All animation is transform/opacity/stroke-dashoffset
 * only — nothing here can shift layout.
 *
 * The numbers are illustrative, not client results. They are labelled as
 * such in the panel footer and in the aria-label, and nothing here claims
 * revenue or attributes a figure to a named client.
 */

const TILES = [
  { label: "Calls This Month", value: "+47", trend: true },
  { label: "New Leads", value: "23", trend: false },
  { label: "SEO Health", value: "92", suffix: "/100", trend: false },
  { label: "Reviews Gained", value: "+12", trend: true },
];

const METERS = [
  { label: "Website Conversion Rate", value: "6.2%", fill: 62 },
  { label: "Google Business Profile", value: "88/100", fill: 88 },
];

const ACTIVITY = [
  { title: "New lead captured", meta: "Contact form · Weslaco, TX", time: "2m" },
  { title: "Appointment booked", meta: "Thursday, 10:30 AM", time: "18m" },
  { title: "AI follow-up sent", meta: "Text + email sequence", time: "41m" },
];

const CAMPAIGNS = ["Google Ads", "Local SEO", "AI Follow-Up"];

/** 12 points of a rising-but-realistic visibility trend. */
const CHART_PATH =
  "M3,79 L30,75 L56,77 L82,70 L109,66 L135,68 L162,60 L188,55 L215,57 L241,49 L268,42 L294,32";

const mono = "var(--font-dm-mono), ui-monospace, monospace";

/** Uppercase mono micro-label used on every tile and section in the panel. */
function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 9.5,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.52)",
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
  );
}

export default function GrowthDashboard() {
  return (
    <figure style={{ margin: 0 }}>
      <div
        className="rg-dash"
        role="img"
        aria-label="Illustrative dashboard of the marketing system we manage: Google visibility up 38 percent over 30 days, 47 calls this month, 23 new leads, an SEO health score of 92, and 12 reviews gained. Sample figures, not client results."
        style={{
          position: "relative",
          borderRadius: "var(--r-hero-lg)",
          border: "1px solid rgba(255,255,255,0.14)",
          background:
            "linear-gradient(158deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 40%, rgba(232,98,26,0.06) 100%), #0F1C34",
          boxShadow:
            "0 40px 90px -34px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.09)",
          overflow: "hidden",
        }}
      >
        {/* ── Panel header ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "13px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--orange)",
                boxShadow: "0 0 0 3px rgba(232,98,26,0.18)",
              }}
            />
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 17,
                letterSpacing: "0.06em",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              Growth System
            </span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: "var(--r-pill)",
              border: "1px solid rgba(42,157,143,0.38)",
              background: "var(--teal-dim)",
            }}
          >
            <span
              aria-hidden="true"
              className="rg-dash-pulse"
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#48C9B8" }}
            />
            <span
              style={{
                fontFamily: mono,
                fontSize: 9,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#7FD8CB",
              }}
            >
              Live
            </span>
          </span>
        </div>

        <div style={{ padding: "16px 16px 14px" }}>
          {/* ── Headline metric + trend chart ───────────────────── */}
          <div
            style={{
              borderRadius: "var(--r-hero-md)",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.045)",
              padding: "14px 14px 8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <span style={{ display: "grid", gap: 6 }}>
                <Micro>Google Visibility</Micro>
                <span style={{ display: "inline-flex", alignItems: "baseline", gap: 7 }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 38,
                      lineHeight: 0.85,
                      letterSpacing: "0.01em",
                      color: "#fff",
                    }}
                  >
                    +38%
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--orange-on-dark)", fontSize: 13, fontWeight: 700 }}
                  >
                    ▲
                  </span>
                </span>
              </span>
              <span style={{ paddingBottom: 3 }}>
                <Micro>Last 30 days</Micro>
              </span>
            </div>

            <svg
              className="rg-dash-chart"
              viewBox="0 0 300 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              /* Height lives in globals.css — it has to grow when the hero
                 stacks and the panel widens, or the trend flattens out. */
              style={{ display: "block", width: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="rgDashFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8621A" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#E8621A" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Faint horizontal rules — data lines, not decoration */}
              {[24, 52, 80].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="300"
                  y2={y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path d={`${CHART_PATH} L294,100 L3,100 Z`} fill="url(#rgDashFill)" />
              <path
                className="rg-dash-line"
                d={CHART_PATH}
                fill="none"
                stroke="var(--orange)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                className="rg-dash-tip"
                cx="294"
                cy="32"
                r="4"
                fill="var(--orange)"
                stroke="#0F1C34"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* ── Metric tiles ────────────────────────────────────── */}
          <div
            className="rg-dash-tiles"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
              marginTop: 12,
            }}
          >
            {TILES.map((t) => (
              <div
                key={t.label}
                className="rg-dash-tile"
                style={{
                  display: "grid",
                  gap: 7,
                  padding: "12px 13px",
                  borderRadius: "var(--r-hero-md)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.045)",
                }}
              >
                <Micro>{t.label}</Micro>
                <span style={{ display: "inline-flex", alignItems: "baseline", gap: 5 }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 30,
                      lineHeight: 0.85,
                      letterSpacing: "0.01em",
                      color: t.trend ? "var(--orange-on-dark)" : "#fff",
                    }}
                  >
                    {t.value}
                  </span>
                  {t.suffix && (
                    <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.45)" }}>
                      {t.suffix}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* ── Meters + activity: desktop detail, hidden on the
                 compact mobile card so the CTA stays reachable ──── */}
          <div className="rg-dash-detail">
            <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
              {METERS.map((m, i) => (
                <div key={m.label} style={{ display: "grid", gap: 7 }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <Micro>{m.label}</Micro>
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: 11,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.86)",
                      }}
                    >
                      {m.value}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      height: 4,
                      borderRadius: "var(--r-pill)",
                      background: "rgba(255,255,255,0.09)",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      className="rg-dash-meter"
                      style={{
                        display: "block",
                        height: "100%",
                        width: `${m.fill}%`,
                        borderRadius: "var(--r-pill)",
                        background:
                          "linear-gradient(90deg, rgba(232,98,26,0.65), var(--orange-light))",
                        animationDelay: `${0.5 + i * 0.12}s`,
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 16,
                paddingTop: 13,
                borderTop: "1px solid rgba(255,255,255,0.09)",
                display: "grid",
                gap: 9,
              }}
            >
              {ACTIVITY.map((a, i) => (
                <div
                  key={a.title}
                  className="rg-dash-event"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: "9px 11px",
                    borderRadius: "var(--r-hero-md)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.035)",
                    animationDelay: `${i * 2.6}s`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--orange)",
                    }}
                  />
                  <span style={{ display: "grid", gap: 3, minWidth: 0, flex: 1 }}>
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.92)",
                        lineHeight: 1.2,
                      }}
                    >
                      {a.title}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.meta}
                    </span>
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: mono,
                      fontSize: 10,
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Campaign status ─────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginTop: 14,
              paddingTop: 13,
              borderTop: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            {CAMPAIGNS.map((c) => (
              <span
                key={c}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: "var(--r-pill)",
                  border: "1px solid rgba(255,255,255,0.11)",
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: mono,
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.66)",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ width: 5, height: 5, borderRadius: "50%", background: "#48C9B8" }}
                />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Honest framing — these are sample figures, and we say so. */}
      <figcaption
        style={{
          marginTop: 12,
          fontFamily: mono,
          fontSize: 10,
          letterSpacing: "0.11em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
        }}
      >
        Illustrative dashboard · Sample metrics
      </figcaption>
    </figure>
  );
}
