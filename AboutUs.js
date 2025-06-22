// Mobile menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const overlay = document.getElementById('overlay');

hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeMenuBtn.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// Mobile search functionality
const mobileSearchButton = document.querySelector('.mobile-search-button');
const mobileSearchExpanded = document.getElementById('mobile-search-expanded');

mobileSearchButton.addEventListener('click', () => {
    mobileSearchExpanded.classList.toggle('active');
    if (mobileSearchExpanded.classList.contains('active')) {
        document.getElementById('mobile-search').focus();
    }
});

// Search functionality
const searchData = [
    { title: "Our Mission", link: "#mission-values-heading", description: "Learn about our commitment to accessibility" },
    { title: "Leadership Team", link: "#leadership-heading", description: "Meet our expert leadership team" },
    { title: "Company History", link: "#our-story-heading", description: "Our journey since 2015" },
    { title: "Careers", link: "Careers.html", description: "Join our team of accessibility experts" },
    { title: "Contact Us", link: "Contact Us.html", description: "Get in touch with our team" }
];

const pageSections = [
    { id: "about-hero-heading", title: "Building an Inclusive World", description: "Our vision for accessibility" },
    { id: "our-story-heading", title: "Our Journey", description: "Company history and milestones" },
    { id: "mission-values-heading", title: "Mission & Values", description: "What drives our work" },
    { id: "leadership-heading", title: "Leadership Team", description: "Our expert leadership" },
    { id: "achievements-heading", title: "Our Impact", description: "Statistics and accomplishments" }
];

function performSearch(searchTerm) {
    const resultsContainer = document.getElementById('search-results-content');
    const resultsTitle = document.getElementById('search-results-title');
    const searchResultsSection = document.getElementById('search-results-container');
    const announceElement = document.getElementById('aria-announce');
    
    // Hide other content and show search results
    document.querySelectorAll('section').forEach(el => {
        el.style.display = 'none';
    });
    searchResultsSection.style.display = 'block';
    
    // Update title
    resultsTitle.textContent = `Search Results for: "${searchTerm}"`;
    announceElement.textContent = `Search results for "${searchTerm}" are displayed.`;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Search page sections
    const sectionResults = pageSections.filter(section => 
        section.title.toLowerCase().includes(searchTerm) || 
        section.description.toLowerCase().includes(searchTerm)
    );
    
    // Search content data
    const contentResults = searchData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm)
    );
    
    const allResults = [...sectionResults, ...contentResults];
    
    if (allResults.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results-message">
                <i class="fas fa-search fa-2x" style="margin-bottom: 1rem;"></i>
                <p>Sorry, no results found for your search: "${searchTerm}"</p>
                <button class="cta-button" id="clear-search">Back to Home</button>
            </div>
        `;
        announceElement.textContent = `Sorry, no results found for your search: "${searchTerm}"`;
        document.getElementById('clear-search').addEventListener('click', clearSearchResults);
        document.getElementById('clear-search').focus();
        return;
    }
    
    allResults.forEach(result => {
        const resultEl = document.createElement('div');
        resultEl.className = 'search-result-item';
        resultEl.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.description}</p>
            <a href="${result.link || '#'}" class="search-result-link" data-target="${result.id || ''}" aria-label="View details for ${result.title}">
                View details <i class="fas fa-arrow-right"></i>
            </a>
        `;
        resultsContainer.appendChild(resultEl);
    });
    
    // Set focus to the first result
    if (resultsContainer.firstChild) {
        const firstLink = resultsContainer.querySelector('.search-result-link');
        if (firstLink) {
            firstLink.focus();
        }
    }
    
    // Add event listeners to result links
    document.querySelectorAll('.search-result-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('data-target')) {
                e.preventDefault();
                clearSearchResults();
                // Scroll to the section
                const targetSection = document.getElementById(this.getAttribute('data-target'));
                if (targetSection) {
                    // Add temporary tabindex to make element focusable
                    targetSection.setAttribute('tabindex', '-1');
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    targetSection.focus();
                    
                    // Remove tabindex after focus to prevent tab stops
                    setTimeout(() => {
                        targetSection.removeAttribute('tabindex');
                    }, 1000);
                }
            }
        });
    });
}

function clearSearchResults() {
    const searchResultsSection = document.getElementById('search-results-container');
    searchResultsSection.style.display = 'none';
    
    // Show all content sections by removing the inline style
    document.querySelectorAll('section').forEach(el => {
        el.style.display = '';
    });
    
    // Focus on the main content
    document.getElementById('main').focus();
}

// Close search results when clicking the "Back to Home" button
document.addEventListener('click', function(e) {
    if (e.target.id === 'clear-search' || e.target.closest('#clear-search')) {
        clearSearchResults();
    }
});

function initSearch(inputId, buttonSelector) {
    const searchInput = document.getElementById(inputId);
    const searchButton = document.querySelector(buttonSelector);
    
    // Search on button click
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });
    
    // Search on Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                performSearch(searchTerm);
            }
            e.preventDefault();
        }
    });
}

// Initialize both desktop and mobile search
initSearch('search', '.search-button');
initSearch('mobile-search', '.mobile-search-button');

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Add temporary tabindex to make element focusable
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.focus();
                    
                    // Remove tabindex after focus to prevent tab stops
                    setTimeout(() => {
                        targetElement.removeAttribute('tabindex');
                    }, 1000);
                }
            }
        }
    });
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = document.querySelector('a[aria-current="page"]');
    if (currentPage) {
        currentPage.style.fontWeight = '700';
        currentPage.style.color = 'var(--accent-color)';
    }
});