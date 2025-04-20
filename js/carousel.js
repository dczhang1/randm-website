document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.news-carousel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.carousel-items-container');
    const items = carousel.querySelectorAll('.carousel-item');
    const arrows = carousel.querySelectorAll('.carousel-arrow');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const itemCount = items.length;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Update carousel position and active states
    function updateCarousel(animate = true) {
        if (animate) {
            container.style.transition = 'transform 0.4s ease-in-out';
        } else {
            container.style.transition = 'none';
        }
        
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active class for items
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        
        // Update active class for indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Reset autoplay on manual navigation
        if (animate) {
            resetAutoplay();
        }
    }
    
    // Move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    // Move to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    // Setup autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    // Reset autoplay (used after manual navigation)
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Arrow click handlers
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (arrow.classList.contains('carousel-arrow--left')) {
                prevSlide();
            } else {
                nextSlide();
            }
        });
    });
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Touch events for mobile swipe
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        // Prevent default only if significant movement detected
        if (Math.abs(diff) > 5) {
            e.preventDefault();
        }
        
        // Add some resistance to the drag
        const resistance = 0.4;
        const offset = -(currentIndex * 100) - (diff * resistance);
        container.style.transition = 'none';
        container.style.transform = `translateX(${offset}%)`;
    }, { passive: false });
    
    container.addEventListener('touchend', () => {
        if (!touchStartX || !touchEndX) return;
        
        const diff = touchStartX - touchEndX;
        const threshold = 50; // Minimum swipe distance
        
        if (diff > threshold) {
            // Swipe left - go to next
            nextSlide();
        } else if (diff < -threshold) {
            // Swipe right - go to previous
            prevSlide();
        } else {
            // Return to current slide if swipe wasn't long enough
            updateCarousel();
        }
        
        // Reset touch coordinates
        touchStartX = 0;
        touchEndX = 0;
        
        // Restart autoplay
        startAutoplay();
    });
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Initialize carousel
    updateCarousel(false);
    startAutoplay();
    
    // Set the first slide as active
    if (items.length) {
        items[0].classList.add('active');
    }
}); 