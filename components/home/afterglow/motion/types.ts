import type { gsap as GsapNS } from "gsap";
import type { ScrollTrigger as ScrollTriggerNS } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextNS } from "gsap/SplitText";

export type Gsap = typeof GsapNS;
export type ST = typeof ScrollTriggerNS;
export type Split = typeof SplitTextNS;

/** Everything a motion module needs. Modules run inside one
 *  gsap.matchMedia() callback, so every tween and ScrollTrigger they make
 *  is reverted on resize, on a reduced-motion change and on unmount.
 *  Work created later (after an image decodes) goes through `later`, which
 *  records it in the same context. */
export interface Env {
  gsap: Gsap;
  ScrollTrigger: ST;
  SplitText: Split;
  root: HTMLElement;
  /** Desktop: >= 1024px, fine pointer, motion allowed. */
  desktop: boolean;
  /** Run `fn` inside the matchMedia context (for async-created tweens). */
  later: (fn: () => void) => void;
  /** Register a cleanup for listeners and observers. */
  onCleanup: (fn: () => void) => void;
}

export const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));
