/**
 * Study database: fetch dat_dvs_clean.csv, render table, filter by outcome.
 * No DataTables; vanilla JS + CSS.
 */
(function () {
    'use strict';

    var studyData = [];
    var tbody = null;
    var filterEl = null;

    function fmtNum(x) {
        if (x == null || isNaN(x)) return '—';
        return Number.isInteger(x) ? x : x.toFixed(3);
    }

    // CSV Parser
    function parseCSV(text) {
        var lines = text.split('\n');
        // Handle empty file
        if (lines.length === 0) return [];

        var headers = lines[0].split(',').map(function(h) { return h.replace(/^"|"$/g, '').trim(); });
        var result = [];
        
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) continue;
            
            // Split by comma, respecting quotes
            var row = [];
            var inQuotes = false;
            var currentVal = '';
            
            for (var c = 0; c < line.length; c++) {
                var char = line[c];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    row.push(currentVal.replace(/^"|"$/g, ''));
                    currentVal = '';
                } else {
                    currentVal += char;
                }
            }
            row.push(currentVal.replace(/^"|"$/g, '')); // Push last value
            
            if (row.length === headers.length) {
                var obj = {};
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = row[j];
                }
                result.push(obj);
            }
        }
        return result;
    }

    function renderRows(data) {
        if (!tbody) return;
        tbody.innerHTML = data.map(function (d) {
            var ref = (d.reference || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            var year = d.year || '—';
            var outcome = d.outcome || '—';
            var n = d.n || '—';
            var rRaw = fmtNum(parseFloat(d.effect_size_raw));
            var rCorr = fmtNum(parseFloat(d.effect_size_corrected));
            var measure = d.outcome_measure_name || '—';
            
            return '<tr><td>' + ref + '</td><td>' + year + '</td><td>' + outcome + '</td><td>' + n + '</td><td>' + rRaw + '</td><td>' + rCorr + '</td><td>' + measure + '</td></tr>';
        }).join('');
    }

    function applyFilter() {
        var val = filterEl ? filterEl.value : '';
        var filtered = val ? studyData.filter(function (d) { return (d.outcome || '') === val; }) : studyData;
        renderRows(filtered);
    }

    function init() {
        tbody = document.querySelector('#studiesTable tbody');
        filterEl = document.getElementById('filter-outcome');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem;">Loading…</td></tr>';

        fetch('assets/data/dat_dvs_clean.csv')
            .then(function (r) { 
                if (!r.ok) throw new Error('Network response was not ok');
                return r.text(); 
            })
            .then(function (text) {
                var csvData = parseCSV(text);
                
                // Map CSV fields to internal structure
                studyData = csvData.map(function(row) {
                    // Clean up NA values from CSV
                    var clean = function(val) { return val === 'NA' ? null : val; };
                    
                    return {
                        reference: row['reference'],
                        year: clean(row['publication_year']),
                        outcome: row['outcome'],
                        n: clean(row['n']),
                        effect_size_raw: clean(row['rxy']),
                        effect_size_corrected: clean(row['rxy_c']),
                        outcome_measure_name: row['outcome_variable']
                    };
                });
                
                // Sort by year desc
                studyData.sort(function(a, b) { 
                    var ya = parseInt(a.year) || 0;
                    var yb = parseInt(b.year) || 0;
                    return yb - ya; 
                });

                applyFilter();
                if (filterEl) filterEl.addEventListener('change', applyFilter);
            })
            .catch(function (e) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#e74c3c;padding:2rem;">Failed to load studies. Check console.</td></tr>';
                console.error('data-table:', e);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();