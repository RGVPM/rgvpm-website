"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only booking bar (hidden at >= 768px in home.css).
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
      className="rg-h-sticky"
      role="region"
      aria-label="Book a call"
      data-visible={visible ? "true" : "false"}
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <span className="rg-h-sticky-note">
        {note.split(" \u00b7 ").map((part) => (
          <span key={part}>{part}</span>
        ))}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="rg-h-btn rg-h-btn--compact"
        data-ev="sticky_cta_click"
      >
        <span>{label}</span>
        <span className="rg-h-btn-icon" aria-hidden="true">
          &rarr;
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
