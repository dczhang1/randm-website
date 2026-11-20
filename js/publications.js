// publications.js — progressive enhancement: filter static entries.
// Without JS, every entry is visible (they live in the HTML).
(function () {
  'use strict';

  var links = document.querySelectorAll('.filter-link');
  var entries = document.querySelectorAll('.pub-entry');
  var years = document.querySelectorAll('.pub-year');
  if (!links.length || !entries.length) return;

  function apply(filter) {
    entries.forEach(function (e) {
      e.style.display = (filter === 'all' || e.getAttribute('data-type') === filter) ? '' : 'none';
    });
    // hide year headers whose every entry is hidden
    years.forEach(function (y) {
      var visibleInSection = false, n = y.nextElementSibling;
      while (n && !n.classList.contains('pub-year')) {
        if (n.classList.contains('pub-entry') && n.style.display !== 'none') visibleInSection = true;
        n = n.nextElementSibling;
      }
      y.style.display = visibleInSection ? '' : 'none';
    });
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('data-filter') === filter);
    });
    if (history.replaceState) history.replaceState(null, '', filter === 'all' ? '#top' : '#' + filter);
  }

  links.forEach(function (l) {
    l.addEventListener('click', function () { apply(l.getAttribute('data-filter')); });
  });

  var h = location.hash.replace('#', '');
  if (['article', 'chapter', 'other'].indexOf(h) > -1) apply(h);
})();
