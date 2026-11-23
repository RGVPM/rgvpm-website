import { safeFetch, FetchFailedError, type SafeResponse } from "./safeFetch";
import { CHECKS, gradeFor, pointsFor, type CheckId, type CheckResult, type CheckStatus, type ScanReport } from "./checks";

/**
 * Runs the AI Visibility Check against one public site. Fetches the homepage,
 * robots.txt, llms.txt and a sitemap (in parallel, each through safeFetch),
 * then pulls measurable facts out of the raw HTML with plain string parsing.
 * Nothing fetched is ever returned as HTML: every "found" string is plain
 * text, stripped of control characters and trimmed. React escapes it again
 * when the page renders it.
 */

export const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "Bingbot"] as const;

const BOOKING_PLATFORMS: [RegExp, string][] = [
  [/aestheticrecord\.com|myaestheticrecord/i, "Aesthetic Record"],
  [/vagaro\.com/i, "Vagaro"],
  [/joinblvd\.com|blvd\.co\b|boulevard\.io|booking\.joinblvd/i, "Boulevard"],
  [/mindbodyonline\.com|mindbody\.io|healcode\.com/i, "Mindbody"],
  [/zenoti\.com/i, "Zenoti"],
  [/janeapp\.com/i, "Jane"],
  [/acuityscheduling\.com|as\.me\//i, "Acuity"],
  [/glossgenius\.com/i, "GlossGenius"],
  [/fresha\.com/i, "Fresha"],
  [/schedulicity\.com/i, "Schedulicity"],
  [/booksy\.com/i, "Booksy"],
  [/squareup\.com\/appointments|square\.site\/book|book\.squareup/i, "Square Appointments"],
  [/calendly\.com/i, "Calendly"],
  [/joinmoxie\.com|moxie\.(?:app|co)/i, "Moxie"],
  [/patientnow\.com/i, "PatientNow"],
  [/nextech\.com/i, "Nextech"],
  [/leadconnectorhq\.com\/widget\/booking|\/widget\/bookings\//i, "GoHighLevel"],
  [/setmore\.com/i, "Setmore"],
  [/simplybook\.(?:me|it)/i, "SimplyBook"],
  [/genbook\.com/i, "Genbook"],
  [/meevo\.com|millenium?systems/i, "Meevo"],
  [/getweave\.com|weavehelp/i, "Weave"],
];

const CHAT_WIDGETS: [RegExp, string][] = [
  [/podium\.com/i, "Podium"],
  [/birdeye\.com/i, "Birdeye"],
  [/widgets\.leadconnectorhq\.com|msgsndr\.com\/chat/i, "GoHighLevel chat"],
  [/intercom(?:cdn)?\.(?:io|com)/i, "Intercom"],
  [/tawk\.to/i, "Tawk.to"],
  [/tidio\.co/i, "Tidio"],
  [/js\.driftt\.com|drift\.com/i, "Drift"],
  [/livechatinc\.com/i, "LiveChat"],
  [/crisp\.chat/i, "Crisp"],
  [/zdassets\.com|zopim/i, "Zendesk chat"],
  [/hs-scripts\.com|hubspot\.com\/conversations/i, "HubSpot chat"],
  [/getweave\.com/i, "Weave"],
  [/nexhealth\.com/i, "NexHealth"],
  [/textmetrics|textline\.com|heymarket\.com/i, "text widget"],
  [/connect\.facebook\.net\/[^"']*customerchat|m\.me\//i, "Messenger"],
  [/wa\.me\/|api\.whatsapp\.com/i, "WhatsApp"],
];

const SERVICE_WORDS =
  /\b(med ?spa|medical spa|medical aesthetic|aesthetics?|aesthetician|botox|dysport|xeomin|filler|injectables?|neurotoxin|laser|facials?|hydrafacial|microneedling|skin ?care|skin|coolsculpting|body contouring|weight loss|semaglutide|tirzepatide|glp-?1|iv therapy|iv hydration|hair removal|chemical peel|prp|prf|kybella|sculptra|lip|rejuvenation|wellness|dermal|spa)\b/i;

const US_STATES =
  "AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC";
const STATE_NAMES =
  "Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming";
const PLACE_PATTERN = new RegExp(`\\b[A-Z][a-zA-Z.]+(?:\\s[A-Z][a-zA-Z.]+)?,?\\s(?:${US_STATES})\\b|\\b(?:${STATE_NAMES})\\b`);

const LOCAL_TYPES = new Set(
  [
    "LocalBusiness", "MedicalBusiness", "MedicalClinic", "MedicalOrganization", "HealthAndBeautyBusiness", "DaySpa",
    "BeautySalon", "HairSalon", "NailSalon", "Physician", "Dermatology", "PlasticSurgery", "Dentist", "HealthClub",
    "ProfessionalService", "Store", "MedicalSpa", "Spa", "Optician", "Pharmacy", "Hospital",
  ].map((t) => t.toLowerCase()),
);

// ── small text helpers ────────────────────────────────────────────────────

export function clean(s: string, max = 160): string {
  const t = s.replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d) => safeChar(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeChar(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ndash;|&mdash;/g, "-")
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&rdquo;|&ldquo;/g, '"')
    .replace(/&[a-z]+;/gi, " ");
}

function safeChar(code: number): string {
  if (!Number.isFinite(code) || code < 32 || code > 0x10ffff) return " ";
  try {
    return String.fromCodePoint(code);
  } catch {
    return " ";
  }
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "));
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decodeEntities(m[1] ?? m[2] ?? m[3] ?? "") : null;
}

function metaContent(html: string, key: string): string | null {
  const re = /<meta\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const n = (attr(tag, "name") ?? attr(tag, "property") ?? "").toLowerCase();
    if (n === key) return attr(tag, "content");
  }
  return null;
}

function hasWord(text: string, word: string): boolean {
  const w = word.trim().toLowerCase();
  return w.length > 1 && text.toLowerCase().includes(w);
}

function joinNames(xs: string[]): string {
  if (xs.length <= 1) return xs.join("");
  return `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}

// ── robots.txt ────────────────────────────────────────────────────────────

interface RobotsGroup {
  agents: string[];
  rules: { allow: boolean; path: string }[];
}

export function parseRobots(txt: string): { groups: RobotsGroup[]; sitemaps: string[] } {
  const groups: RobotsGroup[] = [];
  const sitemaps: string[] = [];
  let cur: RobotsGroup | null = null;
  let lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const val = line.slice(idx + 1).trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) {
        cur = { agents: [], rules: [] };
        groups.push(cur);
      }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if (key === "allow" || key === "disallow") {
      lastWasAgent = false;
      if (cur && (key === "allow" || val)) cur.rules.push({ allow: key === "allow", path: val });
    } else if (key === "sitemap") {
      if (val) sitemaps.push(val);
    } else {
      lastWasAgent = false;
    }
  }
  return { groups, sitemaps };
}

/** Is the homepage ("/") off-limits to this bot? Longest matching rule wins; ties go to Allow. */
export function botBlocked(groups: RobotsGroup[], bot: string): boolean {
  const b = bot.toLowerCase();
  let matched = groups.filter((g) => g.agents.some((a) => a !== "*" && b.includes(a)));
  if (matched.length === 0) matched = groups.filter((g) => g.agents.includes("*"));
  if (matched.length === 0) return false;
  const rules = matched.flatMap((g) => g.rules);
  let best: { allow: boolean; len: number } | null = null;
  for (const r of rules) {
    const p = r.path;
    const matches = p === "/" || p === "/*" || p === "*" || p === "/$";
    if (!matches) continue;
    const len = p.length;
    if (!best || len > best.len || (len === best.len && r.allow)) best = { allow: r.allow, len };
  }
  return best ? !best.allow : false;
}

// ── JSON-LD ───────────────────────────────────────────────────────────────

type Node = Record<string, unknown>;

function collectNodes(v: unknown, out: Node[], depth = 0): void {
  if (depth > 6 || out.length > 200) return;
  if (Array.isArray(v)) {
    for (const x of v) collectNodes(x, out, depth + 1);
    return;
  }
  if (v && typeof v === "object") {
    const o = v as Node;
    if (o["@type"]) out.push(o);
    if (o["@graph"]) collectNodes(o["@graph"], out, depth + 1);
    for (const k of ["mainEntity", "publisher", "provider", "author", "about", "itemReviewed", "location", "parentOrganization", "department"]) {
      if (o[k] && typeof o[k] === "object") collectNodes(o[k], out, depth + 1);
    }
  }
}

function typesOf(n: Node): string[] {
  const t = n["@type"];
  const arr = Array.isArray(t) ? t : [t];
  return arr.filter((x): x is string => typeof x === "string").map((x) => x.replace(/^https?:\/\/schema\.org\//i, ""));
}

function str(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.map(str).filter(Boolean)[0] ?? "";
  return "";
}

function addressOf(n: Node): { street: string; locality: string } {
  const a = n.address;
  const one = Array.isArray(a) ? a[0] : a;
  if (typeof one === "string") return { street: one, locality: "" };
  if (one && typeof one === "object") {
    const o = one as Node;
    return { street: str(o.streetAddress), locality: str(o.addressLocality) };
  }
  return { street: "", locality: "" };
}

// ── facts from the homepage ───────────────────────────────────────────────

interface Facts {
  title: string;
  metaDescription: string;
  viewport: string;
  h1s: string[];
  links: { href: string; text: string }[];
  nodes: Node[];
  jsonLdErrors: number;
  textLength: number;
  hasFaqSection: boolean;
  rawLower: string;
}

export function extractFacts(html: string): Facts {
  const head = html.slice(0, 600_000);
  const title = clean(stripTags(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""), 200);
  const metaDescription = clean(metaContent(head, "description") ?? "", 320);
  const viewport = clean(metaContent(head, "viewport") ?? "", 200);

  const h1s: string[] = [];
  for (const m of html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)) {
    const t = clean(stripTags(m[1]), 160);
    if (t) h1s.push(t);
    if (h1s.length >= 5) break;
  }

  const links: { href: string; text: string }[] = [];
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = attr(` ${m[1]}`, "href");
    if (!href) continue;
    links.push({ href: href.trim(), text: clean(stripTags(m[2]), 80) });
    if (links.length >= 1500) break;
  }

  const nodes: Node[] = [];
  let jsonLdErrors = 0;
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectNodes(JSON.parse(m[1].trim().replace(/^<!--|-->$/g, "")), nodes);
    } catch {
      jsonLdErrors++;
    }
  }

  const body = html.match(/<body\b[^>]*>([\s\S]*)/i)?.[1] ?? html;
  const visible = stripTags(
    body
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<template\b[\s\S]*?<\/template>/gi, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

  return {
    title,
    metaDescription,
    viewport,
    h1s,
    links,
    nodes,
    jsonLdErrors,
    textLength: visible.length,
    hasFaqSection: /frequently asked|\bfaqs?\b/i.test(visible),
    rawLower: html.toLowerCase(),
  };
}

// ── the scan ──────────────────────────────────────────────────────────────

export interface ScanInput {
  url: URL;
  businessName?: string;
  city?: string;
}

function isTextBody(r: SafeResponse | null): boolean {
  if (!r || r.status !== 200) return false;
  return !/<html|<!doctype/i.test(r.body.slice(0, 500));
}

async function attempt(url: string, opts: Parameters<typeof safeFetch>[1]): Promise<SafeResponse | null> {
  try {
    return await safeFetch(url, opts);
  } catch {
    return null;
  }
}

export async function runScan({ url, businessName, city }: ScanInput): Promise<ScanReport> {
  const origin = url.origin;
  const textOpts = { timeoutMs: 8000, maxBytes: 512 * 1024, accept: "text/plain,*/*;q=0.5" };

  // Homepage plus the side files, all at once so the whole scan fits in ~8s.
  const started = Date.now();
  const sitemapOpts = { timeoutMs: 8000, maxBytes: 256 * 1024, accept: "application/xml,text/xml,*/*;q=0.5" };
  const [homeResult, robots, llms, sitemapXml] = await Promise.all([
    safeFetch(url, { timeoutMs: 8000, maxBytes: 2 * 1024 * 1024 }).then(
      (r) => ({ ok: true as const, r }),
      (e: unknown) => ({ ok: false as const, e }),
    ),
    attempt(`${origin}/robots.txt`, textOpts),
    attempt(`${origin}/llms.txt`, textOpts),
    attempt(`${origin}/sitemap.xml`, sitemapOpts),
  ]);

  if (!homeResult.ok) throw homeResult.e;
  const home = homeResult.r;
  if (home.status >= 400) {
    throw new FetchFailedError(
      home.status === 403 || home.status === 401
        ? `The site refused our check (error ${home.status}). It may be blocking automated visitors, which can block AI crawlers too.`
        : `The site returned an error (${home.status}).`,
    );
  }
  if (!/html|xml|^$/i.test(home.contentType)) throw new FetchFailedError("That address isn't a web page.");

  const robotsTxt = robots && robots.status === 200 && isTextBody(robots) ? robots.body : null;
  const parsedRobots = robotsTxt ? parseRobots(robotsTxt) : { groups: [], sitemaps: [] };

  // Sitemap: /sitemap.xml, else the first one robots.txt names, if time allows.
  const isSitemap = (r: SafeResponse | null) => !!r && r.status === 200 && /<(urlset|sitemapindex)\b/i.test(r.body);
  let sitemap: { url: string; ok: boolean } = isSitemap(sitemapXml) ? { url: sitemapXml!.finalUrl, ok: true } : { url: "", ok: false };
  const listed = parsedRobots.sitemaps.find((s) => /^https?:\/\//i.test(s));
  const left = 9500 - (Date.now() - started);
  if (!sitemap.ok && listed && left > 1500) {
    const r = await attempt(listed, { ...sitemapOpts, timeoutMs: Math.min(3000, left) });
    if (isSitemap(r)) sitemap = { url: r!.finalUrl, ok: true };
  }

  if (home.body.trim().length < 50) {
    throw new FetchFailedError("The site sent back an empty page. It may be down, or blocking automated visitors (which blocks AI crawlers too).");
  }
  const f = extractFacts(home.body);
  if (f.textLength < 600 && /just a moment|cf-chl|challenge-platform|captcha|attention required|access denied|sucuri website firewall|ddos protection/i.test(home.body.slice(0, 20000))) {
    throw new FetchFailedError("The site showed us a bot check instead of the page. AI crawlers likely hit the same wall, so ask your web host to allow them.");
  }
  const results = new Map<CheckId, { status: CheckStatus; found: string }>();
  const set = (id: CheckId, status: CheckStatus, found: string) => results.set(id, { status, found: clean(found, 220) });

  // AI crawlers
  if (!robots) {
    set("ai-crawlers", "warn", "We couldn't load your robots.txt, so we can't confirm AI crawlers are allowed.");
  } else if (robots.status === 404 || robots.status === 410 || (robots.status === 200 && !robotsTxt)) {
    set("ai-crawlers", "pass", "No robots.txt rules found, so every crawler is allowed by default.");
  } else if (robots.status >= 400) {
    set("ai-crawlers", "warn", `Your robots.txt returned an error (${robots.status}). Some crawlers treat that as \"stay out\".`);
  } else {
    const blocked = AI_BOTS.filter((b) => botBlocked(parsedRobots.groups, b));
    if (blocked.length === 0) set("ai-crawlers", "pass", `robots.txt allows ${joinNames([...AI_BOTS])}.`);
    else if (blocked.length <= 2) set("ai-crawlers", "warn", `robots.txt blocks ${joinNames(blocked)}.`);
    else set("ai-crawlers", "fail", `robots.txt blocks ${joinNames(blocked)}.`);
  }

  // Business schema
  const local = f.nodes.find((n) => typesOf(n).some((t) => LOCAL_TYPES.has(t.toLowerCase())));
  const org = f.nodes.find((n) => typesOf(n).some((t) => t.toLowerCase() === "organization"));
  let schemaLocality = "";
  if (local) {
    const name = str(local.name);
    const addr = addressOf(local);
    schemaLocality = addr.locality;
    const phone = str(local.telephone);
    const missing = [!name && "name", !(addr.street || addr.locality) && "address", !phone && "phone"].filter(Boolean) as string[];
    const type = typesOf(local).join("/");
    if (missing.length === 0) set("business-schema", "pass", `Found ${type} schema with name, address and phone.`);
    else set("business-schema", "warn", `Found ${type} schema, but it's missing the ${joinNames(missing)}.`);
  } else if (org) {
    set("business-schema", "warn", "Found Organization schema only. It doesn't say you're a local business with an address.");
  } else if (f.jsonLdErrors > 0) {
    set("business-schema", "fail", "Your page has schema code, but it has errors and can't be read.");
  } else {
    set("business-schema", "fail", "No business schema found in the page's HTML.");
  }

  // Title + meta description
  const cityWord = (city || schemaLocality || "").trim();
  const tm = `${f.title} ${f.metaDescription}`;
  const hasService = SERVICE_WORDS.test(tm);
  const hasPlace = cityWord ? hasWord(tm, cityWord) : PLACE_PATTERN.test(tm);
  const nameMissing = businessName && !hasWord(`${f.title} ${f.h1s.join(" ")}`, businessName);
  const placeLabel = cityWord || "a city";
  if (!f.title) {
    set("title-meta", "fail", "Your homepage has no title.");
  } else {
    const bits = [
      `Title: "${clean(f.title, 70)}".`,
      f.metaDescription ? "" : "No meta description.",
      hasService ? "" : "No service words (like med spa, Botox or laser).",
      hasPlace ? "" : `No mention of ${placeLabel}.`,
      nameMissing ? `Your business name isn't in the title.` : "",
    ].filter(Boolean);
    const allGood = f.metaDescription && hasService && hasPlace && !nameMissing;
    set("title-meta", allGood ? "pass" : hasService || hasPlace ? "warn" : "fail", allGood ? `${bits[0]} It names your service and ${placeLabel === "a city" ? "location" : cityWord}.` : bits.join(" "));
  }

  // H1
  if (f.h1s.length === 0) {
    set("h1", "fail", "No H1 heading found on the homepage.");
  } else {
    const h = f.h1s[0];
    const good = SERVICE_WORDS.test(h) || (cityWord ? hasWord(h, cityWord) : PLACE_PATTERN.test(h));
    const extra = f.h1s.length > 1 ? ` (${f.h1s.length} H1s on the page)` : "";
    set("h1", good ? "pass" : "warn", good ? `H1: "${clean(h, 80)}"${extra}.` : `H1 "${clean(h, 80)}" doesn't name a service or city${extra}.`);
  }

  // Text without JavaScript
  if (f.textLength >= 500) set("no-js-text", "pass", `About ${Math.round(f.textLength / 5)} words of text are in the raw HTML.`);
  else if (f.textLength >= 150) set("no-js-text", "warn", "Only a little text is in the raw HTML. Most of the page may load through JavaScript.");
  else set("no-js-text", "fail", "Almost no text is in the raw HTML. AI crawlers that don't run JavaScript see a near-empty page.");

  // Booking
  const hrefs = f.links.map((l) => l.href).join(" ");
  const bookingIn = `${hrefs} ${f.rawLower.match(/<(?:iframe|script)\b[^>]*src\s*=\s*["'][^"']+/gi)?.join(" ") ?? ""}`;
  const platform = BOOKING_PLATFORMS.find(([re]) => re.test(bookingIn))?.[1];
  const bookLink = f.links.find((l) => /\b(book|schedule|appointment|reserve)\b/i.test(l.text) || /\/(book|booking|schedule|appointments?)\b/i.test(l.href));
  if (platform) set("booking", "pass", `Found a booking link (${platform}).`);
  else if (bookLink) set("booking", "pass", `Found a booking link ("${clean(bookLink.text || bookLink.href, 50)}").`);
  else set("booking", "fail", "No online booking link found on the homepage.");

  // HTTPS
  const finalHttps = home.finalUrl.startsWith("https://");
  if (finalHttps) set("https", "pass", url.protocol === "http:" ? "Your site redirects to HTTPS." : "Your site loads over HTTPS.");
  else set("https", "fail", "Your site loads over plain HTTP, without encryption.");

  // Viewport
  if (/width\s*=\s*device-width|initial-scale\s*=\s*1(\.0)?\b/i.test(f.viewport)) set("viewport", "pass", "Found a mobile viewport tag.");
  else if (f.viewport) set("viewport", "warn", `Found a viewport tag, but it doesn't use device width ("${clean(f.viewport, 60)}").`);
  else set("viewport", "fail", "No mobile viewport tag found.");

  // Speed + size
  const kb = Math.round(home.bytes / 1024);
  const secs = (home.totalMs / 1000).toFixed(1);
  const sizeText = home.truncated ? "over 2 MB of HTML" : `${kb} KB of HTML`;
  if (home.truncated || home.totalMs > 5000) set("speed", "fail", `The homepage took ${secs}s to load ${sizeText}.`);
  else if (home.totalMs > 2500 || kb > 1024) set("speed", "warn", `The homepage took ${secs}s to load ${sizeText}.`);
  else set("speed", "pass", `The homepage loaded ${sizeText} in ${secs}s.`);

  // Tap to call
  const tel = f.links.find((l) => /^tel:/i.test(l.href));
  if (tel) set("click-to-call", "pass", `Found a tap-to-call link (${clean(tel.href.replace(/^tel:/i, ""), 30)}).`);
  else set("click-to-call", "fail", "No tap-to-call (tel:) link found.");

  // FAQ schema
  const faq = f.nodes.some((n) => typesOf(n).includes("FAQPage"));
  if (faq) set("faq-schema", "pass", "Found FAQPage schema on the homepage.");
  else if (f.hasFaqSection) set("faq-schema", "warn", "Your homepage mentions FAQs, but they aren't marked up with FAQPage schema.");
  else set("faq-schema", "warn", "No FAQ section or FAQ schema on the homepage.");

  // Text / chat
  const sms = f.links.find((l) => /^sms:/i.test(l.href));
  const chat = CHAT_WIDGETS.find(([re]) => re.test(f.rawLower))?.[1];
  if (sms) set("text-chat", "pass", "Found a text-us (sms:) link.");
  else if (chat) set("text-chat", "pass", `Found a chat or text widget (${chat}).`);
  else set("text-chat", "fail", "No text link or chat widget found in the homepage HTML.");

  // llms.txt
  if (isTextBody(llms) && llms!.body.trim().length > 20) set("llms-txt", "pass", "Found /llms.txt.");
  else set("llms-txt", "fail", "No /llms.txt file found.");

  // Sitemap
  if (sitemap.ok) {
    let p = sitemap.url;
    try {
      p = new URL(sitemap.url).pathname;
    } catch {}
    set("sitemap", "pass", `Found a sitemap at ${clean(p, 60)}.`);
  } else set("sitemap", "fail", "No sitemap found at /sitemap.xml or in robots.txt.");

  // Services + pricing
  const svc = f.links.some((l) => /\b(services?|treatments?|procedures?|menu|injectables|botox|laser|facials?)\b/i.test(`${l.text} ${l.href}`));
  const price = f.links.some((l) => /\b(pric(e|es|ing)|specials?|memberships?|packages?)\b/i.test(`${l.text} ${l.href}`));
  if (svc && price) set("services-pricing", "pass", "Found links to services and pricing pages.");
  else if (svc) set("services-pricing", "warn", "Found a services link, but no pricing, specials or membership page.");
  else if (price) set("services-pricing", "warn", "Found a pricing link, but no services or treatments page.");
  else set("services-pricing", "fail", "No services or pricing links found on the homepage.");

  const checks: CheckResult[] = CHECKS.map((def) => {
    const r = results.get(def.id) ?? { status: "fail" as const, found: "Not checked." };
    return { ...def, status: r.status, found: r.found, points: pointsFor(r.status, def.weight) };
  });
  const score = Math.round(checks.reduce((n, c) => n + c.points, 0));

  return {
    url: url.toString(),
    finalUrl: home.finalUrl,
    score,
    grade: gradeFor(score),
    scannedAt: new Date().toISOString(),
    checks,
  };
}
