import { runScan, clean } from "@/lib/aiVisibility/scan";
import { BlockedUrlError, FetchFailedError, assertPublicUrl } from "@/lib/aiVisibility/safeFetch";

/**
 * POST /scanrank/scan  { url, businessName?, city? }
 *
 * Backs ScanRank, the free AI readiness score. Lives outside app/api on purpose
 * (app/api/** is off-limits per brain/sites.json). Runs on the Node runtime
 * because the scanner needs node:dns and node:https for its SSRF guard.
 * Returns JSON facts only; fetched HTML never leaves the server.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

// ── per-IP rate limit (in memory, per function instance) ───────────────────
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v[v.length - 1] < now - WINDOW_MS) hits.delete(k);
  }
  const list = (hits.get(ip) ?? []).filter((t) => t > now - WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

function clientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-nf-client-connection-ip") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown"
  ).slice(0, 64);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}

const fail = (error: string, status: number) => json({ error }, status);

/** Normalizes what the visitor typed into a URL, or returns an error message. */
function parseUrl(raw: unknown): URL | string {
  if (typeof raw !== "string") return "Enter your website address.";
  let s = raw.trim();
  if (!s) return "Enter your website address.";
  if (s.length > 2048) return "That address is too long.";
  if (/\s/.test(s)) return "Website addresses can't contain spaces.";
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(s) && !/^[^:/]+:\d+/.test(s)) return "Only http and https addresses can be checked.";
    s = `https://${s}`;
  }
  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return "That doesn't look like a website address.";
  }
  u.hash = "";
  return u;
}

function optionalText(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = clean(v, max + 1);
  if (!t) return undefined;
  return t.slice(0, max);
}

export async function POST(req: Request) {
  if (!(req.headers.get("content-type") ?? "").toLowerCase().includes("application/json")) {
    return fail("Send the request as JSON.", 415);
  }
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > 4096) return fail("Request too large.", 413);

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 4096) return fail("Request too large.", 413);
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("We couldn't read that request.", 400);
  }

  const url = parseUrl(body.url);
  if (typeof url === "string") return fail(url, 400);
  try {
    assertPublicUrl(url);
  } catch (e) {
    return fail(e instanceof BlockedUrlError ? e.message : "That address can't be checked.", 400);
  }

  if (rateLimited(clientIp(req))) {
    return fail("You've run a lot of checks in a short time. Try again in about 10 minutes.", 429);
  }

  try {
    const report = await runScan({
      url,
      businessName: optionalText(body.businessName, 100),
      city: optionalText(body.city, 60),
    });
    return json(report);
  } catch (e) {
    if (e instanceof BlockedUrlError) return fail(e.message, 400);
    if (e instanceof FetchFailedError) return fail(e.message, 422);
    console.error("scanrank scan failed", e instanceof Error ? e.message : e);
    return fail("Something went wrong while checking that site. Try again in a minute.", 500);
  }
}
