"use client";

import { useState } from "react";
import Link from "next/link";

const BOOKING = "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall";

/**
 * Pricing is one base (the website) plus add-ons, with two bundles that
 * cost less than the same pieces bought one by one. Every price lives in
 * BASE / ADDONS / BUNDLES below, so the "save $X" lines and the builder's
 * math stay right when a number changes.
 */
const BASE = { name: "Plant the Flag", price: 397, buildFee: 499 };

type AddonId = "seo" | "content" | "social" | "ads" | "followup";

const ADDONS: { id: AddonId; name: string; price: number; text: string }[] = [
  {
    id: "seo",
    name: "Local SEO & Google Profile",
    price: 200,
    text: "Google Business Profile built out, city and service pages, monthly content and a report.",
  },
  {
    id: "content",
    name: "Content Crew",
    price: 650,
    text: "You shoot, we edit: 1 reel and 1 branded creative a week, plus stories. You post.",
  },
  {
    id: "social",
    name: "Full Service Social",
    price: 1250,
    text: "2 reels and 1 post a week, unlimited stories, a monthly shoot. We post and answer DMs.",
  },
  {
    id: "ads",
    name: "Ads Management",
    price: 300,
    text: "Google or Meta ads built and run for you. You fund the ad spend.",
  },
  {
    id: "followup",
    name: "Follow-Up & Automation",
    price: 200,
    text: "Missed-call text back, email and text campaigns, reminders and an after-hours chatbot.",
  },
];

const addonPrice = (id: AddonId) => ADDONS.find((a) => a.id === id)!.price;

/** Bundles include the website, so `covers` is the add-ons on top of it. */
const BUNDLES = {
  machine: { name: "Build the Machine", price: 899, covers: ["seo", "content"] as AddonId[] },
  market: { name: "Own the Market", price: 2000, covers: ["seo", "social", "ads", "followup"] as AddonId[] },
};

const aLaCarte = (ids: AddonId[]) => BASE.price + ids.reduce((sum, id) => sum + addonPrice(id), 0);
const savings = (b: { price: number; covers: AddonId[] }) => aLaCarte(b.covers) - b.price;

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** "$899" + "/mo" -> "about $30 a day", so the monthly number feels as small as it is. */
const perDay = (n: number) => `About $${Math.round((n * 12) / 365)} a day`;

/* ----------------------------- shared card ----------------------------- */

interface CardProps {
  tier: string;
  name: string;
  description: string;
  price: number;
  priceNote: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  /** The recommended plan: navy card, orange pill, blue button. */
  highlighted?: boolean;
  /** Short line pinned to the top corner, e.g. "Save $348/mo". */
  ribbon?: string;
  /** The hats this plan takes off the owner (the homepage hats). */
  hats?: string[];
  /** Hats are added on top of the previous plan's. */
  extraHats?: boolean;
}

/**
 * One plan card. Plain plans are white with a navy outline; the highlighted
 * plan is the navy card, lifted on desktop. Styles live in globals.css
 * (`.rg-plan*`).
 */
function Card({ tier, name, description, price, priceNote, features, ctaLabel, ctaHref, highlighted = false, ribbon, hats, extraHats }: CardProps) {
  return (
    <div className={`rg-plan${highlighted ? " rg-plan--hl" : ""}`}>
      {ribbon && <span className="rg-plan-ribbon">{ribbon}</span>}
      <span className={`rg-pill${highlighted ? " rg-pill--orange" : ""}`}>{tier}</span>
      <h3 className="rg-display rg-plan-name">{name}</h3>
      <p className="rg-plan-desc">{description}</p>

      <div className="rg-plan-price">
        <span className="rg-display rg-plan-num">{money(price)}</span>
        <span className="rg-plan-suffix">/mo</span>
      </div>
      <p className="rg-plan-daily">{perDay(price)}</p>
      <p className="rg-plan-note">{priceNote}</p>

      {hats && (
        <div className="rg-plan-hats">
          <p className="rg-plan-hats-label">
            {hats.length} {hats.length === 1 ? "hat" : "hats"} off your plate{extraHats ? " (on top of the plan before)" : ""}
          </p>
          <ul>
            {hats.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <ul className="rg-plan-list">
        {features.map((f) => (
          <li key={f}>
            <span className="rg-plan-check" aria-hidden="true">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        {...(ctaHref.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="rg-btn rg-plan-cta"
      >
        {ctaLabel}
      </a>
    </div>
  );
}

function SectionHead({ pill, title, text }: { pill: string; title: string; text: string }) {
  return (
    <div className="rg-plan-head rg-reveal">
      <span className="rg-pill">{pill}</span>
      <h2 className="rg-display rg-svc-h2">{title}</h2>
      <p>{text}</p>
    </div>
  );
}

/* ---------------------------- add-on builder ---------------------------- */

/**
 * Tick add-ons, see the monthly total. When a bundle (plus any add-ons it
 * doesn't cover) would cost less than the picks bought one by one, say so.
 * Content Crew and Full Service Social are either/or.
 */
function Builder() {
  const [picked, setPicked] = useState<AddonId[]>([]);

  const toggle = (id: AddonId) =>
    setPicked((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      const rival = id === "content" ? "social" : id === "social" ? "content" : null;
      return [...cur.filter((x) => x !== rival), id];
    });

  const listTotal = aLaCarte(picked);

  // Checkout always takes the cheapest route to the same picks: a bundle plus
  // whatever it doesn't cover, when that beats buying the pieces one by one.
  // Own the Market's Full Service Social covers a Content Crew pick too.
  let best: { plan: "site" | keyof typeof BUNDLES; name: string; price: number; extras: AddonId[] } = {
    plan: "site",
    name: BASE.name,
    price: listTotal,
    extras: picked,
  };
  for (const [id, b] of Object.entries(BUNDLES) as [keyof typeof BUNDLES, (typeof BUNDLES)[keyof typeof BUNDLES]][]) {
    const covered = (a: AddonId) => b.covers.includes(a) || (a === "content" && b.covers.includes("social"));
    const extras = picked.filter((a) => !covered(a));
    const price = b.price + extras.reduce((sum, a) => sum + addonPrice(a), 0);
    if (price < best.price) best = { plan: id, name: b.name, price, extras };
  }
  const bundled = best.plan !== "site";
  const extrasNames = best.extras.map((a) => ADDONS.find((x) => x.id === a)!.name);
  const checkout = `/api/checkout?plan=${best.plan}${best.extras.length ? `&add=${best.extras.join(",")}` : ""}`;

  return (
    <div className="rg-build">
      <p className="rg-build-kicker">Add the hats you want handed off</p>
      <ul className="rg-build-list">
        {ADDONS.map((a) => {
          const on = picked.includes(a.id);
          return (
            <li key={a.id}>
              <label className={`rg-addon${on ? " is-on" : ""}`}>
                <input type="checkbox" checked={on} onChange={() => toggle(a.id)} />
                <span className="rg-addon-box" aria-hidden="true">✓</span>
                <span className="rg-addon-body">
                  <span className="rg-addon-name">{a.name}</span>
                  <span className="rg-addon-text">{a.text}</span>
                </span>
                <span className="rg-addon-price">+{money(a.price)}/mo</span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="rg-build-total" aria-live="polite">
        <p className="rg-build-total-label">
          {bundled
            ? `${best.name}${extrasNames.length ? ` + ${extrasNames.join(" + ")}` : ""}`
            : `Your website${picked.length > 0 ? ` + ${picked.length} add-on${picked.length === 1 ? "" : "s"}` : ""}`}
        </p>
        <p className="rg-display rg-build-total-num">
          {bundled && <s>{money(listTotal)}</s>}
          {money(best.price)}
          <span>/mo</span>
        </p>
        <p className="rg-build-total-note">
          {bundled ? "No build fee · month-to-month" : `+ ${money(BASE.buildFee)} one-time build fee · month-to-month`}
        </p>
        {bundled && (
          <p className="rg-build-nudge">
            <strong>Bundle price applied.</strong> Your picks fit {best.name}: {money(listTotal - best.price)} less a
            month, and no {money(BASE.buildFee)} build fee.
          </p>
        )}
      </div>

      <a href={checkout} className="rg-btn rg-plan-cta rg-build-cta">
        Start for {money(best.price)}/mo <span aria-hidden="true">→</span>
      </a>
      <p className="rg-build-fine">Secure checkout · cancel anytime · site live in 8 to 10 days</p>
    </div>
  );
}

/* ------------------------- social comparison ------------------------- */

type Cell = string | { t: string; hl: true };

function SocialCompare() {
  const rows: { label: string; cells: Cell[] }[] = [
    { label: "Content calendar", cells: ["✓", "✓"] },
    { label: "Reels per week", cells: ["1", "2"] },
    { label: "Static posts per week", cells: ["—", "1"] },
    { label: "Stories", cells: ["From your content", "Unlimited"] },
    { label: "Who shoots?", cells: ["You", "You + monthly on-site shoot"] },
    { label: "Who edits?", cells: [{ t: "We do", hl: true }, { t: "We do", hl: true }] },
    { label: "Who posts?", cells: ["You", { t: "We do", hl: true }] },
    { label: "DMs & lead messages", cells: ["—", { t: "We answer", hl: true }] },
    { label: "Branding applied", cells: ["✓", "✓"] },
  ];

  const renderCell = (c: Cell) => {
    if (typeof c === "object") return <strong style={{ color: "var(--blue-ink)" }}>{c.t}</strong>;
    if (c === "—") return <span style={{ color: "var(--muted)" }}>—</span>;
    if (c === "✓") return <span className="rg-plan-check" aria-label="Included">✓</span>;
    return <span>{c}</span>;
  };

  return (
    <>
      <div className="rg-compare">
        <table>
          <thead>
            <tr>
              <th scope="col">Social add-ons</th>
              <th scope="col">Content Crew · {money(addonPrice("content"))}/mo</th>
              <th scope="col">Full Service Social · {money(addonPrice("social"))}/mo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.cells.map((c, j) => (
                  <td key={j}>{renderCell(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rg-plan-fine">
        Only need social? Both work on their own, no website from us required:{" "}
        <a href="https://api.rgvperformancemarketing.com/payment-link/6a2506c903b17c94f5714f73" target="_blank" rel="noopener noreferrer" className="rg-text-link">
          start Content Crew
        </a>{" "}
        or{" "}
        <a href="https://api.rgvperformancemarketing.com/payment-link/6a25076203b17c94f5714f74" target="_blank" rel="noopener noreferrer" className="rg-text-link">
          start Full Service Social
        </a>
        .
      </p>
    </>
  );
}

/* ------------------------------- main --------------------------------- */

export default function PricingPlans() {
  const { machine, market } = BUNDLES;

  return (
    <section className="rg-svc-band" style={{ background: "#fff" }}>
      <div className="rg-container">
        <div className="rg-vs rg-reveal" aria-label="What one marketing hire costs, compared with Build the Machine">
          <div className="rg-vs-side">
            <p className="rg-vs-kicker">Hire one marketing person</p>
            <p className="rg-display rg-vs-num rg-vs-num--old">$6,560<span>/mo</span></p>
            <p className="rg-vs-text">
              Median salary alone, before taxes, benefits and software. And it&rsquo;s one person
              wearing one or two hats.
            </p>
          </div>
          <span className="rg-vs-badge rg-display" aria-hidden="true">vs</span>
          <div className="rg-vs-side rg-vs-side--us">
            <p className="rg-vs-kicker">Build the Machine</p>
            <p className="rg-display rg-vs-num">{money(machine.price)}<span>/mo</span></p>
            <p className="rg-vs-text">
              A whole team wearing six hats: your website, lead inbox, SEO, Google profile, video
              editing and design. No payroll, no contract, no setup fee.
            </p>
          </div>
        </div>
        <p className="rg-vs-source">
          Salary: U.S. median pay for marketing specialists, $78,760 a year (Bureau of Labor Statistics, May 2025).
        </p>

        <SectionHead
          pill="Bundle & save"
          title="Two Bundles. Website Included."
          text="Each bundle costs less than buying the same pieces one by one, and neither has a build or setup fee."
        />
        <div className="rg-plan-grid">
          <Card
            highlighted
            ribbon={`Save ${money(savings(machine))}/mo`}
            tier="Most popular"
            name={machine.name}
            hats={["Web Designer", "Lead Inbox", "SEO Specialist", "Google Profile Manager", "Content Editor", "Social Designer"]}
            description="Your website, local SEO and Content Crew in one plan. Get found on Google and look the part on social."
            price={machine.price}
            priceNote="No build fee · no setup fee · month-to-month"
            features={[
              "Custom website, built, hosted and kept updated",
              "Every call, form and chat in one lead inbox",
              "Google Business Profile built out and kept active",
              "Local SEO: city and service pages, on-page cleanup, monthly content",
              "Content Crew: you shoot, we edit 1 reel and 1 branded creative a week, plus stories",
              "Monthly report and strategy call",
            ]}
            ctaLabel="Get Started →"
            ctaHref="/api/checkout?plan=machine"
          />
          <Card
            ribbon={`Save ${money(savings(market))}/mo`}
            tier="Full service"
            name={market.name}
            hats={["Ads Manager", "Follow-Up Specialist", "Social Media Manager", "DM Inbox", "Dedicated Strategist"]}
            extraHats
            description="Every add-on, run for you, with a dedicated strategist. For businesses ready to lead their market."
            price={market.price}
            priceNote="No build fee · no setup fee · ad spend billed by Google & Meta"
            features={[
              "Everything in Build the Machine",
              "Ads managed on Google and Meta (you fund the spend)",
              "Follow-up on autopilot: missed-call text back, email and text campaigns, reminders, after-hours chatbot",
              "Full Service Social: 2 reels and 1 post a week, unlimited stories, we post and answer DMs",
              "Monthly on-site content shoot (local clients)",
              "Dedicated account strategist and calls every two weeks",
              "Priority support",
            ]}
            ctaLabel="Get Started →"
            ctaHref="/api/checkout?plan=market"
          />
        </div>

        <SectionHead
          pill="Build your own"
          title="Start With a Website. Add the Hats You Want."
          text="Every plan starts with a website that catches leads. Add only the jobs you want off your plate, and drop them any month."
        />
        <div className="rg-plan-grid rg-plan-grid--build">
          <Card
            tier="Start here"
            name={BASE.name}
            hats={["Web Designer", "Lead Inbox"]}
            description="A site that actually catches jobs, plus one inbox for every lead."
            price={BASE.price}
            priceNote={`+ ${money(BASE.buildFee)} one-time build fee · month-to-month`}
            features={[
              "Custom site, not a template",
              "Hosting, SSL, backups, security",
              "Unlimited standard updates (hours, photos, copy, services)",
              "Every form fill, call, and chat lands in one inbox",
              "Instant ping when a new lead comes in, text and email back from your phone",
              "Mobile-first and bilingual if you need it",
              "We keep it live and patched so you don't babysit WordPress",
            ]}
            ctaLabel="Get Started →"
            ctaHref="/api/checkout?plan=site"
          />
          <Builder />
        </div>

        <SocialCompare />

        <p className="rg-plan-fine" style={{ marginTop: "var(--s7)" }}>
          All plans and add-ons are month-to-month. Ad spend is billed by Google and Meta directly. Want to see what&rsquo;s
          in each add-on?{" "}
          <Link href="/services" className="rg-text-link">
            Browse our services
          </Link>{" "}
          or{" "}
          <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="rg-text-link">
            book a free discovery call
          </a>
          .
        </p>
      </div>
    </section>
  );
}
