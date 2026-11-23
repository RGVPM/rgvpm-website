import { enabledEngines, mockMode, MAX_TREATMENTS, TREATMENTS, US_STATES, type TreatmentId } from "@/lib/aiRecommend/config";
import { runCheck } from "@/lib/aiRecommend/check";
import { clean } from "@/lib/aiRecommend/engines";
import { takeCheck } from "@/lib/aiRecommend/limits";

/**
 * POST /does-chatgpt-recommend-my-med-spa/check
 *   { spaName, city, state, website?, treatments?: string[] }
 *
 * Asks each enabled AI engine (OpenAI web search, Perplexity) 3 questions a
 * local patient would ask, then checks each answer for the owner's spa.
 * Lives outside app/api on purpose, like /scanrank/scan.
 *
 * Safety:
 * - Inputs are validated, trimmed and length-capped. City and state are the
 *   only user input that reaches an engine, and only inside the question text.
 *   The spa name and website are used for matching on our server only. We
 *   never fetch the website.
 * - Per-IP (3/day) and global (DAILY_CHECK_CAP, default 150/day) counters in
 *   Netlify Blobs. See lib/aiRecommend/limits.ts.
 * - Engines run in parallel, each with a 25s timeout.
 * - Nothing the visitor typed is logged or stored.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 45;

function clientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-nf-client-connection-ip") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown"
  ).slice(0, 64);
}

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
      ...extra,
    },
  });
}

const fail = (error: string, status: number, extra?: Record<string, string>) => json({ error }, status, extra);

const STATE_BY_KEY = new Map<string, string>();
for (const [code, name] of US_STATES) {
  STATE_BY_KEY.set(code.toLowerCase(), name);
  STATE_BY_KEY.set(name.toLowerCase(), name);
}

/** Letters (any language), spaces, periods, hyphens and apostrophes. */
const CITY_RE = /^[\p{L}][\p{L} .'’-]{0,49}$/u;

function parseDomain(raw: unknown): string | null {
  if (raw === undefined || raw === null || raw === "") return "";
  if (typeof raw !== "string") return null;
  let s = raw.trim();
  if (!s) return "";
  if (s.length > 200 || /\s/.test(s)) return null;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    if (!/^(?=.{4,100}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/.test(host)) return null;
    return host;
  } catch {
    return null;
  }
}

export async function GET() {
  const engines = enabledEngines();
  return json({ available: engines.length > 0, engines, mock: mockMode() });
}

export async function POST(req: Request) {
  const engines = enabledEngines();
  const mock = mockMode();
  if (engines.length === 0) return fail("This tool is coming soon. Check back shortly.", 503);

  if (!(req.headers.get("content-type") ?? "").toLowerCase().includes("application/json")) {
    return fail("Send the request as JSON.", 415);
  }
  if (Number(req.headers.get("content-length") ?? "0") > 2048) return fail("Request too large.", 413);

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 2048) return fail("Request too large.", 413);
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("We couldn't read that request.", 400);
  }

  const spaName = typeof body.spaName === "string" ? clean(body.spaName, 81) : "";
  if (spaName.length < 2) return fail("Enter your med spa's name.", 400);
  if (spaName.length > 80) return fail("That name is too long. Use 80 characters or less.", 400);

  const city = typeof body.city === "string" ? clean(body.city, 51) : "";
  if (!city) return fail("Enter your city.", 400);
  if (!CITY_RE.test(city)) return fail("Enter just the city name, like McAllen.", 400);

  const state = typeof body.state === "string" ? STATE_BY_KEY.get(body.state.trim().toLowerCase()) : undefined;
  if (!state) return fail("Pick your state.", 400);

  const domain = parseDomain(body.website);
  if (domain === null) return fail("That website doesn't look right. Try something like yourmedspa.com.", 400);

  const rawT = Array.isArray(body.treatments) ? body.treatments : [];
  if (rawT.length > MAX_TREATMENTS) return fail(`Pick up to ${MAX_TREATMENTS} treatments.`, 400);
  const treatments: TreatmentId[] = [];
  for (const t of rawT) {
    const hit = TREATMENTS.find((x) => x.id === t);
    if (!hit) return fail("Pick treatments from the list.", 400);
    if (!treatments.includes(hit.id)) treatments.push(hit.id);
  }

  const taken = await takeCheck(clientIp(req), { mock });
  const debug = { "X-Limit-Store": taken.via };
  if (taken.result === "ip") return fail("You've used your 3 free checks for today. Come back tomorrow.", 429, debug);
  if (taken.result === "cap") return fail("We've hit today's limit for free checks. Please try again tomorrow.", 429, debug);
  if (taken.result === "unavailable") return fail("The checker is busy right now. Try again in a few minutes.", 503, debug);

  try {
    const result = await runCheck({ spaName, city, state, domain, treatments }, engines, mock);
    if (result.total === 0) return fail("The AI tools didn't answer in time. Try again in a few minutes.", 502, debug);
    return json(result, 200, debug);
  } catch (e) {
    console.error("ai-recommend check failed", e instanceof Error ? e.name : "error");
    return fail("Something went wrong. Try again in a minute.", 500, debug);
  }
}
