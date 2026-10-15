import { HSection } from "@/components/home/HomePrimitives";
import { homeFaqs } from "@/lib/faqs";

/**
 * Section 12, `#faq`. Native <details>/<summary>: correct keyboard and
 * screen-reader behaviour for free, and every answer stays in the HTML.
 * Rendered from the same `homeFaqs` source as the FAQPage JSON-LD in
 * app/page.tsx and /llms.txt, so the text always matches the schema.
 * The plus turns into an x and answers open with the grid-rows trick
 * (no height animation).
 */
export default function HomeFaq() {
  return (
    <HSection id="faq" labelledBy="faq-heading" className="ev-faq">
      <div className="ev-wrap">
        <div className="ev-faq-grid">
          <div className="ev-faq-head">
            <h2 id="faq-heading" className="ev-h2" data-ev-reveal="">
              Questions owners ask before they sign
            </h2>
            <p className="ev-lede ev-rise">Straight answers. Book a call if yours isn&rsquo;t here.</p>
          </div>
          <div className="ev-faq-list">
            {homeFaqs.map((faq, i) => (
              <details key={faq.q} className="ev-faq-item" open={i === 0}>
                <summary>
                  <span>{faq.q}</span>
                  <span className="ev-faq-mark" aria-hidden="true" />
                </summary>
                <div className="ev-faq-a">
                  <div>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </HSection>
  );
}
