/**
 * main.js - Core functionality for the RANDM Lab website
 * Handles common elements across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Cache common DOM elements
    const body = document.body;
    const pageId = body.getAttribute('data-page');
    
    // Initialize module-based structure with page-specific initializations
    const App = {
        // Core initialization
        init() {
            this.setupHeroAnimation();
            this.setupHeroParallax();
            this.setupNavbarScroll();
            this.setupMobileNav();
            this.setupGlobalAnimations();
            this.setupSmoothScrolling();
            this.setupPageTransitions();
            this.initPageSpecific();
        },
        
        // Hero Animation - staggered entrance
        setupHeroAnimation() {
            const heroElements = {
                title: document.querySelector('.hero__title'),
                subtitle: document.querySelector('.hero__subtitle'),
                button: document.querySelector('.hero .btn')
            };
            
            // If no hero elements found, exit early
            if (!heroElements.title && !heroElements.subtitle && !heroElements.button) return;
            
            // Using animateSequential from utils.js for staggered animation
            const elements = [
                heroElements.title,
                heroElements.subtitle, 
                heroElements.button
            ].filter(el => el); // Filter out null elements
            
            LabUtils.animateSequential(elements, 'animate-in', 300, 300);
        },

        // Optional subtle parallax for hero background
        setupHeroParallax() {
            const heroBg = document.querySelector('.hero__bg');
            if (!heroBg) return;

            // Respect reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            const onScroll = LabUtils.throttle(() => {
                const scrollY = window.scrollY || 0;
                const translate = Math.min(scrollY * 0.1, 20); // cap at 20px
                heroBg.style.transform = `translateY(${translate}px)`;
            }, 16);

            window.addEventListener('scroll', onScroll);
        },
        
        // Navigation scroll effect - transparent to beige
        setupNavbarScroll() {
            LabUtils.setupNavbarScroll(50);
        },
        
        // Mobile Navigation Menu with improved accessibility
        setupMobileNav() {
            const hamburger = document.querySelector('.hamburger-icon, .hamburger');
            const navLinks = document.querySelector('.nav-links, .navbar__links');
            
            if (!hamburger || !navLinks) return;
            
            // Create overlay element if it doesn't exist
            let overlay = document.querySelector('.menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.classList.add('menu-overlay');
                
                // Use CSS classes instead of inline styles
                overlay.classList.add('fixed', 'inset-0', 'z-50', 'bg-black', 'bg-opacity-50', 'hidden');
                body.appendChild(overlay);
            }
            
            // Toggle menu function with a11y support
            function toggleMenu() {
                const isActive = hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                overlay.classList.toggle('hidden', !isActive);
                
                // Manage body scroll
                body.classList.toggle('overflow-hidden', isActive);
                
                // Set ARIA attributes for accessibility
                hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                navLinks.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                
                // Handle hamburger animation using CSS classes
                if (isActive) {
                    hamburger.classList.add('is-active');
                } else {
                    hamburger.classList.remove('is-active');
                }
            }
            
            // Set initial ARIA states
            hamburger.setAttribute('aria-controls', 'mobile-menu');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Toggle menu');
            navLinks.id = 'mobile-menu';
            navLinks.setAttribute('aria-hidden', 'true');
            
            // Event listeners
            hamburger.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);
            
            // Close menu when clicking on links
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });
            
            // Add keyboard support for accessibility
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu();
                }
            });
        },
        
        // Global Fade-in Animations with improved thresholds
        setupGlobalAnimations() {
            // Primary elements that should fade in
            const primarySelectors = [
                '.hero__content', 
                '.section-title',
                '.about p', 
                '.research-highlights h2',
                '.focus-area',
                '.team-section',
                '.pi-banner',
                '.mascot-section',
                '.alumni-section',
                '.team-member',
                '.card',
                '.research-item',
                '.news-item'
            ];
            
            // Apply different animation classes based on element type
            this.setupAnimationsByType();
            
            // Add fade-element class to primary elements if they don't have it
            primarySelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (!element.classList.contains('fade-element') && 
                        !element.classList.contains('fade-up') && 
                        !element.classList.contains('fade-left') && 
                        !element.classList.contains('fade-right')) {
                        element.classList.add('fade-element');
                    }
                });
            });
            
            // Set up the observer for all animation types with different thresholds
            LabUtils.setupFadeAnimations('.fade-element', 0.2);
            LabUtils.setupFadeAnimations('.fade-up, .fade-down', 0.1);
            LabUtils.setupFadeAnimations('.fade-left, .fade-right', 0.15);
            LabUtils.setupFadeAnimations('.scale-up, .scale-down', 0.1);
        },
        
        // Apply specialized animations to different element types
        setupAnimationsByType() {
            // Apply different animation types to specific elements
            const animationMappings = [
                { selector: '.card', animation: 'fade-up' },
                { selector: '.research-item', animation: 'fade-up' },
                { selector: '.news-item', animation: 'fade-up' },
                { selector: '.team-member', animation: 'scale-up' },
                { selector: '.section-title', animation: 'fade-up' },
                { selector: '.hero__content', animation: 'fade-up' }
            ];
            
            animationMappings.forEach(mapping => {
                const elements = document.querySelectorAll(mapping.selector);
                elements.forEach(element => {
                    // Only add if it doesn't already have an animation class
                    if (!element.classList.contains('fade-element') && 
                        !element.classList.contains('fade-up') && 
                        !element.classList.contains('fade-left') && 
                        !element.classList.contains('fade-right') &&
                        !element.classList.contains('scale-up')) {
                        element.classList.add(mapping.animation);
                    }
                });
            });
        },
        
        // Global Smooth Scrolling
        setupSmoothScrolling() {
            LabUtils.setupSmoothScrolling('a[href^="#"]:not([href="#"])');
        },
        
        // Page transition effects
        setupPageTransitions() {
            // Apply transition classes for smooth page transitions
            document.body.classList.add('transition-opacity', 'duration-slow', 'ease-in-out');
            
            // Fade in on initial load
            document.body.style.opacity = '0';
            requestAnimationFrame(() => {
                document.body.style.opacity = '1';
            });
            
            // Setup smooth transitions for internal link navigation
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    if (targetId && targetId !== '#') {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            // Subtle fade transition
                            document.body.style.opacity = '0.8';
                            
                            setTimeout(() => {
                                LabUtils.smoothScrollTo(targetElement, 100);
                                requestAnimationFrame(() => {
                                    document.body.style.opacity = '1';
                                });
                            }, 200);
                        }
                    }
                });
            });
        },
        
        // Initialize page-specific functionality
        initPageSpecific() {
            if (pageId && window.initPage && typeof window.initPage[pageId] === 'function') {
                window.initPage[pageId]();
            }
        }
    };
    
    // Initialize application
    App.init();
});