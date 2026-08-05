if (window.matchMedia('(max-width: 800px)').matches) {
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-dock"><a href="#top"><span>⌂</span>Home</a><a href="#about"><span>◌</span>About</a><a href="#project"><span>✦</span>Work</a><a href="#contact"><span>↗</span>Contact</a></div>`);
}
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
