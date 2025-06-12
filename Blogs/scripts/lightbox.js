document.addEventListener('DOMContentLoaded', function() {
    const imageGroups = {
        wireframes: {
            selector: 'img[src*="Wireframe"], .wireframe-grid img',
            name: 'Wireframe'
        },
        inspiration: {
            selector: '.inspiration-links img, .inspiration-item img',
            name: 'Inspiration'
        }
    };

    const lightbox = document.getElementById('lightbox') || createLightbox();
    const lightboxImg = document.getElementById('lightbox-image');
    const captionText = document.querySelector('.caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentImages = [];
    let currentIndex = 0;

    function createLightbox() {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.className = 'lightbox';
        lb.innerHTML = `
            <span class="close">&times;</span>
            <img class="lightbox-content" id="lightbox-image">
            <a class="prev">&#10094;</a>
            <a class="next">&#10096;</a>
            <div class="caption"></div>
            <div class="image-group-name"></div>
        `;
        document.body.appendChild(lb);
        return lb;
    }

    function initImageGroups() {
        for (const group in imageGroups) {
            const images = document.querySelectorAll(imageGroups[group].selector);
            images.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.dataset.group = group;
                img.dataset.index = index;
                
                img.addEventListener('click', function() {
                    openLightbox(this.dataset.group, parseInt(this.dataset.index));
                });
            });
        }
    }

    function openLightbox(group, index) {
        currentImages = Array.from(document.querySelectorAll(imageGroups[group].selector));
        currentIndex = index;
        lightbox.style.display = 'block';
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
      
        const groupNameElement = document.querySelector('.image-group-name');
        if (groupNameElement) {
            groupNameElement.textContent = imageGroups[group].name;
        }
    }

    function updateLightboxImage() {
        lightboxImg.src = currentImages[currentIndex].src;
        captionText.textContent = currentImages[currentIndex].alt || '';
        lightboxImg.classList.add('fade');
        setTimeout(() => lightboxImg.classList.remove('fade'), 300);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }

    initImageGroups();

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

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

    let isZoomed = false;
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
        isZoomed = !isZoomed;
        this.style.transform = isZoomed ? 'scale(2)' : 'scale(1)';
        this.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
        this.style.transition = 'transform 0.3s ease';
    });

    lightboxImg.addEventListener('load', function() {
        this.style.transform = 'scale(1)';
        isZoomed = false;
    });
});