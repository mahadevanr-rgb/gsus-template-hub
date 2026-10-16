import { useNavigate } from "react-router-dom";
import { Palette } from "lucide-react";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import TableDashboardPreview from "./TableDashboardPreview";
import { tableDashboardComponents } from "./tableDashboard.config";

const sourceFor = (component) => {
  if (component.id.endsWith("dashboard")) {
    return `export default function ${component.name.replace(/[^a-zA-Z0-9]/g, "")}() {
  const metrics = [
    { label: "Revenue", value: "$48.2k", change: "+12.8%" },
    { label: "Customers", value: "2,840", change: "+8.2%" },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-xl border p-4">
          <p>{metric.label}</p>
          <strong>{metric.value}</strong>
          <span>{metric.change}</span>
        </article>
      ))}
    </section>
  );
}`;
  }
  return `export default function ${component.name.replace(/[^a-zA-Z0-9]/g, "")}() {
  const rows = [
    { company: "Northstar", plan: "Enterprise", status: "Active", revenue: "$12,400" },
    { company: "Orbit Labs", plan: "Pro", status: "Active", revenue: "$8,250" },
    { company: "Pixel Works", plan: "Starter", status: "Pending", revenue: "$3,600" },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Company</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.company}>
              <td>{row.company}</td>
              <td>{row.plan}</td>
              <td>{row.status}</td>
              <td>{row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;
};

export default function TableDashboardDetails({ selected }) {
  const navigate = useNavigate();
  const component = tableDashboardComponents.find((item) => item.id === selected);
  const isDashboard = component?.id.endsWith("dashboard");

  if (!component) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-300">
        <p>This table or dashboard pattern was not found.</p>
        <button type="button" onClick={() => navigate("/tables-dashboard")} className="mt-4 text-indigo-300 hover:text-white">Back to collection</button>
      </div>
    );
  }

  const code = sourceFor(component);
  const handleCustomize = () => navigate(`/tables-dashboard/customize/${component.id}`);
  const renderSidebar = () => (
    <div className="space-y-3 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-blue-950/20 to-slate-900 p-5 shadow-lg">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">🎨</span>
        <div>
          <h4 className="text-sm font-bold text-white">Customize This {isDashboard ? "Dashboard" : "Table"}</h4>
          <p className="mt-0.5 text-[11px] text-slate-400">Adjust colors, radius, spacing, and table options in the visual workspace.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCustomize}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:from-indigo-500 hover:to-blue-500 active:scale-[0.98]"
      >
        <Palette className="h-4 w-4" />
        Customize This {isDashboard ? "Dashboard" : "Table"}
      </button>
    </div>
  );

  return (
    <ComponentDetailsView
      component={{
        name: component.name,
        slug: component.id,
        category: component.tag,
        subCategory: component.tag,
        description: component.description,
        sourceCode: code,
        files: [{ path: `components/${isDashboard ? "dashboard" : "tables"}/${component.id}.jsx` }],
        framework: "react",
        styling: "Tailwind CSS",
        version: "1.0.0",
        dependencies: ["None"],
        author: "TemplateHub UI Team",
        previewProps: {},
      }}
      categoryName="Tables & Dashboards"
      categoryPath="/tables-dashboard"
      subCategories={tableDashboardComponents.map(({ id, name }) => ({ slug: id, name }))}
      activeSlug={component.id}
      onSelectSibling={(slug) => navigate(`/tables-dashboard/${slug}`)}
      onBack={() => navigate("/tables-dashboard")}
      onNavigateHome={() => navigate("/")}
      renderCustomPreview={() => <TableDashboardPreview id={component.id} />}
      renderSidebar={renderSidebar}
    />
  );
}
