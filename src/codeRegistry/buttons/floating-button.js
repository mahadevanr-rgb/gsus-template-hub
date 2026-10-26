
import FloatingButton from "@/pages/Buttons/components/FloatingButton/FloatingButton";

const sourceCode = `import React from "react";
import { Plus } from "lucide-react";

export default function FloatingButton({
  children,
  label,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={\`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-500/50 transition-all cursor-pointer \${className}\`}
    >
      {icon || <Plus className="w-4 h-4" />}
      <span>{children || label || "Create Action"}</span>
    </button>
  );
}`;

export default {
  id: "floating-button",
  name: "Floating Button",
  slug: "floating-button",
  category: "buttons",
  description:
    "Floating action button with rounded pill shape and high elevation.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["button", "fab", "floating", "mobile"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "FloatingButton.jsx",
      path: "components/ui/buttons/FloatingButton.jsx",
    },
  ],
  uses: [
    "Add new items",
    "Compose",
    "Create",
    "Floating actions",
    "Mobile apps",
  ],
  variants: [
    { size: "Standard", diameter: "60px" },
    { size: "Large", diameter: "72px" },
  ],
  previewProps: { icon: "+", label: "Add" },
  isFloating: true,
  component: FloatingButton,
  sourceCode,
};
