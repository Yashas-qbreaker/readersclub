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
    initializeBlogPosts();
    initializeAllButtons();
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
    
    if (typeof demoData !== 'undefined') {
        // Search through demo data
        const searchResults = demoData.searchPosts(query);
        
        if (searchResults.length > 0) {
            showSearchResults(searchResults, query);
        } else {
            showNotification(`No results found for "${query}"`, 'info');
        }
    } else {
        // Fallback for when demo data is not available
        showNotification(`Searching for: "${query}"`, 'info');
    }
}

// Show Search Results
function showSearchResults(results, query) {
    // Create a modal to display search results
    const modal = document.createElement('div');
    modal.className = 'search-results-modal';
    modal.innerHTML = `
        <div class="search-results-overlay">
            <div class="search-results-container">
                <div class="search-results-header">
                    <h3>Search Results for "${query}"</h3>
                    <button class="search-results-close">&times;</button>
                </div>
                <div class="search-results-content">
                    ${results.map(post => `
                        <div class="search-result-item">
                            <div class="search-result-image">
                                <img src="${post.image}" alt="${post.title}">
                            </div>
                            <div class="search-result-info">
                                <h4>${post.title}</h4>
                                <p>${post.excerpt}</p>
                                <div class="search-result-meta">
                                    <span class="category">${post.category}</span>
                                    <span class="author">${post.author.name}</span>
                                    <span class="date">${demoData.formatDate(post.publishedAt)}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.search-results-close');
    const overlay = modal.querySelector('.search-results-overlay');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    showNotification(`Found ${results.length} results for "${query}"`, 'success');
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
            // Simulate subscription with loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
                emailInput.value = '';
                
                // Update subscriber count
                const subscriberNote = document.querySelector('.newsletter-note');
                if (subscriberNote && typeof demoData !== 'undefined') {
                    demoData.newsletterSubscribers++;
                    subscriberNote.textContent = `Join ${demoData.newsletterSubscribers.toLocaleString()}+ readers who trust us with their weekly dose of insights.`;
                }
            }, 2000);
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
    
    if (typeof demoData !== 'undefined') {
        const filteredPosts = demoData.getPostsByCategory(category);
        showFilteredArticles(filteredPosts, category);
    } else {
        showNotification(`Showing articles in ${category} category`, 'info');
    }
}

// Show Filtered Articles
function showFilteredArticles(posts, category) {
    // Create a modal to display filtered articles
    const modal = document.createElement('div');
    modal.className = 'filtered-articles-modal';
    modal.innerHTML = `
        <div class="filtered-articles-overlay">
            <div class="filtered-articles-container">
                <div class="filtered-articles-header">
                    <h3>Articles in ${category} Category</h3>
                    <span class="article-count">${posts.length} articles found</span>
                    <button class="filtered-articles-close">&times;</button>
                </div>
                <div class="filtered-articles-content">
                    ${posts.map(post => `
                        <div class="filtered-article-item">
                            <div class="filtered-article-image">
                                <img src="${post.image}" alt="${post.title}">
                            </div>
                            <div class="filtered-article-info">
                                <h4>${post.title}</h4>
                                <p>${post.excerpt}</p>
                                <div class="filtered-article-meta">
                                    <span class="author">${post.author.name}</span>
                                    <span class="date">${demoData.formatDate(post.publishedAt)}</span>
                                    <span class="read-time">${post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.filtered-articles-close');
    const overlay = modal.querySelector('.filtered-articles-overlay');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    showNotification(`Showing ${posts.length} articles in ${category} category`, 'success');
}

// Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
            
            if (document.body.classList.contains('dark')) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
            
            if (document.body.classList.contains('dark')) {
                navbar.style.background = 'rgba(15, 23, 42, 0.9)';
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
function initializeArticleCards() {
    const articleCards = document.querySelectorAll('.featured-card, .blog-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on meta elements
            if (e.target.closest('.card-meta')) return;
            
            // Simulate navigation to article
            const title = this.querySelector('.card-title').textContent;
            const category = this.querySelector('.card-category').textContent;
            
            console.log('Navigating to article:', title);
            
            // Navigate to article page
            navigateToArticle(title, category);
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Navigate to Article Page
function navigateToArticle(title, category) {
    // In a real implementation, this would navigate to the specific article
    // For now, we'll navigate to our demo article page
    showNotification(`Navigating to: ${title}`, 'info');
    
    // Simulate navigation delay
    setTimeout(() => {
        window.location.href = 'article.html';
    }, 1000);
}

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

// Initialize blog posts
function initializeBlogPosts() {
    if (typeof demoData !== 'undefined') {
        populateFeaturedPosts();
        populateRecentPosts();
        populateCategories();
        populatePopularTags();
        populateFeaturedAuthors();
    } else {
        console.log('Demo data not available');
    }
}

// Initialize all button functionality
function initializeAllButtons() {
    initializeHeroSearchButton();
    initializeExploreArticlesButton();
    initializeViewAllCategoriesButton();
    initializeTrendingNowButton();
    initializeViewAllArticlesButton();
    initializeSocialLinks();
    initializeFooterLinks();
    initializeArticleCards();
}

// Populate featured posts
function populateFeaturedPosts() {
    const featuredSection = document.querySelector('.featured-posts');
    if (!featuredSection) return;
    
    const featuredPosts = demoData.getFeaturedPosts();
    const postsContainer = featuredSection.querySelector('.posts-grid');
    
    if (postsContainer) {
        postsContainer.innerHTML = featuredPosts.map(post => `
            <article class="post-card featured" data-category="${post.category.toLowerCase()}">
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="post-category">${post.category}</div>
                </div>
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <div class="post-author">
                            <img src="${post.author.avatar}" alt="${post.author.name}">
                            <span>${post.author.name}</span>
                        </div>
                        <div class="post-info">
                            <span class="post-date">${demoData.formatDate(post.publishedAt)}</span>
                            <span class="post-read-time">${post.readTime}</span>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
    }
}

// Populate recent posts
function populateRecentPosts() {
    const recentSection = document.querySelector('.recent-posts');
    if (!recentSection) return;
    
    const recentPosts = demoData.getRecentPosts(6);
    const postsContainer = recentSection.querySelector('.posts-grid');
    
    if (postsContainer) {
        postsContainer.innerHTML = recentPosts.map(post => `
            <article class="post-card" data-category="${post.category.toLowerCase()}">
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="post-category">${post.category}</div>
                </div>
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <div class="post-author">
                            <img src="${post.author.avatar}" alt="${post.author.name}">
                            <span>${post.author.name}</span>
                        </div>
                        <div class="post-info">
                            <span class="post-date">${demoData.formatDate(post.publishedAt)}</span>
                            <span class="post-read-time">${post.readTime}</span>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
    }
}

// Populate categories
function populateCategories() {
    const categoriesSection = document.querySelector('.categories-section');
    if (!categoriesSection) return;
    
    const categories = demoData.categories;
    const categoriesContainer = categoriesSection.querySelector('.categories-grid');
    
    if (categoriesContainer) {
        categoriesContainer.innerHTML = categories.map(category => `
            <div class="category-card" data-category="${category.name.toLowerCase()}">
                <div class="category-icon" style="background-color: ${category.color}">
                    <i class="fas fa-folder"></i>
                </div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">${category.count} posts</p>
            </div>
        `).join('');
    }
}

// Populate popular tags
function populatePopularTags() {
    const tagsSection = document.querySelector('.popular-tags');
    if (!tagsSection) return;
    
    const tags = demoData.popularTags.slice(0, 20); // Show top 20 tags
    const tagsContainer = tagsSection.querySelector('.tags-list');
    
    if (tagsContainer) {
        tagsContainer.innerHTML = tags.map(tag => `
            <span class="tag" data-tag="${tag.toLowerCase()}">${tag}</span>
        `).join('');
    }
}

// Populate featured authors
function populateFeaturedAuthors() {
    const authorsSection = document.querySelector('.featured-authors');
    if (!authorsSection) return;
    
    const authors = demoData.featuredAuthors;
    const authorsContainer = authorsSection.querySelector('.authors-grid');
    
    if (authorsContainer) {
        authorsContainer.innerHTML = authors.map(author => `
            <div class="author-card">
                <div class="author-avatar">
                    <img src="${author.avatar}" alt="${author.name}">
                </div>
                <div class="author-info">
                    <h3 class="author-name">${author.name}</h3>
                    <p class="author-bio">${author.bio}</p>
                    <div class="author-stats">
                        <span class="author-posts">${author.posts} posts</span>
                        <span class="author-followers">${author.followers} followers</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Hero Search Button
function initializeHeroSearchButton() {
    const heroSearchBtn = document.getElementById('hero-search-btn');
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('.hero-search input');
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            } else {
                showNotification('Please enter a search term', 'error');
            }
        });
    }
}

// Explore Articles Button
function initializeExploreArticlesButton() {
    const exploreBtn = document.getElementById('explore-articles-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // Scroll to latest posts section
            const latestPostsSection = document.querySelector('.latest-posts');
            if (latestPostsSection) {
                latestPostsSection.scrollIntoView({ behavior: 'smooth' });
                showNotification('Exploring articles...', 'info');
            }
        });
    }
}

// View All Categories Button
function initializeViewAllCategoriesButton() {
    const viewCategoriesBtn = document.getElementById('view-all-categories-btn');
    if (viewCategoriesBtn) {
        viewCategoriesBtn.addEventListener('click', function() {
            // Show all categories in a modal or expand the section
            showNotification('Loading all categories...', 'info');
            // In a real implementation, this would fetch and display all categories
            setTimeout(() => {
                showNotification('All categories loaded!', 'success');
            }, 1000);
        });
    }
}

// Trending Now Button
function initializeTrendingNowButton() {
    const trendingBtn = document.getElementById('trending-now-btn');
    if (trendingBtn) {
        trendingBtn.addEventListener('click', function() {
            // Show trending articles
            showNotification('Loading trending articles...', 'info');
            // In a real implementation, this would fetch trending articles
            setTimeout(() => {
                showNotification('Trending articles loaded!', 'success');
            }, 1000);
        });
    }
}

// View All Articles Button
function initializeViewAllArticlesButton() {
    const viewArticlesBtn = document.getElementById('view-all-articles-btn');
    if (viewArticlesBtn) {
        viewArticlesBtn.addEventListener('click', function() {
            // Show all articles
            showNotification('Loading all articles...', 'info');
            // In a real implementation, this would fetch all articles
            setTimeout(() => {
                showNotification('All articles loaded!', 'success');
            }, 1000);
        });
    }
}

// Social Links
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            let platformName = 'social media';
            
            if (platform.includes('twitter')) platformName = 'Twitter';
            else if (platform.includes('facebook')) platformName = 'Facebook';
            else if (platform.includes('instagram')) platformName = 'Instagram';
            else if (platform.includes('linkedin')) platformName = 'LinkedIn';
            else if (platform.includes('github')) platformName = 'GitHub';
            
            showNotification(`Redirecting to ${platformName}...`, 'info');
            // In a real implementation, this would open the actual social media profiles
        });
    });
}

// Footer Links
function initializeFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            showNotification(`Navigating to ${linkText}...`, 'info');
            // In a real implementation, this would navigate to the actual pages
        });
    });
}

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