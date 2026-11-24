"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { track } from "@/lib/track";
import type { CheckResult, CheckStatus, ScanReport } from "@/lib/aiVisibility/checks";

/**
 * The ScanRank form and report card. Everything shown comes back
 * from /scanrank/scan as plain strings and is rendered as React
 * text (escaped). No fetched HTML is ever inserted into the page.
 *
 * Partial gate: the score, every check's status and the "what we found"
 * line are free. The "What to do" line on each check that didn't pass
 * unlocks after the visitor sends the short form under the score.
 *
 * Unlock form, three load-bearing parts (see site-build-kit playbook 07):
 *   1. The hidden form-name must equal UNLOCK_FORM exactly, and
 *      public/__forms.html must register the same name and every field
 *      name, or Netlify drops the submission with no error.
 *   2. "company" is the honeypot. It sits off-screen, never display:none.
 *   3. Field names are the data contract for Netlify Forms. Don't rename.
 * Netlify Forms is the only capture, so the submission carries everything:
 * contact details, SMS consent, the site, the score, the checks that didn't
 * pass (readable text) and attribution. The fixes unlock once it succeeds.
 */

const UNLOCK_FORM = "scanrank-report";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

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
  // Business name as typed when the scan ran, to prefill the unlock form.
  const [scannedName, setScannedName] = useState("");
  // Stays true across re-scans in this visit once the form is sent.
  const [unlocked, setUnlocked] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/scanrank/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, businessName: name, city }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.score !== "number") {
        setError(typeof data?.error === "string" ? data.error : "Something went wrong. Try again in a minute.");
      } else {
        setReport(data as ScanReport);
        setScannedName(name.trim());
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
        <p className="avc-fine">Free. Your score shows right away with no sign-up. We read your public homepage, robots.txt, llms.txt and sitemap. The check takes about 10 seconds.</p>
      </form>

      <div aria-live="polite">
        {error && (
          <p role="alert" className="avc-error">{error}</p>
        )}
      </div>

      {report && (
        <div ref={resultRef} className="avc-report" aria-live="polite">
          <ReportCard report={report} businessName={scannedName} unlocked={unlocked} onUnlock={() => setUnlocked(true)} />
        </div>
      )}
    </div>
  );
}

function ReportCard({
  report,
  businessName,
  unlocked,
  onUnlock,
}: {
  report: ScanReport;
  businessName: string;
  unlocked: boolean;
  onUnlock: () => void;
}) {
  let host = report.finalUrl;
  try {
    host = new URL(report.finalUrl).hostname.replace(/^www\./, "");
  } catch {}
  const checks = [...report.checks].sort((a, b) => ORDER[a.status] - ORDER[b.status] || b.weight - a.weight);
  const counts = { pass: 0, warn: 0, fail: 0 };
  for (const c of report.checks) counts[c.status]++;
  const tone = report.score >= 85 ? "good" : report.score >= 65 ? "ok" : "low";
  const notPassing = checks.filter((c) => c.status !== "pass");
  // Nothing to unlock when every check passed.
  const gated = notPassing.length > 0;
  const locked = gated && !unlocked;

  return (
    <>
      <div className="avc-summary">
        <div className={`avc-score avc-score--${tone}`} role="img" aria-label={`ScanRank score ${report.score} out of 100`}>
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
      {gated && (
        <UnlockCard
          report={report}
          host={host}
          notPassing={notPassing}
          businessName={businessName}
          unlocked={unlocked}
          onUnlock={onUnlock}
        />
      )}
      <p className="avc-note">
        ScanRank checks whether AI can find and understand your site. Whether AI recommends you also depends on reviews and mentions on other sites. That&apos;s the part we help with.
      </p>

      <ol className="avc-list">
        {checks.map((c) => (
          <CheckRow key={c.id} c={c} locked={locked} />
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

function CheckRow({ c, locked }: { c: CheckResult; locked: boolean }) {
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
        {c.status !== "pass" &&
          (locked ? (
            <div className="avc-locked">
              <p className="avc-todo">
                <strong>What to do:</strong>{" "}
                {/* Placeholder only: the real fix isn't in the page until it unlocks. */}
                <span className="avc-blur" aria-hidden="true">Here is the exact change to make on your site, and where to make it.</span>
              </p>
              <button type="button" className="avc-locked-btn" onClick={focusUnlockForm}>
                <LockIcon /> Unlock the fix
              </button>
            </div>
          ) : (
            <p className="avc-todo"><strong>What to do:</strong> {c.todo}</p>
          ))}
      </div>
    </li>
  );
}

function focusUnlockForm() {
  const card = document.getElementById("avc-unlock");
  card?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => document.getElementById("avc-lead-first")?.focus({ preventScroll: true }), 400);
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

type UnlockStatus = "idle" | "sending" | "error";

/** Read once on mount (this only renders in the browser, after a scan). */
function readAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {
    landing_page: (window.location.pathname + window.location.search).slice(0, 500),
    referrer: document.referrer.slice(0, 500),
  };
  for (const k of UTM_KEYS) out[k] = (params.get(k) ?? "").slice(0, 150);
  return out;
}

function UnlockCard({
  report,
  host,
  notPassing,
  businessName,
  unlocked,
  onUnlock,
}: {
  report: ScanReport;
  host: string;
  notPassing: CheckResult[];
  businessName: string;
  unlocked: boolean;
  onUnlock: () => void;
}) {
  const [status, setStatus] = useState<UnlockStatus>("idle");
  const [attribution] = useState(readAttribution);
  const failingText = notPassing.map((c) => `${c.label}: ${STATUS_LABEL[c.status]}`).join("; ");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");

    // 1. Netlify Forms. Same post as AgentSignupForm.
    const body = new URLSearchParams();
    new FormData(form).forEach((v, k) => body.append(k, String(v)));
    // An unchecked box sends nothing, so record the "no" explicitly.
    if (!body.has("sms_consent")) body.append("sms_consent", "no");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setStatus("error");
      return;
    }

    // 2. Unlock right away and count the lead.
    track("Lead", { content_name: "ScanRank" });
    onUnlock();
  }

  if (unlocked) {
    return (
      <div id="avc-unlock" className="avc-unlock avc-unlock--done" role="status">
        <p className="avc-unlock-title rg-display">Your fix list is unlocked</p>
        <p className="avc-unlock-text">
          Your full fix list is below. Want help fixing it?{" "}
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="rg-text-link">
            Book 15 minutes with Kelsey
          </a>
          .
        </p>
      </div>
    );
  }

  const n = notPassing.length;
  return (
    <div id="avc-unlock" className="avc-unlock">
      <h3 className="avc-unlock-title rg-display">Unlock your fix list</h3>
      <p className="avc-unlock-text">
        {`See exactly how to fix the ${n} ${n === 1 ? "check" : "checks"} on ${host} that didn't pass. It's free.`}
      </p>
      <form name={UNLOCK_FORM} onSubmit={onSubmit} className="avc-lead-form">
        <input type="hidden" name="form-name" value={UNLOCK_FORM} />
        {/* Honeypot: off-screen, not display:none, so bots still fill it. */}
        <p className="avc-hp" aria-hidden="true">
          <label>
            Leave this empty <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <input type="hidden" name="website" value={report.finalUrl} />
        <input type="hidden" name="score" value={String(report.score)} />
        <input type="hidden" name="failing_checks" value={failingText} />
        <input type="hidden" name="landing_page" value={attribution.landing_page ?? ""} />
        <input type="hidden" name="referrer" value={attribution.referrer ?? ""} />
        {UTM_KEYS.map((k) => (
          <input key={k} type="hidden" name={k} value={attribution[k] ?? ""} />
        ))}

        <div className="avc-field">
          <label htmlFor="avc-lead-first" style={label}>First name</label>
          <input id="avc-lead-first" name="first_name" required maxLength={60} autoComplete="given-name" style={field} />
        </div>
        <div className="avc-field">
          <label htmlFor="avc-lead-email" style={label}>Email</label>
          <input id="avc-lead-email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck={false} style={field} />
        </div>
        <div className="avc-field">
          <label htmlFor="avc-lead-phone" style={label}>Phone <span className="avc-opt">(optional)</span></label>
          <input id="avc-lead-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" pattern="[0-9\(\)\+\-\.\s]{7,}" title="A phone number, like (956) 555-0123" style={field} />
        </div>
        <div className="avc-field">
          <label htmlFor="avc-lead-business" style={label}>Business name <span className="avc-opt">(optional)</span></label>
          <input id="avc-lead-business" name="business_name" maxLength={100} autoComplete="organization" defaultValue={businessName} style={field} />
        </div>
        <label className="avc-consent" htmlFor="avc-lead-sms">
          <input id="avc-lead-sms" name="sms_consent" type="checkbox" value="yes" />
          <span>Text me about my report (optional). Msg &amp; data rates may apply. Reply STOP to opt out.</span>
        </label>
        <button type="submit" className="rg-btn avc-submit" disabled={status === "sending"}>
          {status === "sending" ? "Unlocking…" : "Show my fix list"} {status !== "sending" && <span aria-hidden="true">→</span>}
        </button>
        {status === "error" && (
          <p role="alert" className="avc-error avc-lead-error">
            That didn&apos;t go through. Try again, or call or text us at{" "}
            <a href={`tel:${SITE.phone}`}>{SITE.phoneHuman}</a>.
          </p>
        )}
        <p className="avc-fine">
          We save your report so we can follow up if you want help. We don&apos;t sell your info. See our{" "}
          <Link href="/privacy" className="rg-text-link">privacy policy</Link>.
        </p>
      </form>
    </div>
  );
}
