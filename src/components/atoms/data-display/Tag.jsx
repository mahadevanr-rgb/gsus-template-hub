export const Tag = ({ label, color = "#6366f1", onRemove, variant = "soft" }) => {
  const bg   = variant === "solid" ? color : `${color}18`;
  const text = variant === "solid" ? "#fff" : color;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "999px", background: bg, color: text, fontSize: "12px", fontWeight: 600, border: `1px solid ${color}30` }}>
      {label}
      {onRemove && <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: text, fontSize: "12px", lineHeight: 1, padding: "0 0 0 2px" }}>✕</button>}
    </span>
  );
};
