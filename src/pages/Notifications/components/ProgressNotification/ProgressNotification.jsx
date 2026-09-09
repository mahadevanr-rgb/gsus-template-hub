import React from "react";
import { Upload } from "lucide-react";

export const ProgressNotification = ({
  title = "Uploading files",
  progress = 65,
  className = "",
}) => (
  <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 max-w-sm w-full shadow-xl ${className}`}>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-semibold text-white">
        <Upload className="w-3.5 h-3.5 text-indigo-400" />
        <span>{title}</span>
      </div>
      <span className="font-mono text-indigo-400 font-bold">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default ProgressNotification;
