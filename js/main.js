// Theme toggle
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);

toggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = current === 'dark' || (!current && systemDark);
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Scroll-based fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Sticky nav: hide on scroll down, show on scroll up
let lastY = window.scrollY;
const nav = document.getElementById('topnav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 80) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastY = y;
}, { passive: true });

// Init feather icons
feather.replace();
