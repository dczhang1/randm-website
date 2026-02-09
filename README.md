# RANDM Lab Website

This is the official website for the Risk and Decision Making Laboratory at Louisiana State University.

## Architecture

The website uses a **single-page scrolling architecture** with the main content organized into distinct sections on [`index.html`](index.html). Navigation links scroll to specific sections using anchor links. Additional standalone pages are provided for specialized content that requires dedicated layouts.

## Codebase Structure

```
📁 randmlab-website
├── 📄 index.html                   # Main single-page scrolling site
│   ├── Hero Section                # Animated neural canvas background
│   ├── About Section               # Lab overview and mission
│   ├── Research Section            # Bento grid of research programs
│   ├── Resources Section          # Links to research tools & scales
│   ├── Team Section               # Current lab members + alumni modal
│   ├── News Section               # Latest updates carousel
│   └── Contact Section             # Contact info + join lab opportunities
├── 📄 publications.html            # Publications page (standalone)
├── 📄 casprt.html                  # CASPRT scale resource page
├── 📄 grips.html                   # GRiPS scale resource page
├── 📄 psy7958_fs25.html            # Course page
├── 📁 archive/                     # Deprecated individual pages (kept for reference)
│   ├── 📄 README.md                # Archive documentation
│   ├── 📄 team.html                # Old team page
│   ├── 📄 research.html            # Old research page
│   ├── 📄 news.html                # Old news page
│   ├── 📄 contact.html             # Old contact page
│   ├── 📄 get-involved.html        # Old get involved page
│   └── 📄 add-news.html            # Old add news page
├── 📁 risk_meta/                   # Risk meta-analysis project
│   ├── 📄 index.html               # Project main page
│   ├── 📄 resources.html           # Project resources
│   └── 📁 assets/                  # Project-specific assets
├── 📁 css
│   ├── 📄 main.css                 # Main CSS entry point (imports all others)
│   ├── 📄 base.css                 # Base styles, variables, resets
│   ├── 📄 layout.css               # Layout/grid system
│   ├── 📄 animations.css           # Animation system
│   ├── 📄 components.css           # Primary component styles
│   ├── 📁 components               # Component-specific styles
│   │   └── 📄 hamburger.css        # Mobile navigation styles
│   ├── 📄 tabs.css                 # Tab component styles
│   └── 📄 [page-specific].css      # Page-specific styles
├── 📁 js
│   ├── 📄 utils.js                 # Utility functions
│   ├── 📄 main.js                  # Core functionality
│   ├── 📄 carousel.js              # Carousel functionality
│   ├── 📄 card-hover-effect.js     # Card hover effects
│   ├── 📄 card-3d.js               # 3D card transforms
│   ├── 📄 scroll-animations.js     # Scroll-triggered animations
│   ├── 📄 neural-canvas.js         # Neural network canvas animation
│   └── 📄 index.js                 # Homepage-specific scripts
└── 📁 assets
    ├── 📄 logo.svg                 # Lab logo
    ├── 📁 news/                    # News images
    ├── 📁 docs/                    # PDFs and documents
    ├── 📁 optimized/               # Optimized images
    ├── 📁 slideshow/               # Slideshow assets
    └── 📄 [images]                 # Website images
```

## Features

### Single-Page Architecture

- **Smooth Scrolling Navigation**: All main content sections are accessible via anchor links with smooth scroll behavior
- **Section-Based Organization**: Content is organized into logical sections (About, Research, Resources, Team, News, Contact)
- **Standalone Pages**: Specialized content (Publications, GRiPS, CASPRT, Course pages) are provided as separate pages
- **Archive**: Deprecated individual pages are preserved in the [`archive/`](archive/) folder for reference

### Optimized Components

- **Improved Performance**: Code has been optimized for better performance with reduced DOM manipulations and efficient event handlers.
- **Animation System**: A standardized animation system with CSS-based transitions and animations.
- **Responsive Design**: Fully responsive layout for all device sizes.
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support throughout.

### Homepage Components

- **Hero Section**: Animated neural network canvas background with grain overlay effect
- **Bento Grid**: Modern grid layout for research programs with color-coded categories
- **Card Hover Effects**: Aceternity-style radial gradient hover effects on team cards
- **3D Card Transforms**: Interactive 3D perspective effects on research cards
- **News Carousel**: Auto-playing carousel with touch/swipe support and keyboard navigation
- **Alumni Modal**: Pop-up modal for displaying lab alumni information
- **Scroll Animations**: Fade-in and scale animations triggered on scroll

### Animation System

The website uses a standardized animation system with multiple animation types:
- Fade animations (fade-in-up, fade-in-left, fade-in-right)
- Scale animations (scale-in)
- Staggered animations for lists (using `data-stagger` attribute)
- Hardware-accelerated transitions
- Scroll-triggered animations via [`scroll-animations.js`](js/scroll-animations.js)

Add animation classes to elements:
```html
<div class="fade-in-up">Content with fade-up animation</div>
<div class="scale-in" data-stagger="0">Content with scale animation</div>
<div class="card">Card with 3D hover effect</div>
```

### Utilities

Key JavaScript utilities in [`utils.js`](js/utils.js):
- `LabUtils.smoothScrollTo(element, offset)`: Smooth scroll to element
- `LabUtils.setupFadeAnimations(selector, threshold)`: Create fade-in animations
- `LabUtils.animateElement(element, className, delay)`: Animate a single element
- `LabUtils.animateSequential(elements, className, delay, staggerDelay)`: Animate a sequence of elements

### Carousel Component

Enhanced carousel in [`carousel.js`](js/carousel.js) with:
- Touch/swipe support
- Keyboard navigation
- Screen reader announcements
- Auto-play functionality (add `data-autoplay="5000"` to enable)
- Used in the News section for displaying latest updates

### Neural Canvas Animation

The hero section features an interactive neural network visualization ([`neural-canvas.js`](js/neural-canvas.js)):
- Animated particle network connecting nodes
- Mouse interaction effects
- Subtle opacity for background effect
- Grain overlay for texture

## Development

1. Clone the repository
2. Navigate to the project directory
3. Open [`index.html`](index.html) in your browser to preview the main site
4. Standalone pages can be accessed directly (e.g., [`publications.html`](publications.html), [`grips.html`](grips.html))

### Navigation Structure

The main navigation links to the following sections on [`index.html`](index.html):
- `#about` - About the lab
- `#research` - Research programs (bento grid)
- `#team` - Team members (with alumni modal)
- `#news` - Latest news carousel
- `#contact` - Contact information and join lab opportunities

### External Links

- **GRiPS Scale**: [`grips.html`](grips.html) - General Risk Propensity Scale resource
- **CASPRT Scale**: [`casprt.html`](casprt.html) - Composite Anticipated and Subjective Probability of Risk Taking resource
- **Publications**: [`publications.html`](publications.html) - Published research
- **Risk Meta-Analysis**: [`risk_meta/index.html`](risk_meta/index.html) - Interactive meta-analysis project

For new components, follow the existing patterns and CSS variables for consistency.

## Style Guide

- Use CSS variables for colors, spacing, and typography
- Follow the BEM (Block, Element, Modifier) naming convention
- Maintain consistent spacing with the defined variables
- Keep accessibility in mind when developing new features

## Color Palette

The website uses a dark mode color palette inspired by the "Bert" design:

| Color | Hex | Usage |
|-------|-----|-------|
| Near Black | `#0B0C10` | Primary background |
| Dark Blue-Gray | `#1F2833` | Secondary backgrounds, cards |
| Gray | `#C5C6C7` | Body text |
| Cyan | `#66FCF1` | Primary accent, links, highlights |
| Teal | `#45A29E` | Secondary accent |

All colors are defined as CSS variables in `css/base.css` for easy customization.