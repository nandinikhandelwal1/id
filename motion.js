const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('header nav');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
}));

if (window.matchMedia('(max-width: 800px)').matches) {
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-dock" aria-label="Quick navigation"><a href="#top"><span class="dock-icon home-icon"><svg viewBox="0 0 24 24"><path d="m4 10 8-6 8 6v10H4Z"></path></svg></span>Home</a><a href="#about"><span class="dock-icon about-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="9" r="2"></circle><path d="M8.5 17c.8-2 2-3 3.5-3s2.7 1 3.5 3"></path></svg></span>About</a><a href="#project"><span class="dock-icon work-icon"><svg viewBox="0 0 24 24"><path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z"></path></svg></span>Work</a><a href="#contact"><span class="dock-icon contact-icon"><svg viewBox="0 0 24 24"><path d="M5 19 19 5M9 5h10v10"></path></svg></span>Contact</a></div>`);
}

const drawingImage = document.querySelector('#drawing-sheet-image');
const drawingTitle = document.querySelector('#drawing-pdf-title');
const drawingRoomImage = document.querySelector('#drawing-room-image');
const renderTitle = document.querySelector('#render-title');
const drawingImages = {
  'Flooring layout': 'assets/drawings/web/flooring.png',
  'Living elevation I': 'assets/drawings/web/living-1.png',
  'Living elevation II': 'assets/drawings/web/living-2.png',
  'Kitchen elevation': 'assets/drawings/web/kitchen.png',
  'Bedroom elevation': 'assets/drawings/web/bedroom.png',
  'Guest bedroom plan': 'assets/drawings/web/guest-bedroom-plan.png'
};
const drawingRenders = {
  'Flooring layout': ['assets/drawings/placeholders/apartment-study.svg', 'Complete apartment study'],
  'Living elevation I': ['assets/drawings/placeholders/living-i.svg', 'Living I rendered placeholder'],
  'Living elevation II': ['assets/drawings/placeholders/living-ii.svg', 'Living II rendered placeholder'],
  'Kitchen elevation': ['assets/drawings/placeholders/kitchen.svg', 'Kitchen rendered placeholder'],
  'Bedroom elevation': ['assets/drawings/placeholders/bedroom.svg', 'Bedroom rendered placeholder'],
  'Guest bedroom plan': ['assets/drawings/placeholders/guest-bedroom.svg', 'Guest bedroom rendered placeholder']
};

document.querySelectorAll('.drawing-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    const title = button.dataset.pdfTitle;
    document.querySelectorAll('.drawing-tabs button').forEach((item) => item.classList.toggle('is-active', item === button));
    button.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.drawing-tabs button:not(.is-active)').forEach((item) => item.setAttribute('aria-selected', 'false'));
    drawingImage.src = drawingImages[title];
    drawingImage.alt = `Full ${title} AutoCAD drawing`;
    drawingTitle.textContent = title;
    const [renderSource, modelTitle] = drawingRenders[title];
    renderTitle.textContent = modelTitle;
    drawingRoomImage.src = renderSource;
    drawingRoomImage.alt = `${modelTitle} from the AutoCAD drawing`;
  });
});

const bookPageImage = document.querySelector('#book-page-image');
const bookPageStatus = document.querySelector('#book-page-status');
const bookPrevious = document.querySelector('#book-previous');
const bookNext = document.querySelector('#book-next');
const bookPageCount = 15;
let bookPage = 1;

const renderBookPage = () => {
  const number = String(bookPage).padStart(2, '0');
  bookPageImage.src = `assets/projects/sculpted-savannah/pages/page-${number}.jpg`;
  bookPageImage.alt = `South Africa project book page ${bookPage} of ${bookPageCount}`;
  bookPageStatus.textContent = `Page ${bookPage} of ${bookPageCount}`;
  bookPrevious.disabled = bookPage === 1;
  bookNext.disabled = bookPage === bookPageCount;
  document.querySelectorAll('.book-page-dots span').forEach((dot, index) => dot.classList.toggle('is-active', index + 1 === bookPage));
};

if (bookPageImage) {
  document.querySelector('.book-page-dots').innerHTML = Array.from({ length: bookPageCount }, (_, index) => `<span class="${index === 0 ? 'is-active' : ''}"></span>`).join('');
  bookPrevious.addEventListener('click', () => { if (bookPage > 1) { bookPage -= 1; renderBookPage(); } });
  bookNext.addEventListener('click', () => { if (bookPage < bookPageCount) { bookPage += 1; renderBookPage(); } });
}

// Keep ordinary mouse-wheel scrolling on the page while leaving touch pinch
// gestures available to model-viewer for zooming.
window.addEventListener('wheel', (event) => {
  if (event.target.closest?.('model-viewer') && !event.ctrlKey) event.stopImmediatePropagation();
}, { capture: true, passive: true });

const socialIcons = {
  Instagram: '<img src="https://api.iconify.design/simple-icons:instagram.svg?color=%231f292b" alt="" aria-hidden="true">',
  LinkedIn: '<img src="https://api.iconify.design/simple-icons:linkedin.svg?color=%231f292b" alt="" aria-hidden="true">',
  WhatsApp: '<img src="https://api.iconify.design/simple-icons:whatsapp.svg?color=%231f292b" alt="" aria-hidden="true">'
};

document.querySelectorAll('.social-links a').forEach((link) => {
  const name = link.textContent.trim().split(' ')[0];
  if (socialIcons[name]) link.innerHTML = `${socialIcons[name]}<span>${name}</span><b>↗</b>`;
});

document.querySelectorAll('b').forEach((arrow) => {
  if (arrow.textContent.includes('↗') || arrow.closest('.contact-link')) {
    arrow.innerHTML = '<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10"></path></svg>';
  }
});

const revealItems = document.querySelectorAll('section, .project-kicker, .contact-link');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 12% 0px' });
  revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 60}ms`);
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

window.setTimeout(() => revealItems.forEach((item) => item.classList.add('is-visible')), 700);
