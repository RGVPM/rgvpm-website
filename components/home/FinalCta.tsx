import Image from "next/image";
import Link from "next/link";
import { HButton, HLink, bookingHref } from "@/components/home/HomePrimitives";
import { SITE } from "@/lib/site";

/**
 * Section 13, the sun comes back. Real faces, one action, the two
 * reassurances that matter most. Titles match /about. A gold sun rises
 * behind the portraits as you arrive (motion/sections.ts), so the scroll
 * story ends where it began. The band fades into the shared navy footer.
 */
export const FINAL_CTA_ID = "final-cta";

const FOUNDERS = [
  { name: "Derrick Tamez", title: "Founder & CEO", photo: "/founders/derrick.jpg" },
  { name: "Kelsey Tamez", title: "Co-Founder & Operations Director", photo: "/founders/kelsey.jpg" },
];

export default function FinalCta() {
  return (
    <section id={FINAL_CTA_ID} aria-labelledby="final-heading" className="ev-section ev-final">
      <div className="ev-wrap ev-final-grid">
        <div className="ev-final-portraits">
          <span className="ev-final-sun" aria-hidden="true" />
          <ul className="ev-portraits">
            {FOUNDERS.map((f) => (
              <li key={f.name} className="ev-rise">
                <div className="ev-portrait">
                  <Image
                    src={f.photo}
                    alt={`Portrait of ${f.name}`}
                    width={1000}
                    height={1250}
                    sizes="(max-width: 767px) 42vw, 250px"
                  />
                </div>
                <p className="ev-portrait-name">
                  <strong>{f.name}</strong>
                  {f.title}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="ev-final-copy">
          <h2 id="final-heading" className="ev-h2 ev-h2--xl" data-ev-reveal="">
            Talk to the people who&rsquo;ll <span className="ev-glow">build</span> it.
          </h2>
          <p className="ev-lede ev-rise">
            Book a free strategy call with Derrick or Kelsey. Bring your website and your questions,
            and we&rsquo;ll show you what we&rsquo;d fix first, whether you hire us or not.
          </p>
          <div className="ev-ctas ev-rise">
            <HButton href={bookingHref("final")} event="final_cta_click">
              Book a free strategy call
            </HButton>
            <HButton
              href="/pricing"
              variant="ghostDark"
              className="ev-only-desktop"
              event="pricing_link_click"
              eventLabel="final"
            >
              See plans and pricing
            </HButton>
            <HLink href="/pricing" className="ev-only-mobile" event="pricing_link_click" eventLabel="final">
              See plans and pricing
            </HLink>
          </div>
          <p className="ev-reassure ev-rise">Month-to-month on every plan &middot; HIPAA BAA for healthcare</p>
          <ul className="ev-contact ev-rise">
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
      <span className="ev-final-fade" aria-hidden="true" />
    </section>
  );
}
