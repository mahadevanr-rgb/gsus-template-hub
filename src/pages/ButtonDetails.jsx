import { useState } from "react";
import { getComponent } from "../registry/index";
import { copyToClipboard } from "../lib/installContract";
import AddToProjectModal from "../components/organisms/AddToProjectModal";
import "../components/organisms/AddToProjectModal.css";
import "./ButtonDetails.css";

function CopyAction({ text, label = "Copy Code", icon = "📋" }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="action-button-item copy-btn" onClick={handle}>
      <span className="action-icon">{copied ? "✓" : icon}</span>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}



export default function ButtonDetails({ selectedButton, onBack, onNavigateHome }) {
  // படத்தின் படி தாவல்கள்: Description, Props, Usage, Dependencies
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);
  const component = getComponent(selectedButton);

  if (!component) {
    return (
      <div className="button-details-empty">
        <p>Component not found in registry.</p>
        <button onClick={onBack}>Back to Collection</button>
      </div>
    );
  }

  // slug logic already correct from registry
  const Component = component.component;

  // Fake date and author for display as in image_0.png
  const displayDate = "May 12, 2025";
  const authorName = "UI Team";

  // Pre-configured variant labels for the visual grid
  const variantLabels = ["Primary", "Secondary", "Outline", "Ghost", "Danger"];

  // A helper function to render a single preview example
  const renderPreviewExample = (label) => {
    if (component.isFloating && label === "Primary")
      return <Component icon="+" label="Add" onClick={() => {}} />;
    if (component.isIcon && label === "Primary")
      return (
        <Component
          icon="🎨"
          label="Action"
          variant="primary"
          onClick={() => {}}
        />
      );

    const lowerLabel = label.toLowerCase();
    // Assuming component accepts 'variant' and 'children' props.
    // Adjust if registry provides other common props.
    return <Component variant={lowerLabel}>{label}</Component>;
  };

  return (
    <div className="button-details-wrapper">
      {/* 1. BREADCRUMBS & MAIN BUTTON */}
      <div className="top-navigation-row">
        <div className="breadcrumbs">
          <span
            style={{ cursor: "pointer" }}
            onClick={onNavigateHome}
          >
            Home
          </span>
          {" > "}
          <span
            style={{ cursor: "pointer" }}
            onClick={onNavigateHome}
          >
            Components
          </span>
          {" > "}
          <span
            style={{ cursor: "pointer" }}
            onClick={onBack}
          >
            Buttons
          </span>
          {" > "}
          <span className="active">{component.name}</span>
        </div>
        <button
          className="top-add-project-btn"
          onClick={() => setShowModal(true)}
        >
          ⚡ Add to Project
        </button>
      </div>

      <div className="main-content-layout">
        {/* ========================================================
            LEFT COLUMN (Main Content)
           ======================================================== */}
        <div className="left-content-column">
          {/* HEADER SECTION */}
          <div className="component-header">
            <div className="title-row">
              <h1 className="component-title">{component.name}</h1>
              <span className="type-badge">Button</span>
              <span className="version-badge">v{component.version}</span>
            </div>
            <p className="component-description-large">
              {component.description}
            </p>
          </div>

          {/* VISUAL PREVIEW AREA (The 5 examples grid) */}
          <section className="preview-showcase-section">
            <div className="preview-label-row">
              {variantLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="preview-visual-grid">
              {variantLabels.map((label) => (
                <div key={label} className="preview-visual-item">
                  {renderPreviewExample(label)}
                </div>
              ))}
            </div>
          </section>

          {/* CODE PREVIEW BOX */}
          <section className="code-preview-box-section">
            <div className="code-preview-header">
              <span className="code-header-title">Code Preview</span>
              <div className="code-header-controls">
                <span>Import</span>
                <span className="es6-badge">ES6</span>
              </div>
            </div>
            <div className="code-preview-body">
              {/* Note: This assumes component.sourceCode contains the whole App() structure as in image_0.png */}
              <pre className="code-code-block">
                <code>{component.sourceCode}</code>
              </pre>
              <CopyAction text={component.sourceCode} label="Copy" icon="📄" />
            </div>
          </section>

          {/* TABS & TAB CONTENT (Bottom area) */}
          <section className="info-tabs-section">
            <div className="info-tabs-list">
              {["Description", "Props", "Usage", "Dependencies"].map((tab) => (
                <button
                  key={tab}
                  className={`info-tab-btn ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="info-tab-content">
              {activeTab === "description" && (
                <div className="tab-description-panel">
                  <p>
                    The {component.name} component is used to trigger primary
                    actions.
                  </p>
                  <p>
                    It supports multiple variants, sizes, and loading states.
                  </p>
                  <h3>Features</h3>
                  <ul className="features-list">
                    {component.tags?.map((tag) => (
                      <li key={tag} className="feature-item">
                        <span className="check-icon">✓</span> {tag}
                      </li>
                    ))}
                    {component.uses?.map((use) => (
                      <li key={use} className="feature-item">
                        <span className="check-icon">✓</span> Best Used For:{" "}
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Placeholders for other tabs as needed */}
              {activeTab === "props" && (
                <div className="tab-props-panel">
                  Props documentation coming soon...
                </div>
              )}
              {activeTab === "usage" && (
                <div className="tab-usage-panel">
                  Usage examples coming soon...
                </div>
              )}
              {activeTab === "dependencies" && (
                <div className="tab-dependencies-panel">
                  <h3>Dependencies</h3>
                  {component.dependencies.length > 0 ? (
                    <ul className="dependencies-list">
                      {component.dependencies.map((dep) => (
                        <li key={dep}>{dep}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No external dependencies.</p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ========================================================
            RIGHT COLUMN (Sidebar)
           ======================================================== */}
        <div className="right-sidebar-column">
          {/* COMPONENT INFORMATION */}
          <section className="sidebar-info-box">
            <h3>Component Information</h3>
            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">Category</span>
                <span className="info-value">Buttons</span>
              </div>
              <div className="info-row">
                <span className="info-label">Dependencies</span>
                <span className="info-value">{component.dependencies[0]}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Size</span>
                <span className="info-value">
                  {component.size || "Unknown"}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Updated</span>
                <span className="info-value">
                  {component.lastUpdated || displayDate}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Author</span>
                <span className="info-value">{authorName}</span>
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <section className="sidebar-actions-box">
            <h3>Actions</h3>
            <div className="actions-list">
              <button className="action-button-item add-proj-btn" onClick={() => setShowModal(true)}>
                <span className="action-icon">⚡</span> Add to Project
              </button>
              <CopyAction
                text={component.sourceCode}
                label="Copy Code"
                icon="📋"
              />
              <button
                className="action-button-item github-btn"
                onClick={() => window.open("https://github.com/mahadevanr-rgb/gsus-template-hub", "_blank")}
              >
                <span className="action-icon">🔗</span> View on GitHub
              </button>
            </div>
          </section>
        </div>
      </div>
      {showModal && (
        <AddToProjectModal
          component={component}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
