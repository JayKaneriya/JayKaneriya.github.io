(function(){
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────────────────── Utilities ──────────────────────────── */
  const $ = (s,r) => (r||document).querySelector(s);
  const $$ = (s,r) => [...(r||document).querySelectorAll(s)];

  /* ──────────────────────────── Footer year ──────────────────────────── */
  const yr = $('#footerYear');
  if(yr) yr.textContent = new Date().getFullYear();

  /* ──────────────────────────── Nav scroll state ──────────────────────────── */
  const nav = $('#nav');
  const progress = $('#scrollProgress');
  const toTop = $('#toTop');
  const supportsScrollTimeline = CSS.supports('animation-timeline','scroll()');

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', y > 30);
    toTop.classList.toggle('show', y > 700);
    // JS fallback for scroll progress
    if(progress && !supportsScrollTimeline && max > 0){
      progress.style.transform = `scaleX(${y/max})`;
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior: reduce?'auto':'smooth'}));

  /* ──────────────────────────── Active page nav ──────────────────────────── */
  const navLinks = $$('[data-nav]');
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageKey = (pathParts[pathParts.length - 1] || 'index.html').toLowerCase();
  const inCaseStudies = location.pathname.includes('/case-studies/');
  navLinks.forEach(a => {
    if(a.classList.contains('nav-hire')) return;
    const href = (a.getAttribute('href') || '').split('/').pop().split('?')[0].toLowerCase();
    const isHome = href === 'index.html' || href === '' || href === './';
    const matchHome = (pageKey === 'index.html' || pageKey === '') && isHome;
    const matchPage = href === pageKey;
    const matchProjects = inCaseStudies && href === 'projects.html';
    a.classList.toggle('active', matchHome || matchPage || matchProjects);
  });

  /* ──────────────────────────── Mobile menu ──────────────────────────── */
  const menuToggle = $('#menuToggle');
  const menuIcon = $('#menuIcon');
  const navLinksEl = $('#navLinks');

  if(menuToggle && navLinksEl){
    const setNav = (open) => {
      document.body.classList.toggle('nav-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if(menuIcon) menuIcon.setAttribute('href', open ? '#i-close' : '#i-menu');
    };
    menuToggle.addEventListener('click', e => {
      e.stopPropagation();
      setNav(!document.body.classList.contains('nav-open'));
    });
    $$('a', navLinksEl).forEach(link => link.addEventListener('click', () => setNav(false)));
    document.addEventListener('keydown', e => { if(e.key==='Escape') setNav(false); });
    window.addEventListener('resize', () => { if(window.innerWidth > 900) setNav(false); });
  }

  /* ──────────────────────────── Contact CTA context ──────────────────────────── */
  const projectType = $('#project-type');
  const freelanceFields = $('#freelanceFields');
  const messageField = $('#message');
  const formStatus = $('#formStatus');
  const contactTypeMap = {
    fulltime: 'Full-time remote role',
    retainer: 'Freelance / contract work',
    project: 'New Laravel application',
    existing: 'Existing Laravel application',
    api: 'API & payment integration',
    mobile: 'React Native application',
    freelance: 'Freelance / contract work'
  };
  const syncContactForm = () => {
    if(!projectType) return;
    const isFullTime = projectType.value === 'Full-time remote role';
    if(freelanceFields){
      freelanceFields.hidden = isFullTime;
      $$('input', freelanceFields).forEach(input => {
        input.disabled = isFullTime;
      });
    }
    if(messageField){
      messageField.placeholder = isFullTime
        ? 'Role, team, stack, start date…'
        : 'Application, issue or idea…';
    }
  };
  const setProjectType = (value) => {
    if(!projectType || !value) return;
    const option = [...projectType.options].find(opt => opt.value === value);
    if(option) projectType.value = value;
    syncContactForm();
  };
  $$('[data-contact-type]').forEach(cta => cta.addEventListener('click', () => {
    setProjectType(cta.dataset.contactType);
  }));
  const params = new URLSearchParams(window.location.search);
  const contactType = params.get('type');
  if(contactTypeMap[contactType]) setProjectType(contactTypeMap[contactType]);
  if(projectType){
    projectType.addEventListener('change', syncContactForm);
    syncContactForm();
  }
  if(formStatus && params.get('sent') === '1'){
    formStatus.hidden = false;
  }

  /* ──────────────────────────── Reveal animations (IO fallback) ──────────────────────────── */
  const supportsViewTimeline = CSS.supports('animation-timeline','view()');

  if(!reduce && !supportsViewTimeline){
    const forceShow = el => {
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    // Hero is visible without JS; only below-the-fold blocks fade in.

    // Section reveals
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        forceShow(e.target);
        revealObs.unobserve(e.target);
      });
    }, {threshold:.1});
    $$('.reveal').forEach(el => revealObs.observe(el));

    const revealItemObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        const i = Number(e.target.dataset.revealIndex || 0);
        e.target.style.transition = `opacity .65s ${(i%4)*0.07}s ease, transform .65s ${(i%4)*0.07}s ease`;
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        revealItemObs.unobserve(e.target);
      });
    }, {threshold:.08});
    $$('.reveal-item').forEach((el,i) => {
      el.dataset.revealIndex = String(i);
      revealItemObs.observe(el);
    });

    // Safety fallback
    setTimeout(() => {
      $$('.reveal,.reveal-item,.hero-anim').forEach(el => {
        if(getComputedStyle(el).opacity === '0') forceShow(el);
      });
    }, 2000);
  } else if(reduce){
    $$('.reveal,.reveal-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ──────────────────────────── Counter animation ──────────────────────────── */
  const credCounters = $$('.cred-item[data-count]');
  if(credCounters.length){
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        const el = e.target;
        const strong = el.querySelector('strong');
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if(reduce || !strong){
          if(strong) strong.textContent = target + suffix;
          counterObs.unobserve(el);
          return;
        }
        let current = 0;
        const duration = 1200;
        const fps = 60;
        const totalSteps = Math.round(duration / (1000 / fps));
        const step = target / totalSteps;
        const interval = setInterval(() => {
          current += step;
          if(current >= target){
            strong.textContent = target + suffix;
            clearInterval(interval);
          } else {
            strong.textContent = Math.floor(current) + suffix;
          }
        }, 1000 / fps);
        counterObs.unobserve(el);
      });
    }, {threshold: 0.5});
    credCounters.forEach(c => counterObs.observe(c));
  }

  /* ──────────────────────────── Timeline fill ──────────────────────────── */
  const timeline = $('#timeline');
  const timelineFill = $('#timelineFill');
  if(timeline && timelineFill && !reduce){
    const items = $$('.t-item', timeline);
    const tlObs = () => {
      const rect = timeline.getBoundingClientRect();
      const winH = window.innerHeight;
      const focusY = winH * 0.45;
      let fillPx = 0;
      items.forEach((item, i) => {
        const ir = item.getBoundingClientRect();
        const nodeY = ir.top + 14; /* align to node center */
        if(nodeY <= focusY){
          const next = items[i + 1];
          if(next){
            const nr = next.getBoundingClientRect();
            const nextNodeY = nr.top + 14;
            const span = nextNodeY - nodeY;
            const progress = Math.max(0, Math.min(1, (focusY - nodeY) / Math.max(span, 1)));
            fillPx = (nodeY - rect.top - 10) + span * progress;
          } else {
            fillPx = rect.height - 20;
          }
        }
      });
      if(items.length && items[0].getBoundingClientRect().top + 14 > focusY){
        fillPx = 0;
      }
      timelineFill.style.height = Math.max(0, Math.min(rect.height - 20, fillPx)) + 'px';
    };
    window.addEventListener('scroll', tlObs, {passive:true});
    window.addEventListener('resize', tlObs, {passive:true});
    tlObs();
  }

})();