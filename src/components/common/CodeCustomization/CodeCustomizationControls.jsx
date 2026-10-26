import { useState } from "react";
import FooterConfigurationEditor from "./FooterConfigurationEditor";

export default function CodeCustomizationControls({
  controls = [],
  title = "Customize",
  previewProps,
  onPropChange,
}) {
  const [fileError, setFileError] = useState("");
  const groups = controls.filter((control) => control.type !== "hidden").reduce((result, control) => {
    const name = control.group || title;
    if (!result.has(name)) result.set(name, []);
    result.get(name).push(control);
    return result;
  }, new Map());

  const renderControls = (groupControls) => groupControls.filter((control) => control.type !== "hidden" &&
    (!control.showWhen || Boolean(previewProps[control.showWhen])) &&
    (!control.hideWhen || !previewProps[control.hideWhen]),
  ).map((control) => {
    const id = `custom-${control.name}`;
    return (
      <div key={control.name} className="flex min-w-0 flex-col gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        {control.type !== "footerConfig" && <label htmlFor={id} className="font-medium">{control.label}</label>}
        {control.type === "footerConfig" ? (
          <FooterConfigurationEditor value={previewProps[control.name] || control.defaultValue} onChange={(next) => {
            onPropChange(control.name, next);
            if (next.accentColor) onPropChange("accentColor", next.accentColor);
          }} />
        ) : control.type === "checkbox" ? (
          <input id={id} type="checkbox" checked={Boolean(previewProps[control.name])} onChange={(event) => onPropChange(control.name, event.target.checked)} className="h-[17px] w-[17px] self-start accent-indigo-600" />
        ) : control.type === "file" ? (
          <input id={id} type="file" accept={control.accept || "image/png"} onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (control.accept === "image/png" && file.type !== "image/png") {
              setFileError("Choose a PNG image file.");
              event.target.value = "";
              return;
            }
            if (file.size > (control.maxSize || 2 * 1024 * 1024)) {
              setFileError("Choose an image smaller than 2 MB.");
              event.target.value = "";
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = String(reader.result || "");
              const image = new Image();
              image.onload = () => {
                setFileError("");
                onPropChange(control.name, dataUrl);
              };
              image.onerror = () => setFileError("The selected image could not be decoded. Choose another PNG.");
              image.src = dataUrl;
            };
            reader.onerror = () => setFileError("The image could not be loaded.");
            reader.readAsDataURL(file);
            event.target.value = "";
          }} />
        ) : control.type === "textarea" ? (
          <textarea id={id} rows={3} value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value)} className="w-full min-w-0 resize-y rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        ) : control.type === "text" ? (
          <input id={id} type="text" value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value)} className="w-full min-w-0 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        ) : control.type === "date" ? (
          <input id={id} type="date" value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value || undefined)} className="w-full min-w-0 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        ) : control.type === "color" ? (
          <input id={id} type="color" value={previewProps[control.name] ?? control.defaultValue ?? "#6366f1"} onChange={(event) => onPropChange(control.name, event.target.value)} className="min-h-9 w-full cursor-pointer rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-1" />
        ) : (
          <select id={id} value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value)} className="w-full min-w-0 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {(control.options || []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        )}
        {control.help && <small className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">{control.help}</small>}
        {control.type === "file" && previewProps[control.name] && (
          <span className="flex items-center justify-between gap-2 text-[10px] text-emerald-700 dark:text-emerald-300">
            <img className="h-8 max-w-[120px] rounded border border-slate-300 bg-white object-contain" src={previewProps[control.name]} alt="Uploaded company logo preview" onError={() => setFileError("The uploaded PNG could not be displayed.")} />
            <span>PNG logo selected</span>
            <button type="button" onClick={() => { onPropChange(control.name, ""); setFileError(""); }} className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">Remove</button>
          </span>
        )}
      </div>
    );
  });

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4">
      <div className="mb-3.5 flex items-baseline justify-between gap-3 text-sm"><strong className="text-slate-900 dark:text-slate-100">{title}</strong><span className="text-[11px] text-slate-500 dark:text-slate-400">Changes update the preview</span></div>
      <div className="grid gap-2">
        {[...groups.entries()].map(([groupName, groupControls]) => {
          const isFooterSettings = groupControls.length === 1 && groupControls[0].type === "footerConfig";
          return isFooterSettings ? (
            <section className="grid grid-cols-1 gap-2 min-[541px]:grid-cols-2 min-[901px]:grid-cols-3" key={groupName} aria-label={groupName}>
              <div className="col-span-full grid grid-cols-1 items-start gap-3 min-[541px]:grid-cols-2 min-[901px]:grid-cols-3">{renderControls(groupControls)}</div>
            </section>
          ) : (
            <details className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" key={groupName} open={groupControls[0]?.groupOpen ?? true}>
              <summary className="flex min-h-[42px] cursor-pointer list-inside items-center justify-between gap-3 px-3 py-2.5 text-xs text-slate-700 dark:text-slate-200 open:border-b open:border-slate-200 open:bg-slate-50 dark:open:border-slate-700 dark:open:bg-slate-900"><strong>{groupName}</strong><span className="text-[10px] text-slate-500 dark:text-slate-400">{groupControls.length} options</span></summary>
              <div className="grid grid-cols-1 gap-3 p-3.5 min-[541px]:grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))]">{renderControls(groupControls)}</div>
            </details>
          );
        })}
      </div>
      {fileError && <div className="mt-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300" role="alert">{fileError}</div>}
    </div>
  );
}
