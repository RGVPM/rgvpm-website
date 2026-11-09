"use client";

import { useEffect, useRef } from "react";

/** Thin bar along the top of the window that fills as you read the `targetId` element. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = target.getBoundingClientRect();
      const span = height - window.innerHeight;
      const done = span > 0 ? Math.min(1, Math.max(0, -top / span)) : 1;
      if (bar.current) bar.current.style.transform = `scaleX(${done})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return <div ref={bar} className="rg-progress" aria-hidden="true" />;
}
