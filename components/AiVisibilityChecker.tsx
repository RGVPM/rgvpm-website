"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import type { CheckResult, CheckStatus, ScanReport } from "@/lib/aiVisibility/checks";

/**
 * The AI Visibility Check form and report card. Everything shown comes back
 * from /ai-visibility-check/scan as plain strings and is rendered as React
 * text (escaped). No fetched HTML is ever inserted into the page.
 */

const STATUS_LABEL: Record<CheckStatus, string> = { pass: "Pass", warn: "Needs work", fail: "Missing" };
const STATUS_ICON: Record<CheckStatus, string> = { pass: "✓", warn: "!", fail: "✕" };
const ORDER: Record<CheckStatus, number> = { fail: 0, warn: 1, pass: 2 };

const field: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 16, // 16px stops iOS zooming into the field on focus
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "#fff",
  color: "var(--navy)",
  fontFamily: "var(--font-dm-sans), sans-serif",
};
const label: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 6 };

export default function AiVisibilityChecker() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ScanReport | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/ai-visibility-check/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, businessName: name, city }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.score !== "number") {
        setError(typeof data?.error === "string" ? data.error : "Something went wrong. Try again in a minute.");
      } else {
        setReport(data as ScanReport);
        requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    } catch {
      setError("We couldn't reach our checker. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="avc-form" noValidate>
        <div className="avc-field avc-field--url">
          <label htmlFor="avc-url" style={label}>Your website</label>
          <input
            id="avc-url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="yourmedspa.com"
            required
            maxLength={2048}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={field}
          />
        </div>
        <div className="avc-field">
          <label htmlFor="avc-name" style={label}>Business name <span className="avc-opt">(optional)</span></label>
          <input id="avc-name" name="businessName" type="text" autoComplete="organization" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} style={field} />
        </div>
        <div className="avc-field">
          <label htmlFor="avc-city" style={label}>City <span className="avc-opt">(optional)</span></label>
          <input id="avc-city" name="city" type="text" autoComplete="address-level2" placeholder="McAllen" maxLength={60} value={city} onChange={(e) => setCity(e.target.value)} style={field} />
        </div>
        <button type="submit" className="rg-btn avc-submit" disabled={busy || !url.trim()}>
          {busy ? "Checking your site…" : "Check my site"} {!busy && <span aria-hidden="true">→</span>}
        </button>
        <p className="avc-fine">Free. No email needed. We read your public homepage, robots.txt, llms.txt and sitemap. The check takes about 10 seconds.</p>
      </form>

      <div aria-live="polite">
        {error && (
          <p role="alert" className="avc-error">{error}</p>
        )}
      </div>

      {report && (
        <div ref={resultRef} className="avc-report" aria-live="polite">
          <ReportCard report={report} />
        </div>
      )}
    </div>
  );
}

function ReportCard({ report }: { report: ScanReport }) {
  let host = report.finalUrl;
  try {
    host = new URL(report.finalUrl).hostname.replace(/^www\./, "");
  } catch {}
  const checks = [...report.checks].sort((a, b) => ORDER[a.status] - ORDER[b.status] || b.weight - a.weight);
  const counts = { pass: 0, warn: 0, fail: 0 };
  for (const c of report.checks) counts[c.status]++;
  const tone = report.score >= 85 ? "good" : report.score >= 65 ? "ok" : "low";

  return (
    <>
      <div className="avc-summary">
        <div className={`avc-score avc-score--${tone}`} role="img" aria-label={`Score ${report.score} out of 100`}>
          <span className="rg-display">{report.score}</span>
          <small>/100</small>
        </div>
        <div>
          <p className="avc-host">{host}</p>
          <h2 className="rg-display avc-grade">{report.grade}</h2>
          <p className="avc-counts">
            {counts.pass} passed · {counts.warn} need work · {counts.fail} missing
          </p>
        </div>
      </div>

      <ol className="avc-list">
        {checks.map((c) => (
          <CheckRow key={c.id} c={c} />
        ))}
      </ol>

      <div className="avc-cta">
        <h3 className="rg-display">Want us to fix these for you?</h3>
        <p>
          Book a free 15-minute call. We&apos;ll go through this report with you and tell you which fixes matter most for your practice.
        </p>
        <div className="avc-cta-actions">
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-btn rg-cta-cream">
            Book a free call <span aria-hidden="true">→</span>
          </a>
          <Link href="/pricing" className="rg-btn rg-cta-ghost">See plans &amp; pricing</Link>
        </div>
      </div>
      <p className="avc-fine" style={{ marginTop: 16 }}>
        This check reads the raw HTML of your homepage, the way most AI crawlers do. It can&apos;t see content that loads later through JavaScript, and it doesn&apos;t measure rankings or reviews.
      </p>
    </>
  );
}

function CheckRow({ c }: { c: CheckResult }) {
  return (
    <li className={`avc-row avc-row--${c.status}`}>
      <span className="avc-badge" aria-hidden="true">{STATUS_ICON[c.status]}</span>
      <div className="avc-row-body">
        <div className="avc-row-head">
          <h3>{c.label}</h3>
          <span className="avc-status">
            {STATUS_LABEL[c.status]} · {c.points % 1 ? c.points.toFixed(1) : c.points}/{c.weight}
          </span>
        </div>
        <p className="avc-found">{c.found}</p>
        <p className="avc-why"><strong>Why it matters:</strong> {c.why}</p>
        {c.status !== "pass" && (
          <p className="avc-todo"><strong>What to do:</strong> {c.todo}</p>
        )}
      </div>
    </li>
  );
}
