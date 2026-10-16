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
  toast: { name: "Toast Notification", title: "Changes saved", message: "Your changes were saved successfully.", action: "Undo", type: "success" },
  alert: { name: "Alert Banner", title: "System update", message: "Scheduled maintenance will take place at 12:00 AM UTC.", action: "Learn more", type: "info" },
  banner: { name: "System Announcement", title: "Announcement", message: "We have an important update to share.", action: "Read more", type: "info" },
  snackbar: { name: "Snackbar Toast", title: "Item deleted", message: "The item was removed from your project.", action: "Undo", type: "warning" },
  notificationCard: { name: "Notification Card", title: "New message", message: "Sarah left a comment on your project.", action: "View", type: "info" },
  notificationBadge: { name: "Notification Badge", title: "Notifications", message: "You have 3 unread notifications.", action: "View all", type: "info" },
  statusDot: { name: "Status Indicator Dot", title: "Active now", message: "Your status is online.", action: "", type: "success" },
  progressNotification: { name: "Progress Notification", title: "Uploading files", message: "Upload is in progress.", action: "Cancel", type: "info" },
  confirmDialog: { name: "Confirm Dialog Modal", title: "Delete this item?", message: "This action cannot be undone.", action: "Confirm", type: "error" },
  inlineMessage: { name: "Inline Helper Message", title: "Success", message: "Your information is up to date.", action: "", type: "success" },
};

const typeColors = {
  success: "#10b981",
  info: "#6366f1",
  warning: "#f59e0b",
  error: "#ef4444",
};

const defaults = (templateId) => ({
  templateId,
  ...templates[templateId],
  backgroundColor: "#0f172a",
  textColor: "#e2e8f0",
  mutedColor: "#94a3b8",
  accentColor: typeColors[templates[templateId].type],
  borderColor: "#334155",
  radius: 14,
  padding: 18,
  fontSize: 14,
  showAction: Boolean(templates[templateId].action),
  showIcon: true,
});

const storageKey = (templateId) => `templatehub-notification-customizer:${templateId}`;

function readSavedConfig(templateId) {
  try {
    const saved = window.localStorage.getItem(storageKey(templateId));
    if (!saved) return null;
    const config = JSON.parse(saved);
    return config.templateId === templateId ? config : null;
  } catch (error) {
    console.warn("Could not load saved notification design:", error);
    return null;
  }
}

function getNotificationStyle(config) {
  return {
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    border: `1px solid ${config.borderColor}`,
    borderLeft: `4px solid ${config.accentColor}`,
    borderRadius: `${config.radius}px`,
    padding: `${config.padding}px`,
    fontSize: `${config.fontSize}px`,
  };
}

function createNotificationCode(config) {
  const style = JSON.stringify(getNotificationStyle(config), null, 2).replace(/\n/g, "\n      ");
  return `import React from "react";

export default function CustomNotification() {
  return (
    <div role="status" style={${style}}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        ${config.showIcon ? `<span aria-hidden="true" style={{ color: ${JSON.stringify(config.accentColor)} }}>●</span>` : ""}
        <div style={{ flex: 1 }}>
          <strong>{${JSON.stringify(config.title)}}</strong>
          <p style={{ margin: "6px 0 0", opacity: 0.8 }}>{${JSON.stringify(config.message)}}</p>
        </div>
        ${config.showAction ? `<button type="button" style={{ color: ${JSON.stringify(config.accentColor)}, background: "transparent", border: 0, cursor: "pointer" }}>${JSON.stringify(config.action)}</button>` : ""}
      </div>
    </div>
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

export default function NotificationsCustomizerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const templateId = templates[id] ? id : "toast";
  const [config, setConfig] = useState(() => readSavedConfig(templateId) || defaults(templateId));
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [mobileTab, setMobileTab] = useState("preview");
  const [viewport, setViewport] = useState("desktop");

  useEffect(() => {
    if (config.templateId !== templateId) {
      setConfig(readSavedConfig(templateId) || defaults(templateId));
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

  const style = useMemo(() => getNotificationStyle(config), [config]);
  const code = useMemo(() => createNotificationCode(config), [config]);

  const reset = () => {
    setHistory((items) => [...items.slice(-39), config]);
    setFuture([]);
    setConfig(defaults(templateId));
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
      console.error("Failed to save notification customization:", error);
      setSaveStatus("error");
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setSaveStatus("copied");
    } catch (error) {
      console.error("Failed to copy notification code:", error);
      setSaveStatus("copy-error");
    }
  };

  const downloadCode = () => {
    const file = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CustomNotification.jsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const goBack = () => {
    if (isDirty && !window.confirm("You have unsaved notification changes. Leave without saving?")) return;
    navigate(`/notifications/${config.templateId}`);
  };

  const changeTemplate = (nextId) => {
    setHistory((items) => [...items.slice(-39), config]);
    setFuture([]);
    setConfig(readSavedConfig(nextId) || defaults(nextId));
    setIsDirty(true);
    navigate(`/notifications/customize/${nextId}`, { replace: true });
  };

  const selectClass = "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0b0f19] text-slate-100">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-[#0d1322] px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <button onClick={goBack} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Back to notifications"><ArrowLeft className="h-4 w-4" /></button>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold sm:text-base">{config.name} Customizer</h1>
            <p className="hidden text-[11px] text-slate-500 sm:block">Notification design workspace</p>
          </div>
          {isDirty && <span title="Unsaved changes" className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />}
        </div>
        <div className="hidden items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 p-1 md:flex">
          <button onClick={undo} disabled={!history.length} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30" title="Undo"><Undo2 className="h-4 w-4" /></button>
          <button onClick={redo} disabled={!future.length} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30" title="Redo"><Redo2 className="h-4 w-4" /></button>
          <button onClick={reset} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white" title="Reset"><RotateCcw className="h-4 w-4" /></button>
          <span className="mx-1 h-4 w-px bg-slate-700" />
          {["desktop", "tablet", "mobile"].map((mode) => <button key={mode} onClick={() => setViewport(mode)} className={`rounded-lg px-2 py-1 text-[11px] capitalize ${viewport === mode ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}>{mode}</button>)}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button onClick={() => setShowCode(true)} className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs text-slate-300 hover:text-white"><Code2 className="h-3.5 w-3.5 text-indigo-400" /><span className="hidden sm:inline">Code</span></button>
          <button onClick={save} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold ${saveStatus === "saved" ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>{saveStatus === "saved" ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}<span>{saveStatus === "saved" ? "Saved" : "Save"}</span></button>
        </div>
      </header>
      <div className="flex shrink-0 items-center justify-center gap-2 border-b border-slate-800 bg-[#0d1322] p-2 lg:hidden">
        <button onClick={() => setMobileTab("controls")} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${mobileTab === "controls" ? "bg-indigo-600 text-white" : "text-slate-400"}`}><SlidersHorizontal className="h-3.5 w-3.5" />Controls</button>
        <button onClick={() => setMobileTab("preview")} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${mobileTab === "preview" ? "bg-indigo-600 text-white" : "text-slate-400"}`}><Eye className="h-3.5 w-3.5" />Preview</button>
      </div>
      <main className="flex min-h-0 flex-1 overflow-hidden">
        <aside className={`${mobileTab === "controls" ? "flex" : "hidden"} w-full shrink-0 flex-col gap-5 overflow-y-auto border-r border-slate-800 bg-[#0d1322] p-4 lg:flex lg:w-80`}>
          <Field label="Notification Template">
            <select value={config.templateId} onChange={(event) => changeTemplate(event.target.value)} className={selectClass}>
              {Object.entries(templates).map(([value, item]) => <option key={value} value={value}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="Title"><TextInput value={config.title} onChange={(value) => updateConfig("title", value)} /></Field>
          <Field label="Message"><TextInput value={config.message} onChange={(value) => updateConfig("message", value)} /></Field>
          <Field label="Action Label"><TextInput value={config.action} onChange={(value) => updateConfig("action", value)} placeholder="Optional" /></Field>
          <Field label="Type"><select value={config.type} onChange={(event) => updateConfig("type", event.target.value)} className={selectClass}><option value="success">Success</option><option value="info">Info</option><option value="warning">Warning</option><option value="error">Error</option></select></Field>
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Background" value={config.backgroundColor} onChange={(value) => updateConfig("backgroundColor", value)} />
            <ColorInput label="Text" value={config.textColor} onChange={(value) => updateConfig("textColor", value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Accent" value={config.accentColor} onChange={(value) => updateConfig("accentColor", value)} />
            <ColorInput label="Border" value={config.borderColor} onChange={(value) => updateConfig("borderColor", value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={`Radius (${config.radius}px)`}><input type="range" min="0" max="32" value={config.radius} onChange={(event) => updateConfig("radius", Number(event.target.value))} className="w-full accent-indigo-500" /></Field>
            <Field label={`Padding (${config.padding}px)`}><input type="range" min="8" max="32" value={config.padding} onChange={(event) => updateConfig("padding", Number(event.target.value))} className="w-full accent-indigo-500" /></Field>
          </div>
          <Field label={`Font Size (${config.fontSize}px)`}><input type="range" min="11" max="22" value={config.fontSize} onChange={(event) => updateConfig("fontSize", Number(event.target.value))} className="w-full accent-indigo-500" /></Field>
          <div className="space-y-3 border-t border-slate-800 pt-4">
            <label className="flex items-center justify-between text-sm text-slate-300"><span>Show action</span><input type="checkbox" checked={config.showAction} onChange={(event) => updateConfig("showAction", event.target.checked)} className="accent-indigo-500" /></label>
            <label className="flex items-center justify-between text-sm text-slate-300"><span>Show icon</span><input type="checkbox" checked={config.showIcon} onChange={(event) => updateConfig("showIcon", event.target.checked)} className="accent-indigo-500" /></label>
          </div>
          {saveStatus === "error" && <p role="alert" className="text-xs text-rose-400">Could not save. Check browser storage permissions and try again.</p>}
        </aside>
        <section className={`${mobileTab === "preview" ? "flex" : "hidden"} min-w-0 flex-1 flex-col items-center justify-center overflow-auto bg-slate-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] p-6 lg:flex`}>
          <div className="mb-6 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium capitalize text-slate-400">Live Preview <span className="mx-2 text-slate-700">/</span>{viewport} view</div>
          <div className={`flex min-h-64 items-center justify-center rounded-[2rem] border-[8px] border-slate-800 bg-slate-900/80 p-10 shadow-2xl transition-all ${viewport === "mobile" ? "w-[min(100%,280px)] min-h-[460px]" : viewport === "tablet" ? "w-[min(100%,560px)] min-h-[360px]" : "w-full max-w-4xl"}`}>
            <div role="status" style={style} className="w-full max-w-lg shadow-xl">
              <div className="flex items-start gap-3">
                {config.showIcon && <span aria-hidden="true" className="text-lg leading-none" style={{ color: config.accentColor }}>●</span>}
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold" style={{ fontSize: `${config.fontSize}px` }}>{config.title}</h2>
                  <p className="mt-1 text-sm" style={{ color: config.mutedColor }}>{config.message}</p>
                </div>
                {config.showAction && config.action && <button type="button" className="shrink-0 text-sm font-semibold" style={{ color: config.accentColor }}>{config.action}</button>}
              </div>
            </div>
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
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3"><h2 className="text-sm font-bold">Generated Notification Code</h2><button onClick={() => setShowCode(false)} className="rounded px-2 py-1 text-slate-400 hover:text-white" aria-label="Close code dialog">×</button></div>
            <pre className="min-h-0 flex-1 overflow-auto p-4 text-xs leading-relaxed text-slate-300"><code>{code}</code></pre>
            <div className="flex justify-end gap-2 border-t border-slate-800 p-3"><button onClick={copyCode} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"><Copy className="h-3.5 w-3.5" />Copy code</button><button onClick={downloadCode} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"><Download className="h-3.5 w-3.5" />Download</button></div>
          </div>
        </div>
      )}
      {saveStatus === "saved" && <div role="status" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950 px-4 py-2 text-xs text-emerald-300"><Check className="h-4 w-4" />Design saved in this browser</div>}
    </div>
  );
}
