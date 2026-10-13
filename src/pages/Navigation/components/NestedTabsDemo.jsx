import { useState } from "react";
import NestedTabs from "@/components/common/Navigation/NestedTabs";
import { Server, Database, Shield } from "lucide-react";

export default function NestedTabsDemo() {
  const [log, setLog] = useState({ parentId: "infra", childId: "vms" });

  const categories = [
    {
      id: "infra",
      label: "Infrastructure",
      tabs: [
        { id: "vms", label: "Virtual Machines", description: "Dedicated enterprise compute instances" },
        { id: "kubernetes", label: "EKS Kubernetes", description: "Managed autoscaling container pods" },
        { id: "storage", label: "NVMe Block Volumes", description: "Sub-millisecond IOPS persistent storage" },
      ],
    },
    {
      id: "data",
      label: "Data Engines",
      tabs: [
        { id: "postgres", label: "Distributed Postgres", description: "High-availability multi-region cluster" },
        { id: "clickhouse", label: "ClickHouse Analytics", description: "Columnar OLAP query engine" },
      ],
    },
    {
      id: "security",
      label: "Zero-Trust",
      tabs: [
        { id: "iam", label: "Identity & RBAC", description: "Role policies and JWT validation" },
        { id: "audit", label: "Immutable Audit Log", description: "Cryptographically verified audit trail" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* State Inspector */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Synchronized State:</span>
        <div className="flex items-center gap-2 font-mono">
          <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Parent: {log.parentId}
          </span>
          <span className="text-slate-500">→</span>
          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Child: {log.childId}
          </span>
        </div>
      </div>

      {/* Component */}
      <div className="p-4 sm:p-6 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl">
        <NestedTabs
          categories={categories}
          onSelectionChange={(selection) => setLog(selection)}
        />
      </div>
    </div>
  );
}
