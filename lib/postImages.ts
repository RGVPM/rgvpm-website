/**
 * Cover photos, keyed by post slug, with their alt text. The file lives at
 * public/blog/<slug>.webp. A post with no entry gets the drawn PostCover art.
 */
export const POST_IMAGES: Record<string, string> = {
  "ai-friday-first-consult-prep": "A work crew in safety vests standing on a commercial roof, looking out over the job from above.",
  "ai-workflow-automation-examples-mcallen": "A car moving through an automated wash tunnel lit in purple.",
  "ai-friday-after-launch-checkup": "A truck inside a lit wash bay at night, with the machines running.",
  "google-business-profile-checklist-rio-grande-valley": "A local business storefront and roadside sign under a clear blue sky.",
  "ai-friday-build-or-hire-ai-tool": "A timber-framed pavilion partway through construction under a cloudy sky.",
  "how-much-do-google-ads-cost-rio-grande-valley": "A roadside business sign with palm trees and red umbrellas along a South Texas street.",
  "ai-friday-ai-receptionist-answer-sheet": "A reception counter in front of a backlit wood slat wall.",
  "how-much-does-seo-cost-rio-grande-valley": "A kitchen remodel in progress, with the wall framing exposed and debris on the floor.",
  "local-seo-brownsville-tx-checklist": "A small commercial building with orange doors and a metal silo under a deep blue sky.",
  "ai-friday-automate-weekly-task": "A tidy workroom counter with cabinets, supplies and small equipment set out in order.",
  "ai-friday-local-business-rgv": "Crew members in orange shirts working on a commercial rooftop.",
  "rgv-seo-digital-marketing": "Rebar and forms laid out for a concrete slab on a cleared South Texas lot.",
  "digital-marketing-harlingen-tx-guide": "An aerial view of a new local business beside a highway in flat South Texas country.",
  "how-much-does-a-website-cost-rio-grande-valley": "A finished living room with a gold painted feature wall.",
  "how-to-rank-higher-google-maps-rio-grande-valley": "A local business and parking lot seen from above, the way it looks on a map.",
  "local-seo-vs-regular-seo": "An installer in a protective mask spraying foam insulation under a wood roof.",
};

export const postImageSrc = (slug: string) => (POST_IMAGES[slug] ? `/blog/${slug}.webp` : undefined);
