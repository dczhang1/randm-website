/**
 * publications.js - Publications page specific functionality
 * Leverages existing patterns from other pages
 */

// Initialize the publications page functionality
function initPublicationsPage() {
    console.log('Publications page initialization started');

// Publications data
const publicationsData = {
    articles: [
        {
            authors: "Zhang, D.C., Barratt, C.L. & Smith, R.W.",
            title: "The Bright, Dark, and Grey Sides of Risk Takers at Work: Criterion Validity of Risk Propensity for Contextual Performance at Work",
            venue: "Journal of Business and Psychology",
            year: 2024,
            notes: "Editor's Commendation",
            type: "article",
            tags: ["risk propensity", "workplace performance"],
            pdf: "https://drive.google.com/file/d/example-link-1/view",
            doi: "https://doi.org/10.1007/s10869-023-09939-y"
        },
        {
            authors: "Zhang, B., Luo, J., Zhang, S., Sun, T., & Zhang, D.C.",
            title: "Improving the statistical performance of oblique bifactor measurement and predictive models: An augmentation approach",
            venue: "Structural Equation Modeling: A Multidisciplinary Journal",
            year: 2024,
            type: "article",
            tags: ["methodology", "statistics"],
            pdf: "https://drive.google.com/file/d/example-link-2/view",
            doi: "https://doi.org/10.1080/10705511.2023.2288691"
        },
        {
            authors: "Zhang, D.C., Howard, G., Matthews, R.A. & Cowley, T.",
            title: "Eliciting risk preferences: Is a single item enough?",
            venue: "Journal of Risk Research",
            year: 2023,
            type: "article",
            tags: ["risk preferences", "measurement"],
            pdf: "papers/zhang_howard_2023.pdf",
            doi: "https://doi.org/10.1080/13669877.2023.2168763"
        },
        {
            authors: "Zhang, D.C. & McCord J.L.",
            title: "That's an interesting question! Oddball interview questions and organizational personality perceptions",
            venue: "Personnel Assessment and Decisions",
            year: 2023,
            type: "article",
            tags: ["interviews", "selection"],
            pdf: "papers/zhang_mccord_2023.pdf",
            doi: "https://doi.org/10.25035/pad.2023.01.001"
        },
        {
            authors: "Zhang, D.C. & Kausel, E.E.",
            title: "The illusion of validity: How effort inflates the perceived validity of interview questions",
            venue: "European Journal of Work and Organizational Psychology",
            year: 2023,
            type: "article",
            tags: ["interviews", "validity"],
            pdf: "papers/zhang_kausel_2023.pdf",
            doi: "https://doi.org/10.1080/1359432X.2022.2158853"
        },
        {
            authors: "Highhouse, S., Wang, Y. & Zhang, D.C.",
            title: "Is Risk Propensity Unique from the Big Five Factors of Personality? A Meta-Analytic Investigation",
            venue: "Journal of Research in Personality",
            year: 2022,
            type: "article",
            tags: ["risk propensity", "personality", "meta-analysis"],
            pdf: "papers/highhouse_wang_zhang_2022.pdf",
            doi: "https://doi.org/10.1016/j.jrp.2022.104289"
        },
        {
            authors: "Bago, B., Aczel, B., Kekecs, Z., P. [and others, including Zhang, D.C.], Chartier, C. R",
            title: "Moral thinking across the world: Exploring the influence of personal force and intention in moral dilemma judgments",
            venue: "Nature Human Behavior",
            year: 2022,
            notes: "in press",
            type: "article",
            tags: ["moral judgments", "cross-cultural"],
            pdf: "papers/bago_aczel_2022.pdf",
            doi: "https://doi.org/10.1038/s41562-022-01319-5"
        },
        {
            authors: "Zhang, D.C.",
            title: "Duck-sized horses or horse-sized ducks? Oddall Personality Questions are likable (but useless) for organizational recruitment",
            venue: "Journal of Business and Psychology",
            year: 2022,
            type: "article",
            tags: ["recruitment", "interviews"],
            pdf: "papers/zhang_2022.pdf",
            doi: "https://doi.org/10.1007/s10869-021-09778-9"
        },
        {
            authors: "Joseph, E.** & Zhang, D.C.",
            title: "Personality profile of risk takers: An examination of Big Five facets",
            venue: "Journal of Individual Differences",
            year: 2021,
            notes: "** denotes undergraduate advisee",
            type: "article",
            tags: ["risk taking", "personality"],
            pdf: "papers/joseph_zhang_2021.pdf",
            doi: "https://doi.org/10.1027/1614-0001/a000356"
        },
        {
            authors: "Zhang, D.C. & Wang, Y.",
            title: "An empirical approach of identifying subject matter experts (SMEs) for the development of situational judgment tests",
            venue: "Journal of Personnel Psychology",
            year: 2021,
            type: "article",
            tags: ["SMEs", "judgment tests"],
            pdf: "papers/zhang_wang_2021.pdf",
            doi: "https://doi.org/10.1027/1866-5888/a000278"
        },
        {
            authors: "Zhang, D.C. & Wai, J.",
            title: "Malleability of statistical perception: Impact of validity presentation on college admission test policy preferences",
            venue: "Collabra: Psychology",
            year: 2021,
            type: "article",
            tags: ["statistical perception", "education"],
            pdf: "papers/zhang_wai_2021.pdf",
            doi: "https://doi.org/10.1525/collabra.19028"
        },
        {
            authors: "Zhang, D.C., Smith, R. & Lobo, S",
            title: "Should you sign your reviews? Open peer-review and review quality",
            venue: "Industrial and Organizational Psychology: Perspectives on Science and Practice",
            year: 2020,
            type: "article",
            tags: ["peer review", "publication"],
            pdf: "papers/zhang_smith_lobo_2020.pdf",
            doi: "https://doi.org/10.1017/iop.2020.96"
        },
        {
            authors: "Zhang, D.C. & Renshaw, T",
            title: "Personality and college student subjective wellbeing: a domain specific approach",
            venue: "Journal of Happiness Studies",
            year: 2020,
            pages: "21, 997-1014",
            type: "article",
            tags: ["personality", "well-being"],
            pdf: "papers/zhang_renshaw_2020.pdf",
            doi: "https://doi.org/10.1007/s10902-019-00116-8"
        },
        {
            authors: "Zhang, D.C., Zhu, X., Ritter, K.J. & Thiele, A.",
            title: "Telling stories to communicate the value of the pre-employment structured job interview",
            venue: "International Journal of Selection and Assessment",
            year: 2019,
            pages: "27(4), 299-314",
            type: "article",
            tags: ["structured interviews", "employment"],
            pdf: "papers/zhang_zhu_2019.pdf",
            doi: "https://doi.org/10.1111/ijsa.12256"
        },
        {
            authors: "Zhang, D.C.",
            title: "Turnover as decisions: How judgment and decision-making (JDM) research can inform turnover modeling",
            venue: "Industrial and Organizational Psychology: Perspectives on Science and Practice",
            year: 2019,
            pages: "12(3), 326-329",
            type: "article",
            tags: ["turnover", "decision-making"],
            pdf: "papers/zhang_2019a.pdf",
            doi: "https://doi.org/10.1017/iop.2019.41"
        },
        {
            authors: "Zhang, D.C., Foster, G.C., & McKenna, M.G.",
            title: "Is the DOSPERT gender invariant? A psychometric test of gender invariance",
            venue: "Journal of Behavioral Decision Making",
            year: 2019,
            pages: "32(2), 203-211",
            type: "article",
            tags: ["DOSPERT", "gender", "psychometrics"],
            pdf: "papers/zhang_foster_2019.pdf",
            doi: "https://doi.org/10.1002/bdm.2106"
        },
        {
            authors: "Zhang, D.C., Highhouse, S., & Nye",
            title: "Development and validation of the general risk propensity scale (GRiPS)",
            venue: "Journal of Behavioral Decision Making",
            year: 2019,
            pages: "32(2), 152-167",
            type: "article",
            tags: ["GRiPS", "risk propensity", "validation"],
            pdf: "papers/zhang_highhouse_nye_2019.pdf",
            doi: "https://doi.org/10.1002/bdm.2102"
        },
        {
            authors: "Highhouse, S., Nye, C.D., & Zhang, D.C.",
            title: "Dark motives and elective use of brainteaser interview questions",
            venue: "Applied Psychology: An International Review",
            year: 2019,
            pages: "68(2), 311-340",
            type: "article",
            tags: ["interviews", "brainteasers"],
            pdf: "papers/highhouse_nye_zhang_2019.pdf",
            doi: "https://doi.org/10.1111/apps.12163"
        },
        {
            authors: "Anderson, R.B., Leventhal, L.M., Zhang, D.C., Fasko, D., Basehore, Z., Branch, J., Gamsby, C. & Patrick, T.",
            title: "Belief bias in assessing the Bayesian-rationality of others",
            venue: "Judgment and Decision Making Journal",
            year: 2019,
            pages: "14(1)",
            type: "article",
            tags: ["belief bias", "bayesian reasoning"],
            pdf: "papers/anderson_leventhal_2019.pdf",
            doi: "https://doi.org/10.1017/S1930297500007543"
        },
        {
            authors: "Harman, J.L., Zhang, D.C., & Greening, S.G.",
            title: "Basic Processes in Dynamic Decision Making: How experimental findings about risk, uncertainty, and emotion can contribute to police decision making",
            venue: "Frontiers in Psychology",
            year: 2019,
            type: "article",
            tags: ["police", "decision making", "risk"],
            pdf: "papers/harman_zhang_2019.pdf",
            doi: "https://doi.org/10.3389/fpsyg.2019.02140"
        },
        {
            authors: "Zhang, D.C., Highhouse, S., Brooks, M.E. & Zhang, Y.",
            title: "Communicating the validity of structured interviews with graphical visual aids",
            venue: "International Journal of Selection and Assessment",
            year: 2018,
            pages: "26(2-4), 93-108",
            notes: "Top 10 downloaded paper of 2018",
            type: "article",
            tags: ["structured interviews", "validity", "visualization"],
            pdf: "papers/zhang_highhouse_brooks_2018.pdf",
            doi: "https://doi.org/10.1111/ijsa.12222"
        },
        {
            authors: "Zhang, D.C.",
            title: "Art of the sale: recommendations for sharing research with mainstream media and senior leaders",
            venue: "Industrial and Organizational Psychology: Perspectives on Science and Practice",
            year: 2018,
            pages: "11(4), 589-593",
            type: "article",
            tags: ["media communication", "leadership"],
            pdf: "papers/zhang_2018b.pdf",
            doi: "https://doi.org/10.1017/iop.2018.119"
        },
        {
            authors: "Zhang, D.C.",
            title: "Understandability of alternative effect size statistics and development of a web-based calculator: Shiny-AESC",
            venue: "Frontiers in Psychology",
            year: 2018,
            pages: "9, 1221",
            type: "article",
            tags: ["effect size", "statistics", "web tool"],
            pdf: "papers/zhang_2018a.pdf",
            doi: "https://doi.org/10.3389/fpsyg.2018.01221"
        },
        {
            authors: "Highhouse, S., Nye, C.D., & Zhang, D.C., Rada, T.B.",
            title: "Structure of the DOSPERT: Is there evidence for a general risk factor",
            venue: "Journal of Behavioral Decision Making",
            year: 2017,
            pages: "30(2), 400-407",
            type: "article",
            tags: ["DOSPERT", "risk factor"],
            pdf: "papers/highhouse_nye_zhang_rada_2017.pdf",
            doi: "https://doi.org/10.1002/bdm.1953"
        },
        {
            authors: "Zhang, D.C., Highhouse, S., & Rada, T.B.",
            title: "Explaining sex differences on the Cognitive Reflection Test",
            venue: "Personality and Individual Differences",
            year: 2016,
            pages: "101, 425-427",
            type: "article",
            tags: ["sex differences", "cognitive reflection"],
            pdf: "papers/zhang_highhouse_rada_2016.pdf",
            doi: "https://doi.org/10.1016/j.paid.2016.06.034"
        },
        {
            authors: "Highhouse, S. & Zhang, D.C.",
            title: "The new fruit fly for applied psychological research",
            venue: "Industrial and Organizational Psychology: Perspectives on Science and Practice",
            year: 2015,
            pages: "8(2), 179-183",
            type: "article",
            tags: ["applied psychology", "methodology"],
            pdf: "papers/highhouse_zhang_2015.pdf",
            doi: "https://doi.org/10.1017/iop.2015.22"
        }
    ],
    chapters: [
        {
            authors: "Zhang, D.C. & Reeves, K.",
            title: "Risk Preferences",
            venue: "Elgar Encyclopaedia of Personality and Individual Differences. Edward Elgar Publishing Ltd, Cheltenham, United Kingdom",
            year: 2023,
            notes: "under contract",
            type: "chapter",
            editor: "Schermer, J.A. (Eds)",
            tags: ["risk preferences", "individual differences"],
            pdf: "papers/zhang_reeves_2023.pdf"
        },
        {
            authors: "Wai J. & Zhang, D.C.",
            title: "Career and the gifted",
            venue: "Careers Psychology. American Psychological Association, Washington, D.C.",
            year: 2023,
            type: "chapter",
            editor: "Walsh, Flores, Hartung, Leong, & Savickas (Eds.)",
            tags: ["career", "gifted individuals"],
            pdf: "papers/wai_zhang_2023.pdf"
        },
        {
            authors: "Zhang, D.C. & Highhouse, S.",
            title: "Judgment and Decision Making in the Workplace",
            venue: "Handbook of Industrial, Work, and Organizational Psychology 2nd Edition. Sage, CA",
            year: 2018,
            type: "chapter",
            editor: "Anderson, Ones, Sinangil, & Viswesvaran (Eds.)",
            tags: ["decision making", "workplace"],
            pdf: "papers/zhang_highhouse_2018.pdf"
        }
    ],
    other: [
        {
            authors: "Castille, C., Zhang, D.C., & Smith, R.W.",
            title: "Opening Up: How Do I Conduct Peer Review With Open Science in Mind?",
            venue: "The Industrial and Organizational Psychologist",
            year: 2020,
            type: "other",
            tags: ["peer review", "open science"],
            pdf: "papers/castille_zhang_smith_2020.pdf"
        },
        {
            authors: "Wai, J & Zhang, D.C.",
            title: "Standardized tests remain the best way to fairly and equitably assess students",
            venue: "Flypaper at Thomas B. Fordham Institute",
            year: 2019,
            type: "other",
            tags: ["standardized tests", "education"],
            pdf: "papers/wai_zhang_2019b.pdf",
            notes: "Media appearance in The Guardian, New York Magazine, The Inc., Yahoo"
        },
        {
            authors: "Litano, M., Collmus, A. & Zhang, D.C.",
            title: "Lost in translation: visually communicating validity evidence",
            venue: "The Industrial and Organizational Psychologist",
            year: 2018,
            pages: "55(4)",
            type: "other",
            tags: ["validity", "visualization"],
            pdf: "papers/litano_collmus_zhang_2018.pdf"
        }
    ]
};

// DOM elements
const searchInput = document.getElementById('publication-search');
const searchButton = document.getElementById('search-button');
const typeFilter = document.getElementById('publication-type');
const yearFilter = document.getElementById('publication-year');
const sortBy = document.getElementById('sort-by');
const articlesContainer = document.getElementById('articles-container');
const chaptersContainer = document.getElementById('chapters-container');
const otherContainer = document.getElementById('other-container');
const articleCount = document.getElementById('article-count');
const chapterCount = document.getElementById('chapter-count');
const otherCount = document.getElementById('other-count');
const noResults = document.getElementById('no-results');

// Initialize the page
function initializePublications() {
    renderPublications(publicationsData.articles, articlesContainer);
    renderPublications(publicationsData.chapters, chaptersContainer);
    renderPublications(publicationsData.other, otherContainer);
    updateCounters();
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchButton.addEventListener('click', filterPublications);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterPublications();
        }
    });
    
    // Filtering and sorting
    typeFilter.addEventListener('change', filterPublications);
    yearFilter.addEventListener('change', filterPublications);
    sortBy.addEventListener('change', filterPublications);
}

// Render publications to container
function renderPublications(publications, container) {
    container.innerHTML = '';
    
    if (publications.length === 0) {
        return;
    }
    
    publications.forEach(pub => {
        const pubElement = createPublicationElement(pub);
        container.appendChild(pubElement);
    });
}

// Create a publication element using existing card classes
function createPublicationElement(pub) {
    const pubElement = document.createElement('div');
    pubElement.className = 'card card--border-left'; // Reuse existing card classes
    pubElement.dataset.type = pub.type;
    pubElement.dataset.year = pub.year;
    
    let venueText = pub.venue;
    if (pub.pages) {
        venueText += `, ${pub.pages}`;
    }
    
    // Create card content using inline styles to complement existing classes
    pubElement.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <h3 style="font-weight: 700; color: var(--color-primary); margin-bottom: 0.75rem; font-size: 1.1rem; line-height: 1.4;">${pub.title}</h3>
            <span style="color: white; background-color: var(--color-tertiary); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.9rem; display: inline-block;">${pub.year}</span>
        </div>
        <p style="margin-bottom: 0.75rem; line-height: 1.5; color: #333;">${pub.authors}</p>
        <p style="font-style: italic; margin-bottom: 0.75rem; color: #555;">${venueText}</p>
        ${pub.notes ? `<p style="margin-bottom: 0.75rem;"><em>${pub.notes}</em></p>` : ''}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${pub.tags ? pub.tags.map(tag => `<span style="background-color: #f0f0f0; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.8rem; color: #666;">${tag}</span>`).join('') : ''}
            </div>
            <div style="display: flex; gap: 0.75rem;">
                ${pub.pdf ? `<a href="${pub.pdf}" style="display: inline-flex; align-items: center; gap: 0.25rem; color: var(--color-secondary); text-decoration: none; font-weight: 500; transition: color 0.2s ease;" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
                ${pub.doi ? `<a href="${pub.doi}" style="display: inline-flex; align-items: center; gap: 0.25rem; color: var(--color-secondary); text-decoration: none; font-weight: 500; transition: color 0.2s ease;" target="_blank"><i class="fas fa-external-link-alt"></i> DOI</a>` : ''}
            </div>
        </div>
    `;
    
    return pubElement;
}

// Filter publications based on search input and filters
function filterPublications() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    const yearValue = yearFilter.value;
    const sortValue = sortBy.value;
    
    // Filter articles
    let filteredArticles = filterPublicationsByType(publicationsData.articles, typeValue);
    filteredArticles = filterPublicationsByYear(filteredArticles, yearValue);
    filteredArticles = filterPublicationsBySearch(filteredArticles, searchTerm);
    
    // Filter chapters
    let filteredChapters = filterPublicationsByType(publicationsData.chapters, typeValue);
    filteredChapters = filterPublicationsByYear(filteredChapters, yearValue);
    filteredChapters = filterPublicationsBySearch(filteredChapters, searchTerm);
    
    // Filter other
    let filteredOther = filterPublicationsByType(publicationsData.other, typeValue);
    filteredOther = filterPublicationsByYear(filteredOther, yearValue);
    filteredOther = filterPublicationsBySearch(filteredOther, searchTerm);
    
    // Sort publications
    filteredArticles = sortPublications(filteredArticles, sortValue);
    filteredChapters = sortPublications(filteredChapters, sortValue);
    filteredOther = sortPublications(filteredOther, sortValue);
    
    // Render filtered publications
    renderPublications(filteredArticles, articlesContainer);
    renderPublications(filteredChapters, chaptersContainer);
    renderPublications(filteredOther, otherContainer);
    
    // Update counters
    updateCounters(filteredArticles.length, filteredChapters.length, filteredOther.length);
    
    // Show/hide "no results" message
    const totalResults = filteredArticles.length + filteredChapters.length + filteredOther.length;
    if (totalResults === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    // Show/hide section headings based on results
    document.querySelector('h2:nth-of-type(1)').style.display = filteredArticles.length > 0 ? 'flex' : 'none';
    document.querySelector('h2:nth-of-type(2)').style.display = filteredChapters.length > 0 ? 'flex' : 'none';
    document.querySelector('h2:nth-of-type(3)').style.display = filteredOther.length > 0 ? 'flex' : 'none';
}

// Filter publications by type
function filterPublicationsByType(publications, typeValue) {
    if (typeValue === 'all') {
        return publications;
    }
    return publications.filter(pub => pub.type === typeValue);
}

// Filter publications by year
function filterPublicationsByYear(publications, yearValue) {
    if (yearValue === 'all') {
        return publications;
    }
    return publications.filter(pub => pub.year.toString() === yearValue);
}

// Filter publications by search term
function filterPublicationsBySearch(publications, searchTerm) {
    if (!searchTerm) {
        return publications;
    }
    
    return publications.filter(pub => {
        // Search in title, authors, venue, and tags
        const titleMatch = pub.title.toLowerCase().includes(searchTerm);
        const authorsMatch = pub.authors.toLowerCase().includes(searchTerm);
        const venueMatch = pub.venue.toLowerCase().includes(searchTerm);
        
        // Search in tags if they exist
        let tagsMatch = false;
        if (pub.tags) {
            tagsMatch = pub.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        }
        
        return titleMatch || authorsMatch || venueMatch || tagsMatch;
    });
}

// Sort publications
function sortPublications(publications, sortValue) {
    if (sortValue === 'year-desc') {
        return [...publications].sort((a, b) => b.year - a.year);
    } else if (sortValue === 'year-asc') {
        return [...publications].sort((a, b) => a.year - b.year);
    } else if (sortValue === 'author') {
        return [...publications].sort((a, b) => {
            const authorA = a.authors.split(',')[0];
            const authorB = b.authors.split(',')[0];
            return authorA.localeCompare(authorB);
        });
    } else if (sortValue === 'title') {
        return [...publications].sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return publications;
}

// Update counters
function updateCounters(articles, chapters, others) {
    articleCount.textContent = `(${articles !== undefined ? articles : publicationsData.articles.length})`;
    chapterCount.textContent = `(${chapters !== undefined ? chapters : publicationsData.chapters.length})`;
    otherCount.textContent = `(${others !== undefined ? others : publicationsData.other.length})`;
}

    // Initialize the page
    initializePublications();
    setupEventListeners();
    
    // Set up fade animations for publications (using LabUtils from utils.js)
    if (typeof LabUtils !== 'undefined' && LabUtils.setupFadeAnimations) {
        LabUtils.setupFadeAnimations('.card');
    } else {
        console.warn('LabUtils.setupFadeAnimations not available');
    }
    
    console.log('Publications page initialized');
}

// Add to global initialization object
window.initPage = window.initPage || {};
window.initPage.publications = initPublicationsPage;

// Auto-initialize if the correct page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.getAttribute('data-page') === 'publications') {
        initPublicationsPage();
    }
});
