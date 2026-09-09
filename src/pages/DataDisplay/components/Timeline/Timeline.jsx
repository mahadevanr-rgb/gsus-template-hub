import React from "react";

const defaultItems = [
  { title: "Project repository deployed", description: "Successfully published to production edge network.", time: "10 minutes ago", color: "bg-emerald-500" },
  { title: "Dependencies updated", description: "Vite and Tailwind tokens upgraded.", time: "2 hours ago", color: "bg-indigo-500" },
  { title: "Design system initialized", description: "Module architecture created.", time: "Yesterday", color: "bg-purple-500" },
];

export const Timeline = ({ items = defaultItems, events, className = "" }) => {
  const list = events || items || defaultItems;

  return (
    <div className={`space-y-4 max-w-sm ${className}`}>
      {list.map((item, i) => (
        <div key={i} className="flex gap-3 text-xs">
          <div className="flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${item.color || "bg-indigo-500"} ring-4 ring-slate-900 shrink-0 mt-1`} />
            {i < list.length - 1 && <div className="w-[1px] flex-1 bg-slate-800 my-1" />}
          </div>
          <div className="pb-3 space-y-0.5 flex-1">
            <p className="font-bold text-white">{item.title}</p>
            {item.description && <p className="text-slate-400 text-[11px] leading-relaxed">{item.description}</p>}
            {item.time && <span className="text-slate-500 text-[10px] block pt-0.5">{item.time}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
