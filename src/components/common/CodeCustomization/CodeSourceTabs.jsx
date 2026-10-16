export default function CodeSourceTabs({ files, originals, activePath, tab, onTab, onFile }) {
  return <><div className="custom-tabs"><button className={tab === "custom" ? "active" : ""} onClick={() => onTab("custom")}>Customize Code</button><button className={tab === "original" ? "active" : ""} onClick={() => onTab("original")}>Original Code</button></div><div className="custom-file-tabs">{(tab === "original" ? originals : files).map((file) => <button key={file.path} className={activePath === file.path ? "active" : ""} onClick={() => onFile(file.path)}>{file.path}</button>)}</div></>;
}
