import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";

/**
 * Daily counters in Netlify Blobs (store "ai-recommend-limits", site-wide,
 * strong consistency). Two kinds of key, both reset each day (Central time):
 *
 *   ip:<day>:<hash>   checks from one visitor IP (default limit 3)
 *   all:<day>         checks from everyone (DAILY_CHECK_CAP, default 150)
 *
 * The IP is hashed with the day, so we never store a raw IP, and the same IP
 * gets a different key tomorrow. Nothing else about the visitor is stored.
 * Increments use ETag compare-and-swap so two checks at once can't both slip
 * past a limit. Mock-mode checks use their own "mock:" keys, so testing a
 * deploy preview never eats into the live limits.
 */

export const PER_IP_DAILY = 3;
const DEFAULT_DAILY_CAP = 150;
const STORE = "ai-recommend-limits";

export function dailyCap(): number {
  const n = Number.parseInt(process.env.DAILY_CHECK_CAP ?? "", 10);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_DAILY_CAP;
}

function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
}

export type LimitResult = "ok" | "ip" | "cap" | "unavailable";

type Counter = { n: number };

/** Adds one to `key` unless it's already at `limit`. Returns false when the limit is hit. */
async function bump(store: ReturnType<typeof getStore>, key: string, limit: number): Promise<boolean> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const cur = await store.getWithMetadata(key, { type: "json" });
    if (!cur) {
      if (limit < 1) return false;
      const { modified } = await store.setJSON(key, { n: 1 } satisfies Counter, { onlyIfNew: true });
      if (modified) return true;
      continue;
    }
    const n = Number((cur.data as Counter | null)?.n) || 0;
    if (n >= limit) return false;
    if (!cur.etag) throw new Error("blob has no etag");
    const { modified } = await store.setJSON(key, { n: n + 1 } satisfies Counter, { onlyIfMatch: cur.etag });
    if (modified) return true;
  }
  // Lost the race five times in a row: treat as busy rather than let it through.
  return false;
}

// Fallback for local `next dev` / mock mode only, where Blobs has no context.
const memory = new Map<string, number>();
function bumpMemory(key: string, limit: number): boolean {
  const n = memory.get(key) ?? 0;
  if (n >= limit) return false;
  memory.set(key, n + 1);
  return true;
}

export interface Taken {
  result: LimitResult;
  /** Which counter answered. Sent as a debug header so a preview test shows Blobs is wired up. */
  via: "blobs" | "memory";
}

export async function takeCheck(ip: string, { mock }: { mock: boolean }): Promise<Taken> {
  const day = today();
  const hash = createHash("sha256").update(`${day}|${ip}`).digest("hex").slice(0, 32);
  const prefix = mock ? "mock:" : "";
  const ipKey = `${prefix}ip:${day}:${hash}`;
  const allKey = `${prefix}all:${day}`;
  const cap = dailyCap();

  try {
    const store = getStore({ name: STORE, consistency: "strong" });
    if (!(await bump(store, ipKey, PER_IP_DAILY))) return { result: "ip", via: "blobs" };
    if (!(await bump(store, allKey, cap))) return { result: "cap", via: "blobs" };
    return { result: "ok", via: "blobs" };
  } catch (e) {
    // Real engines cost money: if the counters can't be read on a real
    // deploy, refuse instead of running uncounted. Local dev and mock mode
    // fall back to an in-memory counter.
    const local = process.env.NODE_ENV !== "production";
    if (!mock && !local) {
      console.error("ai-recommend limits unavailable", e instanceof Error ? e.name : "error");
      return { result: "unavailable", via: "blobs" };
    }
    if (!bumpMemory(ipKey, PER_IP_DAILY)) return { result: "ip", via: "memory" };
    if (!bumpMemory(allKey, cap)) return { result: "cap", via: "memory" };
    return { result: "ok", via: "memory" };
  }
}
