import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, postSlugs } from "@/lib/posts";
import { canonical, breadcrumbSchema, faqSchema, SITE, ORGANIZATION_ID } from "@/lib/site";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = canonical(`/blog/${slug}`);
  return {
    title: { absolute: `${post.metaTitle} | ${SITE.name}` },
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.metaTitle, description: post.description, siteName: SITE.name },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = canonical(`/blog/${slug}`);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: `${SITE.url}/opengraph-image`,
    inLanguage: "en-US",
    author: { "@id": ORGANIZATION_ID, name: SITE.name },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema(crumbs), faqSchema(post.faqs)]} />
      <main>
        <PageHero
          eyebrow={post.category}
          title={post.title}
          accent="var(--teal)"
          crumbs={crumbs}
        />

        <article style={{ padding: "64px 0 24px", background: "#fff" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span>{new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span>{post.readMinutes} min read</span>
              <span>·</span>
              <span>{post.category}</span>
            </div>

            {/* Quick-answer callout — optimized for AI citation + featured snippets */}
            <div style={{ background: "var(--teal-dim)", borderLeft: "4px solid var(--teal)", borderRadius: 8, padding: "20px 22px", marginBottom: 36 }}>
              <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 8 }}>
                Quick Answer
              </div>
              <p style={{ fontSize: 16, color: "var(--navy)", lineHeight: 1.7, margin: 0 }}>{post.tldr}</p>
            </div>

            {post.sections.map((s, i) => {
              if (s.type === "h2") {
                return (
                  <h2 key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(26px,3vw,38px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.1, margin: "40px 0 16px" }}>
                    {s.text}
                  </h2>
                );
              }
              if (s.type === "h3") {
                return (
                  <h3 key={i} style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)", margin: "28px 0 12px" }}>
                    {s.text}
                  </h3>
                );
              }
              if (s.type === "ul") {
                return (
                  <ul key={i} style={{ margin: "8px 0 20px", paddingLeft: 0, listStyle: "none" }}>
                    {s.items?.map((it, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                        <span style={{ color: "var(--orange)", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>▸</span>
                        <span style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} style={{ fontSize: 16.5, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>{s.text}</p>
              );
            })}
          </div>
        </article>

        {/* FAQ */}
        <section style={{ padding: "64px 0 80px", background: "var(--cream)" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(26px,3vw,38px)", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.1, marginBottom: 28 }}>
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={post.faqs} />

            {/* Related links */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>
                Keep Reading
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {post.related.map((r) => (
                  <Link key={r.href} href={r.href} style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", background: "#fff", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 16px", textDecoration: "none" }}>
                    {r.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
