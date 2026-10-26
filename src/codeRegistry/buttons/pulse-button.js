
import PulseButton from "@/pages/Buttons/components/PulseButton/PulseButton";

const sourceCode = `import React from "react";

export default function PulseButton({
  children,
  label,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={\`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all cursor-pointer group \${className}\`}
    >
      <span className="absolute inset-0 rounded-xl border-2 border-indigo-400 animate-ping opacity-50 pointer-events-none" />
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">
        {children || label || "Pulse Button"}
      </span>
    </button>
  );
}`;

export default {
  id: "pulse-button",
  name: "Pulse Button",
  slug: "pulse-button",
  category: "buttons",
  description:
    "Button with pulsing animation and expanding ring effect. Great for alerts.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "pulse", "animated", "alert", "notification"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "PulseButton.jsx",
      path: "components/ui/buttons/PulseButton.jsx",
    },
  ],
  uses: [
    "Success states",
    "Notifications",
    "Emergency actions",
    "Important alerts",
  ],
  variants: [
    { effect: "Pulse Ring", description: "Expanding pulse ring" },
    { effect: "Scale Pulse", description: "Pulsing scale animation" },
  ],
  previewProps: { label: "Pulse", icon: "💓" },
  component: PulseButton,
  sourceCode,
};
