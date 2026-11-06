import Link from "next/link";

/**
 * One line for medspa owners landing on the general homepage, pointing them
 * to /medspa-marketing. The proof is Kelsey's years at Aesthetic Record.
 */
export default function MedspaBand() {
  return (
    <section aria-label="For medspas" style={{ background: "var(--navy)", padding: "36px 0" }}>
      <div className="rg-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px 40px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 420px" }}>
          <p className="rg-display" style={{ fontSize: "clamp(26px,3vw,34px)", color: "var(--cream)", lineHeight: 1.1 }}>Run a Medspa?</p>
          <p style={{ fontSize: 16, color: "rgba(253,248,236,0.86)", lineHeight: 1.6, marginTop: 6, maxWidth: "60ch" }}>
            Our co-founder spent five years inside clinic software, working with hundreds of practices. See how we market medspas, with prices up front.
          </p>
        </div>
        <Link href="/medspa-marketing" className="rg-btn rg-cta-cream">
          Medspa Marketing <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
