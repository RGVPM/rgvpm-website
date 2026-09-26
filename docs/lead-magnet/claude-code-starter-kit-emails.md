# Free Morning Inbox Agent: welcome email + 5-day course

Load these into your email system as an automation triggered by the "Claude Code
Starter Kit" form. Tag new subscribers `claude-code-kit` and add them to the
newsletter list. Timing: Welcome immediately, then Day 1 to Day 5 once a day at 9:00 AM.

There is no public download page. Derrick sends each new signup the agent and setup
guide personally (files in `docs/lead-magnet/claude-code-starter-kit/`), so the welcome
email only confirms the signup and sets the expectation.

**The goal of this sequence:** get them one quick win (the agent running), show them
they can change it themselves with Claude Code, then invite them to a 1-on-1 session
to build something bigger.

---

## Welcome (send immediately)

**Subject:** You're in. Your AI inbox agent is on its way
**Preview:** I'm sending it to you personally.

Hey {{first_name}},

Thanks for signing up. I'm sending your Morning Inbox Agent to you personally, along
with a short setup guide. Watch for it from me within one business day.

Setup is four steps, copy and paste, about 10 minutes. After that, every morning
around 8 AM you'll get one email that tells you what needs your reply, what you're
waiting on, and what you can skip.

When it arrives, set it up and reply to tell me when your first briefing lands.

Derrick
RGV Performance Marketing

---

## Day 1: Get it running
<!-- Send only after Derrick has personally sent the agent. -->

**Subject:** Did your first briefing show up?
**Preview:** If not, here's the one step people miss.

If your agent is running, you should have a briefing in your inbox already.

If not, it's almost always step 4: after you click Run, Google asks for permission.
Click Review permissions, pick your account, then Advanced, then Go to the project,
then Allow. It looks scary. It's your own script, running in your own account.

The full steps are in the setup guide I sent you.

Stuck anywhere? Hit reply and tell me which step.

---

## Day 2: Turn on the AI summary

**Subject:** Make your briefing think for you
**Preview:** Top priorities and suggested replies, for a few cents a day.

Right now your briefing sorts your inbox. Today, let's make it think.

1. Get a Claude API key at console.anthropic.com (API Keys, Create Key).
2. In your Apps Script project: gear icon, Script properties, Add script property.
   Name: ANTHROPIC_API_KEY. Value: your key. Save.

Tomorrow's briefing will open with your top 3 priorities and a one-line suggested reply
for every email that needs one. It typically costs a few cents a day.

---

## Day 3: Make it yours with Claude Code

**Subject:** Change your agent by asking in plain English
**Preview:** No coding. You describe it, Claude Code writes it.

This is the part most people don't know is possible.

1. Install Claude Code: search "Claude Code quickstart" on docs.claude.com.
2. Save your agent script into a folder on your computer.
3. Open that folder in Claude Code and ask for what you want:
   - "Flag anything about invoices or payments as urgent."
   - "Also send the briefing to my assistant."
   - "Only send it on weekdays, at 7 AM."
4. Paste the new version back into Apps Script, Save, and run setup again.

You just edited an AI agent without writing code. That's the whole skill.

---

## Day 4: Build your second agent

**Subject:** What else could run while you sleep?
**Preview:** Your next agent, in one sentence.

Now that you've seen it work, think about what else you check every morning or every
week by hand. A few ideas owners build next:

- A Friday email that lists every lead that didn't get a reply this week.
- A daily note of tomorrow's appointments, pulled from your calendar.
- A weekly summary of your sales spreadsheet.

Open Claude Code in a new folder, copy in CLAUDE.md from your kit (fill in the blanks
about your business), and describe the agent in one or two sentences. Ask it to show
you the plan before it builds.

---

## Day 5: What to automate next

**Subject:** Want to build the next one together?
**Preview:** 1-on-1, your business, a real tool by the end.

You've got an agent running every morning and you've changed it yourself. Most people
never get that far.

If you want to go bigger (agents that follow up with leads, tools your team uses every
day, the systems that run the business), we sit down with owners 1-on-1 and build it
together with Claude Code. You drive, I coach, and you keep everything.

Book a build session: https://rgvperformancemarketing.com/learn-claude-code

Derrick
