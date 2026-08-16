import { Label, Section } from "@/components/home/Primitives";
import { PILLARS, SCATTERED } from "@/lib/offer";

/**
 * "More Than a Website Company" — the consolidation argument.
 *
 * The scattered-tools strip is written as the general pattern most small
 * businesses end up in, not as an assertion about what this particular
 * reader is paying for today. It earns the six pillars underneath it: the
 * same nine jobs, one partner.
 *
 * Carries #whats-included — the hero's secondary CTA lands here.
 */

const ICONS = [Globe, Board, Magnet, Bolt, Shield, Search];

export default function WhyRgvpm() {
  return (
    <Section id="whats-included" background="var(--cream)" labelledBy="why-heading">
      <div className="rg-container">
        <div style={{ maxWidth: "62ch" }}>
          <Label>Why RGVPM</Label>
          <h2
            id="why-heading"
            className="rg-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--navy)", margin: "var(--s4) 0 0" }}
          >
            More Than a Website Company.
          </h2>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.72, margin: "var(--s5) 0 0" }}>
            Most businesses end up stitching this together from separate vendors, separate logins
            and separate invoices — and the seams are where leads get lost.
          </p>
        </div>

        {/* ── The sprawl ──────────────────────────────────────── */}
        <ul className="lp-scatter" aria-label="Tools businesses typically buy separately">
          {SCATTERED.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>

        {/* Three sentences, three lines. Left to wrap on its own the middle
            break lands mid-sentence ("One system. One / place to grow."),
            which kills the cadence the line is built on. */}
        <p className="lp-scatter-verdict rg-display">
          <span>One partner.</span>
          <span>One system.</span>
          <span>One place to grow.</span>
        </p>

        {/* ── The pillars ─────────────────────────────────────── */}
        <div className="lp-pillars">
          {PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <article key={pillar.title} className="lp-pillar rg-reveal">
                <span className="lp-pillar-icon">
                  <Icon />
                </span>
                <h3 className="lp-pillar-title">{pillar.title}</h3>
                <p className="lp-pillar-text">{pillar.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ── Icons ─────────────────────────────────────────────────────────── */
const S = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" } as const;
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Globe() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" {...stroke} />
    </svg>
  );
}
function Board() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" {...stroke} />
      <path d="M9 4.5v15M15 4.5v15" {...stroke} />
    </svg>
  );
}
function Magnet() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M5 4.5h4v8a3 3 0 0 0 6 0v-8h4v8a7 7 0 0 1-14 0v-8Z" {...stroke} />
      <path d="M5 9.2h4M15 9.2h4" {...stroke} />
    </svg>
  );
}
function Bolt() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M13.4 3 5.6 13.4h5.4L10.2 21l7.9-10.4h-5.4L13.4 3Z" {...stroke} />
    </svg>
  );
}
function Shield() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <path d="M12 3.2 19 6v5.6c0 4.2-2.9 7.6-7 9.2-4.1-1.6-7-5-7-9.2V6l7-2.8Z" {...stroke} />
      <path d="m9 12 2.2 2.2L15.4 10" {...stroke} />
    </svg>
  );
}
function Search() {
  return (
    <svg {...S} aria-hidden="true" focusable="false">
      <circle cx="10.8" cy="10.8" r="6.3" {...stroke} />
      <path d="m15.4 15.4 4.1 4.1" {...stroke} />
    </svg>
  );
}
