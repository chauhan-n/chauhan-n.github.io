
async function loadPartials() {
  // Load nav
  const nav = document.getElementById('nav');
  if (nav) {
    try {
      const html = await (await fetch('partials/nav.html')).text();
      nav.innerHTML = html;
    } catch (e) { console.warn('Failed to load nav:', e); }
  }
  // Load footer
  const footer = document.getElementById('footer');
  if (footer) {
    try {
      const html = await (await fetch('partials/footer.html')).text();
      footer.innerHTML = html;
    } catch (e) { console.warn('Failed to load footer:', e); }
  }
  // Mark active link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.toLowerCase() === path) a.classList.add('active');
  });
}
document.addEventListener('DOMContentLoaded', loadPartials);
