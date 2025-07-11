// JavaScript for About Us Page (about.html)

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Logic (Copied from index.html's script for consistency on about page) ---
    const mobileMenuButton = document.querySelector('header button.md\\:hidden');
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.classList.add('mobile-nav-overlay');
    document.body.appendChild(mobileNavOverlay);

    const mobileNavMenu = document.createElement('nav');
    mobileNavMenu.classList.add('mobile-nav-menu');
    document.body.appendChild(mobileNavMenu);

    const desktopNavLinks = document.querySelectorAll('header nav.md\\:flex a');
    desktopNavLinks.forEach(link => {
        const clonedLink = link.cloneNode(true);
        mobileNavMenu.appendChild(clonedLink);
    });

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="sr-only">Close Menu</span>
    `;
    mobileNavMenu.prepend(closeButton);

    if (mobileMenuButton) { // Only add if button exists
        mobileMenuButton.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            mobileNavMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    mobileNavOverlay.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    closeButton.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Feedback Modal Logic (Copied from index.html's script for consistency on about page) ---
    const suggestionBoxBtn = document.getElementById('suggestion-box-btn');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackModalCloseBtn = document.getElementById('feedback-modal-close-btn');

    // Check if elements exist before adding listeners to prevent errors on other pages
    if (suggestionBoxBtn && feedbackModalOverlay && feedbackModalCloseBtn) {
        suggestionBoxBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        feedbackModalOverlay.addEventListener('click', (event) => {
            // Close if click is on the overlay itself, not the modal content
            if (event.target === feedbackModalOverlay) {
                feedbackModalOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        feedbackModalCloseBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
});
