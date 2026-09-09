const fs = require('fs');
const path = require('path');

const root = __dirname;
const srcDir = path.join(root, 'src');

console.log('=== Complete Modular Project Structure Refactor ===');
console.log('Target Root:', root);

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`[Removed Directory]: ${path.relative(root, dirPath)}`);
  }
}

function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[Removed File]: ${path.relative(root, filePath)}`);
  }
}

// ============================================================================
// 1. APP REFACTOR (src/app/)
// ============================================================================
console.log('\n[1/12] Refactoring src/app/ ...');

// App/App.jsx, App.css, index.js
const appCss = `/* App root styles */
.app-container {
  min-height: 100vh;
}
`;
const appJsx = `import AppRoutes from '../routes';
import './App.css';

export default function App() {
  return <AppRoutes />;
}
`;
const appIndex = `export { default } from './App';\n`;

writeFile(path.join(srcDir, 'app', 'App', 'App.jsx'), appJsx);
writeFile(path.join(srcDir, 'app', 'App', 'App.css'), appCss);
writeFile(path.join(srcDir, 'app', 'App', 'index.js'), appIndex);

// routes/routes.jsx, index.js
const routesJsx = `import { Routes, Route, Navigate } from 'react-router-dom';

// Dashboard
import DashboardPage from '@/features/dashboard/pages/Dashboard';

// Buttons
import ButtonsPage from '@/features/buttons/pages/ButtonsPage';

// Cards
import CardsPage from '@/features/cards/pages/CardsPage';

// Forms
import FormsPage from '@/features/forms/pages/FormsPage';

// Form Compositions
import FormCompositionsPage from '@/features/form-compositions/pages/FormCompositionsPage';
import FormCompositionDetails from '@/features/form-compositions/pages/FormCompositionDetails';

// Notifications
import NotificationsPage from '@/features/notifications/pages/NotificationsPage';

// Data Display
import DataDisplayPage from '@/features/data-display/pages/DataDisplayPage';

// Sync
import SyncPage from '@/features/sync/pages/SyncPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                       element={<DashboardPage />} />
      <Route path="/buttons/*"              element={<ButtonsPage />} />
      <Route path="/cards/*"               element={<CardsPage />} />
      <Route path="/forms/*"               element={<FormsPage />} />
      <Route path="/form-compositions"     element={<FormCompositionsPage />} />
      <Route path="/form-compositions/:slug" element={<FormCompositionDetails />} />
      <Route path="/notifications/*"       element={<NotificationsPage />} />
      <Route path="/data-display/*"        element={<DataDisplayPage />} />
      <Route path="/sync"                  element={<SyncPage />} />
      <Route path="*"                      element={<Navigate to="/" replace />} />
    </Routes>
  );
}
`;
const routesIndex = `export { default } from './routes';\n`;

writeFile(path.join(srcDir, 'app', 'routes', 'routes.jsx'), routesJsx);
writeFile(path.join(srcDir, 'app', 'routes', 'index.js'), routesIndex);

// providers/Providers.jsx, index.js
const providersJsx = `import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
}
`;
const providersIndex = `export { default } from './Providers';\n`;

writeFile(path.join(srcDir, 'app', 'providers', 'Providers.jsx'), providersJsx);
writeFile(path.join(srcDir, 'app', 'providers', 'index.js'), providersIndex);

// Update src/main.jsx
const mainJsx = `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import Providers from './app/providers';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
`;
writeFile(path.join(srcDir, 'main.jsx'), mainJsx);

// Remove legacy root App.jsx, App.css, and old files in src/app/
removeFile(path.join(srcDir, 'App.jsx'));
removeFile(path.join(srcDir, 'App.css'));
removeFile(path.join(srcDir, 'app', 'App.jsx'));
removeFile(path.join(srcDir, 'app', 'routes.jsx'));
removeFile(path.join(srcDir, 'app', 'providers.jsx'));


// ============================================================================
// 2. BUTTONS (src/components/buttons/)
// ============================================================================
console.log('\n[2/12] Setting up modular buttons with dedicated CSS ...');

const buttonDefs = [
  {
    name: 'PrimaryButton',
    css: `/* PrimaryButton styles */
:root {
  --primary-color: #3b82f6;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), #2563eb);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
}
`
  },
  {
    name: 'SecondaryButton',
    css: `/* SecondaryButton styles */
:root {
  --secondary-color: #8b5cf6;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.btn-secondary {
  background: linear-gradient(135deg, var(--secondary-color), #7c3aed);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

.btn-secondary:active {
  transform: translateY(0);
}
`
  },
  {
    name: 'OutlineButton',
    css: `/* OutlineButton styles */
:root {
  --primary-color: #3b82f6;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}
`
  },
  {
    name: 'GhostButton',
    css: `/* GhostButton styles */
:root {
  --text-color: var(--text-primary, #1f2937);
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.btn-ghost {
  background: transparent;
  color: var(--text-color);
}

.btn-ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}

html.dark .btn-ghost {
  color: #f3f4f6;
}

html.dark .btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
}
`
  },
  {
    name: 'GradientButton',
    css: `/* GradientButton styles */
:root {
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.btn-gradient {
  background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
  background-size: 200% 200%;
  color: white;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
}
`
  },
  {
    name: 'AnimatedButton',
    css: `/* AnimatedButton styles */
:root {
  --primary-color: #3b82f6;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}

.btn-animated {
  background: linear-gradient(135deg, var(--primary-color), #1d4ed8);
  color: white;
}

.btn-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn-animated:hover .btn-shimmer {
  left: 100%;
}
`
  },
  {
    name: 'FloatingButton',
    css: `/* FloatingButton styles */
.btn-floating {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  padding: 0;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 50;
}

.btn-floating:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.5);
}
`
  },
  {
    name: 'IconButton',
    css: `/* IconButton styles */
.btn-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}
`
  },
  {
    name: 'PulseButton',
    css: `/* PulseButton styles */
:root {
  --success-color: #10b981;
  --border-radius: 8px;
}

.btn-pulse {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  background: var(--success-color);
  color: white;
  cursor: pointer;
  animation: pulseAnimation 2s infinite;
}

@keyframes pulseAnimation {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
`
  },
  {
    name: 'ShadowButton',
    css: `/* ShadowButton styles */
.btn-shadow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #1e293b;
  color: white;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.btn-shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}
`
  }
];

const buttonsDir = path.join(srcDir, 'components', 'buttons');

for (const b of buttonDefs) {
  const bDir = path.join(buttonsDir, b.name);
  ensureDir(bDir);

  // Read existing JSX from ui/buttons or atoms/buttons
  let existingJsxPath = path.join(srcDir, 'components', 'ui', 'buttons', b.name, `${b.name}.jsx`);
  if (!fs.existsSync(existingJsxPath)) {
    existingJsxPath = path.join(srcDir, 'components', 'atoms', 'buttons', `${b.name}.jsx`);
  }
  let content = readFile(existingJsxPath);
  // Update CSS import inside JSX to local ./${b.name}.css
  content = content.replace(/import\s+["'][^"']*buttons\.css["'];?/g, `import './${b.name}.css';`);
  if (!content.includes(`${b.name}.css`)) {
    content = `import './${b.name}.css';\n` + content;
  }

  writeFile(path.join(bDir, `${b.name}.jsx`), content);
  writeFile(path.join(bDir, `${b.name}.css`), b.css);
  writeFile(path.join(bDir, 'index.js'), `export { default } from './${b.name}';\n`);
}

// Master buttons barrel
const buttonsBarrel = buttonDefs.map(b => `export { default as ${b.name} } from './${b.name}';`).join('\n') + '\n';
writeFile(path.join(buttonsDir, 'index.js'), buttonsBarrel);


// ============================================================================
// 3. CARDS (src/components/cards/)
// ============================================================================
console.log('\n[3/12] Setting up modular cards with dedicated CSS ...');

const cardsSrcDir = path.join(srcDir, 'components', 'ui', 'cards');
const cardsDstDir = path.join(srcDir, 'components', 'cards');

// Base Card primitive
const baseCardJsx = readFile(path.join(cardsSrcDir, 'Card', 'Card.jsx'));
const baseCardCss = `/* Card primitive styles */\n.card-primitive { border-radius: 1rem; }\n`;
writeFile(path.join(cardsDstDir, 'Card', 'Card.jsx'), baseCardJsx);
writeFile(path.join(cardsDstDir, 'Card', 'Card.css'), baseCardCss);
writeFile(path.join(cardsDstDir, 'Card', 'index.js'),
  `export { default, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';\n`);

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
  const cSrcFile = path.join(cardsSrcDir, card.cat, card.src, `${card.src}.jsx`);
  if (fs.existsSync(cSrcFile)) {
    let content = readFile(cSrcFile);
    content = content.replace(/@\/components\/ui\/cards\/Card/g, '@/components/cards/Card');
    if (!content.includes(`${card.src}.css`)) {
      content = `import './${card.src}.css';\n` + content;
    }
    const cDst = path.join(cardsDstDir, card.cat, card.src);
    writeFile(path.join(cDst, `${card.src}.jsx`), content);
    writeFile(path.join(cDst, `${card.src}.css`), `/* ${card.src} styles */\n`);
    writeFile(path.join(cDst, 'index.js'), `export { default } from './${card.src}';\n`);
  }
}

// Social PhotoProfileCard
const photoCardSrc = path.join(cardsSrcDir, 'profile', 'PhotoProfileCard', 'PhotoProfileCard.jsx');
if (fs.existsSync(photoCardSrc)) {
  let content = readFile(photoCardSrc);
  content = content.replace(/@\/components\/ui\/cards\/Card/g, '@/components/cards/Card');
  if (!content.includes('PhotoProfileCard.css')) {
    content = `import './PhotoProfileCard.css';\n` + content;
  }
  const socialDst = path.join(cardsDstDir, 'social', 'PhotoProfileCard');
  writeFile(path.join(socialDst, 'PhotoProfileCard.jsx'), content);
  writeFile(path.join(socialDst, 'PhotoProfileCard.css'), `/* PhotoProfileCard styles */\n`);
  writeFile(path.join(socialDst, 'index.js'), `export { default } from './PhotoProfileCard';\n`);
}

// Cards master barrel
const cardMasterExports = [
  `export { default as Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';`
];
for (const card of cardMap) {
  cardMasterExports.push(`export { default as ${card.src} } from './${card.cat}/${card.src}';`);
}
writeFile(path.join(cardsDstDir, 'index.js'), cardMasterExports.join('\n') + '\n');


// ============================================================================
// 4. FORMS (src/components/forms/)
// ============================================================================
console.log('\n[4/12] Setting up modular forms with dedicated CSS ...');

const formsSrcDir = path.join(srcDir, 'components', 'ui', 'forms');
const formsDstDir = path.join(srcDir, 'components', 'forms');

const formNames = [
  'Checkbox', 'DateInput', 'FileUpload', 'HelperText', 'InputError',
  'InputLabel', 'OTPInput', 'PasswordInput', 'RadioButton', 'RangeSlider',
  'SearchInput', 'SelectDropdown', 'SwitchToggle', 'Textarea', 'TextInput'
];

for (const fn of formNames) {
  const fFile = path.join(formsSrcDir, fn, `${fn}.jsx`);
  if (fs.existsSync(fFile)) {
    let content = readFile(fFile);
    if (!content.includes(`${fn}.css`)) {
      content = `import './${fn}.css';\n` + content;
    }
    const dst = path.join(formsDstDir, fn);
    writeFile(path.join(dst, `${fn}.jsx`), content);
    writeFile(path.join(dst, `${fn}.css`), `/* ${fn} styles */\n`);
    writeFile(path.join(dst, 'index.js'),
      `export * from './${fn}';\nexport { default, ${fn} } from './${fn}';\n`);
  }
}

const formsMasterBarrel = formNames.map(f => `export { default as ${f}, ${f} } from './${f}';`).join('\n') + '\n';
writeFile(path.join(formsDstDir, 'index.js'), formsMasterBarrel);


// ============================================================================
// 5. DATA-DISPLAY (src/components/data-display/)
// ============================================================================
console.log('\n[5/12] Setting up modular data-display with dedicated CSS ...');

const ddSrcDir = path.join(srcDir, 'components', 'ui', 'data-display');
const ddDstDir = path.join(srcDir, 'components', 'data-display');

const ddNames = [
  'AvatarGroup', 'DataCard', 'DataTable', 'EmptyState', 'Misc',
  'ProgressBar', 'Skeleton', 'Spinner', 'Tag', 'Timeline'
];

for (const dd of ddNames) {
  const ddFile = path.join(ddSrcDir, dd, `${dd}.jsx`);
  if (fs.existsSync(ddFile)) {
    let content = readFile(ddFile);
    if (!content.includes(`${dd}.css`)) {
      content = `import './${dd}.css';\n` + content;
    }
    const dst = path.join(ddDstDir, dd);
    writeFile(path.join(dst, `${dd}.jsx`), content);
    writeFile(path.join(dst, `${dd}.css`), `/* ${dd} styles */\n`);
    writeFile(path.join(dst, 'index.js'),
      `export * from './${dd}';\nexport { default } from './${dd}';\n`);
  }
}

const ddMasterBarrel = ddNames.map(d => `export * from './${d}';\nexport { default as ${d} } from './${d}';`).join('\n') + '\n';
writeFile(path.join(ddDstDir, 'index.js'), ddMasterBarrel);


// ============================================================================
// 6. FEEDBACK (src/components/feedback/)
// ============================================================================
console.log('\n[6/12] Setting up modular feedback with dedicated CSS ...');

const fbSrcDir = path.join(srcDir, 'components', 'ui', 'feedback');
const fbDstDir = path.join(srcDir, 'components', 'feedback');

const fbNames = [
  'Alert', 'Banner', 'ConfirmDialog', 'InlineMessage', 'NotificationBadge',
  'NotificationCard', 'ProgressNotification', 'Snackbar', 'StatusDot', 'Toast'
];

for (const fb of fbNames) {
  const fbFile = path.join(fbSrcDir, fb, `${fb}.jsx`);
  if (fs.existsSync(fbFile)) {
    let content = readFile(fbFile);
    if (!content.includes(`${fb}.css`)) {
      content = `import './${fb}.css';\n` + content;
    }
    const dst = path.join(fbDstDir, fb);
    writeFile(path.join(dst, `${fb}.jsx`), content);
    writeFile(path.join(dst, `${fb}.css`), `/* ${fb} styles */\n`);
    writeFile(path.join(dst, 'index.js'),
      `export * from './${fb}';\nexport { default } from './${fb}';\n`);
  }
}

const fbMasterBarrel = fbNames.map(f => `export * from './${f}';\nexport { default as ${f} } from './${f}';`).join('\n') + '\n';
writeFile(path.join(fbDstDir, 'index.js'), fbMasterBarrel);


// ============================================================================
// 7. COMMON (src/components/common/)
// ============================================================================
console.log('\n[7/12] Setting up modular common components with dedicated CSS ...');

const commonSrcDir = path.join(srcDir, 'components', 'shared');
const commonDstDir = path.join(srcDir, 'components', 'common');

const commonNames = [
  'Avatar', 'Badge', 'Card', 'Logo', 'SearchBar', 'SearchInput', 'StatCard', 'ThemeToggle'
];

for (const item of commonNames) {
  const itemFile = path.join(commonSrcDir, item, `${item}.jsx`);
  if (fs.existsSync(itemFile)) {
    let content = readFile(itemFile);
    if (!content.includes(`${item}.css`)) {
      content = `import './${item}.css';\n` + content;
    }
    const dst = path.join(commonDstDir, item);
    writeFile(path.join(dst, `${item}.jsx`), content);
    writeFile(path.join(dst, `${item}.css`), `/* ${item} styles */\n`);
    writeFile(path.join(dst, 'index.js'), `export { default } from './${item}';\n`);
  }
}

const commonMasterBarrel = commonNames.map(c => `export { default as ${c} } from './${c}';`).join('\n') + '\n';
writeFile(path.join(commonDstDir, 'index.js'), commonMasterBarrel);


// ============================================================================
// 8. LAYOUT (src/components/layout/)
// ============================================================================
console.log('\n[8/12] Setting up modular layout with dedicated CSS ...');

const layoutDir = path.join(srcDir, 'components', 'layout');

// Header
let headerContent = readFile(path.join(layoutDir, 'Header', 'Header.jsx'));
headerContent = headerContent.replace(/@\/components\/shared\//g, '@/components/common/');
if (!headerContent.includes('Header.css')) {
  headerContent = `import './Header.css';\n` + headerContent;
}
writeFile(path.join(layoutDir, 'Header', 'Header.jsx'), headerContent);
writeFile(path.join(layoutDir, 'Header', 'Header.css'), `/* Header layout styles */\n`);
writeFile(path.join(layoutDir, 'Header', 'index.js'), `export { default } from './Header';\n`);

// Sidebar
let sidebarContent = readFile(path.join(layoutDir, 'Sidebar', 'Sidebar.jsx'));
if (!sidebarContent.includes('Sidebar.css')) {
  sidebarContent = `import './Sidebar.css';\n` + sidebarContent;
}
writeFile(path.join(layoutDir, 'Sidebar', 'Sidebar.jsx'), sidebarContent);
writeFile(path.join(layoutDir, 'Sidebar', 'Sidebar.css'), `/* Sidebar layout styles */\n`);
writeFile(path.join(layoutDir, 'Sidebar', 'index.js'), `export { default } from './Sidebar';\n`);

// Footer
let footerContent = readFile(path.join(layoutDir, 'Footer', 'Footer.jsx'));
if (!footerContent.includes('Footer.css')) {
  footerContent = `import './Footer.css';\n` + footerContent;
}
writeFile(path.join(layoutDir, 'Footer', 'Footer.jsx'), footerContent);
writeFile(path.join(layoutDir, 'Footer', 'Footer.css'), `/* Footer layout styles */\n`);
writeFile(path.join(layoutDir, 'Footer', 'index.js'), `export { default } from './Footer';\n`);

// MainLayout
let mlContent = readFile(path.join(layoutDir, 'MainLayout', 'MainLayout.jsx'));
if (!mlContent.includes('MainLayout.css')) {
  mlContent = `import './MainLayout.css';\n` + mlContent;
}
writeFile(path.join(layoutDir, 'MainLayout', 'MainLayout.jsx'), mlContent);
writeFile(path.join(layoutDir, 'MainLayout', 'MainLayout.css'), `/* MainLayout shell styles */\n`);
writeFile(path.join(layoutDir, 'MainLayout', 'index.js'), `export { default } from './MainLayout';\n`);

// Clean up old layout root files
removeFile(path.join(layoutDir, 'MainLayout.jsx'));
removeFile(path.join(layoutDir, 'Footer.jsx'));

// Master layout barrel
const layoutBarrel = `export { default as MainLayout } from './MainLayout';
export { default as Header } from './Header';
export { default as Sidebar } from './Sidebar';
export { default as Footer } from './Footer';
`;
writeFile(path.join(layoutDir, 'index.js'), layoutBarrel);


// ============================================================================
// 9. FEATURES (src/features/)
// ============================================================================
console.log('\n[9/12] Refactoring features into self-contained Component folders ...');

const featDir = path.join(srcDir, 'features');

function transformFeatureImports(content) {
  content = content.replace(/@\/components\/ui\/buttons/g, '@/components/buttons');
  content = content.replace(/@\/components\/ui\/cards/g, '@/components/cards');
  content = content.replace(/@\/components\/ui\/forms/g, '@/components/forms');
  content = content.replace(/@\/components\/ui\/data-display/g, '@/components/data-display');
  content = content.replace(/@\/components\/ui\/feedback/g, '@/components/feedback');
  content = content.replace(/@\/components\/shared/g, '@/components/common');
  return content;
}

// 9a. Dashboard
const dbPageDir = path.join(featDir, 'dashboard', 'pages', 'Dashboard');
ensureDir(dbPageDir);
let dbPage = readFile(path.join(featDir, 'dashboard', 'pages', 'Dashboard.jsx'));
dbPage = transformFeatureImports(dbPage);
if (!dbPage.includes('Dashboard.css')) dbPage = `import './Dashboard.css';\n` + dbPage;
writeFile(path.join(dbPageDir, 'Dashboard.jsx'), dbPage);
writeFile(path.join(dbPageDir, 'Dashboard.css'), `/* Dashboard page styles */\n`);
writeFile(path.join(dbPageDir, 'index.js'), `export { default } from './Dashboard';\n`);
removeFile(path.join(featDir, 'dashboard', 'pages', 'Dashboard.jsx'));

const dbStatsDir = path.join(featDir, 'dashboard', 'components', 'DashboardStats');
ensureDir(dbStatsDir);
let dbStats = readFile(path.join(featDir, 'dashboard', 'components', 'DashboardStats.jsx'));
dbStats = transformFeatureImports(dbStats);
if (!dbStats.includes('DashboardStats.css')) dbStats = `import './DashboardStats.css';\n` + dbStats;
writeFile(path.join(dbStatsDir, 'DashboardStats.jsx'), dbStats);
writeFile(path.join(dbStatsDir, 'DashboardStats.css'), `/* DashboardStats styles */\n`);
writeFile(path.join(dbStatsDir, 'index.js'), `export { default } from './DashboardStats';\n`);
removeFile(path.join(featDir, 'dashboard', 'components', 'DashboardStats.jsx'));

writeFile(path.join(featDir, 'dashboard', 'index.js'), `export { default as DashboardPage } from './pages/Dashboard';\n`);

// 9b. Buttons
const btnPageDir = path.join(featDir, 'buttons', 'pages', 'ButtonsPage');
ensureDir(btnPageDir);
let btnPage = readFile(path.join(featDir, 'buttons', 'pages', 'ButtonsPage.jsx'));
btnPage = transformFeatureImports(btnPage);
btnPage = btnPage.replace(/from\s+["']\.\/ButtonDetails["']/g, 'from "../ButtonDetails"');
btnPage = btnPage.replace(/import\s+["']\.\/ButtonsPage\.css["'];?/g, "import './ButtonsPage.css';");
writeFile(path.join(btnPageDir, 'ButtonsPage.jsx'), btnPage);
if (fs.existsSync(path.join(featDir, 'buttons', 'pages', 'ButtonsPage.css'))) {
  fs.copyFileSync(path.join(featDir, 'buttons', 'pages', 'ButtonsPage.css'), path.join(btnPageDir, 'ButtonsPage.css'));
  removeFile(path.join(featDir, 'buttons', 'pages', 'ButtonsPage.css'));
}
writeFile(path.join(btnPageDir, 'index.js'), `export { default } from './ButtonsPage';\n`);
removeFile(path.join(featDir, 'buttons', 'pages', 'ButtonsPage.jsx'));

const btnDetDir = path.join(featDir, 'buttons', 'pages', 'ButtonDetails');
ensureDir(btnDetDir);
let btnDet = readFile(path.join(featDir, 'buttons', 'pages', 'ButtonDetails.jsx'));
btnDet = transformFeatureImports(btnDet);
btnDet = btnDet.replace(/import\s+["']\.\/ButtonDetails\.css["'];?/g, "import './ButtonDetails.css';");
writeFile(path.join(btnDetDir, 'ButtonDetails.jsx'), btnDet);
if (fs.existsSync(path.join(featDir, 'buttons', 'pages', 'ButtonDetails.css'))) {
  fs.copyFileSync(path.join(featDir, 'buttons', 'pages', 'ButtonDetails.css'), path.join(btnDetDir, 'ButtonDetails.css'));
  removeFile(path.join(featDir, 'buttons', 'pages', 'ButtonDetails.css'));
}
writeFile(path.join(btnDetDir, 'index.js'), `export { default } from './ButtonDetails';\n`);
removeFile(path.join(featDir, 'buttons', 'pages', 'ButtonDetails.jsx'));

const btnShowDir = path.join(featDir, 'buttons', 'components', 'ButtonShowcase');
ensureDir(btnShowDir);
let btnShow = readFile(path.join(featDir, 'buttons', 'components', 'ButtonShowcase.jsx'));
btnShow = transformFeatureImports(btnShow);
btnShow = btnShow.replace(/import\s+["']\.\/ButtonShowcase\.css["'];?/g, "import './ButtonShowcase.css';");
writeFile(path.join(btnShowDir, 'ButtonShowcase.jsx'), btnShow);
if (fs.existsSync(path.join(featDir, 'buttons', 'components', 'ButtonShowcase.css'))) {
  fs.copyFileSync(path.join(featDir, 'buttons', 'components', 'ButtonShowcase.css'), path.join(btnShowDir, 'ButtonShowcase.css'));
  removeFile(path.join(featDir, 'buttons', 'components', 'ButtonShowcase.css'));
}
writeFile(path.join(btnShowDir, 'index.js'), `export { default } from './ButtonShowcase';\n`);
removeFile(path.join(featDir, 'buttons', 'components', 'ButtonShowcase.jsx'));

writeFile(path.join(featDir, 'buttons', 'index.js'), `export { default as ButtonsPage } from './pages/ButtonsPage';\n`);

// 9c. Cards
const cardsPageDir = path.join(featDir, 'cards', 'pages', 'CardsPage');
ensureDir(cardsPageDir);
let cardsPage = readFile(path.join(featDir, 'cards', 'pages', 'CardsPage.jsx'));
cardsPage = transformFeatureImports(cardsPage);
cardsPage = cardsPage.replace(/from\s+["']\.\/CardDetails["']/g, 'from "../CardDetails"');
if (!cardsPage.includes('CardsPage.css')) cardsPage = `import './CardsPage.css';\n` + cardsPage;
writeFile(path.join(cardsPageDir, 'CardsPage.jsx'), cardsPage);
writeFile(path.join(cardsPageDir, 'CardsPage.css'), `/* CardsPage styles */\n`);
writeFile(path.join(cardsPageDir, 'index.js'), `export { default } from './CardsPage';\n`);
removeFile(path.join(featDir, 'cards', 'pages', 'CardsPage.jsx'));

const cardDetDir = path.join(featDir, 'cards', 'pages', 'CardDetails');
ensureDir(cardDetDir);
let cardDet = readFile(path.join(featDir, 'cards', 'pages', 'CardDetails.jsx'));
cardDet = transformFeatureImports(cardDet);
if (!cardDet.includes('CardDetails.css')) cardDet = `import './CardDetails.css';\n` + cardDet;
writeFile(path.join(cardDetDir, 'CardDetails.jsx'), cardDet);
writeFile(path.join(cardDetDir, 'CardDetails.css'), `/* CardDetails styles */\n`);
writeFile(path.join(cardDetDir, 'index.js'), `export { default } from './CardDetails';\n`);
removeFile(path.join(featDir, 'cards', 'pages', 'CardDetails.jsx'));

writeFile(path.join(featDir, 'cards', 'index.js'), `export { default as CardsPage } from './pages/CardsPage';\n`);

// 9d. Forms
const formsPageDir = path.join(featDir, 'forms', 'pages', 'FormsPage');
ensureDir(formsPageDir);
let formsPage = readFile(path.join(featDir, 'forms', 'pages', 'FormsPage.jsx'));
formsPage = transformFeatureImports(formsPage);
formsPage = formsPage.replace(/from\s+["']\.\/FormDetails["']/g, 'from "../FormDetails"');
formsPage = formsPage.replace(/import\s+["']\.\/FormsPage\.css["'];?/g, "import './FormsPage.css';");
writeFile(path.join(formsPageDir, 'FormsPage.jsx'), formsPage);
if (fs.existsSync(path.join(featDir, 'forms', 'pages', 'FormsPage.css'))) {
  fs.copyFileSync(path.join(featDir, 'forms', 'pages', 'FormsPage.css'), path.join(formsPageDir, 'FormsPage.css'));
  removeFile(path.join(featDir, 'forms', 'pages', 'FormsPage.css'));
}
writeFile(path.join(formsPageDir, 'index.js'), `export { default } from './FormsPage';\n`);
removeFile(path.join(featDir, 'forms', 'pages', 'FormsPage.jsx'));

const formDetDir = path.join(featDir, 'forms', 'pages', 'FormDetails');
ensureDir(formDetDir);
let formDet = readFile(path.join(featDir, 'forms', 'pages', 'FormDetails.jsx'));
formDet = transformFeatureImports(formDet);
formDet = formDet.replace(/import\s+["']\.\/FormDetails\.css["'];?/g, "import './FormDetails.css';");
writeFile(path.join(formDetDir, 'FormDetails.jsx'), formDet);
if (fs.existsSync(path.join(featDir, 'forms', 'pages', 'FormDetails.css'))) {
  fs.copyFileSync(path.join(featDir, 'forms', 'pages', 'FormDetails.css'), path.join(formDetDir, 'FormDetails.css'));
  removeFile(path.join(featDir, 'forms', 'pages', 'FormDetails.css'));
}
writeFile(path.join(formDetDir, 'index.js'), `export { default } from './FormDetails';\n`);
removeFile(path.join(featDir, 'forms', 'pages', 'FormDetails.jsx'));

const formFieldDir = path.join(featDir, 'forms', 'components', 'FormField');
ensureDir(formFieldDir);
let formField = readFile(path.join(featDir, 'forms', 'components', 'FormField.jsx'));
formField = transformFeatureImports(formField);
if (!formField.includes('FormField.css')) formField = `import './FormField.css';\n` + formField;
writeFile(path.join(formFieldDir, 'FormField.jsx'), formField);
writeFile(path.join(formFieldDir, 'FormField.css'), `/* FormField styles */\n`);
writeFile(path.join(formFieldDir, 'index.js'), `export { default } from './FormField';\n`);
removeFile(path.join(featDir, 'forms', 'components', 'FormField.jsx'));

const pwdFieldDir = path.join(featDir, 'forms', 'components', 'PasswordStrengthField');
ensureDir(pwdFieldDir);
let pwdField = readFile(path.join(featDir, 'forms', 'components', 'PasswordStrengthField.jsx'));
pwdField = transformFeatureImports(pwdField);
pwdField = pwdField.replace(/from\s+["']\.\/FormField["']/g, 'from "../FormField"');
if (!pwdField.includes('PasswordStrengthField.css')) pwdField = `import './PasswordStrengthField.css';\n` + pwdField;
writeFile(path.join(pwdFieldDir, 'PasswordStrengthField.jsx'), pwdField);
writeFile(path.join(pwdFieldDir, 'PasswordStrengthField.css'), `/* PasswordStrengthField styles */\n`);
writeFile(path.join(pwdFieldDir, 'index.js'), `export { default } from './PasswordStrengthField';\n`);
removeFile(path.join(featDir, 'forms', 'components', 'PasswordStrengthField.jsx'));

writeFile(path.join(featDir, 'forms', 'index.js'), `export { default as FormsPage } from './pages/FormsPage';\n`);

// 9e. Form Compositions
const fcPageDir = path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage');
ensureDir(fcPageDir);
let fcPage = readFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.jsx'));
fcPage = transformFeatureImports(fcPage);
fcPage = fcPage.replace(/import\s+["']\.\/FormCompositionsPage\.css["'];?/g, "import './FormCompositionsPage.css';");
writeFile(path.join(fcPageDir, 'FormCompositionsPage.jsx'), fcPage);
if (fs.existsSync(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.css'))) {
  fs.copyFileSync(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.css'), path.join(fcPageDir, 'FormCompositionsPage.css'));
  removeFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.css'));
}
writeFile(path.join(fcPageDir, 'index.js'), `export { default } from './FormCompositionsPage';\n`);
removeFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionsPage.jsx'));

const fcDetDir = path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails');
ensureDir(fcDetDir);
let fcDet = readFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.jsx'));
fcDet = transformFeatureImports(fcDet);
fcDet = fcDet.replace(/import\s+["']\.\/FormCompositionDetails\.css["'];?/g, "import './FormCompositionDetails.css';");
writeFile(path.join(fcDetDir, 'FormCompositionDetails.jsx'), fcDet);
if (fs.existsSync(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.css'))) {
  fs.copyFileSync(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.css'), path.join(fcDetDir, 'FormCompositionDetails.css'));
  removeFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.css'));
}
writeFile(path.join(fcDetDir, 'index.js'), `export { default } from './FormCompositionDetails';\n`);
removeFile(path.join(featDir, 'form-compositions', 'pages', 'FormCompositionDetails.jsx'));

const createProjDir = path.join(featDir, 'form-compositions', 'components', 'CreateProjectForm');
ensureDir(createProjDir);
let createProj = readFile(path.join(featDir, 'form-compositions', 'components', 'CreateProjectForm.jsx'));
createProj = transformFeatureImports(createProj);
if (!createProj.includes('CreateProjectForm.css')) createProj = `import './CreateProjectForm.css';\n` + createProj;
writeFile(path.join(createProjDir, 'CreateProjectForm.jsx'), createProj);
writeFile(path.join(createProjDir, 'CreateProjectForm.css'), `/* CreateProjectForm styles */\n`);
writeFile(path.join(createProjDir, 'index.js'), `export { default, CreateProjectForm } from './CreateProjectForm';\n`);
removeFile(path.join(featDir, 'form-compositions', 'components', 'CreateProjectForm.jsx'));

writeFile(path.join(featDir, 'form-compositions', 'index.js'), `export { default as FormCompositionsPage } from './pages/FormCompositionsPage';\n`);

// 9f. Notifications
const notifPageDir = path.join(featDir, 'notifications', 'pages', 'NotificationsPage');
ensureDir(notifPageDir);
let notifPage = readFile(path.join(featDir, 'notifications', 'pages', 'NotificationsPage.jsx'));
notifPage = transformFeatureImports(notifPage);
notifPage = notifPage.replace(/from\s+["']\.\/NotificationDetails["']/g, 'from "../NotificationDetails"');
notifPage = notifPage.replace(/import\s+["']\.\/NotificationsPage\.css["'];?/g, "import './NotificationsPage.css';");
writeFile(path.join(notifPageDir, 'NotificationsPage.jsx'), notifPage);
if (fs.existsSync(path.join(featDir, 'notifications', 'pages', 'NotificationsPage.css'))) {
  fs.copyFileSync(path.join(featDir, 'notifications', 'pages', 'NotificationsPage.css'), path.join(notifPageDir, 'NotificationsPage.css'));
  removeFile(path.join(featDir, 'notifications', 'pages', 'NotificationsPage.css'));
}
writeFile(path.join(notifPageDir, 'index.js'), `export { default } from './NotificationsPage';\n`);
removeFile(path.join(featDir, 'notifications', 'pages', 'NotificationsPage.jsx'));

const notifDetDir = path.join(featDir, 'notifications', 'pages', 'NotificationDetails');
ensureDir(notifDetDir);
let notifDet = readFile(path.join(featDir, 'notifications', 'pages', 'NotificationDetails.jsx'));
notifDet = transformFeatureImports(notifDet);
if (!notifDet.includes('NotificationDetails.css')) notifDet = `import './NotificationDetails.css';\n` + notifDet;
writeFile(path.join(notifDetDir, 'NotificationDetails.jsx'), notifDet);
writeFile(path.join(notifDetDir, 'NotificationDetails.css'), `/* NotificationDetails styles */\n`);
writeFile(path.join(notifDetDir, 'index.js'), `export { default } from './NotificationDetails';\n`);
removeFile(path.join(featDir, 'notifications', 'pages', 'NotificationDetails.jsx'));

writeFile(path.join(featDir, 'notifications', 'index.js'), `export { default as NotificationsPage } from './pages/NotificationsPage';\n`);

// 9g. Data-display
const ddPageDir = path.join(featDir, 'data-display', 'pages', 'DataDisplayPage');
ensureDir(ddPageDir);
let ddPage = readFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.jsx'));
ddPage = transformFeatureImports(ddPage);
ddPage = ddPage.replace(/from\s+["']\.\/DataDisplayDetails["']/g, 'from "../DataDisplayDetails"');
ddPage = ddPage.replace(/import\s+["']\.\/DataDisplayPage\.css["'];?/g, "import './DataDisplayPage.css';");
writeFile(path.join(ddPageDir, 'DataDisplayPage.jsx'), ddPage);
if (fs.existsSync(path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.css'))) {
  fs.copyFileSync(path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.css'), path.join(ddPageDir, 'DataDisplayPage.css'));
  removeFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.css'));
}
writeFile(path.join(ddPageDir, 'index.js'), `export { default } from './DataDisplayPage';\n`);
removeFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayPage.jsx'));

const ddDetDir = path.join(featDir, 'data-display', 'pages', 'DataDisplayDetails');
ensureDir(ddDetDir);
let ddDet = readFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayDetails.jsx'));
ddDet = transformFeatureImports(ddDet);
if (!ddDet.includes('DataDisplayDetails.css')) ddDet = `import './DataDisplayDetails.css';\n` + ddDet;
writeFile(path.join(ddDetDir, 'DataDisplayDetails.jsx'), ddDet);
writeFile(path.join(ddDetDir, 'DataDisplayDetails.css'), `/* DataDisplayDetails styles */\n`);
writeFile(path.join(ddDetDir, 'index.js'), `export { default } from './DataDisplayDetails';\n`);
removeFile(path.join(featDir, 'data-display', 'pages', 'DataDisplayDetails.jsx'));

writeFile(path.join(featDir, 'data-display', 'index.js'), `export { default as DataDisplayPage } from './pages/DataDisplayPage';\n`);

// 9h. Sync
const syncPageDir = path.join(featDir, 'sync', 'pages', 'SyncPage');
ensureDir(syncPageDir);
let syncPage = readFile(path.join(featDir, 'sync', 'pages', 'SyncPage.jsx'));
syncPage = transformFeatureImports(syncPage);
if (!syncPage.includes('SyncPage.css')) syncPage = `import './SyncPage.css';\n` + syncPage;
writeFile(path.join(syncPageDir, 'SyncPage.jsx'), syncPage);
writeFile(path.join(syncPageDir, 'SyncPage.css'), `/* SyncPage styles */\n`);
writeFile(path.join(syncPageDir, 'index.js'), `export { default } from './SyncPage';\n`);
removeFile(path.join(featDir, 'sync', 'pages', 'SyncPage.jsx'));

const syncBannerDir = path.join(featDir, 'sync', 'components', 'SyncBanner');
ensureDir(syncBannerDir);
let syncBanner = readFile(path.join(featDir, 'sync', 'components', 'SyncBanner.jsx'));
syncBanner = transformFeatureImports(syncBanner);
if (!syncBanner.includes('SyncBanner.css')) syncBanner = `import './SyncBanner.css';\n` + syncBanner;
writeFile(path.join(syncBannerDir, 'SyncBanner.jsx'), syncBanner);
writeFile(path.join(syncBannerDir, 'SyncBanner.css'), `/* SyncBanner styles */\n`);
writeFile(path.join(syncBannerDir, 'index.js'), `export { default } from './SyncBanner';\n`);
removeFile(path.join(featDir, 'sync', 'components', 'SyncBanner.jsx'));

writeFile(path.join(featDir, 'sync', 'index.js'), `export { default as SyncPage } from './pages/SyncPage';\n`);

// 9i. Shared Feature Components (AddToProjectModal, ComponentDetailsShell, etc.)
const sharedFeatDir = path.join(featDir, 'shared');
const sharedComponents = [
  'AddToProjectModal', 'ComponentDetailsShell', 'ComponentsNavigation',
  'ComponentsSection', 'TemplatesSection'
];

for (const comp of sharedComponents) {
  const compDir = path.join(sharedFeatDir, comp);
  ensureDir(compDir);
  const srcJsx = path.join(sharedFeatDir, `${comp}.jsx`);
  if (fs.existsSync(srcJsx)) {
    let content = readFile(srcJsx);
    content = transformFeatureImports(content);
    if (!content.includes(`${comp}.css`)) {
      content = `import './${comp}.css';\n` + content;
    }
    writeFile(path.join(compDir, `${comp}.jsx`), content);
    const srcCss = path.join(sharedFeatDir, `${comp}.css`);
    if (fs.existsSync(srcCss)) {
      fs.copyFileSync(srcCss, path.join(compDir, `${comp}.css`));
      removeFile(srcCss);
    } else {
      writeFile(path.join(compDir, `${comp}.css`), `/* ${comp} styles */\n`);
    }
    writeFile(path.join(compDir, 'index.js'), `export { default } from './${comp}';\n`);
    removeFile(srcJsx);
  }
}

// Master features barrel
const featuresBarrel = `export * from './dashboard';
export * from './buttons';
export * from './cards';
export * from './forms';
export * from './form-compositions';
export * from './notifications';
export * from './data-display';
export * from './sync';
`;
writeFile(path.join(featDir, 'index.js'), featuresBarrel);


// ============================================================================
// 10. SERVICES, CONTEXT, HOOKS, UTILS, CONSTANTS
// ============================================================================
console.log('\n[10/12] Organizing Services, Context, Hooks, Utils, Constants ...');

// Services (services/supabase/client, components, projects, sync)
const supDir = path.join(srcDir, 'services', 'supabase');

// client
const scDir = path.join(supDir, 'client');
ensureDir(scDir);
if (fs.existsSync(path.join(supDir, 'client.js'))) {
  fs.copyFileSync(path.join(supDir, 'client.js'), path.join(scDir, 'client.js'));
  writeFile(path.join(scDir, 'index.js'), `export * from './client';\nexport { supabase } from './client';\n`);
  removeFile(path.join(supDir, 'client.js'));
}

// components
const scompDir = path.join(supDir, 'components');
ensureDir(scompDir);
if (fs.existsSync(path.join(supDir, 'components.service.js'))) {
  let content = readFile(path.join(supDir, 'components.service.js'));
  content = content.replace(/from\s+["']\.\/client["']/g, 'from "../client"');
  writeFile(path.join(scompDir, 'components.service.js'), content);
  writeFile(path.join(scompDir, 'index.js'), `export * from './components.service';\n`);
  removeFile(path.join(supDir, 'components.service.js'));
}

// projects
const sprojDir = path.join(supDir, 'projects');
ensureDir(sprojDir);
if (fs.existsSync(path.join(supDir, 'projects.service.js'))) {
  let content = readFile(path.join(supDir, 'projects.service.js'));
  content = content.replace(/from\s+["']\.\/client["']/g, 'from "../client"');
  writeFile(path.join(sprojDir, 'projects.service.js'), content);
  writeFile(path.join(sprojDir, 'index.js'), `export * from './projects.service';\n`);
  removeFile(path.join(supDir, 'projects.service.js'));
}

// sync
const ssyncDir = path.join(supDir, 'sync');
ensureDir(ssyncDir);
if (fs.existsSync(path.join(supDir, 'sync.service.js'))) {
  let content = readFile(path.join(supDir, 'sync.service.js'));
  content = content.replace(/from\s+["']\.\/client["']/g, 'from "../client"');
  writeFile(path.join(ssyncDir, 'sync.service.js'), content);
  writeFile(path.join(ssyncDir, 'index.js'), `export * from './sync.service';\n`);
  removeFile(path.join(supDir, 'sync.service.js'));
}

// Context: context/ThemeContext
const tcDir = path.join(srcDir, 'context', 'ThemeContext');
ensureDir(tcDir);
if (fs.existsSync(path.join(srcDir, 'context', 'ThemeContext.jsx'))) {
  let tcContent = readFile(path.join(srcDir, 'context', 'ThemeContext.jsx'));
  if (!tcContent.includes('ThemeContext.css')) {
    tcContent = `import './ThemeContext.css';\n` + tcContent;
  }
  writeFile(path.join(tcDir, 'ThemeContext.jsx'), tcContent);
  writeFile(path.join(tcDir, 'ThemeContext.css'), `/* ThemeContext styles */\n`);
  writeFile(path.join(tcDir, 'index.js'), `export * from './ThemeContext';\nexport { ThemeProvider, useTheme } from './ThemeContext';\n`);
  removeFile(path.join(srcDir, 'context', 'ThemeContext.jsx'));
}

// Hooks: hooks/useTheme
const utDir = path.join(srcDir, 'hooks', 'useTheme');
ensureDir(utDir);
if (fs.existsSync(path.join(srcDir, 'hooks', 'useTheme.js'))) {
  fs.copyFileSync(path.join(srcDir, 'hooks', 'useTheme.js'), path.join(utDir, 'useTheme.js'));
  writeFile(path.join(utDir, 'index.js'), `export { default, useTheme } from './useTheme';\n`);
  removeFile(path.join(srcDir, 'hooks', 'useTheme.js'));
}

// Utils: fieldAdapter, installContract, formatters, validators
const utilsDir = path.join(srcDir, 'utils');

// fieldAdapter
const faDir = path.join(utilsDir, 'fieldAdapter');
ensureDir(faDir);
if (fs.existsSync(path.join(utilsDir, 'fieldAdapter.js'))) {
  let faContent = readFile(path.join(utilsDir, 'fieldAdapter.js'));
  faContent = faContent.replace(/@\/components\/ui\/forms/g, '@/components/forms');
  writeFile(path.join(faDir, 'fieldAdapter.js'), faContent);
  writeFile(path.join(faDir, 'index.js'), `export { default } from './fieldAdapter';\n`);
  removeFile(path.join(utilsDir, 'fieldAdapter.js'));
}

// installContract
const icDir = path.join(utilsDir, 'installContract');
ensureDir(icDir);
if (fs.existsSync(path.join(utilsDir, 'installContract.js'))) {
  fs.copyFileSync(path.join(utilsDir, 'installContract.js'), path.join(icDir, 'installContract.js'));
  writeFile(path.join(icDir, 'index.js'), `export * from './installContract';\n`);
  removeFile(path.join(utilsDir, 'installContract.js'));
}

// formatters
const fmtDir = path.join(utilsDir, 'formatters');
ensureDir(fmtDir);
const formattersJs = `export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
`;
writeFile(path.join(fmtDir, 'formatters.js'), formattersJs);
writeFile(path.join(fmtDir, 'index.js'), `export * from './formatters';\n`);

// validators
const valDir = path.join(utilsDir, 'validators');
ensureDir(valDir);
const validatorsJs = `export function isEmail(val) {
  return /^\\S+@\\S+\\.\\S+$/.test(val);
}

export function isRequired(val) {
  return val !== null && val !== undefined && String(val).trim() !== '';
}
`;
writeFile(path.join(valDir, 'validators.js'), validatorsJs);
writeFile(path.join(valDir, 'index.js'), `export * from './validators';\n`);

// Constants: routes, componentTypes, appConstants
const constDir = path.join(srcDir, 'constants');

const rConstDir = path.join(constDir, 'routes');
ensureDir(rConstDir);
if (fs.existsSync(path.join(constDir, 'routes.js'))) {
  fs.copyFileSync(path.join(constDir, 'routes.js'), path.join(rConstDir, 'routes.js'));
  writeFile(path.join(rConstDir, 'index.js'), `export * from './routes';\n`);
  removeFile(path.join(constDir, 'routes.js'));
}

const ctConstDir = path.join(constDir, 'componentTypes');
ensureDir(ctConstDir);
if (fs.existsSync(path.join(constDir, 'componentTypes.js'))) {
  fs.copyFileSync(path.join(constDir, 'componentTypes.js'), path.join(ctConstDir, 'componentTypes.js'));
  writeFile(path.join(ctConstDir, 'index.js'), `export * from './componentTypes';\n`);
  removeFile(path.join(constDir, 'componentTypes.js'));
}

const acConstDir = path.join(constDir, 'appConstants');
ensureDir(acConstDir);
if (fs.existsSync(path.join(constDir, 'appConstants.js'))) {
  fs.copyFileSync(path.join(constDir, 'appConstants.js'), path.join(acConstDir, 'appConstants.js'));
  writeFile(path.join(acConstDir, 'index.js'), `export * from './appConstants';\n`);
  removeFile(path.join(constDir, 'appConstants.js'));
}


// ============================================================================
// 11. CODE REGISTRY (src/codeRegistry/)
// ============================================================================
console.log('\n[11/12] Updating codeRegistry imports to @/components/...');

const regDir = path.join(srcDir, 'codeRegistry');

function updateRegistryFileImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      updateRegistryFileImports(full);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      let content = readFile(full);
      content = content.replace(/@\/components\/ui\/buttons/g, '@/components/buttons');
      content = content.replace(/@\/components\/ui\/cards/g, '@/components/cards');
      content = content.replace(/@\/components\/ui\/forms/g, '@/components/forms');
      content = content.replace(/@\/components\/ui\/data-display/g, '@/components/data-display');
      content = content.replace(/@\/components\/ui\/feedback/g, '@/components/feedback');
      content = content.replace(/@\/components\/shared/g, '@/components/common');
      content = content.replace(/"components\/ui\/buttons/g, '"components/buttons');
      content = content.replace(/"components\/ui\/cards/g, '"components/cards');
      content = content.replace(/"components\/ui\/forms/g, '"components/forms');
      content = content.replace(/"components\/ui\/data-display/g, '"components/data-display');
      content = content.replace(/"components\/ui\/feedback/g, '"components/feedback');
      writeFile(full, content);
    }
  }
}
updateRegistryFileImports(regDir);


// ============================================================================
// 12. CLEANUP OBSOLETE DIRECTORIES
// ============================================================================
console.log('\n[12/12] Purging legacy directories ...');

removeDir(path.join(srcDir, 'components', 'atoms'));
removeDir(path.join(srcDir, 'components', 'molecules'));
removeDir(path.join(srcDir, 'components', 'organisms'));
removeDir(path.join(srcDir, 'components', 'ui'));
removeDir(path.join(srcDir, 'components', 'shared'));
removeDir(path.join(srcDir, 'pages'));
removeDir(path.join(srcDir, 'registry'));
removeDir(path.join(srcDir, 'lib'));

console.log('\n=== Modular Refactor Successfully Completed! ===\n');
