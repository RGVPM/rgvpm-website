"use client";

import { useEffect, useRef } from "react";

/**
 * A muted hero loop laid over a phone's screenshot. The screenshot stays the
 * LCP image; the video gets no src until the page has fully loaded, so it
 * never competes with first paint. Skipped for reduced motion and Save-Data,
 * where the screenshot simply stays.
 */
export default function PhoneVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    const start = () => {
      video.src = src;
      video.play().catch(() => {});
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [src]);

  return (
    <video
      ref={ref}
      className="rg-phone-video"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={(e) => e.currentTarget.classList.add("is-playing")}
    />
  );
}
