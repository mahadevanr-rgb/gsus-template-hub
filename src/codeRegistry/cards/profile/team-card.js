import TeamCard from "@/pages/Cards/components/TeamCard/TeamCard";

const sourceCode = `import React from "react";

export default function TeamCard({
  teamName = "Simmmple Web",
  teamLabel = "Teams",
  metricValue = "$682.5",
  metricLabel = "This month",
  sparklineData = [40, 65, 30, 85, 55, 95],
  tag = "Design",
  avatarGroup = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  ],
  extraMemberCount = "18+",
  onMenuClick,
  className = "",
}) {
  return (
    <div
      className={\`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden max-w-sm w-full flex flex-col justify-between transition-all \${className}\`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{teamLabel}</span>
          </div>

          <button
            onClick={onMenuClick}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="More options"
            aria-label="More options"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>

        {/* Card Content & Mini Dashboard Graphic */}
        <div className="p-5 pt-3 pb-4">
          <div className="rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-600 p-4 sm:p-5 relative overflow-hidden shadow-inner flex items-center justify-center min-h-[140px]">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            
            {/* Miniature floating UI stat card */}
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-white/40 dark:border-slate-700/60 w-full max-w-[200px] transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] text-slate-400 font-medium">{metricLabel}</span>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
                  +24.5%
                </span>
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
                {metricValue}
              </div>
              {/* Mini sparkline bars */}
              <div className="flex items-end gap-1 h-7 pt-1">
                {sparklineData.map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 rounded-sm transition-all"
                    style={{ height: \`\${val}%\` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-4 tracking-tight">
            {teamName}
          </h3>
        </div>
      </div>

      {/* Footer with Tag and Avatar Stack */}
      <div className="flex items-center justify-between p-5 pb-5 pt-3 border-t border-slate-100/80 dark:border-slate-800/80 mt-auto text-xs">
        {tag && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10">
            {tag}
          </span>
        )}

        {avatarGroup && avatarGroup.length > 0 && (
          <div className="flex items-center -space-x-2 overflow-hidden ml-auto">
            {avatarGroup.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="Member"
                className="inline-block w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
              />
            ))}
            {extraMemberCount && (
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center">
                {extraMemberCount}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}`;

export default {
  id: "team-card",
  slug: "team-card",
  name: "Team Card",
  description: "Represents a group, project team, or collaborative workspace with stats and avatars.",
  category: "cards",
  subCategory: "profile",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["team", "group", "project", "workspace", "members", "avatar"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/TeamCard.jsx", type: "component" },
  ],
  uses: [
    "Project summary dashboard",
    "Collaborative workspace lists",
    "Team directory cards",
    "Department overviews",
  ],
  component: TeamCard,
  previewProps: {
    teamName: "Simmmple Web",
    teamLabel: "Teams",
    metricValue: "$682.5",
    metricLabel: "This month",
    sparklineData: [40, 65, 30, 85, 55, 95],
    tag: "Design",
    avatarGroup: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    ],
    extraMemberCount: "18+",
  },
  sourceCode,
};
