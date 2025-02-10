const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');

const noMessages = [
    "Are you sure? Love!!",
    "Pretty please?",
    "Don't be mean 😢 loveeeeeeee",
    "You're breaking my heart 💔",
    "Give it another thought! manu",
    "Is that your final answer? manu",
    "But we look so good together!",
    "I promise to buy you pizza!",
    "What about chocolate? 🍫 manu",
    "You're making me sad 😭 manu"
];

let messageIndex = 0;

// Function to move the No button randomly
function moveButton() {
    const padding = 20; // Padding from screen edges
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    // Get the maximum coordinates while keeping button fully visible
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    // Generate random coordinates within safe bounds
    const x = Math.min(Math.max(padding, Math.random() * maxX), maxX);
    const y = Math.min(Math.max(padding, Math.random() * maxY), maxY);
    
    noButton.style.position = 'fixed';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    
    // Change the button text
    noButton.textContent = noMessages[messageIndex];
    messageIndex = (messageIndex + 1) % noMessages.length;
}

// Move the button and change text when hovering over it
noButton.addEventListener('mouseover', moveButton);

// Also change text when clicking (in case they manage to click it)
noButton.addEventListener('click', moveButton);

// When Yes is clicked
yesButton.addEventListener('click', function() {
    // Show background image with fade-in effect
    const bgImage = document.querySelector('.background-image');
    bgImage.style.display = 'block';
    setTimeout(() => {
        bgImage.classList.add('show');
    }, 10);

    // Play background music
    const music = document.getElementById('backgroundMusic');
    music.volume = 0.5;
    music.play()
        .catch(error => console.log("Audio play failed:", error));

    // Hide the No button
    noButton.style.opacity = '0';
    noButton.style.transform = 'scale(0)';
    noButton.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        noButton.style.display = 'none';
    }, 500);

    // Create confetti
    const duration = 60 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);

    // Create love balloons
    function createLoveBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'love-balloon';
        
        // Random starting position at the bottom of the screen
        const startX = Math.random() * (window.innerWidth - 100); // Subtract balloon width to keep within screen
        balloon.style.left = `${startX}px`;
        balloon.style.bottom = '0';
        
        // Add random animation delay to make movement more natural
        balloon.style.animationDelay = `${Math.random() * 2}s, ${4 + Math.random() * 2}s`;
        
        document.body.appendChild(balloon);
    }

    // Create multiple balloons with slight delay
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            createLoveBalloon();
        }, i * 100);
    }

    // Change the GIF
    const heartContainer = document.querySelector('.heart-container');
    heartContainer.style.backgroundImage = "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmV6NnN0cHZ5ajYwaWJmN2E4YWhsaDAxbml1dTBtcXVma2Zkbjd2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif')";

    alert('Yay! Happy Valentine\'s Day! ❤️');
}); 