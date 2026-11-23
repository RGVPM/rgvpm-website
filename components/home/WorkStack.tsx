import { Fragment } from "react";
import WorkPhone from "./WorkPhone";
import { SKIN_PERFECTIONS, DVASH, GLAMMED_UP, NAPLES } from "@/lib/work";

/**
 * Hero visual: four real client websites, shown on phones.
 *
 * Every phone is an actual mobile screenshot of a site we designed, and each
 * one links to its live site, so the hero shows proof rather than decoration.
 * Phones with a `video` play a short muted loop of that site's real hero
 * over the screenshot once the page has loaded (see PhoneVideo). Server component: the only motion is a CSS entrance
 * (see `.rg-phone*` in globals.css). Site data lives in lib/work.ts (shared
 * with /built-by-rgvpm).
 *
 * All four are above the fold on desktop, so every phone loads with priority.
 */
const SITES = [SKIN_PERFECTIONS, DVASH, GLAMMED_UP, NAPLES];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function WorkStack() {
  return (
    <div>
      <div className="rg-phones" aria-label="Four websites we designed for our clients">
        {SITES.map((site, i) => (
          <div key={site.name} className={`rg-phone rg-phone--${i + 1}`}>
            <WorkPhone site={site} priority sizes="(max-width: 1023px) 34vw, 17vw" />
          </div>
        ))}
        {/* Orange sparkles from the brand graphics, twinkling around the phones */}
        <span className="rg-sparkle rg-sparkle--1" aria-hidden="true">✦</span>
        <span className="rg-sparkle rg-sparkle--2" aria-hidden="true">✦</span>
        <span className="rg-sparkle rg-sparkle--3" aria-hidden="true">✦</span>
      </div>
      <p
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(253,248,236,0.9)",
          margin: "18px 0 0",
          textAlign: "center",
          lineHeight: 1.8,
        }}
      >
        {SITES.map((s, i) => (
          <Fragment key={s.name}>
            {i > 0 && " · "}
            <span style={{ whiteSpace: "nowrap" }}>{s.short}</span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
