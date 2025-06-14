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

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Search functionality
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');

const searchData = [
    { title: "Accessibility Testing Services", link: "#" },
    { title: "WCAG Compliance Guidelines", link: "#" },
    { title: "ADA Compliance Checklist", link: "#" },
    { title: "Accessibility Training Programs", link: "#" },
    { title: "Contact Us", link: "#construction" }
];

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

document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
        searchResults.style.display = 'none';
    }
});

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const totalSlides = slides.length;

// Create indicators
slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.tabIndex = 0;
    indicator.setAttribute('role', 'button');
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    indicator.setAttribute('title', `Slide ${index + 1}`);
    indicator.addEventListener('click', () => showSlide(index));
    indicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            showSlide(index);
        }
    });
    indicatorsContainer.appendChild(indicator);
});

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
        indicator.setAttribute('aria-pressed', index === currentSlide);
    });
}

function showSlide(n) {
    // Hide current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].setAttribute('aria-hidden', 'true');
    
    // Update current slide index
    currentSlide = (n + totalSlides) % totalSlides;
    
    // Show new slide
    slides[currentSlide].classList.add('active');
    slides[currentSlide].setAttribute('aria-hidden', 'false');
    
    updateIndicators();
}

// Button Controls
document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
});

// Initialize
updateIndicators();
showSlide(0);

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto-advance on hover
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

// Resume auto-advance when mouse leaves
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Disability Statistics Data
const disabilityData = {
    global: {
        total: "1.3 Billion",
        percentage: "16%",
        types: {
            mobility: "70%",
            vision: "40%",
            hearing: "30%",
            cognitive: "25%",
            other: "15%"
        },
        source: "World Health Organization"
    },
    usa: {
        total: "61 Million",
        percentage: "26%",
        types: {
            mobility: "65%",
            vision: "35%",
            hearing: "28%",
            cognitive: "22%",
            other: "12%"
        },
        source: "CDC, USA"
    },
    europe: {
        total: "135 Million",
        percentage: "18%",
        types: {
            mobility: "68%",
            vision: "38%",
            hearing: "32%",
            cognitive: "24%",
            other: "14%"
        },
        source: "European Disability Forum"
    },
    india: {
        total: "26.8 Million",
        percentage: "2.2%",
        types: {
            mobility: "55%",
            vision: "45%",
            hearing: "25%",
            cognitive: "20%",
            other: "18%"
        },
        source: "Census of India"
    }
};

// Update statistics based on selected region
document.getElementById('region-select').addEventListener('change', function() {
    const region = this.value;
    const data = disabilityData[region];
    
    document.getElementById('total-disabled').textContent = data.total;
    document.getElementById('percentage-disabled').textContent = data.percentage;
    
    const types = data.types;
    document.querySelector('.chart-bar.mobility').style.height = types.mobility;
    document.querySelector('.chart-bar.mobility').setAttribute('data-percentage', types.mobility);
    document.querySelector('.chart-bar.vision').style.height = types.vision;
    document.querySelector('.chart-bar.vision').setAttribute('data-percentage', types.vision);
    document.querySelector('.chart-bar.hearing').style.height = types.hearing;
    document.querySelector('.chart-bar.hearing').setAttribute('data-percentage', types.hearing);
    document.querySelector('.chart-bar.cognitive').style.height = types.cognitive;
    document.querySelector('.chart-bar.cognitive').setAttribute('data-percentage', types.cognitive);
    document.querySelector('.chart-bar.other').style.height = types.other;
    document.querySelector('.chart-bar.other').setAttribute('data-percentage', types.other);
    
    document.querySelectorAll('.stat-source').forEach(el => {
        el.textContent = `Source: ${data.source}`;
    });
});

// Initialize with global data
document.getElementById('region-select').dispatchEvent(new Event('change'));

// Free audit form submission
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
        errorMessage.textContent = 'Website URL is required. Please enter your website address (e.g., https://example.com)';
        errorMessage.style.display = 'block';
        websiteInput.focus();
        return;
    }
    
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(website)) {
        errorMessage.textContent = 'Invalid website URL format. Please enter a valid URL starting with http:// or https:// (e.g., https://example.com)';
        errorMessage.style.display = 'block';
        websiteInput.focus();
        return;
    }
    
    if (!email) {
        errorMessage.textContent = 'Email address is required. Please enter your business email to receive the audit report.';
        errorMessage.style.display = 'block';
        emailInput.focus();
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Invalid email format. Please enter a valid email address (e.g., name@company.com)';
        errorMessage.style.display = 'block';
        emailInput.focus();
        return;
    }
    
    console.log('Sending audit request to company email:');
    console.log('Website:', website);
    console.log('Email:', email);
    
    successMessage.style.display = 'block';
    
    websiteInput.value = '';
    emailInput.value = '';
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
});
