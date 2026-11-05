import { Fraunces, Source_Serif_4 } from "next/font/google";
import "./blog.css";

// The reading faces load here rather than in the root layout, so only /blog
// pays for them. Fraunces echoes the flared serif in the social graphics.
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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`rg-blog ${fraunces.variable} ${sourceSerif.variable}`}>{children}</div>;
}
