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
    
    console.log('News page initialization started');
    console.log('Read more buttons found:', readMoreButtons.length);
    
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
    
    // ===== READ MORE/LESS FUNCTIONALITY =====
    if (readMoreButtons.length) {
        readMoreButtons.forEach(button => {
            // Log the button for debugging
            console.log('Setting up button:', button);
            
            // Force initialize the display style
            const newsItem = button.closest('.news-item');
            if (newsItem) {
                const details = newsItem.querySelector('.news-details');
                if (details) {
                    // Ensure it starts hidden
                    details.style.display = 'none';
                }
            }
            
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default button behavior
                
                try {
                    console.log('Button clicked:', this);
                    
                    const newsItem = this.closest('.news-item');
                    if (!newsItem) {
                        console.error('No parent news-item found');
                        return;
                    }
                    
                    const details = newsItem.querySelector('.news-details');
                    if (!details) {
                        console.error('No news-details element found');
                        return;
                    }
                    
                    console.log('Current display state:', details.style.display);
                    
                    // Check current state (default to not expanded if style is not set)
                    const isExpanded = details.style.display === 'block';
                    
                    // Toggle display and button text
                    if (isExpanded) {
                        details.style.display = 'none';
                        this.textContent = 'Read more';
                    } else {
                        details.style.display = 'block';
                        this.textContent = 'Read less';
                    }
                    
                    console.log('New display state:', details.style.display);
                    
                    // Smooth scroll functionality using a simple implementation
                    // in case LabUtils is not available
                    if (!isExpanded) {
                        const detailsTop = details.getBoundingClientRect().top;
                        if (detailsTop < 0) {
                            if (typeof LabUtils !== 'undefined' && LabUtils.smoothScrollTo) {
                                LabUtils.smoothScrollTo(details, 150);
                            } else {
                                // Fallback smooth scroll
                                newsItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
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
    
    // Set up fade animations if LabUtils is available
    if (typeof LabUtils !== 'undefined' && LabUtils.setupFadeAnimations) {
        LabUtils.setupFadeAnimations('.news-item');
    } else {
        console.warn('LabUtils.setupFadeAnimations not available');
    }
    
    console.log('News page initialized');
}

// Add to global initialization object
window.initPage = window.initPage || {};
window.initPage.news = initNewsPage;

// Auto-initialize if the correct page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    if (body && body.getAttribute('data-page') === 'news') {
        console.log('News page detected, initializing...');
        initNewsPage();
    } else {
        console.log('Not on news page, data-page:', body ? body.getAttribute('data-page') : 'body not found');
    }
});