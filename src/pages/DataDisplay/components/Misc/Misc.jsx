import React from "react";

export const Kbd = ({ children, className = "" }) => (
  <kbd className={`inline-flex items-center px-2 py-0.5 bg-slate-800 border border-slate-700 border-b-2 rounded-lg text-xs font-mono text-slate-200 font-semibold ${className}`}>
    {children}
  </kbd>
);

export const Divider = ({ label, className = "" }) => (
  <div className={`flex items-center gap-3 w-full my-2 ${className}`}>
    <div className="flex-1 h-[1px] bg-slate-800" />
    {label && <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{label}</span>}
    {label && <div className="flex-1 h-[1px] bg-slate-800" />}
  </div>
);

export const Tooltip = ({ label, children, className = "" }) => (
  <div
    className={`relative inline-flex group ${className}`}
  >
    {children}
    <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
      {label}
    </div>
  </div>
);

export const Misc = ({ className = "" }) => (
  <div className={`space-y-4 w-full max-w-xs ${className}`}>
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400">Shortcuts:</span>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
    <Divider label="OR" />
    <Tooltip label="Helpful tooltip text">
      <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 transition-colors">
        Hover Me
      </button>
    </Tooltip>
  </div>
);

Misc.Kbd = Kbd;
Misc.Divider = Divider;
Misc.Tooltip = Tooltip;

export default Misc;
