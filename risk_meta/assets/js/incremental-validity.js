// Incremental Validity Data - Risk Propensity over Big Five
const incrementalData = [
    { 
        outcome: 'CWB', 
        name: 'Counterproductive Work Behavior', 
        r2_big5: 0.249, 
        r2_total: 0.439, 
        delta_r2: 0.190,
        rp_beta: 0.492,
        rp_rel_weight_pct: 49.72
    },
    { 
        outcome: 'CREATIVEP', 
        name: 'Creative Performance', 
        r2_big5: 0.230, 
        r2_total: 0.312, 
        delta_r2: 0.082,
        rp_beta: 0.325,
        rp_rel_weight_pct: 36.53
    },
    { 
        outcome: 'TASK', 
        name: 'Task Performance', 
        r2_big5: 0.035, 
        r2_total: 0.059, 
        delta_r2: 0.024,
        rp_beta: 0.173,
        rp_rel_weight_pct: 31.72
    },
    { 
        outcome: 'SAFINCID', 
        name: 'Safety Incidents', 
        r2_big5: 0.042, 
        r2_total: 0.058, 
        delta_r2: 0.016,
        rp_beta: 0.144,
        rp_rel_weight_pct: 40.05
    },
    { 
        outcome: 'TRNINT', 
        name: 'Turnover Intentions', 
        r2_big5: 0.063, 
        r2_total: 0.078, 
        delta_r2: 0.015,
        rp_beta: 0.139,
        rp_rel_weight_pct: 18.85
    },
    { 
        outcome: 'SAFCOMPLY', 
        name: 'Safety Compliance', 
        r2_big5: 0.137, 
        r2_total: 0.148, 
        delta_r2: 0.011,
        rp_beta: -0.116,
        rp_rel_weight_pct: 16.08
    },
    { 
        outcome: 'OCB', 
        name: 'Org. Citizenship Behavior', 
        r2_big5: 0.048, 
        r2_total: 0.059, 
        delta_r2: 0.011,
        rp_beta: 0.117,
        rp_rel_weight_pct: 15.48
    },
    { 
        outcome: 'TRNBEH', 
        name: 'Turnover Behavior', 
        r2_big5: 0.125, 
        r2_total: 0.128, 
        delta_r2: 0.003,
        rp_beta: -0.060,
        rp_rel_weight_pct: 1.47
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderIncrementalValidity();
});

function renderIncrementalValidity() {
    const container = document.getElementById('incremental-plot');
    if (!container) return;

    // Sort by delta R² (incremental validity) - reverse for horizontal bars (largest at top)
    const sortedData = [...incrementalData].sort((a, b) => a.delta_r2 - b.delta_r2);

    const outcomes = sortedData.map(d => d.name);
    const r2Big5 = sortedData.map(d => d.r2_big5);
    const deltaR2 = sortedData.map(d => d.delta_r2);
    const r2Total = sortedData.map(d => d.r2_total);

    // Color coding based on strength of incremental validity
    const colors = sortedData.map(d => {
        if (d.delta_r2 > 0.05) return '#27ae60'; // Strong - Green
        if (d.delta_r2 > 0.01) return '#3498db'; // Moderate - Blue
        return '#95a5a6'; // Weak - Gray
    });

    // Create horizontal stacked bar chart showing Big Five R² and incremental RP contribution
    const traceBig5 = {
        x: r2Big5,
        y: outcomes,
        name: 'Big Five Only',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: '#bdc3c7',
            line: { color: '#7f8c8d', width: 1 }
        },
        hovertemplate: '<b>%{y}</b><br>' +
                       'Big Five R²: %{x:.3f}<br>' +
                       '<extra></extra>'
    };

    const traceRP = {
        x: deltaR2,
        y: outcomes,
        name: 'Incremental RP (ΔR²)',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: colors,
            line: { color: '#2c3e50', width: 1 }
        },
        customdata: sortedData.map(d => ({
            total: d.r2_total,
            beta: d.rp_beta,
            rel_weight: d.rp_rel_weight_pct,
            big5_r2: d.r2_big5
        })),
        hovertemplate: '<b>%{y}</b><br>' +
                       'RP ΔR²: %{x:.3f}<br>' +
                       'Big Five R²: %{customdata.big5_r2:.3f}<br>' +
                       'Total R²: %{customdata.total:.3f}<br>' +
                       'RP β: %{customdata.beta:.3f}<br>' +
                       'RP Relative Weight: %{customdata.rel_weight:.1f}%<br>' +
                       '<extra></extra>'
    };

    const layout = {
        title: { 
            text: 'Incremental Validity: Risk Propensity Over Big Five', 
            font: { size: 18 } 
        },
        xaxis: { 
            title: 'R² (Explained Variance)',
            range: [0, 0.5]
        },
        yaxis: { 
            title: 'Outcome',
            automargin: true
        },
        barmode: 'stack',
        margin: { l: 200, r: 80, t: 60, b: 50 },
        height: 550,
        legend: {
            x: 0.5,
            y: -0.1,
            xanchor: 'center',
            orientation: 'h'
        },
        annotations: sortedData.map((d, i) => ({
            x: r2Total[i] + 0.015,
            y: outcomes[i],
            text: `Δ${d.delta_r2.toFixed(3)}`,
            showarrow: false,
            font: { size: 10, color: colors[i], weight: 'bold' },
            bgcolor: 'rgba(255,255,255,0.9)',
            bordercolor: colors[i],
            borderwidth: 1,
            borderpad: 3,
            xanchor: 'left'
        }))
    };

    Plotly.newPlot('incremental-plot', [traceBig5, traceRP], layout, { responsive: true, displayModeBar: true });
}
