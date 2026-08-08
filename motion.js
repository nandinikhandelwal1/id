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

  toggle.addEventListener('click', () => {
    const collapsed = row.classList.toggle('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
  });
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
