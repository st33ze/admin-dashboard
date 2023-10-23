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
// Turn off animation on screen resize.
window.addEventListener('resize', () => {
  searchContainer.classList.add('animation-off');
});