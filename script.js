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

// Add this function after your existing code
function createLoveMessage() {
    const messages = [
        "I Love You! ❤️",
        "Forever Yours! 💑",
        "Be Mine! 💘",
        "My Valentine! 💖",
        "Love You Manu! 💝"
    ];
    
    const loveMessages = document.getElementById('loveMessages');
    const text = document.createElement('div');
    text.className = 'love-text';
    text.textContent = messages[Math.floor(Math.random() * messages.length)];
    
    // Random position and movement
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const moveX = (Math.random() - 0.5) * 300;
    const moveY = -Math.random() * 300;
    
    text.style.left = `${startX}px`;
    text.style.top = `${startY}px`;
    text.style.setProperty('--moveX', `${moveX}px`);
    text.style.setProperty('--moveY', `${moveY}px`);
    
    loveMessages.appendChild(text);
    
    // Remove the element after animation
    setTimeout(() => {
        text.remove();
    }, 4000);
}

// Add this function to create fireworks
function createFirework() {
    const colors = [
        '#ff0000', '#ffa500', '#ffff00', '#ff69b4', 
        '#00ff00', '#0000ff', '#4b0082', '#ee82ee',
        '#ff4d4d', '#ffb3b3', '#ffd700'
    ];
    
    const firework = document.createElement('div');
    firework.className = 'firework';
    const color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.color = color;
    
    // Random position for launch
    const startX = Math.random() * window.innerWidth;
    const endX = startX + (Math.random() - 0.5) * 200;
    const endY = window.innerHeight * 0.2 + Math.random() * window.innerHeight * 0.3;
    
    firework.style.left = `${startX}px`;
    firework.style.bottom = '0';
    document.body.appendChild(firework);
    
    // Add trail
    const trail = document.createElement('div');
    trail.className = 'firework-trail';
    trail.style.color = color;
    firework.appendChild(trail);
    
    // Animate launch
    const launchDuration = 1000;
    const launch = firework.animate([
        { transform: 'translateY(0)' },
        { transform: `translate(${endX - startX}px, -${endY}px)` }
    ], {
        duration: launchDuration,
        easing: 'ease-out'
    });
    
    // Create explosion
    launch.onfinish = () => {
        // Create particles
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;
            
            // Random direction and distance
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100 + Math.random() * 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            
            firework.appendChild(particle);
        }
        
        // Remove firework after explosion
        setTimeout(() => {
            firework.remove();
        }, 1000);
    };
}

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

    // Create confetti with sound
    const duration = 30 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 0 };
    const confettiSound = document.getElementById('confettiSound');

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Play confetti sound (with reduced volume)
        confettiSound.volume = 0.3;
        confettiSound.currentTime = 0;
        confettiSound.play()
            .catch(error => console.log("Confetti sound failed:", error));
        
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

    // Create floating love messages
    setInterval(createLoveMessage, 500);  // Create new message every 500ms

    // Show the spotlight effect after a delay
    setTimeout(() => {
        const spotlight = document.getElementById('spotlight');
        spotlight.style.display = 'block';
        setTimeout(() => {
            spotlight.classList.add('show');
        }, 10);

        // Hide spotlight after 5 seconds
        setTimeout(() => {
            spotlight.classList.remove('show');
            setTimeout(() => {
                spotlight.style.display = 'none';
            }, 1000);
        }, 5000);
    }, 1000);

    // Update the fireworks creation in the Yes click handler
    const fireworksInterval = setInterval(() => {
        createFirework();
        setTimeout(() => createFirework(), 200); // Create two fireworks with slight delay
    }, 1000); // Launch pair of fireworks every second

    // Stop fireworks after 30 seconds
    setTimeout(() => {
        clearInterval(fireworksInterval);
    }, 30000);
}); 