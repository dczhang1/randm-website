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
        document.querySelectorAll('.about h2, .about p').forEach(el => el.classList.add('fade-in'));
    } 
    // Team page
    else if (currentPage === 'team.html') {
        document.querySelector('.team h1').classList.add('fade-in', 'visible');
    }
    // Research page
    else if (currentPage === 'research.html') {
        document.querySelector('.research h1').classList.add('fade-in', 'visible');
    }
    // News page
    else if (currentPage === 'news.html') {
        document.querySelector('.news h1').classList.add('fade-in', 'visible');
    }
    // Get Involved page
    else if (currentPage === 'get-involved.html') {
        document.querySelector('.get-involved h1').classList.add('fade-in', 'visible');
    }
});