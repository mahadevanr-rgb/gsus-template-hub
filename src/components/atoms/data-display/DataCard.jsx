export const DataCard = ({ title, value, subtitle, icon, trend, trendUp, color = "#6366f1" }) => (
  <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>{title}</p>
        <p style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: "#111827" }}>{value}</p>
      </div>
      {icon && <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</div>}
    </div>
    {(subtitle || trend) && (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {trend && <span style={{ fontSize: "12px", fontWeight: 700, color: trendUp ? "#22c55e" : "#ef4444" }}>{trendUp ? "↑" : "↓"} {trend}</span>}
        {subtitle && <span style={{ fontSize: "12px", color: "#9ca3af" }}>{subtitle}</span>}
      </div>
    )}
  </div>
);
