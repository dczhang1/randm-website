/**
 * PRISMA slideshow component
 * Shows ONE step of the literature search at a time,
 * auto-advancing like a simple carousel.
 */

document.addEventListener('DOMContentLoaded', () => {
    const prismaRoot = document.getElementById('prisma-flow');
    if (!prismaRoot) return;

    const slides = Array.from(prismaRoot.querySelectorAll('.prisma-slide'));
    const dots = Array.from(prismaRoot.querySelectorAll('.prisma-dot'));
    const stepLabel = prismaRoot.querySelector('.prisma-step-label');

    if (slides.length === 0) return;

    let currentIndex = 0;
    const slideDurationMs = 5500;
    let timerId = null;

    function setActiveSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (stepLabel) {
            stepLabel.textContent = `Step ${index + 1} of ${slides.length}`;
        }

        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        setActiveSlide(nextIndex);
    }

    function startAutoPlay() {
        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setInterval(nextSlide, slideDurationMs);
    }

    // Allow clicking dots to jump to a step
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveSlide(index);
            startAutoPlay();
        });
    });

    // Initial state
    setActiveSlide(0);
    startAutoPlay();
});
