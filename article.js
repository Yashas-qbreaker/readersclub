// Article Page JavaScript Functionality

// Global variables
let isLiked = false;
let isBookmarked = false;
let likeCount = 94;
let commentCount = 12;
let shareCount = 28;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeArticleActions();
    initializeCommentSystem();
    initializeCodeBlocks();
    initializeRelatedPosts();
    initializeNewsletterForm();
    initializeArticleNavigation();
    initializeReadingProgress();
});

// Initialize Article Actions (Like, Bookmark, Share)
function initializeArticleActions() {
    const likeBtn = document.getElementById('like-btn');
    const likeArticleBtn = document.getElementById('like-article-btn');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const shareBtn = document.getElementById('share-btn');
    const shareArticleBtn = document.getElementById('share-article-btn');
    
    // Like functionality
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            toggleLike(this);
        });
    }
    
    if (likeArticleBtn) {
        likeArticleBtn.addEventListener('click', function() {
            toggleLike(this);
        });
    }
    
    // Bookmark functionality
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            toggleBookmark(this);
        });
    }
    
    // Share functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            shareArticle();
        });
    }
    
    if (shareArticleBtn) {
        shareArticleBtn.addEventListener('click', function() {
            shareArticle();
        });
    }
}

// Toggle Like
function toggleLike(button) {
    const likeIcon = button.querySelector('i');
    const likeCountSpan = button.querySelector('.like-count');
    
    isLiked = !isLiked;
    
    if (isLiked) {
        likeIcon.className = 'fas fa-heart';
        likeIcon.style.color = '#ef4444';
        likeCount++;
        showNotification('Article liked!', 'success');
    } else {
        likeIcon.className = 'far fa-heart';
        likeIcon.style.color = 'inherit';
        likeCount--;
        showNotification('Article unliked', 'info');
    }
    
    // Update all like count displays
    updateLikeCounts();
    
    // Add animation
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Toggle Bookmark
function toggleBookmark(button) {
    const bookmarkIcon = button.querySelector('i');
    
    isBookmarked = !isBookmarked;
    
    if (isBookmarked) {
        bookmarkIcon.className = 'fas fa-bookmark';
        bookmarkIcon.style.color = '#3b82f6';
        showNotification('Article bookmarked!', 'success');
    } else {
        bookmarkIcon.className = 'far fa-bookmark';
        bookmarkIcon.style.color = 'inherit';
        showNotification('Article removed from bookmarks', 'info');
    }
    
    // Add animation
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Share Article
function shareArticle() {
    if (navigator.share) {
        // Use native sharing if available
        navigator.share({
            title: 'Building Modern Web Applications with React and TypeScript',
            text: 'Check out this amazing article about React and TypeScript development!',
            url: window.location.href
        }).then(() => {
            showNotification('Article shared successfully!', 'success');
            shareCount++;
            updateShareCount();
        }).catch((error) => {
            console.log('Error sharing:', error);
            showShareModal();
        });
    } else {
        // Fallback to custom share modal
        showShareModal();
    }
}

// Show Share Modal
function showShareModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-overlay">
            <div class="share-modal-container">
                <div class="share-modal-header">
                    <h3>Share Article</h3>
                    <button class="share-modal-close">&times;</button>
                </div>
                <div class="share-modal-content">
                    <div class="share-options">
                        <button class="share-option" onclick="shareToSocial('twitter')">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </button>
                        <button class="share-option" onclick="shareToSocial('facebook')">
                            <i class="fab fa-facebook"></i>
                            <span>Facebook</span>
                        </button>
                        <button class="share-option" onclick="shareToSocial('linkedin')">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn</span>
                        </button>
                        <button class="share-option" onclick="shareToSocial('whatsapp')">
                            <i class="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </button>
                    </div>
                    <div class="share-link">
                        <label>Or copy the link:</label>
                        <div class="link-input-group">
                            <input type="text" value="${window.location.href}" readonly>
                            <button class="btn btn-primary btn-sm" onclick="copyLink()">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.share-modal-close');
    const overlay = modal.querySelector('.share-modal-overlay');
    
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
}

// Share to Social Media
function shareToSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Building Modern Web Applications with React and TypeScript');
    const text = encodeURIComponent('Check out this amazing article about React and TypeScript development!');
    
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        showNotification(`Sharing to ${platform}...`, 'success');
        shareCount++;
        updateShareCount();
        
        // Close modal
        const modal = document.querySelector('.share-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }
}

// Copy Link
function copyLink() {
    const linkInput = document.querySelector('.share-link input');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(linkInput.value).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy link', 'error');
        });
    }
}

// Update Like Counts
function updateLikeCounts() {
    const likeCounts = document.querySelectorAll('.like-count');
    likeCounts.forEach(span => {
        span.textContent = likeCount;
    });
    
    // Update engagement stats
    const engagementStats = document.querySelector('.engagement-stats .stat:first-child span');
    if (engagementStats) {
        engagementStats.textContent = `${likeCount} likes`;
    }
}

// Update Share Count
function updateShareCount() {
    const engagementStats = document.querySelector('.engagement-stats .stat:last-child span');
    if (engagementStats) {
        engagementStats.textContent = `${shareCount} shares`;
    }
}

// Initialize Comment System
function initializeCommentSystem() {
    const commentForm = document.querySelector('.comment-input-form');
    const commentBtn = document.getElementById('comment-btn');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitComment(this);
        });
    }
    
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            scrollToComments();
        });
    }
    
    // Initialize comment actions
    initializeCommentActions();
}

// Submit Comment
function submitComment(form) {
    const textarea = form.querySelector('textarea');
    const comment = textarea.value.trim();
    
    if (!comment) {
        showNotification('Please enter a comment', 'error');
        return;
    }
    
    // Simulate comment submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Add comment to the list
        addCommentToDOM(comment);
        
        // Reset form
        textarea.value = '';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Update comment count
        commentCount++;
        updateCommentCount();
        
        showNotification('Comment posted successfully!', 'success');
        
        // Scroll to new comment
        scrollToComments();
    }, 1500);
}

// Add Comment to DOM
function addCommentToDOM(commentText) {
    const commentsList = document.querySelector('.comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Your Avatar" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <h4 class="comment-author">You</h4>
                <span class="comment-date">Just now</span>
            </div>
            <p class="comment-text">${commentText}</p>
            <div class="comment-actions">
                <button class="comment-action">
                    <i class="far fa-heart"></i>
                    <span>0</span>
                </button>
                <button class="comment-action">
                    <i class="fas fa-reply"></i>
                    Reply
                </button>
            </div>
        </div>
    `;
    
    // Add to the beginning of the list
    commentsList.insertBefore(newComment, commentsList.firstChild);
    
    // Add fade-in animation
    newComment.style.opacity = '0';
    newComment.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        newComment.style.transition = 'all 0.3s ease';
        newComment.style.opacity = '1';
        newComment.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize Comment Actions
function initializeCommentActions() {
    // Like comments
    document.addEventListener('click', function(e) {
        if (e.target.closest('.comment-action') && e.target.closest('.comment-action').querySelector('.fa-heart')) {
            const actionBtn = e.target.closest('.comment-action');
            const heartIcon = actionBtn.querySelector('i');
            const likeCount = actionBtn.querySelector('span');
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.className = 'fas fa-heart';
                heartIcon.style.color = '#ef4444';
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            } else {
                heartIcon.className = 'far fa-heart';
                heartIcon.style.color = 'inherit';
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
        }
    });
}

// Scroll to Comments
function scrollToComments() {
    const commentsSection = document.querySelector('.comments-section');
    if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update Comment Count
function updateCommentCount() {
    const commentCounts = document.querySelectorAll('.comments-section h3, .engagement-stats .stat:nth-child(2) span');
    commentCounts.forEach(element => {
        if (element.tagName === 'H3') {
            element.textContent = `Comments (${commentCount})`;
        } else {
            element.textContent = `${commentCount} comments`;
        }
    });
}

// Initialize Code Blocks
function initializeCodeBlocks() {
    // Add copy functionality to code blocks
    const copyButtons = document.querySelectorAll('.copy-code-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            copyCode(this);
        });
    });
}

// Copy Code Function
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    try {
        navigator.clipboard.writeText(code).then(() => {
            // Show success feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#10b981';
            button.style.color = 'white';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.style.color = '';
            }, 2000);
            
            showNotification('Code copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            showNotification('Code copied to clipboard!', 'success');
        });
    } catch (err) {
        showNotification('Failed to copy code', 'error');
    }
}

// Initialize Related Posts
function initializeRelatedPosts() {
    const relatedPosts = document.querySelectorAll('.related-post');
    relatedPosts.forEach(post => {
        post.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Navigating to: ${title}`, 'info');
            // In a real implementation, this would navigate to the article
        });
        
        // Add hover effect
        post.style.cursor = 'pointer';
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Initialize Newsletter Form
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.sidebar-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    emailInput.value = '';
                    showNotification('Thank you for subscribing!', 'success');
                }, 2000);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

// Initialize Article Navigation
function initializeArticleNavigation() {
    const prevArticle = document.querySelector('.prev-article');
    const nextArticle = document.querySelector('.next-article');
    
    if (prevArticle) {
        prevArticle.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Navigating to previous article...', 'info');
        });
    }
    
    if (nextArticle) {
        nextArticle.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Navigating to next article...', 'info');
        });
    }
}

// Initialize Reading Progress
function initializeReadingProgress() {
    // Create reading progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressFill = document.querySelector('.reading-progress-fill');
        if (progressFill) {
            progressFill.style.width = scrollPercent + '%';
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System (reuse from main script)
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

console.log('Article page JavaScript initialized successfully!');
