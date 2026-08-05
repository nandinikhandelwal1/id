if (window.matchMedia('(max-width: 800px)').matches) {
  document.body.insertAdjacentHTML('beforeend', `<div class="mobile-dock"><a href="#top"><span>⌂</span>Home</a><a href="#about"><span>◌</span>About</a><a href="#project"><span>✦</span>Work</a><a href="#contact"><span>↗</span>Contact</a></div>`);
}
const socialIcons = {
  Instagram: '<img src="https://cdn.simpleicons.org/instagram/1f292b" alt="" aria-hidden="true">',
  LinkedIn: '<img src="https://cdn.simpleicons.org/linkedin/1f292b" alt="" aria-hidden="true">',
  WhatsApp: '<img src="https://cdn.simpleicons.org/whatsapp/1f292b" alt="" aria-hidden="true">'
};
document.querySelectorAll('footer span').forEach((item) => {
  if (item.textContent.includes('New Delhi / India')) item.textContent = 'Noida / India';
});
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
