import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
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
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a2d06d49cb8f1e129b49b63"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
