# Build template: quote / estimate calculator
<!-- Paste this into Claude Code or Codex after filling in the brackets. -->

Build a simple web page that gives customers an instant price estimate.

**Business:** [name], a [type of business].
**What's being estimated:** [Example: "Spray foam insulation for an attic."]

## Pricing rules (the agent must use exactly these)
- Base price: $[ ]
- Per unit: $[ ] per [square foot / room / hour]
- Add-ons: [add-on] +$[ ], [add-on] +$[ ]
- Minimum job: $[ ]
- Show the estimate as a range: [Example: "estimate minus 10% to plus 15%"]

## The page
1. A few simple inputs: [size, options, zip code, etc.]
2. The estimate updates as they type.
3. Under the estimate, a short line: "This is an estimate. Final price after a free inspection."
4. A button: "Get my exact quote," which opens a short form (name, phone, email) and sends the inputs along with it.

## Requirements
- One HTML file. Works on a phone.
- Put all prices in one clearly labeled block at the top of the script so I can change them later.
- Round to whole dollars. Never show a price below the minimum job.

Show me your plan first. After building, give me three test cases with the expected estimate so I can check the math.
