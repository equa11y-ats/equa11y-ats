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
    { title: "Contact Information", link: "#contact-info", description: "Our address, phone, and email" },
    { title: "Send a Message", link: "#contact-form", description: "Contact form to send us a message" },
    { title: "Business Hours", link: "#business-hours", description: "Our operating hours" },
    { title: "FAQs", link: "#faq-section", description: "Frequently asked questions" },
    { title: "Schedule Consultation", link: "#contact-cta", description: "Book a free consultation" }
];

const pageSections = [
    { id: "contact-hero-heading", title: "Contact Us", description: "Get in touch with our team" },
    { id: "contact-info", title: "Contact Information", description: "Our address and contact details" },
    { id: "contact-form", title: "Contact Form", description: "Send us a message" },
    { id: "map-section", title: "Our Location", description: "Find us on the map" },
    { id: "faq-section", title: "FAQs", description: "Frequently asked questions" }
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

// Form Validation
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset status
    formStatus.style.display = 'none';
    formStatus.className = '';
    
    // Simple validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
        showFormStatus('error', 'Please fill in all required fields.');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormStatus('error', 'Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showFormStatus('success', 'Your message has been sent successfully! We will respond within 24 hours.');
        contactForm.reset();
    }, 1000);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = type;
    formStatus.style.display = 'block';
    
    // Scroll to status message
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
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