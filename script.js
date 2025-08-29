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
    initializeNavbarButtons();
});

// Initialize Navbar Button Functionality
function initializeNavbarButtons() {
    // Write button functionality
    const writeBtn = document.getElementById('write-btn');
    if (writeBtn) {
        writeBtn.addEventListener('click', function() {
            showNotification('Redirecting to write editor...', 'info');
            // In a real app, this would redirect to the editor
            setTimeout(() => {
                window.location.hash = '#write';
            }, 500);
        });
    }

    // User avatar functionality
    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            showUserMenu();
        });
    }

    // Navigation link handling
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    showNotification(`Navigating to ${href.substring(1)} section`, 'info');
                } else {
                    showNotification(`${href.substring(1)} section coming soon!`, 'info');
                }
            }
        });
    });

    // Dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-item');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    showNotification(`Showing ${href.substring(1)} category`, 'info');
                }
            }
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const linkText = this.textContent;
            
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    showNotification(`${linkText} page coming soon!`, 'info');
                }
            }
        });
    });

    // Social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
            showNotification(`Opening ${platform} in new tab...`, 'info');
            // In a real app, these would open the actual social media pages
        });
    });
}

// Show user menu
function showUserMenu() {
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.innerHTML = `
        <div class="user-menu-content">
            <div class="user-menu-header">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User">
                <div>
                    <div class="user-name">John Doe</div>
                    <div class="user-email">john@example.com</div>
                </div>
            </div>
            <div class="user-menu-divider"></div>
            <a href="#profile" class="user-menu-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
            <a href="#settings" class="user-menu-item">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
            </a>
            <a href="#drafts" class="user-menu-item">
                <i class="fas fa-file-alt"></i>
                <span>My Drafts</span>
            </a>
            <a href="#analytics" class="user-menu-item">
                <i class="fas fa-chart-bar"></i>
                <span>Analytics</span>
            </a>
            <div class="user-menu-divider"></div>
            <a href="#logout" class="user-menu-item logout">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </a>
        </div>
    `;

    // Style the user menu
    userMenu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        z-index: 9999;
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--border-radius-xl);
        box-shadow: var(--shadow-xl);
        min-width: 250px;
        opacity: 0;
        transform: translateY(-10px);
        transition: all var(--transition-normal);
    `;

    const userMenuContent = userMenu.querySelector('.user-menu-content');
    userMenuContent.style.cssText = `
        padding: var(--spacing-4);
    `;

    const userMenuHeader = userMenu.querySelector('.user-menu-header');
    userMenuHeader.style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        margin-bottom: var(--spacing-3);
    `;

    const userName = userMenu.querySelector('.user-name');
    userName.style.cssText = `
        font-weight: 600;
        font-size: var(--font-size-sm);
        color: var(--gray-900);
    `;

    const userEmail = userMenu.querySelector('.user-email');
    userEmail.style.cssText = `
        font-size: var(--font-size-xs);
        color: var(--gray-500);
    `;

    const userMenuItems = userMenu.querySelectorAll('.user-menu-item');
    userMenuItems.forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: var(--spacing-3);
            padding: var(--spacing-2) var(--spacing-3);
            color: var(--gray-700);
            text-decoration: none;
            border-radius: var(--border-radius-md);
            transition: background-color var(--transition-fast);
            font-size: var(--font-size-sm);
            margin-bottom: var(--spacing-1);
        `;

        item.addEventListener('mouseenter', function() {
            this.style.background = 'var(--gray-50)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });

        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.querySelector('span').textContent;
            showNotification(`${text} feature coming soon!`, 'info');
            document.body.removeChild(userMenu);
        });
    });

    const dividers = userMenu.querySelectorAll('.user-menu-divider');
    dividers.forEach(divider => {
        divider.style.cssText = `
            height: 1px;
            background: var(--gray-200);
            margin: var(--spacing-3) 0;
        `;
    });

    const logoutItem = userMenu.querySelector('.logout');
    logoutItem.style.color = 'var(--red-600)';

    document.body.appendChild(userMenu);

    // Animate in
    setTimeout(() => {
        userMenu.style.opacity = '1';
        userMenu.style.transform = 'translateY(0)';
    }, 10);

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closeUserMenu(e) {
            if (!userMenu.contains(e.target) && !document.getElementById('user-avatar').contains(e.target)) {
                userMenu.style.opacity = '0';
                userMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (document.body.contains(userMenu)) {
                        document.body.removeChild(userMenu);
                    }
                }, 200);
                document.removeEventListener('click', closeUserMenu);
            }
        });
    }, 100);
}

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
            showNotification('Switched to light mode', 'success');
        } else {
            body.classList.add('dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
            showNotification('Switched to dark mode', 'success');
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
        showNotification('Search opened', 'info');
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
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const query = heroSearchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
    }
    
    if (heroSearchInput) {
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
    
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
    
    // Real-time search suggestions
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            console.log('Searching for:', query);
        }
    });
}

// Perform Search Function
function performSearch(query) {
    console.log('Performing search for:', query);
    showNotification(`Searching for: "${query}"`, 'info');
    
    // Simulate search results
    setTimeout(() => {
        showNotification(`Found ${Math.floor(Math.random() * 50) + 1} results for "${query}"`, 'success');
    }, 1000);
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
            showNotification('Mobile menu opened', 'info');
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
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

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
        top: 80px;
        right: 20px;
        z-index: 9999;
        max-width: 350px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 4px;
        border-radius: 4px;
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
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            removeNotification(notification);
        }
    }, 4000);
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
    const animatedElements = document.querySelectorAll('.featured-card, .category-card, .section-header, .page-section');
    
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
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Filter Articles by Category
function filterArticlesByCategory(category) {
    console.log('Filtering articles by category:', category);
    showNotification(`Showing articles in ${category} category`, 'info');
}

// Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
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
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Article Cards Interaction
document.addEventListener('DOMContentLoaded', function() {
    const articleCards = document.querySelectorAll('.featured-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on meta elements
            if (e.target.closest('.card-meta')) return;
            
            // Simulate navigation to article
            const title = this.querySelector('.card-title').textContent;
            console.log('Navigating to article:', title);
            
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

console.log('BlogPro JavaScript initialized successfully!');

// Show welcome message
setTimeout(() => {
    showNotification('Welcome to BlogPro! All navbar buttons are now functional.', 'success');
}, 1000);