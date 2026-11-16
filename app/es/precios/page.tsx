import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SpanishCTA from "@/components/SpanishCTA";
import { ES_PATHS, ES_PRECIOS, ES_PRECIOS_INTRO, ES_PRECIOS_FAQS, ES_PLANS, esAlternates, money } from "@/lib/es";
import { canonical, breadcrumbSchema, faqSchema, socialMeta } from "@/lib/site";

const path = ES_PATHS.precios;
const url = canonical(path);

export const metadata: Metadata = {
  title: { absolute: ES_PRECIOS.metaTitle },
  description: ES_PRECIOS.metaDescription,
  alternates: { canonical: url, languages: esAlternates(path) },
  ...socialMeta({ url, title: ES_PRECIOS.metaTitle, description: ES_PRECIOS.metaDescription }),
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Español", path: ES_PATHS.hub },
  { name: "Precios", path },
];

export default function SpanishPricingPage() {
  const [base, ...addons] = ES_PLANS;
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(ES_PRECIOS_FAQS)]} />
      <main lang="es">
        <PageHero tone="blue" eyebrow={ES_PRECIOS.eyebrow} title={ES_PRECIOS.h1} subtitle={ES_PRECIOS.heroSub} crumbs={crumbs}>
          <ul className="rg-about-proof">
            {ES_PRECIOS.proof.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff", paddingBottom: 0 }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <h2 className="rg-display rg-svc-h2">{ES_PRECIOS_INTRO.heading}</h2>
            <p style={{ fontSize: 17.5, fontWeight: 500, color: "var(--navy)", lineHeight: 1.7, marginTop: 18 }}>{ES_PRECIOS_INTRO.answer}</p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ background: "var(--navy)", color: "#fff", borderRadius: "var(--r-xl)", padding: "34px 32px", marginBottom: 24 }}>
              <span className="rg-pill">{base.tier}</span>
              <h2 className="rg-display" style={{ fontSize: "clamp(32px,4vw,48px)", color: "var(--cream)", margin: "14px 0 6px" }}>{base.name}</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 12 }}>
                <span className="rg-display" style={{ fontSize: 44, color: "var(--cream)" }}>{money(base.price)}</span> al mes
              </p>
              <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, maxWidth: "62ch" }}>{base.text}</p>
              <ul style={{ marginTop: 14, paddingLeft: 20, color: "rgba(255,255,255,0.88)", lineHeight: 1.85, fontSize: 15 }}>
                {base.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", marginTop: 14 }}>
                Cargo único de construcción de $399 si contrata el sitio solo. Con cualquier complemento, no se cobra.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="svc-grid-responsive">
              {addons.map((p) => (
                <div key={p.name} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue-ink)" }}>{p.tier}</span>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)", margin: "8px 0 6px" }}>{p.name}</h3>
                  <p style={{ fontSize: 15, color: "var(--navy)", marginBottom: 10 }}>
                    <strong>+{money(p.price)}</strong> al mes
                  </p>
                  <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.65 }}>{p.text}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.7, marginTop: 28, maxWidth: "70ch" }}>
              Todos los planes son mes a mes. Para contratar en línea, use nuestra{" "}
              <Link href="/pricing" hrefLang="en" style={{ fontWeight: 700, color: "var(--blue-ink)" }}>
                página de precios en inglés
              </Link>{" "}
              o agende una llamada y lo hacemos juntos. Para ver qué incluye el sitio web, lea{" "}
              <Link href={ES_PATHS.diseno} style={{ fontWeight: 700, color: "var(--blue-ink)" }}>
                diseño de páginas web
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
              <span className="rg-pill">Preguntas</span>
              <h2 className="rg-display rg-svc-h2">Preguntas Sobre Precios</h2>
            </div>
            <FaqAccordion items={ES_PRECIOS_FAQS} />
          </div>
        </section>

        <SpanishCTA heading="¿No Sabe Qué Plan le Conviene?" text="Agende una llamada corta. Vemos dónde se le están yendo los clientes y le decimos qué plan le queda, sin presión." hidePricingLink />
      </main>
    </>
  );
}
