import AnimatedButton from "../../components/atoms/buttons/AnimatedButton";

const sourceCode = `import "./buttons.css";

export default function AnimatedButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-animated" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{label}</span>
      <span className="btn-shimmer"></span>
    </button>
  );
}`;

export default {
  id: "animated-button",
  name: "Animated Button",
  slug: "animated-button",
  category: "buttons",
  description:
    "Button with shimmer animation effect on hover. Eye-catching for promotions.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "animated", "shimmer", "effect"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "AnimatedButton.jsx",
      path: "components/atoms/buttons/AnimatedButton.jsx",
    },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Special promotions", "Limited offers", "Highlighted actions"],
  variants: [
    { effect: "Shimmer", description: "Continuous shimmer on hover" },
    { effect: "Gradient Shift", description: "Animated color gradient" },
  ],
  previewProps: { label: "Animated", icon: "✨" },
  component: AnimatedButton,
  sourceCode,
};
