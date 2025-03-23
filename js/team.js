/**
 * team.js - Team page specific functionality
 */

// Initialize the team page functionality
function initTeamPage() {
    console.log('Team page initialization started');
    
    // DOM elements
    const piReadMoreBtn = document.querySelector('.pi-read-more');
    const modal = document.getElementById('piModal');
    const modalClose = document.querySelectorAll('.team-modal-close, .team-modal-close-btn');
    
    // Open modal function
    function openModal() {
        if (!modal) return;
        
        try {
            // Show modal with animation
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Trigger animation by adding active class after a slight delay
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }
    
    // Close modal function
    function closeModal() {
        if (!modal) return;
        
        // Remove active class first to trigger animation
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding modal
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }, 300); // Match to the CSS transition time
    }
    
    // Set up event listeners
    
    // Read more button
    if (piReadMoreBtn) {
        piReadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    // Modal close buttons
    if (modalClose.length) {
        modalClose.forEach(closeBtn => {
            closeBtn.addEventListener('click', closeModal);
        });
    }
    
    // Close modal when clicking outside of modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Set up hover effect for PI card to show Read More button
    const piBanner = document.querySelector('.pi-banner');
    if (piBanner) {
        const readMoreBtn = piBanner.querySelector('.pi-read-more');
        
        if (readMoreBtn) {
            // Initial state
            readMoreBtn.style.opacity = '0';
            readMoreBtn.style.transform = 'translateY(10px)';
            readMoreBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Hover effect
            piBanner.addEventListener('mouseenter', () => {
                readMoreBtn.style.opacity = '1';
                readMoreBtn.style.transform = 'translateY(0)';
            });
            
            piBanner.addEventListener('mouseleave', () => {
                readMoreBtn.style.opacity = '0';
                readMoreBtn.style.transform = 'translateY(10px)';
            });
        }
    }
    
    // Set up fade animations
    if (typeof LabUtils !== 'undefined' && LabUtils.setupFadeAnimations) {
        LabUtils.setupFadeAnimations('.team-member, .pi-banner, .mascot-section, .alumni-section');
    } else {
        console.warn('LabUtils.setupFadeAnimations not available');
    }
    
    console.log('Team page initialized');
}

// Add to global initialization object
window.initPage = window.initPage || {};
window.initPage.team = initTeamPage;

// Auto-initialize if the correct page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.getAttribute('data-page') === 'team') {
        initTeamPage();
    }
});