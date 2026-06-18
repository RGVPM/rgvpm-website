"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const BOOKING = "https://api.rgvperformancemarketing.com/widget/bookings/rgvpmdiscoverycall";
const bebas = { fontFamily: "'Bebas Neue', sans-serif" } as const;

type TabId = "websites" | "social" | "plans" | "ai";

const TABS: { id: TabId; label: string }[] = [
  { id: "websites", label: "Websites" },
  { id: "social", label: "Social Media" },
  { id: "plans", label: "Marketing Plans" },
  { id: "ai", label: "AI & Automation" },
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
}: CardProps) {
  const cardClasses = highlighted
    ? "bg-orange-500 border border-orange-400 shadow-2xl lg:-mt-4 lg:mb-4"
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
        <div className={`mt-1.5 text-xs ${highlighted ? "text-white/75" : "text-slate-500"}`}>{priceNote}</div>
        {subNote && (
          <div className={`mt-1 text-[11px] ${highlighted ? "text-white/60" : "text-slate-600"}`}>{subNote}</div>
        )}
      </div>

      <div className={`mb-6 h-px ${highlighted ? "bg-white/20" : "bg-slate-700"}`} />

      <ul className="mb-6 flex-1 space-y-3">
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

function WebsitesTab({ onQuote }: { onQuote: () => void }) {
  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col rounded-xl border border-slate-700 bg-slate-800/40 p-7 md:p-9">
        <div
          className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          // BUILD + MAINTAIN
        </div>

        <h3 className="mb-2 text-3xl tracking-wide text-white" style={bebas}>
          Custom Website + Hosting
        </h3>

        <p className="mb-7 text-sm leading-relaxed text-slate-400">
          A fast, modern site built from scratch around your business — then we host it, secure it, and update it
          whenever you need.
        </p>

        {/* pricing display */}
        <div className="mb-7">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold leading-none text-white">From $1,000</span>
            <span className="text-xl font-normal text-slate-400">/build</span>
          </div>
          <div className="mt-2 text-sm text-slate-400">
            One-time fee · Range: $1,000–$3,500 based on scope
          </div>

          <div className="my-4 border-t border-slate-700" />

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold leading-none text-white">+ $397</span>
            <span className="text-lg font-normal text-slate-400">/mo</span>
          </div>
          <div className="mt-2 text-sm text-slate-400">Hosting &amp; unlimited updates · month-to-month</div>
        </div>

        <ul className="mb-7 grid gap-3 sm:grid-cols-2">
          {[
            "Custom design (no templates)",
            "Mobile-first & blazing fast",
            "SEO foundations baked in",
            "Lead capture wired to CRM",
            "Bilingual (EN/ES) available",
            "Reliable hosting + SSL",
            "Unlimited content updates after launch",
            "Backups & uptime monitoring",
            "Security patches & maintenance",
            "24-hour support response",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-slate-300">
              <span className="mt-px flex-shrink-0 font-bold text-orange-500">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onQuote}
          className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
        >
          Get a Custom Quote →
        </button>
      </div>

      {/* SEO add-on banner */}
      <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-500/5 p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div
              className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-orange-500"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              // Add-On
            </div>
            <h3 className="text-2xl tracking-wide text-white" style={bebas}>
              SEO Add-On
            </h3>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl leading-none text-white" style={bebas}>
              +$500
            </span>
            <span className="text-sm text-slate-400">/mo</span>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "New SEO pages added monthly",
            "Google Business Profile buildout",
            "Backlink outreach",
            "Keyword tracking & reporting",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="mt-px flex-shrink-0 font-bold text-orange-500">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already on a Marketing Plan? Light SEO is included — this add-on layers on deeper work.
      </p>
    </div>
  );
}

function SocialTab() {
  const rows: { label: string; cells: Cell[] }[] = [
    { label: "Content calendar", cells: ["✓", "✓", "✓"] },
    { label: "Reels per week", cells: ["—", "1", "2"] },
    { label: "Static posts per week", cells: ["—", "—", "1"] },
    { label: "Stories", cells: ["—", "From your content", "Unlimited"] },
    { label: "Who shoots?", cells: ["You", "You", "You + monthly on-site shoot"] },
    { label: "Who edits?", cells: ["You", { t: "We do", hl: true }, { t: "We do", hl: true }] },
    { label: "Who posts?", cells: ["You", "You", { t: "We do", hl: true }] },
    { label: "DM & lead management", cells: ["—", "—", { t: "We do", hl: true }] },
    { label: "Branding applied", cells: ["—", "✓", "✓"] },
  ];

  const renderCell = (c: Cell) => {
    if (typeof c === "object") return <span className="font-bold text-orange-500">{c.t}</span>;
    if (c === "—") return <span className="text-slate-600">—</span>;
    if (c === "✓") return <span className="font-bold text-orange-500">✓</span>;
    return <span className="text-slate-300">{c}</span>;
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          tier="// You Run It"
          tierClass="text-emerald-400"
          checkClass="text-emerald-400"
          name="Content Calendar"
          description="You shoot, edit, and post — we plan."
          price="$150"
          priceSuffix="/mo"
          priceNote="month-to-month"
          features={[
            "Monthly content calendar",
            "Themes & captions written for you",
            "Shot list (what to record)",
            "Talk tracks for video content",
            "Bilingual (EN/ES) available",
          ]}
          ctaLabel="Get Started →"
          ctaHref="https://api.rgvperformancemarketing.com/payment-link/6a25065171a0aa761e463688"
        />
        <Card
          tier="// Most Popular"
          highlighted
          name="Content Crew"
          description="You shoot — we make it look pro."
          price="$650"
          priceSuffix="/mo"
          priceNote="month-to-month"
          features={[
            "Everything in Content Calendar",
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
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/40">
              <th className="p-4 text-left font-semibold text-slate-400">Compare plans</th>
              <th className="p-4 text-center font-semibold text-white">Content Calendar</th>
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
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const annual = billingCycle === "annual";

  return (
    <div>
      {/* billing toggle */}
      <div className="mb-7 flex flex-col items-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/40 p-1">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            aria-pressed={!annual}
            className={`flex min-h-[44px] touch-manipulation items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              !annual ? "bg-orange-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            aria-pressed={annual}
            className={`flex min-h-[44px] touch-manipulation items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              annual ? "bg-orange-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Annual
            <span
              className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                annual ? "bg-white/20 text-white" : "bg-emerald-400/15 text-emerald-400"
              }`}
            >
              Save up to 20%
            </span>
          </button>
        </div>
        {annual && (
          <p className="mt-3 text-xs italic text-slate-400">
            Annual contracts are billed monthly with a 12-month commitment.
          </p>
        )}
      </div>

      <div className="mb-7 rounded-md border border-slate-700 bg-slate-800/40 p-4 text-center text-sm text-slate-300">
        💰 Bundle &amp; save. These plans combine work from our other tabs at a discount, with one team coordinating
        everything.
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          tier="// Starter"
          tierClass="text-emerald-400"
          checkClass="text-emerald-400"
          name="Plant the Flag"
          description="Get your digital foundation locked in. Show up where customers are searching and stay in front of the ones you already have."
          price={annual ? "$333" : "$399"}
          priceSuffix="/mo"
          savings={annual ? "Save $1,191 your first year" : undefined}
          priceNote={annual ? "No activation fee" : "+ $399 one-time activation fee"}
          subNote={annual ? "Annual contract · billed monthly" : undefined}
          features={[
            "Google Business Profile setup & optimization",
            "NAP audit & citation consistency",
            "Review request automation",
            "Basic lead capture form (on your existing site)",
            "Two-way SMS & email inbox",
            "Email & SMS blast tool (DIY send to your list)",
            "Monthly newsletter (we write & send)",
            "Content Calendar social — themes, captions, shot lists (you shoot & post)",
            "Access to scheduling tool",
            "Monthly snapshot report",
          ]}
          ctaLabel="Get Started →"
          ctaHref={
            annual
              ? "https://api.rgvperformancemarketing.com/payment-link/6a25c9dc03b17c94f571507d"
              : "https://api.rgvperformancemarketing.com/payment-link/6a25cb6303b17c94f5715080"
          }
        />
        <Card
          tier="// Most Popular"
          highlighted
          name="Build the Machine"
          description="A full digital growth engine running 24/7 — SEO, ads, automation, and lead management all working together."
          price={annual ? "$749" : "$899"}
          priceSuffix="/mo"
          savings={annual ? "Save $2,199 your first year" : undefined}
          priceNote={annual ? "No activation fee" : "+ $399 one-time activation fee"}
          subNote={annual ? "Annual contract · billed monthly" : undefined}
          features={[
            "Everything in Plant the Flag",
            "Real local SEO (pages, GBP buildout, backlinks)",
            "Paid ad management (Google OR Meta) — ad spend billed separately by platform",
            "Email & SMS broadcast campaigns (we write & send)",
            "Content Crew social — you shoot, we edit + brand (1 reel + 1 creative + stories per week)",
            "Lead automation (missed call text-back, follow-up sequences, appointment reminders)",
            "Lead pipeline dashboard",
            "AI chatbot on your website",
            "Monthly strategy calls",
          ]}
          ctaLabel="Get Started →"
          ctaHref={
            annual
              ? "https://api.rgvperformancemarketing.com/payment-link/6a25ca5371a0aa761e463757"
              : "https://api.rgvperformancemarketing.com/payment-link/6a25cba371a0aa761e46375b"
          }
        />
        <Card
          tier="// Full Service"
          name="Own the Market"
          description="Dominate your category. Full-service execution across every channel with a dedicated strategist in your corner."
          price={annual ? "$1,999" : "$2,499"}
          priceSuffix="/mo"
          savings={annual ? "Save $6,000/year" : undefined}
          priceNote="No activation fee"
          subNote={annual ? "Annual contract · billed monthly" : undefined}
          features={[
            "Everything in Build the Machine",
            "Multi-platform ads (Google + Meta) — ad spend billed separately by each platform",
            "Full Service Social — we run your account, post for you, manage DMs (2 reels + 1 post + unlimited stories per week + monthly on-site shoot for local clients)",
            "Advanced AI automation suite (up to 5 workflows, multi-channel nurture, lead scoring, monthly tune-up)",
            "Dedicated account strategist",
            "Bi-weekly strategy calls",
            "Monthly 1-hour session with our content creator",
            "Priority support — same-day response",
          ]}
          ctaLabel="Get Started →"
          ctaHref={
            annual
              ? "https://api.rgvperformancemarketing.com/payment-link/6a25caa571a0aa761e463758"
              : "https://api.rgvperformancemarketing.com/payment-link/6a25c95c03b17c94f571507c"
          }
        />
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        All plans are month-to-month or 12-month annual contracts. Ad spend (Google/Meta) is billed directly by the
        platforms.
      </p>
    </div>
  );
}

function AiTab() {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          tier="// Starter"
          tierClass="text-emerald-400"
          checkClass="text-emerald-400"
          name="Automate"
          description="Plug the leaky bucket. Stop losing leads to missed calls and slow follow-up."
          price="$497"
          priceSuffix="setup"
          priceNote="+ $147/mo"
          features={[
            "Missed call text-back",
            "Lead follow-up (SMS + email when a form is filled)",
            "Review request automation after appointments",
            "SMS appointment reminders",
            "1 workflow built & maintained",
          ]}
          ctaLabel="Get Started →"
          ctaHref={BOOKING}
        />
        <Card
          tier="// Most Popular"
          highlighted
          name="Accelerate"
          description="Build a real lead-to-customer system. Multi-channel, multi-workflow, working in the background."
          price="$997"
          priceSuffix="setup"
          priceNote="+ $347/mo"
          features={[
            "Everything in Automate",
            "Up to 5 automation workflows",
            "Multi-channel nurture (SMS + email + DMs)",
            "Lead scoring & pipeline routing",
            "AI chatbot on your website",
            "Monthly automation tune-up",
          ]}
          ctaLabel="Get Started →"
          ctaHref={BOOKING}
        />
        <Card
          tier="// Custom"
          name="Dominate"
          description="For businesses ready to replace whole roles with AI agents and voice assistants."
          price="$1,997+"
          priceSuffix="setup"
          priceNote="Starting setup + custom monthly"
          features={[
            "Everything in Accelerate",
            'Voice AI agent ("Pam") — answers calls 24/7',
            "Custom AI agent trained on your business",
            "Full ops automation",
            "Custom integrations with your existing tools",
            "Dedicated automation engineer",
          ]}
          ctaLabel="Request a Quote →"
          ctaHref={BOOKING}
        />
      </div>

      {/* Skool community callout */}
      <div className="mt-8 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-8 text-center">
        <div
          className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-400"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          // Learn it yourself
        </div>
        <h3 className="mb-3 text-3xl tracking-wide text-white" style={bebas}>
          Want to learn AI for your business?
        </h3>
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-slate-300">
          Join our community where small business owners learn how to use AI to save time, get leads, and grow — no
          tech background required.
        </p>
        <a
          href="https://www.skool.com/ai-for-small-businesses-6465/about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-emerald-300"
        >
          Join the Community →
        </a>
      </div>
    </div>
  );
}

/* ------------------------------- modal -------------------------------- */

function QuoteModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-700 bg-[#0f1c33]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Web Design Interest"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xl text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        >
          ×
        </button>
        <div className="p-5 pt-12">
          <iframe
            src="https://api.rgvperformancemarketing.com/widget/form/W4okHNYC7NqGmLm9tcA0"
            style={{ display: "block", width: "100%", height: "600px", border: "none", borderRadius: "8px" }}
            id="inline-W4okHNYC7NqGmLm9tcA0"
            data-form-name="Web Design Interest"
            data-form-id="W4okHNYC7NqGmLm9tcA0"
            title="Web Design Interest"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- main --------------------------------- */

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("plans");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <section className="bg-[#0f1c33] pb-24 pt-2">
      <Script src="https://api.rgvperformancemarketing.com/js/form_embed.js" strategy="afterInteractive" />

      <div className="mx-auto max-w-6xl px-6">
        {/* top banner */}
        <div className="rounded-md border border-slate-700 bg-slate-800/40 p-4 text-sm leading-relaxed text-slate-300">
          Want one specific service? Pick from{" "}
          <button type="button" onClick={() => setActiveTab("websites")} className="font-semibold text-orange-500 underline underline-offset-2 hover:text-orange-400">
            Websites
          </button>
          ,{" "}
          <button type="button" onClick={() => setActiveTab("social")} className="font-semibold text-orange-500 underline underline-offset-2 hover:text-orange-400">
            Social Media
          </button>
          , or{" "}
          <button type="button" onClick={() => setActiveTab("ai")} className="font-semibold text-orange-500 underline underline-offset-2 hover:text-orange-400">
            AI &amp; Automation
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
          {activeTab === "websites" && <WebsitesTab onQuote={() => setQuoteModalOpen(true)} />}
          {activeTab === "social" && <SocialTab />}
          {activeTab === "plans" && <PlansTab />}
          {activeTab === "ai" && <AiTab />}
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

      {quoteModalOpen && <QuoteModal onClose={() => setQuoteModalOpen(false)} />}
    </section>
  );
}
