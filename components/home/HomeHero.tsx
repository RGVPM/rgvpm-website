import Image from "next/image";
import { Button, GridTexture } from "@/components/home/Primitives";
import { SITE } from "@/lib/site";

/**
 * Homepage hero.
 *
 * Server component by design — the previous version was a client
 * component purely to count numbers up from zero, which server-rendered
 * "0/7" and "0" into the HTML on every request. The values are static
 * text now, so they are correct in the initial paint, correct for
 * crawlers, and cost no client JS.
 */

const PROOF = [
  { value: "AI", label: "Powered systems & tools" },
  { value: "24/7", label: "Always-on lead capture" },
  { value: "956", label: "Locally rooted. Broadly serving." },
];

/** The connected growth engine, in the order a customer moves through it. */
const ENGINE = [
  { step: "01", name: "Websites & SEO", note: "Get found" },
  { step: "02", name: "Paid Advertising", note: "Get traffic" },
  { step: "03", name: "Lead Management", note: "Capture & route" },
  { step: "04", name: "SMS & Email", note: "Follow up" },
];

export default function HomeHero() {
  return (
    <section
      style={{
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(112px, 14vh, 168px)",
        paddingBottom: "clamp(72px, 9vh, 120px)",
      }}
    >
      <GridTexture opacity={0.05} />
      {/* Single controlled warm bloom — anchored behind the visual, not a floating orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-14%",
          top: "-18%",
          width: "62%",
          aspectRatio: "1",
          background:
            "radial-gradient(circle, rgba(232,98,26,0.20) 0%, rgba(232,98,26,0.05) 42%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      {/* Hairline that ties the hero into the section below it */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 22%, rgba(232,98,26,0.5) 50%, rgba(255,255,255,0.16) 78%, transparent)",
        }}
      />

      <div className="rg-container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="rg-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.02fr 0.98fr",
            gap: "clamp(40px, 5vw, 76px)",
            alignItems: "center",
          }}
        >
          {/* ── Message ─────────────────────────────────────────── */}
          <div>
            <div className="hero-animate" style={{ animationDelay: "0.05s", marginBottom: "var(--s5)" }}>
              <span
                className="rg-label"
                style={{
                  color: "var(--orange-on-dark)",
                  background: "rgba(232,98,26,0.12)",
                  border: "1px solid rgba(232,98,26,0.3)",
                  padding: "8px 16px 8px 14px",
                  borderRadius: "var(--r-pill)",
                }}
              >
                AI-Powered Digital Marketing
              </span>
            </div>

            <h1
              className="rg-display"
              style={{
                fontSize: "var(--fs-display)",
                color: "#fff",
                margin: "0 0 var(--s5)",
              }}
            >
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.13s" }}>
                More Leads.
              </span>
              <span
                className="hero-animate"
                style={{ display: "block", color: "var(--orange)", animationDelay: "0.21s" }}
              >
                More Customers.
              </span>
              <span className="hero-animate" style={{ display: "block", animationDelay: "0.29s" }}>
                Less Guesswork.
              </span>
            </h1>

            <p
              className="hero-animate"
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1.72,
                maxWidth: "46ch",
                margin: "0 0 var(--s7)",
                animationDelay: "0.37s",
              }}
            >
              We build the digital systems that grow your business — websites, SEO, ads, lead
              management, and more. Straightforward plans, real results.
            </p>

            <div
              className="hero-animate rg-cta-actions"
              style={{
                display: "flex",
                gap: "var(--s3)",
                flexWrap: "wrap",
                marginBottom: "var(--s8)",
                animationDelay: "0.45s",
              }}
            >
              <Button href={SITE.bookingUrl} variant="onDark">
                Book a Free Call <span aria-hidden="true">→</span>
              </Button>
              <Button href="/pricing" variant="ghostDark">
                View Plans <span aria-hidden="true">→</span>
              </Button>
            </div>

            {/* Proof — static text, no count-up. Values are right on first paint. */}
            <dl
              className="hero-animate"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                justifyContent: "start",
                gap: "clamp(20px, 4vw, 48px)",
                paddingTop: "var(--s6)",
                borderTop: "1px solid rgba(255,255,255,0.14)",
                margin: 0,
                animationDelay: "0.53s",
              }}
            >
              {PROOF.map((p) => (
                <div key={p.label}>
                  <dt
                    className="rg-display"
                    style={{ fontSize: 34, color: "var(--orange)", lineHeight: 1 }}
                  >
                    {p.value}
                  </dt>
                  <dd
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 6,
                      lineHeight: 1.45,
                      maxWidth: "18ch",
                      marginInline: 0,
                    }}
                  >
                    {p.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── The growth engine, shown ────────────────────────── */}
          <div className="rg-hero-visual hero-card-animate" aria-hidden="true">
            <div style={{ position: "relative", paddingBottom: 28 }}>
              {/* Browser window with real client work */}
              <div
                style={{
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "#0E1830",
                  boxShadow: "0 40px 90px -30px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "11px 14px",
                    background: "rgba(255,255,255,0.07)",
                    borderBottom: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                    <span
                      key={c}
                      style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.85 }}
                    />
                  ))}
                  <span
                    style={{
                      marginLeft: 10,
                      flex: 1,
                      height: 20,
                      borderRadius: "var(--r-pill)",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 12px",
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: 9.5,
                      letterSpacing: "0.06em",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    cclcontracting.com
                  </span>
                </div>
                <Image
                  src="/work/ccl-contracting.webp"
                  alt=""
                  width={1200}
                  height={750}
                  sizes="(max-width: 1023px) 0px, 46vw"
                  priority
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>

              {/* Engine rail — the connected system, no invented numbers */}
              <div
                style={{
                  position: "absolute",
                  left: "-7%",
                  bottom: -14,
                  width: "62%",
                  background: "rgba(14,24,48,0.92)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "var(--r-md)",
                  padding: "16px 18px",
                  boxShadow: "0 28px 60px -22px rgba(0,0,0,0.8)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--orange)",
                    marginBottom: 12,
                  }}
                >
                  One connected system
                </div>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
                  {/* Spine connecting the steps */}
                  <span
                    style={{
                      position: "absolute",
                      left: 8,
                      top: 12,
                      bottom: 12,
                      width: 1,
                      background:
                        "linear-gradient(to bottom, rgba(232,98,26,0.7), rgba(232,98,26,0.15))",
                    }}
                  />
                  {ENGINE.map((e) => (
                    <li
                      key={e.step}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "6px 0",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          width: 17,
                          height: 17,
                          flexShrink: 0,
                          borderRadius: "50%",
                          background: "#0E1830",
                          border: "1px solid rgba(232,98,26,0.75)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: 7.5,
                          color: "var(--orange)",
                          zIndex: 1,
                        }}
                      >
                        {e.step}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#fff" }}>{e.name}</span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 10.5,
                          color: "rgba(255,255,255,0.42)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {e.note}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Local presence chip */}
              <div
                style={{
                  position: "absolute",
                  right: -10,
                  top: "16%",
                  background: "var(--orange)",
                  borderRadius: "var(--r-md)",
                  padding: "11px 15px",
                  boxShadow: "var(--shadow-orange)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 8.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  Local Search
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 2 }}>
                  Built to be found
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
