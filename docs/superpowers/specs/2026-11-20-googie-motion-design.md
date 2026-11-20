# Googie Motion & Hero Figure — Design (addendum to 2026-11-20-retrofuturism-googie-redesign-design.md)
*Date: 2026-11-20 · Status: direction approved by user (theme: measurement / individual differences / psychometrics; ambient motion, interaction only if meaningful)*

## Intent
The page reads static. Add subtle, tasteful motion site-wide and replace the small static orbit motif in the hero with a meaningful animated object.

## Decisions
- **Hero figure: Galton board ("individual differences, arriving one observation at a time").**
  Canvas (~340×300) in the hero's right slot: dots drop through a peg triangle, deflect ±half-gap per row, and stack into teal bins; a fitted normal curve (orange) overlays; sliding window of the last 90 observations keeps it evolving. Pauses off-screen; renders a static bell under `prefers-reduced-motion`. Replaces `.orbit-motif` (which only existed on index).
- **Motion plan (as shown in the picked-over mockup, unobjected):**
  1. Scroll reveals — section children rise 14px + fade, 500ms, staggered ~70ms, once (IntersectionObserver).
  2. Hero entrance — children cascade on load, pure CSS, staggered delays.
  3. Hover micro — pills/cards lift 2px; brand starburst rotates slowly (16s); buttons press on click.
  4. No count-ups on index (no natural numbers); risk_meta keeps its own.
- **Implementation shape:** progressive enhancement — motion.js adds `.reveal` classes at runtime (no-JS = fully visible, no classes); all motion CSS lives inside `@media (prefers-reduced-motion: no-preference)`; zero dependencies; one rAF loop total, paused off-screen.

## Non-goals
No parallax, no scroll-jacking, no typewriter effects, no dark-flash transitions, no new dependencies, no changes to content wording (one new figure caption is chrome).

## Verification
Browser pass 1440/390: reveals fire once, no layout shift from transitions, canvas pauses when scrolled away, reduced-motion shows static bell + no reveals; text-integrity diff clean except the new caption; console clean; check-8.sh 18/18.
