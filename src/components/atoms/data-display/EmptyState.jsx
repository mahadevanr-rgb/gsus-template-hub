export const EmptyState = ({ icon = "📭", title = "No data found", description, action, onAction }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center", gap: "12px" }}>
    <div style={{ fontSize: "56px", lineHeight: 1 }}>{icon}</div>
    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>{title}</h3>
    {description && <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", maxWidth: "320px", lineHeight: 1.6 }}>{description}</p>}
    {action && (
      <button onClick={onAction} style={{ marginTop: "8px", padding: "10px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>{action}</button>
    )}
  </div>
);
