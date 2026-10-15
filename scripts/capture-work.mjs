/**
 * Captures the full-page client-site screenshots used by the homepage
 * showcase (public/work/scroll/<slug>-desktop.webp and -mobile.webp).
 *
 * Usage (from a folder with its own Playwright + sharp install; they are
 * deliberately NOT dependencies of this site):
 *   npm i playwright sharp && npx playwright install chromium
 *   node capture-work.mjs <outdir> [slug]
 *
 * Desktop: top 4200px at 1440 wide, saved 1200x3500. Mobile: top 3600 CSS px
 * at 390 wide, 2x, saved 780x7200. WebP, kept under 350 KB. Chat widgets,
 * cookie bars, popups and sticky non-header bars are hidden.
 * Re-capture every quarter, or whenever a client site changes: stale
 * captures are the main risk of the showcase. Posters for the hero phones
 * (<slug>-mobile-poster.webp, 780x1688 top crop, <= 60 KB) are cut from the
 * mobile capture with sharp.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';

const OUT = process.argv[2];
const only = process.argv[3];
const SITES = [
  ['dvash-aesthetics', 'https://www.dvashaesthetics.com'],
  ['ccl-contracting', 'https://www.cclcontracting.com'],
  ['premium-foam', 'https://www.cclcontracting.com/spray-foam-insulation/'],
  ['macs-dove-hunts', 'https://www.macsdovehunts.com'],
  ['rgv-scalp-ink', 'https://www.rgvscalpinkllc.com'],
  ['us-to-you-mobile-health', 'https://www.ustoyoumobilehealth.com'],
  ['neuromotion-rehab', 'https://neuromotionrehabilitation.com'],
];
const HIDE = `
iframe[src*="leadconnector"], iframe[src*="msgsndr"], iframe[src*="chat"], iframe[id*="chat"],
#lc_text-widget, .lc_text-widget, chat-widget, [id*="chat-widget"], [class*="chat-widget"],
[id*="cookie"], [class*="cookie-banner"], [class*="cookie-consent"], [id*="CybotCookiebot"],
#onetrust-banner-sdk, .cky-consent-container, [class*="popup-overlay"], [class*="modal-backdrop"],
.elementor-popup-modal, .pum-overlay, [id*="intercom"], [class*="tidio"], #tidio-chat, [aria-label*="chat" i][role="dialog"],
.grecaptcha-badge { display:none !important; visibility:hidden !important; }
html { scroll-behavior:auto !important; }
`;

const VIEWS = [
  { kind: 'desktop', vp: { width: 1440, height: 900 }, dpr: 1, maxH: 4200, outW: 1200, mobile: false },
  { kind: 'mobile', vp: { width: 390, height: 844 }, dpr: 2, maxH: 3600, outW: 780, mobile: true },
];

const browser = await chromium.launch();
for (const [slug, url] of SITES) {
  if (only && slug !== only) continue;
  for (const v of VIEWS) {
    const ctx = await browser.newContext({
      viewport: v.vp, deviceScaleFactor: v.dpr, isMobile: v.mobile, hasTouch: v.mobile,
      userAgent: v.mobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : undefined,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => page.waitForTimeout(3000));
      await page.addStyleTag({ content: HIDE });
      // scroll to trigger lazy load / reveal animations
      await page.evaluate(async () => {
        const step = 400; let y = 0;
        while (y < Math.min(document.body.scrollHeight, 9000)) { window.scrollTo(0, y); y += step; await new Promise(r => setTimeout(r, 180)); }
        window.scrollTo(0, 0);
      });
      await page.evaluate(async () => {
        document.querySelectorAll('img[loading="lazy"]').forEach(i => i.loading = 'eager');
        await document.fonts.ready;
        await Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
      });
      await page.addStyleTag({ content: HIDE });
      await page.waitForTimeout(2500);
      await page.evaluate(() => {
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed' || cs.position === 'sticky') {
            const r = el.getBoundingClientRect();
            if (r.top > 150 || cs.position === 'fixed' && r.height > window.innerHeight * 0.6) el.style.setProperty('display', 'none', 'important');
          }
        }
        for (const a of document.getAnimations()) { try { if (a.effect && a.effect.getTiming().iterations !== Infinity) a.finish(); } catch (e) {} }
      });
      await page.waitForTimeout(800);
      const buf = await page.screenshot({ fullPage: true, type: 'png' });
      const img = sharp(buf);
      const meta = await img.metadata();
      const cropH = Math.min(meta.height, v.maxH * v.dpr);
      let q = 72, out;
      const file = `${OUT}/${slug}-${v.kind}.webp`;
      do {
        out = await sharp(buf).extract({ left: 0, top: 0, width: meta.width, height: cropH })
          .resize({ width: v.outW }).webp({ quality: q, effort: 6 }).toBuffer();
        q -= 6;
      } while (out.length > 350 * 1024 && q > 40);
      fs.writeFileSync(file, out);
      const m2 = await sharp(out).metadata();
      console.log(JSON.stringify({ file, url, w: m2.width, h: m2.height, kb: Math.round(out.length / 1024), q: q + 6, srcH: meta.height }));
    } catch (e) {
      console.log('FAIL', slug, v.kind, e.message);
    }
    await ctx.close();
  }
}
await browser.close();
