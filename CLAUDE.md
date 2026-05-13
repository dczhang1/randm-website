# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for the Risk and Decision Making Laboratory (RANDM Lab) at Louisiana State University. Pure HTML/CSS/JavaScript — no framework, no build step, no bundler.

## Development

No build process. Open `index.html` directly in a browser, or serve with any static file server. The only npm dependency is `@vercel/analytics`, deployed on Vercel.

## Architecture

**Single-page scrolling site** (`index.html`) with standalone pages for specialized content. Navigation uses anchor links (`#about`, `#research`, `#team`, `#news`, `#contact`) with smooth scrolling.

Each HTML page identifies itself via `data-page` on `<body>`:
- `data-page="home"` — index.html
- `data-page="publications"` — publications.html
- `data-page="detailed-content"` — casprt.html, grips.html

### JS Module Pattern

`js/main.js` is the core entry point, initializing all modules via an `App.init()` call on `DOMContentLoaded`. Utility functions live in `js/utils.js` under the `LabUtils` namespace. Other modules (carousel, scroll-animations, neural-canvas, card-3d, card-hover-effect) are loaded via `<script>` tags in each page as needed. `js/index.js` contains homepage-specific logic.

### CSS Architecture

`css/main.css` is the single entry point that `@import`s all other stylesheets in a specific order. Do not add `<link>` tags for individual CSS files — add new stylesheets to `css/main.css` imports instead. CSS variables for the dark-mode color palette are defined in `css/base.css`.

### Standalone Pages

- `publications.html` — Research publications
- `casprt.html` — CASPRT scale resource
- `grips.html` — GRiPS scale resource
- `risk_meta/` — Separate mini-site for the risk meta-analysis project with its own assets and styling
- `archive/` — Deprecated pages kept for reference only

### Key Interactive Components

- **Neural canvas** (`js/neural-canvas.js`): Hero section particle network animation
- **Carousel** (`js/carousel.js`): News section auto-play carousel with touch/swipe/keyboard support
- **3D cards** (`js/card-3d.js`): Research cards with perspective transforms
- **Card hover** (`js/card-hover-effect.js`): Team cards with Aceternity-style radial gradient effects
- **Scroll animations** (`js/scroll-animations.js`): Intersection Observer-based fade/scale animations

## Conventions

- BEM naming for CSS classes
- CSS variables for all colors, spacing, and typography (defined in `css/base.css`)
- Accessibility: ARIA attributes, keyboard navigation, skip-to-content link, screen reader support
- `data-stagger` attribute for staggered animation timing on lists
