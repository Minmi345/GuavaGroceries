import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const docsDir = './docs';
const cssOverride = 'h4.name { color: #8b5cf6 !important; }';

const files = readdirSync(docsDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = join(docsDir, file);
  let content = readFileSync(filePath, 'utf-8');

  if (!content.includes('styles/override.css')) {
    const inject = `<link type="text/css" rel="stylesheet" href="styles/override.css">`;
    content = content.replace('</head>', `    ${inject}\n</head>`);
  }

  content = content.replaceAll('<h5>Returns:</h5>', '<h5>Status code:</h5>');
  writeFileSync(filePath, content);
}

writeFileSync(join(docsDir, 'styles/override.css'), cssOverride);
console.log('CSS override injected into', files.length, 'files');
