import React from "react";

const defaultAvatars = [
  "Alex Morgan",
  "John Smith",
  "Sarah Chen",
  "David Miller",
  "Emma Wilson",
];

const colors = [
  "bg-indigo-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-emerald-600",
  "bg-blue-600",
];

export const AvatarItem = ({ name = "", size = "h-9 w-9", bg = "bg-indigo-600" }) => {
  const initials = typeof name === "string"
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "JD";

  return (
    <div
      className={`${size} rounded-full ${bg} text-white text-xs font-bold flex items-center justify-center border-2 border-slate-900 shadow-sm shrink-0`}
    >
      {initials}
    </div>
  );
};

export const AvatarGroup = ({
  avatars = defaultAvatars,
  users,
  max = 3,
  size = "h-9 w-9",
  className = "",
}) => {
  const list = users || avatars || defaultAvatars;
  const visible = list.slice(0, max);
  const extra = list.length - max;

  return (
    <div className={`flex items-center -space-x-2 ${className}`}>
      {visible.map((item, i) => {
        const name = typeof item === "string" ? item : item.name;
        return (
          <AvatarItem
            key={i}
            name={name}
            size={size}
            bg={colors[i % colors.length]}
          />
        );
      })}
      {extra > 0 && (
        <div
          className={`${size} rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center border-2 border-slate-900 shadow-sm shrink-0`}
        >
          +{extra}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
