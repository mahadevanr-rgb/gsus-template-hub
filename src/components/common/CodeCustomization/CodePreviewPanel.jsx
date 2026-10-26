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

function revealPopupInHost(iframe, popupTop, popupBottom) {
  const popupHeight = popupBottom - popupTop;
  if (!Number.isFinite(popupHeight) || popupHeight <= 0) return;

  const headerInset = 80;
  const margin = 16;
  const viewportTop = headerInset + margin;
  const viewportBottom = window.innerHeight - margin;
  const frameTop = iframe.getBoundingClientRect().top;
  const top = frameTop + popupTop;
  const bottom = frameTop + popupBottom;
  let delta = 0;

  if (popupHeight > viewportBottom - viewportTop) delta = top - viewportTop;
  else if (top < viewportTop) delta = top - viewportTop;
  else if (bottom > viewportBottom) delta = bottom - viewportBottom;
  if (!delta) return;

  let scrollTarget = null;
  for (let ancestor = iframe.parentElement; ancestor; ancestor = ancestor.parentElement) {
    const { overflowY } = window.getComputedStyle(ancestor);
    if (["auto", "scroll", "overlay"].includes(overflowY) && ancestor.scrollHeight > ancestor.clientHeight) {
      scrollTarget = ancestor;
      break;
    }
  }

  if (scrollTarget) scrollTarget.scrollBy({ top: delta, behavior: "smooth" });
  else document.scrollingElement?.scrollBy({ top: delta, behavior: "smooth" });
}

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
        iframe.contentWindow.postMessage({ type: "templatehub-preview-scroll-mode", enabled: previewScrollableRef.current, revealPopup: isDateTimePreview }, "*");
        if (latest.current) iframe.contentWindow.postMessage(latest.current, "*");
      } else if (event.data?.type === "templatehub-preview-runtime-error") {
        ready.current = false;
        setRuntimeError(event.data.message || "Preview runtime failed to load.");
        compileResultRef.current?.({ ok: false, message: event.data.message || "Preview runtime failed to load." });
      } else if (event.data?.type === "templatehub-preview-resize") {
        const height = Number(event.data.height);
        const popupBottom = Number(event.data.popupBottom);
        const popupViewportTop = Number(event.data.popupViewportTop);
        const popupViewportBottom = Number(event.data.popupViewportBottom);
        const popupIsOpen = popupBottom > 0;
        if (!popupIsOpen) lastAutoScrolledPopup.current = false;
        else if (isDateTimePreview && !lastAutoScrolledPopup.current) {
          revealPopupInHost(iframe, popupViewportTop, popupViewportBottom);
          lastAutoScrolledPopup.current = true;
        }
        if (Number.isFinite(height)) {
          measuredFrameHeight.current = Math.max(minPreviewHeight, Math.min(6000, height));
        }
        if (!previewScrollableRef.current && Number.isFinite(height)) {
          iframe.style.height = `${measuredFrameHeight.current}px`;
        }
      } else if (event.data?.type === "templatehub-preview-result") {
        compileResultRef.current?.({ ok: event.data.ok, message: event.data.message });
      }
    };
    window.addEventListener("message", onMessage);
    iframe.onload = () => iframe.contentWindow.postMessage({ type: "templatehub-preview-ping" }, "*");
    iframe.srcdoc = createPreviewDocument(component, previewStyles);
    return () => { ready.current = false; window.removeEventListener("message", onMessage); };
  }, [component, isDateTimePreview, minPreviewHeight]);

  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return undefined;
    const resizeFrame = () => {
      if (previewScrollable) iframe.style.height = `${Math.max(420, Math.min(760, Math.floor(window.innerHeight * 0.72)))}px`;
      else iframe.style.height = `${Math.max(minPreviewHeight, measuredFrameHeight.current)}px`;
      if (ready.current) iframe.contentWindow.postMessage({ type: "templatehub-preview-scroll-mode", enabled: previewScrollable, revealPopup: isDateTimePreview }, "*");
    };
    resizeFrame();
    window.addEventListener("resize", resizeFrame);
    return () => window.removeEventListener("resize", resizeFrame);
  }, [previewScrollable, minPreviewHeight, isDateTimePreview]);

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
    <div className="flex min-h-[620px] flex-col max-[900px]:min-h-[420px]">
      <div className="flex justify-between gap-3.5 border-b border-slate-200 dark:border-slate-700 px-4 py-3.5 text-[13px] text-slate-900 dark:text-slate-100">
        <strong>Live Preview</strong>
        <div className="flex min-w-0 items-center justify-end gap-3">
          {enableScrollControl && <button type="button" aria-pressed={previewScrollable} onClick={() => setPreviewScrollable((current) => !current)} className={`shrink-0 rounded-lg border px-2 py-1.5 text-[11px] font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${previewScrollable ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950 dark:text-indigo-200" : "border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>Scroll preview: {previewScrollable ? "On" : "Off"}</button>}
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{busy ? "Compiling…" : runtimeError ? "Runtime unavailable" : preview ? "Updated" : "Click Update Preview to render"}</span>
        </div>
      </div>
      {controls.length > 0 && <CodeCustomizationControls controls={controls} title={controlsTitle} previewProps={previewProps} onPropChange={onPropChange} />}
      {(error || runtimeError) && <div className="m-3 rounded-lg border border-rose-200 bg-rose-50 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300" role="alert">{error || runtimeError}{runtimeError && <button type="button" onClick={retryRuntime} className="ml-2 underline">Retry preview runtime</button>}</div>}
      <iframe ref={frame} title={`${component.name} sandbox preview`} sandbox="allow-scripts" className="block min-h-[540px] w-full flex-none border-0 bg-white max-[900px]:min-h-[360px]" />
      {!preview && !runtimeError && <div className="pointer-events-none absolute inset-x-0 top-[52px] grid place-items-center text-slate-400">Click Update Preview to render your component</div>}
    </div>
  );
}
