import { useState } from "react";
import { getComponent } from "../../registry/index";
import { getInstallCommand, copyToClipboard } from "../../lib/installContract";

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="copy-button" onClick={handle}>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}

/**
 * Wraps any existing details page with:
 * - Registry metadata header (framework / styling / version badges)
 * - Preview / Code tabs
 * - Install section (Copy Install Command + Apply to Project)
 *
 * Props:
 *   slug        — registry slug e.g. "text-input"
 *   sourceCode  — source code string to show in Code tab
 *   onBack      — back button handler
 *   children    — the existing preview/variants/use-cases sections (shown in Preview tab)
 */
export default function ComponentDetailsShell({ slug, sourceCode, onBack, children }) {
  const [activeTab, setActiveTab] = useState("preview");
  const [applyStatus, setApplyStatus] = useState("idle");

  const component = getComponent(slug);
  const installCommand = component ? getInstallCommand(slug) : `npx templatehub add ${slug}`;

  const handleApply = () => {
    setApplyStatus("picking");
  };

  const handleFolderPick = async () => {
    try {
      // File System Access API — lets user pick a local folder
      const dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
      setApplyStatus("writing");

      // Write the component file into components/ui/ inside chosen folder
      const uiDir = await getOrCreateDir(dirHandle, "components/ui");
      const fileName = slug
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join("") + ".jsx";

      const fileHandle = await uiDir.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(sourceCode);
      await writable.close();

      setApplyStatus("done");
      setTimeout(() => setApplyStatus("idle"), 4000);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
        setApplyStatus("error");
        setTimeout(() => setApplyStatus("idle"), 3000);
      } else {
        setApplyStatus("idle");
      }
    }
  };

  return (
    <div className="button-details-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Collection
      </button>

      {/* HEADER */}
      {component && (
        <div className="details-header">
          <div>
            <h1>{component.name}</h1>
            <p className="details-description">{component.description}</p>
          </div>
          <div className="details-meta-badges">
            <span className="meta-badge">⚛ {component.framework}</span>
            <span className="meta-badge">🎨 {component.styling}</span>
            <span className="meta-badge">v{component.version}</span>
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="details-tabs">
        <button
          className={`tab-btn ${activeTab === "preview" ? "active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
      </div>

      {/* PREVIEW TAB — existing children */}
      {activeTab === "preview" && children}

      {/* CODE TAB */}
      {activeTab === "code" && (
        <section className="details-section code-section">
          <div className="code-header">
            <h2>Source Code</h2>
            <CopyButton text={sourceCode} label="Copy Code" />
          </div>
          <pre className="code-block">
            <code>{sourceCode}</code>
          </pre>
        </section>
      )}

      {/* INSTALL SECTION */}
      <section className="details-section install-section">
        <h2>Installation</h2>

        <div className="install-command-row">
          <code className="install-command">{installCommand}</code>
          <CopyButton text={installCommand} label="Copy Command" />
        </div>

        {component && (
          <div className="install-info">
            <div className="install-info-item">
              <span className="install-info-label">Framework</span>
              <span className="install-info-value">{component.framework}</span>
            </div>
            <div className="install-info-item">
              <span className="install-info-label">Language</span>
              <span className="install-info-value">{component.language}</span>
            </div>
            <div className="install-info-item">
              <span className="install-info-label">Styling</span>
              <span className="install-info-value">{component.styling}</span>
            </div>
            <div className="install-info-item">
              <span className="install-info-label">Version</span>
              <span className="install-info-value">v{component.version}</span>
            </div>
          </div>
        )}

        {/* APPLY TO PROJECT */}
        {applyStatus === "idle" && (
          <button className="apply-button" onClick={handleApply}>
            ⚡ Apply to Project
          </button>
        )}

        {applyStatus === "picking" && (
          <div className="apply-picker">
            <p className="apply-picker-label">
              📁 Choose your project folder — the component will be added to{" "}
              <code>components/ui/</code>
            </p>
            <div className="apply-picker-actions">
              <button className="apply-button" onClick={handleFolderPick}>
                Browse Folder
              </button>
              <button
                className="apply-cancel"
                onClick={() => setApplyStatus("idle")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {applyStatus === "writing" && (
          <div className="apply-status apply-status--writing">
            ⏳ Writing component file...
          </div>
        )}

        {applyStatus === "done" && (
          <div className="apply-status apply-status--done">
            ✅ Component added to your project successfully!
          </div>
        )}

        {applyStatus === "error" && (
          <div className="apply-status apply-status--error">
            ❌ Failed to write file. Make sure you selected a valid project folder.
          </div>
        )}

        <p className="apply-hint">
          Writes directly into <code>components/ui/</code> in your chosen project folder.
        </p>
      </section>
    </div>
  );
}

/** Helper — get or create nested directory from a root FileSystemDirectoryHandle */
async function getOrCreateDir(root, path) {
  const parts = path.split("/");
  let current = root;
  for (const part of parts) {
    current = await current.getDirectoryHandle(part, { create: true });
  }
  return current;
}
