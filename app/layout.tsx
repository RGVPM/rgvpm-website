import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RGV Performance Marketing | AI-Powered Digital Marketing",
    template: "%s | RGV Performance Marketing",
  },
  description:
    "AI-powered digital marketing for local businesses. Websites, SEO, paid ads, lead management, newsletters, and more. Locally rooted. Built to scale.",
  metadataBase: new URL("https://rgvperformancemarketing.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rgvperformancemarketing.com",
    siteName: "RGV Performance Marketing",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
