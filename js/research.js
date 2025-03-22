// Research page specific functionality
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
    
    // Update active nav item on page load
    updateActiveNavItem();
    
    // Update active nav item on scroll with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateActiveNavItem();
                scrollTimeout = null;
            }, 100);
        }
    });
    
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
    
    // Add animation to research program elements
    const researchPrograms = document.querySelectorAll('.research-program');
    researchPrograms.forEach(program => {
        program.addEventListener('mouseenter', () => {
            program.style.transform = 'translateY(-10px)';
            program.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
        });
        
        program.addEventListener('mouseleave', () => {
            program.style.transform = 'translateY(-5px)';
            program.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add animation to resource items
    const resourceItems = document.querySelectorAll('.resource-item, .resource-note');
    resourceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(5px)';
            item.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Add animation to publications
    const pubItems = document.querySelectorAll('.publication-list li');
    pubItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.color = 'var(--accent-color)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(5px)';
            item.style.color = '';
        });
    });
});