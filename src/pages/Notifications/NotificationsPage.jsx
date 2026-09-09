import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationDetails from "./NotificationDetails";
import { Bell, ArrowRight } from "lucide-react";

const notificationComponents = [
  { id: "toast",                name: "Toast Notification",    description: "Dismissible status feedback popups with custom icons and timeout support.",    tag: "Feedback", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: "alert",                name: "Alert Banner",          description: "Inline alert messages with title, description, and dismiss capability.",        tag: "Feedback", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: "banner",               name: "System Announcement",   description: "Full-width announcement bar with call-to-action button and close icon.",       tag: "Banner",   color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { id: "snackbar",             name: "Snackbar Toast",        description: "Compact floating snackbar with optional undo action at bottom viewport.",      tag: "Snackbar", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: "notificationCard",     name: "Notification Card",     description: "Rich inbox notification card with user avatar, timestamp and unread badge.",   tag: "Card",     color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { id: "notificationBadge",    name: "Notification Badge",    description: "Numeric counter and active ping dot overlays for buttons and avatars.",        tag: "Badge",    color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  { id: "statusDot",            name: "Status Indicator Dot",  description: "Live presence status indicator (online, away, busy, offline).",               tag: "Status",   color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { id: "progressNotification", name: "Progress Notification", description: "Dynamic upload / async task progress card with linear percentage bar.",        tag: "Progress", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { id: "confirmDialog",        name: "Confirm Dialog Modal",  description: "Accessible confirmation prompt with destructive and neutral action states.",   tag: "Dialog",   color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: "inlineMessage",        name: "Inline Helper Message", description: "Subtle inline helper indicator with status icons and contextual text.",         tag: "Inline",   color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
];

export default function NotificationsPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {selected ? (
        <NotificationDetails
          selected={selected}
          onBack={handleBack}
          onNavigateHome={() => navigate("/")}
        />
      ) : (
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Components</span>
            <span>/</span>
            <span className="text-white font-medium">Notifications</span>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
                <Bell className="w-3.5 h-3.5" />
                <span>10 Notification Patterns</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Notification & Feedback Systems</h1>
              <p className="text-sm text-slate-400 mt-1">Toasts, alerts, banners, status dots, and confirmation modals for seamless user communication.</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notificationComponents.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-amber-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-amber-400 font-mono transition-colors">
                      v1.0.0
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-amber-400 transition-colors">
                  <span>View Details & Live Demo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
