#!/usr/bin/env node
// Submit URLs from the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver and others share submissions).
//
// Usage:
//   node scripts/indexnow.mjs              # every URL in the sitemap
//   node scripts/indexnow.mjs --days 7     # only URLs whose <lastmod> is within the last 7 days
//   node scripts/indexnow.mjs --dry-run    # print what would be sent, send nothing
//
// Run it after a production deploy is live. The key file must already be served at
// https://rgvperformancemarketing.com/<KEY>.txt (it lives in public/). No secrets: IndexNow keys are public by design.

const HOST = "rgvperformancemarketing.com";
const KEY = "0840e31ada4e41818aaa19097b02dd5a";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10000; // IndexNow's per-request limit

function parseArgs(argv) {
  const args = { days: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--days") args.days = Number(argv[++i]);
    else if (a.startsWith("--days=")) args.days = Number(a.slice(7));
    else if (a === "-h" || a === "--help") {
      console.log("node scripts/indexnow.mjs [--days N] [--dry-run]");
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${a}`);
      process.exit(2);
    }
  }
  if (args.days !== null && !(args.days >= 0)) {
    console.error("--days needs a number of days, e.g. --days 7");
    process.exit(2);
  }
  return args;
}

/** [{ loc, lastmod }] from a sitemap (follows a sitemap index one level down). */
async function readSitemap(url) {
  const res = await fetch(url, { headers: { "User-Agent": "rgvpm-indexnow/1.0" } });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  const xml = await res.text();
  const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  if (/<sitemapindex[\s>]/.test(xml)) {
    const children = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>\s*([^<]+?)\s*<\/loc>[\s\S]*?<\/sitemap>/g)].map((m) => unescape(m[1]));
    const all = [];
    for (const child of children) all.push(...(await readSitemap(child)));
    return all;
  }
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
    const loc = m[1].match(/<loc>\s*([^<]+?)\s*<\/loc>/)?.[1];
    const lastmod = m[1].match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/)?.[1];
    return { loc: loc && unescape(loc), lastmod: lastmod || null };
  }).filter((u) => u.loc);
}

async function main() {
  const { days, dryRun } = parseArgs(process.argv.slice(2));
  const entries = await readSitemap(SITEMAP_URL);

  let picked = entries;
  if (days !== null) {
    const cutoff = Date.now() - days * 86400000;
    picked = entries.filter((e) => e.lastmod && Date.parse(e.lastmod) >= cutoff);
  }
  const urls = [...new Set(picked.map((e) => e.loc))].filter((u) => new URL(u).host === HOST);

  console.log(`Sitemap: ${entries.length} URLs. Submitting ${urls.length}${days !== null ? ` (lastmod within ${days} days)` : ""}.`);
  if (urls.length === 0) return;
  if (dryRun) {
    urls.forEach((u) => console.log(`  ${u}`));
    return;
  }

  let failed = false;
  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    });
    const body = (await res.text()).trim();
    console.log(`IndexNow HTTP ${res.status} ${res.statusText} for ${urlList.length} URLs${body ? `: ${body.slice(0, 500)}` : ""}`);
    // 200 = accepted, 202 = accepted, key validation pending. Anything else is a failure.
    if (res.status !== 200 && res.status !== 202) failed = true;
  }
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
