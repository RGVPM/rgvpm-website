"use client";

import { useEffect } from "react";
import { heroPhones, heroPointer, heroScroll } from "./motion/hero";
import { logoTapes } from "./motion/logos";
import { nightDrive } from "./motion/nightDrive";
import {
  aiThread,
  capabilities,
  finalSun,
  magnetic,
  medspa,
  pauseOffscreen,
  plans,
  processLine,
  revealHeadings,
  rises,
} from "./motion/sections";
import type { Env } from "./motion/types";

/**
 * The homepage's one motion orchestrator (renders nothing).
 *
 * GSAP, ScrollTrigger and SplitText load on idle, after first paint, so the
 * hero never waits on them (its intro is pure CSS). Everything is created
 * inside one gsap.matchMedia() with three branches, desktop / mobile /
 * reduced motion, so a resize, a reduced-motion change or leaving the page
 * reverts every tween, pin and split. The wrapper's data-motion attribute
 * ("full" | "lite" | "reduce") lets CSS switch layouts (e.g. the Night
 * Drive pin) to match.
 */
type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function Motion() {
  useEffect(() => {
    const w = window as IdleWindow;
    let mm: gsap.MatchMedia | undefined;
    let cancelled = false;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const root = document.querySelector<HTMLElement>(".rg-home--afterglow");
      if (!root) return;

      mm = gsap.matchMedia(root);
      mm.add(
        {
          desktop: "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px), (pointer: coarse)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as Record<string, boolean>;
          if (reduce) {
            root.dataset.motion = "reduce"; // CSS shows the still fallbacks
            return () => {
              delete root.dataset.motion;
            };
          }
          root.dataset.motion = desktop ? "full" : "lite";

          let alive = true;
          const cleanups: (() => void)[] = [];
          const env: Env = {
            gsap,
            ScrollTrigger,
            SplitText,
            root,
            desktop: !!desktop,
            later: (fn) => {
              if (alive) ctx.add(() => fn()); // runs now, recorded for revert
            },
            onCleanup: (fn) => cleanups.push(fn),
          };

          heroScroll(env);
          heroPointer(env);
          heroPhones(env);
          logoTapes(env);
          medspa(env);
          nightDrive(env);
          revealHeadings(env);
          rises(env);
          capabilities(env);
          processLine(env);
          plans(env);
          aiThread(env);
          finalSun(env);
          magnetic(env);
          pauseOffscreen(env);

          return () => {
            alive = false;
            cleanups.forEach((fn) => fn());
            delete root.dataset.motion;
          };
        },
      );

      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => void start(), { timeout: 2000 })
      : window.setTimeout(() => void start(), 200);

    return () => {
      cancelled = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
      mm?.revert();
    };
  }, []);

  return null;
}
