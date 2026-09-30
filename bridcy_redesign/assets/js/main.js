/* Bridcy 2026 - main.js (lightweight) */
(function () {
  'use strict';

  // ---- Sticky header shadow ----
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
  }

  // ---- Reveal on scroll ----
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Lang switcher (visual only - persists choice) ----
  const langButtons = document.querySelectorAll('[data-lang]');
  const savedLang = localStorage.getItem('bridcy_lang') || 'zh';
  langButtons.forEach((b) => {
    if (b.dataset.lang === savedLang) b.classList.add('is-on');
    b.addEventListener('click', () => {
      langButtons.forEach((x) => x.classList.remove('is-on'));
      b.classList.add('is-on');
      localStorage.setItem('bridcy_lang', b.dataset.lang);
    });
  });

  // ---- Case tabs ----
  const tabBtns = document.querySelectorAll('[data-case-tab]');
  const tabPanels = document.querySelectorAll('[data-case-panel]');
  tabBtns.forEach((b) => {
    b.addEventListener('click', () => {
      const target = b.dataset.caseTab;
      tabBtns.forEach((x) => x.classList.toggle('is-active', x === b));
      tabPanels.forEach((p) => p.classList.toggle('is-active', p.dataset.casePanel === target));
    });
  });

  // ---- Region filter (advisors) ----
  const regionBtns = document.querySelectorAll('[data-region]');
  const advisorCards = document.querySelectorAll('[data-advisor-region]');
  regionBtns.forEach((b) => {
    b.addEventListener('click', () => {
      const r = b.dataset.region;
      regionBtns.forEach((x) => x.classList.toggle('is-active', x === b));
      advisorCards.forEach((c) => {
        const match = r === 'all' || c.dataset.advisorRegion === r;
        c.style.display = match ? '' : 'none';
      });
    });
  });

  // ---- Insights search ----
  const search = document.getElementById('insightsSearch');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      document.querySelectorAll('[data-insight]').forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }

  // ---- Contact form (visual confirmation only) ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = '感谢联系，我们会在 24 小时内回复 / Thank you — we will respond within 24 hours.';
        status.style.color = 'var(--accent-deep)';
      }
      form.reset();
    });
  }
})();
