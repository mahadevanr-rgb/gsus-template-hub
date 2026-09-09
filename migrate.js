import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = __dirname;

console.log('=== TemplateHub Architecture Refactor (Node.js) ===');
console.log('Working in:', root);

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// -------------------------------------------------------------
// 1. UI BUTTONS
// -------------------------------------------------------------
console.log('[1/12] Migrating UI buttons...');
const buttonsSrcDir = path.join(root, 'src', 'components', 'atoms', 'buttons');
const buttonsDstDir = path.join(root, 'src', 'components', 'ui', 'buttons');

copyFile(path.join(buttonsSrcDir, 'buttons.css'), path.join(buttonsDstDir, 'buttons.css'));

const buttonNames = [
  'AnimatedButton', 'FloatingButton', 'GhostButton', 'GradientButton',
  'IconButton', 'OutlineButton', 'PrimaryButton', 'PulseButton',
  'SecondaryButton', 'ShadowButton'
];

for (const btn of buttonNames) {
  const btnFile = path.join(buttonsSrcDir, `${btn}.jsx`);
  if (fs.existsSync(btnFile)) {
    let content = readFile(btnFile);
    content = content.replace('"./buttons.css"', '"../buttons.css"');
    writeFile(path.join(buttonsDstDir, btn, `${btn}.jsx`), content);
    writeFile(path.join(buttonsDstDir, btn, 'index.js'), `export { default } from './${btn}';\n`);
  }
}

const buttonsBarrel = buttonNames.map(b => `export { default as ${b} } from './${b}';`).join('\n') + '\n';
writeFile(path.join(buttonsDstDir, 'index.js'), buttonsBarrel);

// -------------------------------------------------------------
// 2. UI CARDS
// -------------------------------------------------------------
console.log('[2/12] Migrating UI cards...');
const cardsSrcDir = path.join(root, 'src', 'components', 'atoms', 'cards');
const cardsDstDir = path.join(root, 'src', 'components', 'ui', 'cards');

// Base Card primitive
if (fs.existsSync(path.join(cardsSrcDir, 'Card.jsx'))) {
  const cardPrimitive = readFile(path.join(cardsSrcDir, 'Card.jsx'));
  writeFile(path.join(cardsDstDir, 'Card', 'Card.jsx'), cardPrimitive);
  writeFile(path.join(cardsDstDir, 'Card', 'index.js'),
    `export { default, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';\n`);
}

const cardMap = [
  { src: 'ProfileCard', cat: 'profile' },
  { src: 'TeamCard', cat: 'profile' },
  { src: 'ProductCard', cat: 'profile' },
  { src: 'PhotoProfileCard', cat: 'profile' },
  { src: 'StatCard', cat: 'stats' },
  { src: 'KpiCard', cat: 'stats' },
  { src: 'MetricCard', cat: 'stats' },
  { src: 'ProgressCard', cat: 'stats' },
  { src: 'PricingCard', cat: 'pricing' },
  { src: 'ComparisonCard', cat: 'pricing' },
  { src: 'SubscriptionCard', cat: 'pricing' },
  { src: 'NotificationCard', cat: 'notifications' },
  { src: 'AlertCard', cat: 'notifications' },
  { src: 'StatusCard', cat: 'notifications' },
  { src: 'EventCard', cat: 'events' },
  { src: 'BookingCard', cat: 'events' },
  { src: 'AppointmentCard', cat: 'events' },
  { src: 'TaskCard', cat: 'tasks' },
  { src: 'KanbanCard', cat: 'tasks' },
  { src: 'ProjectCard', cat: 'tasks' },
  { src: 'TestimonialCard', cat: 'content' },
  { src: 'FeatureCard', cat: 'content' },
  { src: 'RecommendationCard', cat: 'content' },
  { src: 'InvoiceCard', cat: 'finance' },
  { src: 'TransactionCard', cat: 'finance' },
  { src: 'PaymentCard', cat: 'finance' },
];

for (const card of cardMap) {
  const cardFile = path.join(cardsSrcDir, `${card.src}.jsx`);
  if (fs.existsSync(cardFile)) {
    let content = readFile(cardFile);
    content = content.replace('"./Card"', '"../Card/Card"');
    const dst = path.join(cardsDstDir, card.cat, card.src);
    writeFile(path.join(dst, `${card.src}.jsx`), content);
    writeFile(path.join(dst, 'index.js'), `export { default } from './${card.src}';\n`);
  }
}

// PhotoProfileCard in social as well
if (fs.existsSync(path.join(cardsSrcDir, 'PhotoProfileCard.jsx'))) {
  const photoContent = readFile(path.join(cardsSrcDir, 'PhotoProfileCard.jsx'));
  const socialDst = path.join(cardsDstDir, 'social', 'PhotoProfileCard');
  writeFile(path.join(socialDst, 'PhotoProfileCard.jsx'), photoContent);
  writeFile(path.join(socialDst, 'index.js'), `export { default } from './PhotoProfileCard';\n`);
}

// Master Cards barrel index
const cardExports = [
  `export { default as Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';`
];
for (const card of cardMap) {
  cardExports.push(`export { default as ${card.src} } from './${card.cat}/${card.src}';`);
}
writeFile(path.join(cardsDstDir, 'index.js'), cardExports.join('\n') + '\n');

// -------------------------------------------------------------
// 3. UI FORMS
// -------------------------------------------------------------
console.log('[3/12] Migrating UI forms...');
const formsSrcDir = path.join(root, 'src', 'components', 'atoms', 'forms');
const formsDstDir = path.join(root, 'src', 'components', 'ui', 'forms');

const formNames = [
  'Checkbox', 'DateInput', 'FileUpload', 'HelperText', 'InputError',
  'InputLabel', 'OTPInput', 'PasswordInput', 'RadioButton', 'RangeSlider',
  'SearchInput', 'SelectDropdown', 'SwitchToggle', 'Textarea', 'TextInput'
];

for (const fn of formNames) {
  const fFile = path.join(formsSrcDir, `${fn}.jsx`);
  if (fs.existsSync(fFile)) {
    let content = readFile(fFile);
    // Ensure default export exists if only named export was present
    if (!content.includes(`export default`) && content.includes(`export const ${fn}`)) {
      content += `\nexport default ${fn};\n`;
    }
    const dst = path.join(formsDstDir, fn);
    writeFile(path.join(dst, `${fn}.jsx`), content);
    writeFile(path.join(dst, 'index.js'),
      `export * from './${fn}';\nexport { default, ${fn} } from './${fn}';\n`);
  }
}

const formsBarrel = formNames.map(f => `export { default as ${f}, ${f} } from './${f}';`).join('\n') + '\n';
writeFile(path.join(formsDstDir, 'index.js'), formsBarrel);

// -------------------------------------------------------------
// 4. UI DATA-DISPLAY
// -------------------------------------------------------------
console.log('[4/12] Migrating UI data-display...');
const ddSrcDir = path.join(root, 'src', 'components', 'atoms', 'data-display');
const ddDstDir = path.join(root, 'src', 'components', 'ui', 'data-display');

const ddNames = [
  'AvatarGroup', 'DataCard', 'DataTable', 'EmptyState', 'Misc',
  'ProgressBar', 'Skeleton', 'Spinner', 'Tag', 'Timeline'
];

for (const dd of ddNames) {
  const ddFile = path.join(ddSrcDir, `${dd}.jsx`);
  if (fs.existsSync(ddFile)) {
    let content = readFile(ddFile);
    if (!content.includes(`export default`) && content.includes(`export const ${dd}`)) {
      content += `\nexport default ${dd};\n`;
    }
    const dst = path.join(ddDstDir, dd);
    writeFile(path.join(dst, `${dd}.jsx`), content);
    writeFile(path.join(dst, 'index.js'),
      `export * from './${dd}';\nexport { default } from './${dd}';\n`);
  }
}

const ddBarrel = ddNames.map(d => `export * from './${d}';\nexport { default as ${d} } from './${d}';`).join('\n') + '\n';
writeFile(path.join(ddDstDir, 'index.js'), ddBarrel);

// -------------------------------------------------------------
// 5. UI FEEDBACK (Notifications)
// -------------------------------------------------------------
console.log('[5/12] Migrating UI feedback...');
const fbSrcDir = path.join(root, 'src', 'components', 'atoms', 'notifications');
const fbDstDir = path.join(root, 'src', 'components', 'ui', 'feedback');

const fbNames = [
  'Alert', 'Banner', 'ConfirmDialog', 'InlineMessage', 'NotificationBadge',
  'NotificationCard', 'ProgressNotification', 'Snackbar', 'StatusDot', 'Toast'
];

for (const fb of fbNames) {
  const fbFile = path.join(fbSrcDir, `${fb}.jsx`);
  if (fs.existsSync(fbFile)) {
    let content = readFile(fbFile);
    if (!content.includes(`export default`) && content.includes(`export const ${fb}`)) {
      content += `\nexport default ${fb};\n`;
    }
    const dst = path.join(fbDstDir, fb);
    writeFile(path.join(dst, `${fb}.jsx`), content);
    writeFile(path.join(dst, 'index.js'),
      `export * from './${fb}';\nexport { default } from './${fb}';\n`);
  }
}

const fbBarrel = fbNames.map(f => `export * from './${f}';\nexport { default as ${f} } from './${f}';`).join('\n') + '\n';
writeFile(path.join(fbDstDir, 'index.js'), fbBarrel);

// -------------------------------------------------------------
// 6. SHARED COMPONENTS
// -------------------------------------------------------------
console.log('[6/12] Migrating shared components...');
const sharedSrcDir = path.join(root, 'src', 'components', 'atoms');
const sharedDstDir = path.join(root, 'src', 'components', 'shared');

const sharedItems = [
  'Avatar', 'Badge', 'Card', 'IconButton', 'Logo',
  'SearchBar', 'SearchInput', 'StatCard', 'ThemeToggle'
];

for (const item of sharedItems) {
  const itemFile = path.join(sharedSrcDir, `${item}.jsx`);
  if (fs.existsSync(itemFile)) {
    let content = readFile(itemFile);
    content = content.replace(/"\.\.\/\.\.\/context\/ThemeContext"/g, '"@/context/ThemeContext"');
    content = content.replace(/"\.\.\/context\/ThemeContext"/g, '"@/context/ThemeContext"');
    const dst = path.join(sharedDstDir, item);
    writeFile(path.join(dst, `${item}.jsx`), content);
    writeFile(path.join(dst, 'index.js'), `export { default } from './${item}';\n`);
  }
}

const sharedBarrel = sharedItems.map(s => `export { default as ${s} } from './${s}';`).join('\n') + '\n';
writeFile(path.join(sharedDstDir, 'index.js'), sharedBarrel);

// -------------------------------------------------------------
// 7. LAYOUT COMPONENTS
// -------------------------------------------------------------
console.log('[7/12] Migrating layout components...');
const layoutDir = path.join(root, 'src', 'components', 'layout');

// MainLayout
const mlSrc = path.join(layoutDir, 'MainLayout.jsx');
if (fs.existsSync(mlSrc)) {
  let content = readFile(mlSrc);
  content = content.replace(/"\.\.\/molecules\/Header"/g, '"@/components/layout/Header"');
  content = content.replace(/"\.\.\/molecules\/Sidebar"/g, '"@/components/layout/Sidebar"');
  content = content.replace(/"\.\/Footer"/g, '"@/components/layout/Footer"');
  writeFile(path.join(layoutDir, 'MainLayout', 'MainLayout.jsx'), content);
  writeFile(path.join(layoutDir, 'MainLayout', 'index.js'), `export { default } from './MainLayout';\n`);
}

// Header
const headerSrc = path.join(root, 'src', 'components', 'molecules', 'Header.jsx');
if (fs.existsSync(headerSrc)) {
  let content = readFile(headerSrc);
  content = content.replace(/"\.\.\/atoms\/Avatar"/g, '"@/components/shared/Avatar"');
  content = content.replace(/"\.\.\/atoms\/SearchInput"/g, '"@/components/shared/SearchInput"');
  content = content.replace(/"\.\.\/atoms\/ThemeToggle"/g, '"@/components/shared/ThemeToggle"');
  writeFile(path.join(layoutDir, 'Header', 'Header.jsx'), content);
  writeFile(path.join(layoutDir, 'Header', 'index.js'), `export { default } from './Header';\n`);
}

// Sidebar
const sidebarSrc = path.join(root, 'src', 'components', 'molecules', 'Sidebar.jsx');
if (fs.existsSync(sidebarSrc)) {
  const content = readFile(sidebarSrc);
  writeFile(path.join(layoutDir, 'Sidebar', 'Sidebar.jsx'), content);
  writeFile(path.join(layoutDir, 'Sidebar', 'index.js'), `export { default } from './Sidebar';\n`);
}

// Footer
const footerSrc = path.join(layoutDir, 'Footer.jsx');
if (fs.existsSync(footerSrc)) {
  const content = readFile(footerSrc);
  writeFile(path.join(layoutDir, 'Footer', 'Footer.jsx'), content);
  writeFile(path.join(layoutDir, 'Footer', 'index.js'), `export { default } from './Footer';\n`);
}

// -------------------------------------------------------------
// 8. CODE REGISTRY (Clean copy with UTF-8 and updated imports)
// -------------------------------------------------------------
console.log('[8/12] Setting up codeRegistry...');
const regSrcDir = path.join(root, 'src', 'registry');
const regDstDir = path.join(root, 'src', 'codeRegistry');

function copyRegistryRecursive(src, dst) {
  ensureDir(dst);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyRegistryRecursive(srcPath, dstPath);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      let content = readFile(srcPath);
      // Update atoms/buttons -> ui/buttons
      content = content.replace(/\.\.\/\.\.\/components\/atoms\/buttons\//g, '@/components/ui/buttons/');
      content = content.replace(/\.\.\/\.\.\/\.\.\/components\/atoms\/buttons\//g, '@/components/ui/buttons/');
      // Update atoms/cards -> ui/cards
      content = content.replace(/\.\.\/\.\.\/components\/atoms\/cards\//g, '@/components/ui/cards/');
      content = content.replace(/\.\.\/\.\.\/\.\.\/components\/atoms\/cards\//g, '@/components/ui/cards/');
      // Update atoms/forms -> ui/forms
      content = content.replace(/\.\.\/\.\.\/components\/atoms\/forms\//g, '@/components/ui/forms/');
      content = content.replace(/\.\.\/\.\.\/\.\.\/components\/atoms\/forms\//g, '@/components/ui/forms/');
      // Update atoms/notifications -> ui/feedback
      content = content.replace(/\.\.\/\.\.\/components\/atoms\/notifications\//g, '@/components/ui/feedback/');
      content = content.replace(/\.\.\/\.\.\/\.\.\/components\/atoms\/notifications\//g, '@/components/ui/feedback/');
      // Update atoms/data-display -> ui/data-display
      content = content.replace(/\.\.\/\.\.\/components\/atoms\/data-display\//g, '@/components/ui/data-display/');
      content = content.replace(/\.\.\/\.\.\/\.\.\/components\/atoms\/data-display\//g, '@/components/ui/data-display/');
      writeFile(dstPath, content);
    } else {
      copyFile(srcPath, dstPath);
    }
  }
}

if (fs.existsSync(regSrcDir)) {
  copyRegistryRecursive(regSrcDir, regDstDir);
}

// Make sure codeRegistry/buttons/index.js exists
const buttonRegIndex = path.join(regDstDir, 'buttons', 'index.js');
const buttonRegFiles = [
  'primary-button', 'secondary-button', 'animated-button', 'ghost-button',
  'gradient-button', 'icon-button', 'outline-button', 'pulse-button',
  'shadow-button', 'floating-button'
];
const buttonRegExports = buttonRegFiles.map(b => `import ${b.replace(/-([a-z])/g, (_, c) => c.toUpperCase())} from "./${b}";`).join('\n') +
  `\n\nexport const buttons = [\n` +
  buttonRegFiles.map(b => `  ${b.replace(/-([a-z])/g, (_, c) => c.toUpperCase())},`).join('\n') +
  `\n];\n\nexport default buttons;\n`;
writeFile(buttonRegIndex, buttonRegExports);

// -------------------------------------------------------------
// 9. FEATURES (Pages & Organisms)
// -------------------------------------------------------------
console.log('[9/12] Migrating features...');
const pagesDir = path.join(root, 'src', 'pages');
const orgsDir = path.join(root, 'src', 'components', 'organisms');
const featDir = path.join(root, 'src', 'features');

function updateGeneralImports(content) {
  // Lib / db / supabase
  content = content.replace(/from\s+["'](\.\.\/)+lib\/db["']/g, 'from "@/services/supabase/components.service"');
  content = content.replace(/from\s+["'](\.\.\/)+lib\/supabase["']/g, 'from "@/services/supabase/client"');
  content = content.replace(/from\s+["'](\.\.\/)+lib\/fieldAdapter["']/g, 'from "@/utils/fieldAdapter"');
  content = content.replace(/from\s+["'](\.\.\/)+lib\/installContract["']/g, 'from "@/utils/installContract"');

  // Registry
  content = content.replace(/from\s+["'](\.\.\/)+registry\/index["']/g, 'from "@/codeRegistry/index"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/index\.js["']/g, 'from "@/codeRegistry/index"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/cards\/index["']/g, 'from "@/codeRegistry/cards/index"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/cards\/index\.js["']/g, 'from "@/codeRegistry/cards/index"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/forms["']/g, 'from "@/codeRegistry/forms"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/forms\/index["']/g, 'from "@/codeRegistry/forms"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/notifications["']/g, 'from "@/codeRegistry/notifications"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/data-display["']/g, 'from "@/codeRegistry/data-display"');
  content = content.replace(/from\s+["'](\.\.\/)+registry\/form-compositions["']/g, 'from "@/codeRegistry/form-compositions"');

  // Layout
  content = content.replace(/from\s+["'](\.\.\/)+components\/layout\/MainLayout["']/g, 'from "@/components/layout/MainLayout"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/layout\/Footer["']/g, 'from "@/components/layout/Footer"');

  // Shared / Atoms
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/Card["']/g, 'from "@/components/shared/Card"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/Avatar["']/g, 'from "@/components/shared/Avatar"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/Badge["']/g, 'from "@/components/shared/Badge"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/Logo["']/g, 'from "@/components/shared/Logo"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/SearchBar["']/g, 'from "@/components/shared/SearchBar"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/SearchInput["']/g, 'from "@/components/shared/SearchInput"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/StatCard["']/g, 'from "@/components/shared/StatCard"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/ThemeToggle["']/g, 'from "@/components/shared/ThemeToggle"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/IconButton["']/g, 'from "@/components/shared/IconButton"');

  // UI components
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/buttons\/([^"']+)["']/g, 'from "@/components/ui/buttons/$2"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/buttons["']/g, 'from "@/components/ui/buttons"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/cards\/([^"']+)["']/g, 'from "@/components/ui/cards/$2"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/cards["']/g, 'from "@/components/ui/cards"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/forms\/([^"']+)["']/g, 'from "@/components/ui/forms/$2"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/forms["']/g, 'from "@/components/ui/forms"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/data-display\/([^"']+)["']/g, 'from "@/components/ui/data-display/$2"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/data-display["']/g, 'from "@/components/ui/data-display"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/notifications\/([^"']+)["']/g, 'from "@/components/ui/feedback/$2"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/atoms\/notifications["']/g, 'from "@/components/ui/feedback"');

  // Organisms / Shared features
  content = content.replace(/from\s+["'](\.\.\/)+components\/organisms\/AddToProjectModal["']/g, 'from "@/features/shared/AddToProjectModal"');
  content = content.replace(/import\s+["'](\.\.\/)+components\/organisms\/AddToProjectModal\.css["']/g, 'import "@/features/shared/AddToProjectModal.css"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/organisms\/ComponentDetailsShell["']/g, 'from "@/features/shared/ComponentDetailsShell"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/organisms\/TemplatesSection["']/g, 'from "@/features/shared/TemplatesSection"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/organisms\/ComponentsSection["']/g, 'from "@/features/shared/ComponentsSection"');
  content = content.replace(/from\s+["'](\.\.\/)+components\/organisms\/ComponentsNavigation["']/g, 'from "@/features/shared/ComponentsNavigation"');
  content = content.replace(/import\s+["'](\.\.\/)+components\/organisms\/ComponentsNavigation\.css["']/g, 'import "@/features/shared/ComponentsNavigation.css"');

  return content;
}

// 9a. Dashboard
if (fs.existsSync(path.join(pagesDir, 'Dashboard.jsx'))) {
  let content = readFile(path.join(pagesDir, 'Dashboard.jsx'));
  content = updateGeneralImports(content);
  content = content.replace(/from\s+["'][^"']*SyncBanner["']/g, 'from "@/features/sync/components/SyncBanner"');
  writeFile(path.join(featDir, 'dashboard', 'pages', 'Dashboard.jsx'), content);
  writeFile(path.join(featDir, 'dashboard', 'index.js'), `export { default as DashboardPage } from './pages/Dashboard';\n`);
}

if (fs.existsSync(path.join(orgsDir, 'DashboardStats.jsx'))) {
  let content = readFile(path.join(orgsDir, 'DashboardStats.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'dashboard', 'components', 'DashboardStats.jsx'), content);
}

// 9b. Buttons feature
if (fs.existsSync(path.join(pagesDir, 'ButtonsPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'ButtonsPage.jsx'));
  content = updateGeneralImports(content);
  content = content.replace(/from\s+["'](\.\.\/)+components\/organisms\/ButtonShowcase["']/g, 'from "../components/ButtonShowcase"');
  content = content.replace(/from\s+["'](\.\.\/pages\/|\.\/)ButtonDetails["']/g, 'from "./ButtonDetails"');
  writeFile(path.join(featDir, 'buttons', 'pages', 'ButtonsPage.jsx'), content);
  copyFile(path.join(pagesDir, 'ButtonsPage.css'), path.join(featDir, 'buttons', 'pages', 'ButtonsPage.css'));
}

if (fs.existsSync(path.join(pagesDir, 'ButtonDetails.jsx'))) {
  let content = readFile(path.join(pagesDir, 'ButtonDetails.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'buttons', 'pages', 'ButtonDetails.jsx'), content);
  copyFile(path.join(pagesDir, 'ButtonDetails.css'), path.join(featDir, 'buttons', 'pages', 'ButtonDetails.css'));
}

if (fs.existsSync(path.join(orgsDir, 'ButtonShowcase.jsx'))) {
  let content = readFile(path.join(orgsDir, 'ButtonShowcase.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'buttons', 'components', 'ButtonShowcase.jsx'), content);
  copyFile(path.join(orgsDir, 'ButtonShowcase.css'), path.join(featDir, 'buttons', 'components', 'ButtonShowcase.css'));
}
writeFile(path.join(featDir, 'buttons', 'index.js'), `export { default as ButtonsPage } from './pages/ButtonsPage';\n`);

// 9c. Cards feature
if (fs.existsSync(path.join(pagesDir, 'CardsPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'CardsPage.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'cards', 'pages', 'CardsPage.jsx'), content);
}

if (fs.existsSync(path.join(pagesDir, 'CardDetails.jsx'))) {
  let content = readFile(path.join(pagesDir, 'CardDetails.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'cards', 'pages', 'CardDetails.jsx'), content);
}
writeFile(path.join(featDir, 'cards', 'index.js'), `export { default as CardsPage } from './pages/CardsPage';\n`);

// 9d. Forms feature
if (fs.existsSync(path.join(pagesDir, 'FormsPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'FormsPage.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'forms', 'pages', 'FormsPage.jsx'), content);
  copyFile(path.join(pagesDir, 'FormsPage.css'), path.join(featDir, 'forms', 'pages', 'FormsPage.css'));
}

if (fs.existsSync(path.join(pagesDir, 'FormDetails.jsx'))) {
  let content = readFile(path.join(pagesDir, 'FormDetails.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'forms', 'pages', 'FormDetails.jsx'), content);
  copyFile(path.join(pagesDir, 'FormDetails.css'), path.join(featDir, 'forms', 'pages', 'FormDetails.css'));
}

const formMols = path.join(root, 'src', 'components', 'molecules', 'forms');
if (fs.existsSync(path.join(formMols, 'FormField.jsx'))) {
  copyFile(path.join(formMols, 'FormField.jsx'), path.join(featDir, 'forms', 'components', 'FormField.jsx'));
}
if (fs.existsSync(path.join(formMols, 'PasswordStrengthField.jsx'))) {
  copyFile(path.join(formMols, 'PasswordStrengthField.jsx'), path.join(featDir, 'forms', 'components', 'PasswordStrengthField.jsx'));
}
writeFile(path.join(featDir, 'forms', 'index.js'), `export { default as FormsPage } from './pages/FormsPage';\n`);

// 9e. Form Compositions feature
if (fs.existsSync(path.join(pagesDir, 'FormCompositionsPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'FormCompositionsPage.jsx'));
  content = updateGeneralImports(content);
  // Specifically map lib/db in FormCompositionsPage to projects.service
  content = content.replace(/from\s+["']@\/services\/supabase\/components\.service["']/g, 'from "@/services/supabase/projects.service"');
  writeFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.jsx'), content);
  copyFile(path.join(pagesDir, 'FormCompositionsPage.css'), path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.css'));
}

if (fs.existsSync(path.join(pagesDir, 'FormCompositionDetails.jsx'))) {
  let content = readFile(path.join(pagesDir, 'FormCompositionDetails.jsx'));
  content = updateGeneralImports(content);
  content = content.replace(/from\s+["']@\/services\/supabase\/components\.service["']/g, 'from "@/services/supabase/projects.service"');
  writeFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.jsx'), content);
  copyFile(path.join(pagesDir, 'FormCompositionDetails.css'), path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.css'));
}

const createProjForm = path.join(orgsDir, 'forms', 'CreateProjectForm.jsx');
if (fs.existsSync(createProjForm)) {
  copyFile(createProjForm, path.join(featDir, 'form-compositions', 'components', 'CreateProjectForm.jsx'));
}
writeFile(path.join(featDir, 'form-compositions', 'index.js'), `export { default as FormCompositionsPage } from './pages/FormCompositionsPage';\n`);

// 9f. Notifications feature
if (fs.existsSync(path.join(pagesDir, 'NotificationsPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'NotificationsPage.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'notifications', 'pages', 'NotificationsPage.jsx'), content);
  copyFile(path.join(pagesDir, 'NotificationsPage.css'), path.join(featDir, 'notifications', 'pages', 'NotificationsPage.css'));
}

if (fs.existsSync(path.join(pagesDir, 'NotificationDetails.jsx'))) {
  let content = readFile(path.join(pagesDir, 'NotificationDetails.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'notifications', 'pages', 'NotificationDetails.jsx'), content);
}
writeFile(path.join(featDir, 'notifications', 'index.js'), `export { default as NotificationsPage } from './pages/NotificationsPage';\n`);

// 9g. Data-display feature
if (fs.existsSync(path.join(pagesDir, 'DataDisplayPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'DataDisplayPage.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.jsx'), content);
  copyFile(path.join(pagesDir, 'DataDisplayPage.css'), path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.css'));
}

if (fs.existsSync(path.join(pagesDir, 'DataDisplayDetails.jsx'))) {
  let content = readFile(path.join(pagesDir, 'DataDisplayDetails.jsx'));
  content = updateGeneralImports(content);
  writeFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayDetails.jsx'), content);
}
writeFile(path.join(featDir, 'data-display', 'index.js'), `export { default as DataDisplayPage } from './pages/DataDisplayPage';\n`);

// 9h. Sync feature
if (fs.existsSync(path.join(pagesDir, 'SyncPage.jsx'))) {
  let content = readFile(path.join(pagesDir, 'SyncPage.jsx'));
  content = updateGeneralImports(content);
  content = content.replace(/from\s+["']@\/services\/supabase\/components\.service["']/g, 'from "@/services/supabase/sync.service"');
  writeFile(path.join(featDir, 'sync', 'pages', 'SyncPage.jsx'), content);
}

if (fs.existsSync(path.join(orgsDir, 'SyncBanner.jsx'))) {
  let content = readFile(path.join(orgsDir, 'SyncBanner.jsx'));
  content = updateGeneralImports(content);
  content = content.replace(/from\s+["']@\/services\/supabase\/components\.service["']/g, 'from "@/services/supabase/sync.service"');
  writeFile(path.join(featDir, 'sync', 'components', 'SyncBanner.jsx'), content);
}
writeFile(path.join(featDir, 'sync', 'index.js'), `export { default as SyncPage } from './pages/SyncPage';\n`);

// 9i. Shared feature components
const sharedOrgs = [
  'AddToProjectModal', 'ComponentDetailsShell', 'ComponentsNavigation',
  'ComponentsSection', 'TemplatesSection'
];
for (const org of sharedOrgs) {
  const orgFile = path.join(orgsDir, `${org}.jsx`);
  if (fs.existsSync(orgFile)) {
    let content = readFile(orgFile);
    content = updateGeneralImports(content);
    writeFile(path.join(featDir, 'shared', `${org}.jsx`), content);
    const cssFile = path.join(orgsDir, `${org}.css`);
    if (fs.existsSync(cssFile)) {
      copyFile(cssFile, path.join(featDir, 'shared', `${org}.css`));
    }
  }
}

// -------------------------------------------------------------
// 10. STYLES
// -------------------------------------------------------------
console.log('[10/12] Setting up styles...');
const stylesDir = path.join(root, 'src', 'styles');

const variablesCss = `/* ============================================
   THEME DESIGN TOKENS (light / dark)
   Used by plain CSS files across the app via var(--token)
   ============================================ */
:root {
  --bg-page: black;
  --bg-surface: #ffffff;
  --bg-surface-2: #f8f9fa;
  --bg-elevated: #ffffff;
  --bg-muted: #f3f4f6;
  --bg-code: #1f2937;

  --border-color: #e5e7eb;
  --border-strong: #d1d5db;

  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;
  --text-on-accent: #ffffff;

  --accent: #4f46e5;
  --accent-hover: #4339ca;
  --accent-soft: rgba(79, 70, 229, 0.08);
  --accent-soft-border: rgba(79, 70, 229, 0.2);

  --shadow-color: rgba(15, 23, 42, 0.08);
  --shadow-color-strong: rgba(15, 23, 42, 0.14);

  color-scheme: light;
}

html.dark {
  --bg-page: #0c0f17;
  --bg-surface: #161a26;
  --bg-surface-2: #1b2030;
  --bg-elevated: #1b2030;
  --bg-muted: #20263a;
  --bg-code: #0c0f17;

  --border-color: #262c3f;
  --border-strong: #333b52;

  --text-primary: #f3f4f6;
  --text-secondary: #b6bccc;
  --text-muted: #7a8296;
  --text-on-accent: #ffffff;

  --accent: #6366f1;
  --accent-hover: #818cf8;
  --accent-soft: rgba(99, 102, 241, 0.16);
  --accent-soft-border: rgba(99, 102, 241, 0.32);

  --shadow-color: rgba(0, 0, 0, 0.35);
  --shadow-color-strong: rgba(0, 0, 0, 0.5);

  color-scheme: dark;
}
`;
writeFile(path.join(stylesDir, 'variables.css'), variablesCss);

const globalsCss = `/* Global reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 999px;
}
html.dark ::-webkit-scrollbar-thumb {
  background: #3a4258;
}
`;
writeFile(path.join(stylesDir, 'globals.css'), globalsCss);

writeFile(path.join(stylesDir, 'utilities.css'), '/* Utility classes for TemplateHub */\n');
writeFile(path.join(stylesDir, 'typography.css'), '/* Typography styles for TemplateHub */\n');

// Update src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./styles/variables.css";
@import "./styles/globals.css";
@import "./styles/utilities.css";
@import "./styles/typography.css";
`;
writeFile(path.join(root, 'src', 'index.css'), indexCss);

// -------------------------------------------------------------
// 11. DOCS & SUPABASE
// -------------------------------------------------------------
console.log('[11/12] Copying docs and supabase schema...');
const docsDir = path.join(root, 'docs');
const supabaseDir = path.join(root, 'supabase');

if (fs.existsSync(path.join(root, 'BUTTONS_COLLECTION.md'))) {
  copyFile(path.join(root, 'BUTTONS_COLLECTION.md'), path.join(docsDir, 'BUTTONS_COLLECTION.md'));
}
if (fs.existsSync(path.join(root, 'BUTTONS_QUICK_REFERENCE.md'))) {
  copyFile(path.join(root, 'BUTTONS_QUICK_REFERENCE.md'), path.join(docsDir, 'BUTTONS_QUICK_REFERENCE.md'));
}
if (fs.existsSync(path.join(root, 'supabase-schema.sql'))) {
  copyFile(path.join(root, 'supabase-schema.sql'), path.join(supabaseDir, 'schema.sql'));
}

// -------------------------------------------------------------
// 12. ARCHITECTURE DOC
// -------------------------------------------------------------
console.log('[12/12] Creating ARCHITECTURE.md...');
const archDoc = `# TemplateHub Project Architecture

## Overview
TemplateHub is a modular, scalable React application designed to serve as a component and template hub for modern web interfaces.

## Directory Structure

\`\`\`
src/
├── app/                  # Application root, router, and global providers
│   ├── App.jsx           # Root layout and router host
│   ├── routes.jsx        # Route definitions
│   └── providers.jsx     # App-level Context / Providers (Router, Theme)
├── codeRegistry/         # Source-of-truth metadata & code definitions for templates
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── data-display/
│   ├── notifications/
│   └── form-compositions/
├── components/
│   ├── ui/               # Reusable presentation atoms & components
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── data-display/
│   │   └── feedback/
│   ├── shared/           # Cross-cutting primitives (Avatar, Logo, StatCard, etc.)
│   └── layout/           # App-level shell (MainLayout, Header, Sidebar, Footer)
├── features/             # Feature slices (Dashboard, Buttons, Cards, Forms, etc.)
│   ├── dashboard/
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── form-compositions/
│   ├── notifications/
│   ├── data-display/
│   ├── sync/
│   └── shared/
├── services/             # External APIs and Supabase service layer
│   └── supabase/
│       ├── client.js
│       ├── components.service.js
│       ├── projects.service.js
│       └── sync.service.js
├── hooks/                # Reusable React hooks
│   └── useTheme.js
├── constants/            # Application routes, categories, and constants
│   ├── routes.js
│   ├── componentTypes.js
│   └── appConstants.js
├── utils/                # Utility helpers (adapters, contracts)
│   ├── fieldAdapter.js
│   └── installContract.js
├── context/              # React context providers
│   └── ThemeContext.jsx
└── styles/               # Global tokens and modular CSS
    ├── variables.css
    ├── globals.css
    ├── utilities.css
    └── typography.css
\`\`\`

## Conventions
- Use \`@/\` path alias to reference \`src/\` modules.
- Reusable UI elements belong in \`components/ui/\`.
- Domain-specific views belong in \`features/<domain>/\`.
- Database operations belong in \`services/supabase/\`.
`;
writeFile(path.join(docsDir, 'ARCHITECTURE.md'), archDoc);

console.log('=== Migration Finished Successfully! ===');
