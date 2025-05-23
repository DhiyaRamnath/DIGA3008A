document.addEventListener('DOMContentLoaded', function() {
    const branches = document.querySelectorAll('.decorative-branch');
    
    if (branches.length > 0 && window.matchMedia('(hover: hover)').matches) {
        branches.forEach((branch, index) => {
            branch.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        });

        document.addEventListener('mousemove', (e) => {
            const xPercentage = e.clientX / window.innerWidth;
            const yPercentage = e.clientY / window.innerHeight;
            
            branches.forEach((branch, index) => {
                const xMultiplier = index === 0 ? -1 : 1;
                const rotation = xPercentage * 12 * xMultiplier; 
const translateY = yPercentage * 30 * 0.5; 
                
                branch.style.transform = `
                    ${index === 0 ? 'translateX(-25%)' : 'translateX(25%)'}
                    rotate(${5 + rotation}deg)
                    translateY(${translateY}px)
                `;
            });
        });

        document.addEventListener('mouseleave', () => {
            branches.forEach((branch, index) => {
                branch.style.transform = `
                    ${index === 0 ? 'translateX(-25%) rotate(5deg)' : 'translateX(25%) rotate(-5deg)'}
                `;
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});


