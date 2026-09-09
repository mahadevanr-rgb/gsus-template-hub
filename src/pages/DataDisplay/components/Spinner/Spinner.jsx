import React from "react";

export const Spinner = ({ variant = "spin", size = "md", color = "indigo", className = "" }) => {
  if (variant === "pulse") {
    return (
      <div className={`relative flex h-8 w-8 ${className}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-8 w-8 bg-indigo-500" />
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className={`w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden ${className}`}>
        <div className="h-full bg-indigo-500 rounded-full animate-pulse w-2/3" />
      </div>
    );
  }

  return (
    <div className={`w-8 h-8 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin ${className}`} />
  );
};

export const DotsLoader = Spinner;
export const PulseLoader = Spinner;
export const BarLoader = Spinner;

export default Spinner;
