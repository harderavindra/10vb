const routes = ['intro', 'gallery', 'games', 'attendance'];

function setActiveRoute(route) {
  const active = routes.includes(route) ? route : 'intro';
  document.querySelectorAll('.page-section').forEach((section) => {
    section.classList.toggle('active', section.id === `${active}-section`);
  });
  document.querySelectorAll('.bottom-toolbar .tab-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.route === active);
  });
}

function navigate() {
  const hash = window.location.hash.slice(1);
  setActiveRoute(hash);
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bottom-toolbar .tab-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const route = button.dataset.route;
      window.location.hash = route;
    });
  });
  navigate();
});
