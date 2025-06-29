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
});