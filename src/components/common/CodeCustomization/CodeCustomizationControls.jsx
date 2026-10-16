import { useState } from "react";
import FooterConfigurationEditor from "./FooterConfigurationEditor";

export default function CodeCustomizationControls({
  controls = [],
  title = "Customize",
  previewProps,
  onPropChange,
}) {
  const [fileError, setFileError] = useState("");
  const groups = controls.reduce((result, control) => {
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
      <div key={control.name} className="custom-control">
        {control.type !== "footerConfig" && <label htmlFor={id}>{control.label}</label>}
        {control.type === "footerConfig" ? (
          <FooterConfigurationEditor value={previewProps[control.name] || control.defaultValue} onChange={(next) => {
            onPropChange(control.name, next);
            if (next.accentColor) onPropChange("accentColor", next.accentColor);
          }} />
        ) : control.type === "checkbox" ? (
          <input id={id} type="checkbox" checked={Boolean(previewProps[control.name])} onChange={(event) => onPropChange(control.name, event.target.checked)} />
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
          <textarea id={id} rows={3} value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value)} />
        ) : control.type === "text" ? (
          <input id={id} type="text" value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value)} />
        ) : control.type === "color" ? (
          <input id={id} type="color" value={previewProps[control.name] ?? control.defaultValue ?? "#6366f1"} onChange={(event) => onPropChange(control.name, event.target.value)} />
        ) : (
          <select id={id} value={previewProps[control.name] ?? control.defaultValue ?? ""} onChange={(event) => onPropChange(control.name, event.target.value)}>
            {(control.options || []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        )}
        {control.help && <small>{control.help}</small>}
        {control.type === "file" && previewProps[control.name] && (
          <span className="custom-logo-selected">
            <img src={previewProps[control.name]} alt="Uploaded company logo preview" onError={() => setFileError("The uploaded PNG could not be displayed.")} />
            <span>PNG logo selected</span>
            <button type="button" onClick={() => { onPropChange(control.name, ""); setFileError(""); }}>Remove</button>
          </span>
        )}
      </div>
    );
  });

  return (
    <div className="custom-preview-controls">
      <div className="custom-control-title"><strong>{title}</strong><span>Changes update the preview</span></div>
      <div className="custom-control-groups">
        {[...groups.entries()].map(([groupName, groupControls]) => {
          const isFooterSettings = groupControls.length === 1 && groupControls[0].type === "footerConfig";
          return isFooterSettings ? (
            <section className="custom-control-group custom-control-group-flat" key={groupName} aria-label={groupName}>
              <div className="custom-control-grid">{renderControls(groupControls)}</div>
            </section>
          ) : (
            <details className="custom-control-group" key={groupName} open={groupControls[0]?.groupOpen ?? true}>
              <summary><strong>{groupName}</strong><span>{groupControls.length} options</span></summary>
              <div className="custom-control-grid">{renderControls(groupControls)}</div>
            </details>
          );
        })}
      </div>
      {fileError && <div className="custom-error" role="alert">{fileError}</div>}
    </div>
  );
}
