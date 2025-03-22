// Get Involved page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all section elements and navigation links
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.side-navigation a');
    
    // Function to update active navigation link based on scroll position
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
        navLinks.forEach(link => {
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
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle "Apply" and other internal links
    const internalLinks = document.querySelectorAll('.opportunity a[href^="#"]');
    internalLinks.forEach(link => {
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
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
                
                // Update active nav item
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === targetId) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Update active nav item on page load
    updateActiveNavItem();
    
    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Handle hash in URL on page load
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Wait for page to fully load
            setTimeout(() => {
                // Offset for fixed header
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === window.location.hash) {
                        link.classList.add('active');
                    }
                });
            }, 300);
        }
    }
    
    // Add fade-in animations using Intersection Observer
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
    
    // Observe all fade elements
    const fadeElements = document.querySelectorAll('.fade-element');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});