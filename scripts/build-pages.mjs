import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const icons = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="i-code" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
  <symbol id="i-server" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></symbol>
  <symbol id="i-layout" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></symbol>
  <symbol id="i-zap" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>
  <symbol id="i-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
  <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>
  <symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></symbol>
  <symbol id="i-github" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></symbol>
  <symbol id="i-db" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></symbol>
  <symbol id="i-api" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></symbol>
  <symbol id="i-terminal" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></symbol>
  <symbol id="i-smartphone" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></symbol>
  <symbol id="i-cap" viewBox="0 0 24 24"><path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z"/><path d="M6.5 10.7V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-5.3"/><path d="M21.5 8.5V14"/></symbol>
  <symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></symbol>
  <symbol id="i-chevup" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
  <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.44zM12.06 21.75h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.65-.24-.37a9.83 9.83 0 0 1-1.5-5.23c0-5.43 4.42-9.85 9.86-9.85a9.8 9.8 0 0 1 6.97 2.89 9.8 9.8 0 0 1 2.88 6.97c0 5.43-4.42 9.84-9.84 9.84zm5.4-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.06 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/></symbol>
  <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13l-5.6-2 5.6-2 1.9-5.5Z"/><path d="M18.5 3.5v3M20 5h-3"/></symbol>
</svg>`;

function head({ title, description, canonical }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="author" content="Jay Kaneriya">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#08090c">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Jay Kaneriya">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="https://jaykaneriya.github.io/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="https://jaykaneriya.github.io/og-image.jpg">
<link rel="manifest" href="site.webmanifest">
<link rel="icon" type="image/svg+xml" href="logo.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"></noscript>
<link rel="stylesheet" href="assets/css/site.css">
<noscript><style>.reveal,.reveal-item,.hero-anim{opacity:1!important;transform:none!important}.scroll-progress,.particles-canvas{display:none!important}</style></noscript>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${icons}
<div class="backdrop" aria-hidden="true"></div>
<canvas class="particles-canvas" id="particles" aria-hidden="true"></canvas>
`;
}

const nav = `<header class="nav" id="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html">
      <span class="brand-mark" aria-hidden="true">JK</span>
      <span class="brand-name">Jay Kaneriya <span>· dev</span></span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Primary">
      <a href="index.html" data-nav>Home</a>
      <a href="about.html" data-nav>About</a>
      <a href="skills.html" data-nav>Skills</a>
      <a href="projects.html" data-nav>Projects</a>
      <a href="services.html" data-nav>Services</a>
      <a href="contact.html" data-nav class="nav-hire">Hire Me</a>
    </nav>
    <div class="nav-actions">
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
        <svg class="icon"><use id="menuIcon" href="#i-menu"></use></svg>
      </button>
    </div>
    <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
  </div>
</header>`;

const footer = `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <div>
        <p class="footer-brand">Jay Kaneriya</p>
        <p class="footer-role">Senior Full-Stack Laravel/PHP Developer</p>
        <p class="footer-desc">9+ years shipping production SaaS, education and business systems — remote-first from Rajkot, India.</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="skills.html">Skills</a>
          <a href="projects.html">Projects</a>
          <a href="services.html">Services</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <div class="footer-links">
          <a href="https://github.com/JayKaneriya" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/jaykaneriya/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://www.upwork.com/freelancers/~01b77240d87af81e14" target="_blank" rel="noopener">Upwork</a>
          <a href="https://www.fiverr.com/s/bk9dkYa" target="_blank" rel="noopener">Fiverr</a>
          <a href="mailto:jay.kaneriya8@gmail.com">Email</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="footerYear">2026</span> Jay Kaneriya · Rajkot, India</p>
      <div class="footer-social"><a href="contact.html">Available now</a></div>
    </div>
  </div>
</footer>
<button class="to-top" id="toTop" aria-label="Scroll to top"><svg class="icon"><use href="#i-chevup"></use></svg></button>
<script src="assets/js/site.js" defer></script>
</body>
</html>`;

function serviceCard(title, solves, included, forWho) {
  return `<article class="service-card reveal-item">
    <h3>${title}</h3>
    <h4>What it solves</h4>
    <p>${solves}</p>
    <h4>What's included</h4>
    <ul>${included.map((i) => `<li>${i}</li>`).join('')}</ul>
    <h4>Who it's for</h4>
    <p>${forWho}</p>
    <a class="work-link" href="contact.html">Start a project <svg class="icon"><use href="#i-arrow"></use></svg></a>
  </article>`;
}

const about =
  head({
    title: 'About Jay Kaneriya | Experience',
    description:
      'About Jay Kaneriya — Senior Full-Stack Laravel/PHP Developer with production experience at Paperly (Australia) and Logistic Infotech. Full-stack ownership from architecture to maintenance.',
    canonical: 'https://jaykaneriya.github.io/about.html',
  }) +
  nav +
  `
<main id="main">
<section class="page-hero">
  <div class="wrap reveal">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>About</span></nav>
    <p class="kicker">About Jay</p>
    <h1 class="section-title">I own the whole <em>product problem.</em></h1>
    <p class="section-lead">Senior full-stack developer specializing in Laravel/PHP — with production experience shipping SaaS and business systems end to end, including international remote delivery.</p>
  </div>
</section>

<section class="summary">
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Professional summary</p>
      <h2 class="section-title">Production engineer, not just a <em>coder.</em></h2>
      <p class="section-lead">I take ownership from requirements through architecture, database design, backend, APIs, frontend, integrations, testing, deployment and maintenance.</p>
      <div class="ownership" aria-label="Engineering ownership chain">
        <span>Requirements</span><i>→</i>
        <span>Architecture</span><i>→</i>
        <span>Database</span><i>→</i>
        <span>Backend</span><i>→</i>
        <span>APIs</span><i>→</i>
        <span>Frontend</span><i>→</i>
        <span>Integrations</span><i>→</i>
        <span>Testing</span><i>→</i>
        <span>Deployment</span><i>→</i>
        <span>Maintenance</span>
      </div>
    </div>
  </div>
</section>

<section class="journey">
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Professional experience</p>
      <h2 class="section-title">Career built on <em>ownership.</em></h2>
    </div>
    <div class="timeline" id="timeline">
      <div class="timeline-fill" id="timelineFill"></div>

      <article class="t-item reveal-item is-current">
        <div class="t-meta">
          <time datetime="2022-07">Jul 2022 — Aug 2026</time>
          <span class="t-loc">Perth, AU · Remote</span>
        </div>
        <div class="t-card">
          <h3 class="t-title">Senior Web Application Developer</h3>
          <p class="t-co">@ <strong>Paperly</strong> · Education SaaS</p>
          <h4 class="t-heading">What I Owned</h4>
          <ul class="t-list">
            <li>End-to-end feature ownership on a live multi-school Laravel + Vue.js platform.</li>
            <li>Permissions and role boundaries across administrators, staff, parents and students.</li>
            <li>REST APIs, MySQL schemas and third-party SIS/LMS integration work in Agile releases.</li>
            <li>Production debugging, testing and continuous delivery for a platform used every school day.</li>
          </ul>
          <h4 class="t-heading">What I Built</h4>
          <ul class="t-list">
            <li>School administration modules used daily by thousands of teachers and parents.</li>
            <li>Excursion, sports, music, parent-teacher interview and assessment calendar features.</li>
            <li>Dynamic form builders, workflow automation, multi-school integrations and geolocation-enabled activity flows.</li>
          </ul>
          <h4 class="t-heading">Impact</h4>
          <ul class="t-list">
            <li>Four years of stable senior delivery on a live Australian education SaaS.</li>
            <li>Replaced manual, paper-based school operations with trackable digital workflows.</li>
            <li>Paperly publicly states that more than 250 schools joined for 2026 and beyond.</li>
          </ul>
          <div class="tags" style="margin-top:20px"><span>Laravel</span><span>Vue.js</span><span>MySQL</span><span>REST API</span><span>Workflows</span></div>
        </div>
      </article>

      <article class="t-item reveal-item">
        <div class="t-meta">
          <time datetime="2017-07">Jul 2017 — Jun 2022</time>
          <span class="t-loc">Rajkot, India</span>
        </div>
        <div class="t-card">
          <h3 class="t-title">Web Application Developer</h3>
          <p class="t-co">@ <strong>Logistic Infotech Pvt Ltd</strong></p>
          <h4 class="t-heading">What I Owned</h4>
          <ul class="t-list">
            <li>Full-stack delivery for international clients across eCommerce, SaaS, education, restaurant and booking domains.</li>
            <li>Client communication, mentoring juniors and Agile delivery leadership on project teams.</li>
          </ul>
          <h4 class="t-heading">What I Built</h4>
          <ul class="t-list">
            <li>Laravel backends with Vue.js and React.js frontends, including admin dashboards and RBAC.</li>
            <li>Stripe, PayPal, BPOINT and custom payment API integrations into production billing flows.</li>
            <li>Realtime features with Socket.io and Firebase.</li>
          </ul>
          <h4 class="t-heading">Impact</h4>
          <ul class="t-list">
            <li>Five years of production client delivery across multiple domains and regions.</li>
            <li>Shipped payment and realtime systems used in live commercial products.</li>
          </ul>
          <div class="tags" style="margin-top:20px"><span>Laravel</span><span>React</span><span>Vue.js</span><span>Payments</span><span>Realtime</span></div>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="education">
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Education</p>
      <h2 class="section-title">Foundations that still <em>ship.</em></h2>
    </div>
    <article class="edu-card reveal-item">
      <div class="edu-icon"><svg class="icon"><use href="#i-cap"></use></svg></div>
      <div>
        <h3>Bachelor of Engineering — Computer Science &amp; Engineering</h3>
        <p class="where">Gujarat Technological University · Shri Labhubhai Trivedi Institute of Engineering and Technology, Rajkot</p>
        <p class="when">July 2013 – May 2017</p>
      </div>
    </article>
  </div>
</section>

<section class="final-cta">
  <div class="wrap reveal">
    <h2>Looking for an engineer who owns the whole problem?</h2>
    <p>Let's discuss your role or project.</p>
    <div class="hero-actions">
      <a class="btn btn-fill" href="contact.html">Start a conversation</a>
      <a class="btn btn-ghost" href="projects.html">View projects</a>
    </div>
  </div>
</section>
</main>
` +
  footer;

const skills =
  head({
    title: 'Laravel, PHP, Vue, React & Full-Stack Development | Jay Kaneriya',
    description:
      'Technical skills of Jay Kaneriya — Laravel and PHP as primary stack, plus Vue.js, React, MySQL, REST APIs, payments, React Native and production delivery tooling.',
    canonical: 'https://jaykaneriya.github.io/skills.html',
  }) +
  nav +
  `
<main id="main">
<section class="page-hero">
  <div class="wrap reveal">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>Skills</span></nav>
    <p class="kicker">Skills</p>
    <h1 class="section-title">Laravel/PHP first. <em>Full-stack where it counts.</em></h1>
    <p class="section-lead">Organized by how I actually work — not a long list of every tool I've touched.</p>
  </div>
</section>

<section class="expertise">
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Primary stack</p>
      <h2 class="section-title">Daily production <em>core.</em></h2>
      <p class="skill-note"><strong>Highlighted</strong> = primary specialization</p>
    </div>
    <div class="skill-tiers reveal-item">
      <div class="skill-tier"><h3>Core — daily use</h3><p>Laravel · PHP 8+ · MySQL · REST APIs</p></div>
      <div class="skill-tier"><h3>Proficient</h3><p>Vue.js · React · TypeScript</p></div>
      <div class="skill-tier"><h3>Familiar</h3><p>React Native · GraphQL · Redux</p></div>
    </div>
    <div class="skill-grid">
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-server"></use></svg> Primary Stack</h3>
        <div class="skill-chips">
          <span class="primary">Laravel</span><span class="primary">PHP</span><span class="primary">MySQL</span><span class="primary">Vue.js</span><span class="primary">React</span>
        </div>
      </article>
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-api"></use></svg> Backend &amp; API</h3>
        <div class="skill-chips">
          <span class="primary">Laravel</span><span>REST APIs</span><span>Authentication</span><span>Authorization</span><span>Webhooks</span><span>Queues</span><span>Redis</span><span>Database architecture</span><span>JWT</span><span>OAuth</span><span>Multi-tenant</span>
        </div>
      </article>
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-layout"></use></svg> Frontend</h3>
        <div class="skill-chips">
          <span class="primary">Vue.js</span><span class="primary">React</span><span>JavaScript</span><span>TypeScript</span><span>Bootstrap</span><span>Tailwind CSS</span><span>Vuex</span><span>Redux</span><span>Sass</span>
        </div>
      </article>
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-smartphone"></use></svg> Mobile</h3>
        <div class="skill-chips">
          <span>React Native</span><span>Firebase</span><span>Mobile API integration</span><span>iOS</span><span>Android</span><span>Expo</span>
        </div>
      </article>
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-zap"></use></svg> Integrations</h3>
        <div class="skill-chips">
          <span>Payment gateways</span><span>Stripe</span><span>PayPal</span><span>BPOINT</span><span>Payfort</span><span>Third-party APIs</span><span>Webhooks</span><span>Geolocation</span><span>Realtime systems</span><span>Socket.io</span><span>Twilio</span>
        </div>
      </article>
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-terminal"></use></svg> DevOps / Delivery</h3>
        <div class="skill-chips">
          <span>Git</span><span>GitHub</span><span>GitHub Actions</span><span>Linux</span><span>Deployment</span><span>CI/CD</span><span>Production maintenance</span><span>AWS</span><span>Postman</span><span>JIRA</span><span>cPanel</span>
        </div>
      </article>
      <article class="skill-group reveal-item">
        <h3><svg class="icon"><use href="#i-briefcase"></use></svg> Practices</h3>
        <div class="skill-chips">
          <span>Agile</span><span>Mentoring</span><span>Code reviews</span><span>Sprint planning</span><span>Client communication</span>
        </div>
      </article>
      <article class="skill-group reveal-item ai-group">
        <h3><svg class="icon"><use href="#i-spark"></use></svg> AI-Assisted Development</h3>
        <div class="skill-chips">
          <span class="ai">Cursor</span><span class="ai">Claude</span><span class="ai">ChatGPT</span><span class="ai">AI Code Review</span><span class="ai">Prompt Engineering</span>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="final-cta">
  <div class="wrap reveal">
    <h2>Need Laravel expertise on a live product?</h2>
    <p>Let's talk about your stack and timeline.</p>
    <div class="hero-actions">
      <a class="btn btn-fill" href="contact.html">Hire Me</a>
      <a class="btn btn-ghost" href="services.html">View services</a>
    </div>
  </div>
</section>
</main>
` +
  footer;

const projects =
  head({
    title: 'Laravel SaaS & Full-Stack Projects | Jay Kaneriya',
    description:
      'Selected Laravel and full-stack projects by Jay Kaneriya — Paperly, Megathy and Zimdle production work, plus independent Exception Tracker and Resident App case studies.',
    canonical: 'https://jaykaneriya.github.io/projects.html',
  }) +
  nav +
  `
<main id="main">
<section class="page-hero">
  <div class="wrap reveal">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>Projects</span></nav>
    <p class="kicker">Projects</p>
    <h1 class="section-title">Production systems and <em>selected builds.</em></h1>
    <p class="section-lead">Professional production work is listed first. Independent projects are labeled clearly and do not claim the same production scale.</p>
  </div>
</section>

<section class="work">
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Featured production work</p>
      <h2 class="section-title">01–03 · Shipped for <em>real organisations.</em></h2>
    </div>

    <article class="flagship reveal">
      <div class="flag-top">
        <div>
          <span class="proj-badge prod">Production</span>
          <p class="flag-label">01 · Flagship</p>
          <h3>Paperly</h3>
          <p class="flag-meta"><strong>Senior Web Application Developer</strong> · EdTech · Australia · 2022–2026</p>
          <p class="flag-lead">K-12 school operations platform — excursions, forms, workflows, permissions and calendars used daily by teachers and parents.</p>
          <div class="tags" style="margin-top:18px"><span>Laravel</span><span>Vue.js</span><span>MySQL</span><span>REST API</span></div>
          <a class="work-link" href="case-studies/paperly.html">View case study <svg class="icon"><use href="#i-arrow"></use></svg></a>
        </div>
        <div class="flag-media"><img src="projects/paperly.jpg" alt="Paperly school operations dashboard" width="800" height="500" loading="lazy"></div>
      </div>
    </article>

    <div class="work-list" style="margin-bottom:60px">
      <article class="work-card reveal-item glow-card">
        <span class="proj-badge prod">Production</span>
        <div class="media"><img src="projects/megathy.jpg" alt="Megathy delivery operations" width="640" height="400" loading="lazy"></div>
        <h3>02 · Megathy</h3>
        <p class="meta">Full-stack · Multi-vendor grocery &amp; food · Saudi Arabia</p>
        <p>Laravel APIs and Vue admin powering grocery and restaurant orders, ops roles, Payfort payments and companion mobile apps.</p>
        <div class="tags"><span>Laravel</span><span>Vue.js</span><span>Payfort</span><span>FCM</span></div>
        <a class="work-link" href="case-studies/megathy.html">View case study <svg class="icon"><use href="#i-arrow"></use></svg></a>
      </article>
      <article class="work-card reveal-item glow-card">
        <span class="proj-badge prod">Production</span>
        <div class="media"><img src="projects/zimdle.jpg" alt="Zimdle feedback SaaS" width="640" height="400" loading="lazy"></div>
        <h3>03 · Zimdle</h3>
        <p class="meta">Full-stack · Customer feedback SaaS</p>
        <p>Private feedback, AJAX charts, Stripe subscription plans, PDF reports and Twilio alerts for business owners.</p>
        <div class="tags"><span>Laravel</span><span>Stripe</span><span>Analytics</span></div>
        <a class="work-link" href="case-studies/zimdle.html">View case study <svg class="icon"><use href="#i-arrow"></use></svg></a>
      </article>
    </div>

    <div class="reveal">
      <p class="kicker">Independent / personal projects</p>
      <h2 class="section-title">04–05 · Product builds in <em>progress.</em></h2>
      <p class="section-lead">Personal SaaS experiments demonstrating architecture depth — not equivalent to multi-year client production systems.</p>
    </div>
    <div class="work-list">
      <article class="work-card reveal-item glow-card">
        <span class="proj-badge personal">Personal · In progress</span>
        <div class="media"><img src="projects/exception.jpg" alt="Exception Tracker dashboard" width="640" height="400" loading="lazy"></div>
        <h3>04 · Exception Tracker</h3>
        <p class="meta">Observability SaaS</p>
        <p>Ingest, group and triage production exceptions with SDKs, uptime monitors, session replay and Stripe billing.</p>
        <div class="tags"><span>Laravel</span><span>Horizon</span><span>Stripe</span></div>
        <a class="work-link" href="case-studies/exception-tracker.html">View case study <svg class="icon"><use href="#i-arrow"></use></svg></a>
      </article>
      <article class="work-card reveal-item glow-card">
        <span class="proj-badge personal">Personal · In progress</span>
        <div class="media"><img src="projects/resident.jpg" alt="Resident App society admin" width="640" height="400" loading="lazy"></div>
        <h3>05 · Resident App</h3>
        <p class="meta">Housing society SaaS</p>
        <p>Notices, maintenance, visitors and billing across admin web, resident web and Expo mobile — multi-tenant society ops.</p>
        <div class="tags"><span>Laravel</span><span>React</span><span>Expo</span></div>
        <a class="work-link" href="case-studies/resident-app.html">View case study <svg class="icon"><use href="#i-arrow"></use></svg></a>
      </article>
    </div>
  </div>
</section>

<section class="final-cta">
  <div class="wrap reveal">
    <h2>Want similar engineering on your product?</h2>
    <p>You bring the idea. I bring the engineering.</p>
    <div class="hero-actions">
      <a class="btn btn-fill" href="contact.html">Discuss a project</a>
    </div>
  </div>
</section>
</main>
` +
  footer;

const services =
  head({
    title: 'Laravel Development, APIs & Integrations | Jay Kaneriya',
    description:
      'Freelance Laravel development, API integrations, payment gateways, existing application development and full-stack engagement options from Jay Kaneriya.',
    canonical: 'https://jaykaneriya.github.io/services.html',
  }) +
  nav +
  `
<main id="main">
<section class="page-hero">
  <div class="wrap reveal">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>Services</span></nav>
    <p class="kicker">Services</p>
    <h1 class="section-title">Problems I can <em>own for you.</em></h1>
    <p class="section-lead">Professional engineering engagements — grounded in production Laravel, API and full-stack delivery.</p>
  </div>
</section>

<section class="summary">
  <div class="wrap">
    <div class="service-grid">
      ${serviceCard(
        'Laravel Development',
        'New or existing Laravel applications that need reliable architecture and feature delivery.',
        [
          'New Laravel applications',
          'Existing Laravel application development',
          'SaaS and business applications',
          'Module design and delivery',
        ],
        'Founders, product teams and agencies needing a Laravel specialist.'
      )}
      ${serviceCard(
        'API & Integration',
        'Systems that must talk to each other cleanly — auth, webhooks and third-party services.',
        [
          'REST API design and implementation',
          'Third-party API integrations',
          'Webhooks',
          'Authentication and authorization',
          'Database synchronization',
        ],
        'Teams connecting products, partners or internal tools.'
      )}
      ${serviceCard(
        'Payment Integration',
        'Billing flows that need correct transactions, callbacks and validation.',
        [
          'Payment gateway integration',
          'Transactions and callbacks',
          'Webhooks and validation',
          'Testing of payment flows',
          'Stripe, PayPal, BPOINT, Payfort experience',
        ],
        'SaaS, eCommerce and marketplace products collecting payments.'
      )}
      ${serviceCard(
        'Existing Application Development',
        'Live products that need features, fixes and modernization without a rewrite.',
        [
          'Bug fixing',
          'Feature development',
          'Performance optimization',
          'Legacy PHP/Laravel modernization',
          'Database improvements',
        ],
        'Teams maintaining production Laravel/PHP applications.'
      )}
      ${serviceCard(
        'Full-Stack Development',
        'End-to-end delivery across backend and client surfaces.',
        [
          'Laravel + Vue.js',
          'Laravel + React',
          'Laravel + React Native',
          'Admin dashboards and portals',
          'API-backed mobile clients',
        ],
        'Product owners who want one engineer across the stack.'
      )}
      ${serviceCard(
        'Project Engagement',
        'Clear commercial paths matched to how you want to work.',
        [
          'Fixed-scope project',
          'Monthly retainer',
          'Long-term development',
          'Full-time collaboration',
        ],
        'Startups, SMEs and remote product teams.'
      )}
    </div>
  </div>
</section>

<section class="final-cta">
  <div class="wrap reveal">
    <h2>You bring the idea. I bring the engineering.</h2>
    <p>Tell me about the product — I'll respond with a clear next step.</p>
    <div class="hero-actions">
      <a class="btn btn-fill" href="contact.html">Let's discuss your project</a>
    </div>
  </div>
</section>
</main>
` +
  footer;

const contact =
  head({
    title: 'Contact Jay Kaneriya | Start a Project',
    description:
      'Contact Jay Kaneriya to discuss a Laravel, full-stack or freelance engagement. Email, LinkedIn, GitHub, Upwork and Fiverr — available now.',
    canonical: 'https://jaykaneriya.github.io/contact.html',
  }) +
  nav +
  `
<main id="main">
<section class="contact" id="contact" style="padding-top:120px">
  <div class="wrap">
    <div class="reveal">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>Contact</span></nav>
      <p class="kicker">Contact</p>
      <div class="contact-layout">
        <div>
          <h2>Have a project in mind?</h2>
          <p class="contact-lead">You bring the idea. I bring the engineering. Tell me about the role or product — I'll respond with a clear next step.</p>
          <div class="contact-actions">
            <a class="btn btn-fill magnetic" href="mailto:jay.kaneriya8@gmail.com?subject=Project%20for%20Jay%20Kaneriya"><svg class="icon"><use href="#i-mail"></use></svg> Email me</a>
            <a class="btn btn-ghost" href="Jay_Kaneriya_CV_2026.pdf" download><svg class="icon"><use href="#i-download"></use></svg> Download CV</a>
            <a class="btn btn-ghost" href="cv.html">View online CV</a>
          </div>
          <div class="contact-alt">
            <a href="https://wa.me/918530078687?text=Hi%20Jay%2C%20I%27d%20like%20to%20discuss%20a%20role%20or%20project." target="_blank" rel="noopener"><svg class="icon icon-fill"><use href="#i-whatsapp"></use></svg> WhatsApp</a>
            <details>
              <summary>Applying through an ATS?</summary>
              <p class="contact-note">Use the <a href="Jay_Kaneriya_CV_AI.pdf" download>plain-format CV</a> — same content, optimized for automated parsing.</p>
            </details>
          </div>
          <div class="socials">
            <a href="https://www.linkedin.com/in/jaykaneriya/" target="_blank" rel="noopener"><svg class="icon icon-fill"><use href="#i-linkedin"></use></svg> LinkedIn</a>
            <a href="https://github.com/JayKaneriya" target="_blank" rel="noopener"><svg class="icon icon-fill"><use href="#i-github"></use></svg> GitHub</a>
            <a href="https://www.upwork.com/freelancers/~01b77240d87af81e14" target="_blank" rel="noopener">Upwork</a>
            <a href="https://www.fiverr.com/s/bk9dkYa" target="_blank" rel="noopener">Fiverr</a>
            <a href="mailto:jay.kaneriya8@gmail.com"><svg class="icon"><use href="#i-mail"></use></svg> jay.kaneriya8@gmail.com</a>
          </div>
        </div>
        <form class="hire-form" action="https://formsubmit.co/jay.kaneriya8@gmail.com" method="POST" id="contactForm">
          <input type="hidden" name="_subject" value="New inquiry — jaykaneriya.github.io">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_template" value="table">
          <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="form-row">
            <div>
              <label for="name">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" autocomplete="name">
            </div>
            <div>
              <label for="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" autocomplete="email">
            </div>
          </div>
          <label for="project-type">Project type</label>
          <select id="project-type" name="project_type" required>
            <option value="" disabled selected>Select</option>
            <option value="Full-time remote role">Full-time remote role</option>
            <option value="Contract / retainer">Contract / retainer</option>
            <option value="Fixed-scope project">Fixed-scope project</option>
            <option value="Existing application development">Existing application development</option>
            <option value="Something else">Something else</option>
          </select>
          <label for="message">Project description</label>
          <textarea id="message" name="message" required placeholder="Product, problem, stack, goals…"></textarea>
          <div class="form-row">
            <div>
              <label for="budget">Budget</label>
              <input id="budget" name="budget" type="text" placeholder="Optional range">
            </div>
            <div>
              <label for="timeline">Timeline</label>
              <input id="timeline" name="timeline" type="text" placeholder="e.g. 4–8 weeks">
            </div>
          </div>
          <button class="btn btn-fill" type="submit"><svg class="icon"><use href="#i-arrow"></use></svg> Send inquiry</button>
          <p class="hint">Sent securely to my inbox · I reply within 24 hours.</p>
        </form>
      </div>
    </div>
  </div>
</section>
</main>
` +
  footer;

for (const [name, html] of Object.entries({ about, skills, projects, services, contact })) {
  writeFileSync(join(root, `${name}.html`), html);
  console.log('Wrote', `${name}.html`);
}
