const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('hoofd-menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('open');
  hamburger.textContent = menu.classList.contains('open') ? '✕' : '☰';
});