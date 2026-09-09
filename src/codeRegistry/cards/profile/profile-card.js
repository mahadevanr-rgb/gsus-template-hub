import ProfileCard from "@/pages/Cards/components/ProfileCard/ProfileCard";

const sourceCode = `import React from "react";

export default function ProfileCard({
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  coverGradient = "from-indigo-600 via-purple-600 to-pink-500",
  name = "Adela Parkson",
  role = "Product Designer",
  stats = [
    { label: "Posts", value: "17" },
    { label: "Followers", value: "9.7k" },
    { label: "Following", value: "274" },
  ],
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={\`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden max-w-sm w-full transition-all \${className}\`}
    >
      {/* Cover Header Banner */}
      <div className="p-3 pb-0">
        <div
          className={\`h-28 sm:h-32 w-full rounded-2xl bg-gradient-to-tr \${coverGradient} relative overflow-hidden flex items-center justify-center\`}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-black/10 blur-xl pointer-events-none" />
        </div>
      </div>

      <div className="p-5 pt-0 text-center">
        {/* Avatar */}
        <div className="relative -mt-12 mb-3 inline-block">
          <img
            src={avatarUrl}
            alt={name}
            className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-md ring-1 ring-black/5 mx-auto"
          />
        </div>

        {/* Identity */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {name}
        </h3>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-400 mt-0.5">
          {role}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Optional Action Button */}
        {actionLabel && (
          <button
            onClick={onAction}
            className="w-full mt-5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-500/20"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}`;

export default {
  id: "profile-card",
  slug: "profile-card",
  name: "Profile Card",
  description: "Represents an individual with identity, role, stats, and profile actions.",
  category: "cards",
  subCategory: "profile",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["profile", "user", "avatar", "stats", "person", "identity"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/ProfileCard.jsx", type: "component" },
  ],
  uses: [
    "User profile overview",
    "Team directory cards",
    "Author bio widgets",
    "Social network identity",
  ],
  component: ProfileCard,
  previewProps: {
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    coverGradient: "from-indigo-600 via-purple-600 to-pink-500",
    name: "Adela Parkson",
    role: "Product Designer",
    stats: [
      { label: "Posts", value: "17" },
      { label: "Followers", value: "9.7k" },
      { label: "Following", value: "274" },
    ],
  },
  sourceCode,
};
