document.addEventListener('DOMContentLoaded', function() {
    initCarousel('.wireframe-gallery', '.wireframe-item');
    initCarousel('.styleguide-gallery', '.styleguide-item');
});

function initCarousel(gallerySelector, itemSelector) {
    const gallery = document.querySelector(gallerySelector);
    if (!gallery) return; 
    
    const items = document.querySelectorAll(`${gallerySelector} ${itemSelector}`);
    const itemCount = items.length;
    if (itemCount === 0) return;
    
    let currentIndex = 0;
    
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev';
    prevButton.innerHTML = '&lt;';
    prevButton.addEventListener('click', () => showPrevItem(gallerySelector, itemSelector));
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next';
    nextButton.innerHTML = '&gt;';
    nextButton.addEventListener('click', () => showNextItem(gallerySelector, itemSelector));
    
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    
    for (let i = 0; i < itemCount; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => showItem(gallerySelector, itemSelector, i));
        indicators.appendChild(indicator);
    }
    
    gallery.insertAdjacentElement('afterend', indicators);
    gallery.insertAdjacentElement('beforebegin', prevButton);
    gallery.insertAdjacentElement('beforebegin', nextButton);
    
    updateCarousel(gallerySelector, itemSelector, 0);
    
    document.addEventListener('keydown', function(e) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        
        if (e.key === 'ArrowLeft') {
            showPrevItem(gallerySelector, itemSelector);
        } else if (e.key === 'ArrowRight') {
            showNextItem(gallerySelector, itemSelector);
        }
    });
}

function showPrevItem(gallerySelector, itemSelector) {
    const items = document.querySelectorAll(`${gallerySelector} ${itemSelector}`);
    const itemCount = items.length;
    const indicators = document.querySelectorAll(`${gallerySelector} + .carousel-indicators .indicator`);
    
    let currentIndex = Array.from(items).findIndex(item => window.getComputedStyle(item).display !== 'none');
    if (currentIndex === -1) currentIndex = 0;
    
    currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    updateCarousel(gallerySelector, itemSelector, currentIndex);
}

function showNextItem(gallerySelector, itemSelector) {
    const items = document.querySelectorAll(`${gallerySelector} ${itemSelector}`);
    const itemCount = items.length;
    const indicators = document.querySelectorAll(`${gallerySelector} + .carousel-indicators .indicator`);
    
    let currentIndex = Array.from(items).findIndex(item => window.getComputedStyle(item).display !== 'none');
    if (currentIndex === -1) currentIndex = 0;
    
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel(gallerySelector, itemSelector, currentIndex);
}

function showItem(gallerySelector, itemSelector, index) {
    updateCarousel(gallerySelector, itemSelector, index);
}

function updateCarousel(gallerySelector, itemSelector, currentIndex) {
    const items = document.querySelectorAll(`${gallerySelector} ${itemSelector}`);
    const indicators = document.querySelectorAll(`${gallerySelector} + .carousel-indicators .indicator`);
    
    items.forEach(item => {
        item.style.display = 'none';
    });

    items[currentIndex].style.display = 'block';
    
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}