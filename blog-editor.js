// Blog Editor JavaScript Functionality

// Global variables
let currentDraft = null;
let autoSaveTimeout = null;
let isFullscreen = false;
let isStarred = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeWSGIEditor();
    initializeEditorForm();
    initializeEditorTabs();
    initializeToolbar();
    initializeMetaBoxes();
    initializeWordCount();
    loadSavedDraft();
    
    // Auto-save functionality
    setupAutoSave();
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

// WSGI Editor Initialization
function initializeWSGIEditor() {
    const wsgiEditor = document.getElementById('wsgi-editor');
    const toolbarButtons = document.querySelectorAll('.toolbar-btn[data-command]');
    
    // Initialize toolbar functionality
    toolbarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const command = this.dataset.command;
            const value = this.dataset.value;
            
            if (command) {
                executeCommand(command, value);
            }
        });
    });
    
    // Add placeholder functionality
    wsgiEditor.addEventListener('focus', function() {
        if (this.textContent === '') {
            this.setAttribute('data-placeholder', 'Start writing your amazing blog post...');
        }
    });
    
    wsgiEditor.addEventListener('blur', function() {
        if (this.textContent === '') {
            this.removeAttribute('data-placeholder');
        }
    });
    
    // Initialize format select
    const formatSelect = document.getElementById('format-select');
    formatSelect.addEventListener('change', function() {
        const value = this.value;
        if (value) {
            executeCommand('formatBlock', `<${value}>`);
        }
    });
    
    console.log('WSGI Editor initialized successfully');
}

// Execute editor commands
function executeCommand(command, value) {
    const wsgiEditor = document.getElementById('wsgi-editor');
    
    // Focus the editor first
    wsgiEditor.focus();
    
    switch (command) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'italic':
            document.execCommand('italic', false, null);
            break;
        case 'underline':
            document.execCommand('underline', false, null);
            break;
        case 'strikethrough':
            document.execCommand('strikethrough', false, null);
            break;
        case 'insertUnorderedList':
            document.execCommand('insertUnorderedList', false, null);
            break;
        case 'insertOrderedList':
            document.execCommand('insertOrderedList', false, null);
            break;
        case 'createLink':
            const url = prompt('Enter URL:');
            if (url) {
                document.execCommand('createLink', false, url);
            }
            break;
        case 'unlink':
            document.execCommand('unlink', false, null);
            break;
        case 'insertImage':
            const imageUrl = prompt('Enter image URL:');
            if (imageUrl) {
                document.execCommand('insertImage', false, imageUrl);
            }
            break;
        case 'formatBlock':
            if (value) {
                document.execCommand('formatBlock', false, value);
            }
            break;
        case 'justifyLeft':
            document.execCommand('justifyLeft', false, null);
            break;
        case 'justifyCenter':
            document.execCommand('justifyCenter', false, null);
            break;
        case 'justifyRight':
            document.execCommand('justifyRight', false, null);
            break;
        case 'justifyFull':
            document.execCommand('justifyFull', false, null);
            break;
        default:
            console.log('Unknown command:', command);
    }
    
    // Update active state for formatting buttons
    updateActiveButtons();
}

// Update active state for formatting buttons
function updateActiveButtons() {
    const formattingButtons = document.querySelectorAll('[data-command="bold"], [data-command="italic"], [data-command="underline"], [data-command="strikethrough"]');
    
    formattingButtons.forEach(button => {
        const command = button.dataset.command;
        if (document.queryCommandState(command)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize Editor Form
function initializeEditorForm() {
    const saveDraftBtn = document.getElementById('save-draft-btn');
    const publishBtn = document.getElementById('publish-btn');
    const previewBtn = document.getElementById('preview-btn');
    const addMediaBtn = document.getElementById('add-media-btn');
    const editPermalinkBtn = document.getElementById('edit-permalink-btn');
    const moveToTrashBtn = document.getElementById('move-to-trash-btn');
    
    // Save Draft button
    saveDraftBtn.addEventListener('click', function() {
        saveDraft();
    });
    
    // Publish button
    publishBtn.addEventListener('click', function() {
        publishPost();
    });
    
    // Preview button
    previewBtn.addEventListener('click', function() {
        generatePreview();
    });
    
    // Add Media button
    addMediaBtn.addEventListener('click', function() {
        addMedia();
    });
    
    // Edit Permalink button
    editPermalinkBtn.addEventListener('click', function() {
        editPermalink();
    });
    
    // Move to Trash button
    moveToTrashBtn.addEventListener('click', function() {
        moveToTrash();
    });
    
    // Form input event listeners for auto-save
    const formInputs = document.querySelectorAll('#blog-editor-form input, #blog-editor-form select, #blog-editor-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            triggerAutoSave();
        });
    });
    
    // Editor content change
    const wsgiEditor = document.getElementById('wsgi-editor');
    wsgiEditor.addEventListener('input', function() {
        triggerAutoSave();
        updateWordCount();
    });
}

// Initialize Editor Tabs
function initializeEditorTabs() {
    const tabButtons = document.querySelectorAll('.editor-tabs .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle tab switching
            switchTab(tab);
        });
    });
}

// Switch between Visual and Text tabs
function switchTab(tab) {
    const wsgiEditor = document.getElementById('wsgi-editor');
    
    if (tab === 'text') {
        // Switch to HTML view
        wsgiEditor.contentEditable = false;
        wsgiEditor.style.fontFamily = 'monospace';
        wsgiEditor.style.backgroundColor = '#f8f9fa';
    } else {
        // Switch to Visual view
        wsgiEditor.contentEditable = true;
        wsgiEditor.style.fontFamily = 'inherit';
        wsgiEditor.style.backgroundColor = 'transparent';
    }
}

// Initialize Toolbar
function initializeToolbar() {
    const starBtn = document.getElementById('star-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // Star button functionality
    starBtn.addEventListener('click', function() {
        toggleStar();
    });
    
    // Fullscreen button functionality
    fullscreenBtn.addEventListener('click', function() {
        toggleFullscreen();
    });
}

// Toggle Star (Featured)
function toggleStar() {
    const starBtn = document.getElementById('star-btn');
    const starIcon = starBtn.querySelector('i');
    
    isStarred = !isStarred;
    
    if (isStarred) {
        starIcon.className = 'fas fa-star';
        starBtn.style.color = '#fbbf24';
        showNotification('Post marked as featured!', 'success');
    } else {
        starIcon.className = 'far fa-star';
        starBtn.style.color = 'inherit';
        showNotification('Post unmarked as featured', 'info');
    }
}

// Toggle Fullscreen
function toggleFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const fullscreenIcon = fullscreenBtn.querySelector('i');
    const editorMain = document.querySelector('.editor-form-main');
    
    isFullscreen = !isFullscreen;
    
    if (isFullscreen) {
        editorMain.classList.add('fullscreen');
        fullscreenIcon.className = 'fas fa-compress';
        fullscreenBtn.title = 'Exit Fullscreen';
        showNotification('Entered fullscreen mode', 'info');
    } else {
        editorMain.classList.remove('fullscreen');
        fullscreenIcon.className = 'fas fa-expand';
        fullscreenBtn.title = 'Fullscreen';
        showNotification('Exited fullscreen mode', 'info');
    }
}

// Initialize Meta Boxes
function initializeMetaBoxes() {
    const addTagBtn = document.getElementById('add-tag-btn');
    const addCategoryBtn = document.getElementById('add-category-btn');
    const categoryTabs = document.querySelectorAll('.categories-tabs .tab-btn');
    
    // Add Tag button
    addTagBtn.addEventListener('click', function() {
        addTag();
    });
    
    // Add Category button
    addCategoryBtn.addEventListener('click', function() {
        addCategory();
    });
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.dataset.tab;
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle category tab switching
            switchCategoryTab(tabType);
        });
    });
}

// Add Tag
function addTag() {
    const tagInput = document.getElementById('post-tags');
    const tag = tagInput.value.trim();
    
    if (tag) {
        // In a real implementation, this would add the tag to the post
        showNotification(`Tag "${tag}" added successfully!`, 'success');
        tagInput.value = '';
    } else {
        showNotification('Please enter a tag name', 'error');
    }
}

// Add Category
function addCategory() {
    const categoryName = prompt('Enter new category name:');
    
    if (categoryName && categoryName.trim()) {
        // In a real implementation, this would add the category
        showNotification(`Category "${categoryName}" added successfully!`, 'success');
    }
}

// Switch Category Tab
function switchCategoryTab(tabType) {
    console.log('Switching to category tab:', tabType);
    // In a real implementation, this would filter categories
}

// Initialize Word Count
function initializeWordCount() {
    updateWordCount();
}

// Update Word Count
function updateWordCount() {
    const wsgiEditor = document.getElementById('wsgi-editor');
    const wordCountElement = document.querySelector('.word-count');
    
    const text = wsgiEditor.textContent || wsgiEditor.innerText || '';
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    wordCountElement.textContent = `Word count: ${wordCount}`;
}

// Setup Auto-save
function setupAutoSave() {
    // Auto-save every 30 seconds
    setInterval(() => {
        if (hasUnsavedChanges()) {
            autoSaveDraft();
        }
    }, 30000);
}

// Trigger Auto-save
function triggerAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        if (hasUnsavedChanges()) {
            autoSaveDraft();
        }
    }, 2000);
}

// Check if there are unsaved changes
function hasUnsavedChanges() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('wsgi-editor').innerHTML;
    
    return title || content.trim() !== '';
}

// Save Draft
function saveDraft() {
    const formData = new FormData(document.getElementById('blog-editor-form'));
    const postData = {
        title: formData.get('title'),
        content: document.getElementById('wsgi-editor').innerHTML || '',
        category: formData.get('category'),
        tags: formData.get('tags'),
        status: 'draft',
        lastSaved: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('currentDraft', JSON.stringify(postData));
    currentDraft = postData;
    
    // Update status
    updateLastEdited();
    showNotification('Draft saved successfully!', 'success');
    
    console.log('Draft saved:', postData);
}

// Auto-save Draft
function autoSaveDraft() {
    if (hasUnsavedChanges()) {
        saveDraft();
        updateLastEdited();
        showNotification('Draft auto-saved', 'info');
    }
}

// Update Last Edited Time
function updateLastEdited() {
    const lastEditedElement = document.querySelector('.edit-date');
    const now = new Date();
    lastEditedElement.textContent = now.toLocaleString();
}

// Publish Post
function publishPost() {
    const formData = new FormData(document.getElementById('blog-editor-form'));
    const postData = {
        title: formData.get('title'),
        content: document.getElementById('wsgi-editor').innerHTML || '',
        category: formData.get('category'),
        tags: formData.get('tags'),
        status: 'published',
        publishedAt: new Date().toISOString(),
        author: {
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        }
    };
    
    // Validate form data
    if (!validatePostData(postData)) {
        return;
    }
    
    // Show loading state
    showPublishLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        showPublishLoading(false);
        
        // Publish post
        publishPostToStorage(postData);
        
        // Show success message
        showNotification('Post published successfully!', 'success');
        
        // Reset form
        resetEditorForm();
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 2000);
}

// Publish Post to Storage
function publishPostToStorage(postData) {
    // Get existing posts or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
    
    // Add new post
    existingPosts.unshift(postData);
    
    // Save back to localStorage
    localStorage.setItem('publishedPosts', JSON.stringify(existingPosts));
    
    console.log('Post published to storage:', postData);
}

// Validate Post Data
function validatePostData(postData) {
    if (!postData.title || postData.title.trim() === '') {
        showNotification('Please enter a post title', 'error');
        return false;
    }
    
    if (!postData.content || postData.content.trim() === '') {
        showNotification('Please add some content to your post', 'error');
        return false;
    }
    
    return true;
}

// Show Publish Loading
function showPublishLoading(show) {
    const publishBtn = document.getElementById('publish-btn');
    const originalText = publishBtn.innerHTML;
    
    if (show) {
        publishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
        publishBtn.disabled = true;
    } else {
        publishBtn.innerHTML = originalText;
        publishBtn.disabled = false;
    }
}

// Reset Editor Form
function resetEditorForm() {
    document.getElementById('blog-editor-form').reset();
    document.getElementById('wsgi-editor').innerHTML = '';
    currentDraft = null;
    
    // Update word count
    updateWordCount();
}

// Generate Preview
function generatePreview() {
    const title = document.getElementById('post-title').value || 'Untitled Post';
    const content = document.getElementById('wsgi-editor').innerHTML || '<p>No content yet...</p>';
    
    // In a real implementation, this would open a preview window
    showNotification('Preview functionality would open in a new window', 'info');
}

// Add Media
function addMedia() {
    // In a real implementation, this would open a media library
    showNotification('Media library would open here', 'info');
}

// Edit Permalink
function editPermalink() {
    const permalinkInput = document.getElementById('post-permalink');
    const currentValue = permalinkInput.value;
    
    const newPermalink = prompt('Edit permalink:', currentValue);
    
    if (newPermalink && newPermalink.trim()) {
        permalinkInput.value = newPermalink.trim();
        showNotification('Permalink updated successfully!', 'success');
    }
}

// Move to Trash
function moveToTrash() {
    if (confirm('Are you sure you want to move this post to trash?')) {
        // In a real implementation, this would move the post to trash
        showNotification('Post moved to trash', 'info');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Load Saved Draft
function loadSavedDraft() {
    try {
        const savedDraft = localStorage.getItem('currentDraft');
        if (savedDraft) {
            currentDraft = JSON.parse(savedDraft);
            
            // Populate form fields
            if (currentDraft.title) {
                document.getElementById('post-title').value = currentDraft.title;
            }
            if (currentDraft.content) {
                document.getElementById('wsgi-editor').innerHTML = currentDraft.content;
            }
            if (currentDraft.category) {
                document.querySelector(`input[name="category"][value="${currentDraft.category}"]`).checked = true;
            }
            if (currentDraft.tags) {
                document.getElementById('post-tags').value = currentDraft.tags;
            }
            
            // Update word count
            updateWordCount();
            
            console.log('Draft loaded:', currentDraft);
        }
    } catch (error) {
        console.error('Failed to load saved draft:', error);
        localStorage.removeItem('currentDraft');
    }
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

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', function(e) {
    if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
    }
});

console.log('Blog Editor JavaScript initialized successfully!');
