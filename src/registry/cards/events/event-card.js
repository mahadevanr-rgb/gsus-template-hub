import EventCard from "../../../components/atoms/cards/EventCard";

const sourceCode = `import React from "react";

export default function EventCard({
  day = "14",
  month = "SEP",
  title = "Design Systems Summit",
  time = "6:00 PM – 9:00 PM",
  location = "Innovation Hall, Level 3",
  headerGradient = "from-pink-500 via-purple-500 to-indigo-500",
  participants = [
    { name: "Alex", bg: "bg-pink-300" },
    { name: "Sam", bg: "bg-sky-300" },
    { name: "Jordan", bg: "bg-emerald-300" },
  ],
  actionLabel = "Reserve seat",
  onAction,
  className = "",
}) {
  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-xs sm:max-w-sm w-full overflow-hidden flex flex-col justify-between \${className}\`}>
      <div>
        <div className={\`h-24 w-full bg-gradient-to-r \${headerGradient} relative overflow-hidden flex items-center justify-center\`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/20 blur-xl pointer-events-none" />
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="flex flex-col items-center justify-center w-12 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shrink-0">
              <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 leading-none">
                {day}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                {month}
              </span>
            </div>

            <div className="space-y-1 pt-0.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">
                {time}
              </p>
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="text-rose-500">📍</span>
              <span className="truncate font-medium">{location}</span>
            </div>
          )}

          {participants && participants.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex -space-x-2">
                {participants.map((p, idx) => (
                  <div
                    key={idx}
                    className={\`w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 \${p.bg} shadow-sm\`}
                    title={p.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {actionLabel && (
        <div className="px-5 pb-5 pt-0">
          <button
            onClick={onAction}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-500/25"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "event-card",
  slug: "event-card",
  name: "Event Card",
  description: "Visual event invitation card with date badge, time slot, venue location, attendee avatars, and RSVP action.",
  category: "cards",
  subCategory: "events",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["event", "calendar", "summit", "schedule", "rsvp", "booking", "invitation"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/EventCard.jsx", type: "component" },
  ],
  uses: [
    "Conference & summit event listings",
    "Calendar and meetup widgets",
    "Webinar and workshop invitations",
    "Community RSVP boards",
  ],
  component: EventCard,
  previewProps: {
    day: "14",
    month: "SEP",
    title: "Design Systems Summit",
    time: "6:00 PM – 9:00 PM",
    location: "Innovation Hall, Level 3",
    participants: [
      { name: "Alex", bg: "bg-pink-300" },
      { name: "Sam", bg: "bg-sky-300" },
      { name: "Jordan", bg: "bg-emerald-300" },
    ],
    actionLabel: "Reserve seat",
  },
  sourceCode,
};
