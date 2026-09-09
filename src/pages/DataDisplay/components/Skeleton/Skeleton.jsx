import React from "react";

export const Skeleton = ({
  width = "100%",
  height = "16px",
  rounded = false,
  circle = false,
  type = "card",
  count = 3,
  className = "",
}) => {
  if (type === "card") {
    return (
      <div className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-pulse w-full ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-1/3 bg-slate-800 rounded-lg" />
            <div className="h-2.5 w-1/4 bg-slate-800/60 rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-800 rounded-lg" />
          <div className="h-3 w-4/5 bg-slate-800 rounded-lg" />
          <div className="h-3 w-2/3 bg-slate-800 rounded-lg" />
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className={`space-y-2 w-full animate-pulse ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-slate-800 rounded-lg"
            style={{ width: i === count - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{ width: circle ? height : width, height }}
      className={`bg-slate-800 animate-pulse ${
        circle ? "rounded-full" : rounded ? "rounded-full" : "rounded-xl"
      } ${className}`}
    />
  );
};

export const SkeletonCard = Skeleton;
export default Skeleton;
