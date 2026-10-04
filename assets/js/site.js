/**
 * Jay Kaneriya Portfolio Scripts
 * Editorial Design System — Enhanced Interactivity v2
 */
(function () {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // ─── Year ──────────────────────────────────────────────────────────────────
  $$('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ─── Mobile Navigation ─────────────────────────────────────────────────────
  const mobileToggle = $('.mobile-menu-toggle');
  const mobileNav    = $('.mobile-nav');

  if (mobileToggle && mobileNav) {
    const toggleMenu = (isOpen) => {
      const open = typeof isOpen === 'boolean' ? isOpen : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (open) {
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      } else {
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      }
    };
    mobileToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    $$('a', mobileNav).forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) toggleMenu(false);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });
  }

  // ─── Scrollspy ─────────────────────────────────────────────────────────────
  const sections  = ['work', 'expertise', 'experience', 'about'];
  const navLinks  = $$('.desktop-nav a');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href') || '';
          link.classList.toggle('active', href.includes('#' + sections[i]));
        });
        return;
      }
    }
  };
  if (navLinks.length > 0) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Toast Helper ──────────────────────────────────────────────────────────
  const showToast = (message) => {
    let toast = $('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bd795e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  $$('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-copy-email') || 'jay.kaneriya8@gmail.com';
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(email).then(() => showToast('Email copied: ' + email));
      }
    });
  });

  // ─── Contact form ──────────────────────────────────────────────────────────
  const projectType    = $('#project-type');
  const freelanceFields = $('#freelanceFields');
  const messageField   = $('#message');
  if (projectType) {
    const syncContact = () => {
      const isFulltime = projectType.value === 'Full-time remote role';
      if (freelanceFields) freelanceFields.hidden = isFulltime;
      if (messageField) messageField.placeholder = isFulltime
        ? 'Tell me about the role, team, and stack...'
        : 'Tell me about your product, timeline, or requirements...';
    };
    projectType.addEventListener('change', syncContact);

    // Support quick selection buttons
    $$('[data-contact-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = btn.getAttribute('data-contact-type');
        if (val) {
          projectType.value = val;
          syncContact();
        }
      });
    });

    // Support URL query parameters (?type=fulltime or ?type=project)
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam === 'fulltime') {
      projectType.value = 'Full-time remote role';
    } else if (typeParam === 'project') {
      projectType.value = 'New Laravel application';
    }
    syncContact();

    // Show notice if sent=1
    if (urlParams.get('sent') === '1') {
      showToast('Thank you! Your message has been sent. I will reply shortly.');
    }
  }

  // ─── Scroll-Reveal (Intersection Observer) ─────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  $$('.reveal').forEach(el => revealObserver.observe(el));

  // Auto-add reveal class to key sections on homepage
  const revealTargets = [
    '.cred-cell',
    '.project-row',
    '.capability-row',
    '.timeline-item',
    '.rec-card',
    '.rate-card',
    '.editorial-card',
    '.case-section-item',
  ];
  revealTargets.forEach(sel => {
    $$(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 60}ms`;
        revealObserver.observe(el);
      }
    });
  });

  // ─── Count-Up Animations for Stats ────────────────────────────────────────
  const countEls = $$('.cred-val[data-count]');

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1400;
    const startTime = performance.now();
    const isDecimal = String(target).includes('.');

    const step = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (countEls.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countEls.forEach(el => countObserver.observe(el));
  }

  // ─── Floating Back-to-Top Button ───────────────────────────────────────────
  const fab = document.createElement('button');
  fab.className = 'back-to-top';
  fab.setAttribute('aria-label', 'Back to top');
  fab.setAttribute('title', 'Back to top');
  fab.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>';
  document.body.appendChild(fab);

  fab.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    fab.classList.toggle('fab-visible', window.scrollY > 500);
  }, { passive: true });

  // ─── Header hide-on-scroll-down / show-on-scroll-up ───────────────────────
  let lastScrollY   = 0;
  const header      = $('.site-header');
  const THRESHOLD   = 200;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      if (currentY > THRESHOLD) {
        if (currentY > lastScrollY) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
      } else {
        header.classList.remove('header-hidden');
      }
      lastScrollY = currentY;
    }, { passive: true });
  }

  // ─── Skill Bar Animation (for CV page) ─────────────────────────────────────
  const skillBars = $$('.skill-bar-fill');
  if (skillBars.length > 0) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width') || '0';
          entry.target.style.width = width + '%';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => barObserver.observe(bar));
  }

  // ─── Dark / Light mode toggle ──────────────────────────────────────────────
  const savedTheme = localStorage.getItem('jk-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggles = $$('.theme-toggle');
  themeToggles.forEach(btn => {
    updateThemeIcon(btn, savedTheme);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jk-theme', next);
      themeToggles.forEach(b => updateThemeIcon(b, next));
    });
  });

  function updateThemeIcon(btn, theme) {
    if (theme === 'light') {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.setAttribute('title', 'Switch to dark mode');
    } else {
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.setAttribute('title', 'Switch to light mode');
    }
  }

})();