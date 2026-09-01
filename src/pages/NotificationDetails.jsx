import { useState } from "react";
import { Toast }                from "../components/atoms/notifications/Toast";
import { Alert }                from "../components/atoms/notifications/Alert";
import { Banner }               from "../components/atoms/notifications/Banner";
import { Snackbar }             from "../components/atoms/notifications/Snackbar";
import { NotificationCard }     from "../components/atoms/notifications/NotificationCard";
import { NotificationBadge }    from "../components/atoms/notifications/NotificationBadge";
import { StatusDot }            from "../components/atoms/notifications/StatusDot";
import { ProgressNotification } from "../components/atoms/notifications/ProgressNotification";
import { ConfirmDialog }        from "../components/atoms/notifications/ConfirmDialog";
import { InlineMessage }        from "../components/atoms/notifications/InlineMessage";
import AddToProjectModal        from "../components/organisms/AddToProjectModal";
import "../components/organisms/AddToProjectModal.css";
import "./FormDetails.css";

const details = {
  toast: {
    name: "Toast", tag: "Feedback", version: "1.0.0",
    description: "Lightweight pop-up messages for success, error, warning and info feedback.",
    uses: ["Form submission", "API responses", "Copy to clipboard", "Delete confirmation"],
    tags: ["toast", "notification", "popup", "feedback"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Toast } from "@/components/atoms/notifications";\n\n<Toast type="success" message="Saved successfully!" onClose={() => {}} />\n<Toast type="error"   message="Something went wrong." />\n<Toast type="warning" message="Low disk space." />\n<Toast type="info"    message="Update available." />`,
  },
  alert: {
    name: "Alert", tag: "Feedback", version: "1.0.0",
    description: "Inline alert banners with icon, title, message and optional dismiss button.",
    uses: ["Form validation", "Page-level warnings", "Feature announcements", "Error pages"],
    tags: ["alert", "banner", "inline", "feedback"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Alert } from "@/components/atoms/notifications";\n\n<Alert type="success" title="Done!"  message="Your changes were saved." onClose={() => {}} />\n<Alert type="error"   title="Error"  message="Failed to load data." />\n<Alert type="warning" title="Warning" message="Low storage." />\n<Alert type="info"    title="Info"   message="Maintenance on Sunday." />`,
  },
  banner: {
    name: "Banner", tag: "Feedback", version: "1.0.0",
    description: "Full-width announcement banners with action button and dismiss.",
    uses: ["Cookie consent", "Maintenance notice", "Promotions", "System alerts"],
    tags: ["banner", "announcement", "full-width", "feedback"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Banner } from "@/components/atoms/notifications";\n\n<Banner type="info"    message="New version available!" action="Update" onAction={() => {}} />\n<Banner type="warning" message="Maintenance tonight."   action="Learn more" />\n<Banner type="dark"    message="We use cookies."        action="Accept" />`,
  },
  snackbar: {
    name: "Snackbar", tag: "Feedback", version: "1.0.0",
    description: "Dark bottom notification with optional undo/action button.",
    uses: ["Undo actions", "Quick feedback", "File saved", "Item deleted"],
    tags: ["snackbar", "toast", "bottom", "action"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Snackbar } from "@/components/atoms/notifications";\n\n<Snackbar message="Item deleted." action="Undo" onAction={() => {}} onClose={() => {}} />`,
  },
  notificationCard: {
    name: "Notification Card", tag: "Card", version: "1.0.0",
    description: "Rich notification item with avatar, title, message, timestamp and unread state.",
    uses: ["Notification center", "Activity feed", "Inbox", "Alerts panel"],
    tags: ["card", "notification", "avatar", "unread"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { NotificationCard } from "@/components/atoms/notifications";\n\n<NotificationCard\n  avatar="👤" title="New comment" unread\n  message="Alex replied to your post."\n  time="2 min ago" onDismiss={() => {}}\n/>`,
  },
  notificationBadge: {
    name: "Notification Badge", tag: "Badge", version: "1.0.0",
    description: "Count or dot badge overlaid on any element like icons or avatars.",
    uses: ["Nav icons", "Cart count", "Message count", "Alert indicators"],
    tags: ["badge", "count", "dot", "overlay"],
    dependencies: ["None"], size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { NotificationBadge } from "@/components/atoms/notifications";\n\n<NotificationBadge count={5}>\n  <span style={{ fontSize: "28px" }}>🔔</span>\n</NotificationBadge>\n\n<NotificationBadge dot>\n  <span style={{ fontSize: "28px" }}>✉️</span>\n</NotificationBadge>`,
  },
  statusDot: {
    name: "Status Dot", tag: "Status", version: "1.0.0",
    description: "Presence indicator showing online, offline, busy, away or pending states.",
    uses: ["User presence", "Service status", "Live indicators", "Chat apps"],
    tags: ["status", "dot", "presence", "indicator"],
    dependencies: ["None"], size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { StatusDot } from "@/components/atoms/notifications";\n\n<StatusDot status="online"  label="Online"  pulse />\n<StatusDot status="busy"    label="Busy"         />\n<StatusDot status="offline" label="Offline"      />`,
  },
  progressNotification: {
    name: "Progress Notification", tag: "Progress", version: "1.0.0",
    description: "Upload or task progress displayed inside a notification card.",
    uses: ["File upload", "Export progress", "Background tasks", "Sync status"],
    tags: ["progress", "notification", "upload", "task"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { ProgressNotification } from "@/components/atoms/notifications";\n\n<ProgressNotification\n  title="Uploading file..."\n  message="design-assets.zip"\n  progress={72}\n  onClose={() => {}}\n/>`,
  },
  confirmDialog: {
    name: "Confirm Dialog", tag: "Dialog", version: "1.0.0",
    description: "Danger / warning confirmation modal with cancel and confirm actions.",
    uses: ["Delete confirmation", "Destructive actions", "Logout", "Reset data"],
    tags: ["dialog", "confirm", "modal", "danger"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { ConfirmDialog } from "@/components/atoms/notifications";\n\n<ConfirmDialog\n  type="danger"\n  title="Delete Project?"\n  message="This action cannot be undone."\n  confirmLabel="Delete" cancelLabel="Cancel"\n  onConfirm={() => {}} onCancel={() => {}}\n/>`,
  },
  inlineMessage: {
    name: "Inline Message", tag: "Inline", version: "1.0.0",
    description: "Compact inline status message with icon for form fields or inline feedback.",
    uses: ["Field validation", "Inline hints", "Status labels", "Compact feedback"],
    tags: ["inline", "message", "status", "compact"],
    dependencies: ["None"], size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { InlineMessage } from "@/components/atoms/notifications";\n\n<InlineMessage type="success" message="Email verified!" />\n<InlineMessage type="error"   message="Invalid format." />\n<InlineMessage type="warning" message="Password too weak." />\n<InlineMessage type="info"    message="Check your inbox." />`,
  },
};

const renderPreview = (selected) => {
  switch (selected) {
    case "toast": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "380px" }}>
        <Toast type="success" message="Changes saved successfully!" />
        <Toast type="error"   message="Failed to connect to server." />
        <Toast type="warning" message="Your session expires soon." />
        <Toast type="info"    message="New update is available." />
      </div>
    );
    case "alert": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <Alert type="success" title="Success!" message="Your profile has been updated." />
        <Alert type="error"   title="Error"    message="Unable to process your request." />
        <Alert type="warning" title="Warning"  message="You are running low on storage." />
        <Alert type="info"    title="Info"     message="Scheduled maintenance on Sunday." />
      </div>
    );
    case "banner": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <Banner type="info"    message="🚀 New features available!"              action="See what's new" />
        <Banner type="warning" message="⚠️ Maintenance scheduled for tonight."   action="Learn more" />
        <Banner type="success" message="✅ All systems operational." />
        <Banner type="dark"    message="🍪 We use cookies to improve experience." action="Accept" />
      </div>
    );
    case "snackbar": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
        <Snackbar message="Item moved to trash."        action="Undo" />
        <Snackbar message="Link copied to clipboard." />
        <Snackbar message="File saved successfully."    action="View" />
      </div>
    );
    case "notificationCard": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <NotificationCard avatar="👤" title="New comment"  message="Alex replied to your post: 'Great work!'" time="2 min ago"  unread />
        <NotificationCard avatar="🔔" title="Reminder"     message="Your meeting starts in 15 minutes."       time="10 min ago" />
        <NotificationCard avatar="✅" title="Task done"    message="Build pipeline completed successfully."    time="1 hr ago" />
      </div>
    );
    case "notificationBadge": return (
      <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
        <NotificationBadge count={3}>   <span style={{ fontSize: "32px" }}>🔔</span></NotificationBadge>
        <NotificationBadge count={12}>  <span style={{ fontSize: "32px" }}>✉️</span></NotificationBadge>
        <NotificationBadge count={150} max={99}><span style={{ fontSize: "32px" }}>🛒</span></NotificationBadge>
        <NotificationBadge dot color="#22c55e"><span style={{ fontSize: "32px" }}>👤</span></NotificationBadge>
      </div>
    );
    case "statusDot": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <StatusDot status="online"  label="Online"  pulse />
        <StatusDot status="busy"    label="Busy" />
        <StatusDot status="away"    label="Away" />
        <StatusDot status="offline" label="Offline" />
        <StatusDot status="pending" label="Pending" pulse />
      </div>
    );
    case "progressNotification": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <ProgressNotification title="Uploading design-assets.zip" message="23 MB of 32 MB" progress={72} />
        <ProgressNotification title="Exporting report..."         message="Almost done"    progress={95} />
      </div>
    );
    case "confirmDialog": return (
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <ConfirmDialog type="danger"  title="Delete Project?"  message="This cannot be undone."        confirmLabel="Delete" cancelLabel="Cancel" />
        <ConfirmDialog type="warning" title="Reset Settings?"  message="All preferences will be lost." confirmLabel="Reset"  cancelLabel="Cancel" />
      </div>
    );
    case "inlineMessage": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InlineMessage type="success" message="Email verified successfully!" />
        <InlineMessage type="error"   message="This field is required." />
        <InlineMessage type="warning" message="Password is too weak." />
        <InlineMessage type="info"    message="Check your inbox for a link." />
      </div>
    );
    default: return null;
  }
};

function CopyAction({ text, label = "Copy Code", icon = "📋" }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="fd-action-btn fd-copy-btn" onClick={handle}>
      <span className="fd-action-icon">{copied ? "✓" : icon}</span>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}

export default function NotificationDetails({ selected, onBack, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);

  const d = details[selected];

  if (!d) return (
    <div className="fd-empty">
      <p>Component not found.</p>
      <button onClick={onBack}>Back to Collection</button>
    </div>
  );

  const mockComponent = {
    name: d.name,
    slug: selected.replace(/([A-Z])/g, "-$1").toLowerCase(),
    sourceCode: d.code,
    dependencies: d.dependencies[0] === "None" ? [] : d.dependencies,
    version: d.version,
  };

  return (
    <div className="fd-wrapper">
      {/* TOP NAV */}
      <div className="fd-top-nav">
        <div className="fd-breadcrumbs">
          <span onClick={onNavigateHome}>Home</span>
          {" > "}
          <span onClick={onNavigateHome}>Components</span>
          {" > "}
          <span onClick={onBack}>Notifications</span>
          {" > "}
          <span className="fd-bc-active">{d.name}</span>
        </div>
        <button className="fd-top-add-btn" onClick={() => setShowModal(true)}>
          ⚡ Add to Project
        </button>
      </div>

      <div className="fd-main-layout">
        {/* LEFT COLUMN */}
        <div className="fd-left-col">
          <div className="fd-component-header">
            <div className="fd-title-row">
              <h1 className="fd-title">{d.name}</h1>
              <span className="fd-type-badge">{d.tag}</span>
              <span className="fd-version-badge">v{d.version}</span>
            </div>
            <p className="fd-description">{d.description}</p>
          </div>

          <section className="fd-preview-section">
            <div className="fd-preview-label-row"><span>Live Preview</span></div>
            <div className="fd-preview-area">
              <div className="fd-preview-item" style={{ width: "100%", maxWidth: "100%" }}>
                {renderPreview(selected)}
              </div>
            </div>
          </section>

          <section className="fd-code-section">
            <div className="fd-code-header">
              <span className="fd-code-title">Code Preview</span>
              <div className="fd-code-controls">
                <span>Import</span>
                <span className="fd-es6-badge">ES6</span>
              </div>
            </div>
            <div className="fd-code-body">
              <pre className="fd-code-block"><code>{d.code}</code></pre>
              <CopyAction text={d.code} label="Copy" icon="📄" />
            </div>
          </section>

          <section className="fd-tabs-section">
            <div className="fd-tabs-list">
              {["Description", "Props", "Usage", "Dependencies"].map((tab) => (
                <button
                  key={tab}
                  className={`fd-tab-btn ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="fd-tab-content">
              {activeTab === "description" && (
                <div>
                  <p>{d.description}</p>
                  <h3>Features</h3>
                  <ul className="fd-features-list">
                    {d.tags?.map((tag) => (
                      <li key={tag} className="fd-feature-item">
                        <span className="fd-check-icon">✓</span> {tag}
                      </li>
                    ))}
                    {d.uses?.map((use) => (
                      <li key={use} className="fd-feature-item">
                        <span className="fd-check-icon">✓</span> Best Used For: {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "props"        && <div>Props documentation coming soon...</div>}
              {activeTab === "usage"        && <div>Usage examples coming soon...</div>}
              {activeTab === "dependencies" && (
                <div>
                  <h3>Dependencies</h3>
                  <ul className="fd-dep-list">
                    {d.dependencies.map((dep) => <li key={dep}>{dep}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="fd-right-sidebar">
          <section className="fd-sidebar-box">
            <h3>Component Information</h3>
            <div className="fd-info-grid">
              <div className="fd-info-row"><span className="fd-info-label">Category</span><span className="fd-info-value">Notifications</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Type</span><span className="fd-info-value">{d.tag}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Size</span><span className="fd-info-value">{d.size}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Last Updated</span><span className="fd-info-value">{d.lastUpdated}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Author</span><span className="fd-info-value">UI Team</span></div>
            </div>
          </section>

          <section className="fd-sidebar-box">
            <h3>Actions</h3>
            <div className="fd-actions-list">
              <button className="fd-action-btn fd-add-btn" onClick={() => setShowModal(true)}>
                <span className="fd-action-icon">⚡</span> Add to Project
              </button>
              <CopyAction text={d.code} label="Copy Code" icon="📋" />
              <button
                className="fd-action-btn fd-github-btn"
                onClick={() => window.open("https://github.com/mahadevanr-rgb/gsus-template-hub", "_blank")}
              >
                <span className="fd-action-icon">🔗</span> View on GitHub
              </button>
            </div>
          </section>
        </div>
      </div>

      {showModal && (
        <AddToProjectModal component={mockComponent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
