import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Download,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { tableDashboardComponents } from "../tableDashboard.config";

const initialConfig = {
  accent: "#6366f1",
  surface: "#0f172a",
  text: "#e2e8f0",
  radius: 12,
  density: "Comfortable",
  showSearch: true,
  showPagination: true,
  showSelection: false,
};

function buildCode(config, component, isDashboard) {
  const data = isDashboard
    ? `const metrics = [
  { label: "Revenue", value: "$48.2k", change: "+12.8%" },
  { label: "Customers", value: "2,840", change: "+8.2%" },
];`
    : `const rows = [
  { company: "Northstar", plan: "Enterprise", status: "Active", revenue: "$12,400" },
  { company: "Orbit Labs", plan: "Pro", status: "Active", revenue: "$8,250" },
  { company: "Pixel Works", plan: "Starter", status: "Pending", revenue: "$3,600" },
];`;
  const markup = isDashboard
    ? `<section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {metrics.map((metric) => (
    <article key={metric.label} className="rounded-xl border p-4">
      <p>{metric.label}</p>
      <strong>{metric.value}</strong>
      <span>{metric.change}</span>
    </article>
  ))}
</section>`
    : `<section className="overflow-x-auto rounded-xl border">
  ${config.showSearch ? `<input aria-label="Search rows" placeholder="Search companies..." />` : ""}
  <table className="w-full text-left">
    <thead><tr>${config.showSelection ? "<th>Select</th>" : ""}<th>Company</th><th>Plan</th><th>Status</th><th>Revenue</th></tr></thead>
    <tbody>{rows.map((row) => <tr key={row.company}>${config.showSelection ? '<td><input type="checkbox" aria-label={`Select ${row.company}`} /></td>' : ""}<td>{row.company}</td><td>{row.plan}</td><td>{row.status}</td><td>{row.revenue}</td></tr>)}</tbody>
  </table>
  ${config.showPagination ? `<nav aria-label="Table pagination">1–3 of 24　<button>Next</button></nav>` : ""}
</section>`;

  return `import React from "react";\n\n${data}\n\nexport default function ${component.name.replace(/[^a-zA-Z0-9]/g, "")}() {\n  return (\n      <div style={{ background: "${config.surface}", color: "${config.text}", border: "1px solid ${config.accent}", borderRadius: "${config.radius}px", padding: "${config.density === "Compact" ? "12px" : "20px"}" }}>\n      ${markup.split("\n").join("\n      ")}\n    </div>\n  );\n}`;
}

function Preview({ component, config, isDashboard }) {
  const padding = config.density === "Compact" ? "10px" : config.density === "Spacious" ? "22px" : "16px";
  return (
    <div className="w-full max-w-3xl border" style={{ background: config.surface, color: config.text, borderColor: `${config.accent}55`, borderRadius: `${config.radius}px`, padding }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs opacity-60">{isDashboard ? "Overview" : "Workspace / Customers"}</p>
          <h2 className="mt-1 text-lg font-semibold">{component.name}</h2>
        </div>
        {!isDashboard && config.showSearch && (
          <input aria-label="Preview search" placeholder="Search..." className="w-32 rounded-lg border bg-black/10 px-2 py-1.5 text-xs outline-none sm:w-44" style={{ borderColor: `${config.accent}66` }} />
        )}
      </div>
      {isDashboard ? (
        <div className="grid grid-cols-2 gap-3">
          {[["Revenue", "$48,290", "+12.8%"], ["Customers", "2,840", "+8.2%"], ["Conversion", "4.82%", "+1.4%"], ["Orders", "1,293", "+6.1%"]].map(([label, value, trend]) => (
            <article key={label} className="rounded-lg border border-white/10 bg-black/10 p-3">
              <p className="text-xs opacity-60">{label}</p>
              <p className="mt-1 text-lg font-bold">{value}</p>
              <span className="text-xs" style={{ color: config.accent }}>{trend}</span>
            </article>
          ))}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead><tr className="border-b border-white/10">{(config.showSelection ? ["", "Company", "Plan", "Status", "Revenue"] : ["Company", "Plan", "Status", "Revenue"]).map((col, i) => <th key={`${col}-${i}`} className="px-2 py-2 font-semibold opacity-60">{col || "Select"}</th>)}</tr></thead>
              <tbody>
                {[["Northstar", "Enterprise", "Active", "$12,400"], ["Orbit Labs", "Pro", "Active", "$8,250"], ["Pixel Works", "Starter", "Pending", "$3,600"]].map((row) => (
                  <tr key={row[0]} className="border-b border-white/5 last:border-0">
                    {config.showSelection && <td className="px-2 py-3"><input type="checkbox" aria-label={`Select ${row[0]}`} style={{ accentColor: config.accent }} /></td>}
                    {row.map((value, cell) => <td key={cell} className="px-2 py-3">{cell === 2 ? <span className="rounded-full px-2 py-1 text-[10px]" style={{ color: config.accent, background: `${config.accent}20` }}>{value}</span> : value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {config.showPagination && <div className="mt-3 flex items-center justify-between text-xs opacity-60"><span>Showing 1–3 of 24</span><span>‹　1　2　3　›</span></div>}
        </>
      )}
    </div>
  );
}

export default function TablesDashboardCustomizerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const component = tableDashboardComponents.find((item) => item.id === id);
  const [config, setConfig] = useState(initialConfig);
  const [copied, setCopied] = useState(false);
  const isDashboard = component?.id.endsWith("dashboard");
  const code = useMemo(() => component ? buildCode(config, component, isDashboard) : "", [config, component, isDashboard]);

  if (!component) {
    return (
      <div className="flex h-full items-center justify-center bg-[#07090e] p-6 text-center text-slate-300">
        <div><p>That table or dashboard pattern was not found.</p><button type="button" onClick={() => navigate("/tables-dashboard")} className="mt-3 text-indigo-300 hover:text-white">Back to collection</button></div>
      </div>
    );
  }

  const update = (key, value) => setConfig((current) => ({ ...current, [key]: value }));
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Could not copy customized component code:", error);
    }
  };
  const downloadCode = () => {
    const file = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${component.id}.jsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#07090e] text-white">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-6">
        <button type="button" onClick={() => navigate(`/tables-dashboard/${component.id}`)} className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to {component.name}</button>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setConfig(initialConfig)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"><RotateCcw className="mr-1.5 inline h-3.5 w-3.5" />Reset</button>
          <button type="button" onClick={downloadCode} className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold hover:bg-indigo-500"><Download className="mr-1.5 inline h-3.5 w-3.5" />Export</button>
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="flex min-h-[360px] items-center justify-center overflow-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:18px_18px] p-5 sm:p-8">
          <Preview component={component} config={config} isDashboard={isDashboard} />
        </section>
        <aside className="min-h-0 overflow-y-auto border-t border-slate-800 bg-slate-950/80 p-5 lg:border-l lg:border-t-0">
          <div className="mb-5 flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-indigo-400" /><h1 className="font-semibold">{isDashboard ? "Dashboard" : "Table"} settings</h1></div>
          <div className="space-y-5">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Theme</h2>
              {[["Accent color", "accent"], ["Surface color", "surface"], ["Text color", "text"]].map(([label, key]) => (
                <label key={key} className="flex items-center justify-between text-sm text-slate-300">{label}<input aria-label={label} type="color" value={config[key]} onChange={(event) => update(key, event.target.value)} className="h-8 w-11 cursor-pointer rounded border-0 bg-transparent" /></label>
              ))}
              <label className="block text-sm text-slate-300">Border radius <span className="float-right text-xs text-slate-500">{config.radius}px</span><input aria-label="Border radius" type="range" min="0" max="28" value={config.radius} onChange={(event) => update("radius", Number(event.target.value))} className="mt-2 w-full accent-indigo-500" /></label>
              <label className="block text-sm text-slate-300">Spacing density<select value={config.density} onChange={(event) => update("density", event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"><option>Compact</option><option>Comfortable</option><option>Spacious</option></select></label>
            </div>
            {!isDashboard && <div className="space-y-3 border-t border-slate-800 pt-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Table features</h2>
              {[["Search bar", "showSearch"], ["Pagination", "showPagination"], ["Row selection", "showSelection"]].map(([label, key]) => (
                <label key={key} className="flex cursor-pointer items-center justify-between text-sm text-slate-300">{label}<input type="checkbox" checked={config[key]} onChange={(event) => update(key, event.target.checked)} className="h-4 w-4 accent-indigo-500" /></label>
              ))}
            </div>}
            <div className="border-t border-slate-800 pt-4">
              <div className="mb-2 flex items-center justify-between"><h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"><Code2 className="h-3.5 w-3.5" />Generated code</h2><button type="button" onClick={copyCode} className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800">{copied ? <><Check className="mr-1 inline h-3 w-3" />Copied</> : <><Copy className="mr-1 inline h-3 w-3" />Copy</>}</button></div>
              <pre className="max-h-64 overflow-auto rounded-lg border border-slate-800 bg-black/30 p-3 text-[10px] leading-relaxed text-slate-300"><code>{code}</code></pre>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
