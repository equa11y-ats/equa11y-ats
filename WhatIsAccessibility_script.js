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