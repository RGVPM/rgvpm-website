"use client";

import { useEffect, useRef } from "react";

/**
 * A muted hero loop laid over a phone's screenshot. The screenshot stays the
 * LCP image; the video gets no src until the page has fully loaded, so it
 * never competes with first paint. Skipped for reduced motion and Save-Data,
 * where the screenshot simply stays.
 *
 * startWhen="visible" (below-the-fold phones) also waits until the phone is
 * on screen, and pauses the loop again when it scrolls away.
 */
export default function PhoneVideo({ src, startWhen = "load" }: { src: string; startWhen?: "load" | "visible" }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    const play = () => {
      if (!video.src) video.src = src;
      video.play().catch(() => {});
    };

    let observer: IntersectionObserver | undefined;
    const start = () => {
      if (startWhen === "load" || typeof IntersectionObserver === "undefined") return play();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) play();
          else if (video.src) video.pause();
        },
        { rootMargin: "100px 0px" },
      );
      observer.observe(video);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      observer?.disconnect();
    };
  }, [src, startWhen]);

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
