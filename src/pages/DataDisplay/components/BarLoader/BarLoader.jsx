export const ProgressBar = ({ value = 0, max = 100, label, color = "#6366f1", showValue = true, size = "md" }) => {
  const heights = { sm: "4px", md: "8px", lg: "14px" };
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ width: "100%" }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          {label && <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>{label}</span>}
          {showValue && <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>{pct}%</span>}
        </div>
      )}
      <div style={{ width: "100%", height: heights[size], background: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "999px", transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
};
