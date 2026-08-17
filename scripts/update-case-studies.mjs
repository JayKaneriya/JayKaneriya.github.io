import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const csDir = join(root, 'case-studies');

const icons = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="i-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>
  <symbol id="i-chevup" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
</svg>`;

const siteNav = `<header class="nav" id="nav">
  <div class="nav-inner">
    <a class="brand" href="../index.html">
      <span class="brand-mark" aria-hidden="true">JK</span>
      <span class="brand-name">Jay Kaneriya <span>· dev</span></span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Primary">
      <a href="../index.html" data-nav>Home</a>
      <a href="../about.html" data-nav>About</a>
      <a href="../skills.html" data-nav>Skills</a>
      <a href="../projects.html" data-nav>Projects</a>
      <a href="../services.html" data-nav>Services</a>
      <a href="../cv.html" data-nav>CV</a>
      <a href="../contact.html" data-nav class="nav-hire">Contact</a>
    </nav>
    <div class="nav-actions">
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
        <svg class="icon"><use id="menuIcon" href="#i-menu"></use></svg>
      </button>
    </div>
    <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
  </div>
</header>`;

const siteFooter = `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <div>
        <p class="footer-brand">Jay Kaneriya</p>
        <p class="footer-role">Senior Full-Stack Laravel/PHP Developer</p>
        <p class="footer-desc">9+ years shipping production SaaS, education and business systems — available for remote roles and freelance Laravel projects from Rajkot, India (IST).</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <div class="footer-links">
          <a href="../index.html">Home</a>
          <a href="../about.html">About</a>
          <a href="../skills.html">Skills</a>
          <a href="../projects.html">Projects</a>
          <a href="../services.html">Services</a>
          <a href="../cv.html">CV</a>
          <a href="../contact.html">Contact</a>
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
          <a href="../cv.html">CV</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="footerYear">2026</span> Jay Kaneriya · Rajkot, India</p>
      <div class="footer-social"><a href="../contact.html">Hire me for Laravel development</a></div>
    </div>
  </div>
</footer>
<button class="to-top" id="toTop" aria-label="Scroll to top"><svg class="icon"><use href="#i-chevup"></use></svg></button>
<script src="../assets/js/site.js" defer></script>`;

const outcomeReplacements = {
  'paperly.html': `<ul>
        <li>Four years of stable senior delivery on a live multi-school education SaaS.</li>
        <li>Modules used daily by thousands of teachers and parents across Australian schools.</li>
        <li>Paperly publicly states that more than 250 schools joined for 2026 and beyond.</li>
      </ul>`,
  'megathy.html': `<ul>
        <li>One Laravel core powering live grocery and restaurant ordering across multiple vendor stores.</li>
        <li>Companion iOS and Android apps live on the App Store and Play Store.</li>
        <li>Role-separated APIs covering customer, collector, dispatcher, driver and admin flows.</li>
      </ul>`,
  'zimdle.html': `<ul>
        <li>4 Stripe subscription lifecycle actions gated behind plan middleware.</li>
        <li>Private feedback routed to owners with trend charts, PDF reports and Twilio/email alerts.</li>
        <li>Structured private signal instead of relying only on public social reviews.</li>
      </ul>`,
  'exception-tracker.html': `<ul>
        <li>Implemented eight SDK / ingest surfaces in the current codebase.</li>
        <li>Full observability product surface spanning exceptions, traces, uptime and session replay.</li>
        <li>In progress — no production-adoption metrics claimed.</li>
      </ul>`,
  'resident-app.html': `<ul>
        <li>Three client surfaces shipped in the current codebase (admin web, resident web, Expo mobile).</li>
        <li>Multi-tenant society ops covering notices, maintenance, visitors and billing.</li>
        <li>In progress — no adoption metrics claimed.</li>
      </ul>`,
};

const headingMap = [
  [/01<\/span> Context/g, '01</span> Overview'],
  [/01<\/span> Problem/g, '02</span> The Problem'],
  [/02<\/span> Product visuals/g, '09</span> Screenshots'],
  [/03<\/span> Responsibility/g, '03</span> My Role'],
  [/03<\/span> Contribution/g, '03</span> My Role'],
  [/04<\/span> Challenges/g, '06</span> Engineering Challenges'],
  [/04<\/span> Engineering Challenges/g, '06</span> Engineering Challenges'],
  [/05<\/span> Solution/g, '04</span> What I Built'],
  [/05<\/span> Architecture/g, '07</span> Architecture'],
  [/06<\/span> Architecture/g, '07</span> Architecture'],
  [/06<\/span> Outcomes/g, '08</span> Business / Product Impact'],
  [/07<\/span> Outcomes/g, '08</span> Business / Product Impact'],
  [/07<\/span> Technology/g, '10</span> Technology'],
  [/08<\/span> Technology/g, '10</span> Technology'],
];

const files = [
  'paperly.html',
  'megathy.html',
  'zimdle.html',
  'exception-tracker.html',
  'resident-app.html',
];

for (const file of files) {
  let html = readFileSync(join(csDir, file), 'utf8');

  // Replace head assets to use shared CSS
  html = html.replace(
    /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]+" rel="stylesheet">\s*<style>[\s\S]*?<\/style>/,
    `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<link rel="stylesheet" href="../assets/css/site.css">
<style>
body{font-size:17px}
.cs-shell .section{padding:0;margin:36px 0}
.cs-shell .kicker{margin-bottom:12px}
</style>`
  );

  // Strip old footer and wrap body content
  html = html.replace(/<body>\s*/, `<body>
<a class="skip-link" href="#main">Skip to content</a>
${icons}
<div class="backdrop" aria-hidden="true"></div>
${siteNav}
<main id="main" class="cs-shell">
`);

  html = html.replace(
    /<nav class="cs-nav" aria-label="Case study">\s*<a class="back" href="\.\.\/index\.html">← Portfolio<\/a>/,
    `<nav class="breadcrumb" aria-label="Breadcrumb" style="margin-bottom:12px">
      <a href="../index.html">Home</a><span>/</span>
      <a href="../projects.html">Projects</a><span>/</span>
      <span>${file.replace('.html', '').replace(/-/g, ' ')}</span>
    </nav>
    <nav class="cs-nav" aria-label="Case study">
      <a class="back" href="../projects.html">← Back to projects</a>`
  );

  // Remove CONFIRM list items and replace outcome blocks where we have replacements
  html = html.replace(/<li>[^<]*\[CONFIRM:[^\]]+\][^<]*<\/li>\s*/g, '');

  if (outcomeReplacements[file]) {
    html = html.replace(
      /<section class="section" id="outcomes">[\s\S]*?<\/section>/,
      (block) => {
        // Keep intro paragraphs that don't contain CONFIRM, replace ul
        let updated = block.replace(/<ul>[\s\S]*?<\/ul>/, outcomeReplacements[file]);
        updated = updated.replace(/\[CONFIRM:[^\]]+\]/g, '');
        // Rename heading
        updated = updated.replace(/<span class="n">0[67]<\/span> Outcomes/, '<span class="n">08</span> Business / Product Impact');
        updated = updated.replace(/<span class="n">08<\/span> Business \/ Product Impact/, '<span class="n">08</span> Business / Product Impact');
        return updated;
      }
    );
  }

  for (const [re, rep] of headingMap) {
    html = html.replace(re, rep);
  }

  // CTA links
  html = html.replace(/href="\.\.\/index\.html#contact"/g, 'href="../contact.html"');
  html = html.replace(/href="\.\.\/index\.html"/g, 'href="../projects.html"');

  // Replace mini footer with site footer
  html = html.replace(
    /<footer>© 2026 Jay Kaneriya[^<]*<\/footer>\s*<\/div>\s*<\/body>\s*<\/html>/,
    `</div>
</main>
${siteFooter}
</body>
</html>`
  );

  writeFileSync(join(csDir, file), html);
  console.log('Updated', file);
}
