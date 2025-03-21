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

// Add this to your existing scripts.js file

// Side navigation highlighting for Get Involved page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if we're on the Get Involved page
    if (currentPage === 'get-involved.html') {
        const sections = document.querySelectorAll('.opportunity, .contact-info');
        const navLinks = document.querySelectorAll('.side-nav a');
        
        // Function to set active menu item
        const setActiveNavItem = () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                // 150px offset accounts for the header and some buffer
                if (window.scrollY >= (sectionTop - 150)) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // Add active class to current section link
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        };
        
        // Set active menu item on scroll
        window.addEventListener('scroll', setActiveNavItem);
        
        // Set active menu item on page load
        setActiveNavItem();
        
        // Smooth scroll to sections when clicking on side nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Offset for fixed header
                    const offsetTop = targetSection.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});


// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    body.appendChild(overlay);
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a nav link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when window is resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});