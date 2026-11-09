import Link from "next/link";
import { SITE } from "@/lib/site";
import { ES_PATHS } from "@/lib/es";

/** Spanish version of InnerCTA for the /es pages. */
export default function SpanishCTA({
  heading = "¿Listo para Recibir Más Llamadas?",
  text = "Agende una llamada de estrategia gratis. Revisamos su sitio y su Perfil de Google y le decimos qué arreglaríamos primero.",
  hidePricingLink = false,
}: {
  heading?: string;
  text?: string;
  hidePricingLink?: boolean;
}) {
  return (
    <section
      className="rg-glow-band"
      style={{ background: "linear-gradient(180deg, var(--blue) 0%, #0A82DD 100%)", paddingBlock: "var(--section-y)" }}
    >
      <div className="rg-container" style={{ textAlign: "center", maxWidth: 760 }}>
        <h2 className="rg-display rg-reveal" style={{ fontSize: "clamp(40px,5.4vw,76px)", color: "var(--cream)", margin: "0 0 var(--s5)" }}>
          {heading}
        </h2>
        <p style={{ fontSize: 17, color: "rgba(253,248,236,0.94)", lineHeight: 1.7, margin: "0 auto var(--s7)", maxWidth: "52ch" }}>{text}</p>
        <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
            Agendar llamada gratis <span aria-hidden="true">→</span>
          </a>
          {hidePricingLink ? (
            <a href={`tel:${SITE.phone}`} className="rg-btn rg-cta-ghost">
              Llamar al {SITE.phoneHuman}
            </a>
          ) : (
            <Link href={ES_PATHS.precios} className="rg-btn rg-cta-ghost">
              Ver planes y precios
            </Link>
          )}
        </div>
        <ul className="rg-reassure" style={{ marginTop: "var(--s6)" }}>
          <li>Mes a mes, cancele cuando quiera</li>
          <li>Sitio nuevo en 8 a 10 días</li>
          <li>Sin contratos largos</li>
        </ul>
      </div>
    </section>
  );
}
