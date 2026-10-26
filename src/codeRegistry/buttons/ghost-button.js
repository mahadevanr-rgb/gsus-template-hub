
import GhostButton from "@/pages/Buttons/components/GhostButton/GhostButton";

const sourceCode = `import React from "react";

export default function GhostButton({
  children,
  label,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={\`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-300 bg-transparent border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-600 active:scale-[0.98] transition-all cursor-pointer \${className}\`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Ghost Button"}
    </button>
  );
}`;

export default {
  id: "ghost-button",
  name: "Ghost Button",
  slug: "ghost-button",
  category: "buttons",
  description:
    "Transparent button with border. Subtle and elegant, fills with color on hover.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "ghost", "transparent", "outline"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "GhostButton.jsx",
      path: "components/ui/buttons/GhostButton.jsx",
    },
  ],
  uses: [
    "Secondary options",
    "Text-based navigation",
    "Light backgrounds",
  ],
  variants: [
    { effect: "Hover Fill", description: "Fills with color on hover" },
    { effect: "Border Emphasis", description: "Emphasizes border" },
  ],
  previewProps: { label: "Ghost", icon: "→" },
  component: GhostButton,
  sourceCode,
};
