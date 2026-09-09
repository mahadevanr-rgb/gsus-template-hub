import React from "react";

const statusColors = {
  online:  "bg-emerald-500",
  away:    "bg-amber-500",
  busy:    "bg-rose-500",
  offline: "bg-slate-500",
};

export const StatusDot = ({ status = "online", label, className = "" }) => (
  <div className={`inline-flex items-center gap-2 ${className}`}>
    <span className="relative flex h-2.5 w-2.5">
      {status === "online" && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColors[status] || statusColors.online}`} />
    </span>
    {label && <span className="text-xs font-semibold text-slate-300 capitalize">{label}</span>}
  </div>
);

export default StatusDot;
