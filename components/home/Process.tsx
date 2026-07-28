import { Label, Lede, Section } from "@/components/home/Primitives";

/**
 * Diagnose / Build / Grow as a vertical timeline with a sticky heading.
 * Copy is unchanged from the original HowItWorks section, including the
 * two-week onboarding positioning.
 *
 * The connecting spine is a plain gradient rule — no scroll listener, no
 * JS. Stacks to a simple timeline under 1024px.
 */
const STEPS = [
  {
    num: "01",
    title: "Diagnose",
    text: "We audit your current digital presence — website, Google profile, competitors — and pinpoint exactly where you're losing leads and visibility.",
    signals: ["Website audit", "Google profile review", "Competitor gap analysis"],
  },
  {
    num: "02",
    title: "Build",
    text: "We set up your growth engine: GBP optimization, NAP consistency, lead capture, automated follow-up, newsletters, and ad campaigns — all in one coordinated push.",
    signals: ["GBP optimization", "Lead capture & routing", "Campaign build"],
  },
  {
    num: "03",
    title: "Grow",
    text: "We execute, optimize, and report every month. You see exactly what's working, what we're improving, and how every dollar is performing.",
    signals: ["Monthly optimization", "Transparent reporting", "Ongoing content"],
  },
];

export default function Process() {
  return (
    <Section id="how-it-works" background="var(--cream)" labelledBy="process-heading">
      <div className="rg-container">
        <div
          className="rg-split"
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          <div className="rg-sticky" style={{ position: "sticky", top: 120 }}>
            <Label>The Process</Label>
            <h2
              id="process-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
            >
              Simple &amp; Fast
            </h2>
            <Lede>
              We don&apos;t do 6-month onboarding. Most clients are up and running within two weeks.
            </Lede>
            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 10,
                marginTop: "var(--s6)",
                padding: "14px 20px",
                background: "#fff",
                border: "1px solid var(--border)",
                borderLeft: "3px solid var(--orange)",
                borderRadius: "var(--r-sm)",
              }}
            >
              <span className="rg-display" style={{ fontSize: 30, color: "var(--orange)" }}>
                2 Wks
              </span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>average time to go live</span>
            </div>
          </div>

          <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
            {/* Timeline spine */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 26,
                top: 34,
                bottom: 34,
                width: 2,
                background:
                  "linear-gradient(to bottom, var(--orange), rgba(232,98,26,0.35) 55%, rgba(26,43,74,0.12))",
              }}
            />
            {STEPS.map((s) => (
              <li
                key={s.num}
                className="rg-reveal"
                style={{
                  display: "grid",
                  gridTemplateColumns: "54px 1fr",
                  gap: "var(--s5)",
                  paddingBottom: "var(--s8)",
                  position: "relative",
                }}
              >
                <span
                  className="rg-display"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    background: "var(--navy)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 21,
                    letterSpacing: "0.06em",
                    zIndex: 1,
                    boxShadow: "0 0 0 6px var(--cream)",
                  }}
                >
                  {s.num}
                </span>
                <div style={{ paddingTop: 6 }}>
                  <h3
                    className="rg-display"
                    style={{
                      fontSize: "clamp(26px, 3vw, 38px)",
                      color: "var(--navy)",
                      margin: "0 0 var(--s3)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15.5,
                      color: "var(--muted)",
                      lineHeight: 1.72,
                      margin: "0 0 var(--s4)",
                      maxWidth: "56ch",
                    }}
                  >
                    {s.text}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--s2)",
                    }}
                  >
                    {s.signals.map((sig) => (
                      <li
                        key={sig}
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: 10.5,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          background: "#fff",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--r-pill)",
                          padding: "7px 13px",
                        }}
                      >
                        {sig}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
