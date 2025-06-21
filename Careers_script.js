// Basic search functionality
document.querySelector('.search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search').value;
    if(searchTerm.trim() !== '') {
        alert(`Search functionality would show results for: ${searchTerm}`);
    }
});

document.getElementById('search').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        const searchTerm = document.getElementById('search').value;
        if(searchTerm.trim() !== '') {
            alert(`Search functionality would show results for: ${searchTerm}`);
        }
    }
});

// Highlight current page in navigation
const currentPage = document.querySelector('a[aria-current="page"]');
if(currentPage) {
    currentPage.style.color = "var(--accent-color)";
    currentPage.style.fontWeight = "700";
}

// Job card animations
const jobCards = document.querySelectorAll('.job-card');
jobCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
    
    card.addEventListener('focus', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate job cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe job cards
    document.querySelectorAll('.job-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe testimonials
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Add temporary tabindex to make element focusable
            targetElement.setAttribute('tabindex', '-1');
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            targetElement.focus();
            
            // Remove tabindex after focus to prevent tab stops
            setTimeout(() => {
                targetElement.removeAttribute('tabindex');
            }, 1000);
        }
    });
});