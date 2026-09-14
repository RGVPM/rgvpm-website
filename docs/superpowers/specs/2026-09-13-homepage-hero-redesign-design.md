# Homepage hero redesign

Date: 2026-09-13. Approved by Derrick in conversation.

## Problem
The hero read as a generated SaaS template: grid-line texture over navy, two
glow blooms, and a fake "growth system" dashboard built from divs on the right.

## Design
- Background: solid deep navy with a slight darkening toward the bottom. No
  grid, no glows, no gradient hairlines.
- Left column: the existing two-line headline, larger and tighter (up to 62px).
  The two ledes merge into one paragraph of about 25 words. Primary CTA stays
  the orange button to the booking calendar. Secondary CTA becomes an
  underlined text link to /pricing. The three checkmark bullets become a quiet
  mono proof rail: local team, count of live client sites, month-to-month.
  The eyebrow label is dropped (the proof rail already carries "local").
- Right column: a layered stack of three real client sites from the existing
  screenshots in /public/work. CCL Contracting large in front, D'Vash
  Aesthetics and Mac's Dove Hunts behind it, offset and slightly tilted.
  One thin cream border per card, a mono caption under the front card
  (domain and city), each card a real link to the live site. Staggered
  fade-and-rise on load; front card lifts on hover. Under 1024px only the
  front card renders.
- Stays a server component. Front screenshot loads with priority for LCP.
- GrowthDashboard.tsx and its CSS are removed; nothing else used them.

## Out of scope
Copy rewrite of the headline, changes to the nav, the client marquee below.
