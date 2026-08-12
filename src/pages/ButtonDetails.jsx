import { useState } from "react";
import { getComponent } from "../registry/index";
import { getInstallCommand, copyToClipboard } from "../lib/installContract";
import {
  FloatingButton,
  IconButton,
} from "../components/atoms/buttons/index";
import "./ButtonDetails.css";

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

export default function ButtonDetails({ selectedButton, onBack }) {
  const [activeTab, setActiveTab] = useState("preview");

  const component = getComponent(selectedButton);

  if (!component) {
    return (
      <div className="button-details-empty">
        <p>Component not found in registry.</p>
      </div>
    );
  }

  const installCommand = getInstallCommand(component.slug);
  // slug is already correct from registry
  const Component = component.component;

  const renderPreview = () => {
    if (component.isFloating)
      return <FloatingButton icon="+" label="Add" onClick={() => {}} />;
    if (component.isIcon)
      return (
        <IconButton icon="🎨" label="Action" variant="primary" onClick={() => {}} />
      );
    return <Component {...component.previewProps} onClick={() => {}} />;
  };

  const variantLabel = (v) =>
    v.size ?? v.effect ?? v.style ?? v.variant ?? v.elevation ?? v.state ?? "";
  const variantSub = (v) =>
    v.className ?? v.description ?? v.shadow ?? v.diameter ?? "";

  return (
    <div className="button-details-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Collection
      </button>

      {/* HEADER */}
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

      {/* PREVIEW TAB */}
      {activeTab === "preview" && (
        <>
          <section className="details-section preview-section">
            <h2>Live Preview</h2>
            <div className="preview-area">
              <div className="preview-item">{renderPreview()}</div>
            </div>
          </section>

          <section className="details-section variants-section">
            <h2>Variants &amp; Sizes</h2>
            <div className="variants-grid">
              {component.variants?.map((variant, idx) => (
                <div key={idx} className="variant-item">
                  <div className="variant-preview">{renderPreview()}</div>
                  <div className="variant-info">
                    <h4>{variantLabel(variant)}</h4>
                    <p>{variantSub(variant)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="details-section use-cases-section">
            <h2>Best Used For</h2>
            <div className="use-cases-list">
              {component.uses?.map((use, idx) => (
                <div key={idx} className="use-case-item">
                  <span className="use-case-icon">✓</span>
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TAGS */}
          <section className="details-section">
            <h2>Tags</h2>
            <div className="tags-list">
              {component.tags?.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CODE TAB */}
      {activeTab === "code" && (
        <section className="details-section code-section">
          <div className="code-header">
            <h2>Source Code</h2>
            <CopyButton text={component.sourceCode} label="Copy Code" />
          </div>
          <pre className="code-block">
            <code>{component.sourceCode}</code>
          </pre>
        </section>
      )}

      {/* INSTALLATION */}
      <section className="details-section install-section">
        <h2>Installation</h2>

        <div className="install-command-row">
          <code className="install-command">{installCommand}</code>
          <CopyButton text={installCommand} label="Copy Command" />
        </div>

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
          {component.dependencies.length > 0 && (
            <div className="install-info-item">
              <span className="install-info-label">Dependencies</span>
              <span className="install-info-value">
                {component.dependencies.join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* APPLY TO PROJECT — placeholder for future CLI/VS Code integration */}
        <button
          className="apply-button"
          onClick={() =>
            alert(
              "VS Code / CLI integration coming soon!\n\nRun this in your project:\n" +
                installCommand
            )
          }
        >
          ⚡ Apply to Project
        </button>
        <p className="apply-hint">
          CLI and VS Code extension integration coming soon.
        </p>
      </section>
    </div>
  );
}
