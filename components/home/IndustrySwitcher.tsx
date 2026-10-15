import Image from "next/image";
import IndustryTabs from "@/components/home/IndustryTabs";
import { HButton, HSection, bookingHref } from "@/components/home/HomePrimitives";
import { INDUSTRIES, type Industry } from "@/lib/industries";

/**
 * Section 5. After the medspa band and the showcase, tells everyone else
 * they're in the right place and lets them pick their own lane. The shell
 * and all four panels are server-rendered; IndustryTabs only owns which one
 * shows. Each panel takes a faint tint from one sunset stop.
 */
function Panel({ industry, index }: { industry: Industry; index: number }) {
  const { shot, logos } = industry;
  const img = <Image src={shot.src} alt={shot.alt} width={1200} height={750} sizes="(max-width: 899px) 88vw, 560px" />;
  return (
    <div className={`ev-panel-card ev-tint-${index % 4}`}>
      <div className="ev-panel-grid">
        <div className="ev-panel-copy">
          <p className="ev-panel-lines">{industry.lines}</p>
          <div>
            <h3 className="ev-panel-title">What we&rsquo;d set up</h3>
            <ul className="ev-setup">
              {industry.setup.map((item) => (
                <li key={item}>
                  <span className="ev-tick" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <HButton
            href={bookingHref(`industry-${industry.id}`)}
            variant="compact"
            event="industry_cta_click"
            eventLabel={industry.id}
          >
            Book a free strategy call
          </HButton>
        </div>

        <div className="ev-panel-proof">
          <figure>
            <span className="ev-browser">
              <span className="ev-browser-core">
                <span className="ev-chrome" aria-hidden="true">
                  <span className="ev-chrome-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="ev-chrome-url">{shot.caption}</span>
                </span>
                {shot.url ? (
                  <a href={shot.url} target="_blank" rel="noopener" className="ev-panel-shot">
                    {img}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="ev-panel-shot">{img}</span>
                )}
              </span>
            </span>
            <figcaption>{shot.caption}</figcaption>
          </figure>
          {logos && (
            <div className="ev-proof-logos">
              {logos.map((l) => (
                <Image key={l.src} src={l.src} alt={l.alt} width={l.width} height={l.height} sizes="160px" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function IndustrySwitcher() {
  return (
    <HSection surface="night" labelledBy="industry-heading" className="ev-industry">
      <div className="ev-wrap">
        <div className="ev-head">
          <h2 id="industry-heading" className="ev-h2" data-ev-reveal="">
            Pick your business. See what we&rsquo;d set up.
          </h2>
          <p className="ev-lede ev-rise">
            Contractors, clinics, salons and shops run on the same system: a site that books, one
            inbox for every lead, and a Google presence tuned to how their customers search.
          </p>
        </div>
        <div className="ev-rise">
          <IndustryTabs
            label="Choose your type of business"
            tabs={INDUSTRIES.map((i) => ({ id: i.id, label: i.label }))}
            panels={INDUSTRIES.map((i, n) => (
              <Panel key={i.id} industry={i} index={n} />
            ))}
          />
        </div>
      </div>
    </HSection>
  );
}
