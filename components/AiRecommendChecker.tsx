"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@/lib/track";
import { SITE } from "@/lib/site";
import {
  CHECK_PATH,
  ENGINE_LABEL,
  LEAD_FORM_NAME,
  MAX_TREATMENTS,
  TREATMENTS,
  US_STATES,
  type Answer,
  type CheckResult,
  type EngineId,
  type TreatmentId,
} from "@/lib/aiRecommend/config";

/**
 * Form + results for /does-chatgpt-recommend-my-med-spa. Everything shown
 * comes back from the check route as plain strings and renders as React
 * text (escaped). Source links are http(s) only, checked on the server.
 */

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

export const WHY_OTHERS = [
  { title: "More reviews", text: "AI tools read Google and other review sites. Spas with lots of recent, detailed reviews get named more." },
  { title: "Clear website info", text: "Your site should say what you do and where, in plain words. Treatment pages with your city in them help a lot." },
  { title: "Listings that match", text: "Your name, address and phone should be the same on Google, Yelp, Facebook and other directories." },
  { title: "Schema on your site", text: "Schema is code that spells out your business details. It makes your site easier for AI to read." },
  { title: "Mentions on other sites", text: "Local news, \"best of\" lists and blogs that name you give AI a reason to trust you." },
];

export default function AiRecommendChecker({ engines }: { engines: EngineId[] }) {
  const [spaName, setSpaName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [website, setWebsite] = useState("");
  const [picked, setPicked] = useState<TreatmentId[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function toggle(id: TreatmentId) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_TREATMENTS ? p : [...p, id]));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(CHECK_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaName, city, state, website, treatments: picked }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || !Array.isArray(data.questions)) {
        setError(typeof data?.error === "string" ? data.error : "Something went wrong. Try again in a minute.");
      } else {
        setResult(data as CheckResult);
        track("ViewContent", { content_name: "AI Recommend Check" });
        requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    } catch {
      setError("We couldn't reach our checker. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const ready = spaName.trim().length >= 2 && city.trim() && state;
  const engineNames = engines.map((e) => ENGINE_LABEL[e]).join(" and ");

  return (
    <div>
      <form onSubmit={onSubmit} className="avc-form" noValidate>
        <div className="avc-field avc-field--url">
          <label htmlFor="arc-name" style={label}>Med spa name</label>
          <input id="arc-name" name="spaName" type="text" autoComplete="organization" placeholder="Glow Med Spa" required maxLength={80} value={spaName} onChange={(e) => setSpaName(e.target.value)} style={field} />
        </div>
        <div className="avc-field">
          <label htmlFor="arc-city" style={label}>City</label>
          <input id="arc-city" name="city" type="text" autoComplete="address-level2" placeholder="McAllen" required maxLength={50} value={city} onChange={(e) => setCity(e.target.value)} style={field} />
        </div>
        <div className="avc-field">
          <label htmlFor="arc-state" style={label}>State</label>
          <select id="arc-state" name="state" required autoComplete="address-level1" value={state} onChange={(e) => setState(e.target.value)} style={field}>
            <option value="">Pick a state</option>
            {US_STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
        <div className="avc-field avc-field--url">
          <label htmlFor="arc-site" style={label}>Website <span className="avc-opt">(optional, helps us spot you)</span></label>
          <input id="arc-site" name="website" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="yourmedspa.com" maxLength={200} value={website} onChange={(e) => setWebsite(e.target.value)} style={field} />
        </div>
        <fieldset className="arc-treatments">
          <legend style={label}>
            Pick up to {MAX_TREATMENTS} treatments <span className="avc-opt">(optional, &quot;med spa&quot; is always included)</span>
          </legend>
          <div className="arc-chips">
            {TREATMENTS.map((t) => {
              const on = picked.includes(t.id);
              const off = !on && picked.length >= MAX_TREATMENTS;
              return (
                <label key={t.id} className={`arc-chip${on ? " is-on" : ""}${off ? " is-off" : ""}`}>
                  <input type="checkbox" checked={on} disabled={off} onChange={() => toggle(t.id)} />
                  {t.label}
                </label>
              );
            })}
          </div>
        </fieldset>
        <button type="submit" className="rg-btn avc-submit" disabled={busy || !ready}>
          {busy ? "Asking the AI tools…" : "Check my med spa"} {!busy && <span aria-hidden="true">→</span>}
        </button>
        <p className="avc-fine">
          Free. No email needed. We ask {engineNames} 3 questions a local patient would ask. It takes about 20 seconds. You get 3 checks a day.
        </p>
      </form>

      <div aria-live="polite">{error && <p role="alert" className="avc-error">{error}</p>}</div>

      {result && (
        <div ref={resultRef} className="avc-report">
          <Results r={result} />
        </div>
      )}
    </div>
  );
}

function Results({ r }: { r: CheckResult }) {
  const tone = r.total === 0 ? "low" : r.mentioned / r.total >= 0.67 ? "good" : r.mentioned > 0 ? "ok" : "low";
  const headline =
    r.mentioned === 0
      ? "AI isn't recommending you yet"
      : r.mentioned === r.total
        ? "AI recommends you every time"
        : "AI recommends you some of the time";
  const others = new Map<string, number>();
  for (const q of r.questions)
    for (const a of q.answers) if (a.status === "ok") for (const b of a.businesses) others.set(b, (others.get(b) ?? 0) + 1);

  return (
    <>
      {r.mock && (
        <p className="arc-mock" role="note">
          Preview mode: these are sample answers, not real AI results.
        </p>
      )}
      <div className="avc-summary">
        <div className={`avc-score avc-score--${tone}`} role="img" aria-label={`${r.mentioned} of ${r.total} answers mention you`}>
          <span className="rg-display">{r.mentioned}</span>
          <small>/{r.total}</small>
        </div>
        <div>
          <p className="avc-host">{r.spaName} · {r.city}, {r.state}</p>
          <h2 className="rg-display avc-grade">{headline}</h2>
          <p className="avc-counts">
            {r.mentioned} of {r.total} answers mention you.
          </p>
        </div>
      </div>
      <p className="avc-note">
        AI answers change from day to day, and from person to person. This is a snapshot of what we saw just now, not a
        promise of what every patient sees.
      </p>

      <ol className="arc-questions">
        {r.questions.map((q, i) => (
          <li key={q.id} className="arc-q">
            <p className="arc-q-label">Question {i + 1}</p>
            <h3 className="arc-q-text">&ldquo;{q.text}&rdquo;</h3>
            <div className="arc-answers">
              {q.answers.map((a) => (
                <AnswerRow key={a.engine} a={a} spaName={r.spaName} />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <section className="arc-why" aria-labelledby="arc-why-h">
        <h3 id="arc-why-h" className="rg-display">Why AI Picks the Others</h3>
        <p>
          No one can pay to be named in these answers. AI tools pick spas they can find and trust. These things help the
          most:
        </p>
        <ul>
          {WHY_OTHERS.map((w) => (
            <li key={w.title}>
              <strong>{w.title}.</strong> {w.text}
            </li>
          ))}
        </ul>
        <p>
          Check how AI reads your site with <Link href="/scanrank" className="rg-text-link">ScanRank</Link>, our free AI
          readiness score. Or see how we do <Link href="/med-spa-seo" className="rg-text-link">med spa SEO</Link>.
        </p>
        {others.size > 0 && (
          <p className="avc-fine" style={{ marginTop: 12 }}>
            Named most often: {[...others.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([n]) => n).join(", ")}.
          </p>
        )}
      </section>

      <LeadForm r={r} />
    </>
  );
}

function AnswerRow({ a, spaName }: { a: Answer; spaName: string }) {
  if (a.status === "error") {
    return (
      <div className="arc-a arc-a--error">
        <div className="arc-a-head">
          <span className="arc-engine">{a.label}</span>
          <span className="arc-verdict">No answer this time</span>
        </div>
        <p className="avc-fine">{a.label} didn&apos;t answer in time, so this one doesn&apos;t count toward your score.</p>
      </div>
    );
  }
  return (
    <div className={`arc-a ${a.mentioned ? "arc-a--yes" : "arc-a--no"}`}>
      <div className="arc-a-head">
        <span className="arc-engine">{a.label}</span>
        <span className="arc-verdict">{a.mentioned ? "Mentioned ✅" : "Not mentioned ❌"}</span>
      </div>
      {a.businesses.length > 0 ? (
        <>
          <p className="arc-sub">Spas it named</p>
          <ol className="arc-names">
            {a.businesses.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ol>
        </>
      ) : (
        <p className="arc-sub">It didn&apos;t name any spas{a.mentioned ? `, but it did mention ${spaName}` : ""}.</p>
      )}
      {a.sources.length > 0 && (
        <>
          <p className="arc-sub">Sources it cited</p>
          <ul className="arc-sources">
            {a.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="nofollow noopener noreferrer">{s.title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

type Status = "idle" | "sending" | "done" | "error";

/**
 * Optional lead form. Netlify Forms, form "ai-recommend-lead", registered by
 * public/__forms.html (Netlify can't see forms rendered by React).
 * "bot-field" is a hidden honeypot. Score and city ride along as hidden fields.
 */
function LeadForm({ r }: { r: CheckResult }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    const body = new URLSearchParams();
    new FormData(form).forEach((v, k) => body.append(k, String(v)));
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("Lead", { content_name: "AI Recommend Check" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="avc-cta" role="status">
        <h3 className="rg-display">Got it. Thank you!</h3>
        <p>We&apos;ll look at your results and reach out within one business day with a plan to get you named.</p>
      </div>
    );
  }

  return (
    <div className="avc-cta arc-lead">
      <h3 className="rg-display">Want Us to Get You Into These Answers?</h3>
      <p>Tell us how to reach you. We&apos;ll look at what the AI tools said and send you a simple plan. This part is optional.</p>
      <form name={LEAD_FORM_NAME} onSubmit={onSubmit} className="arc-lead-form" noValidate>
        <input type="hidden" name="form-name" value={LEAD_FORM_NAME} />
        <input type="hidden" name="score" value={`${r.mentioned} of ${r.total}`} />
        <input type="hidden" name="city" value={`${r.city}, ${r.state}`} />
        <p hidden>
          <label>
            Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div>
          <label htmlFor="arc-l-name">Your name</label>
          <input id="arc-l-name" name="name" required maxLength={80} autoComplete="name" style={field} />
        </div>
        <div>
          <label htmlFor="arc-l-email">Email</label>
          <input id="arc-l-email" name="email" type="email" required maxLength={120} autoComplete="email" style={field} />
        </div>
        <div>
          <label htmlFor="arc-l-phone">Phone</label>
          <input id="arc-l-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" inputMode="tel" pattern="[0-9\(\)\+\-\.\s]{7,}" title="A phone number, like (956) 555-0123" style={field} />
        </div>
        <div>
          <label htmlFor="arc-l-practice">Practice</label>
          <input id="arc-l-practice" name="practice" required maxLength={80} autoComplete="organization" defaultValue={r.spaName} style={field} />
        </div>
        <button type="submit" className="rg-btn rg-cta-cream arc-lead-btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Get my plan <span aria-hidden="true">→</span></>}
        </button>
        {status === "error" && (
          <p role="alert" className="arc-lead-error">That didn&apos;t send. Try again, or call us at {SITE.phoneHuman}.</p>
        )}
      </form>
    </div>
  );
}
