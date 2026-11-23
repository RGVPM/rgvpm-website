import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import { cities, webDesignCityPath, aiCityPath } from "@/lib/cities";
import { localSeoCityPath } from "@/lib/localSeo";
import { googleAdsCityPath } from "@/lib/googleAds";
import { gbpCityPath } from "@/lib/gbp";
import { TEXAS_CITIES } from "@/lib/texasMedspa";
import { canonical, breadcrumbSchema, socialMeta, SITE, ENTITY_LINE } from "@/lib/site";

// Every city landing page in one place. Replaced the long "Areas We Serve"
// list in the site footer (2026-11-22). Keep a link here to every city page
// so they stay reachable; the footer links to this page and to the Texas
// section of /medspa-marketing.

const PATH = "/areas-we-serve";
const TITLE = "Areas We Serve: Texas and the Rio Grande Valley";
const DESCRIPTION =
  "RGV Performance Marketing is based in Harlingen, Texas and serves med spas nationwide. Pages for Houston, San Antonio, Dallas, Austin and every RGV city.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  ...socialMeta({ url: canonical(PATH), title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Areas We Serve", path: PATH },
];

/** RGV city pages, grouped by service. Order matches the old footer. */
const RGV_SERVICES: { title: string; hub: string; path: (slug: string) => string }[] = [
  { title: "Local SEO", hub: "/services/local-seo", path: localSeoCityPath },
  { title: "Google Business Profile", hub: "/services/google-business-profile", path: gbpCityPath },
  { title: "Google Ads", hub: "/services/paid-advertising", path: googleAdsCityPath },
  { title: "Website Design", hub: "/services/website-design", path: webDesignCityPath },
  { title: "AI Implementation", hub: "/services/ai-implementation", path: aiCityPath },
];

const linkStyle = {
  fontSize: 14.5,
  color: "var(--navy)",
  textDecoration: "none",
  fontWeight: 600,
} as const;

const card = {
  background: "#fff",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-xl)",
  padding: 24,
  minWidth: 0,
} as const;

const groupTitle = {
  fontFamily: "var(--font-dm-mono), monospace",
  fontSize: 11.5,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 14,
} as const;

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <main>
        <PageHero
          eyebrow="Areas We Serve"
          title="Based in Harlingen. Serving Med Spas Nationwide."
          subtitle={ENTITY_LINE}
          crumbs={crumbs}
        />

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 1040 }}>
            <span className="rg-pill">Texas</span>
            <h2 className="rg-display rg-svc-h2">Med Spa Marketing in Texas Metros</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 14, maxWidth: 680 }}>
              We work with practices in every big Texas metro remotely from Harlingen. Each page covers that market and the Texas rules that shape med spa marketing.
            </p>
            <ul className="areas-grid" style={{ listStyle: "none", padding: 0, marginTop: 28 }}>
              {TEXAS_CITIES.map((c) => (
                <li key={c.path} style={{ ...card, background: "var(--cream)" }}>
                  <Link href={c.path} style={linkStyle}>
                    Med Spa Marketing in {c.city}, TX →
                  </Link>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 18 }}>
              Everything we do for practices: <Link href="/medspa-marketing" style={{ color: "var(--blue)", fontWeight: 600 }}>Medspa Marketing</Link>.
            </p>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container" style={{ maxWidth: 1040 }}>
            <span className="rg-pill">Rio Grande Valley</span>
            <h2 className="rg-display rg-svc-h2">Our Home Turf: Rio Grande Valley Cities</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 14, maxWidth: 680 }}>
              Our team lives and works in the Valley. Pick a service to see what we do in each city.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link href="/digital-marketing-harlingen-tx" style={linkStyle}>
                Digital Marketing in Harlingen, TX →
              </Link>
            </p>
            <div className="areas-grid" style={{ marginTop: 28 }}>
              {RGV_SERVICES.map((s) => (
                <div key={s.title} style={card}>
                  <div style={groupTitle}>
                    <Link href={s.hub} style={{ color: "inherit", textDecoration: "none" }}>{s.title}</Link>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 9 }}>
                    {cities.map((c) => (
                      <li key={c.slug}>
                        <Link href={s.path(c.slug)} style={{ ...linkStyle, fontWeight: 500 }}>
                          {s.title} in {c.name}, TX
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
