import Image, { getImageProps } from "next/image";
import { CAPTURE } from "@/lib/work";

/**
 * Device frames for the live-site captures. Every screen has a fixed aspect
 * ratio, so nothing shifts while the tall capture loads or scrolls.
 *
 * Two loading modes:
 * - `poster`: a small top crop paints first (LCP-safe; non-priority posters
 *   are lazy so the phone hidden on mobile never downloads). The tall capture is
 *   rendered without a src, carrying its resized srcset in data attributes;
 *   the motion layer swaps it in on idle, waits for decode(), then starts the
 *   auto-scroll. With reduced motion or no JS the poster stays as the frame.
 * - default: the tall capture is a lazy next/image (below the fold).
 */
const SCROLL = "/work/scroll";
const QUALITY = 70;

function DeferredTall({ src, width, height, sizes }: { src: string; width: number; height: number; sizes: string }) {
  const { props } = getImageProps({ src, width, height, sizes, quality: QUALITY, alt: "" });
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="ev-tall"
      alt=""
      width={width}
      height={height}
      sizes={props.sizes}
      data-src={props.src}
      data-srcset={props.srcSet}
      decoding="async"
    />
  );
}

export function PhoneScreen({
  slug,
  alt,
  sizes,
  poster,
  priority,
}: {
  slug: string;
  alt: string;
  sizes: string;
  poster?: boolean;
  priority?: boolean;
}) {
  const { width, height } = CAPTURE.mobile;
  const tall = `${SCROLL}/${slug}-mobile.webp`;
  return (
    <span className={`ev-screen ev-screen--phone${poster ? " ev-screen--poster" : ""}`}>
      {poster ? (
        <>
          <DeferredTall src={tall} width={width} height={height} sizes={sizes} />
          <Image
            className="ev-poster"
            src={`${SCROLL}/${slug}-mobile-poster.webp`}
            alt={alt}
            width={780}
            height={1688}
            sizes={sizes}
            quality={QUALITY}
            {...(priority
              ? { loading: "eager" as const, fetchPriority: "high" as const }
              : { loading: "lazy" as const })}
          />
        </>
      ) : (
        <Image
          className="ev-tall-img"
          src={tall}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={QUALITY}
          loading="lazy"
        />
      )}
    </span>
  );
}

export function DesktopScreen({ slug, alt, sizes }: { slug: string; alt: string; sizes: string }) {
  const { width, height } = CAPTURE.desktop;
  return (
    <span className="ev-screen ev-screen--desk">
      <Image
        className="ev-tall-img"
        src={`${SCROLL}/${slug}-desktop.webp`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={QUALITY}
        loading="lazy"
      />
    </span>
  );
}

/** Browser chrome: a hairline bar with the host, then the 16:10 screen. */
export function BrowserFrame({
  slug,
  host,
  alt,
  sizes,
  className,
}: {
  slug: string;
  host: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <span className={["ev-browser", className].filter(Boolean).join(" ")}>
      <span className="ev-browser-core">
        <span className="ev-chrome" aria-hidden="true">
          <span className="ev-chrome-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="ev-chrome-url">{host}</span>
        </span>
        <DesktopScreen slug={slug} alt={alt} sizes={sizes} />
      </span>
    </span>
  );
}
