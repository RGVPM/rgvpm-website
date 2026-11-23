import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { AR_LEADAR } from "@/lib/arLeadar";
import { GUIDES, GUIDES_HUB, GUIDES_UPDATED, GUIDES_UPDATED_LABEL, GUIDE_AUTHORS, GUIDE_INDEPENDENCE, guidePath } from "@/lib/arGuides";
import { canonical, breadcrumbSchema, socialMeta, SITE, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";

const path = GUIDES_HUB.path;
const url = canonical(path);

export const metadata: Metadata = {
  title: GUIDES_HUB.metaTitle,
  description: GUIDES_HUB.metaDescription,
  alternates: { canonical: url },
  ...socialMeta({ url, title: `${GUIDES_HUB.metaTitle} | ${SITE.name}`, description: GUIDES_HUB.metaDescription }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Aesthetic Record & LeadAR Guides", path },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${url}#page`,
  name: GUIDES_HUB.h1,
  description: GUIDES_HUB.metaDescription,
  url,
  dateModified: GUIDES_UPDATED,
  inLanguage: "en-US",
  isPartOf: { "@id": WEBSITE_ID },
  publisher: { "@id": ORGANIZATION_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonical(guidePath(g.slug)),
      name: g.title,
    })),
  },
};

export default function GuidesHubPage() {
  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema(crumbs)]} />
      <main>
        <PageHero tone="blue" eyebrow={GUIDES_HUB.eyebrow} title={GUIDES_HUB.h1} subtitle={GUIDES_HUB.heroSub} crumbs={crumbs}>
          <div className="rg-cta-actions" style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap", marginTop: 32 }}>
            <Link href={AR_LEADAR.path} className="rg-btn rg-cta-cream">
              Get Aesthetic Record & LeadAR Help <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PageHero>

        <section className="rg-svc-band" style={{ background: "var(--cream)" }}>
          <div className="rg-container">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 32 }}>
              <h2 className="rg-display rg-svc-h2">Start Here</h2>
              <time dateTime={GUIDES_UPDATED} style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--muted)" }}>
                {GUIDES_UPDATED_LABEL}
              </time>
            </div>
            <ul className="rg-ggrid">
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link href={guidePath(g.slug)} className="rg-gcard">
                    <span className="rg-gcard-icon">
                      <Icon name={g.icon} size={23} color="var(--blue)" />
                    </span>
                    <h3>{g.title}</h3>
                    <p>{g.description}</p>
                    <span className="rg-gcard-meta">By {GUIDE_AUTHORS[g.author].name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rg-svc-band" style={{ background: "#fff" }}>
          <div className="rg-container" style={{ maxWidth: 860 }}>
            <span className="rg-pill">Who Writes These</span>
            <h2 className="rg-display rg-svc-h2">Ten Years Inside Aesthetic Record, Between Us</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 28 }} className="why-grid-responsive">
              {(["derrick", "kelsey"] as const).map((k) => {
                const p = GUIDE_AUTHORS[k];
                return (
                  <div key={k} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                    <Image src={p.photo} alt={p.name} width={72} height={72} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flex: "none" }} />
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)" }}>{p.name}</h3>
                      <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, marginTop: 6 }}>{p.line}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginTop: 28 }}>
              Aesthetic Record and LeadAR can do a lot for a practice. These guides help you turn on the parts that bring patients back and
              keep your book full. When you&apos;d rather have us set it up with you, see our{" "}
              <Link href={AR_LEADAR.path} style={{ color: "var(--blue-ink)", fontWeight: 600 }}>
                Aesthetic Record &amp; LeadAR consultant page
              </Link>{" "}
              or <Link href="/about" style={{ color: "var(--blue-ink)", fontWeight: 600 }}>meet the team</Link>.
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginTop: 24 }}>{GUIDE_INDEPENDENCE}</p>
          </div>
        </section>

        <InnerCTA
          heading="Get Even More Out of Aesthetic Record & LeadAR"
          text="Fifteen minutes with someone who worked there. Tell us what you want your software to do for you, and we'll show you where to start."
        />
      </main>
    </>
  );
}
