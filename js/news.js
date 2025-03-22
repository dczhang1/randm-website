/**
 * news.js - News page specific functionality
 */

// Initialize the news page functionality
function initNewsPage() {
    // Get DOM elements
    const filterLinks = document.querySelectorAll('.filter-link');
    const monthFilter = document.getElementById('month-filter');
    const newsItems = document.querySelectorAll('.news-item');
    const noResultsMessage = document.querySelector('.no-results-message');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    // Filter function with error handling
    function filterNewsItems() {
        try {
            const activeFilterLink = document.querySelector('.filter-link.active');
            if (!activeFilterLink) {
                console.warn('No active filter link found');
                return;
            }
            
            const selectedCategory = activeFilterLink.getAttribute('data-filter');
            const selectedMonth = monthFilter ? monthFilter.value : 'all';
            
            let visibleCount = 0;
            
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category') || 'all';
                const itemDate = item.getAttribute('data-date') || '';
                
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
            if (noResultsMessage) {
                noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        } catch (error) {
            console.error('Error filtering news items:', error);
        }
    }
    
    // Set up filter link event listeners
    if (filterLinks.length) {
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
    }
    
    // Set up month filter event listener
    if (monthFilter) {
        monthFilter.addEventListener('change', filterNewsItems);
    }
    
    // Set up read more/less functionality with error handling
    if (readMoreButtons.length) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                try {
                    const newsItem = this.closest('.news-item');
                    if (!newsItem) return;
                    
                    const details = newsItem.querySelector('.news-details');
                    if (!details) return;
                    
                    const isExpanded = details.style.display === 'block';
                    
                    details.style.display = isExpanded ? 'none' : 'block';
                    this.textContent = isExpanded ? 'Read more' : 'Read less';
                    
                    // Smoothly scroll to show content if expanding
                    if (!isExpanded) {
                        const detailsTop = details.getBoundingClientRect().top;
                        if (detailsTop < 0) {
                            LabUtils.smoothScrollTo(details, 150);
                        }
                    }
                } catch (error) {
                    console.error('Error toggling read more/less:', error);
                }
            });
        });
    }
    
    // Initial filtering
    filterNewsItems();
    
    // Set up fade animations
    LabUtils.setupFadeAnimations('.news-item');
    
    console.log('News page initialized');
}

// Add to global initialization object
window.initPage = window.initPage || {};
window.initPage.news = initNewsPage;

// Auto-initialize if the correct page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.getAttribute('data-page') === 'news') {
        initNewsPage();
    }
});