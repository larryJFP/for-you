document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const modal = document.getElementById('modal');
    const container = document.querySelector('.container');
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('startBtn');
    const musicContainer = document.getElementById('music-container');

    // Start Button - Fix for Autoplay
    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        // Inject iframe now that we have user interaction
        musicContainer.innerHTML = '<iframe width="0" height="0" src="https://youtu.be/nLnp0tpZ0ok?si=pw43Bv55Idnm1GT_" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    });

    // Petal Generator
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Random properties
        const startLeft = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
        const size = Math.random() * 10 + 10 + 'px'; // 10-20px

        petal.style.left = startLeft + 'px';
        petal.style.animationDuration = animationDuration;
        petal.style.width = size;
        petal.style.height = size;

        document.body.appendChild(petal);

        // Remove after animation
        setTimeout(() => {
            petal.remove();
        }, parseFloat(animationDuration) * 1000);
    }

    setInterval(createPetal, 300);

    // Runaway No Button
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton); // For mobile

    function moveButton() {
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate available space within the container (or window if preferred, but container keeps it near)
        // Let's move it anywhere in the window to be safe and more fun, but keep it visible

        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        // Use fixed positioning to break out of the flex flow visually while keeping DOM structure
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }

    // Yes Button Click
    yesBtn.addEventListener('click', () => {
        modal.style.display = 'flex';

        // Try to unmute/play video if blocked (though iframe usually handles its own state)
        // We can't easily control the iframe volume from here without the API, 
        // but the user interaction (click) counts for autoplay policies if we were using Audio()
    });
});
