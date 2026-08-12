import PulseButton from "../../components/atoms/buttons/PulseButton";

const sourceCode = `import "./buttons.css";

export default function PulseButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-pulse" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{label}</span>
      <span className="btn-pulse-ring"></span>
    </button>
  );
}`;

export default {
  id: "pulse-button",
  name: "Pulse Button",
  slug: "pulse-button",
  category: "buttons",
  description: "Button with pulsing animation and expanding ring effect. Great for alerts.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "pulse", "animated", "alert", "notification"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "PulseButton.jsx", path: "components/atoms/buttons/PulseButton.jsx" },
    { name: "buttons.css", path: "components/atoms/buttons/buttons.css" },
  ],
  uses: ["Success states", "Notifications", "Emergency actions", "Important alerts"],
  variants: [
    { effect: "Pulse Ring", description: "Expanding pulse ring" },
    { effect: "Scale Pulse", description: "Pulsing scale animation" },
  ],
  previewProps: { label: "Pulse", icon: "💓" },
  component: PulseButton,
  sourceCode,
};
