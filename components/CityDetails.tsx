export interface CityDetailsContent {
  heading: string;
  intro: string;
  points: { title: string; text: string }[];
}

const accents = ["var(--orange)", "var(--teal)", "#6E86B8", "var(--orange)"];

/**
 * City-specific "what's different about this market" section for location
 * pages. Keeps location pages from being the shared template with a city name
 * swapped in: each city supplies its own points.
 */
export default function CityDetails({ heading, intro, points }: CityDetailsContent) {
  return (
    <section style={{ padding: "72px 0 88px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto 40px" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.05, marginBottom: 16 }}>
            {heading}
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75 }}>{intro}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="svc-grid-responsive">
          {points.map((p, i) => (
            <div key={p.title} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderLeft: `4px solid ${accents[i % accents.length]}`, borderRadius: 10, padding: "26px 26px" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.7 }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
