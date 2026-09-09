import React from "react";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/pages/Buttons/components/SecondaryButton/SecondaryButton";
import OutlineButton from "@/pages/Buttons/components/OutlineButton/OutlineButton";
import GhostButton from "@/pages/Buttons/components/GhostButton/GhostButton";
import GradientButton from "@/pages/Buttons/components/GradientButton/GradientButton";
import ShadowButton from "@/pages/Buttons/components/ShadowButton/ShadowButton";
import AnimatedButton from "@/pages/Buttons/components/AnimatedButton/AnimatedButton";
import PulseButton from "@/pages/Buttons/components/PulseButton/PulseButton";
import IconButton from "@/pages/Buttons/components/IconButton/IconButton";
import FloatingButton from "@/pages/Buttons/components/FloatingButton/FloatingButton";

const buttonList = [
  { slug: "primary-button", name: "Primary Button", Component: PrimaryButton, description: "Main call-to-action with strong visual hierarchy" },
  { slug: "secondary-button", name: "Secondary Button", Component: SecondaryButton, description: "Secondary actions with purple gradient tones" },
  { slug: "outline-button", name: "Outline Button", Component: OutlineButton, description: "Clean border stroke with transparent fill" },
  { slug: "ghost-button", name: "Ghost Button", Component: GhostButton, description: "Subtle button with minimal chrome" },
  { slug: "gradient-button", name: "Gradient Button", Component: GradientButton, description: "Multi-color shifting animated gradient" },
  { slug: "shadow-button", name: "Shadow Button", Component: ShadowButton, description: "Elevated depth with dark shadow treatment" },
  { slug: "animated-button", name: "Animated Button", Component: AnimatedButton, description: "Interactive shimmer sweep hover effect" },
  { slug: "pulse-button", name: "Pulse Button", Component: PulseButton, description: "Continuous glowing pulse animation" },
  { slug: "icon-button", name: "Icon Button", Component: IconButton, description: "Compact button optimized for standalone icons" },
  { slug: "floating-button", name: "Floating Button", Component: FloatingButton, description: "Floating action button with rounded pill" },
];

export default function ButtonShowcase({ onSelectButton, onNavigateHome }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="hover:text-white cursor-pointer" onClick={onNavigateHome}>Home</span>
        <span>/</span>
        <span className="text-white font-medium">Buttons</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Button Components</h1>
        <p className="text-sm text-slate-400 mt-1">Explore interactive buttons built with Tailwind CSS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttonList.map(({ slug, name, Component, description }) => (
          <div
            key={slug}
            onClick={() => onSelectButton && onSelectButton(slug)}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group space-y-4"
          >
            <div className="h-28 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-4">
              <Component>Click Me</Component>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
