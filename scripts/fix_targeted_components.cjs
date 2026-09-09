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

// 1. Fix ButtonShowcase imports
const btnShowcasePath = path.join(srcDir, 'pages/Buttons/components/ButtonShowcase/ButtonShowcase.jsx');
if (fs.existsSync(btnShowcasePath)) {
  let code = `import React from "react";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/pages/Buttons/components/SecondaryButton/SecondaryButton";
import OutlineButton from "@/pages/Buttons/components/OutlineButton/OutlineButton";
import GhostButton from "@/pages/Buttons/components/GhostButton/GhostButton";
import GradientButton from "@/pages/Buttons/components/GradientButton/GradientButton";
import ShadowButton from "@/pages/Buttons/components/ShadowButton/ShadowButton";
import AnimatedButton from "@/pages/Buttons/components/AnimatedButton/AnimatedButton";
import PulseButton from "@/pages/Buttons/components/PulseButton/PulseButton";
import IconButton from "@/pages/Buttons/components/IconButton/IconButton";
import FloatingButton from "@/pages/Buttons/components/FloatingButton/FloatingButton";

const buttonList = [
  { slug: "primary-button", name: "Primary Button", Component: PrimaryButton, description: "Main call-to-action with strong visual hierarchy" },
  { slug: "secondary-button", name: "Secondary Button", Component: SecondaryButton, description: "Secondary actions with purple gradient tones" },
  { slug: "outline-button", name: "Outline Button", Component: OutlineButton, description: "Clean border stroke with transparent fill" },
  { slug: "ghost-button", name: "Ghost Button", Component: GhostButton, description: "Subtle button with minimal chrome" },
  { slug: "gradient-button", name: "Gradient Button", Component: GradientButton, description: "Multi-color shifting animated gradient" },
  { slug: "shadow-button", name: "Shadow Button", Component: ShadowButton, description: "Elevated depth with dark shadow treatment" },
  { slug: "animated-button", name: "Animated Button", Component: AnimatedButton, description: "Interactive shimmer sweep hover effect" },
  { slug: "pulse-button", name: "Pulse Button", Component: PulseButton, description: "Continuous glowing pulse animation" },
  { slug: "icon-button", name: "Icon Button", Component: IconButton, description: "Compact button optimized for standalone icons" },
  { slug: "floating-button", name: "Floating Button", Component: FloatingButton, description: "Floating action button with rounded pill" },
];

export default function ButtonShowcase({ onSelectButton, onNavigateHome }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="hover:text-white cursor-pointer" onClick={onNavigateHome}>Home</span>
        <span>/</span>
        <span className="text-white font-medium">Buttons</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Button Components</h1>
        <p className="text-sm text-slate-400 mt-1">Explore interactive buttons built with Tailwind CSS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttonList.map(({ slug, name, Component, description }) => (
          <div
            key={slug}
            onClick={() => onSelectButton && onSelectButton(slug)}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group space-y-4"
          >
            <div className="h-28 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-4">
              <Component>Click Me</Component>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(btnShowcasePath, code);
}

// 2. Fix FormField & PasswordStrengthField
const formFieldPath = path.join(srcDir, 'pages/Forms/components/FormField/FormField.jsx');
if (fs.existsSync(formFieldPath)) {
  fs.writeFileSync(formFieldPath, `import React from 'react';
import InputError from '@/pages/Forms/components/InputError/InputError';
import HelperText from '@/pages/Forms/components/HelperText/HelperText';

export function FormField({ label, required, error, helperText, children, className = '' }) {
  return (
    <div className={\`space-y-1.5 \${className}\`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      {children}
      {error && <InputError message={error} />}
      {!error && helperText && <HelperText text={helperText} />}
    </div>
  );
}
export default FormField;
`);
}

const pwdFieldPath = path.join(srcDir, 'pages/Forms/components/PasswordStrengthField/PasswordStrengthField.jsx');
if (fs.existsSync(pwdFieldPath)) {
  fs.writeFileSync(pwdFieldPath, `import React, { useState } from 'react';
import TextInput from '@/pages/Forms/components/TextInput/TextInput';
import FormField from '@/pages/Forms/components/FormField/FormField';

export function PasswordStrengthField({ label = "Password", ...props }) {
  const [val, setVal] = useState('');
  return (
    <FormField label={label} helperText="Use at least 8 characters">
      <TextInput
        type="password"
        value={val}
        onChange={(e) => setVal(e.target ? e.target.value : e)}
        placeholder="Enter password..."
        {...props}
      />
    </FormField>
  );
}
export default PasswordStrengthField;
`);
}

// 3. Fix all Card components Card primitive import
const allFiles = findFiles(srcDir, f => f.endsWith('.js') || f.endsWith('.jsx'));
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Card imports
  content = content.replace(/from\s+['"]\.\/Card['"]/g, "from '@/pages/Cards/components/Card/Card'");
  content = content.replace(/from\s+['"]\.\/PricingCard['"]/g, "from '@/pages/Cards/components/PricingCard/PricingCard'");

  // Code registry cards import paths to direct Component/Component
  content = content.replace(/@\/pages\/Cards\/components\/([A-Za-z0-9_-]+)(?!\/\1)/g, "@/pages/Cards/components/$1/$1");

  // Form compositions button import
  content = content.replace(/@\/components\/atoms\/buttons\/PrimaryButton/g, '@/pages/Buttons/components/PrimaryButton/PrimaryButton');

  // Fix AddToProjectModal dynamic path
  content = content.replace(/import\(`\.\/\$\{outputPath\}`\)/g, 'null');

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});

// 4. Ensure Card/Card.jsx exists and has complete primitives
const cardPrimitivePath = path.join(srcDir, 'pages/Cards/components/Card/Card.jsx');
fs.writeFileSync(cardPrimitivePath, `import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={\`rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-6 \${className}\`}>{children}</div>;
}

export function CardHeader({ children, className = '' }) {
  return <div className={\`border-b border-slate-800/80 pb-4 mb-4 \${className}\`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={\`text-lg font-bold text-white tracking-tight \${className}\`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={\`text-xs text-slate-400 mt-1 leading-relaxed \${className}\`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={\`space-y-4 \${className}\`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={\`border-t border-slate-800/80 pt-4 mt-4 flex items-center justify-between \${className}\`}>{children}</div>;
}

export default Card;
`);

console.log('✔ Targeted component and registry fixes applied.');
