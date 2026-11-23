import Image from "next/image";
import PhoneVideo from "./PhoneVideo";
import type { WorkSite } from "@/lib/work";

/**
 * One client site on a phone: bezel, screenshot, optional video loop and the
 * dynamic island. Styles are the `.rg-phone-*` rules in globals.css; the
 * wrapper must set `container-type: inline-size` (as `.rg-phone` does) so the
 * bezel scales with the phone. Links to the live site when it has a url.
 *
 * `priority` is for above-the-fold use (homepage hero). Without it the
 * screenshot lazy-loads and the video only starts once the phone scrolls
 * into view.
 */
export default function WorkPhone({
  site,
  sizes,
  priority = false,
}: {
  site: WorkSite;
  sizes: string;
  priority?: boolean;
}) {
  const screen = (
    <>
      <span className="rg-phone-screen">
        <Image
          src={site.screenshot}
          alt={`${site.name} on a phone`}
          width={585}
          height={1266}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
        {site.video && <PhoneVideo src={site.video} startWhen={priority ? "load" : "visible"} />}
      </span>
      <span className="rg-phone-island" aria-hidden="true" />
    </>
  );

  return site.url ? (
    <a
      href={site.url}
      target="_blank"
      rel="noopener"
      className="rg-phone-frame"
      aria-label={`${site.name} website, designed by us (opens in a new tab)`}
    >
      {screen}
    </a>
  ) : (
    <span className="rg-phone-frame">{screen}</span>
  );
}
