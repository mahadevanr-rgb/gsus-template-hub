export default function CodeCustomizationToolbar({ component, changed, busy, busyAction, result, onBack, onReset, onUpdate, onApply }) {
  const updateLabel = busy
    ? "Updating..."
    : result?.type === "success"
      ? "Preview Updated"
      : result?.type === "error"
        ? "Retry Preview"
        : "Update Preview";

  return (
    <header className="flex flex-col min-[901px]:flex-row min-[901px]:items-end justify-between gap-6 pb-5 border-b border-slate-200 dark:border-slate-700">
      <div>
        <button type="button" onClick={onBack} className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Back to Details</button>
        <p className="mt-3 mb-1 text-xs text-slate-500 dark:text-slate-400">Customize Code / {component.name}</p>
        <h1 className="m-0 text-2xl font-semibold text-slate-900 dark:text-slate-50">{component.name}</h1>
        <span className="text-xs text-slate-500 dark:text-slate-400">{component.category || "Component"} - {changed ? "Unsaved changes" : "Original settings"}</span>
        {result?.type !== "progress" && result?.text && (
          <span className={`mt-2 block font-semibold text-xs ${result.type === "success" ? "text-green-700 dark:text-green-300" : result.type === "error" ? "text-rose-700 dark:text-rose-300" : "text-indigo-700 dark:text-indigo-300"}`} role={result.type === "error" ? "alert" : "status"}>
            {result.text}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 max-[540px]:w-full">
        <button type="button" onClick={onReset} disabled={busy} className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 max-[540px]:flex-1">{busy && busyAction === "reset" ? "Resetting..." : "Reset"}</button>
        <button type="button" onClick={onUpdate} disabled={busy} className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 max-[540px]:flex-1">{updateLabel}</button>
        <button type="button" onClick={onApply} disabled={busy} className="rounded-lg border border-indigo-600 bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 max-[540px]:flex-1">Apply Changes</button>
      </div>
    </header>
  );
}
