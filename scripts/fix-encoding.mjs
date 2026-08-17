import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  ...readdirSync(join(root, 'case-studies'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => join(root, 'case-studies', f)),
  join(root, 'index.html'),
  join(root, 'about.html'),
  join(root, 'skills.html'),
  join(root, 'projects.html'),
  join(root, 'services.html'),
  join(root, 'contact.html'),
];

for (const file of files) {
  let h = readFileSync(file, 'utf8');

  h = h.replace(/Jay Kaneriya <span>[^<]*dev<\/span>/g, 'Jay Kaneriya <span>· dev</span>');

  h = h.replace(
    /class="back" href="\.\.\/projects\.html">[^<]*Back to projects/g,
    'class="back" href="../projects.html">← Back to projects'
  );

  h = h.replace(/>[^<]{0,4}Zimdle<\/a>/g, (m) => (m.includes('Next') ? m : '>← Zimdle</a>'));
  h = h.replace(/>[^<]{0,4}Paperly<\/a>/g, (m) =>
    m.includes('Next') || m.includes('See') ? m : '>← Paperly</a>'
  );
  h = h.replace(/>[^<]{0,4}Megathy<\/a>/g, (m) => (m.includes('Next') ? m : '>← Megathy</a>'));
  h = h.replace(/>[^<]{0,4}Exception Tracker<\/a>/g, (m) =>
    m.includes('Next') ? m : '>← Exception Tracker</a>'
  );

  h = h.replace(/Next: Megathy[^<]*<\/a>/g, 'Next: Megathy →</a>');
  h = h.replace(/Next: Zimdle[^<]*<\/a>/g, 'Next: Zimdle →</a>');
  h = h.replace(/Next: Exception Tracker[^<]*<\/a>/g, 'Next: Exception Tracker →</a>');
  h = h.replace(/Next: Resident App[^<]*<\/a>/g, 'Next: Resident App →</a>');
  h = h.replace(/See Paperly case study[^<]*<\/a>/g, 'See Paperly case study →</a>');

  writeFileSync(file, h, 'utf8');
  console.log('fixed encoding', file.split(/[/\\]/).pop());
}
