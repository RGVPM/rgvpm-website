# Set up your Morning Inbox Agent (10 minutes, no coding)

Every morning between 8 and 9 AM, your agent reviews the last 24 hours of your Gmail
inbox and emails you a briefing: what needs your reply, what you're waiting on, and
what you can skip. Works with Gmail and Google Workspace accounts.

## Step 1: Open Google Apps Script
Go to **script.google.com** (signed in to the Gmail account you want briefed) and click
**New project**.

## Step 2: Paste the agent
Delete the few lines of code already there. Open `morning-inbox-agent.gs` from this kit,
copy everything, paste it in, and click the **Save** icon. Name the project
"Morning Inbox Agent" when it asks.

## Step 3 (optional): Turn on the AI summary
Skip this and you still get a clean, sorted briefing. Add it and every briefing opens
with your top priorities for the day and a suggested one-line reply for each email.

1. Get a Claude API key at **console.anthropic.com** (API Keys > Create Key). It's
   pay-as-you-go; a daily briefing typically costs a few cents a day.
2. Back in Apps Script, click the **gear icon (Project Settings)**, scroll to
   **Script properties**, and click **Add script property**.
3. Property: `ANTHROPIC_API_KEY`  Value: paste your key. Click **Save script properties**.

## Step 4: Start it
At the top, pick **setup** in the function menu and click **Run**. Google will ask for
permission to read your email and send email as you. It's your own script, so click
through: **Review permissions > your account > Advanced > Go to Morning Inbox Agent > Allow**.

Your first briefing lands in your inbox within a minute. After that, it arrives
every morning on its own. Your computer doesn't need to be on.

## Change the time or turn it off
- **Different time:** change `SEND_HOUR: 8` at the top of the script (0-23), Save, and run
  **setup** again.
- **Wrong time zone:** Project Settings > Time zone.
- **Turn it off:** pick **stopAgent** in the function menu and click Run.

## Make it yours with Claude Code
This is where it gets fun. Save the script into a folder on your computer, open that
folder in Claude Code, and just ask:

- "Flag any email that mentions an invoice or a payment as urgent."
- "Also send the briefing to my assistant at assistant@mybusiness.com."
- "Add a section for emails from my top 5 customers: [names]."
- "Send it at 7 AM on weekdays only."

Paste the updated script back into Apps Script, Save, and run **setup** again.

## Privacy
The agent runs inside your own Google account. Nothing is sent to RGV Performance
Marketing. If you add a Claude API key, short previews of your emails are sent to
Anthropic's API to write the summary.
