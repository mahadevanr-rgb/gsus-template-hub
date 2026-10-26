
import ShadowButton from "@/pages/Buttons/components/ShadowButton/ShadowButton";

const sourceCode = `import React from "react";

export default function ShadowButton({
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
      className={\`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 active:scale-[0.98] shadow-md shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer \${className}\`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Shadow Button"}
    </button>
  );
}`;

export default {
  id: "shadow-button",
  name: "Shadow Button",
  slug: "shadow-button",
  category: "buttons",
  description:
    "Button with elevation and shadow effect on hover. Material design inspired.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "shadow", "elevation", "material"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "ShadowButton.jsx",
      path: "components/ui/buttons/ShadowButton.jsx",
    },
  ],
  uses: [
    "Floating elements",
    "Elevated actions",
    "Material design",
    "Important CTAs",
  ],
  variants: [
    { elevation: "Base", shadow: "Normal shadow" },
    { elevation: "Hover", shadow: "Enhanced shadow with lift" },
  ],
  previewProps: { label: "Shadow", icon: "→" },
  component: ShadowButton,
  sourceCode,
};
