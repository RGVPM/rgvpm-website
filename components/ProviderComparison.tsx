import { PROVIDERS, NOT_A_FIT, QUESTIONS_TO_ASK, AS_LISTED, CHECKED } from "@/lib/comparisons";

/**
 * Shared, server-rendered blocks for the med spa provider comparison pages.
 * Data and sourcing rules live in lib/comparisons.ts.
 */

export function ProviderTable({ caption }: { caption: string }) {
  return (
    <>
      <div className="rg-compare" style={{ maxWidth: "none" }}>
        <table style={{ minWidth: 760 }}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Provider</th>
              <th scope="col">Model</th>
              <th scope="col">Published pricing</th>
              <th scope="col">Contract</th>
              <th scope="col">Ad spend</th>
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map((p) => (
              <tr key={p.name}>
                <th scope="row">{p.isUs ? <strong style={{ color: "var(--blue-ink)" }}>{p.name}</strong> : p.name}</th>
                <td style={{ textAlign: "left" }}>{p.model}</td>
                <td style={{ textAlign: "left" }}>{p.pricing}</td>
                <td style={{ textAlign: "left" }}>{p.contract}</td>
                <td style={{ textAlign: "left" }}>{p.adSpend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginTop: 16, maxWidth: "80ch" }}>
        Competitor details are {AS_LISTED}, taken from each company&apos;s own public pages (sources below).
        Prices and terms change, so confirm with each company before you decide.
      </p>
    </>
  );
}

export function ProviderProfiles() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {PROVIDERS.map((p) => (
        <article
          key={p.name}
          id={p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          style={{
            background: "#fff",
            border: p.isUs ? "1.5px solid var(--blue)" : "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: "28px 28px 24px",
          }}
        >
          <h3 className="rg-display" style={{ fontSize: 30, color: "var(--navy)", margin: 0 }}>{p.name}</h3>
          <p style={{ fontFamily: "var(--font-dm-mono), ui-monospace, monospace", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue-ink)", margin: "8px 0 0" }}>
            {p.model}
          </p>
          <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.7, margin: "16px 0 0" }}>{p.summary}</p>
          <dl style={{ display: "grid", gap: 10, margin: "16px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--navy)" }}>
            <div><dt style={{ fontWeight: 700, display: "inline" }}>Good fit for: </dt><dd style={{ display: "inline", margin: 0 }}>{p.fits}</dd></div>
            <div><dt style={{ fontWeight: 700, display: "inline" }}>Worth weighing: </dt><dd style={{ display: "inline", margin: 0 }}>{p.tradeoffs}</dd></div>
            <div><dt style={{ fontWeight: 700, display: "inline" }}>Pricing: </dt><dd style={{ display: "inline", margin: 0 }}>{p.pricing}{p.isUs ? "." : `, ${AS_LISTED}.`}</dd></div>
          </dl>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: "14px 0 0" }}>
            Source:{" "}
            {p.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && " · "}
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="rg-text-link">{s.label}</a>
              </span>
            ))}
          </p>
        </article>
      ))}
    </div>
  );
}

export function NotAFit() {
  return (
    <ul className="rg-values" style={{ maxWidth: 820 }}>
      {NOT_A_FIT.map((n) => (
        <li key={n.title}>
          <span className="rg-handled-check" aria-hidden="true">✓</span>
          <div>
            <h3>{n.title}</h3>
            <p>{n.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function QuestionsToAsk() {
  return (
    <ol style={{ margin: 0, paddingLeft: 22, display: "grid", gap: 10, fontSize: 16, lineHeight: 1.6, color: "var(--navy)", maxWidth: "70ch" }}>
      {QUESTIONS_TO_ASK.map((q) => (
        <li key={q}>{q}</li>
      ))}
    </ol>
  );
}

export function TrademarkNote() {
  return (
    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, maxWidth: "80ch", margin: "var(--s7) 0 0" }}>
      This page is written by RGV Performance Marketing, one of the providers compared, so read it with that in mind.
      Growth99, DoctorLogic, Studio III Marketing and PatientGain are trademarks of their owners. We are not affiliated
      with any of them. Details checked {CHECKED}.
    </p>
  );
}
