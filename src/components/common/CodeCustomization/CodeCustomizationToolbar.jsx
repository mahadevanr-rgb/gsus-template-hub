export default function CodeCustomizationToolbar({ component, changed, busy, busyAction, result, onBack, onReset, onUpdate, onApply }) {
  const updateLabel = busy
    ? "Updating..."
    : result?.type === "success"
      ? "Preview Updated"
      : result?.type === "error"
        ? "Retry Preview"
        : "Update Preview";

  return (
    <header className="custom-toolbar">
      <div>
        <button type="button" onClick={onBack}>Back to Details</button>
        <p>Customize Code / {component.name}</p>
        <h1>{component.name}</h1>
        <span>{component.category || "Component"} - {changed ? "Unsaved changes" : "Original settings"}</span>
        {result?.type !== "progress" && result?.text && (
          <span className={`custom-toolbar-result ${result.type}`} role={result.type === "error" ? "alert" : "status"}>
            {result.text}
          </span>
        )}
      </div>
      <div className="custom-actions">
        <button type="button" onClick={onReset} disabled={busy}>{busy && busyAction === "reset" ? "Resetting..." : "Reset"}</button>
        <button type="button" onClick={onUpdate} disabled={busy}>{updateLabel}</button>
        <button type="button" className="primary" onClick={onApply} disabled={busy}>Apply Changes</button>
      </div>
    </header>
  );
}
