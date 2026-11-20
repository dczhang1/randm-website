# Swiss Brutalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the RANDM Lab main site (index, publications, GRiPS, CASPRT) in a Swiss Brutalist design system — bone paper, ink, LSU gold, stark grid, big type — deleting all 2023-SaaS styling and decorative JS.

**Architecture:** Static HTML/CSS/JS, no build step. A new token + grid + component CSS layer (`base.css` rewrite, `layout.css` rewrite, new `swiss.css`) replaces the old dark/bento styles; all four pages are rebuilt in place against one shared class vocabulary; publications and scale data move from JS arrays into static HTML.

**Tech Stack:** Plain HTML5/CSS3/vanilla JS. Self-hosted Archivo variable font. System mono stack. Remaining CDNs: Chart.js (CASPRT only, restyled).

**Spec:** `docs/superpowers/specs/2026-11-20-swiss-brutalist-redesign-design.md`

## Global Constraints

- Palette exactly: paper `#F4F3EF`, ink `#0E0E0C`, gold `#F0B323`, gray-2 `#6E6D66`, hairline `#D9D7CE`
- No gradients, no shadows, no border-radius > 2px, no dark backgrounds, no canvas animation
- Gold never used for body text on paper; hover/focus = inversion (ink bg, paper text); focus ring 3px ink offset 2px
- `css/main.css` stays the single CSS entry via `@import`; no per-page `<link>` stylesheets
- Anchors `#about #research #team #news #contact` must keep existing in `index.html`
- `data-page` attribute on `<body>` of every page (home / publications / detailed-content)
- `prefers-reduced-motion: reduce` gates any movement; movement ≤ 8px translate
- No new npm dependencies; `archive/` and `risk_meta/` untouched
- Commit after each task with the message given in the task

## Review Focus

1. **Dangling references after deletion** — every deleted JS/CSS file must have zero remaining `src`/`href` mentions. Test: grep each deleted filename across `*.html` after Task 6 deletions (and per-task for files that task removes).
2. **Deep links** — old anchor URLs (`/index.html#team` etc.) must land somewhere. Test: `grep -o 'id="[a-z-]*"' index.html` contains about/research/team/news/contact after rebuild.
3. **No-JS rendering** — publications and both scale pages must show full content with JS disabled. Test: entries present as HTML text (curl + grep for a known entry), not injected by JS.
4. **Gold contrast** — gold only as block/stamp background with ink text, or as selection color. Test: grep swiss.css — every `--gold`/`#F0B323` text-color use sits on an ink background.
5. **Mobile nav** — hamburger must still open the menu (existing `main.js` behavior) with restyled chrome. Test: manual check at 360px via browser; `.mobile-toggle` wired to `#mobile-menu`.

---

### Task 1: Design tokens, fonts, grid, and shared chrome

**Files:**
- Rewrite: `css/base.css`, `css/layout.css`
- Create: `css/swiss.css`, `fonts/archivo-variable.woff2`, `fonts/OFL.txt`
- Modify: `css/main.css` (new import list), `js/main.js` (prune decorative module inits only if referenced by index yet — full prune in Task 6)

**Interfaces (class vocabulary all later tasks consume):**
- Tokens (custom properties in `base.css`): `--paper --ink --gold --gray-2 --hairline --font-display --font-mono --rule: 3px solid var(--ink)`
- Layout: `.container` (max-width 1280px, 24px gutters, 16px ≤768px), `.grid-12`, `.cell` (1–2px ink border, no radius/shadow)
- Section chrome: `section.rule-section` = 3px top rule + `.idx` (mono `01 — RESEARCH` label) + `h2.section-title`
- Chrome: `.masthead` (bar between 3px rules: title left, meta right, sticky, paper bg), `.mobile-toggle`, `#mobile-menu` restyle, `.colophon` footer, `.tag-gold` (gold block, ink text, mono caps), `.stamp` (2px ink border), `.crumb` (mono breadcrumb), `.link-underline` (hover invert)
- `@font-face "Archivo"` variable 500–900, `font-display: swap`, fallback `Helvetica Neue, Arial, sans-serif`

- [ ] **Step 1: Fetch Archivo variable woff2 + OFL license into `fonts/`** (google-webfonts-helper or fonts.gstatic.com URL; verify file >30KB and serves `woff2`)
- [ ] **Step 2: Write `base.css`** — tokens above, reset, body paper/ink, type scale (hero `clamp(56px,12vw,140px)`, section title `clamp(32px,5vw,56px)`, body 16–18, mono 11–13), selection gold/ink, focus ring 3px ink offset 2px
- [ ] **Step 3: Write `layout.css`** — `.container`, `.grid-12` with gap, responsive collapse ≤768px
- [ ] **Step 4: Write `swiss.css`** — all chrome classes above, empty section-component stubs filled by later tasks
- [ ] **Step 5: Point `css/main.css` imports** at `base, layout, swiss, components/hamburger` only (others re-added per task; final list pruned in Task 6)
- [ ] **Step 6: Verify** — `python3 -m http.server 8123` then `curl -s localhost:8123/css/swiss.css | head` returns CSS; grep swiss.css+base.css for `gradient|box-shadow|border-radius: [2-9]` → no matches beyond the allowed 2px
- [ ] **Step 7: Commit** `git add -A && git commit -m "feat(design): swiss brutalist tokens, fonts, grid, shared chrome"`

### Task 2: Rebuild `index.html`

**Files:**
- Rewrite: `index.html`
- Modify: `css/swiss.css` (fill section components), `js/index.js` (only if it references removed DOM)

**Interfaces:**
- Consumes: everything from Task 1
- Produces: `.hero` (giant `RISK &` + `.hollow` `DECISION`, `.tag-gold` est-block, mission line, two links); `.program-cell` ×6 (mono 01–06, title, 2-line desc, tag); `.resource-entry` (big abbrev, name, line, arrow link); `.index-row` team rows (`.pi-row` variant, `.avatar` grayscale/initials); `.log-line` news (latest 5 + `<details>` rest); `.contact-grid`

- [ ] **Step 1: Rebuild head + masthead + hero + all six sections** with existing content (About/Research/Resources/Team/News/Contact), keeping ids `about research team news contact` and `data-page="home"`
- [ ] **Step 2: Fill section components in swiss.css** (cells, rows, entries, log lines, contact grid; hover = invert links only)
- [ ] **Step 3: Strip from index.html**: neural canvas markup, card-3d/card-hover wrappers, carousel markup, all CDN font/FA links
- [ ] **Step 4: Verify** — `grep -c 'id="about\|id="research\|id="team\|id="news\|id="contact"' index.html` = 5; `grep -i 'neural\|carousel\|card-3d\|card-hover' index.html` → 0 matches; browser check at 360/768/1280 (fonts load, hamburger works, anchors scroll)
- [ ] **Step 5: Commit** `git commit -am "feat(home): rebuild index in swiss system"`

### Task 3: Rebuild `publications.html` with baked-in data

**Files:**
- Rewrite: `publications.html` (bibliography from `js/publications.js` data, in a `<!-- ADD NEW PUBLICATIONS HERE -->` marked block per year)
- Rewrite: `js/publications.js` → tiny progressive-enhancement filter over `.pub-entry[data-type]` via `.filter-link[data-filter]`
- Modify: `css/swiss.css` (`.pub-year`, `.pub-entry`, hanging indent, filters)

**Interfaces:**
- Produces: `.pub-entry[data-type=article|chapter|other]`, `.filter-link[data-filter=all|article|chapter|other]`; counts strip uses `data-*` only

- [ ] **Step 1: Extract all entries** from `js/publications.js` into static HTML (year headers desc, lab-member names bolded, DOI links mono, `data-type` on each entry)
- [ ] **Step 2: Write filter JS** — click filter → show/hide entries; works with back/forward hash; no-JS = all visible
- [ ] **Step 3: Verify** — `curl -s localhost:8123/publications.html | grep -c 'pub-entry'` ≈ 33; `grep -i 'conference' publications.html` → 0; no-JS browser check shows full list; filter click hides non-matching
- [ ] **Step 4: Commit** `git commit -am "feat(pubs): static bibliography with progressive filter"`

### Task 4: Rebuild `grips.html` as one indexed page

**Files:**
- Rewrite: `grips.html` — 6 tabs → sections `01–06` with sticky `.side-index` nav; `Published Work` data from `js/grips-publications.js` baked to HTML
- Delete (end of task): `js/grips-publications.js`, `css/grips-publications.css`, `css/tabs.css` references
- Modify: `css/swiss.css` (`.side-index`, scale-page components)

**Interfaces:**
- Consumes: `.crumb`, `.stamp`, section chrome
- Produces: `.scale-section` pattern reused by Task 5

- [ ] **Step 1: Convert each tab panel to a `section.rule-section`** with mono index 01–06; sticky side index (hidden ≤900px) with anchor links
- [ ] **Step 2: Bake published-work dataset** into the final section; drop the JS file + its script tag
- [ ] **Step 3: Verify** — curl page contains known entry text from the dataset; `grep 'grips-publications' grips.html` → 0; browser: side index highlights/scrolls, all content visible no-JS
- [ ] **Step 4: Commit** `git commit -am "feat(grips): collapse tabs to indexed sections"`

### Task 5: Rebuild `casprt.html` — indexed page, kept assessment, restyled charts

**Files:**
- Rewrite: `casprt.html` — same section conversion as Task 4; keep self-assessment markup + its inline JS, restyled; Chart.js charts kept but themed ink/paper/gold; Mermaid diagrams → static inline SVG if Mermaid theming is poor
- Modify: `css/swiss.css` (`.assess-*` styles, `.figure-frame`)

**Interfaces:**
- Consumes: `.scale-section` from Task 4

- [ ] **Step 1: Convert tabs → indexed sections** with side index, as grips
- [ ] **Step 2: Restyle assessment** (radio rows as bordered rows, submit button invert, results block in `.tag-gold`/ink panels) — keep scoring JS logic untouched
- [ ] **Step 3: Theme charts** — Chart.js options: font family mono, ink ticks/gridlines `#D9D7CE`, series `#0E0E0C`/`#F0B323`; swap Mermaid for static SVG where it clashes
- [ ] **Step 4: Verify** — browser: assessment completes and scores; charts render legible on paper; `grep -i 'mermaid' casprt.html` → 0 (if swapped) ; no-JS shows all static content
- [ ] **Step 5: Commit** `git commit -am "feat(casprt): indexed page, restyled assessment and charts"`

### Task 6: Deletions, dead-reference sweep, QA

**Files:**
- Delete: `js/neural-canvas.js js/card-3d.js js/card-hover-effect.js js/carousel.js js/scroll-animations.js js/tabs.js js/news.js`(if unused) `zcurve.html` + dead CSS (`animations.css research.css team.css news.css components.css casprt.css detailed-content.css get-involved.css publications.css tabs.css grips-publications.css` — verify each unreferenced first)
- Modify: `js/main.js` (final prune), `css/main.css` (final import list), all pages (broken refs: `detailed-content.js`, privacy/terms footer links)

- [ ] **Step 1: Build the dead-file list** — for each candidate: `grep -r "filename" --include="*.html"` → delete only if 0 matches (after removing its tags)
- [ ] **Step 2: Delete + prune** `main.js` init calls and `main.css` imports to the final set
- [ ] **Step 3: Sweep** — `grep -rE "neural|card-3d|card-hover|carousel|scroll-animations|zcurve" index.html publications.html grips.html casprt.html css/ js/` → 0; all pages `data-page` present; anchors intact
- [ ] **Step 4: QA pass** — 360/768/1280 visual; keyboard-only nav + focus visibility; no-JS all four pages; reduced-motion (nothing moves); fonts self-hosted (no `fonts.googleapis`/`fontawesome` anywhere)
- [ ] **Step 5: Commit** `git commit -am "chore(cleanup): remove dead assets, final QA sweep"`
