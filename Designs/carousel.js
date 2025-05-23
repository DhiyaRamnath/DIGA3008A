document.addEventListener('DOMContentLoaded', function() {

    const designsGrid = document.querySelector('.designs-grid');

    const designCards = Array.from(document.querySelectorAll('.design-card'));
    
    if (designCards.length === 0) return;
    
    const carousel = document.createElement('div');
    carousel.className = 'carousel-container';

    const track = document.createElement('div');
    track.className = 'carousel-track';

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button carousel-button--prev';
    prevButton.innerHTML = '&lt;';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button carousel-button--next';
    nextButton.innerHTML = '&gt;';
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
   
    designCards.forEach((card, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.appendChild(card.cloneNode(true));
        track.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    carousel.appendChild(prevButton);
    carousel.appendChild(track);
    carousel.appendChild(nextButton);
    carousel.appendChild(dotsContainer);
    
    designsGrid.parentNode.replaceChild(carousel, designsGrid);
    
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const slideCount = slides.length;
    let currentIndex = 0;
    
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dotIndex = parseInt(this.dataset.index);
            goToSlide(dotIndex);
        });
    });

    function goToSlide(index) {
        currentIndex = index;
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
    
    function goToPrevSlide() {
        if (currentIndex === 0) {
            goToSlide(slideCount - 1);
        } else {
            goToSlide(currentIndex - 1);
        }
    }
    
    function goToNextSlide() {
        if (currentIndex === slideCount - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    }
    
    // Auto-advance carousel (optional)
    let autoSlideInterval = setInterval(goToNextSlide, 5000);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(goToNextSlide, 5000);
    });
});