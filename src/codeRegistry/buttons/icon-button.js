import IconButton from "@/pages/Buttons/components/IconButton/IconButton";

const sourceCode = `
export default function IconButton({ icon, onClick, label, variant = "primary" }) {
  return (
    <button
      className={\`btn btn-icon-only btn-icon-\${variant}\`}
      onClick={onClick}
      title={label}
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
  description: "Icon-only circular button for toolbar actions. Supports primary and secondary variants.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "icon", "toolbar", "circular", "compact"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "IconButton.jsx", path: "components/ui/buttons/IconButton.jsx" },
    { name: "buttons.css", path: "components/ui/buttons/buttons.css" },
  ],
  uses: ["Toolbar buttons", "Icons", "Compact UI", "Mobile navigation"],
  variants: [
    { variant: "Primary", style: "Blue theme" },
    { variant: "Secondary", style: "Purple theme" },
  ],
  previewProps: { icon: "ðŸŽ¨", label: "Action", variant: "primary" },
  isIcon: true,
  component: IconButton,
  sourceCode,
};
