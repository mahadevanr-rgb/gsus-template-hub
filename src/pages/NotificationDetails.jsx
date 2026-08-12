import { useState } from "react";
import { Toast } from "../components/atoms/notifications/Toast";
import { Alert } from "../components/atoms/notifications/Alert";
import { Banner } from "../components/atoms/notifications/Banner";
import { Snackbar } from "../components/atoms/notifications/Snackbar";
import { NotificationCard } from "../components/atoms/notifications/NotificationCard";
import { NotificationBadge } from "../components/atoms/notifications/NotificationBadge";
import { StatusDot } from "../components/atoms/notifications/StatusDot";
import { ProgressNotification } from "../components/atoms/notifications/ProgressNotification";
import { ConfirmDialog } from "../components/atoms/notifications/ConfirmDialog";
import { InlineMessage } from "../components/atoms/notifications/InlineMessage";
import "./FormDetails.css";

const details = {
  toast: {
    name: "Toast",
    description:
      "Lightweight pop-up messages for success, error, warning and info feedback.",
    uses: [
      "Form submission",
      "API responses",
      "Copy to clipboard",
      "Delete confirmation",
    ],
    variants: [
      { label: "Success", description: "Green — positive action" },
      { label: "Error", description: "Red — failure state" },
      { label: "Warning", description: "Amber — caution" },
      { label: "Info", description: "Blue — neutral info" },
    ],
    code: `import { Toast } from "@/components/atoms/notifications";

<Toast type="success" message="Saved successfully!" onClose={() => {}} />
<Toast type="error"   message="Something went wrong." />
<Toast type="warning" message="Low disk space." />
<Toast type="info"    message="Update available." />`,
  },
  alert: {
    name: "Alert",
    description:
      "Inline alert banners with icon, title, message and optional dismiss button.",
    uses: [
      "Form validation",
      "Page-level warnings",
      "Feature announcements",
      "Error pages",
    ],
    variants: [
      { label: "Success", description: "Green background" },
      { label: "Error", description: "Red background" },
      { label: "Warning", description: "Amber background" },
      { label: "Info", description: "Blue background" },
    ],
    code: `import { Alert } from "@/components/atoms/notifications";

<Alert type="success" title="Done!" message="Your changes were saved." onClose={() => {}} />
<Alert type="error"   title="Error" message="Failed to load data." />`,
  },
  banner: {
    name: "Banner",
    description:
      "Full-width announcement banners with action button and dismiss.",
    uses: [
      "Cookie consent",
      "Maintenance notice",
      "Promotions",
      "System alerts",
    ],
    variants: [
      { label: "Info", description: "Blue" },
      { label: "Success", description: "Green" },
      { label: "Warning", description: "Amber" },
      { label: "Dark", description: "Dark" },
    ],
    code: `import { Banner } from "@/components/atoms/notifications";

<Banner type="info" message="New version available!" action="Update" onAction={() => {}} onClose={() => {}} />`,
  },
  snackbar: {
    name: "Snackbar",
    description: "Dark bottom notification with optional undo/action button.",
    uses: ["Undo actions", "Quick feedback", "File saved", "Item deleted"],
    variants: [
      { label: "Simple", description: "Message only" },
      { label: "With Action", description: "Message + CTA" },
      { label: "Dismissible", description: "Message + close btn" },
    ],
    code: `import { Snackbar } from "@/components/atoms/notifications";

<Snackbar message="Item deleted." action="Undo" onAction={() => {}} onClose={() => {}} />`,
  },
  notificationCard: {
    name: "Notification Card",
    description:
      "Rich notification item with avatar, title, message, timestamp and unread state.",
    uses: ["Notification center", "Activity feed", "Inbox", "Alerts panel"],
    variants: [
      { label: "Unread", description: "Blue highlight + dot" },
      { label: "Read", description: "Default white" },
    ],
    code: `import { NotificationCard } from "@/components/atoms/notifications";

<NotificationCard
  avatar="👤" title="New comment" unread
  message="Alex replied to your post."
  time="2 min ago" onDismiss={() => {}}
/>`,
  },
  notificationBadge: {
    name: "Notification Badge",
    description:
      "Count or dot badge overlaid on any element like icons or avatars.",
    uses: ["Nav icons", "Cart count", "Message count", "Alert indicators"],
    variants: [
      { label: "Count", description: "Shows number" },
      { label: "Dot", description: "Simple dot" },
      { label: "Max+", description: "99+ overflow" },
    ],
    code: `import { NotificationBadge } from "@/components/atoms/notifications";

<NotificationBadge count={5}>
  <span style={{ fontSize: "28px" }}>🔔</span>
</NotificationBadge>

<NotificationBadge dot>
  <span style={{ fontSize: "28px" }}>✉️</span>
</NotificationBadge>`,
  },
  statusDot: {
    name: "Status Dot",
    description:
      "Presence indicator showing online, offline, busy, away or pending states.",
    uses: ["User presence", "Service status", "Live indicators", "Chat apps"],
    variants: [
      { label: "Online", description: "Green" },
      { label: "Offline", description: "Gray" },
      { label: "Busy", description: "Red" },
      { label: "Away", description: "Amber" },
    ],
    code: `import { StatusDot } from "@/components/atoms/notifications";

<StatusDot status="online"  label="Online"  pulse />
<StatusDot status="busy"    label="Busy"         />
<StatusDot status="offline" label="Offline"      />`,
  },
  progressNotification: {
    name: "Progress Notification",
    description:
      "Upload or task progress displayed inside a notification card.",
    uses: ["File upload", "Export progress", "Background tasks", "Sync status"],
    variants: [
      { label: "In Progress", description: "60% complete" },
      { label: "Complete", description: "100%" },
    ],
    code: `import { ProgressNotification } from "@/components/atoms/notifications";

<ProgressNotification
  title="Uploading file..."
  message="design-assets.zip"
  progress={72}
  onClose={() => {}}
/>`,
  },
  confirmDialog: {
    name: "Confirm Dialog",
    description:
      "Danger / warning confirmation modal with cancel and confirm actions.",
    uses: [
      "Delete confirmation",
      "Destructive actions",
      "Logout",
      "Reset data",
    ],
    variants: [
      { label: "Danger", description: "Red — destructive" },
      { label: "Warning", description: "Amber — caution" },
      { label: "Info", description: "Blue — neutral" },
    ],
    code: `import { ConfirmDialog } from "@/components/atoms/notifications";

<ConfirmDialog
  type="danger"
  title="Delete Project?"
  message="This action cannot be undone."
  confirmLabel="Delete" cancelLabel="Cancel"
  onConfirm={() => {}} onCancel={() => {}}
/>`,
  },
  inlineMessage: {
    name: "Inline Message",
    description:
      "Compact inline status message with icon for form fields or inline feedback.",
    uses: [
      "Field validation",
      "Inline hints",
      "Status labels",
      "Compact feedback",
    ],
    variants: [
      { label: "Success", description: "Green" },
      { label: "Error", description: "Red" },
      { label: "Warning", description: "Amber" },
      { label: "Info", description: "Blue" },
    ],
    code: `import { InlineMessage } from "@/components/atoms/notifications";

<InlineMessage type="success" message="Email verified!" />
<InlineMessage type="error"   message="Invalid format." />`,
  },
};

const previews = {
  toast: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <Toast type="success" message="Changes saved successfully!" />
      <Toast type="error" message="Failed to connect to server." />
      <Toast type="warning" message="Your session expires soon." />
      <Toast type="info" message="New update is available." />
    </div>
  ),
  alert: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <Alert
        type="success"
        title="Success!"
        message="Your profile has been updated."
      />
      <Alert
        type="error"
        title="Error"
        message="Unable to process your request."
      />
      <Alert
        type="warning"
        title="Warning"
        message="You are running low on storage."
      />
      <Alert
        type="info"
        title="Info"
        message="Scheduled maintenance on Sunday."
      />
    </div>
  ),
  banner: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <Banner
        type="info"
        message="🚀 New features available!"
        action="See what's new"
      />
      <Banner
        type="warning"
        message="⚠️ Maintenance scheduled for tonight."
        action="Learn more"
      />
      <Banner type="success" message="✅ All systems operational." />
      <Banner
        type="dark"
        message="🍪 We use cookies to improve your experience."
        action="Accept"
      />
    </div>
  ),
  snackbar: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <Snackbar message="Item moved to trash." action="Undo" />
      <Snackbar message="Link copied to clipboard." />
      <Snackbar message="File saved successfully." action="View" />
    </div>
  ),
  notificationCard: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <NotificationCard
        avatar="👤"
        title="New comment"
        message="Alex replied to your post: 'Great work!'"
        time="2 min ago"
        unread
      />
      <NotificationCard
        avatar="🔔"
        title="Reminder"
        message="Your meeting starts in 15 minutes."
        time="10 min ago"
      />
      <NotificationCard
        avatar="✅"
        title="Task done"
        message="Build pipeline completed successfully."
        time="1 hr ago"
      />
    </div>
  ),
  notificationBadge: (
    <div
      style={{
        display: "flex",
        gap: "32px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <NotificationBadge count={3}>
        <span style={{ fontSize: "32px" }}>🔔</span>
      </NotificationBadge>
      <NotificationBadge count={12}>
        <span style={{ fontSize: "32px" }}>✉️</span>
      </NotificationBadge>
      <NotificationBadge count={150} max={99}>
        <span style={{ fontSize: "32px" }}>🛒</span>
      </NotificationBadge>
      <NotificationBadge dot color="#22c55e">
        <span style={{ fontSize: "32px" }}>👤</span>
      </NotificationBadge>
    </div>
  ),
  statusDot: (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <StatusDot status="online" label="Online" pulse />
      <StatusDot status="busy" label="Busy" />
      <StatusDot status="away" label="Away" />
      <StatusDot status="offline" label="Offline" />
      <StatusDot status="pending" label="Pending" pulse />
    </div>
  ),
  progressNotification: (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ProgressNotification
        title="Uploading design-assets.zip"
        message="23 MB of 32 MB"
        progress={72}
      />
      <ProgressNotification
        title="Exporting report..."
        message="Almost done"
        progress={95}
      />
    </div>
  ),
  confirmDialog: (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <ConfirmDialog
        type="danger"
        title="Delete Project?"
        message="This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
      <ConfirmDialog
        type="warning"
        title="Reset Settings?"
        message="All preferences will be lost."
        confirmLabel="Reset"
        cancelLabel="Cancel"
      />
    </div>
  ),
  inlineMessage: (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <InlineMessage type="success" message="Email verified successfully!" />
      <InlineMessage type="error" message="This field is required." />
      <InlineMessage type="warning" message="Password is too weak." />
      <InlineMessage type="info" message="Check your inbox for a link." />
    </div>
  ),
};

export default function NotificationDetails({ selected, onBack }) {
  const d = details[selected];
  const [copied, setCopied] = useState(false);

  if (!d)
    return (
      <div className="form-details-empty">
        <p>Select a component to view details</p>
      </div>
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(d.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="form-details-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Collection
      </button>

      <div className="details-header">
        <h1>{d.name}</h1>
        <p className="details-description">{d.description}</p>
      </div>

      <section className="details-section preview-section">
        <h2>Live Preview</h2>
        <div className="preview-area">
          <div className="preview-item">{previews[selected]}</div>
        </div>
      </section>

      <section className="details-section variants-section">
        <h2>Variants & States</h2>
        <div className="variants-grid">
          {d.variants?.map((v, i) => (
            <div key={i} className="variant-item">
              <div className="variant-preview">{previews[selected]}</div>
              <div className="variant-info">
                <h4>{v.label}</h4>
                <p>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="details-section use-cases-section">
        <h2>Best Used For</h2>
        <div className="use-cases-list">
          {d.uses?.map((u, i) => (
            <div key={i} className="use-case-item">
              <span className="use-case-icon">✓</span>
              <span>{u}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="details-section code-section">
        <div className="code-header">
          <h2>Code Example</h2>
          <button className="copy-button" onClick={handleCopy}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <pre className="code-block">
          <code>{d.code}</code>
        </pre>
      </section>

      <section className="details-section guide-section">
        <h2>Implementation Guide</h2>
        <div className="guide-content">
          <div className="guide-step">
            <h3>Step 1: Import</h3>
            <p>Import from the notifications folder</p>
            <code>{`import { ${d.name.replace(" ", "")} } from "@/components/atoms/notifications"`}</code>
          </div>
          <div className="guide-step">
            <h3>Step 2: Use</h3>
            <p>Add to your JSX with required props</p>
            <code>{`<${d.name.replace(" ", "")} type="success" message="Done!" />`}</code>
          </div>
          <div className="guide-step">
            <h3>Step 3: Customize</h3>
            <p>Pass type, message, action and onClose props</p>
            <code>{`onClose={() => setVisible(false)}`}</code>
          </div>
        </div>
      </section>
    </div>
  );
}
