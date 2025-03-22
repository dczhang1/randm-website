/**
 * get-involved.js - Get Involved page specific functionality
 */

// Initialize the get involved page functionality
function initGetInvolvedPage() {
    // Set up scroll spy for navigation
    const scrollSpy = LabUtils.setupScrollSpy(
        '.page-section',
        '.side-navigation a',
        150
    );
    
    // Handle "Apply" and other internal links specifically for this page
    const internalLinks = document.querySelectorAll('.opportunity a[href^="#"]');
    if (internalLinks.length) {
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (!targetId) return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    LabUtils.smoothScrollTo(targetSection, 100);
                    
                    // Update active nav item
                    const navLinks = document.querySelectorAll('.side-navigation a');
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                        if (navLink.getAttribute('href') === targetId) {
                            navLink.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // Set up hover effects for opportunities
    LabUtils.setupHoverEffects(
        '.opportunity',
        {
            transform: 'translateY(-8px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.13)'
        },
        {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        }
    );
    
    // Set up fade animations for specific elements
    LabUtils.setupFadeAnimations('.opportunity, .contact-info, .apply-button');
    
    // Add form validation if contact form exists
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    
                    // Add error class
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    // Remove error class and message
                    field.classList.remove('error');
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    LabUtils.smoothScrollTo(firstError, 150);
                }
            }
        });
    }
    
    console.log('Get Involved page initialized');
}

// Add to global initialization object
window.initPage = window.initPage || {};
window.initPage.getInvolved = initGetInvolvedPage;

// Auto-initialize if the correct page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.getAttribute('data-page') === 'get-involved') {
        initGetInvolvedPage();
    }
});