import { Fragment } from "react";
import Image from "next/image";
import PhoneVideo from "./PhoneVideo";

/**
 * Hero visual: four real client websites, shown on phones.
 *
 * Every phone is an actual mobile screenshot of a site we designed, and each
 * live one links to it, so the hero shows proof rather than decoration.
 * Phones with a `video` play a short muted loop of that site's real hero
 * over the screenshot once the page has loaded (see PhoneVideo). Server component: the only motion is a CSS entrance
 * (see `.rg-phone*` in globals.css).
 *
 * Screenshots are 585x1266 (a 390x844 phone screen at 1.5x) in
 * /public/work/phone. All four are above the fold on desktop, so every
 * phone loads with priority.
 */
const SITES: { name: string; short: string; url?: string; screenshot: string; video?: string }[] = [
  {
    // Our redesign isn't live yet, so this phone renders unlinked.
    name: "Skin Perfections Medical Spa",
    short: "Skin Perfections",
    screenshot: "/work/phone/skinperfections.webp",
    video: "/work/phone/video/skinperfections.mp4",
  },
  {
    // Our redesign isn't live yet (naplesbeautyco.com is still the old
    // site), so this phone renders unlinked. Add the url once it launches.
    name: "Naples Beauty Co.",
    short: "Naples Beauty Co.",
    screenshot: "/work/phone/naples.webp",
    video: "/work/phone/video/naples.mp4",
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
];

const mono = "var(--font-dm-mono), ui-monospace, monospace";

export default function WorkStack() {
  return (
    <div>
      <div className="rg-phones" aria-label="Four websites we designed for our clients">
        {SITES.map((site, i) => (
          <div key={site.name} className={`rg-phone rg-phone--${i + 1}`}>
            {site.url ? (
              <a
                href={site.url}
                target="_blank"
                rel="noopener"
                className="rg-phone-frame"
                aria-label={`${site.name} website, designed by us (opens in a new tab)`}
              >
                <PhoneScreen site={site} />
              </a>
            ) : (
              <span className="rg-phone-frame">
                <PhoneScreen site={site} />
              </span>
            )}
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

function PhoneScreen({ site }: { site: (typeof SITES)[number] }) {
  return (
    <>
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
        {site.video && <PhoneVideo src={site.video} />}
      </span>
      <span className="rg-phone-island" aria-hidden="true" />
    </>
  );
}
