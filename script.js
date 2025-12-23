const bgImage = document.getElementById('bgImage');
const sparkleLayer = document.getElementById('sparkleLayer');
const message = document.getElementById('message');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');

let name = '';
let messageIndex = 0;
let started = false;

// Joyful quotes/messages
const quotes = [
  "You make this season brighter!",
  "Wishing you warmth, joy, and love!",
  "You're the sparkle in my snow!",
  "Hope your heart glows like Christmas lights!",
  "You're a gift to everyone around you!",
  "May your smile shine brighter than the star on top!",
  "Sending hugs wrapped in holiday magic!",
  "You're the reason this season feels special!",
  "Let joy snow all around you!",
  "You're my favorite Christmas miracle!"
];

// Start button: capture name and show first message
startBtn.addEventListener('click', () => {
  name = nameInput.value.trim();
  if (name) {
    message.textContent = `🎄 MERRY CHRISTMAS, ${name.toUpperCase()}!!! 🎄`;
    message.classList.add('show');
    started = true;
  }
});

// Tap anywhere on image
bgImage.addEventListener('pointerdown', (e) => {
  if (!started) return;

  // Sparkle burst
  createSparkles(e);

  // Cycle through joyful quotes
  message.textContent = quotes[messageIndex % quotes.length];
  messageIndex++;
  message.classList.add('show');
});

// Sparkle burst effect
function createSparkles(e) {
  const rect = bgImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const angle = Math.random() * 2 * Math.PI;
    const radius = 30 * Math.random();
    sparkle.style.left = `${x + Math.cos(angle) * radius}px`;
    sparkle.style.top = `${y + Math.sin(angle) * radius}px`;
    sparkleLayer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}
