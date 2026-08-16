/**
 * Hero visual — an illustration, not a screenshot.
 *
 * Deliberately drawn rather than captured. A real client dashboard would
 * either leak someone's contact data or, cropped and anonymised, become a
 * fabricated one. This is unmistakably a UI diagram: a stylised browser
 * showing the shape of a business site, the lead notification it produces,
 * and where that lead lands. No counts, no metrics, no invented names —
 * nothing on it can be read as a performance claim.
 *
 * Server component. Every animation is CSS on transform/opacity only (see
 * the `lp-mock-*` keyframes in globals.css), so none of it shifts layout.
 */

export default function OfferVisual() {
  return (
    <div className="lp-visual" aria-hidden="true">
      {/* ── Browser frame ───────────────────────────────────────── */}
      <div className="lp-browser">
        <div className="lp-browser-bar">
          <span className="lp-dot" style={{ background: "rgba(255,255,255,0.22)" }} />
          <span className="lp-dot" style={{ background: "rgba(255,255,255,0.16)" }} />
          <span className="lp-dot" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span className="lp-url">
            <LockGlyph />
            yourbusiness.com
          </span>
        </div>

        {/* ── The site inside it ─────────────────────────────────── */}
        <div className="lp-site">
          {/* Site header */}
          <div className="lp-site-nav">
            <span className="lp-site-mark" />
            <span className="lp-bar" style={{ width: 34 }} />
            <span className="lp-bar" style={{ width: 26 }} />
            <span className="lp-bar" style={{ width: 30 }} />
            <span className="lp-site-btn" />
          </div>

          {/* Site hero */}
          <div className="lp-site-hero">
            <span className="lp-bar lp-bar--lg" style={{ width: "72%" }} />
            <span className="lp-bar lp-bar--lg" style={{ width: "48%" }} />
            <span className="lp-bar" style={{ width: "84%", marginTop: 4 }} />
            <span className="lp-bar" style={{ width: "66%" }} />
            <span className="lp-site-cta">Get a Free Quote</span>
          </div>

          {/* Three service cards */}
          <div className="lp-site-cards">
            {[0, 1, 2].map((i) => (
              <div key={i} className="lp-site-card">
                <span className="lp-site-icon" />
                <span className="lp-bar" style={{ width: "78%" }} />
                <span className="lp-bar" style={{ width: "56%" }} />
              </div>
            ))}
          </div>

          {/* Capture form */}
          <div className="lp-site-form">
            <span className="lp-bar lp-bar--md" style={{ width: 96 }} />
            <div className="lp-site-fields">
              <span className="lp-site-field" />
              <span className="lp-site-field" />
            </div>
            <span className="lp-site-submit" />
          </div>
        </div>
      </div>

      {/* ── Lead notification, mid-flight ───────────────────────── */}
      <div className="lp-notify">
        <span className="lp-notify-ring">
          <span className="lp-notify-pulse" />
        </span>
        <div>
          <p className="lp-notify-title">New lead from your website</p>
          <p className="lp-notify-meta">Contact form · added to your CRM</p>
        </div>
      </div>

      {/* ── Where it lands ──────────────────────────────────────── */}
      <div className="lp-pipeline">
        <p className="lp-pipeline-label">Pipeline</p>
        <div className="lp-pipeline-cols">
          {["New", "Contacted", "Booked"].map((col, i) => (
            <div key={col} className="lp-pipeline-col">
              <span className="lp-pipeline-head">{col}</span>
              <span className="lp-pipeline-card" />
              {i < 2 && <span className="lp-pipeline-card lp-pipeline-card--faint" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LockGlyph() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" focusable="false">
      <rect x="2.5" y="5.2" width="7" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.3 5.2V4a1.7 1.7 0 0 1 3.4 0v1.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
