// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Fade-in animations for elements as they come into view
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements you want to animate
    const fadeElements = document.querySelectorAll('.about, .focus-area, .research-highlights h2, .team-section, .pi-banner, .mascot-section, .alumni-section, .team-member');
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        observer.observe(element);
    });
    
    // Mobile navigation menu
    const hamburger = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger && navLinks) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        overlay.style.display = 'none';
        body.appendChild(overlay);
        
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                overlay.style.display = 'block';
                body.style.overflow = 'hidden';
            } else {
                overlay.style.display = 'none';
                body.style.overflow = '';
            }
        }
        
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on links
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Handle hamburger animation
        hamburger.addEventListener('click', () => {
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
});