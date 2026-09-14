import type { CSSProperties } from "react";
import Image from "next/image";
import type { Post } from "@/lib/posts";
import { POST_IMAGE_SIZE } from "@/lib/posts";

/**
 * Unique 1200×630 post thumbnail. Default wrapper keeps the OG ratio.
 * Pass `fill` when the parent is already sized (supporting homepage cards).
 */
export default function BlogThumb({
  post,
  sizes,
  priority = false,
  fill = false,
  style,
}: {
  post: Post;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  style?: CSSProperties;
}) {
  const img = (
    <Image
      src={post.image}
      alt={post.imageAlt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover" }}
    />
  );

  if (fill) {
    return img;
  }

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: `${POST_IMAGE_SIZE.width} / ${POST_IMAGE_SIZE.height}`,
        overflow: "hidden",
        background: "#111C30",
        ...style,
      }}
    >
      {img}
    </div>
  );
}
