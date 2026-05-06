document.addEventListener('DOMContentLoaded', () => {
  const profileTrigger = document.getElementById('profileTrigger');
  const profileMenu = document.getElementById('profileMenu');

  if (!profileTrigger || !profileMenu) {
    return;
  }

  const menuItems = Array.from(
    profileMenu.querySelectorAll('a[role="menuitem"], button[role="menuitem"]:not([disabled])')
  );

  function openMenu() {
    profileMenu.classList.add('open');
    profileTrigger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu({ restoreFocus = false } = {}) {
    profileMenu.classList.remove('open');
    profileTrigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) {
      profileTrigger.focus();
    }
  }

  function toggleMenu() {
    if (profileMenu.classList.contains('open')) {
      closeMenu({ restoreFocus: true });
    } else {
      openMenu();
    }
  }

  profileTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  profileTrigger.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openMenu();
      menuItems[0]?.focus();
    }
  });

  profileMenu.addEventListener('keydown', (event) => {
    const currentIndex = menuItems.indexOf(document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % menuItems.length;
      menuItems[nextIndex]?.focus();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
      menuItems[nextIndex]?.focus();
    }

    if (event.key === 'Tab') {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!profileMenu.contains(event.target) && !profileTrigger.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && profileMenu.classList.contains('open')) {
      closeMenu({ restoreFocus: true });
    }
  });

  profileMenu.querySelectorAll('[data-menu-close]').forEach((item) => {
    item.addEventListener('click', () => closeMenu());
  });
});
