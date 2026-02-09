/**
 * Scroll-triggered Animations
 * Uses Intersection Observer API for performance
 */

class ScrollAnimations {
  constructor(options = {}) {
    this.config = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -100px 0px',
      animationClass: options.animationClass || 'fade-in-up',
      staggerDelay: options.staggerDelay || 100
    };

    this.observer = null;
    this.init();
  }

  init() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      console.warn('Intersection Observer not supported');
      this.fallback();
      return;
    }

    this.setupObserver();
    this.observeElements();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay if element has data-stagger attribute
          const staggerIndex = entry.target.dataset.stagger || 0;
          const delay = staggerIndex * this.config.staggerDelay;

          setTimeout(() => {
            entry.target.classList.add('animated');
            // Optionally unobserve after animation
            if (!entry.target.dataset.repeat) {
              this.observer.unobserve(entry.target);
            }
          }, delay);
        } else {
          // Remove animation if repeat is enabled
          if (entry.target.dataset.repeat) {
            entry.target.classList.remove('animated');
          }
        }
      });
    }, {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin
    });
  }

  observeElements() {
    // Observe elements with animation classes
    const elements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .slide-up'
    );

    elements.forEach((element, index) => {
      // Add stagger index if not set
      if (!element.dataset.stagger && element.parentElement) {
        const siblings = Array.from(element.parentElement.children).filter(
          child => child.classList.contains(element.classList[0])
        );
        element.dataset.stagger = siblings.indexOf(element);
      }

      this.observer.observe(element);
    });
  }

  fallback() {
    // Fallback for browsers without Intersection Observer
    const elements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .slide-up'
    );
    elements.forEach(el => el.classList.add('animated'));
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    staggerDelay: 100
  });
});

// Expose globally for manual initialization
window.ScrollAnimations = ScrollAnimations;
