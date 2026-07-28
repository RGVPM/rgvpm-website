/**
 * Industries strip — a designed transition between the hero and the work,
 * not an off-the-shelf marquee.
 *
 * The visible list is announced once to assistive tech; the duplicate pass
 * that makes the loop seamless is aria-hidden and inert, so a screen reader
 * doesn't read all nine industries twice. Holds still under
 * prefers-reduced-motion (handled in globals.css).
 *
 * Industry labels are unchanged from the original strip.
 */
const INDUSTRIES = [
  "Medspas",
  "Home Services",
  "Salons & Barbershops",
  "Contractors",
  "Restaurants & Food",
  "Healthcare & Clinics",
  "Retail",
  "Professional Services",
  "Auto Services",
];

function Pass() {
  return (
    <>
      {INDUSTRIES.map((item) => (
        <span
          key={item}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(24px, 3vw, 44px)",
            paddingInline: "clamp(12px, 1.6vw, 22px)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 15,
            letterSpacing: "0.14em",
            color: "var(--navy)",
            whiteSpace: "nowrap",
          }}
        >
          {item}
          <span
            aria-hidden="true"
            style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)", opacity: 0.7 }}
          />
        </span>
      ))}
    </>
  );
}

export default function IndustryMarquee() {
  return (
    <div
      style={{
        background: "var(--cream-dark)",
        borderBlock: "1px solid var(--border)",
        padding: "18px 0",
        position: "relative",
      }}
    >
      <h2 className="sr-only">Industries we serve</h2>
      <div
        className="rg-scroller"
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="rg-marquee-track" style={{ ["--track-duration" as string]: "46s" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Pass />
          </div>
          <div aria-hidden="true" inert style={{ display: "flex", alignItems: "center" }}>
            <Pass />
          </div>
        </div>
      </div>
    </div>
  );
}
