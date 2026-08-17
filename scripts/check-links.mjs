import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'scripts' || e.name === 'node_modules') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = walk(root);
const broken = [];
const hrefRe = /href="([^"]+)"/g;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  let m;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      href.startsWith('?')
    ) {
      continue;
    }
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = resolve(dirname(page), clean);
    if (!existsSync(target)) {
      broken.push({ page: page.replace(root, ''), href });
    }
  }
}

console.log('Pages checked:', pages.length);
console.log('Broken internal links:', broken.length);
broken.forEach((b) => console.log('-', b.page, '->', b.href));
