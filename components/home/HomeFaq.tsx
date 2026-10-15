import { HSection } from "@/components/home/HomePrimitives";
import { homeFaqs } from "@/lib/faqs";

/**
 * Section 11, `#faq`. Native <details>/<summary>: correct keyboard and
 * screen-reader behaviour for free, and every answer stays in the HTML.
 * Rendered from the same `homeFaqs` source as the FAQPage JSON-LD in
 * app/page.tsx and /llms.txt, so the text always matches the schema.
 */
export default function HomeFaq() {
  return (
    <HSection id="faq" surface="bone" labelledBy="faq-heading">
      <div className="rg-h-wrap">
        <div className="rg-h-faq-grid">
          <div className="rg-h-faq-head">
            <h2 id="faq-heading" className="rg-h-h2">
              Questions owners ask before they sign
            </h2>
            <p className="rg-h-lede">Straight answers. Book a call if yours isn&rsquo;t here.</p>
          </div>
          <div className="rg-h-faq-list">
            {homeFaqs.map((faq, i) => (
              <details key={faq.q} className="rg-h-faq-item" open={i === 0}>
                <summary>
                  <span>{faq.q}</span>
                  <span className="rg-h-faq-mark" aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </HSection>
  );
}
