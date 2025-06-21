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

// Team member animation effect
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
        const photo = this.querySelector('.photo-placeholder');
        photo.style.transform = 'scale(1.05)';
    });
    
    member.addEventListener('mouseleave', function() {
        const photo = this.querySelector('.photo-placeholder');
        photo.style.transform = 'scale(1)';
    });
    
    member.addEventListener('focus', function() {
        const photo = this.querySelector('.photo-placeholder');
        photo.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    });
    
    member.addEventListener('blur', function() {
        const photo = this.querySelector('.photo-placeholder');
        photo.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate team members on scroll
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

    // Observe team members
    document.querySelectorAll('.team-member').forEach(member => {
        member.style.opacity = 0;
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(member);
    });

    // Observe value cards
    document.querySelectorAll('.value-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Social link focus effect
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('focus', function() {
        this.parentElement.parentElement.style.transform = 'scale(1.03)';
        this.parentElement.parentElement.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
    });
    
    link.addEventListener('blur', function() {
        this.parentElement.parentElement.style.transform = '';
        this.parentElement.parentElement.style.boxShadow = '';
    });
});