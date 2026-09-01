export const NotificationCard = ({ avatar, title, message, time, unread = false, onDismiss }) => (
  <div style={{ display: "flex", gap: "12px", padding: "14px 16px", background: unread ? "#eff6ff" : "#fff", borderRadius: "12px", border: `1px solid ${unread ? "#bfdbfe" : "#e5e7eb"}`, position: "relative", width: "100%" }}>
    {unread && <span style={{ position: "absolute", top: "18px", left: "6px", width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />}
    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "16px", flexShrink: 0 }}>
      {avatar || "🔔"}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "14px", color: "#111827" }}>{title}</p>
      <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#6b7280", lineHeight: 1.4 }}>{message}</p>
      <span style={{ fontSize: "12px", color: "#9ca3af" }}>{time}</span>
    </div>
    {onDismiss && <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "16px", alignSelf: "flex-start" }}>✕</button>}
  </div>
);
