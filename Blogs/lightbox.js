document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery images
    const images = document.querySelectorAll('img[src*="Wireframe"]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const captionText = document.querySelector('.caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.display = 'block';
        lightboxImg.src = images[currentIndex].src;
        captionText.textContent = images[currentIndex].alt || '';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
        captionText.textContent = images[currentIndex].alt || '';
        lightboxImg.classList.add('fade');
        setTimeout(() => lightboxImg.classList.remove('fade'), 300);
    }
    
    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
        captionText.textContent = images[currentIndex].alt || '';
        lightboxImg.classList.add('fade');
        setTimeout(() => lightboxImg.classList.remove('fade'), 300);
    }
    
    // Add click events to all gallery images
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });
    
    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Navigation events
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        }
    });
    
    // Optional: Add fade transition class
    const style = document.createElement('style');
    style.textContent = `
        .fade {
            animation: fade 0.3s;
        }
        @keyframes fade {
            from {opacity: 0.5;}
            to {opacity: 1;}
        }
    `;
    document.head.appendChild(style);
});