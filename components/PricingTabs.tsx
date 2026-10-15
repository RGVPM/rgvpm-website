"use client";

import { useState, type ReactNode } from "react";

/*
 * Live /pricing source of truth for plan facts, prices and checkout links.
 * Styled on the homepage's "Quiet Confidence" tokens (DM Sans mixed-case
 * headings, pill buttons, --orange-deep CTAs, navy-mid recommended card,
 * "Recommended" badge) so the first click from the homepage feels like the
 * same site. Bebas stays for price numerals only.
 */
const BOOKING = "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall";
const bebas = { fontFamily: "var(--font-display)" } as const;
const display = { fontFamily: "var(--font-body)", letterSpacing: "-0.03em" } as const;
const mono = { fontFamily: "var(--font-mono)" } as const;

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
  /** Editorial badge on the highlighted card ("Recommended"). */
  badge?: string;
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
  badge,
  tierClass = "text-[var(--on-dark-soft)]",
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
  checkClass = "text-[var(--teal)]",
  stacked = false,
  featureGrid = false,
  priceExtra,
}: CardProps) {
  const cardClasses = highlighted
    ? `bg-[var(--navy-mid)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(245,131,61,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]${stacked ? "" : " lg:-mt-4 lg:mb-4"}`
    : "bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.12)]";

  const cta = highlighted
    ? "bg-[var(--orange-deep)] text-white shadow-[0_8px_22px_-12px_rgba(194,73,12,0.6)] hover:bg-[#A63E0A]"
    : "text-[var(--on-dark)] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.3)] hover:shadow-[inset_0_0_0_1px_var(--on-dark)] hover:bg-white/[0.04]";

  const ctaClasses = `mt-auto flex min-h-[50px] items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--orange-on-dark)] ${cta}`;

  return (
    <div className={`relative flex flex-col rounded-[20px] p-7 transition-colors ${cardClasses}`}>
      <div className="mb-5 flex min-h-[26px] items-center justify-between gap-3">
        <span
          className={`text-[11.5px] font-medium uppercase tracking-[0.12em] ${tierClass}`}
          style={mono}
        >
          {tier}
        </span>
        {badge && (
          <span
            className="inline-flex min-h-[26px] items-center rounded-full px-[11px] text-[10.5px] font-medium uppercase tracking-[0.12em] text-[var(--on-dark)] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.32)]"
            style={mono}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-[26px] font-semibold leading-tight text-[var(--on-dark)]" style={display}>
        {name}
      </h3>

      <p className="mb-6 text-[15px] leading-relaxed text-[var(--on-dark-soft)]">{description}</p>

      <div className="mb-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-6xl leading-none text-[var(--on-dark)]" style={bebas}>
            {price}
          </span>
          {priceSuffix && <span className="text-sm text-[var(--on-dark-soft)]">{priceSuffix}</span>}
        </div>
        {savings && <div className="mt-1.5 text-xs font-semibold text-emerald-300">{savings}</div>}
        {priceExtra}
        <div className="mt-2 text-[12px] tracking-[0.06em] text-[var(--on-dark-soft)]" style={mono}>
          {priceNote}
        </div>
        {subNote && <div className="mt-1 text-[11px] text-[var(--on-dark-soft)]">{subNote}</div>}
      </div>

      <div className="mb-6 h-px bg-white/10" />

      <ul className={`mb-6 flex-1 ${featureGrid ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}`}>
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-[var(--on-dark)]/90">
            <span className={`mt-px flex-shrink-0 font-bold ${checkClass}`} aria-hidden="true">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      {note && <p className="mb-5 text-xs italic text-[var(--on-dark-soft)]">{note}</p>}

      {onCta ? (
        <button type="button" onClick={onCta} className={ctaClasses}>
          {ctaLabel}
        </button>
      ) : (
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className={ctaClasses}>
          {ctaLabel}
          <span className="sr-only"> (opens in a new tab)</span>
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
        tier="Site + leads"
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
        ctaLabel="Get started →"
        ctaHref="https://buy.stripe.com/7sY9ATeDa4ui3dwg7T7Zu0F"
      />
      <Card
        tier="Get found"
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
        ctaLabel="Get started →"
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
    if (typeof c === "object") return <span className="font-semibold text-[var(--on-dark)]">{c.t}</span>;
    if (c === "—") return <span className="text-[13px] text-[var(--on-dark-soft)]/70">Not included</span>;
    if (c === "✓")
      return (
        <span className="font-bold text-[var(--teal)]">
          ✓<span className="sr-only">Included</span>
        </span>
      );
    return <span className="text-[var(--on-dark-soft)]">{c}</span>;
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          tier="You shoot, we edit"
          badge="Recommended"
          highlighted
          name="Content Crew"
          description="You shoot, we make it look pro."
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
          ctaLabel="Get started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a2506c903b17c94f5714f73"
        />
        <Card
          tier="Full service"
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
          ctaLabel="Get started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a25076203b17c94f5714f74"
        />
      </div>

      {/* comparison table */}
      <div className="mt-10 overflow-x-auto rounded-[20px] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.12)]">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="p-4 text-left font-semibold text-[var(--on-dark-soft)]">Compare plans</th>
              <th className="p-4 text-center font-semibold text-[var(--on-dark)]">Content Crew</th>
              <th className="p-4 text-center font-semibold text-[var(--on-dark)]">Full Service Social</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-white/[0.02]" : ""}>
                <td className="border-t border-white/[0.06] p-4 font-medium text-[var(--on-dark)]">{row.label}</td>
                {row.cells.map((c, j) => (
                  <td key={j} className="border-t border-white/[0.06] p-4 text-center">
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
      <p className="mb-7 rounded-2xl bg-white/[0.03] p-4 text-center text-[15px] text-[var(--on-dark-soft)] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.1)]">
        <strong className="font-semibold text-[var(--on-dark)]">Bundle and save.</strong> These plans combine work
        from our other tabs at a discount, with one team coordinating everything.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          tier="Growth engine"
          badge="Recommended"
          highlighted
          name="Build the Machine"
          description="A full digital growth engine running 24/7: SEO, ads, automation, and lead management all working together."
          price="$899"
          priceSuffix="/mo"
          priceNote="+ $399 one-time activation fee"
          features={[
            "Google Business Profile, listings cleanup & review requests",
            "Every lead, text, and email in one inbox",
            "Monthly newsletter + a simple monthly report",
            "Local SEO (pages, Google profile depth, backlinks)",
            "Ads managed for you on Google or Meta (you fund the spend)",
            "We write & send email/SMS campaigns",
            "Social: you shoot, we edit & brand (1 reel + 1 creative + stories / week)",
            "Follow-ups on autopilot (texts, email sequences, reminders)",
            "Website chatbot that answers after hours",
            "Monthly strategy call",
          ]}
          ctaLabel="Get started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a25cba371a0aa761e46375b"
        />
        <Card
          tier="Full service"
          name="Own the Market"
          description="Dominate your category. Full-service execution across every channel with a dedicated strategist in your corner."
          price="$1,499"
          priceSuffix="/mo"
          priceNote="No activation fee"
          features={[
            "Everything in Build the Machine",
            "Ads managed on Google and Meta (you fund the spend)",
            "We run socials for you: posts + DMs (2 edited reels + 1 post + stories / week)",
            "Monthly on-site content with our content recruiter if local",
            "More automation: multi-channel nurture, lead scoring, monthly tune-up",
            "Dedicated account strategist",
            "Bi-weekly strategy calls",
            "Priority support",
          ]}
          ctaLabel="Get started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6abb6ded694b1c53da8ce2dc"
        />
      </div>

      <p className="mx-auto mt-6 max-w-[70ch] text-center text-[14px] leading-relaxed text-[var(--on-dark-soft)]">
        All plans are month-to-month. Build the Machine has a one-time activation fee; Own the Market has none. On both
        plans, ad spend is billed by Google and Meta (you fund the spend). A new website on these plans is quoted
        separately, up front, before you sign. Or see the Websites tab for plans that include one.
      </p>
    </div>
  );
}

/* ------------------------------- main --------------------------------- */

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("plans");

  return (
    <section className="bg-[#0f1c33] pb-24 pt-2 text-[var(--on-dark)]">

      <div className="mx-auto max-w-6xl px-6">
        {/* top banner */}
        <div className="rounded-2xl bg-white/[0.03] p-4 text-[15px] leading-relaxed text-[var(--on-dark-soft)] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.1)]">
          Want one specific service? Pick from{" "}
          <button type="button" onClick={() => setActiveTab("websites")} className="font-semibold text-[var(--orange-on-dark)] underline decoration-[rgba(245,131,61,0.4)] underline-offset-4 hover:text-[#FFA368] hover:decoration-current">
            Websites
          </button>
          {" "}or{" "}
          <button type="button" onClick={() => setActiveTab("social")} className="font-semibold text-[var(--orange-on-dark)] underline decoration-[rgba(245,131,61,0.4)] underline-offset-4 hover:text-[#FFA368] hover:decoration-current">
            Social Media
          </button>
          . Want everything bundled at a discount? See{" "}
          <button type="button" onClick={() => setActiveTab("plans")} className="font-semibold text-[var(--orange-on-dark)] underline decoration-[rgba(245,131,61,0.4)] underline-offset-4 hover:text-[#FFA368] hover:decoration-current">
            Marketing Plans
          </button>
          .
        </div>

        {/* page header */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.12em] text-[var(--on-dark-soft)]" style={mono}>
            Plans and pricing
          </p>
          <h1
            className="mx-auto mt-5 text-[clamp(40px,5.6vw,68px)] font-semibold leading-[1.04] text-[var(--on-dark)] [text-wrap:balance]"
            style={display}
          >
            Digital marketing pricing &amp; plans
          </h1>
          <p className="mt-5 text-[clamp(17px,1.4vw,19px)] leading-relaxed text-[var(--on-dark-soft)]">
            Transparent pricing. No long-term contracts. No hidden fees. Pick a single service or bundle everything for
            the best value.
          </p>
        </div>

        {/* tab nav */}
        <div
          role="tablist"
          aria-label="Pricing categories"
          className="mt-10 flex flex-wrap justify-center gap-3"
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
                className={`flex min-h-[46px] touch-manipulation items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--orange-on-dark)] ${
                  active
                    ? "bg-[var(--on-dark)] text-[var(--night)]"
                    : "text-[var(--on-dark-soft)] shadow-[inset_0_0_0_1px_rgba(247,244,239,0.2)] hover:text-[var(--on-dark)] hover:shadow-[inset_0_0_0_1px_var(--on-dark)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* tab content: every panel is in the server HTML (so crawlers and AI
            engines see every plan and price); inactive ones are `hidden`. */}
        <div className="mt-12">
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

        {/* page footer CTA */}
        <div className="mt-16 border-t border-white/10 pt-12 text-center">
          <p className="mb-5 text-lg text-[var(--on-dark-soft)]">
            Not sure which option is right for you? We&rsquo;ll tell you, even if it&rsquo;s the cheapest plan.
          </p>
          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-[var(--orange)] py-2 pl-7 pr-2 text-[19px] font-bold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-[var(--orange-deep)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--orange-on-dark)]"
          >
            Book a free strategy call
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15" aria-hidden="true">
              &rarr;
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

    </section>
  );
}
