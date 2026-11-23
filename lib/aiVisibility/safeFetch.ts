import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import net from "node:net";
import zlib from "node:zlib";
import type { Readable } from "node:stream";

/**
 * A fetch for URLs typed in by strangers. Guards against SSRF:
 *
 * - http/https only, ports 80/443 only, no user:pass@ in the URL
 * - every hostname is resolved here and rejected if ANY address is private,
 *   loopback, link-local, metadata, multicast or otherwise non-public
 *   (IPv4 and IPv6, incl. IPv4-mapped and 6to4). The check runs inside the
 *   socket's own `lookup`, so the address we vet is the address we connect
 *   to (no DNS-rebinding gap between check and connect).
 * - redirects are followed by hand (max 3) and each hop is vetted again
 * - one deadline for the whole chain, a byte cap on the decoded body,
 *   no cookies sent or kept, a fixed User-Agent
 */

export const SCAN_UA = "RGVPM-AI-Visibility-Check/1.0 (+https://rgvperformancemarketing.com/scanrank)";

export class BlockedUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlockedUrlError";
  }
}

export class FetchFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchFailedError";
  }
}

// ── IP vetting ────────────────────────────────────────────────────────────

const V4_BLOCKS: [string, number][] = [
  ["0.0.0.0", 8], // "this network"
  ["10.0.0.0", 8], // private
  ["100.64.0.0", 10], // carrier-grade NAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local, incl. cloud metadata 169.254.169.254
  ["172.16.0.0", 12], // private
  ["192.0.0.0", 24], // IETF protocol assignments
  ["192.0.2.0", 24], // documentation
  ["192.88.99.0", 24], // 6to4 relay anycast
  ["192.168.0.0", 16], // private
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // documentation
  ["203.0.113.0", 24], // documentation
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved + broadcast
];

function v4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const v = Number(p);
    if (v > 255) return null;
    n = n * 256 + v;
  }
  return n >>> 0;
}

function isBlockedV4(ip: string): boolean {
  const n = v4ToInt(ip);
  if (n === null) return true;
  return V4_BLOCKS.some(([base, bits]) => {
    const b = v4ToInt(base)!;
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    return ((n & mask) >>> 0) === ((b & mask) >>> 0);
  });
}

/** Expand an IPv6 address to 8 numbers. Returns null if it doesn't parse. */
function v6ToHextets(input: string): number[] | null {
  let ip = input.split("%")[0].toLowerCase();
  // Trailing dotted IPv4 (::ffff:1.2.3.4) → two hextets.
  const lastColon = ip.lastIndexOf(":");
  const tail = ip.slice(lastColon + 1);
  if (tail.includes(".")) {
    const n = v4ToInt(tail);
    if (n === null) return null;
    ip = `${ip.slice(0, lastColon + 1)}${(n >>> 16).toString(16)}:${(n & 0xffff).toString(16)}`;
  }
  const halves = ip.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const rest = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const fill = halves.length === 2 ? 8 - head.length - rest.length : 0;
  if (fill < 0) return null;
  const all = [...head, ...Array(fill).fill("0"), ...rest];
  if (all.length !== 8) return null;
  const out: number[] = [];
  for (const h of all) {
    if (!/^[0-9a-f]{1,4}$/.test(h)) return null;
    out.push(parseInt(h, 16));
  }
  return out;
}

function hextetsToV4(a: number, b: number): string {
  return [a >> 8, a & 0xff, b >> 8, b & 0xff].join(".");
}

function isBlockedV6(ip: string): boolean {
  const h = v6ToHextets(ip);
  if (!h) return true;
  const firstFiveZero = h.slice(0, 5).every((x) => x === 0);
  // IPv4-mapped ::ffff:a.b.c.d → judge the IPv4 address.
  if (firstFiveZero && h[5] === 0xffff) return isBlockedV4(hextetsToV4(h[6], h[7]));
  // ::, ::1, and deprecated IPv4-compatible ::a.b.c.d
  if (firstFiveZero && h[5] === 0) return true;
  // Only global unicast (2000::/3) is allowed from here on. This rejects
  // fc00::/7 (unique local, incl. AWS fd00:ec2::254), fe80::/10 (link-local),
  // fec0::/10, ff00::/8 (multicast), 100::/64 (discard) and 64:ff9b::/96 (NAT64).
  if ((h[0] & 0xe000) !== 0x2000) return true;
  if (h[0] === 0x2001 && h[1] === 0x0db8) return true; // documentation
  if (h[0] === 0x2001 && h[1] === 0x0000) return true; // Teredo
  if (h[0] === 0x2001 && h[1] >= 0x0010 && h[1] <= 0x001f) return true; // ORCHID
  if (h[0] === 0x2002) return isBlockedV4(hextetsToV4(h[1], h[2])); // 6to4 embeds IPv4
  return false;
}

export function isBlockedIp(ip: string): boolean {
  const kind = net.isIP(ip);
  if (kind === 4) return isBlockedV4(ip);
  if (kind === 6) return isBlockedV6(ip);
  return true;
}

const BLOCKED_HOST_SUFFIXES = [".localhost", ".local", ".internal", ".home.arpa", ".lan", ".intranet", ".corp"];

/** Validate a URL before any network call. Throws BlockedUrlError. */
export function assertPublicUrl(u: URL): void {
  if (u.protocol !== "http:" && u.protocol !== "https:") throw new BlockedUrlError("Only http and https addresses can be checked.");
  if (u.username || u.password) throw new BlockedUrlError("Addresses with a username or password can't be checked.");
  const port = u.port || (u.protocol === "https:" ? "443" : "80");
  if (port !== "80" && port !== "443") throw new BlockedUrlError("Only standard web ports (80 and 443) can be checked.");
  const host = u.hostname.replace(/^\[|\]$/g, "").toLowerCase().replace(/\.$/, "");
  if (!host) throw new BlockedUrlError("That address has no hostname.");
  if (net.isIP(host)) {
    if (isBlockedIp(host)) throw new BlockedUrlError("That address points to a private or internal network.");
    return;
  }
  if (host === "localhost" || BLOCKED_HOST_SUFFIXES.some((s) => host.endsWith(s))) {
    throw new BlockedUrlError("That address points to a private or internal network.");
  }
  if (!host.includes(".")) throw new BlockedUrlError("Enter a full web address, like yourmedspa.com.");
  // Bare numeric forms like 2130706433 or 0x7f.1 are handled by WHATWG URL
  // (it normalizes them to dotted IPv4, caught above).
}

type LookupCb = (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void;

/** dns.lookup replacement that refuses non-public answers. Used by the socket itself. */
function safeLookup(hostname: string, options: dns.LookupOptions, cb: LookupCb): void {
  dns.lookup(hostname, { all: true, verbatim: true }, (err, addresses) => {
    if (err) return cb(err, "");
    const list = (Array.isArray(addresses) ? addresses : []) as dns.LookupAddress[];
    if (list.length === 0) return cb(Object.assign(new Error("No address found"), { code: "ENOTFOUND" }), "");
    if (list.some((a) => isBlockedIp(a.address))) {
      return cb(Object.assign(new BlockedUrlError("That address points to a private or internal network."), { code: "EBLOCKED" }), "");
    }
    const wanted = options.family === 4 || options.family === 6 ? list.filter((a) => a.family === options.family) : list;
    const pick = wanted.length ? wanted : list;
    if (options.all) return cb(null, pick);
    cb(null, pick[0].address, pick[0].family);
  });
}

// ── Fetch ────────────────────────────────────────────────────────────────

export interface SafeResponse {
  status: number;
  finalUrl: string;
  contentType: string;
  body: string;
  bytes: number;
  truncated: boolean;
  /** ms from start to first response byte of the final hop */
  ttfbMs: number;
  /** ms from start to end of body */
  totalMs: number;
  redirects: number;
}

export interface SafeFetchOptions {
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
  accept?: string;
}

const REDIRECT = new Set([301, 302, 303, 307, 308]);

function oneRequest(
  u: URL,
  deadline: number,
  maxBytes: number,
  accept: string,
  start: number,
): Promise<{ status: number; location?: string; contentType: string; body: Buffer; truncated: boolean; ttfbMs: number }> {
  return new Promise((resolve, reject) => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return reject(new FetchFailedError("The site took too long to respond."));
    const mod = u.protocol === "https:" ? https : http;
    let settled = false;
    const done = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const req = mod.request(
      u,
      {
        method: "GET",
        agent: false,
        lookup: safeLookup as unknown as net.LookupFunction,
        headers: {
          "User-Agent": SCAN_UA,
          Accept: accept,
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.8",
          Connection: "close",
        },
      },
      (res) => {
        const ttfbMs = Date.now() - start;
        const status = res.statusCode ?? 0;
        const contentType = String(res.headers["content-type"] ?? "").slice(0, 200);
        if (REDIRECT.has(status) && res.headers.location) {
          res.resume();
          return done(() => resolve({ status, location: String(res.headers.location), contentType, body: Buffer.alloc(0), truncated: false, ttfbMs }));
        }
        let stream: Readable = res;
        const enc = String(res.headers["content-encoding"] ?? "").toLowerCase().trim();
        if (enc === "gzip" || enc === "x-gzip") stream = res.pipe(zlib.createGunzip());
        else if (enc === "deflate") stream = res.pipe(zlib.createInflate());
        else if (enc === "br") stream = res.pipe(zlib.createBrotliDecompress());

        const chunks: Buffer[] = [];
        let size = 0;
        let truncated = false;
        stream.on("data", (chunk: Buffer) => {
          if (settled) return;
          const room = maxBytes - size;
          if (chunk.length >= room) {
            chunks.push(chunk.subarray(0, room));
            size = maxBytes;
            truncated = true;
            req.destroy();
            return done(() => resolve({ status, contentType, body: Buffer.concat(chunks), truncated, ttfbMs }));
          }
          chunks.push(chunk);
          size += chunk.length;
        });
        stream.on("end", () => done(() => resolve({ status, contentType, body: Buffer.concat(chunks), truncated, ttfbMs })));
        stream.on("error", () => done(() => resolve({ status, contentType, body: Buffer.concat(chunks), truncated: true, ttfbMs })));
      },
    );

    const timer = setTimeout(() => {
      req.destroy();
      done(() => reject(new FetchFailedError("The site took too long to respond.")));
    }, remaining);

    req.on("error", (err: NodeJS.ErrnoException) => {
      done(() => {
        if (err instanceof BlockedUrlError || err.code === "EBLOCKED") return reject(new BlockedUrlError(err.message));
        if (err.code === "ENOTFOUND" || err.code === "EAI_AGAIN") return reject(new FetchFailedError("We couldn't find that website. Check the spelling."));
        reject(new FetchFailedError("We couldn't connect to that website."));
      });
    });
    req.end();
  });
}

export async function safeFetch(input: string | URL, opts: SafeFetchOptions = {}): Promise<SafeResponse> {
  const timeoutMs = opts.timeoutMs ?? 8000;
  const maxBytes = opts.maxBytes ?? 2 * 1024 * 1024;
  const maxRedirects = opts.maxRedirects ?? 3;
  const accept = opts.accept ?? "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5";
  const start = Date.now();
  const deadline = start + timeoutMs;

  let u = new URL(input);
  for (let hop = 0; ; hop++) {
    assertPublicUrl(u);
    const r = await oneRequest(u, deadline, maxBytes, accept, start);
    if (r.location !== undefined) {
      if (hop >= maxRedirects) throw new FetchFailedError("The site redirected too many times.");
      let next: URL;
      try {
        next = new URL(r.location, u);
      } catch {
        throw new FetchFailedError("The site sent a broken redirect.");
      }
      u = next;
      continue;
    }
    return {
      status: r.status,
      finalUrl: u.toString(),
      contentType: r.contentType,
      body: r.body.toString("utf8"),
      bytes: r.body.length,
      truncated: r.truncated,
      ttfbMs: r.ttfbMs,
      totalMs: Date.now() - start,
      redirects: hop,
    };
  }
}
