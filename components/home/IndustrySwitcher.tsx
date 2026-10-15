import Image from "next/image";
import IndustryTabs from "@/components/home/IndustryTabs";
import { BezelFrame, HButton, HSection, bookingHref } from "@/components/home/HomePrimitives";
import { INDUSTRIES, type Industry } from "@/lib/industries";

/**
 * Section 4. After the medspa band, tells everyone else they're in the
 * right place and lets them pick their own lane. The shell and all four
 * panels are server-rendered; IndustryTabs only owns which one shows.
 */
function Panel({ industry }: { industry: Industry }) {
  const { shot, thumb, logos } = industry;
  return (
    <BezelFrame>
      <div className="rg-h-panel-grid">
        <div className="rg-h-panel-copy">
          <p className="rg-h-panel-lines">{industry.lines}</p>
          <div>
            <h3 className="rg-h-panel-title">What we&rsquo;d set up</h3>
            <ul className="rg-h-setup">
              {industry.setup.map((item) => (
                <li key={item}>
                  <span className="rg-h-tick" aria-hidden="true" />
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

        <div className="rg-h-panel-proof">
          <figure>
            {shot.url ? (
              <a href={shot.url} target="_blank" rel="noopener" className="rg-h-media">
                <Image src={shot.src} alt={shot.alt} width={1200} height={750} sizes="(max-width: 899px) 90vw, 600px" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="rg-h-media">
                <Image src={shot.src} alt={shot.alt} width={1200} height={750} sizes="(max-width: 899px) 90vw, 600px" />
              </span>
            )}
            <figcaption>{shot.caption}</figcaption>
          </figure>
          {(thumb || logos) && (
            <div className="rg-h-proof-logos">
              {thumb && (
                <span className="rg-h-media rg-h-proof-thumb">
                  <Image src={thumb.src} alt={thumb.alt} width={1200} height={750} sizes="132px" />
                </span>
              )}
              {logos?.map((l) => (
                <Image key={l.src} src={l.src} alt={l.alt} width={l.width} height={l.height} sizes="160px" />
              ))}
            </div>
          )}
        </div>
      </div>
    </BezelFrame>
  );
}

export default function IndustrySwitcher() {
  return (
    <HSection surface="cream" labelledBy="industry-heading">
      <div className="rg-h-wrap">
        <div className="rg-h-head rg-h-reveal">
          <h2 id="industry-heading" className="rg-h-h2">
            Pick your business. See what we&rsquo;d set up.
          </h2>
          <p className="rg-h-lede">
            Contractors, clinics, salons and shops run on the same system: a site that books, one
            inbox for every lead, and a Google presence tuned to how their customers search.
          </p>
        </div>
        <div>
          <IndustryTabs
            label="Choose your type of business"
            tabs={INDUSTRIES.map((i) => ({ id: i.id, label: i.label }))}
            panels={INDUSTRIES.map((i) => (
              <Panel key={i.id} industry={i} />
            ))}
          />
        </div>
      </div>
    </HSection>
  );
}
