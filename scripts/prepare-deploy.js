const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'PÁGINA DE VENDAS');
const outputDir = path.join(root, 'public');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function syncFile(filename) {
  const source = path.join(sourceDir, filename);
  const target = path.join(outputDir, filename);
  const content = fs.readFileSync(source, 'utf8').replace(/\.\.\/IMAGENS\//g, '/IMAGENS/');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
  console.log(`Synced ${filename}`);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

syncFile('index.html');
syncFile('style.css');

const imagesSource = path.join(root, 'IMAGENS');
const imagesTarget = path.join(outputDir, 'IMAGENS');
copyDir(imagesSource, imagesTarget);
console.log('Copied IMAGENS/');

console.log('Deploy files ready in public/.');
