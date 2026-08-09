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
const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    }), { rootMargin: '0px 0px 150% 0px', threshold: 0 })
  : null;
if (observer) reveals.forEach((item) => observer.observe(item));
else reveals.forEach((item) => item.classList.add('is-visible'));
window.setTimeout(() => reveals.forEach((item) => item.classList.add('is-visible')), 500);
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
      <span class="drawing-lightbox__hint">Pinch or +/- to zoom · drag to pan · double-click to zoom</span>
      </div>
    </div>`;
  document.body.append(lightbox);

  const stage = lightbox.querySelector('.drawing-lightbox__stage');
  const image = lightbox.querySelector('.drawing-lightbox__image');
  const title = lightbox.querySelector('.drawing-lightbox__title');
  let scale = 1;
  let minScale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;
  let dragStart = null;
  const activePointers = new Map();
  let pinchStart = null;

  const render = () => {
    image.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
  };
  const fitToStage = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    minScale = Math.min(
      (stage.clientWidth * .92) / image.naturalWidth,
      (stage.clientHeight * .88) / image.naturalHeight,
      1
    );
    scale = minScale;
    offsetX = 0;
    offsetY = 0;
    render();
  };
  const reset = () => {
    scale = minScale;
    offsetX = 0;
    offsetY = 0;
    render();
  };
  const adjustZoom = (amount) => {
    scale = Math.min(5, Math.max(minScale, scale + amount));
    if (scale === minScale) {
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
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawing-lightbox-open');
    stage.focus({ preventScroll: true });
    if (image.complete) requestAnimationFrame(fitToStage);
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
  image.addEventListener('load', fitToStage);
  stage.addEventListener('wheel', (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    adjustZoom(event.deltaY > 0 ? -.25 : .25);
  }, { passive: false });
  const clampScale = (value) => Math.min(5, Math.max(minScale, value));
  const distanceBetweenPointers = () => {
    const points = [...activePointers.values()];
    if (points.length < 2) return 0;
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  };
  const midpointBetweenPointers = () => {
    const points = [...activePointers.values()];
    if (points.length < 2) return { x: 0, y: 0 };
    return {
      x: (points[0].x + points[1].x) / 2,
      y: (points[0].y + points[1].y) / 2
    };
  };

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    try { stage.setPointerCapture(event.pointerId); } catch {}
    if (activePointers.size >= 2) {
      dragging = false;
      dragStart = null;
      const midpoint = midpointBetweenPointers();
      pinchStart = {
        distance: distanceBetweenPointers(),
        scale,
        midpoint,
        offsetX,
        offsetY
      };
      stage.classList.remove('is-dragging');
      return;
    }
    dragging = true;
    dragStart = { x: event.clientX, y: event.clientY, offsetX, offsetY };
    pinchStart = null;
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointermove', (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.size >= 2 && pinchStart) {
      const currentDistance = distanceBetweenPointers();
      const midpoint = midpointBetweenPointers();
      scale = clampScale(pinchStart.scale * currentDistance / pinchStart.distance);
      offsetX = pinchStart.offsetX + midpoint.x - pinchStart.midpoint.x;
      offsetY = pinchStart.offsetY + midpoint.y - pinchStart.midpoint.y;
      if (scale === minScale) {
        offsetX = 0;
        offsetY = 0;
      }
      event.preventDefault();
      render();
      return;
    }
    if (!dragging || !dragStart) return;
    event.preventDefault();
    offsetX = dragStart.offsetX + event.clientX - dragStart.x;
    offsetY = dragStart.offsetY + event.clientY - dragStart.y;
    render();
  });
  const stopDragging = (event) => {
    activePointers.delete(event?.pointerId);
    if (activePointers.size >= 2) return;
    if (activePointers.size === 1) {
      const remaining = [...activePointers.values()][0];
      pinchStart = null;
      dragging = true;
      dragStart = { x: remaining.x, y: remaining.y, offsetX, offsetY };
      stage.classList.add('is-dragging');
      return;
    }
    pinchStart = null;
    dragStart = null;
    dragging = false;
    stage.classList.remove('is-dragging');
  };
  stage.addEventListener('pointerup', stopDragging);
  stage.addEventListener('pointercancel', stopDragging);
  stage.addEventListener('lostpointercapture', stopDragging);
  stage.addEventListener('contextmenu', (event) => event.preventDefault());
  stage.addEventListener('dblclick', () => {
    if (scale === minScale) adjustZoom(1.25);
    else reset();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
}
