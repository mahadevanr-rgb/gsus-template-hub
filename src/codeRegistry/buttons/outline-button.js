
import OutlineButton from "@/pages/Buttons/components/OutlineButton/OutlineButton";

const sourceCode = `import React from "react";

export default function OutlineButton({
  children,
  label,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={\`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-indigo-400 border border-indigo-500 bg-transparent hover:bg-indigo-600 hover:text-white active:scale-[0.98] transition-all cursor-pointer \${className}\`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Outline Button"}
    </button>
  );
}`;

export default {
  id: "outline-button",
  name: "Outline Button",
  slug: "outline-button",
  category: "buttons",
  description:
    "Border-only button that fills on hover with a slide effect. Clean and minimal.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "outline", "border", "minimal"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "OutlineButton.jsx",
      path: "components/ui/buttons/OutlineButton.jsx",
    },
  ],
  uses: [
    "Secondary actions",
    "Outline navigation",
    "Clean design",
  ],
  variants: [
    { state: "Default", description: "Border only" },
    { state: "Hover", description: "Fills with color" },
  ],
  previewProps: { label: "Outline", icon: "→" },
  component: OutlineButton,
  sourceCode,
};
