import React from "react";

export const NotificationBadge = ({ count = 3, dot = false, children, className = "" }) => (
  <div className={`relative inline-flex ${className}`}>
    {children}
    {dot ? (
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
    ) : count > 0 ? (
      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold ring-2 ring-slate-950 leading-none">
        {count > 99 ? "99+" : count}
      </span>
    ) : null}
  </div>
);

export default NotificationBadge;
