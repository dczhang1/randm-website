// Nomological Network Data - Meta-analytic correlations between risk propensity and related traits
const nomologicalData = [
    { 
        trait: 'Locus of Control', 
        k: 9, 
        N: 2476, 
        rho: 0.284, 
        ci_lower: 0.159, 
        ci_upper: 0.409, 
        desc: 'Risk-prone individuals tend to have more internal locus of control.' 
    },
    { 
        trait: 'Self-Esteem', 
        k: 6, 
        N: 11296, 
        rho: 0.111, 
        ci_lower: -0.013, 
        ci_upper: 0.235, 
        desc: 'Weak positive relationship with self-esteem.' 
    },
    { 
        trait: 'Dark Traits', 
        k: 6, 
        N: 3433, 
        rho: 0.134, 
        ci_lower: 0.025, 
        ci_upper: 0.244, 
        desc: 'Small positive correlation with dark personality traits.' 
    },
    { 
        trait: 'Trust', 
        k: 3, 
        N: 808, 
        rho: 0.127, 
        ci_lower: -0.55, 
        ci_upper: 0.804, 
        desc: 'Positive but highly variable relationship with trust.' 
    },
    { 
        trait: 'Proactivity', 
        k: 4, 
        N: 911, 
        rho: 0.359, 
        ci_lower: 0.121, 
        ci_upper: 0.597, 
        desc: 'Strong positive relationship with proactive behavior.' 
    },
    { 
        trait: 'Creativity', 
        k: 7, 
        N: 2142, 
        rho: 0.354, 
        ci_lower: 0.082, 
        ci_upper: 0.627, 
        desc: 'Strong positive correlation with creativity.' 
    },
    { 
        trait: 'Self-Control', 
        k: 2, 
        N: 630, 
        rho: -0.269, 
        ci_lower: -3.004, 
        ci_upper: 2.467, 
        desc: 'Negative relationship with self-control (though CI is wide).' 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderNomologicalNetwork();
});

function renderNomologicalNetwork() {
    const container = document.getElementById('nomological-plot');
    if (!container) return;

    // Sort by effect size for better visualization
    const sortedData = [...nomologicalData].sort((a, b) => a.rho - b.rho);

    const traits = sortedData.map(d => d.trait);
    const rhos = sortedData.map(d => d.rho);
    const lowerErrors = sortedData.map(d => d.rho - d.ci_lower);
    const upperErrors = sortedData.map(d => d.ci_upper - d.rho);
    const kValues = sortedData.map(d => d.k);
    const nValues = sortedData.map(d => d.N.toLocaleString());
    
    // Color coding: positive correlations in green/blue, negative in red
    const colors = sortedData.map(d => {
        if (d.rho < 0) return '#e74c3c'; // Negative - Red
        if (d.rho > 0.3) return '#27ae60'; // Strong positive - Green
        return '#3498db'; // Moderate positive - Blue
    });

    const trace = {
        x: rhos,
        y: traits,
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
            size: 14,
            line: {
                color: '#2c3e50',
                width: 1
            }
        },
        text: sortedData.map((d, i) => `k: ${d.k}<br>N: ${d.N.toLocaleString()}`),
        hovertemplate: '<b>%{y}</b><br>' +
                       'ρ: %{x:.3f}<br>' +
                       '%{text}<br>' +
                       '<extra></extra>'
    };

    const layout = {
        title: { 
            text: 'Meta-Analytic Correlations: Risk Propensity and Related Traits', 
            font: { size: 18 } 
        },
        xaxis: { 
            title: 'Corrected Correlation (ρ)', 
            zeroline: true, 
            zerolinecolor: '#999',
            zerolinewidth: 2,
            range: [-0.5, 0.7]
        },
        yaxis: { 
            automargin: true,
            title: 'Trait'
        },
        margin: { l: 180, r: 20, t: 60, b: 50 },
        height: 500,
        showlegend: false
    };

    Plotly.newPlot('nomological-plot', [trace], layout, { responsive: true, displayModeBar: true });
}
