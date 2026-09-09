import FloatingButton from "@/pages/Buttons/components/FloatingButton/FloatingButton";

const sourceCode = `
export default function FloatingButton({ icon, onClick, label }) {
  return (
    <button className="btn btn-floating" onClick={onClick} title={label}>
      {icon}
    </button>
  );
}`;

export default {
  id: "floating-button",
  name: "Floating Button",
  slug: "floating-button",
  category: "buttons",
  description: "FAB (Floating Action Button) â€” circular button for primary actions. Mobile-friendly.",
  framework: "react",
  language: "javascript",
  styling: "css",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "fab", "floating", "circular", "mobile"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    { name: "FloatingButton.jsx", path: "components/ui/buttons/FloatingButton.jsx" },
    { name: "buttons.css", path: "components/ui/buttons/buttons.css" },
  ],
  uses: ["Add new items", "Compose", "Create", "Floating actions", "Mobile apps"],
  variants: [
    { size: "Standard", diameter: "60px" },
    { size: "Large", diameter: "72px" },
  ],
  previewProps: { icon: "+", label: "Add" },
  isFloating: true,
  component: FloatingButton,
  sourceCode,
};
