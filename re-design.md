# RANDM Lab Website Redesign Plan

## Executive Summary

This document outlines a comprehensive redesign strategy to modernize the Risk and Decision Making Lab website by adopting design principles from the reference example (kimi_web3.html) while preserving essential content and academic integrity.

---

## Part 1: Design Analysis

### A. Example Design (kimi_web3.html) - Key Elements

#### **Visual Identity**

- **Color Palette:**

  - Primary Dark: `#050507` (near-black)
  - Elevated Surface: `#0f111a` (slate)
  - Accent Cyan: `#00f0ff` (vibrant tech cyan)
  - Accent Purple: `#7c3aed` (purple highlights)
  - Gray Text: `#8a8f98` (muted body text)
- **Typography:**

  - Display Font: Space Grotesk (headings, large text)
  - Body Font: Inter (paragraphs, UI)
  - Ultra-large hero typography (6xl-9xl)
  - Tight letter-spacing (-0.02em)
  - Wide tracking on labels (widest)

#### **Design Patterns**

1. **Tailwind CSS Framework:** Utility-first CSS approach
2. **Animated Canvas Background:** Neural network particle system
3. **Grain/Noise Overlay:** Filmic texture (3% opacity SVG filter)
4. **Scroll-Triggered Animations:** Intersection Observer for fade-ins
5. **3D Card Tilting:** Mouse-based perspective transforms
6. **Bento Grid Layout:** Asymmetric card arrangements
7. **Minimal Navigation:** Sticky, backdrop-blurred nav bar
8. **Generous White Space:** 8rem section padding, spacious layouts

#### **Interaction Design**

- Smooth scroll behavior
- Hover effects with color transitions
- Magnetic button interactions
- Glitch text effects on hover
- Live data visualizations (animated bar charts)
- Custom scrollbar styling

#### **Content Structure (Example Site)**

```
├── Hero (Full-screen, animated title)
├── Mission/Philosophy Section (Two-column layout)
├── Research Bento Grid (Asymmetric cards)
├── Quote/Testimonial Section (Full-width)
├── Publications + Live Stats (Two-column)
└── CTA/Contact Form
```

---

### B. Current Website - Inventory

#### **Existing Structure**

```
Current Pages:
├── index.html (Home)
├── team.html
├── research.html
├── news.html
├── publications.html
├── get-involved.html
├── grips.html (Scale details)
├── casprt.html (Scale details)
└── psy7958_fs25.html (Course page)
```

#### **Content Sections**

1. **Home:**

   - Hero with background image
   - About the lab (mission statement)
   - News carousel (4 items)
2. **Team:**

   - PI banner (Dr. Don Zhang with CV, bio)
   - Graduate students (3 members)
   - Undergraduate RAs (3 members)
   - Lab mascot (Agnes)
   - Alumni section (extensive list)
3. **Research:**

   - Research programs (Risk Taking, Employee Selection)
   - Resources (GRiPS, CASPRT scales)
   - Selected publications
4. **Publications:**

   - Research statistics (26 articles, 924 citations)
   - Search/filter functionality
   - Categorized by type (Articles, Chapters, Other)
5. **News:**

   - News grid with filters
   - Modal for expanded content
   - Pagination
   - Multiple categories (News, Publications, Media, Conferences, Fun)
6. **Get Involved:**

   - Research Assistant positions
   - Graduate student applications
   - Participant recruitment
   - Industry partnerships

#### **Current Design System**

- **Colors:** Dark theme (#0B0C10 background, #66FCF1 cyan accent)
- **Fonts:** Inter throughout
- **Components:** Cards with top borders, hero sections, modals, carousels
- **Layout:** Container-based with max-width constraints
- **Navigation:** Sticky navbar with hamburger menu

---

## Part 2: Redesign Strategy

### Phase 1: Foundation & Infrastructure

#### **1.1 Technology Stack Decision**

- **Option A:** Adopt Tailwind CSS (like example)

  - Pros: Modern, utility-first, matches example design
  - Cons: Complete rewrite, larger initial file size
- **Option B:** Enhance current CSS architecture

  - Pros: Preserves existing work, incremental updates
  - Cons: Harder to achieve example's aesthetic

**Recommendation:** Adopt Tailwind CSS for consistency with modern design patterns

#### **1.2 Color System Update**

```css
/* Proposed New Palette */
--lab-dark: #050507 (base background)
--lab-slate: #0f111a (elevated surfaces)
--lab-accent-cyan: #00f0ff (primary accent)
--lab-accent-purple: #7c3aed (secondary accent)
--lab-gray: #8a8f98 (body text)
--lab-text-primary: #f8fafc (headings)
```

#### **1.3 Typography System**

- Add Space Grotesk for display/headings
- Keep Inter for body text
- Implement large-scale type hierarchy (9xl for hero)

---

### Phase 2: Page-by-Page Redesign

#### **2.1 Homepage (index.html)**

**New Structure:**

```
├── Hero Section (Full-height)
│   ├── Animated neural network canvas background
│   ├── Large typography: "RISK & DECISION MAKING LAB"
│   ├── Tagline (replace current subtitle)
│   └── Scroll indicator
│
├── About/Mission Section
│   ├── Two-column: label + content
│   ├── Large quote-style text
│   └── Scroll-triggered animations
│
├── Research Highlights (Bento Grid)
│   ├── Featured research in asymmetric cards
│   ├── Replace news carousel with static highlights
│   └── 3D tilt effects on hover
│
├── Latest News/Updates (Compact)
│   ├── 3 most recent news items
│   └── "View All News" link
│
└── CTA Section
    ├── Get involved / Join study
    └── Contact form or link
```

**Key Changes:**

- Remove news carousel → Integrate into bento grid or compact section
- Add animated background canvas
- Implement large-scale hero typography
- Add grain overlay texture

---

#### **2.2 Research Page**

**New Structure:**

```
├── Hero (Smaller, consistent)
├── Research Philosophy (Large text block)
├── Research Programs (Bento Grid)
│   ├── Risk Taking Research (Large card)
│   ├── Employee Selection (Medium card)
│   ├── Live stats/visualization (Medium card)
│   └── Future directions (Small card)
│
├── Resources Section (Horizontal cards)
│   ├── GRiPS Scale
│   └── CASPRT Scale
│
└── Publications Preview (Link to full page)
```

**Key Changes:**

- Convert research programs to bento grid layout
- Add data visualization element
- Consolidate sidebar navigation into scrollspy or remove
- Merge publications into separate dedicated page (already exists)

---

#### **2.3 Team Page**

**New Structure:**

```
├── Hero
├── Principal Investigator (Full-width banner)
│   ├── Large photo + bio
│   └── Quick stats (Years, Publications, Awards)
│
├── Team Members Grid
│   ├── Graduate Students (3-column grid)
│   ├── Undergraduate RAs (4-column grid)
│   └── Hover effects reveal more info
│
├── Lab Culture Section (Optional)
│   ├── Lab mascot (Agnes)
│   └── Photo gallery
│
└── Alumni (Collapsible section)
```

**Key Changes:**

- Simplify PI section (keep modal for detailed CV)
- Implement hover-based info reveal instead of static cards
- Consider condensing alumni section
- Add visual interest with gradient backgrounds

---

#### **2.4 Publications Page**

**New Structure:**

```
├── Hero
├── Research Metrics Dashboard
│   ├── 4-stat grid (like example's "Real-time Simulation")
│   └── Animated counters
│
├── Search & Filters (Compact)
└── Publications List
    ├── Minimal, scannable format
    ├── Year-based grouping
    └── Hover reveals abstract/details
```

**Key Changes:**

- Enhance statistics visualization
- Streamline filter UI
- Implement better visual hierarchy
- Add animated elements to metrics

---

#### **2.5 News Page**

**New Structure:**

```
├── Hero
├── Featured News (Large card)
├── News Grid (Masonry or standard)
│   └── Cards with hover effects
├── Filters (Top bar, minimal)
└── Load more / Pagination
```

**Key Changes:**

- Feature one major news item prominently
- Improve card visual design
- Simplify filter UI
- Better integration with modal

---

#### **2.6 Get Involved Page**

**New Structure:**

```
├── Hero
├── Opportunities Bento Grid
│   ├── Research Assistants (Large)
│   ├── Graduate Students (Large)
│   ├── Participants (Medium)
│   └── Industry Partners (Medium)
│
└── Contact Form (Integrated)
```

**Key Changes:**

- Remove sidebar navigation
- Use visual cards instead of text-heavy sections
- Integrate CTA buttons prominently
- Add visual icons or illustrations

---

### Phase 3: Interactive Elements

#### **3.1 Animations to Implement**

1. **Neural Network Canvas Background**

   - Particle system with connections
   - Subtle movement
   - Opacity: 30%
2. **Scroll-Triggered Reveals**

   - Fade-in on scroll
   - Slide-up animations
   - Staggered delays
3. **Card Interactions**

   - 3D tilt on mouse move
   - Glow effects on hover
   - Smooth color transitions
4. **Data Visualizations**

   - Animated bar charts
   - Counter animations
   - Real-time style updates

#### **3.2 Micro-Interactions**

- Custom scrollbar with accent color
- Magnetic button effects
- Glitch text on nav hover
- Loading states

---

### Phase 4: Technical Implementation

#### **4.1 File Structure**

```
New Structure:
├── index.html (Redesigned)
├── team.html (Redesigned)
├── research.html (Redesigned)
├── publications.html (Redesigned)
├── news.html (Redesigned)
├── get-involved.html (Redesigned)
├── grips.html (Keep/Update styling)
├── casprt.html (Keep/Update styling)
├── psy7958_fs25.html (Keep/Update styling)
│
├── css/
│   ├── tailwind.config.js (New)
│   └── custom.css (Overrides)
│
├── js/
│   ├── neural-canvas.js (New)
│   ├── scroll-animations.js (New)
│   ├── card-tilt.js (New)
│   └── main.js (Updated)
│
└── assets/ (Existing, no change)
```

#### **4.2 Responsive Design**

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Simplified layouts for mobile
- Touch-friendly interactions

#### **4.3 Performance Considerations**

- Lazy load images
- Defer non-critical JS
- Optimize canvas animations
- Minimize paint/reflow operations

---

## Part 3: Content & Design Questions

### **Critical Decision Points**

#### **Q1: Content Density vs. Visual Minimalism**

The example site is highly minimal with limited content per section, while the current site is content-rich (extensive publications, news archives, detailed bios).

**Options:**

- **C:** Hybrid approach: Key info prominent, details in expandable/linked sections.
  - Most of the rich content are related to specific project (e.g., grips, casprt) or data base (e.g., list of publications). These should live on its separate page or expandable content on the main page, based on the

---

#### **Q2: Navigation Structure**

Current: 5 main pages (Home, Team, Research, News, Get Involved) + subpages (GRiPS, CASPRT, Course)
Example: Simpler single-page structure with anchor links

**Question for User:** Do you prefer the current multi-page structure, or would you like to explore consolidating pages?

Reduce to fewer pages in the menu bar (team, research, contact (from get involved), news). Then sub pages, depending on the size, should live on its own page with breadhcrumb links back. Overall should be a single scrolling page like the example, and links to full pages with more rich content. 

---

#### **Q3: News/Updates Presentation**

Current: Dedicated news page with extensive archive, carousel on homepage
Example: Minimal recent items only

**Question for User:** How important is the news archive? Should all historical news remain accessible?

Front page should have a carousel with 4-6 most recent items. archived news can live on a separate page. 

---

#### **Q4: Research Program Detail Level**

Current: Two detailed programs (Risk Taking, Employee Selection) with extensive descriptions
Example: Multiple research cards with brief descriptions

**Question for User:** Should we showcase more research areas even if descriptions are shorter, or maintain deep focus on two programs?

Lets try going with 4-5 research projects. I like the asymetric card layout of the new design, lets try to use it.

---

#### **Q5: Team Member Presentations**

Current: Detailed cards with photos, bios for each member
Example: Minimal visual presentation

**Options:**

- **B:** Show photos only, reveal details on hover/click
- 
- **Question for User:** How much visibility should each team member have? Is individual bio text critical?
- Answer: photo and name in cards, click to flip or expand to include bio/details.


---

#### **Q6: Publications Filtering**

Current: Extensive filters (type, year, search) with all publications visible
Example: Simple, visual presentation

**Question for User:** Should every publication remain on the website, or is linking to Google Scholar acceptable?

Lets keep the database but just make it a separate page altogether. Update visual design to match.

---

#### **Q7: Homepage Hero Message**

Current: "Risk and Decision Making Laboratory - The science of how people make decisions at work"
Example: "RISK & DECISION MAKING LAB - We decode the cognitive architecture of uncertainty"

**Options:**

- **A:** Keep current, straightforward academic phrasing


#### **Q8: Background Animations**

The example uses animated neural network canvas, which is visually striking but potentially distracting.

**Options:**

- **A:** Implement neural network animation (high visual impact)


---

#### **Q9: Resource Pages (GRiPS, CASPRT)**

Current: Dedicated pages with detailed scale information
Example design doesn't have equivalent


**Question for User:** Should scale details remain as full pages, or can they be consolidated?

Answer: Add a resources section on the main page, and clickable link or cards that them to the full separate pages, which are re-designed.

---

#### **Q10: Mobile Experience Priority**

Example: Desktop-first design with complex animations
Current: Responsive but simpler

**Options:**

- **A:** Prioritize desktop experience, simplify for mobile

---

## Part 4: Implementation Roadmap

### **Timeline Estimate**

#### **Phase 1: Foundation (Week 1-2)**

- [ ] Set up Tailwind CSS
- [ ] Define new color system and typography
- [ ] Create base component library
- [ ] Implement neural canvas background
- [ ] Set up animation framework

#### **Phase 2: Core Pages (Week 3-5)**

- [ ] Redesign homepage
- [ ] Redesign research page
- [ ] Redesign team page
- [ ] Implement scroll animations
- [ ] Test responsive layouts

#### **Phase 3: Content Pages (Week 6-7)**

- [ ] Redesign publications page
- [ ] Redesign news page
- [ ] Redesign get-involved page
- [ ] Update GRiPS and CASPRT pages
- [ ] Implement data visualizations

#### **Phase 4: Polish & Testing (Week 8)**

- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Content migration and cleanup
- [ ] Final QA and deployment

---

## Part 5: Risk Assessment

### **Potential Challenges**

1. **Content Preservation:** Risk of losing important information during redesign

   - Mitigation: Content audit before starting
2. **SEO Impact:** URL structure changes could affect search rankings

   - Mitigation: Maintain URLs, implement redirects if needed
3. **Accessibility:** Complex animations may hinder accessibility

   - Mitigation: Provide reduced-motion alternatives, maintain keyboard navigation
4. **Browser Compatibility:** Modern CSS/JS may not work in older browsers

   - Mitigation: Define supported browser list, provide fallbacks
5. **Performance:** Heavy animations could slow page load

   - Mitigation: Lazy loading, conditional loading, optimization

---

## Part 6: Success Metrics

### **How to Measure Success**

1. **User Engagement:**

   - Time on site
   - Pages per session
   - Bounce rate reduction
2. **Conversion Metrics:**

   - Research assistant applications
   - Participant sign-ups
   - Contact form submissions
3. **Technical Metrics:**

   - Page load time < 3s
   - Lighthouse score > 90
   - Mobile usability score
4. **Aesthetic Goals:**

   - Modern, professional appearance
   - Consistent brand identity
   - Improved visual hierarchy

---

## Part 7: Next Steps

### **Before Starting Implementation**

1. **User Decision Session:** Review and answer all questions in Part 3
2. **Content Audit:** Identify must-keep vs. can-condense content
3. **Stakeholder Review:** Get buy-in from lab members
4. **Asset Preparation:** Gather/optimize images, create new graphics if needed
5. **Development Environment:** Set up staging site for preview

### **Approval Checklist**

- [ ] Design direction approved
- [ ] Content strategy confirmed
- [ ] All questions in Part 3 answered
- [ ] Timeline and scope agreed upon
- [ ] Technical approach validated

---

## Appendix A: Design Comparison

### **Visual Comparison Matrix**

| Element                   | Current Design  | Example Design                 | Proposed Design                |
| ------------------------- | --------------- | ------------------------------ | ------------------------------ |
| **Hero Typography** | 3.5rem (56px)   | 9rem (144px)                   | 6-8rem (96-128px)              |
| **Color Palette**   | Cyan/Dark Gray  | Cyan/Purple/Black              | Blend of both                  |
| **Layout System**   | Container-based | Bento grid                     | Hybrid: Grid + Container       |
| **Animations**      | Fade-in only    | Neural canvas, 3D tilt, scroll | Selective implementation       |
| **Navigation**      | Multi-page      | Single-page anchors            | Multi-page with simplified nav |
| **Content Density** | High (academic) | Low (minimal)                  | Medium (strategic)             |

---

## Appendix B: Technical Dependencies

### **Required Libraries/Frameworks**

- Tailwind CSS v3.x
- Intersection Observer API
- Canvas API for animations
- Font Awesome (existing)
- Google Fonts: Space Grotesk, Inter

### **Browser Support Target**

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari/Chrome (iOS 14+, Android 10+)

---

## Document Version

- **Version:** 1.0
- **Date:** January 28, 2026
- **Author:** Claude (AI Assistant)
- **Status:** Awaiting User Review & Decision

---

## Contact for Questions

For any questions or clarifications about this redesign plan, please discuss with Don Zhang or the lab team before proceeding with implementation.
