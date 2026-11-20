/* motion.js — site-wide scroll reveals + entrance stagger.
 * Progressive enhancement: adds .reveal at runtime (no-JS = fully visible).
 * Disabled entirely under prefers-reduced-motion. No dependencies.
 */
(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var STAGGER_SEL = '.program-cell, .team-card, .resource-entry, .log-line, .pi-row, .pub-entry, ' +
                    '.m-stat, .finding-card, .practitioner-card, .measure-card, .content-card, .llm-outcome-panel';

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  function tag(el, delay) {
    /* never tag elements inside display:none subtrees (e.g. inactive tab
       panels) — they would stay invisible when the tab is opened */
    if (!el.offsetParent) return;
    el.classList.add('reveal');
    el.style.transitionDelay = delay + 'ms';
    obs.observe(el);
  }

  document.querySelectorAll('.rule-section').forEach(function (sec, si) {
    var inner = sec.querySelectorAll(STAGGER_SEL);
    if (inner.length) {
      // stagger the inner blocks; the section itself stays still
      inner.forEach(function (el, i) { tag(el, Math.min(i, 8) * 70); });
    } else {
      tag(sec, Math.min(si, 3) * 60);
    }
  });
})();
