const items = [
  "Medspas", "Home Services", "Salons & Barbershops", "Contractors",
  "Restaurants & Food", "Healthcare & Clinics", "Retail",
  "Professional Services", "Auto Services",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "var(--orange)", overflow: "hidden", padding: "13px 0" }}>
      <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)", padding: "0 28px" }}>
            {item} <span style={{ color: "rgba(255,255,255,0.4)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
