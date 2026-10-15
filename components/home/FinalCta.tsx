import Image from "next/image";
import Link from "next/link";
import { HButton, HLink, bookingHref } from "@/components/home/HomePrimitives";
import { SITE } from "@/lib/site";

/**
 * Section 12, the closing night band. Real faces, one action, the two
 * reassurances that matter most. Titles match /about.
 */
export const FINAL_CTA_ID = "final-cta";

const FOUNDERS = [
  { name: "Derrick Tamez", title: "Founder & CEO", photo: "/founders/derrick.jpg" },
  { name: "Kelsey Tamez", title: "Co-Founder & Operations Director", photo: "/founders/kelsey.jpg" },
];

export default function FinalCta() {
  return (
    <section
      id={FINAL_CTA_ID}
      aria-labelledby="final-heading"
      className="rg-h-section rg-h-bg-night rg-h-dark rg-h-final"
    >
      <span className="rg-h-final-mark" aria-hidden="true">
        RGV
      </span>
      <div className="rg-h-wrap rg-h-final-grid">
        <ul className="rg-h-portraits">
          {FOUNDERS.map((f) => (
            <li key={f.name}>
              <div className="rg-h-portrait">
                <Image
                  src={f.photo}
                  alt={`Portrait of ${f.name}`}
                  width={1000}
                  height={1250}
                  sizes="(max-width: 767px) 44vw, 250px"
                />
              </div>
              <p className="rg-h-portrait-name">
                <strong>{f.name}</strong>
                {f.title}
              </p>
            </li>
          ))}
        </ul>

        <div>
          <h2 id="final-heading" className="rg-h-h2">
            Talk to the people who&rsquo;ll <em>build</em> it.
          </h2>
          <p className="rg-h-lede">
            Book a free strategy call with Derrick or Kelsey. Bring your website and your questions,
            and we&rsquo;ll show you what we&rsquo;d fix first, whether you hire us or not.
          </p>
          <div className="rg-h-ctas">
            <HButton href={bookingHref("final")} event="final_cta_click">
              Book a free strategy call
            </HButton>
            <HButton
              href="/pricing"
              variant="ghostDark"
              className="rg-h-only-desktop"
              event="pricing_link_click"
              eventLabel="final"
            >
              See plans and pricing
            </HButton>
            <HLink href="/pricing" className="rg-h-only-mobile" event="pricing_link_click" eventLabel="final">
              See plans and pricing
            </HLink>
          </div>
          <p className="rg-h-reassure">Month-to-month on every plan &middot; HIPAA BAA for healthcare</p>
          <ul className="rg-h-contact">
            <li>
              Rather call? <a href={`tel:${SITE.phone}`}>{SITE.phoneHuman}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Link href="/contact">Contact page</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
