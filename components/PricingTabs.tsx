"use client";

import { useState, type ReactNode } from "react";

const BOOKING = "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall";

type TabId = "websites" | "social" | "plans";

const TABS: { id: TabId; label: string }[] = [
  { id: "websites", label: "Websites" },
  { id: "social", label: "Social Media" },
  { id: "plans", label: "Marketing Plans" },
];

/* ----------------------------- shared card ----------------------------- */

type Cell = string | { t: string; hl: true };

interface CardProps {
  tier: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  priceNote: string;
  features: string[];
  note?: string;
  ctaLabel: string;
  ctaHref: string;
  /** The recommended plan in its tab: navy card, orange pill, blue button. */
  highlighted?: boolean;
  /** The hats this plan takes off the owner (the homepage hats). */
  hats?: string[];
  /** Hats are added on top of the previous plan's. */
  extraHats?: boolean;
}

/** "$899" + "/mo" -> "about $30 a day", so the monthly number feels as small as it is. */
function perDay(price: string, suffix?: string) {
  if (suffix !== "/mo") return null;
  const n = Number(price.replace(/[^0-9.]/g, ""));
  return n ? `About $${Math.round((n * 12) / 365)} a day` : null;
}

/**
 * One plan card. Plain plans are white with a navy outline; the highlighted
 * plan is the navy card, lifted on desktop. Styles live in globals.css
 * (`.rg-plan*`).
 */
function Card({ tier, name, description, price, priceSuffix, priceNote, features, note, ctaLabel, ctaHref, highlighted = false, hats, extraHats }: CardProps) {
  const daily = perDay(price, priceSuffix);
  return (
    <div className={`rg-plan${highlighted ? " rg-plan--hl" : ""}`}>
      <span className={`rg-pill${highlighted ? " rg-pill--orange" : ""}`}>{tier}</span>
      <h3 className="rg-display rg-plan-name">{name}</h3>
      <p className="rg-plan-desc">{description}</p>

      <div className="rg-plan-price">
        <span className="rg-display rg-plan-num">{price}</span>
        {priceSuffix && <span className="rg-plan-suffix">{priceSuffix}</span>}
      </div>
      {daily && <p className="rg-plan-daily">{daily}</p>}
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

      {note && <p className="rg-plan-note" style={{ fontStyle: "italic" }}>{note}</p>}

      <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="rg-btn rg-plan-cta">
        {ctaLabel}
      </a>
    </div>
  );
}

/* ------------------------------ tab bodies ------------------------------ */

function WebsitesTab() {
  return (
    <div className="rg-plan-grid">
      <Card
        highlighted
        tier="Site + leads"
        name="Plant the Flag"
        hats={["Web Designer", "Lead Inbox"]}
        description="A site that actually catches jobs, plus the CRM."
        price="$397"
        priceSuffix="/mo"
        priceNote="+ $499 one-time build fee · month-to-month"
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
        ctaHref="https://buy.stripe.com/7sY9ATeDa4ui3dwg7T7Zu0F"
      />
      <Card
        tier="Get found"
        name="SEO Package"
        hats={["SEO Specialist", "Google Profile Manager"]}
        extraHats
        description="Plant the Flag, then we work Google so more of the right people find you. No #1 ranking guarantee."
        price="$597"
        priceSuffix="/mo"
        priceNote="+ $499 one-time build fee · month-to-month"
        features={[
          "Everything in Plant the Flag",
          "Google Business Profile built out (photos, categories, posts)",
          "City/service pages that match how people actually search",
          "On-page + technical cleanup so Google can read the site",
          "Keyword plan vs. the shops you're losing to",
          "Monthly content that targets real Search Console queries",
          "Monthly report: what moved, what we're doing next",
        ]}
        ctaLabel="Get Started →"
        ctaHref="https://buy.stripe.com/fZu9ATgLi0e28xQbRD7Zu0G"
      />
    </div>
  );
}

function SocialTab() {
  const rows: { label: string; cells: Cell[] }[] = [
    { label: "Content calendar", cells: ["✓", "✓"] },
    { label: "Reels per week", cells: ["1", "2"] },
    { label: "Static posts per week", cells: ["—", "1"] },
    { label: "Stories", cells: ["From your content", "Unlimited"] },
    { label: "Who shoots?", cells: ["You", "You + monthly on-site shoot"] },
    { label: "Who edits?", cells: [{ t: "We do", hl: true }, { t: "We do", hl: true }] },
    { label: "Who posts?", cells: ["You", { t: "We do", hl: true }] },
    { label: "DM & lead management", cells: ["—", { t: "We do", hl: true }] },
    { label: "Branding applied", cells: ["✓", "✓"] },
  ];

  const renderCell = (c: Cell) => {
    if (typeof c === "object") return <strong style={{ color: "var(--blue-ink)" }}>{c.t}</strong>;
    if (c === "—") return <span style={{ color: "var(--muted)" }}>—</span>;
    if (c === "✓") return <span className="rg-plan-check" aria-label="Included">✓</span>;
    return <span>{c}</span>;
  };

  return (
    <div>
      <div className="rg-plan-grid">
        <Card
          tier="Most popular"
          highlighted
          name="Content Crew"
          hats={["Content Editor", "Social Designer"]}
          description="You shoot — we make it look pro."
          price="$650"
          priceSuffix="/mo"
          priceNote="month-to-month"
          features={[
            "Monthly content calendar, captions, and shot list",
            "1 edited reel per week",
            "1 branded creative per week",
            "Stories created from your content",
            "Your branding & logo applied",
            "You stay in control of posting",
          ]}
          ctaLabel="Get Started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a2506c903b17c94f5714f73"
        />
        <Card
          tier="Full service"
          name="Full Service Social"
          hats={["Social Media Manager", "DM Inbox"]}
          extraHats
          description="We run your social like an in-house team."
          price="$1,250"
          priceSuffix="/mo"
          priceNote="month-to-month"
          features={[
            "Everything in Content Crew",
            "2 reels + 1 post per week",
            "Unlimited stories",
            "Monthly on-site shoot (local clients)",
            "We post + manage your account",
            "DMs & lead messages routed to your CRM",
          ]}
          ctaLabel="Get Started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a25076203b17c94f5714f74"
        />
      </div>

      {/* comparison table */}
      <div className="rg-compare">
        <table>
          <thead>
            <tr>
              <th scope="col">Compare plans</th>
              <th scope="col">Content Crew</th>
              <th scope="col">Full Service Social</th>
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
    </div>
  );
}

function PlansTab() {
  return (
    <div>
      <p className="rg-plan-banner">
        <strong>Bundle &amp; save.</strong> These plans combine work from the other tabs at a discount, with one team
        coordinating everything.
      </p>

      <div className="rg-plan-grid">
        <Card
          tier="Most popular"
          highlighted
          name="Build the Machine"
          hats={["SEO Specialist", "Google Profile Manager", "Ads Manager", "Retention Specialist", "Content Editor", "Email & SMS Writer"]}
          description="A full digital growth engine running 24/7 — SEO, ads, automation, and lead management all working together."
          price="$899"
          priceSuffix="/mo"
          priceNote="+ $399 one-time activation fee"
          features={[
            "Google Business Profile, listings cleanup & review requests",
            "Every lead, text, and email in one inbox",
            "Monthly newsletter + a simple monthly report",
            "Local SEO (pages, Google profile depth, backlinks)",
            "Ads managed for you — Google or Meta (you fund the spend)",
            "We write & send email/SMS campaigns",
            "Social: you shoot, we edit & brand (1 reel + 1 creative + stories / week)",
            "Follow-ups on autopilot (missed-call text, sequences, reminders)",
            "Website chatbot that answers after hours",
            "Monthly strategy call",
          ]}
          ctaLabel="Get Started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a25cba371a0aa761e46375b"
        />
        <Card
          tier="Full service"
          name="Own the Market"
          hats={["Social Media Manager", "Content Shoots", "DM Inbox", "Dedicated Strategist"]}
          extraHats
          description="Dominate your category. Full-service execution across every channel with a dedicated strategist in your corner."
          price="$2,000"
          priceSuffix="/mo"
          priceNote="No activation fee"
          features={[
            "Everything in Build the Machine",
            "Ads managed on Google and Meta (you fund the spend)",
            "We run socials for you — posts + DMs (2 edited reels + 1 post + stories / week)",
            "Monthly on-site content with our content recruiter if local",
            "More automation — multi-channel nurture, lead scoring, monthly tune-up",
            "Dedicated account strategist",
            "Bi-weekly strategy calls",
            "Priority support",
          ]}
          ctaLabel="Book a Call →"
          ctaHref={BOOKING}
        />
      </div>

      <p className="rg-plan-fine">
        All plans are month-to-month. Build the Machine has a one-time activation fee; Own the Market has none. On both
        plans, ad spend is billed by Google and Meta (you fund the spend). Website design is quoted separately on these
        plans, or see the Websites tab for plans that include one.
      </p>
    </div>
  );
}

/* ------------------------------- main --------------------------------- */

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("plans");

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
            <p className="rg-display rg-vs-num">$899<span>/mo</span></p>
            <p className="rg-vs-text">
              A whole team wearing six hats: SEO, Google, ads, follow-up, content and email.
              No payroll, no contract.
            </p>
          </div>
        </div>
        <p className="rg-vs-source">
          Salary: U.S. median pay for marketing specialists, $78,760 a year (Bureau of Labor Statistics, May 2025).
        </p>

        <p className="rg-plan-intro">
          Want one service? Pick{" "}
          <button type="button" onClick={() => setActiveTab("websites")}>Websites</button> or{" "}
          <button type="button" onClick={() => setActiveTab("social")}>Social Media</button>. Want everything bundled at
          a discount? See <button type="button" onClick={() => setActiveTab("plans")}>Marketing Plans</button>.
        </p>

        {/* tab nav */}
        <div
          role="tablist"
          aria-label="Pricing categories"
          className="rg-blog-filters"
          style={{ justifyContent: "center", margin: "var(--s5) 0 0" }}
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            const i = TABS.findIndex((t) => t.id === activeTab);
            const next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length].id;
            setActiveTab(next);
            document.getElementById(`pricing-tab-${next}`)?.focus();
          }}
        >
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                id={`pricing-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`pricing-panel-${tab.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className="rg-blog-filter rg-plan-tab"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* tab content: every panel is in the server HTML (so crawlers and AI
            engines see every plan and price); inactive ones are `hidden`. */}
        <div style={{ marginTop: "var(--s7)" }}>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              id={`pricing-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`pricing-tab-${tab.id}`}
              hidden={tab.id !== activeTab}
            >
              {tab.id === "websites" && <WebsitesTab />}
              {tab.id === "social" && <SocialTab />}
              {tab.id === "plans" && <PlansTab />}
            </div>
          ))}
        </div>

        <p className="rg-plan-fine" style={{ marginTop: "var(--s7)" }}>
          Not sure which option is right for you?{" "}
          <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="rg-text-link">
            Book a free discovery call
          </a>
        </p>
      </div>

    </section>
  );
}
