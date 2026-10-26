
import AnimatedButton from "@/pages/Buttons/components/AnimatedButton/AnimatedButton";

const sourceCode = `import React from "react";

export default function AnimatedButton({
  children,
  label,
  onClick,
  icon,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={\`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 overflow-hidden group active:scale-[0.98] transition-all cursor-pointer \${className}\`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      {icon && <span>{icon}</span>}
      <span className="relative z-10">
        {children || label || "Animated Button"}
      </span>
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
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: [],
  tags: ["button", "animated", "shimmer", "effect"],
  author: "TemplateHub",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  files: [
    {
      name: "AnimatedButton.jsx",
      path: "components/ui/buttons/AnimatedButton.jsx",
    },
  ],
  sourceCode,
  uses: ["Special promotions", "Limited offers", "Highlighted actions"],
  variants: [
    { effect: "Shimmer", description: "Shimmer sweep on hover" },
  ],
  previewProps: { label: "Animated", icon: "✨" },
  component: AnimatedButton,
};
