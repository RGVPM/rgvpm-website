# RGV Performance Marketing — Website

## Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Deployed via Netlify (`netlify.toml` configured)
- Fonts: Bebas Neue (Google, loaded in layout head), DM Sans + DM Mono (next/font/google)

## Brand
- Orange: #E8621A | Navy: #1A2B4A | Cream: #F7F4EF
- Logo: /public/logo.png (transparent PNG)
- All client-facing output attributed to "The RGV Performance Marketing Team"

## Pricing (current)
- Plant the Flag: $399/mo + $399 activation
- Build the Machine: $899/mo + $399 activation
- Own the Market: $1,999/mo (no activation fee)
- Website design is SEPARATE on all tiers

## Stripe Payment Links
- Plant the Flag: https://buy.stripe.com/28E00jcv2gd03dw1cZ7Zu0h
- Build the Machine: https://buy.stripe.com/5kQaEXfHed0O3dwdZL7Zu0i
- Own the Market: https://buy.stripe.com/aFa3cv1Qo7Gu29sf3P7Zu0j

## SEO Strategy
- Add new pages weekly targeting local service keywords, competitor terms, location pages
- Page structure: app/[page-slug]/page.tsx with full metadata export
- Use Next.js generateMetadata() for dynamic SEO on every page

## Adding New Pages
1. Create app/[slug]/page.tsx
2. Export metadata with title, description, canonical
3. Build the page content targeting the keyword
4. Push to GitHub → Netlify auto-deploys

## Deploy
```bash
git add . && git commit -m "your message" && git push
```
Netlify auto-deploys on push to main.

## Language / Legal Notes
- Do NOT mention CRM — use "lead management"
- Do NOT mention GoHighLevel, white-label, or SaaS
- Bilingual content available but not a core identity push
