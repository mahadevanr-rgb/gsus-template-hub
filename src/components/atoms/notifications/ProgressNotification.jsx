export const ProgressNotification = ({ title, message, progress = 60, onClose }) => (
  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", minWidth: "300px", maxWidth: "380px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
      <div>
        <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "14px", color: "#111827" }}>{title}</p>
        <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{message}</p>
      </div>
      {onClose && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "16px" }}>✕</button>}
    </div>
    <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: "999px", transition: "width 0.4s ease" }} />
    </div>
    <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#6366f1", fontWeight: 600, textAlign: "right" }}>{progress}%</p>
  </div>
);
