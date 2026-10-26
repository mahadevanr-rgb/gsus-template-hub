import {
  toPascalCase,
  toSlug,
  getShadowValue,
} from "./navigationCustomizationUtils";

function escapeStr(str) {
  if (!str) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

/**
 * Generates self-contained React JSX code for the customized navigation component.
 */
export function generateReactCode(config) {
  const componentName = toPascalCase(config.name || "CustomNavigation");
  const pattern = config.sourceComponentId || config.componentType || "navbar";
  const colors = config.colors || {};
  const border = config.border || {};
  const typography = config.typography || {};
  const layout = config.layout || {};
  const animation = config.animation || {};
  const brand = config.brand || {};
  const items = config.items || [];
  const groups = config.groups || [];

  const shadow = getShadowValue(border.shadowIntensity || "lg", "rgba(0,0,0,0.25)");

  return `import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Search,
  Bell,
  User,
  Home,
  Compass,
  Layers,
  Settings,
  Folder,
  ArrowRight,
  Check,
} from "lucide-react";

/**
 * ${componentName}
 * Pattern: ${pattern}
 * Generated via TemplateHub Navigation Customizer
 */
export default function ${componentName}({
  activeId: controlledActiveId,
  onItemSelect,
  className = "",
}) {
  const [activeId, setActiveId] = useState(controlledActiveId || "${escapeStr(config.activeId || "1")}");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const brand = ${JSON.stringify(brand, null, 2)};
  const items = ${JSON.stringify(items, null, 2)};
  const groups = ${JSON.stringify(groups, null, 2)};

  const handleSelect = (id, href, e) => {
    if (e) e.preventDefault();
    setActiveId(id);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onItemSelect) onItemSelect(id, href);
  };

  const navStyles = {
    backgroundColor: "${colors.surfaceBg || "#0f172a"}",
    color: "${colors.inactiveText || "#94a3b8"}",
    borderRadius: "${border.radius ?? 16}px",
    borderWidth: "${border.width ?? 1}px",
    borderStyle: "${border.style || "solid"}",
    borderColor: "${border.color || "#1e293b"}",
    boxShadow: "${shadow}",
    fontFamily: "${typography.fontFamily || "Inter, sans-serif"}",
    transition: "${animation.enabled ? `all ${animation.duration || 250}ms ${animation.easing || "ease-out"}` : "none"}",
  };

  ${pattern === "sidebar" ? `
  // Sidebar Pattern
  return (
    <aside
      className={\`flex flex-col h-screen \${collapsed ? "w-20" : "w-64"} transition-all duration-300 relative select-none \${className}\`}
      style={navStyles}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b shrink-0" style={{ borderColor: "${colors.borderColor || "#1e293b"}" }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md" style={{ backgroundColor: "${colors.activeBg || "#4f46e5"}" }}>
              {brand.logoText || "NC"}
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-white">{brand.name || "App Sidebar"}</h2>
              <p className="text-[10px] text-slate-400">{brand.tagline || "Workspace"}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="space-y-1">
            {!collapsed && group.title && (
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </div>
            )}
            {group.items?.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(e) => handleSelect(item.id, item.href, e)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group"
                  style={{
                    backgroundColor: isActive ? "${colors.activeBg || "#4f46e5"}" : "transparent",
                    color: isActive ? "${colors.activeText || "#ffffff"}" : "${colors.inactiveText || "#94a3b8"}",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 flex items-center justify-center">●</span>
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "${colors.badgeBg || "#6366f1"}", color: "${colors.badgeText || "#ffffff"}" }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
  ` : pattern === "tabs" || pattern === "nested-tabs" ? `
  // Tabs Pattern
  return (
    <div className={\`w-full space-y-4 \${className}\`}>
      <div
        className="flex items-center gap-1.5 p-1.5 border overflow-x-auto"
        style={navStyles}
        role="tablist"
      >
        {items.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => handleSelect(tab.id, null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2"
              style={{
                backgroundColor: isActive ? "${colors.activeBg || "#4f46e5"}" : "transparent",
                color: isActive ? "${colors.activeText || "#ffffff"}" : "${colors.inactiveText || "#94a3b8"}",
              }}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: "${colors.badgeBg || "#6366f1"}", color: "${colors.badgeText || "#ffffff"}" }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
  ` : pattern === "stepper" ? `
  // Stepper Wizard Pattern
  return (
    <div className={\`w-full p-6 border space-y-6 \${className}\`} style={navStyles}>
      <div className="flex items-center justify-between">
        {items.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;
          return (
            <div key={step.id} className="flex-1 flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    backgroundColor: isDone || isCurrent ? "${colors.activeBg || "#4f46e5"}" : "rgba(255,255,255,0.1)",
                    color: isDone || isCurrent ? "${colors.activeText || "#ffffff"}" : "${colors.inactiveText || "#94a3b8"}",
                  }}
                >
                  {isDone ? <Check size={14} /> : stepNum}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-white">{step.title}</div>
                  <div className="text-[10px] text-slate-400">{step.description}</div>
                </div>
              </div>
              {idx < items.length - 1 && (
                <div className="flex-1 h-0.5 mx-4" style={{ backgroundColor: isDone ? "${colors.activeBg || "#4f46e5"}" : "${colors.borderColor || "#1e293b"}" }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4 border-t" style={{ borderColor: "${colors.borderColor || "#1e293b"}" }}>
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          className="px-4 py-2 rounded-xl text-xs font-semibold border disabled:opacity-40"
          style={{ borderColor: "${colors.borderColor || "#1e293b"}", color: "${colors.inactiveText || "#94a3b8"}" }}
        >
          Previous Step
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep((s) => Math.min(items.length, s + 1))}
          className="px-5 py-2 rounded-xl text-xs font-semibold text-white shadow-md"
          style={{ backgroundColor: "${colors.activeBg || "#4f46e5"}" }}
        >
          {currentStep === items.length ? "Finish & Complete" : "Next Step"}
        </button>
      </div>
    </div>
  );
  ` : pattern === "breadcrumb" ? `
  // Breadcrumb Hierarchy Pattern
  return (
    <nav aria-label="Breadcrumb" className={\`flex items-center gap-2 px-4 py-3 border \${className}\`} style={navStyles}>
      {items.map((crumb, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={crumb.id}>
            {idx > 0 && <span className="text-xs text-slate-600">${layout.separator || "/"}</span>}
            {isLast ? (
              <span className="text-xs font-bold" style={{ color: "${colors.activeText || "#ffffff"}" }} aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <a
                href={crumb.href || "#"}
                onClick={(e) => handleSelect(crumb.id, crumb.href, e)}
                className="text-xs hover:underline transition-colors"
                style={{ color: "${colors.inactiveText || "#94a3b8"}" }}
              >
                {crumb.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
  ` : `
  // Navbar / Header / Floating Pattern
  return (
    <nav className={\`w-full px-5 py-3 border flex items-center justify-between gap-4 \${className}\`} style={navStyles}>
      {/* Brand Section */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md" style={{ backgroundColor: "${colors.activeBg || "#4f46e5"}" }}>
          {brand.logoText || "NC"}
        </div>
        <span className="font-bold text-sm text-white tracking-tight">{brand.name || "Navbar Brand"}</span>
      </div>

      {/* Navigation Items */}
      <div className="hidden md:flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  if (item.children) {
                    setActiveDropdown(activeDropdown === item.id ? null : item.id);
                  } else {
                    handleSelect(item.id, item.href, e);
                  }
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: isActive ? "${colors.activeBg || "#4f46e5"}" : "transparent",
                  color: isActive ? "${colors.activeText || "#ffffff"}" : "${colors.inactiveText || "#94a3b8"}",
                }}
              >
                <span>{item.label}</span>
                {item.children && <ChevronDown size={12} />}
              </button>

              {item.children && activeDropdown === item.id && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 p-2 rounded-2xl border shadow-xl z-50 flex flex-col space-y-1"
                  style={{ backgroundColor: "${colors.surfaceBg || "#0f172a"}", borderColor: "${colors.borderColor || "#1e293b"}" }}
                >
                  {item.children.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={(e) => handleSelect(sub.id, sub.href, e)}
                      className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 transition-colors"
                      style={{ color: "${colors.inactiveText || "#94a3b8"}" }}
                    >
                      <div className="font-bold text-white">{sub.label}</div>
                      {sub.description && <div className="text-[10px] text-slate-400">{sub.description}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border text-slate-400"
          style={{ borderColor: "${colors.borderColor || "#1e293b"}" }}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <button
          type="button"
          className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-all"
          style={{ backgroundColor: "${colors.activeBg || "#4f46e5"}" }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
  `}
}
`;
}

/**
 * Generates separate React JSX and CSS files.
 */
export function generateReactAndCss(config) {
  const componentName = toPascalCase(config.name || "CustomNavigation");
  const pattern = config.sourceComponentId || "navbar";
  const colors = config.colors || {};
  const border = config.border || {};
  const typography = config.typography || {};

  const css = `/* ${componentName}.css - Generated by TemplateHub */
.custom-nav-container {
  background-color: ${colors.surfaceBg || "#0f172a"};
  color: ${colors.inactiveText || "#94a3b8"};
  border-radius: ${border.radius ?? 16}px;
  border: ${border.width ?? 1}px ${border.style || "solid"} ${border.color || "#1e293b"};
  box-shadow: ${getShadowValue(border.shadowIntensity || "lg", "rgba(0,0,0,0.25)")};
  font-family: ${typography.fontFamily || "Inter, sans-serif"};
  transition: all 250ms ease-out;
}

.custom-nav-item {
  color: ${colors.inactiveText || "#94a3b8"};
  transition: all 200ms ease;
  border-radius: ${border.radius > 8 ? 8 : border.radius}px;
}

.custom-nav-item:hover {
  background-color: ${colors.hoverBg || "rgba(255, 255, 255, 0.06)"};
  color: ${colors.hoverText || "#ffffff"};
}

.custom-nav-item.active {
  background-color: ${colors.activeBg || "#4f46e5"};
  color: ${colors.activeText || "#ffffff"};
  font-weight: 600;
}

.custom-nav-badge {
  background-color: ${colors.badgeBg || "#6366f1"};
  color: ${colors.badgeText || "#ffffff"};
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 9999px;
  font-weight: 700;
}
`;

  const jsx = `import React, { useState } from "react";
import "./${componentName}.css";

export default function ${componentName}({ activeId = "${config.activeId || "1"}", onItemSelect }) {
  const [current, setCurrent] = useState(activeId);
  const items = ${JSON.stringify(config.items || [], null, 2)};

  return (
    <nav className="custom-nav-container p-4 flex items-center justify-between">
      <div className="font-bold text-white">${escapeStr(config.brand?.name || config.name)}</div>
      <div className="flex items-center gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCurrent(item.id);
              if (onItemSelect) onItemSelect(item.id);
            }}
            className={\`custom-nav-item px-3 py-1.5 text-xs \${current === item.id ? "active" : ""}\`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
`;

  return { jsx, css };
}

/**
 * Generates standalone HTML/CSS snippet.
 */
export function generateHtmlCss(config) {
  const componentName = toPascalCase(config.name || "CustomNavigation");
  const colors = config.colors || {};
  const border = config.border || {};

  return `<!-- ${componentName} - TemplateHub Navigation Export -->
<div class="custom-nav-bar" style="
  background-color: ${colors.surfaceBg || "#0f172a"};
  color: ${colors.inactiveText || "#94a3b8"};
  border: ${border.width ?? 1}px solid ${border.color || "#1e293b"};
  border-radius: ${border.radius ?? 16}px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${config.typography?.fontFamily || "Inter, sans-serif"};
">
  <div style="font-weight: bold; color: #ffffff;">
    ${escapeStr(config.brand?.name || config.name)}
  </div>
  <div style="display: flex; gap: 8px;">
    ${(config.items || [])
      .map(
        (it) => `
    <a href="${it.href || "#"}" style="
      text-decoration: none;
      color: ${it.active ? colors.activeText || "#ffffff" : colors.inactiveText || "#94a3b8"};
      background-color: ${it.active ? colors.activeBg || "#4f46e5" : "transparent"};
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
    ">${it.label}</a>`
      )
      .join("")}
  </div>
</div>
`;
}
