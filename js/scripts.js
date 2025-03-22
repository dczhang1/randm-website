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
    
    // Find elements that already have the fade-element class
    const existingFadeElements = document.querySelectorAll('.fade-element');
    existingFadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add fade-in class to additional elements you want to animate
    const elementsToFade = document.querySelectorAll('.about, .focus-area, .research-highlights h2, .team-section, .pi-banner, .mascot-section, .alumni-section, .team-member, .research-program, .resource-item, .publication-category, .more-publications, .resource-note');
    elementsToFade.forEach(element => {
        // Only add the class if it doesn't already have it
        if (!element.classList.contains('fade-element')) {
            element.classList.add('fade-element');
        }
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

// Add this code to your scripts.js file

// Side navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const sideNavLinks = document.querySelectorAll('.side-navigation a');
    const sections = document.querySelectorAll('.page-section');
    
    // Function to update active nav item based on scroll position
    function updateActiveNavItem() {
        // Get current scroll position with some offset for the header
        const scrollPosition = window.scrollY + 150;
        
        // Find the current section
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update active class on nav items
        sideNavLinks.forEach(link => {
            // Remove active class from all
            link.classList.remove('active');
            
            // Add active class to current section link
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll to section when clicking nav links
    sideNavLinks.forEach(link => {
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
    
    // Update active nav item on page load
    updateActiveNavItem();
    
    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
});