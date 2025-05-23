document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    let isScrolling;
    window.addEventListener('scroll', function() {
        // Calculate scroll progress
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;
        const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;
        
        // Update progress bar
        progressBar.style.width = scrollPercent + '%';
        
        // Add/remove active class for visual feedback
        progressBar.classList.toggle('active', scrollPercent > 5);
        
        // Clear timeout while scrolling
        window.clearTimeout(isScrolling);
        
        // Add fading effect when scrolling stops
        isScrolling = setTimeout(function() {
            progressBar.classList.remove('active');
        }, 1000);
    }, false);
});