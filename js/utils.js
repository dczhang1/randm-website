/**
 * utils.js - Common utility functions for the RANDM Lab website
 */

// Throttle function for performance optimization
function throttle(callback, delay = 100) {
    // Early return if no callback provided
    if (typeof callback !== 'function') return () => {};
    
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
    // Early return if no callback provided
    if (typeof callback !== 'function') return () => {};
    
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

// Smooth scroll to element with improved performance
function smoothScrollTo(targetElement, offset = 100) {
    if (!targetElement) return;
    
    const offsetTop = targetElement.offsetTop - offset;
    
    // Use requestAnimationFrame for smoother scrolling
    const scrollToTarget = () => {
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        const targetId = targetElement.getAttribute('id');
        if (targetId) {
            history.pushState(null, null, `#${targetId}`);
        }
    };
    
    requestAnimationFrame(scrollToTarget);
}

// Handle nav links and internal links
function setupSmoothScrolling(linkSelector, offset = 100) {
    const links = document.querySelectorAll(linkSelector);
    
    if (!links.length) return;
    
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
                // Add subtle transition delay based on index for staggered effect
                const transitionDelay = Array.from(elements).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${transitionDelay}ms`;
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
    
    // Cache the section positions to avoid layout calculations during scroll
    let sectionPositions = [];
    
    // Function to update section positions (called on page load and resize)
    const updateSectionPositions = () => {
        sectionPositions = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
        }));
    };
    
    // Initial position calculation
    updateSectionPositions();
    
    // Update positions on window resize
    window.addEventListener('resize', debounce(updateSectionPositions, 200));
    
    const updateActiveNavItem = throttle(() => {
        // Get current scroll position with offset
        const scrollPosition = window.scrollY + offset;
        
        // Find the current section using cached positions
        let currentSectionId = '';
        for (const section of sectionPositions) {
            if (scrollPosition >= section.top && scrollPosition < section.bottom) {
                currentSectionId = section.id;
                break;
            }
        }
        
        // Update active class on nav items
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${currentSectionId}`;
            
            // Only manipulate the DOM if the state changes
            if (isActive && !link.classList.contains('active')) {
                link.classList.add('active');
            } else if (!isActive && link.classList.contains('active')) {
                link.classList.remove('active');
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
                    link.classList.toggle('active', link.getAttribute('href') === window.location.hash);
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
        // Use CSS variables for transitions when possible
        const applyStyles = (styles) => {
            if (!styles) return;
            Object.entries(styles).forEach(([property, value]) => {
                element.style[property] = value;
            });
        };
        
        element.addEventListener('mouseenter', () => applyStyles(enterStyles));
        element.addEventListener('mouseleave', () => applyStyles(leaveStyles));
    });
}

// Setup navbar transparent to beige transition
function setupNavbarScroll(threshold = 50) {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const handleScroll = throttle(() => {
        // Use classList.toggle with conditional for better performance
        navbar.classList.toggle('scrolled', window.scrollY > threshold);
    }, 100);
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return {
        update: handleScroll
    };
}

// Enhanced animation utility
function animateElement(element, animationClass, delay = 0) {
    if (!element) return;
    
    setTimeout(() => {
        requestAnimationFrame(() => {
            element.classList.add(animationClass);
        });
    }, delay);
}

// Animate sequential elements with staggered timing
function animateSequential(elements, animationClass, initialDelay = 0, staggerDelay = 100) {
    if (!elements || !elements.length) return;
    
    Array.from(elements).forEach((element, index) => {
        const delay = initialDelay + (index * staggerDelay);
        animateElement(element, animationClass, delay);
    });
}

// Export functions for use in other scripts
window.LabUtils = {
    throttle,
    debounce,
    smoothScrollTo,
    setupSmoothScrolling,
    setupFadeAnimations,
    setupScrollSpy,
    setupHoverEffects,
    setupNavbarScroll,
    animateElement,
    animateSequential
};