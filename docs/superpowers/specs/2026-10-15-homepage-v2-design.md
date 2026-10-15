# Homepage v2 design spec: "Afterglow" (with grafts from Velvet Hour and Glasshouse)

Date: 2026-10-15
Branch: `design/home-redesign` (PR #28). Supersedes the visual layer of `2026-10-14-homepage-redesign-design.md`. That spec still governs content, section jobs, SEO, prices and buying psychology; this one governs look, motion and the build.
Scope: homepage (`/`) only. Nothing on `/pricing`, `/about`, service pages, city pages, blog or terms may change appearance.

Owner feedback this answers: v1 was "very underwhelming in design"; wants heavy animation, more client logos (Face Forward Regenerative Aesthetics, Belleza De Oro, DrBrainRx), builds shown only "if there is some animation to it", and new colors ("surprise me").

Inputs judged: `~/rgv-marketing/clients/rgvpm/redesign-2026-10/v2/concept-A` (Velvet Hour), `concept-B` (Afterglow), `concept-C` (Glasshouse). Every screenshot in each folder was reviewed. Buying psychology: `~/rgv-marketing/clients/rgvpm/redesign-2026-10/psychology-cro.md`.

---

## 0. Verdict

### Scores (1 to 10; for the last row, higher means safer to build)

| Criterion | A: Velvet Hour | B: Afterglow | C: Glasshouse |
|---|---|---|---|
| Wow / premium feel | 8 | **9** | 7 |
| Brand fit for an AI & marketing agency | 6 | **8** | 7 |
| Medspa appeal | **9** | 6 | 7 |
| Appeal to contractors / restaurants | 4 | **8** | 7 |
| Conversion clarity | 7 | 8 | **9** |
| Motion quality | 8 | **9** | 7 |
| Buildability and performance risk | **7** | 5 | **7** |
| **Total (of 70)** | 49 | **53** | 51 |

### Winner: B, Afterglow

Why B:
- **It is the only one that clearly fixes "underwhelming".** Billboard-size condensed type, a sunset sky that moves as you scroll, crossing logo tapes and a horizontal "Night Drive" through live client sites. It is the heavy-animation page the owner asked for, and it still looks controlled.
- **It is the right kind of surprise.** The palette is new (midnight, tangerine, coral, magenta, violet), but brand orange survives as the CTA and the sun. The page still reads as RGV, and orange stays the one action color, as `psychology-cro.md` requires.
- **It speaks to everyone.** It reads "AI & marketing agency" and confident-for-contractors where A reads beauty brand. C is the cleanest converter, but a calm light page carries the most risk of being called underwhelming a second time, and it drops brand orange entirely.

Why not A or C outright:
- **A** is the most beautiful medspa page, but plum, gold and Bodoni read as luxury beauty first. That alienates the trades, restaurants and shops the industry tabs are trying to keep. Thin Bodoni strokes are also fragile on mobile.
- **C** has the best conversion clarity and the best logo idea (the lens). It is also the closest in spirit to v1's quiet look, it removes orange, and the citrus-on-ivory glass reads as a 2025 SaaS template.

B's weaknesses, and how this spec fixes them:

| B weakness | Fix (and where it comes from) |
|---|---|
| Medspa appeal (6) | The medspa band becomes a warm "golden hour" room. It gets A's arch, A's treatment-menu layout and A's plaque, plus a lighter weight of the display face. D'Vash stays in the hero phones and logos stay medspa-first (§6 S3) |
| The price count-up flashes fake prices ($758, $1,411 in `frame-4-ladder-rise.png`) | Banned. Prices rise out of a mask (A's approach) and only the real number is ever shown (§6 S8) |
| The overlapping logo strips hide logos | The two tapes tilt but never cross. Every logo is always fully visible (§7) |
| Highest performance risk | The hero intro is CSS-only (no JS on first paint). GSAP loads on idle, sky blobs are static on mobile, there is no pin on touch, and loops pause off screen (§4, §9) |
| A rotating gold "seal" ring on the BAA card | Replaced with a still plaque. A seal looks like a certification we do not hold (from A) |
| The hero LCP could wait on a 228 KB tall capture | The poster crop paints first; the tall capture swaps in on idle (from C) |
| Constant yoyo auto-scroll inside device frames | Auto-scroll with reading holds (from C) |

### Grafts in one list
- **From A (Velvet Hour):**
  - Prices rise from a mask instead of counting up.
  - The arch as a medspa doorway.
  - The treatment-menu layout for the medspa capabilities.
  - The HIPAA plaque instead of a seal.
  - Magnetic CTAs with a hover sheen.
  - The Process line that draws itself.
  - The FAQ plus that rotates into an x.
  - A pointer tilt on the hero devices.
- **From C (Glasshouse):**
  - Auto-scroll with reading holds.
  - The LCP poster-then-swap rule.
  - The three-branch `gsap.matchMedia` structure (desktop, mobile, reduced motion).
  - In reduced motion, the logos become a full-color still grid and the builds become a still 2x2 grid.
  - Process steps light up as the line reaches them.
  - The AI section's example message thread, clearly labeled "Example".
  - Hover and focus on any logo shows its true colors.

---

## 1. Scoping (homepage only)

1. **Wrapper.** `app/page.tsx` renders `<main className={\`rg-home rg-home--afterglow ${display.variable} ${body.variable} ${mono.variable}\`}>`.
   - Every new selector starts with `.rg-home--afterglow`.
   - All tokens are `--ev-*` custom properties defined on `.rg-home--afterglow`. They never go on `:root`.
2. **Stylesheet.**
   - Create a new `components/home/afterglow/afterglow.css`. `app/page.tsx` imports it in place of `components/home/home.css`.
   - Delete `home.css` once no component references a rule that only exists there. Before deleting, check that nothing outside `components/home` imports it.
   - CSS imported by a page can stay in the document after client-side navigation, so there must be **no unscoped selectors** in it. The only allowed global-looking selectors are ones that match nothing unless the wrapper is present:
     - `body:has(.rg-home--afterglow) …`
     - `nav[data-variant="island"] …`
     - `.page-transition:has(> .rg-home--afterglow)`
3. **Fonts.** Instantiate them with `next/font/google` in `app/page.tsx`, not in `layout.tsx`, so only `/` downloads them. Root layout fonts (DM Sans, DM Mono, Bebas) stay as they are for the rest of the site.
4. **Nav (shared).**
   - Make one minimal change in `components/Nav.tsx`: add `data-variant={pathname === "/" ? "island" : undefined}` on the `<nav aria-label="Primary">`. Its styles live in `afterglow.css` under `nav[data-variant="island"]`.
   - No other route gets the attribute, so no other route changes.
   - Keep the logo file as is. The B mock shows its orange stroke reads on night glass. A single-color sand logo is an owner decision (§12).
5. **Footer (shared).** Unchanged. It is already navy. FinalCta ends with a gradient that fades from midnight to `var(--navy)` plus a 1px sunset hairline, so the handoff is smooth without touching `Footer.tsx`.
6. **Page transition.**
   - Add `.page-transition:has(> .rg-home--afterglow) { animation: none !important; }`, following the existing `.lp-root` precedent, in `afterglow.css`.
   - The reason: during its 0.3s transform, the wrapper would make the fixed sky and any pins position against it.
7. **Kept exactly:**
   - The homepage `<title>` ("AI & Digital Marketing Agency | Harlingen TX & Nationwide"), description, canonical and `socialMeta`.
   - The FAQ JSON-LD from `homeFaqs`, and the single H1 with its existing markup (eyebrow spans plus display line).
   - The IDs `hero-cta`, `final-cta`, `#medspas`, `#plans`, `#how-it-works` and `#faq`.
   - Every `data-ev` / `event` analytics attribute, `HomeAnalytics`, the booking links (`bookingHref(...)`), and the checkout links from `lib/site.ts` `PLANS` (which mirrors `components/PricingTabs.tsx`).
   - Nothing hard-codes a price that `PLANS` / `SOCIAL_PLANS` / `PLANS_FROM` can supply.

---

## 2. Palette

Dark-only homepage by design: the story is the sun setting as you scroll. Put `color-scheme: dark` on the wrapper. Contrast ratios are WCAG 2.x, computed.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--ev-midnight` | `#0B0716` | Page base (violet-black, never pure black) | sand 17.97, haze 9.90 |
| `--ev-night` | `#130B22` | Raised bands, help boxes, sticky bar core | sand 17.27, dim 5.41 |
| `--ev-plum` | `#1E1233` | Card cores (double-bezel inner), logo tape B | sand 15.95, haze 8.79, dim 5.00 |
| `--ev-plum-2` | `#281845` | Card gradient top, tab rail | surface only |
| `--ev-sand` | `#FFF1E6` | Headlines and body | 17.97 on midnight |
| `--ev-haze` | `#BDB2D1` | Secondary copy, ledes, nav links | 9.90 midnight, 8.79 plum |
| `--ev-dim` | `#8E83A6` | Captions and footnotes, **14px minimum** | 5.63 midnight, 5.00 plum |
| `--ev-tangerine` | `#FF7A1A` | **CTA fill only**, always with a midnight label | midnight label 7.62. White fails (2.61): never white on tangerine |
| `--ev-tangerine-press` | `#E8621A` | Pressed CTA (current brand orange) | midnight label 5.86 |
| `--ev-gold` | `#FFB547` | CTA hover fill, sun core, fee lines, link underline | 11.32 on midnight, 10.05 on plum |
| `--ev-coral` | `#FF5A5F` | Gradient stop | 6.51 on midnight |
| `--ev-magenta` | `#F0449E` | Gradient stop | 5.70 on midnight |
| `--ev-violet` | `#8B5CFF` | Gradient stop, dusk glow. **Never small text** | 4.80 (large only) |
| `--ev-violet-text` | `#A98BFF` | Violet when it must be text (AI section label) | 7.41 midnight |
| `--ev-peach` | `#FFC9A8` | **Medspa band only**: the emphasized word in its H2, plaque hairline, menu leaders | 13.42 midnight, 11.91 plum |
| `--ev-hair` / `--ev-hair-2` | `rgba(255,241,230,.10)` / `.18` | Hairlines, bezel rings | n/a |
| `--ev-sunset` | `linear-gradient(100deg, #FFB547 0%, #FF7A1A 26%, #FF5A5F 50%, #F0449E 74%, #8B5CFF 100%)` | "booked", logo tape A, featured price and ring, progress lines | n/a |

Color rules:
- **Tangerine fill means "do this".** It is used only on primary CTAs: hero, medspa, industry, process, plans, final, sticky and the nav. Ghost CTAs are sand outline (`--ev-hair-2`) with a sand label. One primary per viewport.
- **The sunset gradient is the one accent.** It appears on at most one text element per viewport: "booked" in the hero, "system" in Capabilities, the featured price in Plans. It is never used on body copy.
- **Peach is confined to `#medspas`.** It is that room's light.
- **Logos.** On tape A (gradient) logos render as midnight silhouettes. On tape B (plum) they render as sand silhouettes (§7).

---

## 3. Fonts (homepage-only `next/font/google`)

```ts
// app/page.tsx
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-ev-display" }); // weight axis is included by default
const body = Geist({ subsets: ["latin"], display: "swap", variable: "--font-ev-body", preload: false });
const mono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-ev-mono", preload: false });
```

- **Bricolage is preloaded** because it is the LCP face. Geist and Geist Mono are not preloaded: the body text gets a size-adjusted fallback from next/font, so the swap does not shift layout.
- **Drop the `opsz` axis.** It costs file size and the page does not need it; let the browser auto-size. If the woff2 for Bricolage (latin, wght+wdth) exceeds 70 KB, subset further or pin `weight: ["300","800"]` without the variable axis.

| Role | Font | Spec |
|---|---|---|
| H1 display line | Bricolage Grotesque | 800, `font-variation-settings: "wdth" 84`, `clamp(56px, 8.4vw, 132px)`, line-height .9, `letter-spacing: -0.02em` (tighter collides; B fixed this in pass 1) |
| H2 | Bricolage | 800, wdth 86, `clamp(38px, 5vw, 76px)`, line-height .94, -0.022em |
| Medspa H2 and plan names (the softer voice) | Bricolage | **300**, wdth 100, same size as H2. The emphasized word is 800 in `--ev-peach`. This is how the medspa room feels gentler without a second display family (graft of A's elegance) |
| Prices, the "8-10" numeral, the ticker band, ghost names | Bricolage | 800, wdth 75, `font-variant-numeric: tabular-nums` on prices |
| Body / UI | Geist | 400/500/600. 17px/1.6 on desktop, 16px/1.6 on mobile. Buttons 600 |
| Labels | Geist Mono | 500, 12 to 12.5px, uppercase, `0.08em` to `0.1em`. **Rationed to at most 5 eyebrows on the page** (hero positioning line, medspa, plans, process "Days" labels, Night Drive slide meta) |

There is no italic and no serif anywhere. Emphasis is the gradient, or a weight contrast within Bricolage.

---

## 4. Motion system

### 4.1 Dependencies and loading
- **Dependencies.** `gsap@3.13.0` (exact; ScrollTrigger and SplitText ship in the package and are free since 3.13). No Lenis, because native scroll plus `scrub` is smooth enough and Lenis costs INP on touch. No `@gsap/react`, because we use dynamic imports plus `gsap.matchMedia().revert()` for cleanup.
- **Install.** Per the worktree note: `cd "/Users/rgvpm/orca/workspaces/RGVPM - Internal/rgvpm-home-redesign" && rm node_modules && npm install --save-exact gsap@3.13.0`. This creates a real `node_modules` in the worktree. Commit `package.json` and `package-lock.json`. Never touch `~/rgvpm-website`.
- **Layering:**
  1. **CSS keyframes** handle everything on first paint: the hero intro, sky bloom, blob drift on desktop, the conic ring, and the strip sheen. These run with zero JS, so the hero never waits on hydration and never jumps when JS arrives.
  2. **GSAP** handles everything scroll- or pointer-driven. One client orchestrator, `components/home/afterglow/Motion.tsx` (`"use client"`, renders `null`), loads it on idle.
  3. **IntersectionObserver** handles pausing loops off screen and the mobile auto-scroll triggers.

```tsx
// components/home/afterglow/Motion.tsx
"use client";
import { useEffect } from "react";
export default function Motion() {
  useEffect(() => {
    let mm: gsap.MatchMedia | undefined;
    let cancelled = false;
    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const root = document.querySelector<HTMLElement>(".rg-home--afterglow");
      if (!root) return;
      mm = gsap.matchMedia(root);
      mm.add(
        {
          desktop: "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px), (pointer: coarse)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, mobile, reduce } = ctx.conditions as Record<string, boolean>;
          if (reduce) { root.dataset.motion = "reduce"; return; } // CSS handles the static fallbacks
          root.dataset.motion = desktop ? "full" : "lite";
          heroScroll({ gsap, ScrollTrigger, root, desktop });
          heroPointer({ gsap, root, enabled: desktop });
          logoTapes({ gsap, ScrollTrigger, root, desktop });
          nightDrive({ gsap, ScrollTrigger, root, desktop });
          revealHeadings({ gsap, SplitText, root });
          medspa({ gsap, ScrollTrigger, root, desktop });
          processLine({ gsap, ScrollTrigger, root, desktop });
          plans({ gsap, ScrollTrigger, root, desktop });
          finalSun({ gsap, ScrollTrigger, root });
          magnetic({ gsap, root, enabled: desktop });
        }
      );
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const id = idle(start, { timeout: 2000 });
    return () => { cancelled = true; (window as any).cancelIdleCallback?.(id); mm?.revert(); };
  }, []);
  return null;
}
```

- Each moment lives in `components/home/afterglow/motion/<name>.ts` and exports one function. Every tween and ScrollTrigger is created inside the matchMedia callback, so `revert()` cleans up on resize, on reduced-motion change and on unmount.
- **CSS reduced motion:**
  - Wrap every CSS keyframe in `@media (prefers-reduced-motion: no-preference)`.
  - Under `[data-motion="reduce"]` and `@media (prefers-reduced-motion: reduce)`, show the static fallbacks listed per section.
  - Without JS, the page renders exactly like reduced motion minus the static grids; all content stays visible and reachable.

### 4.2 Eases and timing tokens

| Use | Ease | Duration |
|---|---|---|
| Entrances | `expo.out` (CSS `cubic-bezier(.16,1,.3,1)`) | 1.0 to 1.4s |
| Secondary moves | `power3.out` | 0.6 to 1.0s |
| Auto-scroll moves inside frames | `power3.inOut` | 1.8s per move, 1.1s holds |
| Scrubbed timelines | `none` | scrub `1` (pins) or `true` (parallax) |
| Magnetic return | `elastic.out(1, .45)` | 0.6s |
| Loops (marquee, ring) | `none` / CSS `linear` | 46 to 52s marquee, 7s ring |

Stagger 0.06 to 0.12. Nothing is longer than 1.6s except loops.

### 4.3 Global performance rules
- **Animate only `transform` and `opacity`.** The single exception is the sky's CSS `background-position` sheen on tape A, a 6s loop that is paused off screen.
- **No `scroll` listeners.** Everything goes through ScrollTrigger or IntersectionObserver.
- **`backdrop-filter`** only on the nav island and the sticky bar.
- **Grain** is one fixed `pointer-events: none` layer with a static SVG noise image at 3.5% opacity.
- **`will-change: transform`** only on the sun, the two tapes, the Night Drive track and the auto-scroll images. Remove it when they stop.
- **No layout shift.** Every device screen has a fixed aspect ratio. Every image has `width`/`height`. Night Drive reserves `min-height: 100svh` before the pin exists. Price masks have a fixed line box.
- **Pause loops off screen.** IntersectionObserver toggles `.is-offscreen` (sets `animation-play-state: paused`), and GSAP loops call `.pause()` via ScrollTrigger `onToggle`.
- **Do not use `content-visibility: auto`** on any section above `#plans`; it breaks ScrollTrigger measurements.

### 4.4 Exact patterns

**A. Hero intro (CSS only; H1 visible on the first frame)**
```css
@media (prefers-reduced-motion: no-preference) {
  .rg-home--afterglow .ev-h1-line { animation: ev-settle 1.3s cubic-bezier(.16,1,.3,1) both; }
  .rg-home--afterglow .ev-h1-line:nth-child(2) { animation-delay: .09s; }
  .rg-home--afterglow .ev-sky { animation: ev-bloom 2.2s cubic-bezier(.33,1,.68,1) both; }
  .rg-home--afterglow .ev-hero-after { animation: ev-rise 1s .25s cubic-bezier(.16,1,.3,1) both; } /* lede, CTAs, micro */
  .rg-home--afterglow .ev-phone { animation: ev-phone-in 1.6s .15s cubic-bezier(.16,1,.3,1) both; }
}
@keyframes ev-settle { from { transform: translateY(22%) skewY(6deg); } to { transform: none; } } /* no opacity: text paints at once */
@keyframes ev-bloom  { from { transform: scale(1.25); opacity: .35; } to { transform: none; opacity: 1; } }
@keyframes ev-rise   { from { transform: translateY(16px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes ev-phone-in { from { transform: translateY(80px) rotate(-8deg); } to { transform: var(--ev-phone-rest); } }
```
- The H1 lines are server-rendered at full opacity, so the LCP text paints immediately.
- The lede and CTAs fade over 1s starting at 0.25s. That is not LCP and is short enough not to delay a tap; the buttons remain clickable throughout.

**B. Sun sinks, dusk rolls in, ticker drifts (scrub)**
```ts
gsap.to(".ev-sun", { yPercent: 150, scale: 0.7, ease: "none",
  scrollTrigger: { trigger: ".ev-hero", start: "top top", endTrigger: "#medspas", end: "bottom center", scrub: true } });
gsap.to(".ev-dusk", { opacity: 1, ease: "none",
  scrollTrigger: { trigger: "#work", start: "top bottom", end: "top top", scrub: true } });
gsap.to(".ev-ticker-track", { xPercent: -28, ease: "none",
  scrollTrigger: { trigger: ".ev-hero", start: "top top", end: "bottom top", scrub: 0.6 } });
if (desktop) {
  gsap.to(".ev-h1-line:nth-child(1)", { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".ev-hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".ev-h1-line:nth-child(2)", { xPercent: 9,  ease: "none", scrollTrigger: { trigger: ".ev-hero", start: "top top", end: "bottom top", scrub: true } });
}
```
`.ev-sky`, `.ev-sun` and `.ev-dusk` live in one `position: fixed; inset: 0; z-index: -1; pointer-events: none` layer inside the wrapper (`components/home/afterglow/Sky.tsx`, a server component, `aria-hidden`).

**C. Pointer parallax and tilt (desktop only, from A and B)**
```ts
const rig = root.querySelector(".ev-rig")!;
const rx = gsap.quickTo(rig, "rotationY", { duration: 1.2, ease: "power3" });
const ry = gsap.quickTo(rig, "rotationX", { duration: 1.2, ease: "power3" });
const sky = gsap.quickTo(".ev-sky", "x", { duration: 1.6, ease: "power3" });
hero.addEventListener("pointermove", (e) => {
  const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
  rx(nx * 10); ry(-ny * 6); sky(nx * -40);
});
```
Only add the listener when `enabled`. matchMedia's revert removes the tweens; also remove the listener in the returned cleanup.

**D. Auto-scroll with reading holds (from C; hero phones, medspa browser, mobile Night Drive)**
```ts
export function autoScroll(gsap, img: HTMLElement, screen: HTMLElement) {
  const max = () => -(img.offsetHeight - screen.clientHeight);
  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2, defaults: { duration: 1.8, ease: "power3.inOut" } });
  [0.22, 0.48, 0.74, 1].forEach((p) => tl.to(img, { y: () => max() * p }).to({}, { duration: 1.1 }));
  tl.to(img, { y: 0, duration: 2.4 });
  return tl; // caller plays/pauses it via ScrollTrigger onToggle or an IntersectionObserver
}
// Vertical page context:
ScrollTrigger.create({ trigger: screen, start: "top bottom", end: "bottom top",
  onToggle: (s) => (s.isActive ? tl.play() : tl.pause()), onRefresh: () => tl.invalidate() });
```

**E. Logo tapes with velocity and direction (§7)**
```ts
const a = gsap.to(".ev-tape--a .ev-tape-track", { xPercent: -50, ease: "none", duration: desktop ? 46 : 60, repeat: -1 });
const b = gsap.fromTo(".ev-tape--b .ev-tape-track", { xPercent: -50 }, { xPercent: 0, ease: "none", duration: desktop ? 52 : 66, repeat: -1 });
[a, b].forEach((t) => t.totalTime(t.duration() * 100)); // reversing never hits time 0
let settle: gsap.core.Tween | undefined;
ScrollTrigger.create({
  trigger: ".ev-logos", start: "top bottom", end: "bottom top",
  onToggle: (s) => [a, b].forEach((t) => (s.isActive ? t.play() : t.pause())),
  onUpdate: (s) => {
    const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(s.getVelocity()) / 400);
    gsap.to([a, b], { timeScale: s.direction * boost, duration: 0.25, overwrite: true });
    settle?.kill();
    settle = gsap.to([a, b], { timeScale: s.direction, duration: 1.2, delay: 0.25 });
  },
});
```
Each track holds the logo list twice. The second copy is `aria-hidden="true"` and its links get `tabIndex={-1}`.

**F. Night Drive: pinned horizontal pan with inner scroll (desktop only)**
```ts
const section = root.querySelector<HTMLElement>("#work")!;
const track = section.querySelector<HTMLElement>(".ev-nd-track")!;
const distance = () => track.scrollWidth - innerWidth;
const pan = gsap.to(track, { x: () => -distance(), ease: "none",
  scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + distance(), pin: true, scrub: 1,
                   anticipatePin: 1, invalidateOnRefresh: true } });
section.querySelectorAll<HTMLElement>(".ev-nd-slide").forEach((slide, i) => {
  const shot = slide.querySelector<HTMLElement>(".ev-laptop img")!, scr = slide.querySelector<HTMLElement>(".ev-laptop .ev-screen")!;
  const ph = slide.querySelector<HTMLElement>(".ev-phone img")!, phs = slide.querySelector<HTMLElement>(".ev-phone .ev-screen")!;
  const st = { containerAnimation: pan, trigger: slide, start: "left 85%", end: "right 15%", scrub: true };
  gsap.to(shot, { y: () => -(shot.offsetHeight - scr.clientHeight), ease: "none", scrollTrigger: st });
  gsap.to(ph,   { y: () => -(ph.offsetHeight - phs.clientHeight) * 0.85, ease: "none", scrollTrigger: st });
  gsap.fromTo(slide.querySelector(".ev-devices"), { rotationY: -14 }, { rotationY: 12, ease: "none", scrollTrigger: st });
  gsap.fromTo(slide.querySelector(".ev-ghost"), { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: st });
  ScrollTrigger.create({ containerAnimation: pan, trigger: slide, start: "left center", end: "right center",
    onToggle: (s) => s.isActive && setActiveIndex(i) }); // drives the index chips + progress (§6 S4)
});
gsap.to(".ev-nd-progress", { scaleX: 1, ease: "none", transformOrigin: "left center",
  scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + distance(), scrub: true } });
// Keyboard: focusing a link in slide i scrolls the page to that slide's position.
section.addEventListener("focusin", (e) => {
  const slide = (e.target as HTMLElement).closest(".ev-nd-slide"); if (!slide) return;
  const i = [...track.children].indexOf(slide);
  const stp = pan.scrollTrigger!; const n = track.children.length;
  window.scrollTo({ top: stp.start + (stp.end - stp.start) * (i / Math.max(1, n - 1)), behavior: "instant" as ScrollBehavior });
});
```
Use `ScrollTrigger.refresh()` after the first capture image decodes (`img.decode().then(() => ScrollTrigger.refresh())`).

**G. H2 masked word reveal (SplitText 3.13)**
```ts
root.querySelectorAll<HTMLElement>("[data-ev-reveal]").forEach((el) => {
  SplitText.create(el, { type: "words", mask: "words", autoSplit: true, onSplit: (self) =>
    gsap.from(self.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 82%", once: true } }) });
});
```
- Do **not** apply this to the H1.
- SplitText 3.13 sets `aria-label` on the split element automatically. Verify with a screen reader that each heading reads as one phrase.
- Generic block entrances (`.ev-rise`) use `gsap.from(el, { y: 28, autoAlpha: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } })`, batched with `ScrollTrigger.batch` for lists (stagger 0.07).

**H. Price mask rise (from A; no count-up)**
```ts
gsap.from(".ev-plan", { y: desktop ? 140 : 60, autoAlpha: 0, duration: 1.4, ease: "expo.out", stagger: 0.12,
  scrollTrigger: { trigger: ".ev-ladder", start: "top 82%", once: true } });
gsap.from(".ev-price-num", { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.12, delay: 0.25,
  scrollTrigger: { trigger: ".ev-ladder", start: "top 82%", once: true } });
```
`.ev-price` is `overflow: hidden; line-height: 1; height: 1lh` (fallback: a fixed px height per breakpoint). The number only ever shows its real value. **A count-up or odometer that shows any other number is forbidden.**

**I. Magnetic CTAs (desktop only)**
```ts
root.querySelectorAll<HTMLElement>(".ev-btn--primary").forEach((btn) => {
  const icon = btn.querySelector(".ev-btn-icon");
  const bx = gsap.quickTo(btn, "x", { duration: 0.6, ease: "elastic.out(1,.45)" }), by = gsap.quickTo(btn, "y", { duration: 0.6, ease: "elastic.out(1,.45)" });
  const ix = gsap.quickTo(icon, "x", { duration: 0.6, ease: "power3" }), iy = gsap.quickTo(icon, "y", { duration: 0.6, ease: "power3" });
  btn.addEventListener("pointermove", (e) => { const r = btn.getBoundingClientRect(); const dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2; bx(dx * .28); by(dy * .28); ix(dx * .12); iy(dy * .12); });
  btn.addEventListener("pointerleave", () => { bx(0); by(0); ix(0); iy(0); });
});
```
Add the hover sheen in CSS: a `::after` band with `translateX(-120%)` that moves to `120%` over 1.1s on `:hover`.

---

## 5. New and changed files (build map)

```
app/page.tsx                                  fonts, wrapper class, new section order, imports afterglow.css + Motion
components/Nav.tsx                            ONE line: data-variant="island" when pathname === "/"
components/home/afterglow/afterglow.css       all homepage styles, scoped
components/home/afterglow/Sky.tsx             fixed sky/sun/dusk/grain layer (server, aria-hidden)
components/home/afterglow/HeroRig.tsx         two live phones + halo + poster/tall swap (replaces WorkStack in the hero)
components/home/afterglow/Ticker.tsx          outlined "Get found first / Get booked" band (aria-hidden)
components/home/afterglow/LogoTape.tsx        two tapes + reduced-motion grid (replaces ClientMarquee on the homepage only)
components/home/afterglow/NightDrive.tsx      #work showcase (server markup; slides from lib/work.ts)
components/home/afterglow/DeviceFrame.tsx     laptop/browser/phone frames with fixed aspect screens
components/home/afterglow/Motion.tsx          + motion/*.ts  (all GSAP)
lib/work.ts                                   showcase data: slug, name, url, industry label, line, captures, dims
public/work/scroll/*-poster.webp              first-fold crops for LCP-safe hero/medspa frames
```
- **Edit in place, keeping copy and markup:** the existing section components (`HomeHero`, `ProofStrip`, `MedspaSuite`, `IndustrySwitcher`/`IndustryTabs`, `Capabilities`, `Process`, `PlanLadder`, `RiskReversal`, `AiSection`, `BlogEditorial`, `HomeFaq`, `FinalCta`, `StickyCta`).
  - Add `data-ev-reveal` to H2s and `ev-rise` to blocks.
  - Swap class names where the new layout needs them.
- **Do not change `components/ClientMarquee.tsx`.** It is shared code, so the homepage moves to `LogoTape`.
- **Keep `lib/clients.ts`.** It already has the three new entries (uncommitted in the worktree; commit them with the build).

---

## 6. Section by section (v1 order; v2 position noted)

v2 order:
1. Nav
2. Hero (with live phones; WorkStack retired)
3. ProofStrip (logo tapes)
4. MedspaSuite
5. **Night Drive `#work`** (new; takes WorkStack's job)
6. IndustrySwitcher
7. Capabilities
8. Process
9. PlanLadder
10. RiskReversal
11. AiSection
12. BlogEditorial
13. HomeFaq
14. FinalCta
15. StickyCta
16. Footer (unchanged)

Night Drive sits **after** MedspaSuite, not after the logos:
- The commitment path stays proof, then the medspa segment, then "and yours too" for every other business.
- The `Medspas` nav anchor lands sooner.
- A medspa owner has already seen D'Vash moving in the hero phones.

### S0. Nav (shared; homepage variant `island`)
- **Shape.** A floating glass pill 14px from the top, max-width 1180px: `--ev-night` at 62% plus `backdrop-filter: blur(14px) saturate(140%)`, a 1px `--ev-hair-2` ring and a 999px radius. With `prefers-reduced-transparency`, the fill is solid `--ev-night`.
- **Links.** `--ev-haze`, turning sand on hover. Dropdown panels are `--ev-plum` with the hairline ring.
- **CTA.** "Book a free call" with a tangerine fill, midnight label and a midnight icon island. It is magnetic on desktop.
- **Scrolled state.** The pill gains `box-shadow: 0 20px 50px -20px rgba(0,0,0,.6)`. Height never changes.
- **Mobile.** The pill holds the logo, the tangerine CTA and the menu button. The menu sheet is midnight.
- **Copy.** Unchanged.

### S1. HomeHero (v2 position 1)
- **Copy: v1, unchanged.** The H1 eyebrow is "AI & marketing agency / Harlingen, TX / Serving businesses nationwide". The display line is "Get found first. Get booked." Lede, both CTAs and the founder micro-line are as v1. **"booked" gets the sunset gradient** (`background: var(--ev-sunset); -webkit-background-clip: text; color: transparent`), replacing the `<em>` style. The H1 stays a single element with the same structure; wrap each display sentence in `span.ev-h1-line` (`display: block`).
- **Desktop layout (≥1024).** A split: copy left (max ~660px), `HeroRig` right.
  - **HeroRig.** Two phones:
    - Front: D'Vash, `dvash-aesthetics-mobile`.
    - Behind, rotated -8°: Us To You, `us-to-you-mobile-health-mobile`.
  - Behind them is a slowly rotating sunset halo ring (CSS conic, 7s linear, `mask: radial-gradient` so it reads as a ring).
  - Caption under the rig: "dvashaesthetics.com · built by us", linked to the live site (new tab).
- **Sky.** The sun sits top-right behind the rig. On mobile it starts low-right, so it never sits behind text (B, pass 2).
- **Ticker.** Under the hero, the outlined `Ticker` band reads "Get found first" in outline sand at 18% and "Get booked" in sunset fill, wdth 75, ~220px tall. It drifts with scroll (pattern B). It is `aria-hidden`.
- **LCP-safe images (from C).** Each phone first renders `/<slug>-mobile-poster.webp` (780x1688 crop of the top of the capture, ≤60 KB) through `next/image`:
  - Front poster: `priority` / `fetchPriority="high"`.
  - Back poster: `loading="eager"`, normal priority.
  - After `load` plus idle, HeroRig sets the tall `-mobile.webp` as the `src` on a hidden `<img decoding="async">`. Once `decode()` resolves it swaps in and auto-scroll (pattern D) starts.
  - In reduced motion it never swaps; the poster is the static frame.
- **Motion.**
  - Load (CSS, pattern A): sky bloom, H1 settle, lede/CTAs/micro rise, phones rise and tilt in.
  - Scroll (pattern B): sun sinks, H1 lines drift apart (desktop), ticker slides.
  - Pointer (pattern C, desktop): rig tilts, sky parallaxes.
- **Mobile.**
  - Copy stack first, then the front phone only (the back phone is hidden), at about 72vw wide, centered.
  - The v1 mobile pattern stays: one full-width primary CTA plus the "See plans and pricing" text link under the founder line (B's mobile fold).
  - Lighter motion: no pointer and no line drift.
- **Reduced motion.** All static, with the posters in the phones.

### S1b. WorkStack (v1, retired from the hero)
- Its job ("real work on the first screen") moves to `HeroRig`'s live phones and to the Night Drive section.
- Delete `WorkStack.tsx` once nothing imports it.
- The still screenshots in `public/work/*.webp` stay in use for the industry panels and the Capabilities bento.

### S2. ProofStrip (v2 position 2)
- **Copy: v1, unchanged.**
  - Facts: "Harlingen, TX · Nationwide", "English and Spanish", "Month-to-month on every plan", and "HIPAA BAA for healthcare" (linked to `/terms#baa`).
  - The visually hidden H2 "Clients and facts" stays.
  - Caption: "Some of the businesses we've built for."
- **Facts.** Outline pills (Geist Mono 12.5px, `--ev-hair-2` ring, haze text). The BAA pill is sand with a gold underline on hover.
- **Caption.** Promoted to a visible display line: Bricolage 800, wdth 86, ~48px, max 18ch. The text is the same.
- **Logo tapes.** See §7.
- **Motion.** Facts and caption rise (`ev-rise`). The tapes loop and react to velocity (pattern E).
- **Reduced motion.** Static full-color grid (§7).

### S3. MedspaSuite `#medspas` (v2 position 3): "golden hour, close-up"
This is the warmest room on the page. The sun is half-set here (its scrub ends at this section's bottom), and the section sits on a translucent plum panel (`--ev-plum` at 72%) with a large soft coral-to-peach glow behind the arch.
- **Copy: v1, unchanged, including the Aesthetic Record background.**
  - Eyebrow: "For medspas and aesthetic practices".
  - H2: "Built for medspas that want a fuller **book**." It is set in Bricolage **300**, with "book" in 800 `--ev-peach`.
  - The lede, the four capability blocks with their plan lines, the BAA text, the D'Vash credit, the compliance footnote, both CTAs and the "See the plan we recommend for medspas" link all stay as v1.
- **Arch (from A).**
  - A tall double-hairline arch (`border-radius: 50% 50% 0 0 / 34% 34% 0 0`, 1px peach at 40% plus an inner 1px at 18%), lit from the top by a peach radial glow.
  - Inside it stands a browser frame showing the D'Vash **desktop** capture (`dvash-aesthetics-desktop`). It auto-scrolls with reading holds (pattern D), with a `-desktop-poster.webp` first.
  - The arch, browser and glow sit at three parallax depths on desktop (scrub: arch y -40, browser y -80, glow y +60). The browser links to the live site.
- **Treatment menu (from A).**
  - The four v1 capabilities are laid out like an upscale spa menu, in two columns on desktop and one on mobile.
  - Each title is Bricolage 300, 26px, sand. A dotted peach leader (`border-bottom: 1px dotted`) runs to the plan line, which is right-aligned, Geist Mono 12px, gold.
  - The body copy sits under it in haze.
  - Each line reveals from a mask: `yPercent: 100` to `0`, stagger 0.1, `expo.out`.
- **HIPAA plaque (from A; replaces v1's circular seal).**
  - A double-hairline rectangle (outer 1px peach at 35%, inner 1px `--ev-hair` with 6px inset) on `--ev-night`.
  - Mono label "HIPAA BAA", then the v1 H3 "HIPAA Business Associate Addendum", the v1 body and the link "Read the addendum".
  - No seal, no badge graphic, no rotating ring. It must never look like a certification.
- **CTAs.** The primary is tangerine ("Book a free strategy call"). The text link is sand with a gold underline.
- **Rules.**
  - No outcome claims and no before/after imagery.
  - Never name Aesthetic Medicine MD or the Tacoma client.
  - Keep `data-chat-hold` on the wrapper.
- **Mobile.** Arch and browser first (the arch is shorter), then the menu, then the plaque. No parallax.
- **Reduced motion.** Static poster, no parallax, menu lines visible.

### S4. Night Drive `#work` (new section, v2 position 4; replaces WorkStack's job)
- **New copy (v1 has no showcase heading):**
  - H2: "Real sites we built. **Open any of them.**" The second sentence gets the sunset gradient (this viewport's one gradient text).
  - Lede: "Each one is a working client website. Scroll through it here, or open it and look around."
  - Why: B's "Live right now" goes stale the day a capture ages, and this line stays true.
- **Slides (in this order).** Data goes in `lib/work.ts`. Captures are in `public/work/scroll/`.

  | # | Name | URL | Desktop / mobile capture | Industry label |
  |---|---|---|---|---|
  | 1 | Us To You Mobile Health | https://www.ustoyoumobilehealth.com | `us-to-you-mobile-health-desktop.webp` / `-mobile.webp` | Mobile health care |
  | 2 | RGV Scalp Ink | https://www.rgvscalpinkllc.com | `rgv-scalp-ink-desktop.webp` / `-mobile.webp` | Scalp micropigmentation |
  | 3 | Premium Foam | https://www.cclcontracting.com/spray-foam-insulation/ | `premium-foam-desktop.webp` / `-mobile.webp` | Spray foam insulation |
  | 4 | Mac's Dove Hunts | https://www.macsdovehunts.com | `macs-dove-hunts-desktop.webp` / `-mobile.webp` | Guided hunts |

  - **Mac's.** Its mobile capture has the "GUARANTEED" heading clipped by the live site's reveal animation. Re-capture it with the existing script, waiting longer for reveals: `node cap.mjs <outdir> macs-dove-hunts`, run from the scratchpad `cap/` folder. If the re-capture is not clean, use **CCL Contracting** (`ccl-contracting-*`, https://www.cclcontracting.com, "General contractor") as slide 4.
  - **D'Vash is not repeated.** It already appears in the hero and the medspa band.
  - **Belleza De Oro, Face Forward and DrBrainRx are logos only.** Their live domains are not our builds.
  - Each slide shows the mono meta (industry label only; **add a city only if it is verified** on the client's live site or in `lib/industries.ts`), the client name in Bricolage 800 (~44px), one plain line, and a ghost "Visit the site" button that opens in a new tab.
  - The slide lines stay descriptive, with no metrics and no outcomes:
    - Us To You: "A site that explains mobile care simply and keeps booking within reach."
    - RGV Scalp Ink: "A dark, editorial studio site with a consultation button on every screen."
    - Premium Foam: "Seven foam systems, each explained plainly, with an estimate request on every page."
    - Mac's: "A hunt-season site that puts dates, packages and booking up front."
  - **Verify each line against the live site before shipping**, and rewrite any line the site does not support.
- **Desktop (≥1024, fine pointer, motion allowed).** Pinned horizontal pan (pattern F).
  - Each slide is 78vw (min 960px) so the next one peeks in.
  - A laptop frame (16:10 screen) shows the desktop capture scrolling its full length as you move through the slide. An overlapping phone shows the mobile capture scrolling to 85%. The devices swing in 3D (rotateY -14° to 12°).
  - The client name passes behind in giant outline type (`.ev-ghost`, wdth 75, 18% sand stroke).
  - **Index chips** (graft of A's client index) sit on a bottom rail: four names in Geist Mono 12px. The active one turns sand with a gold dot; the others stay dim. The sunset `.ev-nd-progress` line scrubs above them. Clicking a chip scrolls to that slide.
  - The pin length equals the track overflow, about 2.4 viewports for 4 slides. Hard cap: if `distance()` exceeds 3.2 × innerHeight, drop slide 4.
  - **The dusk overlay reaches full violet as this section reaches the top** (pattern B).
- **Mobile, tablet and touch.** No pin.
  - A native horizontal scroll-snap strip (`scroll-snap-type: x mandatory`, slides 86vw, 16px gap and gutter), with phones only and no laptops.
  - Each phone auto-scrolls with reading holds (pattern D) only while its slide is at least 50% visible: an IntersectionObserver with `root` set to the strip and `threshold: .5` plays and pauses the timeline.
  - Index chips become dots under the strip.
- **Reduced motion (from C).** A still 2x2 grid of browser frames showing the top crop of each desktop capture (`object-fit: cover; object-position: top`), each with its caption and "Visit the site". Frames are `overflow: auto` so a visitor can scroll each site by hand. On mobile it is a single column.
- **Accessibility.**
  - The section has `aria-labelledby` set to its H2, and each slide is an `<article>` with its own H3 (the client name).
  - Device frames are links with an `aria-label` of "{name} website, built by us (opens in a new tab)".
  - Capture `alt`: "Full page of the {name} website".
  - Keyboard focus scrolls the pin to the focused slide (pattern F `focusin`).
- **Known content note.** The Us To You capture includes that client's own reviews widget (stars). It is their site's content, and we make no claim about it. If the owner objects, re-capture with the widget hidden (§12).

### S5. IndustrySwitcher / IndustryTabs (v2 position 5)
- **Copy: v1, unchanged.** H2 "Pick your business. See what we'd set up.", the lede, all panels from `lib/industries.ts`, and the tab labels.
- **Band.** `--ev-night` at 85% over the dusk sky.
- **Tabs.**
  - Large Bricolage pill chips (wdth 86, 20px, 600) on a `--ev-plum-2` rail.
  - The active chip is a tangerine fill with a midnight label. It is the only non-CTA tangerine on the page; it is allowed because the active tab is an action state. Keep at most one active chip visible.
  - The fill slides between chips: one absolutely positioned `.ev-tab-pill` with a fixed base width of 100px and `transformOrigin: "left center"`. On tab change, run `gsap.to(pill, { x: tab.offsetLeft, scaleX: tab.offsetWidth / 100, duration: 0.5, ease: "power3.out" })`. Never animate `width`.
- **Panels.**
  - The active panel crossfades and rises 24px (`autoAlpha`/`y`, 0.5s).
  - Panel backgrounds take a faint tint from one sunset stop per tab: gold, coral, magenta, violet at 8% over plum.
  - Keep v1's no-height-change grid-stack technique and the WAI-ARIA tabs behavior exactly.
- **Panel imagery.** Stills stay. Each sits in the same `DeviceFrame` browser chrome as Night Drive, for consistency.
- **Reduced motion.** Instant switch.

### S6. Capabilities (v2 position 6)
- **Copy: v1, unchanged.** H2 "One team runs the whole **system**." The word "system" gets the sunset gradient. The lede, all five cards with title, body, tag and "more" link, and "See every service" stay.
- **Layout.** An asymmetric bento of 5 cells, never 3 equal cards.
  - **Website** spans 7/12, with the CCL still in a browser frame and the frame's screen gently auto-scrolling the `ccl-contracting-desktop` capture (pattern D, desktop only).
  - **Google & local SEO** spans 5/12.
  - **Google & Meta ads** spans 5/12 on a **sunset gradient fill with midnight text**. Midnight on gradient passes AA at every stop: the lowest is violet at 4.80.
  - **One inbox and follow-up** spans 7/12.
  - **Social & content** is full width.
- **Cards.** Double bezel: outer `--ev-hair` ring at 24px radius, inner core `--ev-plum` at 20px radius, padding 28 to 36px.
  - Tags are Geist Mono gold.
  - Hover: the card lifts 4px, and a cursor-following spotlight appears (a radial gradient positioned by the CSS vars `--mx`/`--my`, set on pointermove; it updates only while hovered, desktop only).
- **Motion.** Cells rise with `ScrollTrigger.batch`, stagger 0.06.
- **Mobile.** Single column.

### S7. Process `#how-it-works` (v2 position 7)
- **Copy: v1, unchanged.**
  - H2 "Your new site, live in as little as 8 to 10 **days**." The word "days" is sand at 800, not gradient, because Capabilities already used this viewport's gradient.
  - The "8-10 / Days to launch" numeral, all three steps, "Your part / Our part", the setup note and the CTA stay.
  - The owner TODO from v1 still applies: confirm "8 to 10 days" before launch.
- **Layout (from B, with C's lighting).**
  - The numeral is huge Bricolage, wdth 75, ~180px, outlined sand at 30% with the digits filled sand.
  - A horizontal track runs under three step columns, with one 2px sunset line drawn by `scaleX` scrub from 0 to 1 (`trigger: .ev-steps, start: "top 75%", end: "bottom 55%", scrub: true`).
  - **Each step lights up when the line reaches it** (from C). The step's mono "Days" label goes from dim to gold and its dot fills tangerine-to-gold. Use ScrollTrigger callbacks at 0, 0.5 and 1 of that range to toggle `.is-lit`; the color change is a CSS transition of `color` on small text only, which is not a per-frame animation.
- **Mobile.** A vertical line (`scaleY`) on the left.
- **Reduced motion.** The line is fully drawn and every step is lit.

### S8. PlanLadder `#plans` (v2 position 8)
- **Copy: v1, unchanged.**
  - Eyebrow "Plans and pricing", H2 "Prices up front. No call required.", and the lede.
  - Names, prices, fees and descriptions from `PLANS` plus the `COPY` map. "Recommended" on Build the Machine (never "Most popular").
  - The "Start {plan}" buttons go to the checkout URLs.
  - Below the ladder: the social plans line (`SOCIAL_PLANS`), the help block with the CTA plus "Compare every feature", and the footnote.
- **Staircase (desktop).**
  - Four double-bezel cards in a row. Each card sits 44px higher than the one to its left (`translateY` set in CSS, not animated), climbing left to right toward the violet glow.
  - Plan names are Bricolage 300, 28px. Prices are Bricolage 800, wdth 75, 72px, sand, with `$` in gold at 0.5em.
  - The fee line is Geist Mono gold.
- **Build the Machine (featured).**
  - The price is in the sunset gradient.
  - The card has a rotating sunset ring: `::before` is an oversize `conic-gradient` rotating 7s linear, clipped by the card's radius, with a 1.5px gap to the plum core.
  - The "Recommended" chip is tangerine with a midnight label.
  - Its "Start Build the Machine" button is the only filled tangerine button in the ladder. The other three are sand ghost buttons.
- **Motion.**
  - Cards rise in a stagger (pattern H), and prices rise from the mask.
  - **There is no count-up and no odometer.** Every visible number is always a real price.
  - The ring pauses off screen.
- **Mobile.**
  - Stacked cards (no steps), with the featured card second, as in v1 order (PLANS order is unchanged).
  - Collapse descriptions after 3 lines with a native `<details>` "More" only if the stack exceeds 4 screen heights. Measure this, don't assume it.
- **Reduced motion.** Static, with the ring standing still.

### S9. RiskReversal (v2 position 9)
- **Copy: v1, unchanged.** H2 "What you're signing up for", all four items (month-to-month, accounts stay yours, ad spend direct, HIPAA BAA with link) and the honesty line about rankings and 60 to 90 days.
- **Treatment.** Calm on purpose; trust copy should not dance.
  - Midnight band with the four statements in a 2x2 grid on desktop. Each has a 1px gold hairline above it and no card.
  - H3s are Bricolage 600, wdth 100. Bodies are haze.
  - The honesty line is set larger (20px) in sand, under a sunset hairline.
- **Motion.** Slow fade-ups only (`ev-rise`, 1.2s).

### S10. AiSection (v2 position 10): the violet hour
- **Copy: v1, unchanged.** H2, lede, the three links, and the three rows (inquiry follow-up, after-hours chatbot, custom tools).
- **Treatment.** A night band with a slow violet orb: a radial gradient of `--ev-violet` at 35% that drifts with a 20s CSS loop on desktop and is static on mobile. The label color here is `--ev-violet-text`.
- **Example thread (from C).** A small glass conversation panel on the right shows three bubbles. Bubbles reveal in sequence on enter (stagger 0.35, `y: 12`, `autoAlpha`) and never loop.
  - The panel is captioned with a mono label: **"Example"**.
  - The bubbles illustrate the v1 rows in plain words and contain no numbers or claims:
    1. Lead: "Hi, do you have anything open this week?"
    2. Auto reply: "Thanks for reaching out! Here's our booking link, and someone from our team will follow up shortly."
    3. Team: "Hi, this is Kelsey. I saw your message and can help you pick a time."
  - **No missed-call framing anywhere.** The three rows sit under or beside the panel.
- **Reduced motion.** All bubbles visible.

### S11. BlogEditorial (v2 position 11)
- **Copy and data: v1, unchanged** (three latest posts from `lib/posts.ts`, "From the blog", "All articles").
- **Treatment.** Asymmetric 1 + 2 layout: one wide card with the excerpt, two narrow title cards, all double-bezel plum.
  - B's proposed duotone image overlay applies only if the posts render images. v1 is text-only, so keep text cards.
  - Hover: the card lifts 4px and a gold underline draws under the title (`scaleX`).
- **Mobile.** A hairline-divided list, as in v1.

### S12. HomeFaq `#faq` (v2 position 12)
- **Copy: v1, unchanged.** H2 "Questions owners ask before they sign", the lede, and every item from `homeFaqs`. The FAQ JSON-LD is untouched and still rendered from the same source.
- **Treatment.**
  - Full-width native `<details>` rows with hairline separators. Questions are Bricolage 600, wdth 100, 22px.
  - A sand plus mark rotates 45° into an x (transform, 0.4s `power3.out`).
  - Answers open with the grid-rows trick (`grid-template-rows: 0fr` to `1fr` on a wrapper; no height animation). Keep native `details` semantics. The first item is open, as in v1.

### S13. FinalCta `#final-cta` (v2 position 13): the sun comes back
- **Copy: v1, unchanged.** H2 "Talk to the people who'll **build** it." ("build" is gradient), the lede, both CTAs, the reassure line, the contact list and both founder portraits with their titles.
- **Treatment.**
  - A gold orb (`.ev-final-sun`, radial gold to tangerine to transparent) rises behind the portraits: `yPercent: 60` to `0`, scrubbed from `top bottom` to `center center`. The scroll story ends where it began.
  - The H2 is huge Bricolage, ~96px on desktop.
  - The primary CTA is magnetic tangerine.
  - Remove the v1 giant "RGV" watermark; the sun replaces it.
  - The section ends with a 160px gradient from midnight to `var(--navy)` and a 1px `--ev-sunset` hairline, so the shared navy footer joins cleanly.
- **Reduced motion.** The sun is static at its final position.

### S14. StickyCta (mobile <768px; v2 position 14)
- **Logic: v1, unchanged.** It shows after `#hero-cta` leaves through the top, hides while `#final-cta` is on screen, and is `inert` and `aria-hidden` when hidden.
- **Copy: v1, unchanged.** "Websites from $397/mo · Month-to-month" (from `PLANS_FROM`) plus "Book a free call".
- **Treatment.**
  - A midnight glass bar (`--ev-night` at 80% plus blur) with a hairline ring and a tangerine pill button.
  - `env(safe-area-inset-bottom)` padding.
  - It slides up with `transform` at 0.5s `expo.out`.

### S15. Footer
Unchanged (shared). See §1.5.

---

## 7. Animated logo band (ProofStrip)

**Every logo is a real client.** No invented logos, no "as seen in", no client counts.

### Two "crossing tape" strips that never cross
- **Tape A** (gradient, health and beauty): a `--ev-sunset` band 112px tall on desktop and 84px on mobile, rotated **-2.5°**. Logos render as midnight silhouettes (`filter: brightness(0)`), with a 6s CSS sheen sweep (a white 18% band).
- **Tape B** (plum, local and trades): a `--ev-plum` band with a hairline top and bottom, rotated **+1.5°**, moving the opposite way. Logos render as sand silhouettes (`filter: brightness(0) invert(1)`, opacity .82).
- **They never overlap.** Place them with a vertical gap so their closest approach, at the left edge where the opposite tilts converge, is at least 24px at every width from 390 to 1920. Verify with screenshots at 390, 768, 1024, 1440 and 1920. **Every logo must be fully visible at all times** (this fixes B's own critique).
- Both tapes are wider than the viewport (`width: 120vw; margin-left: -10vw`). The band clips with `overflow: clip` on the section, so there is no horizontal page scroll.
- **Hover and focus (from C).** A logo shows its **true colors**: the filter is removed and the logo gets a small sand plate behind it (`--ev-sand` pill at 96%, 10px padding) so dark logos stay visible on either tape. It scales 1.06, transitioning only `filter` and `transform` (one element, not per frame).
  - Linked logos keep v1 behavior: an outbound link to the client site (dofollow, `rel="noopener"`, new tab).
  - `alt` is "{name} logo".

### Order
**Tape A (9):**
1. D'Vash Aesthetics
2. **Face Forward Regenerative Aesthetics**
3. Glammed Up Aesthetics
4. **DrBrainRx**
5. 6 Day Medical Weight Loss
6. **Belleza De Oro Salon**
7. The Spa Business Coach
8. Us To You Mobile Health
9. NeuroMotion Rehabilitation

**Tape B (9):**
1. RGV Scalp Ink
2. CCL Contracting
3. Premium Foam
4. V&S Painting & More
5. STX Swing Doctor
6. Tsukie Coffee
7. EZ Clean Express
8. La Feria Co-op Gin & Supply
9. Mac's Dove Hunts

Mac's has no logo file, so it renders as a text wordmark: Bricolage 800, wdth 75, 22px, sand. That is what v1 does, restyled.

### The three new logos
Files are already in `public/clients/`; the entries are already in `lib/clients.ts`. Both are uncommitted, so commit them with the build.

| Client | File used | Source | Tape-A height (start) |
|---|---|---|---|
| Face Forward Regenerative Aesthetics (https://faceforwardstl.com) | `/clients/face-forward-trim.png` (900x82, black wordmark) | Horizontal wordmark from faceforwardstl.com. Use this full wordmark, **not** the helix-only mark from concept B | 24px, max-width 210px |
| DrBrainRx (https://www.drbrainrx.com) | `/clients/drbrainrx-trim.png` (900x148) | SVG logo from the drbrainrx.com MedicalBusiness schema, rendered to PNG | 30px |
| Belleza De Oro Salon (https://www.bellezadeorosalon.com) | `/clients/belleza-de-oro-trim.png` (700x181, "BELLEZA DE ORO / SALON / EST. 2025") | og:image wordmark from bellezadeorosalon.com. Use this one, not the thin gold script: the script is too faint at strip size (B and C both reported it) | 44px |

- **Filters handle the color.** The silhouette filter renders all three as midnight on tape A, so no `-light` variant is needed. Keep `face-forward-trim-light.png` and `belleza-de-oro-trim-light.png` for the hover plate if a dark-plate variant is ever wanted.
- **Heights for the other logos.** Start from v1 `LOGO_HEIGHTS` × 1.15 (the visible-area rule) and tune by eye on screenshots so every mark carries similar visual weight. Two known weak marks at strip size are Tsukie Coffee and La Feria (detailed badges). Give them +10% and accept it, or ask the clients for simpler lockups (§12).
- **Motion.** Pattern E: 46s and 52s loops, speed up to 7× with scroll velocity, settle over 1.2s, **reverse direction when the visitor scrolls up**, and pause off screen. On mobile the loops run at 60s and 66s.
- **Reduced motion and no JS.** The tapes are replaced by a still full-color grid (from C): 6 columns on desktop, 3 on mobile, logos in true color on small sand plates, untilted. v1's `home.css` already moved the grid to 6 columns for 18 cells; carry that over.

---

## 8. Build showcase and captures

- **Captures are in place** and look clean (WebP q72, all under 350 KB). They are in `public/work/scroll/`:
  - **Desktop:** 1200x3500 (the top 4200px of the page at 1440 wide, scaled down).
  - **Mobile:** 780x7200 (the top 3600 CSS px at 2x).
  - **Slugs:** `dvash-aesthetics`, `us-to-you-mobile-health`, `rgv-scalp-ink`, `premium-foam`, `ccl-contracting`, `macs-dove-hunts`.
  - Popups, chat widgets, cookie bars and sticky non-header bars were hidden.
- **New posters to generate** (sharp, WebP q72, top crop, ≤60 KB each):
  - `dvash-aesthetics-mobile-poster.webp` (780x1688)
  - `us-to-you-mobile-health-mobile-poster.webp` (780x1688)
  - `dvash-aesthetics-desktop-poster.webp` (1200x750)
  - One `-desktop-poster.webp` per Night Drive slide (1200x750), used as the reduced-motion grid crop and as the pre-swap frame.
  - **Commit the posters.**
- **Capture script.** `/private/tmp/claude-501/-Users-rgvpm-orca-workspaces-RGVPM---Internal-RGVPM-Site/acefae01-5fa9-4713-8f4f-b48109e061d4/scratchpad/cap/cap.mjs` (`node cap.mjs <outdir> <slug>`).
  - It lives in a temporary scratchpad. Copy it into the repo as `scripts/capture-work.mjs` with a README note; it uses its own Playwright and sharp install, so add none to `package.json`.
  - Re-capture every quarter, or whenever a client site changes. Stale captures are the main risk of this showcase.
- **Where the builds move:**
  - **Hero:** two live phones (D'Vash, Us To You).
  - **MedspaSuite:** D'Vash desktop in a browser inside the arch.
  - **Night Drive:** four slides.
  - **Capabilities:** CCL desktop in the Website cell.
  - **The owner's ask is met:** no build ever appears as a still screenshot except in reduced motion and in the industry panels.
- **Loading:**
  - Hero posters are eager.
  - Every tall capture is `loading="lazy" decoding="async"` and served through `next/image` with `sizes` matching the rendered width (phones about 300px; laptop screens about 760px on desktop) and `unoptimized={false}`, so Next serves resized WebP.
  - For the tall images, give `next/image` the true intrinsic `width`/`height`, and set `quality={70}`.

---

## 9. Performance and accessibility budgets (must pass before merge)

### Performance (Lighthouse mobile, Netlify deploy preview; median of 3 runs)

| Metric | Budget |
|---|---|
| Performance score | ≥ 75 (hard floor 70) |
| LCP | ≤ 2.5s (LCP element = H1 text) |
| CLS | ≤ 0.05 |
| TBT | ≤ 250ms |
| INP (field, later) | ≤ 200ms |
| Homepage-only JS added | ≤ 70 KB gzipped (GSAP core + ScrollTrigger + SplitText ≈ 60 KB, plus our motion modules), all loaded after idle |
| Fonts preloaded on `/` | Bricolage only (≤ 70 KB woff2). Geist and Geist Mono not preloaded |
| Above-the-fold images | ≤ 2 posters, ≤ 120 KB combined |
| Initial transfer (no scroll) | ≤ 900 KB |

Also confirm:
- No console errors.
- No horizontal scroll at 360, 390, 768, 1024, 1440 and 1920.
- `ScrollTrigger.getAll()` is empty after navigating away from `/` (cleanup works).
- Inner pages are visually unchanged: screenshot-diff `/pricing`, `/about`, `/services/website-design`, `/blog` and `/terms` against `main`.

### Accessibility
- Lighthouse accessibility ≥ 95, with AA contrast for every text pair (tokens above). Small text never uses violet, dim below 14px, or white on tangerine.
- Exactly one H1, and the heading order stays logical. The visually hidden "Clients and facts" H2 stays.
- Everything is reachable by keyboard, including Night Drive slides (focus scrolls the pin), logo links (the duplicate track is `aria-hidden` with `tabIndex=-1`) and tabs (WAI-ARIA, as in v1).
- Visible focus rings: a 2px gold outline with a 3px offset on every interactive element.
- **`prefers-reduced-motion: reduce`.** No GSAP motion, no CSS loops, no parallax, no pins. Logos become a full-color grid, builds become a 2x2 grid of scrollable frames, and every number and line is visible.
- **`prefers-reduced-transparency`.** Solid nav and sticky bar.
- Decorative layers (sky, ticker, ghost names, halo, grain) are `aria-hidden`.
- Touch targets are ≥ 44px.

---

## 10. Hard rules (unchanged, restated)
- **No fabrication.** No testimonials, stats, ratings, results, client counts or logos we did not earn. Client sites shown in captures may contain their own reviews widgets; we add no claims about them.
- No medical outcome claims, no before/after.
- Never name Aesthetic Medicine MD (or the Tacoma medspa client).
- No missed-call angle anywhere, including the AI example thread.
- **Prices only from `lib/site.ts` (`PLANS`, `SOCIAL_PLANS`, `PLANS_FROM`)**, which mirrors `components/PricingTabs.tsx`. **No animation may ever display a number that is not the real price.**
- Keep the homepage `<title>`, canonical, FAQ JSON-LD and single H1.
- One primary CTA style (tangerine) per viewport. Buy-now ("Start …") buttons appear only in the plan ladder.

---

## 11. Signature-moment checklist (the builder must hit every box)

- [ ] **1. Golden hour boots up.** On load the sky blooms, the H1 settles from `translateY(22%) skewY(6deg)` (pure CSS, text painted on frame 1), and the lede, CTAs and phones rise. "booked" carries the sunset gradient. The outlined ticker band sits under the hero and slides with scroll.
- [ ] **2. Live phones in the hero.** D'Vash (front) and Us To You (back) phones show the poster first, swap to the tall capture on idle, then auto-scroll with reading holds. They tilt toward the cursor on desktop, and a halo ring turns behind them.
- [ ] **3. Scroll is the sunset.** The sun sinks from the hero to the end of `#medspas`. A violet dusk rolls in by the time `#work` hits the top. The final CTA's sun rises again.
- [ ] **4. Crossing tape.** Two tilted tapes run in opposite directions without ever overlapping, carrying 18 real logos, including Face Forward (full wordmark), DrBrainRx and Belleza De Oro (wordmark). Speed follows scroll velocity and reverses on scroll-up. Hover and focus show true colors. Reduced motion shows a full-color grid.
- [ ] **5. Golden-hour medspa room.** A peach-lit double-hairline arch frames the auto-scrolling D'Vash desktop site with three-depth parallax. The four capabilities are set as a treatment menu with dotted leaders, the HIPAA BAA is a still plaque (no seal), and the H2 uses the light Bricolage weight with "book" in peach.
- [ ] **6. Night Drive.** Desktop: a pinned horizontal pan through 4 live client sites in laptop and phone frames, captures scrolling inside the frames, a 3D swing, outline ghost names, index chips plus a sunset progress line, and focus-to-slide for keyboards. Touch: a swipe strip with auto-scrolling phones. Reduced motion: a scrollable 2x2 grid.
- [ ] **7. The price staircase.** Four plans rise as a staircase. Prices slide up from a mask and **never count**. Build the Machine has the rotating sunset ring, the gradient price and the only filled Start button.
- [ ] **8. Supporting motion.**
  - Masked word reveals on every H2.
  - The Process line draws itself and lights each step.
  - The industry tab pill slides between tabs.
  - The bento has a spotlight on hover.
  - The FAQ plus rotates into an x.
  - The AI example thread reveals in sequence (labeled "Example").
  - CTAs are magnetic on desktop.
- [ ] **9. Homepage-only.** Inner pages pixel-match `main`, and the nav island appears only on `/`.
- [ ] **10. Budgets in §9 met** on a Netlify preview: Lighthouse mobile ≥ 75 (floor 70), CLS ≤ 0.05, no console errors, no horizontal scroll.

---

## 12. Owner decisions and open items
1. **Client permission to list.** Confirm that Face Forward, DrBrainRx and Belleza De Oro are happy to appear in the logo band. The files came from their own sites (and our Belleza build) and match agency records. DrBrainRx appears as a logo only, never as a case study or template.
2. **Logo on night.** The default is the full-color logo as is. Option: a single-color sand version for the homepage nav only. That would be a brand change, so it is the owner's call.
3. **Us To You reviews widget** in the capture: keep it (their content), or re-capture with it hidden.
4. **Night Drive slide 4.** Mac's Dove Hunts if the re-capture is clean, otherwise CCL Contracting.
5. **Process "8 to 10 days"** is still pending owner confirmation, carried over from v1.
6. **Rolling the look to inner pages.** The homepage is dark and inner pages stay cream and navy until approved, so clicking through to `/pricing` will feel like a shift. That is expected for this homepage-first test.
7. **Belleza De Oro in Night Drive** once our Netlify build is live on bellezadeorosalon.com.

## 13. Build order
1. Install `gsap@3.13.0`. Add the fonts, wrapper class and `afterglow.css` tokens. Turn off the page transition on `/`. Add the Nav `data-variant`.
2. Sky layer, then the hero (CSS intro, HeroRig with posters), then the ticker. Check LCP now.
3. Logo tapes and the reduced-motion grid.
4. MedspaSuite room.
5. Night Drive: desktop pin, touch strip, reduced-motion grid, and keyboard behavior.
6. Restyle IndustrySwitcher, Capabilities, Process, Plans, RiskReversal, AI, Blog, FAQ, FinalCta and Sticky.
7. Motion modules, then the reduced-motion pass, then the mobile pass.
8. Budgets (§9) on a Netlify preview, inner-page screenshot diff, and screenshots at 390 and 1440 for the owner.
