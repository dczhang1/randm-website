// main.js — Swiss system core: mobile nav + anchor behavior. Nothing else.
(function () {
  'use strict';

  function initMobileNav() {
    var toggle = document.querySelector('.mobile-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
    }

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('open'));
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
  });
})();
