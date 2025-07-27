// Sample quotes data - you can expand this with your own favorite quotes
const quotes = [
    {
        text: "Eat your food as your medicine. Otherwise, you have to eat medicine as your food.",
        author: "Hippocrates",
        // book: "The Oath",
        tags: ["Nutrition", "Life advice"],
        comment: "Although everybody knows that eating healthily should be the norm, we often indulge in unhealthy food - this is a perfect reminder that eating junk should remain the exception. This quote is often attributed to Steve Jobs, but it stems from ancient times."
    },

    {
        text: "There's nothing you can do that can't be done.",
        author: "The Beatles",
        book: "All You Need Is Love",
        tags: ["Funny", "Music"],
        comment: "Interestingly, this quote takes quite some time to digest - perfect to irritate people. It is also a tautology, which means it always remains true, no matter what you can or cannot do. That being said, it opens a great realm of interpretations, among which I find that all life goals are achievable yet demanding one of them."
    },

    {
        text: "It does not do to dwell on dreams and forget to live.",
        author: "Albus Dumbledore (J.K. Rowling)",
        book: "Harry Potter and the Sorcerer's Stone",
        tags: ["Life advice", "Books"],
        comment: "One of my/our biggest weaknesses is to remain overthinking of what could be done, and forget to act to make actual progress."
    },

    {
        text: "Die Logik ist zwar unerschütterlich, aber einem Menschen, der leben will, widersteht sie nicht. (Logic may indeed be unshakeable, but it cannot withstand a human who is determined to live.)",
        author: "Franz Kafka",
        book: "The Trial",
        tags: ["Life advice", "Books"],
        comment: "The quote exhibits one central dilemma of life: No matter how reasonable a decision is, taking a deviant path may be more rewarding."
    },

    {
        text: "If you want to walk fast, walk alone. If you want to walk far, walk together.",
        author: "African proverb",
        tags: ["Life advice"],
        comment: "A bit too vague and contradictory for concrete advice, but I like the idea of fusing people's strengths."
    },

];

// Get all unique tags from quotes
function getAllTags() {
    const allTags = quotes.flatMap(quote => quote.tags);
    return [...new Set(allTags)].sort();
}

// Filter quotes based on search term and active tags
function filterQuotes(searchTerm, activeTags) {
    return quotes.filter(quote => {
        const matchesSearch = !searchTerm || 
            quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (quote.book && quote.book.toLowerCase().includes(searchTerm.toLowerCase())) ||
            quote.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesTags = activeTags.length === 0 || 
            activeTags.some(tag => quote.tags.includes(tag));
        
        return matchesSearch && matchesTags;
    });
}

// Create quote card HTML
function createQuoteCard(quote) {
    const tagsHTML = quote.tags.map(tag => 
        `<span class="quote-tag">${tag}</span>`
    ).join('');
    
    const bookHTML = quote.book ? 
        `<div class="quote-book">${quote.book}</div>` : '';
    
    const commentHTML = quote.comment ? 
        `<div class="quote-comment">${quote.comment}</div>` : '';
    
    return `
        <div class="quote-card">
            <div class="quote-text">${quote.text}</div>
            <div class="quote-author">— ${quote.author}</div>
            ${bookHTML}
            <div class="quote-tags">${tagsHTML}</div>
            ${commentHTML}
        </div>
    `;
}

// Update the display
function updateDisplay() {
    const searchTerm = document.getElementById('searchInput').value;
    const activeTags = Array.from(document.querySelectorAll('.tag-button.active'))
        .map(button => button.textContent);
    
    const filteredQuotes = filterQuotes(searchTerm, activeTags);
    const container = document.getElementById('quotesContainer');
    
    if (filteredQuotes.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                No quotes found matching your search criteria.
                <br>Try adjusting your search terms or tags.
            </div>
        `;
    } else {
        container.innerHTML = filteredQuotes.map(createQuoteCard).join('');
    }
}

// Initialize the page
function initializePage() {
    // Create tag buttons
    const tagButtons = document.getElementById('tagButtons');
    const allTags = getAllTags();
    
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-button';
        button.textContent = tag;
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateDisplay();
        });
        tagButtons.appendChild(button);
    });
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', updateDisplay);
    
    // Set up clear button
    const clearButton = document.getElementById('clearSearch');
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        document.querySelectorAll('.tag-button.active').forEach(button => {
            button.classList.remove('active');
        });
        updateDisplay();
    });
    
    // Initial display
    updateDisplay();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 