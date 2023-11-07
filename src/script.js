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

/* ========== MAIN SECTION ========== */
// Projects section scroll.
const projects = document.querySelector('.projects ul');
const projectsCount = projects.childElementCount;
const project = projects.querySelector('li');
const navBtnLeft = document.querySelector('.projects nav button[data-direction="left"]');
const navBtnRight = document.querySelector('.projects nav button[data-direction="right"]');
const navBtns = [navBtnLeft, navBtnRight];

let scrolling = false;
function scroll(direction) {
  if (scrolling) return;
  scrolling = true;
  const cardWidth = project.offsetWidth;
  const gap = parseInt(window.getComputedStyle(projects).columnGap);
  const translateX = cardWidth + gap;
  let currentProject = parseInt(projects.getAttribute('data-current'));
  if (direction === 'left' && currentProject !== 1) {
    projects.scrollLeft -= translateX;
    currentProject--;
    projects.setAttribute('data-current', currentProject);
  } else if (direction == 'right' && currentProject !== projectsCount) {
    projects.scrollLeft += translateX;
    currentProject++;
    projects.setAttribute('data-current', currentProject);
  }
  if (currentProject === 1) navBtnLeft.classList.add('hidden');
  else if (currentProject === projectsCount) navBtnRight.classList.add('hidden');
  else navBtns.forEach(btn => btn.classList.remove('hidden'));
  setTimeout(() => {scrolling = false}, 500);
}

navBtns.forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-direction');
    scroll(direction);
  });
});
projects.addEventListener('wheel', (e) => {
  e.deltaY > 0 ? scroll('right'): scroll('left');
});

/* ========== UTILITY ========== */
window.addEventListener('resize', () => {
  // Turn off animation.
  searchContainer.classList.add('animation-off');
  menu.classList.add('animation-off');
  // Reset scroll position.
  projects.setAttribute('data-current', 1);
  navBtnLeft.classList.add('hidden');
  projects.scrollLeft = 0;
});