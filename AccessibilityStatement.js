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

// Form submission handler
document.getElementById('accessibility-feedback').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('feedback-name').value;
    const email = document.getElementById('feedback-email').value;
    const message = document.getElementById('feedback-message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real implementation, you would send this data to your server
    alert(`Thank you for your feedback, ${name}! We'll review your accessibility concern and respond within 2 business days.`);
    
    // Reset form
    this.reset();
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
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

    // Observe elements
    document.querySelectorAll('.commitment-card, .spec-card, .improvement-item, .process-step').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Accessibility features toggle
const accessibilityToggle = document.createElement('button');
accessibilityToggle.innerHTML = '<i class="fas fa-universal-access"></i> Accessibility Tools';
accessibilityToggle.id = 'accessibility-toggle';
accessibilityToggle.setAttribute('aria-label', 'Open accessibility tools panel');

document.body.appendChild(accessibilityToggle);

accessibilityToggle.addEventListener('click', function() {
    const panel = document.getElementById('accessibility-panel');
    if (!panel) {
        createAccessibilityPanel();
    } else {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
});

function createAccessibilityPanel() {
    const panel = document.createElement('div');
    panel.id = 'accessibility-panel';
    panel.innerHTML = `
        <h3>Accessibility Tools</h3>
        <button id="increase-text" aria-label="Increase text size">
            <i class="fas fa-text-height"></i> Increase Text
        </button>
        <button id="decrease-text" aria-label="Decrease text size">
            <i class="fas fa-text-height"></i> Decrease Text
        </button>
        <button id="high-contrast" aria-label="Toggle high contrast mode">
            <i class="fas fa-adjust"></i> High Contrast
        </button>
        <button id="readable-font" aria-label="Switch to readable font">
            <i class="fas fa-font"></i> Readable Font
        </button>
        <button id="reset-accessibility" aria-label="Reset accessibility settings">
            <i class="fas fa-redo"></i> Reset
        </button>
    `;
    
    document.body.appendChild(panel);
    
    // Add event listeners
    document.getElementById('increase-text').addEventListener('click', function() {
        const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (currentSize + 2) + 'px';
    });
    
    document.getElementById('decrease-text').addEventListener('click', function() {
        const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (currentSize - 2) + 'px';
    });
    
    document.getElementById('high-contrast').addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });
    
    document.getElementById('readable-font').addEventListener('click', function() {
        document.body.classList.toggle('readable-font');
    });
    
    document.getElementById('reset-accessibility').addEventListener('click', function() {
        document.body.style.fontSize = '';
        document.body.classList.remove('high-contrast', 'readable-font');
    });
}

// Add extra CSS for accessibility features
const accessibilityStyles = document.createElement('style');
accessibilityStyles.innerHTML = `
    .high-contrast {
        --primary-color: #000000;
        --secondary-color: #000000;
        --accent-color: #000000;
        --text-color: #FFFFFF;
        --light-bg: #000000;
        --white: #000000;
        background: #000000 !important;
        color: #FFFFFF !important;
    }
    
    .high-contrast * {
        background: #000000 !important;
        color: #FFFFFF !important;
        border-color: #FFFFFF !important;
    }
    
    .readable-font {
        font-family: Arial, sans-serif !important;
        line-height: 1.8 !important;
        letter-spacing: 0.5px !important;
    }
    
    #accessibility-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 10px 15px;
        border-radius: 25px;
        z-index: 1000;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    #accessibility-panel {
        position: fixed;
        bottom: 70px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 1000;
        display: none;
    }
    
    #accessibility-panel h3 {
        margin-bottom: 10px;
        color: var(--secondary-color);
    }
    
    #accessibility-panel button {
        display: block;
        width: 100%;
        padding: 8px 10px;
        margin-bottom: 8px;
        background: var(--light-bg);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;
document.head.appendChild(accessibilityStyles);