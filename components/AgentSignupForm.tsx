"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/track";

/**
 * Free Morning Inbox Agent signup: name, email, phone.
 *
 * Submits to Netlify Forms (form "free-inbox-agent", registered by
 * public/__forms.html). Submissions appear in the Netlify dashboard under
 * Forms, which can email each one to you. "company" is a hidden honeypot:
 * bots fill it, people never see it, and Netlify drops those submissions.
 */
type Status = "idle" | "sending" | "done" | "error";

const field: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  fontSize: 16, // 16px stops iOS zooming into the field on focus
  color: "var(--navy)",
  background: "#fff",
  border: "1px solid #C9CFDA",
  borderRadius: "var(--r-sm)",
};
const label: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 6 };

export default function AgentSignupForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const body = new URLSearchParams();
    new FormData(form).forEach((v, k) => body.append(k, String(v)));
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("Lead", { content_name: "Free Morning Inbox Agent" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" style={{ padding: "8px 0 4px" }}>
        <p style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", margin: 0 }}>You&rsquo;re in.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--muted)", margin: "8px 0 0" }}>
          Derrick will send your Morning Inbox Agent and setup guide personally within one business day.
          Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form name="free-inbox-agent" onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
      <input type="hidden" name="form-name" value="free-inbox-agent" />
      <p hidden>
        <label>
          Leave this empty <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div>
        <label htmlFor="agent-name" style={label}>Name</label>
        <input id="agent-name" name="name" required autoComplete="name" style={field} />
      </div>
      <div>
        <label htmlFor="agent-email" style={label}>Email</label>
        <input id="agent-email" name="email" type="email" required autoComplete="email" style={field} />
      </div>
      <div>
        <label htmlFor="agent-phone" style={label}>Phone</label>
        <input id="agent-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9\(\)\+\-\.\s]{7,}" title="A phone number, like (956) 555-0123" style={field} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rg-hero-cta"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 17, lineHeight: 1, padding: "18px 24px", borderRadius: "var(--r-hero-sm)", border: "none", cursor: status === "sending" ? "wait" : "pointer", boxShadow: "var(--shadow-orange)", opacity: status === "sending" ? 0.75 : 1 }}
      >
        {status === "sending" ? "Sending..." : <>Send me the free agent <span aria-hidden="true">→</span></>}
      </button>
      {status === "error" && (
        <p role="alert" style={{ fontSize: 14, color: "#B42318", margin: 0 }}>
          Something went wrong. Please try again, or email us at info@rgvperformancemarketing.com.
        </p>
      )}
    </form>
  );
}
