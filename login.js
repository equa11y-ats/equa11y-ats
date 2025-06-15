// Mobile menu functionality with focus trapping
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const overlay = document.getElementById('overlay');

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

mobileSearchButton.addEventListener('click', () => {
    mobileSearchExpanded.classList.toggle('active');
    if (mobileSearchExpanded.classList.contains('active')) {
        document.getElementById('mobile-search').focus();
    }
});

// Close mobile search when clicking outside
document.addEventListener('click', function(e) {
    const isClickInside = mobileSearchExpanded.contains(e.target) || 
                          e.target === mobileSearchButton ||
                          mobileSearchButton.contains(e.target);
    
    if (!isClickInside) {
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
    if (!desktopResults.contains(e.target) && 
        e.target !== desktopSearch && 
        e.target !== desktopButton) {
        desktopResults.style.display = 'none';
    }
    
    // Mobile search
    if (!mobileResults.contains(e.target) && 
        e.target !== mobileSearch && 
        e.target !== mobileButton) {
        mobileResults.style.display = 'none';
    }
});
 // Toggle between login and create account sections
        document.getElementById('show-create-account').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('create-account-section').style.display = 'block';
            document.title = "Create Account - equA11Y aTs";
        });
        
        document.getElementById('show-login').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('create-account-section').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
            document.title = "Login - equA11Y aTs";
        });
        
        // Form submission handling
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // In a real application, this would be an API call
            alert(`Login submitted with email: ${email}\nPassword: ${password}`);
            // Here you would typically redirect to the dashboard
        });
        
        document.getElementById('create-account-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('create-email').value;
            const password = document.getElementById('create-password').value;
            
            // In a real application, this would be an API call
            alert(`Account created:\nName: ${firstName} ${lastName}\nEmail: ${email}\nPassword: ${password}`);
            
            // After account creation, show login form
            document.getElementById('create-account-section').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
            document.title = "Login - equA11Y aTs";
            
            // Pre-fill the login form
            document.getElementById('login-email').value = email;
            document.getElementById('login-password').value = password;
        });



