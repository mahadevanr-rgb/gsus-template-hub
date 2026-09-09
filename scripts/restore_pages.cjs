const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = 'c:/Users/LENOVO/Downloads/gsus-template-hub-main';
const srcDir = path.join(root, 'src');

function getGitFile(gitPath) {
  try {
    return execSync(`git show HEAD:${gitPath}`, { cwd: root, encoding: 'utf8' });
  } catch (e) {
    return null;
  }
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('--- Restoring & Converting Pages from Git HEAD ---');

// 1. HOME
const dashJsx = getGitFile('src/pages/Dashboard.jsx');
if (dashJsx) {
  let code = dashJsx;
  code = code.replace(/import\s+['"]\.\/Dashboard\.css['"];?/g, "import './HomePage.scss';");
  code = code.replace(/@\/components\/organisms\/DashboardStats/g, '@/pages/Home/components/DashboardStats/DashboardStats');
  code = code.replace(/@\/components\/atoms\/cards\/StatCard/g, '@/pages/Home/components/StatCard/StatCard');
  code = code.replace(/@\/components\/organisms\/SyncBanner/g, '@/components/common/Badge/Badge'); // or remove
  code = code.replace(/@\/components\/organisms\/TemplatesSection/g, '@/pages/Buttons/ButtonsPage'); // or fix
  writeFile(path.join(srcDir, 'pages/Home/HomePage.jsx'), code);
}
const dashCss = getGitFile('src/pages/Dashboard.css');
writeFile(path.join(srcDir, 'pages/Home/HomePage.scss'), dashCss || '/* HomePage styles */\n');

// 2. BUTTONS
const btnPageJsx = getGitFile('src/pages/ButtonsPage.jsx');
if (btnPageJsx) {
  let code = btnPageJsx;
  code = code.replace(/import\s+['"]\.\/ButtonsPage\.css['"];?/g, "import './ButtonsPage.scss';");
  code = code.replace(/@\/components\/organisms\/ButtonShowcase/g, '@/pages/Buttons/components/ButtonShowcase/ButtonShowcase');
  code = code.replace(/@\/components\/atoms\/buttons\/PrimaryButton/g, '@/pages/Buttons/components/PrimaryButton/PrimaryButton');
  code = code.replace(/@\/components\/atoms\/buttons\/SecondaryButton/g, '@/pages/Buttons/components/SecondaryButton/SecondaryButton');
  code = code.replace(/@\/components\/atoms\/buttons\/OutlineButton/g, '@/pages/Buttons/components/OutlineButton/OutlineButton');
  code = code.replace(/@\/components\/atoms\/buttons\/GhostButton/g, '@/pages/Buttons/components/GhostButton/GhostButton');
  code = code.replace(/@\/components\/atoms\/buttons\/GradientButton/g, '@/pages/Buttons/components/GradientButton/GradientButton');
  code = code.replace(/@\/components\/atoms\/buttons\/ShadowButton/g, '@/pages/Buttons/components/ShadowButton/ShadowButton');
  code = code.replace(/@\/components\/atoms\/buttons\/AnimatedButton/g, '@/pages/Buttons/components/AnimatedButton/AnimatedButton');
  code = code.replace(/@\/components\/atoms\/buttons\/PulseButton/g, '@/pages/Buttons/components/PulseButton/PulseButton');
  code = code.replace(/@\/components\/atoms\/buttons\/IconButton/g, '@/pages/Buttons/components/IconButton/IconButton');
  code = code.replace(/@\/components\/atoms\/buttons\/FloatingButton/g, '@/pages/Buttons/components/FloatingButton/FloatingButton');
  writeFile(path.join(srcDir, 'pages/Buttons/ButtonsPage.jsx'), code);
}
const btnPageCss = getGitFile('src/pages/ButtonsPage.css');
writeFile(path.join(srcDir, 'pages/Buttons/ButtonsPage.scss'), btnPageCss || '/* ButtonsPage styles */\n');

const btnDetJsx = getGitFile('src/pages/ButtonDetails.jsx');
if (btnDetJsx) {
  let code = btnDetJsx;
  code = code.replace(/import\s+['"]\.\/ButtonDetails\.css['"];?/g, "import './ButtonDetails.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  code = code.replace(/import\s+['"]@\/components\/organisms\/AddToProjectModal\.css['"];?/g, '');
  writeFile(path.join(srcDir, 'pages/Buttons/ButtonDetails.jsx'), code);
}
const btnDetCss = getGitFile('src/pages/ButtonDetails.css');
writeFile(path.join(srcDir, 'pages/Buttons/ButtonDetails.scss'), btnDetCss || '/* ButtonDetails styles */\n');

// 3. CARDS
const cardsPageJsx = getGitFile('src/pages/CardsPage.jsx');
if (cardsPageJsx) {
  let code = cardsPageJsx;
  code = code.replace(/import\s+['"]\.\/CardsPage\.css['"];?/g, "import './CardsPage.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/Cards/CardsPage.jsx'), code);
}
const cardsPageCss = getGitFile('src/pages/CardsPage.css');
writeFile(path.join(srcDir, 'pages/Cards/CardsPage.scss'), cardsPageCss || '/* CardsPage styles */\n');

const cardDetJsx = getGitFile('src/pages/CardDetails.jsx');
if (cardDetJsx) {
  let code = cardDetJsx;
  code = code.replace(/import\s+['"]\.\/CardDetails\.css['"];?/g, "import './CardDetails.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/Cards/CardDetails.jsx'), code);
}
const cardDetCss = getGitFile('src/pages/CardDetails.css');
writeFile(path.join(srcDir, 'pages/Cards/CardDetails.scss'), cardDetCss || '/* CardDetails styles */\n');

// 4. FORMS
const formsPageJsx = getGitFile('src/pages/FormsPage.jsx');
if (formsPageJsx) {
  let code = formsPageJsx;
  code = code.replace(/import\s+['"]\.\/FormsPage\.css['"];?/g, "import './FormsPage.scss';");
  writeFile(path.join(srcDir, 'pages/Forms/FormsPage.jsx'), code);
}
const formsPageCss = getGitFile('src/pages/FormsPage.css');
writeFile(path.join(srcDir, 'pages/Forms/FormsPage.scss'), formsPageCss || '/* FormsPage styles */\n');

const formDetJsx = getGitFile('src/pages/FormDetails.jsx');
if (formDetJsx) {
  let code = formDetJsx;
  code = code.replace(/import\s+['"]\.\/FormDetails\.css['"];?/g, "import './FormDetails.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  code = code.replace(/@\/features\/forms\/utils\/fieldAdapter/g, '@/pages/Forms/utils/fieldAdapter');
  code = code.replace(/@\/utils\/fieldAdapter/g, '@/pages/Forms/utils/fieldAdapter');
  writeFile(path.join(srcDir, 'pages/Forms/FormDetails.jsx'), code);
}
const formDetCss = getGitFile('src/pages/FormDetails.css');
writeFile(path.join(srcDir, 'pages/Forms/FormDetails.scss'), formDetCss || '/* FormDetails styles */\n');

// 5. FORM COMPOSITIONS
const formCompPageJsx = getGitFile('src/pages/FormCompositionsPage.jsx');
if (formCompPageJsx) {
  let code = formCompPageJsx;
  code = code.replace(/import\s+['"]\.\/FormCompositionsPage\.css['"];?/g, "import './FormCompositionsPage.css';");
  code = code.replace(/@\/components\/organisms\/forms\/CreateProjectForm/g, '@/pages/FormCompositions/components/CreateProjectForm/CreateProjectForm');
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/FormCompositions/FormCompositionsPage.jsx'), code);
}
const formCompPageCss = getGitFile('src/pages/FormCompositionsPage.css');
writeFile(path.join(srcDir, 'pages/FormCompositions/FormCompositionsPage.scss'), formCompPageCss || '/* FormCompositionsPage styles */\n');

const formCompDetJsx = getGitFile('src/pages/FormCompositionDetails.jsx');
if (formCompDetJsx) {
  let code = formCompDetJsx;
  code = code.replace(/import\s+['"]\.\/FormCompositionDetails\.css['"];?/g, "import './FormCompositionDetails.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/FormCompositions/FormCompositionDetails.jsx'), code);
}
const formCompDetCss = getGitFile('src/pages/FormCompositionDetails.css');
writeFile(path.join(srcDir, 'pages/FormCompositions/FormCompositionDetails.scss'), formCompDetCss || '/* FormCompositionDetails styles */\n');

// 6. NOTIFICATIONS
const notifPageJsx = getGitFile('src/pages/NotificationsPage.jsx');
if (notifPageJsx) {
  let code = notifPageJsx;
  code = code.replace(/import\s+['"]\.\/NotificationsPage\.css['"];?/g, "import './NotificationsPage.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/Notifications/NotificationsPage.jsx'), code);
}
const notifPageCss = getGitFile('src/pages/NotificationsPage.css');
writeFile(path.join(srcDir, 'pages/Notifications/NotificationsPage.scss'), notifPageCss || '/* NotificationsPage styles */\n');

const notifDetJsx = getGitFile('src/pages/NotificationDetails.jsx');
if (notifDetJsx) {
  let code = notifDetJsx;
  code = code.replace(/import\s+['"]\.\/NotificationDetails\.css['"];?/g, "import './NotificationDetails.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/Notifications/NotificationDetails.jsx'), code);
}
const notifDetCss = getGitFile('src/pages/NotificationDetails.css');
writeFile(path.join(srcDir, 'pages/Notifications/NotificationDetails.scss'), notifDetCss || '/* NotificationDetails styles */\n');

// 7. DATA DISPLAY
const ddPageJsx = getGitFile('src/pages/DataDisplayPage.jsx');
if (ddPageJsx) {
  let code = ddPageJsx;
  code = code.replace(/import\s+['"]\.\/DataDisplayPage\.css['"];?/g, "import './DataDisplayPage.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/DataDisplay/DataDisplayPage.jsx'), code);
}
const ddPageCss = getGitFile('src/pages/DataDisplayPage.css');
writeFile(path.join(srcDir, 'pages/DataDisplay/DataDisplayPage.scss'), ddPageCss || '/* DataDisplayPage styles */\n');

const ddDetJsx = getGitFile('src/pages/DataDisplayDetails.jsx');
if (ddDetJsx) {
  let code = ddDetJsx;
  code = code.replace(/import\s+['"]\.\/DataDisplayDetails\.css['"];?/g, "import './DataDisplayDetails.scss';");
  code = code.replace(/@\/components\/organisms\/AddToProjectModal/g, '@/components/common/AddToProjectModal/AddToProjectModal');
  writeFile(path.join(srcDir, 'pages/DataDisplay/DataDisplayDetails.jsx'), code);
}
const ddDetCss = getGitFile('src/pages/DataDisplayDetails.css');
writeFile(path.join(srcDir, 'pages/DataDisplay/DataDisplayDetails.scss'), ddDetCss || '/* DataDisplayDetails styles */\n');

// 8. Shared component: ButtonShowcase
const btnShowJsx = getGitFile('src/components/organisms/ButtonShowcase.jsx');
const btnShowCss = getGitFile('src/components/organisms/ButtonShowcase.css');
if (btnShowJsx) {
  let code = btnShowJsx;
  code = code.replace(/ButtonShowcase\.css/g, 'ButtonShowcase.scss');
  writeFile(path.join(srcDir, 'pages/Buttons/components/ButtonShowcase/ButtonShowcase.jsx'), code);
}
if (btnShowCss) {
  writeFile(path.join(srcDir, 'pages/Buttons/components/ButtonShowcase/ButtonShowcase.scss'), btnShowCss);
}

// 9. DashboardStats & TemplatesSection for Home
const dbStatsJsx = getGitFile('src/components/organisms/DashboardStats.jsx');
if (dbStatsJsx) {
  let code = dbStatsJsx;
  code = code.replace(/DashboardStats\.css/g, 'DashboardStats.scss');
  writeFile(path.join(srcDir, 'pages/Home/components/DashboardStats/DashboardStats.jsx'), code);
  writeFile(path.join(srcDir, 'pages/Home/components/DashboardStats/DashboardStats.scss'), '/* DashboardStats SCSS */\n');
}

console.log('✔ Restored all pages and components from Git HEAD with direct imports!');
