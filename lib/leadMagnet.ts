import { SITE } from "@/lib/site";

/**
 * AI lead magnet: the free Claude Code Starter Kit + 5-day email course.
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

/** Files in the kit, in reading order. `file` is relative to KIT_DIR. */
export const KIT_FILES = [
  { file: "README.md", title: "Start here", text: "What's in the kit and how to use it in 15 minutes." },
  { file: "CLAUDE.md", title: "CLAUDE.md template", text: "The instructions file Claude Code reads every session. Fill in the blanks for your business." },
  { file: "AGENTS.md", title: "AGENTS.md for Codex", text: "The same idea for Codex, which reads AGENTS.md." },
  { file: "project-spec-template.md", title: "One-page project spec", text: "Say what \"done\" looks like before you ask for code." },
  { file: "build-templates/01-lead-capture-landing-page.md", title: "Build: lead-capture landing page", text: "A single page that gets visitors to call or request a quote." },
  { file: "build-templates/02-quote-calculator.md", title: "Build: quote calculator", text: "Instant price estimates from your own pricing rules." },
  { file: "build-templates/03-weekly-report-from-spreadsheet.md", title: "Build: weekly report from a spreadsheet", text: "Turn a CSV export into a one-page summary, on your own computer." },
  { file: "claude-code-cheat-sheet.md", title: "Claude Code cheat sheet", text: "The commands and habits you'll use every day." },
] as const;

export const KIT_COURSE = [
  { day: "Day 1", title: "Set up your workbench" },
  { day: "Day 2", title: "Teach it your business" },
  { day: "Day 3", title: "Write the spec" },
  { day: "Day 4", title: "Build it" },
  { day: "Day 5", title: "Ship it" },
] as const;
