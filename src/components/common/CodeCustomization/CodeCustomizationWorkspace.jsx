import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditorPanel from "./CodeEditorPanel";
import CodeSourceTabs from "./CodeSourceTabs";
import CodePreviewPanel from "./CodePreviewPanel";
import CodeCustomizationToolbar from "./CodeCustomizationToolbar";
import CodeCustomizationControls from "./CodeCustomizationControls";
import {
  normalizeSourceFiles,
  draftKey,
  readDraft,
  writeDraft,
} from "@/services/codeCustomization/codeCustomizationService";
import { validateSource } from "@/services/codeCustomization/codeValidationService";

const MIN_PROGRESS_MS = 500;

export default function CodeCustomizationWorkspace({
  component,
  previewModules = [],
  previewControls = [],
  previewControlsTitle,
  enableVisualMode = false,
  renderSectionBuilder,
  onApply,
  backPath,
}) {
  const navigate = useNavigate();
  const originals = useMemo(() => normalizeSourceFiles(component), [component]);
  const defaultPreviewProps = useMemo(
    () => ({
      theme: "light",
      size: "md",
      width: "full",
      variant: "default",
      accentColor: "#4f46e5",
      locale: "en-US",
      timeFormat: "24h",
      format: "24h",
      clearable: true,
      disableWeekends: false,
      ...Object.fromEntries(
        previewControls
          .filter(({ defaultValue }) => defaultValue !== undefined)
          .map(({ name, defaultValue }) => [name, defaultValue]),
      ),
    }),
    [previewControls],
  );
  const [files, setFiles] = useState(() => readDraft(component, originals));
  const [activePath, setActivePath] = useState(originals[0]?.path || "");
  const [tab, setTab] = useState("custom");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [busyAction, setBusyAction] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [workspaceMode, setWorkspaceMode] = useState("code");
  const [previewProps, setPreviewProps] = useState(defaultPreviewProps);
  const actionStartedAt = useRef(0);
  const finishTimer = useRef(null);
  const changed =
    JSON.stringify(files) !== JSON.stringify(originals) ||
    JSON.stringify(previewProps) !== JSON.stringify(defaultPreviewProps);
  const active = files.find((file) => file.path === activePath);
  const showVisualModes = enableVisualMode && previewControls.length > 0;
  const showVisualLayout = showVisualModes && workspaceMode !== "code";

  useEffect(() => () => window.clearTimeout(finishTimer.current), []);

  const startAction = (action, message) => {
    window.clearTimeout(finishTimer.current);
    actionStartedAt.current = Date.now();
    setBusy(true);
    setBusyAction(action);
    setFeedback({ type: "progress", text: message });
  };

  const finishPreview = (result) => {
    const elapsed = Date.now() - actionStartedAt.current;
    const remaining = Math.max(0, MIN_PROGRESS_MS - elapsed);
    window.clearTimeout(finishTimer.current);
    finishTimer.current = window.setTimeout(() => {
      setBusy(false);
      setBusyAction("");
      setFeedback(
        result.ok
          ? {
              type: "success",
              text: `Preview updated successfully - ${new Date().toLocaleTimeString()}`,
            }
          : {
              type: "error",
              text:
                result.message ||
                "Preview compilation failed. The last successful preview is still shown.",
            },
      );
    }, remaining);
  };

  const reset = () => {
    startAction("reset", "Resetting code and customization settings...");
    setFiles(originals);
    setPreviewProps(defaultPreviewProps);
    setError("");
    setPreview({ files: originals, nonce: Date.now() });
    try {
      localStorage.removeItem(draftKey(component));
    } catch {
      /* storage may be disabled */
    }
  };

  const updatePreview = () => {
    const result = validateSource(files);
    if (!result.valid) {
      setError(result.error);
      setBusy(false);
      setBusyAction("");
      setFeedback({ type: "error", text: result.error });
      return;
    }
    startAction("update", "Updating live preview...");
    setError("");
    setPreview({ files, nonce: Date.now() });
    if (changed) writeDraft(component, files);
  };

  const apply = async () => {
    const result = validateSource(files);
    if (!result.valid) {
      setError(result.error);
      return;
    }
    const installProps = Object.fromEntries(
      previewControls
        .filter((control) => !control.previewOnly)
        .map(({ name }) => [name, previewProps[name]])
        .filter(([, value]) => value !== undefined),
    );
    if (previewProps.footerConfig?.accentColor)
      installProps.accentColor = previewProps.footerConfig.accentColor;
    await onApply(files, installProps);
  };

  const openVisualMode = (mode) => {
    setWorkspaceMode(mode);
    if (!preview) updatePreview();
  };

  const controls = (
    <CodeCustomizationControls
      controls={previewControls}
      title={previewControlsTitle || "Customize"}
      previewProps={previewProps}
      onPropChange={(name, value) =>
        setPreviewProps((previous) => ({ ...previous, [name]: value }))
      }
    />
  );
  const sectionBuilder = renderSectionBuilder?.({
    previewProps,
    onPropChange: (name, value) => setPreviewProps((previous) => ({ ...previous, [name]: value })),
  }) || controls;
  const previewPanel = (
    <section
      className={`relative min-w-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 ${workspaceMode === "builder" ? "w-full min-h-[620px] max-[900px]:min-h-[460px]" : "min-h-0 overflow-visible"}`}
    >
      <CodePreviewPanel
        component={component}
        preview={preview}
        modules={previewModules}
        controls={showVisualLayout ? [] : previewControls}
        controlsTitle={previewControlsTitle}
        previewProps={previewProps}
        onPropChange={(name, value) =>
          setPreviewProps((previous) => ({ ...previous, [name]: value }))
        }
        onCompileResult={finishPreview}
        error={error}
        busy={busy}
        enableScrollControl={
          component.category === "Date & Time" ||
          (component.category === "Layout Module" &&
            ![
              "date-picker",
              "date-range-picker",
              "month-picker",
              "year-picker",
              "week-picker",
              "time-picker",
              "datetime-picker",
              "datetime-range-picker",
            ].includes(component.slug || component.id))
        }
      />
      {workspaceMode === "builder" && <div className="flex justify-end border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3"><button type="button" onClick={() => setWorkspaceMode("code")} className="rounded-lg border border-indigo-600 bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">Continue to Code Editor <span aria-hidden="true">→</span></button></div>}
    </section>
  );
  const sourcePanel = (
    <section
      className={`relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 ${workspaceMode === "builder" ? "mt-0 w-full" : "mt-4"}`}
    >
      <div className="flex justify-between gap-3.5 border-b border-slate-200 dark:border-slate-700 px-4 py-3.5 text-[13px]">
        <strong>Generated code</strong>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Read only - switch to Code editor to edit</span>
      </div>
      <CodeSourceTabs
        files={files}
        originals={originals}
        activePath={activePath}
        tab="custom"
        onTab={() => {}}
        onFile={setActivePath}
      />
      <CodeEditorPanel file={active} readOnly value={active?.content || ""} />
    </section>
  );

  if (!originals.length)
    return (
      <main className="mx-auto max-w-[1600px] p-6 text-slate-900 dark:text-slate-200 max-[540px]:p-3.5">
        <p role="alert">This registry entry has no editable source files.</p>
      </main>
    );
  return (
    <main className="mx-auto max-w-[1600px] p-6 text-slate-900 dark:text-slate-200 max-[540px]:p-3.5">
      <CodeCustomizationToolbar
        component={component}
        changed={changed}
        busy={busy}
        busyAction={busyAction}
        result={feedback}
        onBack={() =>
          navigate(backPath || `/date-time/${component.slug || component.id}`)
        }
        onReset={reset}
        onUpdate={updatePreview}
        onApply={apply}
      />
      {showVisualModes && (
        <nav className="mt-4 inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-1" aria-label="Customization mode">
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${workspaceMode === "code" ? "bg-white dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 shadow-sm" : "bg-transparent text-slate-500 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-800"}`}
            onClick={() => setWorkspaceMode("code")}
          >
            Code editor
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${workspaceMode === "visual" ? "bg-white dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 shadow-sm" : "bg-transparent text-slate-500 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-800"}`}
            onClick={() => openVisualMode("visual")}
          >
            Visual customize
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${workspaceMode === "builder" ? "bg-white dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 shadow-sm" : "bg-transparent text-slate-500 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-800"}`}
            onClick={() => openVisualMode("builder")}
          >
            Section builder
          </button>
        </nav>
      )}

      <div
        className={`mt-[18px] grid min-h-[620px] grid-cols-1 items-start gap-4 min-[901px]:grid-cols-2 ${workspaceMode === "visual" ? "min-[901px]:grid-cols-[minmax(380px,1fr)_minmax(480px,1.15fr)]" : ""} ${workspaceMode === "code" ? "min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" : ""} ${workspaceMode === "builder" ? "min-h-0 grid-cols-1 min-[901px]:grid-cols-1" : ""} max-[900px]:min-h-0 max-[900px]:gap-3`}
      >
        {workspaceMode === "builder" && showVisualModes ? (
          <section className="min-h-0 min-w-0 overflow-visible rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            {sectionBuilder}
          </section>
        ) : workspaceMode === "visual" && showVisualModes ? (
          <section className="min-h-0 min-w-0 overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 [scrollbar-gutter:stable] max-[900px]:max-h-[70vh]">
            {controls}
          </section>
        ) : (
          <section className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <CodeSourceTabs
              files={files}
              originals={originals}
              activePath={activePath}
              tab={tab}
              onTab={setTab}
              onFile={setActivePath}
            />
            <CodeEditorPanel
              file={active}
              readOnly={tab === "original"}
              value={
                tab === "original"
                  ? originals.find((file) => file.path === activePath)?.content
                  : active?.content
              }
              onChange={(content) =>
                setFiles((previous) => {
                  const next = previous.map((file) =>
                    file.path === activePath ? { ...file, content } : file,
                  );
                  writeDraft(component, next);
                  return next;
                })
              }
            />
          </section>
        )}
        {previewPanel}
      </div>
      {showVisualModes && showVisualLayout && sourcePanel}
      {feedback && (
        <div
          key={`${feedback.type}-${feedback.text}`}
          className={`mt-3.5 flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-xs ${feedback.type === "success" ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300" : feedback.type === "error" ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300" : "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"}`}
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <span className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-indigo-600 font-extrabold text-white ${feedback.type === "success" ? "bg-green-600" : feedback.type === "error" ? "bg-rose-600" : "animate-spin"}`}>
            {feedback.type === "success"
              ? "OK"
              : feedback.type === "progress"
                ? "..."
                : "!"}
          </span>
          <span>{feedback.text}</span>
        </div>
      )}
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
        Preview runs component JavaScript and registered dependencies inside a
        restricted sandbox. External packages are limited to React and the
        registered icon set; TypeScript and asset imports are not supported.
      </p>
    </main>
  );
}
