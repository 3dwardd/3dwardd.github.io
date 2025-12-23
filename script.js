const tree = document.getElementById('tree');
const message = document.getElementById('message');
const sparkles = document.getElementById('sparkles');

tree.addEventListener('click', (e) => {
  // Show message
  message.style.display = 'block';

  // Create sparkle at click position
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${e.pageX - 5}px`;
  sparkle.style.top = `${e.pageY - 5}px`;
  document.body.appendChild(sparkle);

  // Remove sparkle after animation
  setTimeout(() => sparkle.remove(), 1000);
});
