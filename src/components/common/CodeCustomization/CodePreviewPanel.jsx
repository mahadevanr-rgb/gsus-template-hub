import { useEffect, useRef, useState } from "react";
import { createPreviewDocument } from "@/services/codeCustomization/previewService";
import { useTheme } from "@/hooks/useTheme";
import previewStyles from "@/index.css?inline";
import CodeCustomizationControls from "./CodeCustomizationControls";

const DATE_TIME_PICKER_IDS = new Set([
  "date-picker",
  "date-range-picker",
  "month-picker",
  "year-picker",
  "week-picker",
  "time-picker",
  "datetime-picker",
  "datetime-range-picker",
]);

export default function CodePreviewPanel({
  component,
  preview,
  modules,
  controls = [],
  controlsTitle = "Customize picker",
  previewProps,
  onPropChange,
  onCompileResult,
  error,
  busy,
  enableScrollControl = false,
}) {
  const frame = useRef(null);
  const { theme } = useTheme();
  const componentId = component.slug || component.id;
  const isDateTimePreview = DATE_TIME_PICKER_IDS.has(componentId) || ["date-time", "Date & Time"].includes(component.category);
  const minPreviewHeight = isDateTimePreview ? 700 : 560;
  const ready = useRef(false);
  const latest = useRef(null);
  const compiledPreview = useRef(null);
  const [runtimeError, setRuntimeError] = useState("");
  const [previewScrollable, setPreviewScrollable] = useState(enableScrollControl);
  const previewScrollableRef = useRef(previewScrollable);
  const compileResultRef = useRef(onCompileResult);
  const lastAutoScrolledPopup = useRef(false);
  const measuredFrameHeight = useRef(minPreviewHeight);

  useEffect(() => { compileResultRef.current = onCompileResult; }, [onCompileResult]);
  useEffect(() => { setPreviewScrollable(enableScrollControl); }, [enableScrollControl]);
  useEffect(() => { previewScrollableRef.current = previewScrollable; }, [previewScrollable]);
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return undefined;
    const onMessage = (event) => {
      if (event.source !== iframe.contentWindow) return;
      if (event.data?.type === "templatehub-preview-ready") {
        ready.current = true;
        setRuntimeError("");
        iframe.contentWindow.postMessage({ type: "templatehub-preview-scroll-mode", enabled: previewScrollableRef.current }, "*");
        if (latest.current) iframe.contentWindow.postMessage(latest.current, "*");
      } else if (event.data?.type === "templatehub-preview-runtime-error") {
        ready.current = false;
        setRuntimeError(event.data.message || "Preview runtime failed to load.");
        compileResultRef.current?.({ ok: false, message: event.data.message || "Preview runtime failed to load." });
      } else if (event.data?.type === "templatehub-preview-resize") {
        const height = Number(event.data.height);
        if (Number.isFinite(height)) {
          measuredFrameHeight.current = Math.max(minPreviewHeight, Math.min(6000, height));
        }
        if (!previewScrollableRef.current && Number.isFinite(height)) {
          iframe.style.height = `${measuredFrameHeight.current}px`;
          const popupIsOpen = Number(event.data.popupBottom) > 0;
          if (!popupIsOpen) lastAutoScrolledPopup.current = false;
          if (isDateTimePreview && popupIsOpen && !lastAutoScrolledPopup.current) {
            requestAnimationFrame(() => {
              const popupBottom = iframe.getBoundingClientRect().top + Number(event.data.popupBottom);
              if (popupBottom > window.innerHeight - 24) {
                iframe.scrollIntoView({ block: "end", behavior: "smooth" });
              }
              lastAutoScrolledPopup.current = true;
            });
          }
        }
      } else if (event.data?.type === "templatehub-preview-result") {
        compileResultRef.current?.({ ok: event.data.ok, message: event.data.message });
      }
    };
    window.addEventListener("message", onMessage);
    iframe.onload = () => iframe.contentWindow.postMessage({ type: "templatehub-preview-ping" }, "*");
    iframe.srcdoc = createPreviewDocument(component, previewStyles);
    return () => { ready.current = false; window.removeEventListener("message", onMessage); };
  }, [component, minPreviewHeight]);

  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return undefined;
    const resizeFrame = () => {
      if (previewScrollable) iframe.style.height = `${Math.max(420, Math.min(760, Math.floor(window.innerHeight * 0.72)))}px`;
      else iframe.style.height = `${Math.max(minPreviewHeight, measuredFrameHeight.current)}px`;
      if (ready.current) iframe.contentWindow.postMessage({ type: "templatehub-preview-scroll-mode", enabled: previewScrollable }, "*");
    };
    resizeFrame();
    window.addEventListener("resize", resizeFrame);
    return () => window.removeEventListener("resize", resizeFrame);
  }, [previewScrollable, minPreviewHeight]);

  useEffect(() => {
    if (!preview) return;
    if (compiledPreview.current !== preview) {
      compiledPreview.current = preview;
      latest.current = { type: "templatehub-preview", files: preview.files, modules, theme, previewProps };
      if (ready.current && frame.current) frame.current.contentWindow.postMessage(latest.current, "*");
      return;
    }
    latest.current = { ...latest.current, theme, previewProps };
    if (ready.current && frame.current) frame.current.contentWindow.postMessage({ type: "templatehub-preview-props", theme, previewProps }, "*");
  }, [preview, modules, theme, previewProps]);

  const retryRuntime = () => {
    if (!frame.current) return;
    ready.current = false;
    setRuntimeError("");
    frame.current.srcdoc = createPreviewDocument(component, previewStyles);
  };

  return (
    <div className="custom-preview">
      <div className="custom-preview-head">
        <strong>Live Preview</strong>
        <div className="custom-preview-head-actions">
          {enableScrollControl && <button type="button" className="custom-preview-scroll-toggle" aria-pressed={previewScrollable} onClick={() => setPreviewScrollable((current) => !current)}>Scroll preview: {previewScrollable ? "On" : "Off"}</button>}
          <span>{busy ? "Compiling…" : runtimeError ? "Runtime unavailable" : preview ? "Updated" : "Click Update Preview to render"}</span>
        </div>
      </div>
      {controls.length > 0 && <CodeCustomizationControls controls={controls} title={controlsTitle} previewProps={previewProps} onPropChange={onPropChange} />}
      {(error || runtimeError) && <div className="custom-error" role="alert">{error || runtimeError}{runtimeError && <button type="button" onClick={retryRuntime}>Retry preview runtime</button>}</div>}
      <iframe ref={frame} title={`${component.name} sandbox preview`} sandbox="allow-scripts" />
      {!preview && !runtimeError && <div className="custom-preview-empty">Click Update Preview to render your component</div>}
    </div>
  );
}
