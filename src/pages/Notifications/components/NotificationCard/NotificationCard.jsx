import React from "react";
import { X } from "lucide-react";

export const NotificationCard = ({
  avatar = "👤",
  title = "New Message",
  message = "Sarah left a comment on your project.",
  time = "Just now",
  unread = true,
  onDismiss,
  className = "",
}) => (
  <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3 w-full max-w-sm relative ${unread ? "ring-1 ring-indigo-500/30" : ""} ${className}`}>
    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm shrink-0 border border-slate-700">
      {avatar}
    </div>
    <div className="flex-1 space-y-0.5 pr-4">
      <div className="flex items-center gap-2">
        <h4 className="text-xs font-bold text-white">{title}</h4>
        {unread && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed">{message}</p>
      <span className="text-[10px] text-slate-500 block pt-0.5">{time}</span>
    </div>
    {onDismiss && (
      <button onClick={onDismiss} className="absolute top-3 right-3 text-slate-500 hover:text-white p-1">
        <X className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);

export default NotificationCard;
