"use client";

import { usePathname } from "next/navigation";

// Keying the wrapper on the pathname remounts it on every route change,
// which re-triggers the CSS fade-in animation. Subtle and fast by design.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
