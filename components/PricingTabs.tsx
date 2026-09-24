"use client";

import { useState, type ReactNode } from "react";

const BOOKING = "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall";
const bebas = { fontFamily: "'Bebas Neue', sans-serif" } as const;

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
  tierClass?: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  priceNote: string;
  savings?: string;
  subNote?: string;
  features: string[];
  note?: string;
  ctaLabel: string;
  ctaHref?: string;
  onCta?: () => void;
  highlighted?: boolean;
  checkClass?: string;
  /** Skip the column-grid lift; use for stacked full-width rows. */
  stacked?: boolean;
  /** Two-column feature list on sm+ — better for full-width cards. */
  featureGrid?: boolean;
  /** Extra price-block content (e.g. strikethrough build-fee promo). */
  priceExtra?: ReactNode;
}

function Card({
  tier,
  tierClass = "text-slate-400",
  name,
  description,
  price,
  priceSuffix,
  priceNote,
  savings,
  subNote,
  features,
  note,
  ctaLabel,
  ctaHref,
  onCta,
  highlighted = false,
  checkClass = "text-orange-500",
  stacked = false,
  featureGrid = false,
  priceExtra,
}: CardProps) {
  const cardClasses = highlighted
    ? `bg-orange-500 border border-orange-400 shadow-2xl${stacked ? "" : " lg:-mt-4 lg:mb-4"}`
    : "bg-slate-800/40 border border-slate-700";

  const cta = highlighted
    ? "bg-white text-orange-600 hover:bg-orange-50"
    : "border border-slate-600 text-white hover:border-orange-500 hover:text-orange-400";

  return (
    <div className={`flex flex-col rounded-xl p-7 transition-colors ${cardClasses}`}>
      <div
        className={`mb-5 text-[11px] font-medium uppercase tracking-[0.14em] ${
          highlighted ? "text-white/80" : tierClass
        }`}
        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
      >
        {tier}
      </div>

      <h3 className="mb-2 text-3xl tracking-wide text-white" style={bebas}>
        {name}
      </h3>

      <p className={`mb-6 text-sm leading-relaxed ${highlighted ? "text-white/90" : "text-slate-400"}`}>
        {description}
      </p>

      <div className="mb-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl leading-none text-white" style={bebas}>
            {price}
          </span>
          {priceSuffix && (
            <span className={`text-sm ${highlighted ? "text-white/80" : "text-slate-400"}`}>{priceSuffix}</span>
          )}
        </div>
        {savings && (
          <div className={`mt-1.5 text-xs font-semibold ${highlighted ? "text-emerald-100" : "text-emerald-400"}`}>
            {savings}
          </div>
        )}
        {priceExtra}
        <div className={`mt-1.5 text-xs ${highlighted ? "text-white/75" : "text-slate-500"}`}>{priceNote}</div>
        {subNote && (
          <div className={`mt-1 text-[11px] ${highlighted ? "text-white/60" : "text-slate-600"}`}>{subNote}</div>
        )}
      </div>

      <div className={`mb-6 h-px ${highlighted ? "bg-white/20" : "bg-slate-700"}`} />

      <ul className={`mb-6 flex-1 ${featureGrid ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}`}>
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2.5 text-sm leading-snug ${
              highlighted ? "text-white" : "text-slate-300"
            }`}
          >
            <span className={`mt-px flex-shrink-0 font-bold ${highlighted ? "text-white/90" : checkClass}`}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {note && (
        <p className={`mb-5 text-xs italic ${highlighted ? "text-white/80" : "text-slate-400"}`}>{note}</p>
      )}

      {onCta ? (
        <button
          type="button"
          onClick={onCta}
          className={`mt-auto flex items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-colors ${cta}`}
        >
          {ctaLabel}
        </button>
      ) : (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto flex items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-colors ${cta}`}
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}

/* ------------------------------ tab bodies ------------------------------ */

function WebsitesTab() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
      <Card
        highlighted
        tier="// Site + leads"
        name="Plant the Flag"
        description="A site that actually catches jobs, plus the CRM."
        price="$397"
        priceSuffix="/mo"
        priceNote="month-to-month"
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
        tier="// Get found"
        name="SEO Package"
        description="Plant the Flag, then we work Google so more of the right people find you. No #1 ranking guarantee."
        price="$597"
        priceSuffix="/mo"
        priceNote="month-to-month"
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
    if (typeof c === "object") return <span className="font-bold text-orange-500">{c.t}</span>;
    if (c === "—") return <span className="text-slate-600">—</span>;
    if (c === "✓") return <span className="font-bold text-orange-500">✓</span>;
    return <span className="text-slate-300">{c}</span>;
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          tier="// Most Popular"
          highlighted
          name="Content Crew"
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
          tier="// Full Service"
          name="Full Service Social"
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
      <div className="mt-10 overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/40">
              <th className="p-4 text-left font-semibold text-slate-400">Compare plans</th>
              <th className="p-4 text-center font-semibold text-orange-500">Content Crew</th>
              <th className="p-4 text-center font-semibold text-white">Full Service Social</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-slate-800/20" : ""}>
                <td className="border-t border-slate-800 p-4 font-medium text-slate-300">{row.label}</td>
                {row.cells.map((c, j) => (
                  <td key={j} className="border-t border-slate-800 p-4 text-center">
                    {renderCell(c)}
                  </td>
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
    <div className="mx-auto max-w-5xl">
      <div className="mb-7 rounded-md border border-slate-700 bg-slate-800/40 p-4 text-center text-sm text-slate-300">
        💰 Bundle &amp; save. These plans combine work from our other tabs at a discount, with one team coordinating
        everything.
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          tier="// Most Popular"
          highlighted
          name="Build the Machine"
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
          tier="// Full Service"
          name="Own the Market"
          description="Dominate your category. Full-service execution across every channel with a dedicated strategist in your corner."
          price="$2,499"
          priceSuffix="/mo"
          priceNote="No activation fee"
          features={[
            "Everything in Build the Machine",
            "Ads on Google and Meta — $750/mo ad spend included",
            "We run social for you — posts + DMs (2 edited reels + 1 post + stories / week)",
            "Monthly on-site content with our content recruiter if local",
            "More automation — multi-channel nurture, lead scoring, monthly tune-up",
            "Dedicated account strategist",
            "Bi-weekly strategy calls",
            "Priority support",
          ]}
          ctaLabel="Get Started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a25c95c03b17c94f571507c"
        />
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        All plans are month-to-month. Build the Machine has a one-time activation fee; Own the Market has none. On Build
        the Machine, ad spend is billed by Google and Meta (you fund the spend). On Own the Market, $750/mo ad spend is
        included; additional spend is billed separately. Website design is quoted separately on these plans, or see the
        Websites tab for plans that include one.
      </p>
    </div>
  );
}

/* ------------------------------- main --------------------------------- */

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("plans");

  return (
    <section className="bg-[#0f1c33] pb-24 pt-2">

      <div className="mx-auto max-w-6xl px-6">
        {/* top banner */}
        <div className="rounded-md border border-slate-700 bg-slate-800/40 p-4 text-sm leading-relaxed text-slate-300">
          Want one specific service? Pick from{" "}
          <button type="button" onClick={() => setActiveTab("websites")} className="font-semibold text-orange-500 underline underline-offset-2 hover:text-orange-400">
            Websites
          </button>
          {" "}or{" "}
          <button type="button" onClick={() => setActiveTab("social")} className="font-semibold text-orange-500 underline underline-offset-2 hover:text-orange-400">
            Social Media
          </button>
          . Want everything bundled at a discount? See{" "}
          <button type="button" onClick={() => setActiveTab("plans")} className="font-semibold text-orange-500 underline underline-offset-2 hover:text-orange-400">
            Marketing Plans
          </button>
          .
        </div>

        {/* page header */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <div className="inline-block rounded-md border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-orange-500">
            // PLANS &amp; PRICING
          </div>
          <h1 className="mx-auto mt-4 text-5xl uppercase leading-none tracking-wide text-white md:text-6xl" style={bebas}>
            Digital Marketing Pricing &amp; Plans
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Transparent pricing. No long-term contracts. No hidden fees. Pick a single service or bundle everything for
            the best value.
          </p>
        </div>

        {/* tab nav */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={active}
                className={`flex min-h-[44px] touch-manipulation items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-orange-500 text-white"
                    : "border border-slate-700 bg-slate-800/40 text-slate-300 hover:border-orange-500/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* tab content */}
        <div className="mt-12">
          {activeTab === "websites" && <WebsitesTab />}
          {activeTab === "social" && <SocialTab />}
          {activeTab === "plans" && <PlansTab />}
        </div>

        {/* page footer CTA */}
        <div className="mt-16 border-t border-slate-800 pt-12 text-center">
          <p className="mb-5 text-lg text-slate-300">Not sure which option is right for you?</p>
          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
          >
            Book a Free Discovery Call →
          </a>
        </div>
      </div>

    </section>
  );
}
