import React from "react";
import { ArrowRight } from "lucide-react";

export const showcaseThemes = {
  amber: {
    border: "border-amber-500/30 hover:border-amber-400/70",
    glow: "bg-amber-500/10",
    tag: "text-amber-300 bg-amber-500/10 border-amber-500/25",
    hover: "group-hover:text-amber-300",
    arrow: "group-hover:border-amber-500/30 group-hover:bg-amber-500/10",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/70",
    glow: "bg-blue-500/10",
    tag: "text-blue-300 bg-blue-500/10 border-blue-500/25",
    hover: "group-hover:text-blue-300",
    arrow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/10",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/70",
    glow: "bg-purple-500/10",
    tag: "text-purple-300 bg-purple-500/10 border-purple-500/25",
    hover: "group-hover:text-purple-300",
    arrow: "group-hover:border-purple-500/30 group-hover:bg-purple-500/10",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-400/70",
    glow: "bg-emerald-500/10",
    tag: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    hover: "group-hover:text-emerald-300",
    arrow: "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10",
  },
  fuchsia: {
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/70",
    glow: "bg-fuchsia-500/10",
    tag: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/25",
    hover: "group-hover:text-fuchsia-300",
    arrow: "group-hover:border-fuchsia-500/30 group-hover:bg-fuchsia-500/10",
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-400/70",
    glow: "bg-orange-500/10",
    tag: "text-orange-300 bg-orange-500/10 border-orange-500/25",
    hover: "group-hover:text-orange-300",
    arrow: "group-hover:border-orange-500/30 group-hover:bg-orange-500/10",
  },
  teal: {
    border: "border-teal-500/30 hover:border-teal-400/70",
    glow: "bg-teal-500/10",
    tag: "text-teal-300 bg-teal-500/10 border-teal-500/25",
    hover: "group-hover:text-teal-300",
    arrow: "group-hover:border-teal-500/30 group-hover:bg-teal-500/10",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400/70",
    glow: "bg-cyan-500/10",
    tag: "text-cyan-300 bg-cyan-500/10 border-cyan-500/25",
    hover: "group-hover:text-cyan-300",
    arrow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10",
  },
  red: {
    border: "border-red-500/30 hover:border-red-400/70",
    glow: "bg-red-500/10",
    tag: "text-red-300 bg-red-500/10 border-red-500/25",
    hover: "group-hover:text-red-300",
    arrow: "group-hover:border-red-500/30 group-hover:bg-red-500/10",
  },
  indigo: {
    border: "border-indigo-500/30 hover:border-indigo-400/70",
    glow: "bg-indigo-500/10",
    tag: "text-indigo-300 bg-indigo-500/10 border-indigo-500/25",
    hover: "group-hover:text-indigo-300",
    arrow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10",
  },
  slate: {
    border: "border-slate-800/80 hover:border-slate-700",
    glow: "bg-indigo-500/5",
    tag: "text-slate-300 bg-slate-800/80 border-slate-700",
    hover: "group-hover:text-indigo-300",
    arrow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10",
  },
};

export default function ShowcaseCard({
  title,
  name,
  description,
  tag = "Component",
  version = "v1.0.0",
  theme = "indigo",
  preview,
  children,
  actionText = "View Details & Live Demo",
  onClick,
  className = "",
}) {
  const selectedTheme = showcaseThemes[theme] || showcaseThemes.indigo;
  const displayName = title || name || "Component";

  return (
    <article
      onClick={onClick}
      className={`
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        ${selectedTheme.border}
        bg-slate-900/65
        p-4
        shadow-xl
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-slate-900/90
        ${className}
      `}
    >
      {/* Background ambient glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          ${selectedTheme.glow}
          opacity-60
          blur-3xl
          transition-opacity
          group-hover:opacity-100
        `}
      />

      <div className="relative space-y-4">
        {/* Top meta row (Tag + Version) */}
        <div className="flex items-center justify-between">
          <span
            className={`
              rounded-full
              border
              px-2.5
              py-1
              text-[10px]
              font-semibold
              ${selectedTheme.tag}
            `}
          >
            {tag}
          </span>

          <span className="font-mono text-[10px] text-slate-600">
            {version}
          </span>
        </div>

        {/* Live Preview Container */}
        {(preview || children) && (
          <div className="w-full flex items-center justify-center">
            {preview || children}
          </div>
        )}

        {/* Content (Title & Description) */}
        <div>
          <h3
            className={`
              text-base
              font-semibold
              text-white
              transition-colors
              ${selectedTheme.hover}
            `}
          >
            {displayName}
          </h3>

          {description && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {description}
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div
          className={`
            flex
            items-center
            justify-between
            border-t
            border-slate-800/70
            pt-3
            text-xs
            font-medium
            text-slate-500
            transition-colors
            ${selectedTheme.hover}
          `}
        >
          <span>{actionText}</span>

          <span
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border
              border-slate-800
              bg-slate-950/60
              transition-all
              ${selectedTheme.arrow}
            `}
          >
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
