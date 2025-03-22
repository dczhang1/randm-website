// News page specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterLinks = document.querySelectorAll('.filter-link');
    const monthFilter = document.getElementById('month-filter');
    const newsItems = document.querySelectorAll('.news-item');
    const noResultsMessage = document.querySelector('.no-results-message');
    
    // Read More/Less functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    // Filter function
    function filterNewsItems() {
        const selectedCategory = document.querySelector('.filter-link.active').getAttribute('data-filter');
        const selectedMonth = monthFilter.value;
        
        let visibleCount = 0;
        
        newsItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemDate = item.getAttribute('data-date');
            
            const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;
            const dateMatch = selectedMonth === 'all' || itemDate === selectedMonth;
            
            if (categoryMatch && dateMatch) {
                item.style.display = 'block';
                visibleCount++;
                
                // Add 'visible' class for animations if it's not already there
                if (!item.classList.contains('visible')) {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50); // Small delay to allow the display property to update
                }
            } else {
                item.style.display = 'none';
                item.classList.remove('visible');
            }
        });
        
        // Show "no results" message if no items are visible
        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
    
    // Event listeners for filters
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active filter
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filters
            filterNewsItems();
        });
    });
    
    monthFilter.addEventListener('change', filterNewsItems);
    
    // Read More/Less functionality
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newsItem = this.closest('.news-item');
            const details = newsItem.querySelector('.news-details');
            
            if (details.style.display === 'block') {
                details.style.display = 'none';
                this.textContent = 'Read more';
            } else {
                details.style.display = 'block';
                this.textContent = 'Read less';
            }
        });
    });
    
    // Initial filtering
    filterNewsItems();
    
    // Add observer for animation
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
    
    // Observe all news items for fade in animation
    newsItems.forEach(item => {
        if (!item.classList.contains('visible')) {
            observer.observe(item);
        }
    });
});