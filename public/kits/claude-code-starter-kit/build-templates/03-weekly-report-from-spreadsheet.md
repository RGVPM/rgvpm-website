# Build template: weekly report from a spreadsheet
<!-- Paste this into Claude Code or Codex after filling in the brackets. -->

Build a small tool that turns my weekly spreadsheet export into a one-page summary.

**The spreadsheet:** a CSV exported from [your tool: sales system, QuickBooks, Google Sheets, etc.].
**Columns:** [paste the header row, e.g. Date, Customer, Service, Amount, Rep, Source]

## The summary should show
- Totals for the week: [revenue, jobs, new customers, etc.]
- Compared to last week: up or down, and by how much
- Top 5 [customers / services / reps] by [amount]
- Anything unusual: [Example: "any job over $5,000," "any day with zero sales"]

## How I want to use it
- I drop the CSV file into a folder (or onto a web page) and get the summary.
- Output: [a web page I can print / a PDF / a formatted email I can copy].

## Requirements
- Runs on my own computer. Don't upload my data anywhere.
- Handles blank rows and extra spaces without crashing.
- If a column is missing, tell me clearly instead of guessing.

Here's a sample of my data (fake or anonymized is fine):
[paste 10 to 20 rows]

Show me your plan first. Then build it and run it on the sample so I can see the result.
