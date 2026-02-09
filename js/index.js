/**
 * index.js - Homepage specific functionality
 */

// Initialize the homepage functionality
function initHomePage() {
    // Initialize alumni pop-up modal
    initAlumniModal();
}

/**
 * Alumni modal: open on "View Lab Alumni" button, close on overlay/close/Escape
 */
function initAlumniModal() {
    const btn = document.getElementById('showAlumniBtn');
    const modal = document.getElementById('alumniModal');
    const overlay = document.getElementById('alumniModalOverlay');
    const closeBtn = document.getElementById('alumniModalClose');

    if (!btn || !modal) return;

    function openAlumniModal() {
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeAlumniModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', openAlumniModal);
    if (closeBtn) closeBtn.addEventListener('click', closeAlumniModal);
    if (overlay) overlay.addEventListener('click', closeAlumniModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeAlumniModal();
        }
    });
}

// Register with main.js – initPageSpecific() calls initPage[data-page]()
window.initPage = window.initPage || {};
window.initPage.home = initHomePage;
