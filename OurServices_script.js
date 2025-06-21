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

        if (mobileSearchButton) {
            mobileSearchButton.addEventListener('click', () => {
                mobileSearchExpanded.classList.toggle('active');
                if (mobileSearchExpanded.classList.contains('active')) {
                    document.getElementById('mobile-search').focus();
                }
            });
        }

        // Search functionality
        const searchData = [
            { title: "Accessibility Testing Services", link: "#", description: "Comprehensive testing solutions to ensure WCAG compliance" },
            { title: "WCAG Compliance Guidelines", link: "#", description: "Latest WCAG standards and implementation best practices" },
            { title: "ADA Compliance Checklist", link: "#", description: "Essential steps for ADA website compliance" },
            { title: "Accessibility Training Programs", link: "#", description: "Training for developers, designers, and content creators" },
            { title: "Contact Us", link: "#", description: "Get in touch with our accessibility experts" }
        ];

        const pageSections = [
            { id: "services-banner", title: "Our Services", description: "Overview of our accessibility solutions" },
            { id: "core-services", title: "Core Services", description: "Detailed information about our core offerings" },
            { id: "service-process", title: "Our Process", description: "Our comprehensive service delivery process" },
            { id: "additional-services", title: "Additional Services", description: "Specialized services we offer" }
        ];

        function performSearch(searchTerm) {
            const resultsContainer = document.getElementById('search-results-content');
            const resultsTitle = document.getElementById('search-results-title');
            const searchResultsSection = document.getElementById('search-results-container');
            const announceElement = document.getElementById('aria-announce');
            
            // Show search results
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
                        <i class="fas fa-search fa-3x"></i>
                        <p>Sorry, no results found for your search: <strong>"${searchTerm}"</strong></p>
                        <p>Try searching for something else or check out these popular topics:</p>
                        
                        <div class="suggested-searches">
                            <h3>Popular Searches:</h3>
                            <ul>
                                <li>Accessibility Testing</li>
                                <li>WCAG Compliance</li>
                                <li>Training Programs</li>
                                <li>ADA Checklist</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        
                        <button class="cta-button" id="clear-search">Back to Home</button>
                    </div>
                `;
                
                announceElement.textContent = `Sorry, no results found for your search: "${searchTerm}". Try another search term.`;
                document.getElementById('clear-search').addEventListener('click', clearSearchResults);
                document.getElementById('clear-search').focus();
                
                // Add click events to suggested searches
                document.querySelectorAll('.suggested-searches li').forEach(item => {
                    item.addEventListener('click', function() {
                        const searchTerm = this.textContent;
                        document.getElementById('search').value = searchTerm;
                        document.getElementById('mobile-search').value = searchTerm;
                        performSearch(searchTerm.toLowerCase());
                    });
                });
                
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
            
            // Clear search inputs
            document.getElementById('search').value = '';
            document.getElementById('mobile-search').value = '';
            
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