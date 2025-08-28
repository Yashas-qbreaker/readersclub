// BlogPro JavaScript Functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeSearch();
    initializeMobileMenu();
    initializeNewsletterForm();
    initializeScrollAnimations();
    initializeCategoryCards();
    initializeNavbar();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark');
        themeIcon.className = 'fas fa-moon';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const heroSearchInput = document.querySelector('.hero-search input');
    const heroSearchBtn = document.querySelector('.hero-search .btn');
    
    // Search overlay toggle
    function openSearch() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 300);
    }
    
    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
    }
    
    // Event listeners
    searchBtn.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    
    // Close on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
    
    // Hero search functionality
    heroSearchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const query = heroSearchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });
    
    heroSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
    
    // Search input functionality
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                performSearch(query);
                closeSearch();
            }
        }
    });
    
    // Real-time search suggestions (mock implementation)
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            // Simulate search suggestions
            console.log('Searching for:', query);
        }
    });
}

// Perform Search Function
function performSearch(query) {
    console.log('Performing search for:', query);
    // In a real implementation, this would:
    // 1. Make API call to search endpoint
    // 2. Display search results
    // 3. Update URL with search parameters
    
    // For demo purposes, show alert
    alert(`Searching for: "${query}"`);
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// Newsletter Form
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simulate subscription
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 4px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            removeNotification(notification);
        }
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.featured-card, .category-card, .blog-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Category Cards Interaction
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterArticlesByCategory(category);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Filter Articles by Category
function filterArticlesByCategory(category) {
    console.log('Filtering articles by category:', category);
    // In a real implementation, this would:
    // 1. Filter visible articles
    // 2. Update URL
    // 3. Show loading state
    // 4. Fetch filtered results
    
    showNotification(`Showing articles in ${category} category`, 'info');
}

// Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            
            if (document.body.classList.contains('dark')) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(12px)';
            
            if (document.body.classList.contains('dark')) {
                navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            }
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Article Cards Interaction
document.addEventListener('DOMContentLoaded', function() {
    const articleCards = document.querySelectorAll('.featured-card, .blog-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on meta elements
            if (e.target.closest('.card-meta')) return;
            
            // Simulate navigation to article
            const title = this.querySelector('.card-title').textContent;
            console.log('Navigating to article:', title);
            
            // In a real implementation, this would navigate to the article page
            showNotification('Loading article...', 'info');
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// initializeLazyLoading();

// Search Functionality Enhancement
function enhanceSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"], input[type="search"]');
    
    // Add search suggestions
    const searchSuggestions = [
        'React tutorials',
        'JavaScript best practices',
        'Web development trends',
        'UI/UX design',
        'TypeScript guide',
        'CSS animations',
        'Node.js performance',
        'Vue.js components',
        'Python programming',
        'Machine learning'
    ];
    
    searchInputs.forEach(input => {
        // Add autocomplete functionality
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 1) {
                const suggestions = searchSuggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(query)
                );
                
                // Display suggestions (implementation would depend on UI requirements)
                console.log('Suggestions:', suggestions);
            }
        });
    });
}

// Call enhanced search on page load
document.addEventListener('DOMContentLoaded', enhanceSearch);

// Performance Monitoring
function monitorPerformance() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
    
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                // Scroll performance monitoring
                scrollTimeout = null;
            }, 100);
        }
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorPerformance();
}

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format numbers
    formatNumber: function(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },
    
    // Calculate reading time
    calculateReadingTime: function(text) {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }
};

// Export utils for potential use in other scripts
window.BlogProUtils = utils;

// Add CSS for mobile menu when active
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--white);
            border-top: 1px solid var(--gray-200);
            flex-direction: column;
            padding: var(--spacing-4);
            gap: var(--spacing-4);
            box-shadow: var(--shadow-lg);
            z-index: 999;
        }
        
        body.dark .nav-menu.active {
            background: var(--dark-surface);
            border-color: var(--dark-border);
        }
        
        .nav-menu.active .nav-dropdown {
            position: static;
        }
        
        .nav-menu.active .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border: none;
            margin-top: var(--spacing-2);
            padding-left: var(--spacing-4);
        }
    }
`;
document.head.appendChild(style);

console.log('BlogPro JavaScript initialized successfully!');