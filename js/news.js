/**
 * news.js - News page specific functionality
 * Redesigned for grid layout with pagination
 */

// Initialize the news page functionality
function initNewsPage() {
    // Cache DOM elements
    const filterLinks = document.querySelectorAll('.filter-link');
    const monthFilter = document.getElementById('month-filter');
    const sortByFilter = document.getElementById('sort-by');
    const newsItems = document.querySelectorAll('.news-item');
    const noResultsMessage = document.querySelector('.no-results-message');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const pagination = document.querySelector('.pagination');
    const paginationLinks = document.querySelectorAll('.pagination-link');
    const modal = document.getElementById('newsModal');
    const modalClose = document.querySelectorAll('.news-modal-close, .news-modal-close-btn');
    const modalDate = document.getElementById('modal-date');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    console.log('News page initialization started');
    
    // News data store
    const newsData = [];
    
    // Configuration
    const itemsPerPage = 9;
    let currentPage = 1;
    let filteredItems = [];
    
    // Collect news data
    newsItems.forEach(item => {
        // Extract data that should be displayed in the modal
        const id = item.querySelector('.read-more-btn').getAttribute('data-id');
        const category = item.getAttribute('data-category');
        const date = item.getAttribute('data-date');
        const title = item.getAttribute('data-title') || item.querySelector('h2').textContent;
        const summary = item.querySelector('.news-summary').innerHTML;
        const image = item.querySelector('.news-image img').getAttribute('src');
        
        // Create details content (could be expanded in a real implementation)
        let details = '<p>' + summary.replace(/<\/?p>/g, '') + '</p>';
        details += '<p>This is expanded content for the news item that would be shown in the modal.</p>';
        
        // Push to news data array
        newsData.push({
            id,
            element: item,
            category,
            date,
            title,
            summary,
            details,
            image
        });
    });
    
    console.log(`Collected data for ${newsData.length} news items`);
    
    // Filter and sort function
    function filterAndSortItems() {
        try {
            const activeFilterLink = document.querySelector('.filter-link.active');
            if (!activeFilterLink) return;
            
            const selectedCategory = activeFilterLink.getAttribute('data-filter');
            const selectedMonth = monthFilter ? monthFilter.value : 'all';
            const sortBy = sortByFilter ? sortByFilter.value : 'date-desc';
            
            // Apply filters
            filteredItems = newsData.filter(item => {
                const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
                const dateMatch = selectedMonth === 'all' || item.date === selectedMonth;
                return categoryMatch && dateMatch;
            });
            
            // Apply sorting
            filteredItems.sort((a, b) => {
                switch (sortBy) {
                    case 'date-asc':
                        return a.date.localeCompare(b.date);
                    case 'title-asc':
                        return a.title.localeCompare(b.title);
                    case 'title-desc':
                        return b.title.localeCompare(a.title);
                    case 'date-desc':
                    default:
                        return b.date.localeCompare(a.date);
                }
            });
            
            // Display first page
            currentPage = 1;
            displayCurrentPage();
            updatePagination();
            
        } catch (error) {
            console.error('Error filtering news items:', error);
        }
    }
    
    // Display current page function
    function displayCurrentPage() {
        try {
            // Hide all news items first
            newsData.forEach(item => {
                item.element.style.display = 'none';
                item.element.classList.remove('visible');
            });
            
            // Calculate start and end index for current page
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
            
            // Show items for current page
            for (let i = startIndex; i < endIndex; i++) {
                filteredItems[i].element.style.display = 'block';
                
                // Add visible class with a slight delay for animation
                setTimeout(() => {
                    filteredItems[i].element.classList.add('visible');
                }, 50 * (i - startIndex));
            }
            
            // Show/hide no results message
            if (noResultsMessage) {
                noResultsMessage.style.display = filteredItems.length === 0 ? 'block' : 'none';
            }
            
            // Update pagination visibility
            if (pagination) {
                pagination.style.display = filteredItems.length > itemsPerPage ? 'flex' : 'none';
            }
            
        } catch (error) {
            console.error('Error displaying current page:', error);
        }
    }
    
    // Update pagination links
    function updatePagination() {
        if (!pagination) return;
        
        try {
            // Calculate total pages
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            
            // Clear existing pagination links (except prev/next)
            const paginationContainer = pagination;
            const prevLink = paginationContainer.querySelector('.prev');
            const nextLink = paginationContainer.querySelector('.next');
            
            // Remove all page number links
            Array.from(paginationContainer.children).forEach(child => {
                if (!child.classList.contains('prev') && !child.classList.contains('next')) {
                    paginationContainer.removeChild(child);
                }
            });
            
            // Add new page number links
            for (let i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = '#';
                pageLink.classList.add('pagination-link');
                pageLink.textContent = i;
                
                if (i === currentPage) {
                    pageLink.classList.add('active');
                }
                
                // Insert before next link
                paginationContainer.insertBefore(pageLink, nextLink);
                
                // Add click event
                pageLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    currentPage = i;
                    displayCurrentPage();
                    updateActivePaginationLink();
                });
            }
            
            // Update prev/next button states
            prevLink.style.opacity = currentPage === 1 ? '0.5' : '1';
            prevLink.style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
            
            nextLink.style.opacity = currentPage === totalPages ? '0.5' : '1';
            nextLink.style.pointerEvents = currentPage === totalPages ? 'none' : 'auto';
            
            // Set up prev/next button click events
            prevLink.onclick = function(e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    displayCurrentPage();
                    updateActivePaginationLink();
                }
            };
            
            nextLink.onclick = function(e) {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    displayCurrentPage();
                    updateActivePaginationLink();
                }
            };
            
        } catch (error) {
            console.error('Error updating pagination:', error);
        }
    }
    
    // Update active pagination link
    function updateActivePaginationLink() {
        if (!pagination) return;
        
        try {
            const pageLinks = pagination.querySelectorAll('.pagination-link:not(.prev):not(.next)');
            pageLinks.forEach((link, index) => {
                if (index + 1 === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Update prev/next button states
            const prevLink = pagination.querySelector('.prev');
            const nextLink = pagination.querySelector('.next');
            const totalPages = pageLinks.length;
            
            prevLink.style.opacity = currentPage === 1 ? '0.5' : '1';
            prevLink.style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
            
            nextLink.style.opacity = currentPage === totalPages ? '0.5' : '1';
            nextLink.style.pointerEvents = currentPage === totalPages ? 'none' : 'auto';
            
        } catch (error) {
            console.error('Error updating active pagination link:', error);
        }
    }
    
    // Open modal function
    function openModal(newsItem) {
        if (!modal || !modalTitle || !modalContent || !modalDate) return;
        
        try {
            const item = newsData.find(item => item.id === newsItem.getAttribute('data-id'));
            if (!item) return;
            
            // Set modal content
            modalDate.textContent = formatNewsDate(item.date);
            modalTitle.textContent = item.title;
            
            // Create content with image and text
            let contentHtml = `<img src="${item.image}" alt="${item.title}">`;
            contentHtml += item.details;
            
            modalContent.innerHTML = contentHtml;
            
            // Show modal with animation
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Trigger animation by adding active class after a slight delay
            setTimeout(() => {
                modal.classList.add('active');
            }, 10); // Small delay to ensure the display change has been applied
            
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }
    
    // Format date for display (convert from YYYY-MM to Month DD, YYYY)
    function formatNewsDate(dateStr) {
        try {
            // For detailed items with full dates stored in data attributes
            if (dateStr.match(/\d{4}-\d{2}-\d{2}/)) {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
            
            // For month filter values (YYYY-MM)
            if (dateStr.match(/\d{4}-\d{2}/)) {
                const [year, month] = dateStr.split('-');
                const date = new Date(year, parseInt(month) - 1, 1);
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
            }
            
            return dateStr; // Return as is if not matching expected formats
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateStr;
        }
    }
    
    // Close modal function
    function closeModal() {
        if (!modal) return;
        
        // Remove active class first to trigger animation
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding modal
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }, 300); // Match to the CSS transition time
    }
    
    // Set up event listeners
    
    // Filter links
    if (filterLinks.length) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active filter
                filterLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Apply filters
                filterAndSortItems();
            });
        });
    }
    
    // Month filter
    if (monthFilter) {
        monthFilter.addEventListener('change', filterAndSortItems);
    }
    
    // Sort by filter
    if (sortByFilter) {
        sortByFilter.addEventListener('change', filterAndSortItems);
    }
    
    // Read more buttons
    if (readMoreButtons.length) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(this);
            });
        });
    }
    
    // Modal close buttons
    if (modalClose.length) {
        modalClose.forEach(closeBtn => {
            closeBtn.addEventListener('click', closeModal);
        });
    }
    
    // Close modal when clicking outside of modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Initial filtering
    filterAndSortItems();
    
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
