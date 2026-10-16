import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  Redo2,
  RotateCcw,
  Save,
  SlidersHorizontal,
  Undo2,
} from "lucide-react";

const templates = {
  "primary-button": {
    name: "Primary Button",
    label: "Primary Action",
    backgroundColor: "#4f46e5",
    textColor: "#ffffff",
    borderColor: "#4f46e5",
    shadow: true,
  },
  "secondary-button": {
    name: "Secondary Button",
    label: "Secondary Action",
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    borderColor: "#7c3aed",
    shadow: false,
  },
  "outline-button": {
    name: "Outline Button",
    label: "Outline Action",
    backgroundColor: "#0f172a",
    textColor: "#67e8f9",
    borderColor: "#22d3ee",
    shadow: false,
  },
  "ghost-button": {
    name: "Ghost Button",
    label: "Ghost Action",
    backgroundColor: "#0f172a",
    textColor: "#e2e8f0",
    borderColor: "#0f172a",
    shadow: false,
  },
  "gradient-button": {
    name: "Gradient Button",
    label: "Gradient Action",
    backgroundColor: "#7c3aed",
    textColor: "#ffffff",
    borderColor: "#7c3aed",
    shadow: true,
  },
  "shadow-button": {
    name: "Shadow Button",
    label: "Elevated Action",
    backgroundColor: "#1e293b",
    textColor: "#ffffff",
    borderColor: "#475569",
    shadow: true,
  },
  "animated-button": {
    name: "Animated Button",
    label: "Animated Action",
    backgroundColor: "#0f766e",
    textColor: "#ffffff",
    borderColor: "#0f766e",
    shadow: true,
  },
  "pulse-button": {
    name: "Pulse Button",
    label: "Pulse Action",
    backgroundColor: "#059669",
    textColor: "#ffffff",
    borderColor: "#059669",
    shadow: true,
  },
  "icon-button": {
    name: "Icon Button",
    label: "Icon Action",
    backgroundColor: "#d97706",
    textColor: "#ffffff",
    borderColor: "#d97706",
    shadow: false,
  },
  "floating-button": {
    name: "Floating Button",
    label: "Quick Action",
    backgroundColor: "#ea580c",
    textColor: "#ffffff",
    borderColor: "#ea580c",
    shadow: true,
  },
};

const defaultConfig = (templateId) => ({
  templateId,
  ...templates[templateId],
  variant:
    templateId === "outline-button"
      ? "outline"
      : templateId === "ghost-button"
        ? "ghost"
        : templateId === "gradient-button"
          ? "gradient"
          : "solid",
  icon: "",
  iconPosition: "left",
  size: "md",
  radius: 10,
  fontSize: 14,
  fullWidth: false,
  disabled: false,
});

const storageKey = (templateId) => `templatehub-button-customizer:${templateId}`;

function readSavedConfig(templateId) {
  try {
    const saved = window.localStorage.getItem(storageKey(templateId));
    if (!saved) return null;
    const config = JSON.parse(saved);
    return config.templateId === templateId ? config : null;
  } catch (error) {
    console.warn("Could not load saved button design:", error);
    return null;
  }
}

function createButtonStyle(config) {
  const sizes = {
    sm: { padding: "8px 14px", fontSize: config.fontSize },
    md: { padding: "11px 20px", fontSize: config.fontSize },
    lg: { padding: "14px 26px", fontSize: config.fontSize },
  };
  const transparent = config.variant === "outline" || config.variant === "ghost";

  return {
    ...sizes[config.size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: config.fullWidth ? "100%" : "auto",
    borderRadius: `${config.radius}px`,
    border: `1px solid ${config.variant === "ghost" ? "transparent" : config.borderColor}`,
    background:
      config.variant === "gradient"
        ? `linear-gradient(135deg, ${config.backgroundColor}, #a855f7)`
        : transparent
          ? "transparent"
          : config.backgroundColor,
    color: config.textColor,
    fontWeight: 600,
    boxShadow: config.shadow ? `0 8px 24px ${config.backgroundColor}55` : "none",
    opacity: config.disabled ? 0.5 : 1,
    cursor: config.disabled ? "not-allowed" : "pointer",
    transition: "all 180ms ease",
  };
}

function createComponentCode(config) {
  const style = createButtonStyle(config);
  const cleanStyle = { ...style, width: config.fullWidth ? "100%" : "auto" };
  const buttonText = config.label || "Button";
  const labelNode = `      <span>{${JSON.stringify(buttonText)}}</span>\n`;
  const iconNode = config.icon
    ? `      <span aria-hidden="true">{${JSON.stringify(config.icon)}}</span>\n`
    : "";
  const label = config.iconPosition === "right"
    ? `${labelNode}${iconNode}`
    : `${iconNode}${labelNode}`;

  return `import React from "react";

export default function CustomButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={${config.disabled}}
      style={${JSON.stringify(cleanStyle, null, 8).replace(/\n/g, "\n      ")}}
    >
${label}    </button>
  );
}`;
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
    />
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 p-1.5">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent"
          aria-label={label}
        />
        <span className="font-mono text-xs text-slate-300">{value}</span>
      </div>
    </Field>
  );
}

export default function ButtonsCustomizerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const templateId = templates[id] ? id : "primary-button";
  const [config, setConfig] = useState(() => readSavedConfig(templateId) || defaultConfig(templateId));
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [mobileTab, setMobileTab] = useState("preview");
  const [viewport, setViewport] = useState("desktop");

  useEffect(() => {
    if (config.templateId !== templateId) {
      setConfig(readSavedConfig(templateId) || defaultConfig(templateId));
      setHistory([]);
      setFuture([]);
      setIsDirty(false);
      setSaveStatus("");
    }
  }, [config.templateId, templateId]);

  const updateConfig = useCallback((key, value) => {
    setHistory((items) => [...items.slice(-39), config]);
    setFuture([]);
    setConfig((current) => ({ ...current, [key]: value }));
    setIsDirty(true);
    setSaveStatus("");
  }, [config]);

  const code = useMemo(() => createComponentCode(config), [config]);
  const buttonStyle = useMemo(() => createButtonStyle(config), [config]);

  const reset = () => {
    setHistory((items) => [...items.slice(-39), config]);
    setFuture([]);
    setConfig(defaultConfig(templateId));
    setIsDirty(true);
    setSaveStatus("");
  };

  const undo = () => {
    if (!history.length) return;
    setFuture((items) => [config, ...items]);
    setConfig(history[history.length - 1]);
    setHistory((items) => items.slice(0, -1));
    setIsDirty(true);
  };

  const redo = () => {
    if (!future.length) return;
    setHistory((items) => [...items, config]);
    setConfig(future[0]);
    setFuture((items) => items.slice(1));
    setIsDirty(true);
  };

  const save = () => {
    try {
      window.localStorage.setItem(storageKey(config.templateId), JSON.stringify(config));
      setIsDirty(false);
      setSaveStatus("saved");
    } catch (error) {
      console.error("Failed to save button design:", error);
      setSaveStatus("error");
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setSaveStatus("copied");
    } catch (error) {
      console.error("Failed to copy button code:", error);
      setSaveStatus("copy-error");
    }
  };

  const downloadCode = () => {
    const file = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CustomButton.jsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const goBack = () => {
    if (isDirty && !window.confirm("You have unsaved button changes. Leave without saving?")) return;
    navigate(`/buttons/${config.templateId}`);
  };

  const changeTemplate = (nextId) => {
    setHistory((items) => [...items.slice(-39), config]);
    setFuture([]);
    setConfig(readSavedConfig(nextId) || defaultConfig(nextId));
    setIsDirty(true);
    navigate(`/buttons/customize/${nextId}`, { replace: true });
  };

  const selectClass = "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0b0f19] text-slate-100">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-[#0d1322] px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <button onClick={goBack} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Back to buttons">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold sm:text-base">{config.name} Customizer</h1>
            <p className="hidden text-[11px] text-slate-500 sm:block">Button design workspace</p>
          </div>
          {isDirty && <span title="Unsaved changes" className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />}
        </div>

        <div className="hidden items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 p-1 md:flex">
          <button onClick={undo} disabled={!history.length} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30" title="Undo"><Undo2 className="h-4 w-4" /></button>
          <button onClick={redo} disabled={!future.length} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30" title="Redo"><Redo2 className="h-4 w-4" /></button>
          <button onClick={reset} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white" title="Reset"><RotateCcw className="h-4 w-4" /></button>
          <span className="mx-1 h-4 w-px bg-slate-700" />
          {["desktop", "tablet", "mobile"].map((mode) => (
            <button key={mode} onClick={() => setViewport(mode)} className={`rounded-lg px-2 py-1 text-[11px] capitalize ${viewport === mode ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}>
              {mode}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button onClick={() => setShowCode(true)} className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs text-slate-300 hover:text-white">
            <Code2 className="h-3.5 w-3.5 text-indigo-400" /><span className="hidden sm:inline">Code</span>
          </button>
          <button onClick={save} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold ${saveStatus === "saved" ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>
            {saveStatus === "saved" ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{saveStatus === "saved" ? "Saved" : "Save"}</span>
          </button>
        </div>
      </header>

      <div className="flex shrink-0 items-center justify-center gap-2 border-b border-slate-800 bg-[#0d1322] p-2 lg:hidden">
        <button onClick={() => setMobileTab("controls")} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${mobileTab === "controls" ? "bg-indigo-600 text-white" : "text-slate-400"}`}><SlidersHorizontal className="h-3.5 w-3.5" />Controls</button>
        <button onClick={() => setMobileTab("preview")} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${mobileTab === "preview" ? "bg-indigo-600 text-white" : "text-slate-400"}`}><Eye className="h-3.5 w-3.5" />Preview</button>
      </div>

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <aside className={`${mobileTab === "controls" ? "flex" : "hidden"} w-full shrink-0 flex-col gap-5 overflow-y-auto border-r border-slate-800 bg-[#0d1322] p-4 lg:flex lg:w-80`}>
          <Field label="Button Template">
            <select value={config.templateId} onChange={(event) => changeTemplate(event.target.value)} className={selectClass}>
              {Object.entries(templates).map(([value, item]) => <option key={value} value={value}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="Button Label"><TextInput value={config.label} onChange={(value) => updateConfig("label", value)} /></Field>
          <Field label="Icon (optional)"><TextInput value={config.icon} onChange={(value) => updateConfig("icon", value)} placeholder="Paste an emoji or symbol" /></Field>
          <Field label="Icon Position">
            <select value={config.iconPosition} onChange={(event) => updateConfig("iconPosition", event.target.value)} className={selectClass}>
              <option value="left">Before text</option><option value="right">After text</option>
            </select>
          </Field>
          <Field label="Visual Variant">
            <select value={config.variant} onChange={(event) => updateConfig("variant", event.target.value)} className={selectClass}>
              <option value="solid">Solid</option><option value="outline">Outline</option><option value="ghost">Ghost</option><option value="gradient">Gradient</option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Size"><select value={config.size} onChange={(event) => updateConfig("size", event.target.value)} className={selectClass}><option value="sm">Small</option><option value="md">Medium</option><option value="lg">Large</option></select></Field>
            <Field label="Radius (px)"><input type="number" min="0" max="40" value={config.radius} onChange={(event) => updateConfig("radius", Math.min(40, Math.max(0, Number(event.target.value))))} className={selectClass} /></Field>
          </div>
          <Field label={`Font Size (${config.fontSize}px)`}><input type="range" min="10" max="24" value={config.fontSize} onChange={(event) => updateConfig("fontSize", Number(event.target.value))} className="w-full accent-indigo-500" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Background" value={config.backgroundColor} onChange={(value) => updateConfig("backgroundColor", value)} />
            <ColorInput label="Text" value={config.textColor} onChange={(value) => updateConfig("textColor", value)} />
          </div>
          {config.variant !== "ghost" && <ColorInput label="Border" value={config.borderColor} onChange={(value) => updateConfig("borderColor", value)} />}
          <div className="space-y-3 border-t border-slate-800 pt-4">
            <label className="flex items-center justify-between text-sm text-slate-300"><span>Drop shadow</span><input type="checkbox" checked={config.shadow} onChange={(event) => updateConfig("shadow", event.target.checked)} className="accent-indigo-500" /></label>
            <label className="flex items-center justify-between text-sm text-slate-300"><span>Full width</span><input type="checkbox" checked={config.fullWidth} onChange={(event) => updateConfig("fullWidth", event.target.checked)} className="accent-indigo-500" /></label>
            <label className="flex items-center justify-between text-sm text-slate-300"><span>Disabled</span><input type="checkbox" checked={config.disabled} onChange={(event) => updateConfig("disabled", event.target.checked)} className="accent-indigo-500" /></label>
          </div>
          {saveStatus === "error" && <p role="alert" className="text-xs text-rose-400">Could not save. Check browser storage permissions and try again.</p>}
        </aside>

        <section className={`${mobileTab === "preview" ? "flex" : "hidden"} min-w-0 flex-1 flex-col items-center justify-center overflow-auto bg-slate-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] p-6 lg:flex`}>
          <div className="mb-6 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium capitalize text-slate-400">
            Live Preview <span className="mx-2 text-slate-700">/</span>{viewport} view
          </div>
          <div className={`flex min-h-64 items-center justify-center rounded-[2rem] border-[8px] border-slate-800 bg-slate-900/80 p-10 shadow-2xl transition-all ${viewport === "mobile" ? "w-[min(100%,280px)] min-h-[460px]" : viewport === "tablet" ? "w-[min(100%,560px)] min-h-[360px]" : "w-full max-w-4xl"}`}>
            <button type="button" disabled={config.disabled} style={buttonStyle}>
              {config.icon && config.iconPosition === "left" && <span aria-hidden="true">{config.icon}</span>}
              <span>{config.label || "Button"}</span>
              {config.icon && config.iconPosition === "right" && <span aria-hidden="true">{config.icon}</span>}
            </button>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button onClick={copyCode} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:text-white"><Copy className="h-3.5 w-3.5" />Copy Code</button>
            <button onClick={downloadCode} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:text-white"><Download className="h-3.5 w-3.5" />Download JSX</button>
          </div>
          {saveStatus === "copied" && <p role="status" className="mt-3 text-xs text-emerald-400">Code copied to clipboard.</p>}
          {saveStatus === "copy-error" && <p role="alert" className="mt-3 text-xs text-rose-400">Could not access clipboard. Use the Code button to copy manually.</p>}
        </section>
      </main>

      {showCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0d1322]">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <h2 className="text-sm font-bold">Generated Button Code</h2>
              <button onClick={() => setShowCode(false)} className="rounded px-2 py-1 text-slate-400 hover:text-white" aria-label="Close code dialog">×</button>
            </div>
            <pre className="min-h-0 flex-1 overflow-auto p-4 text-xs leading-relaxed text-slate-300"><code>{code}</code></pre>
            <div className="flex justify-end gap-2 border-t border-slate-800 p-3">
              <button onClick={copyCode} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"><Copy className="h-3.5 w-3.5" />Copy code</button>
              <button onClick={downloadCode} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"><Download className="h-3.5 w-3.5" />Download</button>
            </div>
          </div>
        </div>
      )}
      {saveStatus === "saved" && <div role="status" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950 px-4 py-2 text-xs text-emerald-300"><Check className="h-4 w-4" />Design saved in this browser</div>}
    </div>
  );
}
