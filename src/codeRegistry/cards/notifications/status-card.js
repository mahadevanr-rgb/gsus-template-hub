import StatusCard from "@/pages/Cards/components/StatusCard/StatusCard";

const sourceCode = `import React from "react";

export default function StatusCard({
  title = "System Status",
  statuses = [
    {
      label: "API",
      status: "operational",
      text: "Operational",
    },
    {
      label: "Database",
      status: "operational",
      text: "Operational",
    },
    {
      label: "Webhooks",
      status: "degraded",
      text: "Degraded",
    },
  ],
  onStatusClick,
  className = "",
}) {
  const getStatusIndicator = (status) => {
    switch (status?.toLowerCase()) {
      case "degraded":
      case "warning":
        return {
          dot: "bg-amber-500",
          textClass: "text-amber-600 dark:text-amber-400 font-semibold",
          ring: "bg-amber-100 dark:bg-amber-500/20",
        };
      case "offline":
      case "error":
        return {
          dot: "bg-rose-500",
          textClass: "text-rose-600 dark:text-rose-400 font-semibold",
          ring: "bg-rose-100 dark:bg-rose-500/20",
        };
      case "operational":
      case "healthy":
      default:
        return {
          dot: "bg-emerald-500",
          textClass: "text-emerald-600 dark:text-emerald-400 font-semibold",
          ring: "bg-emerald-100 dark:bg-emerald-500/20",
        };
    }
  };

  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-sm w-full overflow-hidden p-5 sm:p-6 \${className}\`}>
      <div className="pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="space-y-3 pt-1">
        {statuses.map((item, idx) => {
          const { dot, textClass, ring } = getStatusIndicator(item.status);
          return (
            <div
              key={item.label || idx}
              onClick={() => onStatusClick?.(item)}
              className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-2 rounded-lg transition-colors cursor-pointer"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {item.label}
              </span>

              <div className="flex items-center gap-2">
                <span className={\`w-3.5 h-3.5 rounded-full flex items-center justify-center \${ring}\`}>
                  <span className={\`w-2 h-2 rounded-full \${dot}\`} />
                </span>
                <span className={\`text-xs \${textClass}\`}>
                  {item.text || item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

export default {
  id: "status-card",
  slug: "status-card",
  name: "Status Card",
  description: "System health and service status card with status indicators and live uptime states.",
  category: "cards",
  subCategory: "notifications",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["status", "system", "health", "uptime", "api", "operational", "monitoring"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/StatusCard.jsx", type: "component" },
  ],
  uses: [
    "System uptime dashboards",
    "DevOps and API monitoring",
    "Service health status pages",
    "Platform diagnostics",
  ],
  component: StatusCard,
  previewProps: {
    title: "System Status",
    statuses: [
      {
        label: "API",
        status: "operational",
        text: "Operational",
      },
      {
        label: "Database",
        status: "operational",
        text: "Operational",
      },
      {
        label: "Webhooks",
        status: "degraded",
        text: "Degraded",
      },
    ],
  },
  sourceCode,
};
