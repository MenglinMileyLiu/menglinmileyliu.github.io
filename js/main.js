/* ============================================
   Menglin Liu Academic Portfolio — main.js
   Scroll reveal, mobile nav, header behaviour
   ============================================ */

(function () {
  'use strict';

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  function initReveal() {
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var els = document.querySelectorAll('.reveal');

    if (prefersReduced) {
      // Immediately show everything
      els.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Apply stagger delay if set via data-delay
            var delay = entry.target.getAttribute('data-delay');
            if (delay) {
              entry.target.style.transitionDelay = delay + 'ms';
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Mobile Nav Toggle ---------- */
  function initMobileNav() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Header Scroll Shadow ---------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var onScroll = function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initMobileNav();
    initHeaderScroll();
  });
})();
