import Image from "next/image";

/**
 * Hero visual: three real client websites we built, each a link to the live
 * site. D'Vash Aesthetics sits in front so a medspa owner sees their world
 * first; the trades and health sites behind it tell everyone else "and yours."
 *
 * Desktop: a soft Z-cascade. Tablet: the front frame alone, flat.
 * Mobile: a horizontal scroll-snap strip. Only the front image loads
 * eagerly at high priority; the other two are lazy.
 *
 * The D'Vash screenshot is a copy with the site's review pop-up removed
 * (public/work/dvash-aesthetics-clean.webp).
 */
const FRAMES = [
  {
    layer: "front",
    rotate: "-3deg",
    name: "D’Vash Aesthetics",
    url: "https://www.dvashaesthetics.com",
    caption: "dvashaesthetics.com",
    src: "/work/dvash-aesthetics-clean.webp",
  },
  {
    layer: "mid",
    rotate: "2deg",
    name: "Premium Foam",
    url: "https://www.cclcontracting.com/spray-foam-insulation/",
    src: "/work/premium-foam.webp",
  },
  {
    layer: "back",
    rotate: "-1deg",
    name: "Us To You Mobile Health",
    url: "https://www.ustoyoumobilehealth.com",
    src: "/work/us-to-you-mobile-health.webp",
  },
] as const;

export default function WorkStack() {
  return (
    <div className="rg-h-stack" role="group" aria-label="Websites we built for clients">
      {FRAMES.map((f) => {
        const front = f.layer === "front";
        return (
          <div
            key={f.layer}
            className={`rg-h-frame rg-h-frame--${f.layer}`}
            style={{ ["--r" as string]: f.rotate }}
          >
            <a
              href={f.url}
              target="_blank"
              rel="noopener"
              className="rg-h-frame-link"
              aria-label={`${f.name} website, built by us (opens in a new tab)`}
            >
              <span className="rg-h-frame-core">
                <Image
                  src={f.src}
                  alt={`Homepage of the ${f.name} website`}
                  width={1200}
                  height={750}
                  sizes="(max-width: 767px) 82vw, (max-width: 1023px) 640px, 520px"
                  {...(front
                    ? { loading: "eager" as const, fetchPriority: "high" as const }
                    : { loading: "lazy" as const })}
                />
              </span>
            </a>
            {"caption" in f && <p className="rg-h-frame-caption">{f.caption}</p>}
          </div>
        );
      })}
    </div>
  );
}
