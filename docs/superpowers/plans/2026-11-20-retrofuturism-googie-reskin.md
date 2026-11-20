# Space-Age Googie Reskin — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the entire RANDM Lab site (6 pages + chrome) from Swiss Brutalist to Space-Age Googie retrofuturism without changing structure, content, or JS behavior.

**Architecture:** Token-level swap in `css/base.css` (palette + display font), component-level restyle in `css/swiss.css` (pills, dashed tags, orbit/starburst motifs), then per-page passes and the `risk_meta/` companion swap. All "tests" are checkable verification commands: greps, HTTP checks, browser passes at 1440px/390px, and a word-multiset text-integrity diff (this is a static site with no unit-test harness; TDD is adapted as check-after-change with exact expected outputs).

**Tech Stack:** Static HTML/CSS/JS. No build step, no new npm deps. One new self-hosted font file (woff2, fetched once at build time). Chart.js 4.4.0 CDN stays (existing).

**Spec:** `docs/superpowers/specs/2026-11-20-retrofuturism-googie-redesign-design.md` (approved 2026-11-20; Direction A picked from live mockup)

## Global Constraints

- No dark backgrounds anywhere. No gradients, no box-shadows, no text-shadows.
- Radii only as pills: `border-radius: 999px` on tags/CTAs; cards stay square (0).
- No icon fonts, no emoji as icons; decorative SVGs inline and `aria-hidden="true"`.
- No remote requests at runtime except the existing Chart.js CDN on casprt.
- Body text is always `var(--ink)` on `var(--paper)`; orange/teal only for
  display-size text, tags, CTAs, fills, and decorative marks.
- `prefers-reduced-motion` block in base.css stays untouched and all-new CSS
  animation lives outside it (i.e., none unless guarded).
- Zero content drift: the only wording changes allowed are none; SVG additions
  and class renames don't count as drift (text-integrity diff must be empty of
  prose changes).
- Orange `#E8541E` = main accent; teal `#17797F` = secondary + all of risk_meta.
- After every task, `python3 -m http.server 8123` must serve the touched pages
  with HTTP 200 (server is already running; restart only if down).

## Review Focus

Most likely ways this reskin bites, each pinned by a check in Task 7 (owners noted):

1. **risk_meta JS var aliases break** — `charts.js`/`subgroup-analysis.js`/`data-table.js` inject `var(--accent-cyan)`, `var(--border)`, `var(--text-muted)` inline; if the token rename orphans any, fills/rules vanish. Expect: bars render filled after rename. → Task 6 step check + Task 7 browser pass on all four risk_meta tabs.
2. **Orphaned `--gold` / `.tag-gold` references** — any file missed by the rename renders transparent/unstyled. Expect: `grep -rn "gold" css/ *.html risk_meta/assets` returns only `tag-accent` and zero `--gold`. → Task 1 check, re-run in Task 7.
3. **Orange body-size text on cream** (fails 4.5:1) — accent creeping into `<p>`/notes. Expect: spot-check computed color of body copy is ink. → Task 7 browser pass.
4. **Content drift** — a sed eats visible words (e.g., "gold" in prose). Expect: text-integrity diff shows only documented chrome deltas (empty). → Task 7 diff.
5. **Mobile overflow from pills/orbit SVG** — 375px body wider than viewport. Expect: `body` computed width 375, no horizontal scroll. → Tasks 3–6 mobile checks, re-run in Task 7.

---

### Task 1: Token layer — palette, rules, display font

**Files:**
- Modify: `css/base.css` (tokens block, `@font-face`, `--font-display`)
- Create: `fonts/jost-variable.woff2`
- Modify (mechanical rename): every file referencing `--gold` or `.tag-gold`

**Interfaces:**
- Produces: tokens consumed by all later tasks — `--paper:#F6F1E5; --ink:#1C1A14; --accent:#E8541E; --accent-2:#17797F; --card:#FFFFFF; --gray-2:#55524A; --hairline:#DAD3C2; --rule:2px solid var(--ink); --rule-thin:1px solid var(--ink); --radius-pill:999px`. Var `--gold` and class `tag-gold` cease to exist; consumers use `--accent` / `.tag-accent`.
- Produces: `@font-face` family `'Jost'` (weight `100 900`, `font-display: swap`, src `../fonts/jost-variable.woff2`), stack `--font-display: 'Jost', Futura, 'Century Gothic', 'Trebuchet MS', sans-serif`. Mono stack unchanged.

- [ ] **Step 1: Fetch the font file (build-time only, no runtime dep)**

```bash
cd /Users/donzhang/Documents/Repositories/1.Websites/randmlab-website
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
CSS=$(curl -sf -A "$UA" "https://fonts.googleapis.com/css2?family=Jost:wght@100..900&display=swap")
URL=$(echo "$CSS" | grep -o 'https://[^)]*\.woff2' | head -1)
curl -sf -A "$UA" "$URL" -o fonts/jost-variable.woff2 && ls -la fonts/
```
Expected: `fonts/jost-variable.woff2` exists (≈40–80 KB). If fonts.googleapis.com is unreachable, stop and report — do not substitute a remote `@import`.

- [ ] **Step 2: Swap the token block and `@font-face` in `css/base.css`**

Replace the palette block and font-face/font stack with the values in Interfaces (exact). Leave reset, reduced-motion block, body sizing (17px/1.6), `scroll-padding-top` untouched.

- [ ] **Step 3: Mechanical rename `--gold` → `--accent`, `tag-gold` → `tag-accent` across `css/`, root `*.html`, `js/`**

One sweep, e.g. `grep -rl -- '--gold\|tag-gold' css/ js/ *.html | xargs sed -i '' -e 's/--gold/--accent/g; s/tag-gold/tag-accent/g'`. Do NOT touch `risk_meta/` (it already uses `--accent`/`.tag-accent` and gets its own pass in Task 6).

- [ ] **Step 4: Verify**

Run: `grep -rn -- "--gold\|tag-gold" css/ js/ *.html risk_meta/assets/ ; curl -s -o /dev/null -w '%{http_code}' http://localhost:8123/index.html`
Expected: grep exits 1 (no matches); HTTP 200; `curl -sf -o /dev/null http://localhost:8123/fonts/jost-variable.woff2` succeeds.

- [ ] **Step 5: Browser spot-check + commit**

Open `http://localhost:8123/index.html`, hard-reload, confirm the display font renders as geometric sans (not fallback) via devtools computed font-family, and the page is orange-tinted but unbroken (components still Swiss at this point — that's fine).
Commit: `git add -A && git commit -m "feat(googie): token layer — cream/ink/orange/teal, Jost self-hosted, gold→accent rename"`

### Task 2: Shared components in `css/swiss.css`

**Files:**
- Modify: `css/swiss.css` (masthead, hero, tags, stamps, buttons, links, stat blocks, colophon, mobile menu, rule-section idx)

**Interfaces:**
- Consumes: Task 1 tokens.
- Produces (all later page tasks rely on these, no per-page redefinition): `.tag-accent` = dashed 1.5px pill (border `--accent-2`, color `--accent-2`, transparent bg, radius `--radius-pill`); `.stamp` = dashed pill in `--gray-2`; `.btn` and `.link-arrow` = solid-pill (bg `--accent`, color `--paper`) with hover → bg `--ink`; secondary/ghost variant = 2px solid `--accent-2` pill; `.hollow` = solid `--accent` (class name kept for markup stability, style no longer hollow); stat blocks = `--card` bg, `2px solid var(--ink)` border, 12px padding, small 12×12 `--accent` square before the number (via `::before`), mono caps label in `--gray-2`; `.idx` numbers colored `--accent`; `.rule` widths 2px; masthead brand precedes an inline 12px starburst SVG (pages add it in their tasks); nav link separators become ` · ` in `--accent` (CSS `+ a::before`); colophon gets 2px top rule and pill-styled links; mobile menu keeps ink-swap hover (`#mobile-menu a:hover` background ink, color paper) unchanged.

- [ ] **Step 1: Restyle each component listed in Interfaces**

One focused edit per component group; no new files, no new classes beyond `::before`-based effects.

- [ ] **Step 2: Verify no forbidden properties**

Run: `grep -n "gradient\|box-shadow\|text-shadow\|border-radius" css/swiss.css`
Expected: only `border-radius: 999px` / `var(--radius-pill)` lines match.

- [ ] **Step 3: Browser check + commit**

index.html at 1440px: pills render, tags dashed, page tolerable mid-transition. Commit: `git commit -am "feat(googie): shared components — pills, dashed tags, stat cards, idx accents"`

### Task 3: index.html — hero + motifs + section rhythm

**Files:**
- Modify: `index.html` (hero SVG, masthead starburst, section accents)

**Interfaces:**
- Consumes: Task 2 component shapes.
- Produces: two inline SVG snippets other pages copy verbatim — (a) masthead starburst: 12×12 8-point star path filled `--accent`, `aria-hidden`, before "RANDM"; (b) hero orbit-rings SVG (~190px wide, two ellipses `--accent-2`/`--accent`, center disc `--ink`, two planet dots), `aria-hidden`, absolutely positioned right in `.hero`, `display:none` under 880px.

- [ ] **Step 1: Add the two SVGs and spread section accents** — hero orbit; starburst in brand; alternate section `.idx` numbers accent/accent-2; keep every class and word intact.
- [ ] **Step 2: Verify** — browser 1440px + 390px: orbit hidden on mobile, `body` computed width 375, console clean. Run check: `curl -s -o /dev/null -w '%{http_code}' http://localhost:8123/index.html` → 200.
- [ ] **Step 3: Commit** — `git commit -am "feat(googie): index hero motifs + section accents"`

### Task 4: publications.html + grips.html

**Files:**
- Modify: `publications.html`, `grips.html` (masthead starburst, page-specific controls restyled only via existing classes)

**Interfaces:**
- Consumes: Task 2 shapes; Task 3's SVG snippets copied verbatim.

- [ ] **Step 1: Add masthead starburst to both; verify publications filter controls and grips tabs inherit pill/dashed styling without markup changes beyond the SVG.**
- [ ] **Step 2: Verify** — browser both pages 1440px + 390px, console clean; publications JS-rendered list still populates.
- [ ] **Step 3: Commit** — `git commit -am "feat(googie): publications + grips chrome pass"`

### Task 5: casprt.html — chrome + Chart.js recolor

**Files:**
- Modify: `casprt.html` (masthead starburst, inline chart color configs in `createProfileChart`/`createDemographicChart`)

**Interfaces:**
- Consumes: Task 2 shapes, Task 3 SVG snippets.
- Produces: Chart.js colors — user bars `#E8541E`, population/comparison bars `#1C1A14`, gridlines `rgba(28,26,20,0.15)`, tick/label text `#1C1A14`, mono-consistent fonts left as Chart.js defaults.

- [ ] **Step 1: Masthead starburst + swap hardcoded chart colors to the values above (both chart functions).**
- [ ] **Step 2: Verify** — run the self-assessment in-browser at 1440px: charts render orange/ink; re-run `.openchamber/check-8.sh` (18/18 expected — structure unchanged). Mobile 390px spot-check.
- [ ] **Step 3: Commit** — `git commit -am "feat(googie): casprt chrome + assessment chart recolor"`

### Task 6: risk_meta — teal companion swap

**Files:**
- Modify: `risk_meta/assets/css/style.css` (`--accent: #461D7C` → `#17797F`; CTA band, tag-accent, bars, dots inherit)
- Modify: `risk_meta/index.html`, `risk_meta/resources.html` (masthead starburst only)

**Interfaces:**
- Consumes: Task 2 shapes (pages already use main.css + page css overlay).
- Produces: risk_meta accent = teal everywhere via the single `--accent` variable; PRISMA dots stay square; `.m-cta` band teal with paper-colored pill button.

- [ ] **Step 1: Swap the one `--accent` value; add starburst SVGs.** Confirm the JS alias block (`--border`/`--text-muted`/`--accent-cyan`) still resolves.
- [ ] **Step 2: Verify** — browser both pages 1440px + 390px: exercise all four findings tabs, subgroup dropdown, PRISMA dots, resources CSV table + LLM tool; console clean; bars filled (teal).
- [ ] **Step 3: Commit** — `git commit -am "feat(googie): risk_meta teal companion swap"`

### Task 7: Full verification sweep

**Files:** none (verification + fixes only; any fix lands in the owning file with a follow-up commit).

- [ ] **Step 1: Text-integrity diff** — word-multiset diff (strip tags, lowercase) of all six pages vs `HEAD~6` (pre-reskin commit). Expected: empty prose deltas; only known chrome labels if any. Command pattern exists in session history (`python3` HTMLParser + Counter block).
- [ ] **Step 2: Static sweep** — `grep -rn "gradient\|box-shadow\|text-shadow" css/ risk_meta/assets/css/ *.html` → no matches outside comments; `grep -rn -- "--gold\|tag-gold" . --include="*.css" --include="*.html" --include="*.js"` → no matches; `grep -rn "@import url('https" css/ risk_meta/assets/css/` → no new remote imports.
- [ ] **Step 3: Browser matrix** — all six pages × {1440px, 390px}: console clean, no horizontal scroll (`body` width 375 on mobile), masthead/starburst/orbit render, reduced-motion emulation leaves PRISMA static with working dots.
- [ ] **Step 4: Push** — `git push origin redesign-2026-swiss`.

## Execution notes

- Tasks 1→2 are strictly sequential (shared tokens/components). Tasks 3–6 are independent of each other once 2 lands (different write scopes; can run as parallel fixer lanes). Task 7 last.
- The Swiss state is preserved in git history on this branch; no archive work needed.
