const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'PÁGINA DE VENDAS');

function syncFile(filename) {
  const source = path.join(sourceDir, filename);
  const target = path.join(root, filename);
  const content = fs.readFileSync(source, 'utf8').replace(/\.\.\/IMAGENS\//g, 'IMAGENS/');
  fs.writeFileSync(target, content, 'utf8');
  console.log(`Synced ${filename}`);
}

syncFile('index.html');
syncFile('style.css');
console.log('Deploy files ready.');
