import type { EngineId, Source } from "./config";

/**
 * Calls to the AI engines. Server only.
 *
 * Only the question text (built from the city, state and treatment the
 * owner picked) goes to an engine. The spa's name and website never leave
 * our server: matching happens afterwards in match.ts.
 *
 * - OpenAI: Responses API with the web_search tool
 *   (POST https://api.openai.com/v1/responses).
 * - Perplexity: Agent API, which replaced Sonar chat completions on
 *   2026-09-27 (POST https://api.perplexity.ai/v1/agent). effort "fast" is the
 *   Sonar tier: one step, one fast web search.
 */

export const ENGINE_TIMEOUT_MS = 25_000;

const DEFAULT_OPENAI_MODEL = "gpt-6-luna";
const DEFAULT_PERPLEXITY_EFFORT = "fast";

export interface EngineAnswer {
  text: string;
  businesses: string[];
  sources: Source[];
}

const INSTRUCTIONS = [
  "A person is looking for a med spa near them and asked you the question below.",
  "Search the web, then answer the way you normally would for them. Name specific local businesses.",
  "Keep the answer under 180 words.",
  "After the answer, add one last line that starts with BUSINESSES: followed by a JSON array of the business names you named, in the order you named them.",
  'Example last line: BUSINESSES: ["First Business Name", "Second Business Name"]',
  "If you did not name any businesses, end with: BUSINESSES: []",
].join("\n");

export async function askEngine(engine: EngineId, question: string): Promise<EngineAnswer> {
  return engine === "openai" ? askOpenAI(question) : askPerplexity(question);
}

// ── OpenAI ────────────────────────────────────────────────────────────────

async function askOpenAI(question: string): Promise<EngineAnswer> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  const model = (process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL).trim();
  // Web search needs reasoning effort above "minimal" on reasoning models.
  // Set OPENAI_REASONING_EFFORT to "" (empty) for a non-reasoning model.
  const effort = process.env.OPENAI_REASONING_EFFORT ?? "low";

  const body: Record<string, unknown> = {
    model,
    instructions: INSTRUCTIONS,
    input: question,
    tools: [{ type: "web_search", search_context_size: "low", user_location: { type: "approximate", country: "US" } }],
    tool_choice: "required",
    max_tool_calls: 2,
    max_output_tokens: 2500,
    store: false,
  };
  if (effort.trim()) body.reasoning = { effort: effort.trim() };

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`openai ${res.status}`);
  const data = (await res.json()) as { output?: unknown[] };

  let text = "";
  const sources: Source[] = [];
  for (const item of arr(data.output)) {
    if (obj(item)?.type !== "message") continue;
    for (const part of arr(obj(item)?.content)) {
      const p = obj(part);
      if (p?.type !== "output_text" || typeof p.text !== "string") continue;
      text += `${p.text}\n`;
      for (const a of arr(p.annotations)) {
        const an = obj(a);
        if (an?.type === "url_citation") sources.push({ url: str(an.url), title: str(an.title) });
      }
    }
  }
  if (!text.trim()) throw new Error("openai empty answer");
  return finish(text, sources);
}

// ── Perplexity ────────────────────────────────────────────────────────────

async function askPerplexity(question: string): Promise<EngineAnswer> {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) throw new Error("PERPLEXITY_API_KEY not set");
  const body: Record<string, unknown> = {
    effort: (process.env.PERPLEXITY_EFFORT || DEFAULT_PERPLEXITY_EFFORT).trim(),
    instructions: INSTRUCTIONS,
    input: question,
    max_output_tokens: 1200,
    tools: [{ type: "web_search", max_results: 8, user_location: { country: "US" } }],
    stream: false,
  };
  // Optional: pin a model (e.g. "openai/gpt-6-luna"). Empty = the effort level's default.
  const model = (process.env.PERPLEXITY_MODEL ?? "").trim();
  if (model) body.model = model;

  const res = await fetch("https://api.perplexity.ai/v1/agent", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(ENGINE_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`perplexity ${res.status}`);
  const data = obj(await res.json()) ?? {};

  let text = "";
  const sources: Source[] = [];
  for (const item of arr(data.output)) {
    const it = obj(item);
    if (it?.type === "message") {
      for (const part of arr(it.content)) {
        const p = obj(part);
        if (p?.type === "output_text" && typeof p.text === "string") text += `${p.text}\n`;
      }
    } else if (it?.type === "search_results") {
      for (const r of arr(it.results)) {
        const rr = obj(r);
        if (rr) sources.push({ url: str(rr.url), title: str(rr.title) });
      }
    }
  }
  if (!text.trim() && typeof data.output_text === "string") text = data.output_text;
  if (!text.trim()) throw new Error("perplexity empty answer");
  return finish(text, sources);
}

// ── parsing ───────────────────────────────────────────────────────────────

function finish(raw: string, rawSources: Source[]): EngineAnswer {
  const { text, businesses } = parseBusinesses(raw);
  return { text, businesses, sources: cleanSources(rawSources) };
}

/** Pulls the BUSINESSES: [...] line off the end, or falls back to reading the list. */
export function parseBusinesses(raw: string): { text: string; businesses: string[] } {
  const idx = raw.lastIndexOf("BUSINESSES:");
  let text = raw;
  let names: string[] = [];
  if (idx >= 0) {
    text = raw.slice(0, idx);
    const tail = raw.slice(idx + "BUSINESSES:".length);
    const m = tail.match(/\[[\s\S]*?\]/);
    if (m) {
      try {
        const parsed: unknown = JSON.parse(m[0]);
        if (Array.isArray(parsed)) names = parsed.filter((x): x is string => typeof x === "string");
      } catch {
        names = m[0].slice(1, -1).split(",").map((s) => s.replace(/^\s*["']|["']\s*$/g, ""));
      }
    }
  }
  if (names.length === 0) names = fallbackNames(text);
  return { text: stripMarkers(text), businesses: dedupe(names.map((n) => tidyName(n)).filter(Boolean)).slice(0, 10) };
}

/** Bold names (**Name**) or the lead of numbered/bulleted list items. */
function fallbackNames(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(/\*\*([^*\n]{3,80})\*\*/g)) out.push(m[1]);
  if (out.length) return out;
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*(?:\d+[.)]|[-*•])\s+(.{3,80}?)(?:\s+[–—-]\s+|:|\(|$)/);
    if (m) out.push(m[1]);
  }
  return out;
}

function tidyName(s: string): string {
  return clean(stripMarkers(s).replace(/[*_#`]/g, "").replace(/\s*[,.;:]+$/, ""), 80);
}

function stripMarkers(s: string): string {
  return s.replace(/\[(?:web:)?\d+\]/g, "").replace(/【[^】]*】/g, "");
}

function cleanSources(list: Source[]): Source[] {
  const seen = new Set<string>();
  const out: Source[] = [];
  for (const s of list) {
    let u: URL;
    try {
      u = new URL(s.url);
    } catch {
      continue;
    }
    if (u.protocol !== "https:" && u.protocol !== "http:") continue;
    // OpenAI tags citation links with utm_source=openai; drop it so links read clean.
    u.searchParams.delete("utm_source");
    const href = u.toString().slice(0, 500);
    const k = href.replace(/\/$/, "");
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ url: href, title: clean(s.title, 120) || u.hostname.replace(/^www\./, "") });
    if (out.length >= 6) break;
  }
  return out;
}

function dedupe(xs: string[]): string[] {
  const seen = new Set<string>();
  return xs.filter((x) => {
    const k = x.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function clean(s: string, max: number): string {
  const t = s.replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}
function obj(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}
function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}
