import React from "react";
import { Search, ArrowDown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const rows = [
  ["Northstar", "Enterprise", "Active", "$12,400"],
  ["Orbit Labs", "Pro", "Active", "$8,250"],
  ["Pixel Works", "Starter", "Pending", "$3,600"],
];

function MiniTable({ id }) {
  const showCheckbox = id === "row-selection-table";
  const showSort = id === "sortable-table";
  const showSearch = id === "filter-search-table";
  const showColumns = id === "column-controls-table";
  const showPagination = id === "pagination-table";
  const columns = id === "column-controls-table"
    ? ["Company", "Status"]
    : ["Company", "Plan", "Status", "Revenue"];

  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80 text-left">
      {(showSearch || showColumns) && (
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-2 py-1.5">
          {showSearch && <span className="flex items-center gap-1 text-[8px] text-slate-500"><Search className="h-2.5 w-2.5" />Search companies...</span>}
          {showColumns && <span className="ml-auto flex items-center gap-1 text-[8px] text-slate-400"><SlidersHorizontal className="h-2.5 w-2.5" />Columns</span>}
        </div>
      )}
      <table className="w-full text-[8px]">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            {showCheckbox && <th className="px-2 py-1.5"><span className="inline-block h-2 w-2 rounded-sm border border-slate-600" /></th>}
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap px-2 py-1.5 text-left font-semibold">
                <span className="inline-flex items-center gap-0.5">{column}{showSort && column === "Company" && <ArrowDown className="h-2.5 w-2.5 text-indigo-400" />}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row[0]} className={`border-t border-slate-800/70 ${showCheckbox && index === 1 ? "bg-indigo-500/10" : ""}`}>
              {showCheckbox && <td className="px-2 py-1.5"><span className={`inline-block h-2 w-2 rounded-sm border ${index === 1 ? "border-indigo-400 bg-indigo-500" : "border-slate-600"}`} /></td>}
              {columns.map((column) => {
                const value = row[["Company", "Plan", "Status", "Revenue"].indexOf(column)];
                return <td key={column} className="whitespace-nowrap px-2 py-1.5 text-slate-300">{column === "Status" ? <span className={value === "Active" ? "text-emerald-400" : "text-amber-400"}>● {value}</span> : value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && <div className="flex items-center justify-between border-t border-slate-800 px-2 py-1 text-[8px] text-slate-500"><span>1–3 of 24</span><span className="flex gap-1"><ChevronLeft className="h-2.5 w-2.5" /><ChevronRight className="h-2.5 w-2.5 text-indigo-400" /></span></div>}
    </div>
  );
}

function DashboardPreview({ id }) {
  if (id === "activity-dashboard") {
    return (
      <div className="w-full space-y-2 rounded-lg border border-slate-800 bg-slate-950/80 p-3">
        {["New order received", "Payment processed", "Report generated"].map((item, index) => (
          <div key={item} className="flex items-center gap-2 text-[9px] text-slate-300">
            <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-indigo-400" : index === 1 ? "bg-emerald-400" : "bg-amber-400"}`} />
            <span className="flex-1">{item}</span>
            <span className="text-slate-600">{index + 2}m</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {[
        { label: "Revenue", value: "$48.2k", trend: "+12.8%" },
        { label: "Customers", value: "2,840", trend: "+8.2%" },
        { label: "Conversion", value: "4.82%", trend: "+1.4%" },
        { label: "Orders", value: "1,293", trend: "+6.1%" },
      ].map((metric, index) => (
        <div key={metric.label} className="rounded-lg border border-slate-800 bg-slate-950/80 p-2">
          <p className="text-[8px] text-slate-500">{metric.label}</p>
          <div className="mt-1 flex items-end justify-between gap-1">
            <span className="text-xs font-bold text-white">{metric.value}</span>
            <span className={`text-[8px] ${id === "statistics-dashboard" && index === 2 ? "text-rose-400" : "text-emerald-400"}`}>{metric.trend}</span>
          </div>
          {id === "analytics-dashboard" && <div className="mt-2 flex h-5 items-end gap-1">{[3, 5, 4, 8, 6, 10, 8].map((height, bar) => <span key={bar} className="flex-1 rounded-t bg-indigo-500/70" style={{ height: `${height * 10}%` }} />)}</div>}
        </div>
      ))}
    </div>
  );
}

export default function TableDashboardPreview({ id, compact = false }) {
  const content = id.endsWith("dashboard") ? <DashboardPreview id={id} /> : <MiniTable id={id} />;
  return (
    <div className={`w-full ${compact ? "min-h-24" : "min-h-40"} flex items-center justify-center rounded-xl border border-slate-800/80 bg-slate-950/70 p-3`}>
      {content}
    </div>
  );
}
