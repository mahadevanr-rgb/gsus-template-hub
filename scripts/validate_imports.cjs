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

const allFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.scss'));

let errors = [];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // find import lines
  const importRegex = /(?:import|from)\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Ignore packages
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      continue;
    }

    let resolvedPath = null;
    if (importPath.startsWith('@/')) {
      resolvedPath = path.join(srcDir, importPath.slice(2));
    } else {
      resolvedPath = path.resolve(path.dirname(file), importPath);
    }

    // Check extensions
    const candidates = [
      resolvedPath,
      `${resolvedPath}.jsx`,
      `${resolvedPath}.js`,
      `${resolvedPath}.scss`,
      `${resolvedPath}.css`
    ];

    const exists = candidates.some(c => fs.existsSync(c) && fs.statSync(c).isFile());
    if (!exists) {
      errors.push({
        file: path.relative(srcDir, file),
        importPath,
        resolvedPath: path.relative(srcDir, resolvedPath)
      });
    }
  }
});

console.log(`Validation complete. Found ${errors.length} unresolved imports.`);
errors.forEach(e => {
  console.log(`❌ In ${e.file}: Could not resolve "${e.importPath}" (tried ${e.resolvedPath})`);
});
