
import IconButton from "@/pages/Buttons/components/IconButton/IconButton";

const sourceCode = `import React from "react";

export default function IconButton({
  icon,
  onClick,
  label,
  variant = "primary",
  className = "",
}) {
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "bg-purple-600 text-white hover:bg-purple-500",
  };

  return (
    <button
      type="button"
      className={\`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-95 cursor-pointer \${variantClasses[variant] || variantClasses.primary} \${className}\`}
      onClick={onClick}
      title={label}
      aria-label={label || "Icon button"}
    >
      {icon}
    </button>
  );
}`;

export default {
  id: "icon-button",
  name: "Icon Button",
  slug: "icon-button",
  category: "buttons",
  description:
    "Icon-only circular button for toolbar actions. Supports primary and secondary variants.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "icon", "toolbar", "circular", "compact"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "IconButton.jsx",
      path: "components/ui/buttons/IconButton.jsx",
    },
  ],
  uses: [
    "Toolbar buttons",
    "Icons",
    "Compact UI",
    "Mobile navigation",
  ],
  variants: [
    { variant: "Primary", style: "Blue theme" },
    { variant: "Secondary", style: "Purple theme" },
  ],
  previewProps: { icon: "🎨", label: "Action", variant: "primary" },
  isIcon: true,
  component: IconButton,
  sourceCode,
};
