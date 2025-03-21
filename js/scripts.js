// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize fade-in elements
    const fadeIns = document.querySelectorAll('.fade-in');
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    // Observe all fade-in elements
    fadeIns.forEach(element => observer.observe(element));

    // Handle page-specific initializations
    const currentPage = window.location.pathname.split('/').pop();
    
    // Home page specific setup
    if (currentPage === 'index.html' || currentPage === '') {
        // Initial fade-in for hero elements
        document.querySelector('.hero h1').classList.add('fade-in', 'visible');
        document.querySelector('.hero p').classList.add('fade-in', 'visible');
        
        // Make scroll arrow functional
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            scrollArrow.addEventListener('click', () => {
                // Scroll to just below the hero section (where content begins)
                const contentStart = document.querySelector('.content-wrapper');
                if (contentStart) {
                    contentStart.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
});