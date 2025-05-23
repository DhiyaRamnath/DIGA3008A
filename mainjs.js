const branches = document.querySelectorAll('.decorative-branch');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    branches.forEach((branch, index) => {
        const xOffset = index === 0 ? -20 : 20;
        branch.style.transform = `translateX(${xOffset}px) rotate(${x * 5}deg) translateY(${y * 10}px)`;
    });
});