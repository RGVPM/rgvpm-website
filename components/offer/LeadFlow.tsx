import { Label, Section } from "@/components/home/Primitives";
import { LEAD_FLOW } from "@/lib/offer";

/**
 * The core positioning section: a website is not a brochure, it's the top of
 * a pipeline. Rendered as the actual path an inquiry takes, so the reader
 * can see where their current setup drops it (usually between "form" and
 * "follow-up", in an inbox nobody checks on Saturday).
 *
 * Same sticky-heading + vertical-spine layout the homepage Process section
 * uses, so the page reads as part of the site rather than a bolted-on LP.
 */

const ICONS = [Cursor, Chat, Database, Bell, Reply, Calendar];

export default function LeadFlow() {
  return (
    <Section id="lead-flow" background="var(--cream)" labelledBy="lead-flow-heading">
      <div className="rg-container">
        <div
          className="rg-split"
          style={{
            display: "grid",
            gridTemplateColumns: "0.86fr 1.14fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          <div className="rg-sticky" style={{ position: "sticky", top: 48 }}>
            <Label>Why It Matters</Label>
            <h2
              id="lead-flow-heading"
              className="rg-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
            >
              {/* De-emphasised, but only to 0.58 — below that the blend with
                  the cream ground drops under the 3:1 WCAG floor for large
                  text, and this is a heading, not decoration. */}
              <span style={{ display: "block", opacity: 0.58 }}>
                Your website shouldn&rsquo;t just sit there.
              </span>
              <span style={{ display: "block", color: "var(--orange)" }}>
                It should catch leads.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16.5,
                color: "var(--muted)",
                lineHeight: 1.72,
                margin: "var(--s5) 0 0",
                maxWidth: "42ch",
              }}
            >
              Most small-business websites hand every inquiry to an email inbox and hope somebody
              gets to it. We connect the website and the CRM so nothing has to be remembered.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--muted)",
                lineHeight: 1.72,
                margin: "var(--s5) 0 0",
                maxWidth: "42ch",
                paddingLeft: "var(--s4)",
                borderLeft: "3px solid var(--orange)",
              }}
            >
              Every inquiry from your website can flow directly into your lead management system,
              giving you one place to track prospects, conversations and opportunities.
            </p>
          </div>

          <ol className="lp-flow" style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
            <span aria-hidden="true" className="lp-flow-spine" />
            {LEAD_FLOW.map((node, i) => {
              const Icon = ICONS[i];
              const last = i === LEAD_FLOW.length - 1;
              return (
                <li key={node.step} className="lp-flow-item rg-reveal">
                  <span className={`lp-flow-node${last ? " lp-flow-node--end" : ""}`}>
                    <Icon />
                  </span>
                  <div className="lp-flow-body">
                    <h3 className="lp-flow-title">{node.step}</h3>
                    <p className="lp-flow-note">{node.note}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ── Icons ────────────────────────────────────────────────────────────
   20px line icons at a shared 1.6 stroke so the column reads as one set. */
const S = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" } as const;
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Cursor() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M5 3.5 18.5 10 12.4 12.4 10 18.5 5 3.5Z" {...stroke} />
    </svg>
  );
}
function Chat() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M20 12.5a6.5 6.5 0 0 1-6.5 6.5H8l-4 3v-3.6A6.5 6.5 0 0 1 4.5 6h9A6.5 6.5 0 0 1 20 12.5Z" {...stroke} />
      <path d="M8.5 12.5h7" {...stroke} />
    </svg>
  );
}
function Database() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="6" rx="7" ry="2.8" {...stroke} />
      <path d="M5 6v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V6" {...stroke} />
      <path d="M5 12v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" {...stroke} />
    </svg>
  );
}
function Bell() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" {...stroke} />
      <path d="M10 18a2 2 0 0 0 4 0" {...stroke} />
    </svg>
  );
}
function Reply() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M9 5 4 10l5 5" {...stroke} />
      <path d="M4 10h8a7 7 0 0 1 7 7v2" {...stroke} />
    </svg>
  );
}
function Calendar() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.4" {...stroke} />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" {...stroke} />
      <path d="M9 15.2l2.1 2.1L15.4 13" {...stroke} />
    </svg>
  );
}
