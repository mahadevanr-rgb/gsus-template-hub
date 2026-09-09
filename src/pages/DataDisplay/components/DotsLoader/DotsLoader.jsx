export const Spinner = ({ size = "40px", color = "#6366f1", thickness = "4px" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", border: `${thickness} solid #e5e7eb`, borderTop: `${thickness} solid ${color}`, animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

export const DotsLoader = ({ color = "#6366f1" }) => (
  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
    ))}
    <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
  </div>
);

export const PulseLoader = ({ color = "#6366f1" }) => (
  <div style={{ position: "relative", width: "48px", height: "48px" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.3, animation: "pulse-ring 1.5s ease-out infinite" }} />
    <div style={{ position: "absolute", inset: "8px", borderRadius: "50%", background: color }} />
    <style>{`@keyframes pulse-ring{0%{transform:scale(0.5);opacity:0.8}100%{transform:scale(1.5);opacity:0}}`}</style>
  </div>
);

export const BarLoader = ({ color = "#6366f1", width = "200px" }) => (
  <div style={{ width, height: "4px", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
    <div style={{ height: "100%", background: color, borderRadius: "999px", animation: "bar 1.5s ease-in-out infinite" }} />
    <style>{`@keyframes bar{0%{width:0%;marginLeft:0}50%{width:70%;marginLeft:15%}100%{width:0%;marginLeft:100%}}`}</style>
  </div>
);
