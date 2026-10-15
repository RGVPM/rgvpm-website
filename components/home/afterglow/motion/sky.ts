import type { Env } from "./types";

/**
 * The sky keeps telling time after Night Drive (opacity and transform only,
 * all scrubbed): deep night with stars and a drifting violet orb rolls in
 * through the industries, capabilities and plans, gives way to a pre-dawn
 * magenta band at the AI section, and the final CTA's sun (finalSun) rises
 * out of it. The layers live in Sky.tsx; with reduced motion they stay
 * hidden and the page holds the violet dusk.
 */
export function skyStory({ gsap, root }: Env) {
  const night = root.querySelector<HTMLElement>(".ev-night");
  const orb = root.querySelector<HTMLElement>(".ev-night-orb");
  const predawn = root.querySelector<HTMLElement>(".ev-predawn");
  const industry = root.querySelector<HTMLElement>(".ev-industry");
  const ai = root.querySelector<HTMLElement>(".ev-ai");
  const final = root.querySelector<HTMLElement>(".ev-final");
  if (!night || !predawn || !industry || !ai || !final) return;

  gsap.fromTo(
    night,
    { opacity: 0 },
    { opacity: 1, ease: "none", scrollTrigger: { trigger: industry, start: "top bottom", end: "top 25%", scrub: true } },
  );
  gsap.fromTo(
    night,
    { opacity: 1 },
    {
      opacity: 0.35,
      ease: "none",
      immediateRender: false,
      scrollTrigger: { trigger: ai, start: "top bottom", end: "top 20%", scrub: true },
    },
  );
  if (orb) {
    gsap.fromTo(
      orb,
      { yPercent: 40, xPercent: 0 },
      {
        yPercent: -60,
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: industry, start: "top bottom", endTrigger: ai, end: "top top", scrub: 1 },
      },
    );
  }
  gsap.fromTo(
    predawn,
    { opacity: 0, yPercent: 30 },
    {
      opacity: 1,
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: ai, start: "top bottom", endTrigger: final, end: "top center", scrub: true },
    },
  );
}
