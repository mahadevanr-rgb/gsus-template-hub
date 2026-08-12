import SecondaryButton from "../../components/atoms/buttons/SecondaryButton";

const sourceCode = `import "./buttons.css";

export default function SecondaryButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-secondary" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}`;

export default {
  id: "secondary-button",
  name: "Secondary Button",
  slug: "secondary-button",
  category: "buttons",
  description: "Secondary action button with purple gradient. Used for less prominent actions.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "secondary", "action"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "SecondaryButton.jsx", path: "components/atoms/buttons/SecondaryButton.jsx" },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Alternative actions", "Cancel operations", "Skip options", "Back"],
  variants: [
    { size: "Small", className: "btn-sm" },
    { size: "Medium", className: "" },
    { size: "Large", className: "btn-lg" },
  ],
  previewProps: { label: "Secondary", icon: "→" },
  component: SecondaryButton,
  sourceCode,
};
