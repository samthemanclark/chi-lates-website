// Chi-Lates — Site Scripts

(function () {
  'use strict';

  // --- Dark Mode Toggle ---
  var toggle = document.getElementById('theme-toggle');
  var body = document.body;
  var html = document.documentElement;

  // Motto elements that change in dark mode
  var heroSubtitle = document.querySelector('.hero-subtitle');
  var footerTagline = document.querySelector('.footer-brand p');
  var LIGHT_MOTTO = 'Where East Meets West in Mindful Movement';
  var DARK_MOTTO = 'Because You Die';

  // Check for saved preference
  var savedTheme = localStorage.getItem('chi-lates-theme');
  if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    swapImages('dark');
    setMotto('dark');
  }

  toggle.addEventListener('click', function () {
    var isDark = html.getAttribute('data-theme') === 'dark';
    var newTheme = isDark ? 'light' : 'dark';

    // Fade out swappable images
    var images = document.querySelectorAll('.swappable');
    images.forEach(function (img) {
      img.classList.add('swapping');
    });

    // After fade out, swap sources and theme
    setTimeout(function () {
      html.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
      if (newTheme === 'light') {
        html.removeAttribute('data-theme');
      }
      swapImages(newTheme);
      setMotto(newTheme);
      localStorage.setItem('chi-lates-theme', newTheme);

      // Fade back in
      setTimeout(function () {
        images.forEach(function (img) {
          img.classList.remove('swapping');
        });
      }, 50);
    }, 400);
  });

  function swapImages(theme) {
    var images = document.querySelectorAll('.swappable');
    images.forEach(function (img) {
      var src = img.getAttribute('data-' + theme);
      if (src) {
        img.src = src;
      }
    });
  }

  function setMotto(theme) {
    if (heroSubtitle) {
      heroSubtitle.textContent = theme === 'dark' ? DARK_MOTTO : LIGHT_MOTTO;
    }
    if (footerTagline) {
      footerTagline.textContent = theme === 'dark' ? DARK_MOTTO + '.' : 'Where East meets West in mindful movement.';
    }
  }

  // --- Navbar scroll effect ---
  var nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Mobile menu toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // --- Scroll animations ---
  var fadeElements = document.querySelectorAll(
    '.method-card, .benefit-item, .instructor-card, .location-card, .about-text, .about-card, .schedule-card, .testimonial-card, .pricing-card, .about-image'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
