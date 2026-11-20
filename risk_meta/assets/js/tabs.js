/**
 * Tabs: .tab-btn[data-tab] toggles .tab-content panels, scoped to the
 * closest section so multiple tab groups coexist on one page.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.tab-btn[data-tab]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = btn.getAttribute('data-tab');
                var container = btn.closest('section') || document;

                container.querySelectorAll('.tab-btn[data-tab]').forEach(function (b) { b.classList.remove('active'); });
                container.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });

                btn.classList.add('active');
                var target = document.getElementById(targetId);
                if (target) target.classList.add('active');
            });
        });
    });
})();
