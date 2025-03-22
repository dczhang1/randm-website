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
    
    // Add functionality to allow adding new news items easily
    function createNewsItem(details) {
        // Create news item elements
        const article = document.createElement('article');
        article.className = 'news-item fade-in';
        article.setAttribute('data-category', details.category);
        article.setAttribute('data-date', details.dateCode); // Format: YYYY-MM
        
        // Create date element
        const dateDiv = document.createElement('div');
        dateDiv.className = 'news-date';
        dateDiv.textContent = details.displayDate;
        
        // Create title
        const title = document.createElement('h2');
        title.textContent = details.title;
        
        // Create content wrapper if image is provided
        let contentWrapper = null;
        let imageDiv = null;
        let textContentDiv = null;
        
        if (details.imageSrc) {
            contentWrapper = document.createElement('div');
            contentWrapper.className = 'news-content-wrapper';
            
            imageDiv = document.createElement('div');
            imageDiv.className = 'news-image';
            
            const image = document.createElement('img');
            image.src = details.imageSrc;
            image.alt = details.title;
            imageDiv.appendChild(image);
            
            textContentDiv = document.createElement('div');
            textContentDiv.className = 'news-text-content';
        }
        
        // Create summary
        const summary = document.createElement('div');
        summary.className = 'news-summary';
        const summaryP = document.createElement('p');
        summaryP.textContent = details.summary;
        summary.appendChild(summaryP);
        
        // Create details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'news-details';
        detailsDiv.innerHTML = details.fullContent; // Can include HTML
        
        // Create read more button
        const button = document.createElement('button');
        button.className = 'read-more-btn';
        button.textContent = 'Read more';
        
        // Add event listener to button
        button.addEventListener('click', () => {
            article.classList.toggle('expanded');
            if (article.classList.contains('expanded')) {
                button.textContent = 'Show less';
            } else {
                button.textContent = 'Read more';
            }
        });
        
        // Assemble article
        article.appendChild(dateDiv);
        article.appendChild(title);
        
        if (contentWrapper) {
            contentWrapper.appendChild(imageDiv);
            textContentDiv.appendChild(summary);
            textContentDiv.appendChild(detailsDiv);
            contentWrapper.appendChild(textContentDiv);
            article.appendChild(contentWrapper);
        } else {
            article.appendChild(summary);
            article.appendChild(detailsDiv);
        }
        
        article.appendChild(button);
        
        return article;
    }
    
    // Initialize filters on page load
    applyFilters();
});