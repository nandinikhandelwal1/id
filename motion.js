if (window.matchMedia('(max-width: 800px)').matches) {
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-dock"><a href="#top"><span>⌂</span>Home</a><a href="#about"><span>◌</span>About</a><a href="#project"><span>✦</span>Work</a><a href="#contact"><span>↗</span>Contact</a></div>`);
}
const socialIcons = {
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r=".9" class="icon-fill"></circle></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9v9M6 6.2v.1M10.5 18v-5a3.5 3.5 0 0 1 7 0v5M10.5 9v9M17.5 18v-5a3.5 3.5 0 0 0-7 0"></path></svg>',
  WhatsApp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"></path><path d="M9 8.5c.3 2 1.5 3.5 3.5 4.5 1 .5 1.8.6 2.5.2"></path></svg>'
};
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
