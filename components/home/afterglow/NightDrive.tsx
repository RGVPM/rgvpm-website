import { DesktopScreen, PhoneScreen } from "@/components/home/afterglow/DeviceFrame";
import { HButton } from "@/components/home/HomePrimitives";
import { WORK } from "@/lib/work";

/**
 * Section 4, `#work`, "Night Drive". Real client sites in laptop and phone
 * frames. All markup is server-rendered; motion/nightDrive.ts adds:
 * - desktop (fine pointer, motion OK): a pinned horizontal pan, captures
 *   scrolling inside the frames, a 3D swing, outline ghost names, index
 *   chips and a progress line; focusing a link scrolls to its slide.
 * - touch: a native scroll-snap strip of phones that auto-scroll only while
 *   their slide is at least half visible.
 * - reduced motion (CSS only): a still 2x2 grid of browser frames you can
 *   scroll by hand.
 */
export default function NightDrive() {
  return (
    <section id="work" aria-labelledby="work-heading" className="ev-section ev-nd">
      <div className="ev-wrap ev-nd-head">
        <h2 id="work-heading" className="ev-h2" data-ev-reveal="">
          Real sites we built. <span className="ev-glow">Open any of them.</span>
        </h2>
        <p className="ev-lede ev-rise">
          Each one is a working client website. Scroll through it here, or open it and look around.
        </p>
      </div>

      <div className="ev-nd-pin">
        <div className="ev-nd-track">
          {WORK.map((w) => (
            <article key={w.slug} id={`work-${w.slug}`} className="ev-nd-slide" aria-labelledby={`work-${w.slug}-name`}>
              <span className="ev-ghost" aria-hidden="true">
                {w.name}
              </span>
              <a
                className="ev-devices"
                href={w.url}
                target="_blank"
                rel="noopener"
                aria-label={`${w.host}: ${w.name} website, built by us (opens in a new tab)`}
              >
                <span className="ev-laptop">
                  <span className="ev-laptop-core">
                    <span className="ev-chrome" aria-hidden="true">
                      <span className="ev-chrome-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="ev-chrome-url">{w.host}</span>
                    </span>
                    <DesktopScreen
                      slug={w.slug}
                      alt={`Full page of the ${w.name} website`}
                      sizes="(max-width: 1023px) 1px, (max-width: 1440px) 52vw, 760px"
                    />
                  </span>
                </span>
                <span className="ev-phone ev-phone--mini">
                  <span className="ev-phone-core">
                    <PhoneScreen
                      slug={w.slug}
                      alt={`The ${w.name} website on a phone`}
                      sizes="(max-width: 1023px) 62vw, 200px"
                    />
                  </span>
                </span>
              </a>
              <div className="ev-nd-copy">
                <p className="ev-nd-meta">{w.industry}</p>
                <h3 id={`work-${w.slug}-name`} className="ev-nd-name">
                  {w.name}
                </h3>
                <p className="ev-nd-line">{w.line}</p>
                <HButton href={w.url} variant="ghost" className="ev-btn--sm" event="work_visit_click" eventLabel={w.slug}>
                  Visit the site
                </HButton>
              </div>
            </article>
          ))}
        </div>

        <div className="ev-nd-rail">
          <span className="ev-nd-progress" aria-hidden="true" />
          <nav className="ev-nd-chips" aria-label="Jump to a client site">
            {WORK.map((w, i) => (
              <a key={w.slug} href={`#work-${w.slug}`} className="ev-nd-chip" data-index={i} aria-label={w.name} aria-current={i === 0 ? "true" : undefined}>
                <span className="ev-nd-chip-dot" aria-hidden="true" />
                <span className="ev-nd-chip-label">{w.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
