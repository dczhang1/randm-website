/**
 * Navigation, tabs, mobile menu. No Plotly.
 */
document.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            var icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    var tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var targetId = btn.getAttribute('data-tab');
            var section = btn.closest('section');
            var container = section || document;

            container.querySelectorAll('.tab-btn[data-tab]').forEach(function (b) { b.classList.remove('active'); });
            container.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });

            btn.classList.add('active');
            var target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });

    // Highlight nav link for current page
    var path = window.location.pathname;
    var isResources = /resources\.html$/i.test(path);
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        var href = (a.getAttribute('href') || '').trim();
        var isHome = href === '#home' || href === 'index.html' || (href === '' && !isResources);
        var isRes = href === 'resources.html';
        a.classList.remove('active');
        if (isResources && isRes) a.classList.add('active');
        else if (!isResources && isHome) a.classList.add('active');
    });

    // Typing Animation for Hero Title
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        var textToType = heroTitle.textContent.trim();
        // Clear content but keep height to prevent layout shift if possible, 
        // though for a single line hero title, clearing is usually fine.
        heroTitle.textContent = '';
        
        // Create and append cursor
        var cursor = document.createElement('span');
        cursor.className = 'cursor';
        heroTitle.appendChild(cursor);

        var i = 0;
        var speed = 60; // ms per char

        function type() {
            if (i < textToType.length) {
                var char = textToType.charAt(i);
                var textNode = document.createTextNode(char);
                heroTitle.insertBefore(textNode, cursor);
                i++;
                setTimeout(type, speed);
            }
        }

        // Start typing after a short delay
        setTimeout(type, 300);
    }
});
