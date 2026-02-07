/**
 * team.js - Team page specific functionality
 */

// Initialize the team page functionality
function initTeamPage() {
    // Set up fade animations
    if (typeof LabUtils !== 'undefined' && LabUtils.setupFadeAnimations) {
        LabUtils.setupFadeAnimations('.team-member, .pi-banner, .mascot-section, .alumni-section, .team-section');
    }
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
