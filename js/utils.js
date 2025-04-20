/**
 * utils.js - Common utility functions for the RANDM Lab website
 */

// Throttle function for performance optimization
function throttle(callback, delay = 100) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        const timeSinceLastExec = currentTime - lastExecTime;
        
        const execute = () => {
            lastExecTime = Date.now();
            callback.apply(this, args);
        };
        
        if (timeSinceLastExec > delay) {
            execute();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(execute, delay - timeSinceLastExec);
        }
    };
}

// Debounce function for performance optimization
function debounce(callback, delay = 100) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

// Smooth scroll to element
function smoothScrollTo(targetElement, offset = 100) {
    if (!targetElement) return;
    
    const offsetTop = targetElement.offsetTop - offset;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    // Update URL hash without jumping
    const targetId = targetElement.getAttribute('id');
    if (targetId) {
        history.pushState(null, null, `#${targetId}`);
    }
}

// Handle nav links and internal links
function setupSmoothScrolling(linkSelector, offset = 100) {
    const links = document.querySelectorAll(linkSelector);
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement, offset);
            }
        });
    });
}

// Create and set up IntersectionObserver for fade-in animations
function setupFadeAnimations(elementsSelector, threshold = 0.2, rootMargin = '0px') {
    const elements = document.querySelectorAll(elementsSelector);
    if (!elements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin,
        threshold
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        observer.observe(element);
    });
    
    return observer;
}

// Update active navigation based on scroll position
function setupScrollSpy(sectionSelector, navLinkSelector, offset = 150) {
    const sections = document.querySelectorAll(sectionSelector);
    const navLinks = document.querySelectorAll(navLinkSelector);
    
    if (!sections.length || !navLinks.length) return;
    
    const updateActiveNavItem = throttle(() => {
        // Get current scroll position with offset
        const scrollPosition = window.scrollY + offset;
        
        // Find the current section
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update active class on nav items
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, 100);
    
    // Initial update
    updateActiveNavItem();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Handle hash in URL on page load
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Wait for page to fully load
            setTimeout(() => {
                smoothScrollTo(targetSection, offset);
                
                // Update active nav item
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === window.location.hash) {
                        link.classList.add('active');
                    }
                });
            }, 300);
        }
    }
    
    return {
        update: updateActiveNavItem
    };
}

// Handle hover effects with JS (when CSS transitions aren't enough)
function setupHoverEffects(selector, enterStyles, leaveStyles) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            Object.entries(enterStyles).forEach(([property, value]) => {
                element.style[property] = value;
            });
        });
        
        element.addEventListener('mouseleave', () => {
            Object.entries(leaveStyles).forEach(([property, value]) => {
                element.style[property] = value;
            });
        });
    });
}

// Setup navbar transparent to beige transition
function setupNavbarScroll(threshold = 50) {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const handleScroll = throttle(() => {
        if (window.scrollY > threshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100);
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return {
        update: handleScroll
    };
}

// Lazy load images with IntersectionObserver
function setupLazyLoading(selector = 'img[data-src]', rootMargin = '200px') {
    const images = document.querySelectorAll(selector);
    if (!images.length) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Handle regular image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // Handle background images
                if (img.dataset.background) {
                    img.style.backgroundImage = `url('${img.dataset.background}')`;
                    img.removeAttribute('data-background');
                }
                
                // Handle srcset for responsive images
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                
                // Add loaded class for animations
                img.classList.add('loaded');
                
                // Stop observing once loaded
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin,
        threshold: 0.01
    });
    
    images.forEach(img => {
        // Add placeholder style
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        // Start observing
        imageObserver.observe(img);
    });
    
    // Add global CSS for loaded images
    const style = document.createElement('style');
    style.textContent = `
        img.loaded {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
    return imageObserver;
}

// Add this to auto-initialize in the LabUtils namespace
if (typeof window !== 'undefined') {
    window.LabUtils = window.LabUtils || {};
    
    // Add all utility functions to the namespace
    window.LabUtils.throttle = throttle;
    window.LabUtils.debounce = debounce;
    window.LabUtils.smoothScrollTo = smoothScrollTo;
    window.LabUtils.setupSmoothScrolling = setupSmoothScrolling;
    window.LabUtils.setupFadeAnimations = setupFadeAnimations;
    window.LabUtils.setupScrollSpy = setupScrollSpy;
    window.LabUtils.setupHoverEffects = setupHoverEffects;
    window.LabUtils.setupNavbarScroll = setupNavbarScroll;
    window.LabUtils.setupLazyLoading = setupLazyLoading;
    
    // Auto-run these on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
    });
}