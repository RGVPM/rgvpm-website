"use client";

import Script from "next/script";
import { TRACKING } from "@/lib/offer";

/**
 * Meta Pixel — base code + PageView.
 *
 * Renders nothing at all until TRACKING.metaPixelId is filled in, so the
 * page never ships a pixel with a placeholder ID, a broken <img> beacon, or
 * a console error. Scoped to the landing route rather than the root layout:
 * the rest of the site keeps running GA4 only, exactly as it does today.
 *
 * The four remaining events (ViewContent, InitiateCheckout, Lead, Purchase)
 * are fired from the components that own the interaction, via lib/track.ts.
 */
export default function MetaPixel() {
  const id = TRACKING.metaPixelId;
  if (!id) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${id}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
