// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Immediately show all content and remove fade-in delays
document.addEventListener('DOMContentLoaded', () => {
    // Make all fade-in elements immediately visible
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
    
    // Make scroll arrow functional
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            // Get the height of the navbar
            const navHeight = document.querySelector('nav').offsetHeight;
            
            // Scroll to just below the hero section
            window.scrollTo({
                top: window.innerHeight - navHeight,
                behavior: 'smooth'
            });
        });
    }
});