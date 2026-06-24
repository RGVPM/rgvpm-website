import { SITE, PLANS, SERVICE_AREA_CITIES, SOCIAL_PROFILES, OPENING_HOURS } from "@/lib/site";
import { services } from "@/lib/services";
import { citySlugs, webDesignCityPath, aiCityPath } from "@/lib/cities";
import { localSeoCityPath } from "@/lib/localSeo";
import { googleAdsCityPath } from "@/lib/googleAds";
import { gbpCityPath } from "@/lib/gbp";
import { homeFaqs } from "@/lib/faqs";
import { POSTS } from "@/lib/posts";

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
  L.push(`# ${SITE.name} — Full Reference`);
  L.push("");
  L.push(`> ${SITE.description} Based in ${SITE.city}, ${SITE.region}, serving the ${SITE.areaServed} in English and Spanish. This is the expanded reference; the concise version is at ${u("/llms.txt")}.`);
  L.push("");
  L.push("## Business details");
  L.push(`- **Name:** ${SITE.name}`);
  L.push(`- **Location:** ${SITE.city}, ${SITE.region} (service-area business)`);
  L.push(`- **Service area:** ${SERVICE_AREA_CITIES.join(", ")}, and the wider Rio Grande Valley`);
  L.push(`- **Phone:** ${SITE.phoneHuman}`);
  L.push(`- **Email:** ${SITE.email}`);
  L.push(`- **Hours:** ${days}, ${to12(OPENING_HOURS.opens)}–${to12(OPENING_HOURS.closes)} (closed weekends)`);
  L.push(`- **Languages:** English and Spanish`);
  if (SOCIAL_PROFILES.length > 0) L.push(`- **Profiles:** ${SOCIAL_PROFILES.join(" · ")}`);
  L.push("");

  L.push("## Pricing (detailed)");
  L.push("Month-to-month, no long-term contracts. Website design is quoted separately. Paid ad spend is billed by Google/Meta directly, on top of management.");
  for (const p of PLANS) L.push(`- **${p.name} — $${p.price.toLocaleString()}/mo:** ${p.description}`);
  L.push("Plant the Flag and Build the Machine include a one-time activation fee covering onboarding and setup; Own the Market has no activation fee.");
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

  L.push("## General FAQs");
  for (const f of homeFaqs) {
    L.push(`### ${f.q}`);
    L.push(f.a);
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
