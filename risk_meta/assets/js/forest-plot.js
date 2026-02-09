const metaData = [
    { outcome: 'CWB', name: 'Counterproductive Work Behavior', k: 12, N: 15448, rho: 0.49, ci_lower: 0.39, ci_upper: 0.59, desc: 'Positive relationship with deviant behaviors.' },
    { outcome: 'OCB', name: 'Org. Citizenship Behavior', k: 9, N: 1896, rho: 0.09, ci_lower: -0.07, ci_upper: 0.24, desc: 'Weak/inconsistent relationship with helping.' },
    { outcome: 'SAFINCID', name: 'Safety Incidents', k: 8, N: 18912, rho: 0.18, ci_lower: 0.06, ci_upper: 0.30, desc: 'More accidents/injuries.' },
    { outcome: 'TASK', name: 'Task Performance', k: 13, N: 3867, rho: 0.12, ci_lower: 0.01, ci_upper: 0.23, desc: 'Small positive link to performance.' },
    { outcome: 'TRNINT', name: 'Turnover Intentions', k: 10, N: 2832, rho: 0.12, ci_lower: 0.04, ci_upper: 0.19, desc: 'Slightly more likely to consider quitting.' },
    { outcome: 'TRNBEH', name: 'Turnover Behavior', k: 4, N: 1563, rho: 0.05, ci_lower: -0.14, ci_upper: 0.23, desc: 'No clear link to actual turnover.' },
    { outcome: 'POSDEV', name: 'Positive Deviance', k: 8, N: 3094, rho: 0.17, ci_lower: 0.03, ci_upper: 0.31, desc: 'Engaging in prosocial rule-breaking.' },
    { outcome: 'CREATIVEP', name: 'Creative Performance', k: 18, N: 5688, rho: 0.39, ci_lower: 0.27, ci_upper: 0.51, desc: 'Strong link to innovation.' },
    { outcome: 'SAFCOMPLY', name: 'Safety Compliance', k: 14, N: 12532, rho: -0.26, ci_lower: -0.34, ci_upper: -0.17, desc: 'Less likely to follow safety rules.' }
];

document.addEventListener('DOMContentLoaded', () => {
    renderForestPlot();
    populateTable();
});

function renderForestPlot() {
    const container = document.getElementById('forest-plot');
    if (!container) return;

    // Sort by effect size for better visualization
    const sortedData = [...metaData].sort((a, b) => a.rho - b.rho);

    const outcomes = sortedData.map(d => d.name);
    const rhos = sortedData.map(d => d.rho);
    const lowerErrors = sortedData.map(d => d.rho - d.ci_lower);
    const upperErrors = sortedData.map(d => d.ci_upper - d.rho);
    const colors = sortedData.map(d => {
        if (d.outcome === 'SAFCOMPLY' || d.outcome === 'CWB' || d.outcome === 'SAFINCID') return '#e74c3c'; // Negative/Harmful
        if (d.outcome === 'CREATIVEP' || d.outcome === 'POSDEV') return '#27ae60'; // Positive/Beneficial
        return '#3498db'; // Neutral/Mixed
    });

    const trace = {
        x: rhos,
        y: outcomes,
        error_x: {
            type: 'data',
            symmetric: false,
            array: upperErrors,
            arrayminus: lowerErrors,
            color: '#2c3e50',
            thickness: 2,
            width: 5
        },
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: colors,
            size: 12
        },
        hovertemplate: '<b>%{y}</b><br>' +
                       'ρ: %{x:.2f}<br>' +
                       '<extra></extra>'
    };

    const layout = {
        title: { text: 'Meta-Analytic Correlation with Risk Propensity', font: { size: 18 } },
        xaxis: { 
            title: 'Corrected Correlation (ρ)', 
            zeroline: true, 
            zerolinecolor: '#999',
            range: [-0.5, 0.7]
        },
        yaxis: { 
            automargin: true 
        },
        margin: { l: 150, r: 20, t: 50, b: 50 },
        height: 500
    };

    Plotly.newPlot('forest-plot', [trace], layout, { responsive: true, displayModeBar: false });
}

function populateTable() {
    const tbody = document.getElementById('meta-table-body');
    if (!tbody) return;

    tbody.innerHTML = metaData.map(d => `
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px;">${d.name}</td>
            <td style="padding: 12px;">${d.k}</td>
            <td style="padding: 12px;">${d.N.toLocaleString()}</td>
            <td style="padding: 12px;">${d.rho.toFixed(2)}</td>
            <td style="padding: 12px;">[${d.ci_lower.toFixed(2)}, ${d.ci_upper.toFixed(2)}]</td>
            <td style="padding: 12px;">--</td> 
        </tr>
    `).join('');
}
