import { Boxes, CircleHelp, Gauge, LayoutPanelLeft, LayoutTemplate, MonitorSmartphone, Settings, Smartphone, Store } from "lucide-react";

const navigationGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", icon: Gauge },
      { label: "Layout Sections", icon: LayoutPanelLeft },
      { label: "Components", icon: Boxes },
      { label: "Templates", icon: LayoutTemplate },
    ],
  },
  {
    label: "Workspaces",
    items: [
      { label: "Web Apps", icon: MonitorSmartphone },
      { label: "Mobile Apps", icon: Smartphone },
      { label: "Marketing", icon: Store },
    ],
  },
];

/** A desktop-persistent sidebar. Render inside a flex application shell. */
export default function Sidebar({ activeItem = "Layout Sections", onNavigate, storageUsed = 85, responsive = true }) {
  const usage = Math.min(100, Math.max(0, storageUsed));

  return (
    <aside className={`sticky top-0 h-screen w-72 shrink-0 flex-col border-r border-gray-800 bg-[#111827] ${responsive ? "hidden lg:flex" : "flex"}`}>
      <div className="flex items-center gap-2.5 border-b border-gray-800 px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"><LayoutTemplate className="h-4 w-4 text-white" /></span>
        <span className="font-bold text-white">TemplateHub</span>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6" aria-label="Sidebar navigation">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{group.label}</p>
            <div className="space-y-1">
              {group.items.map(({ label, icon: Icon }) => {
                const isActive = activeItem === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onNavigate?.(label)}
                    className={`flex w-full items-center gap-3 rounded-l-xl border-r-2 px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive ? "border-indigo-500 bg-indigo-600/10 text-indigo-400" : "border-transparent text-slate-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-5 border-t border-gray-800 p-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs"><span className="font-medium text-slate-300">Storage usage</span><span className="text-slate-500">{usage}% used</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-800"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style={{ width: `${usage}%` }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onNavigate?.("Settings")} className="flex items-center justify-center gap-2 rounded-xl border border-gray-800 px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-indigo-500/50 hover:text-white"><Settings className="h-4 w-4" />Settings</button>
          <button type="button" onClick={() => onNavigate?.("Support")} className="flex items-center justify-center gap-2 rounded-xl border border-gray-800 px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-indigo-500/50 hover:text-white"><CircleHelp className="h-4 w-4" />Support</button>
        </div>
      </div>
    </aside>
  );
}
