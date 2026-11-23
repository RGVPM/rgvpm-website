/**
 * Fuzzy "is this spa in the answer?" matching. Runs on the server only, on
 * text the AI engines returned. The owner's name and domain are compared
 * here and never sent to an engine.
 */

/** Words too common in med spa names to prove a match on their own. */
const GENERIC = new Set([
  "the", "a", "an", "and", "of", "at", "by", "in", "on", "for",
  "med", "medical", "medspa", "spa", "spas", "aesthetic", "aesthetics", "esthetics", "clinic", "center", "centre",
  "studio", "skin", "care", "wellness", "beauty", "laser", "lounge", "bar", "institute", "co", "company",
  "llc", "inc", "pllc", "pa", "md", "dr", "rejuvenation", "cosmetic", "cosmetics", "health", "body", "face",
]);

export function normalize(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string): string[] {
  return normalize(s).split(" ").filter(Boolean);
}

function core(s: string): string[] {
  return tokens(s).filter((t) => !GENERIC.has(t));
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

function similar(a: string, b: string): number {
  const max = Math.max(a.length, b.length);
  return max === 0 ? 0 : 1 - levenshtein(a, b) / max;
}

/** Is the distinctive part of the name long enough to match on? */
function distinctive(c: string[]): boolean {
  const joined = c.join("");
  return c.length >= 2 ? joined.length >= 5 : joined.length >= 4;
}

/** Does one named business look like the owner's spa? */
export function sameBusiness(ownerName: string, named: string): boolean {
  const a = normalize(ownerName);
  const b = normalize(named);
  if (!a || !b) return false;
  if (a === b) return true;
  const ca = core(ownerName);
  const cb = core(named);
  const compactA = a.replace(/ /g, "");
  const compactB = b.replace(/ /g, "");
  if (compactA === compactB) return true; // "Glow Med Spa" vs "Glow Medspa"
  if (a.length >= 6 && ` ${b} `.includes(` ${a} `)) return true; // "Glow Med Spa McAllen"
  if (distinctive(ca)) {
    if (!cb.length) return false;
    const ja = ca.join(" ");
    const jb = cb.join(" ");
    if (ca.length === 1) {
      // One distinctive word ("Glow Med Spa"): the rest of the name has to line
      // up too, or "Glow Aesthetics" would count as a match.
      return ja === jb && (` ${b} `.includes(` ${a} `) || ` ${a} `.includes(` ${b} `) || similar(compactA, compactB) >= 0.85);
    }
    if (ja === jb) return true;
    // "Skin Perfections" vs "Skin Perfections Med Spa & Laser"
    if (` ${jb} `.includes(` ${ja} `) || (distinctive(cb) && cb.length >= 2 && ` ${ja} `.includes(` ${jb} `))) return true;
    // Small spelling slips: "Youthful Obsession" vs "Youthful Obsessions"
    return similar(ja.replace(/ /g, ""), jb.replace(/ /g, "")) >= 0.9;
  }
  // Names that are all generic words ("The Med Spa") must match almost exactly.
  return similar(compactA, compactB) >= 0.92;
}

/** Bare hostname, lowercased, without "www.". */
export function hostOf(u: string): string {
  try {
    return new URL(u).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

export interface MatchInput {
  ownerName: string;
  /** Bare domain like "glowmedspa.com", or "" when not given. */
  ownerDomain: string;
  text: string;
  businesses: string[];
  sourceUrls: string[];
}

export function isMentioned({ ownerName, ownerDomain, text, businesses, sourceUrls }: MatchInput): boolean {
  if (businesses.some((b) => sameBusiness(ownerName, b))) return true;

  const t = ` ${normalize(text)} `;
  const full = normalize(ownerName);
  if (full.length >= 4 && t.includes(` ${full} `)) return true;
  const c = core(ownerName);
  if (distinctive(c) && c.length >= 2 && t.includes(` ${c.join(" ")} `)) return true;

  if (ownerDomain) {
    const d = ownerDomain.toLowerCase();
    if (sourceUrls.some((u) => {
      const h = hostOf(u);
      return h === d || h.endsWith(`.${d}`);
    })) return true;
    if (text.toLowerCase().includes(d)) return true;
    // "glowmedspa.com" vs a named "Glow Med Spa"
    const label = d.split(".")[0];
    if (label.length >= 5 && businesses.some((b) => normalize(b).replace(/ /g, "") === label)) return true;
  }
  return false;
}
