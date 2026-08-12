import PrimaryButton from "../../components/atoms/buttons/PrimaryButton";

const sourceCode = `import "./buttons.css";

export default function PrimaryButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}`;

export default {
  id: "primary-button",
  name: "Primary Button",
  slug: "primary-button",
  category: "buttons",
  description: "Main call-to-action button with blue gradient. Draws user attention for primary actions.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "cta", "primary", "action"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "PrimaryButton.jsx", path: "components/atoms/buttons/PrimaryButton.jsx" },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Submit forms", "Complete purchases", "Primary navigation", "Key actions"],
  variants: [
    { size: "Small", className: "btn-sm" },
    { size: "Medium", className: "" },
    { size: "Large", className: "btn-lg" },
    { size: "Extra Large", className: "btn-xl" },
  ],
  previewProps: { label: "Primary Action", icon: "→" },
  component: PrimaryButton,
  sourceCode,
};
