import React, { useState, useMemo } from "react";
import {
  Plus,
  Minus,
  ChevronDown,
  Check,
  Heart,
  Users,
  User,
  Glasses,
  ThumbsUp,
  FileText,
  Wallet,
  Star,
  Settings,
  Home,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Info,
  Layers,
  Zap,
  Shield,
  Lock,
  Tag,
  Calendar,
  Clock,
  Banknote,
  Users2,
} from "lucide-react";
import { getShadowValue } from "../accordionCustomizationUtils";

const ICON_MAP = {
  Heart,
  Users,
  User,
  Glasses,
  ThumbsUp,
  FileText,
  Wallet,
  Star,
  Settings,
  Home,
  Mail,
  Phone,
  Globe,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Info,
  Layers,
  Zap,
  Shield,
  Lock,
  Tag,
  Calendar,
  Clock,
  Banknote,
  Users2,
};

function resolveIcon(iconName) {
  if (!iconName) return null;
  return ICON_MAP[iconName] || null;
}

export default function AccordionLiveRenderer({ config = {}, previewMode = true }) {
  const {
    sourceComponentId = "numbered-accordion",
    items = [],
    expansionMode = "single",
    collapsible = true,
    initialExpandedItem,
    initialExpandedItems,
    colors = {},
    borders = {},
    typography = {},
    icons: iconConfig = {},
    animation = {},
    layout = {},
    patternSpecific = {},
  } = config || {};

  const isMultiple = expansionMode === "multiple";

  // Expansion state
  const [openItems, setOpenItems] = useState(() => {
    if (isMultiple) {
      if (Array.isArray(initialExpandedItems) && initialExpandedItems.length > 0) {
        return initialExpandedItems;
      }
      return items[0]?.id ? [items[0].id] : [];
    }
    return initialExpandedItem || (items[0]?.id ?? null);
  });

  // Keep openItems in sync when switching patterns
  React.useEffect(() => {
    if (isMultiple) {
      if (Array.isArray(initialExpandedItems) && initialExpandedItems.length > 0) {
        setOpenItems(initialExpandedItems);
      } else if (items[0]?.id) {
        setOpenItems([items[0].id]);
      }
    } else {
      setOpenItems(initialExpandedItem || items[0]?.id || null);
    }
  }, [sourceComponentId, initialExpandedItem, isMultiple]);

  // Filter selections state for filter-accordion pattern
  const [filterSelections, setFilterSelections] = useState(() => {
    const initial = {};
    (items || []).forEach((item) => {
      initial[item.id] = (item.options || [])
        .filter((o) => o.selected)
        .map((o) => o.id);
    });
    return initial;
  });

  // Hover state for interactive feel
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const isOpen = (id) => {
    if (isMultiple) {
      return Array.isArray(openItems) && openItems.includes(id);
    }
    return openItems === id;
  };

  const toggle = (id) => {
    if (isMultiple) {
      setOpenItems((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        return current.includes(id)
          ? current.filter((v) => v !== id)
          : [...current, id];
      });
    } else {
      setOpenItems((prev) => {
        if (prev === id) {
          return collapsible ? null : id;
        }
        return id;
      });
    }
  };

  // Border & shadow styling
  const borderRadius = borders.borderRadius ? `${borders.borderRadius}px` : "16px";
  const itemSpacing = borders.itemSpacing ? Number(borders.itemSpacing) : 0;
  const isSeparated = itemSpacing > 0;
  const borderWidth = borders.borderWidth !== undefined ? `${borders.borderWidth}px` : "1px";
  const borderStyle = borders.borderStyle || "solid";
  const borderColor = colors.borderColor || "#334155";
  const borderCss = borders.borderWidth === "0" || borders.borderStyle === "none"
    ? "none"
    : `${borderWidth} ${borderStyle} ${borderColor}`;
  const shadowCss = getShadowValue(borders.shadow || "none");

  // Animation transition string
  const animDuration = animation.enabled && animation.preset !== "none"
    ? Number(animation.duration || 300)
    : 0;
  const animEasing = animation.easing || "cubic-bezier(0.4, 0, 0.2, 1)";
  const transitionCss = animDuration > 0
    ? `all ${animDuration}ms ${animEasing}`
    : "none";

  // Common font family
  const fontFamily = typography.fontFamily || "Inter, sans-serif";

  /* ─────────────────────────────────────────────────────────────────────────── */
  /* PATTERN 1: Numbered FAQ Accordion                                           */
  /* ─────────────────────────────────────────────────────────────────────────── */
  const renderNumberedAccordion = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isSeparated ? `${itemSpacing}px` : "0px",
          borderRadius: isSeparated ? "0px" : borderRadius,
          backgroundColor: isSeparated ? "transparent" : colors.itemBg || "#0f172a",
          border: isSeparated ? "none" : borderCss,
          boxShadow: isSeparated ? "none" : shadowCss,
          overflow: "hidden",
          fontFamily,
        }}
      >
        {items.map((item, index) => {
          const itemId = item.id || String(index + 1).padStart(2, "0");
          const num = item.id || String(index + 1).padStart(2, "0");
          const open = isOpen(itemId);
          const isHovered = hoveredItemId === itemId;

          return (
            <div
              key={itemId}
              onMouseEnter={() => setHoveredItemId(itemId)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                borderRadius: isSeparated ? borderRadius : "0px",
                border: isSeparated ? borderCss : "none",
                borderTop: !isSeparated && index > 0 && borders.showDivider !== false
                  ? `1px solid ${borderColor}`
                  : "none",
                boxShadow: isSeparated ? shadowCss : "none",
                backgroundColor: open
                  ? colors.expandedHeaderBg || "#1e293b"
                  : isHovered
                  ? colors.hoverBg || colors.headerBg || "#0f172a"
                  : colors.headerBg || colors.itemBg || "#0f172a",
                transition: transitionCss,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                aria-expanded={open}
                disabled={item.disabled}
                onClick={() => !item.disabled && toggle(itemId)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${layout.headerPaddingY || 24}px ${layout.headerPaddingX || 28}px`,
                  border: "none",
                  background: "transparent",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  opacity: item.disabled ? 0.5 : 1,
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  {/* Large Index Number */}
                  <span
                    style={{
                      fontSize: "28px",
                      fontWeight: "900",
                      color: open
                        ? colors.accentColor || "#6366f1"
                        : colors.titleColor || "#f8fafc",
                      letterSpacing: "-0.03em",
                      userSelect: "none",
                      flexShrink: 0,
                      transition: transitionCss,
                    }}
                  >
                    {num}
                  </span>

                  {/* Title */}
                  <span
                    style={{
                      fontSize: `${typography.titleFontSize || 17}px`,
                      fontWeight: typography.titleFontWeight || 700,
                      color: colors.titleColor || "#f8fafc",
                      lineHeight: "1.35",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title || item.question}
                  </span>
                </div>

                {/* Circular Trigger Icon */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: open
                      ? colors.accentColor || "#6366f1"
                      : "rgba(100, 116, 139, 0.2)",
                    color: open ? "#ffffff" : colors.iconColor || "#94a3b8",
                    flexShrink: 0,
                    transition: transitionCss,
                  }}
                >
                  {open ? (
                    <Minus style={{ width: "16px", height: "16px", strokeWidth: 2.5 }} />
                  ) : (
                    <Plus style={{ width: "16px", height: "16px", strokeWidth: 2.5 }} />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {open && (
                <div
                  style={{
                    padding: `${layout.contentPaddingY || 16}px ${layout.contentPaddingX || 28}px 24px 80px`,
                    backgroundColor: colors.contentBg || "transparent",
                    color: colors.contentColor || "#94a3b8",
                    fontSize: `${typography.contentFontSize || 14}px`,
                    lineHeight: typography.contentLineHeight || 1.6,
                    borderTop: `1px solid ${borderColor}20`,
                  }}
                >
                  {item.content || item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ─────────────────────────────────────────────────────────────────────────── */
  /* PATTERN 2: Filter Selection Accordion                                       */
  /* ─────────────────────────────────────────────────────────────────────────── */
  const renderFilterAccordion = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isSeparated ? `${itemSpacing}px` : "0px",
          borderRadius: isSeparated ? "0px" : borderRadius,
          backgroundColor: isSeparated ? "transparent" : colors.itemBg || "#0f172a",
          border: isSeparated ? "none" : borderCss,
          boxShadow: isSeparated ? "none" : shadowCss,
          overflow: "hidden",
          fontFamily,
        }}
      >
        {items.map((item, index) => {
          const itemId = item.id;
          const open = isOpen(itemId);
          const isHovered = hoveredItemId === itemId;
          const selectedForThis = filterSelections[itemId] || [];
          const selectedCount = selectedForThis.length;

          return (
            <div
              key={itemId}
              onMouseEnter={() => setHoveredItemId(itemId)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                borderRadius: isSeparated ? borderRadius : "0px",
                border: isSeparated ? borderCss : "none",
                borderTop: !isSeparated && index > 0 && borders.showDivider !== false
                  ? `1px solid ${borderColor}`
                  : "none",
                boxShadow: isSeparated ? shadowCss : "none",
                backgroundColor: colors.itemBg || "#0f172a",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => toggle(itemId)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${layout.headerPaddingY || 16}px ${layout.headerPaddingX || 20}px`,
                  backgroundColor: open
                    ? colors.expandedHeaderBg || "#1e293b"
                    : isHovered
                    ? colors.hoverBg || colors.headerBg || "#0f172a"
                    : colors.headerBg || colors.itemBg || "#0f172a",
                  border: "none",
                  cursor: "pointer",
                  transition: transitionCss,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontSize: `${typography.titleFontSize || 15}px`,
                      fontWeight: typography.titleFontWeight || 600,
                      color: colors.titleColor || "#f8fafc",
                    }}
                  >
                    {item.title}
                  </span>
                  {selectedCount > 0 && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "700",
                        backgroundColor: colors.accentColor || "#6366f1",
                        color: "#ffffff",
                      }}
                    >
                      {selectedCount}
                    </span>
                  )}
                </div>

                <ChevronDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: colors.iconColor || "#94a3b8",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: transitionCss,
                  }}
                />
              </button>

              {open && (
                <div
                  style={{
                    padding: `${layout.contentPaddingY || 14}px ${layout.contentPaddingX || 20}px`,
                    backgroundColor: colors.contentBg || "transparent",
                    borderTop: `1px solid ${borderColor}20`,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {(item.options || []).map((opt) => {
                      const isChecked = selectedForThis.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: `${typography.contentFontSize || 13}px`,
                            color: isChecked
                              ? colors.titleColor || "#f8fafc"
                              : colors.contentColor || "#94a3b8",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFilterSelections((prev) => {
                                const current = prev[itemId] || [];
                                return {
                                  ...prev,
                                  [itemId]: checked
                                    ? [...current, opt.id]
                                    : current.filter((id) => id !== opt.id),
                                };
                              });
                            }}
                            style={{
                              accentColor: colors.accentColor || "#6366f1",
                              width: "16px",
                              height: "16px",
                              cursor: "pointer",
                            }}
                          />
                          <span>{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ─────────────────────────────────────────────────────────────────────────── */
  /* PATTERN 3: Simple FAQ Accordion                                             */
  /* ─────────────────────────────────────────────────────────────────────────── */
  const renderSimpleAccordion = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isSeparated ? `${itemSpacing}px` : "0px",
          borderRadius: isSeparated ? "0px" : borderRadius,
          backgroundColor: isSeparated ? "transparent" : colors.itemBg || "#0f172a",
          border: isSeparated ? "none" : borderCss,
          boxShadow: isSeparated ? "none" : shadowCss,
          overflow: "hidden",
          fontFamily,
        }}
      >
        {items.map((item, index) => {
          const itemId = item.id || `faq-${index + 1}`;
          const open = isOpen(itemId);
          const isHovered = hoveredItemId === itemId;

          return (
            <div
              key={itemId}
              onMouseEnter={() => setHoveredItemId(itemId)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                borderRadius: isSeparated ? borderRadius : "0px",
                border: isSeparated ? borderCss : "none",
                borderTop: !isSeparated && index > 0 && borders.showDivider !== false
                  ? `1px solid ${borderColor}`
                  : "none",
                boxShadow: isSeparated ? shadowCss : "none",
                backgroundColor: colors.itemBg || "#0f172a",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                aria-expanded={open}
                disabled={item.disabled}
                onClick={() => !item.disabled && toggle(itemId)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${layout.headerPaddingY || 18}px ${layout.headerPaddingX || 22}px`,
                  backgroundColor: open
                    ? colors.expandedHeaderBg || "#1e293b"
                    : isHovered
                    ? colors.hoverBg || colors.headerBg || "#0f172a"
                    : colors.headerBg || colors.itemBg || "#0f172a",
                  border: "none",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  opacity: item.disabled ? 0.5 : 1,
                  textAlign: "left",
                  transition: transitionCss,
                }}
              >
                <span
                  style={{
                    fontSize: `${typography.titleFontSize || 15}px`,
                    fontWeight: typography.titleFontWeight || 600,
                    color: colors.titleColor || "#f8fafc",
                    paddingRight: "16px",
                  }}
                >
                  {item.title || item.question}
                </span>

                <ChevronDown
                  style={{
                    width: "18px",
                    height: "18px",
                    color: colors.iconColor || "#94a3b8",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: transitionCss,
                    flexShrink: 0,
                  }}
                />
              </button>

              {open && (
                <div
                  style={{
                    padding: `${layout.contentPaddingY || 16}px ${layout.contentPaddingX || 22}px`,
                    backgroundColor: colors.contentBg || "transparent",
                    color: colors.contentColor || "#94a3b8",
                    fontSize: `${typography.contentFontSize || 14}px`,
                    lineHeight: typography.contentLineHeight || 1.6,
                    borderTop: `1px solid ${borderColor}20`,
                  }}
                >
                  {item.content || item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ─────────────────────────────────────────────────────────────────────────── */
  /* PATTERN 4: Icon Navigation Accordion                                        */
  /* ─────────────────────────────────────────────────────────────────────────── */
  const renderIconAccordion = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isSeparated ? `${itemSpacing}px` : "0px",
          borderRadius: isSeparated ? "0px" : borderRadius,
          backgroundColor: isSeparated ? "transparent" : colors.itemBg || "#0f172a",
          border: isSeparated ? "none" : borderCss,
          boxShadow: isSeparated ? "none" : shadowCss,
          overflow: "hidden",
          fontFamily,
        }}
      >
        {items.map((item, index) => {
          const itemId = item.id || `icon-${index + 1}`;
          const open = isOpen(itemId);
          const isHovered = hoveredItemId === itemId;
          const ItemIcon = resolveIcon(item.icon) || Heart;

          return (
            <div
              key={itemId}
              onMouseEnter={() => setHoveredItemId(itemId)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                borderRadius: isSeparated ? borderRadius : "0px",
                border: isSeparated ? borderCss : "none",
                borderTop: !isSeparated && index > 0 && borders.showDivider !== false
                  ? `1px solid ${borderColor}`
                  : "none",
                boxShadow: isSeparated ? shadowCss : "none",
                backgroundColor: colors.itemBg || "#0f172a",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => toggle(itemId)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${layout.headerPaddingY || 16}px ${layout.headerPaddingX || 20}px`,
                  backgroundColor: open
                    ? colors.expandedHeaderBg || "#1e293b"
                    : isHovered
                    ? colors.hoverBg || colors.headerBg || "#0f172a"
                    : colors.headerBg || colors.itemBg || "#0f172a",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: transitionCss,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: open
                        ? colors.accentColor || "#f59e0b"
                        : "rgba(100, 116, 139, 0.2)",
                      color: open ? "#ffffff" : colors.iconColor || "#f59e0b",
                      transition: transitionCss,
                      flexShrink: 0,
                    }}
                  >
                    <ItemIcon style={{ width: "18px", height: "18px" }} />
                  </div>

                  <span
                    style={{
                      fontSize: `${typography.titleFontSize || 15}px`,
                      fontWeight: typography.titleFontWeight || 600,
                      color: colors.titleColor || "#f8fafc",
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                <ChevronDown
                  style={{
                    width: "18px",
                    height: "18px",
                    color: colors.iconColor || "#94a3b8",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: transitionCss,
                  }}
                />
              </button>

              {open && (
                <div
                  style={{
                    padding: `${layout.contentPaddingY || 16}px ${layout.contentPaddingX || 20}px 18px 70px`,
                    backgroundColor: colors.contentBg || "transparent",
                    color: colors.contentColor || "#94a3b8",
                    fontSize: `${typography.contentFontSize || 14}px`,
                    lineHeight: typography.contentLineHeight || 1.6,
                    borderTop: `1px solid ${borderColor}20`,
                  }}
                >
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ─────────────────────────────────────────────────────────────────────────── */
  /* PATTERN 5: Dynamic Form Accordion                                           */
  /* ─────────────────────────────────────────────────────────────────────────── */
  const renderFormAccordion = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isSeparated ? `${itemSpacing}px` : "0px",
          borderRadius: isSeparated ? "0px" : borderRadius,
          backgroundColor: isSeparated ? "transparent" : colors.itemBg || "#0f172a",
          border: isSeparated ? "none" : borderCss,
          boxShadow: isSeparated ? "none" : shadowCss,
          overflow: "hidden",
          fontFamily,
        }}
      >
        {items.map((item, index) => {
          const itemId = item.id;
          const open = isOpen(itemId);
          const isHovered = hoveredItemId === itemId;
          const SectionIcon = resolveIcon(item.icon) || Briefcase;

          return (
            <div
              key={itemId}
              onMouseEnter={() => setHoveredItemId(itemId)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                borderRadius: isSeparated ? borderRadius : "0px",
                border: isSeparated ? borderCss : "none",
                borderTop: !isSeparated && index > 0 && borders.showDivider !== false
                  ? `1px solid ${borderColor}`
                  : "none",
                boxShadow: isSeparated ? shadowCss : "none",
                backgroundColor: colors.itemBg || "#0f172a",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => toggle(itemId)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${layout.headerPaddingY || 18}px ${layout.headerPaddingX || 24}px`,
                  backgroundColor: open
                    ? colors.expandedHeaderBg || "#1e293b"
                    : isHovered
                    ? colors.hoverBg || colors.headerBg || "#0f172a"
                    : colors.headerBg || colors.itemBg || "#0f172a",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: transitionCss,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: open
                        ? colors.accentColor || "#14b8a6"
                        : "rgba(100, 116, 139, 0.2)",
                      color: open ? "#ffffff" : colors.iconColor || "#14b8a6",
                      transition: transitionCss,
                      flexShrink: 0,
                    }}
                  >
                    <SectionIcon style={{ width: "18px", height: "18px" }} />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontSize: `${typography.titleFontSize || 15}px`,
                          fontWeight: typography.titleFontWeight || 600,
                          color: colors.titleColor || "#f8fafc",
                        }}
                      >
                        {item.title}
                      </span>
                      {item.required && (
                        <span
                          style={{
                            fontSize: "10px",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            backgroundColor: "rgba(244, 63, 94, 0.15)",
                            color: "#fb7185",
                            fontWeight: "600",
                          }}
                        >
                          Required
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p
                        style={{
                          margin: "2px 0 0 0",
                          fontSize: "12px",
                          color: colors.contentColor || "#94a3b8",
                        }}
                      >
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <ChevronDown
                  style={{
                    width: "18px",
                    height: "18px",
                    color: colors.iconColor || "#94a3b8",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: transitionCss,
                  }}
                />
              </button>

              {open && (
                <div
                  style={{
                    padding: `${layout.contentPaddingY || 20}px ${layout.contentPaddingX || 24}px`,
                    backgroundColor: colors.contentBg || "transparent",
                    borderTop: `1px solid ${borderColor}20`,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {(item.fields || []).map((f) => (
                      <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: colors.titleColor || "#f8fafc",
                          }}
                        >
                          {f.label} {f.required && <span style={{ color: "#fb7185" }}>*</span>}
                        </label>
                        <input
                          type={f.type || "text"}
                          placeholder={f.placeholder || ""}
                          defaultValue={f.defaultValue || ""}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: `1px solid ${borderColor}`,
                            backgroundColor: "rgba(15, 23, 42, 0.6)",
                            color: colors.titleColor || "#f8fafc",
                            fontSize: "13px",
                            outline: "none",
                          }}
                        />
                      </div>
                    ))}

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button
                        type="button"
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          backgroundColor: colors.accentColor || "#14b8a6",
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: "600",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Save &amp; Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Choose renderer
  const renderPattern = () => {
    switch (sourceComponentId) {
      case "numbered-accordion":
        return renderNumberedAccordion();
      case "filter-accordion":
        return renderFilterAccordion();
      case "simple-accordion":
        return renderSimpleAccordion();
      case "icon-accordion":
        return renderIconAccordion();
      case "form-accordion":
        return renderFormAccordion();
      default:
        return renderNumberedAccordion();
    }
  };

  return (
    <div
      className={`w-full ${previewMode ? "pointer-events-auto" : ""}`}
      style={{
        maxWidth:
          config.maxWidth && config.maxWidth !== "100%"
            ? `${config.maxWidth}px`
            : "100%",
        padding: config.containerPadding ? `${config.containerPadding}px` : "0px",
        backgroundColor: colors.containerBg || "transparent",
        borderRadius: isSeparated ? "0px" : borderRadius,
        transition: transitionCss,
      }}
    >
      {renderPattern()}
    </div>
  );
}
