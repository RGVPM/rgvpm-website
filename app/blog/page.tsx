import type { Metadata } from "next";
import Link from "next/link";
import BlogIndex from "@/components/BlogIndex";
import Breadcrumbs from "@/components/Breadcrumbs";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import { canonical, breadcrumbSchema, founderRef, SITE, ORGANIZATION_ID, socialMeta } from "@/lib/site";
import { POSTS } from "@/lib/posts";

const url = canonical("/blog");

export const metadata: Metadata = {
  title: "Medspa Marketing & AI Blog",
  description:
    "Plain-English AI and marketing playbooks for medspa owners and local businesses: AI receptionists, automation, Google, ads and what it all costs.",
  alternates: { canonical: url },
  ...socialMeta({
    url,
    title: `Blog | ${SITE.name}`,
    description:
      "Plain-English AI and marketing playbooks for medspa owners and local businesses.",
  }),
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.name} Blog`,
  description: "Plain-English AI and marketing playbooks for medspa owners and local businesses.",
  url,
  publisher: { "@id": ORGANIZATION_ID },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    "@id": `${canonical(`/blog/${p.slug}`)}#article`,
    headline: p.title,
    description: p.description,
    url: canonical(`/blog/${p.slug}`),
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    author: founderRef(),
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
        <div className="rg-bnight">
          <div className="rg-container">
          <header className="rg-bmast">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} dark inHero />
            <p className="rg-bmast-eyebrow">The medspa AI journal</p>
            <h1 className="rg-bmast-title">
              AI that works <em>the night shift.</em>
            </h1>
            <p className="rg-bmast-text">
              Plain-English playbooks for medspa owners on AI, Google and ads, so your front desk keeps working after it goes home.
            </p>
            <Link href="/medspa-marketing" className="rg-bmast-link">
              How we run marketing for medspas <span aria-hidden="true">→</span>
            </Link>
          </header>

          <BlogIndex
            posts={[...POSTS]
              .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
              .map((p) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt,
                category: p.category,
                readMinutes: p.readMinutes,
                date: p.datePublished,
              }))}
          />
          </div>
        </div>

        <InnerCTA heading="Rather Have Us Do It?" text="You don't need to read a guide to start growing. Book a quick call and we'll tell you which hat to hand off first." />
      </main>
    </>
  );
}
