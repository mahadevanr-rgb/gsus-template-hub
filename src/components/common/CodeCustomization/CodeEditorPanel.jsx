export default function CodeEditorPanel({ file, value, readOnly, onChange }) {
  return <div className="custom-code-wrap"><div className="custom-file-name">{file?.path || "Source"} {readOnly && <span>Read only</span>}</div><textarea aria-label="Component source code" spellCheck="false" readOnly={readOnly} value={value || ""} onChange={(event) => onChange(event.target.value)} /></div>;
}
