import Image from "next/image";

/**
 * Hero visual: four real client websites, shown on phones.
 *
 * Every phone is an actual mobile screenshot of a site we designed that is
 * live today, and every phone links to it, so the hero shows proof rather
 * than decoration. Server component: the only motion is a CSS entrance
 * (see `.rg-phone*` in globals.css).
 *
 * Screenshots are 585x1266 (a 390x844 phone screen at 1.5x) in
 * /public/work/phone. All four are above the fold on desktop, so every
 * phone loads with priority.
 */
const SITES = [
  {
    name: "NeuroMotion Rehabilitation",
    short: "NeuroMotion",
    url: "https://neuromotionrehabilitation.com",
    screenshot: "/work/phone/neuromotion.webp",
  },
  {
    name: "Belleza De Oro",
    short: "Belleza De Oro",
    url: "https://www.bellezadeorosalon.com",
    screenshot: "/work/phone/belleza.webp",
  },
  {
    name: "Glammed Up Aesthetics",
    short: "Glammed Up",
    url: "https://glammedupaesthetics.com",
    screenshot: "/work/phone/glammedup.webp",
  },
  {
    name: "Us To You Mobile Health",
    short: "Us To You",
    url: "https://www.ustoyoumobilehealth.com",
    screenshot: "/work/phone/ustoyou.webp",
  },
] as const;

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function WorkStack() {
  return (
    <div>
      <div className="rg-phones" aria-label="Four websites we designed for our clients">
        {SITES.map((site, i) => (
          <div key={site.url} className={`rg-phone rg-phone--${i + 1}`}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener"
              className="rg-phone-frame"
              aria-label={`${site.name} website, designed by us (opens in a new tab)`}
            >
              <span className="rg-phone-screen">
                <Image
                  src={site.screenshot}
                  alt={`${site.name} on a phone`}
                  width={585}
                  height={1266}
                  priority
                  sizes="(max-width: 1023px) 34vw, 17vw"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </span>
              <span className="rg-phone-island" aria-hidden="true" />
            </a>
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
          <span key={s.url} style={{ whiteSpace: "nowrap" }}>
            {i > 0 && " · "}
            {s.short}
          </span>
        ))}
      </p>
    </div>
  );
}
