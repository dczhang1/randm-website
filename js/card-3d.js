/**
 * card-3d.js - 3D Card Tilt Effect with Mouse Tracking
 * Creates perspective-based cards that respond to mouse movement
 */

class Card3D {
    constructor(card) {
        this.card = card;
        this.cardRect = null;
        this.isHovering = false;

        // Configuration
        this.config = {
            maxRotate: 15, // Maximum rotation in degrees
            perspective: 1000, // Perspective value in pixels
            scale: 1.02, // Scale on hover
            transition: 'all 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
            transitionReset: 'all 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)'
        };

        this.init();
    }

    init() {
        // Set initial transform style
        this.card.style.transformStyle = 'preserve-3d';
        this.card.style.transition = this.config.transitionReset;

        // Bind events
        this.card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleMouseEnter(e) {
        this.isHovering = true;
        this.cardRect = this.card.getBoundingClientRect();
        this.card.style.transition = this.config.transition;
    }

    handleMouseMove(e) {
        if (!this.isHovering || !this.cardRect) return;

        // Calculate mouse position relative to card center
        const centerX = this.cardRect.left + this.cardRect.width / 2;
        const centerY = this.cardRect.top + this.cardRect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation angles (inverse for natural feeling)
        const rotateX = -(mouseY / (this.cardRect.height / 2)) * this.config.maxRotate;
        const rotateY = (mouseX / (this.cardRect.width / 2)) * this.config.maxRotate;

        // Apply transform
        this.card.style.transform = `
            perspective(${this.config.perspective}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(${this.config.scale}, ${this.config.scale}, ${this.config.scale})
        `;
    }

    handleMouseLeave(e) {
        this.isHovering = false;
        this.card.style.transition = this.config.transitionReset;
        this.card.style.transform = `
            perspective(${this.config.perspective}px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
    }
}

// Initialize all 3D cards on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('3D card effects disabled due to reduced motion preference');
        return;
    }

    // Initialize all bento cards with 3D effect
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        new Card3D(card);
    });
});
