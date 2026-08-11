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

const drawingFrame = document.querySelector('#drawing-pdf-frame');
const drawingTitle = document.querySelector('#drawing-pdf-title');
const drawingDownload = document.querySelector('#drawing-pdf-download');

document.querySelectorAll('.drawing-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    const source = button.dataset.pdfSrc;
    const title = button.dataset.pdfTitle;
    document.querySelectorAll('.drawing-tabs button').forEach((item) => item.classList.toggle('is-active', item === button));
    button.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.drawing-tabs button:not(.is-active)').forEach((item) => item.setAttribute('aria-selected', 'false'));
    drawingFrame.src = `${source}#view=FitH&toolbar=1`;
    drawingFrame.title = `${title} PDF`;
    drawingTitle.textContent = title;
    drawingDownload.href = source;
  });
});

// model-viewer's disable-zoom attribute prevents wheel zoom. Stopping the
// component's wheel handler in capture phase leaves normal page scrolling intact.
window.addEventListener('wheel', (event) => {
  if (event.target.closest?.('model-viewer')) event.stopImmediatePropagation();
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
