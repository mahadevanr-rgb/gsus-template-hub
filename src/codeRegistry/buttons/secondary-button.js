
import SecondaryButton from "@/pages/Buttons/components/SecondaryButton/SecondaryButton";

const sourceCode = `import React from "react";

export default function SecondaryButton({
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
      className={\`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 active:scale-[0.98] shadow-lg shadow-purple-500/25 transition-all cursor-pointer \${className}\`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Secondary Action"}
    </button>
  );
}`;

export default {
  id: "secondary-button",
  name: "Secondary Button",
  slug: "secondary-button",
  category: "buttons",
  description:
    "Secondary action button with purple gradient. Used for less prominent actions.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "secondary", "action"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "SecondaryButton.jsx",
      path: "components/ui/buttons/SecondaryButton.jsx",
    },
  ],
  uses: [
    "Alternative actions",
    "Cancel operations",
    "Skip options",
    "Back",
  ],
  variants: [
    { size: "Small", className: "px-3 py-1.5 text-xs" },
    { size: "Medium", className: "px-5 py-2.5 text-xs" },
    { size: "Large", className: "px-6 py-3 text-sm" },
  ],
  previewProps: { label: "Secondary", icon: "→" },
  component: SecondaryButton,
  sourceCode,
};
