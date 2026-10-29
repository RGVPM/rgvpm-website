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
const BASE = { name: "Plant the Flag", price: 397 };

type AddonId = "seo" | "content" | "social" | "ads";

const ADDONS: { id: AddonId; name: string; price: number; text: string }[] = [
  {
    id: "seo",
    name: "Local SEO & Google Profile",
    price: 397,
    text: "Google Business Profile built out, city and service pages, monthly content and a report.",
  },
  {
    id: "content",
    name: "Content Crew",
    price: 647,
    text: "You shoot, we edit: 1 reel and 1 branded creative a week, plus stories. You post.",
  },
  {
    id: "social",
    name: "Full Service Social",
    price: 1497,
    text: "2 reels and 1 post a week, unlimited stories, a monthly shoot. We post and answer DMs.",
  },
  {
    id: "ads",
    name: "Ads Management",
    price: 497,
    text: "Google or Meta ads built and run for you. You fund the ad spend.",
  },
];

const addonPrice = (id: AddonId) => ADDONS.find((a) => a.id === id)!.price;

/** Bundles include the website, so `covers` is the add-ons on top of it. */
const BUNDLES = {
  machine: { name: "Build the Machine", price: 997, covers: ["seo", "content"] as AddonId[] },
  market: { name: "Own the Market", price: 2497, covers: ["seo", "social", "ads"] as AddonId[] },
};

const aLaCarte = (ids: AddonId[]) => BASE.price + ids.reduce((sum, id) => sum + addonPrice(id), 0);
const savings = (b: { price: number; covers: AddonId[] }) => aLaCarte(b.covers) - b.price;

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** "$997" + "/mo" -> "about $33 a day", so the monthly number feels as small as it is. */
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
  /** Short line pinned to the top corner, e.g. "Save $444/mo". */
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

type Route = { plan: "site" | keyof typeof BUNDLES; name: string; price: number; extras: AddonId[] };

/**
 * The cheapest way to buy a set of picks: the website plus each add-on, or a
 * bundle plus whatever it doesn't cover. Own the Market's Full Service Social
 * covers a Content Crew pick too. Checkout always uses this route.
 */
function bestRoute(picked: AddonId[]): Route {
  let best: Route = { plan: "site", name: BASE.name, price: aLaCarte(picked), extras: picked };
  for (const [id, b] of Object.entries(BUNDLES) as [keyof typeof BUNDLES, (typeof BUNDLES)[keyof typeof BUNDLES]][]) {
    const covered = (a: AddonId) => b.covers.includes(a) || (a === "content" && b.covers.includes("social"));
    const extras = picked.filter((a) => !covered(a));
    const price = b.price + extras.reduce((sum, a) => sum + addonPrice(a), 0);
    if (price < best.price) best = { plan: id, name: b.name, price, extras };
  }
  return best;
}

/** Content Crew and Full Service Social are either/or: picking one drops the other. */
function withAddon(cur: AddonId[], id: AddonId): AddonId[] {
  const rival = id === "content" ? "social" : id === "social" ? "content" : null;
  return [...cur.filter((x) => x !== rival), id];
}

const addonName = (id: AddonId) => ADDONS.find((a) => a.id === id)!.name;

/**
 * Tick add-ons, see the monthly total, with the bundle price applied when
 * the picks fit one. Below the total, the one add-on that's the best deal
 * to add next ("Add Content Crew for just +$203/mo"), when adding
 * it unlocks a bundle and so costs well under its own price.
 */
function Builder() {
  const [picked, setPicked] = useState<AddonId[]>([]);
  const toggle = (id: AddonId) => setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : withAddon(cur, id)));

  const listTotal = aLaCarte(picked);
  const best = bestRoute(picked);
  const bundled = best.plan !== "site";
  const checkout = `/api/checkout?plan=${best.plan}${best.extras.length ? `&add=${best.extras.join(",")}` : ""}`;

  // Best next add-on: the biggest gap between what it normally costs and what
  // it actually adds to the total. Downgrading social isn't an upsell, so skip it.
  let upsell: { id: AddonId; delta: number; normal: number; route: Route } | null = null;
  for (const a of ADDONS) {
    if (picked.includes(a.id) || (a.id === "content" && picked.includes("social"))) continue;
    const next = withAddon(picked, a.id);
    const route = bestRoute(next);
    const delta = route.price - best.price;
    const normal = aLaCarte(next) - listTotal;
    if (normal - delta >= 100 && (!upsell || normal - delta > upsell.normal - upsell.delta)) {
      upsell = { id: a.id, delta, normal, route };
    }
  }

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
            ? `${best.name}${best.extras.length ? ` + ${best.extras.map(addonName).join(" + ")}` : ""}`
            : `Your website${picked.length > 0 ? ` + ${picked.length} add-on${picked.length === 1 ? "" : "s"}` : ""}`}
        </p>
        <p className="rg-display rg-build-total-num">
          {bundled && <s>{money(listTotal)}</s>}
          {money(best.price)}
          <span>/mo</span>
        </p>
        <p className="rg-build-total-note">No build fee · no setup fee · month-to-month</p>
        {bundled && (
          <p className="rg-build-applied">
            <strong>Bundle price applied.</strong> Your picks fit {best.name}, so you pay {money(listTotal - best.price)} less
            every month.
          </p>
        )}
        {upsell && (
          <div className="rg-build-nudge">
            <p>
              {upsell.delta < 0 ? (
                <>
                  <strong>Add {addonName(upsell.id)} and pay less.</strong> Your total drops to{" "}
                  {money(upsell.route.price)}/mo with {upsell.route.name}. It&rsquo;s free, and you save{" "}
                  {money(-upsell.delta)} a month.
                </>
              ) : upsell.delta === 0 ? (
                <>
                  <strong>Get {addonName(upsell.id)} free.</strong> It&rsquo;s included in {upsell.route.name} at the same{" "}
                  {money(upsell.route.price)}/mo you&rsquo;d pay now.
                </>
              ) : (
                <>
                  <strong>Add {addonName(upsell.id)} for just +{money(upsell.delta)}/mo</strong>, not the usual +
                  {money(upsell.normal)}. It unlocks {upsell.route.name} pricing and saves you{" "}
                  {money(upsell.normal - upsell.delta)} a month.
                </>
              )}
            </p>
            <button type="button" className="rg-build-nudge-btn" onClick={() => setPicked((cur) => withAddon(cur, upsell.id))}>
              Add it <span aria-hidden="true">+</span>
            </button>
          </div>
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
              A whole team wearing seven hats: your website, lead inbox, follow-up, SEO, Google
              profile, video editing and design. No payroll, no contract, no setup fee.
            </p>
          </div>
        </div>
        <p className="rg-vs-source">
          Salary: U.S. median pay for marketing specialists, $78,760 a year (Bureau of Labor Statistics, May 2025).
        </p>

        <SectionHead
          pill="Bundle & save"
          title="Two Bundles. Website Included."
          text="Each bundle costs less than buying the same pieces one by one. No build fee, no setup fee, cancel anytime."
        />
        <div className="rg-plan-grid">
          <Card
            highlighted
            ribbon={`Save ${money(savings(machine))}/mo`}
            tier="Most popular"
            name={machine.name}
            hats={["Web Designer", "Lead Inbox", "Follow-Up Specialist", "SEO Specialist", "Google Profile Manager", "Content Editor", "Social Designer"]}
            description="Your website, local SEO and Content Crew in one plan. Get found on Google and look the part on social."
            price={machine.price}
            priceNote="No setup fee · month-to-month"
            features={[
              "Custom website, built, hosted and kept updated",
              "Every call, form and chat in one lead inbox, with follow-up on autopilot",
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
            hats={["Ads Manager", "Social Media Manager", "DM Inbox", "Dedicated Strategist"]}
            extraHats
            description="Every add-on, run for you, with a dedicated strategist. For businesses ready to lead their market."
            price={market.price}
            priceNote="No setup fee · ad spend billed by Google & Meta"
            features={[
              "Everything in Build the Machine",
              "Ads managed on Google and Meta (you fund the spend)",
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
            hats={["Web Designer", "Lead Inbox", "Follow-Up Specialist"]}
            description="A site that actually catches jobs, plus one inbox for every lead and follow-up that runs itself."
            price={BASE.price}
            priceNote="No build fee · month-to-month"
            features={[
              "Custom site, not a template",
              "Hosting, SSL, backups, security",
              "Unlimited standard updates (hours, photos, copy, services)",
              "Every form fill, call, and chat lands in one inbox",
              "Instant ping when a new lead comes in, text and email back from your phone",
              "Follow-up on autopilot: missed-call text back, email and text campaigns, appointment reminders",
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
