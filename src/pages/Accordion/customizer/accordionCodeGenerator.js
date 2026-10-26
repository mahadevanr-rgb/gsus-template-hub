import { toPascalCase, toSlug, getShadowValue } from "./accordionCustomizationUtils";

/**
 * Escapes text for safe embedding in JSX string literals.
 */
function escapeStr(str) {
  if (!str) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

/**
 * Escape text for HTML embedding.
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Get animation/transition styles as an inline CSS string.
 */
function getTransitionCss(animation) {
  if (!animation.enabled || animation.preset === "none") {
    return "";
  }
  const duration = `${animation.duration}ms`;
  const easing = animation.easing || "ease-in-out";
  return `transition: all ${duration} ${easing};`;
}

/**
 * Returns border-radius from numeric string (appends px).
 */
function borderRadius(val) {
  const n = parseFloat(val);
  return isNaN(n) ? "8px" : `${n}px`;
}

/**
 * Generates the styles object for a config section.
 */
function buildStyleBlock(config) {
  const { colors, borders, typography, layout } = config;
  return {
    container: {
      fontFamily: typography.fontFamily,
      width: config.width === "100%" ? "100%" : `${config.width}px`,
      maxWidth: config.maxWidth === "100%" ? "100%" : `${config.maxWidth}px`,
      padding: `${config.containerPadding}px`,
      backgroundColor: colors.containerBg,
    },
    item: {
      backgroundColor: colors.itemBg,
      border: `${borders.borderWidth}px ${borders.borderStyle} ${borders.borderColor}`,
      borderRadius: borderRadius(borders.borderRadius),
      marginBottom: `${borders.itemSpacing}px`,
      boxShadow: getShadowValue(borders.shadow),
      overflow: "hidden",
    },
    header: {
      backgroundColor: colors.headerBg,
      padding: `${layout.headerPaddingY}px ${layout.headerPaddingX}px`,
      cursor: "pointer",
      display: "flex",
      alignItems: layout.iconAlignment,
      justifyContent: "space-between",
      fontFamily: typography.fontFamily,
      fontSize: `${typography.titleFontSize}px`,
      fontWeight: typography.titleFontWeight,
      color: colors.titleColor,
      textAlign: typography.textAlign,
      letterSpacing: `${typography.letterSpacing}em`,
    },
    content: {
      backgroundColor: colors.contentBg,
      padding: `${layout.contentPaddingY}px ${layout.contentPaddingX}px`,
      fontSize: `${typography.contentFontSize}px`,
      lineHeight: typography.contentLineHeight,
      color: colors.contentColor,
      fontFamily: typography.fontFamily,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// React JSX Code Generator
// ─────────────────────────────────────────────────────────────────────────────

export function generateReactCode(config) {
  const componentName = toPascalCase(config.name || "CustomAccordion");
  const {
    items,
    colors,
    borders,
    typography,
    icons,
    animation,
    layout,
    expansionMode,
    collapsible,
    initialExpandedItem,
    initialExpandedItems,
    patternSpecific,
    sourceComponentId,
  } = config;

  const isMultiple = expansionMode === "multiple";
  const defaultValueStr = isMultiple
    ? JSON.stringify(initialExpandedItems || [])
    : initialExpandedItem
    ? `"${initialExpandedItem}"`
    : "null";

  const animDuration = animation.enabled && animation.preset !== "none"
    ? animation.duration
    : 0;

  const itemsJson = JSON.stringify(items || [], null, 2);

  // Pattern-specific code generation
  if (sourceComponentId === "numbered-accordion") {
    return generateNumberedAccordionReact(
      componentName,
      items,
      colors,
      borders,
      typography,
      icons,
      animation,
      layout,
      expansionMode,
      collapsible,
      defaultValueStr,
      patternSpecific,
      animDuration
    );
  }

  if (sourceComponentId === "filter-accordion") {
    return generateFilterAccordionReact(
      componentName,
      items,
      colors,
      borders,
      typography,
      animation,
      layout,
      patternSpecific,
      animDuration
    );
  }

  if (sourceComponentId === "icon-accordion") {
    return generateIconAccordionReact(
      componentName,
      items,
      colors,
      borders,
      typography,
      icons,
      animation,
      layout,
      expansionMode,
      collapsible,
      defaultValueStr,
      patternSpecific,
      animDuration
    );
  }

  if (sourceComponentId === "form-accordion") {
    return generateFormAccordionReact(
      componentName,
      items,
      colors,
      borders,
      typography,
      animation,
      layout,
      expansionMode,
      collapsible,
      defaultValueStr,
      patternSpecific,
      animDuration
    );
  }

  // Default: simple FAQ accordion
  return generateSimpleAccordionReact(
    componentName,
    items,
    colors,
    borders,
    typography,
    icons,
    animation,
    layout,
    expansionMode,
    collapsible,
    defaultValueStr,
    patternSpecific,
    animDuration
  );
}

function generateSimpleAccordionReact(
  componentName,
  items,
  colors,
  borders,
  typography,
  icons,
  animation,
  layout,
  expansionMode,
  collapsible,
  defaultValueStr,
  patternSpecific,
  animDuration
) {
  const itemsLiteral = items
    .map(
      (item) =>
        `  { id: "${escapeStr(item.id)}", question: "${escapeStr(item.title)}", answer: "${escapeStr(item.content)}"${item.disabled ? ", disabled: true" : ""} }`
    )
    .join(",\n");

  const rad = borderRadius(borders.borderRadius);
  const gap = `${borders.itemSpacing}px`;
  const bw = borders.borderWidth !== "0" ? `${borders.borderWidth}px ${borders.borderStyle} ${colors.borderColor}` : "none";
  const shadow = getShadowValue(borders.shadow);

  return `import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
${itemsLiteral}
];

export default function ${componentName}() {
  const isMultiple = ${expansionMode === "multiple"};
  const [openItems, setOpenItems] = useState(
    ${expansionMode === "multiple"}
      ? ${defaultValueStr === "null" ? "[]" : defaultValueStr}
      : ${defaultValueStr}
  );

  const isOpen = (id) =>
    isMultiple ? Array.isArray(openItems) && openItems.includes(id) : openItems === id;

  const toggle = (id) => {
    if (isMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev === id && ${collapsible} ? null : id));
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "${escapeStr(typography.fontFamily)}" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: "${gap}",
            border: "${bw}",
            borderRadius: "${rad}",
            backgroundColor: "${colors.itemBg}",
            boxShadow: "${shadow}",
            overflow: "hidden",
          }}
        >
          <button
            type="button"
            aria-expanded={isOpen(item.id)}
            aria-controls={\`content-\${item.id}\`}
            id={\`trigger-\${item.id}\`}
            disabled={item.disabled}
            onClick={() => !item.disabled && toggle(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "${layout.headerPaddingY}px ${layout.headerPaddingX}px",
              background: isOpen(item.id) ? "${colors.expandedHeaderBg}" : "${colors.headerBg}",
              border: "none",
              cursor: item.disabled ? "not-allowed" : "pointer",
              opacity: item.disabled ? 0.5 : 1,
              fontSize: "${typography.titleFontSize}px",
              fontWeight: "${typography.titleFontWeight}",
              color: "${colors.titleColor}",
              textAlign: "left",
              transition: "background ${animDuration}ms ${animation.easing}",
            }}
          >
            <span>{item.question}</span>
            <ChevronDown
              style={{
                width: "16px",
                height: "16px",
                color: "${colors.iconColor}",
                transform: isOpen(item.id) ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform ${animDuration}ms ${animation.easing}",
                flexShrink: 0,
              }}
            />
          </button>
          <div
            id={\`content-\${item.id}\`}
            role="region"
            aria-labelledby={\`trigger-\${item.id}\`}
            hidden={!isOpen(item.id)}
            style={{
              padding: isOpen(item.id) ? "${layout.contentPaddingY}px ${layout.contentPaddingX}px" : "0 ${layout.contentPaddingX}px",
              backgroundColor: "${colors.contentBg}",
              fontSize: "${typography.contentFontSize}px",
              lineHeight: "${typography.contentLineHeight}",
              color: "${colors.contentColor}",
              overflow: "hidden",
            }}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
`;
}

function generateNumberedAccordionReact(
  componentName,
  items,
  colors,
  borders,
  typography,
  icons,
  animation,
  layout,
  expansionMode,
  collapsible,
  defaultValueStr,
  patternSpecific,
  animDuration
) {
  const itemsLiteral = items
    .map(
      (item, i) =>
        `  { id: "${escapeStr(item.id || String(i + 1).padStart(2, "0"))}", title: "${escapeStr(item.title)}", content: "${escapeStr(item.content)}"${item.disabled ? ", disabled: true" : ""} }`
    )
    .join(",\n");

  const rad = borderRadius(borders.borderRadius);
  const shadow = getShadowValue(borders.shadow);

  return `import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const items = [
${itemsLiteral}
];

export default function ${componentName}() {
  const [openItem, setOpenItem] = useState(${defaultValueStr});

  const toggle = (id) => {
    setOpenItem((prev) => (prev === id && ${collapsible} ? null : id));
  };

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "${rad}",
        backgroundColor: "${colors.itemBg}",
        border: "1px solid ${colors.borderColor}",
        boxShadow: "${shadow}",
        overflow: "hidden",
        fontFamily: "${escapeStr(typography.fontFamily)}",
      }}
    >
      {items.map((item, index) => {
        const num = item.id || String(index + 1).padStart(2, "0");
        const isOpen = openItem === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderTop: index > 0 ? "1px solid ${colors.borderColor}" : "none",
              backgroundColor: isOpen ? "${colors.expandedHeaderBg}" : "transparent",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={\`content-\${item.id}\`}
              id={\`trigger-\${item.id}\`}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 32px",
                border: "none",
                background: "transparent",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 0.5 : 1,
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "900",
                    color: isOpen ? "${colors.accentColor}" : "${colors.titleColor}",
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                    flexShrink: 0,
                    transition: "color ${animDuration}ms ${animation.easing}",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontSize: "${typography.titleFontSize}px",
                    fontWeight: "${typography.titleFontWeight}",
                    color: "${colors.titleColor}",
                  }}
                >
                  {item.title}
                </span>
              </div>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: isOpen ? "${colors.accentColor}" : "${colors.borderColor}",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOpen ? "#fff" : "${colors.titleColor}",
                  flexShrink: 0,
                  transition: "background ${animDuration}ms ${animation.easing}",
                }}
              >
                {isOpen ? (
                  <Minus style={{ width: "16px", height: "16px" }} />
                ) : (
                  <Plus style={{ width: "16px", height: "16px" }} />
                )}
              </div>
            </button>
            {isOpen && (
              <div
                id={\`content-\${item.id}\`}
                role="region"
                aria-labelledby={\`trigger-\${item.id}\`}
                style={{
                  paddingLeft: "96px",
                  paddingRight: "16px",
                  paddingBottom: "24px",
                  fontSize: "${typography.contentFontSize}px",
                  lineHeight: "${typography.contentLineHeight}",
                  color: "${colors.contentColor}",
                  fontFamily: "${escapeStr(typography.fontFamily)}",
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
}
`;
}

function generateFilterAccordionReact(
  componentName,
  items,
  colors,
  borders,
  typography,
  animation,
  layout,
  patternSpecific,
  animDuration
) {
  const sectionsLiteral = items
    .map((item) => {
      const optionsLiteral = (item.options || [])
        .map(
          (opt) =>
            `      { id: "${escapeStr(opt.id)}", label: "${escapeStr(opt.label)}", selected: ${!!opt.selected} }`
        )
        .join(",\n");
      return `  {
    id: "${escapeStr(item.id)}",
    title: "${escapeStr(item.title)}",
    options: [\n${optionsLiteral}\n    ],
  }`;
    })
    .join(",\n");

  const rad = borderRadius(borders.borderRadius);
  const shadow = getShadowValue(borders.shadow);

  return `import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const sections = [
${sectionsLiteral}
];

export default function ${componentName}() {
  const [openSections, setOpenSections] = useState(
    sections.filter((_, i) => i < 2).map((s) => s.id)
  );
  const [selections, setSelections] = useState(() => {
    const init = {};
    sections.forEach((sec) => {
      init[sec.id] = sec.options.filter((o) => o.selected).map((o) => o.id);
    });
    return init;
  });

  const toggleSection = (id) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const toggleOption = (sectionId, optionId) => {
    setSelections((prev) => {
      const current = prev[sectionId] || [];
      return {
        ...prev,
        [sectionId]: current.includes(optionId)
          ? current.filter((v) => v !== optionId)
          : [...current, optionId],
      };
    });
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "320px",
        borderRadius: "${rad}",
        backgroundColor: "${colors.itemBg}",
        border: "1px solid ${colors.borderColor}",
        boxShadow: "${shadow}",
        overflow: "hidden",
        fontFamily: "${escapeStr(typography.fontFamily)}",
      }}
    >
      {sections.map((section, idx) => {
        const isOpen = openSections.includes(section.id);
        const selected = selections[section.id] || [];
        return (
          <div
            key={section.id}
            style={{ borderTop: idx > 0 ? "1px solid ${colors.borderColor}" : "none" }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleSection(section.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "${typography.titleFontSize}px",
                fontWeight: "${typography.titleFontWeight}",
                color: "${colors.titleColor}",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{section.title}</span>
                {selected.length > 0 && (
                  <span
                    style={{
                      minWidth: "20px",
                      height: "20px",
                      padding: "0 6px",
                      borderRadius: "4px",
                      backgroundColor: "${colors.accentColor}22",
                      color: "${colors.accentColor}",
                      fontSize: "11px",
                      fontWeight: "700",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid ${colors.accentColor}44",
                    }}
                  >
                    {selected.length}
                  </span>
                )}
              </div>
              <ChevronDown
                style={{
                  width: "16px",
                  height: "16px",
                  color: "${colors.iconColor}",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform ${animDuration}ms ease-in-out",
                  flexShrink: 0,
                }}
              />
            </button>
            {isOpen && (
              <div style={{ padding: "0 8px 12px" }}>
                {section.options.map((option) => {
                  const checked = selected.includes(option.id);
                  return (
                    <label
                      key={option.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOption(section.id, option.id)}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "4px",
                          border: \`1px solid \${checked ? "${colors.accentColor}" : "${colors.borderColor}"}\`,
                          backgroundColor: checked ? "${colors.accentColor}" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {checked && <Check style={{ width: "10px", height: "10px", color: "#fff", strokeWidth: 3 }} />}
                      </div>
                      <span
                        style={{
                          fontSize: "${typography.contentFontSize}px",
                          color: checked ? "${colors.titleColor}" : "${colors.contentColor}",
                          fontWeight: checked ? "600" : "400",
                        }}
                      >
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
`;
}

function generateIconAccordionReact(
  componentName,
  items,
  colors,
  borders,
  typography,
  icons,
  animation,
  layout,
  expansionMode,
  collapsible,
  defaultValueStr,
  patternSpecific,
  animDuration
) {
  const iconsNeeded = [...new Set(items.map((i) => i.icon).filter(Boolean))];
  const iconImport = iconsNeeded.length > 0
    ? `import { ${iconsNeeded.join(", ")}, ChevronDown } from "lucide-react";`
    : `import { ChevronDown } from "lucide-react";`;

  const iconMap = iconsNeeded.length > 0
    ? `const ICON_MAP = { ${iconsNeeded.map((ic) => `${ic}`).join(", ")} };`
    : `const ICON_MAP = {};`;

  const itemsLiteral = items
    .map(
      (item) =>
        `  { id: "${escapeStr(item.id)}", label: "${escapeStr(item.title)}", content: "${escapeStr(item.content)}", icon: "${escapeStr(item.icon || "")}"${item.disabled ? ", disabled: true" : ""} }`
    )
    .join(",\n");

  const rad = borderRadius(borders.borderRadius);
  const shadow = getShadowValue(borders.shadow);
  const containerBg = colors.containerBg !== "transparent" ? colors.containerBg : colors.itemBg;

  return `import React, { useState } from "react";
${iconImport}

const items = [
${itemsLiteral}
];

${iconMap}

function RenderIcon({ name }) {
  const Component = ICON_MAP[name];
  return Component ? <Component style={{ width: "16px", height: "16px" }} /> : null;
}

export default function ${componentName}() {
  const [openItem, setOpenItem] = useState(${defaultValueStr});

  const toggle = (id) => {
    setOpenItem((prev) => (prev === id && ${collapsible} ? null : id));
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        borderRadius: "${rad}",
        backgroundColor: "${containerBg}",
        border: "1px solid ${colors.borderColor}",
        boxShadow: "${shadow}",
        overflow: "hidden",
        fontFamily: "${escapeStr(typography.fontFamily)}",
      }}
    >
      {items.map((item, idx) => {
        const isOpen = openItem === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderTop: idx > 0 ? "1px solid ${colors.borderColor}22" : "none",
              backgroundColor: isOpen ? "rgba(0,0,0,0.1)" : "transparent",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                border: "none",
                background: "transparent",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 0.5 : 1,
                color: "${colors.titleColor}",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "${colors.titleColor}" }}>
                  <RenderIcon name={item.icon} />
                </div>
                <span
                  style={{
                    fontSize: "${typography.titleFontSize}px",
                    fontWeight: "${typography.titleFontWeight}",
                    color: "${colors.titleColor}",
                    letterSpacing: "0.02em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backgroundColor: isOpen ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                <ChevronDown
                  style={{
                    width: "12px",
                    height: "12px",
                    color: "${colors.titleColor}",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform ${animDuration}ms ${animation.easing}",
                  }}
                />
              </div>
            </button>
            {isOpen && item.content && (
              <div
                style={{
                  paddingLeft: "58px",
                  paddingRight: "16px",
                  paddingBottom: "16px",
                  fontSize: "${typography.contentFontSize}px",
                  lineHeight: "${typography.contentLineHeight}",
                  color: "${colors.contentColor}",
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
}
`;
}

function generateFormAccordionReact(
  componentName,
  items,
  colors,
  borders,
  typography,
  animation,
  layout,
  expansionMode,
  collapsible,
  defaultValueStr,
  patternSpecific,
  animDuration
) {
  const iconsNeeded = [...new Set(items.map((i) => i.icon).filter(Boolean))];
  const iconImport = iconsNeeded.length > 0
    ? `import { ${iconsNeeded.join(", ")}, ChevronDown, CheckCircle2 } from "lucide-react";`
    : `import { ChevronDown, CheckCircle2 } from "lucide-react";`;

  const iconMap = iconsNeeded.length > 0
    ? `const ICON_MAP = { ${iconsNeeded.join(", ")} };`
    : `const ICON_MAP = {};`;

  const sectionsLiteral = items.map((section) => {
    const fieldsStr = (section.fields || [])
      .map(
        (f) =>
          `      { id: "${escapeStr(f.id)}", name: "${escapeStr(f.name)}", label: "${escapeStr(f.label)}", type: "${f.type || "text"}", placeholder: "${escapeStr(f.placeholder || "")}", required: ${!!f.required}, defaultValue: ${JSON.stringify(f.defaultValue ?? "")} }`
      )
      .join(",\n");
    return `  {
    id: "${escapeStr(section.id)}",
    title: "${escapeStr(section.title)}",
    subtitle: "${escapeStr(section.subtitle || "")}",
    icon: "${escapeStr(section.icon || "")}",
    required: ${!!section.required},
    fields: [\n${fieldsStr}\n    ],
  }`;
  }).join(",\n");

  const rad = borderRadius(borders.borderRadius);
  const shadow = getShadowValue(borders.shadow);
  const submitBg = patternSpecific?.submitButtonColor || colors.accentColor || "#007b8f";
  const submitLabel = patternSpecific?.submitButtonLabel || "Continue";

  return `import React, { useState } from "react";
${iconImport}

const sections = [
${sectionsLiteral}
];

${iconMap}

function RenderIcon({ name }) {
  const Component = ICON_MAP[name];
  return Component ? <Component style={{ width: "16px", height: "16px" }} /> : null;
}

export default function ${componentName}() {
  const [openSection, setOpenSection] = useState(${defaultValueStr});
  const [formValues, setFormValues] = useState(() => {
    const init = {};
    sections.forEach((sec) =>
      sec.fields.forEach((f) => {
        if (f.defaultValue !== undefined) init[f.name] = f.defaultValue;
      })
    );
    return init;
  });
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});

  const toggle = (id) => {
    setOpenSection((prev) => (prev === id && ${collapsible} ? null : id));
  };

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e, section) => {
    e.preventDefault();
    const newErrors = {};
    section.fields.forEach((f) => {
      if (f.required && (formValues[f.name] === undefined || formValues[f.name] === "")) {
        newErrors[f.name] = \`\${f.label} is required\`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }
    setSubmitted(section.id);
    setTimeout(() => setSubmitted((p) => (p === section.id ? null : p)), 4000);
  };

  return (
    <div style={{ width: "100%", maxWidth: "640px", fontFamily: "${escapeStr(typography.fontFamily)}" }}>
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div
            key={section.id}
            style={{
              marginBottom: "${borders.itemSpacing}px",
              borderRadius: "${rad}",
              backgroundColor: "${colors.itemBg}",
              border: "1px solid ${colors.borderColor}",
              boxShadow: "${shadow}",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(section.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                border: "none",
                background: isOpen ? "${colors.expandedHeaderBg}" : "${colors.headerBg}",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {section.icon && (
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "${colors.borderColor}", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <RenderIcon name={section.icon} />
                  </div>
                )}
                <span style={{ fontSize: "${typography.titleFontSize}px", fontWeight: "${typography.titleFontWeight}", color: "${colors.titleColor}" }}>
                  {section.title}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {section.required && (
                  <span style={{ padding: "2px 8px", borderRadius: "4px", backgroundColor: "#dc2626", color: "#fff", fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    REQUIRED
                  </span>
                )}
                <ChevronDown
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "${colors.iconColor}",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform ${animDuration}ms ${animation.easing}",
                  }}
                />
              </div>
            </button>
            {isOpen && (
              <form
                onSubmit={(e) => handleSubmit(e, section)}
                style={{ padding: "20px", borderTop: "1px solid ${colors.borderColor}" }}
              >
                {section.subtitle && (
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "${colors.titleColor}", marginBottom: "16px" }}>
                    {section.subtitle}
                  </p>
                )}
                {section.fields.map((field) => (
                  <div key={field.id} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "${colors.titleColor}", marginBottom: "6px" }}>
                      {field.label}{field.required && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formValues[field.name] !== undefined ? formValues[field.name] : ""}
                      onChange={(e) => handleChange(field.name, field.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: \`1px solid \${errors[field.name] ? "#ef4444" : "${colors.borderColor}"}\`,
                        backgroundColor: "#fff",
                        fontSize: "14px",
                        color: "${colors.titleColor}",
                        boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                    {errors[field.name] && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors[field.name]}</p>
                    )}
                  </div>
                ))}
                {submitted === section.id && (
                  <div style={{ padding: "12px", borderRadius: "8px", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <CheckCircle2 style={{ width: "16px", height: "16px", color: "#059669" }} />
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#065f46" }}>{section.title} saved!</span>
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    padding: "10px 24px",
                    borderRadius: "8px",
                    backgroundColor: "${submitBg}",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  ${escapeStr(submitLabel)}
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// React + CSS Code Generator
// ─────────────────────────────────────────────────────────────────────────────

export function generateReactAndCss(config) {
  const componentName = toPascalCase(config.name || "CustomAccordion");
  const slug = toSlug(config.name || "custom-accordion");
  const { colors, borders, typography, animation, layout } = config;
  const animDuration = animation.enabled && animation.preset !== "none"
    ? animation.duration
    : 0;

  const css = `/* ${componentName}.css — Generated by TemplateHub Accordion Customizer */

.${slug}-container {
  width: 100%;
  max-width: ${config.maxWidth === "100%" ? "100%" : config.maxWidth + "px"};
  font-family: ${typography.fontFamily};
  background-color: ${colors.containerBg};
  padding: ${config.containerPadding}px;
}

.${slug}-item {
  background-color: ${colors.itemBg};
  border: ${borders.borderWidth}px ${borders.borderStyle} ${colors.borderColor};
  border-radius: ${borderRadius(borders.borderRadius)};
  margin-bottom: ${borders.itemSpacing}px;
  box-shadow: ${getShadowValue(borders.shadow)};
  overflow: hidden;
  transition: box-shadow ${animDuration}ms ${animation.easing};
}

.${slug}-item:hover {
  box-shadow: ${getShadowValue(borders.hoverShadow)};
}

.${slug}-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${layout.headerPaddingY}px ${layout.headerPaddingX}px;
  background: ${colors.headerBg};
  border: none;
  cursor: pointer;
  font-family: ${typography.fontFamily};
  font-size: ${typography.titleFontSize}px;
  font-weight: ${typography.titleFontWeight};
  color: ${colors.titleColor};
  text-align: ${typography.textAlign};
  letter-spacing: ${typography.letterSpacing}em;
  transition: background ${animDuration}ms ${animation.easing};
}

.${slug}-trigger:hover {
  background: ${colors.hoverBg};
}

.${slug}-trigger[aria-expanded="true"] {
  background: ${colors.expandedHeaderBg};
}

.${slug}-trigger:focus-visible {
  outline: 2px solid ${colors.focusRing};
  outline-offset: 2px;
}

.${slug}-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.${slug}-icon {
  width: 16px;
  height: 16px;
  color: ${colors.iconColor};
  flex-shrink: 0;
  transition: transform ${animDuration}ms ${animation.easing};
}

.${slug}-trigger[aria-expanded="true"] .${slug}-icon {
  transform: rotate(180deg);
}

.${slug}-content {
  padding: ${layout.contentPaddingY}px ${layout.contentPaddingX}px;
  background-color: ${colors.contentBg};
  font-size: ${typography.contentFontSize}px;
  line-height: ${typography.contentLineHeight};
  color: ${colors.contentColor};
}

@media (prefers-reduced-motion: reduce) {
  .${slug}-trigger,
  .${slug}-icon,
  .${slug}-item {
    transition: none !important;
  }
}
`;

  const jsx = `import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./${componentName}.css";

const items = ${JSON.stringify(config.items || [], null, 2)};

export default function ${componentName}() {
  const isMultiple = ${config.expansionMode === "multiple"};
  const [openItems, setOpenItems] = useState(
    isMultiple
      ? ${JSON.stringify(config.initialExpandedItems || [])}
      : ${config.initialExpandedItem ? `"${config.initialExpandedItem}"` : "null"}
  );

  const isOpen = (id) =>
    isMultiple ? Array.isArray(openItems) && openItems.includes(id) : openItems === id;

  const toggle = (id) => {
    if (isMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev === id && ${config.collapsible} ? null : id));
    }
  };

  return (
    <div className="${slug}-container">
      {items.map((item) => (
        <div key={item.id} className="${slug}-item">
          <button
            type="button"
            className="${slug}-trigger"
            aria-expanded={isOpen(item.id)}
            aria-controls={\`content-\${item.id}\`}
            id={\`trigger-\${item.id}\`}
            disabled={item.disabled}
            onClick={() => !item.disabled && toggle(item.id)}
          >
            <span>{item.title || item.question || item.label}</span>
            <ChevronDown className="${slug}-icon" />
          </button>
          <div
            id={\`content-\${item.id}\`}
            role="region"
            aria-labelledby={\`trigger-\${item.id}\`}
            hidden={!isOpen(item.id)}
            className="${slug}-content"
          >
            {item.content || item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
`;

  return { jsx, css };
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML/CSS/JS Standalone Generator
// ─────────────────────────────────────────────────────────────────────────────

export function generateHtmlCss(config) {
  const { colors, borders, typography, animation, layout, items, expansionMode } = config;
  const animDuration = animation.enabled && animation.preset !== "none"
    ? animation.duration
    : 0;
  const rad = borderRadius(borders.borderRadius);
  const shadow = getShadowValue(borders.shadow);

  const itemsHtml = (items || [])
    .map((item) => {
      const id = escapeHtml(item.id || "");
      const title = escapeHtml(item.title || item.question || item.label || "");
      const content = escapeHtml(item.content || item.answer || "");
      return `
  <div class="acc-item" id="item-${id}">
    <button
      class="acc-trigger"
      type="button"
      aria-expanded="false"
      aria-controls="content-${id}"
      id="trigger-${id}"
      ${item.disabled ? "disabled" : ""}
      onclick="toggleAccordion('${id}')"
    >
      <span>${title}</span>
      <svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div
      id="content-${id}"
      role="region"
      aria-labelledby="trigger-${id}"
      class="acc-content"
      hidden
    >
      <div class="acc-content-inner">${content}</div>
    </div>
  </div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.name || "Custom Accordion")}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: ${typography.fontFamily}; background: #f8fafc; padding: 40px 20px; min-height: 100vh; }
    .acc-container { width: 100%; max-width: 720px; margin: 0 auto; }
    .acc-item {
      background-color: ${colors.itemBg};
      border: ${borders.borderWidth}px ${borders.borderStyle} ${colors.borderColor};
      border-radius: ${rad};
      margin-bottom: ${borders.itemSpacing}px;
      box-shadow: ${shadow};
      overflow: hidden;
      transition: box-shadow ${animDuration}ms ${animation.easing};
    }
    .acc-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${layout.headerPaddingY}px ${layout.headerPaddingX}px;
      background: ${colors.headerBg};
      border: none;
      cursor: pointer;
      font-family: ${typography.fontFamily};
      font-size: ${typography.titleFontSize}px;
      font-weight: ${typography.titleFontWeight};
      color: ${colors.titleColor};
      text-align: left;
      transition: background ${animDuration}ms ${animation.easing};
    }
    .acc-trigger:hover { background: ${colors.hoverBg}; }
    .acc-trigger[aria-expanded="true"] { background: ${colors.expandedHeaderBg}; }
    .acc-trigger:focus-visible { outline: 2px solid ${colors.focusRing}; outline-offset: 2px; }
    .acc-trigger:disabled { cursor: not-allowed; opacity: 0.5; }
    .acc-icon {
      width: 16px; height: 16px;
      color: ${colors.iconColor};
      flex-shrink: 0;
      transition: transform ${animDuration}ms ${animation.easing};
    }
    .acc-trigger[aria-expanded="true"] .acc-icon { transform: rotate(180deg); }
    .acc-content[hidden] { display: none; }
    .acc-content-inner {
      padding: ${layout.contentPaddingY}px ${layout.contentPaddingX}px;
      background-color: ${colors.contentBg};
      font-size: ${typography.contentFontSize}px;
      line-height: ${typography.contentLineHeight};
      color: ${colors.contentColor};
    }
    @media (prefers-reduced-motion: reduce) {
      .acc-trigger, .acc-icon, .acc-item { transition: none !important; }
    }
  </style>
</head>
<body>
  <div class="acc-container">
    ${itemsHtml}
  </div>
  <script>
    const isMultiple = ${expansionMode === "multiple"};
    function toggleAccordion(id) {
      const trigger = document.getElementById('trigger-' + id);
      const content = document.getElementById('content-' + id);
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      if (!isMultiple) {
        document.querySelectorAll('.acc-trigger[aria-expanded="true"]').forEach(function(t) {
          const otherId = t.id.replace('trigger-', '');
          if (otherId !== id) {
            t.setAttribute('aria-expanded', 'false');
            document.getElementById('content-' + otherId).setAttribute('hidden', '');
          }
        });
      }
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.setAttribute('hidden', '');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
      }
    }
  </script>
</body>
</html>
`;
}
