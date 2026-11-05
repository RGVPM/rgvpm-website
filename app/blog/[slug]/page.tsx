import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, postSlugs, POSTS } from "@/lib/posts";
import { postImageSrc } from "@/lib/postImages";
import { canonical, breadcrumbSchema, faqSchema, founderRef, socialMeta, SITE, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";
import Image from "next/image";
import ArticleToc, { type TocItem } from "@/components/ArticleToc";
import BlogCard, { type PostCard } from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import InnerCTA from "@/components/InnerCTA";
import JsonLd from "@/components/JsonLd";
import PostCover from "@/components/PostCover";
import ReadingProgress from "@/components/ReadingProgress";
import type { Post, PostSection } from "@/lib/posts";

/** Render paragraph text, turning each `links` entry (matched in order) into an internal link. */
function renderText(s: PostSection) {
  const text = s.text ?? "";
  if (!s.links?.length) return text;
  const out: React.ReactNode[] = [];
  let rest = text;
  s.links.forEach((l, i) => {
    const at = rest.indexOf(l.text);
    if (at === -1) return;
    out.push(rest.slice(0, at));
    out.push(
      <Link key={i} href={l.href}>
        {l.text}
      </Link>
    );
    rest = rest.slice(at + l.text.length);
  });
  out.push(rest);
  return out;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Anchor ids for the h2s, keyed by section index, deduped in case two headings match. */
function headingIds(sections: PostSection[]) {
  const ids = new Map<number, string>();
  const seen = new Set<string>();
  sections.forEach((s, i) => {
    if (s.type !== "h2" || !s.text) return;
    let id = slugify(s.text);
    for (let n = 2; seen.has(id); n++) id = `${slugify(s.text)}-${n}`;
    seen.add(id);
    ids.set(i, id);
  });
  return ids;
}

/** A list's bold lead-ins, or null unless every item opens with a short sentence. */
function listLeads(items: string[]) {
  const parts = items.map((it) => it.match(/^([^.?!:]{3,70}[.?!:])\s+(\S.*)$/));
  return parts.every(Boolean) ? parts.map((m) => [m![1], m![2]]) : null;
}

/** The post's own related articles first, then its newest neighbors in the same topic. */
function nextReads(post: Post): PostCard[] {
  const curated = post.related.flatMap((r) => {
    const found = r.href.startsWith("/blog/") ? getPost(r.href.slice(6)) : undefined;
    return found ? [found] : [];
  });
  const sameTopic = POSTS.filter((p) => p.category === post.category);
  const picks = new Map([...curated, ...sameTopic, ...POSTS].filter((p) => p.slug !== post.slug).map((p) => [p.slug, p]));
  return [...picks.values()].slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    readMinutes: p.readMinutes,
    date: p.datePublished,
  }));
}

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = canonical(`/blog/${slug}`);
  const social = socialMeta({ url, title: post.metaTitle, description: post.description, type: "article" });
  return {
    title: { absolute: `${post.metaTitle} | ${SITE.name}` },
    description: post.description,
    alternates: { canonical: url },
    ...social,
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [canonical("/about")],
    },
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

  const author = founderRef();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: `${SITE.url}${postImageSrc(slug) ?? "/opengraph-image"}`,
    inLanguage: "en-US",
    articleSection: post.category,
    author,
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const ids = headingIds(post.sections);
  const toc: TocItem[] = post.sections.flatMap((s, i) => (ids.has(i) ? [{ id: ids.get(i)!, text: s.text! }] : []));
  if (post.faqs.length) toc.push({ id: "questions", text: "Common questions" });
  const elsewhere = post.related.filter((r) => !r.href.startsWith("/blog/"));

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema(crumbs), ...(post.faqs.length ? [faqSchema(post.faqs)] : [])]} />
      <ReadingProgress targetId="article" />
      <main>
        <article id="article">
          <header className="rg-ahead">
            <Breadcrumbs items={crumbs.slice(0, 2)} inHero />
            <p className="rg-kicker">{post.category}</p>
            <h1 className="rg-ahead-title">{post.title}</h1>
            <p className="rg-ahead-deck">{post.excerpt}</p>
            <div className="rg-byline">
              <Image src="/founders/derrick.jpg" alt="" width={48} height={48} />
              <p>
                <Link href="/about">{author.name}</Link>
                <span>
                  {longDate(post.datePublished)} · {post.readMinutes} min read
                  {post.dateModified > post.datePublished && ` · Updated ${longDate(post.dateModified)}`}
                </span>
              </p>
            </div>
          </header>

          <div className="rg-acover">
            <PostCover slug={post.slug} category={post.category} sizes="(max-width: 980px) 100vw, 920px" priority />
          </div>

          <div className="rg-alayout">
            <aside className="rg-arail">
              {toc.length >= 3 && <ArticleToc items={toc} />}
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-arail-cta">
                Rather have us do it? <span aria-hidden="true">→</span>
              </a>
            </aside>

            <div className="rg-prose">
              {/* Quick-answer callout — optimized for AI citation + featured snippets */}
              <div className="rg-answer">
                <p className="rg-answer-label">Quick answer</p>
                <p>{post.tldr}</p>
              </div>

              {/* Optional "who does this locally" block — points commercial searches at the right pages. */}
              {post.localAnswer && (
                <div className="rg-local">
                  <p className="rg-answer-label">{post.localAnswer.label}</p>
                  <p>{renderText({ type: "p", ...post.localAnswer })}</p>
                </div>
              )}

              {post.sections.map((s, i) => {
                if (s.type === "h2") return <h2 key={i} id={ids.get(i)}>{s.text}</h2>;
                if (s.type === "h3") return <h3 key={i}>{s.text}</h3>;
                if (s.type === "table") {
                  return (
                    <div key={i} className="rg-table" tabIndex={0} role="region" aria-label={s.text ?? "Comparison table"}>
                      <table>
                        {s.text && <caption>{s.text}</caption>}
                        <thead>
                          <tr>
                            {s.headers?.map((h, j) => (
                              <th key={j} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.rows?.map((row, r) => (
                            <tr key={r}>
                              {row.map((cell, c) => (c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (s.type === "ul") {
                  const leads = listLeads(s.items ?? []);
                  return (
                    <ul key={i}>
                      {s.items?.map((it, j) => (
                        <li key={j}>
                          {leads ? (
                            <>
                              <strong>{leads[j][0]}</strong> {leads[j][1]}
                            </>
                          ) : (
                            it
                          )}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{renderText(s)}</p>;
              })}

              {post.faqs.length > 0 && (
                <section className="rg-faqs" aria-labelledby="questions">
                  <h2 id="questions">Common questions</h2>
                  <dl>
                    {post.faqs.map((f) => (
                      <div key={f.q}>
                        <dt>{f.q}</dt>
                        <dd>{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <div className="rg-author">
                <Image src="/founders/derrick.jpg" alt={author.name} width={72} height={72} />
                <p>
                  <span>Written by</span>
                  <Link href="/about">{author.name}</Link>
                  <span>{author.jobTitle}, {SITE.name}</span>
                </p>
              </div>
            </div>
          </div>
        </article>

        <section className="rg-next" aria-labelledby="keep-reading">
          <div className="rg-container">
            <div className="rg-next-head">
              <h2 id="keep-reading" className="rg-bbrowse-title">Keep reading</h2>
              <Link href="/blog" className="rg-next-all">
                All articles <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="rg-next-grid">
              {nextReads(post).map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
            {elsewhere.length > 0 && (
              <p className="rg-next-links">
                <span>Also useful:</span>
                {elsewhere.map((r) => (
                  <Link key={r.href} href={r.href}>{r.label}</Link>
                ))}
              </p>
            )}
          </div>
        </section>

        <InnerCTA />
      </main>
    </>
  );
}
