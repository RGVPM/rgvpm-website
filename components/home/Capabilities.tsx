import Image from "next/image";
import Link from "next/link";
import { HLink, HSection } from "@/components/home/HomePrimitives";

/**
 * Section 5, the growth engine. Five parts of one system, each a whole-card
 * link to its service page with a real starting price from PricingTabs.
 * Bento: 7+5, 5+7, then one full-width row.
 */
type Part = {
  title: string;
  href: string;
  body: string;
  tag: string;
  more: string;
  tone?: "bone" | "navy";
};

const PARTS: Part[] = [
  {
    title: "Website",
    href: "/services/website-design",
    body: "A custom site we build, host and keep updated. Unlimited standard edits: hours, photos, copy, services.",
    tag: "Included from $397/mo",
    more: "Website design",
  },
  {
    title: "Google & local SEO",
    href: "/services/local-seo",
    body: "Your Google Business Profile built out, city and service pages, and monthly content aimed at real Search Console queries. We don’t promise a #1 ranking.",
    tag: "From $597/mo",
    more: "Local SEO",
  },
  {
    title: "Google & Meta ads",
    href: "/services/paid-advertising",
    body: "Campaigns built, written and managed for you: Google or Meta on Build the Machine, both on Own the Market. You pay the platform directly, so you see every dollar of spend.",
    tag: "From $899/mo",
    more: "Paid advertising",
    tone: "navy",
  },
  {
    title: "One inbox and follow-up",
    href: "/services/lead-management",
    body: "Every form fill, call and chat lands in one inbox from day one. On Build the Machine, automated texts, emails and reminders follow up for you, and a site chatbot answers after hours.",
    tag: "Inbox from $397/mo",
    more: "Lead management",
    tone: "bone",
  },
  {
    title: "Social & content",
    href: "/services/social-media-newsletter",
    body: "You shoot, we edit and brand a reel and a post every week, with captions and stories. Or, for clients in the Rio Grande Valley, we shoot on-site monthly and run the account for you.",
    tag: "From $650/mo",
    more: "Social media",
  },
];

function CardText({ part }: { part: Part }) {
  return (
    <>
      <div className="rg-h-card-top">
        <h3 className="rg-h-h3">{part.title}</h3>
        <span className="rg-h-card-tag">{part.tag}</span>
      </div>
      <p className="rg-h-body">{part.body}</p>
    </>
  );
}

function More({ label }: { label: string }) {
  return (
    <span className="rg-h-card-more">
      {label} <span aria-hidden="true">&rarr;</span>
    </span>
  );
}

export default function Capabilities() {
  const [website, seo, ads, inbox, social] = PARTS;
  const cls = (p: Part, extra?: string) =>
    ["rg-h-card", p.tone && `rg-h-card--${p.tone}`, extra].filter(Boolean).join(" ");

  return (
    <HSection surface="cream" labelledBy="engine-heading">
      <div className="rg-h-wrap">
        <div className="rg-h-split-head rg-h-reveal">
          <h2 id="engine-heading" className="rg-h-h2">
            One team runs the whole <em>system</em>.
          </h2>
          <p className="rg-h-lede">
            Hire one company for the site and another for ads, and leads slip through the gap
            between them. We run all five pieces from one inbox and report on them together.
          </p>
        </div>

        <ul className="rg-h-bento">
          <li className="rg-h-reveal">
            <Link href={website.href} className={cls(website, "rg-h-website")}>
              <div className="rg-h-card-grid">
                <div className="rg-h-card-text">
                  <CardText part={website} />
                  <More label={website.more} />
                </div>
                <span className="rg-h-card-shot">
                  <Image
                    src="/work/ccl-contracting-clean.webp"
                    alt="Detail of the CCL Contracting website we built"
                    width={1200}
                    height={750}
                    sizes="(max-width: 1023px) 90vw, 400px"
                  />
                </span>
              </div>
            </Link>
          </li>
          {[seo, ads, inbox].map((p) => (
            <li key={p.href} className="rg-h-reveal">
              <Link href={p.href} className={cls(p)}>
                <CardText part={p} />
                <More label={p.more} />
              </Link>
            </li>
          ))}
          <li className="rg-h-reveal">
            {/* Full-width row: same title/price header as the other cards,
                with the link right-aligned under the price. */}
            <Link href={social.href} className={cls(social, "rg-h-card--wide")}>
              <CardText part={social} />
              <More label={social.more} />
            </Link>
          </li>
        </ul>

        <div className="rg-h-bento-foot">
          <HLink href="/services">See every service</HLink>
        </div>
      </div>
    </HSection>
  );
}
