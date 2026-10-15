import Link from "next/link";
import { BrowserFrame } from "@/components/home/afterglow/DeviceFrame";
import { HLink, HSection } from "@/components/home/HomePrimitives";

/**
 * Section 6, the growth engine. Five parts of one system, each a whole-card
 * link to its service page with a real starting price from PricingTabs.
 * Asymmetric bento: 7+5, 5+7, then one full-width row. The Website cell
 * scrolls a live client capture (desktop); the ads cell is the sunset fill
 * with midnight text. Cards get a cursor spotlight on hover (desktop).
 */
type Part = {
  title: string;
  href: string;
  body: string;
  tag: string;
  more: string;
  tone?: "sunset";
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
    tone: "sunset",
  },
  {
    title: "One inbox and follow-up",
    href: "/services/lead-management",
    body: "Every form fill, call and chat lands in one inbox from day one. On Build the Machine, automated texts, emails and reminders follow up for you, and a site chatbot answers after hours.",
    tag: "Inbox from $397/mo",
    more: "Lead management",
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
      <div className="ev-card-top">
        <h3 className="ev-card-title">{part.title}</h3>
        <span className="ev-card-tag">{part.tag}</span>
      </div>
      <p className="ev-card-body">{part.body}</p>
    </>
  );
}

function More({ label }: { label: string }) {
  return (
    <span className="ev-card-more">
      {label} <span aria-hidden="true">&rarr;</span>
    </span>
  );
}

export default function Capabilities() {
  const [website, seo, ads, inbox, social] = PARTS;
  const cls = (p: Part, extra?: string) =>
    ["ev-card", p.tone && `ev-card--${p.tone}`, extra].filter(Boolean).join(" ");

  return (
    <HSection labelledBy="engine-heading" className="ev-engine">
      <div className="ev-wrap">
        <div className="ev-head">
          <h2 id="engine-heading" className="ev-h2" data-ev-reveal="">
            One team runs the whole <span className="ev-glow">system</span>.
          </h2>
          <p className="ev-lede ev-rise">
            Hire one company for the site and another for ads, and leads slip through the gap
            between them. We run all five pieces from one inbox and report on them together.
          </p>
        </div>

        <ul className="ev-bento">
          <li className="ev-bento-cell ev-bento--website">
            <Link href={website.href} className={cls(website, "ev-card--website")}>
              <div className="ev-card-shell">
                <div className="ev-card-text">
                  <CardText part={website} />
                  <More label={website.more} />
                </div>
                <div className="ev-card-shot">
                  <BrowserFrame
                    slug="macs-dove-hunts"
                    host="macsdovehunts.com"
                    alt="Full page of the Mac’s Dove Hunts website we built"
                    sizes="(max-width: 1023px) 88vw, 400px"
                    className="ev-autoscroll"
                  />
                </div>
              </div>
            </Link>
          </li>
          {[seo, ads, inbox].map((p, i) => (
            <li key={p.href} className={`ev-bento-cell ev-bento--${["seo", "ads", "inbox"][i]}`}>
              <Link href={p.href} className={cls(p)}>
                <div className="ev-card-shell">
                  <CardText part={p} />
                  <More label={p.more} />
                </div>
              </Link>
            </li>
          ))}
          <li className="ev-bento-cell ev-bento--social">
            <Link href={social.href} className={cls(social, "ev-card--wide")}>
              <div className="ev-card-shell">
                <CardText part={social} />
                <More label={social.more} />
              </div>
            </Link>
          </li>
        </ul>

        <div className="ev-bento-foot">
          <HLink href="/services">See every service</HLink>
        </div>
      </div>
    </HSection>
  );
}
