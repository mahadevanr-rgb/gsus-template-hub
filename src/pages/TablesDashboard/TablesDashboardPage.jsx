import { useNavigate, useParams } from "react-router-dom";
import { BarChart3, Table2 } from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import TableDashboardDetails from "./TableDashboardDetails";
import TableDashboardPreview from "./TableDashboardPreview";
import { tableDashboardComponents } from "./tableDashboard.config";

export default function TablesDashboardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const selected = tableDashboardComponents.find((item) => item.id === id);

  if (id && selected) {
    return <TableDashboardDetails selected={selected.id} />;
  }

  return (
    <main className="space-y-7">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button type="button" onClick={() => navigate("/")} className="transition-colors hover:text-white">Home</button>
        <span>/</span>
        <button type="button" onClick={() => navigate("/")} className="transition-colors hover:text-white">Components</button>
        <span>/</span>
        <span className="font-medium text-white">Tables & Dashboards</span>
      </div>

      <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-5 shadow-xl shadow-black/10 sm:px-6">
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-600/10 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 text-white shadow-xl shadow-indigo-500/25 sm:flex">
            <Table2 className="h-5 w-5" />
          </div>
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-300">
              <BarChart3 className="h-3.5 w-3.5" />
              {tableDashboardComponents.length} Table & Dashboard Patterns
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Data Tables{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                & Dashboards
              </span>
            </h1>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
              Browse tables with sorting, filters, pagination, column controls, and row selection, plus dashboard KPI, statistics, activity, and analytics patterns.
            </p>
          </div>
        </div>
      </header>

      <section aria-label="Table and dashboard component previews" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tableDashboardComponents.map((item) => (
          <ShowcaseCard
            key={item.id}
            title={item.name}
            description={item.description}
            tag={item.tag}
            theme={item.theme}
            preview={<TableDashboardPreview id={item.id} compact />}
            onClick={() => navigate(`/tables-dashboard/${item.id}`)}
          />
        ))}
      </section>
    </main>
  );
}
