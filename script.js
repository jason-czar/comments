// Simple JavaScript for the test website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add some interactivity for testing the extension
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });

    // Log page interactions for extension testing
    console.log('Test website loaded - ready for Sidenote extension testing');
    
    // Add click tracking for extension development
    document.addEventListener('click', function(e) {
        console.log('Element clicked:', e.target.tagName, e.target.className);
    });

    // Add text selection tracking for extension development
    document.addEventListener('mouseup', function() {
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            console.log('Text selected:', selection.toString());
        }
    });

    // Open Sidenote extension side panel
    const openSidenoteButton = document.getElementById('openSidenote');
    const sidepanel = document.getElementById('sidepanel');
    const overlay = document.getElementById('overlay');
    const closeSidepanelButton = document.getElementById('closeSidepanel');
    
    if (openSidenoteButton) {
        openSidenoteButton.addEventListener('click', function() {
            openSidepanel();
        });
    }
    
    // Close sidepanel functionality
    if (closeSidepanelButton) {
        closeSidepanelButton.addEventListener('click', closeSidepanel);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidepanel);
    }
    
    function openSidepanel() {
        sidepanel.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update page info
        document.getElementById('currentUrl').textContent = window.location.href;
        document.getElementById('pageTitle').textContent = document.title;
        
        console.log('Sidenote panel opened');
    }
    
    function closeSidepanel() {
        sidepanel.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        console.log('Sidenote panel closed');
    }
    
    // Add comment functionality
    const addCommentButton = document.getElementById('addComment');
    const commentInput = document.getElementById('commentInput');
    const commentsContainer = document.querySelector('.comments-container');
    const commentCount = document.getElementById('commentCount');
    
    if (addCommentButton && commentInput) {
        addCommentButton.addEventListener('click', function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                addComment(commentText);
                commentInput.value = '';
            }
        });
        
        // Allow Enter to submit comment (Shift+Enter for new line)
        commentInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addCommentButton.click();
            }
        });
    }
    
    function addComment(text) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <div class="comment-author">You</div>
            <div class="comment-text">${text}</div>
            <div class="comment-time">Just now</div>
        `;
        
        commentsContainer.insertBefore(comment, commentsContainer.firstChild);
        
        // Update comment count
        const currentCount = parseInt(commentCount.textContent);
        commentCount.textContent = currentCount + 1;
        
        // Scroll to top of comments
        commentsContainer.scrollTop = 0;
    }
    
    // Text selection functionality
    let isHighlightMode = false;
    const highlightModeButton = document.getElementById('highlightMode');
    const selectedTextDiv = document.getElementById('selectedText');
    const selectedTextContent = document.getElementById('selectedTextContent');
    
    if (highlightModeButton) {
        highlightModeButton.addEventListener('click', function() {
            isHighlightMode = !isHighlightMode;
            this.classList.toggle('active');
            document.body.classList.toggle('highlight-mode');
            
            if (isHighlightMode) {
                this.textContent = 'Exit Highlight Mode';
            } else {
                this.textContent = 'Highlight Mode';
            }
        });
    }
    
    // Handle text selection
    document.addEventListener('mouseup', function() {
        const selection = window.getSelection();
        if (selection.toString().length > 0 && isHighlightMode) {
            const selectedText = selection.toString().trim();
            if (selectedText.length > 5) { // Only show for meaningful selections
                selectedTextContent.textContent = selectedText;
                selectedTextDiv.style.display = 'block';
                
                // Highlight the selected text
                const range = selection.getRangeAt(0);
                const span = document.createElement('span');
                span.className = 'highlighted-text';
                try {
                    range.surroundContents(span);
                } catch (e) {
                    // Handle cases where selection spans multiple elements
                    console.log('Complex selection detected');
                }
                
                selection.removeAllRanges();
            }
        }
    });
    
    // Feature buttons functionality
    const shareDiscussionButton = document.getElementById('shareDiscussion');
    const exportCommentsButton = document.getElementById('exportComments');
    
    if (shareDiscussionButton) {
        shareDiscussionButton.addEventListener('click', function() {
            // Mock share functionality
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.textContent = 'Link Copied!';
                setTimeout(() => {
                    this.textContent = 'Share Discussion';
                }, 2000);
            });
        });
    }
    
    if (exportCommentsButton) {
        exportCommentsButton.addEventListener('click', function() {
            // Mock export functionality
            const comments = Array.from(document.querySelectorAll('.comment')).map(comment => {
                return {
                    author: comment.querySelector('.comment-author').textContent,
                    text: comment.querySelector('.comment-text').textContent,
                    time: comment.querySelector('.comment-time').textContent
                };
            });
            
            console.log('Exported comments:', comments);
            this.textContent = 'Exported!';
            setTimeout(() => {
                this.textContent = 'Export Comments';
            }, 2000);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape to close sidepanel
        if (e.key === 'Escape' && sidepanel.classList.contains('open')) {
            closeSidepanel();
        }
        
        // Ctrl/Cmd + Shift + S to open sidepanel
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            if (sidepanel.classList.contains('open')) {
                closeSidepanel();
            } else {
                openSidepanel();
            }
        }
    });
});