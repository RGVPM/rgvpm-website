/**
 * Cover photos, keyed by post slug, with their alt text. The file lives at
 * public/blog/<slug>.webp. A post with no entry gets the drawn PostCover art.
 */
export const POST_IMAGES: Record<string, string> = {};

export const postImageSrc = (slug: string) => (POST_IMAGES[slug] ? `/blog/${slug}.webp` : undefined);
