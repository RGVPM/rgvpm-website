import type { Gsap } from "./types";

/**
 * Pattern D: a tall site capture scrolls inside its device screen in four
 * moves with reading holds, then glides back to the top and repeats.
 * Distances are function-based, so ScrollTrigger refreshes re-measure them.
 * The caller plays/pauses the timeline (only runs while on screen).
 */
export function autoScroll(gsap: Gsap, img: HTMLElement, screen: HTMLElement, reach = 1) {
  const max = () => -Math.max(0, img.offsetHeight - screen.clientHeight) * reach;
  const tl = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 1.2,
    defaults: { duration: 1.8, ease: "power3.inOut" },
  });
  tl.to({}, { duration: 1.1 });
  [0.22, 0.48, 0.74, 1].forEach((p) => {
    tl.to(img, { y: () => max() * p }).to({}, { duration: 1.1 });
  });
  tl.to(img, { y: 0, duration: 2.4 });
  return tl;
}
