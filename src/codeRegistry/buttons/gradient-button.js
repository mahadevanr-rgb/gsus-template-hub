import GradientButton from "@/pages/Buttons/components/GradientButton/GradientButton";

const sourceCode = `
export default function GradientButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-gradient" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{label}</span>
    </button>
  );
}`;

export default {
  id: "gradient-button",
  name: "Gradient Button",
  slug: "gradient-button",
  category: "buttons",
  description: "Button with animated multi-color gradient background. Perfect for premium CTAs.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "gradient", "animated", "colorful", "premium"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "GradientButton.jsx", path: "components/ui/buttons/GradientButton.jsx" },
    { name: "buttons.css", path: "components/ui/buttons/buttons.css" },
  ],
  uses: ["Premium features", "Featured actions", "Creative CTAs", "Marketing buttons"],
  variants: [
    { style: "Active", description: "Color shifting gradient" },
    { style: "Hover", description: "Enhanced animation" },
  ],
  previewProps: { label: "Gradient", icon: "ðŸŒˆ" },
  component: GradientButton,
  sourceCode,
};
