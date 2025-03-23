/**
 * main.js - Core functionality for the RANDM Lab website
 * Handles common elements across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global variables
    const body = document.body;
    
    // ==============================
    // Hero Text Animation
    // ==============================
    const setupHeroAnimation = () => {
        const heroTitle = document.querySelector('.hero__title');
        const heroSubtitle = document.querySelector('.hero__subtitle');
        const heroButton = document.querySelector('.hero .btn');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.classList.add('animate-in');
            }, 300);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.classList.add('animate-in');
            }, 600);
        }
        
        if (heroButton) {
            setTimeout(() => {
                heroButton.classList.add('animate-in');
            }, 900);
        }
    };
    
    setupHeroAnimation();
    
    // ==============================
    // Navigation scroll effect - transparent to beige
    // ==============================
    const navbarScrollEffect = LabUtils.setupNavbarScroll(50);
    
    // ==============================
    // Mobile Navigation Menu
    // ==============================
    const setupMobileNav = () => {
        const hamburger = document.querySelector('.hamburger-icon, .hamburger');
        const navLinks = document.querySelector('.nav-links, .navbar__links');
        
        if (!hamburger || !navLinks) return;
        
        // Create overlay element if it doesn't exist
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            overlay.style.zIndex = '999';
            overlay.style.display = 'none';
            body.appendChild(overlay);
        }
        
        // Toggle menu function
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                overlay.style.display = 'block';
                body.style.overflow = 'hidden';
            } else {
                overlay.style.display = 'none';
                body.style.overflow = '';
            }
            
            // Handle hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (spans.length) {
                if (hamburger.classList.contains('active')) {
                    spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
                } else {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            }
        }
        
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
    };
    
    setupMobileNav();
    
    // ==============================
    // Global Fade-in Animations
    // ==============================
    const setupGlobalAnimations = () => {
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
            '.team-member'
        ];
        
        // Secondary elements that may already have fade-element class
        const secondaryElements = document.querySelectorAll('.fade-element');
        
        // Add fade-element class to primary elements if they don't have it
        primarySelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.classList.contains('fade-element')) {
                    element.classList.add('fade-element');
                }
            });
        });
        
        // Set up the observer for all fade elements
        LabUtils.setupFadeAnimations('.fade-element');
    };
    
    setupGlobalAnimations();
    
    // ==============================
    // Global Smooth Scrolling
    // ==============================
    LabUtils.setupSmoothScrolling('a[href^="#"]:not([href="#"])');
    
    // ==============================
    // Initialize page-specific functionality
    // ==============================
    const pageId = document.body.getAttribute('data-page');
    if (pageId && window.initPage && typeof window.initPage[pageId] === 'function') {
        window.initPage[pageId]();
    }
});