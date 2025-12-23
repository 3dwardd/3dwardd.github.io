/* Get DOM references once (efficient) */
const treeWrap = document.getElementById('treeWrap');   // Positioned container for image + sparkles
const tree = document.getElementById('tree');           // Your Christmas tree image
const sparkleLayer = document.getElementById('sparkleLayer'); // Overlay layer where sparkles are added
const message = document.getElementById('message');     // Hidden message to reveal

/* Unified input handler: works for mouse, touch, and pen */
tree.addEventListener('pointerdown', (e) => {
  e.preventDefault();               // Prevent default (helps on mobile)
  triggerEffects(e);                // Run sparkle + shake + message
});

/* Main interaction: creates sparkles, shakes the tree, reveals message */
function triggerEffects(e) {
  // 1) Reveal message (adds .show class for smooth fade)
  message.classList.add('show');

  // 2) Shake the tree briefly (adds .shake then removes)
  tree.classList.add('shake');
  setTimeout(() => tree.classList.remove('shake'), 450); // Remove after animation

  // 3) Create a sparkle burst near the tap/click location
  // Calculate position relative to the tree container
  const rect = treeWrap.getBoundingClientRect();                 // Container bounds
  const x = e.clientX - rect.left;                               // X inside container
  const y = e.clientY - rect.top;                                // Y inside container

  makeSparkleBurst(x, y, 10); // 10 sparkles feels lively but not messy
}

/* Create multiple sparkles around a point (x, y) */
function makeSparkleBurst(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div'); // Create sparkle element
    s.className = 'sparkle';

    // Randomize spread and size for natural look
    const angle = Math.random() * Math.PI * 2;          // Random direction in radians
    const radius = 8 + Math.random() * 22;              // Distance from center (px)
    const sx = x + Math.cos(angle) * radius;            // Sparkle X position
    const sy = y + Math.sin(angle) * radius;            // Sparkle Y position
    const size = 6 + Math.random() * 10;                // Random size (px)

    // Place and size the sparkle
    s.style.left = `${sx - size / 2}px`;                // Center horizontally
    s.style.top = `${sy - size / 2}px`;                 // Center vertically
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;

    // Add sparkle to overlay
    sparkleLayer.appendChild(s);

    // Cleanup after animation finishes (800ms in CSS + small buffer)
    setTimeout(() => s.remove(), 1000);
  }
}
