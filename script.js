(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        const closeNav = () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('click', (event) => {
            if (!navLinks.classList.contains('open')) return;
            if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
            closeNav();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeNav();
        });
    }

    // Scroll-spy: highlight the nav link for the section in view
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
        const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const link = linkFor(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    navAnchors.forEach((a) => a.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach((section) => spyObserver.observe(section));
    }

    // Scroll-reveal for cards and section headings
    const revealTargets = document.querySelectorAll('.card, section h2');

    if (revealTargets.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
        revealTargets.forEach((el) => el.classList.add('reveal'));

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach((el) => revealObserver.observe(el));
    }
})();
