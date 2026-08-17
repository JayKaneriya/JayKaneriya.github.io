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
        : 'Product, problem, stack, goals…';
    }
  };
  $$('[data-contact-type]').forEach(cta => cta.addEventListener('click', () => {
    if(projectType){
      projectType.value = cta.dataset.contactType;
      syncContactForm();
    }
  }));
  const contactType = new URLSearchParams(window.location.search).get('type');
  const contactTypeMap = {
    fulltime: 'Full-time remote role',
    retainer: 'Contract / retainer',
    project: 'Fixed-scope project'
  };
  if(projectType && contactTypeMap[contactType]){
    projectType.value = contactTypeMap[contactType];
  }
  if(projectType){
    projectType.addEventListener('change', syncContactForm);
    syncContactForm();
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

  /* ──────────────────────────── Typing effect ──────────────────────────── */
  if(!reduce){
    const phrases = [
      'production-grade Laravel systems',
      'scalable Vue.js interfaces',
      'robust REST APIs',
      'real-time SaaS platforms',
      'systems recruiters can trust'
    ];
    const typedEl = $('#typedText');
    if(typedEl){
      let pIdx = 0, cIdx = 0, deleting = false;
      const type = () => {
        const current = phrases[pIdx];
        if(!deleting){
          typedEl.textContent = current.substring(0, cIdx + 1);
          cIdx++;
          if(cIdx === current.length){
            deleting = true;
            setTimeout(type, 2200);
            return;
          }
          setTimeout(type, 60);
        } else {
          typedEl.textContent = current.substring(0, cIdx - 1);
          cIdx--;
          if(cIdx === 0){
            deleting = false;
            pIdx = (pIdx + 1) % phrases.length;
            setTimeout(type, 400);
            return;
          }
          setTimeout(type, 30);
        }
      };
      setTimeout(type, 1800);
    }
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

  /* ──────────────────────────── Glow card (mouse follow) ──────────────────────────── */
  $$('.glow-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });

  /* ──────────────────────────── Magnetic buttons ──────────────────────────── */
  if(!reduce){
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width/2);
        const dy = e.clientY - (rect.top + rect.height/2);
        btn.style.transform = `translate(${dx*0.15}px, ${dy*0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ──────────────────────────── Particle constellation ──────────────────────────── */
  if(!reduce && window.innerWidth >= 768 && !window.matchMedia('(pointer: coarse)').matches){
    const canvas = $('#particles');
    if(canvas){
      const ctx = canvas.getContext('2d', {alpha:true});
      let w, h, particles = [], running = false, raf = 0;
      const count = 28;
      const maxDist = 110;

      const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize, {passive:true});

      for(let i = 0; i < count; i++){
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.4
        });
      }

      const draw = () => {
        if(!running) return;
        ctx.clearRect(0, 0, w, h);
        for(let i = 0; i < particles.length; i++){
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if(p.x < 0) p.x = w;
          if(p.x > w) p.x = 0;
          if(p.y < 0) p.y = h;
          if(p.y > h) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(139,92,246,.35)';
          ctx.fill();

          for(let j = i + 1; j < particles.length; j++){
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < maxDist){
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(59,130,246,${0.12 * (1 - dist/maxDist)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
        raf = requestAnimationFrame(draw);
      };

      const start = () => {
        if(running) return;
        running = true;
        raf = requestAnimationFrame(draw);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      document.addEventListener('visibilitychange', () => {
        if(document.hidden) stop();
        else start();
      });
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 400));
      idle(start);
    }
  }

})();