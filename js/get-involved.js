// Enhanced functionality for the Get Involved page
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the Get Involved page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'get-involved.html') {
        // Improved section highlighting with better scroll behavior
        const sections = document.querySelectorAll('.opportunity, .contact-info');
        const navLinks = document.querySelectorAll('.side-nav a');
        
        // Function to set active menu item with more precise calculations
        const setActiveNavItem = () => {
            // Get current scroll position with some offset for the header
            const scrollPosition = window.scrollY + 100;
            
            // Find which section is currently in view
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && 
                    scrollPosition < sectionTop + sectionHeight) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });
            
            // If no section is active (e.g., at the very top), highlight the first link
            if (currentSection === '' && sections.length > 0) {
                currentSection = '#' + sections[0].getAttribute('id');
            }
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // Add active class to current section link
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                    
                    // Optional: scroll the active link into view within the side nav
                    if (window.innerWidth > 1024) { // Only on desktop
                        link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            });
        };
        
        // Enhanced smooth scrolling for section navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Offset for fixed header
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    // Smooth scroll with improved behavior
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping (modern browsers)
                    history.pushState(null, null, targetId);
                    
                    // Set active immediately for better UX
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // Set active menu item on scroll with throttling for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    setActiveNavItem();
                    scrollTimeout = null;
                }, 100);
            }
        });
        
        // Set active menu item on page load
        setActiveNavItem();
        
        // Handle hash links when page loads
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                // Small delay to ensure page is fully loaded
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
        
        // Add animation to sections as they scroll into view
        const animateSections = () => {
            const allSections = document.querySelectorAll('.opportunity, .contact-info');
            
            allSections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // When section is 60% into the viewport
                if (sectionTop < windowHeight * 0.6) {
                    section.classList.add('visible');
                    
                    // Add a slight delay to child elements for cascade effect
                    const childElements = section.querySelectorAll('h2, h3, p, ul, .button');
                    childElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, 100 * index);
                    });
                }
            });
        };
        
        // Initial animation check
        animateSections();
        
        // Animate sections on scroll
        window.addEventListener('scroll', animateSections);
    }
});