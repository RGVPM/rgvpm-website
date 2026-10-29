import Link from "next/link";
import type { Service } from "@/lib/services";
import { SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedServices from "@/components/RelatedServices";
import InnerCTA from "@/components/InnerCTA";
import CityLinks, { type CityLink } from "@/components/CityLinks";

/**
 * One template for every /services/[slug] page, in the homepage's language:
 * a blue hero with the service's HAT pill, then what you get (checked list
 * plus the starting price), how it works (the 01-02-03 rail), who it's for,
 * FAQ, city links, related hats, and the booking band.
 */
export default function ServiceDetail({ service, cityLinks }: { service: Service; cityLinks?: { heading: string; intro?: string; links: CityLink[] } }) {
  const steps = service.howWeDoIt.steps;
  return (
    <main>
      <PageHero
        tone="blue"
        eyebrow={`Hat · ${service.hat}`}
        title={service.h1}
        subtitle={service.heroSub}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortName, path: `/services/${service.slug}` },
        ]}
      >
        <div className="rg-hero-actions" style={{ display: "flex", alignItems: "center", gap: "var(--s5)", flexWrap: "wrap", marginTop: 32 }}>
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-hero-cta rg-cta-cream">
            Book with us! <span aria-hidden="true">→</span>
          </a>
          <Link href="/pricing" className="rg-hero-secondary">
            See plans and pricing
          </Link>
        </div>
      </PageHero>

      {/* What you get */}
      <section className="rg-svc-band" style={{ background: "#fff" }}>
        <div className="rg-container rg-svc-split">
          <div className="rg-reveal">
            <span className="rg-pill">What it is</span>
            <h2 className="rg-display rg-svc-h2">{service.whatItIs.heading}</h2>
            {service.whatItIs.body.map((p, i) => (
              <p key={i} className="rg-svc-body">{p}</p>
            ))}
          </div>
          <aside className="rg-svc-card rg-reveal" aria-label="What you get">
            <p className="rg-svc-card-kicker">What you get</p>
            <ul className="rg-check-list">
              {service.includes.map((item) => (
                <li key={item}>
                  <span className="rg-handled-check" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="rg-svc-price">
              <p className="rg-svc-price-label">Starts with {service.startsAt.plan}</p>
              <p className="rg-display rg-svc-price-num">{service.startsAt.price}</p>
              {service.startsAt.note && <p className="rg-svc-price-note">{service.startsAt.note}</p>}
              <Link href="/pricing" className="rg-text-link">Compare plans</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* How it works */}
      <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
        <div className="rg-container">
          <div className="rg-process-head rg-reveal">
            <div>
              <span className="rg-pill">How it works</span>
              <h2 className="rg-display rg-svc-h2">{service.howWeDoIt.heading}</h2>
            </div>
            <p className="rg-svc-body" style={{ margin: 0, maxWidth: "40ch" }}>{service.howWeDoIt.intro}</p>
          </div>
          <ol className={`rg-steps rg-steps--cream${steps.length === 4 ? " rg-steps--4" : ""}`}>
            {steps.map((s, i) => (
              <li key={s.title} className="rg-step rg-reveal">
                <span className="rg-step-marker rg-display" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3, color: "var(--navy)", margin: "0 0 var(--s3)" }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section className="rg-svc-band" style={{ background: "#fff" }}>
        <div className="rg-container">
          <div className="rg-reveal" style={{ maxWidth: 720 }}>
            <span className="rg-pill">The right fit</span>
            <h2 className="rg-display rg-svc-h2">{service.whoItsFor.heading}</h2>
            <p className="rg-svc-body">{service.whoItsFor.intro}</p>
          </div>
          <ul className="rg-fit-grid">
            {service.whoItsFor.bullets.map((b) => (
              <li key={b} className="rg-fit rg-reveal">
                <span className="rg-handled-check" aria-hidden="true">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
        <div className="rg-container">
          <div className="rg-reveal" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
            <span className="rg-pill">FAQ</span>
            <h2 className="rg-display rg-svc-h2">{service.shortName} Questions, Answered</h2>
          </div>
          <FaqAccordion items={service.faqs} />
        </div>
      </section>

      {cityLinks && <CityLinks heading={cityLinks.heading} intro={cityLinks.intro} links={cityLinks.links} />}

      <RelatedServices slugs={service.related} />
      <InnerCTA />
    </main>
  );
}
