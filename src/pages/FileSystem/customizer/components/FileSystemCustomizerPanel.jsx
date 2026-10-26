import React, { useState } from "react";
import {
  FileText,
  Palette,
  Type,
  Square,
  UploadCloud,
  Eye,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  Zap,
} from "lucide-react";
import {
  FONT_OPTIONS,
  COLOR_PALETTES,
  SHADOW_PRESETS,
  RADIUS_PRESETS,
  LUCIDE_ICONS_LIST,
  FILE_CATEGORY_PRESETS,
} from "../fileSystemCustomizerConfig";

export default function FileSystemCustomizerPanel({ config, updateConfig, resetCategory }) {
  // Collapsible section states
  const [openSections, setOpenSections] = useState({
    general: true,
    fileSelection: true,
    validation: true,
    appearance: true,
    layout: false,
    typography: false,
    icons: false,
    preview: false,
    uploadBehavior: false,
    responsive: false,
    accessibility: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const {
    general = {},
    layout = {},
    appearance = {},
    typography = {},
    icons = {},
    fileSelection = {},
    validation = {},
    preview = {},
    uploadBehavior = {},
    responsive = {},
  } = config;

  // Apply a curated color palette in one click
  const applyPalette = (palette) => {
    updateConfig((current) => {
      current.appearance.cardBg = palette.cardBg;
      current.appearance.dropzoneBg = palette.dropzoneBg;
      current.appearance.accentColor = palette.accentColor;
      current.appearance.titleColor = palette.titleColor;
      current.appearance.descColor = palette.descColor;
      current.appearance.helperColor = palette.helperColor;
      current.appearance.borderColor = palette.borderColor;
      current.appearance.btnBg = palette.btnBg;
      current.appearance.btnTextColor = palette.btnTextColor;
      current.appearance.dragOverBg = palette.dragOverBg;
      current.appearance.dragOverBorderColor = palette.dragOverBorderColor;
      current.appearance.progressColor = palette.progressColor;
      current.appearance.successColor = palette.successColor;
      current.appearance.errorColor = palette.errorColor;
      return current;
    });
  };

  // Apply a file category preset
  const applyCategoryPreset = (preset) => {
    updateConfig((current) => {
      current.fileSelection.categoryPreset = preset.id;
      current.fileSelection.acceptedExtensions = preset.accept;
      if (preset.id === "images") {
        current.validation.validateDimensions = true;
        current.preview.aspectRatio = "video";
      }
      return current;
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto min-h-0 bg-[#0d1322] border-r border-slate-800 p-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:#334155_transparent] select-none text-xs text-slate-300">
      {/* =========================================================================
          SECTION 1: General & Labels
         ========================================================================= */}
      <CollapsibleSection
        title="General & Labels"
        icon={FileText}
        isOpen={openSections.general}
        onToggle={() => toggleSection("general")}
        onReset={resetCategory ? () => resetCategory("general") : null}
      >
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Heading Title
            </label>
            <input
              type="text"
              value={general.title || ""}
              onChange={(e) => updateConfig("general.title", e.target.value)}
              placeholder="e.g. Upload your files"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Description / Instructions
            </label>
            <textarea
              rows={2}
              value={general.description || ""}
              onChange={(e) => updateConfig("general.description", e.target.value)}
              placeholder="e.g. Drag and drop your files here, or click to browse"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Helper Text
            </label>
            <input
              type="text"
              value={general.helperText || ""}
              onChange={(e) => updateConfig("general.helperText", e.target.value)}
              placeholder="e.g. Supports PDF and PNG up to 10 MB"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Browse Button
              </label>
              <input
                type="text"
                value={general.browseBtnLabel || ""}
                onChange={(e) => updateConfig("general.browseBtnLabel", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Upload Button
              </label>
              <input
                type="text"
                value={general.uploadBtnLabel || ""}
                onChange={(e) => updateConfig("general.uploadBtnLabel", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Remove Button
              </label>
              <input
                type="text"
                value={general.removeBtnLabel || ""}
                onChange={(e) => updateConfig("general.removeBtnLabel", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Clear All Button
              </label>
              <input
                type="text"
                value={general.clearAllBtnLabel || ""}
                onChange={(e) => updateConfig("general.clearAllBtnLabel", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Footer Security Note
            </label>
            <input
              type="text"
              value={general.footerText || ""}
              onChange={(e) => updateConfig("general.footerText", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Show Footer Note</span>
            <input
              type="checkbox"
              checked={general.showFooter !== false}
              onChange={(e) => updateConfig("general.showFooter", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 2: File Selection & Modes
         ========================================================================= */}
      <CollapsibleSection
        title="File Selection & Limits"
        icon={UploadCloud}
        isOpen={openSections.fileSelection}
        onToggle={() => toggleSection("fileSelection")}
        onReset={resetCategory ? () => resetCategory("fileSelection") : null}
      >
        <div className="space-y-3">
          {/* Single vs Multiple Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="text-xs font-bold text-white block">Multiple Files Mode</span>
              <span className="text-[10px] text-slate-400">
                {fileSelection.multiple ? "Batch queue allowed" : "Single file replacement mode"}
              </span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(fileSelection.multiple)}
              onChange={(e) => updateConfig("fileSelection.multiple", e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </div>

          {fileSelection.multiple && (
            <div>
              <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-400">
                <span>Maximum File Count</span>
                <span className="text-emerald-400 font-bold">{fileSelection.maxFiles || 5} files</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={fileSelection.maxFiles || 5}
                onChange={(e) => updateConfig("fileSelection.maxFiles", parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500"
              />
            </div>
          )}

          {/* Quick Category Presets */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              File Category Presets
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {FILE_CATEGORY_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyCategoryPreset(p)}
                  className={`text-left p-1.5 rounded-lg border text-[10px] font-medium transition-all cursor-pointer ${
                    fileSelection.categoryPreset === p.id
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Accepted Extensions & MIME
            </label>
            <input
              type="text"
              value={fileSelection.acceptedExtensions || ""}
              onChange={(e) => updateConfig("fileSelection.acceptedExtensions", e.target.value)}
              placeholder="e.g. .png, .jpg, .pdf, .zip"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Use comma-separated extensions or MIME types (e.g. .pdf, .png, image/*).
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Allow File Replacement</span>
              <input
                type="checkbox"
                checked={fileSelection.allowReplace !== false}
                onChange={(e) => updateConfig("fileSelection.allowReplace", e.target.checked)}
                className="rounded accent-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Allow File Removal</span>
              <input
                type="checkbox"
                checked={fileSelection.allowRemove !== false}
                onChange={(e) => updateConfig("fileSelection.allowRemove", e.target.checked)}
                className="rounded accent-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Prevent Duplicate Files</span>
              <input
                type="checkbox"
                checked={fileSelection.preventDuplicates !== false}
                onChange={(e) => updateConfig("fileSelection.preventDuplicates", e.target.checked)}
                className="rounded accent-emerald-500"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 3: File Validation Rules
         ========================================================================= */}
      <CollapsibleSection
        title="Validation Rules & Limits"
        icon={ShieldCheck}
        isOpen={openSections.validation}
        onToggle={() => toggleSection("validation")}
        onReset={resetCategory ? () => resetCategory("validation") : null}
      >
        <div className="space-y-3">
          {/* Maximum File Size */}
          <div>
            <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-slate-400">
              <span>Max File Size</span>
              <span className="text-emerald-400 font-bold">
                {validation.maxSizeValue || 10} {validation.maxSizeUnit || "MB"}
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max={validation.maxSizeUnit === "KB" ? 50000 : 500}
                value={validation.maxSizeValue || 10}
                onChange={(e) => updateConfig("validation.maxSizeValue", parseFloat(e.target.value) || 1)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <select
                value={validation.maxSizeUnit || "MB"}
                onChange={(e) => updateConfig("validation.maxSizeUnit", e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="MB">MB</option>
                <option value="KB">KB</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Reject Oversize Immediately</span>
            <input
              type="checkbox"
              checked={validation.rejectOversizeImmediately !== false}
              onChange={(e) => updateConfig("validation.rejectOversizeImmediately", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>

          {/* Image Dimensions Validation Toggle */}
          <div className="pt-2 border-t border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">Image Dimension Checks</span>
                <span className="text-[10px] text-slate-400">Inspect natural width & height</span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(validation.validateDimensions)}
                onChange={(e) => updateConfig("validation.validateDimensions", e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-500"
              />
            </div>

            {validation.validateDimensions && (
              <div className="space-y-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Min Width (px)</label>
                    <input
                      type="number"
                      value={validation.minWidth || 200}
                      onChange={(e) => updateConfig("validation.minWidth", parseInt(e.target.value, 10))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Max Width (px)</label>
                    <input
                      type="number"
                      value={validation.maxWidth || 4000}
                      onChange={(e) => updateConfig("validation.maxWidth", parseInt(e.target.value, 10))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Min Height (px)</label>
                    <input
                      type="number"
                      value={validation.minHeight || 200}
                      onChange={(e) => updateConfig("validation.minHeight", parseInt(e.target.value, 10))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Max Height (px)</label>
                    <input
                      type="number"
                      value={validation.maxHeight || 4000}
                      onChange={(e) => updateConfig("validation.maxHeight", parseInt(e.target.value, 10))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Required Aspect Ratio</label>
                  <select
                    value={validation.aspectRatio || "auto"}
                    onChange={(e) => updateConfig("validation.aspectRatio", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
                  >
                    <option value="auto">Any Aspect Ratio</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="16:9">16:9 Widescreen</option>
                    <option value="4:3">4:3 Standard</option>
                    <option value="9:16">9:16 Portrait</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 4: Appearance & Styling
         ========================================================================= */}
      <CollapsibleSection
        title="Appearance & Theme Colors"
        icon={Palette}
        isOpen={openSections.appearance}
        onToggle={() => toggleSection("appearance")}
        onReset={resetCategory ? () => resetCategory("appearance") : null}
      >
        <div className="space-y-3.5">
          {/* Quick Palettes */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Curated Palettes
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {COLOR_PALETTES.map((palette) => (
                <button
                  key={palette.name}
                  type="button"
                  onClick={() => applyPalette(palette)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left flex items-center gap-2 cursor-pointer group"
                >
                  <div className="flex -space-x-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-900" style={{ backgroundColor: palette.accentColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-900" style={{ backgroundColor: palette.dropzoneBg }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-900" style={{ backgroundColor: palette.btnBg }} />
                  </div>
                  <span className="text-[10px] font-medium text-slate-300 truncate group-hover:text-white">
                    {palette.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color pickers */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <ColorRow
              label="Accent Color"
              value={appearance.accentColor || "#10b981"}
              onChange={(val) => updateConfig("appearance.accentColor", val)}
            />
            <ColorRow
              label="Dropzone Background"
              value={appearance.dropzoneBg || "#f8fafc"}
              onChange={(val) => updateConfig("appearance.dropzoneBg", val)}
            />
            <ColorRow
              label="Card / Queue Background"
              value={appearance.cardBg || "#ffffff"}
              onChange={(val) => updateConfig("appearance.cardBg", val)}
            />
            <ColorRow
              label="Border Color"
              value={appearance.borderColor || "#cbd5e1"}
              onChange={(val) => updateConfig("appearance.borderColor", val)}
            />
            <ColorRow
              label="Drag-Over Highlight"
              value={appearance.dragOverBorderColor || appearance.accentColor || "#10b981"}
              onChange={(val) => updateConfig("appearance.dragOverBorderColor", val)}
            />
            <ColorRow
              label="Button Background"
              value={appearance.btnBg || "#059669"}
              onChange={(val) => updateConfig("appearance.btnBg", val)}
            />
            <ColorRow
              label="Progress Bar Color"
              value={appearance.progressColor || "#10b981"}
              onChange={(val) => updateConfig("appearance.progressColor", val)}
            />
          </div>

          {/* Borders & Shadows */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Border Style
                </label>
                <select
                  value={appearance.borderStyle || "dashed"}
                  onChange={(e) => updateConfig("appearance.borderStyle", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
                >
                  <option value="dashed">Dashed</option>
                  <option value="solid">Solid</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Border Width
                </label>
                <select
                  value={appearance.borderWidth || 2}
                  onChange={(e) => updateConfig("appearance.borderWidth", parseInt(e.target.value, 10))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
                >
                  <option value={1}>1px</option>
                  <option value={2}>2px</option>
                  <option value={3}>3px</option>
                  <option value={4}>4px</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Corner Radius
                </label>
                <select
                  value={appearance.borderRadius || "16px"}
                  onChange={(e) => updateConfig("appearance.borderRadius", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
                >
                  {RADIUS_PRESETS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Shadow Preset
                </label>
                <select
                  value={appearance.shadow || "sm"}
                  onChange={(e) => updateConfig("appearance.shadow", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
                >
                  {SHADOW_PRESETS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 5: Layout & Dimensions
         ========================================================================= */}
      <CollapsibleSection
        title="Layout & Dimensions"
        icon={Square}
        isOpen={openSections.layout}
        onToggle={() => toggleSection("layout")}
        onReset={resetCategory ? () => resetCategory("layout") : null}
      >
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Component Max Width
            </label>
            <select
              value={layout.maxWidth || "lg"}
              onChange={(e) => updateConfig("layout.maxWidth", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
            >
              <option value="sm">Small (max-w-sm / 384px)</option>
              <option value="md">Medium (max-w-md / 448px)</option>
              <option value="lg">Large (max-w-lg / 512px)</option>
              <option value="xl">Extra Large (max-w-xl / 576px)</option>
              <option value="2xl">2X Large (max-w-2xl / 672px)</option>
              <option value="full">Full Width (100%)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Dropzone Padding
              </label>
              <select
                value={layout.padding || "normal"}
                onChange={(e) => updateConfig("layout.padding", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
              >
                <option value="compact">Compact (p-4)</option>
                <option value="normal">Normal (p-6)</option>
                <option value="spacious">Spacious (p-10)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Content Alignment
              </label>
              <select
                value={layout.alignment || "center"}
                onChange={(e) => updateConfig("layout.alignment", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
              >
                <option value="center">Center</option>
                <option value="left">Left</option>
              </select>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 6: Typography
         ========================================================================= */}
      <CollapsibleSection
        title="Typography"
        icon={Type}
        isOpen={openSections.typography}
        onToggle={() => toggleSection("typography")}
        onReset={resetCategory ? () => resetCategory("typography") : null}
      >
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Font Family
            </label>
            <select
              value={typography.fontFamily || "Inter, sans-serif"}
              onChange={(e) => updateConfig("typography.fontFamily", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Heading Size
              </label>
              <select
                value={typography.titleSize || "text-base"}
                onChange={(e) => updateConfig("typography.titleSize", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
              >
                <option value="text-sm">Small</option>
                <option value="text-base">Medium (Base)</option>
                <option value="text-lg">Large</option>
                <option value="text-xl">Extra Large</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Heading Weight
              </label>
              <select
                value={typography.titleWeight || "font-bold"}
                onChange={(e) => updateConfig("typography.titleWeight", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
              >
                <option value="font-medium">Medium</option>
                <option value="font-semibold">Semi-Bold</option>
                <option value="font-bold">Bold</option>
                <option value="font-extrabold">Extra Bold</option>
              </select>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 7: Icons & Badges
         ========================================================================= */}
      <CollapsibleSection
        title="Icons & Badges"
        icon={Sparkles}
        isOpen={openSections.icons}
        onToggle={() => toggleSection("icons")}
        onReset={resetCategory ? () => resetCategory("icons") : null}
      >
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Upload Icon
            </label>
            <select
              value={icons.uploadIcon || "UploadCloud"}
              onChange={(e) => updateConfig("icons.uploadIcon", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
            >
              {LUCIDE_ICONS_LIST.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Icon Container Shape
              </label>
              <select
                value={icons.iconShape || "rounded-2xl"}
                onChange={(e) => updateConfig("icons.iconShape", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
              >
                <option value="rounded-2xl">Rounded Square</option>
                <option value="circle">Full Circle</option>
                <option value="square">Sharp Square</option>
                <option value="none">No Background</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Icon Size
              </label>
              <select
                value={icons.iconSize || "md"}
                onChange={(e) => updateConfig("icons.iconSize", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
              >
                <option value="sm">Small (w-4 h-4)</option>
                <option value="md">Medium (w-6 h-6)</option>
                <option value="lg">Large (w-8 h-8)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400">Show Decorative Tag Badge</span>
            <input
              type="checkbox"
              checked={icons.showDecorativeBadge !== false}
              onChange={(e) => updateConfig("icons.showDecorativeBadge", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 8: Preview & Image Cropping
         ========================================================================= */}
      <CollapsibleSection
        title="Preview & Cropping"
        icon={Eye}
        isOpen={openSections.preview}
        onToggle={() => toggleSection("preview")}
        onReset={resetCategory ? () => resetCategory("preview") : null}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Enable Live Previews</span>
            <input
              type="checkbox"
              checked={preview.showPreview !== false}
              onChange={(e) => updateConfig("preview.showPreview", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Client-Side Image Cropping</span>
              <span className="text-[10px] text-slate-400">Crop button opens crop modal</span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(preview.allowCrop)}
              onChange={(e) => updateConfig("preview.allowCrop", e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Allow Modal Lightbox / Enlarge</span>
            <input
              type="checkbox"
              checked={preview.allowEnlarge !== false}
              onChange={(e) => updateConfig("preview.allowEnlarge", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Thumbnail Image Fit
            </label>
            <select
              value={preview.imageFit || "cover"}
              onChange={(e) => updateConfig("preview.imageFit", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-1.5 text-xs text-white"
            >
              <option value="cover">Cover (Fill & Crop)</option>
              <option value="contain">Contain (Fit Whole Image)</option>
            </select>
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 9: Upload Behavior & Progress
         ========================================================================= */}
      <CollapsibleSection
        title="Upload Simulation & Progress"
        icon={Zap}
        isOpen={openSections.uploadBehavior}
        onToggle={() => toggleSection("uploadBehavior")}
        onReset={resetCategory ? () => resetCategory("uploadBehavior") : null}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Auto-Upload On Selection</span>
              <span className="text-[10px] text-slate-400">Starts automatically without clicking upload</span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(uploadBehavior.autoUpload)}
              onChange={(e) => updateConfig("uploadBehavior.autoUpload", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Simulate Error Failure</span>
              <span className="text-[10px] text-slate-400">Useful for testing error & retry states</span>
            </div>
            <input
              type="checkbox"
              checked={Boolean(uploadBehavior.simulateFailure)}
              onChange={(e) => updateConfig("uploadBehavior.simulateFailure", e.target.checked)}
              className="rounded accent-rose-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Show Progress Percentage</span>
            <input
              type="checkbox"
              checked={uploadBehavior.showProgressPercentage !== false}
              onChange={(e) => updateConfig("uploadBehavior.showProgressPercentage", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 10: Responsive Settings
         ========================================================================= */}
      <CollapsibleSection
        title="Responsive Behavior"
        icon={Smartphone}
        isOpen={openSections.responsive}
        onToggle={() => toggleSection("responsive")}
        onReset={resetCategory ? () => resetCategory("responsive") : null}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Full Width On Mobile</span>
            <input
              type="checkbox"
              checked={responsive.mobileFullWidth !== false}
              onChange={(e) => updateConfig("responsive.mobileFullWidth", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Compact Padding On Small Screens</span>
            <input
              type="checkbox"
              checked={responsive.compactOnMobile !== false}
              onChange={(e) => updateConfig("responsive.compactOnMobile", e.target.checked)}
              className="rounded accent-emerald-500"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

/**
 * Reusable Collapsible Section Component
 */
function CollapsibleSection({ title, icon: Icon, isOpen, onToggle, onReset, children }) {
  return (
    <div className="border border-slate-800 rounded-2xl bg-slate-900/40 overflow-hidden transition-colors">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-900/70 hover:bg-slate-850 text-left transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold text-xs text-white tracking-tight truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {onReset && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              title="Reset this section to defaults"
              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </span>
          )}
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          )}
        </div>
      </button>
      {isOpen && <div className="p-3.5 border-t border-slate-800/80">{children}</div>}
    </div>
  );
}

/**
 * Reusable Color Row Component
 */
function ColorRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] text-slate-400 truncate">{label}</span>
      <div className="flex items-center gap-1.5 shrink-0">
        <input
          type="color"
          value={value?.startsWith("#") ? value : "#10b981"}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 rounded-lg border-0 bg-transparent cursor-pointer p-0 shrink-0"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-white font-mono focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}
