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
if (drawingGrid && !drawingGrid.querySelector('[data-living-two]')) {
  drawingGrid.insertAdjacentHTML('beforeend', '<a class="drawing-card" data-living-two href="assets/drawings/LIVING%202%20FINAL.pdf" target="_blank"><img src="assets/drawings/LIVING%202%20FINAL-1.jpg" alt="Living room elevation II"><span>Living elevation II <b>↗</b></span></a>');
}
document.querySelectorAll('.social-links a').forEach((link) => {
  const name = link.textContent.trim().split(' ')[0];
  if (socialIcons[name]) link.innerHTML = `${socialIcons[name]}<span>${name}</span><b>↗</b>`;
});
const revealItems = document.querySelectorAll('section, .drawing-card, .process-grid > div, .contact-link');
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
