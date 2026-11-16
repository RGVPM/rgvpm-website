import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SpanishCTA from "@/components/SpanishCTA";
import {
  ES_PATHS,
  ES_HUB,
  ES_HUB_INTRO,
  ES_HUB_SERVICES,
  ES_HUB_WHY,
  ES_HUB_STEPS,
  ES_HUB_FAQS,
  ES_PLANS,
  esAlternates,
  money,
} from "@/lib/es";
import { canonical, breadcrumbSchema, faqSchema, SITE, LOCAL_BUSINESS_ID, socialMeta } from "@/lib/site";

const path = ES_PATHS.hub;
const url = canonical(path);

export const metadata: Metadata = {
  title: { absolute: ES_HUB.metaTitle },
  description: ES_HUB.metaDescription,
  alternates: { canonical: url, languages: esAlternates(path) },
  ...socialMeta({ url, title: ES_HUB.metaTitle, description: ES_HUB.metaDescription }),
};

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Español", path },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: ES_HUB.h1,
  serviceType: "Agencia de marketing digital",
  description: ES_HUB.metaDescription,
  url,
  inLanguage: "es",
  areaServed: [{ "@type": "AdministrativeArea", name: SITE.areaServed }, { "@type": "Country", name: "United States" }],
  provider: { "@type": "ProfessionalService", "@id": LOCAL_BUSINESS_ID, name: SITE.name, url: SITE.url },
};

export default function SpanishHubPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema(crumbs), faqSchema(ES_HUB_FAQS)]} />
      <main lang="es">
        <PageHero tone="blue" eyebrow={ES_HUB.eyebrow} title={ES_HUB.h1} subtitle={ES_HUB.heroSub} crumbs={crumbs}>
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
            <h2 className="rg-display rg-svc-h2">{ES_HUB_INTRO.heading}</h2>
            <p style={{ fontSize: 17.5, fontWeight: 500, color: "var(--navy)", lineHeight: 1.7, marginTop: 18 }}>{ES_HUB_INTRO.answer}</p>
            {ES_HUB_INTRO.body.map((p) => (
              <p key={p} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 16 }}>{p}</p>
            ))}
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">En Español</span>
              <h2 className="rg-display rg-svc-h2">{ES_HUB_WHY.heading}</h2>
              <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.7, marginTop: 14 }}>{ES_HUB_WHY.intro}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="svc-grid-responsive">
              {ES_HUB_WHY.points.map((pt) => (
                <div key={pt.title} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: "26px 26px" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{pt.title}</h3>
                  <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.65 }}>{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Un Solo Equipo</span>
              <h2 className="rg-display rg-svc-h2">Todo lo que su Negocio Necesita en Línea</h2>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.7, marginTop: 12 }}>
                Las páginas de cada servicio están en inglés por ahora. La de diseño de páginas web ya está en español.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {ES_HUB_SERVICES.map((item) => (
                <Link key={item.title} href={item.href} style={{ display: "block", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", padding: 28, textDecoration: "none" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "var(--r-xl)", background: "var(--blue-wash)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={23} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{item.text}</p>
                  <span style={{ display: "inline-block", marginTop: 12, fontSize: 14, fontWeight: 700, color: "var(--blue-ink)" }}>
                    Ver más <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 820 }}>
            <span className="rg-pill">Precios</span>
            <h2 className="rg-display rg-svc-h2">Planes Mes a Mes, Sin Contratos Largos</h2>
            <p style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.75, marginTop: 16 }}>
              Todo empieza con un sitio web por {money(ES_PLANS[0].price)} al mes. Después agrega solo lo que quiere delegar:
            </p>
            <ul style={{ marginTop: 16, paddingLeft: 20, color: "var(--navy)", lineHeight: 1.9, fontSize: 16 }}>
              {ES_PLANS.slice(1).map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>: {money(p.price)} al mes
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link href={ES_PATHS.precios} style={{ fontWeight: 700, color: "var(--blue-ink)" }}>
                Ver todos los precios <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ maxWidth: 640, marginBottom: 40 }}>
              <span className="rg-pill">Cómo Empezamos</span>
              <h2 className="rg-display rg-svc-h2">Cómo Trabajamos con su Negocio</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="steps-grid-responsive">
              {ES_HUB_STEPS.map((step, i) => (
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
          <div className="rg-container">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="rg-pill">Preguntas</span>
              <h2 className="rg-display rg-svc-h2">Preguntas Frecuentes</h2>
            </div>
            <FaqAccordion items={ES_HUB_FAQS} />
          </div>
        </section>

        <SpanishCTA />
      </main>
    </>
  );
}
