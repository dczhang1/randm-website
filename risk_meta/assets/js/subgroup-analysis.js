/**
 * Subgroup Meta-Analysis Results Display
 * Interactive filtering and visualization of subgroup effects
 */

(function () {
    'use strict';

    var FALLBACK_DATA = [{"Outcome":"Counterproductive Work Behavior","Moderator":"Overall","Level":"All","k":12,"N":15448,"r":0.35,"rho":0.487,"95% CI (ρ)":"[0.386, 0.587]","Q":93.78,"df":11,"p-value":"< .001","I2":"88.3%"},{"Outcome":"Counterproductive Work Behavior","Moderator":"Outcome Source","Level":"Self_Reported","k":12,"N":15448,"r":0.35,"rho":0.487,"95% CI (ρ)":"[0.386, 0.587]","Q":93.78,"df":11,"p-value":"< .001","I2":"88.3%"},{"Outcome":"Counterproductive Work Behavior","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":4,"N":12923,"r":0.382,"rho":0.535,"95% CI (ρ)":"[0.415, 0.655]","Q":12.04,"df":3,"p-value":"0.007","I2":"75.1%"},{"Outcome":"Counterproductive Work Behavior","Moderator":"Risk Domain","Level":"General Risk","k":10,"N":14370,"r":0.266,"rho":0.386,"95% CI (ρ)":"[0.298, 0.474]","Q":50.25,"df":9,"p-value":"< .001","I2":"82.1%"},{"Outcome":"Counterproductive Work Behavior","Moderator":"Risk Quality","Level":"Not_Validated","k":5,"N":12772,"r":0.364,"rho":0.527,"95% CI (ρ)":"[0.343, 0.71]","Q":52.16,"df":4,"p-value":"< .001","I2":"92.3%"},{"Outcome":"Counterproductive Work Behavior","Moderator":"Risk Quality","Level":"Validated","k":8,"N":3028,"r":0.266,"rho":0.312,"95% CI (ρ)":"[0.156, 0.467]","Q":66.54,"df":7,"p-value":"< .001","I2":"89.5%"},{"Outcome":"Creativity Performance","Moderator":"Overall","Level":"All","k":18,"N":5688,"r":0.328,"rho":0.391,"95% CI (ρ)":"[0.269, 0.514]","Q":239.92,"df":17,"p-value":"< .001","I2":"92.9%"},{"Outcome":"Creativity Performance","Moderator":"Outcome Source","Level":"Non_SelfReport","k":7,"N":1908,"r":0.08,"rho":0.096,"95% CI (ρ)":"[-0.04, 0.231]","Q":24.33,"df":6,"p-value":"< .001","I2":"75.3%"},{"Outcome":"Creativity Performance","Moderator":"Outcome Source","Level":"Self_Reported","k":12,"N":4067,"r":0.433,"rho":0.519,"95% CI (ρ)":"[0.41, 0.628]","Q":77.13,"df":11,"p-value":"< .001","I2":"85.7%"},{"Outcome":"Creativity Performance","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":6,"N":1434,"r":0.191,"rho":0.22,"95% CI (ρ)":"[-0.031, 0.471]","Q":52.15,"df":5,"p-value":"< .001","I2":"90.4%"},{"Outcome":"Creativity Performance","Moderator":"Risk Domain","Level":"General Risk","k":14,"N":5035,"r":0.346,"rho":0.416,"95% CI (ρ)":"[0.282, 0.55]","Q":172.21,"df":13,"p-value":"< .001","I2":"92.5%"},{"Outcome":"Creativity Performance","Moderator":"Risk Quality","Level":"Not_Validated","k":6,"N":1509,"r":0.198,"rho":0.23,"95% CI (ρ)":"[-0.055, 0.516]","Q":73.55,"df":5,"p-value":"< .001","I2":"93.2%"},{"Outcome":"Creativity Performance","Moderator":"Risk Quality","Level":"Validated","k":12,"N":4179,"r":0.375,"rho":0.453,"95% CI (ρ)":"[0.314, 0.591]","Q":124.43,"df":11,"p-value":"< .001","I2":"91.2%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Overall","Level":"All","k":9,"N":1896,"r":0.076,"rho":0.089,"95% CI (ρ)":"[-0.065, 0.242]","Q":50.01,"df":8,"p-value":"< .001","I2":"84%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Outcome Source","Level":"Non_SelfReport","k":5,"N":774,"r":0.055,"rho":0.066,"95% CI (ρ)":"[-0.109, 0.24]","Q":8.4,"df":4,"p-value":"0.078","I2":"52.4%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Outcome Source","Level":"Self_Reported","k":4,"N":1023,"r":0.179,"rho":0.201,"95% CI (ρ)":"[-0.077, 0.478]","Q":18.72,"df":3,"p-value":"< .001","I2":"84%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":3,"N":495,"r":0.252,"rho":0.303,"95% CI (ρ)":"[-0.1, 0.706]","Q":6.14,"df":2,"p-value":"0.047","I2":"67.4%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Risk Domain","Level":"General Risk","k":6,"N":1401,"r":0.014,"rho":0.016,"95% CI (ρ)":"[-0.152, 0.184]","Q":23.33,"df":5,"p-value":"< .001","I2":"78.6%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Risk Quality","Level":"Not_Validated","k":6,"N":1042,"r":0.039,"rho":0.047,"95% CI (ρ)":"[-0.172, 0.266]","Q":25.9,"df":5,"p-value":"< .001","I2":"80.7%"},{"Outcome":"Organizational Citizenship Behavior","Moderator":"Risk Quality","Level":"Validated","k":3,"N":854,"r":0.122,"rho":0.137,"95% CI (ρ)":"[-0.397, 0.671]","Q":20.53,"df":2,"p-value":"< .001","I2":"90.3%"},{"Outcome":"Positive Deviance","Moderator":"Overall","Level":"All","k":8,"N":3094,"r":0.142,"rho":0.168,"95% CI (ρ)":"[0.025, 0.311]","Q":55.16,"df":7,"p-value":"< .001","I2":"87.3%"},{"Outcome":"Positive Deviance","Moderator":"Outcome Source","Level":"Self_Reported","k":7,"N":2937,"r":0.128,"rho":0.152,"95% CI (ρ)":"[0.004, 0.3]","Q":44.03,"df":6,"p-value":"< .001","I2":"86.4%"},{"Outcome":"Positive Deviance","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":5,"N":1442,"r":0.121,"rho":0.138,"95% CI (ρ)":"[-0.129, 0.406]","Q":41.22,"df":4,"p-value":"< .001","I2":"90.3%"},{"Outcome":"Positive Deviance","Moderator":"Risk Domain","Level":"General Risk","k":3,"N":1652,"r":0.159,"rho":0.192,"95% CI (ρ)":"[-0.151, 0.535]","Q":12.34,"df":2,"p-value":"0.002","I2":"83.8%"},{"Outcome":"Positive Deviance","Moderator":"Risk Quality","Level":"Not_Validated","k":7,"N":2566,"r":0.14,"rho":0.171,"95% CI (ρ)":"[-0.01, 0.352]","Q":55.39,"df":6,"p-value":"< .001","I2":"89.2%"},{"Outcome":"Safety Compliance","Moderator":"Overall","Level":"All","k":14,"N":12532,"r":-0.205,"rho":-0.255,"95% CI (ρ)":"[-0.342, -0.168]","Q":166.98,"df":13,"p-value":"< .001","I2":"92.2%"},{"Outcome":"Safety Compliance","Moderator":"Outcome Source","Level":"Self_Reported","k":14,"N":12532,"r":-0.204,"rho":-0.252,"95% CI (ρ)":"[-0.339, -0.165]","Q":168.72,"df":13,"p-value":"< .001","I2":"92.3%"},{"Outcome":"Safety Compliance","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":7,"N":2621,"r":-0.092,"rho":-0.115,"95% CI (ρ)":"[-0.328, 0.097]","Q":74.43,"df":6,"p-value":"< .001","I2":"91.9%"},{"Outcome":"Safety Compliance","Moderator":"Risk Domain","Level":"General Risk","k":9,"N":10298,"r":-0.229,"rho":-0.283,"95% CI (ρ)":"[-0.366, -0.199]","Q":64.36,"df":8,"p-value":"< .001","I2":"87.6%"},{"Outcome":"Safety Compliance","Moderator":"Risk Quality","Level":"Not_Validated","k":9,"N":10273,"r":-0.184,"rho":-0.234,"95% CI (ρ)":"[-0.341, -0.126]","Q":108.93,"df":8,"p-value":"< .001","I2":"92.7%"},{"Outcome":"Safety Compliance","Moderator":"Risk Quality","Level":"Validated","k":6,"N":2337,"r":-0.286,"rho":-0.322,"95% CI (ρ)":"[-0.515, -0.129]","Q":54.52,"df":5,"p-value":"< .001","I2":"90.8%"},{"Outcome":"Safety Incidents","Moderator":"Overall","Level":"All","k":8,"N":18912,"r":0.14,"rho":0.176,"95% CI (ρ)":"[0.055, 0.297]","Q":182.62,"df":7,"p-value":"< .001","I2":"96.2%"},{"Outcome":"Safety Incidents","Moderator":"Outcome Source","Level":"Non_SelfReport","k":2,"N":6887,"r":0.002,"rho":0.002,"95% CI (ρ)":"[-0.141, 0.145]","Q":0.5,"df":1,"p-value":"0.478","I2":"-98.8%"},{"Outcome":"Safety Incidents","Moderator":"Outcome Source","Level":"Self_Reported","k":6,"N":12025,"r":0.219,"rho":0.285,"95% CI (ρ)":"[0.239, 0.331]","Q":7.74,"df":5,"p-value":"0.171","I2":"35.4%"},{"Outcome":"Safety Incidents","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":3,"N":9497,"r":0.086,"rho":0.1,"95% CI (ρ)":"[-0.374, 0.575]","Q":170.58,"df":2,"p-value":"< .001","I2":"98.8%"},{"Outcome":"Safety Incidents","Moderator":"Risk Domain","Level":"General Risk","k":6,"N":11957,"r":0.186,"rho":0.257,"95% CI (ρ)":"[0.145, 0.37]","Q":56.79,"df":5,"p-value":"< .001","I2":"91.2%"},{"Outcome":"Safety Incidents","Moderator":"Risk Quality","Level":"Not_Validated","k":7,"N":17578,"r":0.133,"rho":0.168,"95% CI (ρ)":"[0.031, 0.305]","Q":171.67,"df":6,"p-value":"< .001","I2":"96.5%"},{"Outcome":"Task Performance","Moderator":"Overall","Level":"All","k":13,"N":3867,"r":0.097,"rho":0.12,"95% CI (ρ)":"[0.012, 0.228]","Q":71.73,"df":12,"p-value":"< .001","I2":"83.3%"},{"Outcome":"Task Performance","Moderator":"Outcome Source","Level":"Non_SelfReport","k":9,"N":2579,"r":0.095,"rho":0.121,"95% CI (ρ)":"[-0.007, 0.25]","Q":37.26,"df":8,"p-value":"< .001","I2":"78.5%"},{"Outcome":"Task Performance","Moderator":"Outcome Source","Level":"Self_Reported","k":5,"N":1963,"r":0.072,"rho":0.082,"95% CI (ρ)":"[-0.152, 0.315]","Q":43.11,"df":4,"p-value":"< .001","I2":"90.7%"},{"Outcome":"Task Performance","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":9,"N":2515,"r":0.137,"rho":0.177,"95% CI (ρ)":"[0.032, 0.321]","Q":39.13,"df":8,"p-value":"< .001","I2":"79.6%"},{"Outcome":"Task Performance","Moderator":"Risk Domain","Level":"General Risk","k":5,"N":1593,"r":0.036,"rho":0.043,"95% CI (ρ)":"[-0.156, 0.243]","Q":22.78,"df":4,"p-value":"< .001","I2":"82.4%"},{"Outcome":"Task Performance","Moderator":"Risk Quality","Level":"Not_Validated","k":8,"N":2339,"r":0.083,"rho":0.105,"95% CI (ρ)":"[-0.011, 0.222]","Q":23.54,"df":7,"p-value":"0.001","I2":"70.3%"},{"Outcome":"Task Performance","Moderator":"Risk Quality","Level":"Validated","k":4,"N":1303,"r":0.099,"rho":0.116,"95% CI (ρ)":"[-0.286, 0.518]","Q":44.75,"df":3,"p-value":"< .001","I2":"93.3%"},{"Outcome":"Turnover Behavior","Moderator":"Overall","Level":"All","k":4,"N":1563,"r":0.042,"rho":0.047,"95% CI (ρ)":"[-0.139, 0.233]","Q":12.9,"df":3,"p-value":"0.005","I2":"76.7%"},{"Outcome":"Turnover Behavior","Moderator":"Outcome Source","Level":"Non_SelfReport","k":2,"N":765,"r":-0.043,"rho":-0.048,"95% CI (ρ)":"[-0.579, 0.483]","Q":1.09,"df":1,"p-value":"0.296","I2":"8.5%"},{"Outcome":"Turnover Behavior","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":4,"N":1563,"r":0.042,"rho":0.047,"95% CI (ρ)":"[-0.139, 0.233]","Q":12.9,"df":3,"p-value":"0.005","I2":"76.7%"},{"Outcome":"Turnover Behavior","Moderator":"Risk Quality","Level":"Not_Validated","k":4,"N":1563,"r":0.042,"rho":0.047,"95% CI (ρ)":"[-0.139, 0.233]","Q":12.9,"df":3,"p-value":"0.005","I2":"76.7%"},{"Outcome":"Turnover Intention","Moderator":"Overall","Level":"All","k":10,"N":2832,"r":0.098,"rho":0.116,"95% CI (ρ)":"[0.044, 0.188]","Q":18.16,"df":9,"p-value":"0.033","I2":"50.4%"},{"Outcome":"Turnover Intention","Moderator":"Outcome Source","Level":"Self_Reported","k":9,"N":2256,"r":0.102,"rho":0.121,"95% CI (ρ)":"[0.034, 0.208]","Q":17.94,"df":8,"p-value":"0.022","I2":"55.4%"},{"Outcome":"Turnover Intention","Moderator":"Risk Domain","Level":"Domain Specific Risk","k":5,"N":1401,"r":0.133,"rho":0.162,"95% CI (ρ)":"[0.018, 0.306]","Q":10.11,"df":4,"p-value":"0.039","I2":"60.4%"},{"Outcome":"Turnover Intention","Moderator":"Risk Domain","Level":"General Risk","k":5,"N":1431,"r":0.063,"rho":0.072,"95% CI (ρ)":"[-0.019, 0.164]","Q":4.65,"df":4,"p-value":"0.326","I2":"13.9%"},{"Outcome":"Turnover Intention","Moderator":"Risk Quality","Level":"Not_Validated","k":6,"N":1437,"r":0.126,"rho":0.155,"95% CI (ρ)":"[0.023, 0.286]","Q":12.57,"df":5,"p-value":"0.028","I2":"60.2%"},{"Outcome":"Turnover Intention","Moderator":"Risk Quality","Level":"Validated","k":3,"N":1269,"r":0.06,"rho":0.069,"95% CI (ρ)":"[-0.081, 0.218]","Q":2.32,"df":2,"p-value":"0.313","I2":"13.8%"}];

document.addEventListener('DOMContentLoaded', function () {
    const outcomeFilter = document.getElementById('subgroup-outcome-filter');
    const resultsContainer = document.getElementById('subgroup-results');
    
    if (!outcomeFilter || !resultsContainer) {
        console.error('Subgroup analysis elements not found');
        return;
    }

    let subgroupData = [];

    // Load data from JSON file
    async function loadSubgroupData() {
        // Show loading state
        resultsContainer.innerHTML = `
            <div class="subgroup-loading">
                <p>Loading subgroup analysis results...</p>
            </div>
        `;

        try {
            var jsonUrl = new URL('assets/data/subgroup-results.json', document.location.href).href;
            var response = await fetch(jsonUrl);
            
            if (!response.ok) {
                throw new Error('HTTP ' + response.status + ': ' + response.statusText);
            }
            
            subgroupData = await response.json();
            
            if (!Array.isArray(subgroupData) || subgroupData.length === 0) {
                throw new Error('Data file is empty or invalid');
            }
            
            console.log(`Loaded ${subgroupData.length} subgroup analysis records`);
            
            // Populate outcome filter with unique outcomes from data
            const uniqueOutcomes = [...new Set(subgroupData.map(item => item.Outcome))].sort();
            
            // Clear existing options except the first one
            while (outcomeFilter.options.length > 1) {
                outcomeFilter.remove(1);
            }
            
            uniqueOutcomes.forEach(outcome => {
                const option = document.createElement('option');
                option.value = outcome;
                option.textContent = outcome;
                outcomeFilter.appendChild(option);
            });
            
            // Show initial message
            renderInitialMessage();
        } catch (err) {
            console.warn('Subgroup fetch failed, using embedded data:', err);
            subgroupData = FALLBACK_DATA;
            var uo = [];
            for (var i = 0; i < subgroupData.length; i++) {
                var o = subgroupData[i].Outcome;
                if (uo.indexOf(o) === -1) uo.push(o);
            }
            uo.sort();
            while (outcomeFilter.options.length > 1) outcomeFilter.remove(1);
            for (var j = 0; j < uo.length; j++) {
                var opt = document.createElement('option');
                opt.value = uo[j];
                opt.textContent = uo[j];
                outcomeFilter.appendChild(opt);
            }
            renderInitialMessage();
        }
    }

    // Show initial message
    function renderInitialMessage() {
        resultsContainer.innerHTML = `
            <div class="subgroup-no-results">
                <p><i class="fas fa-info-circle" style="font-size: 2rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i></p>
                <p>Select an outcome from the dropdown above to view all subgroup analyses.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">Subgroup analyses examine how effect sizes vary across methodological and substantive moderators.</p>
            </div>
        `;
    }

    // Filter data based on outcome selection
    function filterData() {
        const selectedOutcome = outcomeFilter.value;

        if (!selectedOutcome) {
            renderInitialMessage();
            return;
        }

        const filteredData = subgroupData.filter(item => item.Outcome === selectedOutcome);

        if (filteredData.length === 0) {
            resultsContainer.innerHTML = `
                <div class="subgroup-no-results">
                    <p>No subgroup analyses available for this outcome.</p>
                </div>
            `;
            return;
        }

        renderResults(filteredData);
    }

    function formatLevel(s) {
        if (!s) return 'All Studies';
        return s.replace(/_/g, ' ').replace(/Non SelfReport/g, 'Non–Self-Report').replace(/Self Reported/g, 'Self-Reported').replace(/Not Validated/g, 'Not Validated');
    }

    // Render results
    function renderResults(filteredData) {
        // Group by moderator within the selected outcome
        const groupedByModerator = {};
        filteredData.forEach(item => {
            if (!groupedByModerator[item.Moderator]) {
                groupedByModerator[item.Moderator] = [];
            }
            groupedByModerator[item.Moderator].push(item);
        });

        // Get the outcome name from first item
        var outcomeName = (filteredData[0] && filteredData[0].Outcome) || 'Selected Outcome';

        let html = '';
        html += `<div class="subgroup-outcome-section">`;
        html += `<div class="subgroup-outcome-header"><h4>${outcomeName}</h4></div>`;

        // Render each moderator group
        Object.keys(groupedByModerator).sort((a, b) => {
            // Put "Overall" first
            if (a === 'Overall') return -1;
            if (b === 'Overall') return 1;
            return a.localeCompare(b);
        }).forEach(moderator => {
            const moderatorData = groupedByModerator[moderator];
            
            html += `<div class="subgroup-moderator-group">`;
            html += `<div class="subgroup-moderator-header">${moderator}</div>`;
            html += `<div class="subgroup-levels-grid">`;

            // Render each level
            moderatorData.forEach(item => {
                    const isOverall = item.Moderator === 'Overall';
                    const rho = parseFloat(item.rho) || 0;
                    var ciStr = item['95% CI (ρ)'] || '';
                    var ciLL = null, ciUL = null;
                    var m = ciStr.match(/\[([-\d.]+)/);
                    if (m) ciLL = parseFloat(m[1]);
                    m = ciStr.match(/([-\d.]+)\]/);
                    if (m) ciUL = parseFloat(m[1]);
                    const pValue = item['p-value'];
                    const isSignificant = pValue && pValue !== '< .001' && parseFloat(pValue) < 0.05;
                    
                    // Calculate effect bar width (normalized to max effect size of 0.6)
                    const maxEffect = 0.6;
                    const barWidth = Math.min(Math.abs(rho) / maxEffect * 100, 100);

                    html += `<div class="subgroup-level-card ${isOverall ? 'overall' : ''}">`;
                    
                    if (isSignificant || pValue === '< .001') {
                        html += `<span class="subgroup-significance significant">Significant</span>`;
                    } else if (pValue && parseFloat(pValue) >= 0.05) {
                        html += `<span class="subgroup-significance non-significant">ns</span>`;
                    }

                    html += '<div class="subgroup-level-name">' + formatLevel(item.Level) + '</div>';
                    
                    html += `<div class="subgroup-effect-size">`;
                    html += `<span class="subgroup-rho">ρ = ${rho.toFixed(3)}</span>`;
                    if (ciLL !== null && ciUL !== null) {
                        html += `<div class="subgroup-ci">95% CI [${ciLL.toFixed(3)}, ${ciUL.toFixed(3)}]</div>`;
                    }
                    html += `</div>`;

                    // Effect size bar
                    html += `<div class="subgroup-effect-bar">`;
                    html += `<div class="subgroup-effect-bar-fill" style="width: ${barWidth}%;"></div>`;
                    html += `</div>`;

                    html += `<div class="subgroup-stats">`;
                    html += `<div class="subgroup-stat">`;
                    html += `<span class="subgroup-stat-label">Studies (k)</span>`;
                    html += `<span class="subgroup-stat-value">${item.k || 'N/A'}</span>`;
                    html += `</div>`;
                    html += `<div class="subgroup-stat">`;
                    html += `<span class="subgroup-stat-label">Sample Size (N)</span>`;
                    html += `<span class="subgroup-stat-value">${item.N ? item.N.toLocaleString() : 'N/A'}</span>`;
                    html += `</div>`;
                    html += `<div class="subgroup-stat">`;
                    html += `<span class="subgroup-stat-label">I²</span>`;
                    html += `<span class="subgroup-stat-value">${item.I2 || 'N/A'}</span>`;
                    html += `</div>`;
                    html += `<div class="subgroup-stat">`;
                    html += `<span class="subgroup-stat-label">p-value</span>`;
                    html += `<span class="subgroup-stat-value">${pValue || 'N/A'}</span>`;
                    html += `</div>`;
                    html += `</div>`;

                    html += `</div>`;
                });

                html += `</div></div>`;
        });

        html += `</div>`;
        resultsContainer.innerHTML = html;
    }

    // Event listener
    outcomeFilter.addEventListener('change', filterData);

    // Load data on page load
    loadSubgroupData();
});

})();
