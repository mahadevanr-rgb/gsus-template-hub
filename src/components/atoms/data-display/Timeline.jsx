export const Timeline = ({ items = [] }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.color || "#6366f1", border: "2px solid #fff", boxShadow: `0 0 0 2px ${item.color || "#6366f1"}`, flexShrink: 0, marginTop: "4px" }} />
          {i < items.length - 1 && <div style={{ width: "2px", flex: 1, background: "#e5e7eb", margin: "4px 0" }} />}
        </div>
        <div style={{ paddingBottom: i < items.length - 1 ? "20px" : 0 }}>
          <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "14px", color: "#111827" }}>{item.title}</p>
          {item.description && <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7280", lineHeight: 1.4 }}>{item.description}</p>}
          {item.time && <span style={{ fontSize: "12px", color: "#9ca3af" }}>{item.time}</span>}
        </div>
      </div>
    ))}
  </div>
);
