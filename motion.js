if (window.matchMedia('(max-width: 800px)').matches) {
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-dock"><a href="#top"><span class="dock-icon home-icon"><svg viewBox="0 0 24 24"><path d="m4 10 8-6 8 6v10H4Z"></path></svg></span>Home</a><a href="#about"><span class="dock-icon about-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="9" r="2"></circle><path d="M8.5 17c.8-2 2-3 3.5-3s2.7 1 3.5 3"></path></svg></span>About</a><a href="#project"><span class="dock-icon work-icon"><svg viewBox="0 0 24 24"><path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z"></path></svg></span>Work</a><a href="#contact"><span class="dock-icon contact-icon"><svg viewBox="0 0 24 24"><path d="M5 19 19 5M9 5h10v10"></path></svg></span>Contact</a></div>`);
}
const socialIcons = {
  Instagram: '<img src="https://api.iconify.design/simple-icons:instagram.svg?color=%231f292b" alt="" aria-hidden="true">',
  LinkedIn: '<img src="https://api.iconify.design/simple-icons:linkedin.svg?color=%231f292b" alt="" aria-hidden="true">',
  WhatsApp: '<img src="https://api.iconify.design/simple-icons:whatsapp.svg?color=%231f292b" alt="" aria-hidden="true">'
};
document.querySelectorAll('footer span').forEach((item) => {
  if (item.textContent.includes('New Delhi / India')) item.textContent = 'Noida / India';
});
const drawingGrid = document.querySelector('.drawing-grid');
const drawingsSection = document.querySelector('.drawings');
if (drawingsSection) {
  drawingsSection.innerHTML = `<div class="section-index">04 / Technical language</div><div class="drawings-head"><h2>Drawings<br><i>meet space.</i></h2><p>Each study pairs the technical drawing with its 3D visual direction. Additional room renders can be added later without changing the layout.</p></div><div class="room-gallery"><article class="room-row"><div class="room-label"><span>01</span><h3>Flooring layout</h3><p>Plan study</p></div><figure class="room-panel"><img src="assets/drawings/Final layout Flooring..-Model-1.jpg" alt="Flooring layout drawing"><figcaption>AutoCAD drawing</figcaption></figure><figure class="room-panel room-empty"><div><span class="plus">+</span><p>3D render<br><small>Coming soon</small></p></div></figure></article><article class="room-row"><div class="room-label"><span>02</span><h3>Living elevation I</h3><p>Living room study</p></div><figure class="room-panel"><img src="assets/drawings/LIVING 1 FINAL-1.jpg" alt="Living elevation I drawing"><figcaption>AutoCAD drawing</figcaption></figure><figure class="room-panel room-empty"><div><span class="plus">+</span><p>3D render<br><small>Coming soon</small></p></div></figure></article><article class="room-row"><div class="room-label"><span>03</span><h3>Living elevation II</h3><p>Living room study</p></div><figure class="room-panel"><img src="assets/drawings/LIVING 2 FINAL-1.jpg" alt="Living elevation II drawing"><figcaption>AutoCAD drawing</figcaption></figure><figure class="room-panel room-empty"><div><span class="plus">+</span><p>3D render<br><small>Coming soon</small></p></div></figure></article><article class="room-row"><div class="room-label"><span>04</span><h3>Kitchen elevation</h3><p>Kitchen study</p></div><figure class="room-panel"><img src="assets/drawings/KITCHEN ELEVATION FINAL-1.jpg" alt="Kitchen elevation drawing"><figcaption>AutoCAD drawing</figcaption></figure><figure class="room-panel room-empty"><div><span class="plus">+</span><p>3D render<br><small>Coming soon</small></p></div></figure></article><article class="room-row"><div class="room-label"><span>05</span><h3>Bedroom elevation</h3><p>Guest bedroom study</p></div><figure class="room-panel"><img src="assets/drawings/BEDROOM ELEVATION-1.jpg" alt="Bedroom elevation drawing"><figcaption>AutoCAD drawing</figcaption></figure><figure class="room-panel"><img src="assets/renders/guest-bedroom-render.png" alt="Guest bedroom 3D render"><figcaption>3D render · guest bedroom</figcaption></figure></article></div>`;
}
if (!document.querySelector('script[data-model-viewer]')) {
  const modelViewerScript = document.createElement('script');
  modelViewerScript.type = 'module';
  modelViewerScript.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
  modelViewerScript.dataset.modelViewer = 'true';
  document.head.appendChild(modelViewerScript);
}
const modelPanel = (room) => `<div class="room-model-link"><model-viewer src="assets/final-model-web.glb" camera-controls touch-action="none" interaction-prompt="none" shadow-intensity="0.7" exposure="1.15" camera-orbit="35deg 65deg 10m" field-of-view="28deg" alt="Interactive full 3D model — ${room}"></model-viewer><a class="model-open-label" href="project.html?room=${encodeURIComponent(room)}" target="_blank" rel="noopener" aria-label="Open the full 3D model for ${room}">Open full 3D model ↗</a></div>`;
document.querySelectorAll('.room-panel.room-empty').forEach((panel) => {
  const room = panel.closest('.room-row')?.querySelector('.room-label h3')?.textContent.trim() || 'room';
  panel.outerHTML = `<figure class="room-panel room-model-panel">${modelPanel(room)}<figcaption>Interactive 3D model</figcaption></figure>`;
});
const bedroomPanel = document.querySelector('.room-row:last-child .room-panel:last-child');
if (bedroomPanel) bedroomPanel.outerHTML = `<figure class="room-panel room-model-panel">${modelPanel('Bedroom')}<figcaption>Interactive 3D model</figcaption></figure>`;
const pdfDrawings = ['assets/drawings/Final%20layout%20Flooring..-Model.pdf','assets/drawings/LIVING%201%20FINAL.pdf','assets/drawings/LIVING%202%20FINAL.pdf','assets/drawings/KITCHEN%20ELEVATION%20FINAL.pdf','assets/drawings/BEDROOM%20ELEVATION.pdf'];
document.querySelectorAll('.room-row').forEach((row, index) => {
  const panel = row.querySelector('.room-panel');
  if (panel && pdfDrawings[index]) panel.insertAdjacentHTML('beforeend', `<a class="pdf-open-button" href="${pdfDrawings[index]}" target="_blank" rel="noopener">Open PDF drawing <span>↗</span></a>`);
});
document.querySelectorAll('.room-row').forEach((row, index) => {
  const label = row.querySelector('.room-label');
  const panels = Array.from(row.children).filter((child) => child.classList.contains('room-panel'));
  if (!label || !panels.length || row.querySelector('.room-content')) return;

  const content = document.createElement('div');
  content.className = 'room-content';
  content.id = `room-content-${index + 1}`;
  panels.forEach((panel) => content.appendChild(panel));
  row.appendChild(content);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'room-accordion-toggle';
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-controls', content.id);
  toggle.setAttribute('aria-label', `Toggle ${label.querySelector('h3')?.textContent.trim() || 'section'}`);
  toggle.innerHTML = '<span class="room-accordion-icon" aria-hidden="true"></span>';
  label.appendChild(toggle);

  const toggleSection = () => {
    const collapsed = row.classList.toggle('is-collapsed');
    const expanded = String(!collapsed);
    toggle.setAttribute('aria-expanded', expanded);
    label.setAttribute('aria-expanded', expanded);
  };

  label.setAttribute('role', 'button');
  label.setAttribute('tabindex', '0');
  label.setAttribute('aria-controls', content.id);
  label.setAttribute('aria-expanded', 'true');
  label.addEventListener('click', (event) => {
    if (event.target.closest('a, button, model-viewer')) return;
    toggleSection();
  });
  label.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSection();
    }
  });
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleSection();
  });
});

const attachInlineDrawingInteractions = (stage, image) => {
  const pointers = new Map();
  let scale = 1;
  let minimumScale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragStart = null;
  let pinchStart = null;

  const clampScale = (value) => Math.min(8, Math.max(minimumScale, value));
  const render = () => {
    image.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
  };
  const fit = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    minimumScale = Math.min(stage.clientWidth / image.naturalWidth, stage.clientHeight / image.naturalHeight);
    scale = minimumScale;
    offsetX = 0;
    offsetY = 0;
    render();
  };
  const currentPointers = () => Array.from(pointers.values()).slice(0, 2);
  const pinchState = () => {
    const [first, second] = currentPointers();
    return {
      midpoint: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
      distance: Math.hypot(second.x - first.x, second.y - first.y),
    };
  };
  const beginPinch = () => {
    const current = pinchState();
    const bounds = stage.getBoundingClientRect();
    const center = { x: bounds.width / 2, y: bounds.height / 2 };
    pinchStart = {
      ...current,
      scale,
      imageX: (current.midpoint.x - center.x - offsetX) / scale,
      imageY: (current.midpoint.y - center.y - offsetY) / scale,
    };
  };
  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    stage.setPointerCapture?.(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2) beginPinch();
    else dragStart = { x: event.clientX, y: event.clientY, offsetX, offsetY };
    stage.classList.add('is-dragging');
  };
  const onPointerMove = (event) => {
    if (!pointers.has(event.pointerId)) return;
    event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2 && pinchStart) {
      const current = pinchState();
      const bounds = stage.getBoundingClientRect();
      const center = { x: bounds.width / 2, y: bounds.height / 2 };
      scale = clampScale(pinchStart.scale * current.distance / Math.max(1, pinchStart.distance));
      offsetX = current.midpoint.x - center.x - pinchStart.imageX * scale;
      offsetY = current.midpoint.y - center.y - pinchStart.imageY * scale;
      render();
    } else if (pointers.size === 1 && dragStart) {
      offsetX = dragStart.offsetX + event.clientX - dragStart.x;
      offsetY = dragStart.offsetY + event.clientY - dragStart.y;
      render();
    }
  };
  const onPointerEnd = (event) => {
    pointers.delete(event.pointerId);
    stage.releasePointerCapture?.(event.pointerId);
    if (pointers.size >= 2) beginPinch();
    else if (pointers.size === 1) {
      const [remaining] = currentPointers();
      dragStart = { x: remaining.x, y: remaining.y, offsetX, offsetY };
      pinchStart = null;
    } else {
      dragStart = null;
      pinchStart = null;
      stage.classList.remove('is-dragging');
    }
  };

  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerup', onPointerEnd);
  stage.addEventListener('pointercancel', onPointerEnd);
  image.addEventListener('load', fit);
  if (image.complete) fit();
  window.addEventListener('resize', fit, { passive: true });
};

document.querySelectorAll('.room-panel > img').forEach((image) => {
  const stage = document.createElement('div');
  stage.className = 'inline-drawing-stage';
  image.draggable = false;
  image.replaceWith(stage);
  stage.appendChild(image);
  attachInlineDrawingInteractions(stage, image);
});

document.querySelectorAll('model-viewer').forEach((viewer) => {
  viewer.addEventListener('wheel', (event) => {
    if (!event.ctrlKey) event.stopImmediatePropagation();
  }, { capture: true, passive: true });
});
if (drawingGrid && !drawingGrid.querySelector('[data-living-two]')) {
  drawingGrid.insertAdjacentHTML('beforeend', '<a class="drawing-card" data-living-two href="assets/drawings/LIVING%202%20FINAL.pdf" target="_blank"><img src="assets/drawings/LIVING%202%20FINAL-1.jpg" alt="Living room elevation II"><span>Living elevation II <b>↗</b></span></a>');
}
document.querySelectorAll('.social-links a').forEach((link) => {
  const name = link.textContent.trim().split(' ')[0];
  if (socialIcons[name]) link.innerHTML = `${socialIcons[name]}<span>${name}</span><b>↗</b>`;
});
document.querySelectorAll('b').forEach((arrow) => {
      if (arrow.textContent.includes('↗') || arrow.closest('.contact-link')) {
        arrow.replaceChildren();
        arrow.insertAdjacentHTML('beforeend', '<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10"></path></svg>');
      }
});
const revealItems = document.querySelectorAll('section, .drawing-card, .process-grid > div, .contact-link, .skill-list span');
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
});
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));
if (!document.querySelector('.drawing-lightbox')) {
  const lightbox = document.createElement('div');
  lightbox.className = 'drawing-lightbox';
  lightbox.innerHTML = `
    <div class="drawing-lightbox__backdrop" data-close-drawing></div>
    <div class="drawing-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Drawing zoom viewer">
      <div class="drawing-lightbox__toolbar">
        <strong class="drawing-lightbox__title"></strong>
        <div class="drawing-lightbox__actions">
          <button type="button" data-zoom-out aria-label="Zoom out">−</button>
          <button type="button" data-zoom-reset aria-label="Reset zoom">Reset</button>
          <button type="button" data-zoom-in aria-label="Zoom in">+</button>
          <button type="button" data-close-drawing aria-label="Close">×</button>
        </div>
      </div>
      <div class="drawing-lightbox__stage" tabindex="0">
        <img class="drawing-lightbox__image" alt="" draggable="false">
        <span class="drawing-lightbox__hint">Pinch to zoom · drag to pan</span>
      </div>
    </div>`;
  document.body.appendChild(lightbox);

  const stage = lightbox.querySelector('.drawing-lightbox__stage');
  const image = lightbox.querySelector('.drawing-lightbox__image');
  const title = lightbox.querySelector('.drawing-lightbox__title');
  const pointerMap = new Map();
  let scale = 1;
  let minimumScale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let activeImage = null;
  let dragStart = null;
  let pinchStart = null;

  const clampScale = (value) => Math.min(8, Math.max(minimumScale, value));

  const renderImage = () => {
    image.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
  };

  const fitImage = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    minimumScale = Math.min(stageWidth / image.naturalWidth, stageHeight / image.naturalHeight, 1);
    scale = minimumScale;
    offsetX = 0;
    offsetY = 0;
    renderImage();
  };

  const resetImage = () => {
    fitImage();
    stage.focus({ preventScroll: true });
  };

  const closeLightbox = () => {
    pointerMap.clear();
    dragStart = null;
    pinchStart = null;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('drawing-lightbox-open');
    image.removeAttribute('src');
    activeImage = null;
  };

  const openLightbox = (sourceImage) => {
    activeImage = sourceImage;
    image.src = sourceImage.currentSrc || sourceImage.src;
    image.alt = sourceImage.alt || 'AutoCAD drawing';
    title.textContent = sourceImage.alt || sourceImage.closest('.drawing-card, .room-panel')?.querySelector('h2, h3, .drawing-card__title')?.textContent || 'Drawing';
    lightbox.classList.add('is-open');
    document.body.classList.add('drawing-lightbox-open');
    if (image.complete) fitImage();
  };

  const getStagePoint = (event) => {
    const bounds = stage.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const getPointerPair = () => Array.from(pointerMap.values()).slice(0, 2);

  const getPinchState = () => {
    const pointerPair = getPointerPair();
    const firstPointer = pointerPair[0];
    const secondPointer = pointerPair[1];
    const midpoint = {
      x: (firstPointer.x + secondPointer.x) / 2,
      y: (firstPointer.y + secondPointer.y) / 2
    };
    const deltaX = secondPointer.x - firstPointer.x;
    const deltaY = secondPointer.y - firstPointer.y;
    return { midpoint, distance: Math.hypot(deltaX, deltaY) };
  };

  const startPinch = () => {
    const pinchState = getPinchState();
    const stageCenterX = stage.clientWidth / 2;
    const stageCenterY = stage.clientHeight / 2;
    const imagePointX = (pinchState.midpoint.x - stageCenterX - offsetX) / scale;
    const imagePointY = (pinchState.midpoint.y - stageCenterY - offsetY) / scale;
    pinchStart = { ...pinchState, imagePointX, imagePointY, scale };
    dragStart = null;
  };

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    const point = getStagePoint(event);
    pointerMap.set(event.pointerId, point);
    try {
      stage.setPointerCapture(event.pointerId);
    } catch {}
    if (pointerMap.size >= 2) {
      startPinch();
    } else {
      dragStart = { x: point.x, y: point.y, offsetX, offsetY };
    }
  });

  stage.addEventListener('pointermove', (event) => {
    if (!pointerMap.has(event.pointerId)) return;
    event.preventDefault();
    pointerMap.set(event.pointerId, getStagePoint(event));
    if (pointerMap.size >= 2) {
      if (!pinchStart) startPinch();
      const pinchState = getPinchState();
      const stageCenterX = stage.clientWidth / 2;
      const stageCenterY = stage.clientHeight / 2;
      scale = clampScale(pinchStart.scale * (pinchState.distance / pinchStart.distance));
      offsetX = pinchState.midpoint.x - stageCenterX - pinchStart.imagePointX * scale;
      offsetY = pinchState.midpoint.y - stageCenterY - pinchStart.imagePointY * scale;
      renderImage();
      return;
    }
    if (!dragStart) return;
    const point = pointerMap.get(event.pointerId);
    offsetX = dragStart.offsetX + point.x - dragStart.x;
    offsetY = dragStart.offsetY + point.y - dragStart.y;
    renderImage();
  });

  const endPointer = (event) => {
    pointerMap.delete(event.pointerId);
    try {
      stage.releasePointerCapture(event.pointerId);
    } catch {}
    if (pointerMap.size >= 2) {
      startPinch();
    } else if (pointerMap.size === 1) {
      const remainingPointer = Array.from(pointerMap.entries())[0];
      dragStart = { x: remainingPointer[1].x, y: remainingPointer[1].y, offsetX, offsetY };
      pinchStart = null;
    } else {
      dragStart = null;
      pinchStart = null;
    }
  };

  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);
  stage.addEventListener('wheel', (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    event.stopPropagation();

    const bounds = stage.getBoundingClientRect();
    const point = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    const previousScale = scale;
    const imagePointX = (point.x - stage.clientWidth / 2 - offsetX) / previousScale;
    const imagePointY = (point.y - stage.clientHeight / 2 - offsetY) / previousScale;
    scale = clampScale(scale * Math.exp(-event.deltaY * 0.01));
    offsetX = point.x - stage.clientWidth / 2 - imagePointX * scale;
    offsetY = point.y - stage.clientHeight / 2 - imagePointY * scale;
    renderImage();
  }, { passive: false });
  image.addEventListener('load', fitImage);
  window.addEventListener('resize', () => {
    if (lightbox.classList.contains('is-open')) fitImage();
  });

  document.addEventListener('click', (event) => {
const drawingImage = event.target.closest('.drawing-card img');
    if (drawingImage) {
      event.preventDefault();
      openLightbox(drawingImage);
      return;
    }
    if (event.target.closest('[data-close-drawing]')) closeLightbox();
    if (event.target.closest('[data-zoom-reset]')) resetImage();
    if (event.target.closest('[data-zoom-in]')) {
      scale = clampScale(scale * 1.35);
      renderImage();
    }
    if (event.target.closest('[data-zoom-out]')) {
      scale = clampScale(scale / 1.35);
      renderImage();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === '+' || event.key === '=') {
      scale = clampScale(scale * 1.35);
      renderImage();
    }
    if (event.key === '-') {
      scale = clampScale(scale / 1.35);
      renderImage();
    }
  });
}
