// Get references once (efficient)
const bgImage = document.getElementById('bgImage');            // Fullscreen background image
const sparkleLayer = document.getElementById('sparkleLayer');  // Sparkles overlay
const greeting = document.getElementById('greeting');          // “MERRY CHRISTMAS, NAME!!!”
const hint = document.getElementById('hint');                  // “Press anywhere ✨”
const notes = document.getElementById('notes');                // Container for ephemeral messages
const inputBox = document.getElementById('inputBox');          // Name input panel
const nameInput = document.getElementById('nameInput');        // Name field
const startBtn = document.getElementById('startBtn');          // Start button

let started = false;       // Tracks if personalization is complete
let messageIndex = 0;      // Cycles through quotes

// 12 joyful messages (randomized across taps)
const quotes = [
  "You make this Christmas season unforgettable.",
  "Your smile is the brightest light on this holiday.",
  "May joy wrap you up like the coziest winter blanket.",
  "You’re the warm glow in this chilly Christmas night.",
  "Every snowflake feels happier because of you.",
  "Hope your heart twinkles like the star on top.",
  "You’re the gift that makes the season magical.",
  "Wishing you laughter, warmth, and wonder tonight.",
  "Your kindness is the best Christmas story.",
  "You light up the season in the sweetest way.",
  "May love find you like snow finds the rooftops.",
  "Thank you for making this year feel like a miracle."
];

// Start: capture name, hide the input, show greeting + hint
startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim(); // Read name
  if (!name) return;                   // Ignore empty input

  // Personalize greeting and reveal it
  greeting.textContent = `🎄 MERRY CHRISTMAS, ${name.toUpperCase()}!!! 🎄`; // Big greeting
  greeting.classList.add('show');      // Fade in

  // Show hint under greeting
  hint.classList.add('show');          // “Press anywhere ✨”

  // Hide the input line
  inputBox.style.display = 'none';     // Remove input panel
  started = true;                      // Ready for interactions
});

// Unified tap/click handler on the image
bgImage.addEventListener('pointerdown', (e) => {
  if (!started) return;       // Only work after start
  e.preventDefault();         // Better mobile behavior

  // Sparkle burst at tap point
  createSparkles(e);          // Visual feedback

  // Show a randomized joyful message that vanishes after 5s
  showRandomNote();           // Ephemeral note
});

// Create sparkles near the tap location
function createSparkles(e) {
  const rect = bgImage.getBoundingClientRect();       // Image bounds
  const x = e.clientX - rect.left;                    // Tap X inside image
  const y = e.clientY - rect.top;                     // Tap Y inside image

  for (let i = 0; i < 12; i++) {                      // 12 sparkles feels lively
    const s = document.createElement('div');          // Create sparkle element
    s.className = 'sparkle';                          // Style class

    // Random spread and size
    const angle = Math.random() * Math.PI * 2;        // Direction
    const radius = 10 + Math.random() * 36;           // Distance from center
    const size = 6 + Math.random() * 10;              // Sparkle size

    // Position centered at (x, y)
    s.style.left = `${x + Math.cos(angle) * radius - size / 2}px`; // Horizontal placement
    s.style.top  = `${y + Math.sin(angle) * radius - size / 2}px`; // Vertical placement
    s.style.width = `${size}px`;                                    // Width
    s.style.height = `${size}px`;                                   // Height

    sparkleLayer.appendChild(s);                       // Add to overlay
    setTimeout(() => s.remove(), 1100);               // Cleanup after fade
  }
}

// Show one random note and auto-remove after 5 seconds
function showRandomNote() {
  // Pick a message index (shuffle by walking the array)
  const text = quotes[messageIndex % quotes.length];  // Cycled selection
  messageIndex++;                                     // Advance for next tap

  const note = document.createElement('div');         // Create message bubble
  note.className = 'note';                            // Style for animation
  note.textContent = text;                            // Set content

  notes.appendChild(note);                            // Add below greeting
  setTimeout(() => note.remove(), 5000);              // Auto-vanish after 5s
}
