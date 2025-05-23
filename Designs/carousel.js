document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.wireframe-gallery');
    const items = document.querySelectorAll('.wireframe-item');
    const itemCount = items.length;
    let currentIndex = 0;
    
    // Set up carousel structure
    function initCarousel() {
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-button prev';
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', showPrevItem);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-button next';
        nextButton.innerHTML = '&gt;';
        nextButton.addEventListener('click', showNextItem);
        
        // Create indicators
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        for (let i = 0; i < itemCount; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => showItem(i));
            indicators.appendChild(indicator);
        }
        
        // Insert controls
        gallery.insertAdjacentElement('afterend', indicators);
        gallery.insertAdjacentElement('beforebegin', prevButton);
        gallery.insertAdjacentElement('beforebegin', nextButton);
        
        // Set initial state
        updateCarousel();
    }
    
    // Show previous item
    function showPrevItem() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    // Show next item
    function showNextItem() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    // Show specific item
    function showItem(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Update carousel display
    function updateCarousel() {
        // Hide all items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Show current item
        items[currentIndex].style.display = 'block';
        
        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Initialize the carousel
    initCarousel();
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showPrevItem();
        } else if (e.key === 'ArrowRight') {
            showNextItem();
        }
    });
});