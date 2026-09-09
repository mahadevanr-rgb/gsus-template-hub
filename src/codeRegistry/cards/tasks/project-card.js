import ProjectCard from "@/pages/Cards/components/ProjectCard/ProjectCard";

const sourceCode = `import React from "react";

export default function ProjectCard({
  title = "Website Relaunch",
  subtitle = "Marketing Â· Q3 initiative",
  progress = 64,
  completedTasks = 12,
  totalTasks = 19,
  members = [
    { name: "Sarah", bg: "bg-rose-400" },
    { name: "Liam", bg: "bg-sky-400" },
    { name: "Maya", bg: "bg-amber-400" },
  ],
  dueDate = "Due Oct 3",
  onProjectClick,
  className = "",
}) {
  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-xs sm:max-w-sm w-full overflow-hidden p-5 sm:p-6 flex flex-col justify-between \${className}\`}>
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: \`\${progress}%\` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400">
              {progress}% complete
            </span>
            <span className="text-slate-400 dark:text-slate-400">
              {completedTasks} of {totalTasks} tasks
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex -space-x-2">
          {members.map((m, idx) => (
            <div
              key={idx}
              className={\`w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 \${m.bg} shadow-sm flex items-center justify-center text-white text-[9px] font-bold\`}
              title={m.name}
            >
              {m.name?.charAt(0)}
            </div>
          ))}
        </div>

        <span className="text-slate-400 dark:text-slate-400 font-medium text-xs">
          {dueDate}
        </span>
      </div>
    </div>
  );
}`;

export default {
  id: "project-card",
  slug: "project-card",
  name: "Project Card",
  description: "Initiative progress summary card with completion bar, task breakdown, team member stack, and due date.",
  category: "cards",
  subCategory: "tasks",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["project", "progress", "tasks", "initiative", "milestone", "completion", "team"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/ProjectCard.jsx", type: "component" },
  ],
  uses: [
    "Portfolio & initiative tracking",
    "Project status overviews",
    "Team progress dashboards",
    "Quarterly goal reviews",
  ],
  component: ProjectCard,
  previewProps: {
    title: "Website Relaunch",
    subtitle: "Marketing Â· Q3 initiative",
    progress: 64,
    completedTasks: 12,
    totalTasks: 19,
    members: [
      { name: "Sarah", bg: "bg-rose-400" },
      { name: "Liam", bg: "bg-sky-400" },
      { name: "Maya", bg: "bg-amber-400" },
    ],
    dueDate: "Due Oct 3",
  },
  sourceCode,
};
