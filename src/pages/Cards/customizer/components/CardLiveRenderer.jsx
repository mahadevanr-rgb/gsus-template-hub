import React, { useState } from "react";
import * as LucideIcons from "lucide-react";

/**
 * Resolves shadow CSS value from preset
 */
function getShadowCss(preset, accentColor) {
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
      return `0 0 25px -3px ${accentColor || "rgba(99, 102, 241, 0.45)"}`;
    default:
      return "0 10px 15px -3px rgb(0 0 0 / 0.1)";
  }
}

/**
 * Dynamically resolves a Lucide icon component by name safely.
 */
function DynamicLucideIcon({ name, className = "w-4 h-4", fallback = null }) {
  if (!name) return fallback;
  const Component = LucideIcons[name];
  if (!Component) return fallback;
  return <Component className={className} />;
}

export default function CardLiveRenderer({ config, onPreviewAction, previewMode = true }) {
  const [toastMessage, setToastMessage] = useState(null);

  if (!config) return null;

  const {
    sourceCardId = "profile-card",
    layout = {},
    colors = {},
    typography = {},
    borders = {},
    content = {},
    button = {},
    image = {},
    interactive = {},
  } = config;

  const shadowCss = getShadowCss(borders.shadowPreset, colors.accentColor);

  const handleAction = (e) => {
    if (previewMode) {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      setToastMessage("Button clicked in preview mode!");
      setTimeout(() => setToastMessage(null), 2000);
    }
    if (onPreviewAction) onPreviewAction();
  };

  const bgStyle = colors.useGradient
    ? {
        background: `linear-gradient(${
          colors.gradientDirection === "to-r"
            ? "to right"
            : colors.gradientDirection === "to-b"
            ? "to bottom"
            : colors.gradientDirection === "to-tr"
            ? "to top right"
            : "to bottom right"
        }, ${colors.gradientFrom}, ${colors.gradientVia ? colors.gradientVia + ", " : ""}${colors.gradientTo})`,
      }
    : { backgroundColor: colors.cardBg || "#ffffff" };

  return (
    <div className="relative group/canvas flex justify-center w-full">
      {/* Toast Feedback for interactive testing */}
      {toastMessage && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150">
          ✓ {toastMessage}
        </div>
      )}

      {/* Main Customized Card Container */}
      <div
        className={`flex flex-col justify-between transition-all duration-200 relative ${
          borders.hoverElevation ? "hover:-translate-y-1 hover:shadow-2xl" : ""
        } ${interactive.customClassName || ""}`}
        style={{
          maxWidth: `${layout.maxWidth || 380}px`,
          minWidth: `${Math.min(layout.maxWidth || 380, 280)}px`,
          width: "100%",
          minHeight: layout.minHeight ? `${layout.minHeight}px` : "auto",
          padding: `${layout.padding || 24}px`,
          fontFamily: typography.fontFamily || "Inter, sans-serif",
          borderRadius: `${borders.borderRadius ?? 24}px`,
          borderWidth: `${borders.borderWidth ?? 1}px`,
          borderStyle: borders.borderStyle || "solid",
          borderColor: colors.borderColor || "#e2e8f0",
          boxShadow: shadowCss,
          overflow: layout.overflowHidden !== false ? "hidden" : "visible",
          ...bgStyle,
        }}
      >
        {/* Render Card Type Specific Content */}
        {renderCardContent({
          sourceCardId,
          content,
          colors,
          typography,
          image,
          layout,
        })}

        {/* Action Button */}
        {button?.show && button.label && (
          <div className="pt-4 mt-auto">
            <button
              type="button"
              onClick={handleAction}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer ${
                button.btnFullWidth ? "w-full" : "w-auto"
              }`}
              style={{
                backgroundColor: button.btnBg || colors.accentColor || "#6366f1",
                color: button.btnTextColor || "#ffffff",
                borderRadius: `${button.btnRadius ?? 12}px`,
              }}
            >
              {button.btnIconPosition === "left" && button.btnIcon && (
                <DynamicLucideIcon name={button.btnIcon} className="w-4 h-4 shrink-0" />
              )}
              <span>{button.label}</span>
              {button.btnIconPosition === "right" && button.btnIcon && (
                <DynamicLucideIcon name={button.btnIcon} className="w-4 h-4 shrink-0" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Internal renderer for card-type specific contents
 */
function renderCardContent({ sourceCardId, content, colors, typography, image, layout }) {
  // 1. Profile Card Family
  if (sourceCardId.includes("profile") || sourceCardId.includes("team") || sourceCardId.includes("user")) {
    return (
      <div className="space-y-4">
        {content.showCoverBanner !== false && (
          <div
            className={`relative h-28 sm:h-32 w-full rounded-2xl bg-gradient-to-tr ${
              content.coverGradient || "from-indigo-600 via-purple-600 to-pink-500"
            } overflow-hidden flex items-center justify-center -mx-0`}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
          </div>
        )}

        <div className="text-center px-2 pt-0">
          {image?.show && (
            <div
              className={`relative ${
                content.showCoverBanner !== false ? "-mt-12" : "mt-1"
              } mb-3 inline-block`}
            >
              <img
                src={image.url}
                alt={content.name || "Avatar"}
                className={`w-20 h-20 sm:w-22 sm:h-22 ${
                  image.avatarShape === "square"
                    ? "rounded-2xl"
                    : image.avatarShape === "rounded"
                    ? "rounded-3xl"
                    : "rounded-full"
                } object-cover border-4 border-white dark:border-slate-900 shadow-md ring-1 ring-black/5 mx-auto`}
              />
            </div>
          )}

          <h3
            className="font-bold tracking-tight"
            style={{
              fontSize: `${typography.titleFontSize || 20}px`,
              fontWeight: typography.titleFontWeight || "700",
              color: colors.titleColor || "#0f172a",
            }}
          >
            {content.name || "Adela Parkson"}
          </h3>
          <p
            className="font-medium mt-0.5"
            style={{
              fontSize: `${typography.bodyFontSize || 14}px`,
              color: colors.subtitleColor || "#64748b",
            }}
          >
            {content.role || "Product Designer"}
          </p>

          {content.bio && (
            <p
              className="mt-2 text-xs leading-relaxed max-w-xs mx-auto"
              style={{ color: colors.subtitleColor || "#64748b" }}
            >
              {content.bio}
            </p>
          )}

          {content.stats && content.stats.length > 0 && (
            <div
              className="grid gap-2 mt-5 pt-4 border-t"
              style={{
                gridTemplateColumns: `repeat(${content.stats.length}, minmax(0, 1fr))`,
                borderColor: colors.borderColor || "#e2e8f0",
              }}
            >
              {content.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-0 px-1 text-center">
                  <span
                    className="text-base font-bold tracking-tight truncate w-full"
                    style={{ color: colors.titleColor || "#0f172a" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] font-medium uppercase tracking-wider mt-0.5 truncate w-full"
                    style={{ color: colors.subtitleColor || "#64748b" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Pricing Card Family
  if (sourceCardId.includes("pricing") || sourceCardId.includes("subscription") || sourceCardId.includes("comparison")) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          {content.highlighted && content.highlightBadge && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: colors.badgeBg || "#e0e7ff",
                color: colors.badgeTextColor || "#4338ca",
              }}
            >
              <LucideIcons.Sparkles className="w-3.5 h-3.5" />
              <span>{content.highlightBadge}</span>
            </div>
          )}

          <h3
            className="font-bold tracking-tight"
            style={{
              fontSize: `${typography.titleFontSize || 20}px`,
              fontWeight: typography.titleFontWeight || "700",
              color: colors.titleColor || "#0f172a",
            }}
          >
            {content.planName || "Pro Plan"}
          </h3>

          <div className="flex items-baseline justify-center gap-1 pt-1">
            <span
              className="text-2xl font-bold"
              style={{ color: colors.titleColor || "#0f172a" }}
            >
              {content.currency || "$"}
            </span>
            <span
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: colors.titleColor || "#0f172a" }}
            >
              {content.price || "29"}
            </span>
          </div>
          <p
            className="text-xs"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            {content.priceUnit || "/ month"}
          </p>

          {content.description && (
            <p
              className="text-xs pt-1 leading-relaxed"
              style={{ color: colors.subtitleColor || "#64748b" }}
            >
              {content.description}
            </p>
          )}
        </div>

        {content.features && content.features.length > 0 && (
          <div
            className="mt-6 pt-5 border-t space-y-3"
            style={{ borderColor: colors.borderColor || "#e2e8f0" }}
          >
            {content.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: colors.badgeBg || "#e0e7ff",
                    color: colors.badgeTextColor || "#4338ca",
                  }}
                >
                  <LucideIcons.Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span style={{ color: colors.titleColor || "#0f172a" }}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 3. Testimonial Card Family
  if (sourceCardId.includes("testimonial") || sourceCardId.includes("review")) {
    const clampedRating = Math.max(1, Math.min(5, Math.round(content.rating || 5)));
    return (
      <div className="space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-3">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <LucideIcons.Star
                key={i}
                className={`w-4 h-4 ${
                  i < clampedRating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>

          <blockquote
            className="italic leading-relaxed my-2"
            style={{
              fontSize: `${typography.bodyFontSize || 14}px`,
              color: colors.titleColor || "#0f172a",
            }}
          >
            "{content.quote || "Outstanding service and design precision."}"
          </blockquote>
        </div>

        <div
          className="flex items-center gap-3 pt-4 border-t mt-auto"
          style={{ borderColor: colors.borderColor || "#e2e8f0" }}
        >
          {image?.show && (
            <img
              src={image.url}
              alt={content.authorName || "Author"}
              className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-black/5"
            />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4
                className="text-xs sm:text-sm font-bold truncate"
                style={{ color: colors.titleColor || "#0f172a" }}
              >
                {content.authorName || "Author Name"}
              </h4>
              {content.verified && (
                <LucideIcons.CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              )}
            </div>
            <p
              className="text-[11px] truncate"
              style={{ color: colors.subtitleColor || "#64748b" }}
            >
              {content.authorRole || "Customer"}
              {content.authorCompany ? `, ${content.authorCompany}` : ""}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 4. Stat & Metric Card Family
  if (sourceCardId.includes("stat") || sourceCardId.includes("kpi") || sourceCardId.includes("metric") || sourceCardId.includes("progress")) {
    const isUp = content.changeDirection !== "down";
    return (
      <div className="space-y-3 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[11px] font-bold tracking-wider uppercase"
              style={{ color: colors.subtitleColor || "#64748b" }}
            >
              {content.label || "METRIC"}
            </span>
            {content.changePercent && (
              <div
                className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isUp ? "#dcfce7" : "#fee2e2",
                  color: isUp ? "#15803d" : "#b91c1c",
                }}
              >
                <span>{isUp ? "↑" : "↓"}</span>
                <span>{content.changePercent}</span>
              </div>
            )}
          </div>

          <div
            className="font-extrabold tracking-tight mt-1"
            style={{
              fontSize: `${(typography.titleFontSize || 20) * 1.5}px`,
              color: colors.titleColor || "#0f172a",
            }}
          >
            {content.value || "124,800"}
          </div>

          {content.sparklineData && content.sparklineData.length > 0 && (
            <div className="flex items-end gap-1.5 h-10 pt-2 my-2">
              {content.sparklineData.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-sm transition-all hover:opacity-100 opacity-80"
                  style={{
                    height: `${val}%`,
                    backgroundColor: colors.accentColor || "#6366f1",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {(content.footerLeft || content.footerRight) && (
          <div
            className="flex items-center justify-between text-[11px] pt-3 border-t mt-auto"
            style={{
              borderColor: colors.borderColor || "#e2e8f0",
              color: colors.subtitleColor || "#64748b",
            }}
          >
            <span>{content.footerLeft || ""}</span>
            <span className="font-semibold">{content.footerRight || ""}</span>
          </div>
        )}
      </div>
    );
  }

  // 5. Product Card Family
  if (sourceCardId.includes("product") || sourceCardId.includes("ecommerce")) {
    return (
      <div className="space-y-3">
        {image?.show && (
          <div className="relative overflow-hidden rounded-xl mb-3">
            <img
              src={image.url}
              alt={content.productName || "Product"}
              className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
            />
            {content.badge && (
              <span
                className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm"
                style={{
                  backgroundColor: colors.badgeBg || "#e0e7ff",
                  color: colors.badgeTextColor || "#4338ca",
                }}
              >
                {content.badge}
              </span>
            )}
          </div>
        )}

        <div className="space-y-1">
          <span
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            {content.category || "Featured Product"}
          </span>
          <h3
            className="font-bold tracking-tight"
            style={{
              fontSize: `${typography.titleFontSize || 20}px`,
              fontWeight: typography.titleFontWeight || "700",
              color: colors.titleColor || "#0f172a",
            }}
          >
            {content.productName || "Product Title"}
          </h3>
          <p
            className="text-xs line-clamp-2 leading-relaxed"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            {content.description || "Product overview"}
          </p>
        </div>

        <div className="flex items-baseline gap-2 pt-2">
          <span
            className="text-xl font-extrabold"
            style={{ color: colors.titleColor || "#0f172a" }}
          >
            {content.price || "$199"}
          </span>
          {content.originalPrice && (
            <span
              className="text-xs line-through"
              style={{ color: colors.subtitleColor || "#64748b" }}
            >
              {content.originalPrice}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 6. Invoice / Finance Family
  if (sourceCardId.includes("invoice") || sourceCardId.includes("transaction") || sourceCardId.includes("payment")) {
    return (
      <div className="space-y-3">
        <div
          className="flex items-center justify-between pb-3 border-b"
          style={{ borderColor: colors.borderColor || "#e2e8f0" }}
        >
          <div>
            <span
              className="text-[10px] uppercase font-bold tracking-wider"
              style={{ color: colors.subtitleColor || "#64748b" }}
            >
              Invoice ID
            </span>
            <h4
              className="text-xs font-mono font-bold"
              style={{ color: colors.titleColor || "#0f172a" }}
            >
              {content.invoiceNumber || "INV-001"}
            </h4>
          </div>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: colors.badgeBg || "#dcfce7",
              color: colors.badgeTextColor || "#15803d",
            }}
          >
            {content.status || "Paid"}
          </span>
        </div>

        <div className="space-y-0.5 my-2">
          <span
            className="text-[11px]"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            Billed To:
          </span>
          <h3
            className="text-sm font-bold"
            style={{ color: colors.titleColor || "#0f172a" }}
          >
            {content.clientName || "Client Name"}
          </h3>
          <p
            className="text-xs font-mono"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            {content.clientEmail || ""}
          </p>
        </div>

        <div
          className="p-3.5 rounded-xl my-2"
          style={{ backgroundColor: "rgba(99, 102, 241, 0.06)" }}
        >
          <span
            className="text-[10px] uppercase font-bold tracking-wider"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            Total Amount Due
          </span>
          <div
            className="text-2xl font-extrabold tracking-tight mt-0.5"
            style={{ color: colors.titleColor || "#0f172a" }}
          >
            {content.amount || "$0.00"}
          </div>
        </div>

        <div
          className="flex items-center justify-between text-xs pt-1"
          style={{ color: colors.subtitleColor || "#64748b" }}
        >
          <span>Due Date:</span>
          <span
            className="font-semibold"
            style={{ color: colors.titleColor || "#0f172a" }}
          >
            {content.dueDate || "Due upon receipt"}
          </span>
        </div>
      </div>
    );
  }

  // 7. Task / Kanban Family
  if (sourceCardId.includes("task") || sourceCardId.includes("kanban") || sourceCardId.includes("project")) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: colors.badgeBg || "#fee2e2",
              color: colors.badgeTextColor || "#b91c1c",
            }}
          >
            {content.priority || "Medium Priority"}
          </span>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            <LucideIcons.Clock className="w-3.5 h-3.5" />
            <span>{content.dueDate || "Soon"}</span>
          </div>
        </div>

        <h3
          className="font-bold tracking-tight"
          style={{
            fontSize: `${typography.titleFontSize || 20}px`,
            fontWeight: typography.titleFontWeight || "700",
            color: colors.titleColor || "#0f172a",
          }}
        >
          {content.taskTitle || "Task Title"}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: colors.subtitleColor || "#64748b" }}
        >
          {content.taskDescription || "Task summary"}
        </p>

        <div className="space-y-1 my-2">
          <div
            className="flex justify-between text-xs"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            <span>Progress</span>
            <span
              className="font-bold"
              style={{ color: colors.titleColor || "#0f172a" }}
            >
              {content.progress || 0}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${content.progress || 0}%`,
                backgroundColor: colors.accentColor || "#6366f1",
              }}
            />
          </div>
        </div>

        {content.tags && content.tags.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 pt-3 border-t"
            style={{ borderColor: colors.borderColor || "#e2e8f0" }}
          >
            {content.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-medium"
                style={{
                  backgroundColor: colors.badgeBg || "#e0e7ff",
                  color: colors.badgeTextColor || "#4338ca",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 8. Event / Booking Family
  if (sourceCardId.includes("event") || sourceCardId.includes("booking") || sourceCardId.includes("appointment")) {
    return (
      <div className="space-y-3">
        {image?.show && (
          <div className="rounded-xl overflow-hidden mb-3">
            <img
              src={image.url}
              alt={content.eventTitle || "Event"}
              className="w-full h-36 object-cover"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <div
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: colors.accentColor || "#6366f1" }}
          >
            <LucideIcons.Calendar className="w-3.5 h-3.5" />
            <span>
              {content.date || "Date"} • {content.time || "Time"}
            </span>
          </div>
          <h3
            className="font-bold tracking-tight"
            style={{
              fontSize: `${typography.titleFontSize || 20}px`,
              fontWeight: typography.titleFontWeight || "700",
              color: colors.titleColor || "#0f172a",
            }}
          >
            {content.eventTitle || "Event Title"}
          </h3>
          <div
            className="flex items-center gap-1.5 text-xs pt-1"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            <LucideIcons.MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{content.location || "Venue or Stream"}</span>
          </div>
        </div>
      </div>
    );
  }

  // 9. Alert / Notification Family
  if (sourceCardId.includes("alert") || sourceCardId.includes("notification") || sourceCardId.includes("status")) {
    return (
      <div className="flex items-start gap-3">
        <div
          className="p-2 rounded-xl shrink-0"
          style={{
            backgroundColor: colors.badgeBg || "#fef3c7",
            color: colors.badgeTextColor || "#b45309",
          }}
        >
          <LucideIcons.AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3
            className="font-bold text-sm tracking-tight"
            style={{ color: colors.titleColor || "#0f172a" }}
          >
            {content.alertTitle || "System Notice"}
          </h3>
          <p
            className="text-xs leading-relaxed"
            style={{ color: colors.subtitleColor || "#64748b" }}
          >
            {content.alertMessage || "Notice message"}
          </p>
        </div>
      </div>
    );
  }

  // 10. Default / Feature / Blank Card
  return (
    <div className="space-y-3">
      {content.icon && (
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 mb-3"
          style={{
            backgroundColor: colors.badgeBg || "#e0e7ff",
            color: colors.badgeTextColor || "#4338ca",
          }}
        >
          {content.iconEmoji || "⚡"}
        </div>
      )}

      <div className="space-y-2">
        <h3
          className="font-bold tracking-tight"
          style={{
            fontSize: `${typography.titleFontSize || 20}px`,
            fontWeight: typography.titleFontWeight || "700",
            color: colors.titleColor || "#0f172a",
          }}
        >
          {content.title || "Feature Showcase"}
        </h3>
        <p
          className="leading-relaxed"
          style={{
            fontSize: `${typography.bodyFontSize || 14}px`,
            color: colors.subtitleColor || "#64748b",
          }}
        >
          {content.description || "Feature description"}
        </p>
      </div>
    </div>
  );
}
