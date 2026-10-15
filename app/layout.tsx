import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "RGV Performance Marketing | AI & Marketing Agency",
    template: "%s | RGV Performance Marketing",
  },
  description:
    "An AI and marketing agency for local businesses. We build websites, SEO, and ads, plus the AI systems that answer calls, follow up with leads, and cut the busywork. Locally rooted. Built to scale.",
  metadataBase: new URL("https://rgvperformancemarketing.com"),
  // No url/title/description here: pages that don't set their own openGraph
  // inherit this, and Next fills title/description from the page itself.
  // Twitter has only the card type for the same reason (it used to hard-code
  // the homepage text, which every inner page then shared).
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RGV Performance Marketing",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: "https://rgvperformancemarketing.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* Self-hosted through next/font: no render-blocking Google Fonts CSS, and
   size-adjusted fallbacks keep the swap from shifting layout. Each family
   is exposed as a CSS variable on <html>; globals.css maps them to the
   --font-display / --font-body / --font-mono aliases the site uses. */
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-sans",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  // Labels only, never above-the-fold LCP text: don't preload.
  preload: false,
  variable: "--font-dm-mono",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  // Still preloaded: it is the H1 face on most inner pages (their LCP text).
  variable: "--font-bebas",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${bebas.variable}`}>
      <body>
        {/* Site-wide entity graph: the one business node and the WebSite node. */}
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4G6Y27NLZ4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4G6Y27NLZ4');
          `}
        </Script>
        {/* Chat bubble isn't needed for first paint: it loads on idle, and on
            the homepage only after the medspa band (see ChatWidget). */}
        <ChatWidget />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
