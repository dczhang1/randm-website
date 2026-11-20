# RANDM Lab Website — Swiss Brutalist Redesign

**Date:** 2026-11-20
**Status:** Direction approved in conversation; document pending approval
**Branch:** `redesign/2026-refresh`

## Intent & Why

The current site reads as generic 2023 AI-SaaS design: dark palette,
gradients, an animated neural-network canvas, bento cards with 3D tilt.
A serious I/O psychology lab should look confident, timeless, and
content-first.

Chosen direction: **Swiss Brutalist** (International Typographic Style /
neo-brutalism) — stark grid, oversized grotesque type, thick rules,
exposed structure, numbered index, one loud accent. Explored and rejected
15 other directions over four rounds of mockups (editorial, chart-led,
riso, gallery, showbill, field guide, museumcore, dial-up, and hybrids);
Swiss Brutalist was the user's pick.

**Decided in conversation:**

- Accent: **LSU Gold `#F0B323`** on bone paper (over Swiss red and ink-only)
- Scope: **main site only** — `index.html`, `publications.html`,
  `grips.html`, `casprt.html`, and shared chrome. The `risk_meta/`
  mini-site stays as-is for a possible later phase.

## Goals

- A distinctive identity no other psychology lab site has
- Content-first: research, scales, people, and publications readable
  above all
- Keep the stack: pure HTML/CSS/JS, no build step, deployed on Vercel
- WCAG AA accessibility; respects `prefers-reduced-motion`
- Fast: no canvas animation, minimal JS, self-hosted fonts

## Non-goals

- No content rewrite — light copy edits only where the layout demands
- No information-architecture change: single-page + standalone pages +
  anchor navigation stays
- No framework, no build tooling, no new npm dependencies

## Anti-goals (failure even if it technically works)

- Anything resembling 2023 SaaS/AI aesthetic: gradients, glassmorphism,
  dark hero, neural canvas, tilted 3D cards, rounded bento grids
- Trend-chasing ornament that dates quickly
- Decoration that competes with content

## Constraints

- `css/main.css` remains the single CSS entry point via `@import`s
- `data-page` attribute pattern on `<body>` stays
- `archive/` directory untouched
- Existing JS module pattern (`App.init()` in `js/main.js`) is pruned of
  decorative modules, not rewritten
- Anchors `#about #research #team #news #contact` must keep working
  (deep links)

## Design System

### Palette

| Token | Value | Use |
|---|---|---|
| Paper | `#F4F3EF` | page background |
| Ink | `#0E0E0C` | all text, rules |
| Gold | `#F0B323` | the single loud accent |
| Gray-2 | `#6E6D66` | secondary text |
| Hairline | `#D9D7CE` | subtle separators |

- Gold is rationed: tag blocks/stamps, active nav state, link hover
  inversion partner, text selection, at most one hero element per page.
  Never body text on paper.
- Hover/focus style: **inversion** (ink background, paper text).
- Focus ring: 3px ink outline, offset 2px — visible on paper and gold.
- Text selection: gold background, ink text.

### Typography

- **Display & UI: Archivo** (self-hosted variable `woff2`, weights
  ~500–900), fallback stack `Helvetica Neue, Arial, sans-serif`.
  Uppercase with tight tracking (−0.02 to −0.04em) for display;
  sentence case for body.
- **Mono (index numbers, labels, metadata):** system stack
  `ui-monospace, SFMono-Regular, Menlo, monospace` — no font file.
- Scale (fluid): hero `clamp(56px, 12vw, 140px)`; section titles
  `clamp(32px, 5vw, 56px)`; body 16–18px; mono captions 11–13px.
- Prose line length 60–70ch.

### Grid & structure

- 12-column CSS grid, max-width 1280px, 24px gutters (16px mobile)
- Every section opens with: 3px ink top rule + mono index label
  (`01 — RESEARCH`) + section title
- Borders (1–2px ink) define cells; **no drop shadows; radius 0–2px max**
- Asymmetric whitespace encouraged; grid lines may be exposed as
  visible structure

### Components

- **Masthead:** full-width bar between 3px rules — left
  `RANDM — RISK & DECISION`, right `LSU / PSYCHOLOGY`; sticky, paper
  background. Mobile keeps the hamburger (existing pattern) restyled.
- **Hero (index):** giant cropped type `RISK &` / hollow-stroke
  `DECISION`, gold tag block `EST. 2016 — BATON ROUGE, LA`, one-line
  mission, two plain text links (`Research ↘`, `Join the lab`).
- **Research:** the 6 programs as grid cells (3×2 desktop): mono number
  01–06, bold title, two-line description, domain tag. No hover motion
  beyond link underline.
- **Resources:** GRiPS, CASPRT, meta-analysis as index entries — big
  abbreviation, full name, one line, arrow link. Optional
  `FREE TO USE` stamp (ink border, gold fill).
- **Team:** Swiss index list — table-like rows (`name — role — focus`);
  PI row larger with a photo slot; members get grayscale square photos
  where available, otherwise a typographic initials block. Alumni in a
  collapsed `<details>`, same table style.
- **News:** dated log lines (`2026.11 — text`), no carousel. Show
  latest ~5, remainder in a `<details>`.
- **Publications page:** strict typographic bibliography — year headers,
  hanging-indent entries, lab-member names bolded, DOI links in mono,
  plain-text filter links. Filter categories match the actual data
  (`article` / `chapter` / `other`): **All / Articles / Chapters /
  Other** (the current `js/publications.js` data has no "conference"
  type). The bibliography is **baked into static HTML** — source of
  truth moves from the JS array to a clearly-marked edit block in
  `publications.html`, so adding a paper stays a paste-in-the-right-year
  job and the page works without JS. The existing search box, year and
  sort controls are dropped (my call — 33 entries don't need a search
  box; filter links + browser find suffice).
- **Scale pages (GRiPS / CASPRT):** shared detailed-content layout —
  mono breadcrumb, big title, description, bordered CTA buttons
  (download / request), scoring info in two-column cells.
  **Decided:** tabs collapse into **one long indexed page** — sections
  01–06 with a sticky index; the CASPRT interactive self-assessment is
  kept and restyled; the Chart.js/Mermaid visualizations are restyled
  to ink/paper/gold, with Mermaid diagrams swapped for simple static
  figures if theming fights back.
  `zcurve.html` at the root is **deleted** (linked from nowhere;
  git history preserves it).
- **Contact / footer:** colophon style — contact grid, mono address,
  gold `EST. 2016` tag.
- **Motion:** instant invert on hover/focus only; any optional translate
  (≤8px) behind `prefers-reduced-motion: reduce`. No scroll-reveal, no
  parallax, no canvas.

### Deletions

- JS: `neural-canvas.js`, `card-3d.js`, `card-hover-effect.js`,
  `carousel.js`, `scroll-animations.js`
- CSS: dark-mode variables, gradient/bento/rounded-card styles, page
  CSS for sections as they're rebuilt
- Verify with grep that nothing references deleted files before removal
- Also remove: broken `js/detailed-content.js` reference in
  `casprt.html`; footer links to nonexistent `privacy.html` /
  `terms.html`; Font Awesome + Google Fonts CDN links (replaced by
  self-hosted Archivo); `zcurve.html` (whole page, per decision)

### Files

- Rewrite `css/base.css` (tokens), `css/layout.css` (grid); new
  `css/swiss.css` (components); prune `components.css` and dead
  page CSS as pages land
- New `fonts/` directory: Archivo variable woff2 + OFL license file
- All four pages rebuilt in place

## Verification

- Visual pass per page at 360 / 768 / 1280px
- Keyboard pass: nav, skip-link, `<details>`, visible focus
- Contrast: ink/paper, ink-on-gold, focus ring — AA
- No-JS rendering: content and nav readable
- Reduced-motion: nothing moves
- Vercel preview before merge

## Phases (input for the plan)

1. Tokens + base/layout CSS + masthead/footer chrome across pages
2. `index.html` sections
3. `publications.html`
4. `grips.html` / `casprt.html`
5. JS pruning, dead CSS/asset removal, QA sweep

## Left to the builder

- Exact hero crop and size per breakpoint
- Photo treatment (plain grayscale vs gold duotone) — try grayscale first
- News history handling if entries grow
- Archivo subsetting/weights to keep the font file small
