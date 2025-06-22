// Service page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips for process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        step.setAttribute('title', step.querySelector('p').textContent);
        step.setAttribute('tabindex', '0');
        step.setAttribute('role', 'button');
        
        step.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
        
        step.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.classList.toggle('expanded');
            }
        });
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#main-navigation a, .mobile-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (linkPage === 'OurServices.html' && currentPage === 'AccessibilityTesting.html')) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('current-page');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Add temporary tabindex to make element focusable
                    targetElement.setAttribute('tabindex', '-1');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Focus the target element
                    setTimeout(() => {
                        targetElement.focus();
                        // Remove tabindex after focus to prevent tab stops
                        setTimeout(() => {
                            targetElement.removeAttribute('tabindex');
                        }, 1000);
                    }, 500);
                }
            }
        });
    });
    
    // Form validation for audit request
    const auditForm = document.getElementById('audit-form');
    if (auditForm) {
        auditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const websiteInput = document.getElementById('website-input');
            const emailInput = document.getElementById('email-input');
            const errorMessage = document.getElementById('error-message');
            const successMessage = document.getElementById('success-message');
            const website = websiteInput.value.trim();
            const email = emailInput.value.trim();
            
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';
            
            // Simple validation
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
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMessage.textContent = 'Please enter a valid email address.';
                errorMessage.style.display = 'block';
                emailInput.focus();
                return;
            }
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            websiteInput.value = '';
            emailInput.value = '';
            
            // Announce success to screen readers
            const announceElement = document.getElementById('aria-announce');
            announceElement.textContent = 'Your accessibility audit request has been submitted successfully. We will contact you soon.';
        });
    }
});