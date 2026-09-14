import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import BlogCard, { blogCardAccent } from "@/components/BlogCard";
import { canonical, breadcrumbSchema, SITE, ORGANIZATION_ID } from "@/lib/site";
import { POSTS, postImageUrl } from "@/lib/posts";

const url = canonical("/blog");

export const metadata: Metadata = {
  title: "Blog — Local Marketing Tips for Small Businesses",
  description:
    "Practical local marketing guides for Rio Grande Valley small businesses — local SEO, Google Maps rankings, website costs, paid ads, and more.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `Blog | ${SITE.name}`,
    description: "Practical local marketing insights for small businesses in the Rio Grande Valley.",
    siteName: SITE.name,
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.name} Blog`,
  description: "Practical local marketing insights for small businesses in the Rio Grande Valley.",
  url,
  publisher: { "@id": ORGANIZATION_ID },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: canonical(`/blog/${p.slug}`),
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    image: postImageUrl(p),
    author: { "@id": ORGANIZATION_ID },
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          blogSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Local Marketing, Made Practical"
          subtitle="Straight-talking guides to help Rio Grande Valley businesses get found online and turn searches into customers."
          accent="var(--teal)"
          crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
        />

        <section style={{ padding: "80px 0 88px", background: "var(--cream)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="svc-grid-responsive">
              {POSTS.map((p, i) => (
                <BlogCard key={p.slug} post={p} accent={blogCardAccent(i)} />
              ))}
            </div>
          </div>
        </section>

        <InnerCTA heading="Don't Wait on a Blog Post" text="You don't need to read a guide to start growing. Pick a plan and we'll build your growth engine for you." />
      </main>
    </>
  );
}
