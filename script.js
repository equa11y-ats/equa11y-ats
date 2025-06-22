// EmailJS SDK Init
emailjs.init("IhwJv_H25btatLGJh"); 

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
    { title: "Accessibility Testing Services", link: "#", description: "Comprehensive testing solutions to ensure WCAG compliance" },
    { title: "WCAG Compliance Guidelines", link: "#", description: "Latest WCAG standards and implementation best practices" },
    { title: "ADA Compliance Checklist", link: "#", description: "Essential steps for ADA website compliance" },
    { title: "Accessibility Training Programs", link: "#", description: "Training for developers, designers, and content creators" },
    { title: "Contact Us", link: "#construction", description: "Get in touch with our accessibility experts" }
];

const pageSections = [
    { id: "free-audit-heading", title: "Free Accessibility Audit", description: "Get your free accessibility compliance report" },
    { id: "why-choose-us", title: "Why Choose Us", description: "Our expertise and advantages" },
    { id: "our-process", title: "Our Process", description: "Our comprehensive accessibility testing process" },
    { id: "disability-stats-heading", title: "Disability Statistics", description: "Global disability statistics" }
];

function performSearch(searchTerm) {
    const resultsContainer = document.getElementById('search-results-content');
    const resultsTitle = document.getElementById('search-results-title');
    const searchResultsSection = document.getElementById('search-results-container');
    const announceElement = document.getElementById('aria-announce');
    
    // Hide other content and show search results
    document.querySelectorAll('section, .carousel, .audit-banner, .tile-section, .process-container, .stats-container').forEach(el => {
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
    document.querySelectorAll('section, .carousel, .audit-banner, .tile-section, .process-container, .stats-container').forEach(el => {
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

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const totalSlides = slides.length;

// Create indicators
slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.setAttribute('role', 'button');
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    indicator.setAttribute('title', `Slide ${index + 1}`);
    indicator.setAttribute('tabindex', index === 0 ? '0' : '-1');
    indicator.addEventListener('click', () => showSlide(index));
    indicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            showSlide(index);
        }
    });
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
        indicator.setAttribute('aria-pressed', index === currentSlide);
        indicator.setAttribute('tabindex', index === currentSlide ? '0' : '-1');
    });
}

function showSlide(n) {
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].setAttribute('aria-hidden', 'true');
    // Hide all links in non-active slides
    slides[currentSlide].querySelector('.cta-button').setAttribute('tabindex', '-1');
    
    // Update current slide index
    currentSlide = (n + totalSlides) % totalSlides;
    
    // Show new slide
    slides[currentSlide].classList.add('active');
    slides[currentSlide].setAttribute('aria-hidden', 'false');
    // Make CTA focusable in active slide
    slides[currentSlide].querySelector('.cta-button').setAttribute('tabindex', '0');
    
    updateIndicators();
}

// Button Controls
document.querySelector('.prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.querySelector('.next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    }
    if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
    }
});

// Initialize
updateIndicators();
showSlide(0);
// Make sure only active slide CTA is focusable
document.querySelectorAll('.slide:not(.active) .cta-button').forEach(btn => {
    btn.setAttribute('tabindex', '-1');
});

// Free audit form submission with EmailJS

document.getElementById('audit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const websiteInput = document.getElementById('website-input');
    const emailInput = document.getElementById('email-input');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const website = websiteInput.value.trim();
    const email = emailInput.value.trim();

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    if (!website) {
        errorMessage.textContent = 'Website URL is required.';
        errorMessage.style.display = 'block';
        websiteInput.focus();
        return;
    }

    if (!email) {
        errorMessage.textContent = 'Email address is required.';
        errorMessage.style.display = 'block';
        emailInput.focus();
        return;
    }

    const templateParams = {
        website: website,
        email: email
    };

    // Corrected the send method parameters
    emailjs.send("service_13fsuxq", "template_hlxkirm", templateParams)
        .then(function(response) {
            successMessage.style.display = 'block';
            websiteInput.value = '';
            emailInput.value = '';
        }, function(error) {
            errorMessage.textContent = 'Failed to submit request. Please try again.';
            errorMessage.style.display = 'block';
            console.error("EmailJS Error:", error);
        });
});

// Under construction links
const constructionLinks = document.querySelectorAll('a[href="#construction"]');
constructionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('construction').style.display = 'block';
    });
});

// Return home button
document.getElementById('return-home').addEventListener('click', function() {
    document.getElementById('construction').style.display = 'none';
    clearSearchResults(); // Also clear any search results
});
