/**
 * The outlined band under the hero: the H1's two promises at billboard size,
 * one in outline, one in the sunset fill. Decorative (the H1 already says
 * it), so aria-hidden. It drifts sideways with scroll (motion/hero.ts).
 */
export default function Ticker() {
  const items = ["Get found first", "Get booked", "Get found first", "Get booked", "Get found first"];
  return (
    <div className="ev-ticker" aria-hidden="true">
      <div className="ev-ticker-track">
        {items.map((t, i) => (
          <span key={i} className={i % 2 ? "is-hot" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <div className="ev-horizon" />
    </div>
  );
}
