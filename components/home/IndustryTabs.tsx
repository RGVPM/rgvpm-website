"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Tab state for the industry switcher, and nothing else. The panels are
 * server-rendered and passed in, so all four are in the HTML (crawlable,
 * find-in-page safe for the active one).
 *
 * Inactive panels are NOT `hidden`: Tailwind's preflight forces
 * `[hidden]{display:none !important}`, which collapsed them and made the box
 * change height on every switch. Instead every panel stays in one grid cell
 * and inactive ones get `visibility: hidden` via `data-active`, which also
 * removes them from the tab order and the accessibility tree. The box is
 * always as tall as the tallest panel, so switching never moves the page.
 * WAI-ARIA tabs pattern: roving tabindex, arrow keys, Home/End.
 * Without JS a <noscript> rule shows every panel stacked.
 *
 * The tangerine pill slides between tabs by transitioning a clip-path
 * inset on one full-size layer (composited, no layout, and the pill's round
 * ends never stretch the way a scaleX would). Reduced motion makes it
 * instant (afterglow.css).
 */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function IndustryTabs({
  tabs,
  panels,
  label,
}: {
  tabs: { id: string; label: string }[];
  panels: ReactNode[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const placePill = useCallback(() => {
    const tab = refs.current[active];
    const pill = pillRef.current;
    const list = listRef.current;
    if (!tab || !pill || !list) return;
    const W = list.scrollWidth;
    const H = list.scrollHeight;
    pill.style.width = `${W}px`;
    pill.style.height = `${H}px`;
    const top = tab.offsetTop;
    const left = tab.offsetLeft;
    const right = W - left - tab.offsetWidth;
    const bottom = H - top - tab.offsetHeight;
    pill.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round 999px)`;
    pill.dataset.ready = "true";
  }, [active]);

  useIsoLayoutEffect(() => {
    placePill();
  }, [placePill]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(() => placePill());
    ro.observe(list);
    document.fonts?.ready.then(placePill);
    return () => ro.disconnect();
  }, [placePill]);

  const select = (i: number, focus: boolean) => {
    setActive(i);
    if (focus) refs.current[i]?.focus();
    window.gtag?.("event", "industry_tab_select", { event_label: tabs[i].id });
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <>
      <div className="ev-tabrail">
        <div role="tablist" aria-label={label} className="ev-tablist" onKeyDown={onKey} ref={listRef}>
          <span className="ev-tab-pill" aria-hidden="true" ref={pillRef} />
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`ind-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`ind-panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className="ev-tab"
              onClick={() => i !== active && select(i, false)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <noscript>
        <style>{`.ev-tabrail{display:none!important}.ev-panels{gap:28px}.ev-panel{grid-area:auto!important;visibility:visible!important;opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <div className="ev-panels">
        {panels.map((panel, i) => (
          <div
            key={tabs[i].id}
            role="tabpanel"
            id={`ind-panel-${tabs[i].id}`}
            aria-labelledby={`ind-tab-${tabs[i].id}`}
            className="ev-panel"
            data-active={i === active ? "true" : "false"}
            tabIndex={i === active ? 0 : -1}
          >
            {panel}
          </div>
        ))}
      </div>
    </>
  );
}
