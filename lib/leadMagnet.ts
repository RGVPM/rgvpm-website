/**
 * AI lead magnet: a free Morning Inbox Agent (the centerpiece) plus the
 * Claude Code Starter Kit and a 5-day email course.
 *
 * Derrick sends the kit to each new signup personally, so there is no
 * public download or setup page. The kit source lives in
 * docs/lead-magnet/claude-code-starter-kit/ (not served by the site).
 *
 * FORM: components/AgentSignupForm.tsx collects name, email, and phone and
 * submits to Netlify Forms (form "free-inbox-agent"). Welcome + 5-day email
 * copy lives in docs/lead-magnet/claude-code-starter-kit-emails.md.
 */

export const KIT_NAME = "Claude Code Starter Kit";
export const KIT_LANDING = "/claude-code-templates";


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
