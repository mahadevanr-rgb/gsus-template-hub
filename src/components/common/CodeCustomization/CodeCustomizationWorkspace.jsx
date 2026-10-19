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
import "./CodeCustomizationWorkspace.scss";

const MIN_PROGRESS_MS = 500;

export default function CodeCustomizationWorkspace({
  component,
  previewModules = [],
  previewControls = [],
  previewControlsTitle,
  enableVisualMode = false,
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
  const previewPanel = (
    <section
      className={`custom-panel custom-workspace-preview${workspaceMode === "builder" ? " custom-builder-preview" : ""}`}
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
    </section>
  );
  const sourcePanel = (
    <section
      className={`custom-panel custom-source-below${workspaceMode === "builder" ? " custom-builder-source" : ""}`}
    >
      <div className="custom-preview-head">
        <strong>Generated code</strong>
        <span>Read only - switch to Code editor to edit</span>
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
      <main className="custom-workspace">
        <p role="alert">This registry entry has no editable source files.</p>
      </main>
    );
  return (
    <main className="custom-workspace">
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
        <nav className="custom-mode-switch" aria-label="Customization mode">
          <button
            type="button"
            className={workspaceMode === "code" ? "active" : ""}
            onClick={() => setWorkspaceMode("code")}
          >
            Code editor
          </button>
          <button
            type="button"
            className={workspaceMode === "visual" ? "active" : ""}
            onClick={() => openVisualMode("visual")}
          >
            Visual customize
          </button>
          <button
            type="button"
            className={workspaceMode === "builder" ? "active" : ""}
            onClick={() => openVisualMode("builder")}
          >
            Section builder
          </button>
        </nav>
      )}

      <div
        className={`custom-workspace-grid ${workspaceMode === "visual" ? "visual-mode" : ""} ${workspaceMode === "builder" ? "builder-mode" : ""} ${workspaceMode === "code" ? "code-mode" : ""}`}
      >
        {workspaceMode === "builder" && showVisualModes ? (
          <section className="custom-panel custom-builder-controls">
            {controls}
          </section>
        ) : workspaceMode === "visual" && showVisualModes ? (
          <section className="custom-panel custom-visual-controls">
            {controls}
          </section>
        ) : (
          <section className="custom-panel custom-editor">
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
          className={`custom-feedback ${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <span className="custom-feedback-mark">
            {feedback.type === "success"
              ? "OK"
              : feedback.type === "progress"
                ? "..."
                : "!"}
          </span>
          <span>{feedback.text}</span>
        </div>
      )}
      <p className="custom-note">
        Preview runs component JavaScript and registered dependencies inside a
        restricted sandbox. External packages are limited to React and the
        registered icon set; TypeScript and asset imports are not supported.
      </p>
    </main>
  );
}
