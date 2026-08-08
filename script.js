if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const navigationEntry = performance.getEntriesByType('navigation')[0];
if (navigationEntry?.type === 'reload') {
  window.addEventListener('pageshow', () => {
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  }, { once: true });
}

const progress = document.querySelector('#progress');
const portrait = document.querySelector('.portrait-frame img');
if (portrait) portrait.src = 'assets/nandini-portrait.jpg';
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
reveals.forEach((item) => observer.observe(item));
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${(scrollY / max) * 100}%`; });
document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.nav').classList.remove('open')));
if (location.hash === '#dashboard') document.querySelector('#dashboard').classList.add('open');
document.querySelector('.close-dashboard').addEventListener('click', () => { document.querySelector('#dashboard').classList.remove('open'); history.replaceState(null, '', '#top'); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelector('#dashboard').classList.remove('open'); });

const zoomableDrawings = document.querySelectorAll('.drawing-card img, .room-panel > img');
if (zoomableDrawings.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'drawing-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="drawing-lightbox__backdrop" data-close-drawing></div>
    <div class="drawing-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Drawing zoom viewer">
      <div class="drawing-lightbox__toolbar">
        <strong class="drawing-lightbox__title"></strong>
        <div class="drawing-lightbox__actions">
          <button type="button" data-zoom-out aria-label="Zoom out">−</button>
          <button type="button" data-zoom-reset>Reset</button>
          <button type="button" data-zoom-in aria-label="Zoom in">+</button>
          <button type="button" data-close-drawing aria-label="Close">×</button>
        </div>
      </div>
      <div class="drawing-lightbox__stage" tabindex="0">
        <img class="drawing-lightbox__image" alt="">
    <span class="drawing-lightbox__hint">Use +/- to zoom · drag to pan · double-click to zoom</span>
      </div>
    </div>`;
  document.body.append(lightbox);

  const stage = lightbox.querySelector('.drawing-lightbox__stage');
  const image = lightbox.querySelector('.drawing-lightbox__image');
  const title = lightbox.querySelector('.drawing-lightbox__title');
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  const render = () => {
    image.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
  };
  const reset = () => {
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    render();
  };
  const adjustZoom = (amount) => {
    scale = Math.min(5, Math.max(1, scale + amount));
    if (scale === 1) {
      offsetX = 0;
      offsetY = 0;
    }
    render();
  };
  const getTitle = (drawing) => {
    const panel = drawing.closest('.room-row, .drawing-card');
    return panel?.querySelector('h3, span')?.textContent?.trim() || drawing.alt || 'AutoCAD drawing';
  };
  const open = (drawing) => {
    title.textContent = getTitle(drawing);
    image.src = drawing.currentSrc || drawing.src;
    image.alt = drawing.alt || 'AutoCAD drawing';
    reset();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawing-lightbox-open');
    stage.focus();
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawing-lightbox-open');
    image.removeAttribute('src');
  };

  zoomableDrawings.forEach((drawing) => drawing.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    open(drawing);
  }));
  lightbox.querySelectorAll('[data-close-drawing]').forEach((button) => button.addEventListener('click', close));
  lightbox.querySelector('[data-zoom-in]').addEventListener('click', () => adjustZoom(.5));
  lightbox.querySelector('[data-zoom-out]').addEventListener('click', () => adjustZoom(-.5));
  lightbox.querySelector('[data-zoom-reset]').addEventListener('click', reset);
  stage.addEventListener('pointerdown', (event) => {
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    originX = offsetX;
    originY = offsetY;
    stage.classList.add('is-dragging');
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    offsetX = originX + event.clientX - startX;
    offsetY = originY + event.clientY - startY;
    render();
  });
  const stopDragging = (event) => {
    dragging = false;
    stage.classList.remove('is-dragging');
    if (event?.pointerId !== undefined && stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  };
  stage.addEventListener('pointerup', stopDragging);
  stage.addEventListener('pointercancel', stopDragging);
  stage.addEventListener('dblclick', () => {
    if (scale === 1) adjustZoom(1.25);
    else reset();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
}
