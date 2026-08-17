import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'case-studies');

for (const f of readdirSync(dir).filter((x) => x.endsWith('.html'))) {
  let h = readFileSync(join(dir, f), 'utf8');
  h = h.replace(
    '<a class="brand" href="../projects.html">',
    '<a class="brand" href="../index.html">'
  );
  h = h.replace(
    '<a href="../projects.html" data-nav>Home</a>',
    '<a href="../index.html" data-nav>Home</a>'
  );
  h = h.replace(
    '<a href="../projects.html">Home</a>',
    '<a href="../index.html">Home</a>'
  );
  h = h.replace(/class="btn fill"/g, 'class="btn btn-fill"');
  h = h.replace(/class="btn"/g, 'class="btn btn-ghost"');
  h = h.replace('<span>paperly</span>', '<span>Paperly</span>');
  h = h.replace('<span>megathy</span>', '<span>Megathy</span>');
  h = h.replace('<span>zimdle</span>', '<span>Zimdle</span>');
  h = h.replace('<span>exception-tracker</span>', '<span>Exception Tracker</span>');
  h = h.replace('<span>resident-app</span>', '<span>Resident App</span>');
  writeFileSync(join(dir, f), h);
  console.log('fixed', f);
}
