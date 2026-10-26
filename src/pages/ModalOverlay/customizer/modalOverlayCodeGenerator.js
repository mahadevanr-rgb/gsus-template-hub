import {
  toPascalCase,
  toSlug,
  getShadowValue,
} from "./modalOverlayCustomizationUtils";

function escapeStr(str) {
  if (!str) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Generates self-contained React JSX code for the customized overlay.
 */
export function generateReactCode(config) {
  const componentName = toPascalCase(config.name || "CustomOverlay");
  const {
    sourceComponentId = "basic-modal",
    overlayType = "modal",
    dimensions = {},
    content = {},
    colors = {},
    borders = {},
    typography = {},
    headerFooter = {},
    buttons = {},
    backdrop = {},
    animation = {},
    interaction = {},
    patternSpecific = {},
  } = config;

  const shadowVal = getShadowValue(borders.shadow);
  const isDrawer = overlayType === "drawer" || sourceComponentId === "drawer" || sourceComponentId === "bottom-sheet" || sourceComponentId === "side-sheet";
  const isPopover = overlayType === "popover" || sourceComponentId === "popover" || sourceComponentId === "tooltip";
  const isMenu = overlayType === "menu" || sourceComponentId === "context-menu" || sourceComponentId === "dropdown-menu";
  const isCommand = overlayType === "command" || sourceComponentId === "command-menu";
  const isForm = sourceComponentId === "form-modal";
  const isConfirm = sourceComponentId === "confirm-dialog";
  const isAlert = sourceComponentId === "alert-dialog";

  return `import React, { useState, useEffect, useRef } from "react";
import { X, Check, Loader2, Sparkles, AlertTriangle, Trash2, Info, Search } from "lucide-react";

export default function ${componentName}({ open: controlledOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (val) => {
    setInternalOpen(val);
    if (!val && onClose) onClose();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape Key
  useEffect(() => {
    if (!isOpen || !${Boolean(interaction.closeOnEscape)}) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen || !${Boolean(interaction.lockBodyScroll)}) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && ${Boolean(backdrop.closeOnClick && !interaction.preventAccidentalClose)}) {
      setOpen(false);
    }
  };

  const handlePrimaryAction = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setOpen(false);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 18px",
          borderRadius: "${borders.borderRadius}px",
          backgroundColor: "${colors.primaryBtnBg}",
          color: "${colors.primaryBtnText}",
          fontSize: "14px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          boxShadow: "${shadowVal}",
          fontFamily: "${escapeStr(typography.fontFamily)}",
        }}
      >
        Open ${escapeStr(config.name)}
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: ${isDrawer && patternSpecific.side === "bottom" ? '"flex-end"' : isDrawer && patternSpecific.side === "top" ? '"flex-start"' : isDrawer ? '"stretch"' : '"center"'},
        justifyContent: ${isDrawer && patternSpecific.side === "right" ? '"flex-end"' : isDrawer && patternSpecific.side === "left" ? '"flex-start"' : '"center"'},
        padding: ${isDrawer ? "0" : '"16px"'},
        fontFamily: "${escapeStr(typography.fontFamily)}",
      }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      {${Boolean(backdrop.enabled)} && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "${colors.backdropColor}",
            opacity: ${backdrop.opacity},
            backdropFilter: ${backdrop.blur ? '"blur(6px)"' : '"none"'},
            transition: "opacity ${animation.openDuration}ms ease",
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Overlay Surface */}
      <div
        role="${isMenu ? "menu" : "dialog"}"
        aria-modal="true"
        style={{
          position: "relative",
          zIndex: 10000,
          width: "100%",
          maxWidth: "${dimensions.maxWidth || "540px"}",
          backgroundColor: "${colors.overlayBg}",
          borderRadius: "${borders.borderRadius}px",
          border: "${borders.borderWidth}px ${borders.borderStyle} ${colors.borderColor}",
          boxShadow: "${shadowVal}",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          color: "${colors.textColor}",
          animation: "overlayFadeIn ${animation.openDuration}ms ${animation.easing}",
        }}
      >
        {/* Header */}
        {${Boolean(headerFooter.showHeader)} && (
          <div
            style={{
              padding: "${headerFooter.headerPaddingY}px ${headerFooter.headerPaddingX}px",
              backgroundColor: "${colors.headerBg}",
              borderBottom: "${borders.showHeaderDivider ? `1px solid ${colors.borderColor}` : "none"}",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "${typography.titleFontSize}px",
                  fontWeight: "${typography.titleFontWeight}",
                  color: "${colors.titleColor}",
                  letterSpacing: "-0.01em",
                }}
              >
                ${escapeStr(content.title || config.name)}
              </h2>
              {${Boolean(content.description)} && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "12px",
                    color: "${colors.secondaryTextColor}",
                    lineHeight: 1.5,
                  }}
                >
                  ${escapeStr(content.description)}
                </p>
              )}
            </div>

            {${Boolean(headerFooter.showCloseButton)} && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  padding: "6px",
                  borderRadius: "8px",
                  background: "transparent",
                  border: "none",
                  color: "${colors.secondaryTextColor}",
                  cursor: "pointer",
                }}
              >
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            )}
          </div>
        )}

        {/* Body Content */}
        <div
          style={{
            padding: "${dimensions.padding}px",
            fontSize: "${typography.bodyFontSize}px",
            lineHeight: ${typography.bodyLineHeight},
            color: "${colors.textColor}",
            overflowY: "auto",
            maxHeight: "${dimensions.maxHeight || "70vh"}",
          }}
        >
          ${isForm ? `
          <form onSubmit={(e) => { e.preventDefault(); handlePrimaryAction(); }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              ${(content.formFields || []).map(f => `
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "${colors.titleColor}" }}>
                  ${escapeStr(f.label)} ${f.required ? '<span style={{ color: "' + colors.dangerColor + '" }}>*</span>' : ''}
                </label>
                <input
                  type="${f.type || 'text'}"
                  placeholder="${escapeStr(f.placeholder)}"
                  defaultValue="${escapeStr(f.defaultValue)}"
                  required={${Boolean(f.required)}}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid ${colors.inputBorder}",
                    backgroundColor: "${colors.inputBg}",
                    color: "${colors.titleColor}",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>`).join("")}
            </div>
          </form>` : isMenu ? `
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            ${(content.menuItems || []).map(m => m.separator ? `
            <div style={{ height: "1px", backgroundColor: "${colors.borderColor}", margin: "6px 0" }} />` : `
            <button
              key="${m.id}"
              onClick={() => setOpen(false)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "transparent",
                color: ${m.destructive ? '"' + colors.dangerColor + '"' : '"' + colors.titleColor + '"'},
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span>${escapeStr(m.label)}</span>
              ${m.shortcut ? `<span style={{ fontSize: "11px", color: "${colors.secondaryTextColor}" }}>${escapeStr(m.shortcut)}</span>` : ""}
            </button>`).join("")}
          </div>` : isConfirm ? `
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "${colors.dangerColor}20", color: "${colors.dangerColor}", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AlertTriangle style={{ width: "20px", height: "20px" }} />
            </div>
            <div>
              <p style={{ margin: 0 }}>${escapeStr(content.contentText || content.description)}</p>
            </div>
          </div>` : `
          <p style={{ margin: 0 }}>
            ${escapeStr(content.contentText || "Overlay content renders seamlessly with accessibility and focus management.")}
          </p>`}
        </div>

        {/* Footer */}
        {${Boolean(headerFooter.showFooter)} && (
          <div
            style={{
              padding: "${headerFooter.footerPaddingY}px ${headerFooter.footerPaddingX}px",
              backgroundColor: "${colors.footerBg}",
              borderTop: "${borders.showFooterDivider ? `1px solid ${colors.borderColor}` : "none"}",
              display: "flex",
              alignItems: "center",
              justifyContent: "${buttons.buttonAlignment === "center" ? "center" : buttons.buttonAlignment === "left" ? "flex-start" : buttons.buttonAlignment === "space-between" ? "space-between" : "flex-end"}",
              gap: "10px",
            }}
          >
            {${Boolean(buttons.showSecondary)} && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "${buttons.buttonRadius}px",
                  backgroundColor: "${colors.secondaryBtnBg}",
                  color: "${colors.secondaryBtnText}",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ${escapeStr(buttons.secondaryLabel || content.cancelText || "Cancel")}
              </button>
            )}

            {${Boolean(buttons.showPrimary)} && (
              <button
                type="button"
                disabled={isLoading}
                onClick={handlePrimaryAction}
                style={{
                  padding: "8px 18px",
                  borderRadius: "${buttons.buttonRadius}px",
                  backgroundColor: ${isConfirm ? `"${colors.dangerColor}"` : `"${colors.primaryBtnBg}"`},
                  color: "${colors.primaryBtnText}",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 style={{ width: "14px", height: "14px", animation: "spin 1s linear infinite" }} />
                    <span>Processing...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <Check style={{ width: "14px", height: "14px" }} />
                    <span>Success!</span>
                  </>
                ) : (
                  <span>${escapeStr(buttons.primaryLabel || content.actionText || content.confirmText || "Save Changes")}</span>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      <style>{\`
        @keyframes overlayFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      \`}</style>
    </div>
  );
}
`;
}

/**
 * Generates React component + separate CSS file.
 */
export function generateReactAndCss(config) {
  const componentName = toPascalCase(config.name || "CustomOverlay");
  const slug = toSlug(config.name || "custom-overlay");

  const jsxCode = `import React, { useState, useEffect } from "react";
import { X, Check, Loader2 } from "lucide-react";
import "./${componentName}.css";

export default function ${componentName}({ open = false, onClose }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className="${slug}-backdrop" onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className="${slug}-container" role="dialog" aria-modal="true">
        <div className="${slug}-header">
          <h2 className="${slug}-title">${escapeStr(config.content?.title || config.name)}</h2>
          <button type="button" className="${slug}-close-btn" onClick={() => onClose && onClose()}>
            <X className="${slug}-close-icon" />
          </button>
        </div>
        <div className="${slug}-body">
          <p>${escapeStr(config.content?.contentText || "Overlay content.")}</p>
        </div>
        <div className="${slug}-footer">
          <button type="button" className="${slug}-btn-secondary" onClick={() => onClose && onClose()}>
            Cancel
          </button>
          <button type="button" className="${slug}-btn-primary" onClick={() => onClose && onClose()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
`;

  const cssCode = `/* ${componentName}.css - Generated by TemplateHub */
.${slug}-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: ${config.colors?.backdropColor || "#000000"};
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(6px);
  font-family: ${config.typography?.fontFamily || "Inter, sans-serif"};
}

.${slug}-container {
  position: relative;
  width: 100%;
  max-width: ${config.dimensions?.maxWidth || "540px"};
  background-color: ${config.colors?.overlayBg || "#0f172a"};
  border-radius: ${config.borders?.borderRadius || 24}px;
  border: ${config.borders?.borderWidth || 1}px ${config.borders?.borderStyle || "solid"} ${config.colors?.borderColor || "#1e293b"};
  box-shadow: ${getShadowValue(config.borders?.shadow)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: ${config.colors?.textColor || "#cbd5e1"};
  animation: ${slug}-scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.${slug}-header {
  padding: 16px 24px;
  background-color: ${config.colors?.headerBg || "#090d16"};
  border-bottom: 1px solid ${config.colors?.borderColor || "#1e293b"};
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.${slug}-title {
  margin: 0;
  font-size: ${config.typography?.titleFontSize || 18}px;
  font-weight: ${config.typography?.titleFontWeight || 700};
  color: ${config.colors?.titleColor || "#ffffff"};
}

.${slug}-close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${config.colors?.secondaryTextColor || "#94a3b8"};
}

.${slug}-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.6;
}

.${slug}-footer {
  padding: 16px 24px;
  background-color: ${config.colors?.footerBg || "#090d16"};
  border-top: 1px solid ${config.colors?.borderColor || "#1e293b"};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.${slug}-btn-secondary {
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${config.colors?.secondaryBtnBg || "#1e293b"};
  color: ${config.colors?.secondaryBtnText || "#ffffff"};
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.${slug}-btn-primary {
  padding: 8px 18px;
  border-radius: 12px;
  background-color: ${config.colors?.primaryBtnBg || "#6366f1"};
  color: ${config.colors?.primaryBtnText || "#ffffff"};
  border: none;
  font-weight: 600;
  cursor: pointer;
}

@keyframes ${slug}-scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
`;

  return { jsx: jsxCode, css: cssCode };
}

/**
 * Generates standalone HTML/CSS/JavaScript file runnable in any browser.
 */
export function generateHtmlCss(config) {
  const componentName = toPascalCase(config.name || "CustomOverlay");
  const slug = toSlug(config.name || "custom-overlay");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.name || "Custom Overlay")}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #07090e;
      font-family: ${config.typography?.fontFamily || "Inter, sans-serif"};
      color: #f8fafc;
      padding: 20px;
    }

    .open-btn {
      padding: 12px 24px;
      border-radius: 14px;
      background-color: ${config.colors?.primaryBtnBg || "#6366f1"};
      color: #ffffff;
      border: none;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 10px 25px -5px ${config.colors?.primaryBtnBg || "#6366f1"}50;
      transition: transform 0.15s ease;
    }
    .open-btn:hover { transform: translateY(-2px); }

    .overlay-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-color: ${config.colors?.backdropColor || "#000000"};
      opacity: 0;
      backdrop-filter: blur(6px);
      transition: opacity 250ms ease;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .overlay-backdrop.active {
      display: flex;
      opacity: 1;
    }

    .overlay-card {
      width: 100%;
      max-width: ${config.dimensions?.maxWidth || "540px"};
      background-color: ${config.colors?.overlayBg || "#0f172a"};
      border-radius: ${config.borders?.borderRadius || 24}px;
      border: ${config.borders?.borderWidth || 1}px ${config.borders?.borderStyle || "solid"} ${config.colors?.borderColor || "#1e293b"};
      box-shadow: ${getShadowValue(config.borders?.shadow)};
      overflow: hidden;
      display: flex;
      flex-direction: column;
      color: ${config.colors?.textColor || "#cbd5e1"};
      transform: scale(0.96);
      transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .overlay-backdrop.active .overlay-card {
      transform: scale(1);
    }

    .overlay-header {
      padding: 16px 24px;
      background-color: ${config.colors?.headerBg || "#090d16"};
      border-bottom: 1px solid ${config.colors?.borderColor || "#1e293b"};
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .overlay-title {
      font-size: ${config.typography?.titleFontSize || 18}px;
      font-weight: 700;
      color: ${config.colors?.titleColor || "#ffffff"};
    }
    .close-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      color: ${config.colors?.secondaryTextColor || "#94a3b8"};
      cursor: pointer;
      line-height: 1;
    }

    .overlay-body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.6;
    }

    .overlay-footer {
      padding: 16px 24px;
      background-color: ${config.colors?.footerBg || "#090d16"};
      border-top: 1px solid ${config.colors?.borderColor || "#1e293b"};
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn-secondary {
      padding: 8px 16px;
      border-radius: 12px;
      background-color: ${config.colors?.secondaryBtnBg || "#1e293b"};
      color: #ffffff;
      border: none;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-primary {
      padding: 8px 18px;
      border-radius: 12px;
      background-color: ${config.colors?.primaryBtnBg || "#6366f1"};
      color: #ffffff;
      border: none;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <button class="open-btn" id="openTrigger">Open ${escapeHtml(config.name || "Overlay")}</button>

  <div class="overlay-backdrop" id="backdrop">
    <div class="overlay-card" role="dialog" aria-modal="true">
      <div class="overlay-header">
        <h2 class="overlay-title">${escapeHtml(config.content?.title || config.name)}</h2>
        <button class="close-btn" id="closeTrigger">&times;</button>
      </div>
      <div class="overlay-body">
        <p>${escapeHtml(config.content?.contentText || "Overlay content.")}</p>
      </div>
      <div class="overlay-footer">
        <button class="btn-secondary" id="cancelTrigger">Cancel</button>
        <button class="btn-primary" id="confirmTrigger">Confirm</button>
      </div>
    </div>
  </div>

  <script>
    const backdrop = document.getElementById('backdrop');
    const openBtn = document.getElementById('openTrigger');
    const closeBtn = document.getElementById('closeTrigger');
    const cancelBtn = document.getElementById('cancelTrigger');
    const confirmBtn = document.getElementById('confirmTrigger');

    function openModal() {
      backdrop.classList.add('active');
    }
    function closeModal() {
      backdrop.classList.remove('active');
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', () => {
      alert('Confirmed!');
      closeModal();
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closeModal();
      }
    });
  </script>
</body>
</html>
`;
}
