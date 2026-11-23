import {
  AGE_RULE,
  AGE_TOPICS,
  BEFORE_AFTER_HIGH_TOPICS,
  BEFORE_AFTER_RULE,
  PROMO_RULE,
  TEXT_RULES,
  type Severity,
  type Source,
  type Topic,
} from "./rules";

/**
 * Runs the ad checker rules. Pure and synchronous, so the page can re-run it
 * on every keystroke. Nothing leaves the browser.
 */

export type AdField = "primary" | "headline" | "description";

export const FIELD_LABEL: Record<AdField, string> = {
  primary: "Primary text",
  headline: "Headline",
  description: "Description",
};

export type AdInput = {
  primary: string;
  headline: string;
  description: string;
  topics: Topic[];
  beforeAfter: boolean;
};

export type Hit = { ruleId: string; field: AdField; start: number; end: number; text: string; severity: Severity };

export type Flag = {
  id: string;
  title: string;
  severity: Severity;
  reminder: boolean;
  reason: string;
  fix: string;
  sources: Source[];
  /** The exact words that triggered it, with where they were found. */
  matches: { field: AdField; text: string }[];
};

export type Risk = "Low" | "Medium" | "High";

export type AdReport = { risk: Risk; flags: Flag[]; hits: Hit[] };

const RANK: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
const FIELDS: AdField[] = ["primary", "headline", "description"];

function overlaps(a: { field: AdField; start: number; end: number }, b: { field: AdField; start: number; end: number }) {
  return a.field === b.field && a.start < b.end && b.start < a.end;
}

export function checkAd(input: AdInput): AdReport {
  // 1. Find every match, then keep one rule per span: a higher-severity (or,
  //    on a tie, longer) match wins, so "voted best" isn't also flagged as "best".
  const raw: Hit[] = [];
  for (const rule of TEXT_RULES) {
    for (const field of FIELDS) {
      const text = input[field];
      if (!text) continue;
      for (const re of rule.patterns) {
        for (const m of text.matchAll(re)) {
          if (!m[0] || m.index === undefined) continue;
          raw.push({ ruleId: rule.id, field, start: m.index, end: m.index + m[0].length, text: m[0], severity: rule.severity });
        }
      }
    }
  }
  raw.sort((a, b) => RANK[a.severity] - RANK[b.severity] || b.end - b.start - (a.end - a.start) || a.start - b.start);
  const hits: Hit[] = [];
  for (const h of raw) if (!hits.some((k) => overlaps(k, h))) hits.push(h);
  hits.sort((a, b) => FIELDS.indexOf(a.field) - FIELDS.indexOf(b.field) || a.start - b.start);

  // 2. One flag per text rule that matched, in rule order.
  const flags: Flag[] = [];
  for (const rule of TEXT_RULES) {
    const mine = hits.filter((h) => h.ruleId === rule.id);
    if (!mine.length) continue;
    const seen = new Set<string>();
    const matches = mine
      .filter((h) => {
        const key = `${h.field}:${h.text.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((h) => ({ field: h.field, text: h.text }));
    flags.push({ id: rule.id, title: rule.title, severity: rule.severity, reminder: false, reason: rule.reason, fix: rule.fix, sources: rule.sources, matches });
  }

  // 3. Checkbox-driven rules.
  if (input.beforeAfter) {
    const strict = input.topics.some((t) => BEFORE_AFTER_HIGH_TOPICS.includes(t));
    flags.push({ ...BEFORE_AFTER_RULE, severity: strict ? "medium" : "low", reminder: false, matches: [] });
  }
  if (input.topics.some((t) => AGE_TOPICS.includes(t)) || flags.some((f) => f.id === "prescription-drugs")) {
    flags.push({ ...AGE_RULE, reminder: true, matches: [] });
  }
  if (input.topics.includes("promo")) {
    flags.push({ ...PROMO_RULE, reminder: true, matches: [] });
  }

  flags.sort((a, b) => Number(a.reminder) - Number(b.reminder) || RANK[a.severity] - RANK[b.severity]);

  // 4. Overall risk. Reminders don't count.
  const counted = flags.filter((f) => !f.reminder);
  const n = (s: Severity) => counted.filter((f) => f.severity === s).length;
  const risk: Risk = n("high") > 0 || n("medium") >= 3 ? "High" : n("medium") > 0 || n("low") >= 2 ? "Medium" : "Low";

  return { risk, flags, hits };
}

/** Splits a field's text into plain and highlighted pieces for display. */
export function segments(text: string, hits: Hit[], field: AdField): { text: string; hit?: Hit }[] {
  const mine = hits.filter((h) => h.field === field);
  const out: { text: string; hit?: Hit }[] = [];
  let i = 0;
  for (const h of mine) {
    if (h.start > i) out.push({ text: text.slice(i, h.start) });
    out.push({ text: text.slice(h.start, h.end), hit: h });
    i = h.end;
  }
  if (i < text.length) out.push({ text: text.slice(i) });
  return out;
}
