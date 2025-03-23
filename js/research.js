/**
 * research.js - Research page specific functionality
 */

// Initialize the research page functionality
function initResearchPage() {
    // Set up scroll spy for navigation
    const scrollSpy = LabUtils.setupScrollSpy(
        '.page-section',
        '.sidebar__link',
        150
    );
    
    // Set up hover effects for research programs
    LabUtils.setupHoverEffects(
        '.research-program', 
        {
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)'
        },
        {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        }
    );
    
    // Set up hover effects for resource cards
    LabUtils.setupHoverEffects(
        '.resource-card',
        {
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)'
        },
        {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        }
    );
    
    // Set up hover effects for publications
    LabUtils.setupHoverEffects(
        '.publication-list li',
        {
            transform: 'translateX(10px)',
            color: 'var(--color-accent)'
        },
        {
            transform: 'translateX(5px)',
            color: ''
        }
    );
    
    // Set up fade animations for specific elements
    LabUtils.setupFadeAnimations([
        '.research-program',
        '.resource-card',
        '.publication-category',
        '.more-publications'
    ].join(', '));
    
    console.log('Research page initialized');
}

// Add to global initialization object
window.initPage = window.initPage || {};
window.initPage.research = initResearchPage;

// Auto-initialize if the correct page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.getAttribute('data-page') === 'research') {
        initResearchPage();
    }
});