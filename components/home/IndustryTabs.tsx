"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Tab state for the industry switcher, and nothing else. The panels are
 * server-rendered and passed in, so all four are in the HTML (crawlable,
 * find-in-page safe for the active one); inactive panels carry `hidden`.
 * WAI-ARIA tabs pattern: roving tabindex, arrow keys, Home/End.
 * Without JS a <noscript> rule shows every panel stacked.
 */
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
      <div role="tablist" aria-label={label} className="rg-h-tablist" onKeyDown={onKey}>
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
            className="rg-h-tab"
            onClick={() => i !== active && select(i, false)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <noscript>
        <style>{`.rg-h-tablist{display:none!important}.rg-h-panels{gap:28px}.rg-h-panel{grid-area:auto!important}.rg-h-panel[hidden]{visibility:visible!important}`}</style>
      </noscript>
      <div className="rg-h-panels">
        {panels.map((panel, i) => (
          <div
            key={tabs[i].id}
            role="tabpanel"
            id={`ind-panel-${tabs[i].id}`}
            aria-labelledby={`ind-tab-${tabs[i].id}`}
            className="rg-h-panel"
            hidden={i !== active}
            tabIndex={0}
          >
            {panel}
          </div>
        ))}
      </div>
    </>
  );
}
