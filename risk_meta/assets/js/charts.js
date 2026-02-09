/**
 * Custom CSS-based charts: forest (criterion), incremental validity, nomological network.
 * Replaces Plotly. Uses viz-bar-row, bar-track, bar-fill and scroll-in animation.
 */

(function () {
    'use strict';

    const metaData = [
        { outcome: 'CWB', name: 'Counterproductive Work Behavior', k: 12, N: 15448, rho: 0.49, ci_lower: 0.39, ci_upper: 0.59, type: 'negative' },
        { outcome: 'CREATIVEP', name: 'Creative Performance', k: 18, N: 5688, rho: 0.39, ci_lower: 0.27, ci_upper: 0.51, type: 'positive' },
        { outcome: 'SAFCOMPLY', name: 'Safety Compliance', k: 14, N: 12532, rho: -0.26, ci_lower: -0.34, ci_upper: -0.17, type: 'safety' },
        { outcome: 'SAFINCID', name: 'Safety Incidents', k: 8, N: 18912, rho: 0.18, ci_lower: 0.06, ci_upper: 0.30, type: 'safety' },
        { outcome: 'TASK', name: 'Task Performance', k: 13, N: 3867, rho: 0.12, ci_lower: 0.01, ci_upper: 0.23, type: 'neutral' },
        { outcome: 'OCB', name: 'Organizational Citizenship Behavior', k: 9, N: 1896, rho: 0.09, ci_lower: -0.07, ci_upper: 0.24, type: 'neutral' },
        { outcome: 'TRNINT', name: 'Turnover Intentions', k: 10, N: 2832, rho: 0.12, ci_lower: 0.04, ci_upper: 0.19, type: 'neutral' },
        { outcome: 'TRNBEH', name: 'Turnover Behavior', k: 4, N: 1563, rho: 0.05, ci_lower: -0.14, ci_upper: 0.23, type: 'neutral' },
        { outcome: 'POSDEV', name: 'Positive Deviance', k: 8, N: 3094, rho: 0.17, ci_lower: 0.03, ci_upper: 0.31, type: 'positive' }
    ];

    const incrementalData = [
        { outcome: 'CWB', name: 'Counterproductive Work Behavior', r2_big5: 0.249, r2_total: 0.439, delta_r2: 0.190 },
        { outcome: 'CREATIVEP', name: 'Creative Performance', r2_big5: 0.230, r2_total: 0.312, delta_r2: 0.082 },
        { outcome: 'TASK', name: 'Task Performance', r2_big5: 0.035, r2_total: 0.059, delta_r2: 0.024 },
        { outcome: 'SAFINCID', name: 'Safety Incidents', r2_big5: 0.042, r2_total: 0.058, delta_r2: 0.016 },
        { outcome: 'TRNINT', name: 'Turnover Intentions', r2_big5: 0.063, r2_total: 0.078, delta_r2: 0.015 },
        { outcome: 'SAFCOMPLY', name: 'Safety Compliance', r2_big5: 0.137, r2_total: 0.148, delta_r2: 0.011 },
        { outcome: 'OCB', name: 'Org. Citizenship Behavior', r2_big5: 0.048, r2_total: 0.059, delta_r2: 0.011 },
        { outcome: 'TRNBEH', name: 'Turnover Behavior', r2_big5: 0.125, r2_total: 0.128, delta_r2: 0.003 }
    ];

    const nomologicalData = [
        { trait: 'Proactivity', k: 4, N: 911, rho: 0.359, ci_lower: 0.121, ci_upper: 0.597 },
        { trait: 'Creativity', k: 7, N: 2142, rho: 0.354, ci_lower: 0.082, ci_upper: 0.627 },
        { trait: 'Locus of Control', k: 9, N: 2476, rho: 0.284, ci_lower: 0.159, ci_upper: 0.409 },
        { trait: 'Self-Control', k: 2, N: 630, rho: -0.269, ci_lower: -3.004, ci_upper: 2.467 },
        { trait: 'Dark Traits', k: 6, N: 3433, rho: 0.134, ci_lower: 0.025, ci_upper: 0.244 },
        { trait: 'Trust', k: 3, N: 808, rho: 0.127, ci_lower: -0.55, ci_upper: 0.804 },
        { trait: 'Self-Esteem', k: 6, N: 11296, rho: 0.111, ci_lower: -0.013, ci_upper: 0.235 }
    ];

    const MAX_ABS_RHO = 0.55;
    const MAX_R2 = 0.5;

    function animateCounters() {
        var cards = document.querySelectorAll('.stat-card .stat-number[data-count]');
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var end = parseInt(el.getAttribute('data-count'), 10);
                if (isNaN(end) || el.getAttribute('data-done') === '1') return;
                el.setAttribute('data-done', '1');
                var suffix = el.getAttribute('data-suffix') || '';
                var duration = 1200;
                var start = 0;
                var startTime = performance.now();
                function step(now) {
                    var t = Math.min((now - startTime) / duration, 1);
                    var eased = t * (2 - t);
                    var v = Math.round(start + (end - start) * eased);
                    el.textContent = v + suffix;
                    if (t < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            });
        }, { threshold: 0.4 });
        cards.forEach(function (el) { observer.observe(el); });
    }

    function renderForest() {
        const wrap = document.getElementById('forest-bars');
        if (!wrap) return;
        const sorted = metaData.slice().sort(function (a, b) { return a.rho - b.rho; });
        wrap.innerHTML = sorted.map(function (d, i) {
            const pct = Math.abs(d.rho) / MAX_ABS_RHO;
            const neg = d.rho < 0;
            var fillClass = 'bar-fill' + (neg ? ' neg' : '');
            return (
                '<div class="viz-bar-row" data-delay="' + i + '">' +
                '<div class="bar-header">' +
                '<span class="bar-name">' + d.name + '</span>' +
                '<span class="bar-value">ρ = ' + (d.rho >= 0 ? '' : '−') + Math.abs(d.rho).toFixed(2) + ' [' + d.ci_lower.toFixed(2) + ', ' + d.ci_upper.toFixed(2) + ']</span>' +
                '</div>' +
                '<div class="bar-track">' +
                '<div class="' + fillClass + '" style="width:100%;transform:scaleX(0);transform-origin:left;" data-pct="' + pct + '"></div>' +
                '</div>' +
                '</div>'
            );
        }).join('');

        wrap.querySelectorAll('.viz-bar-row').forEach(function (row) {
            row.classList.add('visible');
            var fill = row.querySelector('.bar-fill');
            if (!fill) return;
            var pct = parseFloat(fill.getAttribute('data-pct'), 10);
            requestAnimationFrame(function () {
                fill.style.transition = 'transform 1s cubic-bezier(0.4,0,0.2,1)';
                fill.style.transform = 'scaleX(' + pct + ')';
            });
        });
    }

    function renderCriterionCards() {
        const container = document.getElementById('criterion-cards');
        if (!container) return;
        const desc = {
            CREATIVEP: 'Risk-prone employees are more likely to generate novel ideas and challenge the status quo.',
            SAFCOMPLY: 'Higher risk propensity predicts significantly lower compliance with safety rules.',
            SAFINCID: 'More accidents and injuries.',
            CWB: 'Risk-taking is strongly associated with counterproductive behaviors and workplace deviance.',
            TASK: 'No strong link to general job performance; not a universal productivity driver.',
            OCB: 'Inconsistent relationship with helping behaviors (OCB).',
            TRNINT: 'Risk-takers are slightly more likely to intend to leave their jobs.',
            TRNBEH: 'No clear link to actual turnover.',
            POSDEV: 'Engaging in prosocial rule-breaking.'
        };
        const extras = {
            SAFCOMPLY: '<div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border);"><strong>Safety Incidents:</strong> ρ = 0.18 [0.06, 0.30]<br><span style="font-size:0.85rem;color:var(--text-muted);">k = 8, N = 18,912</span></div>',
            TRNINT: '<div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border);"><strong>Turnover Behavior:</strong> ρ = 0.05 [−0.14, 0.23]<br><span style="font-size:0.85rem;color:var(--text-muted);">k = 4, N = 1,563</span></div>'
        };
        const icons = { CREATIVEP: 'fa-lightbulb', SAFCOMPLY: 'fa-hard-hat', SAFINCID: 'fa-exclamation-triangle', CWB: 'fa-ban', TASK: 'fa-tasks', OCB: 'fa-hand-holding-heart', TRNINT: 'fa-door-open', TRNBEH: 'fa-door-open', POSDEV: 'fa-star' };
        const order = ['CREATIVEP', 'SAFCOMPLY', 'CWB', 'TASK', 'OCB', 'TRNINT'];
        const rest = metaData.filter(function (d) { return order.indexOf(d.outcome) === -1; });
        const list = order.map(function (o) { return metaData.find(function (d) { return d.outcome === o; }); }).filter(Boolean).concat(rest);

        container.innerHTML = list.map(function (d) {
            const cls = 'finding-card card ' + (d.type || 'neutral');
            const icon = icons[d.outcome] || 'fa-chart-line';
            const ci = '[' + d.ci_lower.toFixed(2) + ', ' + d.ci_upper.toFixed(2) + ']';
            const extra = extras[d.outcome] || '';
            return (
                '<div class="' + cls + '">' +
                '<h4><i class="fas ' + icon + '"></i> ' + d.name + '</h4>' +
                '<div class="finding-stat">ρ = ' + (d.rho >= 0 ? '' : '−') + Math.abs(d.rho).toFixed(2) + '</div>' +
                '<div class="finding-meta">95% CI ' + ci + ' · k = ' + d.k + ', N = ' + d.N.toLocaleString() + '</div>' +
                '<p>' + (desc[d.outcome] || '') + '</p>' +
                extra +
                '</div>'
            );
        }).join('');
    }

    function renderIncremental() {
        const wrap = document.getElementById('incremental-bars');
        if (!wrap) return;
        const sorted = incrementalData.slice().sort(function (a, b) { return b.delta_r2 - a.delta_r2; });
        wrap.innerHTML = sorted.map(function (d, i) {
            const big5Pct = (d.r2_big5 / MAX_R2) * 100;
            const rpPct = (d.delta_r2 / MAX_R2) * 100;
            var rpClass = 'rp-weak';
            if (d.delta_r2 > 0.05) rpClass = 'rp-strong';
            else if (d.delta_r2 > 0.01) rpClass = 'rp-moderate';
            return (
                '<div class="viz-bar-row" data-delay="' + i + '">' +
                '<div class="bar-header">' +
                '<span class="bar-name">' + d.name + '</span>' +
                '<span class="bar-value">ΔR² = ' + d.delta_r2.toFixed(3) + '</span>' +
                '</div>' +
                '<div class="bar-track" style="height:28px;display:flex;">' +
                '<div class="bar-stack-segment big5" style="flex:0 0 0%;transition:flex 0.8s cubic-bezier(0.4,0,0.2,1);" data-pct="' + big5Pct + '"></div>' +
                '<div class="bar-stack-segment ' + rpClass + '" style="flex:0 0 0%;transition:flex 0.8s cubic-bezier(0.4,0,0.2,1);" data-pct="' + rpPct + '"></div>' +
                '</div>' +
                '</div>'
            );
        }).join('');

        wrap.querySelectorAll('.viz-bar-row').forEach(function (row, idx) {
            row.classList.add('visible');
            var segs = row.querySelectorAll('.bar-stack-segment');
            setTimeout(function () {
                segs.forEach(function (s) {
                    var pct = s.getAttribute('data-pct');
                    s.style.flex = '0 0 ' + pct + '%';
                });
            }, 50 * idx);
        });
    }

    function renderNomological() {
        const wrap = document.getElementById('nomological-bars');
        if (!wrap) return;
        const sorted = nomologicalData.slice().sort(function (a, b) { return a.rho - b.rho; });
        wrap.innerHTML = sorted.map(function (d, i) {
            var pct = Math.abs(d.rho) / MAX_ABS_RHO;
            var neg = d.rho < 0;
            var fillClass = 'bar-fill' + (neg ? ' neg' : '');
            return (
                '<div class="viz-bar-row" data-delay="' + i + '">' +
                '<div class="bar-header">' +
                '<span class="bar-name">' + d.trait + '</span>' +
                '<span class="bar-value">ρ = ' + (d.rho >= 0 ? '' : '−') + Math.abs(d.rho).toFixed(3) + ' (k=' + d.k + ', N=' + d.N.toLocaleString() + ')</span>' +
                '</div>' +
                '<div class="bar-track">' +
                '<div class="' + fillClass + '" style="width:100%;transform:scaleX(0);transform-origin:left;" data-pct="' + pct + '"></div>' +
                '</div>' +
                '</div>'
            );
        }).join('');

        wrap.querySelectorAll('.viz-bar-row').forEach(function (row) {
            row.classList.add('visible');
            var fill = row.querySelector('.bar-fill');
            if (!fill) return;
            var pct = parseFloat(fill.getAttribute('data-pct'), 10);
            requestAnimationFrame(function () {
                fill.style.transition = 'transform 1s cubic-bezier(0.4,0,0.2,1)';
                fill.style.transform = 'scaleX(' + pct + ')';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderForest();
        renderCriterionCards();
        renderIncremental();
        renderNomological();
        animateCounters();
    });
})();
