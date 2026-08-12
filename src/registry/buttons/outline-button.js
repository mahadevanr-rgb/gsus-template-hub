import OutlineButton from "../../components/atoms/buttons/OutlineButton";

const sourceCode = `import "./buttons.css";

export default function OutlineButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-outline" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}`;

export default {
  id: "outline-button",
  name: "Outline Button",
  slug: "outline-button",
  category: "buttons",
  description: "Border-only button that fills on hover with a slide effect. Clean and minimal.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "outline", "border", "minimal"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "OutlineButton.jsx", path: "components/atoms/buttons/OutlineButton.jsx" },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Secondary actions", "Outline navigation", "Clean design"],
  variants: [
    { state: "Default", description: "Border only" },
    { state: "Hover", description: "Slides and fills" },
  ],
  previewProps: { label: "Outline", icon: "→" },
  component: OutlineButton,
  sourceCode,
};
