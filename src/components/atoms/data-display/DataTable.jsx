export const DataTable = ({ columns = [], rows = [], striped = true }) => (
  <div style={{ width: "100%", overflowX: "auto", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
      <thead>
        <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
          {columns.map((col, i) => (
            <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#374151", whiteSpace: "nowrap" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: striped && ri % 2 === 1 ? "#f9fafb" : "#fff", borderBottom: "1px solid #f3f4f6", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
            onMouseLeave={e => e.currentTarget.style.background = striped && ri % 2 === 1 ? "#f9fafb" : "#fff"}
          >
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: "12px 16px", color: "#374151" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
