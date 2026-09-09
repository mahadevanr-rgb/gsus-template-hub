import TaskCard from "@/pages/Cards/components/TaskCard/TaskCard";

const sourceCode = `import React from "react";

export default function TaskCard({
  priority = "High Priority",
  priorityVariant = "high",
  title = "Redesign onboarding flow for mobile app",
  owner = {
    name: "Priya S.",
    avatarBg: "bg-purple-500",
  },
  dueDate = "Sep 12",
  completed = false,
  onToggleComplete,
  className = "",
}) {
  const getPriorityStyle = () => {
    switch (priorityVariant) {
      case "low":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";
      case "medium":
        return "bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400";
      case "urgent":
      case "high":
      default:
        return "bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400";
    }
  };

  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-xs sm:max-w-sm w-full overflow-hidden p-5 sm:p-6 flex flex-col justify-between \${className}\`}>
      <div className="space-y-3">
        <div>
          <span className={\`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full \${getPriorityStyle()}\`}>
            {priority}
          </span>
        </div>

        <h3 className={\`text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug \${completed ? "line-through text-slate-400" : ""}\`}>
          {title}
        </h3>
      </div>

      <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className={\`w-6 h-6 rounded-full \${owner.avatarBg || "bg-purple-500"} text-white font-bold text-[10px] flex items-center justify-center shadow-sm\`}>
            {owner.name?.charAt(0) || "U"}
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {owner.name}
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-400 font-medium">
          <span>ðŸ“…</span>
          <span>{dueDate}</span>
        </div>
      </div>
    </div>
  );
}`;

export default {
  id: "task-card",
  slug: "task-card",
  name: "Task Card",
  description: "Actionable work item card with priority status tag, assignee avatar, and milestone due date.",
  category: "cards",
  subCategory: "tasks",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["task", "todo", "priority", "assignee", "due-date", "kanban", "sprint"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/TaskCard.jsx", type: "component" },
  ],
  uses: [
    "Sprint & backlog work items",
    "Individual task cards",
    "Team assignment widgets",
    "Project milestone tracking",
  ],
  component: TaskCard,
  previewProps: {
    priority: "High Priority",
    priorityVariant: "high",
    title: "Redesign onboarding flow for mobile app",
    owner: {
      name: "Priya S.",
      avatarBg: "bg-purple-500",
    },
    dueDate: "Sep 12",
  },
  sourceCode,
};
