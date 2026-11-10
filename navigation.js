const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.getElementById('main-navigation');

if (menuToggle && mainNavigation) {
  const header = menuToggle.closest('.top');
  const mobile = window.matchMedia('(max-width: 767px)');
  const isOpen = () => menuToggle.getAttribute('aria-expanded') === 'true';
  const closeMenu = () => menuToggle.setAttribute('aria-expanded', 'false');

  menuToggle.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', String(!isOpen()));
  });
  mainNavigation.addEventListener('click', (event) => {
    if (mobile.matches && event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closeMenu();
      menuToggle.focus();
    }
  });
  mobile.addEventListener('change', closeMenu);
  window.addEventListener('pageshow', closeMenu);
  header.classList.add('has-menu');
}
