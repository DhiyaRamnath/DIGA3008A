document.addEventListener('DOMContentLoaded', function() {
    const branches = document.querySelectorAll('.decorative-branch');
    
    if (branches.length > 0 && window.matchMedia('(hover: hover)').matches) {
        branches.forEach((branch, index) => {
            branch.style.transition = 'transform 1.5s ease-out';
        });

        document.addEventListener('mousemove', (e) => {
            const xPercentage = e.clientX / window.innerWidth;
            const yPercentage = e.clientY / window.innerHeight;

            branches.forEach((branch, index) => {
                const xMultiplier = index === 0 ? -1 : 1; 
                const yMultiplier = 0.5;
                const rotation = xPercentage * 5 * xMultiplier;
                const translateY = yPercentage * 20 * yMultiplier;
                
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