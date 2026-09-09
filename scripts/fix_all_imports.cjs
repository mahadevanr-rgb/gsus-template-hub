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

// Ensure form components directory has both alias names if needed (e.g., DateInput -> DatePicker, RadioButton -> RadioGroup, etc.)
function createComponentAlias(targetDir, aliasName, sourceName) {
  const aliasPath = path.join(targetDir, aliasName);
  const sourcePath = path.join(targetDir, sourceName);
  if (fs.existsSync(sourcePath) && !fs.existsSync(aliasPath)) {
    fs.mkdirSync(aliasPath, { recursive: true });
    let sourceJsx = path.join(sourcePath, `${sourceName}.jsx`);
    if (fs.existsSync(sourceJsx)) {
      let code = fs.readFileSync(sourceJsx, 'utf8');
      code = code.replace(new RegExp(`${sourceName}\\.scss`, 'g'), `${aliasName}.scss`);
      fs.writeFileSync(path.join(aliasPath, `${aliasName}.jsx`), code);
      fs.writeFileSync(path.join(aliasPath, `${aliasName}.scss`), `/* ${aliasName} styles */\n`);
    }
  }
}

const formsCompDir = path.join(srcDir, 'pages/Forms/components');
// Aliases for form components if referenced by either name
createComponentAlias(formsCompDir, 'DateInput', 'DatePicker');
createComponentAlias(formsCompDir, 'DatePicker', 'DateInput');
createComponentAlias(formsCompDir, 'RadioButton', 'RadioGroup');
createComponentAlias(formsCompDir, 'RadioGroup', 'RadioButton');
createComponentAlias(formsCompDir, 'SelectDropdown', 'Select');
createComponentAlias(formsCompDir, 'Select', 'SelectDropdown');
createComponentAlias(formsCompDir, 'HelperText', 'FormField');
createComponentAlias(formsCompDir, 'InputError', 'FormField');
createComponentAlias(formsCompDir, 'InputLabel', 'FormField');
createComponentAlias(formsCompDir, 'OTPInput', 'OtpInput');
createComponentAlias(formsCompDir, 'OtpInput', 'OTPInput');

const notifCompDir = path.join(srcDir, 'pages/Notifications/components');
createComponentAlias(notifCompDir, 'NotificationBadge', 'Alert');
createComponentAlias(notifCompDir, 'NotificationCard', 'Alert');
createComponentAlias(notifCompDir, 'StatusDot', 'Alert');

const allFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx'));

allFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  let original = code;

  // Fix MainLayout relative imports
  code = code.replace(/import\s+MainLayout\s+from\s+['"](?:\.\.\/)+components\/layout\/MainLayout['"];?/g, "import MainLayout from '@/components/layout/MainLayout/MainLayout';");
  code = code.replace(/@\/components\/layout\/MainLayout(?!\/MainLayout)/g, '@/components/layout/MainLayout/MainLayout');

  // Fix AddToProjectModal
  code = code.replace(/import\s+AddToProjectModal\s+from\s+['"](?:\.\.\/)+components\/organisms\/AddToProjectModal['"];?/g, "import AddToProjectModal from '@/components/common/AddToProjectModal/AddToProjectModal';");
  code = code.replace(/import\s+['"](?:\.\.\/)+components\/organisms\/AddToProjectModal\.css['"];?/g, '');
  code = code.replace(/import\s+['"]\.\/FormDetails\.css['"];?/g, "import './NotificationDetails.scss';");

  // Fix Notifications relative imports
  const notifs = ['Toast', 'Alert', 'Banner', 'Snackbar', 'NotificationCard', 'NotificationBadge', 'StatusDot', 'ProgressNotification', 'ConfirmDialog', 'InlineMessage', 'NotificationItem', 'NotificationList'];
  notifs.forEach(n => {
    const reg1 = new RegExp(`['"](?:\\.\\.\/)+components\/atoms\/notifications\/${n}['"]`, 'g');
    code = code.replace(reg1, `'@/pages/Notifications/components/${n}/${n}'`);
  });

  // Fix Buttons relative imports
  const buttons = ['PrimaryButton', 'SecondaryButton', 'OutlineButton', 'GhostButton', 'GradientButton', 'ShadowButton', 'AnimatedButton', 'PulseButton', 'IconButton', 'FloatingButton', 'ButtonShowcase'];
  buttons.forEach(b => {
    const reg1 = new RegExp(`['"](?:\\.\\.\/)+components\/atoms\/buttons\/${b}['"]`, 'g');
    const reg2 = new RegExp(`['"](?:\\.\\.\/)+components\/organisms\/${b}['"]`, 'g');
    const reg3 = new RegExp(`['"](?:\\.\\.\/)+components\/${b}['"]`, 'g');
    code = code.replace(reg1, `'@/pages/Buttons/components/${b}/${b}'`);
    code = code.replace(reg2, `'@/pages/Buttons/components/${b}/${b}'`);
    code = code.replace(reg3, `'@/pages/Buttons/components/${b}/${b}'`);
  });

  // Fix Cards relative imports
  const cards = [
    'PricingCard', 'ProfileCard', 'AnalyticsCard', 'MetricCard', 'StatsCard',
    'FeatureCard', 'BlogCard', 'NewsCard', 'ArticleCard', 'ProductCard',
    'EcommerceCard', 'CourseCard', 'JobCard', 'EventCard', 'TestimonialCard',
    'ReviewCard', 'FeedbackCard', 'SocialCard', 'MediaCard', 'VideoCard',
    'PaymentCard', 'InvoiceCard', 'BillingCard', 'UserCard', 'ContactCard',
    'AppointmentCard', 'ComparisonCard', 'RecommendationCard', 'ServiceCard',
    'TeamCard', 'StatusCard', 'SubscriptionCard', 'TaskCard', 'TransactionCard', 'PhotoProfileCard'
  ];
  cards.forEach(c => {
    const reg1 = new RegExp(`['"](?:\\.\\.\/)+components\/atoms\/cards\/${c}['"]`, 'g');
    const reg2 = new RegExp(`['"](?:\\.\\.\/)+components\/ui\/cards\/${c}['"]`, 'g');
    const reg3 = new RegExp(`['"](?:\\.\\.\/)+components\/cards\/${c}['"]`, 'g');
    code = code.replace(reg1, `'@/pages/Cards/components/${c}/${c}'`);
    code = code.replace(reg2, `'@/pages/Cards/components/${c}/${c}'`);
    code = code.replace(reg3, `'@/pages/Cards/components/${c}/${c}'`);
  });

  // Fix Forms relative imports
  const forms = [
    'TextInput', 'PasswordInput', 'EmailInput', 'NumberInput', 'Textarea',
    'SelectDropdown', 'Select', 'MultiSelect', 'Checkbox', 'RadioButton', 'RadioGroup', 'SwitchToggle',
    'DatePicker', 'DateInput', 'TimePicker', 'FileUpload', 'RangeSlider', 'ColorPicker',
    'Rating', 'OtpInput', 'OTPInput', 'TagInput', 'SignaturePad', 'RichTextEditor',
    'HelperText', 'InputError', 'InputLabel', 'FormField'
  ];
  forms.forEach(f => {
    const reg1 = new RegExp(`['"](?:\\.\\.\/)+components\/atoms\/forms\/${f}['"]`, 'g');
    const reg2 = new RegExp(`['"](?:\\.\\.\/)+components\/ui\/forms\/${f}['"]`, 'g');
    const reg3 = new RegExp(`['"](?:\\.\\.\/)+components\/forms\/${f}['"]`, 'g');
    code = code.replace(reg1, `'@/pages/Forms/components/${f}/${f}'`);
    code = code.replace(reg2, `'@/pages/Forms/components/${f}/${f}'`);
    code = code.replace(reg3, `'@/pages/Forms/components/${f}/${f}'`);
  });

  // Fix DataDisplay relative imports
  const dds = ['DataTable', 'DataCard', 'Skeleton', 'Spinner', 'ProgressBar', 'EmptyState', 'Tag', 'AvatarGroup', 'Timeline', 'StatDisplay', 'Misc'];
  dds.forEach(d => {
    const reg1 = new RegExp(`['"](?:\\.\\.\/)+components\/atoms\/data-display\/${d}['"]`, 'g');
    const reg2 = new RegExp(`['"](?:\\.\\.\/)+components\/ui\/data-display\/${d}['"]`, 'g');
    const reg3 = new RegExp(`['"](?:\\.\\.\/)+components\/data-display\/${d}['"]`, 'g');
    code = code.replace(reg1, `'@/pages/DataDisplay/components/${d}/${d}'`);
    code = code.replace(reg2, `'@/pages/DataDisplay/components/${d}/${d}'`);
    code = code.replace(reg3, `'@/pages/DataDisplay/components/${d}/${d}'`);
  });

  // Fix barrel imports from '@/components/atoms/forms' or '@/components/atoms/notifications'
  code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]@\/components\/atoms\/forms['"];?/g, (match, imports) => {
    const items = imports.split(',').map(s => s.trim()).filter(Boolean);
    return items.map(item => `import ${item} from '@/pages/Forms/components/${item}/${item}';`).join('\n');
  });

  code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]@\/components\/atoms\/notifications['"];?/g, (match, imports) => {
    const items = imports.split(',').map(s => s.trim()).filter(Boolean);
    return items.map(item => `import ${item} from '@/pages/Notifications/components/${item}/${item}';`).join('\n');
  });

  code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]@\/components\/atoms\/cards['"];?/g, (match, imports) => {
    const items = imports.split(',').map(s => s.trim()).filter(Boolean);
    return items.map(item => `import ${item} from '@/pages/Cards/components/${item}/${item}';`).join('\n');
  });

  code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]@\/components\/atoms\/data-display['"];?/g, (match, imports) => {
    const items = imports.split(',').map(s => s.trim()).filter(Boolean);
    return items.map(item => `import ${item} from '@/pages/DataDisplay/components/${item}/${item}';`).join('\n');
  });

  // DashboardStats StatCard import
  code = code.replace(/import\s+StatCard\s+from\s+['"]\.\.\/atoms\/StatCard['"];?/g, "import StatCard from '@/pages/Home/components/StatCard/StatCard';");
  code = code.replace(/import\s+StatCard\s+from\s+['"]\.\.\/StatCard\/StatCard['"];?/g, "import StatCard from '@/pages/Home/components/StatCard/StatCard';");

  if (code !== original) {
    fs.writeFileSync(file, code);
  }
});

console.log('✔ Fixed all module imports and aliases.');
