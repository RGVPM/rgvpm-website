# Homepage redesign: design spec

Date: 2026-10-14. Branch `design/home-redesign`. Status: draft for owner review. Nothing here ships until the owner signs off on the "Owner decisions" list (section 6).

Inputs: `site-audit.md`, `medspa-research.md`, `psychology-cro.md`, `design-direction.md`, `teardown.md` (redesign scratchpad), `components/PricingTabs.tsx` (price source), `lib/faqs.ts`, `lib/site.ts`, `lib/clients.ts`, `app/about/page.tsx`, `app/terms/page.tsx` (#baa).

Art direction name: **Quiet Confidence.** Editorial luxury with restraint, built on the existing navy / orange / cream identity. A plumber should feel welcome. A medspa owner should feel the taste.

---

## 1. Goals and success criteria

### Goals
1. **Look like a $500K agency.** Premium comes from space, type, real work and restraint. No effects for their own sake.
2. **Comfortable for any small business to sign up.** Prices on the page, month-to-month stated next to every price, a direct "Start" path for ready buyers, a free call for everyone else.
3. **A clear medspa focus.** A medspa owner should see their world within one scroll (D'Vash screenshot in the hero, a dedicated medspa band right after the proof strip, the HIPAA BAA, the founders' Aesthetic Record background).
4. **Honest buying psychology.** Anchoring, risk reversal, authority, liking, specificity and commitment ladders, using only true statements and real assets.
5. **Keep the SEO equity.** Title, JSON-LD, FAQ schema, internal links, one server-rendered H1.

### Success criteria (measured at ship, then at 30 days)
| Criterion | Target |
|---|---|
| 5-second test (3 to 5 people, mixed industries) | Can say what we do, who it's for, and the starting price |
| Medspa recognition | A medspa owner sees "medspa" and the BAA without scrolling more than one screen past the hero |
| Primary CTA label | One label for booking intent site-wide on the homepage ("Book a free strategy call", compact "Book a free call") |
| Fabricated proof | Zero. No counts, ratings, testimonials, awards, results |
| Retired angle | Zero mentions of missed-call text-back on the homepage |
| Mobile LCP (Lighthouse, Moto G Power / Slow 4G) | < 2.5s (audit baseline 3.37s) |
| CLS | < 0.05 (audit baseline 0.16 to 0.20 desktop) |
| Page height at 390px | ≤ 10,500px (baseline 12,322px) |
| Lighthouse | Performance ≥ 90 mobile, Accessibility 100, SEO 100 |
| Events wired (GA4) | `hero_cta_click`, `medspa_cta_click`, `industry_tab_select`, `plan_start_click` (per plan), `pricing_link_click`, `final_cta_click`, `sticky_cta_click` |
| 30-day business signals | Booked discovery calls and Stripe/GHL checkout starts from `/` vs the prior 30 days (directional; traffic is small) |

---

## 2. Final design tokens

Additive only. New tokens go in `app/globals.css` `:root`. Existing tokens (`--orange`, `--navy`, `--cream`, `--muted`, `--teal`, `--r-*`, `--shadow-*`, `--fs-hero`, `--fs-h2`) are **not redefined**, so inner pages render unchanged. The one global value change is `--orange-ink` (darker, same hue, better contrast everywhere).

### 2.1 Color

| Token | Hex | Role | Text contrast |
|---|---|---|---|
| `--night` | `#0E1A2E` | NEW. Hero and final CTA band | white 17.41, cream 15.87 |
| `--navy` | `#1A2B4A` | Kept. Primary text on light; mid-dark surfaces | on cream 12.86, on bone 11.78 |
| `--navy-mid` | `#243658` | Kept. Card core inside dark bands | surface |
| `--navy-deep` | `#15233D` | NEW name for the existing gradient stop | on-dark-soft 8.75 |
| `--cream` | `#F7F4EF` | Kept. Page canvas | surface |
| `--bone` | `#EFEAE2` | NEW. Alternate light band (`--cream-dark` stays as an alias) | navy 11.78, ink-soft 5.55 |
| `--porcelain` | `#FCFBF9` | NEW. Card fill on cream (replaces pure white on the homepage) | navy ~14 |
| `--blush` | `#F3E6DF` | NEW. Medspa band surface only. Low-chroma tint of the orange hue, not a new accent | navy ~11.5 |
| `--ink-soft` | `#4E5D78` | NEW. Secondary body text on light (homepage replaces `--muted` with it) | cream 6.06, bone 5.55 |
| `--on-dark` | `#F7F4EF` | NEW. Headlines and body on night/navy | night 15.87 |
| `--on-dark-soft` | `#B9C2D3` | NEW. Secondary text on dark (replaces rgba whites) | night 9.72 |
| `--orange` | `#E8621A` | Kept. **Large CTA fill only** (≥19px/700 label) + at most one display accent per viewport | white label 3.39 (large text only) |
| `--orange-deep` | `#C2490C` | NEW. Compact CTA fill (nav, cards, sticky bar) and hover/pressed state of every CTA | white label 4.94 |
| `--orange-ink` | `#A8450B` | **CHANGED** from `#B54B0C`. Small orange text/links on light | cream 5.44, bone 4.98 |
| `--orange-on-dark` | `#F5833D` | Kept. Orange text on night/navy (the italic H1 word) | night 6.80 |
| `--success` | `#1F7A6F` | NEW. Ticks / "included" / form success. Teal darkened for AA | cream 4.70 |
| `--teal` | `#2A9D8F` | Kept for non-text icon fills only. Not used decoratively on the homepage | n/a |
| `--hairline` | `rgba(26,43,74,0.10)` | Borders on light | n/a |
| `--hairline-dark` | `rgba(247,244,239,0.10)` | Borders on dark | n/a |

Rules:
- **One accent per viewport.** Orange appears as the CTA fill and, at most, one italic display word or hairline. No orange labels, chips, arrows, bento cells or underlines.
- `--orange-light` is retired from buttons (hover would drop contrast to ~2.6). Hover goes darker (`--orange-deep`), never lighter.
- Color story: night hero, light body (cream / bone / blush / porcelain), night close. No auto dark mode in this pass.

### 2.2 Typography

Families stay. No new downloads.

| Role | Font | Spec |
|---|---|---|
| Display (H1, H2) | DM Sans 600, `opsz` 40, **mixed case** | `letter-spacing: -0.035em; line-height: 1.02`. One italic 500 word per headline for emphasis. Italic words with descenders get `line-height ≥ 1.1` and `padding-bottom: .08em` |
| H3 / card titles | DM Sans 600 | `-0.015em`, line-height 1.2 |
| Body | DM Sans 400, `opsz` 14 | 17px / 1.6, max 62ch |
| Labels | DM Mono 500 | 11.5px, uppercase, `0.12em`. **Max 3 eyebrows on the page** (hero, medspa band, plans) |
| Brand numerals | Bebas Neue | Only price figures ($397 / $597 / $899 / $1,499), the "8 to 10" figure in Process, and the outlined "RGV" texture in the final CTA |

Font loading: move to `next/font/google` in `app/layout.tsx` (`variable: "--font-dm-sans" | "--font-dm-mono" | "--font-bebas"`, `display: "swap"`, DM Sans `axes: ["opsz"]`). Remove the render-blocking `<link>`. This also fixes `--font-dm-mono`, which is referenced in ~20 places and never defined. See 4.4 for the safe rollout.

| Token | Value |
|---|---|
| `--fs-hero-2` | `clamp(40px, 5.6vw, 76px)` |
| `--fs-h2-2` | `clamp(32px, 3.8vw, 54px)` |
| `--fs-h3-2` | `clamp(20px, 1.8vw, 24px)` |
| `--fs-lede` | `clamp(18px, 1.4vw, 20px)` |
| `--fs-body-2` | `17px` |
| `--fs-small-2` | `14px` (minimum size for `--muted`) |
| `--fs-label-2` | `11.5px` |
| `--fs-numeral` | `clamp(56px, 7vw, 112px)` |

### 2.3 Spacing and grid
- `--container-wide: 1240px` (homepage). `--container` 1180px stays for other pages. FAQ and text blocks use 720px.
- 12-column grid, `column-gap: clamp(16px, 2vw, 28px)`. Splits are 7/5 or 5/7, never 6/6. Single column under 768px with a 16 to 20px gutter.
- `--section-y-lux: clamp(96px, 11vw, 168px)` for main bands. `--section-y-tight-lux: clamp(48px, 5vw, 72px)` for the proof strip and risk band.
- Inside a section: headline, 24px, lede, 48px, content. Keep `--s1`…`--s10`, add `--s11: 168px`.
- Hero: top padding ≤ nav height + 72px. Must fit 1440×900 and 390×844 with the primary CTA visible.

### 2.4 Shape, border, shadow
- Buttons, chips, nav CTA: full pill (`--r-pill`).
- Cards and panels: `--r-card: 20px`. Double-bezel shells: 24px outer, 18px inner, 6px padding.
- Media frames (screenshots): `--r-media: 14px`. Inputs: 12px.
- Double-bezel is reserved for three places: hero work frames, the medspa BAA panel, the plan ladder.
  - Light: shell `rgba(26,43,74,0.04)` + `inset 0 0 0 1px var(--hairline)`; core `--porcelain` + `inset 0 1px 0 rgba(255,255,255,.7)`.
  - Dark: shell `rgba(247,244,239,0.05)` + `--hairline-dark`; core `--navy-mid` + `inset 0 1px 0 rgba(255,255,255,.06)`.
- Borders: `inset 0 0 0 1px var(--hairline)`. No flat grey 1px borders.
- Shadows:
  - `--shadow-lux-1: 0 1px 1px rgba(14,26,46,.04), 0 8px 24px -12px rgba(14,26,46,.10)` (resting)
  - `--shadow-lux-2: 0 2px 4px rgba(14,26,46,.04), 0 24px 60px -24px rgba(14,26,46,.22)` (raised/hover)
  - `--shadow-lux-3: 0 40px 100px -40px rgba(14,26,46,.45)` (hero media on night)
  - `--shadow-cta: 0 10px 30px -10px rgba(232,98,26,.50), inset 0 1px 0 rgba(255,255,255,.18)` (primary CTA only)
- Texture: one SVG-noise pseudo-element at `opacity .035`, night bands only, `pointer-events: none`. Backdrop blur only on the sticky nav.
- CTA anatomy ("button in button"): pill, label, trailing 32px circle (`rgba(255,255,255,.16)`) with an arrow. Hover: circle `translate(2px,-1px) scale(1.05)`, fill to `--orange-deep`. Active: `scale(.98)`. Secondary CTA: ghost pill with `inset 0 0 0 1px` border in current text color.

### 2.5 Motion
- `--ease-lux: cubic-bezier(0.32, 0.72, 0, 1)` for entrances (700 to 900ms). Existing `--ease-out` for hovers (180 to 240ms).
- Animate `transform` and `opacity` only. `will-change` only during the animation.
- **Content is visible by default.** Keep the `.rg-reveal` pattern (`animation-timeline: view()` inside `@supports` and `prefers-reduced-motion: no-preference`). Reveal range ends by `cover 15%`. Nothing important starts at opacity 0 outside that block.
- **H1 never starts at opacity 0.** The hero stagger (60ms steps) animates transform plus opacity from 0.01 only on the eyebrow, lede and CTAs. The H1 display line animates `transform` only, so it paints immediately as the LCP element.
- Hero work frames settle from `translateY(24px) rotate(var(--r))`.
- One marquee on the page (logos). No other ambient loops.
- `prefers-reduced-motion: reduce`: every entrance resolves instantly, the marquee becomes a static wrapped logo grid, hover transforms become color-only.
- No animation libraries. CSS plus two tiny client leaves (industry tabs, sticky CTA).

---

## 3. Section-by-section blueprint

Page order:

| # | Section | Surface | Main lever |
|---|---|---|---|
| 0 | Nav (shared) | sticky, blurred | Cognitive ease, persistent CTA |
| 1 | Hero | night | Clarity, price-floor anchor, liking |
| 2 | Proof strip | bone (tight) | Mere exposure, authority |
| 3 | Medspa suite `#medspas` | blush | Identification, specialized authority |
| 4 | Industry switcher | cream | Self-selection, similarity |
| 5 | Growth engine | cream → porcelain cards | Chunking, price transparency |
| 6 | How it works `#how-it-works` | bone | Goal gradient, effort reduction |
| 7 | Plans `#plans` | cream + porcelain ladder | Anchoring, default, commitment ladder |
| 8 | Risk reversal | bone (tight) | Risk reversal, pratfall |
| 9 | AI in your marketing | cream | Differentiation, reciprocity |
| 10 | Blog row | cream | Research-stage exposure, internal links |
| 11 | FAQ `#faq` | bone | Objection handling |
| 12 | Final CTA | night | Peak-end, liking |
| 13 | Sticky mobile CTA | overlay | Persistent low-friction action |

Removed from the homepage: `SocialFollow` (LinkedIn band). Social links stay in the footer and schema `sameAs`.

Copy rules applied (copywriting + stop-slop): no em dashes in visible copy, no exclamation points, no "not X, it's Y" reveals, no negation lists, no stat we can't prove. Every price is from `PricingTabs.tsx`.

Booking URL in every "Book" CTA = `SITE.bookingUrl` (opens in new tab, `rel="noopener"`). Section-specific CTAs append UTM params (`?utm_source=homepage&utm_medium=cta&utm_content=<section>`); test that the GHL widget tolerates query params before shipping, otherwise drop them and rely on GA4 click events.

### 0. Nav (shared component, `components/Nav.tsx`)

In this PR (safe, site-wide):
- CTA label "Book with us!" becomes **"Book a free call"**, `--orange-deep` fill, pill.
- "Blogs" becomes **"Blog"**.
- Add a top-level **"Medspas"** link to `/#medspas` (becomes `/medspa-marketing` when that page exists).

Owner decision (section 6, #9): the lean nav from the audit, `Medspas · Services ▾ · Pricing · About · [Book a free call]`, moving Learn Claude Code, Blog and Contact to the footer and removing the duplicate AI entry.

### 1. Hero (night band)

**Job:** answer "what is this, is it for me, what does it cost" in five seconds, and show real work with a medspa site in front.

**Desktop (≥1024px):** 7/5 split inside 1240px. Left: eyebrow, H1, lede, CTA pair, microcopy row. Right: three real client sites as double-bezel frames in a soft Z-cascade: **D'Vash Aesthetics front** (`work/dvash-aesthetics.webp`, rotate −3°), Premium Foam middle (2°), Us To You Mobile Health back (−1°), `--shadow-lux-3`. Each frame links to the live site with an `aria-label`. Front frame has a mono caption below it: "dvashaesthetics.com". The review toast in the bottom-left of the D'Vash screenshot is cropped out (re-export the asset, or mask with `object-position` + a clip). Background: `--night` to `--navy-deep` gradient plus noise. Fits 1440×900 with CTAs visible.

**Tablet (768 to 1023px):** single column copy, then the front frame only, flat.

**390px:** copy stack, full-width primary CTA (52px tall), secondary CTA as a text link under it, microcopy row. Below the copy, the three frames flatten into a horizontal scroll-snap strip (no rotation, no overlap, 82vw each, 12px gap). The primary CTA must sit above the fold at 390×844. Only the front image gets `priority` / `fetchPriority="high"`; the other two load lazily.

**Copy (final):**
- **H1** (one element, two visual parts):
  - Eyebrow span inside the H1, styled as a DM Mono label: **"AI & marketing agency · Harlingen, TX · Serving businesses nationwide"**
  - Display line: **"Get found first. Get *booked*."** ("booked" in DM Sans italic 500, `--orange-on-dark`)
  - Markup: `<h1><span class="rg-h-eyebrow">AI &amp; marketing agency · Harlingen, TX · Serving businesses nationwide</span><span class="rg-h-display">Get found first. Get <em>booked</em>.</span></h1>`. This keeps keyword, place and positioning inside the H1 without a robotic headline.
- **Lede:** "We build your website, get you found on Google, run your ads, and set up AI that follows up with new inquiries. One team, month-to-month, with a specialty in medspas."
- **Primary CTA:** "Book a free strategy call" → `SITE.bookingUrl` (`utm_content=hero`)
- **Secondary CTA (ghost pill on desktop, text link on mobile):** "See plans and pricing" → `#plans`
- **Microcopy row:** two 32px circular founder photos (`founders/derrick.jpg`, `founders/kelsey.jpg`, overlapping by 8px) + "You'll talk to Derrick or Kelsey. Plans from $397/mo, month-to-month."

A/B alternatives for the display line (test after launch, one at a time):
- A (control for the test): "Your competitor isn't better. They just show up first." (current live line; strong loss-aversion frame)
- B: "Fill your calendar. Keep it full."

The old proof row ("Local team in Harlingen · 50+ live client sites · AI consulting & builds") is removed. Its true parts move to the proof strip.

### 2. Proof strip (bone, tight)

**Job:** real logos and four true facts, right under the hero, before any pitch.

**Desktop:** a 4-item fact row (DM Sans 15px/500, `--navy`, separated by hairline dividers), then the logo marquee below it. Logos rendered monochrome (`filter: grayscale(1); opacity: .7`, to 1 on hover/focus), max height 56px. Logo order puts aesthetics and health first: D'Vash Aesthetics, Glammed Up Aesthetics, 6 Day Medical Weight Loss, The Spa Business Coach, Us To You Mobile Health, NeuroMotion Rehabilitation, RGV Scalp Ink, then the rest of `CLIENTS`.

**390px:** facts become a 2×2 grid. Marquee stays (swipeable via `overflow-x: auto` with the animation paused on touch); reduced motion shows a static wrapped grid.

**Copy (final):**
- Visually hidden H2 for structure: "Clients and facts"
- Facts:
  1. "Based in Harlingen, TX. Working nationwide."
  2. "English and Spanish"
  3. "Month-to-month on every plan"
  4. "HIPAA BAA for healthcare clients" (links to `/terms#baa`)
- Logo caption (DM Sans 14px, `--ink-soft`): "Some of the businesses we've built for. Tap a logo to visit the live site."

The "Trusted by 50+ businesses" line is removed (unverified count).

### 3. Medspa suite `#medspas` (blush band)

**Job:** make a medspa owner think "they know my business," using the founders' real background, a real aesthetics site and the BAA. No outcomes, no medical claims.

**Desktop:** header block left-aligned (5 cols), then an asymmetric bento on a 12-col grid:
- Cell A (7 cols, 2 rows tall): D'Vash full screenshot in a 14px media frame, caption below the image.
- Cell B (5 cols): BAA "certificate" panel, double-bezel on dark (night core), hairline double frame, a CSS-drawn round "BAA" seal in DM Mono. No icon font.
- Cells C to F (5 cols, stacked as a 2×2 inside the right column, or a 4-row list with hairline dividers): the four capabilities.
- Footer row: compliance line + CTA pair.

**390px:** header, D'Vash image, BAA panel, four capabilities as a hairline-divided list, compliance line, full-width CTA.

**Copy (final):**
- **Eyebrow (DM Mono):** "For medspas and aesthetic practices"
- **H2:** "Built for medspas that want a fuller *book*."
- **Lede:** "Kelsey spent five years at Aesthetic Record, a leading software platform for the aesthetics industry, working with hundreds of clinic owners. Derrick helped build its lead management and marketing division. Now we run the marketing side for practices like yours."
- **Cell A caption:** "D'Vash Aesthetics. Website by RGV Performance Marketing." (link: dvashaesthetics.com, new tab; alt text: "Homepage of the D'Vash Aesthetics website")
- **Cell B, BAA panel:**
  - Title: "HIPAA Business Associate Addendum"
  - Body: "It's part of our Terms. If you're a covered entity and we handle patient information for you, it takes effect the day you subscribe."
  - Link: "Read the addendum" → `/terms#baa`
- **Capabilities:**
  1. **A site that sells the consult.** "Your treatment menu, your providers, and a Book button within reach on every screen. Fast on the phone your patients are holding."
  2. **Found for the treatments you sell.** "A complete Google Business Profile and local pages built around the searches your patients type, like lip filler or laser hair removal near them."
  3. **Ads written for the rules.** "Google and Meta campaigns built inside each platform's health and beauty policies, with landing pages that match the ad. You fund the spend directly."
  4. **Follow-up and rebooks.** "Site inquiries, texts and email land in one inbox. Automated reminders nudge patients when their next appointment is due."
- **Compliance line (14px, `--ink-soft`):** "We keep outcome promises and before-and-after reveals out of your copy and ads."
- **Primary CTA:** "Book a free strategy call" → `SITE.bookingUrl` (`utm_content=medspa`)
- **Secondary link:** "See the plan we recommend for medspas" → `#plans`

Capability 4 needs Build the Machine or higher for automation; the plan ladder makes that clear. Do not name booking platforms (Boulevard, Vagaro, etc.) until integrations are confirmed.

### 4. Industry switcher (cream)

**Job:** after the medspa band, tell everyone else they're in the right place, and let them pick their own lane (self-selection is a micro-commitment).

**Desktop:** H2 + lede left (5 cols). Right (7 cols): a segmented tab control (pill tabs, `role="tablist"`), and below it the active panel: two short lines in the customer's words, a "What we'd set up" list of three, a real screenshot or logos for that industry, and the booking CTA. Panels are a fixed min-height to prevent layout shift when switching.

**390px:** the tablist becomes a horizontally scrollable row of pills (scroll-snap, 44px tall). Panel stacks below.

**Behavior:** client leaf. All four panels are server-rendered into the HTML; inactive panels use the `hidden` attribute. Without JS, all panels render stacked with their headings (progressive enhancement). Roving tabindex, arrow keys, `aria-selected`, `aria-controls`. Fires `industry_tab_select`. Default tab: Contractors & home services.

**Copy (final):**
- **H2:** "Pick your business. See what we'd set *up*."

  (Italic on "up" is optional; if the descender rule makes it awkward, drop the italic on this H2.)
- **Lede:** "Contractors, clinics, salons and shops run on the same system: a site that books, one inbox for every lead, and a Google presence tuned to how their customers search."
- **Tab 1, "Contractors & home services"**
  - Lines: "Your customers search 'near me' and call one of the first few names they see. If a quote request sits until tomorrow, someone else gets the job."
  - What we'd set up: "A site with a page for each service and city you cover" · "A Google Business Profile with real job photos" · "Quote requests and calls in one inbox on your phone"
  - Proof: `work/ccl-contracting.webp` (caption "CCL Contracting") + `work/premium-foam.webp` thumbnail
- **Tab 2, "Clinics & wellness"**
  - Lines: "Patients read your Google profile and your website before they ever call. They want to book without a phone tag marathon."
  - What we'd set up: "A booking-first site that loads fast on a phone" · "Local SEO for the services you offer" · "A HIPAA Business Associate Addendum in our Terms"
  - Proof: `work/us-to-you-mobile-health.webp` (caption "Us To You Mobile Health") + logos NeuroMotion Rehabilitation, 6 Day Medical Weight Loss
- **Tab 3, "Beauty & personal care"**
  - Lines: "Clients find you on Instagram, then check Google before they book. Your feed and your site need to look like the same business."
  - What we'd set up: "A site that matches your brand and links straight to booking" · "Content Crew: you shoot, we edit a reel and a branded post every week" · "Review requests after each visit (Build the Machine)"
  - Proof: `work/rgv-scalp-ink.webp` (caption "RGV Scalp Ink") + logo Glammed Up Aesthetics
- **Tab 4, "Food, retail & recreation"**
  - Lines: "People pick where to go from the map on their phone. Hours, photos and reviews decide it."
  - What we'd set up: "A Google Business Profile that's complete and current" · "A simple site with your menu or products, hours and directions" · "Social posts that show what's new this week"
  - Proof: `work/macs-dove-hunts.webp` (caption "Mac's Dove Hunts") + logos Tsukie Coffee, La Feria Co-op
- **CTA in every panel:** "Book a free strategy call" → `SITE.bookingUrl` (`utm_content=industry-<slug>`)

Owner must confirm the client-to-industry mapping (section 6, #7).

### 5. Growth engine (cream, porcelain cards)

**Job:** explain what you get as five parts of one system, each tied to a real starting price and a service page (internal links the audit needs).

**Desktop:** H2 + lede on a 5/7 split. Bento below (no row of three equal cards): row 1 = Website (7 cols, includes a small cropped `work/ccl-contracting.webp` detail) + Google & local SEO (5 cols); row 2 = Ads (5) + One inbox (7); row 3 = Social (12 cols, horizontal layout). Every card is one link (whole card clickable, visible focus ring). Each card ends with a mono price tag in `--ink-soft` and a text arrow in `--orange-ink`. No orange card fills.

**390px:** single column, each card ~180 to 220px tall, price tag top-right.

**Copy (final):**
- **H2:** "One team runs the whole *system*."
- **Lede:** "Hire one company for the site and another for ads, and leads slip through the gap between them. We run all five pieces from one inbox and report on them together."
- **Cards:**
  1. **Website** → `/services/website-design`. "A custom site we build, host and keep updated. Unlimited standard edits: hours, photos, copy, services." Tag: "Included from $397/mo"
  2. **Google & local SEO** → `/services/local-seo`. "Your Google Business Profile built out, city and service pages, and monthly content aimed at real Search Console queries. We don't promise a #1 ranking." Tag: "From $597/mo"
  3. **Google & Meta ads** → `/services/paid-advertising`. "Campaigns built, written and managed for you. You pay Google or Meta directly, so you see every dollar of spend." Tag: "From $899/mo"
  4. **One inbox and follow-up** → `/services/lead-management`. "Every form fill, call and chat lands in one inbox from day one. On Build the Machine, automated texts, emails and reminders follow up for you, and a site chatbot answers after hours." Tag: "Inbox from $397/mo"
  5. **Social & content** → `/services/social-media-newsletter`. "You shoot, we edit and brand a reel and a post every week, with captions and stories. Or we shoot on-site monthly and run the account for you." Tag: "From $650/mo"
- **Footer link:** "See every service" → `/services`

The "#1 for 'seo harlingen'" line is removed by default (volatile). Owner can restore it after a fresh SERP check (section 6, #3).

### 6. How it works `#how-it-works` (bone)

**Job:** make starting feel close and easy (goal gradient, low activation energy).

**Desktop:** H2 left with the Bebas "8–10" numeral treatment beside it (numerals only). Three steps in a horizontal timeline with a single 1px hairline connecting them, each step: mono day label, H3, one or two sentences. Below: an effort line split in two columns ("Your part" / "Our part"), then the CTA.

**390px:** vertical timeline (hairline on the left), steps stacked, effort lines stacked, full-width CTA.

**Copy (final):**
- **H2:** "Your new site, live in as little as 8 to 10 *days*."
- Steps:
  1. **Days 1 to 2 · Kickoff.** "We learn your services, your area and the customers you want more of. You send your logo and photos."
  2. **Days 3 to 7 · Design and build.** "We write, design and build the site, then connect your forms and inbox. You review it before launch."
  3. **Days 8 to 10 · Launch.** "We connect your domain and Google profile, go live, and start the monthly work your plan covers."
- **Your part:** "One call and a folder of photos."
- **Our part:** "Design, copy, build, hosting and launch."
- **CTA:** "Book a free strategy call" → `SITE.bookingUrl` (`utm_content=process`)

"8 to 10 days" and "You review it before launch" are live-site claims; owner confirms both are current (section 6, #4).

### 7. Plans `#plans` (cream band, porcelain double-bezel ladder)

**Job:** show the price, anchor high, recommend one plan, and give ready buyers a direct start. This is the commitment ladder's middle and top rung.

**Desktop:** eyebrow + H2 + lede centered-left above a single double-bezel panel holding a four-column "ladder" (not four floating cards). Columns are separated by hairlines, not gaps. Order low to high, left to right. Build the Machine is inverted (night core inside the porcelain shell, `--on-dark` text) with a "Recommended" chip; no extra orange. Each column: plan name (H3), Bebas price numeral at `--fs-numeral`, "/mo" in DM Sans, a mono fee line, one sentence, a compact "Start" CTA (`--orange-deep` pill for the recommended column, ghost pill for others). Below the panel: social line, help line, footnote.

**390px:** the ladder becomes four stacked rows inside the same shell, in the same low-to-high order. Each row: name + price on one line, fee line, one sentence, full-width CTA. Recommended row keeps the night inversion.

**Copy (final):**
- **Eyebrow:** "Plans and pricing"
- **H2:** "Real prices, before you ever get on a call."
- **Lede:** "Four plans, from a website and inbox to a full marketing team. Every plan is month-to-month."
- **Plant the Flag**: "$397/mo" · fee line "Month-to-month" · "Your custom website, built, hosted and maintained, plus one inbox for every lead." · CTA "Start Plant the Flag" → `https://buy.stripe.com/7sY9ATeDa4ui3dwg7T7Zu0F`
- **SEO Package**: "$597/mo" · "Month-to-month" · "Plant the Flag, plus your Google Business Profile and local SEO so more of the right people find you." · CTA "Start SEO Package" → `https://buy.stripe.com/fZu9ATgLi0e28xQbRD7Zu0G`
- **Build the Machine** (chip: "Recommended"): "$899/mo" · "+ $399 one-time activation" · "SEO, managed ads, two-way texting and email, automated follow-up and a monthly strategy call. Our usual pick for medspas and clinics." · CTA "Start Build the Machine" → `https://api.rgvperformancemarketing.com/payment-link/6a25cba371a0aa761e46375b`
- **Own the Market**: "$1,499/mo" · "No activation fee" · "Ads on Google and Meta, social run for you, a dedicated strategist and strategy calls every two weeks." · CTA "Start Own the Market" → `https://api.rgvperformancemarketing.com/payment-link/6abb6ded694b1c53da8ce2dc`
- **Social line:** "Just need social media? Content Crew $650/mo · Full Service Social $1,250/mo" → `/pricing` (link text: "See social plans")
- **Help line:** "Not sure which fits? Book a free call and we'll tell you honestly, even if it's the cheapest plan." CTA: "Book a free strategy call" → `SITE.bookingUrl` (`utm_content=plans`). Secondary text link: "Compare every feature" → `/pricing`
- **Footnote (DM Mono 11.5px):** "Month-to-month · Ad spend billed by Google or Meta directly · Build the Machine and Own the Market are marketing plans; a new website on those is quoted separately"

"Recommended" is an editorial label and is true. Never "Most popular" without sales data. The `/pricing` page still says "// Most Popular" on two tiers (out of scope here; see section 6, #8).

Data: plan names, prices, fees and checkout URLs come from a shared module (see 4.2), copied from `PricingTabs.tsx`, never from `components/Pricing.tsx`.

### 8. Risk reversal (bone, tight)

**Job:** answer "what if it doesn't work, or I want out" right after the prices.

**Desktop:** H2 left (4 cols), a 2×2 grid of short statements right (8 cols), each with a `--success` tick drawn in CSS. Below the grid, one full-width honesty line in `--ink-soft`.

**390px:** H2, four stacked statements, honesty line.

**Copy (final):**
- **H2:** "What you're actually signing up for"
- Items:
  1. **Month-to-month.** "Cancel any month. The only upfront fee on any plan is the $399 activation on Build the Machine."
  2. **Your accounts stay yours.** "Your domain, Google Business Profile and ad accounts stay in your name. If you leave, they go with you." (Ship only if confirmed, section 6, #2. Fallback item: **You work with the founders.** "Derrick and Kelsey run your account, from the first call on.")
  3. **Ad spend goes straight to the platform.** "You pay Google or Meta directly and see every charge on your own statement."
  4. **HIPAA BAA for healthcare.** "Our Terms include a Business Associate Addendum for medspas, clinics and other covered entities." Link: "Read it" → `/terms#baa`
- **Honesty line:** "We won't promise you a #1 ranking on Google. SEO usually takes 60 to 90 days to show traction, and we'll give you an honest timeline for each channel before you start."

No money-back guarantee is invented.

### 9. AI in your marketing (cream)

**Job:** support the "AI & Marketing Agency" positioning for curious buyers without competing with the main booking path.

**Desktop:** 5/7 split. Left: H2 + lede. Right: three short rows with hairline dividers, then a row of three text links. No second booking button, no tool chips.

**390px:** stacked; links as 48px-tall rows.

**Copy (final):**
- **H2:** "AI that handles the follow-up your team never gets to."
- **Lede:** "We run our own agency on tools like Claude Code and Codex. For clients, we build the pieces that give hours back each week."
- Rows:
  1. **Inquiry follow-up.** "Texts and emails go out to new leads automatically, with a person stepping in when it matters."
  2. **After-hours chatbot.** "Your site answers common questions at night and points people to booking."
  3. **Custom tools.** "Small apps and agents for the tasks your team repeats every week."
- Links: "AI consulting and builds" → `/services/ai-implementation` · "Learn Claude Code 1-on-1" → `/learn-claude-code` · "Free: an AI agent that reviews your inbox every morning" → `/claude-code-templates`

### 10. Blog row (cream)

**Job:** crawlable links to `/blog` and three posts; useful to researchers.

**Desktop:** H2 + "All articles" link on one line, then three equal-width text cards with no images. To avoid the banned "three equal cards" look, the first card spans 6 cols with the excerpt, the other two 3 cols each with title only.

**390px:** a list of three title links with dates, hairline dividers.

**Copy (final):**
- **H2:** "From the blog"
- Posts: `POSTS.slice(0, 3)` (latest three, server-rendered)
- Link: "All articles" → `/blog`

### 11. FAQ `#faq` (bone)

**Job:** answer the objections in buying order. Content lives in `lib/faqs.ts` (`homeFaqs`), which also feeds the FAQPage JSON-LD, `/llms.txt` and `/llms-full.txt`. The rendered answers must match the schema text exactly (same source).

**Layout:** 720px column, native `<details>/<summary>`, hairline dividers, `+` indicator drawn in CSS rotating to `×` (reduced motion: no rotation). First item open by default.

**Copy (final):**
- **H2:** "Questions owners ask before they sign"
- **Sub:** "Straight answers. Book a call if yours isn't here."
- Items (replace `homeFaqs` with this list, in this order):

1. **Do I have to sign a long-term contract?**
   "No. Every plan is month-to-month, and you can cancel any month. The only upfront cost on any plan is the one-time $399 activation fee on Build the Machine, which covers onboarding and setup."
2. **Is a website included?**
   "Yes, on Plant the Flag ($397/mo) and the SEO Package ($597/mo). Both include a custom website we build, host and keep updated, with no separate build fee. Build the Machine and Own the Market are marketing plans. If you need a new site on one of those, we quote it separately."
3. **Are there costs beyond the monthly price?**
   "Two, and we'll name them up front. Build the Machine has a one-time $399 activation fee. If your plan includes ads, you pay Google or Meta directly for the ad spend, billed to you by the platform. Our management fee is your monthly plan price, and we help you set the right budget."
4. **How quickly will I see results?**
   "Ads can start bringing in leads within the first week once they're live. SEO usually takes 60 to 90 days to show real traction, then builds over time. We'll give you an honest timeline for each channel before you start, and we won't promise a #1 ranking."
5. **Do you work with medspas?**
   "Yes, medspas and aesthetic practices are our specialty. Kelsey spent five years at Aesthetic Record working with hundreds of clinic owners, and Derrick helped build its lead management and marketing division. We build consult-focused sites, local SEO for the treatments you offer, ads written for Google's and Meta's health and beauty policies, and follow-up that keeps patients rebooking."
6. **Do you sign a HIPAA Business Associate Agreement?**
   "Yes. Our Terms include a HIPAA Business Associate Addendum. If you're a covered entity or business associate and we handle protected health information for you, it takes effect when you subscribe. You can read it at rgvperformancemarketing.com/terms#baa."
7. **Can you run ads for injectables and other aesthetic treatments?**
   "Yes, within each platform's rules. Google and Meta restrict health and beauty ads: no before-and-after reveals, no promised results, no targeting minors, and the landing page has to match the ad. We write campaigns to those rules. The platforms make the final approval call."
8. **What does "two-way SMS & email" mean?**
   "You can have real back-and-forth conversations with leads and customers by text and email, all from one inbox. When someone texts your business number or replies to an email, you see it and can answer. On Build the Machine and up, you can also send broadcast campaigns, like promos and announcements, to your whole list."
9. **What kinds of businesses do you work with?**
   "Medspas and aesthetic practices, clinics and wellness businesses, contractors and home services, salons, restaurants, retail and professional services. We're based in Harlingen, Texas and work with businesses nationwide. If your customers find you online, we can help."

Dropped from the old list: "How does the newsletter work?" (claimed monthly newsletter on every plan; PricingTabs shows it on Build the Machine only) and "What's the social media planner tool?" (not in any PricingTabs feature list). Owner can restore either once the facts are confirmed. The FAQ answers mention no medical outcomes.

### 12. Final CTA (night band)

**Job:** the peak-end moment. Real faces, one action, the two reassurances that matter most.

**Desktop:** 5/7 split. Left: both founder portraits, large (each ~240×300), duotone-graded with CSS (`mix-blend-mode: luminosity` over a night panel with a cream highlight layer), 20px radius, names in DM Mono under each. Right: H2, lede, CTA pair, reassurance line, contact line. Behind everything, an oversized outlined "RGV" Bebas wordmark (`-webkit-text-stroke: 1px var(--hairline-dark)`, transparent fill) bleeding off the right edge, `aria-hidden`.

**390px:** portraits side by side (each ~44vw), then copy, full-width CTA, secondary as text link, contact links as 48px rows. Wordmark scaled down and clipped.

**Copy (final):**
- **H2:** "Talk to the people who'll *build* it."
- **Lede:** "Book a free strategy call with Derrick or Kelsey. Bring your website and your questions, and we'll show you what we'd fix first, whether you hire us or not."
- **Primary CTA:** "Book a free strategy call" → `SITE.bookingUrl` (`utm_content=final`)
- **Secondary:** "See plans and pricing" → `/pricing`
- **Reassurance (DM Mono):** "Month-to-month on every plan · HIPAA BAA for healthcare"
- **Contact line:** "Rather call? (956) 793-9152" (`tel:+19567939152`) · "info@rgvperformancemarketing.com" (`mailto:`) · "Contact page" → `/contact`
- Portrait captions: "Derrick Tamez, Founder" · "Kelsey Tamez" (match the job title shown on `/about`)

### 13. Sticky mobile CTA (overlay, < 768px only)

**Job:** keep the smallest next step one tap away without covering content.

**Behavior:** client leaf with `IntersectionObserver`. Appears once the hero primary CTA leaves the viewport; hides while the final CTA section is in view and while the mobile nav drawer is open. Slides up with `transform` (reduced motion: no slide, opacity swap). Height 64px + `env(safe-area-inset-bottom)`. `--night` background with `--hairline-dark` top border. Adds bottom padding to `<body>` equal to its height while visible, so it never covers footer links. The GHL chat bubble gets a CSS offset (`bottom: calc(76px + env(safe-area-inset-bottom))`) while the bar is visible; identify the widget's selector at build time. The bar is a `<div role="region" aria-label="Book a call">`, not a dialog, and never traps focus. Fires `sticky_cta_click`.

**Copy (final):**
- Left (DM Mono 11.5px, `--on-dark-soft`): "From $397/mo · Month-to-month"
- Right button (`--orange-deep`, 48px tall): "Book a free call" → `SITE.bookingUrl` (`utm_content=sticky`)

Desktop has no sticky bar; the nav CTA is persistent.

---

## 4. Component plan

All homepage sections stay **server components** except two small client leaves. Homepage styles live in one stylesheet scoped under `.rg-home`, so nothing leaks to other pages.

### 4.1 Files

| File | Action | Type | Notes |
|---|---|---|---|
| `app/page.tsx` | Edit | server | New section order; `<main className="rg-home">`; import `components/home/home.css`; keep metadata, title, `JsonLd faqSchema(homeFaqs)` exactly |
| `components/home/home.css` | **Create** | css | All homepage styles, every selector under `.rg-home` with `rg-h-*` classes. Replaces most inline `style={{}}` objects (smaller RSC payload) |
| `components/home/HomePrimitives.tsx` | **Create** | server | `HButton` (pill, button-in-button, variants `primary` / `compact` / `ghost` / `ghostDark`), `HSection`, `HEyebrow`, `HHeading` (handles the italic word), `BezelFrame`. **Do not edit `Primitives.tsx`**: the `/website-offer` components import it |
| `components/home/HomeHero.tsx` | Replace | server | Section 1 |
| `components/home/WorkStack.tsx` | Replace | server | D'Vash front, Premium Foam, Us To You; `priority` + `fetchPriority="high"` on the front image only; mobile scroll-snap strip |
| `components/home/ProofStrip.tsx` | **Create** | server | Section 2; renders `ClientMarquee` with new optional props |
| `components/ClientMarquee.tsx` | Edit (additive) | server | Add optional props `tone?: "default" \| "mono"`, `order?: string[]` (client names to lead with), `heading?: ReactNode`. Defaults unchanged, because `/website-offer/thank-you` uses it. Second (duplicate) pass images get `loading="lazy"` |
| `components/home/MedspaSuite.tsx` | **Create** | server | Section 3, `id="medspas"` |
| `components/home/IndustrySwitcher.tsx` | **Create** | server shell | Renders heading, lede and all four panels |
| `components/home/IndustryTabs.tsx` | **Create** | **client** (`"use client"`) | Only the tablist state + `hidden` toggling, receives panels as children. Target < 2 KB gz |
| `lib/industries.ts` | **Create** | data | Tab labels, lines, setup bullets, proof assets |
| `components/home/Capabilities.tsx` | Replace in place | server | Section 5 (growth engine). Keeps all five service links + `/services` |
| `components/home/Process.tsx` | Replace | server | Section 6, keeps `id="how-it-works"` |
| `components/home/PlanLadder.tsx` | **Create** | server | Section 7, `id="plans"` |
| `components/home/RiskReversal.tsx` | **Create** | server | Section 8 |
| `components/home/AiSection.tsx` | Replace | server | Section 9, compact; removes the `AI_BOOKING_URL` button |
| `components/home/BlogEditorial.tsx` | Restyle | server | Section 10 |
| `components/home/HomeFaq.tsx` | Restyle | server | Section 11, keeps `id="faq"`, same `homeFaqs` source |
| `lib/faqs.ts` | Edit | data | New `homeFaqs` list (section 3.11). Updates JSON-LD and llms files automatically |
| `components/home/FinalCta.tsx` | Replace | server | Section 12 |
| `components/home/StickyCta.tsx` | **Create** | **client** | Section 13. Target < 2 KB gz |
| `components/home/SocialFollow.tsx` | Delete | | Only imported by `app/page.tsx` |
| `components/Nav.tsx` | Edit (small) | client | CTA label, "Blog", "Medspas" link (section 3.0) |
| `app/layout.tsx` | Edit | server | `next/font/google` migration (4.4) |
| `components/PageTransition.tsx` | Edit | client | Stop fading `<main>` from opacity 0 on mount (LCP). Use a transform-only entrance or none; keep `id="main-content"` |
| `public/work/dvash-aesthetics.webp` | Re-export (or add a cropped copy) | asset | Remove the review toast; keep 1200×750 |
| `public/clients/*.png` heavy files | Add WebP versions | asset | rgv-scalp-ink (634 KB), tsukie, premium-foam, ez-clean, glammed-up; update `lib/clients.ts` paths |

Not touched in this PR: `components/PricingTabs.tsx`, `/pricing`, Footer link graph, `next.config.ts` redirects, sitemap, `*_INDEXABLE_CITIES`, `lib/site.ts` `PLANS` existing fields.

### 4.2 Plan data (no drift)

Add to `lib/site.ts`, without changing the existing `PLANS` fields (they feed pricing schema and llms):
- Extend each `PLANS` entry with optional `activationFee?: number` and `checkoutUrl?: string`, and export `SOCIAL_PLANS` (Content Crew 650, Full Service Social 1250) with checkout URLs.
- Values are copied from `PricingTabs.tsx` with a comment `// Keep in sync with components/PricingTabs.tsx (the live /pricing source)`.
- `PlanLadder` and `StickyCta` read from these. Follow-up PR: refactor `PricingTabs` to read the same module so there is one source.

### 4.3 Removed from the homepage
- `SocialFollow` (deleted).
- `IndustryStrip` import (replaced by `ProofStrip`; `Sections.tsx` export stays for now).
- The "50+" proof row and marquee heading, the "#1 for seo harlingen" line, "ads that pay for themselves", "missed-call text-back", the AI booking button, the orange bento cell.

### 4.4 Applying global changes safely
1. **Tokens:** add new tokens only. Change only `--orange-ink` (`#B54B0C` → `#A8450B`). Grep confirms no other token values change.
2. **Fonts (`next/font`):** next/font generates hashed family names, so the literal `'Bebas Neue'` / `'DM Sans'` strings used across ~29 files would stop matching. Rollout:
   - Load all three with `variable` and attach the classes to `<html>`.
   - In `:root`, keep working aliases: `--font-display: var(--font-bebas), 'Bebas Neue', sans-serif;` `--font-body: var(--font-dm-sans), 'DM Sans', sans-serif;` `--font-mono: var(--font-dm-mono), 'DM Mono', ui-monospace, monospace;`
   - Codemod every literal `font-family` (CSS and inline TSX) to these vars. Acceptance: `grep -rn "'Bebas Neue'\|\"Bebas Neue\"\|'DM Sans'" app components` returns only the three alias lines.
   - Remove the Google Fonts `<link>` and preconnects.
   - Spot-check `/pricing`, `/services`, `/about`, a city page, a blog post and `/website-offer` at 390 and 1440. Inner-page labels will start rendering in real DM Mono (intended fix).
3. **Scoping:** every new homepage selector lives under `.rg-home`. No changes to existing `rg-*` classes used by inner pages.
4. **Nav:** only the three small edits in 3.0 ship in this PR. The lean nav waits for owner approval.
5. **PageTransition:** global change; verify route transitions on two inner pages after the edit.

---

## 5. SEO preservation, accessibility and performance

### 5.1 SEO checklist (must all pass before merge)
- [ ] `<title>` exactly "AI & Digital Marketing Agency | Harlingen TX & Nationwide" (`title.absolute`).
- [ ] Meta description unchanged (`HOME_DESCRIPTION`), canonical `SITE.url`, `socialMeta` OG/Twitter unchanged.
- [ ] `<JsonLd data={[faqSchema(homeFaqs)]} />` still rendered; site-wide Organization/WebSite nodes untouched in `layout.tsx`; no duplicate business node added.
- [ ] Rich Results Test passes FAQPage; schema answer text equals rendered answer text.
- [ ] Exactly one H1, in the initial server HTML, containing "AI & marketing agency", "Harlingen, TX" and "nationwide".
- [ ] Logical H2 per section; H3 inside cards. No skipped levels.
- [ ] Body internal links present: `/services/website-design`, `/services/local-seo`, `/services/paid-advertising`, `/services/lead-management`, `/services/social-media-newsletter`, `/services/ai-implementation`, `/services`, `/pricing`, `/blog` + 3 posts, `/learn-claude-code`, `/claude-code-templates`, `/contact`, `/terms#baa`.
- [ ] Anchors `#how-it-works` and `#faq` still exist; new `#medspas` and `#plans`.
- [ ] Industry tab panels and FAQ answers are in the server HTML (view-source check).
- [ ] No link to `/website-offer` from the homepage.
- [ ] Client logo links keep their current `rel` behavior (dofollow as today).
- [ ] All images have meaningful `alt` (fix the empty D'Vash alt) or `alt=""` + `aria-hidden` when decorative.
- [ ] `/llms.txt` and `/llms-full.txt` render with the new FAQ (spot-check).
- [ ] Sitemap and robots unchanged.

### 5.2 Accessibility budget
- WCAG 2.2 AA. Every text/background pair uses the contrast-checked tokens in 2.1. White labels on `--orange` only at ≥ 19px/700; all smaller buttons use `--orange-deep`.
- Touch targets ≥ 48px on mobile; inline text links get ≥ 24px hit areas via padding.
- Visible focus ring on every interactive element: 2px solid `--orange-ink` on light, `--orange-on-dark` on dark, 3px offset.
- Industry tabs follow the WAI-ARIA tabs pattern (roving tabindex, arrows, Home/End).
- Sticky bar: region landmark, no focus trap, hidden from the accessibility tree when off-screen (`inert` + `aria-hidden` while hidden).
- External links (logos, work frames, booking) announce "opens in a new tab" via visually hidden text.
- `prefers-reduced-motion` honored by every new class (2.5).
- Skip link to `#main-content` keeps working.
- Lighthouse Accessibility 100; axe DevTools zero serious/critical issues.

### 5.3 Performance budget
| Metric | Budget |
|---|---|
| Mobile LCP (Lighthouse, Slow 4G) | < 2.5s; LCP element = H1 text or the front work frame |
| CLS | < 0.05 (explicit width/height or aspect-ratio on every image and frame; fixed min-height on tab panels; fonts via next/font with size-adjusted fallbacks) |
| INP / TBT | TBT < 200ms |
| New client JS on `/` | ≤ 6 KB gz total (IndustryTabs + StickyCta) |
| Preloaded images | 1 (front hero frame). Marquee second pass lazy; first pass `loading="lazy"` except the first 6 logos |
| Image weight above the fold, mobile | ≤ 250 KB |
| Total image weight, mobile, first load | ≤ 600 KB (baseline 618 KB with fewer sections) |
| Fonts | No render-blocking font CSS; ≤ 3 font files on first paint |
| Third parties | GHL chat widget moved to `strategy="lazyOnload"` (owner OK, section 6, #11) |

Verification: Lighthouse mobile + desktop on a Netlify deploy preview (not dev server), plus a 390×844 and 1440×900 screenshot pass with reduced motion on and off.

---

## 6. Owner decisions

Items marked **Blocking** must be answered before the related copy ships. Each has a default the build uses until answered.

| # | Decision | Default in this spec | Blocking? |
|---|---|---|---|
| 1 | **"50+ live client sites" / "Trusted by 50+ businesses"**: verify the number or cut it | Cut everywhere | No (already cut) |
| 2 | **"Your accounts stay yours"**: confirm clients own their domain, Google Business Profile and ad accounts, and keep them if they leave | Use the fallback item ("You work with the founders") | Yes, for item 8.2 |
| 3 | **"#1 for 'seo harlingen'"**: restore after a fresh SERP check? | Removed | No |
| 4 | **Launch timeline and approval step**: confirm "as little as 8 to 10 days" and "You review it before launch" are current | Keep (both are on the live site today) | Yes, before merge |
| 5 | **Naming Aesthetic Medicine MD (Dr. Lupe Cueva, Tacoma WA)**: a named medspa panel in section 3 showing deliverables only (site, Instagram calendar), no patient results. Needs the client's written permission. It would also prove "nationwide" | Not named, not shown | No (option) |
| 6 | **D'Vash Aesthetics**: confirm we built the site shown and may feature it as the hero front frame and medspa proof; approve cropping the review toast | Feature it, toast cropped | Yes |
| 7 | **Industry tab client mapping**: confirm each logo/screenshot's category and permission to feature (CCL, Premium Foam, Us To You, NeuroMotion, 6 Day Medical Weight Loss, RGV Scalp Ink, Glammed Up, Mac's Dove Hunts, Tsukie Coffee, La Feria Co-op) | As listed in 3.4 | Yes |
| 8 | **Recommended plan**: "Recommended" on Build the Machine (our medspa pick). Alternative: badge the SEO Package for general visitors. Also: switch `/pricing` "// Most Popular" to "Recommended" unless sales data backs it | Build the Machine; `/pricing` unchanged in this PR | No |
| 9 | **Lean nav**: `Medspas · Services ▾ · Pricing · About · Book a free call`, moving Learn Claude Code, Blog and Contact to the footer, removing the duplicate AI entry. Site-wide | Only the three small nav edits ship | No |
| 10 | **Headline font shift** from Bebas all-caps to mixed-case DM Sans for H1/H2 (Bebas kept for price numerals). Fallback: Bebas H1 only, DM Sans H2s | Ship the shift | Yes |
| 11 | **GHL chat widget** to `lazyOnload` and offset above the sticky bar | Do it | No |
| 12 | **Free "Website + Google Profile Check" offer** as a reciprocity rung (we review your site and profile and send three fixes). Only if the team will deliver it | Not offered; the call itself is framed as useful ("we'll show you what we'd fix first") | No (option) |
| 13 | **Call length**: if the discovery call is reliably 15 minutes, change the CTA to "Book a free 15-minute call" (specificity lowers effort) | "Book a free strategy call" | No |
| 14 | **Medspa capability claims**: confirm we write ads to Google/Meta health and beauty policies, keep outcome promises out of copy, and that rebook reminders are part of Build the Machine automation | Keep the copy in 3.3 and FAQ 5 and 7 | Yes |
| 15 | **FAQ removals**: newsletter and social planner questions dropped as unverified. Restore with corrected facts? | Dropped | No |
| 16 | **PricingTabs line "Follow-ups on autopilot (missed-call text, …)"**: remove the retired angle on `/pricing` (separate small PR) | Not touched here | No |
| 17 | **Audit page actions** (separate PRs, not homepage): noindex `/website-offer` and retire or re-price it (301 to `/pricing`); merge `/services/sms-email-marketing` into `/services/lead-management` (301); footer links only the 17 indexed city pages; filter noindexed cities from llms files; fix the "custom-quoted" website note; delete dead components (`Pricing.tsx`, `Hero.tsx`, `FAQ.tsx`, `HomeBlogStrip.tsx`, `Marquee.tsx`, unused `Sections` exports, `STRIPE_LINKS`) | Not in this PR | No |
| 18 | **Medspa hub page** `/medspa-marketing` (indexed, linked from nav and the medspa band). Coordinate with the 90-day SEO program | Not built; nav "Medspas" points to `/#medspas` | No |
| 19 | **Booking-platform integrations** (Boulevard, Vagaro, Mangomint, etc.): confirm which we support before naming any | Not named | No |

---

## 7. Build order (for the implementation plan)

1. Tokens + `home.css` scaffold + `HomePrimitives.tsx`.
2. Fonts migration + codemod + inner-page spot check (4.4.2).
3. Hero + WorkStack + PageTransition fix; measure LCP on a deploy preview before going further.
4. ProofStrip (+ ClientMarquee props), MedspaSuite, IndustrySwitcher.
5. Capabilities (growth engine), Process, PlanLadder (+ plan data), RiskReversal.
6. AiSection, BlogEditorial, FAQ data + HomeFaq, FinalCta, StickyCta.
7. Nav edits, delete SocialFollow, asset re-exports.
8. QA: SEO checklist, axe, Lighthouse, 390/1440 screenshots with and without reduced motion, copy grep (no em dashes, no "50+", no "missed-call", no "Most popular" on `/`).
