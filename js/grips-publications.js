// GRiPS Publications Database Handler

let publicationsData = [];
let filteredData = [];

// Initialize the publications page
async function initPublications() {
    try {
        await loadPublicationsData();
        renderSummaryStatistics();
        renderResearchAreasAnalysis();
        renderWorldMap();
        renderPublicationsTable();
        setupFilters();
    } catch (error) {
        console.error('Error initializing publications:', error);
    }
}

// Load the CSV data
async function loadPublicationsData() {
    try {
        const response = await fetch('assets/grips_database.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        publicationsData = parseCSV(csvText);
        filteredData = [...publicationsData];
        console.log(`Loaded ${publicationsData.length} publications`);
    } catch (error) {
        console.error('Error loading publications data:', error);
        // Show error message to user
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = 'padding: 2rem; background: #fee; border: 2px solid #c33; border-radius: 8px; margin: 2rem 0;';
        errorMsg.innerHTML = `
            <h3 style="color: #c33; margin-top: 0;">Unable to Load Publications Data</h3>
            <p><strong>Error:</strong> ${error.message}</p>
            <p>If you're viewing this page using the <code>file://</code> protocol (opening the HTML file directly), the browser blocks data loading for security reasons.</p>
            <p><strong>Solution:</strong> Run a local web server. Try one of these commands in the terminal:</p>
            <pre style="background: #333; color: #0f0; padding: 1rem; border-radius: 4px;">
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
            </pre>
            <p>Then visit: <a href="http://localhost:8000/archive/grips.html" style="color: #2c5282;">http://localhost:8000/archive/grips.html</a></p>
        `;
        document.getElementById('summary-stats')?.appendChild(errorMsg);
    }
}

// Parse CSV to JSON
function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, '')); // Remove BOM

    return lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] ? values[index].trim() : '';
        });
        return obj;
    });
}

// Parse CSV line handling commas within quotes
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}

// Extract country data from the database
function extractCountries() {
    const countryCounts = {};
    const excludeValues = ['Unsure', 'Unknown', 'N/A', 'AI', 'A', 'N'];

    publicationsData.forEach(pub => {
        const countries = pub.sample_nationality || pub.author_institution_nationality || '';
        // Split by various delimiters
        const countryList = countries.split(/[\/,()]+/)
            .map(c => c.trim())
            .filter(c => {
                // Filter out empty, excluded values, and patterns like "N=500"
                return c &&
                       !excludeValues.includes(c) &&
                       !c.match(/^N=\d+/) &&
                       c.length > 2; // Exclude single/double letter entries
            });

        countryList.forEach(country => {
            // Clean up country names
            const cleanCountry = country
                .replace(/\(.*?\)/g, '') // Remove parentheses
                .trim();

            if (cleanCountry && cleanCountry.length > 2) {
                countryCounts[cleanCountry] = (countryCounts[cleanCountry] || 0) + 1;
            }
        });
    });

    return countryCounts;
}

// Render summary statistics
function renderSummaryStatistics() {
    const countries = extractCountries();
    const uniqueCountries = Object.keys(countries).length;
    const totalPublications = publicationsData.length;
    const yearRange = getYearRange();
    const languages = getUniqueLanguages();

    const statsHTML = `
        <div class="stats-grid">
            <div class="stats-box">
                <div class="stat-number">${totalPublications}</div>
                <div class="stat-label">Published Studies</div>
            </div>
            <div class="stats-box">
                <div class="stat-number">${uniqueCountries}</div>
                <div class="stat-label">Countries</div>
            </div>
            <div class="stats-box">
                <div class="stat-number">${yearRange}</div>
                <div class="stat-label">Year Range</div>
            </div>
            <div class="stats-box">
                <div class="stat-number">${languages}</div>
                <div class="stat-label">Languages</div>
            </div>
        </div>
    `;

    document.getElementById('summary-stats').innerHTML = statsHTML;
}

// Get year range
function getYearRange() {
    const years = publicationsData.map(p => parseInt(p.year)).filter(y => !isNaN(y));
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return `${minYear}-${maxYear}`;
}

// Get unique languages
function getUniqueLanguages() {
    const languages = new Set();
    publicationsData.forEach(pub => {
        if (pub.language && pub.language !== 'Unsure' && pub.language !== 'Unknown') {
            pub.language.split('/').forEach(lang => languages.add(lang.trim()));
        }
    });
    return languages.size;
}

// Analyze research areas from journal names and titles
function renderResearchAreasAnalysis() {
    const areas = categorizeResearchAreas();
    const totalCitations = calculateTotalSampleSize();

    const areasHTML = `
        <div class="content-section">
            <h3>Research Impact Across Disciplines</h3>
            <p>The General Risk Propensity Scale (GRiPS) has demonstrated remarkable versatility and has been adopted by researchers across diverse fields and disciplines worldwide. Since its publication in 2019, the scale has been cited and utilized in ${publicationsData.length} published studies, reaching an estimated total sample size of ${totalCitations.toLocaleString()} participants across ${Object.keys(extractCountries()).length} countries.</p>

            <h4>Key Research Domains</h4>
            <div class="research-areas-grid">
                ${Object.entries(areas).map(([area, count]) => `
                    <div class="area-box">
                        <div class="area-icon">${getAreaIcon(area)}</div>
                        <div class="area-name">${area}</div>
                        <div class="area-count">${count} studies</div>
                    </div>
                `).join('')}
            </div>

            <h4>International Reach</h4>
            <p>The GRiPS has been translated and validated in multiple languages including English, Chinese, German, Italian, Spanish, French, Turkish, Arabic, Hebrew, and Polish. This international adoption demonstrates the scale's cross-cultural validity and its importance in understanding risk-taking behavior across diverse populations.</p>

            <h4>Application Contexts</h4>
            <p>Researchers have employed the GRiPS across various contexts:</p>
            <ul>
                <li><strong>Healthcare & Medical Decision-Making:</strong> Understanding patient and provider risk preferences in treatment decisions</li>
                <li><strong>Organizational Behavior:</strong> Examining risk-taking in workplace contexts, including entrepreneurship and leadership</li>
                <li><strong>Public Health:</strong> Studying risk behaviors related to COVID-19, health compliance, and safety</li>
                <li><strong>Technology & Human-Computer Interaction:</strong> Investigating human trust and decision-making with AI and robotics</li>
                <li><strong>Consumer Behavior:</strong> Understanding purchase decisions and brand preferences</li>
                <li><strong>Psychology & Individual Differences:</strong> Exploring personality correlates and developmental trends</li>
            </ul>
        </div>
    `;

    document.getElementById('research-areas').innerHTML = areasHTML;
}

// Categorize studies by research area
function categorizeResearchAreas() {
    const areas = {
        'Organizational & Work': 0,
        'Health & Medicine': 0,
        'Technology & AI': 0,
        'Psychology & Personality': 0,
        'Consumer & Marketing': 0,
        'Entrepreneurship': 0,
        'Education': 0,
        'Public Health & Safety': 0,
        'Other': 0
    };

    publicationsData.forEach(pub => {
        const title = (pub.article_title || '').toLowerCase();
        const journal = (pub.journal_name || '').toLowerCase();
        const combined = title + ' ' + journal;

        if (combined.match(/health|medical|patient|disease|illness|hospital|clinical/)) {
            areas['Health & Medicine']++;
        } else if (combined.match(/robot|ai|artificial intelligence|human-agent|automation|technology/)) {
            areas['Technology & AI']++;
        } else if (combined.match(/entrepreneur|business|startup|venture/)) {
            areas['Entrepreneurship']++;
        } else if (combined.match(/work|employee|organization|job|workplace|leadership|management/)) {
            areas['Organizational & Work']++;
        } else if (combined.match(/consumer|marketing|brand|purchase|buying/)) {
            areas['Consumer & Marketing']++;
        } else if (combined.match(/education|student|learning|academic|school/)) {
            areas['Education']++;
        } else if (combined.match(/safety|accident|covid|pandemic|public health/)) {
            areas['Public Health & Safety']++;
        } else if (combined.match(/personality|psychology|individual differences|traits/)) {
            areas['Psychology & Personality']++;
        } else {
            areas['Other']++;
        }
    });

    // Remove categories with 0 studies
    Object.keys(areas).forEach(key => {
        if (areas[key] === 0) delete areas[key];
    });

    return areas;
}

// Get icon for research area
function getAreaIcon(area) {
    const icons = {
        'Organizational & Work': '💼',
        'Health & Medicine': '🏥',
        'Technology & AI': '🤖',
        'Psychology & Personality': '🧠',
        'Consumer & Marketing': '🛒',
        'Entrepreneurship': '🚀',
        'Education': '📚',
        'Public Health & Safety': '🛡️',
        'Other': '📊'
    };
    return icons[area] || '📊';
}

// Calculate total sample size
function calculateTotalSampleSize() {
    let total = 0;
    publicationsData.forEach(pub => {
        const size = parseInt(pub.sample_size);
        if (!isNaN(size)) {
            total += size;
        }
    });
    return total;
}

// Render world map
function renderWorldMap() {
    const countries = extractCountries();
    const mapContainer = document.getElementById('world-map');

    // Create a simple visualization using the countries data
    const sortedCountries = Object.entries(countries)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15); // Top 15 countries

    const mapHTML = `
        <div class="map-container">
            <h3>Global Reach of GRiPS Research</h3>
            <div class="map-legend">
                <p>The GRiPS has been used in studies across <strong>${Object.keys(countries).length} countries</strong>, demonstrating its international applicability and cross-cultural validity.</p>
            </div>
            <div class="country-bars">
                ${sortedCountries.map(([country, count]) => {
                    const maxCount = sortedCountries[0][1];
                    const percentage = (count / maxCount) * 100;
                    return `
                        <div class="country-bar-item">
                            <div class="country-name">${country}</div>
                            <div class="country-bar-container">
                                <div class="country-bar" style="width: ${percentage}%"></div>
                                <span class="country-count">${count} ${count === 1 ? 'study' : 'studies'}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            ${Object.keys(countries).length > 15 ? `
                <p class="map-note">Showing top 15 countries. Additional countries: ${Object.keys(countries).slice(15).join(', ')}.</p>
            ` : ''}
        </div>
    `;

    mapContainer.innerHTML = mapHTML;
}

// Render publications table
function renderPublicationsTable() {
    const tableContainer = document.getElementById('publications-table');

    const tableHTML = `
        <div class="table-controls">
            <input type="text" id="search-input" placeholder="Search by author, title, or journal..." class="search-input">
            <div class="filter-controls">
                <select id="year-filter" class="filter-select">
                    <option value="">All Years</option>
                    ${getYearOptions()}
                </select>
                <select id="country-filter" class="filter-select">
                    <option value="">All Countries</option>
                    ${getCountryOptions()}
                </select>
            </div>
        </div>
        <div class="table-container">
            <table class="publications-data-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Author(s)</th>
                        <th>Title</th>
                        <th>Journal</th>
                        <th>Country</th>
                        <th>Sample Size</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    ${renderTableRows()}
                </tbody>
            </table>
        </div>
        <div id="table-info" class="table-info">
            Showing ${filteredData.length} of ${publicationsData.length} studies
        </div>
    `;

    tableContainer.innerHTML = tableHTML;
}

// Get year options for filter
function getYearOptions() {
    const years = [...new Set(publicationsData.map(p => p.year))].sort((a, b) => b - a);
    return years.map(year => `<option value="${year}">${year}</option>`).join('');
}

// Get country options for filter
function getCountryOptions() {
    const countries = Object.keys(extractCountries()).sort();
    return countries.map(country => `<option value="${country}">${country}</option>`).join('');
}

// Render table rows
function renderTableRows() {
    return filteredData.map(pub => {
        let country = pub.sample_nationality || pub.author_institution_nationality || 'N/A';

        // Handle special cases for better display
        if (country === 'AI') {
            country = 'AI Systems (not human sample)';
        } else if (country === 'N/A' || country === 'A' || country === 'N') {
            country = 'Not specified';
        }

        return `
            <tr>
                <td data-label="Year">${pub.year}</td>
                <td data-label="Author(s)">${pub.author_lastname}</td>
                <td data-label="Title" class="title-cell">${pub.article_title}</td>
                <td data-label="Journal">${pub.journal_name}</td>
                <td data-label="Country">${country}</td>
                <td data-label="Sample Size">${pub.sample_size ? parseInt(pub.sample_size).toLocaleString() : 'N/A'}</td>
            </tr>
        `;
    }).join('');
}

// Setup filters and search
function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const yearFilter = document.getElementById('year-filter');
    const countryFilter = document.getElementById('country-filter');

    searchInput?.addEventListener('input', applyFilters);
    yearFilter?.addEventListener('change', applyFilters);
    countryFilter?.addEventListener('change', applyFilters);
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const yearFilter = document.getElementById('year-filter').value;
    const countryFilter = document.getElementById('country-filter').value;

    filteredData = publicationsData.filter(pub => {
        // Search filter
        const matchesSearch = !searchTerm ||
            (pub.author_lastname || '').toLowerCase().includes(searchTerm) ||
            (pub.article_title || '').toLowerCase().includes(searchTerm) ||
            (pub.journal_name || '').toLowerCase().includes(searchTerm);

        // Year filter
        const matchesYear = !yearFilter || pub.year === yearFilter;

        // Country filter
        const country = pub.sample_nationality || pub.author_institution_nationality || '';
        const matchesCountry = !countryFilter || country.includes(countryFilter);

        return matchesSearch && matchesYear && matchesCountry;
    });

    // Update table
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        tableBody.innerHTML = renderTableRows();
    }

    // Update info
    const tableInfo = document.getElementById('table-info');
    if (tableInfo) {
        tableInfo.textContent = `Showing ${filteredData.length} of ${publicationsData.length} studies`;
    }
}

// Initialize when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPublications);
} else {
    initPublications();
}
