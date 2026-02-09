/**
 * LLM attribute comparison: fetch llm-ratings.json, render two outcome panels
 * with dimension bars (Risk, Benefit, Uncertainty, Org Valence). No Chart.js.
 */
(function () {
    'use strict';

    var llmRatings = {};
    var names = {
        CREATIVEP: 'Creative Performance',
        CWB: 'Counterproductive Behavior',
        OCB: 'OCB',
        SAFINCID: 'Safety Incidents',
        SAFCOMPLY: 'Safety Compliance',
        TASK: 'Task Performance',
        TRNINT: 'Turnover Intentions',
        POSDEV: 'Positive Deviance'
    };
    var dims = [
        { key: 'personal_risk', label: 'Personal Risk' },
        { key: 'personal_benefit', label: 'Personal Benefit' },
        { key: 'uncertainty', label: 'Uncertainty' },
        { key: 'org_valence', label: 'Org Valence' }
    ];

    function panelHtml(key) {
        var d = llmRatings[key];
        var name = names[key] || key;
        if (!d) return '<div class="llm-outcome-panel"><h4>' + name + '</h4><p style="color:var(--text-muted);">No data.</p></div>';
        var rows = dims.map(function (dim) {
            var v = d[dim.key];
            var val = (v != null && typeof v === 'number') ? v : 0;
            var pct = Math.min(100, Math.max(0, val * 10));
            return (
                '<div class="llm-dim-row">' +
                '<span class="llm-dim-label">' + dim.label + '</span>' +
                '<div class="llm-dim-bar"><div class="llm-dim-fill" style="width:' + pct + '%;"></div></div>' +
                '<span class="llm-dim-value">' + (typeof v === 'number' ? v.toFixed(2) : '—') + '</span>' +
                '</div>'
            );
        }).join('');
        return '<div class="llm-outcome-panel"><h4>' + name + '</h4>' + rows + '</div>';
    }

    function updateChart() {
        var wrap = document.getElementById('llm-comparison');
        var textEl = document.getElementById('comparison-text');
        var s1 = document.getElementById('outcome1-select');
        var s2 = document.getElementById('outcome2-select');
        if (!wrap || !s1 || !s2) return;
        var k1 = s1.value, k2 = s2.value;
        wrap.innerHTML = panelHtml(k1) + panelHtml(k2);

        if (textEl) {
            var a = llmRatings[k1], b = llmRatings[k2];
            if (a && b) {
                var dr = (a.personal_risk || 0) - (b.personal_risk || 0);
                var db = (a.personal_benefit || 0) - (b.personal_benefit || 0);
                var riskStr = dr > 1 ? 'higher on Personal Risk' : (dr < -1 ? 'lower on Personal Risk' : 'similarly on Personal Risk');
                var benefitStr = db > 1 ? 'higher on Personal Benefit' : (db < -1 ? 'lower on Personal Benefit' : 'similarly on Personal Benefit');
                textEl.textContent = (names[k1] || k1) + ' scores ' + riskStr + ' and ' + benefitStr + ' compared to ' + (names[k2] || k2) + '.';
            } else {
                textEl.textContent = '';
            }
        }
    }

    function init() {
        var s1 = document.getElementById('outcome1-select');
        var s2 = document.getElementById('outcome2-select');
        if (!s1 || !s2) return;

        fetch('assets/data/llm-ratings.json')
            .then(function (r) { return r.json(); })
            .then(function (data) {
                llmRatings = data || {};
                updateChart();
                s1.addEventListener('change', updateChart);
                s2.addEventListener('change', updateChart);
            })
            .catch(function (e) {
                console.error('comparison-tool:', e);
                var wrap = document.getElementById('llm-comparison');
                if (wrap) wrap.innerHTML = '<p style="color:var(--text-muted);">Could not load LLM ratings.</p>';
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
