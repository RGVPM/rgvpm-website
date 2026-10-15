/**
 * The outlined band under the hero: the five things we run, at billboard
 * size, alternating outline and sunset fill. It sits just below the fold on
 * desktop and drifts sideways with scroll (motion/hero.ts). Decorative (the
 * same services are listed in the bento below), so aria-hidden.
 */
const SERVICES = ["Websites", "Local SEO", "Google & Meta ads", "AI follow-up", "Social"];

export default function Ticker() {
  const items = [...SERVICES, ...SERVICES];
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
