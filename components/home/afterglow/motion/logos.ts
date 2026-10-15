import type { Env } from "./types";

/**
 * Signature moment 4, pattern E: two tapes loop in opposite directions.
 * Scroll velocity speeds them up (to 7x) and scrolling up reverses them,
 * then they settle back over 1.2s. They pause off screen. The tapes also
 * sweep in from opposite sides the first time they come into view.
 */
export function logoTapes({ gsap, ScrollTrigger, root, desktop }: Env) {
  const section = root.querySelector<HTMLElement>(".ev-logos");
  const ta = root.querySelector<HTMLElement>(".ev-tape--a .ev-tape-track");
  const tb = root.querySelector<HTMLElement>(".ev-tape--b .ev-tape-track");
  if (!section || !ta || !tb) return;

  const a = gsap.to(ta, { xPercent: -50, ease: "none", duration: desktop ? 46 : 60, repeat: -1, paused: true });
  const b = gsap.fromTo(tb, { xPercent: -50 }, { xPercent: 0, ease: "none", duration: desktop ? 52 : 66, repeat: -1, paused: true });
  // Park far from time 0 so reversing never hits the start of the loop.
  [a, b].forEach((t) => t.totalTime(t.duration() * 100));

  let dir = 1;
  let settle: gsap.core.Tween | undefined;
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: (s) => [a, b].forEach((t) => (s.isActive ? t.play() : t.pause())),
    onUpdate: (s) => {
      dir = s.direction;
      const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(s.getVelocity()) / 400);
      gsap.to([a, b], { timeScale: dir * boost, duration: 0.25, overwrite: true });
      settle?.kill();
      settle = gsap.to([a, b], { timeScale: dir, duration: 1.2, delay: 0.25, ease: "power2.out" });
    },
  });

  const st = { trigger: section, start: "top 92%", once: true };
  gsap.from(root.querySelector(".ev-tape--a"), { xPercent: -14, autoAlpha: 0, duration: 1.5, ease: "expo.out", scrollTrigger: st });
  gsap.from(root.querySelector(".ev-tape--b"), { xPercent: 14, autoAlpha: 0, duration: 1.5, delay: 0.08, ease: "expo.out", scrollTrigger: { ...st } });
}
