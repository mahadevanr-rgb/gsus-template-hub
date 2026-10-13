import { useState } from "react";
import Sidebar from "@/components/common/Navigation/Sidebar";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  ShieldCheck,
  FolderGit2,
  Terminal,
} from "lucide-react";

export default function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("realtime");

  const sidebarGroups = [
    {
      title: "Observability",
      items: [
        { id: "dash", label: "Operations Hub", icon: LayoutDashboard, badge: "Live" },
        {
          id: "telemetry",
          label: "Telemetry & Logs",
          icon: BarChart2,
          children: [
            { id: "realtime", label: "Realtime Streams", badge: 4 },
            { id: "traces", label: "Distributed Tracing" },
            { id: "alarms", label: "Incident Alarms", badge: "2 P1" },
          ],
        },
        { id: "repos", label: "Deployment Targets", icon: FolderGit2 },
      ],
    },
    {
      title: "Access Management",
      items: [
        { id: "team", label: "Security Officers", icon: Users },
        { id: "audit", label: "Compliance Audit", icon: ShieldCheck, badge: "SOC2" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setCollapsed((p) => !p)}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-sm"
        >
          {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        </button>

        <div className="flex items-center gap-2 text-slate-400">
          <span>Active Selection:</span>
          <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {activeItem}
          </span>
        </div>
      </div>

      {/* Demo Canvas */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-xl flex justify-center">
        <div className="h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex">
          <Sidebar
            brand={{ name: "CyberOps v2" }}
            groups={sidebarGroups}
            activeId={activeItem}
            collapsed={collapsed}
            onCollapseToggle={(val) => setCollapsed(val)}
            onItemSelect={(item) => setActiveItem(item.id)}
          />

          <div className="flex-1 bg-slate-900 p-6 hidden sm:flex flex-col justify-center items-center text-center text-slate-400 text-xs">
            <Terminal className="w-8 h-8 text-indigo-400 mb-2 opacity-80" />
            <p className="font-semibold text-white">Main Content Viewport</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
              Notice how the sidebar width transitions smoothly and tooltips appear upon hover when collapsed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
