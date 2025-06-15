
        // Mobile menu functionality with focus trapping
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobile-menu';
        mobileMenu.innerHTML = `
            <button class="close-menu" id="close-menu" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
            <ul>
                <li><a href="Home.html" aria-current="page">Home</a></li>
                <li><a href="#construction">Our Services</a></li>
                <li><a href="#construction">What is Accessibility</a></li>
                <li><a href="#construction">Why Accessibility</a></li>
                <li><a href="#construction">A11Y Library</a></li>
                <li><a href="#construction">Foxone USA</a></li>
                <li><a href="#construction">Contact Us</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);
        
        const closeMenuBtn = document.getElementById('close-menu');
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        document.body.appendChild(overlay);

        let focusableElements;
        let firstFocusableElement;
        let lastFocusableElement;

        function trapFocus(element) {
            focusableElements = Array.from(
                element.querySelectorAll(
                    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.disabled && el.getAttribute('tabindex') !== '-1');
            
            firstFocusableElement = focusableElements[0];
            lastFocusableElement = focusableElements[focusableElements.length - 1];
            
            firstFocusableElement.focus();
            
            mobileMenu.addEventListener('keydown', handleFocusTrap);
        }

        function handleFocusTrap(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }

        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            trapFocus(mobileMenu);
        });

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenu.removeEventListener('keydown', handleFocusTrap);
            hamburgerBtn.focus();
        }

        closeMenuBtn.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);

        // Mobile search functionality
        const mobileSearchButton = document.querySelector('.mobile-search-button');
        const mobileSearchExpanded = document.getElementById('mobile-search-expanded');

        if(mobileSearchButton) {
            mobileSearchButton.addEventListener('click', () => {
                mobileSearchExpanded.classList.toggle('active');
                if (mobileSearchExpanded.classList.contains('active')) {
                    document.getElementById('mobile-search').focus();
                }
            });
        }

        // Close mobile search when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInside = mobileSearchExpanded && 
                (mobileSearchExpanded.contains(e.target) || 
                e.target === mobileSearchButton ||
                mobileSearchButton.contains(e.target);
            
            if (!isClickInside && mobileSearchExpanded) {
                mobileSearchExpanded.classList.remove('active');
            }
        });

        // Search functionality
        const searchData = [
            { title: "Accessibility Testing Services", link: "#" },
            { title: "WCAG Compliance Guidelines", link: "#" },
            { title: "ADA Compliance Checklist", link: "#" },
            { title: "Accessibility Training Programs", link: "#" },
            { title: "Contact Us", link: "#construction" }
        ];

        function performSearch(inputId, resultsId) {
            const searchInput = document.getElementById(inputId);
            const searchResults = document.getElementById(resultsId);
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.trim().toLowerCase();
                searchResults.innerHTML = '';
                
                if (searchTerm.length === 0) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                const filteredResults = searchData.filter(item => 
                    item.title.toLowerCase().includes(searchTerm)
                );
                
                if (filteredResults.length > 0) {
                    filteredResults.forEach(result => {
                        const link = document.createElement('a');
                        link.href = result.link;
                        link.textContent = result.title;
                        link.classList.add('search-result-item');
                        searchResults.appendChild(link);
                    });
                    searchResults.style.display = 'block';
                } else {
                    const noResults = document.createElement('div');
                    noResults.textContent = 'No results found';
                    noResults.classList.add('no-results');
                    searchResults.appendChild(noResults);
                    searchResults.style.display = 'block';
                }
            });
        }

        performSearch('search', 'search-results');
        performSearch('mobile-search', 'mobile-search-results');

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            const desktopSearch = document.getElementById('search');
            const desktopResults = document.getElementById('search-results');
            const desktopButton = document.querySelector('.search-button');
            
            const mobileSearch = document.getElementById('mobile-search');
            const mobileResults = document.getElementById('mobile-search-results');
            const mobileButton = document.querySelector('.mobile-search-button');
            
            // Desktop search
            if (desktopResults && !desktopResults.contains(e.target) && 
                e.target !== desktopSearch && 
                e.target !== desktopButton) {
                desktopResults.style.display = 'none';
            }
            
            // Mobile search
            if (mobileResults && !mobileResults.contains(e.target) && 
                e.target !== mobileSearch && 
                e.target !== mobileButton) {
                mobileResults.style.display = 'none';
            }
        });

        // Under construction links
        const constructionLinks = document.querySelectorAll('a[href="#construction"]');
        constructionLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
            });
        });
    