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
const mainModel = document.querySelector('.main-model-shell model-viewer');

// Restore a warmer, presentation-ready material response for the imported model.
// The source scene contains the detailed meshes, but some viewers flatten its
// material values. These small, name-based adjustments keep screens readable
// and give wood, metal, glass and fabrics believable roughness in the browser.
mainModel?.addEventListener('load', () => {
  const materials = mainModel.model?.materials || [];
  materials.forEach((material) => {
    const key = `${material.name || ''}`.toLowerCase();
    const pbr = material.pbrMetallicRoughness;
    if (!pbr) return;
    if (/(screen|tv|television|display|monitor)/.test(key)) {
      pbr.setBaseColorFactor([0.012, 0.018, 0.022, 1]);
      pbr.setMetallicFactor(0.28);
      pbr.setRoughnessFactor(0.16);
      if ('emissiveFactor' in material) material.emissiveFactor = [0.015, 0.025, 0.035];
    } else if (/(wood|oak|walnut|timber|veneer)/.test(key)) {
      pbr.setMetallicFactor(0.02);
      pbr.setRoughnessFactor(0.38);
    } else if (/(metal|steel|chrome|brass|gold|handle|fixture)/.test(key)) {
      pbr.setMetallicFactor(0.82);
      pbr.setRoughnessFactor(0.22);
    } else if (/(glass|mirror)/.test(key)) {
      pbr.setMetallicFactor(0.08);
      pbr.setRoughnessFactor(0.08);
      material.setAlphaMode?.('BLEND');
    } else if (/(fabric|sofa|curtain|carpet|rug|upholstery|cushion)/.test(key)) {
      pbr.setMetallicFactor(0);
      pbr.setRoughnessFactor(0.72);
    }
  });
});

const drawingImages = {
  'Flooring layout': ['assets/drawings/web/flooring.png'],
  'Living area': ['assets/drawings/web/living-1.png', 'assets/drawings/web/living-2.png'],
  'Kitchen elevation': ['assets/drawings/web/kitchen.png'],
  'Bedroom elevation': ['assets/drawings/web/bedroom.png'],
  'Guest bedroom plan': ['assets/drawings/web/guest-bedroom-plan-crop.png']
};

const drawingRenders = {
  'Flooring layout': [['assets/renders/flooring.png', 'FLOORING RENDER']],
  'Living area': [['assets/renders/living-area-1.png', 'LIVING AREA RENDER 1'], ['assets/renders/living-area-2.png', 'LIVING AREA RENDER 2']],
  'Kitchen elevation': [['assets/renders/kitchen.png', 'KITCHEN RENDER']],
  'Bedroom elevation': [['assets/renders/master-bedroom-1.png', 'MASTER BEDROOM RENDER 1'], ['assets/renders/master-bedroom-2.png', 'MASTER BEDROOM RENDER 2']],
  'Guest bedroom plan': [['assets/renders/guest-bedroom-1.png', 'GUEST BEDROOM RENDER 1'], ['assets/renders/guest-bedroom-2.png', 'GUEST BEDROOM RENDER 2']]
};

let drawingIndex = 0;
const drawingCarousel = document.querySelector('.drawing-carousel');
const drawingPrev = document.querySelector('.drawing-prev');
const drawingNext = document.querySelector('.drawing-next');
const drawingRoomImage = document.querySelector('#drawing-room-image');
const renderTitle = document.querySelector('#render-title');
const renderCarousel = document.querySelector('.render-carousel');
const renderPrev = document.querySelector('.carousel-prev');
const renderNext = document.querySelector('.carousel-next');
let renderIndex = 0;
const showDrawing = (source) => { const items = Array.isArray(source) ? source : [source]; drawingIndex = Math.max(0, Math.min(drawingIndex, items.length - 1)); drawingImage.src = items[drawingIndex]; drawingPrev.hidden = items.length < 2; drawingNext.hidden = items.length < 2; };
const changeDrawing = (step) => { const items = drawingImages[drawingTitle.textContent] || []; drawingIndex = (drawingIndex + step + items.length) % items.length; showDrawing(items); };
drawingPrev?.addEventListener('click', () => changeDrawing(-1));
drawingNext?.addEventListener('click', () => changeDrawing(1));
let drawingSwipeStart = null;
drawingCarousel?.addEventListener('pointerdown', (event) => { drawingSwipeStart = event.clientX; });
drawingCarousel?.addEventListener('pointerup', (event) => { if (drawingSwipeStart === null) return; const delta = event.clientX - drawingSwipeStart; drawingSwipeStart = null; if (Math.abs(delta) >= 35) changeDrawing(delta < 0 ? 1 : -1); });

const showRender = (items = []) => {
  const hasRenders = items.length > 0;
  renderIndex = Math.max(0, Math.min(renderIndex, Math.max(0, items.length - 1)));
  drawingRoomImage.hidden = !hasRenders;
  renderPrev.hidden = !hasRenders || items.length < 2;
  renderNext.hidden = !hasRenders || items.length < 2;
  if (hasRenders) {
    drawingRoomImage.src = items[renderIndex][0];
    drawingRoomImage.alt = items[renderIndex][1];
    renderTitle.textContent = items[renderIndex][1];
  } else {
    drawingRoomImage.removeAttribute('src');
    drawingRoomImage.alt = 'No rendered reference available';
    renderTitle.textContent = 'No rendered reference';
  }
};
const changeRender = (step) => { const items = drawingRenders[drawingTitle.textContent] || []; if (!items.length) return; renderIndex = (renderIndex + step + items.length) % items.length; showRender(items); };
renderPrev?.addEventListener('click', () => changeRender(-1));
renderNext?.addEventListener('click', () => changeRender(1));
let renderSwipeStart = null;
renderCarousel?.addEventListener('pointerdown', (event) => { renderSwipeStart = event.clientX; });
renderCarousel?.addEventListener('pointerup', (event) => { if (renderSwipeStart === null) return; const delta = event.clientX - renderSwipeStart; renderSwipeStart = null; if (Math.abs(delta) >= 35) changeRender(delta < 0 ? 1 : -1); });
showDrawing(drawingImages[drawingTitle?.textContent || 'Flooring layout']);
showRender(drawingRenders[drawingTitle?.textContent || 'Flooring layout']);

document.querySelectorAll('.drawing-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    const title = button.dataset.pdfTitle;
    document.querySelectorAll('.drawing-tabs button').forEach((item) => item.classList.toggle('is-active', item === button));
    button.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.drawing-tabs button:not(.is-active)').forEach((item) => item.setAttribute('aria-selected', 'false'));
    drawingIndex = 0;
    renderIndex = 0;
    showDrawing(drawingImages[title]);
    showRender(drawingRenders[title]);
    drawingImage.alt = `Full ${title} AutoCAD drawing`;
    drawingTitle.textContent = title;
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
