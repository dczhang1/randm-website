/**
 * card-hover-effect.js - Aceternity-style card hover effect
 * Highlights the hovered card with a radial gradient that follows the mouse
 */

function initCardHoverEffect() {
    const containers = document.querySelectorAll('.card-hover-effect');

    containers.forEach(container => {
        const cards = container.querySelectorAll('.team-member, .team-member-card');

        cards.forEach(card => {
            // Add highlight overlay (prepended so content stacks above)
            const highlight = document.createElement('div');
            highlight.className = 'card-hover-highlight';
            card.insertBefore(highlight, card.firstChild);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                highlight.style.setProperty('--mouse-x', `${x}%`);
                highlight.style.setProperty('--mouse-y', `${y}%`);
            });

            card.addEventListener('mouseleave', () => {
                highlight.style.removeProperty('--mouse-x');
                highlight.style.removeProperty('--mouse-y');
            });
        });
    });
}

// Auto-initialize on team page and home page (index)
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page');
    if (page === 'team' || page === 'home') {
        initCardHoverEffect();
    }
});
