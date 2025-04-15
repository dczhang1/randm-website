document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.news-carousel');
    const container = carousel.querySelector('.carousel-items-container');
    const items = carousel.querySelectorAll('.carousel-item');
    const arrows = carousel.querySelectorAll('.carousel-arrow');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const itemCount = items.length;
    
    // Update carousel position and active states
    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active class for items
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        
        // Update active class for indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Arrow click handlers
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (arrow.classList.contains('carousel-arrow--left')) {
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            } else {
                currentIndex = (currentIndex + 1) % itemCount;
            }
            updateCarousel();
        });
    });
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Initialize carousel
    updateCarousel();
}); 