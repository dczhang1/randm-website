# Retrofuturism Redesign (Space-Age Googie) — Design
*Date: 2026-11-20 · Branch: redesign-2026-swiss · Status: awaiting approval*

## Intent & why
The user reviewed the completed Swiss Brutalist redesign and pivoted: the overall
aesthetic should become **Retrofuturism**. From a three-direction mockup (Space-Age
Googie / NASA 1974 Manual / CRT Cassette), they picked **Direction A — Space-Age
Googie** with no conditions. This doc covers reskinning the whole site, including
the `risk_meta/` companion pages, on the new system.

## Goals
- Full reskin: index, publications, grips, casprt, `risk_meta/index.html`,
  `risk_meta/resources.html`, shared chrome (masthead, mobile menu, colophon).
- Keep everything that survived the Swiss pass: page structure, content wording,
  JS hooks, static HTML/CSS/JS (no build step, no new npm deps), responsive
  behavior, `prefers-reduced-motion` handling, text-integrity (zero content drift).
- Distinct Googie personality: optimistic, warm, geometric — not a token swap only.

## Non-goals / anti-goals
- No dark CRT variant (rejected direction C). No dark backgrounds anywhere.
- No gradients, shadows, or canvas animation (carried over from the Swiss spec —
  Googie is flat ink on cream).
- No content rewrites; only wording changes are nav/footer chrome labels if needed.
- No framework, no icon fonts, no remote fonts at runtime.

## Decisions made
- **Direction:** Space-Age Googie (user pick from mockup, 2026-11-20).
- **Accent mapping (my call, correctable):** main site accent becomes signal
  orange `#E8541E` (was LSU gold `#F0B323`); `risk_meta/` keeps its
  "own slightly different color" via teal `#17797F` (was LSU purple `#461D7C`).
- **Radii return (my call):** pills (999px) for tags/CTAs; cards stay sharp with
  2px ink borders, as in the approved mockup.

## Token layer (css/base.css)
```
--paper: #F6F1E5;      /* warm cream */
--ink:   #1C1A14;      /* warm near-black */
--accent:#E8541E;      /* signal orange — main site */
--accent-2:#17797F;    /* teal — secondary + risk_meta accent */
--card:  #FFFFFF;
--gray-2:#55524A;
--hairline:#DAD3C2;
--rule: 2px solid var(--ink);      /* was 3px */
--radius-pill: 999px;
```
Type: `--font-display` swaps Archivo → a geometric Futura-like face, **self-hosted
woff2** (same pattern as current `fonts/archivo-variable.woff2`; Jost is the
leading candidate, final face is the builder's pick as long as it reads Futura).
Fallbacks: Futura, Century Gothic, Trebuchet MS. Mono stays `ui-monospace`.
Body stays 17px/1.6. Contrast: orange/teal used for display-size text, tags, CTAs
and fills only; body text is always ink (orange-on-cream fails 4.5:1 at body size).

## Component mapping (Swiss → Googie)
| Swiss | Googie |
|---|---|
| Masthead 3px rule | 2px ink rule; brand gets inline starburst SVG; nav dots ` · ` separators in orange |
| `.hollow` hero outline word | Solid orange display word; orbit-rings SVG behind hero right |
| `.tag-gold` square tag | Dashed-outline pill tag (teal) |
| `.stamp` | Dashed pill, gray-2 |
| `.link-arrow` | Pill links: solid orange / 2px teal outline (mockup CTAs) |
| Stat blocks | White cards, 2px ink border, small colored square tick, mono caps label |
| Section `.idx` numbers | Orange mono numbers |
| Colophon | 2px top rule; pill links |
| Buttons (all pages) | Pill; hover swaps to ink |
| Charts fills | orange = strong, ink = moderate, hairline = weak (same semantics, recolored) |
| risk_meta `--accent` | `#17797F`; PRISMA dots stay square; CTA band becomes teal |

## Motif kit (SVG inline, no icon fonts)
Orbit rings (hero, section openers), 8-point starbursts (brand mark, list
separators), dashed pill outlines. All decorative SVGs `aria-hidden`.

## Risks / notes
- Page markup changes are small (classes + a few inline SVGs); `css/base.css`,
  `css/swiss.css`, and `risk_meta/assets/css/style.css` carry most of the work.
- casprt's working Chart.js self-assessment stays (CDN stays — precedent from
  the Swiss pass); chart color configs are restyled to the new tokens. (My call.)
- GRiPS/publications keep their current structure and JS rendering untouched —
  this is a skin change only.
- The branch currently holds the full Swiss redesign (11 commits ahead, pushed).
  Work continues on the same branch; git history preserves the Swiss state.
- `zcurve.html` no longer exists on this branch (verified 2026-11-20) — no action.
- Older browsers without the display font fall back to system geometric sans —
  acceptable (same policy as Archivo today).

## Left to the builder
- Exact display font file + `@font-face` plumbing.
- Final orbit/starburst SVG artwork.
- Per-section accent rhythm (which sections lean orange vs teal).
- Verification: browser pass 1440px + 390px on all six pages, console clean,
  text-integrity word-multiset diff vs current branch (no content drift),
  static sweep (no gradients/shadows/dark bg, tokens only).
