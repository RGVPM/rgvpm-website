import { Fraunces, Source_Serif_4 } from "next/font/google";
import "../blog/blog.css";
import "./guides.css";

// Guides reuse the blog's reading styles and faces, loaded only on these pages.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`rg-blog ${fraunces.variable} ${sourceSerif.variable}`}>{children}</div>;
}
