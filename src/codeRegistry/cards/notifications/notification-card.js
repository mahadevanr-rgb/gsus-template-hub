import NotificationCard from "@/pages/Cards/components/NotificationCard/NotificationCard";

const sourceCode = `import React from "react";

export default function NotificationCard({
  title = "Notifications",
  notifications = [
    {
      id: 1,
      title: "Adela commented on your file",
      time: "2 minutes ago",
      type: "comment",
      unread: true,
    },
    {
      id: 2,
      title: "Export completed successfully",
      time: "1 hour ago",
      type: "success",
      unread: false,
    },
    {
      id: 3,
      title: "New team member joined",
      time: "Yesterday",
      type: "user",
      unread: false,
    },
  ],
  onNotificationClick,
  onViewAll,
  className = "",
}) {
  const getNotificationIcon = (item) => {
    switch (item.type) {
      case "success":
      case "completed":
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "user":
      case "member":
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "alert":
      case "warning":
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case "comment":
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-sm w-full overflow-hidden \${className}\`}>
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
        {notifications.some((n) => n.unread) && (
          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 ring-4 ring-indigo-50 dark:ring-indigo-950/40" />
        )}
      </div>

      <div className="p-3 sm:p-4 pt-1 space-y-1">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => onNotificationClick?.(item)}
            className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
          >
            {getNotificationIcon(item)}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {item.title}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 font-medium">
                {item.time}
              </p>
            </div>
            {item.unread && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {onViewAll && (
        <div className="px-5 pb-4 pt-0">
          <button
            onClick={onViewAll}
            className="w-full text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "notification-card",
  slug: "notification-card",
  name: "Notification Card",
  description: "User and system activity feed card with typed icons, unread indicators, and relative timestamps.",
  category: "cards",
  subCategory: "notifications",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["notification", "activity", "feed", "alert", "comments", "updates", "inbox"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/NotificationCard.jsx", type: "component" },
  ],
  uses: [
    "Dashboard notification widgets",
    "User inbox drop-downs",
    "Real-time event feed cards",
    "Collaboration alerts",
  ],
  component: NotificationCard,
  previewProps: {
    title: "Notifications",
    notifications: [
      {
        id: 1,
        title: "Adela commented on your file",
        time: "2 minutes ago",
        type: "comment",
        unread: true,
      },
      {
        id: 2,
        title: "Export completed successfully",
        time: "1 hour ago",
        type: "success",
        unread: false,
      },
      {
        id: 3,
        title: "New team member joined",
        time: "Yesterday",
        type: "user",
        unread: false,
      },
    ],
  },
  sourceCode,
};
