// Initialize news page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const monthFilter = document.getElementById('month-filter');
    const newsItems = document.querySelectorAll('.news-item');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const noResultsMessage = document.querySelector('.no-results-message');
    
    // Initialize state
    let activeCategory = 'all';
    let activeMonth = 'all';
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active category
            activeCategory = button.getAttribute('data-filter');
            
            // Apply filters
            applyFilters();
        });
    });
    
    // Add event listener to month filter
    monthFilter.addEventListener('change', () => {
        activeMonth = monthFilter.value;
        applyFilters();
    });
    
    // Add event listeners to read more buttons
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newsItem = button.closest('.news-item');
            
            // Toggle expanded state
            newsItem.classList.toggle('expanded');
            
            // Update button text
            if (newsItem.classList.contains('expanded')) {
                button.textContent = 'Show less';
            } else {
                button.textContent = 'Read more';
            }
        });
    });
    
    // Function to apply filters
    function applyFilters() {
        let visibleCount = 0;
        
        newsItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemDate = item.getAttribute('data-date');
            
            // Check if item matches both category and month filters
            const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
            const matchesMonth = activeMonth === 'all' || itemDate === activeMonth;
            
            // Show or hide based on filters
            if (matchesCategory && matchesMonth) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }