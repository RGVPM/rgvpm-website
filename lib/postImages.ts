/**
 * Cover photos, keyed by post slug, with their alt text. The file lives at
 * public/covers/<slug>.webp. A post with no entry gets the drawn PostCover art.
 * Sources and licenses are listed in docs/blog-cover-photos.md.
 */
export const POST_IMAGES: Record<string, string> = {
  "ai-friday-first-consult-prep": "Hands writing in an open notebook on a wooden table, beside a coffee and a croissant.",
  "ai-workflow-automation-examples-mcallen": "Red office binders lined up on a shelf.",
  "ai-friday-after-launch-checkup": "A hand ticking through a list in a spiral-bound planner.",
  "google-business-profile-checklist-rio-grande-valley": "A row of colorful small shopfronts on a town street.",
  "ai-friday-build-or-hire-ai-tool": "A tradesman wearing a tool belt beside a stack of lumber.",
  "how-much-do-google-ads-cost-rio-grande-valley": "Hands on a laptop showing charts, next to a cup of coffee.",
  "ai-friday-ai-receptionist-answer-sheet": "A red telephone handset and coiled cord on a white background.",
  "how-much-does-seo-cost-rio-grande-valley": "A blue calculator with a pencil and sticky notes on a desk.",
  "local-seo-brownsville-tx-checklist": "People walking past colorful shops on a busy street, softly out of focus.",
  "ai-friday-automate-weekly-task": "Freshly baked rolls with icing on baking paper.",
  "ai-friday-local-business-rgv": "A row of telephones mounted on a bright yellow wall.",
  "rgv-seo-digital-marketing": "A long straight road lined with tall palm trees under a blue sky.",
  "digital-marketing-harlingen-tx-guide": "Palm trees silhouetted against a low golden sun.",
  "how-much-does-a-website-cost-rio-grande-valley": "An open laptop and notebook on a dark table in a cafe.",
  "how-to-rank-higher-google-maps-rio-grande-valley": "A hand holding a smartphone showing a map.",
  "local-seo-vs-regular-seo": "Food cooking on a flat-top grill at a local stand.",
};

export const postImageSrc = (slug: string) => (POST_IMAGES[slug] ? `/covers/${slug}.webp` : undefined);
