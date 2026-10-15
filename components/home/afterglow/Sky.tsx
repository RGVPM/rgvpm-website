/**
 * The homepage's fixed sky: a slow gradient mesh, the sun and the dusk
 * overlay, plus one grain layer. Purely decorative (aria-hidden), rendered
 * on the server so it paints with the first frame. The bloom and blob drift
 * are CSS; the sun sinking and the dusk rolling in are scrubbed by GSAP
 * (components/home/afterglow/motion/hero.ts).
 */
export default function Sky() {
  return (
    <div className="ev-skylayer" aria-hidden="true">
      {/* .ev-sky-pan takes the pointer parallax (GSAP); .ev-sky takes the CSS
          bloom. Separate layers so GSAP never bakes a mid-bloom transform. */}
      <div className="ev-sky-pan">
        <div className="ev-sky">
          <div className="ev-blob ev-blob--gold" />
          <div className="ev-blob ev-blob--tan" />
          <div className="ev-blob ev-blob--coral" />
          <div className="ev-blob ev-blob--mag" />
          <div className="ev-blob ev-blob--vio" />
          <div className="ev-sun" />
        </div>
      </div>
      <div className="ev-dusk" />
      <div className="ev-grain" />
    </div>
  );
}
