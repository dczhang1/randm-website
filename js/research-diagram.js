// Research Page Navigation and Scrolling Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const navLinks = document.querySelectorAll('.research-nav-link');
    const subStreamLinks = document.querySelectorAll('.sub-stream');
    const areaDetails = document.querySelectorAll('.area-detail');
    
    // Helper function to set active menu item based on scroll position
    function updateActiveNavItem() {
        // Get current scroll position with some offset for the header
        const scrollPosition = window.scrollY + 150;
        
        // Check each area detail's position
        let currentSectionId = '';
        
        areaDetails.forEach(area => {
            const sectionTop = area.offsetTop;
            const sectionHeight = area.offsetHeight;
            
            // If we've scrolled to or past this section
            if (scrollPosition >= sectionTop && 
                scrollPosition <= sectionTop + sectionHeight) {
                currentSectionId = area.getAttribute('id');
            }
        });
        
        // Update active class on nav items
        navLinks.forEach(link => {
            // Remove active class from all
            link.classList.remove('active');
            
            // Add active class to current section link
            const linkTarget = link.getAttribute('href').substring(1); // Remove the #
            if (linkTarget === currentSectionId) {
                link.classList.add('active');
            }
        });
        
        // Handle the sections category highlighting (Research vs Resources)
        if (currentSectionId) {
            const isResource = ['measures', 'code', 'materials'].includes(currentSectionId);
            const navHeadings = document.querySelectorAll('.research-nav h3');
            
            if (navHeadings.length >= 2) {
                if (isResource) {
                    navHeadings[0].classList.remove('active-category');
                    navHeadings[1].classList.add('active-category');
                } else {
                    navHeadings[0].classList.add('active-category');
                    navHeadings[1].classList.remove('active-category');
                }
            }
        }
    }
    
    // Smooth scroll to the section when clicking on navigation links
    function setupSmoothScrolling() {
        // For the main navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smoothly scroll to the target section
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // For the sub-stream cards
        subStreamLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smoothly scroll to the target section
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Initialize interactions
    function init() {
        // Set up smooth scrolling for navigation links
        setupSmoothScrolling();
        
        // Set active menu item on page load
        updateActiveNavItem();
        
        // Update active menu item on scroll
        window.addEventListener('scroll', updateActiveNavItem);
        
        // Initialize the fade-in animations
        setupFadeInAnimations();
    }
    
    // Setup fade-in animations
    function setupFadeInAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        // Create an observer for fade-in elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once visible, no need to observe anymore
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // 20% of the element must be visible
        
        // Observe all fade-in elements
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize the page
    init();
});