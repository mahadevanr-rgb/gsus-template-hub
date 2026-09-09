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

function ensureComponent(dir, name, gitSources = [], fallbackJsx = '') {
  const targetDir = path.join(dir, name);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const jsxPath = path.join(targetDir, `${name}.jsx`);
  const scssPath = path.join(targetDir, `${name}.scss`);

  if (!fs.existsSync(jsxPath)) {
    let content = null;
    for (const gs of gitSources) {
      const gitContent = getGitFile(gs);
      if (gitContent) {
        content = gitContent;
        break;
      }
    }
    if (!content) content = fallbackJsx || `import React from 'react';\nimport './${name}.scss';\n\nexport default function ${name}(props) {\n  return <div className="${name.toLowerCase()}">{props.children || '${name}'}</div>;\n}\n`;

    content = content.replace(/import\s+['"]\.\/[a-zA-Z0-9_\-]+\.css['"];?/g, `import './${name}.scss';`);
    if (!content.includes(`${name}.scss`)) {
      content = `import './${name}.scss';\n` + content;
    }
    fs.writeFileSync(jsxPath, content);
  }

  if (!fs.existsSync(scssPath)) {
    fs.writeFileSync(scssPath, `/* ${name} styles */\n.${name.toLowerCase()} {\n  display: block;\n}\n`);
  }
}

// 1. DATA DISPLAY COMPONENTS
const ddDir = path.join(srcDir, 'pages/DataDisplay/components');
const ddComps = [
  { name: 'SkeletonCard', git: ['src/components/atoms/data-display/SkeletonCard.jsx', 'src/components/atoms/data-display/Skeleton.jsx'] },
  { name: 'DotsLoader', git: ['src/components/atoms/data-display/DotsLoader.jsx', 'src/components/atoms/data-display/Spinner.jsx'] },
  { name: 'PulseLoader', git: ['src/components/atoms/data-display/PulseLoader.jsx', 'src/components/atoms/data-display/Spinner.jsx'] },
  { name: 'BarLoader', git: ['src/components/atoms/data-display/BarLoader.jsx', 'src/components/atoms/data-display/ProgressBar.jsx'] },
  { name: 'Kbd', git: ['src/components/atoms/data-display/Kbd.jsx'] },
  { name: 'Divider', git: ['src/components/atoms/data-display/Divider.jsx'] },
  { name: 'Tooltip', git: ['src/components/atoms/data-display/Tooltip.jsx'] },
  { name: 'DataTable', git: ['src/components/atoms/data-display/DataTable.jsx'] },
  { name: 'DataCard', git: ['src/components/atoms/data-display/DataCard.jsx'] },
  { name: 'Skeleton', git: ['src/components/atoms/data-display/Skeleton.jsx'] },
  { name: 'Spinner', git: ['src/components/atoms/data-display/Spinner.jsx'] },
  { name: 'ProgressBar', git: ['src/components/atoms/data-display/ProgressBar.jsx'] },
  { name: 'EmptyState', git: ['src/components/atoms/data-display/EmptyState.jsx'] },
  { name: 'Tag', git: ['src/components/atoms/data-display/Tag.jsx'] },
  { name: 'AvatarGroup', git: ['src/components/atoms/data-display/AvatarGroup.jsx'] },
  { name: 'Timeline', git: ['src/components/atoms/data-display/Timeline.jsx'] },
  { name: 'StatDisplay', git: ['src/components/atoms/data-display/StatDisplay.jsx'] },
  { name: 'Misc', git: ['src/components/atoms/data-display/Misc.jsx'] }
];
ddComps.forEach(c => ensureComponent(ddDir, c.name, c.git));

// 2. FORMS COMPONENTS
const formsDir = path.join(srcDir, 'pages/Forms/components');
const formComps = [
  { name: 'TextInput', git: ['src/components/atoms/forms/TextInput.jsx'] },
  { name: 'PasswordInput', git: ['src/components/atoms/forms/PasswordInput.jsx'] },
  { name: 'SelectDropdown', git: ['src/components/atoms/forms/SelectDropdown.jsx'] },
  { name: 'Select', git: ['src/components/atoms/forms/SelectDropdown.jsx'] },
  { name: 'Checkbox', git: ['src/components/atoms/forms/Checkbox.jsx'] },
  { name: 'RadioButton', git: ['src/components/atoms/forms/RadioButton.jsx'] },
  { name: 'RadioGroup', git: ['src/components/atoms/forms/RadioButton.jsx'] },
  { name: 'SwitchToggle', git: ['src/components/atoms/forms/SwitchToggle.jsx'] },
  { name: 'Textarea', git: ['src/components/atoms/forms/Textarea.jsx'] },
  { name: 'DateInput', git: ['src/components/atoms/forms/DateInput.jsx'] },
  { name: 'DatePicker', git: ['src/components/atoms/forms/DateInput.jsx'] },
  { name: 'FileUpload', git: ['src/components/atoms/forms/FileUpload.jsx'] },
  { name: 'RangeSlider', git: ['src/components/atoms/forms/RangeSlider.jsx'] },
  { name: 'OTPInput', git: ['src/components/atoms/forms/OTPInput.jsx'] },
  { name: 'OtpInput', git: ['src/components/atoms/forms/OTPInput.jsx'] },
  { name: 'SearchInput', git: ['src/components/atoms/forms/SearchInput.jsx'] },
  { name: 'InputLabel', git: ['src/components/atoms/forms/InputLabel.jsx'] },
  { name: 'InputError', git: ['src/components/atoms/forms/InputError.jsx'] },
  { name: 'HelperText', git: ['src/components/atoms/forms/HelperText.jsx'] },
  { name: 'FormField', git: ['src/components/molecules/forms/FormField.jsx'] }
];
formComps.forEach(c => ensureComponent(formsDir, c.name, c.git));

// 3. CARDS COMPONENTS
const cardsDir = path.join(srcDir, 'pages/Cards/components');
const cardComps = [
  { name: 'TeamCard', git: ['src/components/atoms/cards/TeamCard.jsx'] },
  { name: 'StatusCard', git: ['src/components/atoms/cards/StatusCard.jsx'] },
  { name: 'SubscriptionCard', git: ['src/components/atoms/cards/SubscriptionCard.jsx'] },
  { name: 'TaskCard', git: ['src/components/atoms/cards/TaskCard.jsx'] },
  { name: 'TransactionCard', git: ['src/components/atoms/cards/TransactionCard.jsx'] },
  { name: 'PhotoProfileCard', git: ['src/components/atoms/cards/PhotoProfileCard.jsx', 'src/components/atoms/cards/ProfileCard.jsx'] },
  { name: 'KpiCard', git: ['src/components/atoms/cards/KpiCard.jsx', 'src/components/atoms/cards/StatCard.jsx'] },
  { name: 'ProgressCard', git: ['src/components/atoms/cards/ProgressCard.jsx'] },
  { name: 'NotificationCard', git: ['src/components/atoms/notifications/NotificationCard.jsx'] },
  { name: 'AlertCard', git: ['src/components/atoms/notifications/Alert.jsx'] },
  { name: 'BookingCard', git: ['src/components/atoms/cards/AppointmentCard.jsx'] },
  { name: 'KanbanCard', git: ['src/components/atoms/cards/TaskCard.jsx'] },
  { name: 'ProjectCard', git: ['src/components/atoms/cards/ProjectCard.jsx'] }
];
cardComps.forEach(c => ensureComponent(cardsDir, c.name, c.git));

console.log('✔ All component subdirectories generated with SCSS and JSX.');
