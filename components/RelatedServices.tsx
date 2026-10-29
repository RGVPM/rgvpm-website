import Link from "next/link";
import { getService } from "@/lib/services";

/** "Other hats we wear": related services as the homepage's hat cards. */
export default function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getService).filter((s) => s !== undefined);
  if (related.length === 0) return null;

  return (
    <section className="rg-svc-band" style={{ background: "#fff" }}>
      <div className="rg-container">
        <div className="rg-reveal" style={{ maxWidth: 640 }}>
          <span className="rg-pill">Keep exploring</span>
          <h2 className="rg-display rg-svc-h2">Other Hats We Wear</h2>
        </div>
        <ul className="rg-hats" style={{ marginTop: "var(--s6)" }}>
          {related.map((svc) => (
            <li key={svc.slug} className="rg-reveal">
              <Link href={`/services/${svc.slug}`} className="rg-hat">
                <span className="rg-hat-pill">Hat</span>
                <h3 className="rg-display rg-hat-title">{svc.hat}</h3>
                <p className="rg-hat-sub">+ {svc.shortName.toLowerCase()}</p>
                <span className="rg-hat-rule" aria-hidden="true" />
                <p className="rg-hat-text">{svc.cardText}</p>
                <span className="rg-hat-more">
                  {svc.shortName} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
