import Image from "next/image";

/**
 * Hero visual: three real client websites, stacked.
 *
 * Replaces the illustrative dashboard. Every card is an actual screenshot
 * of a site we designed that is live today, and every card is a real link
 * to it, so the hero shows proof rather than decoration. Server component:
 * the only motion is a CSS entrance (see `.rg-stack-*` in globals.css).
 *
 * Screenshots are 1200x750 (16:10) in /public/work. All three are above
 * the fold on desktop and the browser picks whichever paints first as the
 * LCP element, so every card loads with priority.
 */
const SITES = [
  {
    name: "Premium Foam",
    url: "https://www.cclcontracting.com/spray-foam-insulation/",
    city: "Rio Grande Valley",
    screenshot: "/work/premium-foam.webp",
  },
  {
    name: "D'Vash Aesthetics",
    url: "https://www.dvashaesthetics.com",
    city: "Harlingen, TX",
    screenshot: "/work/dvash-aesthetics.webp",
  },
  {
    name: "Mac's Dove Hunts",
    url: "https://www.macsdovehunts.com",
    city: "Mercedes, TX",
    screenshot: "/work/macs-dove-hunts.webp",
  },
] as const;

const [front, mid, back] = SITES;

const mono = "var(--font-dm-mono), ui-monospace, monospace";

function Card({ site, layer }: { site: (typeof SITES)[number]; layer: "front" | "mid" | "back" }) {
  return (
    <div className={`rg-stack-card rg-stack-card--${layer}`}>
      <a
        href={site.url}
        target="_blank"
        rel="noopener"
        className="rg-stack-frame"
        aria-label={`${site.name} website, designed by us (opens in a new tab)`}
      >
        <Image
          src={site.screenshot}
          alt={`Homepage of ${site.name}`}
          width={1200}
          height={750}
          priority
          sizes="(max-width: 1023px) 92vw, 42vw"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </a>
      {layer === "front" && (
        <p
          className="rg-stack-caption"
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(247,244,239,0.6)",
            margin: "12px 0 0",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>{site.name}</span>
          <span
            aria-hidden="true"
            style={{ width: 1, height: 11, background: "rgba(247,244,239,0.28)" }}
          />
          <span>{site.city}</span>
        </p>
      )}
    </div>
  );
}

export default function WorkStack() {
  return (
    <div className="rg-stack" aria-label="Three websites we designed for Rio Grande Valley businesses">
      <Card site={back} layer="back" />
      <Card site={mid} layer="mid" />
      <Card site={front} layer="front" />
    </div>
  );
}
