import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SpanishCTA from "@/components/SpanishCTA";
import {
  ES_PATHS,
  ES_DISENO,
  ES_DISENO_INTRO,
  ES_DISENO_INCLUDED,
  ES_DISENO_STEPS,
  ES_DISENO_FAQS,
  ES_PLANS,
  esAlternates,
  money,
} from "@/lib/es";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";
import { cities, webDesignCityPath } from "@/lib/cities";

const path = ES_PATHS.diseno;
const url = canonical(path);

export const metadata: Metadata = {
  title: { absolute: ES_DISENO.metaTitle },
  description: ES_DISENO.metaDescription,
  alternates: { canonical: url, languages: esAlternates(path) },
  ...socialMeta({ url, title: ES_DISENO.metaTitle, description: ES_DISENO.metaDescription }),
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Español", path: ES_PATHS.hub },
  { name: "Diseño de páginas web", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: ES_DISENO.h1,
  serviceType: ES_DISENO.primaryKeyword,
  description: ES_DISENO.metaDescription,
  url,
  inLanguage: "es",
  areaServed: [{ "@type": "AdministrativeArea", name: SITE.areaServed }, { "@type": "Country", name: "United States" }],
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function SpanishWebDesignPage() {
  const base = ES_PLANS[0];
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(ES_DISENO_FAQS)]} />
      <main lang="es">
        <PageHero tone="blue" eyebrow={ES_DISENO.eyebrow} title={ES_DISENO.h1} subtitle={ES_DISENO.heroSub} crumbs={crumbs}>
          <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap", marginTop: 32 }}>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
              Agendar llamada gratis <span aria-hidden="true">→</span>
            </a>
            <Link href={ES_PATHS.precios} className="rg-btn rg-cta-ghost">
              Ver planes y precios
            </Link>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "#fff", paddingBottom: 0 }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <h2 className="rg-display rg-svc-h2">{ES_DISENO_INTRO.heading}</h2>
            <p style={{ fontSize: 17.5, fontWeight: 500, color: "var(--navy)", lineHeight: 1.7, marginTop: 18 }}>{ES_DISENO_INTRO.answer}</p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Qué Incluye</span>
              <h2 className="rg-display rg-svc-h2">Un Sitio Hecho para Traerle Clientes</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {ES_DISENO_INCLUDED.map((item) => (
                <div key={item.title} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 28 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "var(--r-xl)", background: "var(--blue-wash)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={23} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Cómo Funciona</span>
              <h2 className="rg-display rg-svc-h2">De la Primera Llamada a su Sitio en Línea</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {ES_DISENO_STEPS.map((step, i) => (
                <div key={step.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "28px 26px" }}>
                  <div className="rg-step-dot rg-display">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <span className="rg-pill">Precio</span>
            <h2 className="rg-display rg-svc-h2">¿Cuánto Cuesta?</h2>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 16 }}>
              Su sitio web es el plan {base.name}: <strong style={{ color: "var(--navy)" }}>{money(base.price)} al mes</strong>, mes a mes. {base.text} Si
              contrata el sitio solo hay un cargo único de construcción de $399, que no se cobra si agrega SEO, contenido, redes o anuncios.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link href={ES_PATHS.precios} style={{ fontWeight: 700, color: "var(--blue-ink)" }}>
                Ver todos los planes y complementos <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">Preguntas</span>
              <h2 className="rg-display rg-svc-h2">Preguntas Sobre Páginas Web</h2>
            </div>
            <FaqAccordion items={ES_DISENO_FAQS} />
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <span className="rg-pill">En Todo el Valle</span>
            <h2 className="rg-display rg-svc-h2">Diseño Web por Ciudad</h2>
            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.7, marginTop: 12 }}>Estas páginas están en inglés.</p>
            <ul style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: "10px 22px", listStyle: "none", padding: 0 }}>
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={webDesignCityPath(c.slug)} hrefLang="en" style={{ fontSize: 15, fontWeight: 600, color: "var(--blue-ink)" }}>
                    {c.name}, TX
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SpanishCTA heading="Su Sitio Nuevo, en 8 a 10 Días" />
      </main>
    </>
  );
}
