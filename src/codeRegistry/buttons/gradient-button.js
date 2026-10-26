
import GradientButton from "@/pages/Buttons/components/GradientButton/GradientButton";

const sourceCode = `import React from "react";

export default function GradientButton({
  children,
  label,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={\`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-purple-500/25 transition-all cursor-pointer \${className}\`}
    >
      {icon && <span>{icon}</span>}
      <span>{children || label || "Gradient Button"}</span>
    </button>
  );
}`;

export default {
  id: "gradient-button",
  name: "Gradient Button",
  slug: "gradient-button",
  category: "buttons",
  description:
    "Button with animated multi-color gradient background. Perfect for premium CTAs.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "gradient", "animated", "colorful", "premium"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "GradientButton.jsx",
      path: "components/ui/buttons/GradientButton.jsx",
    },
  ],
  uses: [
    "Premium features",
    "Featured actions",
    "Creative CTAs",
    "Marketing buttons",
  ],
  variants: [
    { style: "Active", description: "Color shifting gradient" },
    { style: "Hover", description: "Enhanced animation" },
  ],
  previewProps: { label: "Gradient", icon: "🌈" },
  component: GradientButton,
  sourceCode,
};
