import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";

const sourceCode = `import React from "react";

export default function PrimaryButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={\`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-500/25 transition-all cursor-pointer \${className}\`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Primary Action"}
    </button>
  );
}`;

export default {
  id: "primary-button",
  name: "Primary Button",
  slug: "primary-button",
  category: "buttons",
  description:
    "Main call-to-action button with blue gradient. Draws user attention for primary actions.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["None"],
  tags: ["button", "cta", "primary", "action"],
  author: "TemplateHub UI Team",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "PrimaryButton.jsx",
      path: "components/ui/buttons/PrimaryButton.jsx",
    },
  ],
  uses: [
    "Submit forms",
    "Complete purchases",
    "Primary navigation",
    "Key actions",
  ],
  previewProps: { label: "Primary Action", icon: "→" },
  component: PrimaryButton,
  sourceCode,
};
