// Hamburger menu for mobile navigation

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.anortechwebui-hamburger-menu');
  if (!menu) return;

  // Docs-style layouts slide the sidebar in; the design-system layouts
  // (an-home / an-page) have no sidebar and use the mobile nav panel instead.
  const sidebarContainer = document.querySelector('.anortechwebui-sidebar-container');
  const mobileNav = document.getElementById('an-mobile-nav');
  const panel = sidebarContainer || mobileNav;
  if (!panel) return;

  const mobileQuery = window.matchMedia('(max-width: 767px)');

  function isMenuOpen() {
    return menu.querySelector('svg').classList.contains('open');
  }

  // On mobile, the panel is off-screen so hide it from assistive tech
  function syncAriaHidden() {
    if (!sidebarContainer) return;
    if (mobileQuery.matches) {
      sidebarContainer.setAttribute('aria-hidden', isMenuOpen() ? 'false' : 'true');
    } else {
      sidebarContainer.removeAttribute('aria-hidden');
    }
  }

  // Set initial state
  syncAriaHidden();
  mobileQuery.addEventListener('change', syncAriaHidden);

  // Leaving mobile with the menu open would strand the panel and the scroll lock
  mobileQuery.addEventListener('change', (e) => {
    if (!e.matches && isMenuOpen()) toggleMenu({ focusOnOpen: false });
  });

  function toggleMenu(options = {}) {
    const { focusOnOpen = true } = options;

    // Toggle the hamburger menu
    menu.querySelector('svg').classList.toggle('open');

    // When the menu is open, we want to show the navigation panel
    if (sidebarContainer) {
      sidebarContainer.classList.toggle('hx:max-md:[transform:translate3d(0,-100%,0)]');
      sidebarContainer.classList.toggle('hx:max-md:[transform:translate3d(0,0,0)]');
    } else {
      const opening = isMenuOpen();
      if (opening) mobileNav.hidden = false;
      mobileNav.classList.toggle('open', opening);
      // Keep it out of the tree for assistive tech once the transition ends
      if (!opening) {
        window.setTimeout(() => {
          if (!isMenuOpen()) mobileNav.hidden = true;
        }, 200);
      }
    }

    // When the menu is open, we want to prevent the body from scrolling
    document.body.classList.toggle('hx:overflow-hidden');
    document.body.classList.toggle('hx:md:overflow-auto');

    // Sync aria-expanded and aria-hidden
    const isOpen = isMenuOpen();
    menu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    syncAriaHidden();

    // Move focus into panel when opening, restore when closing
    if (isOpen) {
      if (focusOnOpen) {
        const firstFocusable = panel.querySelector('a, button, input, [tabindex="0"]');
        if (firstFocusable) firstFocusable.focus();
      }
    } else {
      menu.focus();
    }
  }

  menu.addEventListener('click', (e) => {
    e.preventDefault();
    // Pointer-initiated clicks on mobile should not force focus into the search input,
    // which opens the software keyboard immediately.
    toggleMenu({ focusOnOpen: e.detail === 0 });
  });

  // Close menu on Escape key (mobile only)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('anortechwebui-search-dialog')?.open) return;
    if (mobileQuery.matches && isMenuOpen()) {
      toggleMenu();
    }
  });

  // Select all anchor tags in the panel
  const panelLinks = panel.querySelectorAll('a');

  // Add click event listener to each anchor tag
  panelLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      // In-page links keep the current document, so close the overlay by hand.
      // Navigations away from the page close it too — otherwise the scroll lock
      // survives into a back-button restore.
      if (window.innerWidth < 768 && isMenuOpen()) {
        if (!sidebarContainer || (href && href.startsWith('#'))) {
          toggleMenu({ focusOnOpen: false });
        }
      }
    });
  });
});
