"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only booking bar (hidden at >= 768px in afterglow.css): a
 * midnight glass bar with a tangerine pill that slides up with a transform.
 *
 * Shows once the hero's primary CTA has scrolled above the viewport and
 * hides again while the final CTA band is on screen, so it never doubles up
 * with a visible booking button. While hidden it is `inert` and
 * aria-hidden, so it never takes focus or reads out. A region, not a
 * dialog: it never traps focus.
 */
export default function StickyCta({
  href,
  note,
  label,
  heroCtaId,
  finalId,
}: {
  href: string;
  note: string;
  label: string;
  heroCtaId: string;
  finalId: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [atFinal, setAtFinal] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroCtaId);
    const final = document.getElementById(finalId);
    if (!hero || !final || !("IntersectionObserver" in window)) return;

    const heroObs = new IntersectionObserver(([entry]) => {
      // Past the hero only when the CTA has left through the TOP edge.
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const finalObs = new IntersectionObserver(([entry]) => setAtFinal(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    heroObs.observe(hero);
    finalObs.observe(final);
    return () => {
      heroObs.disconnect();
      finalObs.disconnect();
    };
  }, [heroCtaId, finalId]);

  const visible = pastHero && !atFinal;

  return (
    <div
      className="ev-sticky"
      role="region"
      aria-label="Book a call"
      data-visible={visible ? "true" : "false"}
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <span className="ev-sticky-note">
        {note.split(" \u00b7 ").map((part) => (
          <span key={part}>{part}</span>
        ))}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="ev-btn ev-btn--primary ev-btn--sm"
        data-ev="sticky_cta_click"
      >
        <span className="ev-btn-label">{label}</span>
        <span className="ev-btn-icon" aria-hidden="true">
          <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
          </svg>
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
