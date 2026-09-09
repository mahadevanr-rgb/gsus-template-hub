import React from "react";
import { MousePointerClick } from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
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
  {
    slug: "primary-button",
    name: "Primary Button",
    Component: PrimaryButton,
    description: "Main call-to-action button with strong visual hierarchy and blue gradient.",
    tag: "CTA",
    theme: "blue",
  },
  {
    slug: "secondary-button",
    name: "Secondary Button",
    Component: SecondaryButton,
    description: "Secondary actions with subtle dark tones and border stroke.",
    tag: "Action",
    theme: "purple",
  },
  {
    slug: "outline-button",
    name: "Outline Button",
    Component: OutlineButton,
    description: "Clean border stroke with transparent fill for tertiary actions.",
    tag: "Outline",
    theme: "cyan",
  },
  {
    slug: "ghost-button",
    name: "Ghost Button",
    Component: GhostButton,
    description: "Subtle button with minimal chrome and soft hover background.",
    tag: "Minimal",
    theme: "slate",
  },
  {
    slug: "gradient-button",
    name: "Gradient Button",
    Component: GradientButton,
    description: "Multi-color shifting animated gradient for high-conversion actions.",
    tag: "Gradient",
    theme: "fuchsia",
  },
  {
    slug: "shadow-button",
    name: "Shadow Button",
    Component: ShadowButton,
    description: "Elevated depth with dark shadow treatment and modern border.",
    tag: "Elevated",
    theme: "indigo",
  },
  {
    slug: "animated-button",
    name: "Animated Button",
    Component: AnimatedButton,
    description: "Interactive shimmer sweep hover effect for premium user feedback.",
    tag: "Animated",
    theme: "teal",
  },
  {
    slug: "pulse-button",
    name: "Pulse Button",
    Component: PulseButton,
    description: "Continuous glowing pulse animation for live or urgent actions.",
    tag: "Pulse",
    theme: "emerald",
  },
  {
    slug: "icon-button",
    name: "Icon Button",
    Component: IconButton,
    description: "Compact button optimized for standalone icons and quick toolbars.",
    tag: "Icon",
    theme: "amber",
  },
  {
    slug: "floating-button",
    name: "Floating Button",
    Component: FloatingButton,
    description: "Floating action button with rounded pill shape and high elevation.",
    tag: "Floating",
    theme: "orange",
  },
];

export default function ButtonShowcase({ onSelectButton, onNavigateHome }) {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span
          className="hover:text-white cursor-pointer transition-colors"
          onClick={onNavigateHome}
        >
          Home
        </span>
        <span>/</span>
        <span
          className="hover:text-white cursor-pointer transition-colors"
          onClick={onNavigateHome}
        >
          Components
        </span>
        <span>/</span>
        <span className="text-white font-medium">Buttons</span>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-5 shadow-xl shadow-black/10 sm:px-6">
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 sm:flex">
            <MousePointerClick className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-300">
              <MousePointerClick className="h-3.5 w-3.5" />
              10 Button Variants
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Button{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Components Collection
              </span>
            </h1>

            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
              Explore interactive, theme-aware button primitives with animations, gradients, and accessible states.
            </p>
          </div>
        </div>
      </header>

      {/* Grid of Showcase Cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {buttonList.map(({ slug, name, Component, description, tag, theme }) => (
          <ShowcaseCard
            key={slug}
            title={name}
            description={description}
            tag={tag}
            theme={theme}
            preview={
              <div className="w-full h-24 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-center p-4">
                <Component>Click Me</Component>
              </div>
            }
            onClick={() => onSelectButton && onSelectButton(slug)}
          />
        ))}
      </section>
    </div>
  );
}
