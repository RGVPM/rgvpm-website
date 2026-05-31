import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { canonical, breadcrumbSchema, SITE } from "@/lib/site";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";

const url = canonical("/services");

export const metadata: Metadata = {
  title: "Digital Marketing Services for Local Businesses",
  description:
    "Local SEO, Google Business Profile, paid advertising, SMS & email marketing, lead management, and social media — everything a local business needs to grow online.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Digital Marketing Services | ${SITE.name}`,
    description:
      "Everything a local business needs to get found online and turn searches into booked customers.",
    siteName: SITE.name,
  },
};

const tints = [
  { bg: "#fff", accent: "var(--orange)" },
  { bg: "var(--cream)", accent: "var(--teal)" },
  { bg: "var(--orange-wash)", accent: "var(--orange)" },
];

export default function ServicesHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <main>
        <PageHero
          eyebrow="What We Do"
          title="Everything You Need to Win Online"
          subtitle="From showing up on Google to turning leads into booked appointments, our services work together as one coordinated growth engine — locally rooted and built to scale."
          crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
        />

        <section style={{ padding: "88px 0", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid-responsive">
              {services.map((svc, i) => {
                const tint = tints[i % tints.length];
                return (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="svc-card"
                    style={{ background: tint.bg, border: "1px solid var(--border)", borderRadius: 10, padding: 30, textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: tint.accent, marginBottom: 16 }}>
                      <Icon name={svc.icon} size={24} color={tint.accent} />
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{svc.cardTitle}</h2>
                    <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65, flex: 1 }}>{svc.cardText}</p>
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                      {svc.cardFeatures.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--muted)", marginBottom: 5 }}>
                          <span style={{ color: tint.accent, fontWeight: 700, flexShrink: 0 }}>→</span> {f}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: tint.accent }}>Learn more →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
