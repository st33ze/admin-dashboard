/* ========== HEADER ========== */
// Toggle search on small screens.
const header = document.querySelector('.header');
const searchButton = header.querySelector('.search-button');
const searchContainer = header.querySelector('.search-container');
const searchCloseButton = searchContainer.querySelector('.search-close');
searchButton.addEventListener('click', () => {
  searchContainer.classList.remove('animation-off');
  searchContainer.classList.add('search-container-show');
});
searchCloseButton.addEventListener('click', () => {
  searchContainer.classList.remove('search-container-show');
});

/* ========== SIDE MENU ========== */
// Toggle side menu on small screens.
const menuButton = header.querySelector('button[aria-label="Menu"]');
const menu = document.getElementById('side-menu');
const closeMenuButton = menu.querySelector('button[aria-label="Close menu"]');
menuButton.addEventListener('click', () => {
  menu.classList.remove('animation-off');
  menu.classList.add('side-menu-show');
});
closeMenuButton.addEventListener('click', () => menu.classList.remove('side-menu-show'));

/* ========== UTILITY ========== */
// Turn off animation on screen resize.
window.addEventListener('resize', () => {
  searchContainer.classList.add('animation-off');
  menu.classList.add('animation-off');
});