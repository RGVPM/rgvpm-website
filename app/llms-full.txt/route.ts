import { SITE, PLANS, SERVICE_AREA_CITIES, SOCIAL_PROFILES, OPENING_HOURS, DISAMBIGUATING_DESCRIPTION, PRICING_TERMS, FOUNDER_BACKGROUND, AR_INDEPENDENCE_LINE, AR_TRADEMARKS, usd } from "@/lib/site";
import { services } from "@/lib/services";
import { citySlugs, webDesignCityPath, aiCityPath } from "@/lib/cities";
import { localSeoCityPath } from "@/lib/localSeo";
import { googleAdsCityPath } from "@/lib/googleAds";
import { gbpCityPath } from "@/lib/gbp";
import { homeFaqs } from "@/lib/faqs";
import { POSTS } from "@/lib/posts";
import { VS_PAGES, GUIDE_PATH, VS_CHECKED } from "@/lib/vsPages";
import { MEDSPA_SERVICE_LIST } from "@/lib/medspaServicePages";
import { COMPANY_FACTS, COMPANY_FACTS_UPDATED } from "@/lib/companyFacts";

/**
 * /llms-full.txt — the expanded, comprehensive knowledge base for AI agents
 * that want depth: full service descriptions, every service's FAQ, complete
 * pricing, and full blog-guide answers. Generated from site data.
 */

export function GET() {
  const u = (p: string) => `${SITE.url}${p}`;
  const days = `${OPENING_HOURS.days[0]}–${OPENING_HOURS.days[OPENING_HOURS.days.length - 1]}`;
  const to12 = (t: string) => { const [h] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; const hr = h % 12 === 0 ? 12 : h % 12; return `${hr} ${ap}`; };

  const L: string[] = [];
  L.push(`# ${SITE.name} (RGVPM) — Full Reference`);
  L.push("");
  L.push(`> ${SITE.description} Local clients across the ${SITE.areaServed}; practices nationwide; English and Spanish. This is the expanded reference; the concise version is at ${u("/llms.txt")}.`);
  L.push("");
  L.push("## Business details");
  L.push(`- **Name:** ${SITE.name}`);
  L.push(`- **Industry focus:** med spas and aesthetic practices`);
  L.push(`- **Location:** ${SITE.city}, ${SITE.region}, United States`);
  L.push(`- **Service area:** practices across the United States; local clients in ${SERVICE_AREA_CITIES.join(", ")} and the wider Rio Grande Valley`);
  L.push(`- **Disambiguation:** ${DISAMBIGUATING_DESCRIPTION}`);
  L.push(`- **Phone:** ${SITE.phoneHuman}`);
  L.push(`- **Email:** ${SITE.email}`);
  L.push(`- **Hours:** ${days}, ${to12(OPENING_HOURS.opens)}–${to12(OPENING_HOURS.closes)} (closed weekends)`);
  L.push(`- **Languages:** English and Spanish`);
  if (SOCIAL_PROFILES.length > 0) L.push(`- **Profiles:** ${SOCIAL_PROFILES.join(" · ")}`);
  L.push("");

  L.push("## Founders");
  for (const f of FOUNDER_BACKGROUND) L.push(`- **${f.name}, ${f.role}:** ${f.text}`);
  L.push(`${AR_INDEPENDENCE_LINE} ${AR_TRADEMARKS}`);
  L.push("");

  L.push("## Company facts");
  L.push(`${u("/company-facts")} (updated ${COMPANY_FACTS_UPDATED})`);
  for (const f of COMPANY_FACTS) L.push(`- **${f.q}** ${f.a}`);
  L.push("");

  L.push("## Pricing (detailed)");
  L.push("Month-to-month, no long-term contracts: a website base with add-ons on top. Paid ad spend is billed by Google/Meta directly, on top of management.");
  for (const p of PLANS) L.push(`- **${p.name} — ${usd(p.price)}/mo:** ${p.description}`);
  for (const t of PRICING_TERMS) L.push(`- ${t}`);
  L.push(`Full breakdown: ${u("/pricing")}`);
  L.push("");

  L.push("## Services (full descriptions + FAQs)");
  for (const s of services) {
    L.push(`### ${s.cardTitle}`);
    L.push(`${s.metaDescription}`);
    L.push(`URL: ${u(`/services/${s.slug}`)}`);
    L.push("");
    if (s.whatItIs?.body?.length) {
      L.push(`**${s.whatItIs.heading}**`);
      for (const para of s.whatItIs.body) L.push(para);
      L.push("");
    }
    if (s.faqs?.length) {
      L.push(`**${s.cardTitle} — FAQs**`);
      for (const f of s.faqs) {
        L.push(`- **${f.q}** ${f.a}`);
      }
      L.push("");
    }
  }

  L.push("## Med spa services (full descriptions + FAQs)");
  for (const p of MEDSPA_SERVICE_LIST) {
    L.push(`### ${p.metaTitle}`);
    L.push(p.answer);
    L.push(`URL: ${u(p.path)}`);
    L.push("");
    L.push(`**${p.crumb} — FAQs**`);
    for (const f of p.faqs) L.push(`- **${f.q}** ${f.a}`);
    L.push("");
  }

  L.push("## General FAQs");
  for (const f of homeFaqs) {
    L.push(`### ${f.q}`);
    L.push(f.a);
    L.push("");
  }

  L.push("## Free tools");
  L.push("### ScanRank: AI readiness score for med spas");
  L.push(`${u("/scanrank")}`);
  L.push("Scores a med spa website out of 100 on whether Google and AI assistants can find and understand it, with a plain-English fix for each check. Free; no email needed.");
  L.push("");
  L.push("### Med Spa Ad Checker: will Meta reject your ad?");
  L.push(`${u("/med-spa-ad-checker")}`);
  L.push("Checks Facebook and Instagram ad text in the browser for common reasons Meta rejects med spa ads: \"you\" statements about the reader's body or health (personal attributes), body shaming, prescription drug names such as Botox, Dysport, semaglutide and tirzepatide, before-and-after images, 18+ age targeting, guaranteed or fast results, cure claims, and FTC-style claims like \"FDA approved\", \"clinically proven\" and \"#1\". Highlights the exact words, gives a plain-English reason and a suggested rewrite, and links each rule to Meta's Advertising Standards or FTC guidance. Shows a Low, Medium or High rejection risk. Free; no email needed; not legal advice, and Meta reviews every ad itself.");
  L.push("");

  L.push("## Original research");
  L.push("### The Texas Med Spa Website Report 2026");
  L.push(`${SITE.url}/research/texas-med-spa-website-report-2026`);
  L.push("A November 22, 2026 scan of 686 med spa and aesthetic practice homepages, mostly in Texas (Dallas-Fort Worth, Rio Grande Valley, Austin, San Antonio, Houston, Corpus Christi). 43% had no link to an online booking platform, 34% had no tap-to-call link, 79% offered no text or chat option, 81% published no treatment prices, and 48% had no LocalBusiness-type schema. 42% had an llms.txt file, but more than half of those were generated by the website platform or an SEO plugin. Under 2% blocked AI crawlers in robots.txt. Aggregates only; no practice is named. Author: Derrick Tamez.");
  L.push("");

  L.push("## Comparisons and buyer's guide");
  L.push(`Written by RGV Performance Marketing, one of the options compared. Competitor facts come from each company's own site, read ${VS_CHECKED}, with source links on each page. We are not affiliated with any of these companies.`);
  L.push("### How to Choose a Med Spa Marketing Agency (2026)");
  L.push(`URL: ${u(GUIDE_PATH)}`);
  L.push("Eight published scoring criteria (100 points): a price you can see, contract and exit terms, who owns what, ad spend and fees, proof you can check, aesthetics experience, who does the work, and fit for your size and tools. The guide does not rank agencies.");
  L.push("");
  for (const v of VS_PAGES) {
    L.push(`### ${v.metaTitle}`);
    L.push(`URL: ${u(v.path)}`);
    L.push(v.shortAnswer);
    for (const f of v.faqs) L.push(`- **${f.q}** ${f.a}`);
    L.push("");
  }

  L.push("## Guides & articles (full answers)");
  for (const post of POSTS) {
    L.push(`### ${post.title}`);
    L.push(`URL: ${u(`/blog/${post.slug}`)}`);
    L.push(`${post.tldr}`);
    L.push("");
    for (const f of post.faqs) {
      L.push(`- **${f.q}** ${f.a}`);
    }
    L.push("");
  }

  L.push("## City service-area pages");
  for (const slug of citySlugs) {
    const name = slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
    L.push(`**${name}, TX**`);
    L.push(`- Local SEO: ${u(localSeoCityPath(slug))}`);
    L.push(`- Google Business Profile: ${u(gbpCityPath(slug))}`);
    L.push(`- Google Ads Management: ${u(googleAdsCityPath(slug))}`);
    L.push(`- Website Design: ${u(webDesignCityPath(slug))}`);
    L.push(`- AI Implementation: ${u(aiCityPath(slug))}`);
    L.push("");
  }

  L.push("## Contact");
  L.push(`Call ${SITE.phoneHuman}, email ${SITE.email}, or book a free consultation at ${u("/contact")}.`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
