import GhostButton from "../../components/atoms/buttons/GhostButton";

const sourceCode = `import "./buttons.css";

export default function GhostButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-ghost" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}`;

export default {
  id: "ghost-button",
  name: "Ghost Button",
  slug: "ghost-button",
  category: "buttons",
  description: "Transparent button with border. Subtle and elegant, fills with color on hover.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "ghost", "transparent", "outline"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "GhostButton.jsx", path: "components/atoms/buttons/GhostButton.jsx" },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Secondary options", "Text-based navigation", "Light backgrounds"],
  variants: [
    { effect: "Hover Fill", description: "Fills with color on hover" },
    { effect: "Border Emphasis", description: "Emphasizes border" },
  ],
  previewProps: { label: "Ghost", icon: "→" },
  component: GhostButton,
  sourceCode,
};
