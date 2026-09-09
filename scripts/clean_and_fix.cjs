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

// 1. Clean out all .scss files from the project
const scssFiles = findFiles(srcDir, f => f.endsWith('.scss'));
scssFiles.forEach(f => {
  fs.unlinkSync(f);
  console.log('Removed SCSS:', path.relative(srcDir, f));
});

// Also remove any in src/styles/
const stylesScss = findFiles(path.join(srcDir, 'styles'), f => f.endsWith('.scss'));
stylesScss.forEach(f => fs.unlinkSync(f));

// Ensure clean CSS in src/styles/
const stylesDir = path.join(srcDir, 'styles');
if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });
fs.writeFileSync(path.join(stylesDir, 'variables.css'), ':root {\n  --primary: #6366f1;\n  --bg-dark: #0b0f19;\n  --text-light: #f8fafc;\n}\n');
fs.writeFileSync(path.join(stylesDir, 'globals.css'), '/* Global CSS */\nbody {\n  margin: 0;\n  background: #0b0f19;\n  color: #f8fafc;\n}\n');
fs.writeFileSync(path.join(stylesDir, 'typography.css'), '/* Typography CSS */\n');

fs.writeFileSync(path.join(srcDir, 'index.css'), `@tailwind base;
@tailwind components;
@tailwind utilities;

@import './styles/variables.css';
@import './styles/globals.css';
@import './styles/typography.css';
`);

// 2. Fix all code files
const codeFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx'));

codeFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  let original = code;

  // Remove .scss imports
  code = code.replace(/import\s+['"][^'"]+\.scss['"];?\n?/g, '');

  // Registry imports
  code = code.replace(/from\s+['"](?:\.\.\/)+registry\/cards(?:\/index)?['"]/g, "from '@/codeRegistry/cardsRegistry'");
  code = code.replace(/from\s+['"](?:\.\.\/)+registry\/forms(?:\/index)?['"]/g, "from '@/codeRegistry/formsRegistry'");
  code = code.replace(/from\s+['"](?:\.\.\/)+registry\/form-compositions(?:\/index)?['"]/g, "from '@/codeRegistry/formCompositionsRegistry'");
  code = code.replace(/from\s+['"](?:\.\.\/)+registry(?:\/index)?['"]/g, "from '@/codeRegistry/codeRegistry'");
  code = code.replace(/from\s+['"]@\/codeRegistry\/index['"]/g, "from '@/codeRegistry/codeRegistry'");

  // Lib imports
  code = code.replace(/from\s+['"](?:\.\.\/)+lib\/installContract['"]/g, "from '@/utils/installContract'");
  code = code.replace(/from\s+['"](?:\.\.\/)+lib\/fieldAdapter['"]/g, "from '@/pages/Forms/utils/fieldAdapter'");
  code = code.replace(/from\s+['"](?:\.\.\/)+lib\/db['"]/g, "from '@/services/db'");

  // Atom cards to module cards
  code = code.replace(/['"](?:\.\.\/)+components\/atoms\/cards\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/Cards/components/$1/$1'");
  code = code.replace(/['"]@\/components\/atoms\/cards\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/Cards/components/$1/$1'");

  // Atom forms to module forms
  code = code.replace(/['"](?:\.\.\/)+components\/atoms\/forms\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/Forms/components/$1/$1'");
  code = code.replace(/['"]@\/components\/atoms\/forms\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/Forms/components/$1/$1'");

  // Atom notifications to module notifications
  code = code.replace(/['"](?:\.\.\/)+components\/atoms\/notifications\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/Notifications/components/$1/$1'");
  code = code.replace(/['"]@\/components\/atoms\/notifications\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/Notifications/components/$1/$1'");

  // Atom data-display to module data-display
  code = code.replace(/['"](?:\.\.\/)+components\/atoms\/data-display\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/DataDisplay/components/$1/$1'");
  code = code.replace(/['"]@\/components\/atoms\/data-display\/([A-Za-z0-9_-]+)['"]/g, "'@/pages/DataDisplay/components/$1/$1'");

  // Organisms AddToProjectModal
  code = code.replace(/['"](?:\.\.\/)+components\/organisms\/AddToProjectModal(?:\.css)?['"]/g, "'@/components/common/AddToProjectModal/AddToProjectModal'");

  // Remove CSS imports that don't exist
  code = code.replace(/import\s+['"]\.\/FormDetails\.css['"];?\n?/g, '');
  code = code.replace(/import\s+['"]\.\/FormCompositionsPage\.css['"];?\n?/g, '');
  code = code.replace(/import\s+['"]\.\/FormCompositionDetails\.css['"];?\n?/g, '');

  if (code !== original) {
    fs.writeFileSync(file, code);
  }
});

console.log('✔ All files cleaned and SCSS removed.');
