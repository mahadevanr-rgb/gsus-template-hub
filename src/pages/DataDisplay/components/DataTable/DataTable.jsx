import React from "react";

const defaultCols = ["User", "Role", "Status", "Plan"];
const defaultRows = [
  ["Alex Morgan", "Product Designer", "Active", "Pro"],
  ["Sarah Chen", "Lead Developer", "Active", "Enterprise"],
  ["David Miller", "DevOps Engineer", "Offline", "Starter"],
];

export const DataTable = ({
  columns = defaultCols,
  rows = defaultRows,
  striped = true,
  className = "",
}) => (
  <div className={`w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 ${className}`}>
    <table className="w-full text-left text-xs border-collapse">
      <thead>
        <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
          {columns.map((col, i) => (
            <th key={i} className="p-3.5 font-bold tracking-wider uppercase text-[11px] whitespace-nowrap">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800/60">
        {rows.map((row, ri) => (
          <tr
            key={ri}
            className={`transition-colors hover:bg-slate-800/50 ${
              striped && ri % 2 === 1 ? "bg-slate-950/30" : "bg-transparent"
            }`}
          >
            {row.map((cell, ci) => (
              <td key={ci} className="p-3.5 text-slate-300 whitespace-nowrap">
                {ci === 2 ? (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      cell === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {cell}
                  </span>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
