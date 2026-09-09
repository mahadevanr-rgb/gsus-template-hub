const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function findFiles(dir, filter) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(fullPath, filter));
    } else if (!filter || filter(fullPath)) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix erroneous 'Car/Card/Card'
  content = content.replace(/@\/pages\/Cards\/components\/Car\/Card\/Card/g, '@/pages/Cards/components/Card/Card');
  content = content.replace(/@\/pages\/Cards\/components\/[A-Za-z0-9]+Car\/([A-Za-z0-9]+Card)\/\1/g, '@/pages/Cards/components/$1/$1');

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});

console.log('✔ Fixed Card imports across all files.');
