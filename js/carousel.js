/**
 * carousel.js - Enhanced carousel functionality for the RANDM Lab website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.news-carousel');
    
    carousels.forEach(initCarousel);
    
    function initCarousel(carousel) {
        if (!carousel) return;
        
        // Elements
        const container = carousel.querySelector('.carousel-items-container');
        const items = carousel.querySelectorAll('.carousel-item');
        const arrows = carousel.querySelectorAll('.carousel-arrow');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        // Early return if essential elements are missing
        if (!container || !items.length) return;
        
        // State
        let currentIndex = 0;
        const itemCount = items.length;
        let isAnimating = false;
        let autoplayInterval = null;
        let touchStartX = 0;
        let touchEndX = 0;
        const SWIPE_THRESHOLD = 50; // Minimum distance to trigger swipe
        
        // Apply transition class for smooth animations
        container.classList.add('transition-transform', 'duration-normal', 'ease-out');
        
        // Set WAI-ARIA attributes for accessibility
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-roledescription', 'carousel');
        
        items.forEach((item, index) => {
            item.setAttribute('role', 'group');
            item.setAttribute('aria-roledescription', 'slide');
            item.setAttribute('aria-label', `Slide ${index + 1} of ${itemCount}`);
            item.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
        });
        
        // Update carousel display
        function updateCarousel(skipAnimation = false) {
            if (skipAnimation) {
                container.classList.remove('transition-transform');
                requestAnimationFrame(() => {
                    setCarouselPosition();
                    requestAnimationFrame(() => {
                        container.classList.add('transition-transform');
                    });
                });
            } else {
                isAnimating = true;
                setCarouselPosition();
                
                // Reset animating flag after transition completes
                setTimeout(() => {
                    isAnimating = false;
                }, 300); // Match CSS transition duration
            }
            
            // Update ARIA attributes and classes
            items.forEach((item, index) => {
                const isActive = index === currentIndex;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
                indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
            });
            
            // Announce to screen readers
            const liveRegion = carousel.querySelector('.carousel-live-region') || 
                               createLiveRegion(carousel);
            liveRegion.textContent = `Slide ${currentIndex + 1} of ${itemCount}`;
        }
        
        // Set the carousel position based on currentIndex
        function setCarouselPosition() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Create live region for screen reader announcements
        function createLiveRegion(parent) {
            const region = document.createElement('div');
            region.className = 'carousel-live-region';
            region.setAttribute('aria-live', 'polite');
            region.setAttribute('aria-atomic', 'true');
            region.style.position = 'absolute';
            region.style.width = '1px';
            region.style.height = '1px';
            region.style.overflow = 'hidden';
            region.style.clip = 'rect(0 0 0 0)';
            parent.appendChild(region);
            return region;
        }
        
        // Navigate to previous slide
        function goToPrevSlide() {
            if (isAnimating) return;
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
            resetAutoplay();
        }
        
        // Navigate to next slide
        function goToNextSlide() {
            if (isAnimating) return;
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
            resetAutoplay();
        }
        
        // Navigate to specific slide
        function goToSlide(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        }
        
        // Set up autoplay if specified in data attribute
        function setupAutoplay() {
            const autoplayDelay = parseInt(carousel.dataset.autoplay, 10);
            if (autoplayDelay && !isNaN(autoplayDelay)) {
                startAutoplay(autoplayDelay);
                
                // Pause on hover
                carousel.addEventListener('mouseenter', pauseAutoplay);
                carousel.addEventListener('mouseleave', () => startAutoplay(autoplayDelay));
                
                // Pause on focus within carousel
                carousel.addEventListener('focusin', pauseAutoplay);
                carousel.addEventListener('focusout', () => startAutoplay(autoplayDelay));
            }
        }
        
        // Start autoplay with the given delay
        function startAutoplay(delay) {
            pauseAutoplay();
            autoplayInterval = setInterval(goToNextSlide, delay);
        }
        
        // Pause autoplay
        function pauseAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }
        
        // Reset autoplay - used after user interaction
        function resetAutoplay() {
            const autoplayDelay = parseInt(carousel.dataset.autoplay, 10);
            if (autoplayDelay && !isNaN(autoplayDelay)) {
                pauseAutoplay();
                startAutoplay(autoplayDelay);
            }
        }
        
        // Set up touch events for mobile swipe
        function setupTouchEvents() {
            carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
            carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
            carousel.addEventListener('touchend', handleTouchEnd);
        }
        
        // Handle touch start
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
            pauseAutoplay();
        }
        
        // Handle touch move
        function handleTouchMove(e) {
            touchEndX = e.touches[0].clientX;
        }
        
        // Handle touch end
        function handleTouchEnd() {
            const touchDiff = touchStartX - touchEndX;
            
            // Detect swipe with threshold
            if (Math.abs(touchDiff) > SWIPE_THRESHOLD) {
                if (touchDiff > 0) {
                    // Swipe left - go to next
                    goToNextSlide();
                } else {
                    // Swipe right - go to prev
                    goToPrevSlide();
                }
            }
            
            // Reset autoplay after interaction
            resetAutoplay();
        }
        
        // Set up keyboard navigation
        function setupKeyboardNavigation() {
            carousel.setAttribute('tabindex', '0');
            
            carousel.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowLeft':
                        goToPrevSlide();
                        e.preventDefault();
                        break;
                    case 'ArrowRight':
                        goToNextSlide();
                        e.preventDefault();
                        break;
                    case 'Home':
                        goToSlide(0);
                        e.preventDefault();
                        break;
                    case 'End':
                        goToSlide(itemCount - 1);
                        e.preventDefault();
                        break;
                }
            });
        }
        
        // Set up arrow controls
        function setupArrowControls() {
            arrows.forEach(arrow => {
                // Accessibility attributes
                arrow.setAttribute('role', 'button');
                
                if (arrow.classList.contains('carousel-arrow--left')) {
                    arrow.setAttribute('aria-label', 'Previous slide');
                    arrow.addEventListener('click', goToPrevSlide);
                } else {
                    arrow.setAttribute('aria-label', 'Next slide');
                    arrow.addEventListener('click', goToNextSlide);
                }
            });
        }
        
        // Set up indicator controls
        function setupIndicatorControls() {
            indicators.forEach((indicator, index) => {
                // Accessibility attributes
                indicator.setAttribute('role', 'button');
                indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
                indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
                
                indicator.addEventListener('click', () => goToSlide(index));
            });
        }
        
        // Initialize all event listeners and behaviors
        function init() {
            updateCarousel(true); // Initial position without animation
            setupArrowControls();
            setupIndicatorControls();
            setupTouchEvents();
            setupKeyboardNavigation();
            setupAutoplay();
            
            // Add resize listener to handle window size changes
            window.addEventListener('resize', LabUtils.debounce(() => {
                updateCarousel(true);
            }, 250));
        }
        
        // Start initialization
        init();
    }
}); 