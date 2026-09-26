"use client";

import { useState } from "react";

/** Copies `text` to the clipboard; shows "Copied" for two seconds. */
export default function CopyButton({ text, label = "Copy the script" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="rg-hero-cta"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1, padding: "13px 18px", borderRadius: "var(--r-hero-sm)", border: "none", cursor: "pointer" }}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
