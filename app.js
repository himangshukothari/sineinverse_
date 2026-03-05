// =============================================
// sineinverse — SPA Router & Interactions
// =============================================

(function () {
    'use strict';

    // --- Router ---
    const pages = {
        'home': document.getElementById('page-home'),
        'product-design': document.getElementById('page-product-design'),
        'media-animation': document.getElementById('page-media-animation'),
    };

    const navLinks = document.querySelectorAll('.nav-link');

    function navigate(hash) {
        const page = hash.replace('#', '') || 'home';
        
        // Hide all pages
        Object.values(pages).forEach(p => {
            p.style.display = 'none';
        });

        // Show target page
        if (pages[page]) {
            pages[page].style.display = 'block';
            // Re-trigger page animation
            pages[page].style.animation = 'none';
            pages[page].offsetHeight; // Force reflow
            pages[page].style.animation = '';
        } else {
            pages['home'].style.display = 'block';
        }

        // Update nav active state
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Re-observe reveals on new page
        observeReveals();

        // Close mobile nav
        document.getElementById('navLinks').classList.remove('open');
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => navigate(location.hash));

    // Initial load
    navigate(location.hash || '#home');

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinksEl.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksEl.classList.remove('open');
        });
    });

    // --- Scroll reveal ---
    function observeReveals() {
        const reveals = document.querySelectorAll('.reveal:not(.visible)');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // --- Nav background on scroll ---
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.style.background = 'rgba(8,8,12,0.92)';
        } else {
            nav.style.background = 'rgba(8,8,12,0.7)';
        }
    }, { passive: true });

})();
