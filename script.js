const button = document.getElementById('actionBtn');
const output = document.getElementById('output');

button.addEventListener('click', () => {
  output.textContent = "You clicked the button!";
});
