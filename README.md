# RANDM Lab Website

This is the official website for the Risk and Decision Making Laboratory at Louisiana State University.

## Codebase Structure

```
📁 randmlab-website
├── 📄 index.html                   # Home page
├── 📄 team.html                    # Team members page
├── 📄 research.html                # Research overview and projects
├── 📄 news.html                    # News and updates
├── 📄 publications.html            # Published research
├── 📄 get-involved.html            # Participation information
├── 📄 [project pages].html         # Individual project pages
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
│   └── 📄 carousel.js              # Carousel functionality
└── 📁 assets
    ├── 📄 logo.svg                 # Lab logo
    └── 📄 [images]                 # Website images
```

## Features

### Optimized Components

- **Improved Performance**: Code has been optimized for better performance with reduced DOM manipulations and efficient event handlers.
- **Animation System**: A standardized animation system with CSS-based transitions and animations.
- **Responsive Design**: Fully responsive layout for all device sizes.
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support throughout.

### Animation System

The website uses a standardized animation system with multiple animation types:
- Fade animations
- Slide animations (up, down, left, right)
- Scale animations
- Staggered animations for lists
- Hardware-accelerated transitions

Add animation classes to elements:
```html
<div class="fade-up">Content with fade-up animation</div>
<div class="fade-left">Content with fade-left animation</div>
<div class="scale-up">Content with scale-up animation</div>
```

### Utilities

Key JavaScript utilities:
- `LabUtils.smoothScrollTo(element, offset)`: Smooth scroll to element
- `LabUtils.setupFadeAnimations(selector, threshold)`: Create fade-in animations
- `LabUtils.animateElement(element, className, delay)`: Animate a single element
- `LabUtils.animateSequential(elements, className, delay, staggerDelay)`: Animate a sequence of elements

### Carousel Component

Enhanced carousel with:
- Touch/swipe support
- Keyboard navigation
- Screen reader announcements
- Auto-play functionality (add `data-autoplay="5000"` to enable)

## Development

1. Clone the repository
2. Navigate to the project directory
3. Open HTML files in your browser to preview

For new components, follow the existing patterns and CSS variables for consistency.

## Style Guide

- Use CSS variables for colors, spacing, and typography
- Follow the BEM (Block, Element, Modifier) naming convention
- Maintain consistent spacing with the defined variables
- Keep accessibility in mind when developing new features 