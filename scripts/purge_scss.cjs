const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = 'c:/Users/LENOVO/Downloads/gsus-template-hub-main';
const srcDir = path.join(root, 'src');

console.log('=== REMOVING ALL SCSS & CONVERTING TO CSS + TAILWIND ===');

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

// 1. Delete all .scss files across src/
const allScss = findFiles(srcDir, f => f.endsWith('.scss'));
console.log(`Found ${allScss.length} .scss files to convert/remove.`);

allScss.forEach(scssFile => {
  const cssFile = scssFile.replace(/\.scss$/, '.css');
  const base = path.basename(scssFile);

  // If it's a partial like _variables.scss, rename to variables.css
  let targetCss = cssFile;
  if (base.startsWith('_')) {
    targetCss = path.join(path.dirname(scssFile), base.slice(1).replace(/\.scss$/, '.css'));
  }

  const content = fs.readFileSync(scssFile, 'utf8');
  // Write as plain CSS if target doesn't exist or is empty
  if (!fs.existsSync(targetCss) || fs.readFileSync(targetCss, 'utf8').trim() === '') {
    fs.writeFileSync(targetCss, content);
  }
  fs.unlinkSync(scssFile);
});

// 2. Setup src/styles and src/index.css cleanly
const stylesDir = path.join(srcDir, 'styles');
if (!fs.existsSync(path.join(stylesDir, 'variables.css'))) {
  fs.writeFileSync(path.join(stylesDir, 'variables.css'), ':root {\n  --primary: #6366f1;\n  --bg-dark: #0f172a;\n  --text-light: #f8fafc;\n}\n');
}
if (!fs.existsSync(path.join(stylesDir, 'globals.css'))) {
  fs.writeFileSync(path.join(stylesDir, 'globals.css'), '/* Global Base Styles */\nbody {\n  margin: 0;\n  font-family: inherit;\n  background: #0b0f19;\n  color: #f8fafc;\n}\n');
}
if (!fs.existsSync(path.join(stylesDir, 'typography.css'))) {
  fs.writeFileSync(path.join(stylesDir, 'typography.css'), '/* Typography CSS */\n');
}

fs.writeFileSync(path.join(srcDir, 'index.css'), `@tailwind base;
@tailwind components;
@tailwind utilities;

@import './styles/variables.css';
@import './styles/globals.css';
@import './styles/typography.css';
`);

// 3. Update main.jsx to import index.css
const mainJsxPath = path.join(srcDir, 'main.jsx');
if (fs.existsSync(mainJsxPath)) {
  let mainJsx = fs.readFileSync(mainJsxPath, 'utf8');
  mainJsx = mainJsx.replace(/import\s+['"]\.\/index\.scss['"];?/g, "import './index.css';");
  fs.writeFileSync(mainJsxPath, mainJsx);
}

// 4. Update all JS/JSX files to replace .scss imports with .css imports
const allCodeFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx'));
allCodeFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content.replace(/import\s+['"](\.\/[a-zA-Z0-9_\-\/]+)\.scss['"];?/g, "import '$1.css';");
  updated = updated.replace(/@\/([a-zA-Z0-9_\-\/]+)\.scss/g, '@/$1.css');
  if (updated !== content) {
    fs.writeFileSync(file, updated);
  }
});

// 5. Ensure for every component file Foo.jsx there is Foo.css (and NO index.js)
allCodeFiles.forEach(file => {
  if (file.endsWith('.jsx')) {
    const dir = path.dirname(file);
    const base = path.basename(file, '.jsx');
    const cssPath = path.join(dir, `${base}.css`);
    if (!fs.existsSync(cssPath)) {
      fs.writeFileSync(cssPath, `/* ${base} styles */\n`);
    }
  }
});

console.log('✔ All SCSS purged. Using pure Tailwind CSS and standard CSS.');
