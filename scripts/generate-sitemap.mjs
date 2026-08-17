import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://jaykaneriya.github.io';
const SKIP = new Set(['404.html']);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'scripts' || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function locFor(file) {
  const rel = relative(ROOT, file).split('\\').join('/');
  if (SKIP.has(rel) || /^google[0-9a-f]+\.html$/i.test(rel.split('/').pop())) return null;
  if (rel === 'index.html') return `${ORIGIN}/`;
  return `${ORIGIN}/${posix.normalize(rel)}`;
}

const urls = walk(ROOT)
  .map((file) => {
    const loc = locFor(file);
    if (!loc) return null;
    const lastmod = statSync(file).mtime.toISOString().slice(0, 10);
    const priority = loc === `${ORIGIN}/` ? '1.0' : loc.includes('/case-studies/') ? '0.8' : '0.7';
    return { loc, lastmod, priority };
  })
  .filter(Boolean)
  .sort((a, b) => (a.priority === b.priority ? a.loc.localeCompare(b.loc) : Number(b.priority) - Number(a.priority)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.loc === `${ORIGIN}/` ? 'weekly' : 'monthly'}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`Wrote sitemap.xml with ${urls.length} HTML pages`);
urls.forEach((u) => console.log(` - ${u.loc}`));
