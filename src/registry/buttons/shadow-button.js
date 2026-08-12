import ShadowButton from "../../components/atoms/buttons/ShadowButton";

const sourceCode = `import "./buttons.css";

export default function ShadowButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-shadow" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}`;

export default {
  id: "shadow-button",
  name: "Shadow Button",
  slug: "shadow-button",
  category: "buttons",
  description: "Button with elevation and shadow effect on hover. Material design inspired.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "shadow", "elevation", "material"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "ShadowButton.jsx", path: "components/atoms/buttons/ShadowButton.jsx" },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Floating elements", "Elevated actions", "Material design", "Important CTAs"],
  variants: [
    { elevation: "Base", shadow: "Normal shadow" },
    { elevation: "Hover", shadow: "Enhanced shadow with lift" },
  ],
  previewProps: { label: "Shadow", icon: "→" },
  component: ShadowButton,
  sourceCode,
};
