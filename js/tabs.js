document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs__button');
    const tabContents = document.querySelectorAll('.tab-content');

    function setActiveTab(tabId) {
        // Remove active class from all tabs and contents
        tabs.forEach(tab => tab.classList.remove('tabs__button--active'));
        tabContents.forEach(content => content.classList.remove('tab-content--active'));

        // Add active class to selected tab and content
        const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('tabs__button--active');
            selectedContent.classList.add('tab-content--active');
        }
    }

    // Add click handlers to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            setActiveTab(tabId);
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${tabId}`);
        });
    });

    // Handle initial load and hash changes
    function handleHashChange() {
        const hash = window.location.hash.slice(1) || 'overview';
        setActiveTab(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}); 