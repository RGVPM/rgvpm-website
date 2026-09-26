import { SITE } from "@/lib/site";

/**
 * AI lead magnet: a free Morning Inbox Agent (the centerpiece) plus the
 * Claude Code Starter Kit and a 5-day email course.
 *
 * FORM: create a form in the lead system (first name + email) named
 * "Claude Code Starter Kit", point its on-submit redirect at KIT_PAGE, and
 * paste its ID below. Until then the landing page falls back to a
 * pre-filled email so no signup is lost. Welcome + 5-day email copy lives in
 * docs/lead-magnet/claude-code-starter-kit-emails.md.
 */
export const KIT_FORM_ID = ""; // TODO(owner): paste the lead-system form ID

export const KIT_NAME = "Claude Code Starter Kit";
export const KIT_LANDING = "/claude-code-templates";
export const KIT_PAGE = "/claude-code-templates/kit";
export const KIT_ZIP = "/kits/claude-code-starter-kit.zip";
export const KIT_DIR = "/kits/claude-code-starter-kit";

export const KIT_FALLBACK_MAILTO =
  `mailto:${SITE.email}?subject=${encodeURIComponent("Send me the Claude Code Starter Kit")}` +
  `&body=${encodeURIComponent("Hi! Please send me the free Claude Code Starter Kit and add me to the 5-day course.\n\nName:\n")}`;

/** The free agent: the Apps Script file people paste into script.google.com. */
export const KIT_AGENT_FILE = "morning-inbox-agent.gs";

/** Everything in the kit, in reading order. `file` is relative to KIT_DIR. */
export const KIT_FILES = [
  { file: "morning-inbox-agent-setup.md", title: "Morning Inbox Agent: setup guide", text: "Four steps, about 10 minutes, no coding." },
  { file: "morning-inbox-agent.gs", title: "Morning Inbox Agent", text: "Reviews your Gmail every morning and emails you a briefing." },
  { file: "CLAUDE.md", title: "CLAUDE.md template", text: "The instructions file Claude Code reads every session. Fill in the blanks for your business." },
  { file: "claude-code-cheat-sheet.md", title: "Claude Code cheat sheet", text: "The commands and habits you'll use every day." },
] as const;

/** What the landing page promises, in plain English. */
export const KIT_PROMISE = [
  "A free AI agent that reviews your inbox every morning at 8",
  "Step-by-step setup: copy, paste, done in 10 minutes",
  "Make it yours with Claude Code: our starter template",
  "Claude Code cheat sheet",
  "A 5-day email course to build your next agent",
] as const;

export const KIT_COURSE = [
  { day: "Day 1", title: "Get your morning agent running" },
  { day: "Day 2", title: "Turn on the AI summary" },
  { day: "Day 3", title: "Install Claude Code and make the agent yours" },
  { day: "Day 4", title: "Build your second agent" },
  { day: "Day 5", title: "What to automate next" },
] as const;
