import { SITE } from "@/lib/site";

/**
 * AI lead magnet: a free Morning Inbox Agent (the centerpiece) plus the
 * Claude Code Starter Kit and a 5-day email course.
 *
 * Derrick sends the kit to each new signup personally, so there is no
 * public download or setup page. The kit source lives in
 * docs/lead-magnet/claude-code-starter-kit/ (not served by the site).
 *
 * FORM: create a form in the lead system (first name + email) named
 * "Claude Code Starter Kit" and paste its ID below. Until then the landing
 * page falls back to a pre-filled email so no signup is lost. Welcome +
 * 5-day email copy lives in docs/lead-magnet/claude-code-starter-kit-emails.md.
 */
export const KIT_FORM_ID = ""; // TODO(owner): paste the lead-system form ID

export const KIT_NAME = "Claude Code Starter Kit";
export const KIT_LANDING = "/claude-code-templates";

export const KIT_FALLBACK_MAILTO =
  `mailto:${SITE.email}?subject=${encodeURIComponent("Send me the Claude Code Starter Kit")}` +
  `&body=${encodeURIComponent("Hi! Please send me the free Claude Code Starter Kit and add me to the 5-day course.\n\nName:\n")}`;

/** What the landing page promises, in plain English. */
export const KIT_PROMISE = [
  "A free AI agent that reviews your inbox every morning at 8",
  "Step-by-step setup: copy, paste, done in 10 minutes",
  "Make it yours with Claude Code: our starter template",
  "Claude Code cheat sheet",
  "A 5-day email course to build your next agent",
] as const;

export const KIT_COURSE = [
  { day: "Day 1", title: "Install Claude Code" },
  { day: "Day 2", title: "Make your agent yours with Claude Code" },
  { day: "Day 3", title: "Turn on the AI summary" },
  { day: "Day 4", title: "Build your second agent" },
  { day: "Day 5", title: "What to automate next" },
] as const;
