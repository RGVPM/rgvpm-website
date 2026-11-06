/**
 * Cover photos, keyed by post slug: alt text, plus the line printed on the photo
 * to tie the post to medspas. The file lives at public/post-covers/<slug>.webp.
 * A post with no entry gets the drawn PostCover art.
 * Sources and licenses are listed in docs/blog-cover-photos.md.
 */
export const POST_IMAGES: Record<string, { alt: string; line: string }> = {
  "ai-friday-medspa-after-hours": {
    alt: "A woman resting on a treatment table with warm lights glowing behind her.",
    line: "Keep consult requests from going cold overnight",
  },
  "ai-friday-first-consult-prep": {
    alt: "A woman holding an open jar of face cream against a tan background.",
    line: "Map how consult requests reach your medspa",
  },
  "ai-workflow-automation-examples-mcallen": {
    alt: "A client lying on a treatment table with her eyes closed during a facial.",
    line: "Answer new leads while your team is with clients",
  },
  "ai-friday-after-launch-checkup": {
    alt: "A hand ticking through a list in a spiral-bound planner.",
    line: "Ten minutes a week keeps your medspa's AI answers right",
  },
  "google-business-profile-checklist-rio-grande-valley": {
    alt: "A woman applying serum to her face with a glass dropper.",
    line: "Get your medspa's Google profile ready for local searches",
  },
  "ai-friday-build-or-hire-ai-tool": {
    alt: "An open jar of white cream on a weathered wooden surface.",
    line: "Should your medspa build its AI tools or hand them off?",
  },
  "how-much-do-google-ads-cost-rio-grande-valley": {
    alt: "Hands on a laptop showing charts, next to a cup of coffee.",
    line: "How to pick a first Google Ads budget for your medspa",
  },
  "ai-friday-ai-receptionist-answer-sheet": {
    alt: "White flowers resting on a folded towel in a softly lit treatment room.",
    line: "Decide what AI answers and what goes to your team",
  },
  "how-much-does-seo-cost-rio-grande-valley": {
    alt: "A blue calculator with a pencil and sticky notes on a desk.",
    line: "What a fair SEO offer should include for a medspa",
  },
  "local-seo-brownsville-tx-checklist": {
    alt: "A woman holding a serum dropper and looking at it with a slight smile.",
    line: "A local SEO checklist for your Brownsville medspa",
  },
  "ai-friday-automate-weekly-task": {
    alt: "Rolled white towels with a red hibiscus flower and stacked black stones.",
    line: "Write down your medspa's weekly follow-ups first",
  },
  "ai-friday-local-business-rgv": {
    alt: "A close view of a woman's face as she applies serum near her eye with a dropper.",
    line: "What your medspa should automate first",
  },
  "rgv-seo-digital-marketing": {
    alt: "A woman in a white robe and hair towel smoothing cream onto her cheek.",
    line: "The order to build your medspa's marketing",
  },
  "digital-marketing-harlingen-tx-guide": {
    alt: "A small glass bottle of oil between two orange marigold flowers.",
    line: "Digital marketing, explained for Harlingen medspas",
  },
  "how-much-does-a-website-cost-rio-grande-valley": {
    alt: "An open laptop and notebook on a dark table in a cafe.",
    line: "What you're paying for in a medspa website",
  },
  "how-to-rank-higher-google-maps-rio-grande-valley": {
    alt: "A hand holding a smartphone showing a map.",
    line: "How medspas move up in the Google map pack",
  },
  "local-seo-vs-regular-seo": {
    alt: "Orange towels with white orchids, smooth stones, and lit candles.",
    line: "Why local searches matter most to a medspa",
  },
};

export const postImageSrc = (slug: string) => (POST_IMAGES[slug] ? `/post-covers/${slug}.webp` : undefined);
