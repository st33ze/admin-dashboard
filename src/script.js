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
function scrollable(direction, container) {
  const maxScroll = container.scrollWidth - container.clientWidth;
  return (direction === 'right' && (container.scrollLeft < maxScroll)) ||
         (direction === 'left' && container.scrollLeft > 0);
}
let scrolling = false;
async function scroll(direction, container) {
  if (scrolling || !scrollable(direction, container)) return;
  scrolling = true;
  const card = container.firstElementChild;
  const gap  = parseInt(window.getComputedStyle(container).columnGap);
  const translateX = direction === 'left' ? -(card.offsetWidth + gap): card.offsetWidth + gap;
  container.scrollLeft += translateX;
  return new Promise((resolve) => {
    const scrollEndHandler = () => {
      container.removeEventListener('scrollend', scrollEndHandler);
      scrolling = false;
      console.log(container.scrollLeft, container.scrollWidth - container.clientWidth);
      resolve(container.scrollLeft);
    };
    container.addEventListener('scrollend', scrollEndHandler);
  });
}
// Projects section scroll.
const projects = document.querySelector('.projects ul');
const navBtnLeft = document.querySelector('.projects nav button[data-direction="left"]');
const navBtnRight = document.querySelector('.projects nav button[data-direction="right"]');
const navBtns = [navBtnLeft, navBtnRight];
const projectsTotal = projects.childElementCount;
let currentProjectID = 1;
/**
 * Controls display of the navigation buttons.
 */
function controlNavDisplay(scrollPos) {
  // console.log(scrollPos);
  if (scrollPos <= 0) navBtnLeft.classList.remove('active');
  else if (scrollPos + projects.clientWidth >= projects.scrollWidth) navBtnRight.classList.remove('active');
  else navBtns.forEach(btn => btn.classList.add('active'));
}
function updateCurrentProjectID(direction) {
  if (direction === 'left' && currentProjectID > 1) currentProjectID--;
  else if (direction === 'right' && currentProjectID <  projectsTotal) currentProjectID++;
}
navBtns.forEach(button => {
  button.addEventListener('click', async () => {
    const direction = button.getAttribute('data-direction');
    const scrollPos = await scroll(direction, projects);
    if (scrollPos !== undefined) {
      controlNavDisplay(scrollPos);
      updateCurrentProjectID(direction);
    }
  });
});
projects.addEventListener('wheel', async (e) => {
  const direction = e.deltaY > 0 ? 'right': 'left';
  const scrollPos = await scroll(direction, projects);
  if (scrollPos !== undefined) {
    controlNavDisplay(scrollPos);
    updateCurrentProjectID(direction);
  }
});

// Announcements page indicatiors show.
const indicators = document.querySelector('.announcements .page-indicators');
const announcements = document.querySelector('.announcements ul');
const fragment = document.createDocumentFragment();
if (announcements.children.length > 1) {
  Array.from(announcements.children).forEach(annoucement => {
    const div = document.createElement('div');
    fragment.appendChild(div);
  });
  fragment.firstChild.classList.add('indicator-active');
  indicators.appendChild(fragment);  
  // Append copy of first annoucement at the end.
  const firstAnnoucementCopy = announcements.children[0].cloneNode(true);
  announcements.appendChild(firstAnnoucementCopy);
}
// Annoucements section scroll.
let currentAnnoucementID = 0;
const numAnnoucments = announcements.childElementCount;
announcements.addEventListener('click', async () => {
  const scrollPos = await scroll('right', announcements);
  if (scrollPos !== undefined) {
    currentAnnoucementID++;
    if (currentAnnoucementID === numAnnoucments-1) {
      indicators.children[numAnnoucments-2].classList.remove('indicator-active');
      indicators.children[0].classList.add('indicator-active');
      currentAnnoucementID = 0;
      announcements.classList.add('smooth-scroll-off');
      announcements.scrollLeft = 0;
      announcements.classList.remove('smooth-scroll-off');
      return;
    }
    indicators.children[currentAnnoucementID-1].classList.remove('indicator-active');
    indicators.children[currentAnnoucementID].classList.add('indicator-active');
  }
});



/* ========== UTILITY ========== */
window.addEventListener('resize', () => {
  // Turn off animation.
  searchContainer.classList.add('animation-off');
  menu.classList.add('animation-off');
});