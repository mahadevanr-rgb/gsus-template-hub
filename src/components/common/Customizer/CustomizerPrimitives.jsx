import React from "react";
import { ChevronDown, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

/**
 * Standard Hex color sanitizer for HTML5 color inputs.
 * Ensures input value is always a valid 7-character #rrggbb string.
 */
export function toHex7(c, fallback = "#6366f1") {
  if (!c || typeof c !== "string") return fallback;
  const trimmed = c.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  return fallback;
}

/**
 * Standard Collapsible Section for customizer settings panels.
 */
export function CollapsibleSection({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  onReset,
  badge,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100/70 hover:bg-slate-200/60 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer text-left select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && (
            <Icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
          )}
          <span className="font-bold text-xs text-slate-800 dark:text-slate-200 tracking-tight truncate">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {onReset && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              title="Reset this section to defaults"
              className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </span>
          )}
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-3.5 space-y-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b0f19]/60">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Standard two-column Control Row for label + control alignment.
 */
export function ControlRow({ label, tooltip, children }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0 min-w-0 leading-tight"
        title={tooltip}
      >
        {label}
      </span>
      <div className="flex items-center gap-1 shrink-0">{children}</div>
    </div>
  );
}

/**
 * Standard Color Input with swatch picker and hex text input.
 */
export function ColorInput({ value, onChange, label, fallback = "#6366f1" }) {
  const safeHex = toHex7(value, fallback);
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <input
        type="color"
        value={safeHex}
        onChange={(e) => onChange(e.target.value)}
        className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5"
        title={label || "Pick color"}
      />
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        placeholder="#000000"
      />
    </div>
  );
}

/**
 * Standard Range/Slider Input with numeric indicator and unit.
 */
export function RangeInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "px",
  accentColor = "accent-indigo-500",
}) {
  const num = parseFloat(value) || 0;
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={num}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-20 cursor-pointer ${accentColor}`}
      />
      <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 w-10 text-right font-medium">
        {num}
        {unit}
      </span>
    </div>
  );
}

/**
 * Standard Select Input.
 */
export function SelectInput({ value, onChange, options = [] }) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[150px]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/**
 * Standard Toggle Switch.
 */
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={Boolean(checked)}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
        checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
      }`}
      title={label}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
}

/**
 * Standard Text Input.
 */
export function TextInput({ label, value, onChange, placeholder = "" }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
      />
    </div>
  );
}

/**
 * Standard Zoom Controls for Canvas floating dock.
 */
export function CanvasZoomControls({ zoom, onZoomChange, min = 50, max = 150, step = 25 }) {
  return (
    <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-950/60 rounded-xl p-0.5 border border-slate-200 dark:border-slate-800/60">
      <button
        type="button"
        onClick={() => onZoomChange && onZoomChange(Math.max(min, zoom - step))}
        disabled={zoom <= min}
        className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        title="Zoom Out"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onZoomChange && onZoomChange(100)}
        className="px-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white text-center min-w-[36px] cursor-pointer"
        title="Reset Zoom to 100%"
      >
        {zoom}%
      </button>
      <button
        type="button"
        onClick={() => onZoomChange && onZoomChange(Math.min(max, zoom + step))}
        disabled={zoom >= max}
        className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        title="Zoom In"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/**
 * Standard Backdrop Presets for Preview Canvas.
 */
export const CANVAS_BACKDROP_OPTIONS = [
  { id: "dots", label: "Dots" },
  { id: "grid", label: "Grid" },
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "gradient", label: "Mesh" },
];

/**
 * Standard Backdrop Selector buttons for Canvas floating dock.
 */
export function CanvasBackdropSelector({
  canvasBg,
  onCanvasBgChange,
  options = CANVAS_BACKDROP_OPTIONS,
}) {
  return (
    <div className="flex items-center gap-1">
      {options.map((bg) => (
        <button
          key={bg.id}
          type="button"
          onClick={() => onCanvasBgChange && onCanvasBgChange(bg.id)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
            canvasBg === bg.id
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60"
          }`}
        >
          {bg.label}
        </button>
      ))}
    </div>
  );
}
