# Claude Code cheat sheet
<!-- Commands change as the tools update. In Claude Code, type /help any time for the current list. -->

## Get started
- Install Claude Code: see https://docs.claude.com (search "Claude Code quickstart").
- Start a session: open a terminal **inside your project folder** and run `claude`.

## The everyday moves
| Do this | How |
|---|---|
| Point it at a file | Type `@` and the file name, e.g. `@index.html` |
| Stop it mid-task | Press `Esc` |
| Plan before it edits | Press `Shift+Tab` to cycle modes until you're in plan mode |
| Run a quick terminal command | Start your message with `!`, e.g. `!ls` |
| Create a CLAUDE.md for this project | `/init` |
| Start fresh on a new task | `/clear` |
| Keep going in a long session | `/compact` (summarizes the conversation so far) |
| Switch models | `/model` |
| See every command | `/help` |

## Habits that make it work
1. **Spec first.** Write what "done" looks like before asking for code.
2. **Small steps.** One feature per request. Check it. Then the next.
3. **Ask for the plan.** "Show me your plan first" catches bad ideas before they become code.
4. **Give examples.** A sample of real input beats a paragraph of description.
5. **Commit often.** Use Git (or ask the agent to) so you can always go back.
6. **Read the summary.** Before you accept a change, read what it says it did.
7. **Never paste secrets.** Keep passwords and API keys out of your prompts and your code.

## Good phrases to steal
- "Before you change anything, explain what you're going to do."
- "Make the smallest change that fixes this."
- "Test it on a phone-sized screen and tell me what you saw."
- "What could break because of this change?"
- "Undo your last change."
