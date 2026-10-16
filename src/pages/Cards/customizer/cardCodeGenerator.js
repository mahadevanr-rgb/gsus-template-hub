import { toPascalCase, toSlug } from "./cardCustomizationUtils";

/**
 * Helper to escape strings inside JSX/HTML
 */
function escapeText(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Resolves shadow CSS value from preset
 */
function getShadowCss(preset) {
  switch (preset) {
    case "none":
      return "none";
    case "sm":
      return "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    case "md":
      return "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    case "lg":
      return "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    case "xl":
      return "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    case "2xl":
      return "0 25px 50px -12px rgb(0 0 0 / 0.25)";
    case "glow":
      return "0 0 25px -5px rgba(99, 102, 241, 0.45)";
    default:
      return "0 10px 15px -3px rgb(0 0 0 / 0.1)";
  }
}

/**
 * Generates self-contained React Component JSX.
 */
export function generateReactCode(config) {
  const componentName = toPascalCase(config.name || "CustomCard");
  const { layout, colors, typography, borders, content, button, image, interactive } = config;
  const shadowValue = getShadowCss(borders.shadowPreset);

  // Background styling
  const bgStyle = colors.useGradient
    ? `background: 'linear-gradient(to bottom right, ${colors.gradientFrom}, ${colors.gradientVia ? colors.gradientVia + ", " : ""}${colors.gradientTo})'`
    : `backgroundColor: '${colors.cardBg}'`;

  // Determine needed Lucide icons
  const iconsNeeded = new Set();
  if (button?.show && button?.btnIcon) iconsNeeded.add(button.btnIcon);
  if (content?.icon && content.icon !== "string") iconsNeeded.add(content.icon);

  // Card specific icon requirements
  if (config.sourceCardId.includes("pricing")) {
    iconsNeeded.add("Check");
    if (content?.highlighted) iconsNeeded.add("Sparkles");
  }
  if (config.sourceCardId.includes("stat")) {
    iconsNeeded.add(content?.changeDirection === "down" ? "TrendingDown" : "TrendingUp");
  }
  if (config.sourceCardId.includes("product")) {
    iconsNeeded.add("ShoppingCart");
    iconsNeeded.add("Star");
  }
  if (config.sourceCardId.includes("testimonial")) {
    iconsNeeded.add("Star");
    iconsNeeded.add("CheckCircle2");
  }
  if (config.sourceCardId.includes("invoice")) {
    iconsNeeded.add("FileText");
  }
  if (config.sourceCardId.includes("task")) {
    iconsNeeded.add("Clock");
  }
  if (config.sourceCardId.includes("event")) {
    iconsNeeded.add("Calendar");
    iconsNeeded.add("MapPin");
  }
  if (config.sourceCardId.includes("alert")) {
    iconsNeeded.add(content?.severity === "error" ? "AlertTriangle" : "Info");
  }

  const iconImportsList = Array.from(iconsNeeded).filter(Boolean);
  const iconImportStatement = iconImportsList.length
    ? `import { ${iconImportsList.join(", ")} } from "lucide-react";\n`
    : "";

  // Render Inner Content JSX based on card family
  let innerJsx = "";

  if (config.sourceCardId.includes("profile")) {
    innerJsx = `
      {/* Cover Header Banner */}
      ${
        content.showCoverBanner !== false
          ? `<div className="relative h-28 sm:h-32 w-full rounded-2xl bg-gradient-to-tr ${content.coverGradient || "from-indigo-600 via-purple-600 to-pink-500"} overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>`
          : ""
      }

      {/* Profile Details */}
      <div className="text-center px-4 pt-0">
        ${
          image?.show
            ? `<div className="relative ${content.showCoverBanner !== false ? "-mt-12" : "mt-2"} mb-3 inline-block">
          <img
            src="${image.url}"
            alt="${content.name || "Profile Avatar"}"
            className="w-20 h-20 sm:w-24 sm:h-24 ${image.avatarShape === "circle" ? "rounded-full" : "rounded-2xl"} object-cover border-4 border-white dark:border-slate-900 shadow-md ring-1 ring-black/5 mx-auto"
          />
        </div>`
            : ""
        }

        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: '${typography.titleFontSize}px', color: '${colors.titleColor}' }}
        >
          ${content.name || "Profile Name"}
        </h3>
        <p
          className="font-medium mt-0.5"
          style={{ fontSize: '${typography.bodyFontSize}px', color: '${colors.subtitleColor}' }}
        >
          ${content.role || "Professional Role"}
        </p>

        ${
          content.bio
            ? `<p className="mt-2 text-xs leading-relaxed max-w-xs mx-auto" style={{ color: '${colors.subtitleColor}' }}>
          ${content.bio}
        </p>`
            : ""
        }

        ${
          content.stats && content.stats.length > 0
            ? `{/* Stats Row */}
        <div className="grid grid-cols-${content.stats.length} gap-2 mt-5 pt-4 border-t" style={{ borderColor: '${colors.borderColor}' }}>
          ${content.stats
            .map(
              (stat) => `
          <div className="flex flex-col items-center">
            <span className="text-base font-bold tracking-tight" style={{ color: '${colors.titleColor}' }}>
              ${stat.value}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider mt-0.5" style={{ color: '${colors.subtitleColor}' }}>
              ${stat.label}
            </span>
          </div>`
            )
            .join("\n")}
        </div>`
            : ""
        }
      </div>`;
  } else if (config.sourceCardId.includes("pricing")) {
    innerJsx = `
      {/* Pricing Header */}
      <div className="text-center space-y-2">
        ${
          content.highlighted && content.highlightBadge
            ? `<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>${content.highlightBadge}</span>
        </div>`
            : ""
        }

        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: '${typography.titleFontSize}px', color: '${colors.titleColor}' }}
        >
          ${content.planName || "Plan Name"}
        </h3>

        <div className="flex items-baseline justify-center gap-1 pt-2">
          <span className="text-2xl font-bold" style={{ color: '${colors.titleColor}' }}>
            ${content.currency || "$"}
          </span>
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: '${colors.titleColor}' }}>
            ${content.price || "29"}
          </span>
        </div>
        <p className="text-xs" style={{ color: '${colors.subtitleColor}' }}>
          ${content.priceUnit || "/ month"}
        </p>

        ${
          content.description
            ? `<p className="text-xs pt-1 leading-relaxed" style={{ color: '${colors.subtitleColor}' }}>
          ${content.description}
        </p>`
            : ""
        }
      </div>

      ${
        content.features && content.features.length > 0
          ? `{/* Feature Checklist */}
      <div className="mt-6 pt-5 border-t space-y-3" style={{ borderColor: '${colors.borderColor}' }}>
        ${content.features
          .map(
            (feat) => `
        <div className="flex items-center gap-2.5 text-xs">
          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
            <Check className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span style={{ color: '${colors.titleColor}' }}>${feat}</span>
        </div>`
          )
          .join("\n")}
      </div>`
          : ""
      }`;
  } else if (config.sourceCardId.includes("testimonial")) {
    innerJsx = `
      {/* 5-Star Rating */}
      <div className="flex items-center gap-1 text-amber-400" role="img" aria-label="${content.rating || 5} out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={\`w-4 h-4 \${i < ${content.rating || 5} ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}\`}
          />
        ))}
      </div>

      {/* Quote Message */}
      <blockquote
        className="italic leading-relaxed my-3"
        style={{ fontSize: '${typography.bodyFontSize}px', color: '${colors.titleColor}' }}
      >
        "${content.quote || "Outstanding service and design precision."}"
      </blockquote>

      {/* Author Footer */}
      <div className="flex items-center gap-3 pt-4 border-t mt-auto" style={{ borderColor: '${colors.borderColor}' }}>
        ${
          image?.show
            ? `<img
          src="${image.url}"
          alt="${content.authorName || "Author"}"
          className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-black/5"
        />`
            : ""
        }
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs sm:text-sm font-bold truncate" style={{ color: '${colors.titleColor}' }}>
              ${content.authorName || "Author Name"}
            </h4>
            ${content.verified ? `<CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />` : ""}
          </div>
          <p className="text-[11px] truncate" style={{ color: '${colors.subtitleColor}' }}>
            ${content.authorRole || "Customer"}${content.authorCompany ? `, ${content.authorCompany}` : ""}
          </p>
        </div>
      </div>`;
  } else if (config.sourceCardId.includes("stat")) {
    innerJsx = `
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[11px] font-bold tracking-wider uppercase"
          style={{ color: '${colors.subtitleColor}' }}
        >
          ${content.label || "METRIC"}
        </span>
        ${
          content.changePercent
            ? `<div
          className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: '${content.changeDirection === "down" ? "#fee2e2" : "#dcfce7"}',
            color: '${content.changeDirection === "down" ? "#b91c1c" : "#15803d"}',
          }}
        >
          <span>${content.changeDirection === "down" ? "↓" : "↑"}</span>
          <span>${content.changePercent}</span>
        </div>`
            : ""
        }
      </div>

      {/* Primary Value */}
      <div
        className="font-extrabold tracking-tight mt-1"
        style={{ fontSize: '${typography.titleFontSize * 1.5}px', color: '${colors.titleColor}' }}
      >
        ${content.value || "124,800"}
      </div>

      ${
        content.sparklineData && content.sparklineData.length > 0
          ? `{/* Sparkline Bars */}
      <div className="flex items-end gap-1.5 h-10 pt-2 my-2">
        ${content.sparklineData
          .map(
            (val, idx) => `
        <div
          key={${idx}}
          className="flex-1 rounded-t-sm transition-all hover:opacity-100 opacity-80"
          style={{ height: '${val}%', backgroundColor: '${colors.accentColor}' }}
        />`
          )
          .join("\n")}
      </div>`
          : ""
      }

      {/* Footer Notes */}
      ${
        content.footerLeft || content.footerRight
          ? `<div className="flex items-center justify-between text-[11px] pt-3 border-t mt-auto" style={{ borderColor: '${colors.borderColor}', color: '${colors.subtitleColor}' }}>
        <span>${content.footerLeft || ""}</span>
        <span className="font-semibold">${content.footerRight || ""}</span>
      </div>`
          : ""
      }`;
  } else if (config.sourceCardId.includes("product")) {
    innerJsx = `
      ${
        image?.show
          ? `<div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src="${image.url}"
          alt="${content.productName || "Product"}"
          className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
        />
        ${
          content.badge
            ? `<span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
          ${content.badge}
        </span>`
            : ""
        }
      </div>`
          : ""
      }

      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '${colors.subtitleColor}' }}>
          ${content.category || "Featured"}
        </span>
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: '${typography.titleFontSize}px', color: '${colors.titleColor}' }}
        >
          ${content.productName || "Product Title"}
        </h3>
        <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: '${colors.subtitleColor}' }}>
          ${content.description || "Product description overview."}
        </p>
      </div>

      <div className="flex items-baseline gap-2 pt-3">
        <span className="text-xl font-extrabold" style={{ color: '${colors.titleColor}' }}>
          ${content.price || "$199"}
        </span>
        ${
          content.originalPrice
            ? `<span className="text-xs line-through" style={{ color: '${colors.subtitleColor}' }}>
          ${content.originalPrice}
        </span>`
            : ""
        }
      </div>`;
  } else if (config.sourceCardId.includes("invoice")) {
    innerJsx = `
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: '${colors.borderColor}' }}>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: '${colors.subtitleColor}' }}>
            Invoice ID
          </span>
          <h4 className="text-xs font-mono font-bold" style={{ color: '${colors.titleColor}' }}>
            ${content.invoiceNumber || "INV-001"}
          </h4>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
          ${content.status || "Paid"}
        </span>
      </div>

      <div className="space-y-1 my-3">
        <span className="text-[11px]" style={{ color: '${colors.subtitleColor}' }}>Billed To:</span>
        <h3 className="text-sm font-bold" style={{ color: '${colors.titleColor}' }}>
          ${content.clientName || "Client Name"}
        </h3>
        <p className="text-xs font-mono" style={{ color: '${colors.subtitleColor}' }}>
          ${content.clientEmail || ""}
        </p>
      </div>

      <div className="p-3.5 rounded-xl my-2" style={{ backgroundColor: '${colors.cardThemeMode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"}' }}>
        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: '${colors.subtitleColor}' }}>Total Amount Due</span>
        <div className="text-2xl font-extrabold tracking-tight mt-0.5" style={{ color: '${colors.titleColor}' }}>
          ${content.amount || "$0.00"}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-2" style={{ color: '${colors.subtitleColor}' }}>
        <span>Due Date:</span>
        <span className="font-semibold" style={{ color: '${colors.titleColor}' }}>${content.dueDate || "Due upon receipt"}</span>
      </div>`;
  } else if (config.sourceCardId.includes("task")) {
    innerJsx = `
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
          ${content.priority || "Medium Priority"}
        </span>
        <div className="flex items-center gap-1 text-xs" style={{ color: '${colors.subtitleColor}' }}>
          <Clock className="w-3.5 h-3.5" />
          <span>${content.dueDate || "Soon"}</span>
        </div>
      </div>

      <h3
        className="font-bold tracking-tight mb-1"
        style={{ fontSize: '${typography.titleFontSize}px', color: '${colors.titleColor}' }}
      >
        ${content.taskTitle || "Task Title"}
      </h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: '${colors.subtitleColor}' }}>
        ${content.taskDescription || "Task summary"}
      </p>

      {/* Progress */}
      <div className="space-y-1 my-2">
        <div className="flex justify-between text-xs" style={{ color: '${colors.subtitleColor}' }}>
          <span>Progress</span>
          <span className="font-bold" style={{ color: '${colors.titleColor}' }}>${content.progress || 0}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: '${content.progress || 0}%', backgroundColor: '${colors.accentColor}' }} />
        </div>
      </div>

      ${
        content.tags && content.tags.length > 0
          ? `<div className="flex flex-wrap gap-1.5 pt-3 border-t mt-auto" style={{ borderColor: '${colors.borderColor}' }}>
        ${content.tags
          .map(
            (tag) => `
        <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
          #${tag}
        </span>`
          )
          .join("\n")}
      </div>`
          : ""
      }`;
  } else if (config.sourceCardId.includes("event")) {
    innerJsx = `
      ${
        image?.show
          ? `<div className="rounded-xl overflow-hidden mb-3">
        <img src="${image.url}" alt="${content.eventTitle || "Event"}" className="w-full h-36 object-cover" />
      </div>`
          : ""
      }

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '${colors.accentColor}' }}>
          <Calendar className="w-3.5 h-3.5" />
          <span>${content.date || "Event Date"} • ${content.time || "Time"}</span>
        </div>
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: '${typography.titleFontSize}px', color: '${colors.titleColor}' }}
        >
          ${content.eventTitle || "Event Title"}
        </h3>
        <div className="flex items-center gap-1.5 text-xs pt-1" style={{ color: '${colors.subtitleColor}' }}>
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>${content.location || "Venue or Online"}</span>
        </div>
      </div>`;
  } else if (config.sourceCardId.includes("alert")) {
    innerJsx = `
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl shrink-0" style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}>
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-sm tracking-tight" style={{ color: '${colors.titleColor}' }}>
            ${content.alertTitle || "Notice"}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: '${colors.subtitleColor}' }}>
            ${content.alertMessage || "Notice message"}
          </p>
        </div>
      </div>`;
  } else {
    // Feature & Generic Blank Card
    innerJsx = `
      ${
        content.icon
          ? `<div
        className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 mb-4"
        style={{ backgroundColor: '${colors.badgeBg}', color: '${colors.badgeTextColor}' }}
      >
        ${content.iconEmoji || "⚡"}
      </div>`
          : ""
      }

      <div className="space-y-2">
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: '${typography.titleFontSize}px', color: '${colors.titleColor}' }}
        >
          ${content.title || "Feature Title"}
        </h3>
        <p
          className="leading-relaxed"
          style={{ fontSize: '${typography.bodyFontSize}px', color: '${colors.subtitleColor}' }}
        >
          ${content.description || "Feature description"}
        </p>
      </div>`;
  }

  // Action Button JSX
  const buttonJsx =
    button?.show && button.label
      ? `
      {/* Action Button */}
      <div className="pt-4 mt-auto">
        <button
          type="button"
          onClick={onAction}
          className={\`flex items-center justify-center gap-2 py-2.5 px-4 font-semibold text-xs transition-all active:scale-[0.98] ${
            button.btnFullWidth ? "w-full" : "w-auto"
          }\`}
          style={{
            backgroundColor: '${button.btnBg}',
            color: '${button.btnTextColor}',
            borderRadius: '${button.btnRadius}px',
          }}
        >
          ${button.btnIconPosition === "left" && button.btnIcon ? `<${button.btnIcon} className="w-4 h-4" />` : ""}
          <span>${button.label}</span>
          ${button.btnIconPosition === "right" && button.btnIcon ? `<${button.btnIcon} className="w-4 h-4" />` : ""}
        </button>
      </div>`
      : "";

  return `import React from "react";
${iconImportStatement}
/**
 * ${componentName}
 * Exported from TemplateHub Card Customizer.
 */
export default function ${componentName}({
  onAction,
  className = "",
}) {
  return (
    <div
      className={\`flex flex-col justify-between transition-all duration-200 \${className}\`}
      style={{
        maxWidth: '${layout.maxWidth}px',
        width: '100%',
        minHeight: '${layout.minHeight ? layout.minHeight + "px" : "auto"}',
        padding: '${layout.padding}px',
        fontFamily: "${typography.fontFamily}",
        borderRadius: '${borders.borderRadius}px',
        borderWidth: '${borders.borderWidth}px',
        borderStyle: '${borders.borderStyle}',
        borderColor: '${colors.borderColor}',
        boxShadow: '${shadowValue}',
        ${bgStyle},
        ${layout.overflowHidden ? "overflow: 'hidden'," : ""}
      }}
    >
      ${innerJsx.trim()}
      ${buttonJsx.trim()}
    </div>
  );
}
`;
}

/**
 * Generates separate React JSX + CSS file.
 */
export function generateReactAndCss(config) {
  const componentName = toPascalCase(config.name || "CustomCard");
  const slug = toSlug(config.name || "custom-card");
  const shadowValue = getShadowCss(config.borders.shadowPreset);

  const css = `/* ${componentName}.css - Standalone styles */
.${slug}-container {
  max-width: ${config.layout.maxWidth}px;
  width: 100%;
  padding: ${config.layout.padding}px;
  border-radius: ${config.borders.borderRadius}px;
  border: ${config.borders.borderWidth}px ${config.borders.borderStyle} ${config.colors.borderColor};
  box-shadow: ${shadowValue};
  font-family: ${config.typography.fontFamily};
  ${
    config.colors.useGradient
      ? `background: linear-gradient(to bottom right, ${config.colors.gradientFrom}, ${
          config.colors.gradientVia ? config.colors.gradientVia + ", " : ""
        }${config.colors.gradientTo});`
      : `background-color: ${config.colors.cardBg};`
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: ${config.layout.overflowHidden ? "hidden" : "visible"};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.${slug}-container:hover {
  ${config.borders.hoverElevation ? "transform: translateY(-2px);" : ""}
}

.${slug}-title {
  font-size: ${config.typography.titleFontSize}px;
  font-weight: ${config.typography.titleFontWeight};
  color: ${config.colors.titleColor};
  line-height: ${config.typography.lineHeight};
  margin: 0;
}

.${slug}-body {
  font-size: ${config.typography.bodyFontSize}px;
  color: ${config.colors.subtitleColor};
  line-height: ${config.typography.lineHeight};
  margin-top: 6px;
}

.${slug}-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: ${config.button.btnRadius}px;
  background-color: ${config.button.btnBg};
  color: ${config.button.btnTextColor};
  width: ${config.button.btnFullWidth ? "100%" : "auto"};
  transition: opacity 0.2s ease;
}

.${slug}-btn:hover {
  opacity: 0.9;
}

@media (max-width: 640px) {
  .${slug}-container {
    max-width: 100%;
    padding: ${Math.max(16, config.layout.padding - 6)}px;
  }
}
`;

  const jsx = `import React from "react";
import "./${componentName}.css";

export default function ${componentName}({ onAction, className = "" }) {
  return (
    <div className={\`${slug}-container \${className}\`}>
      <div>
        <h3 className="${slug}-title">${config.content.name || config.content.title || config.content.planName || "Card Title"}</h3>
        <p className="${slug}-body">${config.content.role || config.content.description || "Card content description."}</p>
      </div>

      ${
        config.button.show
          ? `<div style={{ marginTop: '16px' }}>
        <button type="button" onClick={onAction} className="${slug}-btn">
          ${config.button.label}
        </button>
      </div>`
          : ""
      }
    </div>
  );
}
`;

  return { jsx, css };
}

/**
 * Generates standalone, valid HTML5 file with embedded CSS.
 */
export function generateHtmlCss(config) {
  const title = escapeText(config.name || "Custom Card");
  const shadowValue = getShadowCss(config.borders.shadowPreset);
  const slug = toSlug(config.name || "custom-card");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #0b0f19;
      color: #f8fafc;
      font-family: ${config.typography.fontFamily};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .${slug}-card {
      max-width: ${config.layout.maxWidth}px;
      width: 100%;
      padding: ${config.layout.padding}px;
      border-radius: ${config.borders.borderRadius}px;
      border: ${config.borders.borderWidth}px ${config.borders.borderStyle} ${config.colors.borderColor};
      box-shadow: ${shadowValue};
      ${
        config.colors.useGradient
          ? `background: linear-gradient(to bottom right, ${config.colors.gradientFrom}, ${
              config.colors.gradientVia ? config.colors.gradientVia + ", " : ""
            }${config.colors.gradientTo});`
          : `background-color: ${config.colors.cardBg};`
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: ${config.layout.overflowHidden ? "hidden" : "visible"};
    }
    .${slug}-title {
      font-size: ${config.typography.titleFontSize}px;
      font-weight: ${config.typography.titleFontWeight};
      color: ${config.colors.titleColor};
      margin-bottom: 6px;
    }
    .${slug}-desc {
      font-size: ${config.typography.bodyFontSize}px;
      color: ${config.colors.subtitleColor};
      line-height: 1.5;
    }
    .${slug}-button {
      margin-top: 20px;
      padding: 12px 20px;
      font-size: 13px;
      font-weight: 600;
      border: none;
      border-radius: ${config.button.btnRadius}px;
      background-color: ${config.button.btnBg};
      color: ${config.button.btnTextColor};
      cursor: pointer;
      width: ${config.button.btnFullWidth ? "100%" : "auto"};
      transition: opacity 0.2s ease;
    }
    .${slug}-button:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="${slug}-card">
    <div>
      <h2 class="${slug}-title">${escapeText(config.content.name || config.content.title || config.content.planName || config.name)}</h2>
      <p class="${slug}-desc">${escapeText(config.content.role || config.content.description || config.content.quote || "Crafted using TemplateHub Card Customizer.")}</p>
    </div>
    ${
      config.button.show
        ? `<button class="${slug}-button" onclick="alert('Card Action Clicked!')">
      ${escapeText(config.button.label)}
    </button>`
        : ""
    }
  </div>
</body>
</html>
`;
}
